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
uz:{tile:"O‘yinlar",tileS:"Kichik va katta uchun",title:"O‘yinlar",kids:"Kichiklar",adults:"Kattalar",
 g1:"Sharcha portlat",g1d:"3–6 yosh",g2:"Juftini top",g2d:"4–8 yosh",g3:"Mevalarni sana",g3d:"4–7 yosh",g4:"Alifbo rasmlari",g4d:"5–8 yosh",
 g5:"Tezkor hisob",g5d:"Hisob-kitob",g6:"2048",g6d:"Mantiq",g7:"Rang ketma-ketligi",g7d:"Xotira",
 again:"Qayta o‘ynash",menu:"O‘yinlar",score:"Hisob",best:"Eng yaxshi",moves:"Yurish",howmany:"Nechta?",letter:"Qaysi harf bilan boshlanadi?",
 done:"Barakalla!",over:"O‘yin tugadi",round:"Bosqich",watch:"Qarang…",turn:"Endi siz!",swipe:"Barmoq bilan suring",res:"To‘g‘ri javoblar",earned:"Yulduz",mem:"Barcha juftlar topildi!",cnt:"Hisoblang"},
ru:{tile:"Игры",tileS:"Для малышей и взрослых",title:"Игры",kids:"Малыши",adults:"Взрослые",
 g1:"Лопни шарик",g1d:"3–6 лет",g2:"Найди пару",g2d:"4–8 лет",g3:"Посчитай фрукты",g3d:"4–7 лет",g4:"Азбука в картинках",g4d:"5–8 лет",
 g5:"Быстрый счёт",g5d:"Математика",g6:"2048",g6d:"Логика",g7:"Цветная память",g7d:"Память",
 again:"Ещё раз",menu:"Игры",score:"Счёт",best:"Рекорд",moves:"Ходы",howmany:"Сколько?",letter:"С какой буквы начинается?",
 done:"Молодец!",over:"Игра окончена",round:"Раунд",watch:"Смотрите…",turn:"Теперь вы!",swipe:"Двигайте пальцем",res:"Верных ответов",earned:"Звёзд",mem:"Все пары найдены!",cnt:"Посчитайте"}
};
function p(k){return LANG==="ru"?UI.ru[k]:tr(UI.uz[k])}
function $(id){return document.getElementById(id)}
function rnd(n){return Math.floor(Math.random()*n)}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=rnd(i+1),t=a[i];a[i]=a[j];a[j]=t}return a}
function getStars(){try{return +localStorage.getItem("ogstars")||0}catch(e){return 0}}
function addStars(n){try{localStorage.setItem("ogstars",String(getStars()+n))}catch(e){}}
var GAMES=[
 {id:1,kids:1,e:"🎈",bg:"linear-gradient(135deg,#ff6b6b,#ff9a5a)"},
 {id:2,kids:1,e:"🐱",bg:"linear-gradient(135deg,#2fbf9b,#4cd6b3)"},
 {id:3,kids:1,e:"🍎",bg:"linear-gradient(135deg,#f59e0b,#fcd34d)"},
 {id:4,kids:1,e:"🔤",bg:"linear-gradient(135deg,#6d5bd0,#9b8cf0)"},
 {id:5,kids:0,e:"➕",bg:"linear-gradient(135deg,#2563eb,#5aa0ff)"},
 {id:6,kids:0,e:"🔢",bg:"linear-gradient(135deg,#b8643a,#e6a066)"},
 {id:7,kids:0,e:"🎵",bg:"linear-gradient(135deg,#d6336c,#7048e8)"}
];
var st={tab:1,game:null,timers:[],intervals:[],raf:0,keyfn:null};
var css=document.createElement("style");
css.textContent=".og-chip{float:right;background:var(--accbg);color:var(--acc);border-radius:20px;padding:6px 12px;font-weight:800;font-size:15px}.og-tabs{display:flex;gap:6px;background:var(--line);padding:4px;border-radius:14px;margin:12px 0}.og-tabs button{flex:1;padding:10px;border-radius:11px;border:0;background:transparent;color:var(--mut);font-weight:700;font-size:15px;font-family:inherit}.og-tabs button.on{background:var(--acc);color:#fff}.og-list{display:grid;grid-template-columns:1fr 1fr;gap:10px}.og-g{border:0;border-radius:18px;padding:14px;text-align:left;color:#fff;font-family:inherit;min-height:116px}.og-g .e{font-size:36px;display:block}.og-g b{display:block;margin-top:8px;font-size:16px}.og-g .d{font-size:12px;opacity:.9}.og-hud{display:flex;justify-content:space-between;font-weight:800;font-size:20px;margin:6px 2px 10px}.og-play{position:relative;height:420px;border-radius:16px;overflow:hidden;background:linear-gradient(#bfe6ff,#eaf7ff);touch-action:manipulation;user-select:none}.og-bal{position:absolute;top:0;border-radius:50% 50% 48% 48%;will-change:transform;box-shadow:inset -6px -8px 0 rgba(0,0,0,.14)}.og-mem{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.og-c{aspect-ratio:1;border-radius:14px;border:0;font-size:32px;background:var(--acc);color:#fff;font-family:inherit}.og-c.f{background:var(--card);border:2px solid var(--line)}.og-c.m{background:var(--accbg);border:2px solid var(--acc)}.og-big{font-size:42px;line-height:1.35;text-align:center;padding:14px;word-break:break-all}.og-opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(72px,1fr));gap:10px}.og-o{padding:16px;border-radius:14px;border:2px solid var(--line);background:var(--card);color:var(--text);font-size:24px;font-weight:800;font-family:inherit}.og-o.ok{background:#2fbf71;color:#fff;border-color:#2fbf71}.og-o.no{background:#e5484d;color:#fff;border-color:#e5484d}.og-b{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;background:#bbada0;padding:8px;border-radius:12px;touch-action:none;user-select:none}.og-t{aspect-ratio:1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:22px;background:#cdc1b4;color:#776e65}.og-s{display:grid;grid-template-columns:1fr 1fr;gap:10px}.og-p{aspect-ratio:1.3;border-radius:18px;border:0;opacity:.5}.og-p.lit{opacity:1;filter:brightness(1.35)}.og-res{text-align:center;padding:10px 0}.og-res .s{font-size:46px;letter-spacing:4px}.og-btn{display:block;width:100%;padding:14px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-size:16px;font-weight:700;margin-top:10px;font-family:inherit}.og-btn.l{background:var(--accbg);color:var(--acc)}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="oyin";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#7c3aed,#ec4899)";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🎮</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}

