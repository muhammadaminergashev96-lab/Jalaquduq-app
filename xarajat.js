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
/* Kirill -> lotin (kiritilgan matnni tushunish uchun) */
var CL={"а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"yo","ж":"j","з":"z","и":"i","й":"y","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"x","ц":"s","ч":"ch","ш":"sh","щ":"sh","ъ":"","ы":"i","ь":"","э":"e","ю":"yu","я":"ya","ў":"o","қ":"q","ғ":"g","ҳ":"h"};
function norm(s){
  s=String(s).toLowerCase().replace(/[ʻʼ‘’'`´]/g,"");
  var o="";for(var i=0;i<s.length;i++){var c=s.charAt(i);o+=CL[c]!==undefined?CL[c]:c}
  return o.replace(/\s+/g," ").trim();
}
var CATS={
 oziq:{e:"🛒",n:["Oziq-ovqat","Продукты"],k:["non","gosht","bozor","sabzavot","meva","market","oziq","suv","sut","kolbasa","tuxum","yogh","un ","guruch","shakar","choy","magazin","supermarket","xleb","produkt","mol","baliq","pishloq"]},
 kafe:{e:"🍽️",n:["Kafe va ovqat","Кафе и еда"],k:["obed","tushlik","kafe","restoran","choyxona","fastfood","fast food","lavash","osh","somsa","kofe","nonushta","kechki ovqat","burger","pitsa","pizza","shashlik","kebab","shirinlik","tort","non ovqat","ovqatlandim","stolovaya"]},
 yol:{e:"🚕",n:["Transport","Транспорт"],k:["taksi","benzin","yoqilgi","metro","avtobus","yol kira","yolkira","parkovka","zapravka","moy ","remont","mashina","avto","propan","metan","taxi","yandex","uber","kira"]},
 kom:{e:"💡",n:["Kommunal va aloqa","Коммунальные и связь"],k:["svet","elektr","kommunal","internet","telefon","mobil","gaz ","issiq suv","chiqindi","tv ","wifi","wi-fi","paket","uzmobile","beeline","ucell","mobiuz","aloqa","tarif"]},
 uy:{e:"🏠",n:["Uy-joy","Жильё"],k:["ijara","kvartira","uy ","ipoteka","mebel","jihoz","oshxona","remont uy"]},
 sog:{e:"💊",n:["Sog‘liq","Здоровье"],k:["dori","apteka","shifokor","doktor","klinika","tish","tahlil","shifoxona","vitamin","davolan"]},
 kiyim:{e:"👕",n:["Kiyim-kechak","Одежда"],k:["kiyim","koylak","shim","poyabzal","krossovka","kurtka","bosh kiyim","etik","sumka","soat","odezhda"]},
 talim:{e:"📚",n:["Ta’lim","Образование"],k:["kurs","kitob","maktab","universitet","kontrakt","repetitor","oqish","daftar","ruchka","talim"]},
 koni:{e:"🎬",n:["Ko‘ngilochar","Развлечения"],k:["kino","oyin","konsert","dam olish","park","bilet","aylanish","kalyan","bowling","sayohat","tur "]},
 sovga:{e:"🎁",n:["Sovg‘a va to‘y","Подарки и свадьбы"],k:["sovga","toy","tabrik","gul","tugilgan kun","mehmon","kelin","marosim"]},
 xayr:{e:"🤲",n:["Xayriya","Благотворительность"],k:["sadaqa","zakot","xayr","ehson","masjid","hayriya"]},
 boshqa:{e:"📦",n:["Boshqa","Другое"],k:[]}
};
var ORDER=["oziq","kafe","yol","kom","uy","sog","kiyim","talim","koni","sovga","xayr","boshqa"];
var ONES={bir:1,ikki:2,uch:3,tort:4,besh:5,olti:6,yetti:7,sakkiz:8,toqqiz:9},TENS={on:10,yigirma:20,ottiz:30,qirq:40,ellik:50,oltmish:60,yetmish:70,sakson:80,toqson:90};
function guess(txt){
  var t=" "+norm(txt)+" ";
  for(var i=0;i<ORDER.length;i++){var c=ORDER[i],k=CATS[c].k;for(var j=0;j<k.length;j++){var w=k[j];if(w.charAt(w.length-1)===" "){if(t.indexOf(" "+w)>=0)return c}else if(t.indexOf(w)>=0)return c}}
  return "boshqa";
}
var UNITS={ming:1,mingta:1,mln:1,million:1,milyon:1,mlrd:1,k:1,tys:1,tysyach:1,tis:1,tisich:1,tisyach:1,yuz:1,som:1,sum:1,kecha:1,bugun:1,vchera:1,segodnya:1,ketdi:1,sarfladim:1,potratil:1,xarajat:1,harajat:1};
function amountOf(seg){
  var t=norm(seg),m=t.match(/(\d+(?:[ .,]\d{3})*(?:[.,]\d+)?)\s*(ming|mingta|mln|million|milyon|mlrd|tysyach|tys|tisich|tisyach|tis|k)?(?![a-z])/);
  if(m){
    var raw=m[1],v;
    if(/^\d{1,3}([ .,]\d{3})+$/.test(raw))v=parseFloat(raw.replace(/[ .,]/g,""));
    else v=parseFloat(raw.replace(/ /g,"").replace(",","."));
    var u=m[2];
    if(u==="ming"||u==="mingta"||u==="k"||u==="tys"||u==="tysyach"||u==="tis"||u==="tisich"||u==="tisyach")v*=1000;else if(u==="mln"||u==="million"||u==="milyon")v*=1e6;else if(u==="mlrd")v*=1e9;
    if(u==="mln"||u==="million"||u==="milyon"){var rest=t.slice(m.index+m[0].length).match(/^\s*(\d{1,3})\s*(ming|mingta|k|tys)(?![a-z])/);if(rest)v+=parseFloat(rest[1])*1000}
    if(isFinite(v)&&v>0)return{v:Math.round(v)};
  }
  var tk=t.split(" "),tot=0,cur=0,found=false;
  for(var i=0;i<tk.length;i++){var w=tk[i];
    if(ONES[w]){cur+=ONES[w];found=true}else if(TENS[w]){cur+=TENS[w];found=true}else if(w==="yuz"){cur=(cur||1)*100;found=true}
    else if(w==="ming"||w==="mingta"||w==="tys"||w==="tis"){tot+=(cur||1)*1000;cur=0;found=true}else if(w==="million"||w==="milyon"||w==="mln"){tot+=(cur||1)*1e6;cur=0;found=true}
  }
  tot+=cur;if(found&&tot>0)return{v:tot};
  return null;
}
function clean(seg){
  var out=seg.replace(/\s+/g," ").trim().split(" ").filter(function(w){
    var n=norm(w);return !/^[\d.,]+$/.test(n)&&!ONES[n]&&!TENS[n]&&!UNITS[n]&&!/^\d/.test(n);
  }).join(" ").trim();
  return out.slice(0,40);
}
function parse(text){
  var out=[],parts=String(text).split(/,\s+|;|\n/);
  parts.forEach(function(p){
    p=p.trim();if(!p)return;
    var segs=[p];
    var vs=p.split(/\s+(?:va|ва|и)\s+/i);
    if(vs.length>1&&vs.every(function(x){return amountOf(x)}))segs=vs;
    segs.forEach(function(s){
      var am=amountOf(s);if(!am)return;
      var n=norm(s),d=0;if(/\bkecha\b/.test(n)||/\bvchera\b/.test(n))d=-1;
      var note=clean(s);
      out.push({a:am.v,c:guess(note||s),n:note,d:d});
    });
  });
  return out;
}
if(typeof module!=="undefined")module.exports={parse:parse,norm:norm};
if(typeof document==="undefined")return;

/* ---------- Interfeys ---------- */
var UI={
uz:{tile:"Xarajatlar",tileS:"Kunlik hisob-kitob",title:"Xarajatlar hisobi",total:"Shu oy jami",today:"Bugun",avg:"Kunlik o‘rtacha",vs:"Oldingi oyga nisbatan",som:"so‘m",
 ph:"Yozing: «non 8 ming, taksi 25000»",add:"Qo‘shish",hint:"Oddiy qilib yozing — summa va turini o‘zim ajrataman. Bir nechta xarajatni vergul bilan yozish mumkin. «kecha» desangiz kechagi kunga yoziladi.",
 empty:"Bu oyda xarajat yo‘q",first:"Birinchi xarajatni yozing",budget:"Oylik byudjet",budgetSet:"Oylik byudjet qo‘yish",budgetLeft:"Qoldi",budgetOver:"Oshib ketdi",save:"Saqlash",del:"O‘chirish",cat:"Turini o‘zgartirish",byCat:"Turlar bo‘yicha",hist:"Tarix",
 noAmt:"Summa topilmadi. Masalan: «non 8 ming»",added:"Qo‘shildi",yday:"Kecha",tdy:"Bugun",copy:"Nusxalash (jadval)",copied:"Nusxalandi ✓",note:"Ma’lumotlar shu qurilmada saqlanadi.",
 ex:["non 8 ming, taksi 25000","obedga 45 ming ketdi","kecha svetga 120 ming"],
 mo:["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"]},
ru:{tile:"Расходы",tileS:"Учёт по дням",title:"Учёт расходов",total:"Всего за месяц",today:"Сегодня",avg:"В среднем в день",vs:"К прошлому месяцу",som:"сум",
 ph:"Пишите: «хлеб 8 тыс, такси 25000»",add:"Добавить",hint:"Пишите просто — сумму и категорию определю сам. Несколько расходов можно через запятую. Слово «вчера» запишет на вчерашний день.",
 empty:"В этом месяце расходов нет",first:"Запишите первый расход",budget:"Бюджет на месяц",budgetSet:"Задать бюджет на месяц",budgetLeft:"Осталось",budgetOver:"Превышено",save:"Сохранить",del:"Удалить",cat:"Сменить категорию",byCat:"По категориям",hist:"История",
 noAmt:"Сумма не найдена. Например: «хлеб 8 тыс»",added:"Добавлено",yday:"Вчера",tdy:"Сегодня",copy:"Копировать (таблица)",copied:"Скопировано ✓",note:"Данные хранятся на этом устройстве.",
 ex:["хлеб 8 тыс, такси 25000","обед 45 тыс","вчера свет 120 тыс"],
 mo:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]}
};
function p(k){var v=(LANG==="ru"?UI.ru:UI.uz)[k];return typeof v==="string"&&LANG==="oz"?cyr(v):v}
function pl(k){var v=(LANG==="ru"?UI.ru:UI.uz)[k];return LANG==="oz"?v.map(cyr):v}
function cn(c){var n=CATS[c].n;return LANG==="ru"?n[1]:(LANG==="oz"?cyr(n[0]):n[0])}
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function money(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g," ")}
var DB={e:[],b:0};
try{var raw=localStorage.getItem("xrj");if(raw){var o=JSON.parse(raw);if(o&&o.e)DB=o}}catch(e){}
function saveDB(){try{localStorage.setItem("xrj",JSON.stringify(DB))}catch(e){}}
var now=new Date(),V={y:now.getFullYear(),m:now.getMonth()},sel=null,toast="";
function ymOf(t){var d=new Date(t);return d.getFullYear()*12+d.getMonth()}
function monthEntries(y,m){var k=y*12+m;return DB.e.filter(function(x){return ymOf(x.t)===k})}
function sum(a){return a.reduce(function(s,x){return s+x.a},0)}
function dayKey(t){var d=new Date(t);return d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()}

