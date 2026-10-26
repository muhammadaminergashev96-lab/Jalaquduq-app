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
uz:{tile:"Tasbeh",tileS:"Zikr hisoblagich",title:"Tasbeh",today:"Bugun",total:"Jami",round:"Aylanish",target:"Nishon",free:"Cheksiz",reset:"Nolga qaytarish",vib:"Tebranish",on:"Yoqilgan",off:"O‘chirilgan",tap:"Bosing",done:"Nishonga yetdingiz!",hint:"Tugmani bosib sanang"},
ru:{tile:"Чётки",tileS:"Счётчик зикра",title:"Чётки",today:"Сегодня",total:"Всего",round:"Круг",target:"Цель",free:"Без лимита",reset:"Сбросить",vib:"Вибрация",on:"Вкл",off:"Выкл",tap:"Нажмите",done:"Цель достигнута!",hint:"Нажимайте на кнопку",}
};
var Z=[
 {ar:"سُبْحَانَ اللّٰهِ",t:"Subhanalloh",r:"Субханаллах",m:"Alloh barcha kamchiliklardan pok",mr:"Аллах чист от всех недостатков"},
 {ar:"الْحَمْدُ لِلّٰهِ",t:"Alhamdulillah",r:"Альхамдулилляh",m:"Hamd Allohgadir",mr:"Хвала Аллаху"},
 {ar:"اللّٰهُ أَكْبَرُ",t:"Allohu akbar",r:"Аллаху акбар",m:"Alloh buyukdir",mr:"Аллах велик"},
 {ar:"لَا إِلٰهَ إِلَّا اللّٰهُ",t:"La ilaha illalloh",r:"Ля иляha иллаллах",m:"Allohdan o‘zga iloh yo‘q",mr:"Нет божества, кроме Аллаха"},
 {ar:"أَسْتَغْفِرُ اللّٰهَ",t:"Astag‘firulloh",r:"Астагфируллах",m:"Allohdan mag‘firat so‘rayman",mr:"Прошу прощения у Аллаха"},
 {ar:"اللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ",t:"Allohumma solli ala Muhammad",r:"Аллахумма салли аля Мухаммад",m:"Salovat",mr:"Салават"},
 {ar:"لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ",t:"La havla va la quvvata illa billah",r:"Ля хавля ва ля куввата илля биллях",m:"Kuch va quvvat faqat Alloh bilandir",mr:"Нет силы и мощи, кроме как у Аллаха"}
];
Z[1].r="Альхамдулиллях";Z[3].r="Ля иляха иллаллах";
var TG=[33,99,100,0];
function p(k){return LANG==="ru"?UI.ru[k]:tr(UI.uz[k])}
function $(id){return document.getElementById(id)}
function today(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}
var S={z:0,count:0,total:0,target:33,vib:true,day:today(),dayN:0};
function load(){try{var j=JSON.parse(localStorage.getItem("tasbeh")||"null");if(j){for(var k in j)S[k]=j[k]}}catch(e){}if(S.day!==today()){S.day=today();S.dayN=0}}
function save(){try{localStorage.setItem("tasbeh",JSON.stringify(S))}catch(e){}}
load();
var css=document.createElement("style");
css.textContent=".tb-chips{display:flex;gap:8px;overflow-x:auto;padding:4px 0 10px}.tb-chip{flex:none;padding:9px 13px;border-radius:20px;border:2px solid var(--line);background:var(--card);color:var(--text);font-size:14px;font-weight:700;font-family:inherit}.tb-chip.on{border-color:var(--acc);background:var(--accbg);color:var(--acc)}.tb-ar{text-align:center;font-size:30px;line-height:1.6;direction:rtl;margin:6px 0 0;font-family:'Amiri','Scheherazade New','Noto Naskh Arabic',serif}.tb-tr{text-align:center;font-weight:700;margin:2px 0}.tb-mn{text-align:center;color:var(--mut);font-size:13px;margin-bottom:8px}.tb-wrap{position:relative;width:260px;max-width:80vw;aspect-ratio:1;margin:10px auto}.tb-wrap svg{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)}.tb-btn{position:absolute;inset:18px;border-radius:50%;border:0;background:linear-gradient(145deg,var(--acc),#0f5c4a);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:inherit;box-shadow:0 8px 22px rgba(0,0,0,.25);touch-action:manipulation;user-select:none;-webkit-tap-highlight-color:transparent;transition:transform .08s}.tb-btn:active,.tb-btn.p{transform:scale(.96)}.tb-btn b{font-size:64px;line-height:1}.tb-btn span{font-size:13px;opacity:.85;margin-top:6px}.tb-st{display:flex;justify-content:space-around;text-align:center;margin:8px 0}.tb-st div b{display:block;font-size:20px}.tb-st div span{font-size:12px;color:var(--mut)}.tb-row{display:flex;gap:8px;margin-top:10px}.tb-row button{flex:1;padding:12px;border-radius:12px;border:0;background:var(--accbg);color:var(--acc);font-weight:700;font-size:14px;font-family:inherit}.tb-done{text-align:center;color:var(--acc);font-weight:800;min-height:22px}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="tasbeh";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#0f766e,#14b8a6)";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">📿</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}
function buzz(strong){
  if(!S.vib)return;
  try{if(window.Telegram&&Telegram.WebApp&&Telegram.WebApp.HapticFeedback){Telegram.WebApp.HapticFeedback[strong?"notificationOccurred":"impactOccurred"](strong?"success":"light");return}}catch(e){}
  try{navigator.vibrate&&navigator.vibrate(strong?[60,40,60]:15)}catch(e){}
}
var C=2*Math.PI*118;
function ring(){
  var pr=S.target?Math.min(1,S.count/S.target):0;
  var r=$("tbr");if(r)r.setAttribute("stroke-dashoffset",String(C*(1-pr)));
}
function nums(){
  $("tbn").textContent=S.count;$("tbt").textContent=S.target?"/ "+S.target:p("tap");
  $("tbd").textContent=S.dayN;$("tbtot").textContent=S.total;$("tbr2").textContent=S.rounds||0;ring();
}
function draw(){
  var z=Z[S.z],ru=LANG==="ru";
  var h='<button class="back" id="tb0">← '+T[LANG].back+'</button><div class="card"><h2>'+p("title")+'</h2>'+
  '<div class="tb-chips">'+Z.map(function(x,i){return '<button class="tb-chip'+(i===S.z?' on':'')+'" data-z="'+i+'">'+(ru?x.r:tr(x.t))+'</button>'}).join("")+'</div>'+
  '<div class="tb-ar">'+z.ar+'</div><div class="tb-tr">'+(ru?z.r:tr(z.t))+'</div><div class="tb-mn">'+(ru?z.mr:tr(z.m))+'</div>'+
  '<div class="tb-wrap"><svg viewBox="0 0 260 260"><circle cx="130" cy="130" r="118" fill="none" stroke="var(--line)" stroke-width="10"/><circle id="tbr" cx="130" cy="130" r="118" fill="none" stroke="var(--acc)" stroke-width="10" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+C+'"/></svg>'+
  '<button class="tb-btn" id="tbb"><b id="tbn">0</b><span id="tbt"></span></button></div><div class="tb-done" id="tbm"></div>'+
  '<div class="tb-st"><div><b id="tbd">0</b><span>'+p("today")+'</span></div><div><b id="tbtot">0</b><span>'+p("total")+'</span></div><div><b id="tbr2">0</b><span>'+p("round")+'</span></div></div>'+
  '<div class="sub" style="margin:0 0 6px">'+p("target")+'</div><div class="tb-chips" style="padding-top:0">'+TG.map(function(t){return '<button class="tb-chip'+(S.target===t?' on':'')+'" data-t="'+t+'">'+(t||p("free"))+'</button>'}).join("")+'</div>'+
  '<div class="tb-row"><button id="tbx">'+p("reset")+'</button><button id="tbv">'+p("vib")+': '+(S.vib?p("on"):p("off"))+'</button></div></div>';
  sec.innerHTML=h;
  $("tb0").addEventListener("click",function(){show("home")});
  var cs=sec.querySelectorAll("[data-z]");for(var i=0;i<cs.length;i++)cs[i].addEventListener("click",function(){S.z=+this.getAttribute("data-z");S.count=0;save();draw()});
  cs=sec.querySelectorAll("[data-t]");for(i=0;i<cs.length;i++)cs[i].addEventListener("click",function(){S.target=+this.getAttribute("data-t");save();draw()});
  $("tbx").addEventListener("click",function(){S.count=0;save();draw()});
  $("tbv").addEventListener("click",function(){S.vib=!S.vib;save();draw()});
  var b=$("tbb"),last=0;
  b.addEventListener("pointerdown",function(e){
    e.preventDefault();var n=Date.now();if(n-last<40)return;last=n;
    if(S.day!==today()){S.day=today();S.dayN=0}
    S.count++;S.total++;S.dayN++;
    var hit=S.target&&S.count>=S.target;
    if(hit){S.rounds=(S.rounds||0)+1;buzz(true);$("tbm").textContent=p("done");S.count=0;nums();$("tbn").textContent=S.target;setTimeout(function(){if($("tbn"))$("tbn").textContent=S.count;var m=$("tbm");if(m)m.textContent="";ring()},900)}
    else{buzz(false);nums()}
    save();
  });
  b.addEventListener("contextmenu",function(e){e.preventDefault()});
  nums();
}
var _show=show;
show=function(id){_show(id)};
tile.addEventListener("click",function(){load();draw();show("tasbeh")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();if(sec.classList.contains("on"))draw()})}
updTile();draw();
})();
