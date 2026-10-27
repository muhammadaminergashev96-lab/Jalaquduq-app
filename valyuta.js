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
var API="https://cbu.uz/uz/arkhiv-kursov-valyut/json/";
var UI={
uz:{tile:"Valyuta kursi",tileS:"Kurs va konvertor",title:"Valyuta kursi",sub:"Markaziy bank rasmiy kursi",conv:"Konvertor",amount:"Summa",swap:"Almashtirish",copy:"Nusxalash",copied:"Nusxalandi ✓",
 quick:"Tez summalar",trend:"7 kunlik o‘zgarish",rates:"Kurslar",all:"Barcha valyutalar",less:"Yashirish",search:"Valyuta qidirish…",load:"Yuklanmoqda…",fail:"Kurslarni yuklab bo‘lmadi. Internetni tekshiring.",offline:"Internet yo‘q: oxirgi saqlangan kurs ko‘rsatilmoqda",
 note:"Markaziy bank rasmiy kursi. Banklar va ayirboshlash shoxobchalarida kurs farq qilishi mumkin.",som:"so‘m",pick:"Valyutani tanlang",none:"Topilmadi",from:"Beriladi",to:"Olinadi",week:"hafta",min:"eng past",max:"eng yuqori",date:"Kurs sanasi"},
ru:{tile:"Курс валют",tileS:"Курсы и конвертер",title:"Курс валют",sub:"Официальный курс Центробанка",conv:"Конвертер",amount:"Сумма",swap:"Поменять",copy:"Копировать",copied:"Скопировано ✓",
 quick:"Быстрые суммы",trend:"Динамика за 7 дней",rates:"Курсы",all:"Все валюты",less:"Скрыть",search:"Поиск валюты…",load:"Загрузка…",fail:"Не удалось загрузить курсы. Проверьте интернет.",offline:"Нет интернета: показан последний сохранённый курс",
 note:"Официальный курс Центробанка. В банках и обменных пунктах курс может отличаться.",som:"сум",pick:"Выберите валюту",none:"Не найдено",from:"Отдаёте",to:"Получаете",week:"неделя",min:"минимум",max:"максимум",date:"Дата курса"}
};
function p(k){var v=(LANG==="ru"?UI.ru:UI.uz)[k];return typeof v==="string"&&LANG==="oz"?cyr(v):v}
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var POP=["USD","EUR","RUB","KZT","GBP","CNY","TRY","AED","KGS","JPY"];
var FLAG={USD:"🇺🇸",EUR:"🇪🇺",UZS:"🇺🇿",GBP:"🇬🇧",JPY:"🇯🇵",CNY:"🇨🇳",KRW:"🇰🇷",CHF:"🇨🇭",SDR:"🌐",XDR:"🌐",TRY:"🇹🇷",AED:"🇦🇪",RUB:"🇷🇺",KZT:"🇰🇿",KGS:"🇰🇬",TJS:"🇹🇯",TMT:"🇹🇲",AZN:"🇦🇿",UAH:"🇺🇦",BYN:"🇧🇾",GEL:"🇬🇪",AMD:"🇦🇲",MDL:"🇲🇩",INR:"🇮🇳",PKR:"🇵🇰",AFN:"🇦🇫",IRR:"🇮🇷",IQD:"🇮🇶",ILS:"🇮🇱",SAR:"🇸🇦",KWD:"🇰🇼",QAR:"🇶🇦",EGP:"🇪🇬",DZD:"🇩🇿",LYD:"🇱🇾",CAD:"🇨🇦",AUD:"🇦🇺",NZD:"🇳🇿",MXN:"🇲🇽",BRL:"🇧🇷",ARS:"🇦🇷",CZK:"🇨🇿",PLN:"🇵🇱",HUF:"🇭🇺",RON:"🇷🇴",BGN:"🇧🇬",DKK:"🇩🇰",NOK:"🇳🇴",SEK:"🇸🇪",ISK:"🇮🇸",SGD:"🇸🇬",MYR:"🇲🇾",THB:"🇹🇭",IDR:"🇮🇩",VND:"🇻🇳",PHP:"🇵🇭",HKD:"🇭🇰",MNT:"🇲🇳",BDT:"🇧🇩",LKR:"🇱🇰",MMK:"🇲🇲",ZAR:"🇿🇦",LBP:"🇱🇧",SYP:"🇸🇾",KPW:"🇰🇵",RSD:"🇷🇸",BND:"🇧🇳",JOD:"🇯🇴",TND:"🇹🇳",CUP:"🇨🇺",CLP:"🇨🇱",LAK:"🇱🇦",KHR:"🇰🇭",NPR:"🇳🇵",MAD:"🇲🇦",BHD:"🇧🇭",OMR:"🇴🇲",YER:"🇾🇪"};
function flag(c){if(FLAG[c])return FLAG[c];if(/^[A-Z]{3}$/.test(c))return String.fromCodePoint(127397+c.charCodeAt(0),127397+c.charCodeAt(1));return "💱"}
function nf(n,d){return n.toLocaleString("ru-RU",{maximumFractionDigits:d,minimumFractionDigits:0}).replace(/ /g," ")}
function fmtRes(n){
  if(!isFinite(n))return "—";
  var a=Math.abs(n),d=a>=100?2:a>=1?4:a>=0.01?6:8;
  return nf(n,d);
}
function parseAmt(s){var v=parseFloat(String(s).replace(/\s/g,"").replace(",","."));return isFinite(v)?v:0}

