(function(){
/* MA'LUMOTLAR: har bir bo'limga joylarni shu ko'rinishda qo'shing:
   {n:"Nomi",a:"Manzil",t:"+998901234567",h:"09:00–22:00",g:"40.7821,72.3442",k:"qidiruv so'zlari"}
   g = koordinata (kenglik,uzunlik) — "eng yaqin"ni topish uchun KERAK.
   Koordinata o'rniga m:"Yandex/Google xarita havolasi" ham bo'lsa, undan avtomatik olinadi.
   Qatorlar orasiga vergul qo'yishni unutmang. */
var DATA={
 oshxona:[],
 mehmonxona:[],
 dokon:[],
 dorixona:[],
 shifoxona:[],
 yoqilgi:[],
 boshqa:[]
};
/* MA'LUMOTLAR TUGADI */

/* Qo'lda tanlash uchun tayyor joylar: ["Nomi",kenglik,uzunlik] */
var LOCS=[["Andijon shahri",40.7821,72.3442]];

var CATS=[["oshxona","🍽️"],["mehmonxona","🏨"],["dokon","🛒"],["dorixona","💊"],["shifoxona","🏥"],["yoqilgi","⛽"],["boshqa","📌"]];
var NM={
 oshxona:["Oshxonalar","Ошхоналар","Столовые и кафе"],
 mehmonxona:["Mehmonxonalar","Меҳмонхоналар","Гостиницы"],
 dokon:["Do‘konlar","Дўконлар","Магазины"],
 dorixona:["Dorixonalar","Дорихоналар","Аптеки"],
 shifoxona:["Shifoxonalar","Шифохоналар","Больницы"],
 yoqilgi:["Yoqilg‘i quyish","Ёқилғи қуйиш","АЗС"],
 boshqa:["Boshqalar","Бошқалар","Другое"]
};
var P={
 uz:{tile:"Manzillar",tileS:"Qidiring, eng yaqini",title:"Manzillar",empty:"Hech narsa topilmadi.",call:"Qo‘ng‘iroq",map:"Xaritada",route:"Yo‘l",all:"Hammasi",ph:"Nima qidiryapsiz? (dori, osh, benzin…)",loc:"Joylashuvim",locSet:"Joylashuv belgilandi",locNone:"Joylashuv belgilanmagan — eng yaqinini topish uchun belgilang",find:"Aniqlash",manual:"Qo‘lda kiritish",manualPh:"Koordinata (40.78, 72.34) yoki xarita havolasi",pick:"Ro‘yxatdan tanlash",ok:"Saqlash",clear:"Tozalash",err:"Joylashuvni aniqlab bo‘lmadi. Qo‘lda kiriting.",bad:"Koordinata topilmadi",near:"Eng yaqin",nocoord:"Joylashuvi ko‘rsatilmagan",chg:"O‘zgartirish",none:"Ma’lumot tez orada qo‘shiladi.",found:"Topildi:"},
 oz:{tile:"Манзиллар",tileS:"Қидиринг, энг яқини",title:"Манзиллар",empty:"Ҳеч нарса топилмади.",call:"Қўнғироқ",map:"Харитада",route:"Йўл",all:"Ҳаммаси",ph:"Нима қидиряпсиз? (дори, ош, бензин…)",loc:"Жойлашувим",locSet:"Жойлашув белгиланди",locNone:"Жойлашув белгиланмаган — энг яқинини топиш учун белгиланг",find:"Аниқлаш",manual:"Қўлда киритиш",manualPh:"Координата (40.78, 72.34) ёки харита ҳаволаси",pick:"Рўйхатдан танлаш",ok:"Сақлаш",clear:"Тозалаш",err:"Жойлашувни аниқлаб бўлмади. Қўлда киритинг.",bad:"Координата топилмади",near:"Энг яқин",nocoord:"Жойлашуви кўрсатилмаган",chg:"Ўзгартириш",none:"Маълумот тез орада қўшилади.",found:"Топилди:"},
 ru:{tile:"Адреса",tileS:"Поиск, ближайшие",title:"Адреса",empty:"Ничего не найдено.",call:"Позвонить",map:"На карте",route:"Маршрут",all:"Все",ph:"Что ищете? (аптека, плов, бензин…)",loc:"Моё место",locSet:"Местоположение задано",locNone:"Местоположение не задано — укажите, чтобы найти ближайшее",find:"Определить",manual:"Ввести вручную",manualPh:"Координаты (40.78, 72.34) или ссылка на карту",pick:"Выбрать из списка",ok:"Сохранить",clear:"Сбросить",err:"Не удалось определить. Введите вручную.",bad:"Координаты не найдены",near:"Ближайшее",nocoord:"Местоположение не указано",chg:"Изменить",none:"Информация скоро будет добавлена.",found:"Найдено:"}
};
function li(){return LANG==="oz"?1:LANG==="ru"?2:0}
function p(k){return (P[LANG]||P.uz)[k]}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}

/* qidiruv uchun normalizatsiya: kirill -> lotin, belgilarsiz */
var CM={а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"yo",ж:"j",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"x",ц:"s",ч:"ch",ш:"sh",ъ:"",ь:"",э:"e",ю:"yu",я:"ya",ў:"o",қ:"q",ғ:"g",ҳ:"h",ы:"i"};
function norm(s){
  s=String(s||"").toLowerCase();
  var o="";for(var i=0;i<s.length;i++){var c=s.charAt(i);o+=CM.hasOwnProperty(c)?CM[c]:c}
  return o.replace(/[ʻʼ’‘'`´]/g,"").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
}
/* sinonimlar: so'rov so'zi -> bo'lim */
var SYN={oshxona:"osh ovqat oshxona kafe restoran choyxona non lagmon somsa shashlik fastfud stolovaya plov eda",mehmonxona:"mehmonxona mehmon yotoq hotel gostinitsa nochlash",dokon:"dokon bozor market magazin supermarket savdo",dorixona:"dori dorixona apteka tabletka",shifoxona:"shifoxona kasalxona poliklinika shifokor doktor vrach bolnitsa tez yordam",yoqilgi:"benzin yoqilgi metan propan gaz zapravka azs solyarka dizel",boshqa:""};

/* koordinata */
function parseLL(s){
  if(!s)return null;s=String(s);
  var m=s.match(/@(-?\d+\.\d+),\s*(-?\d+\.\d+)/)||s.match(/[?&](?:q|ll|query|center)=(-?\d+\.\d+)[,%2C]+\s*(-?\d+\.\d+)/i)||s.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/)||s.match(/^\s*(-?\d{1,2}(?:\.\d+)?)\s*[,; ]\s*(-?\d{1,3}(?:\.\d+)?)\s*$/);
  if(!m)return null;
  var a=parseFloat(m[1]),b=parseFloat(m[2]);
  if(/[?&]ll=/i.test(s)&&/yandex/i.test(s)){var t=a;a=b;b=t}
  if(Math.abs(a)>90||Math.abs(b)>180)return null;
  return [a,b];
}
function coordOf(x){
  if(x._c!==undefined)return x._c;
  var c=null;
  if(typeof x.lat==="number"&&typeof x.lng==="number")c=[x.lat,x.lng];
  else c=parseLL(x.g)||parseLL(x.m);
  x._c=c;return c;
}
function dist(a,b){
  var R=6371,r=Math.PI/180,dl=(b[0]-a[0])*r,dg=(b[1]-a[1])*r;
  var h=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(dg/2)*Math.sin(dg/2);
  return 2*R*Math.asin(Math.sqrt(h));
}
function fmtD(k){return k<1?Math.round(k*10)*100+" m":(k<10?k.toFixed(1):Math.round(k))+" km"}

/* flat ro'yxat */
var ALL=[];
CATS.forEach(function(c){(DATA[c[0]]||[]).forEach(function(x){x._cat=c[0];x._ic=c[1];x._s=norm([x.n,x.a,x.k,NM[c[0]].join(" "),SYN[c[0]]].join(" "));ALL.push(x)})});

var css=document.createElement("style");
css.textContent=".t6{background:linear-gradient(135deg,#0b7285,#3bc9db)}.mq{width:100%;box-sizing:border-box;padding:13px 14px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;font-family:inherit;outline:0;margin-bottom:10px}.mq:focus{border-color:var(--acc)}.chips{display:flex;gap:6px;overflow-x:auto;padding-bottom:8px;margin-bottom:6px;-webkit-overflow-scrolling:touch}.chips button{flex:0 0 auto;padding:8px 12px;border-radius:20px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:14px;font-family:inherit;font-weight:600}.chips button.on{background:var(--acc);border-color:var(--acc);color:#fff}.lbox{border:1px solid var(--line);border-radius:12px;padding:10px 12px;margin-bottom:12px;background:var(--accbg)}.lbox .lt{font-size:14px;color:var(--text)}.lbox .lb{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.lbox button{padding:9px 12px;border-radius:10px;border:0;background:var(--acc);color:#fff;font-weight:700;font-size:14px;font-family:inherit}.lbox button.s{background:var(--bg);color:var(--acc);border:1px solid var(--line)}.lbox input,.lbox select{width:100%;box-sizing:border-box;padding:11px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:15px;font-family:inherit;margin-top:8px}.lbox .er{color:var(--dn);font-size:13px;margin-top:6px}.pl{border-top:1px solid var(--line);padding:12px 0}.pl:first-of-type{border-top:0;padding-top:0}.pl b{font-size:16px}.pl .d{color:var(--mut);font-size:14px;margin-top:3px}.pl .dk{display:inline-block;margin-left:6px;padding:2px 8px;border-radius:10px;background:var(--accbg);color:var(--acc);font-size:12px;font-weight:700;vertical-align:middle}.pl .nr{background:var(--acc);color:#fff}.pl .acts{display:flex;gap:8px;margin-top:10px}.pl .acts a{flex:1;text-align:center;padding:10px;border-radius:10px;background:var(--accbg);color:var(--acc);text-decoration:none;font-weight:700;font-size:14px}.cnt{color:var(--mut);font-size:13px;margin:4px 0 10px}";
document.head.appendChild(css);

var WORKER="https://rasm-ai.muhammadaminergashev96.workers.dev";
var st={q:"",cat:"",loc:null,open:false,man:false,err:"",live:[],busy:false,lkey:""};
var tmr=null;
var LIVE=false; /* true qilsangiz — Worker orqali avtomatik qidiradi (hozir o'chiq) */
function guessCat(q){var w=norm(q).split(" ");for(var i=0;i<CATS.length;i++){var sy=(" "+SYN[CATS[i][0]]+" ");for(var j=0;j<w.length;j++){if(w[j].length>2&&sy.indexOf(" "+w[j]+" ")>=0)return CATS[i][0]}}return ""}
function fetchLive(){
  clearTimeout(tmr);
  var cat=st.cat||guessCat(st.q),q=st.q.trim();
  if(!LIVE||!st.loc||(!cat&&q.length<3)){st.live=[];st.busy=false;st.lkey="";drawList();return}
  var key=[st.loc[0].toFixed(3),st.loc[1].toFixed(3),cat,cat?"":q].join("|");
  if(key===st.lkey)return;
  tmr=setTimeout(function(){
    st.busy=true;drawList();
    fetch(WORKER+"/places?lat="+st.loc[0]+"&lon="+st.loc[1]+"&cat="+cat+(cat?"":"&q="+encodeURIComponent(q))).then(function(r){return r.json()}).then(function(d){
      st.lkey=key;st.busy=false;
      st.live=(d.list||[]).map(function(x){x._cat=cat||"boshqa";x._ic=(CATS.filter(function(c){return c[0]===x._cat})[0]||["","📌"])[1];x._live=1;return x});
      drawList();
    }).catch(function(){st.busy=false;st.live=[];drawList()});
  },450);
}
try{var sv=JSON.parse(localStorage.getItem("mz_loc")||"null");if(sv&&sv.length===2)st.loc=sv}catch(e){}
function saveLoc(){try{if(st.loc)localStorage.setItem("mz_loc",JSON.stringify(st.loc));else localStorage.removeItem("mz_loc")}catch(e){}}

var sec=document.createElement("div");sec.className="sec";sec.id="manzillar";
document.body.appendChild(sec);
var tile=document.createElement("button");
tile.className="tile t6";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">📍</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}

function placeHtml(x,i){
  var tel=x.t?String(x.t).replace(/[^\d+]/g,""):"";
  var c=coordOf(x);
  var mp=x.m||(c?"https://yandex.com/maps/?pt="+c[1]+","+c[0]+"&z=17&l=map":"https://yandex.com/maps/?text="+encodeURIComponent((x.n||"")+" "+(x.a||"")));
  var rt=c?(st.loc?"https://yandex.com/maps/?rtext="+st.loc[0]+","+st.loc[1]+"~"+c[0]+","+c[1]+"&rtt=auto":"https://yandex.com/maps/?rtext=~"+c[0]+","+c[1]+"&rtt=auto"):"";
  var acts=(tel?'<a href="tel:'+tel+'">'+p("call")+'</a>':'')+((x.a||x.m||c)?'<a href="'+esc(mp)+'" target="_blank" rel="noopener">'+p("map")+'</a>':'')+(rt?'<a href="'+esc(rt)+'" target="_blank" rel="noopener">'+p("route")+'</a>':'');
  var dk="";
  if(st.loc&&c)dk='<span class="dk'+(i===0?' nr':'')+'">'+(i===0?p("near")+' · ':'')+fmtD(x._d)+'</span>';
  return '<div class="pl"><b>'+x._ic+' '+esc(x.n||"")+'</b>'+dk+(x.a?'<div class="d">📍 '+esc(x.a)+'</div>':'')+(x.h?'<div class="d">🕒 '+esc(x.h)+'</div>':'')+(x.t?'<div class="d">📞 '+esc(x.t)+'</div>':'')+(acts?'<div class="acts">'+acts+'</div>':'')+'</div>';
}
function results(){
  var qs=norm(st.q).split(" ").filter(Boolean);
  var L=ALL.filter(function(x){
    if(st.cat&&x._cat!==st.cat)return false;
    for(var i=0;i<qs.length;i++){if(x._s.indexOf(qs[i])<0)return false}
    return true;
  });
  var seen={};L.forEach(function(x){seen[norm(x.n)]=1});
  st.live.forEach(function(x){if(st.cat&&x._cat!==st.cat)return;if(seen[norm(x.n)])return;seen[norm(x.n)]=1;L.push(x)});
  L.forEach(function(x){var c=coordOf(x);x._d=(st.loc&&c)?dist(st.loc,c):null});
  L.sort(function(a,b){
    if(a._d!==null&&b._d!==null)return a._d-b._d;
    if(a._d!==null)return -1;if(b._d!==null)return 1;
    return String(a.n).localeCompare(String(b.n));
  });
  return L;
}
function locHtml(){
  var h='<div class="lbox"><div class="lt">'+(st.loc?'✅ '+p("locSet")+' <small style="color:var(--mut)">('+st.loc[0].toFixed(4)+', '+st.loc[1].toFixed(4)+')</small>':'📍 '+p("locNone"))+'</div><div class="lb"><button id="mfind">📍 '+p("find")+'</button><button class="s" id="mman">✍️ '+p("manual")+'</button>'+(st.loc?'<button class="s" id="mclr">'+p("clear")+'</button>':'')+'</div>';
  if(st.man){
    h+='<input id="min" placeholder="'+esc(p("manualPh"))+'" inputmode="text">';
    h+='<select id="msel"><option value="">'+p("pick")+'…</option>'+LOCS.map(function(l,i){return '<option value="L'+i+'">'+esc(l[0])+'</option>'}).join("")+ALL.filter(function(x){return coordOf(x)}).map(function(x,i){return '<option value="A'+ALL.indexOf(x)+'">'+esc(x.n)+'</option>'}).join("")+'</select>';
    h+='<div class="lb"><button id="mok">'+p("ok")+'</button></div>';
  }
  if(st.err)h+='<div class="er">'+esc(st.err)+'</div>';
  return h+'</div>';
}
function listHtml(){
  var L=results();
  if(st.busy&&!L.length)return '<div class="sub" style="margin:0">⏳ …</div>';
  if(!ALL.length&&!L.length)return '<div class="sub" style="margin:0">'+p("none")+'</div>';
  if(!L.length)return '<div class="sub" style="margin:0">'+p("empty")+'</div>';
  return '<div class="cnt">'+p("found")+' '+L.length+(st.busy?' ⏳':'')+'</div>'+L.map(placeHtml).join("");
}
function chipsHtml(){
  return '<div class="chips"><button data-c=""'+(st.cat===""?' class="on"':'')+'>'+p("all")+'</button>'+CATS.map(function(c){return '<button data-c="'+c[0]+'"'+(st.cat===c[0]?' class="on"':'')+'>'+c[1]+' '+NM[c[0]][li()]+'</button>'}).join("")+'</div>';
}
function bindLoc(){
  var f=document.getElementById("mfind");if(!f)return;
  f.addEventListener("click",geo);
  document.getElementById("mman").addEventListener("click",function(){st.man=!st.man;st.err="";drawLoc()});
  var cl=document.getElementById("mclr");if(cl)cl.addEventListener("click",function(){st.loc=null;saveLoc();st.err="";st.live=[];st.lkey="";drawLoc();drawList()});
  var ok=document.getElementById("mok");
  if(ok)ok.addEventListener("click",function(){
    var v=document.getElementById("min").value.trim(),sl=document.getElementById("msel").value,c=null;
    if(v)c=parseLL(v);
    else if(sl){if(sl.charAt(0)==="L"){var l=LOCS[+sl.slice(1)];c=[l[1],l[2]]}else{c=coordOf(ALL[+sl.slice(1)])}}
    if(!c){st.err=p("bad");drawLoc();return}
    setLoc(c);
  });
}
function setLoc(c){st.loc=c;saveLoc();st.man=false;st.err="";st.lkey="";drawLoc();drawList();fetchLive()}
function geo(){
  st.err="";
  var done=false;
  function ok(lat,lng){if(done)return;done=true;setLoc([lat,lng])}
  function fail(){if(done)return;done=true;st.err=p("err");st.man=true;drawLoc()}
  var tg=window.Telegram&&Telegram.WebApp,lm=tg&&tg.LocationManager;
  function browser(){
    if(!navigator.geolocation)return fail();
    navigator.geolocation.getCurrentPosition(function(r){ok(r.coords.latitude,r.coords.longitude)},fail,{enableHighAccuracy:true,timeout:12000,maximumAge:60000});
  }
  if(lm&&lm.init){
    try{lm.init(function(){
      if(!lm.isLocationAvailable)return browser();
      lm.getLocation(function(d){if(d&&typeof d.latitude==="number")ok(d.latitude,d.longitude);else browser()});
    })}catch(e){browser()}
  }else browser();
}
function drawLoc(){var b=document.getElementById("mloc");if(b){b.innerHTML=locHtml();bindLoc()}}
function drawList(){var b=document.getElementById("mlist");if(b)b.innerHTML=listHtml()}
function draw(){
  sec.innerHTML='<button class="back" id="mb">← '+T[LANG].back+'</button><div class="card"><h2>'+p("title")+'</h2><input class="mq" id="mq" type="search" placeholder="'+esc(p("ph"))+'" value="'+esc(st.q)+'"><div id="mloc">'+locHtml()+'</div><div id="mchips">'+chipsHtml()+'</div><div id="mlist">'+listHtml()+'</div></div>';
  document.getElementById("mb").addEventListener("click",function(){show("home")});
  document.getElementById("mq").addEventListener("input",function(){st.q=this.value;drawList();fetchLive()});
  bindLoc();bindChips();
}
function bindChips(){
  var bs=document.querySelectorAll("#mchips [data-c]");
  for(var i=0;i<bs.length;i++){bs[i].addEventListener("click",function(){st.cat=this.getAttribute("data-c");document.getElementById("mchips").innerHTML=chipsHtml();bindChips();drawList();fetchLive()})}
}

tile.addEventListener("click",function(){draw();show("manzillar")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();if(sec.classList.contains("on"))draw()})}
updTile();draw();
})();
