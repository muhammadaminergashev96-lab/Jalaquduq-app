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
function tr(s){return LANG==="oz"?cyr(s):s}
var UI={
uz:{tile:"Qibla",tileS:"Hijriy kalendar",title:"Qibla va kalendar",tq:"Qibla",tc:"Hijriy kalendar",
 place:"Joylashuv",def:"Jalaquduq (standart)",gps:"Joylashuvimni aniqlash",finding:"Aniqlanmoqda…",gpsErr:"Joylashuv aniqlanmadi. Telefonda joylashuvga ruxsat bering.",
 bearing:"Qibla yo‘nalishi",deg:"shimoldan soat mili bo‘yicha",dist:"Ka’bagacha",km:"km",
 compass:"Kompasni yoqish",compassOn:"Kompas ishlayapti. Telefonni tekis ushlang.",compassNo:"Bu telefonda kompas ishlamadi. Yuqoridagi burchak bo‘yicha shimolga nisbatan yo‘nalishni toping.",
 hintC:"Yashil o‘q qiblani ko‘rsatadi. Metall buyumlardan uzoqroq turing.",
 hintS:"Kompas bo‘lmasa, telefonning kompas ilovasida shimolni toping va shu burchakka buriling.",
 today:"Bugun",key:"Muhim kunlar",note:"Hijriy sana Umm al-Qura hisobi bo‘yicha. O‘zbekistonda oy ko‘rinishiga qarab 1 kunga farq qilishi mumkin, aniq sana uchun Musulmonlar idorasi e’loniga qarang.",
 wd:["Du","Se","Ch","Pa","Ju","Sh","Ya"],
 mo:["Muharram","Safar","Rabiul avval","Rabiul oxir","Jumodul avval","Jumodul oxir","Rajab","Sha’bon","Ramazon","Shavvol","Zulqa’da","Zulhijja"],
 k:{1:"Hijriy yangi yil",9:"Ramazon boshlanishi",10:"Ro‘za hayit",12:"Arafa kuni",13:"Qurbon hayit"},
 days:"kun qoldi",is:"Bugun!",year:"yil",tmr:"Ertaga"},
ru:{tile:"Кибла",tileS:"Календарь хиджры",title:"Кибла и календарь",tq:"Кибла",tc:"Календарь хиджры",
 place:"Местоположение",def:"Жалакудук (по умолчанию)",gps:"Определить место",finding:"Определяем…",gpsErr:"Не удалось определить место. Разрешите доступ к геолокации.",
 bearing:"Направление киблы",deg:"от севера по часовой стрелке",dist:"До Каабы",km:"км",
 compass:"Включить компас",compassOn:"Компас работает. Держите телефон ровно.",compassNo:"Компас на этом телефоне не работает. Найдите направление по углу выше относительно севера.",
 hintC:"Зелёная стрелка указывает на киблу. Держитесь подальше от металла.",
 hintS:"Если компаса нет, найдите север в приложении «Компас» и повернитесь на этот угол.",
 today:"Сегодня",key:"Важные дни",note:"Дата хиджры по расчёту Умм аль-Кура. В Узбекистане из-за наблюдения за луной может отличаться на 1 день, уточняйте в объявлении Управления мусульман.",
 wd:["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],
 mo:["Мухаррам","Сафар","Раби уль-авваль","Раби уль-ахир","Джумада уль-уля","Джумада уль-ахира","Раджаб","Шаабан","Рамадан","Шавваль","Зуль-каада","Зуль-хиджа"],
 k:{1:"Новый год хиджры",9:"Начало Рамадана",10:"Ураза-байрам",12:"День Арафа",13:"Курбан-байрам"},
 days:"дн. осталось",is:"Сегодня!",year:"год",tmr:"Завтра"}
};
function P(k){return LANG==="ru"?UI.ru[k]:UI.uz[k]}
function p(k){var v=P(k);return typeof v==="string"?(LANG==="oz"?cyr(v):v):v}
function $(id){return document.getElementById(id)}

/* ---------- qibla ---------- */
var KA={lat:21.422487,lng:39.826206},R=Math.PI/180;
function bearing(la,ln){
  var f1=la*R,f2=KA.lat*R,dl=(KA.lng-ln)*R;
  var y=Math.sin(dl)*Math.cos(f2),x=Math.cos(f1)*Math.sin(f2)-Math.sin(f1)*Math.cos(f2)*Math.cos(dl);
  return (Math.atan2(y,x)/R+360)%360;
}
function dist(la,ln){
  var f1=la*R,f2=KA.lat*R,dl=(KA.lng-ln)*R,dp=f2-f1;
  var a=Math.sin(dp/2)*Math.sin(dp/2)+Math.cos(f1)*Math.cos(f2)*Math.sin(dl/2)*Math.sin(dl/2);
  return 6371*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
var loc={lat:40.72,lng:72.62,name:"def"},heading=null,compassOn=false;
try{var sv=JSON.parse(localStorage.getItem("qloc")||"null");if(sv&&typeof sv.lat==="number")loc=sv}catch(e){}

/* ---------- hijri ---------- */
var cal="islamic-umalqura";
function hij(d){
  try{
    var f=new Intl.DateTimeFormat("en-u-ca-"+cal+"-nu-latn",{day:"numeric",month:"numeric",year:"numeric"}),o={};
    f.formatToParts(d).forEach(function(x){o[x.type]=x.value});
    var y=parseInt(o.year,10),m=parseInt(o.month,10),dd=parseInt(o.day,10);
    if(isNaN(y)||isNaN(m)||isNaN(dd))return null;
    return {y:y,m:m,d:dd};
  }catch(e){return null}
}
function noon(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate(),12)}
function addDays(d,n){var x=new Date(d.getTime());x.setDate(x.getDate()+n);return noon(x)}
function fmt(d){return d.getDate()+" "+(LANG==="ru"?["янв","фев","мар","апр","мая","июн","июл","авг","сен","окт","ноя","дек"]:["yan","fev","mar","apr","may","iyn","iyl","avg","sen","okt","noy","dek"].map(function(s){return LANG==="oz"?cyr(s):s}))[d.getMonth()]+" "+d.getFullYear()}

var css=document.createElement("style");
css.textContent=".qb-tabs{display:flex;gap:6px;background:var(--line);padding:4px;border-radius:14px;margin:8px 0 12px}.qb-tabs button{flex:1;padding:10px;border-radius:11px;border:0;background:transparent;color:var(--mut);font-weight:700;font-size:15px;font-family:inherit}.qb-tabs button.on{background:var(--acc);color:#fff}.qb-dial{position:relative;width:250px;max-width:75vw;aspect-ratio:1;margin:12px auto;border-radius:50%;border:3px solid var(--line);background:var(--card)}.qb-dial .n{position:absolute;top:6px;left:50%;transform:translateX(-50%);font-weight:800;font-size:14px;color:var(--mut)}.qb-arrow{position:absolute;inset:0;transition:transform .15s linear}.qb-arrow:before{content:'';position:absolute;left:50%;top:12%;width:0;height:0;transform:translateX(-50%);border-left:14px solid transparent;border-right:14px solid transparent;border-bottom:70px solid var(--acc)}.qb-arrow:after{content:'🕋';position:absolute;left:50%;top:1%;transform:translateX(-50%);font-size:22px}.qb-c{position:absolute;left:50%;top:50%;width:14px;height:14px;margin:-7px;border-radius:50%;background:var(--text)}.qb-big{text-align:center;font-size:30px;font-weight:800;color:var(--acc)}.qb-btn{display:block;width:100%;padding:13px;border:0;border-radius:12px;background:var(--accbg);color:var(--acc);font-weight:700;font-size:15px;margin-top:8px;font-family:inherit}.qb-hd{text-align:center;padding:10px 0}.qb-hd b{display:block;font-size:26px}.qb-hd span{color:var(--mut);font-size:14px}.qb-g{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:8px}.qb-g div{aspect-ratio:1;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--bg);font-weight:700;font-size:15px}.qb-g div small{font-size:10px;color:var(--mut);font-weight:500}.qb-g .h{background:transparent;aspect-ratio:auto;color:var(--mut);font-size:12px;font-weight:700}.qb-g .t{background:var(--acc);color:#fff}.qb-g .t small{color:#fff}.qb-g .e{background:transparent}.qb-k{display:flex;justify-content:space-between;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);font-size:15px}.qb-k:last-child{border:0}.qb-k small{display:block;color:var(--mut)}.qb-k .r{text-align:right;color:var(--acc);font-weight:700;white-space:nowrap}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="qibla";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#047857,#065f46)";
document.querySelector(".grid").appendChild(tile);
var tab="q";
function updTile(){
  var h=hij(new Date()),s=p("tileS");
  if(h&&h.m>=1&&h.m<=12)s=h.d+" "+p("mo")[h.m-1];
  tile.innerHTML='<div class="ic">🧭</div><b>'+p("tile")+'</b><span>'+s+'</span>';
}
function onOrient(e){
  var h=null;
  if(typeof e.webkitCompassHeading==="number")h=e.webkitCompassHeading;
  else if(e.absolute&&typeof e.alpha==="number")h=(360-e.alpha)%360;
  else if(typeof e.alpha==="number"&&e.type==="deviceorientationabsolute")h=(360-e.alpha)%360;
  if(h===null)return;heading=h;compassOn=true;arrow();
  var m=$("qmsg");if(m)m.textContent=p("compassOn");
}
function arrow(){
  var a=$("qar");if(!a)return;
  var b=bearing(loc.lat,loc.lng),rot=compassOn&&heading!==null?b-heading:b;
  a.style.transform="rotate("+rot+"deg)";
}
function startCompass(){
  var m=$("qmsg");
  function attach(){
    window.addEventListener("deviceorientationabsolute",onOrient,true);
    window.addEventListener("deviceorientation",onOrient,true);
    setTimeout(function(){if(!compassOn&&$("qmsg"))$("qmsg").textContent=p("compassNo")},2500);
  }
  try{
    if(typeof DeviceOrientationEvent!=="undefined"&&typeof DeviceOrientationEvent.requestPermission==="function"){
      DeviceOrientationEvent.requestPermission().then(function(r){if(r==="granted")attach();else if(m)m.textContent=p("compassNo")}).catch(function(){if(m)m.textContent=p("compassNo")});
    }else attach();
  }catch(e){if(m)m.textContent=p("compassNo")}
}
function locate(){
  var m=$("qmsg");if(m)m.textContent=p("finding");
  if(!navigator.geolocation){if(m)m.textContent=p("gpsErr");return}
  navigator.geolocation.getCurrentPosition(function(pos){
    loc={lat:pos.coords.latitude,lng:pos.coords.longitude,name:"gps"};
    try{localStorage.setItem("qloc",JSON.stringify(loc))}catch(e){}
    draw();
  },function(){var mm=$("qmsg");if(mm)mm.textContent=p("gpsErr")},{timeout:12000,maximumAge:600000});
}
function qiblaHtml(){
  var b=bearing(loc.lat,loc.lng),d=Math.round(dist(loc.lat,loc.lng));
  return '<div class="sub" style="margin:0 0 4px;text-align:center">'+p("place")+': '+(loc.name==="gps"?loc.lat.toFixed(3)+', '+loc.lng.toFixed(3):p("def"))+'</div>'+
  '<div class="qb-big">'+Math.round(b)+'°</div><div class="sub" style="text-align:center;margin:0">'+p("bearing")+' ('+p("deg")+')</div>'+
  '<div class="qb-dial"><span class="n">N</span><div class="qb-arrow" id="qar" style="transform:rotate('+b+'deg)"></div><div class="qb-c"></div></div>'+
  '<div class="sub" style="text-align:center;margin:0">'+p("dist")+': '+d.toLocaleString("ru-RU")+' '+p("km")+'</div>'+
  '<button class="qb-btn" id="qcomp">🧭 '+p("compass")+'</button><button class="qb-btn" id="qgps">📍 '+p("gps")+'</button>'+
  '<div class="sub" id="qmsg" style="margin:10px 0 0;text-align:center">'+p("hintS")+'</div>';
}
function calHtml(){
  var now=noon(new Date()),h=hij(now);
  if(!h)return '<div class="sub">—</div>';
  var mo=p("mo"),first=addDays(now,-(h.d-1)),out='';
  out+='<div class="qb-hd"><b>'+h.d+' '+mo[h.m-1]+' '+h.y+'</b><span>'+fmt(now)+'</span></div>';
  var wdn=p("wd"),off=(first.getDay()+6)%7,g='<div class="qb-g">';
  wdn.forEach(function(x){g+='<div class="h">'+x+'</div>'});
  for(var i=0;i<off;i++)g+='<div class="e"></div>';
  for(var k=0;k<30;k++){
    var dd=addDays(first,k),hh=hij(dd);
    if(!hh||hh.m!==h.m)break;
    g+='<div class="'+(hh.d===h.d?'t':'')+'">'+hh.d+'<small>'+dd.getDate()+'</small></div>';
  }
  g+='</div>';out+='<div class="sub" style="margin:8px 0 0;text-align:center">'+mo[h.m-1]+' '+h.y+'</div>'+g;
  var ev=[];
  var want2=[[1,1,1],[9,1,9],[10,1,10],[12,9,12],[12,10,13]];
  for(var n=0;n<400;n++){
    var d2=addDays(now,n),h2=hij(d2);if(!h2)continue;
    for(var w=0;w<want2.length;w++){
      var q=want2[w];
      if(h2.m===q[0]&&h2.d===q[1]&&!ev[w]){ev[w]={d:d2,k:q[2]}}
    }
  }
  var lst=[];
  ev.forEach(function(e){if(e)lst.push(e)});
  lst.sort(function(a,b){return a.d-b.d});
  out+='<div class="hq-h" style="font-size:13px;color:var(--mut);margin:16px 0 4px;font-weight:700;text-transform:uppercase">'+p("key")+'</div>';
  lst.forEach(function(e){
    var left=Math.round((e.d-now)/864e5),r=left===0?p("is"):left===1?p("tmr"):left+' '+p("days");
    out+='<div class="qb-k"><div>'+p("k")[e.k]+'<small>'+fmt(e.d)+'</small></div><div class="r">'+r+'</div></div>';
  });
  out+='<div class="sub" style="margin:12px 0 0">'+p("note")+'</div>';
  return out;
}
function draw(){
  sec.innerHTML='<button class="back" id="qb0">← '+T[LANG].back+'</button><div class="card"><h2>'+p("title")+'</h2><div class="qb-tabs"><button data-t="q" class="'+(tab==="q"?'on':'')+'">'+p("tq")+'</button><button data-t="c" class="'+(tab==="c"?'on':'')+'">'+p("tc")+'</button></div>'+(tab==="q"?qiblaHtml():calHtml())+'</div>';
  $("qb0").addEventListener("click",function(){show("home")});
  var ts=sec.querySelectorAll("[data-t]");for(var i=0;i<ts.length;i++)ts[i].addEventListener("click",function(){tab=this.getAttribute("data-t");draw()});
  if(tab==="q"){$("qcomp").addEventListener("click",startCompass);$("qgps").addEventListener("click",locate);arrow();if(compassOn&&$("qmsg"))$("qmsg").textContent=p("compassOn")}
}
tile.addEventListener("click",function(){draw();show("qibla")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();if(sec.classList.contains("on"))draw()})}
updTile();draw();
})();
