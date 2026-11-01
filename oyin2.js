(function(){
/* Mashhur janrlardagi original o'yinlar. oyin.js dan OLDIN yuklanadi. */
var R=function(n){return Math.floor(Math.random()*n)};
function best(k){try{return +localStorage.getItem(k)||0}catch(e){return 0}}
function setBest(k,v){try{if(v>best(k))localStorage.setItem(k,String(v))}catch(e){}}
function stars(v,a,b,c){return v>=a?3:v>=b?2:v>=c?1:0}
function dpad(){return '<div class="og2-pad"><button data-k="u">▲</button><div><button data-k="l">◀</button><button data-k="d">▼</button><button data-k="r">▶</button></div></div>'}
function cv(box,w,h,extra){box.innerHTML='<div class="og-hud"><span id="x1"></span><span id="x2"></span></div><canvas id="xc" width="'+w+'" height="'+h+'" class="og2-cv"></canvas>'+(extra||'');return document.getElementById("xc")}
function hud(a,b){var x=document.getElementById("x1"),y=document.getElementById("x2");if(x)x.textContent=a;if(y)y.textContent=b}

var _s=document.createElement("style");_s.textContent=".og2-cv{display:block;width:100%;max-width:340px;margin:0 auto;border-radius:12px;touch-action:none;background:#000}.og2-pad,.og2-row{display:flex;flex-direction:column;align-items:center;gap:6px;margin-top:12px}.og2-pad div,.og2-row{flex-direction:row;display:flex;gap:6px;justify-content:center}.og2-pad button,.og2-row button{width:62px;height:52px;border:0;border-radius:14px;background:var(--accbg);color:var(--acc);font-size:22px;font-weight:800}.og2-mine{display:grid;grid-template-columns:repeat(8,1fr);gap:3px;max-width:340px;margin:10px auto 0}.og2-mine button{aspect-ratio:1;border:0;border-radius:6px;background:var(--acc);color:#fff;font-size:15px;font-weight:800;padding:0}.og2-mine button.o{background:var(--line)}.og2-mine i{font-style:normal}.og2-15{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;max-width:320px;margin:10px auto 0}.og2-15 button{aspect-ratio:1;border:0;border-radius:12px;background:var(--acc);color:#fff;font-size:24px;font-weight:800}.og2-15 button.e{background:var(--line)}.og2-xo{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:300px;margin:10px auto 0}.og2-xo button{aspect-ratio:1;border:0;border-radius:14px;background:var(--accbg);font-size:38px;padding:0}";document.head.appendChild(_s);
var G=[];

/* 1. Ilon */
G.push({id:8,e:"🐍",bg:"linear-gradient(135deg,#16a34a,#84cc16)",n:["Ilon","Змейка"],d:["Klassik","Классика"],run:function(box,A){
  var N=16,S=20,c=cv(box,N*S,N*S,dpad()),x=c.getContext("2d"),sn=[[8,8],[7,8],[6,8]],dir=[1,0],nd=[1,0],f,sc=0,bk=best("og_snake");
  function food(){do{f=[R(N),R(N)]}while(sn.some(function(s){return s[0]===f[0]&&s[1]===f[1]}))}
  function draw(){
    x.fillStyle="#12261a";x.fillRect(0,0,N*S,N*S);
    x.fillStyle="#ef4444";x.beginPath();x.arc(f[0]*S+S/2,f[1]*S+S/2,S/2-3,0,7);x.fill();
    sn.forEach(function(s,i){x.fillStyle=i?"#4ade80":"#bbf7d0";x.fillRect(s[0]*S+1,s[1]*S+1,S-2,S-2)});
    hud("🍎 "+sc,A.t("Rekord","Рекорд")+": "+Math.max(bk,sc));
  }
  function turn(k){var m={u:[0,-1],d:[0,1],l:[-1,0],r:[1,0]}[k];if(m&&!(m[0]===-dir[0]&&m[1]===-dir[1]))nd=m}
  function tick(){
    dir=nd;var h=[sn[0][0]+dir[0],sn[0][1]+dir[1]];
    if(h[0]<0||h[1]<0||h[0]>=N||h[1]>=N||sn.some(function(s){return s[0]===h[0]&&s[1]===h[1]})){setBest("og_snake",sc);A.finish(stars(sc,15,8,3),A.t("Hisob","Счёт")+": "+sc);return}
    sn.unshift(h);if(h[0]===f[0]&&h[1]===f[1]){sc++;food()}else sn.pop();draw();
  }
  food();draw();A.every(tick,130);
  box.querySelectorAll("[data-k]").forEach(function(b){b.addEventListener("click",function(){turn(b.dataset.k)})});
  var sx,sy;c.addEventListener("touchstart",function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
  c.addEventListener("touchmove",function(e){e.preventDefault()},{passive:false});
  c.addEventListener("touchend",function(e){var t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))>20)turn(Math.abs(dx)>Math.abs(dy)?(dx>0?"r":"l"):(dy>0?"d":"u"))});
  A.st.keyfn=function(e){var m={ArrowUp:"u",ArrowDown:"d",ArrowLeft:"l",ArrowRight:"r"}[e.key];if(m){e.preventDefault();turn(m)}};document.addEventListener("keydown",A.st.keyfn);
}});

