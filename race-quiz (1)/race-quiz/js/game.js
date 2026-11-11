var IMG={"cs": ["assets/cs0.webp", "assets/cs1.webp", "assets/cs2.webp", "assets/cs3.webp", "assets/cs4.webp", "assets/cs5.webp"], "ct": ["assets/ct0.webp", "assets/ct1.webp", "assets/ct2.webp", "assets/ct3.webp", "assets/ct4.webp", "assets/ct5.webp"], "tr": ["assets/tr0.jpg", "assets/tr1.jpg", "assets/tr2.jpg", "assets/tr3.jpg"], "fin": "assets/fin.webp", "bg": "assets/bg.jpg"};
var Q=[
[["Қазақстанның астанасы қай қала?","Какой город — столица Казахстана?"],["Астана","Алматы","Шымкент",["Қарағанды","Караганда"]],0],
["7 × 8 = ?",["54","56","64","48"],1],
[["Жылда неше ай бар?","Сколько месяцев в году?"],["10","11","12","13"],2],
[["Ең үлкен мұхит қайсы?","Какой океан самый большой?"],[["Тынық","Тихий"],["Атлант","Атлантический"],["Үнді","Индийский"],["Солтүстік Мұзды","Северный Ледовитый"]],0],
[["Су неше градуста қайнайды?","При какой температуре кипит вода?"],["50°C","80°C","100°C","120°C"],2],
["15 + 27 = ?",["41","42","43","52"],1],
[["Абай Құнанбайұлы кім?","Кто такой Абай Кунанбаев?"],[["Суретші","Художник"],["Ақын","Поэт"],["Саяхатшы","Путешественник"],"Физик"],1],
[["Аптада неше күн бар?","Сколько дней в неделе?"],["5","6","7","8"],2],
[["Күн жүйесіндегі ең үлкен планета?","Самая большая планета Солнечной системы?"],["Сатурн","Марс",["Жер","Земля"],"Юпитер"],3],
["100 − 36 = ?",["64","74","66","54"],0],
[["Бәйтерек қай қалада орналасқан?","В каком городе находится Байтерек?"],["Алматы","Астана","Атырау",["Ақтау","Актау"]],1],
["9 × 9 = ?",["72","81","90","99"],1],
[["«Шөл кемесі» деп қай жануарды атайды?","Какое животное называют «кораблём пустыни»?"],[["Жылқы","Лошадь"],["Есек","Осёл"],["Түйе","Верблюд"],["Қой","Овца"]],2],
[["Бір сағатта неше минут бар?","Сколько минут в одном часе?"],["30","60","90","100"],1],
[["Жердің табиғи серігі қайсы?","Какой естественный спутник Земли?"],[["Күн","Солнце"],"Марс",["Шолпан","Венера"],["Ай","Луна"]],3],
["144 ÷ 12 = ?",["10","11","12","14"],2],
[["Қазақтың ұлттық аспабы қайсы?","Какой казахский национальный инструмент?"],["Гитара","Скрипка","Домбыра","Пианино"],2],
[["Үшбұрышта неше қабырға бар?","Сколько сторон у треугольника?"],["3","4","5","6"],0],
["25 × 4 = ?",["90","100","110","125"],1],
[["Жылдың ең суық мезгілі қайсы?","Какое время года самое холодное?"],[["Көктем","Весна"],["Жаз","Лето"],["Күз","Осень"],["Қыс","Зима"]],3],
[["Тәуелсіздік күні қай айда тойланады?","В каком месяце отмечается День независимости?"],[["Қазан","Октябрь"],["Қараша","Ноябрь"],["Желтоқсан","Декабрь"],["Наурыз","Март"]],2]];
var LS={g:function(k,d){try{var v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},s:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
var L=LS.g("lang","kk"),sfx=LS.g("sfx",true),mus=LS.g("mus",true);
var ST={
kk:{names:["Қызыл мускул-кар","Көк суперкар","Жасыл ралли","Қызғылт сары пикап","Күлгін ретро-родстер","Көгілдір электр-кар"],tn:["Стадион","Шөл","Қыс","Орман"],
pl:function(n){return n+"-ойыншы"},win:function(n){return n+"-ойыншы жеңді!"},score:function(a,b){return "Дұрыс жауап: 1-ойыншы "+a+", 2-ойыншы "+b+"."},
hT:"Жолды таңда",fast:"Бірінші бас!",my:"Сенің кезегің!",wt:"Күт…",hL:"Мұғалім: жарыс ұзындығы (қадам)",start:"Бастау",again:"Қайта ойнау",menu:"Мәзірге оралу",tq:"Мұғалім сұрақтары",
qkz:"Сұрақ",ans:"Жауап",corr:"Дұрыс",add:"Сұрақ қосу",close:"Дайын",list:"Қосылған сұрақтар",empty:"Әзірше сұрақ жоқ",del:"Жою",
hint:"Сан сияқты екі тілде бірдей жауапты бір бағанға жазсаңыз жеткілікті.",err:"Сұрақты және 4 жауапты толтырыңыз.",mode:"Ойында қолданылатын сұрақтар",m1:"Тек менікі",m2:"Менікі + дайындары"},
ru:{names:["Красный маслкар","Синий суперкар","Зелёное ралли","Оранжевый пикап","Фиолетовый ретро-родстер","Бирюзовый электрокар"],tn:["Стадион","Пустыня","Зима","Лес"],
pl:function(n){return "Игрок "+n},win:function(n){return "Игрок "+n+" победил!"},score:function(a,b){return "Правильных ответов: игрок 1 — "+a+", игрок 2 — "+b+"."},
hT:"Выбери трассу",fast:"Жми первым!",my:"Твоя очередь!",wt:"Жди…",hL:"Учитель: длина гонки (шагов)",start:"Старт",again:"Играть снова",menu:"В меню",tq:"Вопросы учителя",
qkz:"Вопрос",ans:"Ответ",corr:"Верный",add:"Добавить вопрос",close:"Готово",list:"Добавленные вопросы",empty:"Пока нет вопросов",del:"Удалить",
hint:"Если ответ одинаков на двух языках (например, число), достаточно заполнить одну колонку.",err:"Заполните вопрос и 4 ответа.",mode:"Вопросы в игре",m1:"Только мои",m2:"Мои + готовые"}};
function t(k){return ST[L][k]}
function tx(x){return Array.isArray(x)?x[L==="ru"?1:0]:x}
var CARS=["#e03a30","#3b82f0","#2fae3f","#f08a1c","#a064e8","#12b5c5"],LENS=[6,8,10,12],PEN=1200;
var S={c:[0,1],t:0,goal:8,qs:null,setTitle:null,setId:null},P=[],over=false,WI=0;
function $(i){return document.getElementById(i)}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x}return a}
function pool(){return S.qs&&S.qs.length?S.qs:Q}

