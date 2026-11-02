(function(){
var Q=(window.PRAVA_EXTRA||[]).slice(),ZN=0,ZS=0;
var N=20,EXAM_MIN=25,EXAM_ERR=2;
var P={
uz:{title:"Prava imtihoniga tayyorlov",tile:"Prava",tileS:"Mashq testlari",intro:"Yo‘l harakati qoidalari bo‘yicha mashq savollari. Bu rasmiy imtihon bazasi emas: tayyorgarlikka yordam beradi, qoidalarni rasmiy matn bilan solishtirib turing.",start:"Mashq rejimi ({n} savol)",exam:"Imtihon rejimi",examS:"20 savol · 25 daqiqa · ko‘pi bilan 2 ta xato",errs:"Xato",pass:"Imtihondan o‘tdingiz!",fail:"Imtihondan o‘ta olmadingiz",timeup:"Vaqt tugadi",bank:"Savollar soni: {n}",q:"Savol",next:"Keyingi",fin:"Natijani ko‘rish",res:"Natija",ca:"To‘g‘ri javob",again:"Qayta boshlash",wr:"Xatolar",g1:"Ajoyib natija!",g2:"Yaxshi, yana mashq qiling.",g3:"Qoidalarni qayta o‘qib chiqing."},
ru:{title:"Подготовка к экзамену по ПДД",tile:"Права",tileS:"Тренировочные тесты",intro:"Тренировочные вопросы по правилам дорожного движения. Это не официальная экзаменационная база: она помогает готовиться, сверяйтесь с официальным текстом правил.",start:"Режим тренировки ({n} вопросов)",exam:"Режим экзамена",examS:"20 вопросов · 25 минут · не более 2 ошибок",errs:"Ошибки",pass:"Вы сдали экзамен!",fail:"Экзамен не сдан",timeup:"Время вышло",bank:"Вопросов в базе: {n}",q:"Вопрос",next:"Далее",fin:"Показать результат",res:"Результат",ca:"Правильный ответ",again:"Начать заново",wr:"Ошибки",g1:"Отличный результат!",g2:"Хорошо, потренируйтесь ещё.",g3:"Перечитайте правила."}
};
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
function p(k){return LANG==="ru"?P.ru[k]:tr(P.uz[k])}
function qt(q){return LANG==="ru"?q.r:tr(q.u)}
function qo(q){return LANG==="ru"?q.ro:q.uo.map(tr)}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x}return a}

var st=null;
var css=document.createElement("style");
css.textContent=".t5{background:linear-gradient(135deg,#6a3fd1,#a06cf0)}.pq{font-size:17px;font-weight:600;margin-bottom:12px;line-height:1.35}.po{display:block;width:100%;text-align:left;padding:12px;margin-bottom:8px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:15px;font-family:inherit}.po.ok{background:var(--accbg);border-color:var(--acc);color:var(--acc);font-weight:700}.po.no{border-color:var(--dn);color:var(--dn)}.pbtn{display:block;width:100%;padding:13px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-size:16px;font-weight:700;margin-top:8px;font-family:inherit}.pw{border-top:1px solid var(--line);padding:10px 0;font-size:14px}.pw b{color:var(--acc)}.pimg{width:100%;max-width:280px;margin:0 auto 12px;border-radius:12px;overflow:hidden}.pscore{font-size:34px;font-weight:700;color:var(--acc)}";
document.head.appendChild(css);

var sec=document.createElement("div");sec.className="sec";sec.id="prava";
document.body.appendChild(sec);
var tile=document.createElement("button");
tile.className="tile t5";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🚗</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}
tile.addEventListener("click",function(){stopTimer();st=null;draw();show("prava")});