/* 2. Bloklar (tetris janri) */
G.push({id:9,e:"🧱",bg:"linear-gradient(135deg,#2563eb,#7c3aed)",n:["Bloklar","Блоки"],d:["Qator yig‘ing","Собери линии"],run:function(box,A){
  var W=10,H=18,S=18,c=cv(box,W*S,H*S,'<div class="og2-row"><button data-k="l">◀</button><button data-k="o">⟳</button><button data-k="r">▶</button><button data-k="d">⏬</button></div>'),x=c.getContext("2d");
  var SH=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]],[[1,0,0],[1,1,1]],[[0,0,1],[1,1,1]],[[0,1,1],[1,1,0]],[[1,1,0],[0,1,1]]],CL=["#22d3ee","#facc15","#a855f7","#3b82f6","#fb923c","#4ade80","#f43f5e"];
  var g=[],i,sc=0,lines=0,p,bk=best("og_blk"),dead=false;
  for(i=0;i<H;i++)g.push(new Array(W).fill(0));
  function nw(){var k=R(7);p={m:SH[k].map(function(r){return r.slice()}),c:k+1,x:Math.floor((W-SH[k][0].length)/2),y:0};if(hit(p.m,p.x,p.y))over()}
  function hit(m,px,py){for(var r=0;r<m.length;r++)for(var q=0;q<m[r].length;q++)if(m[r][q]){var X=px+q,Y=py+r;if(X<0||X>=W||Y>=H||(Y>=0&&g[Y][X]))return true}return false}
  function rot(m){var o=[];for(var q=0;q<m[0].length;q++){o.push([]);for(var r=m.length-1;r>=0;r--)o[q].push(m[r][q])}return o}
  function draw(){
    x.fillStyle="#0f172a";x.fillRect(0,0,W*S,H*S);
    function cell(X,Y,k){x.fillStyle=CL[k-1];x.fillRect(X*S+1,Y*S+1,S-2,S-2)}
    for(var Y=0;Y<H;Y++)for(var X=0;X<W;X++)if(g[Y][X])cell(X,Y,g[Y][X]);
    p.m.forEach(function(r,a){r.forEach(function(v,b){if(v)cell(p.x+b,p.y+a,p.c)})});
    hud(A.t("Hisob","Счёт")+": "+sc,A.t("Qator","Линии")+": "+lines);
  }
  function lock(){
    p.m.forEach(function(r,a){r.forEach(function(v,b){if(v&&p.y+a>=0)g[p.y+a][p.x+b]=p.c})});
    var n=0;for(var Y=H-1;Y>=0;Y--)if(g[Y].every(function(v){return v})){g.splice(Y,1);g.unshift(new Array(W).fill(0));n++;Y++}
    if(n){lines+=n;sc+=[0,100,300,500,800][n]}nw();
  }
  function over(){dead=true;setBest("og_blk",sc);A.finish(stars(lines,12,6,2),A.t("Hisob","Счёт")+": "+sc)}
  function down(){if(dead)return;if(!hit(p.m,p.x,p.y+1))p.y++;else{lock();if(dead)return}draw()}
  function act(k){
    if(dead)return;
    if(k==="l"&&!hit(p.m,p.x-1,p.y))p.x--;
    else if(k==="r"&&!hit(p.m,p.x+1,p.y))p.x++;
    else if(k==="o"){var m=rot(p.m);if(!hit(m,p.x,p.y))p.m=m;else if(!hit(m,p.x-1,p.y)){p.m=m;p.x--}else if(!hit(m,p.x+1,p.y)){p.m=m;p.x++}}
    else if(k==="d"){while(!hit(p.m,p.x,p.y+1))p.y++;lock();if(dead)return}
    draw();
  }
  nw();draw();
  (function loop(){if(dead)return;down();A.later(loop,Math.max(160,650-lines*18))})();
  A.later(function(){},0);
  box.querySelectorAll("[data-k]").forEach(function(b){b.addEventListener("click",function(){act(b.dataset.k)})});
  A.st.keyfn=function(e){var m={ArrowLeft:"l",ArrowRight:"r",ArrowUp:"o",ArrowDown:"d"}[e.key];if(m){e.preventDefault();act(m)}};document.addEventListener("keydown",A.st.keyfn);
}});