/* ---------- sound ---------- */
var AC=null;
function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return null}}if(AC.state==="suspended")AC.resume();return AC}
function tone(f,d,ty,v,at,f2){var a=ac();if(!a)return;var t0=a.currentTime+(at||0),o=a.createOscillator(),g=a.createGain();o.type=ty;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+d);g.gain.setValueAtTime(v,t0);g.gain.exponentialRampToValueAtTime(.001,t0+d);o.connect(g);g.connect(a.destination);o.start(t0);o.stop(t0+d+.02)}
function fx(n){if(!sfx)return;
  if(n==="ok"){tone(880,.15,"sine",.25);tone(1320,.3,"sine",.25,.1)}
  else if(n==="bad")tone(180,.4,"sawtooth",.18,0,70);
  else if(n==="go")carSnd();
  else if(n==="win")[523,659,784,1047,784,1047].forEach(function(f,i){tone(f,.28,"triangle",.3,i*.16)});
  else if(n==="tap")tone(600,.06,"sine",.15);else if(n==="rev"){tone(50,.32,"sawtooth",.2,0,150);tone(100,.32,"square",.06,0,300);tone(60,.4,"sawtooth",.22,.3,210);tone(120,.4,"square",.07,.3,420)}}
var mi=0,mT=null,LEAD=[0,4,7,12,9,7,4,7,5,9,12,9,7,4,2,4],BASS=[0,0,5,5,7,7,0,0];
function mf(n){return 261.63*Math.pow(2,n/12)}
function mtick(){if(!mus||!AC)return;tone(mf(LEAD[mi%16]),.2,"square",.035);if(mi%2===0)tone(mf(BASS[(mi>>1)%8])/2,.4,"triangle",.09);mi++}
var GM=new Audio("assets/music-game.m4a");GM.loop=true;GM.volume=.07;var GMon=false;GM.addEventListener("ended",function(){GM.currentTime=0;if(GMon&&mus){var p=GM.play();if(p&&p.catch)p.catch(function(){})}});
function musicOn(){if(!GMon)GM.currentTime=0;GMon=true;if(mus){var p=GM.play();if(p&&p.catch)p.catch(function(){})}}
function musicOff(){GMon=false;GM.pause();try{CS.pause()}catch(e){}}
var CS=new Audio("assets/sound-car.m4a");CS.volume=.9;
function carSnd(){try{CS.pause();CS.currentTime=0;var p=CS.play();if(p&&p.catch)p.catch(function(){})}catch(e){}}
/* menu song (quiet, loops, plays only in the menu) */
var MS=new Audio("assets/music-menu.m4a");MS.loop=true;MS.volume=.22;
function inMenu(){return $("menu").style.display!=="none"}
function songOn(){if(mus&&inMenu()){var p=MS.play();if(p&&p.catch)p.catch(function(){})}}
function songOff(){MS.pause()}
["pointerdown","keydown","touchstart"].forEach(function(e){document.addEventListener(e,songOn,{passive:true})});

