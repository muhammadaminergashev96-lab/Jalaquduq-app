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
var UI={
uz:{tile:"Maqsadlar",tileS:"Kun, hafta, oy, yil",title:"Maqsadlarim",d:"Kun",w:"Hafta",m:"Oy",y:"Yil",add:"Qo‘shish",ph:{d:"Bugun nima qilmoqchisiz?",w:"Bu haftaning maqsadi…",m:"Bu oyning maqsadi…",y:"Bu yilning maqsadi…"},
 done:"bajarildi",empty:"Hali maqsad yo‘q. Birinchisini yozing — kichik qadamdan boshlang.",sug:"G‘oyalar",carry:"Bajarilmaganlarni joriy davrga o‘tkazish",carried:"O‘tkazildi ✓",
 streak:"Ketma-ket",total:"Jami bajarilgan",best:"davr",all:"Barchasi bajarildi! Barakalla 🎉",most:"Yaxshi ketyapsiz, oz qoldi!",start:"Boshlang — har bir qadam muhim.",del:"O‘chirish",today:"Hozirgi davr",
 mo:["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"],wd:["yakshanba","dushanba","seshanba","chorshanba","payshanba","juma","shanba"],
 mos:["yan","fev","mar","apr","may","iyn","iyl","avg","sen","okt","noy","dek"],wk:"hafta",
 S:{d:["5 mahal namozni o‘qish","Kitob o‘qish (20 bet)","Sport qilish","Ko‘proq suv ichish","Yaqinlarga qo‘ng‘iroq qilish"],w:["Bir kitobni tugatish","Haftada 3 marta sport","Yangi narsa o‘rganish","Oila bilan vaqt o‘tkazish"],m:["Pul yig‘ish","Kurs yoki dars tugatish","Qarzlarni yopish","Yangi ko‘nikma"],y:["Qur’on xatm qilish","Til o‘rganish","Pul jamg‘arish","Sog‘liq va sport"]}},
ru:{tile:"Цели",tileS:"День, неделя, месяц, год",title:"Мои цели",d:"День",w:"Неделя",m:"Месяц",y:"Год",add:"Добавить",ph:{d:"Что хотите сделать сегодня?",w:"Цель на эту неделю…",m:"Цель на этот месяц…",y:"Цель на этот год…"},
 done:"выполнено",empty:"Целей пока нет. Напишите первую — начните с малого.",sug:"Идеи",carry:"Перенести невыполненные в текущий период",carried:"Перенесено ✓",
 streak:"Подряд",total:"Всего выполнено",best:"пер.",all:"Всё выполнено! Молодец 🎉",most:"Отлично идёте, осталось немного!",start:"Начните — каждый шаг важен.",del:"Удалить",today:"Текущий период",
 mo:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],wd:["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],
 mos:["янв","фев","мар","апр","мая","июн","июл","авг","сен","окт","ноя","дек"],wk:"неделя",
 S:{d:["Совершить 5 намазов","Читать книгу (20 стр.)","Заняться спортом","Пить больше воды","Позвонить близким"],w:["Дочитать книгу","3 тренировки в неделю","Изучить что-то новое","Время с семьёй"],m:["Накопить денег","Закончить курс","Закрыть долги","Новый навык"],y:["Прочитать Коран","Выучить язык","Накопить деньги","Здоровье и спорт"]}}
};
function L(){return LANG==="ru"?UI.ru:UI.uz}
function c1(s){return LANG==="oz"?cyr(s):s}
function p(k){var v=L()[k];return typeof v==="string"?c1(v):v}
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function hap(t){try{var h=window.Telegram&&Telegram.WebApp&&Telegram.WebApp.HapticFeedback;if(h)h.impactOccurred(t||"light")}catch(e){}}