var css=document.createElement("style");
css.textContent=".xr-nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}.xr-nav button{width:42px;height:42px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--text);font-size:20px}.xr-nav button:disabled{opacity:.35}.xr-nav b{font-size:19px}.xr-big{font-size:34px;font-weight:800;color:var(--text)}.xr-big small{font-size:15px;color:var(--mut);font-weight:600}.xr-g{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:12px}.xr-g div{background:var(--accbg);border-radius:12px;padding:10px 6px;text-align:center}.xr-g b{display:block;font-size:15px;color:var(--text)}.xr-g span{font-size:11px;color:var(--mut)}.xr-in{display:flex;gap:8px}.xr-in input{flex:1;min-width:0;padding:13px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;font-family:inherit;box-sizing:border-box}.xr-in button{padding:0 18px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-size:20px;font-weight:700}.xr-ch{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.xr-c{padding:8px 11px;border-radius:16px;border:1px solid var(--line);background:var(--card);color:var(--text);font-size:13px;font-family:inherit}.xr-h{font-size:12px;color:var(--mut);margin-top:8px;line-height:1.4}.xr-t{font-size:14px;font-weight:700;color:var(--acc);min-height:20px;margin-top:8px}.xr-t.e{color:var(--dn)}.xr-b{height:10px;border-radius:6px;background:var(--line);overflow:hidden;margin:8px 0}.xr-b i{display:block;height:100%;background:var(--acc)}.xr-b i.o{background:var(--dn)}.xr-r{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--line)}.xr-r:first-child{border-top:0}.xr-r .e{font-size:22px;width:30px;text-align:center}.xr-r .m{flex:1;min-width:0}.xr-r .m b{display:block;font-size:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.xr-r .m span{font-size:12px;color:var(--mut)}.xr-r .a{font-weight:700;font-size:15px;white-space:nowrap}.xr-d{font-size:12px;font-weight:700;color:var(--mut);margin:14px 0 2px;text-transform:uppercase;letter-spacing:.03em}.xr-cb{display:flex;align-items:center;gap:8px;margin:7px 0;font-size:14px}.xr-cb .n{width:150px;flex:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.xr-cb .bar{flex:1;height:8px;border-radius:5px;background:var(--line);overflow:hidden}.xr-cb .bar i{display:block;height:100%;background:var(--acc)}.xr-cb .v{width:78px;text-align:right;flex:none;font-weight:600;font-size:13px}.xr-s{display:block;width:100%;padding:12px;border:0;border-radius:12px;background:var(--accbg);color:var(--acc);font-weight:700;font-size:15px;margin-top:10px;font-family:inherit}.xr-ed{background:var(--bg);border-radius:12px;padding:10px;margin:4px 0 8px}.xr-dl{background:transparent;border:1px solid var(--dn);color:var(--dn);padding:8px 12px;border-radius:12px;margin-top:8px;font-family:inherit;font-size:14px}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="xarajat";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#059669,#d4a017)";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">💰</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}

