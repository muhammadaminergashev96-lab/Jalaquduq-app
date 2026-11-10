(function(){
var TP=TL.TP,LG=TL.LG,DL=TL.DL||[];
var P={
uz:{tile:"Tillar",title:"Tillarni o‘rganish",topics:"Mavzular",secW:"So‘zlar",secP:"Iboralar",cards:"Kartochkalar",test:"Test: tarjimasini toping",rev:"Teskari test: o‘zbekchadan",listen:"Eshitib topish",match:"Juftlikni topish",build:"Harflardan so‘z tuzish",dlg:"Dialoglar",err:"Xatolar ustida ishlash",tap:"Tarjimasini ko‘rish uchun bosing",q:"Savol",next:"Keyingi",fin:"Natijani ko‘rish",res:"Natija",again:"Qayta boshlash",words:"so‘z",know:"✓ Bilaman",rep:"↻ Takrorlayman",streak:"kun ketma-ket",today:"Bugun",goal:"Kunlik maqsad",noerr:"Xatolar yo‘q 🎉",errw:"xato so‘z",lh:"Eshiting va tarjimasini tanlang",mm:"Chap tomondagi so‘zga mos tarjimani toping",bh:"Harflarni to‘g‘ri tartibda bosing",errs:"xato",playall:"▶ Hammasini tinglash",showtr:"Tarjimalarni ko‘rsatish",hidetr:"Tarjimalarni yashirish",tapm:"Tarjima uchun bosing",ans:"To‘g‘ri javob",done:"Barakalla!",note:"",ndlg:"ta dialog"},
ru:{tile:"Языки",title:"Изучение языков",topics:"Темы",secW:"Слова",secP:"Фразы",cards:"Карточки",test:"Тест: найдите перевод",rev:"Обратный тест: с узбекского",listen:"Угадай на слух",match:"Найди пару",build:"Составь слово из букв",dlg:"Диалоги",err:"Работа над ошибками",tap:"Нажмите, чтобы увидеть перевод",q:"Вопрос",next:"Далее",fin:"Показать результат",res:"Результат",again:"Начать заново",words:"слов",know:"✓ Знаю",rep:"↻ Повторю",streak:"дн. подряд",today:"Сегодня",goal:"Цель на день",noerr:"Ошибок нет 🎉",errw:"слов с ошибками",lh:"Послушайте и выберите перевод",mm:"Подберите перевод к слову слева",bh:"Нажимайте буквы по порядку",errs:"ошиб.",playall:"▶ Прослушать всё",showtr:"Показать переводы",hidetr:"Скрыть переводы",tapm:"Нажмите для перевода",ans:"Правильный ответ",done:"Молодец!",note:"Переводы даны на узбекском языке.",ndlg:"диалога"}
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
function p(k){var v=P[LANG==="ru"?"ru":"uz"][k];return LANG==="oz"?cyr(v):v}
function nm(a){return LANG==="ru"?a[1]:tr(a[0])}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x}return a}
function say(t,l){try{var u=new SpeechSynthesisUtterance(t);u.lang=l;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}
function ld(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v||d}catch(e){return d}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var PR=ld("tl_p",{}),ST=ld("tl_s",{d:"",n:0,s:0,l:""});
function ds(d){return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}
function td(){return ds(new Date())}
function yd(){var d=new Date();d.setDate(d.getDate()-1);return ds(d)}
function tick(){var t=td();if(ST.d!==t){ST.s=(ST.l===yd())?ST.s+1:1;ST.d=t;ST.n=0}ST.l=t;ST.n++;sv("tl_s",ST)}
function gr(t,i,ok){var k=V.l+"."+t+"."+i,o=PR[k]||{v:0,e:0};if(ok){o.v=Math.min(3,o.v+1);o.e=0}else{o.v=0;o.e=1}PR[k]=o;tick();sv("tl_p",PR)}
function setKnown(t,i,ok){var k=V.l+"."+t+"."+i,o=PR[k]||{v:0,e:0};if(ok){o.v=Math.max(o.v,2);o.e=0}else{o.v=0;o.e=1}PR[k]=o;tick();sv("tl_p",PR)}
function known(l,t){var n=0,c=LG[l].w[t].length;for(var i=0;i<c;i++){var o=PR[l+"."+t+"."+i];if(o&&o.v>=2)n++}return n}
function errList(l){var a=[];for(var t=0;t<TP.length;t++){var c=LG[l].w[t]?LG[l].w[t].length:0;for(var i=0;i<c;i++){var o=PR[l+"."+t+"."+i];if(o&&o.e)a.push({t:t,i:i})}}return a}
function streak(){return (ST.l===td()||ST.l===yd())?ST.s:0}
function todayN(){return ST.d===td()?ST.n:0}

var css=document.createElement("style");
css.textContent=".t7{background:linear-gradient(135deg,#e8590c,#ffc078)}.lr{display:flex;align-items:center;gap:12px;width:100%;padding:14px;border-radius:14px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;font-weight:600;margin-bottom:8px;text-align:left;font-family:inherit}.lr .e{font-size:26px}.lr .c{margin-left:auto;color:var(--mut);font-size:13px;font-weight:400;white-space:nowrap}.lr .c.ok{color:var(--acc);font-weight:700}.lcard{border:1px solid var(--line);border-radius:18px;background:var(--bg);padding:26px 14px;text-align:center;margin-bottom:10px;min-height:190px}.lw{font-size:32px;font-weight:700;word-break:break-word}.lw.s{font-size:24px}.lrd{color:var(--mut);font-size:16px;margin-top:6px}.lm{font-size:22px;color:var(--acc);font-weight:700;margin-top:14px}.lh{color:var(--mut);font-size:13px;margin-top:14px}.lsp{border:0;background:var(--accbg);color:var(--acc);border-radius:50%;width:44px;height:44px;font-size:20px;margin-top:10px}.lsp.big{width:72px;height:72px;font-size:32px}.lnav{display:flex;justify-content:space-between;align-items:center;gap:8px}.lnav button{border:0;background:var(--accbg);color:var(--acc);border-radius:12px;padding:12px 22px;font-size:18px;font-weight:700}.lnav span{color:var(--mut);font-size:14px}.lo{display:block;width:100%;text-align:left;padding:12px;margin-bottom:8px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;font-family:inherit}.lo small{color:var(--mut);font-size:13px;margin-left:6px}.lo.ok{background:var(--accbg);border-color:var(--acc);color:var(--acc);font-weight:700}.lo.no{border-color:var(--dn);color:var(--dn)}.lo.sel{border-color:var(--acc);background:var(--accbg)}.lo.dn{opacity:.35}.lbig{display:block;width:100%;padding:14px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-size:16px;font-weight:700;margin-top:8px;font-family:inherit}.lbig.alt{background:var(--accbg);color:var(--acc)}.lbig.dn{background:var(--dn)}.lscore{font-size:34px;font-weight:700;color:var(--acc)}.lstat{display:flex;gap:8px;margin-bottom:12px}.lstat>div{flex:1;border:1px solid var(--line);border-radius:12px;padding:10px;text-align:center;background:var(--bg)}.lstat b{display:block;font-size:20px;color:var(--acc)}.lstat span{font-size:12px;color:var(--mut)}.lbar{height:8px;border-radius:4px;background:var(--line);margin:0 0 14px;overflow:hidden}.lbar i{display:block;height:100%;background:var(--acc)}.lsec{font-size:13px;color:var(--mut);font-weight:700;margin:14px 0 8px;text-transform:uppercase}.lcols{display:flex;gap:8px}.lcols>div{flex:1}.lslots{font-size:30px;font-weight:700;letter-spacing:3px;min-height:44px;margin:12px 0;word-break:break-all}.ltiles{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:8px}.ltile{min-width:46px;height:46px;border-radius:10px;border:1px solid var(--line);background:var(--accbg);color:var(--acc);font-size:22px;font-weight:700;font-family:inherit}.ltile:disabled{opacity:.25}.bb{max-width:88%;padding:10px 12px;border-radius:14px;margin-bottom:8px;border:1px solid var(--line);background:var(--bg);position:relative}.bb.b{margin-left:auto;background:var(--accbg)}.bb .w{font-size:17px;font-weight:600}.bb .r{color:var(--mut);font-size:13px;margin-top:2px}.bb .m{color:var(--acc);font-size:14px;margin-top:6px}.bb .sp{border:0;background:transparent;font-size:18px;padding:0 0 0 6px;float:right}";
document.head.appendChild(css);

var V={l:null,t:null,m:null,dl:false,di:null},ci=0,flip=false,qz=null,mg=null,lt=null,shT={};
var sec=document.createElement("div");sec.className="sec";sec.id="tillar";
document.body.appendChild(sec);
var tile=document.createElement("button");
tile.className="tile t7";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🌍</div><b>'+p("tile")+'</b><span>'+LG.length+(LANG==="ru"?" языков · ":" ta til · ")+TP.length+(LANG==="ru"?" тем":(LANG==="oz"?" мавзу":" mavzu"))+'</span>'}

function L(){return LG[V.l]}
function W(t,i){return L().w[t][i]}
function RD(t,i){var r=L().r;return r&&r[t]?r[t][i]:""}
function wordsOf(t){return L().w[t]}
function speakBtn(txt,big){return '<button class="lsp'+(big?' big':'')+'" data-sp="'+esc(txt)+'">🔊</button>'}
function canBuild(t){if(TP[t].ph||[0,1,3,5].indexOf(V.l)<0)return [];var a=[],w=wordsOf(t);for(var i=0;i<w.length;i++)if(/^[^\s?.…!,\-]+$/.test(w[i])&&w[i].length>=3&&w[i].length<=12)a.push(i);return a}

function startQuiz(items,kind){
  items=shuffle(items.slice(0,10));
  for(var i=0;i<items.length;i++)items[i].k=kind||items[i].k||"fu";
  qz={items:items,i:0,score:0,pick:null,opts:null};setOpts();V.m="quiz";
}
function setOpts(){
  var c=qz.items[qz.i],n=wordsOf(c.t).length,o=[c.i],x,max=Math.min(4,n);
  while(o.length<max){x=Math.floor(Math.random()*n);if(o.indexOf(x)<0)o.push(x)}
  qz.opts=shuffle(o);
}
function topicIds(t){var a=[],n=wordsOf(t).length;for(var i=0;i<n;i++)a.push({t:t,i:i});return a}
function startMatch(){
  var n=wordsOf(V.t).length,ids=[];for(var i=0;i<n;i++)ids.push(i);ids=shuffle(ids).slice(0,6);
  mg={ids:ids,left:shuffle(ids.slice()),right:shuffle(ids.slice()),sel:null,done:{},bad:null,er:{},err:0};V.m="match";
}
function startBuild(){
  var a=shuffle(canBuild(V.t)).slice(0,8);
  lt={ids:a,i:0,score:0,have:[],used:{},st:null,pool:null};initWord();V.m="build";
}
function initWord(){
  var w=W(V.t,lt.ids[lt.i]).split(""),idx=[];for(var i=0;i<w.length;i++)idx.push(i);
  var pool=shuffle(idx.slice());if(pool.join()===idx.join()&&w.length>1)pool=pool.reverse();
  lt.pool=pool;lt.have=[];lt.used={};lt.st=null;
}
function statCard(){
  var pc=Math.min(100,Math.round(todayN()/20*100));
  return '<div class="lstat"><div><b>🔥 '+streak()+'</b><span>'+p("streak")+'</span></div><div><b>'+todayN()+' / 20</b><span>'+p("goal")+'</span></div></div><div class="lbar"><i style="width:'+pc+'%"></i></div>';
}
function draw(){
  var h='<button class="back" id="lb">← '+T[LANG].back+'</button>';
  var g=V.l!==null?L():null;
  if(V.l===null){
    h+='<div class="card"><h2>'+p("title")+'</h2>'+statCard()+LG.map(function(x,i){return '<button class="lr" data-lg="'+i+'"><span class="e">'+x.f+'</span><span>'+nm(x.n)+'</span></button>'}).join("")+(p("note")?'<div class="sub" style="margin:6px 0 0">'+p("note")+'</div>':'')+'</div>';
  }else if(V.dl){
    h+=drawDlg(g);
  }else if(V.m!==null){
    h+=drawMode(g);
  }else if(V.t===null){
    var ne=errList(V.l).length;
    h+='<div class="card"><h2>'+g.f+' '+nm(g.n)+'</h2>'+statCard();
    if(ne)h+='<button class="lbig dn" data-mode="err">'+p("err")+' · '+ne+' '+p("errs")+'</button>';
    if(DL.length)h+='<button class="lbig alt" data-mode="dlg">💬 '+p("dlg")+' · '+DL.length+'</button>';
    ["secW","secP"].forEach(function(sk,si){
      var rows=[];TP.forEach(function(t,i){if((si===1)===!!t.ph)rows.push(i)});
      if(!rows.length)return;
      h+='<div class="lsec">'+p(sk)+'</div>'+rows.map(function(i){var t=TP[i],k=known(V.l,i),n=t.u.length;return '<button class="lr" data-tp="'+i+'"><span>'+nm(t.n)+'</span><span class="c'+(k===n?' ok':'')+'">'+(k===n?'✓ ':'')+k+'/'+n+'</span></button>'}).join("");
    });
    h+='</div>';
  }else{
    var cb=canBuild(V.t).length>=4;
    h+='<div class="card"><h2>'+g.f+' '+nm(TP[V.t].n)+'</h2><button class="lbig" data-mode="cards">'+p("cards")+'</button><button class="lbig" data-mode="quiz">'+p("test")+'</button><button class="lbig" data-mode="rev">'+p("rev")+'</button><button class="lbig" data-mode="listen">'+p("listen")+'</button><button class="lbig" data-mode="match">'+p("match")+'</button>'+(cb?'<button class="lbig" data-mode="build">'+p("build")+'</button>':'')+'</div>';
  }
  sec.innerHTML=h;wire();
  if(V.m==="quiz"&&qz&&qz.i<qz.items.length&&qz.items[qz.i].k==="au"&&qz.pick===null){var c=qz.items[qz.i];setTimeout(function(){say(W(c.t,c.i),L().tts)},200)}
}
function drawMode(g){
  var h='';
  if(V.m==="cards"){
    var w=W(V.t,ci),rd=RD(V.t,ci),n=wordsOf(V.t).length,ph=TP[V.t].ph;
    h+='<div class="card"><h2>'+g.f+' '+nm(TP[V.t].n)+'</h2><div class="lcard" data-flip="1"><div class="lw'+(ph?' s':'')+'" dir="auto">'+w+'</div>'+(rd?'<div class="lrd">'+tr(rd)+'</div>':'')+speakBtn(w)+(flip?'<div class="lm">'+tr(TP[V.t].u[ci])+'</div>':'<div class="lh">'+p("tap")+'</div>')+'</div>';
    h+='<div class="lcols"><div><button class="lbig dn" style="margin:0 0 10px" data-kn="0">'+p("rep")+'</button></div><div><button class="lbig" style="margin:0 0 10px" data-kn="1">'+p("know")+'</button></div></div>';
    h+='<div class="lnav"><button data-nv="-1">←</button><span>'+(ci+1)+' / '+n+'</span><button data-nv="1">→</button></div></div>';
  }else if(V.m==="quiz"){
    if(qz.i<qz.items.length){
      var c=qz.items[qz.i],ww=W(c.t,c.i),rr=RD(c.t,c.i),u=tr(TP[c.t].u[c.i]),ph2=TP[c.t].ph;
      h+='<div class="card"><h2>'+p("q")+' '+(qz.i+1)+'/'+qz.items.length+'</h2><div class="lcard" style="min-height:0;padding:18px">';
      if(c.k==="uf")h+='<div class="lw'+(ph2?' s':'')+'">'+u+'</div>';
      else if(c.k==="au")h+=speakBtn(ww,1)+'<div class="lh">'+p("lh")+'</div>';
      else h+='<div class="lw'+(ph2?' s':'')+'" dir="auto">'+ww+'</div>'+(rr?'<div class="lrd">'+tr(rr)+'</div>':'')+speakBtn(ww);
      h+='</div>';
      h+=qz.opts.map(function(k){
        var cl="lo";if(qz.pick!==null){if(k===c.i)cl+=" ok";else if(k===qz.pick)cl+=" no"}
        var lab=c.k==="uf"?'<span dir="auto">'+W(c.t,k)+'</span>'+(RD(c.t,k)?'<small>'+tr(RD(c.t,k))+'</small>':''):tr(TP[c.t].u[k]);
        return '<button class="'+cl+'" data-q="'+k+'"'+(qz.pick!==null?' disabled':'')+'>'+lab+'</button>';
      }).join("");
      if(qz.pick!==null)h+='<button class="lbig" data-nx="1">'+(qz.i+1<qz.items.length?p("next"):p("fin"))+'</button>';
      h+='</div>';
    }else{
      h+='<div class="card"><h2>'+p("res")+'</h2><div class="lscore">'+qz.score+' / '+qz.items.length+'</div><button class="lbig" data-mode="again">'+p("again")+'</button></div>';
    }
  }else if(V.m==="match"){
    var fin=true;mg.ids.forEach(function(i){if(!mg.done[i])fin=false});
    h+='<div class="card"><h2>'+g.f+' '+nm(TP[V.t].n)+'</h2>';
    if(fin){h+='<div class="lscore">'+p("done")+'</div><div class="lh" style="margin:6px 0 10px">'+mg.err+' '+p("errs")+'</div><button class="lbig" data-mode="match">'+p("again")+'</button>';}
    else{
      h+='<div class="lh" style="margin:0 0 10px">'+p("mm")+'</div><div class="lcols"><div>'+mg.left.map(function(i){var cl="lo"+(mg.done[i]?" ok dn":"")+(mg.sel===i?" sel":"")+(mg.bad&&mg.bad[0]===i?" no":"");return '<button class="'+cl+'" dir="auto" data-ml="'+i+'"'+(mg.done[i]?' disabled':'')+'>'+W(V.t,i)+'</button>'}).join("")+'</div><div>'+mg.right.map(function(i){var cl="lo"+(mg.done[i]?" ok dn":"")+(mg.bad&&mg.bad[1]===i?" no":"");return '<button class="'+cl+'" data-mr="'+i+'"'+(mg.done[i]?' disabled':'')+'>'+tr(TP[V.t].u[i])+'</button>'}).join("")+'</div></div>';
    }
    h+='</div>';
  }else if(V.m==="build"){
    h+='<div class="card"><h2>'+g.f+' '+nm(TP[V.t].n)+'</h2>';
    if(lt.i<lt.ids.length){
      var id=lt.ids[lt.i],wd=W(V.t,id),wl=wd.split("");
      var got=lt.have.map(function(k){return wl[k]}).join("");
      h+='<div class="lcard" style="min-height:0;padding:16px"><div class="lm" style="margin:0">'+tr(TP[V.t].u[id])+'</div><div class="lh" style="margin-top:6px">'+(lt.i+1)+' / '+lt.ids.length+'</div>'+speakBtn(wd)+'<div class="lslots" dir="ltr" style="color:'+(lt.st==="ok"?'var(--acc)':(lt.st==="no"?'var(--dn)':'inherit'))+'">'+(got||'&nbsp;')+'</div>'+(lt.st==="no"?'<div class="lh" style="margin:0">'+p("ans")+': <b>'+wd+'</b></div>':'')+'</div>';
      h+='<div class="ltiles">'+lt.pool.map(function(k){return '<button class="ltile" data-lt="'+k+'"'+((lt.used[k]||lt.st)?' disabled':'')+'>'+wl[k]+'</button>'}).join("")+'</div>';
      if(!lt.st)h+='<button class="lbig alt" data-lbk="1">⌫</button>';
      else h+='<button class="lbig" data-lnx="1">'+(lt.i+1<lt.ids.length?p("next"):p("fin"))+'</button>';
    }else h+='<div class="lscore">'+lt.score+' / '+lt.ids.length+'</div><button class="lbig" data-mode="build">'+p("again")+'</button>';
    h+='</div>';
  }
  return h;
}
var DI=[[0],[1],[2,3],[4],[5,6],[7]];
function drawDlg(g){
  var h='';
  if(V.di===null){
    h+='<div class="card"><h2>'+g.f+' 💬 '+p("dlg")+'</h2>'+DL.map(function(d,i){return '<button class="lr" data-di="'+i+'"><span>'+nm(d.n)+'</span><span class="c">'+d.l.length+'</span></button>'}).join("")+'</div>';
  }else{
    var d=DL[V.di],m=DI[V.l],all=!!shT.all;
    h+='<div class="card"><h2>'+g.f+' '+nm(d.n)+'</h2><div class="lcols"><div><button class="lbig alt" style="margin:0 0 10px" data-pa="1">'+p("playall")+'</button></div><div><button class="lbig alt" style="margin:0 0 10px" data-sa="1">'+(all?p("hidetr"):p("showtr"))+'</button></div></div>';
    h+=d.l.map(function(r,i){
      var tx=r[2][m[0]],ro=m[1]!==undefined?r[2][m[1]]:"";
      return '<div class="bb'+(r[0]==="B"?' b':'')+'" data-bb="'+i+'"><button class="sp" data-sp="'+esc(tx)+'">🔊</button><div class="w" dir="auto">'+tx+'</div>'+(ro?'<div class="r">'+tr(ro)+'</div>':'')+((all||shT[i])?'<div class="m">'+tr(r[1])+'</div>':'')+'</div>';
    }).join("")+'<div class="lh">'+p("tapm")+'</div></div>';
  }
  return h;
}
function wire(){
  document.getElementById("lb").addEventListener("click",function(){show("home")});
  function on(sel,fn){var bs=sec.querySelectorAll(sel);for(var i=0;i<bs.length;i++)(function(b){b.addEventListener("click",function(ev){fn(b,ev)})})(bs[i])}
  function up2(){draw();window.scrollTo(0,0)}
  on("[data-lg]",function(b){V.l=+b.getAttribute("data-lg");up2()});
  on("[data-tp]",function(b){V.t=+b.getAttribute("data-tp");up2()});
  on("[data-di]",function(b){V.di=+b.getAttribute("data-di");shT={};up2()});
  on("[data-mode]",function(b){
    var m=b.getAttribute("data-mode");
    if(m==="again")m=V._last||"quiz";
    ci=0;flip=false;V._last=m;
    if(m==="cards")V.m="cards";
    else if(m==="quiz"||m==="rev"||m==="listen")startQuiz(topicIds(V.t),m==="quiz"?"fu":(m==="rev"?"uf":"au"));
    else if(m==="match")startMatch();
    else if(m==="build")startBuild();
    else if(m==="dlg"){V.dl=true;V.di=null}
    else if(m==="err"){var e=errList(V.l);V._last="err";startQuiz(e.map(function(x){return {t:x.t,i:x.i,k:["fu","uf","au"][Math.floor(Math.random()*3)]}}))}
    up2();
  });
  on("[data-flip]",function(){flip=!flip;draw()});
  on("[data-kn]",function(b){setKnown(V.t,ci,b.getAttribute("data-kn")==="1");var n=wordsOf(V.t).length;ci=(ci+1)%n;flip=false;draw()});
  on("[data-nv]",function(b){var n=wordsOf(V.t).length;ci=(ci+ +b.getAttribute("data-nv")+n)%n;flip=false;draw()});
  on("[data-sp]",function(b,ev){ev.stopPropagation();say(b.getAttribute("data-sp"),L().tts)});
  on("[data-q]",function(b){if(qz.pick!==null)return;var k=+b.getAttribute("data-q"),c=qz.items[qz.i];qz.pick=k;var ok=k===c.i;if(ok)qz.score++;gr(c.t,c.i,ok);draw()});
  on("[data-nx]",function(){qz.i++;qz.pick=null;if(qz.i<qz.items.length)setOpts();up2()});
  on("[data-ml]",function(b){mg.sel=+b.getAttribute("data-ml");mg.bad=null;draw()});
  on("[data-mr]",function(b){
    if(mg.sel===null)return;var r=+b.getAttribute("data-mr"),s=mg.sel;
    if(r===s){mg.done[s]=1;mg.sel=null;mg.bad=null;gr(V.t,s,!mg.er[s]);draw()}
    else{if(!mg.er[s]){mg.er[s]=1;gr(V.t,s,false)}mg.err++;mg.bad=[s,r];mg.sel=null;draw();setTimeout(function(){mg.bad=null;if(V.m==="match")draw()},600)}
  });
  on("[data-lt]",function(b){
    var k=+b.getAttribute("data-lt");if(lt.st||lt.used[k])return;lt.used[k]=1;lt.have.push(k);
    var id=lt.ids[lt.i],wd=W(V.t,id);
    if(lt.have.length===wd.length){var got=lt.have.map(function(x){return wd.charAt(x)}).join("");lt.st=got===wd?"ok":"no";if(lt.st==="ok")lt.score++;gr(V.t,id,lt.st==="ok")}
    draw();
  });
  on("[data-lbk]",function(){var k=lt.have.pop();if(k!==undefined)delete lt.used[k];draw()});
  on("[data-lnx]",function(){lt.i++;if(lt.i<lt.ids.length)initWord();up2()});
  on("[data-sa]",function(){shT.all=!shT.all;if(!shT.all)for(var k in shT)if(k!=="all")delete shT[k];draw()});
  on(".bb",function(b,ev){if(ev.target.className==="sp")return;var i=b.getAttribute("data-bb");shT[i]=!shT[i];draw()});
  on("[data-pa]",function(){
    try{speechSynthesis.cancel();var d=DL[V.di],m=DI[V.l];d.l.forEach(function(r){var u=new SpeechSynthesisUtterance(r[2][m[0]]);u.lang=L().tts;speechSynthesis.speak(u)})}catch(e){}
  });
}
function up(){
  try{speechSynthesis.cancel()}catch(e){}
  if(V.di!==null){V.di=null;return true}
  if(V.dl){V.dl=false;return true}
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
tile.addEventListener("click",function(){V={l:null,t:null,m:null,dl:false,di:null};draw();show("tillar")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();draw()})}
updTile();draw();
})();