var DATA=null,DATE="",ST={from:"USD",to:"UZS",amt:"1",offline:false,all:false,q:"",trend:{}};
try{var sv=JSON.parse(localStorage.getItem("vl_st")||"null");if(sv){ST.from=sv.from||ST.from;ST.to=sv.to||ST.to;ST.amt=sv.amt||ST.amt}}catch(e){}
function saveSt(){try{localStorage.setItem("vl_st",JSON.stringify({from:ST.from,to:ST.to,amt:ST.amt}))}catch(e){}}
function rateUZS(c){if(c==="UZS")return 1;var x=DATA&&DATA[c];return x?x.unit:null}
function nameOf(c){if(c==="UZS")return LANG==="ru"?"Узбекский сум":(LANG==="oz"?"Ўзбекистон сўми":"O‘zbek so‘mi");var x=DATA&&DATA[c];if(!x)return c;return LANG==="ru"?x.ru:(LANG==="oz"?(x.uzc||x.uz):x.uz)}
function convert(a,f,t){var rf=rateUZS(f),rt=rateUZS(t);if(!rf||!rt)return NaN;return a*rf/rt}

function load(){
  fetch(API).then(function(r){return r.json()}).then(function(list){
    var d={},dt="";
    list.forEach(function(x){var rate=parseFloat(x.Rate),nom=parseFloat(x.Nominal)||1;if(!isFinite(rate))return;dt=x.Date||dt;
      d[x.Ccy]={unit:rate/nom,rate:rate,nom:nom,diff:parseFloat(x.Diff)||0,uz:x.CcyNm_UZ||x.CcyNm_EN||x.Ccy,uzc:x.CcyNm_UZC||x.CcyNm_UZ||x.Ccy,ru:x.CcyNm_RU||x.CcyNm_EN||x.Ccy}});
    if(!Object.keys(d).length)throw new Error("empty");
    DATA=d;DATE=dt;ST.offline=false;try{localStorage.setItem("vl_data",JSON.stringify({d:d,dt:dt}))}catch(e){}
    draw();loadTrend();
  }).catch(function(){
    try{var c=JSON.parse(localStorage.getItem("vl_data")||"null");if(c&&c.d){DATA=c.d;DATE=c.dt;ST.offline=true}}catch(e){}
    if(!DATA)DATA=false;
    draw();
  });
}
function iso(d){return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)}
function trendCcy(){return ST.from!=="UZS"?ST.from:(ST.to!=="UZS"?ST.to:"USD")}
function loadTrend(){
  var c=trendCcy();if(ST.trend[c])return drawTrend();
  var days=[],i;for(i=6;i>=0;i--){var d=new Date();d.setDate(d.getDate()-i);days.push(iso(d))}
  Promise.all(days.map(function(dt){return fetch(API+c+"/"+dt+"/").then(function(r){return r.json()}).then(function(j){var x=j&&j[0];return x?{d:dt,v:parseFloat(x.Rate)/(parseFloat(x.Nominal)||1)}:null}).catch(function(){return null})}))
  .then(function(a){a=a.filter(Boolean);if(a.length>=2)ST.trend[c]=a;drawTrend()});
}
function drawTrend(){
  var box=$("vl-tr");if(!box)return;var c=trendCcy(),a=ST.trend[c];
  if(!a){box.innerHTML='<div class="vl-h">'+p("load")+'</div>';return}
  var vs=a.map(function(x){return x.v}),mn=Math.min.apply(null,vs),mx=Math.max.apply(null,vs),rg=(mx-mn)||1,W=300,H=70,
  pts=a.map(function(x,i){return [Math.round(i*(W-10)/(a.length-1)+5),Math.round(H-8-(x.v-mn)*(H-16)/rg)]}),
  line=pts.map(function(q){return q.join(",")}).join(" "),ch=vs[vs.length-1]-vs[0],up=ch>=0;
  box.innerHTML='<div class="vl-tt"><b>'+flag(c)+' '+c+' → UZS</b><span class="'+(up?"up":"dn")+'">'+(up?"▲ +":"▼ ")+nf(ch,2)+'</span></div>'+
   '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:auto;display:block"><polyline points="'+line+' '+(W-5)+","+H+" 5,"+H+'" fill="'+(up?"rgba(15,123,108,.12)":"rgba(214,69,69,.12)")+'" stroke="none"/><polyline points="'+line+'" fill="none" stroke="'+(up?"#0f7b6c":"#d64545")+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'+pts.map(function(q,i){return i===pts.length-1?'<circle cx="'+q[0]+'" cy="'+q[1]+'" r="4" fill="'+(up?"#0f7b6c":"#d64545")+'"/>':''}).join("")+'</svg>'+
   '<div class="vl-mm"><span>'+p("min")+': '+nf(mn,2)+'</span><span>'+p("max")+': '+nf(mx,2)+'</span></div>';
}