/* 3. Qush (uchish) */
G.push({id:10,e:"🐤",bg:"linear-gradient(135deg,#0ea5e9,#22d3ee)",n:["Uchar qush","Птичка"],d:["Bosib uching","Тап и лети"],run:function(box,A){
  var Wd=300,Hd=400,c=cv(box,Wd,Hd),x=c.getContext("2d"),by=180,vy=0,pipes=[],sc=0,t=0,last=performance.now(),dead=false,bk=best("og_bird");
  function flap(){if(!dead)vy=-5.2}
  c.addEventListener("pointerdown",function(e){e.preventDefault();flap()});
  A.st.keyfn=function(e){if(e.key===" "||e.key==="ArrowUp"){e.preventDefault();flap()}};document.addEventListener("keydown",A.st.keyfn);
  function loop(now){
    var dt=Math.min(2,(now-last)/16.67);last=now;t+=dt;
    vy+=.3*dt;by+=vy*dt;
    if(t>85){t=0;pipes.push({x:Wd,g:90+R(Hd-250),ok:0})}
    pipes.forEach(function(p){p.x-=2.2*dt;if(!p.ok&&p.x+44<60){p.ok=1;sc++}});
    pipes=pipes.filter(function(p){return p.x>-50});
    var hitP=by<0||by>Hd-10||pipes.some(function(p){return 90>p.x&&60<p.x+44&&(by-11<p.g||by+11>p.g+105)});
    x.fillStyle="#7dd3fc";x.fillRect(0,0,Wd,Hd);
    x.fillStyle="#22c55e";pipes.forEach(function(p){x.fillRect(p.x,0,44,p.g);x.fillRect(p.x,p.g+105,44,Hd);});
    x.font="26px serif";x.fillText("🐤",64,by+9);
    hud("⭐ "+sc,A.t("Rekord","Рекорд")+": "+Math.max(bk,sc));
    if(hitP){dead=true;setBest("og_bird",sc);A.later(function(){A.finish(stars(sc,12,6,2),A.t("Hisob","Счёт")+": "+sc)},400);return}
    A.st.raf=requestAnimationFrame(loop);
  }
  A.st.raf=requestAnimationFrame(loop);
}});

