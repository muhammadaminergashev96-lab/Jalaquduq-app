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
var home=document.getElementById("home"),og=home&&home.querySelector(".grid");
if(!og)return;
var UI={uz:{search:"Bo‘lim qidirish…",quick:"Tez kirish",none:"Hech narsa topilmadi"},ru:{search:"Поиск раздела…",quick:"Быстрый доступ",none:"Ничего не найдено"}};
function p(k){var v=(typeof LANG!=="undefined"&&LANG==="ru"?UI.ru:UI.uz)[k];return typeof LANG!=="undefined"&&LANG==="oz"?cyr(v):v}
var GR=[
 {e:"🕌",n:["Kundalik","Ежедневное"],k:["namoz","qibla","tasbeh","obhavo","valyuta"]},
 {e:"🧰",n:["Foydali vositalar","Полезные инструменты"],k:["xarajat","rasm","yosh","tillar","tabrik"]},
 {e:"🚗",n:["Yo‘l va huquq","Дорога и право"],k:["prava","huquq","shosh","manzil"]},
 {e:"🎉",n:["Dam olish","Отдых"],k:["oyin","viktorina","qoshiq","taom"]},
 {e:"📦",n:["Boshqa","Другое"],k:[]}
];
var RX=[
 ["namoz",/namoz|намаз/],["qibla",/qibla|кибла|қибла/],["tasbeh",/tasbeh|тасбеҳ|тасбех|чётк|четк/],["obhavo",/ob.?havo|ҳаво|хаво|погод/],["valyuta",/valyuta|валют|курс/],
 ["xarajat",/xarajat|харажат|расход/],["rasm",/rasm|расм|фото/],["yosh",/yosh|ёш|возраст/],["tillar",/tillar|тиллар|язык/],["tabrik",/tabrik|табрик|поздрав/],
 ["prava",/prava|права/],["huquq",/huquq|ҳуқуқ|хукук|право/],["shosh",/shosh|шошил|срочн|экстрен/],["manzil",/manzil|манзил|адрес/],
 ["oyin",/oyin|ўйин|уйин|игр/],["viktorina",/viktorin|виктор/],["qoshiq",/qoshiq|қўшиқ|қушиқ|musiq|музык|песн/],["taom",/taom|таом|блюд|рецепт/]
];
function nz(s){return String(s||"").toLowerCase().replace(/[ʻʼ‘’'`´]/g,"")}
function keyOf(t){var b=t.querySelector("b"),s=nz(b?b.textContent:t.textContent);for(var i=0;i<RX.length;i++)if(RX[i][1].test(s))return RX[i][0];return null}
function title(t){var b=t.querySelector("b");return b?b.textContent:t.textContent}

var css=document.createElement("style");
css.textContent=".mn-s{position:relative;margin:4px 0 6px}.mn-s input{width:100%;box-sizing:border-box;padding:13px 14px 13px 42px;border-radius:14px;border:1px solid var(--line);background:var(--card);color:var(--text);font-size:16px;font-family:inherit}.mn-s:before{content:'🔎';position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:16px}.mn-h{display:flex;align-items:center;gap:8px;width:100%;padding:14px 4px 8px;border:0;background:none;color:var(--text);font-size:15px;font-weight:800;font-family:inherit;text-align:left}.mn-h .e{font-size:18px}.mn-h .c{margin-left:auto;font-size:12px;font-weight:700;color:var(--mut);background:var(--accbg);border-radius:10px;padding:2px 8px}.mn-h .v{font-size:12px;color:var(--mut);transition:transform .2s}.mn-g.off .mn-h .v{transform:rotate(-90deg)}.mn-g.off .grid{display:none}.mn-q{display:flex;gap:8px;overflow-x:auto;padding:2px 0 8px;margin:0 -2px;-webkit-overflow-scrolling:touch}.mn-q button{flex:none;display:flex;align-items:center;gap:6px;padding:9px 13px;border-radius:20px;border:1px solid var(--line);background:var(--card);color:var(--text);font-size:14px;font-weight:700;font-family:inherit;white-space:nowrap}.mn-ql{font-size:12px;font-weight:700;color:var(--mut);margin:12px 4px 6px;text-transform:uppercase;letter-spacing:.04em}.mn-n{text-align:center;color:var(--mut);padding:24px 0;font-size:14px}";
document.head.appendChild(css);

var root=document.createElement("div");root.id="menu2";og.parentNode.insertBefore(root,og);
var S0=document.createElement("div");S0.className="mn-s";var inp=document.createElement("input");inp.type="search";inp.setAttribute("autocomplete","off");inp.setAttribute("enterkeyhint","search");S0.appendChild(inp);root.appendChild(S0);
var Q=document.createElement("div");root.appendChild(Q);
var groups=[],none=document.createElement("div");none.className="mn-n";none.style.display="none";
var col={};try{col=JSON.parse(localStorage.getItem("mn_col")||"{}")||{}}catch(e){}
var rec=[];try{rec=JSON.parse(localStorage.getItem("mn_rec")||"[]")||[]}catch(e){}
GR.forEach(function(g,gi){
  var w=document.createElement("div");w.className="mn-g"+(col[gi]?" off":"");
  var h=document.createElement("button");h.className="mn-h";h.innerHTML='<span class="e">'+g.e+'</span><span class="t"></span><span class="c"></span><span class="v">▾</span>';
  var grid=document.createElement("div");grid.className="grid";
  w.appendChild(h);w.appendChild(grid);root.appendChild(w);
  h.addEventListener("click",function(){var off=w.classList.toggle("off");col[gi]=off?1:0;try{localStorage.setItem("mn_col",JSON.stringify(col))}catch(e){}});
  groups.push({w:w,g:g,grid:grid,h:h,tiles:[]});
});
root.appendChild(none);
var byKey={};
function place(t){
  if(t.__mn)return;t.__mn=1;
  var k=keyOf(t),gi=GR.length-1,ord=99;
  if(k)for(var i=0;i<GR.length;i++){var ix=GR[i].k.indexOf(k);if(ix>=0){gi=i;ord=ix;break}}
  t.__k=k;t.__o=ord;byKey[k||("x"+Math.random())]=t;
  var G=groups[gi],pos=G.tiles.length;
  for(var j=0;j<G.tiles.length;j++){if(G.tiles[j].__o>ord){pos=j;break}}
  G.tiles.splice(pos,0,t);
  var ref=G.grid.children[pos];G.grid.insertBefore(t,ref||null);
  t.addEventListener("click",function(){if(!t.__k)return;rec=rec.filter(function(x){return x!==t.__k});rec.unshift(t.__k);rec=rec.slice(0,4);try{localStorage.setItem("mn_rec",JSON.stringify(rec))}catch(e){}},true);
}
function sweep(){var l=og.querySelectorAll(".tile");for(var i=0;i<l.length;i++)place(l[i]);og.style.display="none";labels()}
function labels(){
  groups.forEach(function(G,i){G.h.querySelector(".t").textContent=LANG==="ru"?G.g.n[1]:(LANG==="oz"?cyr(G.g.n[0]):G.g.n[0]);G.h.querySelector(".c").textContent=G.tiles.length;G.w.style.display=G.tiles.length?"":"none"});
  inp.placeholder=p("search");none.textContent=p("none");
  quick();
}
function quick(){
  Q.innerHTML="";var chips=rec.map(function(k){for(var i=0;i<groups.length;i++)for(var j=0;j<groups[i].tiles.length;j++)if(groups[i].tiles[j].__k===k)return groups[i].tiles[j];return null}).filter(Boolean);
  if(!chips.length||inp.value.trim())return;
  var l=document.createElement("div");l.className="mn-ql";l.textContent=p("quick");Q.appendChild(l);
  var row=document.createElement("div");row.className="mn-q";
  chips.forEach(function(t){var b=document.createElement("button"),ic=t.querySelector(".ic");b.innerHTML='<span>'+(ic?ic.textContent:"")+'</span><span></span>';b.lastChild.textContent=title(t);b.addEventListener("click",function(){t.click()});row.appendChild(b)});
  Q.appendChild(row);
}
function filter(){
  var q=nz(inp.value.trim()),any=false;
  groups.forEach(function(G){
    var vis=0;G.tiles.forEach(function(t){var m=!q||nz(t.textContent).indexOf(q)>=0;t.style.display=m?"":"none";if(m)vis++});
    G.w.style.display=(G.tiles.length&&vis)?"":"none";if(q&&vis)G.w.classList.remove("off");if(vis)any=true;
  });
  none.style.display=any?"none":"block";quick();
}
inp.addEventListener("input",filter);
sweep();filter();
try{new MutationObserver(function(){sweep();filter()}).observe(og,{childList:true})}catch(e){}
var lb=document.querySelectorAll(".lang button");
for(var i=0;i<lb.length;i++)lb[i].addEventListener("click",function(){setTimeout(function(){labels();filter()},0)});
})();
