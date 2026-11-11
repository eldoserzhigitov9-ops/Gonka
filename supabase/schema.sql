-- =====================================================================
--  Жарыс: сұрақ-жауап — схема базы данных Supabase
--  Выполните целиком в Supabase → SQL Editor → New query → Run
--  Запускать ОДИН раз. (Повторный запуск выдаст ошибку «already exists» —
--  это защищает данные учителей от случайного удаления.)
-- =====================================================================

-- Наборы вопросов -------------------------------------------------------
create table public.question_sets (
  id          uuid primary key default gen_random_uuid(),
  owner       uuid references auth.users(id) on delete cascade default auth.uid(),
  owner_name  text,
  title       text not null check (char_length(title) between 1 and 120),
  subject     text check (char_length(subject) <= 80),
  is_public   boolean not null default false,
  -- короткий код: по нему набор можно открыть, даже если он закрытый
  code        text not null unique default upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6)),
  created_at  timestamptz not null default now()
);

-- Вопросы ---------------------------------------------------------------
create table public.questions (
  id          uuid primary key default gen_random_uuid(),
  set_id      uuid not null references public.question_sets(id) on delete cascade,
  position    int  not null default 0,
  q_kk        text check (char_length(q_kk) <= 500),
  q_ru        text check (char_length(q_ru) <= 500),
  -- ровно 4 ответа: [{"kk":"...","ru":"..."}, ...]
  options     jsonb not null,
  correct     smallint not null check (correct between 0 and 3),
  created_at  timestamptz not null default now(),
  constraint q_has_text   check (coalesce(q_kk,'') <> '' or coalesce(q_ru,'') <> ''),
  constraint q_four_opts  check (jsonb_typeof(options) = 'array' and jsonb_array_length(options) = 4)
);
create index questions_set_pos_idx on public.questions(set_id, position);
create index question_sets_owner_idx on public.question_sets(owner);

-- Ограничение: не более 300 вопросов в наборе ---------------------------
create or replace function public.limit_questions() returns trigger
language plpgsql as $$
begin
  if (select count(*) from public.questions where set_id = new.set_id) >= 300 then
    raise exception 'Too many questions in one set (max 300)';
  end if;
  return new;
end $$;
create trigger trg_limit_questions before insert on public.questions
  for each row execute function public.limit_questions();

-- Row Level Security ----------------------------------------------------
alter table public.question_sets enable row level security;
alter table public.questions     enable row level security;

-- Наборы: читать можно открытые и свои; менять — только свои
create policy "sets_select" on public.question_sets for select
  using (is_public or owner = auth.uid());
create policy "sets_insert" on public.question_sets for insert to authenticated
  with check (owner = auth.uid());
create policy "sets_update" on public.question_sets for update to authenticated
  using (owner = auth.uid()) with check (owner = auth.uid());
create policy "sets_delete" on public.question_sets for delete to authenticated
  using (owner = auth.uid());

-- Вопросы: видны, если виден набор; менять — только владельцу набора
create policy "q_select" on public.questions for select
  using (exists (select 1 from public.question_sets s
                 where s.id = set_id and (s.is_public or s.owner = auth.uid())));
create policy "q_insert" on public.questions for insert to authenticated
  with check (exists (select 1 from public.question_sets s where s.id = set_id and s.owner = auth.uid()));
create policy "q_update" on public.questions for update to authenticated
  using (exists (select 1 from public.question_sets s where s.id = set_id and s.owner = auth.uid()))
  with check (exists (select 1 from public.question_sets s where s.id = set_id and s.owner = auth.uid()));
create policy "q_delete" on public.questions for delete to authenticated
  using (exists (select 1 from public.question_sets s where s.id = set_id and s.owner = auth.uid()));

-- Открыть набор по коду (в том числе закрытый) ----------------------------
create or replace function public.get_set_by_code(p_code text)
returns json language sql stable security definer set search_path = public as $$
  select json_build_object(
    'id', s.id, 'title', s.title, 'subject', s.subject, 'owner_name', s.owner_name,
    'questions', coalesce((
      select json_agg(json_build_object('q_kk', q.q_kk, 'q_ru', q.q_ru, 'options', q.options, 'correct', q.correct)
                      order by q.position, q.created_at)
      from public.questions q where q.set_id = s.id), '[]'::json))
  from public.question_sets s
  where s.code = upper(trim(p_code))
  limit 1;