function draw(keep){
  var cur=(V.y===now.getFullYear()&&V.m===now.getMonth()),es=monthEntries(V.y,V.m),tot=sum(es),mo=pl("mo");
  var today=sum(es.filter(function(x){return dayKey(x.t)===dayKey(Date.now())})),
      days=cur?new Date().getDate():new Date(V.y,V.m+1,0).getDate(),avg=days?tot/days:0;
  var py=V.m===0?V.y-1:V.y,pm=V.m===0?11:V.m-1,pes=monthEntries(py,pm);
  if(cur){var dd=new Date().getDate();pes=pes.filter(function(x){return new Date(x.t).getDate()<=dd})}
  var ptot=sum(pes),vs="—",vcol="";
  if(ptot>0){var pc=Math.round((tot-ptot)*100/ptot);vs=(pc>0?"+":"")+pc+"%";vcol=pc>0?"color:var(--dn)":(pc<0?"color:var(--acc)":"")}
  var canNext=!cur&&(V.y*12+V.m)<(now.getFullYear()*12+now.getMonth());
  var h='<button class="back" id="xb0">← '+T[LANG].back+'</button><div class="xr-nav"><button id="xpv">‹</button><b>'+mo[V.m]+' '+V.y+'</b><button id="xnx"'+(canNext?'':' disabled')+'>›</button></div>';
  h+='<div class="card"><div class="xr-h" style="margin:0 0 4px">'+p("total")+'</div><div class="xr-big">'+money(tot)+' <small>'+p("som")+'</small></div>'+
    '<div class="xr-g"><div><b>'+money(today)+'</b><span>'+p("today")+'</span></div><div><b>'+money(avg)+'</b><span>'+p("avg")+'</span></div><div><b style="'+vcol+'">'+vs+'</b><span>'+p("vs")+'</span></div></div>';
  if(DB.b>0){var pr=Math.min(100,Math.round(tot*100/DB.b)),left=DB.b-tot;h+='<div style="margin-top:14px;font-size:13px;color:var(--mut)">'+p("budget")+': '+money(DB.b)+'</div><div class="xr-b"><i class="'+(left<0?'o':'')+'" style="width:'+pr+'%"></i></div><div style="font-size:13px;font-weight:700;color:'+(left<0?'var(--dn)':'var(--acc)')+'">'+(left<0?p("budgetOver")+': '+money(-left):p("budgetLeft")+': '+money(left))+' '+p("som")+'</div>'}
  h+='<button class="xr-s" id="xbd">💰 '+p("budgetSet")+(DB.b>0?' ✎':'')+'</button><div id="xbx"></div></div>';
  h+='<div class="card"><div class="xr-in"><input id="xin" type="text" enterkeyhint="done" autocomplete="off" placeholder="'+esc(p("ph"))+'"><button id="xad" aria-label="'+esc(p("add"))+'">→</button></div><div class="xr-t" id="xt">'+toast+'</div>';
  if(!es.length){h+='<div class="xr-ch">'+pl("ex").map(function(x,i){return '<button class="xr-c" data-ex="'+i+'">'+esc(x)+'</button>'}).join("")+'</div>'}
  h+='<div class="xr-h">'+p("hint")+'</div></div>';
  if(es.length){
    var by={};es.forEach(function(x){by[x.c]=(by[x.c]||0)+x.a});
    var ks=Object.keys(by).sort(function(a,b){return by[b]-by[a]});
    h+='<div class="card"><h2>'+p("byCat")+'</h2>'+ks.map(function(k){var pc=Math.round(by[k]*100/tot);return '<div class="xr-cb"><span class="n">'+CATS[k].e+' '+esc(cn(k))+'</span><span class="bar"><i style="width:'+pc+'%"></i></span><span class="v">'+money(by[k])+'</span></div>'}).join("")+'</div>';
    h+='<div class="card"><h2>'+p("hist")+'</h2>';
    var sorted=es.slice().sort(function(a,b){return b.t-a.t||b.i-a.i}),last="";
    sorted.forEach(function(x){
      var dk=dayKey(x.t);
      if(dk!==last){last=dk;var d=new Date(x.t),lab=d.getDate()+" "+mo[d.getMonth()].toLowerCase();if(dk===dayKey(Date.now()))lab=p("tdy")+" · "+lab;else if(dk===dayKey(Date.now()-864e5))lab=p("yday")+" · "+lab;
        var dsum=sum(es.filter(function(y){return dayKey(y.t)===dk}));h+='<div class="xr-d" style="display:flex;justify-content:space-between"><span>'+lab+'</span><span>'+money(dsum)+'</span></div>'}
      h+='<div class="xr-r" data-id="'+x.i+'"><div class="e">'+CATS[x.c].e+'</div><div class="m"><b>'+esc(x.n||cn(x.c))+'</b><span>'+esc(cn(x.c))+'</span></div><div class="a">'+money(x.a)+'</div></div>';
      if(sel===x.i){h+='<div class="xr-ed"><div class="xr-h" style="margin:0 0 6px">'+p("cat")+'</div><div class="xr-ch" style="margin:0">'+ORDER.map(function(k){return '<button class="xr-c" data-cat="'+k+'" style="'+(k===x.c?'border-color:var(--acc);color:var(--acc);font-weight:700':'')+'">'+CATS[k].e+' '+esc(cn(k))+'</button>'}).join("")+'</div><button class="xr-dl" id="xdel">🗑 '+p("del")+'</button></div>'}
    });
    h+='<button class="xr-s" id="xcp">'+p("copy")+'</button></div>';
  }
  h+='<div class="xr-h" style="text-align:center;margin-bottom:20px">'+p("note")+'</div>';
  sec.innerHTML=h;bind();
}
function say(msg,err){toast=msg;var t=$("xt");if(t){t.textContent=msg;t.className="xr-t"+(err?" e":"")}}
function bind(){
  $("xb0").onclick=function(){show("home")};
  $("xpv").onclick=function(){V.m--;if(V.m<0){V.m=11;V.y--}sel=null;toast="";draw()};
  var nx=$("xnx");nx.onclick=function(){if(nx.disabled)return;V.m++;if(V.m>11){V.m=0;V.y++}sel=null;toast="";draw()};
  function add(){
    var inp=$("xin"),v=inp.value.trim();if(!v)return;
    var items=parse(v);
    if(!items.length){say(p("noAmt"),true);return}
    var id=(DB.e.reduce(function(m,x){return Math.max(m,x.i)},0))+1,msgs=[];
    items.forEach(function(it){
      var d=new Date();d.setDate(d.getDate()+it.d);d.setHours(12,0,0,0);
      DB.e.push({i:id++,t:d.getTime(),a:it.a,c:it.c,n:it.n});
      msgs.push(CATS[it.c].e+" "+(it.n||cn(it.c))+" · "+money(it.a));
    });
    saveDB();V={y:now.getFullYear(),m:now.getMonth()};sel=null;toast="✓ "+msgs.join(" ; ");
    try{if(window.Telegram&&Telegram.WebApp&&Telegram.WebApp.HapticFeedback)Telegram.WebApp.HapticFeedback.notificationOccurred("success")}catch(e){}
    draw();
  }
  $("xad").onclick=add;
  $("xin").addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();add()}});
  Array.prototype.forEach.call(sec.querySelectorAll("[data-ex]"),function(b){b.onclick=function(){$("xin").value=pl("ex")[+b.getAttribute("data-ex")];add()}});
  $("xbd").onclick=function(){
    var bx=$("xbx");if(bx.innerHTML){bx.innerHTML="";return}
    bx.innerHTML='<div class="xr-in" style="margin-top:10px"><input id="xbi" type="text" inputmode="numeric" placeholder="3 000 000" value="'+(DB.b||"")+'"><button id="xbs" style="font-size:14px">'+p("save")+'</button></div>';
    $("xbs").onclick=function(){var a=amountOf($("xbi").value);DB.b=a?a.v:0;saveDB();draw()};
  };
  Array.prototype.forEach.call(sec.querySelectorAll(".xr-r"),function(r){r.onclick=function(){var id=+r.getAttribute("data-id");sel=sel===id?null:id;draw()}});
  Array.prototype.forEach.call(sec.querySelectorAll("[data-cat]"),function(b){b.onclick=function(){DB.e.forEach(function(x){if(x.i===sel)x.c=b.getAttribute("data-cat")});saveDB();sel=null;draw()}});
  var dl=$("xdel");if(dl)dl.onclick=function(){DB.e=DB.e.filter(function(x){return x.i!==sel});sel=null;saveDB();draw()};
  var cp=$("xcp");if(cp)cp.onclick=function(){
    var rows=monthEntries(V.y,V.m).sort(function(a,b){return a.t-b.t}).map(function(x){var d=new Date(x.t);return [("0"+d.getDate()).slice(-2)+"."+("0"+(d.getMonth()+1)).slice(-2)+"."+d.getFullYear(),cn(x.c),x.n||"",x.a].join("\t")}).join("\n");
    function ok(){cp.textContent=p("copied");setTimeout(function(){cp.textContent=p("copy")},1500)}
    try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(rows).then(ok,fb);return}}catch(e){}
    fb();function fb(){var ta=document.createElement("textarea");ta.value=rows;ta.style.cssText="position:fixed;opacity:0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");ok()}catch(e){}document.body.removeChild(ta)}
  };
}
tile.addEventListener("click",function(){now=new Date();V={y:now.getFullYear(),m:now.getMonth()};sel=null;toast="";draw();show("xarajat")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();if(sec.classList.contains("on"))draw()})}
updTile();
})();