var tmr=null;
function stopTimer(){if(tmr){clearInterval(tmr);tmr=null}}
function fmt(ms){var s=Math.max(0,Math.ceil(ms/1000)),m=Math.floor(s/60);s=s%60;return m+":"+(s<10?"0":"")+s}
function startQuiz(exam,only){
  stopTimer();
  var all=[];for(var i=only?ZS:0;i<Q.length;i++)all.push(i);
  st={exam:!!exam,only:!!only,total:Math.min(N,all.length),ids:shuffle(all).slice(0,Math.min(N,all.length)),i:0,score:0,wrong:[],pick:null,ord:null,over:null,t0:Date.now(),end:Date.now()+EXAM_MIN*60000};
  if(exam){tmr=setInterval(tick,1000)}
}
function tick(){
  if(!st||!st.exam||st.over||st.i>=st.ids.length){stopTimer();return}
  var left=st.end-Date.now();
  if(left<=0){st.over="time";st.i=st.ids.length;stopTimer();draw();return}
  var e=document.getElementById("pt");if(e)e.textContent="⏱ "+fmt(left);
}
function draw(){
  var h='<button class="back" id="pb">← '+T[LANG].back+'</button>';
  if(!st){
    h+='<div class="card"><h2>'+p("title")+'</h2><div class="sub" style="margin:0 0 12px">'+p("intro")+'</div><div class="sub" style="margin:0 0 12px">'+p("bank").replace("{n}",Q.length)+'</div><button class="pbtn" id="pe">'+p("exam")+'<br><small style="font-weight:400;font-size:12px">'+p("examS")+'</small></button><button class="pbtn" id="ps" style="background:var(--accbg);color:var(--acc)">'+p("start").replace("{n}",Math.min(N,Q.length))+'</button>'+(ZN?'<button class="pbtn" id="pz" style="background:var(--accbg);color:var(--acc)">🖼 '+(LANG==="ru"?"Вопросы с картинками":tr("Rasmli savollar"))+' ('+ZN+')</button>':'')+'</div>';
  }else if(st.i<st.ids.length){
    var q=Q[st.ids[st.i]],o=qo(q);if(!st.ord||st.ord.length!==o.length){var rg=[];for(var ri=0;ri<o.length;ri++)rg.push(ri);st.ord=shuffle(rg)}
    h+='<div class="card"><h2>'+p("q")+' '+(st.i+1)+'/'+st.ids.length+(st.exam?' · '+p("errs")+': '+st.wrong.length+'/'+EXAM_ERR+' · <span id="pt">⏱ '+fmt(st.end-Date.now())+'</span>':'')+'</h2>'+(q.img?'<div class="pimg">'+q.img+'</div>':'')+'<div class="pq">'+qt(q)+'</div>';
    h+=st.ord.map(function(k){
      var c="po";
      if(st.pick!==null){if(k===q.a)c+=" ok";else if(k===st.pick)c+=" no"}
      return '<button class="'+c+'" data-o="'+k+'"'+(st.pick!==null?' disabled':'')+'>'+o[k]+'</button>';
    }).join("");
    if(st.pick!==null){h+='<button class="pbtn" id="pn">'+(st.i+1<st.ids.length?p("next"):p("fin"))+'</button>'}
    h+='</div>';
  }else{
    stopTimer();
    var tot=st.total||st.ids.length,pc=Math.round(st.score*100/tot);
    h+='<div class="card"><h2>'+p("res")+'</h2><div class="pscore">'+st.score+' / '+tot+'</div>';
    if(st.exam){var ok=!st.over&&st.wrong.length<=EXAM_ERR;h+='<div class="sub" style="margin:4px 0 0;font-weight:700;color:'+(ok?'var(--acc)':'var(--dn)')+'">'+(ok?'✅ '+p("pass"):'❌ '+(st.over==="time"?p("timeup")+'. ':'')+p("fail"))+'</div><div class="sub" style="margin:4px 0 0">'+p("errs")+': '+st.wrong.length+' · ⏱ '+fmt(Math.min(Date.now(),st.end)-st.t0)+'</div>'}
    else h+='<div class="sub" style="margin:4px 0 0">'+(pc>=90?p("g1"):pc>=70?p("g2"):p("g3"))+'</div>';
    if(st.wrong.length){
      h+='<h2 style="margin-top:16px">'+p("wr")+'</h2>';
      h+=st.wrong.map(function(id){var q=Q[id];return '<div class="pw">'+(q.img?'<div class="pimg" style="width:110px;margin:0 0 6px">'+q.img+'</div>':'')+qt(q)+'<br>'+p("ca")+': <b>'+qo(q)[q.a]+'</b></div>'}).join("");
    }
    h+='<button class="pbtn" id="pa">'+p("again")+'</button><button class="pbtn" id="pm" style="background:var(--accbg);color:var(--acc)">← '+T[LANG].back+'</button></div>';
  }
  sec.innerHTML=h;
  document.getElementById("pb").addEventListener("click",function(){stopTimer();st=null;show("home")});
  var b=document.getElementById("ps");if(b)b.addEventListener("click",function(){startQuiz(false);draw();window.scrollTo(0,0)});
  b=document.getElementById("pe");if(b)b.addEventListener("click",function(){startQuiz(true);draw();window.scrollTo(0,0)});
  b=document.getElementById("pz");if(b)b.addEventListener("click",function(){startQuiz(false,true);draw();window.scrollTo(0,0)});
  b=document.getElementById("pa");if(b)b.addEventListener("click",function(){var ex=st&&st.exam;startQuiz(ex,st&&st.only);draw();window.scrollTo(0,0)});
  b=document.getElementById("pm");if(b)b.addEventListener("click",function(){stopTimer();st=null;draw();window.scrollTo(0,0)});
  b=document.getElementById("pn");if(b)b.addEventListener("click",function(){st.i++;st.pick=null;st.ord=null;draw();window.scrollTo(0,0)});
  var bs=sec.querySelectorAll("[data-o]");
  for(var j=0;j<bs.length;j++){bs[j].addEventListener("click",function(){
    if(st.pick!==null)return;
    var k=parseInt(this.getAttribute("data-o"),10),id=st.ids[st.i];
    st.pick=k;if(k===Q[id].a)st.score++;else st.wrong.push(id);
    if(st.exam&&st.wrong.length>EXAM_ERR){st.i=st.ids.length-1;st.ids=st.ids.slice(0,st.i+1)}
    draw();
  })}
}
var lb=document.querySelectorAll(".lang button");
for(var m=0;m<lb.length;m++){lb[m].addEventListener("click",function(){updTile();draw()})}
updTile();draw();
})();
