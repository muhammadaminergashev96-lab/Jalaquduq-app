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
var UI={
uz:{tile:"Shriftlar",tileS:"Chiroyli ism yozish",title:"Chiroyli shriftlar",ph:"Ismingizni yozing…",hint:"Matnni yozing, yoqqan shriftni bosing — nusxalanadi.",copied:"Nusxalandi ✓",
 g1:"Chiroyli shriftlar",g2:"Belgilar bilan bezatilgan",g3:"Chiziqli va maxsus",cyr:"Kirill harflar ko‘p shriftlarda chiqmaydi. Lotinga o‘tkazildi.",cyrOff:"Asl yozuvni qoldirish",cyrOn:"Lotinga o‘tkazish",clear:"Tozalash",copy:"Nusxa",
 note:"Nusxalab Telegram, Instagram, o‘yin nomi yoki profilingizga qo‘yishingiz mumkin. Ba’zi ilovalar ayrim belgilarni ko‘rsatmasligi mumkin.",none:"Yuqoriga matn yozing",
 names:{bold:"Qalin",italic:"Qiyshiq",bi:"Qalin qiyshiq",script:"Yozma",bscript:"Qalin yozma",fraktur:"Gotik",bfraktur:"Qalin gotik",double:"Ikki chiziqli",sans:"Sodda",sansb:"Sodda qalin",sansi:"Sodda qiyshiq",sansbi:"Sodda qalin qiyshiq",mono:"Yozuv mashinkasi",circle:"Doira ichida",ncircle:"To‘ldirilgan doira",square:"Kvadrat ichida",nsquare:"To‘ldirilgan kvadrat",full:"Keng",small:"Kichik bosh harf",upside:"Teskari",strike:"Ustidan chizilgan",under:"Tagidan chizilgan",dunder:"Ikki chiziq tagida",slash:"Qiyshiq chiziq",over:"Tepasidan chiziq",dots:"Nuqtali"}},
ru:{tile:"Шрифты",tileS:"Красивое имя",title:"Красивые шрифты",ph:"Введите имя…",hint:"Введите текст и нажмите на понравившийся шрифт — он скопируется.",copied:"Скопировано ✓",
 g1:"Красивые шрифты",g2:"С украшениями",g3:"Линии и особые",cyr:"Кириллица не поддерживается во многих шрифтах. Переведено на латиницу.",cyrOff:"Оставить как есть",cyrOn:"На латиницу",clear:"Очистить",copy:"Копия",
 note:"Скопируйте и вставьте в Telegram, Instagram, ник в игре или профиль. Некоторые приложения могут не показать отдельные символы.",none:"Введите текст выше",
 names:{bold:"Жирный",italic:"Курсив",bi:"Жирный курсив",script:"Рукописный",bscript:"Жирный рукописный",fraktur:"Готический",bfraktur:"Жирный готический",double:"Двойной",sans:"Простой",sansb:"Простой жирный",sansi:"Простой курсив",sansbi:"Простой жирный курсив",mono:"Печатная машинка",circle:"В кружках",ncircle:"Тёмные кружки",square:"В квадратах",nsquare:"Тёмные квадраты",full:"Широкий",small:"Малые капитель",upside:"Перевёрнутый",strike:"Зачёркнутый",under:"Подчёркнутый",dunder:"Двойное подчёркивание",slash:"Косая черта",over:"Надчёркнутый",dots:"С точками"}}
};
var CL={"а":"a","б":"b","в":"v","г":"g","д":"d","ё":"yo","ж":"j","з":"z","и":"i","й":"y","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"x","ц":"ts","ч":"ch","ш":"sh","щ":"shch","ъ":"’","ы":"i","ь":"","э":"e","ю":"yu","я":"ya","ў":"oʻ","қ":"q","ғ":"gʻ","ҳ":"h","ҷ":"j"};
function lat(s){
  var o="",i,ch,lo,r,pv;
  for(i=0;i<s.length;i++){
    ch=s.charAt(i);lo=ch.toLowerCase();
    if(lo==="е"){pv=i>0?s.charAt(i-1).toLowerCase():" ";r=(!/[a-zа-яёўқғҳ]/i.test(pv)||"аеёиоуэюяўы".indexOf(pv)>=0)?"ye":"e"}
    else if(CL.hasOwnProperty(lo))r=CL[lo];
    else{o+=ch;continue}
    if(ch!==lo&&r){var nx=s.charAt(i+1);r=(nx&&nx===nx.toUpperCase()&&nx!==nx.toLowerCase()&&r.length>1)?r.toUpperCase():r.charAt(0).toUpperCase()+r.slice(1)}
    o+=r;
  }
  return o;
}
function L(){return LANG==="ru"?UI.ru:UI.uz}
function c1(s){return LANG==="oz"?cyr(s):s}
function p(k){return c1(L()[k])}
function nm(k){return c1(L().names[k])}
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function hap(){try{var h=window.Telegram&&Telegram.WebApp&&Telegram.WebApp.HapticFeedback;if(h)h.impactOccurred("light")}catch(e){}}

function cp(n){return String.fromCodePoint(n)}
function mk(up,lo,dg,exU,exL){
  exU=exU||{};exL=exL||{};
  return function(c){
    var n=c.charCodeAt(0);
    if(n>=65&&n<=90)return exU[c]||cp(up+n-65);
    if(n>=97&&n<=122)return exL[c]||(lo?cp(lo+n-97):c);
    if(n>=48&&n<=57&&dg)return cp(dg+n-48);
    return c;
  };
}
function mapStr(s,f){return Array.from(s).map(f).join("")}
var UPS={a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ƃ",h:"ɥ",i:"ᴉ",j:"ɾ",k:"ʞ",l:"l",m:"ɯ",n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z","1":"Ɩ","2":"ᄅ","3":"Ɛ","4":"ㄣ","5":"ϛ","6":"9","7":"ㄥ","8":"8","9":"6","0":"0","?":"¿","!":"¡",".":"˙",",":"ʻ"};
var SMALL={a:"ᴀ",b:"ʙ",c:"ᴄ",d:"ᴅ",e:"ᴇ",f:"ꜰ",g:"ɢ",h:"ʜ",i:"ɪ",j:"ᴊ",k:"ᴋ",l:"ʟ",m:"ᴍ",n:"ɴ",o:"ᴏ",p:"ᴘ",q:"ǫ",r:"ʀ",s:"ꜱ",t:"ᴛ",u:"ᴜ",v:"ᴠ",w:"ᴡ",x:"x",y:"ʏ",z:"ᴢ"};
var CIR=["⓪","①","②","③","④","⑤","⑥","⑦","⑧","⑨"];
function comb(m){return function(s){return Array.from(s).map(function(c){return /\s/.test(c)?c:c+m}).join("")}}
var STY={
 bold:mk(0x1D400,0x1D41A,0x1D7CE),
 italic:mk(0x1D434,0x1D44E,0,{}, {h:"ℎ"}),
 bi:mk(0x1D468,0x1D482,0x1D7CE),
 script:mk(0x1D49C,0x1D4B6,0,{B:"ℬ",E:"ℰ",F:"ℱ",H:"ℋ",I:"ℐ",L:"ℒ",M:"ℳ",R:"ℛ"},{e:"ℯ",g:"ℊ",o:"ℴ"}),
 bscript:mk(0x1D4D0,0x1D4EA,0x1D7CE),
 fraktur:mk(0x1D504,0x1D51E,0,{C:"ℭ",H:"ℌ",I:"ℑ",R:"ℜ",Z:"ℨ"}),
 bfraktur:mk(0x1D56C,0x1D586,0x1D7CE),
 double:mk(0x1D538,0x1D552,0x1D7D8,{C:"ℂ",H:"ℍ",N:"ℕ",P:"ℙ",Q:"ℚ",R:"ℝ",Z:"ℤ"}),
 sans:mk(0x1D5A0,0x1D5BA,0x1D7E2),
 sansb:mk(0x1D5D4,0x1D5EE,0x1D7EC),
 sansi:mk(0x1D608,0x1D622,0x1D7E2),
 sansbi:mk(0x1D63C,0x1D656,0x1D7EC),
 mono:mk(0x1D670,0x1D68A,0x1D7F6),
 circle:function(c){var n=c.charCodeAt(0);if(n>=65&&n<=90)return cp(0x24B6+n-65);if(n>=97&&n<=122)return cp(0x24D0+n-97);if(n>=48&&n<=57)return CIR[n-48];return c},
 ncircle:function(c){var n=c.toUpperCase().charCodeAt(0);if(n>=65&&n<=90&&c.length===1)return cp(0x1F150+n-65);return c},
 square:function(c){var n=c.toUpperCase().charCodeAt(0);if(n>=65&&n<=90&&c.length===1)return cp(0x1F130+n-65);return c},
 nsquare:function(c){var n=c.toUpperCase().charCodeAt(0);if(n>=65&&n<=90&&c.length===1)return cp(0x1F170+n-65);return c},
 full:function(c){var n=c.charCodeAt(0);if(n>=33&&n<=126)return cp(0xFF01+n-33);if(c===" ")return "　";return c},
 small:function(c){return SMALL[c.toLowerCase()]||c},
 upside:function(c){return UPS[c.toLowerCase()]||c}
};
function applyStyle(k,s){
  if(k==="upside")return Array.from(mapStr(s,STY.upside)).reverse().join("");
  if(k==="strike")return comb("̶")(s);
  if(k==="under")return comb("̲")(s);
  if(k==="dunder")return comb("̳")(s);
  if(k==="slash")return comb("̸")(s);
  if(k==="over")return comb("̅")(s);
  if(k==="dots")return comb("̣")(s);
  return mapStr(s,STY[k]);
}
var G1=["bold","italic","bi","script","bscript","fraktur","bfraktur","double","sans","sansb","sansi","sansbi","mono","small","full","circle","ncircle","square","nsquare","upside"];
var G3=["strike","under","dunder","slash","over","dots"];
var DEC=[["★ "," ★"],["✦ "," ✦"],["꧁ "," ꧂"],["『","』"],["【","】"],["☪ "," ☪"],["❤ "," ❤"],["⚡ "," ⚡"],["♛ "," ♛"],["★彡 "," 彡★"],["•°•","•°•"],["░▒▓ "," ▓▒░"],["✿ "," ✿"],["☆ "," ☆"],["《 "," 》"],["▁▂▃ "," ▃▂▁"],["— ✧ "," ✧ —"],["❝ "," ❞"]];
var ST={t:"",cyr:true};
try{ST.t=localStorage.getItem("sh_t")||""}catch(e){}
function base(){
  var t=ST.t.trim();
  if(/[Ѐ-ӿ]/.test(t)&&ST.cyr)t=lat(t);
  return t;
}
var css=document.createElement("style");
css.textContent=".sh-in{width:100%;box-sizing:border-box;padding:15px 44px 15px 15px;border-radius:16px;border:1.5px solid var(--line);background:var(--card);color:var(--text);font-size:18px;font-family:inherit;outline:none}.sh-in:focus{border-color:var(--acc)}.sh-w{position:relative;margin-bottom:6px}.sh-x{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:36px;height:36px;border:0;background:none;color:var(--mut);font-size:20px;font-family:inherit}.sh-h{font-size:13px;color:var(--mut);margin:4px 2px 14px;line-height:1.4}.sh-gh{font-size:12px;font-weight:800;letter-spacing:.05em;color:var(--mut);text-transform:uppercase;margin:16px 2px 8px}.sh-c{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:12px 14px;margin-bottom:8px;color:var(--text);font-family:inherit}.sh-c .tx{flex:1;min-width:0}.sh-c .v{display:block;font-size:20px;line-height:1.35;overflow-wrap:anywhere}.sh-c .n{display:block;font-size:11px;color:var(--mut);margin-top:2px}.sh-c .cb{flex:none;padding:7px 11px;border-radius:10px;background:var(--accbg);color:var(--acc);font-size:12px;font-weight:700}.sh-w2{background:var(--accbg);color:var(--acc);padding:10px 12px;border-radius:12px;font-size:13px;margin:8px 0;display:flex;justify-content:space-between;align-items:center;gap:8px}.sh-w2 button{flex:none;border:0;background:var(--acc);color:#fff;border-radius:10px;padding:6px 10px;font-size:12px;font-weight:700;font-family:inherit}.sh-t{position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:rgba(20,30,40,.92);color:#fff;padding:10px 18px;border-radius:20px;font-size:14px;font-weight:700;z-index:99999;opacity:0;transition:opacity .2s;pointer-events:none}.sh-t.on{opacity:1}.sh-nt{font-size:12px;color:var(--mut);text-align:center;margin:12px 6px 24px;line-height:1.45}.sh-e{text-align:center;color:var(--mut);padding:28px 10px;font-size:14px}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="shrift";document.body.appendChild(sec);
var toast=document.createElement("div");toast.className="sh-t";document.body.appendChild(toast);
var tt=null;
function say(m){toast.textContent=m;toast.className="sh-t on";clearTimeout(tt);tt=setTimeout(function(){toast.className="sh-t"},1400)}
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#be185d,#f59e0b)";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🔤</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}
function copy(txt){
  function ok(){hap();say(p("copied"))}
  function fb(){var ta=document.createElement("textarea");ta.value=txt;ta.style.cssText="position:fixed;opacity:0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");ok()}catch(e){}document.body.removeChild(ta)}
  try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(ok,fb);return}}catch(e){}
  fb();
}
var items=[];
function card(txt,label){var i=items.length;items.push(txt);return '<button class="sh-c" data-i="'+i+'"><span class="tx"><span class="v">'+esc(txt)+'</span><span class="n">'+esc(label)+'</span></span><span class="cb">'+p("copy")+'</span></button>'}
function list(){
  items=[];var b=base(),h="";
  var hasC=/[Ѐ-ӿ]/.test(ST.t);
  if(hasC)h+='<div class="sh-w2"><span>'+(ST.cyr?p("cyr"):"")+'</span><button id="shcy">'+(ST.cyr?p("cyrOff"):p("cyrOn"))+'</button></div>';
  var s=b||(LANG==="ru"?"Имя":"Ismingiz");
  if(!b)h+='';
  h+='<div class="sh-gh">'+p("g1")+'</div>'+G1.map(function(k){return card(applyStyle(k,s),nm(k))}).join("");
  var bs=applyStyle("bscript",s);
  h+='<div class="sh-gh">'+p("g2")+'</div>'+DEC.map(function(d){return card(d[0]+bs+d[1],d[0].trim()+" … "+d[1].trim())}).join("");
  h+='<div class="sh-gh">'+p("g3")+'</div>'+G3.map(function(k){return card(applyStyle(k,s),nm(k))}).join("");
  return h;
}
function draw(){
  var T0=(typeof T!=="undefined"&&T[LANG])||{back:"Orqaga"};
  var h='<button class="back" id="shb">← '+T0.back+'</button><div style="font-size:22px;font-weight:800;margin:4px 2px 12px">'+p("title")+'</div>';
  h+='<div class="sh-w"><input class="sh-in" id="shi" maxlength="40" autocomplete="off" placeholder="'+esc(p("ph"))+'" value="'+esc(ST.t)+'">'+(ST.t?'<button class="sh-x" id="shx" aria-label="'+esc(p("clear"))+'">✕</button>':'')+'</div><div class="sh-h">'+p("hint")+'</div><div id="shl">'+list()+'</div><div class="sh-nt">'+p("note")+'</div>';
  sec.innerHTML=h;
  $("shb").onclick=function(){show("home")};
  var inp=$("shi");
  inp.addEventListener("input",function(){ST.t=inp.value;try{localStorage.setItem("sh_t",ST.t)}catch(e){}refresh();var x=$("shx");if(!x&&ST.t)draw2()});
  var x=$("shx");if(x)x.onclick=function(){ST.t="";try{localStorage.setItem("sh_t","")}catch(e){}draw();var n=$("shi");if(n)n.focus()};
  bindList();
}
function draw2(){var pos=ST.t.length;draw();var n=$("shi");if(n){n.focus();try{n.setSelectionRange(pos,pos)}catch(e){}}}
function refresh(){var l=$("shl");if(l){l.innerHTML=list();bindList()}}
function bindList(){
  Array.prototype.forEach.call(sec.querySelectorAll(".sh-c"),function(b){b.onclick=function(){copy(items[+b.getAttribute("data-i")])}});
  var c=$("shcy");if(c)c.onclick=function(){ST.cyr=!ST.cyr;refresh()};
}
tile.addEventListener("click",function(){draw();show("shrift")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){setTimeout(function(){updTile();if(sec.classList.contains("on"))draw()},0)})}
updTile();
})();