function stop(){
  st.timers.forEach(clearTimeout);st.intervals.forEach(clearInterval);st.timers=[];st.intervals=[];
  cancelAnimationFrame(st.raf);
  if(st.keyfn){document.removeEventListener("keydown",st.keyfn);st.keyfn=null}
}
function later(f,ms){var t=setTimeout(f,ms);st.timers.push(t);return t}
function every(f,ms){var t=setInterval(f,ms);st.intervals.push(t);return t}
function back(){return '<button class="back" id="ob">← '+T[LANG].back+'</button>'}
function bindBack(){var b=$("ob");if(b)b.addEventListener("click",function(){show("home")})}

function drawList(){
  stop();st.game=null;
  var h=back()+'<div class="card"><span class="og-chip">⭐ '+getStars()+'</span><h2>'+p("title")+'</h2>'+
   '<div class="og-tabs"><button data-t="1" class="'+(st.tab?'on':'')+'">'+p("kids")+'</button><button data-t="0" class="'+(st.tab?'':'on')+'">'+p("adults")+'</button></div><div class="og-list">'+
   GAMES.filter(function(g){return !!g.kids===!!st.tab}).map(function(g){return '<button class="og-g" data-g="'+g.id+'" style="background:'+g.bg+'"><span class="e">'+g.e+'</span><b>'+p("g"+g.id)+'</b><span class="d">'+p("g"+g.id+"d")+'</span></button>'}).join("")+'</div></div>';
  sec.innerHTML=h;bindBack();
  var tb=sec.querySelectorAll("[data-t]");for(var i=0;i<tb.length;i++)tb[i].addEventListener("click",function(){st.tab=+this.getAttribute("data-t");drawList()});
  var gb=sec.querySelectorAll("[data-g]");for(i=0;i<gb.length;i++)gb[i].addEventListener("click",function(){start(+this.getAttribute("data-g"))});
}
function start(id){
  stop();st.game=id;
  sec.innerHTML=back()+'<div class="card"><span class="og-chip">⭐ '+getStars()+'</span><h2>'+p("g"+id)+'</h2><div id="og"></div></div>';
  bindBack();window.scrollTo(0,0);
  var box=$("og");
  [null,g1,g2,g3,g4,g5,g6,g7][id](box);
}
function finish(stars,text){
  stop();addStars(stars);
  var s="";for(var i=0;i<3;i++)s+=i<stars?"⭐":"☆";
  $("og").innerHTML='<div class="og-res"><div class="s">'+s+'</div><h2 style="margin:10px 0 4px;font-size:20px;text-transform:none;letter-spacing:0;color:var(--text)">'+(stars?p("done"):p("over"))+'</h2><div class="sub" style="margin:0">'+text+'</div></div>'+
   '<button class="og-btn" id="oa">'+p("again")+'</button><button class="og-btn l" id="om">'+p("menu")+'</button>';
  var cp=sec.querySelector(".og-chip");if(cp)cp.textContent="⭐ "+getStars();
  var g=st.game;$("oa").addEventListener("click",function(){start(g)});$("om").addEventListener("click",drawList);
}
function qlevel(ok,a,b,c){return ok>=a?3:ok>=b?2:ok>=c?1:0}