/* 4. Minalar */
G.push({id:11,e:"💣",bg:"linear-gradient(135deg,#475569,#94a3b8)",n:["Minalar","Сапёр"],d:["Mantiq","Логика"],run:function(box,A){
  var N=8,M=10,cells=[],opened=0,flag=false,started=false,over=false,i,j;
  for(i=0;i<N*N;i++)cells.push({m:0,o:0,f:0,n:0});
  box.innerHTML='<div class="og-hud"><span id="x1">💣 '+M+'</span><button class="og-btn l" id="mf" style="width:auto;margin:0;padding:6px 14px">⛏ '+A.t("Ochish","Открыть")+'</button></div><div class="og2-mine" id="mg"></div>';
  var gr=document.getElementById("mg");
  function nb(k){var r=[],a=Math.floor(k/N),b=k%N;for(var y=-1;y<=1;y++)for(var z=-1;z<=1;z++){var u=a+y,v=b+z;if((y||z)&&u>=0&&v>=0&&u<N&&v<N)r.push(u*N+v)}return r}
  function place(safe){var s=0;while(s<M){var k=R(N*N);if(k!==safe&&!cells[k].m&&nb(safe).indexOf(k)<0){cells[k].m=1;s++}}cells.forEach(function(c,k){c.n=nb(k).filter(function(q){return cells[q].m}).length})}
  var COL=["","#2563eb","#16a34a","#dc2626","#7c3aed","#b45309","#0891b2","#000","#555"];
  function draw(){
    gr.innerHTML=cells.map(function(c,k){var t="",cl="";if(c.o){cl="o";t=c.m?"💥":(c.n?'<i style="color:'+COL[c.n]+'">'+c.n+'</i>':"")}else if(c.f)t="🚩";return '<button data-i="'+k+'" class="'+cl+'">'+t+'</button>'}).join("");
    var fl=cells.filter(function(c){return c.f}).length;document.getElementById("x1").textContent="💣 "+(M-fl);
  }
  function open(k){var c=cells[k];if(c.o||c.f)return;c.o=1;opened++;if(!c.m&&!c.n)nb(k).forEach(open)}
  function end(win){
    over=true;if(!win)cells.forEach(function(c){if(c.m)c.o=1});draw();
    A.later(function(){A.finish(win?3:(opened>=30?1:0),win?A.t("Barcha xavfsiz kataklar ochildi!","Все безопасные клетки открыты!"):A.t("Minaga tushdingiz","Вы подорвались"))},900);
  }
  gr.addEventListener("click",function(e){
    var b=e.target.closest("button");if(!b||over)return;var k=+b.dataset.i,c=cells[k];
    if(flag){if(!c.o){c.f=!c.f;draw()}return}
    if(c.f||c.o)return;if(!started){started=true;place(k)}
    if(c.m){c.o=1;end(false);return}
    open(k);draw();if(opened===N*N-M)end(true);
  });
  document.getElementById("mf").addEventListener("click",function(){flag=!flag;this.textContent=flag?"🚩 "+A.t("Bayroq","Флажок"):"⛏ "+A.t("Ochish","Открыть")});
  draw();
}});

/* 5. 15-lik */
G.push({id:12,e:"🔲",bg:"linear-gradient(135deg,#d97706,#fbbf24)",n:["15 lik","Пятнашки"],d:["Raqamlarni tering","Расставь числа"],run:function(box,A){
  var N=4,a=[],i,moves=0;
  for(i=1;i<N*N;i++)a.push(i);a.push(0);
  var z=N*N-1;
  for(i=0;i<200;i++){var nbs=[];if(z%N)nbs.push(z-1);if(z%N<N-1)nbs.push(z+1);if(z>=N)nbs.push(z-N);if(z<N*N-N)nbs.push(z+N);var q=nbs[R(nbs.length)];a[z]=a[q];a[q]=0;z=q}
  box.innerHTML='<div class="og-hud"><span id="x1"></span></div><div class="og2-15" id="pg"></div>';
  function draw(){document.getElementById("pg").innerHTML=a.map(function(v,k){return '<button data-i="'+k+'"'+(v?'':' class="e"')+'>'+(v||"")+'</button>'}).join("");document.getElementById("x1").textContent=A.t("Yurish","Ходы")+": "+moves}
  document.getElementById("pg").addEventListener("click",function(e){
    var b=e.target.closest("button");if(!b)return;var k=+b.dataset.i,e0=a.indexOf(0);
    if((Math.abs(k-e0)===1&&Math.floor(k/N)===Math.floor(e0/N))||Math.abs(k-e0)===N){a[e0]=a[k];a[k]=0;moves++;draw();
      if(a.slice(0,-1).every(function(v,i){return v===i+1}))A.later(function(){A.finish(moves<=80?3:moves<=140?2:1,A.t("Yurish","Ходы")+": "+moves)},400)}
  });
  draw();
}});