var DB={g:[],n:1};
try{var sv=JSON.parse(localStorage.getItem("mqj")||"null");if(sv&&sv.g){DB=sv}}catch(e){}
function save(){try{localStorage.setItem("mqj",JSON.stringify(DB))}catch(e){}}
var PER=["d","w","m","y"],cur="d",off=0,editId=null,msg="";
function z(n){return (n<10?"0":"")+n}
function mondayOf(d){var x=new Date(d.getFullYear(),d.getMonth(),d.getDate());var w=(x.getDay()+6)%7;x.setDate(x.getDate()-w);return x}
function shift(per,o){var n=new Date();
  if(per==="d")return new Date(n.getFullYear(),n.getMonth(),n.getDate()+o);
  if(per==="w"){var m=mondayOf(n);m.setDate(m.getDate()+7*o);return m}
  if(per==="m")return new Date(n.getFullYear(),n.getMonth()+o,1);
  return new Date(n.getFullYear()+o,0,1)}
function keyOf(per,d){
  if(per==="d")return d.getFullYear()+"-"+z(d.getMonth()+1)+"-"+z(d.getDate());
  if(per==="w"){var m=mondayOf(d);return m.getFullYear()+"-"+z(m.getMonth()+1)+"-"+z(m.getDate())}
  if(per==="m")return d.getFullYear()+"-"+z(d.getMonth()+1);
  return ""+d.getFullYear()}
function key(per,o){return keyOf(per,shift(per,o))}
function label(per,o){
  var d=shift(per,o),l=L(),mo=l.mo.map(c1),mos=l.mos.map(c1);
  if(per==="d")return d.getDate()+" "+mo[d.getMonth()].toLowerCase()+", "+c1(l.wd[d.getDay()]);
  if(per==="w"){var e=new Date(d);e.setDate(e.getDate()+6);return d.getDate()+" "+mos[d.getMonth()]+" – "+e.getDate()+" "+mos[e.getMonth()]}
  if(per==="m")return mo[d.getMonth()]+" "+d.getFullYear();
  return ""+d.getFullYear()}
function goals(per,k){return DB.g.filter(function(x){return x.p===per&&x.k===k})}
function streak(){
  var o=0,gs=goals(cur,key(cur,0));
  if(!gs.length||gs.some(function(x){return !x.d}))o=-1;
  var n=0;
  for(var s=0;s<400;s++,o--){var a=goals(cur,key(cur,o));if(a.length&&a.every(function(x){return x.d}))n++;else break}
  return n}
function ring(pc){var r=34,c=2*Math.PI*r,off=c*(1-pc/100);
  return '<svg viewBox="0 0 80 80" width="84" height="84"><circle cx="40" cy="40" r="'+r+'" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="8"/><circle cx="40" cy="40" r="'+r+'" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+off.toFixed(1)+'" transform="rotate(-90 40 40)"/><text x="40" y="46" text-anchor="middle" font-size="19" font-weight="800" fill="#fff" font-family="inherit">'+pc+'%</text></svg>'}

var css=document.createElement("style");
css.textContent=".mq-tabs{display:flex;gap:6px;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:4px;margin-bottom:12px}.mq-tabs button{flex:1;padding:10px 0;border:0;border-radius:12px;background:none;color:var(--mut);font-weight:700;font-size:14px;font-family:inherit}.mq-tabs button.on{background:var(--acc);color:#fff}.mq-nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}.mq-nav button{width:42px;height:42px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--text);font-size:20px}.mq-nav div{text-align:center}.mq-nav b{font-size:17px;display:block}.mq-nav span{font-size:12px;color:var(--acc);font-weight:700}.mq-hero{display:flex;align-items:center;gap:14px;border-radius:22px;padding:16px;color:#fff;background:linear-gradient(135deg,#0e6f66,#14b8a6);margin-bottom:12px;box-shadow:0 8px 20px rgba(15,118,110,.25)}.mq-hero b{font-size:20px;display:block}.mq-hero span{font-size:13px;opacity:.92;line-height:1.35;display:block;margin-top:3px}.mq-c{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:12px;margin-bottom:12px}.mq-in{display:flex;gap:8px}.mq-in input{flex:1;min-width:0;padding:13px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;font-family:inherit;box-sizing:border-box}.mq-in button{padding:0 16px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-weight:800;font-size:14px;font-family:inherit}.mq-g{display:flex;align-items:center;gap:12px;padding:11px 2px;border-top:1px solid var(--line)}.mq-in+.mq-g{margin-top:10px}.mq-ck{flex:none;width:28px;height:28px;border-radius:50%;border:2.5px solid var(--acc);background:none;color:#fff;font-size:15px;display:flex;align-items:center;justify-content:center;padding:0;font-family:inherit}.mq-g.d .mq-ck{background:var(--acc)}.mq-t{flex:1;min-width:0;font-size:16px;line-height:1.3;overflow-wrap:anywhere;color:var(--text)}.mq-g.d .mq-t{text-decoration:line-through;color:var(--mut)}.mq-x{flex:none;width:34px;height:34px;border:0;background:none;color:var(--mut);font-size:20px;font-family:inherit}.mq-ed{flex:1;min-width:0;padding:9px;border-radius:10px;border:1px solid var(--acc);background:var(--bg);color:var(--text);font-size:16px;font-family:inherit;box-sizing:border-box}.mq-sg{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}.mq-sg button{padding:8px 12px;border-radius:16px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:13px;font-family:inherit}.mq-h{font-size:12px;font-weight:800;letter-spacing:.05em;color:var(--mut);text-transform:uppercase;margin:0 0 8px}.mq-st{display:grid;grid-template-columns:1fr 1fr;gap:8px}.mq-st div{background:var(--accbg);border-radius:14px;padding:12px;text-align:center}.mq-st b{display:block;font-size:22px;color:var(--text)}.mq-st span{font-size:12px;color:var(--mut)}.mq-cr{display:block;width:100%;padding:12px;border:0;border-radius:12px;background:var(--accbg);color:var(--acc);font-weight:700;font-size:14px;font-family:inherit;margin-top:8px}.mq-m{text-align:center;font-weight:700;color:var(--acc);margin:0 0 12px;font-size:14px}.mq-e{text-align:center;color:var(--mut);font-size:14px;padding:14px 8px;line-height:1.4}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="maqsad";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#7c3aed,#db2777)";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🎯</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}

