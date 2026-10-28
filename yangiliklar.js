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
var API="https://rasm-ai.muhammadaminergashev96.workers.dev/news";
var UI={
uz:{tile:"Yangiliklar",tileS:"O‘zbekiston va dunyo",title:"Yangiliklar",uz:"O‘zbekiston",andijon:"Andijon",region:"Jalaquduq",world:"Xorijiy",
 reg:{toshkent:"Toshkent",samarqand:"Samarqand",fargona:"Farg‘ona",namangan:"Namangan",buxoro:"Buxoro",xorazm:"Xorazm",qashqadaryo:"Qashqadaryo",surxondaryo:"Surxondaryo",jizzax:"Jizzax",sirdaryo:"Sirdaryo",navoiy:"Navoiy",qoraqalpogiston:"Qoraqalpog‘iston"},
 load:"Yangiliklar yuklanmoqda…",fail:"Yangiliklarni yuklab bo‘lmadi. Internetni tekshirib, qayta urining.",empty:"Hozircha yangilik topilmadi.",retry:"Qayta urinish",offline:"Internet yo‘q — oxirgi saqlangan yangiliklar",
 now:"hozir",m:"daq oldin",h:"soat oldin",d:"kun oldin",note:"Yangiliklar ochiq manbalardan olinadi. Batafsil o‘qish uchun sarlavhani bosing — asl sayt ochiladi.",chan:"Jalaquduq ovozi kanali",src:"Manba"},
ru:{tile:"Новости",tileS:"Узбекистан и мир",title:"Новости",uz:"Узбекистан",andijon:"Андижан",region:"Жалакудук",world:"Мир",
 reg:{toshkent:"Ташкент",samarqand:"Самарканд",fargona:"Фергана",namangan:"Наманган",buxoro:"Бухара",xorazm:"Хорезм",qashqadaryo:"Кашкадарья",surxondaryo:"Сурхандарья",jizzax:"Джизак",sirdaryo:"Сырдарья",navoiy:"Навои",qoraqalpogiston:"Каракалпакстан"},
 load:"Загрузка новостей…",fail:"Не удалось загрузить новости. Проверьте интернет и повторите.",empty:"Новостей пока нет.",retry:"Повторить",offline:"Нет интернета — последние сохранённые новости",
 now:"сейчас",m:"мин назад",h:"ч назад",d:"дн назад",note:"Новости берутся из открытых источников. Нажмите на заголовок — откроется оригинал.",chan:"Канал «Jalaquduq ovozi»",src:"Источник"}
};
function L(){return LANG==="ru"?UI.ru:UI.uz}
function c1(s){return LANG==="oz"?cyr(s):s}
function p(k){return c1(L()[k])}
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function ago(ts){if(!ts)return "";var m=Math.round((Date.now()-ts)/6e4);if(m<2)return p("now");if(m<60)return m+" "+p("m");var h=Math.round(m/60);if(h<24)return h+" "+p("h");return Math.round(h/24)+" "+p("d")}