/* 1. Sharcha portlat */
function g1(box){
  box.innerHTML='<div class="og-hud"><span id="o1t">⏱ 30</span><span id="o1s">🎈 0</span></div><div class="og-play" id="o1p"></div>';
  var play=$("o1p"),score=0,left=30,list=[],last=performance.now(),next=0,cols=["#ff5a5f","#ffb020","#3ddc84","#4aa3ff","#b46bff","#ff7bb3"];
  function spawn(){
    var W=play.clientWidth,H=play.clientHeight,s=56+rnd(26),e=document.createElement("div");
    e.className="og-bal";e.style.width=s+"px";e.style.height=Math.round(s*1.25)+"px";e.style.background=cols[rnd(cols.length)];e.style.left=rnd(Math.max(1,W-s))+"px";
    var b={e:e,y:H,h:s*1.25,v:70+rnd(70)+score*1.5};
    e.style.transform="translate3d(0,"+b.y+"px,0)";
    e.addEventListener("pointerdown",function(ev){
      ev.preventDefault();if(b.dead)return;b.dead=true;score++;$("o1s").textContent="🎈 "+score;
      e.style.transition="transform .15s,opacity .15s";e.style.opacity="0";e.style.transform="translate3d(0,"+b.y+"px,0) scale(1.4)";
      later(function(){if(e.parentNode)e.parentNode.removeChild(e)},160);
    });
    play.appendChild(e);list.push(b);
  }
  function loop(t){
    var dt=Math.min(.05,(t-last)/1000);last=t;next-=dt*1000;
    if(next<=0){spawn();next=420+rnd(380)}
    for(var i=list.length-1;i>=0;i--){var b=list[i];if(b.dead){list.splice(i,1);continue}b.y-=b.v*dt;b.e.style.transform="translate3d(0,"+b.y+"px,0)";if(b.y<-b.h-4){if(b.e.parentNode)b.e.parentNode.removeChild(b.e);list.splice(i,1)}}
    st.raf=requestAnimationFrame(loop);
  }
  st.raf=requestAnimationFrame(loop);
  every(function(){left--;$("o1t").textContent="⏱ "+left;if(left<=0)finish(qlevel(score,15,8,3),p("score")+": "+score)},1000);
}