function draw(){
  var l=L(),k=key(cur,off),gs=goals(cur,k),dn=gs.filter(function(x){return x.d}).length,pc=gs.length?Math.round(dn*100/gs.length):0;
  var T0=(typeof T!=="undefined"&&T[LANG])||{back:"Orqaga"};
  var h='<button class="back" id="mqb">← '+T0.back+'</button><div style="font-size:22px;font-weight:800;margin:4px 2px 12px">'+p("title")+'</div>';
  h+='<div class="mq-tabs">'+PER.map(function(x){return '<button data-p="'+x+'" class="'+(x===cur?"on":"")+'">'+p(x)+'</button>'}).join("")+'</div>';
  h+='<div class="mq-nav"><button id="mqp">‹</button><div><b>'+esc(label(cur,off))+'</b>'+(off===0?'<span>'+p("today")+'</span>':'<span id="mqt" style="cursor:pointer">↩ '+p("today")+'</span>')+'</div><button id="mqn">›</button></div>';
  h+='<div class="mq-hero">'+ring(pc)+'<div><b>'+dn+' / '+gs.length+' '+p("done")+'</b><span>'+(!gs.length?p("start"):pc===100?p("all"):p("most"))+'</span></div></div>';
  h+='<div class="mq-c"><div class="mq-in"><input id="mqi" maxlength="120" placeholder="'+esc(p("ph")[cur])+'" enterkeyhint="done"><button id="mqa">'+p("add")+'</button></div>';
  if(!gs.length){h+='<div class="mq-e">'+p("empty")+'</div>'}
  gs.forEach(function(x){
    if(editId===x.i)h+='<div class="mq-g"><input class="mq-ed" id="mqe" maxlength="120" value="'+esc(x.t)+'"><button class="mq-x" data-ok="'+x.i+'" style="color:var(--acc)">✓</button></div>';
    else h+='<div class="mq-g'+(x.d?" d":"")+'"><button class="mq-ck" data-ck="'+x.i+'">'+(x.d?"✓":"")+'</button><div class="mq-t" data-ed="'+x.i+'">'+esc(x.t)+'</div><button class="mq-x" data-rm="'+x.i+'" aria-label="'+esc(p("del"))+'">×</button></div>'});
  var left=gs.filter(function(x){return !x.d});
  if(off<0&&left.length)h+='<button class="mq-cr" id="mqc">'+(msg||p("carry"))+'</button>';
  h+='</div>';
  var have=gs.map(function(x){return x.t}),sg=l.S[cur].filter(function(s){return have.indexOf(c1(s))<0});
  if(sg.length)h+='<div class="mq-c"><div class="mq-h">'+p("sug")+'</div><div class="mq-sg">'+sg.map(function(s,i){return '<button data-sg="'+i+'">+ '+esc(c1(s))+'</button>'}).join("")+'</div></div>';
  var all=DB.g.filter(function(x){return x.p===cur}),tot=all.filter(function(x){return x.d}).length;
  h+='<div class="mq-c"><div class="mq-h">'+p("tile")+'</div><div class="mq-st"><div><b>🔥 '+streak()+'</b><span>'+p("streak")+' ('+p(cur).toLowerCase()+')</span></div><div><b>✅ '+tot+'</b><span>'+p("total")+'</span></div></div></div>';
  sec.innerHTML=h;bind(gs,sg);
}
function addGoal(t,per,k){t=String(t).trim();if(!t)return;DB.g.push({i:DB.n++,t:t,p:per||cur,k:k||key(cur,off),d:0});save()}
function bind(gs,sg){
  $("mqb").onclick=function(){show("home")};
  Array.prototype.forEach.call(sec.querySelectorAll("[data-p]"),function(b){b.onclick=function(){cur=b.getAttribute("data-p");off=0;editId=null;msg="";draw()}});
  $("mqp").onclick=function(){off--;editId=null;msg="";draw()};$("mqn").onclick=function(){off++;editId=null;msg="";draw()};
  var t=$("mqt");if(t)t.onclick=function(){off=0;draw()};
  var inp=$("mqi");function go(){if(!inp.value.trim())return;addGoal(inp.value);hap();draw();var n=$("mqi");if(n)n.focus()}
  $("mqa").onclick=go;inp.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();go()}});
  Array.prototype.forEach.call(sec.querySelectorAll("[data-ck]"),function(b){b.onclick=function(){var id=+b.getAttribute("data-ck");DB.g.forEach(function(x){if(x.i===id){x.d=x.d?0:1;if(x.d)hap("medium")}});save();draw()}});
  Array.prototype.forEach.call(sec.querySelectorAll("[data-rm]"),function(b){b.onclick=function(){var id=+b.getAttribute("data-rm");DB.g=DB.g.filter(function(x){return x.i!==id});save();draw()}});
  Array.prototype.forEach.call(sec.querySelectorAll("[data-ed]"),function(b){b.onclick=function(){editId=+b.getAttribute("data-ed");draw();var e=$("mqe");if(e){e.focus();try{e.setSelectionRange(e.value.length,e.value.length)}catch(x){}}}});
  var e=$("mqe");if(e){var fin=function(){var v=e.value.trim();DB.g.forEach(function(x){if(x.i===editId&&v)x.t=v});editId=null;save();draw()};e.addEventListener("keydown",function(ev){if(ev.key==="Enter"){ev.preventDefault();fin()}});e.addEventListener("blur",function(){setTimeout(function(){if(editId!==null)fin()},150)});
    var ok=sec.querySelector("[data-ok]");if(ok)ok.onclick=fin}
  Array.prototype.forEach.call(sec.querySelectorAll("[data-sg]"),function(b){b.onclick=function(){addGoal(c1(sg[+b.getAttribute("data-sg")]));hap();draw()}});
  var c=$("mqc");if(c)c.onclick=function(){var ck=key(cur,0);gs.filter(function(x){return !x.d}).forEach(function(x){addGoal(x.t,cur,ck)});hap("medium");msg=p("carried");draw()};
}
tile.addEventListener("click",function(){off=0;editId=null;msg="";draw();show("maqsad")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){setTimeout(function(){updTile();if(sec.classList.contains("on"))draw()},0)})}
updTile();
})();