/* ---------- menu ---------- */
function bar(){$("bL").innerHTML=L==="kk"?"<u>ҚАЗ</u> | РУС":"ҚАЗ | <u>РУС</u>";$("bS").className=sfx?"":"off";$("bM").className=mus?"":"off"}
function texts(){$("hT").textContent=t("hT");$("hL").textContent=t("hL");$("goBtn").textContent=t("start");
  if(window.TP)TP.texts();$("againBtn").textContent="🏁 "+t("again");$("menuBtn").textContent="↻ "+t("menu")}
function renderMenu(){songOn();
  $("menu").style.backgroundImage="linear-gradient(#0007,#000b),url("+IMG.bg+")";
  [0,1].forEach(function(i){var k=S.c[i],s=$("s"+i);s.style.setProperty("--c",CARS[k]);
    s.innerHTML='<div class="who"><span>'+t("pl")(i+1)+'</span></div><div class="stage"><div class="plat"></div><img class="car" alt="" src="'+IMG.cs[k]+'"></div><div class="pick"><button data-s="'+i+'" data-d="-1" aria-label="◀">◀</button><b>'+t("names")[k]+'</b><button data-s="'+i+'" data-d="1" aria-label="▶">▶</button></div>'});
  var tr=$("tracks");tr.innerHTML="";
  t("tn").forEach(function(n,k){var b=document.createElement("button");b.className="tk"+(S.t===k?" sel":"");b.textContent=n;b.style.backgroundImage="url("+IMG.tr[k]+")";b.onclick=function(){S.t=k;renderMenu()};tr.appendChild(b)});
  $("lens").innerHTML=LENS.map(function(n){return '<button class="ln'+(S.goal===n?' sel':'')+'" data-n="'+n+'">'+n+'</button>'}).join("");
  texts();bar()}

document.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;
  if(b.closest("#menu,#tq,#end"))fx(b.dataset.s!==undefined?"rev":"tap");
  if(b.dataset.s!==undefined){var i=+b.dataset.s,k=S.c[i];do{k=(k+ +b.dataset.d+6)%6}while(k===S.c[1-i]);S.c[i]=k;renderMenu()}
  else if(b.dataset.n!==undefined){S.goal=+b.dataset.n;renderMenu()}});
$("bL").onclick=function(){L=L==="kk"?"ru":"kk";LS.s("lang",L);renderMenu();
  if($("tq").style.display==="block"&&window.TP)TP.rerender();
  if($("game").style.display!=="none")draw();
  if($("end").style.display==="flex")fillEnd()};
$("bS").onclick=function(){sfx=!sfx;LS.s("sfx",sfx);bar();fx("tap")};
$("bM").onclick=function(){mus=!mus;LS.s("mus",mus);bar();ac();if(mus)songOn();else songOff();if(GMon){if(mus)GM.play().catch(function(){});else GM.pause()}};

/* ---------- game ---------- */
var G={};
function newGame(){
  over=false;var g=$("game");
  g.innerHTML='<section class="qa" id="qa0" style="--c:'+CARS[S.c[0]]+'"></section><div class="road" id="road"><div class="world" id="w" style="background-image:url('+IMG.tr[S.t]+')"><img class="fin" id="fin" alt="" src="'+IMG.fin+'"></div><img class="gcar" id="car0" alt="" src="'+IMG.ct[S.c[0]]+'"><img class="gcar" id="car1" alt="" src="'+IMG.ct[S.c[1]]+'"></div><section class="qa" id="qa1" style="--c:'+CARS[S.c[1]]+'"></section>';
  P=[0,1].map(function(i){return {i:i,pos:0,right:0}});
  G={qs:shuffle(pool()),n:0};nextQ();layout()}