/* 2. Juftini top */
function g2(box){
  var pool=shuffle(["🐶","🐱","🐰","🦊","🐸","🐼","🦁","🐵","🐯","🐮","🐷","🐥"]).slice(0,6),cards=shuffle(pool.concat(pool)),first=-1,lock=false,moves=0,found=0;
  box.innerHTML='<div class="og-hud"><span id="o2m">'+p("moves")+': 0</span></div><div class="og-mem">'+cards.map(function(c,i){return '<button class="og-c" data-i="'+i+'">?</button>'}).join("")+'</div>';
  var bs=box.querySelectorAll(".og-c");
  for(var k=0;k<bs.length;k++)bs[k].addEventListener("click",function(){
    var i=+this.getAttribute("data-i");if(lock||i===first||this.classList.contains("m"))return;
    this.textContent=cards[i];this.classList.add("f");
    if(first<0){first=i;return}
    moves++;$("o2m").textContent=p("moves")+": "+moves;
    var a=first,b=i;first=-1;
    if(cards[a]===cards[b]){bs[a].className="og-c m";bs[b].className="og-c m";found++;if(found===6)later(function(){finish(moves<=10?3:moves<=15?2:1,p("mem")+" "+p("moves")+": "+moves)},600)}
    else{lock=true;later(function(){bs[a].textContent="?";bs[b].textContent="?";bs[a].className="og-c";bs[b].className="og-c";lock=false},700)}
  });
}

/* kichik viktorina yordamchisi */
function quiz(box,rounds,make,title){
  var r=0,ok=0;
  function next(){
    if(r>=rounds){finish(qlevel(ok,rounds,Math.ceil(rounds*.75),Math.ceil(rounds*.5)),p("res")+": "+ok+" / "+rounds);return}
    var q=make(r);r++;
    box.innerHTML='<div class="og-hud"><span>'+r+" / "+rounds+'</span><span>✅ '+ok+'</span></div><div class="sub" style="text-align:center;margin:0">'+title+'</div><div class="og-big">'+q.view+'</div><div class="og-opts">'+q.opts.map(function(o){return '<button class="og-o">'+o+'</button>'}).join("")+'</div>';
    var bs=box.querySelectorAll(".og-o"),done=false;
    for(var i=0;i<bs.length;i++)bs[i].addEventListener("click",function(){
      if(done)return;done=true;var good=this.textContent===String(q.ans);
      if(good){ok++;this.classList.add("ok")}else{this.classList.add("no");for(var j=0;j<bs.length;j++)if(bs[j].textContent===String(q.ans))bs[j].classList.add("ok")}
      later(next,good?500:1000);
    });
  }
  next();
}
function distinct(ans,count,gen){var s=[ans];var g=0;while(s.length<count&&g++<200){var v=gen();if(s.indexOf(v)<0)s.push(v)}return shuffle(s)}

/* 3. Mevalarni sana */
function g3(box){
  var E=["🍎","🍌","🍇","🍓","🍊","🍉"];
  quiz(box,8,function(){
    var n=1+rnd(9),e=E[rnd(E.length)],v="",i;for(i=0;i<n;i++)v+=e;
    return {view:v,ans:n,opts:distinct(n,3,function(){return Math.max(1,Math.min(10,n+rnd(5)-2))})};
  },p("howmany"));
}

