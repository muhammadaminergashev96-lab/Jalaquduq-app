(function(){
var M={a:"а",b:"б",d:"д",e:"е",f:"ф",g:"г",h:"ҳ",i:"и",j:"ж",k:"к",l:"л",m:"м",n:"н",o:"о",p:"п",q:"қ",r:"р",s:"с",t:"т",u:"у",v:"в",x:"х",y:"й",z:"з","’":"ъ","ʼ":"ъ"};
function cyrUI(s){var out="",i=0,low=s.toLowerCase(),AP=/[‘’'ʻʼ]/;while(i<s.length){var c=low.charAt(i),n=low.charAt(i+1),two=c+n,up=s.charAt(i)!==c,r=null,len=1;
if((c==="o"||c==="g")&&AP.test(n)){r=c==="o"?"ў":"ғ";len=2}else if(two==="sh"){r="ш";len=2}else if(two==="ch"){r="ч";len=2}else if(two==="yo"&&!AP.test(low.charAt(i+2))){r="ё";len=2}else if(two==="yu"){r="ю";len=2}else if(two==="ya"){r="я";len=2}else if(two==="ye"){r="е";len=2}else if(c==="e"&&(i===0||!/[a-z‘’'ʻʼ]/.test(low.charAt(i-1)))){r="э"}else if(M[c]){r=M[c]}else{r=s.charAt(i)}
if(up&&r!==s.charAt(i)){r=r.charAt(0).toUpperCase()+r.slice(1)}out+=r;i+=len}return out}
function tr(s){return LANG==="oz"?cyrUI(s):s}

/* ---- konvertatsiya ---- */
var AP="[‘’ʻʼ'`´]";
function latToNew(s){
  s=s.replace(new RegExp("([oOgG])"+AP,"g"),function(m,c){return c==="o"?"ö":c==="O"?"Ö":c==="g"?"ğ":"Ğ"});
  s=s.replace(/[sS][hH]/g,function(m){return m.charAt(0)==="S"?"Ş":"ş"});
  s=s.replace(/[cC][hH]/g,function(m){return m.charAt(0)==="C"?"Ç":"ç"});
  return s.replace(/['`´ʻ‘ʼ]/g,"’");
}
function newToOld(s){
  return s.replace(/ö/g,"o‘").replace(/Ö/g,"O‘").replace(/ğ/g,"g‘").replace(/Ğ/g,"G‘").replace(/ş/g,"sh").replace(/Ş/g,"Sh").replace(/ç/g,"ch").replace(/Ç/g,"Ch");
}
var CY={"а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"yo","ж":"j","з":"z","и":"i","й":"y","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"x","ц":"ts","ч":"ç","ш":"ş","щ":"şç","ъ":"’","ь":"","ы":"i","э":"e","ю":"yu","я":"ya","ў":"ö","қ":"q","ғ":"ğ","ҳ":"h"};
var VOW="аеёиоуэюяў";
function cyrToNew(s){
  var out="",i,c,l,r,prev="";
  for(i=0;i<s.length;i++){
    c=s.charAt(i);l=c.toLowerCase();
    if(!CY.hasOwnProperty(l)){out+=c;prev=c;continue}
    r=CY[l];
    if(l==="е"){var pl=prev.toLowerCase();if(!prev||!/[А-Яа-яЁёЎўҚқҒғҲҳ]/.test(prev)||VOW.indexOf(pl)>=0||pl==="ъ"||pl==="ь")r="ye"}
    if(c!==l&&r){
      var nx=s.charAt(i+1),nxUp=nx&&nx!==nx.toLowerCase();
      r=(r.length>1&&nxUp&&/[А-Яа-я]/.test(nx))?r.toUpperCase():r.charAt(0).toUpperCase()+r.slice(1);
    }
    out+=r;prev=c;
  }
  return out;
}
function toNew(s){return latToNew(cyrToNew(s))}
function toOld(s){return newToOld(cyrToNew(s).replace(/ğ/g,"g‘"))}

/* ---- interfeys ---- */
var UI={uz:{tile:"Yangi alifbo",tileS:"Ö Ğ Ş Ç — matnni o‘tkazish",title:"Yangi o‘zbek alifbosi",inp:"Matnni shu yerga yozing yoki qo‘ying (kirill yoki lotin)",out:"Natija",toNew:"Yangi alifboga",toOld:"Eski lotinga",copy:"Nusxalash",copied:"Nusxalandi ✓",clear:"Tozalash",ex:"Namuna",keys:"Harflarni qo‘shish",rules:"Qoida",r1:"Asosiy o‘zgarishlar",r2:"Yangi alifbo 26 harf va 3 harf birikmasi o‘rniga 28 harf va tutuq belgisidan iborat.",ng:"«ng» endi alohida birikma emas: n va g harflari yoziladi.",law:"Qonun 2026-yil 21-oktabrda imzolangan va rasmiy e’lon qilinganidan 6 oy o‘tgach kuchga kiradi. Eski alifbodagi hujjatlar o‘z kuchini saqlaydi.",note:"Bu tarjima emas, imlo o‘tkazgichi: qo‘shimcha imlo qoidalarini rasmiy qonun matni bilan solishtiring.",old:"Eski",neu:"Yangi",exT:"O‘zbekiston Respublikasi Vazirlar Mahkamasining qaroriga muvofiq, barcha tashkilotlar o‘z hujjatlarini yangi o‘zbek alifbosiga o‘tkazishi shart."},
ru:{tile:"Новый алфавит",tileS:"Ö Ğ Ş Ç — конвертер текста",title:"Новый узбекский алфавит",inp:"Введите или вставьте текст (кириллица или латиница)",out:"Результат",toNew:"В новый алфавит",toOld:"В старую латиницу",copy:"Копировать",copied:"Скопировано ✓",clear:"Очистить",ex:"Пример",keys:"Вставить букву",rules:"Правила",r1:"Основные изменения",r2:"Новый алфавит состоит из 28 букв и знака тутуқ вместо прежних 26 букв и 3 буквосочетаний.",ng:"«ng» больше не отдельное сочетание: пишутся буквы n и g.",law:"Закон подписан 21 октября 2026 года и вступает в силу через 6 месяцев после официального опубликования. Документы на старом алфавите сохраняют силу.",note:"Это конвертер правописания, не перевод: дополнительные правила сверяйте с официальным текстом закона.",old:"Старый",neu:"Новый",exT:"O‘zbekiston Respublikasi Vazirlar Mahkamasining qaroriga muvofiq, barcha tashkilotlar o‘z hujjatlarini yangi o‘zbek alifbosiga o‘tkazishi shart."}};
function p(k){return LANG==="ru"?UI.ru[k]:tr(UI.uz[k])}
function $(id){return (sec&&sec.querySelector("#"+id))||document.getElementById(id)}
var mode="new",txt="";
try{mode=localStorage.getItem("ya_m")||"new";txt=localStorage.getItem("ya_t")||""}catch(e){}
var css=document.createElement("style");
css.textContent=".ya-out,.ya-out *{-webkit-user-select:text!important;user-select:text!important;-webkit-touch-callout:default}.ya-ch{display:flex;gap:6px;background:var(--line);padding:4px;border-radius:14px;margin:10px 0}.ya-ch button{flex:1;padding:10px 6px;border-radius:11px;border:0;background:transparent;color:var(--mut);font-weight:700;font-size:14px;font-family:inherit}.ya-ch button.on{background:var(--acc);color:#fff}.ya-ta{width:100%;min-height:120px;padding:12px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;font-family:inherit;resize:vertical}.ya-out{min-height:60px;padding:12px;border-radius:12px;background:var(--accbg);color:var(--text);font-size:16px;line-height:1.45;white-space:pre-wrap;word-break:break-word;margin-top:8px}.ya-keys{display:flex;gap:8px;margin:8px 0}.ya-keys button{flex:1;padding:12px 0;border:0;border-radius:12px;background:#fbbf24;color:#1f2937;font-weight:800;font-size:22px;font-family:inherit}.ya-row{display:flex;gap:8px;margin-top:10px}.ya-row button{flex:1;padding:12px;border:0;border-radius:12px;font-weight:800;font-size:15px;font-family:inherit;background:var(--acc);color:#fff}.ya-row button.s{background:var(--accbg);color:var(--acc)}.ya-tb{width:100%;border-collapse:collapse;margin-top:6px}.ya-tb td,.ya-tb th{padding:8px 6px;border-bottom:1px solid var(--line);font-size:15px;text-align:left}.ya-tb th{font-size:12px;color:var(--mut)}.ya-lb{font-size:12px;color:var(--mut);margin:12px 0 4px;font-weight:700}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="yalifbo";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#f59e0b,#ef4444)";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">Ö</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}
function conv(s){return mode==="old"?toOld(s):toNew(s)}
function draw(){
  var rows=[["o‘","ö"],["g‘","ğ"],["sh","ş"],["ch","ç"]].map(function(r){return "<tr><td>"+r[0]+"</td><td><b>"+r[1]+"</b></td></tr>"}).join("");
  sec.innerHTML='<button class="back" id="yb">← '+T[LANG].back+'</button><div class="card"><h2>'+p("title")+'</h2>'+
   '<div class="ya-ch"><button data-m="new" class="'+(mode==="new"?"on":"")+'">'+p("toNew")+'</button><button data-m="old" class="'+(mode==="old"?"on":"")+'">'+p("toOld")+'</button></div>'+
   '<textarea class="ya-ta" id="yt" placeholder="'+p("inp")+'"></textarea>'+
   '<div class="ya-lb">'+p("keys")+'</div><div class="ya-keys"><button data-k="ö">ö</button><button data-k="ğ">ğ</button><button data-k="ş">ş</button><button data-k="ç">ç</button></div>'+
   '<div class="ya-lb">'+p("out")+'</div><div class="ya-out" id="yo"></div>'+
   '<div class="ya-row"><button id="yc">'+p("copy")+'</button><button class="s" id="ye">'+p("ex")+'</button><button class="s" id="yx">'+p("clear")+'</button></div><div class="ya-row"><button class="s" id="ys">'+tr(LANG==="ru"?"Отправить в Telegram":"Telegramga yuborish")+'</button></div><div class="sub" id="yh" style="margin:8px 0 0;display:none"></div></div>'+
   '<div class="card"><h2>'+p("rules")+'</h2><div class="sub" style="margin:0">'+p("r2")+'</div><table class="ya-tb"><tr><th>'+p("old")+'</th><th>'+p("neu")+'</th></tr>'+rows+'</table><div class="sub" style="margin:10px 0 0">'+p("ng")+'</div><div class="sub" style="margin:10px 0 0">'+p("law")+'</div><div class="sub" style="margin:10px 0 0">'+p("note")+'</div></div>';
  var t=$("yt");t.value=txt;
  function upd(){txt=t.value;try{localStorage.setItem("ya_t",txt)}catch(e){}$("yo").textContent=conv(txt)}
  t.addEventListener("input",upd);upd();
  $("yb").addEventListener("click",function(){show("home")});
  var ms=sec.querySelectorAll("[data-m]");for(var i=0;i<ms.length;i++)ms[i].addEventListener("click",function(){mode=this.getAttribute("data-m");try{localStorage.setItem("ya_m",mode)}catch(e){}var v=$("yt").value;txt=v;draw()});
  var ks=sec.querySelectorAll("[data-k]");for(i=0;i<ks.length;i++)ks[i].addEventListener("click",function(){var ch=this.getAttribute("data-k"),s=t.selectionStart||0,e=t.selectionEnd||0;t.value=t.value.slice(0,s)+ch+t.value.slice(e);t.selectionStart=t.selectionEnd=s+1;upd();t.focus()});
  $("yx").addEventListener("click",function(){t.value="";upd()});
  $("ye").addEventListener("click",function(){t.value=UI.uz.exT;upd()});
  function hint(){var h=$("yh");h.style.display="block";h.textContent=LANG==="ru"?"Если не вставляется: зажмите выделенный текст и выберите «Копировать», либо нажмите «Отправить в Telegram».":tr("Agar qo‘yilmasa: belgilangan matnni bosib ushlang va “Nusxalash”ni tanlang, yoki “Telegramga yuborish” tugmasini bosing.")}
  function selOut(){try{var r=document.createRange();r.selectNodeContents($("yo"));var sl=window.getSelection();sl.removeAllRanges();sl.addRange(r)}catch(e){}}
  $("ys").addEventListener("click",function(){
    var v=$("yo").textContent;if(!v)return;
    var u="https://t.me/share/url?url=%20&text="+encodeURIComponent(v);
    try{Telegram.WebApp.openTelegramLink(u)}catch(e){window.open(u,"_blank")}
  });
  $("yc").addEventListener("click",function(){
    var v=$("yo").textContent,b=this;if(!v)return;
    selOut();hint();
    b.textContent=LANG==="ru"?"Выделено ✓":tr("Belgilandi ✓");
    setTimeout(function(){b.textContent=p("copy")},2200);
    try{var a=document.createElement("textarea");a.value=v;a.setAttribute("readonly","");
      a.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;font-size:16px";
      document.body.appendChild(a);a.focus();a.select();a.setSelectionRange(0,v.length);
      document.execCommand("copy");document.body.removeChild(a);selOut()}catch(e){}
    try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(v).catch(function(){})}catch(e){}
  });
}
tile.addEventListener("click",function(){draw();show("yalifbo");window.scrollTo(0,0)});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();if(sec.classList.contains("on"))draw()})}
window.YA={toNew:toNew,toOld:toOld};
updTile();
})();