function nextQ(){G.q=G.qs[G.n%G.qs.length];G.n++;G.ord=shuffle([0,1,2,3]);G.turn=-1;G.dead=[];G.done=false;draw()}
function layout(){
  var r=$("road");if(!r)return;
  var W=r.clientWidth,H=r.clientHeight,imgH=W*3,yS=imgH-.2*H,yF=.24*H;
  var ys=P.map(function(p){return yS-(yS-yF)*p.pos/S.goal}),lead=Math.min(ys[0],ys[1]);
  var T=Math.min(0,Math.max(H-imgH,.5*H-lead));
  var w=$("w");w.style.height=imgH+"px";w.style.transform="translateY("+T+"px)";
  $("fin").style.top=yF+"px";
  P.forEach(function(p,i){var y=ys[i],f=.48+.4*(y/imgH),c=$("car"+i);
    c.style.height=(.27*H*f/.88)+"px";
    c.style.left=((.5+(i?1:-1)*f*.25)*W)+"px";c.style.top=(y+T)+"px"})}
function draw(){var q=G.q;
  [0,1].forEach(function(i){var box=$("qa"+i);
    var st=G.done?"":G.turn===-1?t("fast"):G.turn===i?t("my"):t("wt");
    box.innerHTML='<div class="info"><span class="hx">'+t("pl")(i+1)+'</span><b class="hx">'+st+'</b><span class="hx">'+P[i].pos+' / '+S.goal+'</span></div><div class="flags"><span>🏁</span><span>🏁</span></div><div class="q hx"></div><div class="opts"></div>';
    box.querySelector(".q").textContent=tx(q[0]);
    var o=box.querySelector(".opts");
    if(G.done||(G.turn!==-1&&G.turn!==i))o.classList.add("lock");
    G.ord.forEach(function(k){var b=document.createElement("button");b.innerHTML='<i class="fl"></i><span></span>';b.lastChild.textContent=tx(q[1][k]);b.className="hx";
      if(G.dead.indexOf(k)>=0)b.className="hx bad";else if(G.done&&k===q[2])b.className="hx ok";
      b.onclick=function(){pick(i,k)};o.appendChild(b)})})}
function pick(i,k){
  if(over||G.done||G.dead.indexOf(k)>=0||(G.turn!==-1&&G.turn!==i))return;
  if(k===G.q[2]){
    G.done=true;fx("ok");setTimeout(function(){fx("go")},150);
    var p=P[i];p.pos++;p.right++;layout();draw();
    if(p.pos>=S.goal){finish(p);return}
    setTimeout(function(){if(!over)nextQ()},900);
  }else{
    fx("bad");G.dead.push(k);G.turn=1-i;
    var c=$("car"+i);c.classList.add("shake");setTimeout(function(){c.classList.remove("shake")},400);
    draw()}}
function fillEnd(){$("winTxt").innerHTML="<span>"+t("win")(WI+1)+"</span>";$("end").style.setProperty("--c",CARS[S.c[WI]]);$("score").className="hx";
  $("winCar").innerHTML='<img alt="" src="'+IMG.ct[S.c[WI]]+'">';$("score").textContent=t("score")(P[0].right,P[1].right);texts()}
function finish(p){over=true;WI=p.i;musicOff();setTimeout(function(){fillEnd();$("end").style.display="flex";fx("win")},1000)}
function begin(){songOff();ac();$("bH").style.display="";$("menu").style.display="none";$("end").style.display="none";$("game").style.display="grid";newGame();if(mus)musicOn()}
var hTm=null;
$("bH").onclick=function(){var b=this;if(b.dataset.arm){clearTimeout(hTm);b.dataset.arm="";b.textContent="🏠";over=true;musicOff();b.style.display="none";$("end").style.display="none";$("game").style.display="none";$("menu").style.display="grid";renderMenu()}else{b.dataset.arm="1";b.textContent="🏠 ?";hTm=setTimeout(function(){b.dataset.arm="";b.textContent="🏠"},3000)}};
$("goBtn").onclick=begin;$("againBtn").onclick=begin;
$("menuBtn").onclick=function(){$("bH").style.display="none";musicOff();$("end").style.display="none";$("game").style.display="none";$("menu").style.display="grid";renderMenu()};
window.addEventListener("resize",function(){if(P.length&&$("game").style.display!=="none")layout()});
renderMenu();
