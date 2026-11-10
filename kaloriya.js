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

var AI="https://rasm-ai.muhammadaminergashev96.workers.dev";
var P={
uz:{tile:"Kaloriya",tileS:"Rasmga oling — hisoblaymiz",title:"Kaloriya hisoblagich",cam:"Rasm olish / tanlash",hint:"Ochilgan oynada «Kamera»ni tanlab rasmga oling yoki galereyadan tanlang.",gal:"",pick:"Ovqatni rasmga oling yoki rasm tanlang",busy:"Tahlil qilinmoqda… (10–30 soniya)",kcal:"kkal",g:"g",pr:"Oqsil",fa:"Yog‘",ca:"Uglevod",total:"Jami",port:"Porsiya",add:"Kundalikka qo‘shish",added:"Qo‘shildi ✓",today:"Bugun",goal:"Me‘yor",eaten:"Bugungi ovqatlar",none:"Hali ovqat qo‘shilmagan",del:"O‘chirish",note:"Natija taxminiy: sun’iy intellekt rasmdan baholaydi. Aniq me‘yor uchun shifokor yoki dietologga murojaat qiling.",err:"Xatolik",nofood:"Rasmda ovqat topilmadi. Boshqa rasm bilan urinib ko‘ring.",tg:"Bu funksiya Telegram ilovasi ichida ishlaydi.",save:"Saqlash",left:"qoldi",over:"oshdi",retry:"Qayta urinish"},
oz:{tile:"Калория",tileS:"Расмга олинг — ҳисоблаймиз",title:"Калория ҳисобаргич",cam:"Расм олиш / танлаш",hint:"Очилган ойнада «Камера»ни танлаб расмга олинг ёки галереядан танланг.",gal:"",pick:"Овқатни расмга олинг ёки расм танланг",busy:"Таҳлил қилинмоқда… (10–30 сония)",kcal:"ккал",g:"г",pr:"Оқсил",fa:"Ёғ",ca:"Углевод",total:"Жами",port:"Порция",add:"Кундаликка қўшиш",added:"Қўшилди ✓",today:"Бугун",goal:"Меъёр",eaten:"Бугунги овқатлар",none:"Ҳали овқат қўшилмаган",del:"Ўчириш",note:"Натижа тахминий: сунъий интеллект расмдан баҳолайди. Аниқ меъёр учун шифокор ёки диетологга мурожаат қилинг.",err:"Хатолик",nofood:"Расмда овқат топилмади. Бошқа расм билан уриниб кўринг.",tg:"Бу функция Телеграм иловаси ичида ишлайди.",save:"Сақлаш",left:"қолди",over:"ошди",retry:"Қайта уриниш"},
ru:{tile:"Калории",tileS:"Сфотографируйте — посчитаем",title:"Счётчик калорий",cam:"Сфотографировать / выбрать",hint:"В открывшемся окне выберите «Камера», чтобы сфотографировать, или выберите фото из галереи.",gal:"",pick:"Сфотографируйте еду или выберите фото",busy:"Анализ… (10–30 секунд)",kcal:"ккал",g:"г",pr:"Белки",fa:"Жиры",ca:"Углеводы",total:"Итого",port:"Порция",add:"Добавить в дневник",added:"Добавлено ✓",today:"Сегодня",goal:"Норма",eaten:"Съедено сегодня",none:"Пока ничего не добавлено",del:"Удалить",note:"Результат примерный: ИИ оценивает по фото. Для точной нормы обратитесь к врачу или диетологу.",err:"Ошибка",nofood:"Еда на фото не найдена. Попробуйте другое фото.",tg:"Функция работает внутри приложения Telegram.",save:"Сохранить",left:"осталось",over:"сверх",retry:"Повторить"}
};
function p(k){return (P[LANG]||P.uz)[k]}
function tx(s){return LANG==="oz"?cyr(String(s)):String(s)}
function $(id){return document.getElementById(id)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function r0(x){return Math.round(x)}
function r1(x){return Math.round(x*10)/10}

var css=document.createElement("style");
css.textContent=".t7{background:linear-gradient(135deg,#16a34a,#84cc16)}.kc-b{display:flex;gap:8px;margin:6px 0 10px}.kc-b label,.kc-b button{flex:1;text-align:center;padding:14px 8px;border-radius:12px;background:var(--acc);color:#fff;font-weight:700;font-size:15px;font-family:inherit;border:0;cursor:pointer}.kc-b label.s{background:var(--accbg);color:var(--acc)}.kc-b input{display:none}.kc-img{width:100%;max-height:260px;object-fit:cover;border-radius:12px;margin-bottom:10px}.kc-st{color:var(--mut);font-size:14px;margin:8px 0}.kc-er{color:var(--dn);font-size:14px;margin:8px 0}.kc-it{border-top:1px solid var(--line);padding:10px 0}.kc-it:first-child{border-top:0}.kc-it b{font-size:15px}.kc-it .r{display:flex;justify-content:space-between;gap:8px;align-items:baseline}.kc-it .k{font-weight:800;color:var(--acc);white-space:nowrap}.kc-it small{color:var(--mut);font-size:12.5px;display:block;margin-top:2px}.kc-tot{background:var(--accbg);border-radius:12px;padding:12px;margin:10px 0}.kc-tot .big{font-size:26px;font-weight:800;color:var(--acc)}.kc-ch{display:flex;gap:6px;margin:8px 0}.kc-ch button{flex:1;padding:9px 4px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-family:inherit;font-weight:700;font-size:14px}.kc-ch button.on{background:var(--acc);border-color:var(--acc);color:#fff}.kc-bar{height:10px;border-radius:6px;background:var(--line);overflow:hidden;margin:6px 0}.kc-bar i{display:block;height:100%;background:var(--acc);border-radius:6px}.kc-bar i.o{background:var(--dn)}.kc-go{width:100%;padding:13px;border-radius:12px;border:0;background:var(--acc);color:#fff;font-weight:700;font-size:15px;font-family:inherit;margin-top:6px}.kc-go:disabled{opacity:.6}.kc-n{color:var(--mut);font-size:12.5px;margin-top:12px;line-height:1.4}.kc-lg{display:flex;justify-content:space-between;align-items:center;gap:8px;border-top:1px solid var(--line);padding:9px 0;font-size:14px}.kc-lg button{border:0;background:none;color:var(--dn);font-size:13px;font-family:inherit}.kc-gi{display:flex;gap:6px;margin-top:6px}.kc-gi input{flex:1;padding:10px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:15px;font-family:inherit;min-width:0}.kc-gi button{padding:10px 14px;border-radius:10px;border:0;background:var(--accbg);color:var(--acc);font-weight:700;font-family:inherit}";
document.head.appendChild(css);

function dkey(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}
function loadLog(){try{var o=JSON.parse(localStorage.getItem("kc_log")||"null");if(o&&o.d===dkey())return o}catch(e){}return {d:dkey(),l:[]}}
function saveLog(o){try{localStorage.setItem("kc_log",JSON.stringify(o))}catch(e){}}
function getGoal(){try{var g=parseInt(localStorage.getItem("kc_goal"),10);if(g>=800&&g<=6000)return g}catch(e){}return 2000}
function setGoal(g){try{localStorage.setItem("kc_goal",String(g))}catch(e){}}

var S={img:"",items:null,note:"",mul:1,busy:false,err:"",added:false};

var sec=document.createElement("div");sec.className="sec";sec.id="kaloriya";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile t7";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🥗</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}

function scaled(){
  var m=S.mul,t={k:0,p:0,f:0,c:0,g:0};
  var L=(S.items||[]).map(function(x){var o={n:x.n,g:r0(x.g*m),k:r0(x.k*m),p:r1(x.p*m),f:r1(x.f*m),c:r1(x.c*m)};t.k+=o.k;t.p+=o.p;t.f+=o.f;t.c+=o.c;t.g+=o.g;return o});
  return {L:L,t:{k:r0(t.k),p:r1(t.p),f:r1(t.f),c:r1(t.c),g:r0(t.g)}};
}
function dayHtml(){
  var lg=loadLog(),sum=0;lg.l.forEach(function(x){sum+=x.k});
  var goal=getGoal(),pc=Math.min(100,sum/goal*100),over=sum>goal;
  var h='<div class="kc-tot"><div style="font-size:13px;color:var(--mut)">'+p("today")+'</div><div class="big">'+sum+' <span style="font-size:15px;font-weight:700">/ '+goal+' '+p("kcal")+'</span></div><div class="kc-bar"><i class="'+(over?"o":"")+'" style="width:'+pc+'%"></i></div><div style="font-size:13px;color:var(--mut)">'+(over?(sum-goal)+" "+p("kcal")+" "+p("over"):(goal-sum)+" "+p("kcal")+" "+p("left"))+'</div>';
  h+='<div class="kc-gi"><input id="kcg" type="number" inputmode="numeric" placeholder="'+p("goal")+': '+goal+'"><button id="kcgs">'+p("save")+'</button></div></div>';
  h+='<h3 style="margin:14px 0 4px;font-size:16px">'+p("eaten")+'</h3>';
  if(!lg.l.length)h+='<div class="kc-st">'+p("none")+'</div>';
  lg.l.forEach(function(x,i){h+='<div class="kc-lg"><span>'+esc(tx(x.n))+'</span><span><b>'+x.k+'</b> '+p("kcal")+' <button data-d="'+i+'">'+p("del")+'</button></span></div>'});
  return h;
}
function resHtml(){
  if(S.busy)return '<div class="kc-st">⏳ '+p("busy")+'</div>';
  var h="";
  if(S.err)h+='<div class="kc-er">'+esc(S.err)+'</div>';
  if(S.items&&S.items.length){
    var s=scaled();
    h+='<div class="kc-ch">'+[0.5,1,1.5,2].map(function(m){return '<button data-m="'+m+'" class="'+(S.mul===m?"on":"")+'">'+(m===1?"1×":m+"×")+'</button>'}).join("")+'</div>';
    s.L.forEach(function(x){h+='<div class="kc-it"><div class="r"><b>'+esc(tx(x.n))+'</b><span class="k">'+x.k+' '+p("kcal")+'</span></div><small>'+x.g+' '+p("g")+' · '+p("pr")+' '+x.p+' · '+p("fa")+' '+x.f+' · '+p("ca")+' '+x.c+'</small></div>'});
    h+='<div class="kc-tot"><div style="font-size:13px;color:var(--mut)">'+p("total")+' · '+s.t.g+' '+p("g")+'</div><div class="big">'+s.t.k+' '+p("kcal")+'</div><div style="font-size:13px;color:var(--mut)">'+p("pr")+' '+s.t.p+' · '+p("fa")+' '+s.t.f+' · '+p("ca")+' '+s.t.c+'</div></div>';
    if(S.note)h+='<div class="kc-st">'+esc(tx(S.note))+'</div>';
    h+='<button class="kc-go" id="kca"'+(S.added?" disabled":"")+'>'+(S.added?p("added"):p("add"))+'</button>';
  }
  return h;
}
function draw(){
  sec.innerHTML='<button class="back" id="kb">← '+T[LANG].back+'</button><div class="card"><h2>'+p("title")+'</h2>'+
  '<div class="kc-b"><label>📷 '+p("cam")+'<input id="kci1" type="file" accept="image/*"></label></div><div class="kc-st" style="margin-top:0">'+p("hint")+'</div>'+
  (S.img?'<img class="kc-img" src="'+S.img+'">':'<div class="kc-st">'+p("pick")+'</div>')+
  '<div id="kcr">'+resHtml()+'</div><div class="kc-n">'+p("note")+'</div></div><div class="card" id="kcd">'+dayHtml()+'</div>';
  $("kb").addEventListener("click",function(){show("home")});
  $("kci1").addEventListener("change",onFile);
  bindRes();bindDay();
}
function bindRes(){
  var b=sec.querySelectorAll("[data-m]");for(var i=0;i<b.length;i++)b[i].addEventListener("click",function(){S.mul=parseFloat(this.getAttribute("data-m"));S.added=false;$("kcr").innerHTML=resHtml();bindRes()});
  var a=$("kca");if(a)a.addEventListener("click",function(){
    var s=scaled(),lg=loadLog(),nm=s.L.map(function(x){return x.n}).join(", ").slice(0,70);
    lg.l.push({n:nm,k:s.t.k,p:s.t.p,f:s.t.f,c:s.t.c});saveLog(lg);S.added=true;$("kcr").innerHTML=resHtml();bindRes();$("kcd").innerHTML=dayHtml();bindDay();
    try{Telegram.WebApp.HapticFeedback.notificationOccurred("success")}catch(e){}
  });
}
function bindDay(){
  var d=sec.querySelectorAll("[data-d]");for(var i=0;i<d.length;i++)d[i].addEventListener("click",function(){var lg=loadLog();lg.l.splice(+this.getAttribute("data-d"),1);saveLog(lg);$("kcd").innerHTML=dayHtml();bindDay()});
  var g=$("kcgs");if(g)g.addEventListener("click",function(){var v=parseInt($("kcg").value,10);if(v>=800&&v<=6000){setGoal(v);$("kcd").innerHTML=dayHtml();bindDay()}});
}
function shrink(file,cb){
  var fr=new FileReader();
  fr.onload=function(){var im=new Image();im.onload=function(){
    var M=900,w=im.width,h=im.height,k=Math.min(1,M/Math.max(w,h));w=Math.round(w*k);h=Math.round(h*k);
    var c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(im,0,0,w,h);
    cb(c.toDataURL("image/jpeg",0.72));
  };im.onerror=function(){cb(null)};im.src=fr.result};
  fr.onerror=function(){cb(null)};fr.readAsDataURL(file);
}
function onFile(){
  var f=this.files&&this.files[0];if(!f)return;
  shrink(f,function(d){
    if(!d){S.err=p("err");$("kcr").innerHTML=resHtml();return}
    S.img=d;S.items=null;S.note="";S.mul=1;S.err="";S.added=false;analyze();
  });
}
function analyze(){
  var tg=window.Telegram&&Telegram.WebApp,init=tg&&tg.initData;
  S.busy=true;draw();
  if(!init){S.busy=false;S.err=p("tg");draw();return}
  var ctl=window.AbortController?new AbortController():null,tm=setTimeout(function(){ctl&&ctl.abort()},60000);
  fetch(AI+"/cal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({image:S.img,init:init,lang:LANG==="ru"?"ru":"uz"}),signal:ctl?ctl.signal:undefined})
  .then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j}})})
  .then(function(o){
    clearTimeout(tm);S.busy=false;
    if(!o.ok||o.j.error){S.err=(o.j&&o.j.error)||p("err")}
    else if(!o.j.ok||!o.j.items.length){S.err=p("nofood")}
    else{S.items=o.j.items;S.note=o.j.note||""}
    draw();
  }).catch(function(){clearTimeout(tm);S.busy=false;S.err=p("err")+". "+p("retry");draw()});
}

tile.addEventListener("click",function(){draw();show("kaloriya")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();if(sec.classList.contains("on")&&!S.busy)draw()})}
updTile();
})();
