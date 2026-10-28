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
uz:{tile:"Vaqt taqsimi",tileS:"24 soatni rejalash",title:"24 soat rejasi",plan:["Ish kuni","Dam olish kuni"],planed:"Rejada",free:"Bo‘sh",h:"s",m:"daq",now:"Hozir",left:"qoldi",nothing:"Hozir bo‘sh vaqt",next:"Keyingisi",
 add:"Yangi vaqt bloki qo‘shish",pick:"Faoliyat",name:"Nomi",from:"Boshlanishi",to:"Tugashi",addb:"Qo‘shish",save:"Saqlash",cancel:"Bekor",del:"O‘chirish",
 busy:"Bu vaqt band:",same:"Boshlanish va tugash vaqti bir xil bo‘lmasin",sum:"Hisob-kitob",none:"Hali blok yo‘q. Quyida qo‘shing yoki tayyor rejani tanlang.",tpl:"Tayyor rejalar",tpl1:"Ish kuni",tpl2:"Talaba",tplw:"Bo‘sh reja",
 copy:"Rejani nusxalash",copied:"Nusxalandi ✓",reset:"Rejani tozalash",ask:"Reja o‘chirilsinmi?",yes:"Ha",no:"Yo‘q",hours:"24 soat",
 note:"Reja telefonda saqlanadi. Tugash vaqti boshlanishidan oldin bo‘lsa, blok yarim tundan o‘tadi (masalan, uyqu 23:00–06:00).",
 act:{sleep:"Uyqu",work:"Ish",study:"O‘qish",pray:"Namoz",sport:"Sport",food:"Ovqat",road:"Yo‘l",family:"Oila",rest:"Dam olish",phone:"Telefon",home:"Uy ishlari",other:"Boshqa"}},
