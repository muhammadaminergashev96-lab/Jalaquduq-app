(function(){
var TP=TL.TP,LG=TL.LG;
var P={
 uz:{tile:"Tillar",tileS:"6 ta til",title:"Tillarni o‘rganish",topics:"Mavzular",cards:"Kartochkalar",test:"Test",tap:"Tarjimasini ko‘rish uchun bosing",q:"Savol",next:"Keyingi",fin:"Natijani ko‘rish",res:"Natija",again:"Qayta boshlash",words:"so‘z",note:""},
 oz:{tile:"Тиллар",tileS:"6 та тил",title:"Тилларни ўрганиш",topics:"Мавзулар",cards:"Карточкалар",test:"Тест",tap:"Таржимасини кўриш учун босинг",q:"Савол",next:"Кейинги",fin:"Натижани кўриш",res:"Натижа",again:"Қайта бошлаш",words:"сўз",note:""},
 ru:{tile:"Языки",tileS:"6 языков",title:"Изучение языков",topics:"Темы",cards:"Карточки",test:"Тест",tap:"Нажмите, чтобы увидеть перевод",q:"Вопрос",next:"Далее",fin:"Показать результат",res:"Результат",again:"Начать заново",words:"слов",note:"Переводы даны на узбекском языке."}
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
function p(k){return (P[LANG]||P.uz)[k]}
function nm(a){return LANG==="ru"?a[1]:tr(a[0])}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x}return a}
function say(t,l){try{var u=new SpeechSynthesisUtterance(t);u.lang=l;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}

var css=document.createElement("style");
css.textContent=".t7{background:linear-gradient(135deg,#e8590c,#ffc078)}.lr{display:flex;align-items:center;gap:12px;width:100%;padding:14px;border-radius:14px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;font-weight:600;margin-bottom:8px;text-align:left;font-family:inherit}.lr .e{font-size:26px}.lr .c{margin-left:auto;color:var(--mut);font-size:13px;font-weight:400}.lcard{border:1px solid var(--line);border-radius:18px;background:var(--bg);padding:26px 14px;text-align:center;margin-bottom:10px;min-height:190px}.lw{font-size:32px;font-weight:700}.lrd{color:var(--mut);font-size:16px;margin-top:6px}.lm{font-size:22px;color:var(--acc);font-weight:700;margin-top:14px}.lh{color:var(--mut);font-size:13px;margin-top:14px}.lsp{border:0;background:var(--accbg);color:var(--acc);border-radius:50%;width:44px;height:44px;font-size:20px;margin-top:10px}.lnav{display:flex;justify-content:space-between;align-items:center;gap:8px}.lnav button{border:0;background:var(--accbg);color:var(--acc);border-radius:12px;padding:12px 22px;font-size:18px;font-weight:700}.lnav span{color:var(--mut);font-size:14px}.lo{display:block;width:100%;text-align:left;padding:12px;margin-bottom:8px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;font-family:inherit}.lo.ok{background:var(--accbg);border-color:var(--acc);color:var(--acc);font-weight:700}.lo.no{border-color:var(--dn);color:var(--dn)}.lbig{display:block;width:100%;padding:14px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-size:16px;font-weight:700;margin-top:8px;font-family:inherit}.lscore{font-size:34px;font-weight:700;color:var(--acc)}";
document.head.appendChild(css);

var V={l:null,t:null,m:null},ci=0,flip=false,qz=null;
var sec=document.createElement("div");sec.className="sec";sec.id="tillar";
document.body.appendChild(sec);
var tile=document.createElement("button");
tile.className="tile t7";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🌍</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}

function wordsOf(){return LG[V.l].w[V.t]}
function mkQ(){
  var n=wordsOf().length,all=[];for(var i=0;i<n;i++)all.push(i);
  var ids=shuffle(all).slice(0,Math.min(10,n));
  qz={ids:ids,i:0,score:0,pick:null,opts:null};setOpts();
}
function setOpts(){
  var n=wordsOf().length,c=qz.ids[qz.i],o=[c],x;
  while(o.length<3){x=Math.floor(Math.random()*n);if(o.indexOf(x)<0)o.push(x)}
  qz.opts=shuffle(o);
}
function speakBtn(txt){return '<button class="lsp" data-sp="'+txt.replace(/"/g,"&quot;")+'">🔊</button>'}
function draw(){
  var h='<button class="back" id="lb">← '+T[LANG].back+'</button>';
  var L=V.l!==null?LG[V.l]:null;
  if(V.l===null){
    h+='<div class="card"><h2>'+p("title")+'</h2>'+LG.map(function(g,i){return '<button class="lr" data-lg="'+i+'"><span class="e">'+g.f+'</span><span>'+nm(g.n)+'</span></button>'}).join("")+(p("note")?'<div class="sub" style="margin:6px 0 0">'+p("note")+'</div>':'')+'</div>';
  }else if(V.t===null){
    h+='<div class="card"><h2>'+L.f+' '+nm(L.n)+' · '+p("topics")+'</h2>'+TP.map(function(t,i){return '<button class="lr" data-tp="'+i+'"><span>'+nm(t.n)+'</span><span class="c">'+t.u.length+' '+p("words")+'</span></button>'}).join("")+'</div>';
  }else if(V.m===null){
    h+='<div class="card"><h2>'+L.f+' '+nm(TP[V.t].n)+'</h2><button class="lbig" data-m="cards">'+p("cards")+'</button><button class="lbig" data-m="quiz">'+p("test")+'</button></div>';
  }else if(V.m==="cards"){
    var w=L.w[V.t][ci],rd=L.r?L.r[V.t][ci]:"",n=TP[V.t].u.length;
    h+='<div class="card"><h2>'+L.f+' '+nm(TP[V.t].n)+'</h2><div class="lcard" data-flip="1"><div class="lw" dir="auto">'+w+'</div>'+(rd?'<div class="lrd">'+tr(rd)+'</div>':'')+speakBtn(w)+(flip?'<div class="lm">'+tr(TP[V.t].u[ci])+'</div>':'<div class="lh">'+p("tap")+'</div>')+'</div><div class="lnav"><button data-nv="-1">←</button><span>'+(ci+1)+' / '+n+'</span><button data-nv="1">→</button></div></div>';
  }else{
    if(qz.i<qz.ids.length){
      var c=qz.ids[qz.i],ww=L.w[V.t][c],rr=L.r?L.r[V.t][c]:"";
      h+='<div class="card"><h2>'+p("q")+' '+(qz.i+1)+'/'+qz.ids.length+'</h2><div class="lcard" style="min-height:0;padding:18px"><div class="lw" dir="auto">'+ww+'</div>'+(rr?'<div class="lrd">'+tr(rr)+'</div>':'')+speakBtn(ww)+'</div>';
      h+=qz.opts.map(function(k){
        var cl="lo";if(qz.pick!==null){if(k===c)cl+=" ok";else if(k===qz.pick)cl+=" no"}
        return '<button class="'+cl+'" data-q="'+k+'"'+(qz.pick!==null?' disabled':'')+'>'+tr(TP[V.t].u[k])+'</button>';
      }).join("");
      if(qz.pick!==null)h+='<button class="lbig" data-nx="1">'+(qz.i+1<qz.ids.length?p("next"):p("fin"))+'</button>';
      h+='</div>';
    }else{
      h+='<div class="card"><h2>'+p("res")+'</h2><div class="lscore">'+qz.score+' / '+qz.ids.length+'</div><button class="lbig" data-m="quiz">'+p("again")+'</button></div>';
    }
  }
  sec.innerHTML=h;
  document.getElementById("lb").addEventListener("click",function(){show("home")});
  function on(sel,fn){var bs=sec.querySelectorAll(sel);for(var i=0;i<bs.length;i++)(function(b){b.addEventListener("click",function(ev){fn(b,ev)})})(bs[i])}
  on("[data-lg]",function(b){V.l=+b.getAttribute("data-lg");draw();window.scrollTo(0,0)});
  on("[data-tp]",function(b){V.t=+b.getAttribute("data-tp");draw();window.scrollTo(0,0)});
  on("[data-m]",function(b){V.m=b.getAttribute("data-m");ci=0;flip=false;if(V.m==="quiz")mkQ();draw();window.scrollTo(0,0)});
  on("[data-flip]",function(){flip=!flip;draw()});
  on("[data-nv]",function(b){var n=wordsOf().length;ci=(ci+ +b.getAttribute("data-nv")+n)%n;flip=false;draw()});
  on("[data-sp]",function(b,ev){ev.stopPropagation();say(b.getAttribute("data-sp"),LG[V.l].tts)});
  on("[data-q]",function(b){if(qz.pick!==null)return;var k=+b.getAttribute("data-q");qz.pick=k;if(k===qz.ids[qz.i])qz.score++;draw()});
  on("[data-nx]",function(){qz.i++;qz.pick=null;if(qz.i<qz.ids.length)setOpts();draw();window.scrollTo(0,0)});
}
function up(){
  if(V.m!==null){V.m=null;return true}
  if(V.t!==null){V.t=null;return true}
  if(V.l!==null){V.l=null;return true}
  return false;
}
var _show=show;
show=function(id){
  if(id==="home"&&sec.classList.contains("on")&&up()){draw();window.scrollTo(0,0);return}
  _show(id);
};
tile.addEventListener("click",function(){V={l:null,t:null,m:null};draw();show("tillar")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();draw()})}
updTile();draw();
})();