$$;
revoke all on function public.get_set_by_code(text) from public;
grant execute on function public.get_set_by_code(text) to anon, authenticated;

-- Стартовый открытый набор «Базовые вопросы» ----------------------------
insert into public.question_sets (id, owner, owner_name, title, subject, is_public, code)
values ('00000000-0000-0000-0000-000000000001', null, 'Жарыс', 'Базовые вопросы / Базалық сұрақтар', 'Общие', true, 'BASE01');

insert into public.questions (set_id, position, q_kk, q_ru, options, correct) values
('00000000-0000-0000-0000-000000000001',0,'Қазақстанның астанасы қай қала?','Какой город — столица Казахстана?','[{"kk": "Астана", "ru": "Астана"}, {"kk": "Алматы", "ru": "Алматы"}, {"kk": "Шымкент", "ru": "Шымкент"}, {"kk": "Қарағанды", "ru": "Караганда"}]'::jsonb,0),
('00000000-0000-0000-0000-000000000001',1,'7 × 8 = ?','7 × 8 = ?','[{"kk": "54", "ru": "54"}, {"kk": "56", "ru": "56"}, {"kk": "64", "ru": "64"}, {"kk": "48", "ru": "48"}]'::jsonb,1),
('00000000-0000-0000-0000-000000000001',2,'Жылда неше ай бар?','Сколько месяцев в году?','[{"kk": "10", "ru": "10"}, {"kk": "11", "ru": "11"}, {"kk": "12", "ru": "12"}, {"kk": "13", "ru": "13"}]'::jsonb,2),
('00000000-0000-0000-0000-000000000001',3,'Ең үлкен мұхит қайсы?','Какой океан самый большой?','[{"kk": "Тынық", "ru": "Тихий"}, {"kk": "Атлант", "ru": "Атлантический"}, {"kk": "Үнді", "ru": "Индийский"}, {"kk": "Солтүстік Мұзды", "ru": "Северный Ледовитый"}]'::jsonb,0),
('00000000-0000-0000-0000-000000000001',4,'Су неше градуста қайнайды?','При какой температуре кипит вода?','[{"kk": "50°C", "ru": "50°C"}, {"kk": "80°C", "ru": "80°C"}, {"kk": "100°C", "ru": "100°C"}, {"kk": "120°C", "ru": "120°C"}]'::jsonb,2),
('00000000-0000-0000-0000-000000000001',5,'15 + 27 = ?','15 + 27 = ?','[{"kk": "41", "ru": "41"}, {"kk": "42", "ru": "42"}, {"kk": "43", "ru": "43"}, {"kk": "52", "ru": "52"}]'::jsonb,1),
('00000000-0000-0000-0000-000000000001',6,'Абай Құнанбайұлы кім?','Кто такой Абай Кунанбаев?','[{"kk": "Суретші", "ru": "Художник"}, {"kk": "Ақын", "ru": "Поэт"}, {"kk": "Саяхатшы", "ru": "Путешественник"}, {"kk": "Физик", "ru": "Физик"}]'::jsonb,1),
('00000000-0000-0000-0000-000000000001',7,'Аптада неше күн бар?','Сколько дней в неделе?','[{"kk": "5", "ru": "5"}, {"kk": "6", "ru": "6"}, {"kk": "7", "ru": "7"}, {"kk": "8", "ru": "8"}]'::jsonb,2),
('00000000-0000-0000-0000-000000000001',8,'Күн жүйесіндегі ең үлкен планета?','Самая большая планета Солнечной системы?','[{"kk": "Сатурн", "ru": "Сатурн"}, {"kk": "Марс", "ru": "Марс"}, {"kk": "Жер", "ru": "Земля"}, {"kk": "Юпитер", "ru": "Юпитер"}]'::jsonb,3),
('00000000-0000-0000-0000-000000000001',9,'100 − 36 = ?','100 − 36 = ?','[{"kk": "64", "ru": "64"}, {"kk": "74", "ru": "74"}, {"kk": "66", "ru": "66"}, {"kk": "54", "ru": "54"}]'::jsonb,0),
('00000000-0000-0000-0000-000000000001',10,'Бәйтерек қай қалада орналасқан?','В каком городе находится Байтерек?','[{"kk": "Алматы", "ru": "Алматы"}, {"kk": "Астана", "ru": "Астана"}, {"kk": "Атырау", "ru": "Атырау"}, {"kk": "Ақтау", "ru": "Актау"}]'::jsonb,1),
('00000000-0000-0000-0000-000000000001',11,'9 × 9 = ?','9 × 9 = ?','[{"kk": "72", "ru": "72"}, {"kk": "81", "ru": "81"}, {"kk": "90", "ru": "90"}, {"kk": "99", "ru": "99"}]'::jsonb,1),
('00000000-0000-0000-0000-000000000001',12,'«Шөл кемесі» деп қай жануарды атайды?','Какое животное называют «кораблём пустыни»?','[{"kk": "Жылқы", "ru": "Лошадь"}, {"kk": "Есек", "ru": "Осёл"}, {"kk": "Түйе", "ru": "Верблюд"}, {"kk": "Қой", "ru": "Овца"}]'::jsonb,2),
('00000000-0000-0000-0000-000000000001',13,'Бір сағатта неше минут бар?','Сколько минут в одном часе?','[{"kk": "30", "ru": "30"}, {"kk": "60", "ru": "60"}, {"kk": "90", "ru": "90"}, {"kk": "100", "ru": "100"}]'::jsonb,1),
('00000000-0000-0000-0000-000000000001',14,'Жердің табиғи серігі қайсы?','Какой естественный спутник Земли?','[{"kk": "Күн", "ru": "Солнце"}, {"kk": "Марс", "ru": "Марс"}, {"kk": "Шолпан", "ru": "Венера"}, {"kk": "Ай", "ru": "Луна"}]'::jsonb,3),
('00000000-0000-0000-0000-000000000001',15,'144 ÷ 12 = ?','144 ÷ 12 = ?','[{"kk": "10", "ru": "10"}, {"kk": "11", "ru": "11"}, {"kk": "12", "ru": "12"}, {"kk": "14", "ru": "14"}]'::jsonb,2),
('00000000-0000-0000-0000-000000000001',16,'Қазақтың ұлттық аспабы қайсы?','Какой казахский национальный инструмент?','[{"kk": "Гитара", "ru": "Гитара"}, {"kk": "Скрипка", "ru": "Скрипка"}, {"kk": "Домбыра", "ru": "Домбыра"}, {"kk": "Пианино", "ru": "Пианино"}]'::jsonb,2),
('00000000-0000-0000-0000-000000000001',17,'Үшбұрышта неше қабырға бар?','Сколько сторон у треугольника?','[{"kk": "3", "ru": "3"}, {"kk": "4", "ru": "4"}, {"kk": "5", "ru": "5"}, {"kk": "6", "ru": "6"}]'::jsonb,0),
('00000000-0000-0000-0000-000000000001',18,'25 × 4 = ?','25 × 4 = ?','[{"kk": "90", "ru": "90"}, {"kk": "100", "ru": "100"}, {"kk": "110", "ru": "110"}, {"kk": "125", "ru": "125"}]'::jsonb,1),
('00000000-0000-0000-0000-000000000001',19,'Жылдың ең суық мезгілі қайсы?','Какое время года самое холодное?','[{"kk": "Көктем", "ru": "Весна"}, {"kk": "Жаз", "ru": "Лето"}, {"kk": "Күз", "ru": "Осень"}, {"kk": "Қыс", "ru": "Зима"}]'::jsonb,3),
('00000000-0000-0000-0000-000000000001',20,'Тәуелсіздік күні қай айда тойланады?','В каком месяце отмечается День независимости?','[{"kk": "Қазан", "ru": "Октябрь"}, {"kk": "Қараша", "ru": "Ноябрь"}, {"kk": "Желтоқсан", "ru": "Декабрь"}, {"kk": "Наурыз", "ru": "Март"}]'::jsonb,2);