ru:{tile:"Распределение времени",tileS:"План на 24 часа",title:"План на 24 часа",plan:["Рабочий день","Выходной"],planed:"В плане",free:"Свободно",h:"ч",m:"мин",now:"Сейчас",left:"осталось",nothing:"Сейчас свободное время",next:"Дальше",
 add:"Добавить блок времени",pick:"Занятие",name:"Название",from:"Начало",to:"Конец",addb:"Добавить",save:"Сохранить",cancel:"Отмена",del:"Удалить",
 busy:"Это время занято:",same:"Начало и конец не должны совпадать",sum:"Итоги",none:"Пока нет блоков. Добавьте ниже или выберите готовый план.",tpl:"Готовые планы",tpl1:"Рабочий день",tpl2:"Студент",tplw:"Пустой план",
 copy:"Скопировать план",copied:"Скопировано ✓",reset:"Очистить план",ask:"Очистить план?",yes:"Да",no:"Нет",hours:"24 часа",
 note:"План хранится на телефоне. Если конец раньше начала, блок переходит через полночь (например, сон 23:00–06:00).",
 act:{sleep:"Сон",work:"Работа",study:"Учёба",pray:"Намаз",sport:"Спорт",food:"Еда",road:"Дорога",family:"Семья",rest:"Отдых",phone:"Телефон",home:"Домашние дела",other:"Другое"}}
};
var ACT={sleep:["😴","#6366f1"],work:["💼","#0ea5e9"],study:["📚","#8b5cf6"],pray:["🕌","#0f9d84"],sport:["🏃","#f97316"],food:["🍽️","#eab308"],road:["🚌","#64748b"],family:["👨‍👩‍👧","#ec4899"],rest:["🛋️","#14b8a6"],phone:["📱","#ef4444"],home:["🧹","#a16207"],other:["⭐","#94a3b8"]};
var AK=["sleep","work","study","pray","sport","food","road","family","rest","phone","home","other"];
function L(){return LANG==="ru"?UI.ru:UI.uz}
function c1(s){return LANG==="oz"?cyr(s):s}
function p(k){var v=L()[k];return typeof v==="string"?c1(v):v}
function an(k){return c1(L().act[k])}
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function hap(){try{var h=window.Telegram&&Telegram.WebApp&&Telegram.WebApp.HapticFeedback;if(h)h.impactOccurred("light")}catch(e){}}
function z(n){return (n<10?"0":"")+n}
function tm(m){m=((m%1440)+1440)%1440;return z(Math.floor(m/60))+":"+z(m%60)}
function pt(s){var a=String(s).split(":");return (+a[0])*60+(+a[1]||0)}
function dur(b){return ((b.t-b.s)%1440+1440)%1440}
function dtxt(m){var h=Math.floor(m/60),mm=m%60;return (h?h+" "+p("h"):"")+(h&&mm?" ":"")+(mm?mm+" "+p("m"):"")||("0 "+p("m"))}
var DB={cur:0,n:1,plans:[{b:[]},{b:[]}]};
try{var sv=JSON.parse(localStorage.getItem("vt_db")||"null");if(sv&&sv.plans&&sv.plans.length===2)DB=sv}catch(e){}
function save(){try{localStorage.setItem("vt_db",JSON.stringify(DB))}catch(e){}}
function plan(){return DB.plans[DB.cur]}
function segs(b){var d=dur(b);return b.s+d<=1440?[[b.s,b.s+d]]:[[b.s,1440],[0,b.s+d-1440]]}
function clash(a,list,skip){
  var sa=segs(a);
  for(var i=0;i<list.length;i++){var o=list[i];if(o.i===skip)continue;
    var so=segs(o);
    for(var x=0;x<sa.length;x++)for(var y=0;y<so.length;y++)if(sa[x][0]<so[y][1]&&so[y][0]<sa[x][1])return o}
  return null;
}
function blockName(b){return b.k&&!b.n?an(b.k):(b.n||"")}
function TPL(n){
  var A=function(k,s,t,nm){return {k:k,n:nm||"",s:pt(s),t:pt(t)}};
  if(n===1)return [A("sleep","23:00","06:00"),A("pray","06:00","07:00"),A("road","07:00","08:00"),A("work","08:00","12:00"),A("food","12:00","13:00"),A("work","13:00","17:00"),A("road","17:00","18:00"),A("family","18:00","20:00"),A("sport","20:00","21:00"),A("rest","21:00","23:00")];
  if(n===2)return [A("sleep","23:00","06:30"),A("pray","06:30","07:30"),A("food","07:30","08:00"),A("road","08:00","08:30"),A("study","08:30","13:30"),A("food","13:30","14:30"),A("study","14:30","17:30"),A("sport","17:30","19:00"),A("family","19:00","21:00"),A("phone","21:00","22:00"),A("rest","22:00","23:00")];
  return [];
}
function setTpl(n){plan().b=TPL(n).map(function(b){b.i=DB.n++;return b});save()}
var ED=null,toast="",askReset=false,form={k:"work",n:"",s:null,t:null};
function nextStart(){var b=plan().b;if(!b.length)return 6*60;var best=0;b.forEach(function(x){var e=(x.s+dur(x))%1440;if(x.s+dur(x)<=1440&&x.s+dur(x)>best)best=x.s+dur(x)});return best%1440}
function arc(cx,cy,r1,r2,a1,a2){
  var f=function(a,r){var t=(a-90)*Math.PI/180;return [cx+r*Math.cos(t),cy+r*Math.sin(t)]};
  if(a2-a1>=359.99){return "M"+f(0,r2)[0]+" "+f(0,r2)[1]+"A"+r2+" "+r2+" 0 1 1 "+f(180,r2)[0]+" "+f(180,r2)[1]+"A"+r2+" "+r2+" 0 1 1 "+f(0,r2)[0]+" "+f(0,r2)[1]+"M"+f(0,r1)[0]+" "+f(0,r1)[1]+"A"+r1+" "+r1+" 0 1 0 "+f(180,r1)[0]+" "+f(180,r1)[1]+"A"+r1+" "+r1+" 0 1 0 "+f(0,r1)[0]+" "+f(0,r1)[1]+"Z"}
  var o1=f(a1,r2),o2=f(a2,r2),i2=f(a2,r1),i1=f(a1,r1),lg=a2-a1>180?1:0;
  return "M"+o1.join(" ")+"A"+r2+" "+r2+" 0 "+lg+" 1 "+o2.join(" ")+"L"+i2.join(" ")+"A"+r1+" "+r1+" 0 "+lg+" 0 "+i1.join(" ")+"Z";
}
function colorOf(b){return (ACT[b.k]||ACT.other)[1]}
function emoOf(b){return (ACT[b.k]||ACT.other)[0]}
function chart(){
  var b=plan().b,tot=b.reduce(function(s,x){return s+dur(x)},0),free=1440-tot,now=new Date(),nm=now.getHours()*60+now.getMinutes();
  var sv='<svg viewBox="0 0 220 220" width="100%" style="max-width:300px;display:block;margin:0 auto"><circle cx="110" cy="110" r="84" fill="none" stroke="var(--line)" stroke-width="34" opacity=".6"/>';
  b.forEach(function(x){segs(x).forEach(function(sg){var a1=sg[0]/4,a2=sg[1]/4;sv+='<path d="'+arc(110,110,67,101,a1,a2)+'" fill="'+colorOf(x)+'" fill-rule="evenodd" stroke="var(--card)" stroke-width="1.5"/>'})});
  [0,6,12,18].forEach(function(h){var t=(h*15-90)*Math.PI/180;sv+='<text x="'+(110+115*Math.cos(t)).toFixed(1)+'" y="'+(110+115*Math.sin(t)+3.5).toFixed(1)+'" text-anchor="middle" font-size="9" font-weight="700" fill="var(--mut)" font-family="inherit">'+z(h)+'</text>'});
  var t2=(nm/4-90)*Math.PI/180;
  sv+='<line x1="'+(110+60*Math.cos(t2)).toFixed(1)+'" y1="'+(110+60*Math.sin(t2)).toFixed(1)+'" x2="'+(110+106*Math.cos(t2)).toFixed(1)+'" y2="'+(110+106*Math.sin(t2)).toFixed(1)+'" stroke="var(--text)" stroke-width="2.5" stroke-linecap="round"/><circle cx="'+(110+106*Math.cos(t2)).toFixed(1)+'" cy="'+(110+106*Math.sin(t2)).toFixed(1)+'" r="3.5" fill="var(--text)"/>';
  sv+='<text x="110" y="104" text-anchor="middle" font-size="22" font-weight="800" fill="var(--text)" font-family="inherit">'+tm(nm)+'</text><text x="110" y="122" text-anchor="middle" font-size="10" fill="var(--mut)" font-family="inherit">'+esc(p("free"))+': '+esc(dtxt(free))+'</text></svg>';
  return sv;
}
function current(){
  var b=plan().b,now=new Date(),nm=now.getHours()*60+now.getMinutes(),cur=null,nx=null,best=9999;
  b.forEach(function(x){var d=dur(x),off=(nm-x.s+1440)%1440;if(off<d)cur={x:x,left:d-off};var gap=(x.s-nm+1440)%1440;if(gap>0&&gap<best){best=gap;nx=x}});
  if(cur)return '<div class="vt-now"><span class="e">'+emoOf(cur.x)+'</span><div><b>'+p("now")+': '+esc(blockName(cur.x))+'</b><span>'+tm(cur.x.s)+'–'+tm(cur.x.t)+' · '+esc(dtxt(cur.left))+' '+p("left")+'</span></div></div>';
  if(nx)return '<div class="vt-now"><span class="e">⏳</span><div><b>'+p("nothing")+'</b><span>'+p("next")+': '+emoOf(nx)+' '+esc(blockName(nx))+' · '+tm(nx.s)+'</span></div></div>';
  return "";
}
var css=document.createElement("style");
css.textContent=".vt-tabs{display:flex;gap:6px;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:4px;margin-bottom:12px}.vt-tabs button{flex:1;padding:10px 0;border:0;border-radius:12px;background:none;color:var(--mut);font-weight:700;font-size:14px;font-family:inherit}.vt-tabs button.on{background:var(--acc);color:#fff}.vt-c{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:14px;margin-bottom:12px}.vt-h{font-size:12px;font-weight:800;letter-spacing:.05em;color:var(--mut);text-transform:uppercase;margin:0 0 10px}.vt-now{display:flex;align-items:center;gap:12px;background:var(--accbg);border-radius:16px;padding:12px;margin-bottom:12px}.vt-now .e{font-size:28px}.vt-now b{display:block;font-size:15px;color:var(--text)}.vt-now span{font-size:13px;color:var(--mut)}.vt-r{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:none;border:0;border-top:1px solid var(--line);padding:11px 0;color:var(--text);font-family:inherit}.vt-r:first-of-type{border-top:0}.vt-r i{flex:none;width:6px;align-self:stretch;border-radius:3px}.vt-r .e{font-size:22px;flex:none}.vt-r .m{flex:1;min-width:0}.vt-r .m b{display:block;font-size:15px}.vt-r .m span{font-size:12px;color:var(--mut)}.vt-r .d{font-weight:800;font-size:14px;flex:none}.vt-ch{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}.vt-ch button{padding:8px 11px;border-radius:14px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:13px;font-family:inherit}.vt-ch button.on{background:var(--accbg);border-color:var(--acc);color:var(--acc);font-weight:700}.vt-f{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}.vt-f label{font-size:12px;color:var(--mut);display:block;margin-bottom:4px}.vt-f input,.vt-nm{width:100%;box-sizing:border-box;padding:12px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;font-family:inherit}.vt-nm{margin-bottom:10px}.vt-b{display:block;width:100%;padding:13px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-weight:800;font-size:15px;font-family:inherit}.vt-b2{display:block;width:100%;padding:12px;border:0;border-radius:12px;background:var(--accbg);color:var(--acc);font-weight:700;font-size:14px;font-family:inherit;margin-top:8px}.vt-b3{padding:12px;border:0;border-radius:12px;background:var(--bg);color:var(--text);font-size:14px;font-family:inherit;flex:1}.vt-er{background:rgba(214,69,69,.1);color:var(--dn);padding:10px 12px;border-radius:12px;font-size:13px;margin-bottom:10px}.vt-sm{display:flex;align-items:center;gap:8px;margin:7px 0;font-size:14px}.vt-sm .bar{flex:1;height:8px;border-radius:4px;background:var(--line);overflow:hidden}.vt-sm .bar i{display:block;height:100%;border-radius:4px}.vt-sm .v{font-weight:700;min-width:70px;text-align:right}.vt-nt{font-size:12px;color:var(--mut);text-align:center;margin:8px 6px 24px;line-height:1.45}.vt-e{text-align:center;color:var(--mut);font-size:14px;padding:6px 8px 12px;line-height:1.4}.vt-row2{display:flex;gap:8px}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="vaqt";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#4f46e5,#06b6d4)";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">⏱️</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}
function formHtml(){
  var e=ED!==null?plan().b.filter(function(x){return x.i===ED})[0]:null,f=e?{k:e.k,n:blockName(e),s:e.s,t:e.t}:form;
  if(f.s===null||f.s===undefined){f.s=nextStart();f.t=(f.s+60)%1440;if(!e){form.s=f.s;form.t=f.t}}
  var h='<div class="vt-c"><div class="vt-h">'+(e?p("save"):p("add"))+'</div><div class="vt-ch">'+AK.map(function(k){return '<button data-k="'+k+'" class="'+(f.k===k?"on":"")+'">'+ACT[k][0]+' '+esc(an(k))+'</button>'}).join("")+'</div>';
  h+='<input class="vt-nm" id="vtn" maxlength="30" placeholder="'+esc(p("name"))+'" value="'+esc(f.n||an(f.k))+'">';
  h+='<div class="vt-f"><div><label>'+p("from")+'</label><input type="time" id="vts" value="'+tm(f.s)+'"></div><div><label>'+p("to")+'</label><input type="time" id="vtt" value="'+tm(f.t)+'"></div></div>';
  if(toast)h+='<div class="vt-er">'+toast+'</div>';
  h+='<div class="vt-row2"><button class="vt-b" id="vtok">'+(e?p("save"):p("addb"))+'</button>'+(e?'<button class="vt-b3" id="vtcan">'+p("cancel")+'</button><button class="vt-b3" id="vtdel" style="color:var(--dn)">'+p("del")+'</button>':'')+'</div></div>';
  return h;
}
function draw(){
  var T0=(typeof T!=="undefined"&&T[LANG])||{back:"Orqaga"},b=plan().b.slice().sort(function(a,c){return a.s-c.s});
  var h='<button class="back" id="vtb">← '+T0.back+'</button><div style="font-size:22px;font-weight:800;margin:4px 2px 12px">'+p("title")+'</div>';
  h+='<div class="vt-tabs">'+L().plan.map(function(n,i){return '<button data-p="'+i+'" class="'+(i===DB.cur?"on":"")+'">'+esc(c1(n))+'</button>'}).join("")+'</div>';
  h+='<div class="vt-c">'+chart()+'</div>'+current();
  if(!b.length){h+='<div class="vt-c"><div class="vt-e">'+p("none")+'</div><div class="vt-h" style="text-align:center">'+p("tpl")+'</div><div class="vt-row2"><button class="vt-b3" data-t="1">'+p("tpl1")+'</button><button class="vt-b3" data-t="2">'+p("tpl2")+'</button></div></div>'}
  else{
    h+='<div class="vt-c">'+b.map(function(x){return '<button class="vt-r" data-e="'+x.i+'"><i style="background:'+colorOf(x)+'"></i><span class="e">'+emoOf(x)+'</span><span class="m"><b>'+esc(blockName(x))+'</b><span>'+tm(x.s)+' – '+tm(x.t)+'</span></span><span class="d">'+esc(dtxt(dur(x)))+'</span></button>'}).join("")+'</div>';
    var by={};b.forEach(function(x){var k=x.k||"other";by[k]=(by[k]||0)+dur(x)});
    var ks=Object.keys(by).sort(function(a,c){return by[c]-by[a]}),tot=b.reduce(function(s,x){return s+dur(x)},0);
    h+='<div class="vt-c"><div class="vt-h">'+p("sum")+'</div>'+ks.map(function(k){return '<div class="vt-sm"><span style="min-width:96px;white-space:nowrap">'+ACT[k][0]+' '+esc(an(k))+'</span><span class="bar"><i style="width:'+Math.round(by[k]*100/1440)+'%;background:'+ACT[k][1]+'"></i></span><span class="v">'+esc(dtxt(by[k]))+'</span></div>'}).join("")+'<div class="vt-sm"><span style="min-width:96px;white-space:nowrap">⬜ '+esc(p("free"))+'</span><span class="bar"><i style="width:'+Math.round((1440-tot)*100/1440)+'%;background:var(--mut);opacity:.4"></i></span><span class="v">'+esc(dtxt(1440-tot))+'</span></div></div>';
  }
  h+=formHtml();
  if(b.length){
    h+='<button class="vt-b2" id="vtcp">'+p("copy")+'</button>';
    h+=askReset?'<div class="vt-c" style="margin-top:10px"><div style="margin-bottom:8px">'+p("ask")+'</div><div class="vt-row2"><button class="vt-b3" id="vtry" style="color:var(--dn)">'+p("yes")+'</button><button class="vt-b3" id="vtrn">'+p("no")+'</button></div></div>':'<button class="vt-b2" id="vtrs" style="background:var(--bg);color:var(--mut)">'+p("reset")+'</button>';
    h+='<div class="vt-c" style="margin-top:12px"><div class="vt-h">'+p("tpl")+'</div><div class="vt-row2"><button class="vt-b3" data-t="1">'+p("tpl1")+'</button><button class="vt-b3" data-t="2">'+p("tpl2")+'</button></div></div>';
  }
  h+='<div class="vt-nt">'+p("note")+'</div>';
  sec.innerHTML=h;bind();
}
function readForm(){
  var n=$("vtn").value.trim(),s=pt($("vts").value||"00:00"),t=pt($("vtt").value||"00:00");
  return {n:n,s:s,t:t};
}
function bind(){
  $("vtb").onclick=function(){show("home")};
  Array.prototype.forEach.call(sec.querySelectorAll("[data-p]"),function(x){x.onclick=function(){DB.cur=+x.getAttribute("data-p");ED=null;toast="";askReset=false;form={k:"work",n:"",s:null,t:null};save();draw()}});
  Array.prototype.forEach.call(sec.querySelectorAll("[data-t]"),function(x){x.onclick=function(){setTpl(+x.getAttribute("data-t"));hap();draw()}});
  Array.prototype.forEach.call(sec.querySelectorAll("[data-e]"),function(x){x.onclick=function(){ED=+x.getAttribute("data-e");toast="";draw();var f=$("vtn");if(f&&f.scrollIntoView)f.scrollIntoView({block:"center"})}});
  Array.prototype.forEach.call(sec.querySelectorAll("[data-k]"),function(x){x.onclick=function(){
    var r=readForm(),k=x.getAttribute("data-k"),prev=ED!==null?plan().b.filter(function(y){return y.i===ED})[0]:null;
    var oldK=ED!==null?(prev&&prev.k):form.k,defaultName=!r.n||AK.some(function(a){return an(a)===r.n});
    if(ED!==null){prev.k=k;if(defaultName)prev.n="";prev.s=r.s;prev.t=r.t;if(!defaultName)prev.n=r.n;save()}
    else{form.k=k;form.n=defaultName?"":r.n;form.s=r.s;form.t=r.t}
    draw()}});
  $("vtok").onclick=function(){
    var r=readForm(),k=ED!==null?plan().b.filter(function(y){return y.i===ED})[0].k:form.k;
    if(r.s===r.t){toast=p("same");draw();return}
    var nb={i:ED!==null?ED:DB.n,k:k,n:(r.n&&r.n!==an(k))?r.n:"",s:r.s,t:r.t},c=clash(nb,plan().b,ED);
    if(c){toast=p("busy")+" "+emoOf(c)+" "+esc(blockName(c))+" ("+tm(c.s)+"–"+tm(c.t)+")";if(ED===null){form.n=r.n;form.s=r.s;form.t=r.t}draw();return}
    if(ED!==null){plan().b=plan().b.map(function(y){return y.i===ED?nb:y});ED=null}
    else{DB.n++;plan().b.push(nb);form={k:form.k,n:"",s:null,t:null}}
    toast="";save();hap();draw();
  };
  var cn=$("vtcan");if(cn)cn.onclick=function(){ED=null;toast="";draw()};
  var dl=$("vtdel");if(dl)dl.onclick=function(){plan().b=plan().b.filter(function(y){return y.i!==ED});ED=null;toast="";save();draw()};
  var cp=$("vtcp");if(cp)cp.onclick=function(){
    var b=plan().b.slice().sort(function(a,c){return a.s-c.s}),txt=c1(L().plan[DB.cur])+" — 24 "+p("h")+"\n"+b.map(function(x){return tm(x.s)+"–"+tm(x.t)+" "+emoOf(x)+" "+blockName(x)+" ("+dtxt(dur(x))+")"}).join("\n");
    function ok(){hap();cp.textContent=p("copied");setTimeout(function(){cp.textContent=p("copy")},1500)}
    function fb(){var ta=document.createElement("textarea");ta.value=txt;ta.style.cssText="position:fixed;opacity:0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");ok()}catch(e){}document.body.removeChild(ta)}
    try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(ok,fb);return}}catch(e){}fb();
  };
  var rs=$("vtrs");if(rs)rs.onclick=function(){askReset=true;draw()};
  var ry=$("vtry");if(ry)ry.onclick=function(){plan().b=[];askReset=false;ED=null;save();draw()};
  var rn=$("vtrn");if(rn)rn.onclick=function(){askReset=false;draw()};
}
tile.addEventListener("click",function(){ED=null;toast="";askReset=false;draw();show("vaqt")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){setTimeout(function(){updTile();if(sec.classList.contains("on"))draw()},0)})}
updTile();
})();
