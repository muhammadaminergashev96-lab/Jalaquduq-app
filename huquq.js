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
uz:{tile:"Huquq",tileS:"Konstitutsiya, kodekslar",title:"Huquq",src:"Rasmiy manba: lex.uz. Hujjatlar o‘zgartirilishi mumkin, shuning uchun eng so‘nggi tahriri rasmiy saytda ochiladi. Bu ma’lumot uchun, yuridik maslahat emas.",open:"Ochish",search:"Qidirish…",none:"Hech narsa topilmadi",more:"Boshqa hujjatlar (lex.uz)",moreD:"Rasmiy qonunchilik bazasi",c1:"Asosiy qonun",c2:"Kodekslar",adopted:"Qabul qilingan"},
ru:{tile:"Право",tileS:"Конституция, кодексы",title:"Право",src:"Официальный источник: lex.uz. Документы могут изменяться, поэтому самая свежая редакция открывается на официальном сайте. Это справочная информация, а не юридическая консультация.",open:"Открыть",search:"Поиск…",none:"Ничего не найдено",more:"Другие документы (lex.uz)",moreD:"Официальная база законодательства",c1:"Основной закон",c2:"Кодексы",adopted:"Принят"}
};
var DOCS=[
 {c:1,u:"https://lex.uz/uz/acts/-6445145",e:"🇺🇿",n:["Oʻzbekiston Respublikasi Konstitutsiyasi","Конституция Республики Узбекистан"],d:"30.04.2023"},
 {c:2,u:"https://lex.uz/uz/acts/-6257288",e:"👷",n:["Mehnat kodeksi","Трудовой кодекс"],d:"28.10.2022"},
 {c:2,u:"https://lex.uz/uz/acts/-104720",e:"👪",n:["Oila kodeksi","Семейный кодекс"],d:"30.04.1998"},
 {c:2,u:"https://lex.uz/uz/acts/-111453",e:"⚖️",n:["Jinoyat kodeksi","Уголовный кодекс"],d:"22.09.1994"},
 {c:2,u:"https://lex.uz/uz/acts/-111460",e:"📑",n:["Jinoyat-protsessual kodeksi","Уголовно-процессуальный кодекс"],d:"22.09.1994"},
 {c:2,u:"https://lex.uz/uz/docs/-163629",e:"🔒",n:["Jinoyat-ijroiya kodeksi","Уголовно-исполнительный кодекс"],d:"25.04.1997"},
 {c:2,u:"https://lex.uz/uz/docs/-97664",e:"🚦",n:["Ma’muriy javobgarlik to‘g‘risidagi kodeks","Кодекс об административной ответственности"],d:"22.09.1994"}
];
var MORE="https://lex.uz/";
function p(k){return LANG==="ru"?UI.ru[k]:tr(UI.uz[k])}
function nm(d){return LANG==="ru"?d.n[1]:tr(d.n[0])}
function $(id){return document.getElementById(id)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var css=document.createElement("style");
css.textContent=".hq-s{width:100%;padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;margin:8px 0 4px;font-family:inherit}.hq-h{font-size:13px;color:var(--mut);margin:14px 0 6px;font-weight:700;text-transform:uppercase;letter-spacing:.04em}.hq-i{display:flex;align-items:center;gap:12px;width:100%;padding:12px;border-radius:14px;border:1px solid var(--line);background:var(--bg);color:var(--text);text-align:left;font-family:inherit;margin-bottom:8px}.hq-i .e{font-size:26px}.hq-i b{display:block;font-size:15px;line-height:1.3}.hq-i small{color:var(--mut);font-size:12px}.hq-i .go{margin-left:auto;color:var(--acc);font-weight:700;font-size:13px;white-space:nowrap}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="huquq";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#1e3a8a,#3b82f6)";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">⚖️</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}
function openLink(u){
  try{if(window.Telegram&&Telegram.WebApp&&Telegram.WebApp.openLink){Telegram.WebApp.openLink(u);return}}catch(e){}
  window.open(u,"_blank");
}
var q="";
function listHtml(){
  var ql=q.trim().toLowerCase(),out="",any=false;
  [1,2].forEach(function(c){
    var items=DOCS.filter(function(d){return d.c===c&&(!ql||(d.n[0]+" "+d.n[1]).toLowerCase().indexOf(ql)>=0)});
    if(!items.length)return;any=true;
    out+='<div class="hq-h">'+p("c"+c)+'</div>'+items.map(function(d){
      return '<button class="hq-i" data-u="'+esc(d.u)+'"><span class="e">'+d.e+'</span><span><b>'+esc(nm(d))+'</b><small>'+p("adopted")+': '+d.d+'</small></span><span class="go">'+p("open")+' ↗</span></button>';
    }).join("");
  });
  if(!any)out+='<div class="sub" style="text-align:center;margin:14px 0">'+p("none")+'</div>';
  out+='<button class="hq-i" data-u="'+MORE+'" style="margin-top:12px"><span class="e">🔎</span><span><b>'+p("more")+'</b><small>'+p("moreD")+'</small></span><span class="go">'+p("open")+' ↗</span></button>';
  return out;
}
function bind(){
  var bs=sec.querySelectorAll("[data-u]");for(var i=0;i<bs.length;i++)bs[i].addEventListener("click",function(){openLink(this.getAttribute("data-u"))});
}
function draw(){
  sec.innerHTML='<button class="back" id="hb">← '+T[LANG].back+'</button><div class="card"><h2>'+p("title")+'</h2><input class="hq-s" id="hs" type="search" placeholder="'+p("search")+'" value="'+esc(q)+'"><div id="hl">'+listHtml()+'</div><div class="sub" style="margin:12px 0 0">'+p("src")+'</div></div>';
  $("hb").addEventListener("click",function(){show("home")});
  $("hs").addEventListener("input",function(){q=this.value;$("hl").innerHTML=listHtml();bind()});
  bind();
}
tile.addEventListener("click",function(){q="";draw();show("huquq")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();if(sec.classList.contains("on"))draw()})}
updTile();draw();
})();