/* 6. Yugur */
G.push({id:13,e:"🏃",bg:"linear-gradient(135deg,#ea580c,#facc15)",n:["Yugur","Бегун"],d:["Sakrab o‘ting","Прыгай"],run:function(box,A){
  var Wd=320,Hd=170,c=cv(box,Wd,Hd),x=c.getContext("2d"),gy=140,y=gy,vy=0,obs=[],t=0,sp=4,sc=0,last=performance.now(),bk=best("og_run");
  function jump(){if(y>=gy)vy=-11.5}
  c.addEventListener("pointerdown",function(e){e.preventDefault();jump()});
  A.st.keyfn=function(e){if(e.key===" "||e.key==="ArrowUp"){e.preventDefault();jump()}};document.addEventListener("keydown",A.st.keyfn);
  box.insertAdjacentHTML("beforeend",'<div class="sub" style="text-align:center;margin-top:10px">'+A.t("Sakrash uchun bosing","Нажимай, чтобы прыгать")+'</div>');
  function loop(now){
    var dt=Math.min(2,(now-last)/16.67);last=now;t-=dt;sc+=dt*.1;sp=4+sc/25;
    vy+=.65*dt;y=Math.min(gy,y+vy*dt);if(y>=gy)vy=0;
    if(t<=0){obs.push({x:Wd+10,w:16+R(14),h:24+R(22)});t=55+R(55)-sp*2}
    obs.forEach(function(o){o.x-=sp*dt});obs=obs.filter(function(o){return o.x>-40});
    x.fillStyle="#fef9c3";x.fillRect(0,0,Wd,Hd);x.fillStyle="#a16207";x.fillRect(0,gy+4,Wd,Hd);
    x.fillStyle="#15803d";obs.forEach(function(o){x.fillRect(o.x,gy+4-o.h,o.w,o.h)});
    x.font="28px serif";x.fillText("🏃",30,y+2);
    var s=Math.floor(sc);hud("🏁 "+s,A.t("Rekord","Рекорд")+": "+Math.max(bk,s));
    if(obs.some(function(o){return o.x<50&&o.x+o.w>34&&y+2>gy+4-o.h-4})){setBest("og_run",s);A.finish(stars(s,300,150,40),A.t("Masofa","Дистанция")+": "+s+" m");return}
    A.st.raf=requestAnimationFrame(loop);
  }
  A.st.raf=requestAnimationFrame(loop);
}});

/* 7. Xo-X (krestik-nolik) */
G.push({id:14,e:"❌",bg:"linear-gradient(135deg,#be185d,#f472b6)",n:["Xo‘-nol","Крестики-нолики"],d:["Kompyuterga qarshi","Против компьютера"],run:function(box,A){
  var b=new Array(9).fill(""),L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],lock=false;
  function win(s){for(var i=0;i<8;i++){var l=L[i];if(s[l[0]]&&s[l[0]]===s[l[1]]&&s[l[1]]===s[l[2]])return s[l[0]]}return s.indexOf("")<0?"d":""}
  function mm(s,pl){var w=win(s);if(w==="O")return 1;if(w==="X")return-1;if(w==="d")return 0;var bv=pl==="O"?-2:2;
    for(var i=0;i<9;i++)if(!s[i]){s[i]=pl;var v=mm(s,pl==="O"?"X":"O");s[i]="";if(pl==="O"?v>bv:v<bv)bv=v}return bv}
  function ai(){
    if(R(4)===0){var e=[];b.forEach(function(v,i){if(!v)e.push(i)});return e[R(e.length)]}
    var bi=-1,bv=-2;for(var i=0;i<9;i++)if(!b[i]){b[i]="O";var v=mm(b,"X");b[i]="";if(v>bv){bv=v;bi=i}}return bi;
  }
  box.innerHTML='<div class="og-hud"><span>'+A.t("Siz: ❌","Вы: ❌")+'</span></div><div class="og2-xo" id="xo"></div>';
  function draw(){document.getElementById("xo").innerHTML=b.map(function(v,i){return '<button data-i="'+i+'">'+(v==="X"?"❌":v==="O"?"⭕":"")+'</button>'}).join("")}
  function check(){var w=win(b);if(!w)return false;lock=true;draw();A.later(function(){A.finish(w==="X"?3:w==="d"?1:0,w==="X"?A.t("G‘alaba!","Победа!"):w==="d"?A.t("Durang","Ничья"):A.t("Kompyuter yutdi","Компьютер выиграл"))},700);return true}
  document.getElementById("xo").addEventListener("click",function(e){
    var t=e.target.closest("button");if(!t||lock)return;var i=+t.dataset.i;if(b[i])return;
    b[i]="X";draw();if(check())return;lock=true;
    A.later(function(){var k=ai();if(k>=0)b[k]="O";lock=false;draw();check()},350);
  });
  draw();
}});

window.OG2={games:G};
})();
