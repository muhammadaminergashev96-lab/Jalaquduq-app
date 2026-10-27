(function(){
var M={a:"а",b:"б",d:"д",e:"е",f:"ф",g:"г",h:"ҳ",i:"и",j:"ж",k:"к",l:"л",m:"м",n:"н",o:"о",p:"п",q:"қ",r:"р",s:"с",t:"т",u:"у",v:"в",x:"х",y:"й",z:"з","’":"ъ","ʼ":"ъ"};
function cyr(s){
  var out="",i=0,low=s.toLowerCase(),AP=/[‘’'ʻʼ]/;
  while(i<s.length){
    var c=low.charAt(i),n=low.charAt(i+1),two=c+n,up=s.charAt(i)!==c,r=null,len=1;
    if((c==="o"||c==="g")&&AP.test(n)){r=c==="o"?"ў":"ғ";len=2}
    else if(two==="sh"){r="ш";len=2}
    else if(two==="ch"){r="ч";len=2}
    else if(two==="yo"&&!AP.test(low.charAt(i+2))){r="ё";len=2}
    else if(two==="yu"){r="ю";len=2}
    else if(two==="ya"){r="я";len=2}
    else if(two==="ye"){r="е";len=2}
    else if(c==="e"&&(i===0||!/[a-z‘’'ʻʼ]/.test(low.charAt(i-1)))){r="э"}
    else if(M[c]){r=M[c]}
    else{r=s.charAt(i)}
    if(up&&r!==s.charAt(i)){r=r.charAt(0).toUpperCase()+r.slice(1)}
    out+=r;i+=len;
  }
  return out;
}
var home=document.getElementById("home"),og=null;
if(home){var gl=home.querySelectorAll(".grid");for(var gi=0;gi<gl.length;gi++){if(!gl[gi].closest("#menu2")&&!gl[gi].closest("#hm")){og=gl[gi];break}}
  if(!og){og=document.createElement("div");og.className="grid";og.style.display="none";home.appendChild(og)}}
if(!og)return;
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function lg(){return typeof LANG!=="undefined"?LANG:"uz"}
var UI={
uz:{asosiy:"Asosiy",namoz:"Namoz",taom:"Taomlar",valyuta:"Valyuta",viktorina:"Viktorina",hello:"Assalomu alaykum",next:"Keyingi namoz",
 g:["Xayrli tun","Xayrli tong","Xayrli kun","Xayrli kech"],
 wd:["Yakshanba","Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"],today:"Bugun",tmr:"Ertaga",
 hm:["Muharram","Safar","Rabiul avval","Rabiul oxir","Jumodul avval","Jumodul oxir","Rajab","Sha’bon","Ramazon","Shavvol","Zulqa’da","Zulhijja"],
 wx:"Ob-havo",wxMore:"Batafsil",wind:"Shamol",kmh:"km/soat",cook:"Bugun nima pishiramiz?",all:"Barchasi",
 meal:["NONUSHTA UCHUN","TUSHLIK UCHUN","KECHKI OVQAT UCHUN"],min:"daqiqa",pers:"kishilik",usd:"Dollar kursi",conv:"Konvertor",usd1:"1 AQSH DOLLARI",som:"so‘m",loc:"Jalaquduq",
 b:{prava:["Prava imtihoniga tayyorlaning","Imtihon rejimi · rasmli savollar"],viktorina:["Bilimingizni sinang","Kunlik savollar · reyting"],xarajat:["Xarajatlarni yozib boring","Oddiy yozing — o‘zi hisoblaydi"]}},
ru:{asosiy:"Главная",namoz:"Намаз",taom:"Блюда",valyuta:"Валюта",viktorina:"Викторина",hello:"Ассаламу алейкум",next:"Следующий намаз",
 g:["Доброй ночи","Доброе утро","Добрый день","Добрый вечер"],
 wd:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],today:"Сегодня",tmr:"Завтра",
 hm:["Мухаррам","Сафар","Рабиуль авваль","Рабиуль ахир","Джумадаль уля","Джумадаль ахира","Раджаб","Шаабан","Рамадан","Шавваль","Зуль-каада","Зуль-хиджа"],
 wx:"Погода",wxMore:"Подробнее",wind:"Ветер",kmh:"км/ч",cook:"Что приготовим сегодня?",all:"Все",
 meal:["НА ЗАВТРАК","НА ОБЕД","НА УЖИН"],min:"мин",pers:"порц.",usd:"Курс доллара",conv:"Конвертер",usd1:"1 ДОЛЛАР США",som:"сум",loc:"Жалакудук",
 b:{prava:["Подготовка к экзамену ПДД","Режим экзамена · вопросы с картинками"],viktorina:["Проверьте знания","Вопросы дня · рейтинг"],xarajat:["Записывайте расходы","Пишите просто — посчитаю сам"]}}
};
function pk(k){var v=(lg()==="ru"?UI.ru:UI.uz)[k];return typeof v==="string"&&lg()==="oz"?cyr(v):v}
function pa(k){var v=(lg()==="ru"?UI.ru:UI.uz)[k];return lg()==="oz"?v.map(cyr):v}
function nz(s){return String(s||"").toLowerCase().replace(/[ʻʼ‘’'`´]/g,"")}
var RX=[
 ["namoz",/namoz|намаз/],["qibla",/qibla|кибла|қибла/],["tasbeh",/tasbeh|тасбеҳ|тасбех|чётк|четк/],["obhavo",/ob.?havo|ҳаво|хаво|погод/],["valyuta",/valyuta|валют|курс/],
 ["xarajat",/xarajat|харажат|расход/],["rasm",/rasm|расм|фото/],["yosh",/yosh|ёш|возраст/],["tillar",/tillar|тиллар|язык/],["tabrik",/tabrik|табрик|поздрав/],
 ["prava",/prava|права/],["huquq",/huquq|ҳуқуқ|хукук|право/],["shosh",/shosh|шошил|срочн|экстрен/],["manzil",/manzil|манзил|адрес/],
 ["oyin",/oyin|ўйин|уйин|игр/],["viktorina",/viktorin|виктор/],["qoshiq",/qoshiq|қўшиқ|қушиқ|musiq|музык|песн/],["taom",/taom|таом|блюд|рецепт/]
];
var ORDER=["namoz","obhavo","valyuta","qibla","tasbeh","prava","xarajat","rasm","yosh","tabrik","tillar","huquq","shosh","manzil","oyin","viktorina","qoshiq","taom"];
function keyOf(t){var b=t.querySelector("b"),s=nz(b?b.textContent:t.textContent);for(var i=0;i<RX.length;i++)if(RX[i][1].test(s))return RX[i][0];return null}

/* ---------- uslub ---------- */
var STAR="data:image/svg+xml;utf8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><g fill="none" stroke="white" stroke-opacity=".13" stroke-width="1.2"><path d="M32 4 L38 20 L54 14 L48 30 L60 32 L48 34 L54 50 L38 44 L32 60 L26 44 L10 50 L16 34 L4 32 L16 30 L10 14 L26 20 Z"/><circle cx="32" cy="32" r="9"/></g></svg>');
var PL="data:image/svg+xml;utf8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><g fill="none" stroke="#0f766e" stroke-opacity=".10" stroke-width="1.3"><path d="M48 8 L56 30 L78 22 L70 44 L88 48 L70 52 L78 74 L56 66 L48 88 L40 66 L18 74 L26 52 L8 48 L26 44 L18 22 L40 30 Z"/><circle cx="48" cy="48" r="12"/></g><g fill="#0f766e" fill-opacity=".07"><circle cx="0" cy="0" r="3"/><circle cx="96" cy="0" r="3"/><circle cx="0" cy="96" r="3"/><circle cx="96" cy="96" r="3"/></g></svg>');
var PD="data:image/svg+xml;utf8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><g fill="none" stroke="#5eead4" stroke-opacity=".07" stroke-width="1.3"><path d="M48 8 L56 30 L78 22 L70 44 L88 48 L70 52 L78 74 L56 66 L48 88 L40 66 L18 74 L26 52 L8 48 L26 44 L18 22 L40 30 Z"/><circle cx="48" cy="48" r="12"/></g></svg>');
var css=document.createElement("style");
css.textContent=
"html[data-theme=light]{--bg:#f3f5f7;--card:#fff;--text:#16202b;--mut:#6b7788;--acc:#0f7b6c;--accbg:#e1f3ef;--line:#e5e9ee;--dn:#d64545}html[data-theme=dark]{--bg:#0e1318;--card:#171f27;--text:#e9eef3;--mut:#8f9db0;--acc:#38cfa7;--accbg:#143a33;--line:#25303c;--dn:#ff7b7b}"+
"body::before{content:'';position:fixed;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(120% 55% at 50% -8%,rgba(20,184,166,.20),transparent 62%),radial-gradient(90% 40% at 100% 100%,rgba(212,160,23,.10),transparent 60%),url(\""+PL+"\")}html[data-theme=dark] body::before{background:radial-gradient(120% 55% at 50% -8%,rgba(20,184,166,.22),transparent 62%),radial-gradient(90% 40% at 100% 100%,rgba(212,160,23,.08),transparent 60%),url(\""+PD+"\")}@media(prefers-color-scheme:dark){html:not([data-theme=light]) body::before{background:radial-gradient(120% 55% at 50% -8%,rgba(20,184,166,.22),transparent 62%),radial-gradient(90% 40% at 100% 100%,rgba(212,160,23,.08),transparent 60%),url(\""+PD+"\")}}"+
"body{padding-bottom:96px!important;background:var(--bg)!important}#home>*:not(#hm){display:none!important}#hm{display:block}.lang{display:none!important}"+
".hm-top{display:flex;align-items:center;gap:10px;padding:6px 2px 14px}.hm-logo{width:44px;height:44px;border-radius:14px;background:linear-gradient(135deg,#0f766e,#14b8a6);color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;flex:none}.hm-ti{flex:1;min-width:0}.hm-ti small{display:block;font-size:12px;color:var(--mut)}.hm-ti b{display:block;font-size:17px;line-height:1.15;color:var(--text);font-weight:800}.hm-ch{height:36px;min-width:36px;padding:0 12px;border-radius:18px;border:1px solid var(--line);background:var(--card);color:var(--text);font-size:13px;font-weight:700;font-family:inherit;display:flex;align-items:center;justify-content:center;flex:none}"+
".hm-hero{position:relative;border-radius:26px;padding:18px 16px 16px;color:#fff;background:#0f766e linear-gradient(140deg,#0e6f66,#115e59 55%,#134e4a);overflow:hidden;box-shadow:0 10px 26px rgba(15,118,110,.28)}.hm-hero:before{content:'';position:absolute;inset:0;background:url(\""+STAR+"\");opacity:1}.hm-hero>*{position:relative}.hm-d{font-size:13px;opacity:.88}.hm-hi{font-size:25px;font-weight:800;line-height:1.15;margin:6px 0 14px}.hm-nx{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.2);border-radius:18px;padding:12px 14px}.hm-nx small{display:block;font-size:12px;opacity:.85;margin-bottom:3px}.hm-nx .l{flex:1;min-width:0;font-size:16px;font-weight:600;line-height:1.3}.hm-nx .t{font-size:28px;font-weight:800;letter-spacing:.01em}"+
".hm-grid{display:grid!important;grid-template-columns:repeat(3,1fr);gap:10px;margin:16px 0 0}.hm-grid .tile{background:var(--card)!important;color:var(--text)!important;border:1px solid var(--line)!important;border-radius:20px!important;padding:12px 10px 11px!important;min-height:0!important;height:auto!important;text-align:left!important;box-shadow:0 2px 8px rgba(20,30,40,.05)!important;display:block!important;font-family:inherit}.hm-grid .tile{display:flex!important;flex-direction:column!important;align-items:flex-start!important;justify-content:flex-start!important;aspect-ratio:auto!important;position:relative!important;overflow:hidden}.hm-grid .tile .ic{order:0}.hm-grid .tile b{order:1}.hm-grid .tile span{order:2}.hm-grid .tile:active{transform:scale(.97)}.hm-grid .tile .ic{position:static!important;inset:auto!important;transform:none!important;float:none!important;width:42px!important;height:42px!important;border-radius:14px;background:var(--tcb,var(--accbg));display:flex!important;align-items:center;justify-content:center;font-size:21px!important;margin:0 0 10px!important}.hm-grid .tile b{display:-webkit-box!important;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:13px!important;line-height:1.2!important;color:var(--text)!important;font-weight:700!important;min-height:31px}.hm-grid .tile span{display:block!important;font-size:11px!important;color:var(--mut)!important;opacity:1!important;margin-top:3px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"+
".hm-bn{display:flex;align-items:center;gap:12px;width:100%;padding:15px 14px;border:0;border-radius:20px;color:#fff;text-align:left;margin-top:12px;font-family:inherit;box-shadow:0 8px 20px rgba(0,0,0,.14)}.hm-bn i{font-style:normal;width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:21px;flex:none}.hm-bn div{flex:1;min-width:0}.hm-bn b{display:block;font-size:15px;font-weight:800}.hm-bn span{display:block;font-size:12px;opacity:.85;margin-top:2px}.hm-bn em{font-style:normal;font-size:20px;opacity:.9}"+
".hm-sh{display:flex;align-items:center;justify-content:space-between;margin:22px 2px 10px}.hm-sh b{font-size:18px;font-weight:800;color:var(--text)}.hm-sh button{border:0;background:none;color:var(--acc);font-weight:700;font-size:13px;font-family:inherit}.hm-c{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:16px;box-shadow:0 2px 8px rgba(20,30,40,.05)}"+
".hm-w1{display:flex;align-items:flex-start;gap:12px}.hm-w1 .e{font-size:42px;line-height:1}.hm-w1 .tt{font-size:40px;font-weight:800;color:var(--text);line-height:1}.hm-w1 .ds{font-size:13px;color:var(--mut);line-height:1.35;margin-top:4px}.hm-w1 .lc{margin-left:auto;font-size:12px;color:var(--mut);text-align:right}.hm-fc{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px}.hm-fc div{background:var(--bg);border-radius:14px;padding:9px 4px;text-align:center}.hm-fc small{display:block;font-size:11px;color:var(--mut);font-weight:600}.hm-fc .e{font-size:22px;margin:3px 0}.hm-fc b{display:block;font-size:15px;color:var(--text)}.hm-fc span{font-size:11px;color:var(--mut)}"+
".hm-rc{display:flex;align-items:center;gap:14px;width:100%;border:0;background:none;padding:0;text-align:left;font-family:inherit;color:var(--text)}.hm-rc .im{width:62px;height:62px;border-radius:18px;background:var(--accbg);display:flex;align-items:center;justify-content:center;font-size:32px;flex:none}.hm-rc small{display:block;font-size:11px;font-weight:800;letter-spacing:.06em;color:var(--mut)}.hm-rc b{display:block;font-size:18px;font-weight:800;margin:3px 0}.hm-rc span{font-size:12px;color:var(--mut)}"+
".hm-cu small{display:block;font-size:11px;font-weight:800;letter-spacing:.06em;color:var(--mut)}.hm-cu .r{display:flex;align-items:center;justify-content:space-between;margin-top:6px}.hm-cu .v{font-size:32px;font-weight:800;color:var(--text)}.hm-cu .v small{display:inline;font-size:15px;color:var(--mut);letter-spacing:0;font-weight:600}.hm-cu .d{font-size:12px;font-weight:700;padding:5px 10px;border-radius:10px}.hm-cu .d.up{background:var(--accbg);color:var(--acc)}.hm-cu .d.dn{background:rgba(214,69,69,.12);color:var(--dn)}"+
".hm-bar{position:fixed;left:0;right:0;bottom:0;z-index:60;display:flex;justify-content:space-around;padding:8px 8px calc(8px + env(safe-area-inset-bottom,0px));background:var(--card);border-top:1px solid var(--line);box-shadow:0 -6px 20px rgba(0,0,0,.06)}.hm-bar.kb{display:none}.hm-bar button{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;border:0;background:none;color:var(--mut);font-size:11px;font-weight:600;font-family:inherit;padding:0}.hm-bar button i{font-style:normal;font-size:19px;width:52px;height:30px;border-radius:15px;display:flex;align-items:center;justify-content:center;filter:grayscale(1) opacity(.65)}.hm-bar button.on{color:var(--acc);font-weight:700}.hm-bar button.on i{background:var(--accbg);filter:none}";
document.head.appendChild(css);

/* ---------- tuzilma ---------- */
var tg=window.Telegram&&window.Telegram.WebApp;
var root=document.createElement("div");root.id="hm";home.insertBefore(root,home.firstChild);
root.innerHTML='<div class="hm-top"><div class="hm-logo">☪</div><div class="hm-ti"><small id="hmg"></small><b id="hmt"></b></div><button class="hm-ch" id="hmth" aria-label="theme"></button><button class="hm-ch" id="hmlg"></button><button class="hm-ch" id="hmdt"></button></div>'+
 '<div class="hm-hero" id="hmh"><div class="hm-d" id="hmd"></div><div class="hm-hi" id="hmhi"></div><div class="hm-nx" id="hmnx"><div class="l"><small id="hmns"></small><span id="hmnl"></span></div><div class="t" id="hmnt"></div></div></div>'+
 '<div class="hm-grid" id="hmg2"></div><div id="hmbn"></div><div id="hmw"></div>';
var grid=$("hmg2");
var tiles=[],byKey={};
function colorOf(t){
  var cs=getComputedStyle(t),src=(cs.backgroundImage&&cs.backgroundImage!=="none"?cs.backgroundImage:cs.backgroundColor)||"",m=src.match(/rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)/);
  return m?[+m[1],+m[2],+m[3]]:[31,138,112];
}
function adopt(t){
  if(t.__hm)return;t.__hm=1;
  var c=colorOf(t);t.style.setProperty("--tcb","rgba("+c[0]+","+c[1]+","+c[2]+",.16)");
  t.__k=keyOf(t);tiles.push(t);if(t.__k)byKey[t.__k]=t;
  t.addEventListener("click",function(){lastKey=t.__k||null;setTimeout(syncBar,30)},true);
}
function allTiles(){return Array.prototype.filter.call(document.querySelectorAll(".tile"),function(t){var s=t.closest&&t.closest(".sec");return !s||s.id==="home"})}
var swT=null;
function sweep(){
  var oldm=$("menu2");
  if(oldm&&oldm.parentNode){Array.prototype.forEach.call(oldm.querySelectorAll(".tile"),function(t){og.appendChild(t)});oldm.parentNode.removeChild(oldm)}
  var l=allTiles();for(var i=0;i<l.length;i++)adopt(l[i]);
  tiles.sort(function(a,b){var x=ORDER.indexOf(a.__k),y=ORDER.indexOf(b.__k);return (x<0?99:x)-(y<0?99:y)});
  tiles.forEach(function(t,i){if(grid.children[i]!==t)grid.insertBefore(t,grid.children[i]||null);t.style.display=""});
}
function sweepLater(){clearTimeout(swT);swT=setTimeout(sweep,40)}
var lastKey=null;
sweep();
try{new MutationObserver(sweepLater).observe(home,{childList:true,subtree:true})}catch(e){}
try{new MutationObserver(sweepLater).observe(document.body,{childList:true})}catch(e){}

/* eski sarlavhani yashirish */
function hideOld(){
  function up(el){
    if(!el)return;var a=el;
    while(a.parentElement&&a.parentElement!==home&&a.parentElement!==document.body){
      if(a.classList&&a.classList.contains("sec"))return;a=a.parentElement;
    }
    if(a.classList&&a.classList.contains("sec")&&a.id!=="home")return;
    if(a===home||a.contains(root)||a===root)return;
    var s=a.closest?a.closest(".sec"):null;if(s&&s.id!=="home")return;
    a.style.setProperty("display","none","important");
  }
  up($("date"));
  Array.prototype.forEach.call(document.querySelectorAll("h1,.lang"),function(e){var s=e.closest(".sec");if((!s||s.id==="home")&&!root.contains(e))up(e)});
}
/* sarlavha, sana, hero */
function hijri(d){
  try{var parts=new Intl.DateTimeFormat("en-u-ca-islamic-umalqura",{day:"numeric",month:"numeric",year:"numeric"}).formatToParts(d),o={};parts.forEach(function(p){o[p.type]=p.value});
    return parseInt(o.day,10)+"-"+pa("hm")[parseInt(o.month,10)-1]+" "+parseInt(o.year,10);}catch(e){return ""}
}
function head(){
  var d=new Date(),h=d.getHours(),gi=h<5?0:h<11?1:h<17?2:h<22?3:0,T0=(typeof T!=="undefined"&&T[lg()])||null;
  $("hmg").textContent=pa("g")[gi];
  $("hmt").textContent=T0&&T0.title?T0.title:"Jalaquduq ovozi";
  var L=lg();$("hmlg").textContent=L==="uz"?"UZ":L==="oz"?"ЎЗ":"RU";
  var mo=T0&&T0.mo?T0.mo[d.getMonth()]:"";$("hmdt").textContent=d.getDate()+(L==="ru"?" ":"-")+mo.slice(0,3);
  var nm="";try{var u=tg&&tg.initDataUnsafe&&tg.initDataUnsafe.user;if(u&&u.first_name)nm=u.first_name.slice(0,14)}catch(e){}
  $("hmhi").textContent=pk("hello")+(nm?", "+nm:"")+"!";
  var full=pa("wd")[d.getDay()]+", "+d.getDate()+(L==="ru"?" ":"-")+(T0&&T0.mo?T0.mo[d.getMonth()]:"")+" · "+hijri(d);
  $("hmd").textContent=full;
  $("hmns").textContent=pk("next");
  $("hmth").textContent=(document.documentElement.getAttribute("data-theme")==="dark"||(!document.documentElement.getAttribute("data-theme")&&window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches))?"☀️":"🌙";
}
function nextP(){
  var nn=$("nn"),nl=$("nl");if(!nn)return;
  var s=(nn.textContent||"").trim(),m=s.match(/^(.*?)\s*(\d{1,2}:\d{2})$/);
  $("hmnt").textContent=m?m[2]:"";
  $("hmnl").textContent=(m?m[1]:s)+(nl&&nl.textContent?" – "+nl.textContent:"");
}
$("hmnx").onclick=function(){var b=$("bn");if(b)b.click();lastKey="namoz";setTimeout(syncBar,30)};
["nn","nl"].forEach(function(id){var e=$(id);if(e)try{new MutationObserver(nextP).observe(e,{childList:true,characterData:true,subtree:true})}catch(x){}});
$("hmlg").onclick=function(){
  var order=["uz","oz","ru"],i=order.indexOf(lg()),nx=order[(i+1)%3],b=document.querySelector('.lang button[data-l="'+nx+'"]');
  if(b)b.click();setTimeout(refresh,0);
};
$("hmth").onclick=function(){
  var cur=document.documentElement.getAttribute("data-theme"),dark=cur==="dark"||(!cur&&window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches),nx=dark?"light":"dark";
  document.documentElement.setAttribute("data-theme",nx);try{localStorage.setItem("hm_theme",nx)}catch(e){}head();
};
try{var th=localStorage.getItem("hm_theme");if(th)document.documentElement.setAttribute("data-theme",th)}catch(e){}

/* keng bannerlar */
var BN=[["prava","🚗","linear-gradient(120deg,#b45309,#d97706)"],["viktorina","🧠","linear-gradient(120deg,#4c1d95,#7c3aed)"],["xarajat","💰","linear-gradient(120deg,#065f46,#059669)"]];
function banners(){
  var h="";BN.forEach(function(b){if(!byKey[b[0]])return;var t=(lg()==="ru"?UI.ru.b[b[0]]:UI.uz.b[b[0]]);if(lg()==="oz")t=t.map(cyr);
    h+='<button class="hm-bn" data-bk="'+b[0]+'" style="background:'+b[2]+'"><i>'+b[1]+'</i><div><b>'+esc(t[0])+'</b><span>'+esc(t[1])+'</span></div><em>→</em></button>'});
  $("hmbn").innerHTML=h;
  Array.prototype.forEach.call($("hmbn").querySelectorAll("[data-bk]"),function(b){b.onclick=function(){var t=byKey[b.getAttribute("data-bk")];if(t)t.click()}});
}

/* vidjetlar */
var WX=null;
function wico(c){return c===0?"☀️":c<=2?"⛅":c===3?"☁️":(c>=45&&c<=48)?"🌫️":(c>=51&&c<=67)||(c>=80&&c<=82)?"🌧️":(c>=71&&c<=77)||c===85||c===86?"❄️":c>=95?"⛈️":"⛅"}
function wdesc(c){try{var w=WC&&WC[c];if(w)return w[T[lg()].i]}catch(e){}return ""}
function drawW(){
  var box=$("hmw1");if(!box)return;
  if(!WX){box.innerHTML="";return}
  var wd=pa("wd"),h='<div class="hm-w1"><div class="e">'+wico(WX.c)+'</div><div><div class="tt">'+Math.round(WX.t)+'°</div><div class="ds">'+esc(wdesc(WX.c))+(wdesc(WX.c)?" · ":"")+pk("wind")+" "+Math.round(WX.w)+" "+pk("kmh")+'</div></div><div class="lc">'+pk("loc")+'</div></div><div class="hm-fc">';
  WX.d.forEach(function(x,i){var dt=new Date(x.date+"T12:00:00"),nm=i===0?pk("today"):i===1?pk("tmr"):wd[dt.getDay()].slice(0,3);
    h+='<div><small>'+esc(nm)+'</small><div class="e">'+wico(x.c)+'</div><b>'+Math.round(x.mx)+'°</b><span>'+Math.round(x.mn)+'°</span></div>'});
  box.innerHTML=h+'</div>';
}
function loadW(){
  fetch("https://api.open-meteo.com/v1/forecast?latitude=40.72&longitude=72.62&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=3")
  .then(function(r){return r.json()}).then(function(j){
    WX={t:j.current.temperature_2m,c:j.current.weather_code,w:j.current.wind_speed_10m,d:j.daily.time.map(function(x,i){return {date:x,c:j.daily.weather_code[i],mx:j.daily.temperature_2m_max[i],mn:j.daily.temperature_2m_min[i]}})};drawW();
  }).catch(function(){});
}
function recipe(){
  var box=$("hmr");if(!box)return;
  var R=window.TAOM;if(!R||!R.length){box.style.display="none";var sh=$("hmrh");if(sh)sh.style.display="none";return}
  var d=new Date(),h=d.getHours(),mi=h<11?0:h<17?1:2,day=Math.floor(d.getTime()/864e5),i=(day*7+mi*5)%R.length,r=R[i],L=lg(),nm=L==="ru"?r.n[1]:(L==="oz"?cyr(r.n[0]):r.n[0]);
  box.innerHTML='<button class="hm-rc" id="hmrb"><div class="im">'+r.e+'</div><div><small>'+esc(pa("meal")[mi])+'</small><b>'+esc(nm)+'</b><span>'+r.t+' '+pk("min")+' · '+r.s+' '+pk("pers")+'</span></div></button>';
  $("hmrb").onclick=function(){if(window.TAOMOPEN)window.TAOMOPEN(i);else if(byKey.taom)byKey.taom.click();lastKey="taom";setTimeout(syncBar,30)};
}
function nf(n,d){return n.toLocaleString("ru-RU",{maximumFractionDigits:d})}
function cur(){
  var box=$("hmc");if(!box)return;
  var cd=window.curData,u=cd&&cd.list&&cd.list.filter(function(x){return x.k==="USD"})[0];
  if(!u){box.innerHTML="";return}
  box.innerHTML='<div class="hm-cu"><small>'+pk("usd1")+'</small><div class="r"><div class="v">'+nf(u.rate,2)+' <small>'+pk("som")+'</small></div><div class="d '+(u.d>=0?"up":"dn")+'">'+(u.d>=0?"▲ +":"▼ ")+nf(u.d,2)+'</div></div></div>';
}
function widgets(){
  $("hmw").innerHTML=
   '<div class="hm-sh"><b>'+pk("wx")+'</b><button id="hmwm">'+pk("wxMore")+'</button></div><div class="hm-c" id="hmw1"></div>'+
   '<div class="hm-sh" id="hmrh"><b>'+pk("cook")+'</b><button id="hmra">'+pk("all")+'</button></div><div class="hm-c" id="hmr"></div>'+
   '<div class="hm-sh"><b>'+pk("usd")+'</b><button id="hmcv">'+pk("conv")+'</button></div><div class="hm-c" id="hmc"></div>';
  $("hmwm").onclick=function(){if(byKey.obhavo)byKey.obhavo.click();lastKey="obhavo";setTimeout(syncBar,30)};
  $("hmra").onclick=function(){if(byKey.taom)byKey.taom.click();lastKey="taom";setTimeout(syncBar,30)};
  $("hmcv").onclick=function(){if(byKey.valyuta)byKey.valyuta.click();lastKey="valyuta";setTimeout(syncBar,30)};
  drawW();recipe();cur();
}

/* pastki panel */
var TABS=[["home","🏠","asosiy"],["namoz","🕌","namoz"],["taom","🍽️","taom"],["valyuta","💱","valyuta"],["viktorina","🧠","viktorina"]];
var bar=document.createElement("div");bar.className="hm-bar";document.body.appendChild(bar);
function drawBar(){
  bar.innerHTML=TABS.map(function(t){return '<button data-t="'+t[0]+'"><i>'+t[1]+'</i><span>'+esc(pk(t[2]))+'</span></button>'}).join("");
  Array.prototype.forEach.call(bar.querySelectorAll("button"),function(b){b.onclick=function(){
    var k=b.getAttribute("data-t");
    if(k==="home"){lastKey=null;if(typeof show==="function")show("home")}
    else{var t=byKey[k];if(t)t.click()}
    setTimeout(syncBar,30);
  }});
  syncBar();
}
function syncBar(){
  var on=document.querySelector(".sec.on"),isHome=!on||on.id==="home",act=isHome?"home":lastKey;
  Array.prototype.forEach.call(bar.querySelectorAll("button"),function(b){b.classList.toggle("on",b.getAttribute("data-t")===act)});
}
try{var mo=new MutationObserver(syncBar);mo.observe(document.body,{attributes:true,subtree:true,attributeFilter:["class"],childList:true})}catch(e){}
document.addEventListener("focusin",function(e){if(/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))bar.classList.add("kb")});
document.addEventListener("focusout",function(){setTimeout(function(){var a=document.activeElement;if(!a||!/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))bar.classList.remove("kb")},50)});

function refresh(){hideOld();head();nextP();banners();widgets();drawBar()}
refresh();loadW();
var tries=0,iv=setInterval(function(){cur();if(window.curData||++tries>40)clearInterval(iv)},500);
setInterval(function(){head();nextP();recipe()},60000);
var lb=document.querySelectorAll(".lang button");
for(var i=0;i<lb.length;i++)lb[i].addEventListener("click",function(){setTimeout(refresh,0)});
setTimeout(function(){sweep();banners();recipe()},1200);
})();
