var tg=window.Telegram&&window.Telegram.WebApp;
try{if(tg){tg.ready();tg.expand();}}catch(e){}

/* MASJID JADVALI: har hafta shu qismni yangilang */
var SCHEDULE=[
 {from:"2026-10-23",to:"2026-10-30",
  t:{Bomdod:["05:20","06:00"],Peshin:["12:30","12:45"],Asr:["15:50","16:00"],Shom:["17:30","17:30"],Xufton:["19:00","19:10"]}}
];
/* JADVAL TUGADI */

var T={
uz:{title:"Jalaquduq ovozi",next:"Keyingi namoz",inn:"{h} soat {m} daqiqadan keyin",tPray:"Namoz vaqtlari",sPray:"Azon va takbir",tWx:"Ob-havo",sWx:"Jalaquduq",tCur:"Valyuta kursi",sCur:"Markaziy bank",tSos:"Shoshilinch",back:"Orqaga",azon:"Azon",takbir:"Takbir",
 noteM:"Masjid jadvali: {a} – {b}. Quyosh vaqti hisoblangan.",noteC:"Hisoblangan vaqtlar, taxminiy (±2 daqiqa).",loading:"Yuklanmoqda…",wxNA:"Ob-havo hozircha mavjud emas.",wind:"Shamol",kmh:"km/soat",curNA:"Kurs hozircha mavjud emas.",som:"so‘m",unit:"1 birlik",units:"{n} birlik",cb:"Markaziy bank kursi",
 s101:"O‘t o‘chirish",s102:"Politsiya",s103:"Tez yordam",s104:"Gaz xizmati",
 p:{Bomdod:"Bomdod",Quyosh:"Quyosh",Peshin:"Peshin",Asr:"Asr",Shom:"Shom",Xufton:"Xufton"},
 mo:["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr"],i:0},
oz:{title:"Жалақудуқ овози",next:"Кейинги намоз",inn:"{h} соат {m} дақиқадан кейин",tPray:"Намоз вақтлари",sPray:"Азон ва такбир",tWx:"Об-ҳаво",sWx:"Жалақудуқ",tCur:"Валюта курси",sCur:"Марказий банк",tSos:"Шошилинч",back:"Орқага",azon:"Азон",takbir:"Такбир",
 noteM:"Масжид жадвали: {a} – {b}. Қуёш вақти ҳисобланган.",noteC:"Ҳисобланган вақтлар, тахминий (±2 дақиқа).",loading:"Юкланмоқда…",wxNA:"Об-ҳаво ҳозирча мавжуд эмас.",wind:"Шамол",kmh:"км/соат",curNA:"Курс ҳозирча мавжуд эмас.",som:"сўм",unit:"1 бирлик",units:"{n} бирлик",cb:"Марказий банк курси",
 s101:"Ўт ўчириш",s102:"Полиция",s103:"Тез ёрдам",s104:"Газ хизмати",
 p:{Bomdod:"Бомдод",Quyosh:"Қуёш",Peshin:"Пешин",Asr:"Аср",Shom:"Шом",Xufton:"Хуфтон"},
 mo:["январь","феврал","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],i:1},
ru:{title:"Голос Жалакудука",next:"Следующий намаз",inn:"через {h} ч {m} мин",tPray:"Время намаза",sPray:"Азан и икама",tWx:"Погода",sWx:"Жалакудук",tCur:"Курс валют",sCur:"Центробанк",tSos:"Экстренные",back:"Назад",azon:"Азан",takbir:"Икама",
 noteM:"Расписание мечети: {a} – {b}. Время восхода рассчитано.",noteC:"Расчётное время, примерно (±2 мин).",loading:"Загрузка…",wxNA:"Погода пока недоступна.",wind:"Ветер",kmh:"км/ч",curNA:"Курс пока недоступен.",som:"сум",unit:"1 ед.",units:"{n} ед.",cb:"Курс Центробанка",
 s101:"Пожарные",s102:"Полиция",s103:"Скорая",s104:"Газовая служба",
 p:{Bomdod:"Фаджр",Quyosh:"Восход",Peshin:"Зухр",Asr:"Аср",Shom:"Магриб",Xufton:"Иша"},
 mo:["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],i:2}
};
var WC={0:["Ochiq","Очиқ","Ясно"],1:["Asosan ochiq","Асосан очиқ","Малооблачно"],2:["Qisman bulutli","Қисман булутли","Переменная облачность"],3:["Bulutli","Булутли","Пасмурно"],45:["Tuman","Туман","Туман"],48:["Tuman","Туман","Туман"],51:["Mayda yomg‘ir","Майда ёмғир","Морось"],61:["Yomg‘ir","Ёмғир","Дождь"],63:["Yomg‘ir","Ёмғир","Дождь"],65:["Kuchli yomg‘ir","Кучли ёмғир","Сильный дождь"],71:["Qor","Қор","Снег"],73:["Qor","Қор","Снег"],75:["Kuchli qor","Кучли қор","Сильный снег"],80:["Jala","Жала","Ливень"],95:["Momaqaldiroq","Момақалдироқ","Гроза"]};

var LANG=null;
try{LANG=localStorage.getItem("lang")}catch(e){}
if(!T[LANG]){var lc=(tg&&tg.initDataUnsafe&&tg.initDataUnsafe.user&&tg.initDataUnsafe.user.language_code)||"";LANG=lc.indexOf("ru")===0?"ru":"uz"}
function t(k){return T[LANG][k]}
function fill(s,o){return s.replace(/\{(\w+)\}/g,function(_,k){return o[k]})}

var LAT=40.72,LNG=72.62,TZ=5,R=Math.PI/180;
function calc(dt){
  var jd=Date.UTC(dt.getFullYear(),dt.getMonth(),dt.getDate(),12)/864e5+2440587.5,n=jd-2451545;
  var L=(280.46+0.9856474*n)%360,g=((357.528+0.9856003*n)%360)*R;
  var lam=(L+1.915*Math.sin(g)+0.02*Math.sin(2*g))*R,eps=(23.439-4e-7*n)*R;
  var dec=Math.asin(Math.sin(eps)*Math.sin(lam));
  var ra=Math.atan2(Math.cos(eps)*Math.sin(lam),Math.cos(lam))/R;
  var eq=((L-ra+540)%360-180)/15;
  var noon=12+TZ-LNG/15-eq;
  function ha(alt){var c=(Math.sin(alt*R)-Math.sin(LAT*R)*Math.sin(dec))/(Math.cos(LAT*R)*Math.cos(dec));return Math.acos(Math.max(-1,Math.min(1,c)))/R/15}
  var asrAlt=Math.atan(1/(2+Math.tan(Math.abs(LAT*R-dec))))/R;
  return [["Bomdod",noon-ha(-16)],["Quyosh",noon-ha(-0.833)],["Peshin",noon+0.03],["Asr",noon+ha(asrAlt)],["Shom",noon+ha(-0.833)+0.02],["Xufton",noon+ha(-15)]];
}
function fmt(h){var m=Math.round(h*60);return String(Math.floor(m/60)%24).padStart(2,"0")+":"+String(m%60).padStart(2,"0")}
function toH(s){var p=s.split(":");return +p[0]+(+p[1])/60}
function ymd(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function dm(s){return s.slice(8,10)+"."+s.slice(5,7)}
function $(id){return document.getElementById(id)}

function renderPray(){
  var now=new Date(),cur=now.getHours()+now.getMinutes()/60+now.getSeconds()/3600;
  var key=ymd(now),s=SCHEDULE.find(function(x){return key>=x.from&&key<=x.to});
  var rows=calc(now).map(function(x){
    if(s&&s.t[x[0]])return {n:x[0],a:toH(s.t[x[0]][0]),k:toH(s.t[x[0]][1])};
    return {n:x[0],a:x[1],k:null};
  });
  $("date").textContent=now.getDate()+" "+t("mo")[now.getMonth()]+" "+now.getFullYear();
  var idx=-1,i;
  for(i=0;i<rows.length;i++){if(rows[i].n!=="Quyosh"&&rows[i].a>cur){idx=i;break}}
  var tm=false;if(idx<0){idx=0;tm=true}
  var diff=rows[idx].a-cur+(tm?24:0),mm=Math.floor(diff*60);
  $("nn").textContent=t("p")[rows[idx].n]+" "+fmt(rows[idx].a);
  $("nl").textContent=fill(t("inn"),{h:Math.floor(mm/60),m:mm%60});
  var head=s?'<div class="row hd"><span></span><span class="c">'+t("azon")+'</span><span class="c">'+t("takbir")+'</span></div>':'';
  $("pt").innerHTML=head+rows.map(function(x,j){
    return '<div class="row'+(j===idx&&!tm?' on':'')+'"><span>'+t("p")[x.n]+'</span><span class="c">'+fmt(x.a)+'</span>'+(s?'<span class="c k">'+(x.k!==null?fmt(x.k):'—')+'</span>':'')+'</div>';
  }).join("");
  $("pnote").textContent=s?fill(t("noteM"),{a:dm(s.from),b:dm(s.to)}):t("noteC");
}

var wxData=null,curData=null,rates={};
function nf(n,d){return n.toLocaleString("ru-RU",{maximumFractionDigits:d})}
function renderWx(){
  if(!wxData){$("wxb").innerHTML='<div class="d">'+(wxData===false?t("wxNA"):t("loading"))+'</div>';return}
  var w=WC[wxData.code];
  $("wxb").innerHTML='<div class="t">'+Math.round(wxData.temp)+'°C</div><div class="d">'+(w?w[T[LANG].i]:"—")+'<br>'+t("wind")+': '+Math.round(wxData.wind)+' '+t("kmh")+'</div>';
}
function calcConv(){
  var c=$("cc").value,a=parseFloat($("amt").value)||0;
  $("res").textContent=rates[c]?nf(a*rates[c].unit,0)+" "+t("som"):"";
}
function renderCur(){
  if(!curData){$("curb").innerHTML='<div class="sub">'+(curData===false?t("curNA"):t("loading"))+'</div>';return}
  var html="";
  curData.list.forEach(function(x){
    html+='<div class="row"><span>'+x.k+'<small class="sub" style="margin:0">'+(x.nom>1?fill(t("units"),{n:x.nom}):t("unit"))+'</small></span><span class="r">'+nf(x.rate,2)+' '+t("som")+'<small class="'+(x.d>=0?'up':'dn')+'">'+(x.d>=0?'▲ +':'▼ ')+nf(x.d,2)+'</small></span></div>';
  });
  $("curb").innerHTML=html;
  if(!$("cc").options.length){$("cc").innerHTML=curData.list.map(function(x){return '<option value="'+x.k+'">'+x.k+'</option>'}).join("")}
  $("cd").textContent=t("cb")+", "+curData.date;
  calcConv();
}

function applyLang(){
  document.documentElement.lang=LANG==="ru"?"ru":"uz";
  document.title=t("title");
  document.querySelectorAll("[data-k]").forEach(function(e){e.textContent=t(e.getAttribute("data-k"))});
  document.querySelectorAll(".lang button").forEach(function(b){b.classList.toggle("on",b.getAttribute("data-l")===LANG)});
  renderPray();renderWx();renderCur();
}
document.querySelectorAll(".lang button").forEach(function(b){b.addEventListener("click",function(){
  LANG=b.getAttribute("data-l");try{localStorage.setItem("lang",LANG)}catch(e){}applyLang();
})});

function show(id){
  document.querySelectorAll(".sec").forEach(function(s){s.classList.toggle("on",s.id===id)});
  window.scrollTo(0,0);
  if(tg&&tg.BackButton){if(id==="home")tg.BackButton.hide();else tg.BackButton.show()}
}
document.querySelectorAll("[data-go]").forEach(function(b){b.addEventListener("click",function(){show(b.getAttribute("data-go"))})});
document.querySelectorAll("[data-back]").forEach(function(b){b.addEventListener("click",function(){show("home")})});
$("bn").addEventListener("click",function(){show("namoz")});
try{if(tg&&tg.BackButton)tg.BackButton.onClick(function(){show("home")})}catch(e){}

fetch("https://api.open-meteo.com/v1/forecast?latitude="+LAT+"&longitude="+LNG+"&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto")
.then(function(r){return r.json()}).then(function(j){
  wxData={temp:j.current.temperature_2m,code:j.current.weather_code,wind:j.current.wind_speed_10m};renderWx();
}).catch(function(){wxData=false;renderWx()});

fetch("https://cbu.uz/uz/arkhiv-kursov-valyut/json/")
.then(function(r){return r.json()}).then(function(list){
  var out=[],dt="";
  ["USD","EUR","RUB","KZT"].forEach(function(k){
    var x=list.find(function(i){return i.Ccy===k});if(!x)return;
    var rate=parseFloat(x.Rate),nom=parseFloat(x.Nominal)||1;
    rates[k]={unit:rate/nom};dt=x.Date;
    out.push({k:k,rate:rate,nom:nom,d:parseFloat(x.Diff)||0});
  });
  curData=out.length?{list:out,date:dt}:false;renderCur();
}).catch(function(){curData=false;renderCur()});
$("amt").addEventListener("input",calcConv);
$("cc").addEventListener("change",calcConv);

applyLang();setInterval(renderPray,30000);