/* 4. Alifbo rasmlari */
var WORDS=[["🍎","olma","яблоко"],["🐱","mushuk","кошка"],["🐶","it","собака"],["🚗","mashina","машина"],["🌞","quyosh","солнце"],["🐟","baliq","рыба"],["🏠","uy","дом"],["🌳","daraxt","дерево"],["⚽","to‘p","мяч"],["🍌","banan","банан"],["🐘","fil","слон"],["🌙","oy","луна"],["🐭","sichqon","мышь"],["📖","kitob","книга"],["🍉","tarvuz","арбуз"],["🐴","ot","лошадь"],["🐔","tovuq","курица"],["🍇","uzum","виноград"],["✈️","samolyot","самолёт"],["🥕","sabzi","морковь"]];
function alpha(){
  if(LANG==="ru")return "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯ".split("");
  var L="A B D E F G H I J K L M N O P Q R S T U V X Y Z".split(" ");
  return LANG==="oz"?L.map(cyr):L;
}
function g4(box){
  var ws=shuffle(WORDS),idx=0,A=alpha();
  quiz(box,8,function(){
    var w=ws[idx++%ws.length],word=LANG==="ru"?w[2]:w[1],L=(LANG==="oz"?cyr(word):word).charAt(0).toUpperCase();
    return {view:w[0],ans:L,opts:distinct(L,3,function(){return A[rnd(A.length)]})};
  },p("letter"));
}

/* 5. Tezkor hisob */
function g5(box){
  quiz(box,10,function(){
    var t=rnd(3),a,b,ans,s;
    if(t===0){a=2+rnd(30);b=2+rnd(30);ans=a+b;s=a+" + "+b}
    else if(t===1){a=10+rnd(40);b=2+rnd(a-2);ans=a-b;s=a+" − "+b}
    else{a=2+rnd(9);b=2+rnd(9);ans=a*b;s=a+" × "+b}
    return {view:s+" = ?",ans:ans,opts:distinct(ans,4,function(){return Math.max(0,ans+rnd(21)-10)})};
  },p("cnt"));
}