var CL={"а":"a","б":"b","в":"v","г":"g","д":"d","ё":"yo","ж":"j","з":"z","и":"i","й":"y","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"x","ц":"ts","ч":"ch","ш":"sh","щ":"shch","ъ":"’","ы":"i","ь":"","э":"e","ю":"yu","я":"ya","ў":"oʻ","қ":"q","ғ":"gʻ","ҳ":"h","ҷ":"j","ӣ":"i"};
var VW="аеёиоуэюяўыaeiou";
function lat(s){
  var o="",i,ch,lo,r,pv;
  for(i=0;i<s.length;i++){
    ch=s.charAt(i);lo=ch.toLowerCase();
    if(lo==="е"){pv=i>0?s.charAt(i-1).toLowerCase():" ";r=(!/[a-zа-яёўқғҳ]/i.test(pv)||VW.indexOf(pv)>=0)?"ye":"e"}
    else if(CL.hasOwnProperty(lo))r=CL[lo];
    else{o+=ch;continue}
    if(ch!==lo&&r){var nx=s.charAt(i+1);r=(nx&&nx===nx.toUpperCase()&&nx!==nx.toLowerCase()&&r.length>1)?r.toUpperCase():r.charAt(0).toUpperCase()+r.slice(1)}
    o+=r;
  }
  return o;
}
function fx(x){
  if(LANG==="ru")return x;
  var s=x.t+" "+(x.d||""),hasC=/[\u0400-\u04FF]/.test(s),isUz=/[ўқғҳЎҚҒҲ]/.test(s);
  if(LANG==="uz"&&hasC&&isUz)return {t:lat(x.t),d:lat(x.d||""),s:x.s,u:x.u,i:x.i,ts:x.ts};
  if(LANG==="oz"&&!hasC&&/[a-z]/i.test(s)&&x.s!=="BBC")return {t:cyr(x.t),d:x.d?cyr(x.d):"",s:x.s,u:x.u,i:x.i,ts:x.ts};
  return x;
}
var CATS=["uz","andijon","region","world"],ICON={uz:"🇺🇿",andijon:"📍",region:"🏡",world:"🌍"};
var ST={c:"uz",r:"fargona",data:{},busy:false,err:false,off:false};
try{var sv=JSON.parse(localStorage.getItem("nw_st")||"null");if(sv){if(CATS.indexOf(sv.c)>=0)ST.c=sv.c;if(L().reg[sv.r]||UI.uz.reg[sv.r])ST.r=sv.r}}catch(e){}
function sSave(){try{localStorage.setItem("nw_st",JSON.stringify({c:ST.c,r:ST.r}))}catch(e){}}
function lang(){return LANG==="ru"?"ru":"uz"}
function ck(){return ST.c+"|"+lang()+"|"}
function cacheGet(k){try{var o=JSON.parse(localStorage.getItem("nw_"+k)||"null");return o&&o.items?o:null}catch(e){return null}}
function cacheSet(k,o){try{localStorage.setItem("nw_"+k,JSON.stringify(o))}catch(e){}}
var reqId=0;
function load(force){
  var k=ck(),c=cacheGet(k);
  if(c&&!ST.data[k])ST.data[k]=c;
  if(ST.data[k]&&!force&&Date.now()-ST.data[k].at<3e5){ST.err=false;ST.off=false;draw();return}
  ST.busy=true;ST.err=false;ST.off=false;draw();
  var my=++reqId,url=API+"?c="+ST.c+"&l="+lang();
  var ctl=window.AbortController?new AbortController():null,to=setTimeout(function(){if(ctl)ctl.abort()},15000);
  fetch(url,ctl?{signal:ctl.signal}:{}).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()}).then(function(j){
    clearTimeout(to);if(my!==reqId)return;
    var o={items:(j.items||[]).slice(0,40),at:Date.now()};
    if(o.items.length){ST.data[k]=o;cacheSet(k,o)}else if(!ST.data[k])ST.data[k]=o;
    ST.busy=false;draw();
  }).catch(function(){
    clearTimeout(to);if(my!==reqId)return;
    ST.busy=false;if(ST.data[k]&&ST.data[k].items.length)ST.off=true;else ST.err=true;draw();
  });
}
function openLink(u){try{var W=window.Telegram&&Telegram.WebApp;if(/^https:\/\/t\.me\//.test(u)&&W&&W.openTelegramLink){W.openTelegramLink(u);return}if(W&&W.openLink){W.openLink(u);return}}catch(e){}window.open(u,"_blank")}
function hap(){try{var h=window.Telegram&&Telegram.WebApp&&Telegram.WebApp.HapticFeedback;if(h)h.impactOccurred("light")}catch(e){}}

var css=document.createElement("style");
css.textContent=".nw-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:2px 0 10px}.nw-tabs::-webkit-scrollbar{display:none}.nw-tabs button{display:flex;flex-direction:column;align-items:center;gap:3px;padding:9px 2px;border-radius:16px;border:1px solid var(--line);background:var(--card);color:var(--text);font-weight:700;font-size:12px;font-family:inherit;min-width:0;line-height:1.15}.nw-tabs button i{font-style:normal;font-size:20px;line-height:1}.nw-tabs button span{display:block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.nw-tabs button.on{background:var(--acc);color:#fff;border-color:var(--acc)}.nw-rg{display:flex;gap:6px;overflow-x:auto;padding:0 0 12px;scrollbar-width:none}.nw-rg::-webkit-scrollbar{display:none}.nw-rg button{flex:none;padding:7px 12px;border-radius:14px;border:1px solid var(--line);background:var(--bg);color:var(--mut);font-size:13px;font-weight:600;font-family:inherit}.nw-rg button.on{background:var(--accbg);color:var(--acc);border-color:var(--acc)}.nw-c{display:flex;gap:12px;width:100%;text-align:left;background:var(--card);border:1px solid var(--line);border-radius:18px;padding:12px;margin-bottom:10px;color:var(--text);font-family:inherit;box-shadow:0 2px 8px rgba(20,30,40,.04)}.nw-c .tx{flex:1;min-width:0}.nw-c b{display:block;font-size:15px;line-height:1.35;font-weight:700}.nw-c p{margin:5px 0 0;font-size:13px;line-height:1.4;color:var(--mut);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.nw-c small{display:block;margin-top:7px;font-size:12px;color:var(--acc);font-weight:600}.nw-c img{flex:none;width:84px;height:84px;border-radius:12px;object-fit:cover;background:var(--accbg)}.nw-m{text-align:center;color:var(--mut);padding:30px 10px;font-size:14px;line-height:1.5}.nw-w{background:rgba(214,69,69,.1);color:var(--dn);padding:10px 12px;border-radius:12px;font-size:13px;margin-bottom:10px}.nw-b{display:block;margin:12px auto 0;padding:12px 22px;border:0;border-radius:12px;background:var(--accbg);color:var(--acc);font-weight:700;font-family:inherit;font-size:14px}.nw-sk{height:92px;border-radius:18px;background:linear-gradient(90deg,var(--line),var(--accbg),var(--line));background-size:200% 100%;animation:nwsk 1.2s linear infinite;margin-bottom:10px}@keyframes nwsk{to{background-position:-200% 0}}.nw-h{display:flex;align-items:center;justify-content:space-between;margin:4px 2px 12px}.nw-h b{font-size:22px;font-weight:800}.nw-h button{width:40px;height:40px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--acc);font-size:18px;font-family:inherit}.nw-nt{font-size:12px;color:var(--mut);text-align:center;margin:8px 6px 24px;line-height:1.45}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="yangiliklar";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#0369a1,#0ea5e9)";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">📰</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}

function draw(){
  var T0=(typeof T!=="undefined"&&T[LANG])||{back:"Orqaga"},k=ck(),d=ST.data[k];
  var h='<button class="back" id="nwb">← '+T0.back+'</button><div class="nw-h"><b>'+p("title")+'</b><button id="nwr" aria-label="refresh">↻</button></div>';
  h+='<div class="nw-tabs">'+CATS.map(function(c){return '<button data-c="'+c+'" class="'+(c===ST.c?"on":"")+'"><i>'+ICON[c]+'</i><span>'+p(c)+'</span></button>'}).join("")+'</div>';
  if(ST.off)h+='<div class="nw-w">'+p("offline")+'</div>';
  if(d&&d.items.length){
    h+=d.items.map(function(x0,i){var x=fx(x0);return '<button class="nw-c" data-i="'+i+'">'+'<div class="tx"><b>'+esc(x.t)+'</b>'+(x.d?'<p>'+esc(x.d)+'</p>':'')+'<small>'+esc([x.s,ago(x.ts)].filter(Boolean).join(" · "))+'</small></div>'+(x.i?'<img loading="lazy" referrerpolicy="no-referrer" src="'+esc(x.i)+'" alt="" onerror="this.style.display=\'none\'">':'')+'</button>'}).join("");
  }else if(ST.busy){h+='<div class="nw-sk"></div><div class="nw-sk"></div><div class="nw-sk"></div><div class="nw-sk"></div>'}
  else if(ST.err){h+='<div class="nw-m">'+p("fail")+'<button class="nw-b" id="nwre">'+p("retry")+'</button></div>'}
  else{h+='<div class="nw-m">'+p("empty")+'<button class="nw-b" id="nwre">'+p("retry")+'</button></div>'}
  if(ST.c==="region")h+='<button class="nw-b" id="nwch">📢 '+p("chan")+'</button>';
  h+='<div class="nw-nt">'+p("note")+'</div>';
  var sc=window.scrollY;sec.innerHTML=h;bind(d);
}
function bind(d){
  $("nwb").onclick=function(){show("home")};
  $("nwr").onclick=function(){hap();load(true)};
  var ch=$("nwch");if(ch)ch.onclick=function(){try{var W=Telegram.WebApp;if(W.openTelegramLink){W.openTelegramLink("https://t.me/jalaquduq_ovozi");return}}catch(e){}window.open("https://t.me/jalaquduq_ovozi","_blank")};
  var re=$("nwre");if(re)re.onclick=function(){load(true)};
  Array.prototype.forEach.call(sec.querySelectorAll("[data-c]"),function(b){b.onclick=function(){ST.c=b.getAttribute("data-c");sSave();load(false)}});
  Array.prototype.forEach.call(sec.querySelectorAll("[data-r]"),function(b){b.onclick=function(){ST.r=b.getAttribute("data-r");sSave();load(false)}});
  Array.prototype.forEach.call(sec.querySelectorAll("[data-i]"),function(b){b.onclick=function(){var x=d.items[+b.getAttribute("data-i")];if(x){hap();openLink(x.u)}}});
  var on=sec.querySelector(".nw-tabs .on");if(on&&on.scrollIntoView)try{on.scrollIntoView({block:"nearest",inline:"center"})}catch(e){}
}
tile.addEventListener("click",function(){window.scrollTo&&window.scrollTo(0,0);load(false);show("yangiliklar")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){setTimeout(function(){updTile();if(sec.classList.contains("on"))load(false)},0)})}
updTile();
})();
