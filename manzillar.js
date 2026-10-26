(function(){
/* MA'LUMOTLAR: har bir bo'limga joylarni shu ko'rinishda qo'shing:
   {n:"Nomi",a:"Manzil",t:"+998901234567",h:"09:00–22:00",m:"xarita havolasi (ixtiyoriy)"}
   Qatorlar orasiga vergul qo'yishni unutmang. */
var DATA={
 masjid:[],
 oshxona:[],
 mehmonxona:[],
 dokon:[],
 dorixona:[],
 shifoxona:[],
 yoqilgi:[],
 boshqa:[]
};
/* MA'LUMOTLAR TUGADI */
var CATS=[["masjid","🕌"],["oshxona","🍽️"],["mehmonxona","🏨"],["dokon","🛒"],["dorixona","💊"],["shifoxona","🏥"],["yoqilgi","⛽"],["boshqa","📌"]];
var NM={
 masjid:["Masjidlar","Масжидлар","Мечети"],
 oshxona:["Oshxonalar","Ошхоналар","Столовые и кафе"],
 mehmonxona:["Mehmonxonalar","Меҳмонхоналар","Гостиницы"],
 dokon:["Do‘konlar","Дўконлар","Магазины"],
 dorixona:["Dorixonalar","Дорихоналар","Аптеки"],
 shifoxona:["Shifoxonalar","Шифохоналар","Больницы"],
 yoqilgi:["Yoqilg‘i quyish","Ёқилғи қуйиш","АЗС"],
 boshqa:["Boshqalar","Бошқалар","Другое"]
};
var P={
 uz:{tile:"Manzillar",tileS:"Oshxona, mehmonxona…",title:"Manzillar",empty:"Bu bo‘limga ma’lumot tez orada qo‘shiladi.",call:"Qo‘ng‘iroq",map:"Xaritada"},
 oz:{tile:"Манзиллар",tileS:"Ошхона, меҳмонхона…",title:"Манзиллар",empty:"Бу бўлимга маълумот тез орада қўшилади.",call:"Қўнғироқ",map:"Харитада"},
 ru:{tile:"Адреса",tileS:"Столовые, гостиницы…",title:"Адреса",empty:"Информация в этот раздел скоро будет добавлена.",call:"Позвонить",map:"На карте"}
};
function li(){return LANG==="oz"?1:LANG==="ru"?2:0}
function p(k){return (P[LANG]||P.uz)[k]}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}

var css=document.createElement("style");
css.textContent=".t6{background:linear-gradient(135deg,#0b7285,#3bc9db)}.mrow{display:flex;align-items:center;gap:12px;width:100%;padding:14px;border-radius:14px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;font-weight:600;margin-bottom:8px;text-align:left;font-family:inherit}.mrow .e{font-size:24px}.mrow .c{margin-left:auto;color:var(--mut);font-size:14px}.pl{border-top:1px solid var(--line);padding:12px 0}.pl:first-of-type{border-top:0;padding-top:0}.pl b{font-size:16px}.pl .d{color:var(--mut);font-size:14px;margin-top:3px}.pl .acts{display:flex;gap:8px;margin-top:10px}.pl .acts a{flex:1;text-align:center;padding:10px;border-radius:10px;background:var(--accbg);color:var(--acc);text-decoration:none;font-weight:700;font-size:14px}";
document.head.appendChild(css);

var cur=null;
var sec=document.createElement("div");sec.className="sec";sec.id="manzillar";
document.body.appendChild(sec);
var tile=document.createElement("button");
tile.className="tile t6";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">📍</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}

function placeHtml(x){
  var tel=x.t?String(x.t).replace(/[^\d+]/g,""):"";
  var mp=x.m||("https://www.google.com/maps/search/?api=1&query="+encodeURIComponent((x.n||"")+" "+(x.a||"")));
  var acts=(tel?'<a href="tel:'+tel+'">'+p("call")+'</a>':'')+((x.a||x.m)?'<a href="'+esc(mp)+'" target="_blank" rel="noopener">'+p("map")+'</a>':'');
  return '<div class="pl"><b>'+esc(x.n||"")+'</b>'+(x.a?'<div class="d">📍 '+esc(x.a)+'</div>':'')+(x.h?'<div class="d">🕒 '+esc(x.h)+'</div>':'')+(x.t?'<div class="d">📞 '+esc(x.t)+'</div>':'')+(acts?'<div class="acts">'+acts+'</div>':'')+'</div>';
}
function draw(){
  var h='<button class="back" id="mb">← '+T[LANG].back+'</button>';
  if(cur===null){
    h+='<div class="card"><h2>'+p("title")+'</h2>'+CATS.map(function(c){
      var n=DATA[c[0]].length;
      return '<button class="mrow" data-c="'+c[0]+'"><span class="e">'+c[1]+'</span><span>'+NM[c[0]][li()]+'</span><span class="c">'+(n||"")+'</span></button>';
    }).join("")+'</div>';
  }else{
    var L=DATA[cur];
    h+='<div class="card"><h2>'+NM[cur][li()]+'</h2>'+(L.length?L.map(placeHtml).join(""):'<div class="sub" style="margin:0">'+p("empty")+'</div>')+'</div>';
  }
  sec.innerHTML=h;
  document.getElementById("mb").addEventListener("click",function(){show("home")});
  var bs=sec.querySelectorAll("[data-c]");
  for(var i=0;i<bs.length;i++){bs[i].addEventListener("click",function(){cur=this.getAttribute("data-c");draw();window.scrollTo(0,0)})}
}

var _show=show;
show=function(id){
  if(id==="home"&&cur!==null&&sec.classList.contains("on")){cur=null;draw();window.scrollTo(0,0);return}
  _show(id);
};
tile.addEventListener("click",function(){cur=null;draw();show("manzillar")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();draw()})}
updTile();draw();
})();