/* 6. 2048 */
function g6(box){
  var N=4,g=[],score=0,earned=0,best=0,i,j,got={};
  try{best=+localStorage.getItem("og2048")||0}catch(e){}
  for(i=0;i<N;i++){g[i]=[0,0,0,0]}
  var COL={0:"#cdc1b4",2:"#eee4da",4:"#ede0c8",8:"#f2b179",16:"#f59563",32:"#f67c5f",64:"#f65e3b",128:"#edcf72",256:"#edcc61",512:"#edc850",1024:"#edc53f",2048:"#edc22e"};
  box.innerHTML='<div class="og-hud"><span id="o6s">'+p("score")+': 0</span><span id="o6b">'+p("best")+': '+best+'</span></div><div class="og-b" id="o6g"></div><div class="sub" style="text-align:center;margin:10px 0 0">'+p("swipe")+'</div>';
  function add(){var e=[];for(i=0;i<N;i++)for(j=0;j<N;j++)if(!g[i][j])e.push([i,j]);if(!e.length)return;var c=e[rnd(e.length)];g[c[0]][c[1]]=Math.random()<.9?2:4}
  function draw(){
    var h="";for(i=0;i<N;i++)for(j=0;j<N;j++){var v=g[i][j];h+='<div class="og-t" style="background:'+(COL[v]||"#3c3a32")+';color:'+(v>4?"#fff":"#776e65")+';font-size:'+(v>=1024?18:v>=128?20:24)+'px">'+(v||"")+'</div>'}
    $("o6g").innerHTML=h;$("o6s").textContent=p("score")+": "+score;
    if(score>best){best=score;try{localStorage.setItem("og2048",String(best))}catch(e){}}
    $("o6b").textContent=p("best")+": "+best;
  }
  function line(a){
    var r=a.filter(function(x){return x}),k;
    for(k=0;k<r.length-1;k++)if(r[k]===r[k+1]){r[k]*=2;score+=r[k];r.splice(k+1,1)}
    while(r.length<N)r.push(0);return r;
  }
  function move(d){
    var before=JSON.stringify(g),k,a;
    for(k=0;k<N;k++){
      if(d==="l"){g[k]=line(g[k])}
      else if(d==="r"){g[k]=line(g[k].slice().reverse()).reverse()}
      else{
        a=[];for(i=0;i<N;i++)a.push(g[i][k]);
        a=d==="u"?line(a):line(a.reverse()).reverse();
        for(i=0;i<N;i++)g[i][k]=a[i];
      }
    }
    if(JSON.stringify(g)===before)return;
    add();draw();
    var mx=0;for(i=0;i<N;i++)for(j=0;j<N;j++)mx=Math.max(mx,g[i][j]);
    [[256,1],[512,1],[1024,1]].forEach(function(x){if(mx>=x[0]&&!got[x[0]]){got[x[0]]=1;earned+=x[1]}});
    if(over())finish(Math.min(3,earned),p("score")+": "+score);
  }
  function over(){
    for(i=0;i<N;i++)for(j=0;j<N;j++){if(!g[i][j])return false;if(j<N-1&&g[i][j]===g[i][j+1])return false;if(i<N-1&&g[i][j]===g[i+1][j])return false}
    return true;
  }
  add();add();draw();
  var bd=$("o6g"),sx=0,sy=0;
  bd.addEventListener("touchstart",function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
  bd.addEventListener("touchmove",function(e){e.preventDefault()},{passive:false});
  bd.addEventListener("touchend",function(e){
    var t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;
    if(Math.max(Math.abs(dx),Math.abs(dy))<24)return;
    move(Math.abs(dx)>Math.abs(dy)?(dx>0?"r":"l"):(dy>0?"d":"u"));
  });
  st.keyfn=function(e){var m={ArrowLeft:"l",ArrowRight:"r",ArrowUp:"u",ArrowDown:"d"}[e.key];if(m){e.preventDefault();move(m)}};
  document.addEventListener("keydown",st.keyfn);
}

/* 7. Rang ketma-ketligi */
function g7(box){
  var cols=["#2fbf71","#e5484d","#f5b301","#3b82f6"],freq=[330,392,262,523],seq=[],pos=0,busy=true,ac=null;
  box.innerHTML='<div class="og-hud"><span id="o7r">'+p("round")+': 1</span><span id="o7m">'+p("watch")+'</span></div><div class="og-s">'+cols.map(function(c,i){return '<button class="og-p" data-i="'+i+'" style="background:'+c+'"></button>'}).join("")+'</div>';
  var ps=box.querySelectorAll(".og-p");
  function beep(i){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();var o=ac.createOscillator(),g=ac.createGain();o.frequency.value=freq[i];g.gain.value=.12;o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+.25)}catch(e){}}
  function flash(i){ps[i].classList.add("lit");beep(i);later(function(){ps[i].classList.remove("lit")},300)}
  function play(){
    busy=true;pos=0;seq.push(rnd(4));$("o7r").textContent=p("round")+": "+seq.length;$("o7m").textContent=p("watch");
    seq.forEach(function(v,k){later(function(){flash(v)},700+k*600)});
    later(function(){busy=false;$("o7m").textContent=p("turn")},700+seq.length*600);
  }
  for(var k=0;k<ps.length;k++)ps[k].addEventListener("click",function(){
    if(busy)return;var i=+this.getAttribute("data-i");flash(i);
    if(i!==seq[pos]){busy=true;var n=seq.length-1;finish(Math.min(3,Math.floor(n/3)),p("round")+": "+n);return}
    pos++;if(pos===seq.length){busy=true;later(play,700)}
  });
  later(play,500);
}

/* navigatsiya */
function up(){
  if(st.game!==null){drawList();return true}
  return false;
}
var _show=show;
show=function(id){
  if(id==="home"&&sec.classList.contains("on")&&up()){window.scrollTo(0,0);return}
  if(id!=="oyin")stop();
  _show(id);
};
tile.addEventListener("click",function(){drawList();show("oyin")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();if(sec.classList.contains("on")){if(st.game===null)drawList()}})}
updTile();drawList();
})();
