/* Кабинет учителя + библиотека наборов вопросов (Supabase).
   Использует глобальные функции игры из game.js: $, L, LS, S, fx, texts. */
(function () {
  var CFG = window.APP_CONFIG || {};
  var ok = !!(window.supabase && CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY && CFG.SUPABASE_URL.indexOf("YOUR") < 0);
  var sb = ok ? window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY) : null;
  var BASE = "00000000-0000-0000-0000-000000000001";

  var TT = {
    kk: {
      setLabel: "Сұрақтар", builtin: "Базалық сұрақтар", teacher: "Мұғалім кабинеті", lib: "Жинақтар",
      libTitle: "Сұрақ жинақтары", byCode: "Код бойынша ашу", codePh: "Жинақ коды", find: "Табу",
      pubSets: "Ашық жинақтар", choose: "Таңдау", sel: "✓ Таңдалған", copy: "Өзіме көшіру", qn: "сұрақ", by: "Авторы",
      noCfg: "Supabase бапталмаған (js/config.js). Әзірше тек базалық сұрақтар жұмыс істейді.",
      loading: "Жүктелуде…", empty: "Әзірше бос", noq: "Бұл жинақта сұрақ жоқ.", notFound: "Мұндай код табылмады.",
      login: "Кіру", signup: "Тіркелу", logout: "Шығу", email: "Email", pass: "Құпиясөз (кемінде 6 таңба)", name: "Атыңыз",
      haveNo: "Тіркелгіңіз жоқ па? Тіркелу", haveAcc: "Тіркелгіңіз бар ма? Кіру", forgot: "Құпиясөзді ұмыттым",
      checkMail: "Поштаңызға хат жіберілді. Сілтемені басып, содан кейін кіріңіз.", resetSent: "Құпиясөзді қалпына келтіру сілтемесі поштаға жіберілді.",
      newPass: "Жаңа құпиясөз", savePass: "Сақтау", passOk: "Құпиясөз жаңартылды.", needEmail: "Email және құпиясөзді енгізіңіз.",
      mine: "Менің жинақтарым", newSet: "Жаңа жинақ", titlePh: "Атауы", subjPh: "Пән (міндетті емес)", create: "Құру",
      pub: "Ашық", priv: "Жабық", code: "Коды", edit: "Өңдеу", del: "Жою", confirmDel: "Жою керек пе? Қайтару мүмкін емес.",
      back: "← Артқа", close: "Дайын", makePub: "Ашық ету", makePriv: "Жабық ету", saveMeta: "Атауын сақтау",
      shareHint: "Кодты әріптестеріңізге беріңіз: жинақ жабық болса да, олар код арқылы ойнай алады. Ашық жинақтарды барлық мұғалімдер көреді және көшіре алады.",
      questions: "Сұрақтар", addQ: "Сұрақ қосу", editQ: "Сұрақты өңдеу", saveQ: "Сақтау", cancel: "Бас тарту",
      qkk: "Сұрақ (қазақша)", qru: "Сұрақ (орысша)", corr: "Дұрыс", ans: "Жауап",
      hint: "Екі тілдің біреуін толтыру жеткілікті — екінші тілде де сол мәтін көрінеді.",
      errQ: "Сұрақты және 4 жауапты толтырыңыз (кемінде бір тілде).", copySfx: "көшірме", saved: "Сақталды ✓"
    },
    ru: {
      setLabel: "Вопросы", builtin: "Базовые вопросы", teacher: "Кабинет учителя", lib: "Наборы",
      libTitle: "Наборы вопросов", byCode: "Открыть по коду", codePh: "Код набора", find: "Найти",
      pubSets: "Открытые наборы", choose: "Выбрать", sel: "✓ Выбрано", copy: "Копировать себе", qn: "вопр.", by: "Автор",
      noCfg: "Supabase не настроен (js/config.js). Пока работают только базовые вопросы.",
      loading: "Загрузка…", empty: "Пока пусто", noq: "В этом наборе нет вопросов.", notFound: "Набор с таким кодом не найден.",
      login: "Войти", signup: "Зарегистрироваться", logout: "Выйти", email: "Email", pass: "Пароль (минимум 6 символов)", name: "Ваше имя",
      haveNo: "Нет аккаунта? Регистрация", haveAcc: "Уже есть аккаунт? Войти", forgot: "Забыли пароль?",
      checkMail: "Мы отправили письмо. Перейдите по ссылке из него, затем войдите.", resetSent: "Ссылка для сброса пароля отправлена на почту.",
      newPass: "Новый пароль", savePass: "Сохранить", passOk: "Пароль обновлён.", needEmail: "Введите email и пароль.",
      mine: "Мои наборы", newSet: "Новый набор", titlePh: "Название", subjPh: "Предмет (необязательно)", create: "Создать",
      pub: "Открытый", priv: "Закрытый", code: "Код", edit: "Редактировать", del: "Удалить", confirmDel: "Удалить? Это необратимо.",
      back: "← Назад", close: "Готово", makePub: "Сделать открытым", makePriv: "Сделать закрытым", saveMeta: "Сохранить название",
      shareHint: "Передайте код коллегам: они смогут играть с вашим набором, даже если он закрытый. Открытые наборы видят все учителя и могут копировать их себе.",
      questions: "Вопросы", addQ: "Добавить вопрос", editQ: "Редактировать вопрос", saveQ: "Сохранить", cancel: "Отмена",
      qkk: "Вопрос (по-казахски)", qru: "Вопрос (по-русски)", corr: "Верный", ans: "Ответ",
      hint: "Достаточно заполнить один язык — на другом покажется тот же текст.",
      errQ: "Заполните вопрос и все 4 ответа (хотя бы на одном языке).", copySfx: "копия", saved: "Сохранено ✓"
    }
  };
  function T(k) { return TT[L][k]; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function chk(r) { if (r.error) throw r.error; return r.data; }
  function val(id) { var e = $(id); return e ? e.value.trim() : ""; }
  function cnt(s) { return s.questions && s.questions[0] ? s.questions[0].count : 0; }

  var user = null, view = "lib", busy = false, msg = {}, data = {}, ed = null, reg = false;

  /* ---------- преобразование строки БД -> формат игры ---------- */
  function pr(a, b) {
    a = (a || "").trim(); b = (b || "").trim();
    return [a || b, b || a];
  }
  function rowToQ(r) {
    return [pr(r.q_kk, r.q_ru), r.options.map(function (o) { return pr(o.kk, o.ru); }), r.correct];
  }
  function uname() {
    return (user.user_metadata && user.user_metadata.name) || (user.email || "").split("@")[0];
  }
  function errText(e) {
    var m = (e && e.message) || String(e);
    if (/Invalid login/i.test(m)) return L === "ru" ? "Неверный email или пароль." : "Email немесе құпиясөз қате.";
    if (/Failed to fetch|NetworkError/i.test(m)) return L === "ru" ? "Нет связи с сервером." : "Серверге қосылу мүмкін емес.";
    return m;
  }

  /* ---------- выбранный набор для игры ---------- */
  function applySet(rows, title, id, code) {
    var qs = rows.map(rowToQ);
    if (!qs.length) { msg = { t: "err", s: T("noq") }; return false; }
    S.qs = qs; S.setTitle = title; S.setId = id || null;
    LS.s("set", { id: id || null, title: title, code: code || null });
    texts();
    return true;
  }
  function resetSet() { S.qs = null; S.setTitle = null; S.setId = null; LS.s("set", null); texts(); }
  async function loadQs(id) {
    return chk(await sb.from("questions").select("q_kk,q_ru,options,correct,position")
      .eq("set_id", id).order("position", { ascending: true }));
  }
  async function pickSet(id, title) {
    if (id === "builtin") { resetSet(); return true; }
    return applySet(await loadQs(id), title, id, null);
  }

  /* ---------- кнопки меню ---------- */
  function menuTexts() {
    var b = $("setBtn"), t2 = $("tqBtn");
    if (b) b.textContent = "📚 " + T("setLabel") + ": " + (S.setTitle || T("builtin"));
    if (t2) t2.textContent = "👩‍🏫 " + T("teacher");
  }

  /* ---------- отрисовка ---------- */
  function title() {
    return { lib: T("libTitle"), login: T("teacher"), mine: T("mine"), edit: T("edit"), newpass: T("newPass") }[view];
  }
  function nav() {
    var b = function (v, l, on) {
      return '<button class="tqb' + (on ? " on" : "") + '" data-t="nav" data-v="' + v + '">' + l + "</button>";
    };
    var mineOn = view !== "lib";
    return '<div class="tpnav">' + b("lib", "📚 " + T("lib"), view === "lib") +
      b(user ? "mine" : "login", "👩‍🏫 " + T("teacher"), mineOn) +
      (user ? '<button class="tqb" data-t="logout">' + T("logout") + " (" + esc(user.email) + ")</button>" : "") + "</div>";
  }
  function render() {
    var el = $("tq");
    if (el.style.display !== "block") return;
    var h = '<div class="trow"><h1>' + esc(title()) + '</h1><button class="go" data-t="close">' + T("close") + "</button></div>" + nav();
    if (msg.s) h += '<p class="' + (msg.t === "ok" ? "tpok" : "tperr") + '">' + esc(msg.s) + "</p>";
    h += busy ? '<p class="hint">' + T("loading") + "</p>" : views[view]();
    el.innerHTML = h;
  }

  function setRow(s, mine) {
    var sel = S.setId === s.id;
    var sub = [];
    if (s.subject) sub.push(esc(s.subject));
    sub.push(cnt(s) + " " + T("qn"));
    if (mine) sub.push((s.is_public ? T("pub") : T("priv")) + " · " + T("code") + ": <b>" + esc(s.code) + "</b>");
    else if (s.owner_name) sub.push(T("by") + ": " + esc(s.owner_name));
    var acts = '<button data-t="pick" data-id="' + s.id + '">' + (sel ? T("sel") : T("choose")) + "</button>";
    if (mine) {
      acts += '<button data-t="edit" data-id="' + s.id + '">' + T("edit") + '</button><button data-t="delset" data-id="' + s.id + '">' + T("del") + "</button>";
    } else if (user) {
      acts += '<button data-t="copy" data-id="' + s.id + '">' + T("copy") + "</button>";
    }
    return '<div class="tqi"><div><b>' + esc(s.title) + "</b><small>" + sub.join(" · ") + '</small></div><div class="acts">' + acts + "</div></div>";
  }

  var views = {
    lib: function () {
      var h = "";
      if (!ok) h += '<p class="hint">' + T("noCfg") + "</p>";
      else h += "<h2>" + T("byCode") + '</h2><div class="tqi"><input id="codeIn" maxlength="12" placeholder="' + T("codePh") +
        '" style="text-transform:uppercase"><button data-t="findcode">' + T("find") + "</button></div>";
      h += "<h2>" + T("pubSets") + "</h2>";
      var pub = data.pub || [];
      if (!ok || !pub.some(function (s) { return s.id === BASE; })) {
        h += '<div class="tqi"><div><b>' + T("builtin") + '</b><small>21 ' + T("qn") + '</small></div><div class="acts"><button data-t="pick" data-id="builtin">' +
          (!S.setId ? T("sel") : T("choose")) + "</button></div></div>";
      }
      pub.forEach(function (s) { h += setRow(s, false); });
      if (ok && !pub.length) h += '<p class="hint">' + T("empty") + "</p>";
      return h;
    },
    login: function () {
      if (!ok) return '<p class="hint">' + T("noCfg") + "</p>";
      var h = "<h2>" + (reg ? T("signup") : T("login")) + "</h2>";
      if (reg) h += "<label>" + T("name") + '<input id="lgN" autocomplete="name"></label>';
      h += "<label>" + T("email") + '<input id="lgE" type="email" autocomplete="email"></label>' +
        "<label>" + T("pass") + '<input id="lgP" type="password" autocomplete="' + (reg ? "new-password" : "current-password") + '"></label>' +
        '<div class="tpact"><button class="go" data-t="' + (reg ? "signup" : "login") + '">' + (reg ? T("signup") : T("login")) + "</button></div>" +
        '<div class="tpact"><button class="tqb" data-t="tgreg">' + (reg ? T("haveAcc") : T("haveNo")) + "</button>" +
        (reg ? "" : '<button class="tqb" data-t="forgot">' + T("forgot") + "</button>") + "</div>";
      return h;
    },
    newpass: function () {
      return "<h2>" + T("newPass") + '</h2><label>' + T("pass") + '<input id="npP" type="password" autocomplete="new-password"></label>' +
        '<div class="tpact"><button class="go" data-t="setpass">' + T("savePass") + "</button></div>";
    },
    mine: function () {
      var h = "<h2>" + T("newSet") + '</h2><label><input id="nsT" placeholder="' + T("titlePh") + '"></label><label><input id="nsS" placeholder="' +
        T("subjPh") + '"></label><div class="tpact"><button class="go" data-t="newset">' + T("create") + "</button></div><h2>" + T("mine") + "</h2>";
      var m = data.mine || [];
      if (!m.length) h += '<p class="hint">' + T("empty") + "</p>";
      m.forEach(function (s) { h += setRow(s, true); });
      return h;
    },
    edit: function () {
      var s = data.set, qs = data.qs || [];
      if (!s) return "";
      var h = '<div class="tpact"><button class="tqb" data-t="nav" data-v="mine">' + T("back") + "</button></div>" +
        "<label>" + T("titlePh") + '<input id="stT" value="' + esc(s.title) + '"></label>' +
        "<label>" + T("subjPh") + '<input id="stS" value="' + esc(s.subject || "") + '"></label>' +
        '<div class="tqi"><span>' + (s.is_public ? T("pub") : T("priv")) + " · " + T("code") + ": <b>" + esc(s.code) + '</b></span><div class="acts">' +
        '<button data-t="pubtg">' + (s.is_public ? T("makePriv") : T("makePub")) + '</button><button data-t="savemeta">' + T("saveMeta") + "</button></div></div>" +
        '<p class="hint">' + T("shareHint") + "</p><h2>" + T("questions") + " (" + qs.length + ")</h2>";
      qs.forEach(function (q) {
        h += '<div class="tqi"><span>' + esc(q.q_kk || q.q_ru) + '</span><div class="acts"><button data-t="qedit" data-id="' + q.id + '">' + T("edit") +
          '</button><button data-t="qdel" data-id="' + q.id + '">' + T("del") + "</button></div></div>";
      });
      var e = ed || { q_kk: "", q_ru: "", options: [{}, {}, {}, {}], correct: 0 };
      h += '<h2 id="qform">' + (ed && ed.id ? T("editQ") : T("addQ")) + "</h2>" +
        "<label>" + T("qkk") + '<input id="qkk" value="' + esc(e.q_kk) + '"></label>' +
        "<label>" + T("qru") + '<input id="qru" value="' + esc(e.q_ru) + '"></label>' +
        '<div class="arow3 head"><span>' + T("corr") + "</span><span>" + T("ans") + " ҚАЗ</span><span>" + T("ans") + " РУС</span></div>";
      for (var i = 0; i < 4; i++) {
        var o = e.options[i] || {};
        h += '<div class="arow3"><input type="radio" name="cr" value="' + i + '" aria-label="' + T("corr") + '"' + (e.correct === i ? " checked" : "") +
          '><input id="akk' + i + '" value="' + esc(o.kk) + '"><input id="aru' + i + '" value="' + esc(o.ru) + '"></div>';
      }
      h += '<p class="hint">' + T("hint") + '</p><div class="tpact"><button class="go" data-t="qsave">' + T("saveQ") + "</button>" +
        (ed ? '<button class="tqb" data-t="qcancel">' + T("cancel") + "</button>" : "") + "</div>";
      return h;
    }
  };

  /* ---------- загрузка данных для экранов ---------- */
  var loaders = {
    lib: async function () {
      if (!ok) { data.pub = []; return; }
      data.pub = chk(await sb.from("question_sets").select("id,title,subject,owner_name,code,questions(count)")
        .eq("is_public", true).order("created_at", { ascending: false }).limit(100));
    },
    mine: async function () {
      data.mine = chk(await sb.from("question_sets").select("id,title,subject,is_public,code,questions(count)")
        .eq("owner", user.id).order("created_at", { ascending: false }));
    },
    edit: async function () {
      data.set = chk(await sb.from("question_sets").select("id,title,subject,is_public,code").eq("id", data.editId).single());
      data.qs = chk(await sb.from("questions").select("id,q_kk,q_ru,options,correct,position")
        .eq("set_id", data.editId).order("position", { ascending: true }));
    },
    login: async function () {}, newpass: async function () {}
  };
  async function show(v, keepMsg) {
    if ((v === "mine" || v === "edit") && !user) v = "login";
    view = v; if (!keepMsg) msg = {};
    busy = true; render();
    try { await loaders[v](); } catch (e) { msg = { t: "err", s: errText(e) }; }
    busy = false; render();
  }
  function open(v) { $("tq").style.display = "block"; show(v); }

  /* ---------- действия ---------- */
  var acts = {
    close: function () { $("tq").style.display = "none"; },
    nav: function (b) { ed = null; return show(b.dataset.v); },
    tgreg: function () { reg = !reg; msg = {}; render(); },
    pick: async function (b) {
      var id = b.dataset.id, s = (data.pub || []).concat(data.mine || []).filter(function (x) { return x.id === id; })[0];
      if (await pickSet(id, id === "builtin" ? T("builtin") : s.title)) acts.close(); else render();
    },
    findcode: async function () {
      var c = val("codeIn").toUpperCase(); if (!c) return;
      var r = chk(await sb.rpc("get_set_by_code", { p_code: c }));
      if (!r) { msg = { t: "err", s: T("notFound") }; render(); return; }
      if (applySet(r.questions || [], r.title, r.id, c)) acts.close(); else render();
    },
    login: async function () {
      var e = val("lgE"), p = $("lgP").value; if (!e || !p) { msg = { t: "err", s: T("needEmail") }; render(); return; }
      var r = chk(await sb.auth.signInWithPassword({ email: e, password: p }));
      user = r.user; menuTexts(); await show("mine");
    },
    signup: async function () {
      var e = val("lgE"), p = $("lgP").value, n = val("lgN"); if (!e || !p) { msg = { t: "err", s: T("needEmail") }; render(); return; }
      var r = chk(await sb.auth.signUp({ email: e, password: p, options: { data: { name: n } } }));
      if (r.session) { user = r.user; await show("mine"); } else { reg = false; msg = { t: "ok", s: T("checkMail") }; render(); }
    },
    forgot: async function () {
      var e = val("lgE"); if (!e) { msg = { t: "err", s: T("needEmail") }; render(); return; }
      chk(await sb.auth.resetPasswordForEmail(e, { redirectTo: location.origin + location.pathname }));
      msg = { t: "ok", s: T("resetSent") }; render();
    },
    setpass: async function () {
      var p = $("npP").value; if (p.length < 6) { msg = { t: "err", s: T("pass") }; render(); return; }
      chk(await sb.auth.updateUser({ password: p }));
      msg = { t: "ok", s: T("passOk") }; await show("mine", true);
    },
    logout: async function () {
      await sb.auth.signOut(); user = null; data.mine = []; menuTexts(); await show("lib");
    },
    newset: async function () {
      var t = val("nsT"); if (!t) return;
      var r = chk(await sb.from("question_sets").insert({ title: t, subject: val("nsS") || null, owner_name: uname() }).select("id").single());
      data.editId = r.id; await show("edit");
    },
    edit: function (b) { data.editId = b.dataset.id; ed = null; return show("edit"); },
    delset: async function (b) {
      if (!confirm(T("confirmDel"))) return;
      chk(await sb.from("question_sets").delete().eq("id", b.dataset.id));
      if (S.setId === b.dataset.id) resetSet();
      await show("mine");
    },
    copy: async function (b) {
      var src = (data.pub || []).filter(function (x) { return x.id === b.dataset.id; })[0], qs = await loadQs(src.id);
      var ns = chk(await sb.from("question_sets").insert({ title: src.title + " (" + T("copySfx") + ")", subject: src.subject, owner_name: uname() }).select("id").single());
      if (qs.length) chk(await sb.from("questions").insert(qs.map(function (q) {
        return { set_id: ns.id, q_kk: q.q_kk, q_ru: q.q_ru, options: q.options, correct: q.correct, position: q.position };
      })));
      data.editId = ns.id; await show("edit");
    },
    pubtg: async function () {
      chk(await sb.from("question_sets").update({ is_public: !data.set.is_public }).eq("id", data.editId));
      await show("edit");
    },
    savemeta: async function () {
      var t = val("stT"); if (!t) return;
      chk(await sb.from("question_sets").update({ title: t, subject: val("stS") || null }).eq("id", data.editId));
      if (S.setId === data.editId) { S.setTitle = t; texts(); }
      await show("edit"); msg = { t: "ok", s: T("saved") }; render();
    },
    qedit: function (b) {
      ed = (data.qs || []).filter(function (q) { return q.id === b.dataset.id; })[0]; render();
      var f = $("qform"); if (f) f.scrollIntoView();
    },
    qcancel: function () { ed = null; render(); },
    qdel: async function (b) {
      if (!confirm(T("confirmDel"))) return;
      chk(await sb.from("questions").delete().eq("id", b.dataset.id));
      if (ed && ed.id === b.dataset.id) ed = null;
      await show("edit");
    },
    qsave: async function () {
      var opts = [], i;
      for (i = 0; i < 4; i++) {
        var k = val("akk" + i), r = val("aru" + i);
        if (!k && !r) { msg = { t: "err", s: T("errQ") }; render(); return; }
        opts.push({ kk: k, ru: r });
      }
      var qk = val("qkk"), qr = val("qru");
      if (!qk && !qr) { msg = { t: "err", s: T("errQ") }; render(); return; }
      var row = { q_kk: qk, q_ru: qr, options: opts, correct: +document.querySelector('#tq input[name=cr]:checked').value };
      if (ed && ed.id) chk(await sb.from("questions").update(row).eq("id", ed.id));
      else {
        var last = (data.qs || []).reduce(function (m, q) { return Math.max(m, q.position); }, -1);
        row.set_id = data.editId; row.position = last + 1;
        chk(await sb.from("questions").insert(row));
      }
      ed = null; await show("edit");
      if (S.setId === data.editId) pickSet(data.editId, S.setTitle).catch(function () {});
    }
  };

  $("tq").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-t]"); if (!b) return;
    var f = acts[b.dataset.t]; if (!f) return;
    Promise.resolve().then(function () { return f(b); }).catch(function (err) {
      busy = false; msg = { t: "err", s: errText(err) }; render();
    });
  });
  $("setBtn").onclick = function () { open("lib"); };
  $("tqBtn").onclick = function () { open(user ? "mine" : "login"); };

  window.TP = { texts: menuTexts, rerender: render };

  /* ---------- старт ---------- */
  menuTexts();
  if (ok) {
    sb.auth.getSession().then(function (r) {
      user = r.data.session ? r.data.session.user : null; render();
    });
    sb.auth.onAuthStateChange(function (ev, sess) {
      setTimeout(function () {
        user = sess ? sess.user : null;
        if (ev === "PASSWORD_RECOVERY") { $("tq").style.display = "block"; show("newpass"); }
        else render();
      }, 0);
    });
    var saved = LS.g("set", null);
    if (saved && (saved.id || saved.code)) {
      (async function () {
        try {
          if (saved.code) {
            var r = chk(await sb.rpc("get_set_by_code", { p_code: saved.code }));
            if (r) applySet(r.questions || [], r.title, r.id, saved.code);
          } else applySet(await loadQs(saved.id), saved.title, saved.id, null);
        } catch (e) { /* остаёмся на базовых вопросах */ }
        msg = {}; menuTexts();
      })();
    }
  }
})();