var css=document.createElement("style");
css.textContent=".vl-c{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:14px;margin-bottom:12px;box-shadow:0 2px 8px rgba(20,30,40,.05)}.vl-t{font-size:12px;font-weight:800;letter-spacing:.05em;color:var(--mut);text-transform:uppercase;margin:0 0 8px}.vl-row{display:flex;align-items:center;gap:10px;background:var(--bg);border-radius:16px;padding:10px}.vl-cb{flex:none;display:flex;align-items:center;gap:6px;padding:10px 12px;border-radius:14px;border:1px solid var(--line);background:var(--card);color:var(--text);font-size:15px;font-weight:800;font-family:inherit}.vl-cb small{font-size:11px;color:var(--mut)}.vl-in{flex:1;min-width:0;border:0;background:none;color:var(--text);font-size:26px;font-weight:800;text-align:right;font-family:inherit;outline:none;padding:0}.vl-out{flex:1;min-width:0;font-size:26px;font-weight:800;text-align:right;color:var(--acc);overflow-wrap:anywhere;line-height:1.15}.vl-sw{display:flex;justify-content:center;margin:-6px 0;position:relative;z-index:2}.vl-sw button{width:40px;height:40px;border-radius:50%;border:3px solid var(--card);background:var(--acc);color:#fff;font-size:18px;font-family:inherit}.vl-1{font-size:13px;color:var(--mut);margin:12px 2px 0;line-height:1.4}.vl-q{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.vl-q button{padding:8px 12px;border-radius:16px;border:1px solid var(--line);background:var(--card);color:var(--text);font-size:13px;font-weight:700;font-family:inherit}.vl-cp{display:block;width:100%;margin-top:10px;padding:12px;border:0;border-radius:12px;background:var(--accbg);color:var(--acc);font-weight:700;font-size:14px;font-family:inherit}.vl-tt{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}.vl-tt b{font-size:15px;color:var(--text)}.vl-tt span,.vl-d{font-size:12px;font-weight:700;padding:4px 9px;border-radius:9px}.up{background:var(--accbg);color:var(--acc)}.dn{background:rgba(214,69,69,.12);color:var(--dn)}.vl-mm{display:flex;justify-content:space-between;font-size:11px;color:var(--mut);margin-top:4px}.vl-h{font-size:13px;color:var(--mut);padding:8px 0}.vl-rr{display:flex;align-items:center;gap:10px;padding:11px 0;border-top:1px solid var(--line);width:100%;background:none;border-left:0;border-right:0;border-bottom:0;color:var(--text);text-align:left;font-family:inherit}.vl-rr:first-of-type{border-top:0}.vl-rr .f{font-size:24px;width:30px;text-align:center}.vl-rr .m{flex:1;min-width:0}.vl-rr .m b{display:block;font-size:15px}.vl-rr .m span{display:block;font-size:12px;color:var(--mut);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vl-rr .v{text-align:right;font-weight:800;font-size:15px}.vl-rr .v em{display:block;font-style:normal;font-size:11px;font-weight:700;margin-top:2px}.vl-rr .v em.up{background:none;color:var(--acc)}.vl-rr .v em.dn{background:none;color:var(--dn)}.vl-more{display:block;width:100%;padding:12px;border:0;border-radius:12px;background:var(--accbg);color:var(--acc);font-weight:700;font-size:14px;margin-top:8px;font-family:inherit}.vl-s{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;font-family:inherit;margin:8px 0}.vl-ov{position:fixed;inset:0;z-index:99990;background:rgba(0,0,0,.5);display:flex;align-items:flex-end}.vl-sh{background:var(--card);color:var(--text);width:100%;max-height:78vh;border-radius:22px 22px 0 0;padding:14px;box-sizing:border-box;display:flex;flex-direction:column}.vl-sh h3{margin:2px 0 4px;font-size:17px}.vl-ls{overflow:auto;flex:1}.vl-warn{background:rgba(214,69,69,.1);color:var(--dn);padding:10px 12px;border-radius:12px;font-size:13px;margin-bottom:10px}.vl-nt{font-size:12px;color:var(--mut);text-align:center;margin:6px 4px 24px;line-height:1.45}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="valyuta2";document.body.appendChild(sec);

