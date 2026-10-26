(function(){
var P={
 uz:{title:"Ob-havo",loc:"📍 Joylashuvim",ph:"Shahar nomini yozing",feels:"His qilinadi",hum:"Namlik",wind:"Shamol",kmh:"km/soat",hourly:"Soatlar bo‘yicha",weekly:"7 kunlik prognoz",today:"Bugun",loading:"Yuklanmoqda…",err:"Ob-havo yuklanmadi. Internetni tekshiring.",locating:"Joylashuv aniqlanmoqda…",noloc:"Joylashuvga ruxsat berilmadi. Shahar nomini yozib qidiring.",nores:"Topilmadi"},
 oz:{title:"Об-ҳаво",loc:"📍 Жойлашувим",ph:"Шаҳар номини ёзинг",feels:"Ҳис қилинади",hum:"Намлик",wind:"Шамол",kmh:"км/соат",hourly:"Соатлар бўйича",weekly:"7 кунлик прогноз",today:"Бугун",loading:"Юкланмоқда…",err:"Об-ҳаво юкланмади. Интернетни текширинг.",locating:"Жойлашув аниқланмоқда…",noloc:"Жойлашувга рухсат берилмади. Шаҳар номини ёзиб қидиринг.",nores:"Топилмади"},
 ru:{title:"Погода",loc:"📍 Моё местоположение",ph:"Введите название города",feels:"Ощущается",hum:"Влажность",wind:"Ветер",kmh:"км/ч",hourly:"По часам",weekly:"Прогноз на 7 дней",today:"Сегодня",loading:"Загрузка…",err:"Погода не загрузилась. Проверьте интернет.",locating:"Определяем местоположение…",noloc:"Нет доступа к местоположению. Найдите город по названию.",nores:"Не найдено"}
};
var GN={uz:"Jalaquduq",oz:"Жалақудуқ",ru:"Жалакудук"};
var DW={uz:["Yakshanba","Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"],oz:["Якшанба","Душанба","Сешанба","Чоршанба","Пайшанба","Жума","Шанба"],ru:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]};
var G=[
 ["☀️",["Ochiq","Очиқ","Ясно"]],
 ["🌤️",["Asosan ochiq","Асосан очиқ","Преимущественно ясно"]],
 ["⛅",["Qisman bulutli","Қисман булутли","Переменная облачность"]],
 ["☁️",["Bulutli","Булутли","Пасмурно"]],
 ["🌫️",["Tuman","Туман","Туман"]],
 ["🌦️",["Mayda yomg‘ir","Майда ёмғир","Морось"]],
 ["🌧️",["Yomg‘ir","Ёмғир","Дождь"]],
 ["❄️",["Qor","Қор","Снег"]],
 ["⛈️",["Momaqaldiroq","Момақалдироқ","Гроза"]]
];
function gi(c){return c===0?0:c===1?1:c===2?2:c===3?3:(c===45||c===48)?4:(c>=51&&c<=57)?5:((c>=61&&c<=67)||(c>=80&&c<=82))?6:((c>=71&&c<=77)||c===85||c===86)?7:c>=95?8:3}
function li(){return LANG==="oz"?1:LANG==="ru"?2:0}
function p(k){return (P[LANG]||P.uz)[k]}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function rd(x){return Math.round(x)}
function deg(x){var r=rd(x);return (r>0?"+":"")+r+"°"}

function load(){try{var s=JSON.parse(localStorage.getItem("wxplace"));if(s&&s.lat&&s.lon)return s}catch(e){}return {lat:40.72,lon:72.62,def:true}}
var place=load(),data=null,status="loading",req=0,last=0,timer=null;
function save(){try{localStorage.setItem("wxplace",JSON.stringify(place))}catch(e){}}
function pname(){return place.def?(GN[LANG]||GN.uz):place.name}

var css=document.createElement("style");
css.textContent=".wxh{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px}.wxh b{font-size:20px}.wxb{border:0;background:var(--accbg);color:var(--acc);border-radius:12px;padding:10px 12px;font-size:14px;font-weight:700;font-family:inherit}.wxin{width:100%;font-size:16px;padding:11px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-family:inherit}.wxr{display:block;width:100%;text-align:left;padding:10px 4px;border:0;border-bottom:1px solid var(--line);background:none;color:var(--text);font-size:15px;font-family:inherit}.wxcur{display:flex;align-items:center;gap:16px}.wxt{font-size:48px;font-weight:700}.wxi{font-size:18px;font-weight:600}.hr{display:flex;gap:8px;overflow-x:auto;padding-bottom:6px}.hrc{flex:0 0 auto;min-width:58px;text-align:center;padding:8px 6px;border-radius:12px;background:var(--bg);font-size:13px}.hrc .e{font-size:22px;margin:4px 0}.dy{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);font-size:15px}.dy:last-child{border:0}.dy .n{flex:1}.dy .e{font-size:22px}.dy .pp{width:44px;color:var(--mut);font-size:12px;text-align:right}.dy .tt{width:84px;text-align:right;font-weight:600}.dy .tt span{color:var(--mut);font-weight:400}";
document.head.appendChild(css);

var sec=document.createElement("div");sec.className="sec";sec.id="obhavo";
document.body.appendChild(sec);
var tl=document.querySelector('[data-go="wx"]');
if(tl)tl.setAttribute("data-go","obhavo");
function updTile(){
  if(!tl)return;var s=tl.querySelector("span");
  if(s)s.textContent=pname()+(data&&data.current?" · "+deg(data.current.temperature_2m):"");
}

function build(){
  sec.innerHTML='<button class="back" id="wxback">← '+T[LANG].back+'</button>'+
   '<div class="card"><div class="wxh"><b id="wxname"></b><button class="wxb" id="wxloc">'+p("loc")+'</button></div>'+
   '<input class="wxin" id="wxq" type="text" placeholder="'+esc(p("ph"))+'" autocomplete="off"><div id="wxres"></div><div class="sub" id="wxmsg" style="margin:8px 0 0"></div></div>'+
   '<div id="wxbody"></div>';
  document.getElementById("wxname").textContent=pname();
  document.getElementById("wxback").addEventListener("click",function(){show("home")});
  document.getElementById("wxloc").addEventListener("click",locate);
  var q=document.getElementById("wxq");
  q.addEventListener("input",function(){clearTimeout(timer);var v=q.value.trim();if(v.length<2){document.getElementById("wxres").innerHTML="";return}timer=setTimeout(function(){search(v)},400)});
  drawBody();
}
function msg(t){var m=document.getElementById("wxmsg");if(m)m.textContent=t||""}

function drawBody(){
  var b=document.getElementById("wxbody");if(!b)return;
  if(status==="loading"){b.innerHTML='<div class="card"><div class="sub" style="margin:0">'+p("loading")+'</div></div>';return}
  if(status==="err"||!data){b.innerHTML='<div class="card"><div class="sub" style="margin:0">'+p("err")+'</div></div>';return}
  var c=data.current,g=G[gi(c.weather_code)],ic=(c.is_day===0&&gi(c.weather_code)<=1)?"🌙":g[0];
  var h='<div class="card"><div class="wxcur"><div class="wxt">'+deg(c.temperature_2m)+'</div><div><div class="wxi">'+ic+' '+g[1][li()]+'</div><div class="sub" style="margin:4px 0 0">'+p("feels")+' '+deg(c.apparent_temperature)+' · '+p("hum")+' '+rd(c.relative_humidity_2m)+'%<br>'+p("wind")+' '+rd(c.wind_speed_10m)+' '+p("kmh")+'</div></div></div></div>';
  var H=data.hourly,start=H.time.findIndex(function(t){return t>=c.time.slice(0,13)+":00"});if(start<0)start=0;
  var cells="";
  for(var i=start;i<start+12&&i<H.time.length;i++){cells+='<div class="hrc"><div>'+H.time[i].slice(11,16)+'</div><div class="e">'+G[gi(H.weather_code[i])][0]+'</div><b>'+deg(H.temperature_2m[i])+'</b></div>'}
  h+='<div class="card"><h2>'+p("hourly")+'</h2><div class="hr">'+cells+'</div></div>';
  var D=data.daily,rows="";
  for(var k=0;k<D.time.length;k++){
    var d=D.time[k],dt=new Date(+d.slice(0,4),+d.slice(5,7)-1,+d.slice(8,10)),pr=D.precipitation_probability_max?D.precipitation_probability_max[k]:null;
    rows+='<div class="dy"><span class="n">'+(k===0?p("today"):DW[LANG||"uz"][dt.getDay()])+'<div class="sub" style="margin:0;font-size:12px">'+d.slice(8,10)+'.'+d.slice(5,7)+'</div></span><span class="e">'+G[gi(D.weather_code[k])][0]+'</span><span class="pp">'+(pr!==null&&pr!==undefined?'💧'+rd(pr)+'%':'')+'</span><span class="tt">'+deg(D.temperature_2m_max[k])+' <span>'+deg(D.temperature_2m_min[k])+'</span></span></div>';
  }
  h+='<div class="card"><h2>'+p("weekly")+'</h2>'+rows+'</div>';
  b.innerHTML=h;
}

function fetchWx(){
  var my=++req;status="loading";drawBody();
  var nm=document.getElementById("wxname");if(nm)nm.textContent=pname();
  var u="https://api.open-meteo.com/v1/forecast?latitude="+place.lat+"&longitude="+place.lon+"&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,is_day&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7";
  fetch(u).then(function(r){return r.json()}).then(function(j){
    if(my!==req)return;
    if(!j||!j.current||!j.hourly||!j.daily)throw new Error("bad");
    data=j;status="ok";last=Date.now();drawBody();updTile();
  }).catch(function(){if(my!==req)return;status="err";drawBody()});
}

function search(v){
  fetch("https://geocoding-api.open-meteo.com/v1/search?count=6&format=json&language="+(LANG==="ru"?"ru":"en")+"&name="+encodeURIComponent(v))
  .then(function(r){return r.json()}).then(function(j){
    var el=document.getElementById("wxres");if(!el)return;
    var L=j.results||[];
    el.innerHTML=L.length?L.map(function(x,i){return '<button class="wxr" data-i="'+i+'">'+esc(x.name)+(x.admin1?', '+esc(x.admin1):'')+(x.country?' · '+esc(x.country):'')+'</button>'}).join(""):'<div class="sub" style="margin:8px 0 0">'+p("nores")+'</div>';
    var bs=el.querySelectorAll("[data-i]");
    for(var i=0;i<bs.length;i++)(function(b){b.addEventListener("click",function(){
      var x=L[+b.getAttribute("data-i")];
      place={lat:x.latitude,lon:x.longitude,name:x.name,def:false};save();
      el.innerHTML="";document.getElementById("wxq").value="";msg("");fetchWx();
    })})(bs[i]);
  }).catch(function(){var el=document.getElementById("wxres");if(el)el.innerHTML=""});
}

function revName(lat,lon,cb){
  var fb=lat.toFixed(2)+", "+lon.toFixed(2);
  fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+lat+"&longitude="+lon+"&localityLanguage="+(LANG==="ru"?"ru":"uz"))
  .then(function(r){return r.json()}).then(function(j){cb(j.city||j.locality||j.principalSubdivision||fb)}).catch(function(){cb(fb)});
}
function locate(){
  msg(p("locating"));
  var done=false;
  function ok(lat,lon){if(done)return;done=true;revName(lat,lon,function(n){place={lat:lat,lon:lon,name:n,def:false};save();msg("");fetchWx()})}
  function bad(){if(done)return;done=true;msg(p("noloc"))}
  function browser(){
    if(!navigator.geolocation){bad();return}
    navigator.geolocation.getCurrentPosition(function(pos){ok(pos.coords.latitude,pos.coords.longitude)},function(){bad()},{timeout:12000,maximumAge:600000});
  }
  var LM=tg&&tg.LocationManager;
  if(LM&&LM.init){
    try{LM.init(function(){
      if(LM.isLocationAvailable){LM.getLocation(function(d){if(d&&d.latitude)ok(d.latitude,d.longitude);else browser()})}
      else browser();
    })}catch(e){browser()}
  }else browser();
}

if(tl)tl.addEventListener("click",function(){if(!data||Date.now()-last>600000)fetchWx()});
var lb=document.querySelectorAll(".lang button");
for(var i=0;i<lb.length;i++){lb[i].addEventListener("click",function(){build();updTile()})}
build();fetchWx();
})();