function row(c,show){
  var x=DATA[c];if(!x)return "";
  return '<button class="vl-rr" data-c="'+c+'"><span class="f">'+flag(c)+'</span><span class="m"><b>'+c+'</b><span>'+esc(nameOf(c))+(x.nom>1?' · '+x.nom:'')+'</span></span><span class="v">'+nf(x.rate,2)+' '+p("som")+'<em class="'+(x.diff>=0?"up":"dn")+'">'+(x.diff>=0?"▲ +":"▼ ")+nf(x.diff,2)+'</em></span></button>';
}
function draw(){
  var T0=(typeof T!=="undefined"&&T[LANG])||{back:"Orqaga"};
  var h='<button class="back" id="vl-b">← '+T0.back+'</button><div style="margin:4px 2px 12px"><div style="font-size:22px;font-weight:800">'+p("title")+'</div><div class="vl-h" style="padding:2px 0">'+p("sub")+(DATE?' · '+esc(DATE):'')+'</div></div>';
  if(DATA===null){sec.innerHTML=h+'<div class="vl-c"><div class="vl-h">'+p("load")+'</div></div>';bindBack();return}
  if(DATA===false){sec.innerHTML=h+'<div class="vl-c"><div class="vl-warn">'+p("fail")+'</div><button class="vl-cp" id="vl-rt">↻</button></div>';bindBack();$("vl-rt").onclick=function(){DATA=null;draw();load()};return}
  if(ST.offline)h+='<div class="vl-warn">'+p("offline")+'</div>';
  var res=convert(parseAmt(ST.amt),ST.from,ST.to),one=convert(1,ST.from,ST.to);
  h+='<div class="vl-c"><div class="vl-t">'+p("conv")+'</div>'+
   '<div class="vl-row"><button class="vl-cb" data-pick="from">'+flag(ST.from)+' '+ST.from+' ▾</button><input class="vl-in" id="vl-a" type="text" inputmode="decimal" autocomplete="off" value="'+esc(ST.amt)+'" aria-label="'+esc(p("amount"))+'"></div>'+
   '<div class="vl-sw"><button id="vl-sw" aria-label="'+esc(p("swap"))+'">⇅</button></div>'+
   '<div class="vl-row"><button class="vl-cb" data-pick="to">'+flag(ST.to)+' '+ST.to+' ▾</button><div class="vl-out" id="vl-o">'+fmtRes(res)+'</div></div>'+
   '<div class="vl-1" id="vl-1">1 '+ST.from+' = '+fmtRes(one)+' '+ST.to+'</div>'+
   '<div class="vl-q">'+["1","10","100","1000","10000","100000"].map(function(v){return '<button data-qa="'+v+'">'+nf(+v,0)+'</button>'}).join("")+'</div>'+
   '<button class="vl-cp" id="vl-cp">'+p("copy")+'</button></div>';
  h+='<div class="vl-c"><div class="vl-t">'+p("trend")+'</div><div id="vl-tr"></div></div>';
  var list=POP.filter(function(c){return DATA[c]});
  h+='<div class="vl-c"><div class="vl-t">'+p("rates")+'</div>'+list.map(function(c){return row(c)}).join("");
  if(ST.all){
    var q=ST.q.trim().toUpperCase(),rest=Object.keys(DATA).filter(function(c){return list.indexOf(c)<0}).sort();
    if(q)rest=rest.filter(function(c){return c.indexOf(q)>=0||nameOf(c).toUpperCase().indexOf(q)>=0});
    h+='<input class="vl-s" id="vl-q" placeholder="'+esc(p("search"))+'" value="'+esc(ST.q)+'">'+(rest.length?rest.map(function(c){return row(c)}).join(""):'<div class="vl-h">'+p("none")+'</div>');
  }
  h+='<button class="vl-more" id="vl-all">'+(ST.all?p("less"):p("all")+' ('+Object.keys(DATA).length+')')+'</button></div>';
  h+='<div class="vl-nt">'+p("note")+'</div>';
  sec.innerHTML=h;bindBack();bind();drawTrend();
}
function bindBack(){var b=$("vl-b");if(b)b.onclick=function(){show("home")}}
function recalc(){
  var res=convert(parseAmt(ST.amt),ST.from,ST.to),one=convert(1,ST.from,ST.to);
  var o=$("vl-o");if(o)o.textContent=fmtRes(res);var l=$("vl-1");if(l)l.textContent="1 "+ST.from+" = "+fmtRes(one)+" "+ST.to;
}
function bind(){
  var a=$("vl-a");
  a.addEventListener("input",function(){var v=a.value.replace(/[^\d.,\s]/g,"");if(v!==a.value)a.value=v;ST.amt=v;saveSt();recalc()});
  a.addEventListener("focus",function(){try{a.select()}catch(e){}});
  Array.prototype.forEach.call(sec.querySelectorAll("[data-pick]"),function(b){b.onclick=function(){picker(b.getAttribute("data-pick"))}});
  $("vl-sw").onclick=function(){var t=ST.from;ST.from=ST.to;ST.to=t;var r=convert(parseAmt(ST.amt),t,ST.from);saveSt();draw();loadTrend()};
  Array.prototype.forEach.call(sec.querySelectorAll("[data-qa]"),function(b){b.onclick=function(){ST.amt=b.getAttribute("data-qa");saveSt();draw();loadTrend()}});
  $("vl-cp").onclick=function(){
    var txt=nf(parseAmt(ST.amt),8)+" "+ST.from+" = "+fmtRes(convert(parseAmt(ST.amt),ST.from,ST.to))+" "+ST.to,btn=$("vl-cp");
    function ok(){btn.textContent=p("copied");setTimeout(function(){btn.textContent=p("copy")},1500)}
    try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(ok,fb);return}}catch(e){}
    fb();function fb(){var ta=document.createElement("textarea");ta.value=txt;ta.style.cssText="position:fixed;opacity:0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");ok()}catch(e){}document.body.removeChild(ta)}
  };
  Array.prototype.forEach.call(sec.querySelectorAll(".vl-rr"),function(b){b.onclick=function(){var c=b.getAttribute("data-c");if(c===ST.to)ST.to="UZS";ST.from=c;if(ST.to===ST.from)ST.to="UZS";saveSt();draw();loadTrend();try{window.scrollTo(0,0)}catch(e){}}});
  $("vl-all").onclick=function(){ST.all=!ST.all;draw()};
  var q=$("vl-q");if(q)q.addEventListener("input",function(){ST.q=q.value;var pos=q.selectionStart;draw();var n=$("vl-q");if(n){n.focus();try{n.setSelectionRange(pos,pos)}catch(e){}}});
}
function picker(which){
  var ov=document.createElement("div");ov.className="vl-ov";
  var all=["UZS"].concat(POP.filter(function(c){return DATA[c]}),Object.keys(DATA).filter(function(c){return POP.indexOf(c)<0}).sort());
  ov.innerHTML='<div class="vl-sh"><h3>'+p("pick")+'</h3><input class="vl-s" id="vl-pq" placeholder="'+esc(p("search"))+'"><div class="vl-ls" id="vl-pl"></div></div>';
  document.body.appendChild(ov);
  function fill(){
    var q=$("vl-pq").value.trim().toUpperCase(),l=all.filter(function(c){return !q||c.indexOf(q)>=0||nameOf(c).toUpperCase().indexOf(q)>=0});
    $("vl-pl").innerHTML=l.length?l.map(function(c){return '<button class="vl-rr" data-c="'+c+'"><span class="f">'+flag(c)+'</span><span class="m"><b>'+c+'</b><span>'+esc(nameOf(c))+'</span></span>'+((which==="from"?ST.from:ST.to)===c?'<span class="v" style="color:var(--acc)">✓</span>':'')+'</button>'}).join(""):'<div class="vl-h">'+p("none")+'</div>';
    Array.prototype.forEach.call($("vl-pl").querySelectorAll(".vl-rr"),function(b){b.onclick=function(){
      var c=b.getAttribute("data-c"),other=which==="from"?"to":"from";
      if(c===ST[other])ST[other]=ST[which];
      ST[which]=c;document.body.removeChild(ov);saveSt();draw();loadTrend();
    }});
  }
  $("vl-pq").addEventListener("input",fill);fill();
  ov.addEventListener("click",function(e){if(e.target===ov)document.body.removeChild(ov)});
}

/* eski Valyuta tugmasini yangi sahifaga yo‘naltirish */
var hooked=false;
function hook(){
  if(hooked)return;
  var tl=document.querySelectorAll(".tile");
  for(var i=0;i<tl.length;i++){
    var b=tl[i].querySelector("b"),s=b?b.textContent.toLowerCase().replace(/[ʻʼ‘’'`´]/g,""):"";
    if(/valyuta|валют|курс/.test(s)&&!tl[i].__vl){
      tl[i].__vl=1;hooked=true;
      tl[i].addEventListener("click",function(){
        if(!DATA&&DATA!==false)load();
        draw();setTimeout(function(){show("valyuta2")},0);
      });
    }
  }
}
hook();setTimeout(hook,600);setTimeout(hook,2000);
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++)lb[j].addEventListener("click",function(){setTimeout(function(){if(sec.classList.contains("on"))draw()},0)});
/* oldindan yuklab qo‘yamiz */
load();draw();
window.VALYUTA_OPEN=function(){draw();show("valyuta2")};
})();
