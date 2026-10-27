(function(){
/* QR encoder (byte mode, L/M) */
var QR=(function(){
var ECPB={L:[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],M:[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28]};
var NB={L:[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],M:[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49]};
var FB={L:1,M:0};
function raw(v){var r=(16*v+128)*v+64;if(v>=2){var a=Math.floor(v/7)+2;r-=(25*a-10)*a-55;if(v>=7)r-=36}return r}
function dataCw(v,e){return Math.floor(raw(v)/8)-ECPB[e][v]*NB[e][v]}
function utf8(s){var o=[],b=unescape(encodeURIComponent(s));for(var i=0;i<b.length;i++)o.push(b.charCodeAt(i));return o}
function mul(x,y){var z=0;for(var i=7;i>=0;i--){z=(z<<1)^((z>>>7)*0x11D);z^=((y>>>i)&1)*x}return z&255}
function rsDiv(deg){var r=[];for(var i=0;i<deg-1;i++)r.push(0);r.push(1);var root=1;for(i=0;i<deg;i++){for(var j=0;j<r.length;j++){r[j]=mul(r[j],root);if(j+1<r.length)r[j]^=r[j+1]}root=mul(root,2)}return r}
function rsRem(data,div){var r=div.map(function(){return 0});data.forEach(function(b){var f=b^r.shift();r.push(0);div.forEach(function(c,i){r[i]^=mul(c,f)})});return r}
function encode(text){
  var data=utf8(text),ecl,ver;
  var found=false;
  ["M","L"].forEach(function(e){if(found)return;for(var v=1;v<=40;v++){var cap=dataCw(v,e)*8,need=4+(v<10?8:16)+data.length*8;if(need<=cap){ecl=e;ver=v;found=true;return}}});
  if(!found)return null;
  var bits=[];function put(val,n){for(var i=n-1;i>=0;i--)bits.push((val>>>i)&1)}
  put(4,4);put(data.length,ver<10?8:16);data.forEach(function(b){put(b,8)});
  var cap=dataCw(ver,ecl)*8;
  put(0,Math.min(4,cap-bits.length));put(0,(8-bits.length%8)%8);
  for(var pad=0xEC;bits.length<cap;pad^=0xEC^0x11)put(pad,8);
  var cw=[];for(var i=0;i<bits.length;i+=8){var x=0;for(var j=0;j<8;j++)x=x*2+bits[i+j];cw.push(x)}
  var nb=NB[ecl][ver],ec=ECPB[ecl][ver],rawCw=Math.floor(raw(ver)/8),ns=nb-rawCw%nb,sl=Math.floor(rawCw/nb),div=rsDiv(ec),blocks=[],k=0;
  for(i=0;i<nb;i++){var dl=sl-ec+(i<ns?0:1),d=cw.slice(k,k+dl);k+=dl;var e2=rsRem(d,div);if(i<ns)d.push(0);blocks.push(d.concat(e2))}
  var all=[];for(i=0;i<blocks[0].length;i++)blocks.forEach(function(b,j){if(i!==sl-ec||j>=ns)all.push(b[i])});
  var size=ver*4+17,m=[],f=[];for(i=0;i<size;i++){m.push(new Array(size).fill(false));f.push(new Array(size).fill(false))}
  function setF(x,y,d){m[y][x]=d;f[y][x]=true}
  for(i=0;i<size;i++){setF(6,i,i%2===0);setF(i,6,i%2===0)}
  function finder(cx,cy){for(var dy=-4;dy<=4;dy++)for(var dx=-4;dx<=4;dx++){var d=Math.max(Math.abs(dx),Math.abs(dy)),x=cx+dx,y=cy+dy;if(x>=0&&x<size&&y>=0&&y<size)setF(x,y,d!==2&&d!==4)}}
  finder(3,3);finder(size-4,3);finder(3,size-4);
  var ap=[];if(ver>1){var na=Math.floor(ver/7)+2,st=ver===32?26:Math.ceil((ver*4+4)/(na*2-2))*2;ap=[6];for(var pos=size-7;ap.length<na;pos-=st)ap.splice(1,0,pos)}
  ap.forEach(function(cy,a){ap.forEach(function(cx,b){if((a===0&&b===0)||(a===0&&b===ap.length-1)||(a===ap.length-1&&b===0))return;for(var dy=-2;dy<=2;dy++)for(var dx=-2;dx<=2;dx++)setF(cx+dx,cy+dy,Math.max(Math.abs(dx),Math.abs(dy))!==1)})});
  function fmt(mask){var d=FB[ecl]<<3|mask,r=d;for(var i=0;i<10;i++)r=(r<<1)^((r>>>9)*0x537);var bits=(d<<10|r)^0x5412;
    function g(i){return((bits>>>i)&1)!==0}
    for(i=0;i<=5;i++)setF(8,i,g(i));setF(8,7,g(6));setF(8,8,g(7));setF(7,8,g(8));for(i=9;i<15;i++)setF(14-i,8,g(i));
    for(i=0;i<8;i++)setF(size-1-i,8,g(i));for(i=8;i<15;i++)setF(8,size-15+i,g(i));setF(8,size-8,true)}
  fmt(0);
  if(ver>=7){var r=ver;for(i=0;i<12;i++)r=(r<<1)^((r>>>11)*0x1F25);var vb=ver<<12|r;for(i=0;i<18;i++){var bt=((vb>>>i)&1)!==0,a=size-11+i%3,b=Math.floor(i/3);setF(a,b,bt);setF(b,a,bt)}}
  var idx=0;
  for(var right=size-1;right>=1;right-=2){if(right===6)right=5;for(var vert=0;vert<size;vert++)for(j=0;j<2;j++){var x=right-j,up=((right+1)&2)===0,y=up?size-1-vert:vert;if(!f[y][x]&&idx<all.length*8){m[y][x]=((all[idx>>>3]>>>(7-(idx&7)))&1)!==0;idx++}}}
  var fm=f.map(function(r){return r.slice()});
  function apply(mask){for(var y=0;y<size;y++)for(var x=0;x<size;x++){var inv;switch(mask){case 0:inv=(x+y)%2===0;break;case 1:inv=y%2===0;break;case 2:inv=x%3===0;break;case 3:inv=(x+y)%3===0;break;case 4:inv=(Math.floor(x/3)+Math.floor(y/2))%2===0;break;case 5:inv=x*y%2+x*y%3===0;break;case 6:inv=(x*y%2+x*y%3)%2===0;break;default:inv=((x+y)%2+x*y%3)%2===0}if(!fm[y][x]&&inv)m[y][x]=!m[y][x]}}
  function pen(){var p=0,y,x,run,c,dark=0;for(y=0;y<size;y++){run=1;for(x=1;x<size;x++){if(m[y][x]===m[y][x-1]){run++;if(run===5)p+=3;else if(run>5)p++}else run=1}}
    for(x=0;x<size;x++){run=1;for(y=1;y<size;y++){if(m[y][x]===m[y-1][x]){run++;if(run===5)p+=3;else if(run>5)p++}else run=1}}
    for(y=0;y<size-1;y++)for(x=0;x<size-1;x++){c=m[y][x];if(c===m[y][x+1]&&c===m[y+1][x]&&c===m[y+1][x+1])p+=3}
    for(y=0;y<size;y++)for(x=0;x<size;x++)if(m[y][x])dark++;
    p+=Math.floor(Math.abs(dark*20-size*size*10)/(size*size))*10;return p}
  var best=0,bp=1e9;for(var mk=0;mk<8;mk++){apply(mk);fmt(mk);var pp=pen();if(pp<bp){bp=pp;best=mk}apply(mk)}
  apply(best);fmt(best);
  return{size:size,m:m,ver:ver,ecl:ecl};
}
return{encode:encode};
})();


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
var AIW="https://rasm-ai.muhammadaminergashev96.workers.dev";
var UI={
uz:{tile:"Rasm vositalari",tileS:"Hujjat rasmi, QR, AI",tools:"Vositalar",
 doc:"Hujjat rasmi",docS:"3×4, 3.5×4.5, 4×6 · fon · A4 varaq",shr:"Hajmini kichraytirish",shrS:"Kerakli KB gacha",frm:"Ramka va yozuv",frmS:"Rasmni bezash",qr:"QR-kod",qrS:"Havola yoki matn",bg:"Fonni olib tashlash",bgS:"AI · shaffof fon",enh:"Sifatni oshirish",enhS:"AI · aniqroq va katta",
 pick:"Rasm tanlash",change:"Boshqa rasm tanlash",dl:"Yuklab olish",make:"Tayyorlash",wait:"Ishlanmoqda…",err:"Xato: ",aiTg:"AI vositalari faqat Telegram ichida ishlaydi.",aiNote:"AI ishlashi 10–40 soniya olishi mumkin. Kuniga cheklangan marta ishlatish mumkin.",
 size:"Rasm o‘lchami",bgc:"Fon",bg0:"Asl",bgW:"Oq",bgB:"Ko‘k",bgG:"Kulrang",bgT:"Shaffof",zoom:"Kattalashtirish",sheet:"Chop etish varag‘i",sh1:"Bitta rasm",sh10:"10×15 sm",shA4:"A4",
 docHint:"Yuzni ramkaga to‘g‘ri joylashtiring: rasmni barmoq bilan suring, slayder bilan kattalashtiring. Fonni almashtirish uchun “Oq” yoki “Ko‘k”ni tanlang (AI ishlaydi).",
 fits:"Varaqqa sig‘di: ",pcs:" dona",aiBg:"AI fonni olib tashlamoqda…",
 target:"Maqsadli hajm",maxs:"Eng katta tomon",orig:"Asl",before:"Oldin: ",after:"Keyin: ",tooBig:"Bu hajmga yetib bo‘lmadi, eng yaxshi natija berildi.",px:" px",
 style:"Ramka turi",st0:"Ramkasiz",stW:"Oq",stK:"Qora",stG:"Oltin",stP:"Polaroid",stR:"Yumaloq",text:"Yozuv (ixtiyoriy)",textPh:"Masalan: Yodgorlik 2026",pos:"Joyi",pB:"Pastda",pT:"Tepada",col:"Yozuv rangi",cW:"Oq",cK:"Qora",cG:"Oltin",date:"Bugungi sana",
 qtext:"Matn yoki havola",qph:"https://t.me/jalaquduq_ovozi",qcol:"Rang",qk:"Qora",qg:"Yashil",qb:"Ko‘k",qlong:"Matn juda uzun",qhint:"Matn yozing — QR-kod shu zahoti chiqadi.",
 enhScale:"Kattalashtirish",face:"Yuzni tiklash",faceOn:"Yoqilgan",faceOff:"O‘chiq",shOrig:"Asl",shRes:"Natija",enhHint:"Xira yoki kichik rasmni aniqroq va kattaroq qiladi. Yuz bor rasmlar uchun “Yuzni tiklash”ni yoqing.",
 bgHint:"Rasmning orqa fonini AI yordamida olib tashlaydi. Natijani shaffof (PNG) yoki rangli fon bilan saqlashingiz mumkin.",
 hold:"Rasmni bosib turing va “Rasmni saqlash”ni tanlang",close:"Yopish",saved:"Yuklab olish oynasida “Yuklab olish”ni bosing",run:"Boshlash"},
ru:{tile:"Инструменты для фото",tileS:"Фото на документы, QR, ИИ",tools:"Инструменты",
 doc:"Фото на документы",docS:"3×4, 3.5×4.5, 4×6 · фон · лист A4",shr:"Уменьшить размер",shrS:"До нужных КБ",frm:"Рамка и надпись",frmS:"Оформить фото",qr:"QR-код",qrS:"Ссылка или текст",bg:"Убрать фон",bgS:"ИИ · прозрачный фон",enh:"Улучшить качество",enhS:"ИИ · чётче и больше",
 pick:"Выбрать фото",change:"Выбрать другое фото",dl:"Скачать",make:"Создать",wait:"Обработка…",err:"Ошибка: ",aiTg:"ИИ-инструменты работают только внутри Telegram.",aiNote:"ИИ может работать 10–40 секунд. Количество запусков в день ограничено.",
 size:"Размер фото",bgc:"Фон",bg0:"Исходный",bgW:"Белый",bgB:"Синий",bgG:"Серый",bgT:"Прозрачный",zoom:"Масштаб",sheet:"Лист для печати",sh1:"Одно фото",sh10:"10×15 см",shA4:"A4",
 docHint:"Поместите лицо в рамку: двигайте фото пальцем, масштаб — ползунком. Чтобы заменить фон, выберите «Белый» или «Синий» (работает ИИ).",
 fits:"На листе помещается: ",pcs:" шт.",aiBg:"ИИ убирает фон…",
 target:"Нужный размер",maxs:"Большая сторона",orig:"Исходная",before:"Было: ",after:"Стало: ",tooBig:"Не удалось дойти до этого размера, дан лучший результат.",px:" px",
 style:"Тип рамки",st0:"Без рамки",stW:"Белая",stK:"Чёрная",stG:"Золотая",stP:"Полароид",stR:"Скруглённая",text:"Надпись (необязательно)",textPh:"Например: Отпуск 2026",pos:"Положение",pB:"Снизу",pT:"Сверху",col:"Цвет надписи",cW:"Белый",cK:"Чёрный",cG:"Золотой",date:"Сегодняшняя дата",
 qtext:"Текст или ссылка",qph:"https://t.me/jalaquduq_ovozi",qcol:"Цвет",qk:"Чёрный",qg:"Зелёный",qb:"Синий",qlong:"Текст слишком длинный",qhint:"Введите текст — QR-код появится сразу.",
 enhScale:"Увеличение",face:"Восстановление лиц",faceOn:"Вкл.",faceOff:"Выкл.",shOrig:"Исходное",shRes:"Результат",enhHint:"Делает размытое или маленькое фото чётче и крупнее. Если на фото лицо, включите «Восстановление лиц».",
 bgHint:"Убирает фон фото с помощью ИИ. Результат можно сохранить прозрачным (PNG) или с цветным фоном.",
 hold:"Нажмите на фото и удерживайте, затем выберите «Сохранить»",close:"Закрыть",saved:"В окне загрузки нажмите «Скачать»",run:"Начать"}
};
function p(k){var v=(LANG==="ru"?UI.ru:UI.uz)[k];if(v===undefined)v=UI.uz[k];return LANG==="oz"?cyr(v):v}
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function inTg(){try{return !!(window.Telegram&&Telegram.WebApp&&Telegram.WebApp.initData)}catch(e){return false}}
function kb(n){return n>=1048576?(n/1048576).toFixed(2)+" MB":Math.max(1,Math.round(n/1024))+" KB"}

var css=document.createElement("style");
css.textContent=".rv-l{font-size:13px;color:var(--mut);margin:14px 0 6px;font-weight:700}.rv-ch{display:flex;flex-wrap:wrap;gap:6px}.rv-c{padding:9px 12px;border-radius:18px;border:2px solid var(--line);background:var(--card);color:var(--text);font-size:14px;font-weight:700;font-family:inherit}.rv-c.on{border-color:var(--acc);background:var(--accbg);color:var(--acc)}.rv-in{box-sizing:border-box;width:100%;padding:12px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;font-family:inherit}.rv-b{display:block;width:100%;padding:13px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-size:16px;font-weight:700;margin-top:10px;font-family:inherit;text-align:center;box-sizing:border-box}.rv-b.l{background:var(--accbg);color:var(--acc)}.rv-b:disabled{opacity:.6}.rv-img{display:block;width:100%;border-radius:12px;margin:12px 0;background:#fff}.rv-h{font-size:13px;color:var(--mut);line-height:1.45;margin:6px 0}.rv-s{font-size:14px;color:var(--acc);margin:10px 0;font-weight:600;min-height:18px}.rv-e{color:var(--dn)}.rv-cv{display:block;margin:10px auto;max-width:100%;border-radius:12px;touch-action:none}.rv-ck{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%,transparent 75%,#ccc 75%),linear-gradient(45deg,#ccc 25%,transparent 25%,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,8px 8px;background-color:#fff}.rv-rg{width:100%;margin:6px 0}.rv-m{display:flex;align-items:center;gap:12px;width:100%;padding:14px;margin-bottom:10px;border-radius:14px;border:1px solid var(--line);background:var(--card);color:var(--text);text-align:left;font-family:inherit}.rv-m i{font-style:normal;font-size:26px}.rv-m b{display:block;font-size:16px}.rv-m span{font-size:13px;color:var(--mut)}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="rasmv";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#6366f1,#06b6d4)";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🖼️</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}

/* ---------- umumiy yordamchilar ---------- */
function chips(list,cur,attr){return '<div class="rv-ch">'+list.map(function(x){return '<button class="rv-c'+(String(x[0])===String(cur)?' on':'')+'" data-'+attr+'="'+x[0]+'">'+esc(x[1])+'</button>'}).join("")+'</div>'}
function chipBind(attr,fn){var l=sec.querySelectorAll("[data-"+attr+"]");for(var i=0;i<l.length;i++)(function(b){b.addEventListener("click",function(){fn(b.getAttribute("data-"+attr))})})(l[i])}
function fileBtn(id,label,cls){return '<label class="rv-b'+(cls?' '+cls:'')+'">'+label+'<input type="file" accept="image/*" id="'+id+'" style="display:none"></label>'}
function mk(w,h){var c=document.createElement("canvas");c.width=w;c.height=h;return c}
function loadURL(u,cb,er){var im=new Image();im.onload=function(){cb(im)};im.onerror=function(){er&&er()};im.src=u}
function toCanvas(im,maxSide){
  var w=im.naturalWidth||im.width,h=im.naturalHeight||im.height,s=Math.min(1,maxSide/Math.max(w,h)),c=mk(Math.max(1,Math.round(w*s)),Math.max(1,Math.round(h*s)));
  var x=c.getContext("2d");x.imageSmoothingQuality="high";x.drawImage(im,0,0,c.width,c.height);return c;
}
function readFile(f,cb,er){var u=URL.createObjectURL(f);loadURL(u,function(im){var c=toCanvas(im,3000);try{URL.revokeObjectURL(u)}catch(e){}cb(c)},function(){er&&er()})}
function onFile(id,cb){var el=$(id);if(!el)return;el.addEventListener("change",function(){var f=el.files&&el.files[0];if(!f)return;readFile(f,function(c){cb(c,f)},function(){setStatus("err","?")})})}
function blobOf(c,type,q){return new Promise(function(r){c.toBlob(r,type||"image/jpeg",q)})}
function blobURL(b){return URL.createObjectURL(b)}
function setStatus(kind,msg){var s=$("rvs");if(!s)return;s.className="rv-s"+(kind==="err"?" rv-e":"");s.textContent=kind==="err"?p("err")+msg:(msg||"")}
function fill(x,c,w,h,col){x.fillStyle=col;x.fillRect(0,0,w,h)}

/* AI chaqiruvi */
function ai(task,src,maxSide,extra){
  if(!inTg())return Promise.reject(new Error(p("aiTg")));
  var c=toCanvas(src,maxSide),body={task:task,image:c.toDataURL("image/jpeg",0.9),init:Telegram.WebApp.initData};
  for(var k in extra)body[k]=extra[k];
  var ctl=window.AbortController?new AbortController():null,t=setTimeout(function(){ctl&&ctl.abort()},110000);
  return fetch(AIW,{method:"POST",body:JSON.stringify(body),signal:ctl?ctl.signal:undefined}).then(function(r){
    clearTimeout(t);
    if(!r.ok)return r.json().then(function(j){throw new Error(j&&j.error||("HTTP "+r.status))},function(){throw new Error("HTTP "+r.status)});
    return r.blob();
  }).catch(function(e){clearTimeout(t);throw (e&&e.name==="AbortError")?new Error("Vaqt tugadi"):e});
}
function blobToCanvas(b){return new Promise(function(res,rej){var u=blobURL(b);loadURL(u,function(im){var c=toCanvas(im,4200);try{URL.revokeObjectURL(u)}catch(e){}res(c)},function(){rej(new Error("Natija o‘qilmadi"))})})}

/* Saqlash */
function full(blob){
  var r=new FileReader();r.onload=function(){
    var o=document.createElement("div");o.style.cssText="position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px;gap:12px";
    o.innerHTML='<img src="'+r.result+'" style="max-width:100%;max-height:72vh;border-radius:12px;background:#fff"><div style="color:#fff;text-align:center;font-size:15px;line-height:1.4">'+p("hold")+'</div><button style="padding:12px 28px;border:0;border-radius:12px;background:#fff;color:#000;font-weight:700;font-size:15px">'+p("close")+'</button>';
    o.querySelector("button").onclick=function(){document.body.removeChild(o)};
    document.body.appendChild(o);
  };r.readAsDataURL(blob);
}
function save(blob,name,btn){
  var png=blob.type==="image/png",fn=name+(png?".png":".jpg");
  if(!inTg()){
    try{var a=document.createElement("a");a.href=blobURL(blob);a.download=fn;document.body.appendChild(a);a.click();document.body.removeChild(a)}catch(e){full(blob)}
    return;
  }
  var old=btn?btn.textContent:"";if(btn){btn.textContent="⏳";btn.disabled=true}
  function done(){if(btn){btn.textContent=old;btn.disabled=false}}
  var ctl=window.AbortController?new AbortController():null,t=setTimeout(function(){ctl&&ctl.abort()},30000);
  fetch(AIW+"/up?e="+(png?"png":"jpg")+"&n="+name,{method:"POST",body:blob,signal:ctl?ctl.signal:undefined}).then(function(r){return r.json()}).then(function(j){
    clearTimeout(t);done();
    if(!j||!j.url){full(blob);return}
    try{
      var W=Telegram.WebApp;
      if(W.downloadFile&&W.isVersionAtLeast&&W.isVersionAtLeast("8.0")){W.downloadFile({url:j.url,file_name:fn});return}
      if(W.openLink){W.openLink(j.url);return}
    }catch(e){}
    window.open(j.url,"_blank");
  }).catch(function(){clearTimeout(t);done();full(blob)});
}
function resultHtml(R,name){
  if(!R)return "";
  return '<img class="rv-img'+(R.png?' rv-ck':'')+'" src="'+R.url+'"><button class="rv-b" id="rvdl">⬇ '+p("dl")+'</button>';
}
function bindResult(R,name){var b=$("rvdl");if(b&&R)b.addEventListener("click",function(){save(R.blob,name,b)})}
function setRes(slot,blob){if(slot.res&&slot.res.url)try{URL.revokeObjectURL(slot.res.url)}catch(e){}slot.res={blob:blob,url:blobURL(blob),png:blob.type==="image/png"}}
function showRes(slot,name){var r=$("rvr");if(!r)return;r.innerHTML=resultHtml(slot.res,name);bindResult(slot.res,name)}
function busy(on,msg){var b=sec.querySelectorAll(".rv-b,.rv-c");for(var i=0;i<b.length;i++){if(b[i].tagName==="BUTTON")b[i].disabled=!!on}setStatus("ok",on?msg:"")}

var S={v:"menu"};
var VIEWS={};
function go(v){S.v=v;render();try{window.scrollTo(0,0)}catch(e){}}
function render(){
  var v=S.v,b='<button class="back" id="rvb">← '+(v==="menu"?T[LANG].back:p("tools"))+'</button>',h;
  if(v==="menu"){
    h='<div class="card"><h2>'+p("tile")+'</h2>'+["doc","shr","frm","qr","bg","enh"].map(function(k,i){return '<button class="rv-m" data-m="'+k+'"><i>'+["🪪","📉","🖼️","▦","✂️","✨"][i]+'</i><div><b>'+p(k)+'</b><span>'+p(k+"S")+'</span></div></button>'}).join("")+'</div>';
    sec.innerHTML=b+h;chipBind("m",function(k){go(k)});
  }else{
    sec.innerHTML=b+'<div class="card"><h2>'+p(v)+'</h2>'+VIEWS[v].html()+'</div>';
    VIEWS[v].bind();
  }
  $("rvb").onclick=function(){if(S.v==="menu")show("home");else go("menu")};
}

/* ================= 1. Hujjat rasmi ================= */
var D={img:null,cut:null,size:"3x4",bg:"none",zoom:1,u:.5,v:.45,sheet:"a4",res:null,info:""};
var SZ={"3x4":[30,40,"3×4"],"35x45":[35,45,"3.5×4.5"],"4x6":[40,60,"4×6"]};
var BGC={white:"#ffffff",blue:"#2a6ebb",gray:"#e6e6e6"};
function dSrc(){return D.bg!=="none"&&D.cut?D.cut:D.img}
function dRatio(){var s=SZ[D.size];return s[0]/s[1]}
function dClamp(src,fw,fh){
  var sc=Math.max(fw/src.width,fh/src.height)*D.zoom,hw=fw/(2*sc*src.width),hh=fh/(2*sc*src.height);
  D.u=Math.min(1-hw,Math.max(hw,D.u));D.v=Math.min(1-hh,Math.max(hh,D.v));return sc;
}
var PV={W:320,H:340,fh:316};
function dGeom(){var fw=Math.round(PV.fh*dRatio());return{fw:fw,fh:PV.fh,fx:(PV.W-fw)/2,fy:(PV.H-PV.fh)/2}}
function paintCrop(){
  var c=$("rvc");if(!c||!D.img)return;
  var x=c.getContext("2d"),g=dGeom(),src=dSrc(),sc=dClamp(src,g.fw,g.fh),w=src.width*sc,h=src.height*sc,dx=g.fx+g.fw/2-D.u*w,dy=g.fy+g.fh/2-D.v*h;
  fill(x,c,PV.W,PV.H,"#3a3f47");
  x.globalAlpha=.45;x.drawImage(D.img,dx,dy,w,h);x.globalAlpha=1;
  x.save();x.beginPath();x.rect(g.fx,g.fy,g.fw,g.fh);x.clip();
  if(D.bg!=="none"&&D.cut)fill(x,c,PV.W,PV.H,BGC[D.bg]);
  x.drawImage(src,dx,dy,w,h);x.restore();
  x.strokeStyle="#fff";x.lineWidth=2;x.strokeRect(g.fx,g.fy,g.fw,g.fh);
}
function dRender(PW,PH){
  var c=mk(PW,PH),x=c.getContext("2d"),src=dSrc();x.imageSmoothingQuality="high";
  fill(x,c,PW,PH,D.bg!=="none"&&D.cut?BGC[D.bg]:"#ffffff");
  var sc=dClamp(src,PW,PH),w=src.width*sc,h=src.height*sc;
  x.drawImage(src,PW/2-D.u*w,PH/2-D.v*h,w,h);return c;
}
function dSheet(){
  var s=SZ[D.size],PW=Math.round(s[0]/25.4*300),PH=Math.round(s[1]/25.4*300),ph=dRender(PW,PH);
  if(D.sheet==="one")return Promise.resolve({c:ph,n:1});
  var base=D.sheet==="a4"?[2480,3508]:[1181,1772],best=null,gap=24,mg=59;
  [[base[0],base[1]],[base[1],base[0]]].forEach(function(d){
    var cols=Math.floor((d[0]-2*mg+gap)/(PW+gap)),rows=Math.floor((d[1]-2*mg+gap)/(PH+gap));
    if(cols>0&&rows>0&&(!best||cols*rows>best.n))best={W:d[0],H:d[1],cols:cols,rows:rows,n:cols*rows};
  });
  if(!best)return Promise.resolve({c:ph,n:1});
  var c=mk(best.W,best.H),x=c.getContext("2d");fill(x,c,best.W,best.H,"#fff");
  var gw=best.cols*PW+(best.cols-1)*gap,gh=best.rows*PH+(best.rows-1)*gap,ox=Math.round((best.W-gw)/2),oy=Math.round((best.H-gh)/2);
  for(var r=0;r<best.rows;r++)for(var q=0;q<best.cols;q++){var X=ox+q*(PW+gap),Y=oy+r*(PH+gap);x.drawImage(ph,X,Y);x.strokeStyle="#bbb";x.lineWidth=1;x.strokeRect(X-.5,Y-.5,PW+1,PH+1)}
  return Promise.resolve({c:c,n:best.n});
}
VIEWS.doc={
 html:function(){
  if(!D.img)return '<div class="rv-h">'+p("docHint")+'</div>'+fileBtn("rvf",p("pick"))+'<div class="rv-s" id="rvs"></div>';
  var szs=Object.keys(SZ).map(function(k){return [k,SZ[k][2]]});
  return '<div class="rv-l">'+p("size")+'</div>'+chips(szs,D.size,"sz")+
   '<div class="rv-l">'+p("bgc")+'</div>'+chips([["none",p("bg0")],["white",p("bgW")],["blue",p("bgB")],["gray",p("bgG")]],D.bg,"bg")+
   '<canvas id="rvc" class="rv-cv" width="'+PV.W+'" height="'+PV.H+'"></canvas>'+
   '<div class="rv-l">'+p("zoom")+'</div><input class="rv-rg" id="rvz" type="range" min="1" max="3" step="0.01" value="'+D.zoom+'">'+
   '<div class="rv-l">'+p("sheet")+'</div>'+chips([["one",p("sh1")],["10",p("sh10")],["a4",p("shA4")]],D.sheet,"sh")+
   '<div class="rv-h">'+p("docHint")+'</div><div class="rv-s" id="rvs"></div>'+
   '<button class="rv-b" id="rvmk">'+p("make")+'</button>'+fileBtn("rvf",p("change"),"l")+'<div id="rvr"></div>';
 },
 bind:function(){
  onFile("rvf",function(c){D.img=c;D.cut=null;D.bg="none";D.zoom=1;D.u=.5;D.v=.45;D.res=null;render()});
  if(!D.img)return;
  chipBind("sz",function(k){D.size=k;D.res=null;render()});
  chipBind("sh",function(k){D.sheet=k;D.res=null;render()});
  chipBind("bg",function(k){
    D.res=null;
    if(k==="none"||D.cut){D.bg=k;render();return}
    D.bg=k;render();busy(true,p("aiBg"));
    ai("bg",D.img,1400).then(blobToCanvas).then(function(c){D.cut=c;render()}).catch(function(e){D.bg="none";render();setStatus("err",e.message)});
  });
  var z=$("rvz");z.addEventListener("input",function(){D.zoom=parseFloat(z.value);paintCrop()});
  var c=$("rvc"),drag=null;
  c.addEventListener("pointerdown",function(e){drag={x:e.clientX,y:e.clientY};try{c.setPointerCapture(e.pointerId)}catch(_){}});
  c.addEventListener("pointermove",function(e){
    if(!drag)return;var g=dGeom(),src=dSrc(),sc=Math.max(g.fw/src.width,g.fh/src.height)*D.zoom,k=PV.W/c.getBoundingClientRect().width;
    D.u-=(e.clientX-drag.x)*k/(src.width*sc);D.v-=(e.clientY-drag.y)*k/(src.height*sc);drag={x:e.clientX,y:e.clientY};paintCrop();
  });
  var end=function(){drag=null};c.addEventListener("pointerup",end);c.addEventListener("pointercancel",end);
  paintCrop();
  $("rvmk").addEventListener("click",function(){
    setStatus("ok",p("wait"));
    setTimeout(function(){
      dSheet().then(function(r){return blobOf(r.c,"image/jpeg",0.95).then(function(b){setRes(D,b);showRes(D,"hujjat_rasmi");setStatus("ok",(D.sheet==="one"?"":p("fits")+r.n+p("pcs")));var rr=$("rvr");if(rr&&rr.scrollIntoView)rr.scrollIntoView({behavior:"smooth"})})}).catch(function(e){setStatus("err",e.message)});
    },30);
  });
  if(D.res)showRes(D,"hujjat_rasmi");
 }
};

/* ================= 2. Hajm kichraytirish ================= */
var H={img:null,file:null,target:200,max:0,res:null,info:""};
VIEWS.shr={
 html:function(){
  if(!H.img)return fileBtn("rvf",p("pick"))+'<div class="rv-s" id="rvs"></div>';
  return '<div class="rv-h">'+p("before")+kb(H.file.size)+" · "+H.img.width+"×"+H.img.height+p("px")+'</div>'+
   '<div class="rv-l">'+p("target")+'</div>'+chips([[50,"50 KB"],[100,"100 KB"],[200,"200 KB"],[500,"500 KB"],[1000,"1 MB"]],H.target,"tg")+
   '<div class="rv-l">'+p("maxs")+'</div>'+chips([[0,p("orig")],[2560,"2560"],[1600,"1600"],[1024,"1024"],[640,"640"]],H.max,"mx")+
   '<div class="rv-s" id="rvs"></div><button class="rv-b" id="rvmk">'+p("make")+'</button>'+fileBtn("rvf",p("change"),"l")+'<div id="rvr">'+(H.res?resultHtml(H.res):"")+'</div>';
 },
 bind:function(){
  onFile("rvf",function(c,f){H.img=c;H.file=f;H.res=null;H.info="";render()});
  if(!H.img)return;
  chipBind("tg",function(k){H.target=+k;H.res=null;render()});chipBind("mx",function(k){H.max=+k;H.res=null;render()});
  if(H.res){bindResult(H.res,"kichik_rasm");setStatus("ok",H.info)}
  $("rvmk").addEventListener("click",function(){
    setStatus("ok",p("wait"));
    var limit=H.target*1024,full0=H.img,scale=H.max?Math.min(1,H.max/Math.max(full0.width,full0.height)):1;
    (async function(){
      var best=null,hit=false;
      for(var t=0;t<14&&!hit;t++){
        var w=Math.max(16,Math.round(full0.width*scale)),h=Math.max(16,Math.round(full0.height*scale)),c=mk(w,h),x=c.getContext("2d");
        x.imageSmoothingQuality="high";fill(x,c,w,h,"#fff");x.drawImage(full0,0,0,w,h);
        var lo=.25,hi=.95,ok=null;
        var b=await blobOf(c,"image/jpeg",hi);
        if(b.size<=limit){ok=b}else{
          for(var i=0;i<7;i++){var m=(lo+hi)/2,bb=await blobOf(c,"image/jpeg",m);if(bb.size<=limit){ok=bb;lo=m}else hi=m}
        }
        if(ok){best={b:ok,w:w,h:h};hit=true}else{var bl=await blobOf(c,"image/jpeg",.25);best={b:bl,w:w,h:h};scale*=.85}
      }
      return {best:best,hit:hit};
    })().then(function(r){
      setRes(H,r.best.b);H.info=p("after")+kb(r.best.b.size)+" · "+r.best.w+"×"+r.best.h+p("px")+(r.hit?"":" · "+p("tooBig"));
      showRes(H,"kichik_rasm");setStatus("ok",H.info);
    }).catch(function(e){setStatus("err",e.message)});
  });
 }
};

/* ================= 3. Ramka va yozuv ================= */
var F={img:null,style:"white",text:"",pos:"bottom",col:"white",date:false};
var FCOL={white:"#ffffff",black:"#111111",gold:"#f2c94c"};
function fRender(){
  var src=F.img,s=Math.min(1,1600/Math.max(src.width,src.height)),w=Math.round(src.width*s),h=Math.round(src.height*s),m=Math.min(w,h),st=F.style;
  var b=st==="none"?0:Math.round(m*(st==="polaroid"?.05:.045)),band=st==="polaroid"?Math.round(m*.16):0;
  var W=w+2*b,Hh=h+2*b+band,c=mk(W,Hh),x=c.getContext("2d");x.imageSmoothingQuality="high";
  if(st==="black")fill(x,c,W,Hh,"#111");
  else if(st==="gold"){var g=x.createLinearGradient(0,0,W,Hh);g.addColorStop(0,"#b8860b");g.addColorStop(.5,"#f7e08a");g.addColorStop(1,"#b8860b");x.fillStyle=g;x.fillRect(0,0,W,Hh)}
  else fill(x,c,W,Hh,"#fff");
  x.save();
  if(st==="round"){var r=Math.round(m*.06);x.beginPath();if(x.roundRect)x.roundRect(b,b,w,h,r);else x.rect(b,b,w,h);x.clip()}
  x.drawImage(src,b,b,w,h);x.restore();
  var lines=[];if(F.text.trim())lines.push(F.text.trim());
  if(F.date){var d=new Date();lines.push(("0"+d.getDate()).slice(-2)+"."+("0"+(d.getMonth()+1)).slice(-2)+"."+d.getFullYear())}
  if(lines.length){
    var fs=Math.round(m*.06);x.font="700 "+fs+"px sans-serif";x.textAlign="center";x.textBaseline="middle";
    var wrapped=[];lines.forEach(function(L){var words=L.split(/\s+/),cur="";words.forEach(function(wd){var t=cur?cur+" "+wd:wd;if(x.measureText(t).width>W*.9&&cur){wrapped.push(cur);cur=wd}else cur=t});wrapped.push(cur)});
    var lh=fs*1.25,tot=wrapped.length*lh,pol=st==="polaroid",ty;
    if(pol){ty=h+b+(band+b-tot)/2+lh/2;x.fillStyle=F.col==="white"?"#222":FCOL[F.col]}
    else{ty=F.pos==="top"?b+fs*.4+lh/2:b+h-fs*.4-tot+lh/2;x.fillStyle=FCOL[F.col];x.shadowColor=F.col==="black"?"rgba(255,255,255,.6)":"rgba(0,0,0,.7)";x.shadowBlur=Math.round(fs*.25)}
    wrapped.forEach(function(L,i){x.fillText(L,W/2,ty+i*lh)});
  }
  return c;
}
var fT=null;function paintF(){var c=$("rvc");if(!c||!F.img)return;var o=fRender();c.width=o.width;c.height=o.height;c.getContext("2d").drawImage(o,0,0)}
VIEWS.frm={
 html:function(){
  if(!F.img)return fileBtn("rvf",p("pick"))+'<div class="rv-s" id="rvs"></div>';
  return '<canvas id="rvc" class="rv-cv" style="width:100%;height:auto"></canvas>'+
   '<div class="rv-l">'+p("style")+'</div>'+chips([["none",p("st0")],["white",p("stW")],["black",p("stK")],["gold",p("stG")],["polaroid",p("stP")],["round",p("stR")]],F.style,"fs")+
   '<div class="rv-l">'+p("text")+'</div><input class="rv-in" id="rvt" maxlength="80" placeholder="'+esc(p("textPh"))+'" value="'+esc(F.text)+'">'+
   '<div class="rv-l">'+p("pos")+'</div>'+chips([["bottom",p("pB")],["top",p("pT")]],F.pos,"fp")+
   '<div class="rv-l">'+p("col")+'</div>'+chips([["white",p("cW")],["black",p("cK")],["gold",p("cG")]],F.col,"fc")+
   '<div class="rv-l">'+p("date")+'</div>'+chips([[1,"✓"],[0,"✗"]],F.date?1:0,"fd")+
   '<div class="rv-s" id="rvs"></div><button class="rv-b" id="rvdl">⬇ '+p("dl")+'</button>'+fileBtn("rvf",p("change"),"l");
 },
 bind:function(){
  onFile("rvf",function(c){F.img=c;render()});
  if(!F.img)return;
  chipBind("fs",function(k){F.style=k;render()});chipBind("fp",function(k){F.pos=k;render()});chipBind("fc",function(k){F.col=k;render()});chipBind("fd",function(k){F.date=k==="1";render()});
  $("rvt").addEventListener("input",function(e){F.text=e.target.value;clearTimeout(fT);fT=setTimeout(paintF,80)});
  paintF();
  var d=$("rvdl");d.addEventListener("click",function(){blobOf($("rvc"),"image/jpeg",.92).then(function(b){save(b,"ramka_rasm",d)})});
 }
};

/* ================= 4. QR-kod ================= */
var Q={text:"",col:"#000000"};
function qrPaint(){
  var c=$("rvc"),s=$("rvs");if(!c)return;
  var x=c.getContext("2d");
  if(!Q.text.trim()){c.style.display="none";$("rvdl").style.display="none";setStatus("ok",p("qhint"));return}
  var q=QR.encode(Q.text);
  if(!q){c.style.display="none";$("rvdl").style.display="none";setStatus("err",p("qlong"));return}
  var n=q.size,cell=Math.max(4,Math.floor(1024/(n+8))),W=(n+8)*cell;
  c.width=W;c.height=W;fill(x,c,W,W,"#fff");x.fillStyle=Q.col;
  for(var y=0;y<n;y++)for(var xx=0;xx<n;xx++)if(q.m[y][xx])x.fillRect((xx+4)*cell,(y+4)*cell,cell,cell);
  c.style.display="block";$("rvdl").style.display="block";setStatus("ok","");
}
VIEWS.qr={
 html:function(){
  return '<div class="rv-l">'+p("qtext")+'</div><input class="rv-in" id="rvt" placeholder="'+esc(p("qph"))+'" value="'+esc(Q.text)+'">'+
   '<div class="rv-l">'+p("qcol")+'</div>'+chips([["#000000",p("qk")],["#0b6b4f",p("qg")],["#1d4ed8",p("qb")]],Q.col,"qc")+
   '<div class="rv-s" id="rvs"></div><canvas id="rvc" class="rv-cv" style="width:100%;max-width:340px;height:auto;display:none"></canvas><button class="rv-b" id="rvdl" style="display:none">⬇ '+p("dl")+' (PNG)</button>';
 },
 bind:function(){
  $("rvt").addEventListener("input",function(e){Q.text=e.target.value;qrPaint()});
  chipBind("qc",function(k){Q.col=k;var t=Q.text;render();$("rvt").value=t});
  var d=$("rvdl");d.addEventListener("click",function(){blobOf($("rvc"),"image/png").then(function(b){save(b,"qr_kod",d)})});
  qrPaint();
 }
};

/* ================= 5. Fonni olib tashlash (AI) ================= */
var B={img:null,cut:null,fill:"none",res:null};
function bPaint(){
  var c=$("rvc");if(!c||!B.cut)return;c.width=B.cut.width;c.height=B.cut.height;var x=c.getContext("2d");
  if(B.fill!=="none")fill(x,c,c.width,c.height,BGC[B.fill]);x.drawImage(B.cut,0,0);
  c.className="rv-cv"+(B.fill==="none"?" rv-ck":"");c.style.width="100%";c.style.height="auto";
}
VIEWS.bg={
 html:function(){
  if(!B.img)return '<div class="rv-h">'+p("bgHint")+'</div><div class="rv-h">'+p("aiNote")+'</div>'+fileBtn("rvf",p("pick"))+'<div class="rv-s" id="rvs"></div>';
  if(!B.cut)return '<div class="rv-s" id="rvs"></div><button class="rv-b" id="rvmk">'+p("run")+'</button>'+fileBtn("rvf",p("change"),"l");
  return '<canvas id="rvc" class="rv-cv"></canvas>'+chips([["none",p("bgT")],["white",p("bgW")],["blue",p("bgB")],["gray",p("bgG")]],B.fill,"bf")+
   '<div class="rv-s" id="rvs"></div><button class="rv-b" id="rvdl">⬇ '+p("dl")+'</button>'+fileBtn("rvf",p("change"),"l");
 },
 bind:function(){
  onFile("rvf",function(c){B.img=c;B.cut=null;B.fill="none";render();runBg()});
  function runBg(){busy(true,p("aiBg"));ai("bg",B.img,1600).then(blobToCanvas).then(function(c){B.cut=c;render()}).catch(function(e){render();setStatus("err",e.message)})}
  var mk0=$("rvmk");if(mk0)mk0.addEventListener("click",runBg);
  if(!B.cut)return;
  chipBind("bf",function(k){B.fill=k;render()});
  bPaint();
  var d=$("rvdl");d.addEventListener("click",function(){blobOf($("rvc"),B.fill==="none"?"image/png":"image/jpeg",.95).then(function(b){save(b,"fonsiz_rasm",d)})});
 }
};

/* ================= 6. Sifatni oshirish (AI) ================= */
var E={img:null,scale:2,face:false,out:null,show:"res"};
VIEWS.enh={
 html:function(){
  if(!E.img)return '<div class="rv-h">'+p("enhHint")+'</div><div class="rv-h">'+p("aiNote")+'</div>'+fileBtn("rvf",p("pick"))+'<div class="rv-s" id="rvs"></div>';
  var pre=E.out?'<div class="rv-ch" style="margin-top:10px">'+[["orig",p("shOrig")],["res",p("shRes")]].map(function(x){return '<button class="rv-c'+(E.show===x[0]?' on':'')+'" data-es="'+x[0]+'">'+x[1]+'</button>'}).join("")+'</div><canvas id="rvc" class="rv-cv" style="width:100%;height:auto"></canvas>':'<canvas id="rvc" class="rv-cv" style="width:100%;height:auto"></canvas>';
  return pre+'<div class="rv-l">'+p("enhScale")+'</div>'+chips([[2,"×2"],[4,"×4"]],E.scale,"es2")+
   '<div class="rv-l">'+p("face")+'</div>'+chips([[1,p("faceOn")],[0,p("faceOff")]],E.face?1:0,"ef")+
   '<div class="rv-s" id="rvs"></div><button class="rv-b" id="rvmk">'+p("run")+'</button>'+(E.out?'<button class="rv-b" id="rvdl">⬇ '+p("dl")+'</button>':'')+fileBtn("rvf",p("change"),"l");
 },
 bind:function(){
  onFile("rvf",function(c){E.img=c;E.out=null;E.show="res";render()});
  if(!E.img)return;
  function paint(){var c=$("rvc"),s=(E.show==="res"&&E.out)?E.out:E.img;c.width=s.width;c.height=s.height;c.getContext("2d").drawImage(s,0,0)}
  chipBind("es2",function(k){E.scale=+k;render()});chipBind("ef",function(k){E.face=k==="1";render()});
  chipBind("es",function(k){E.show=k;render()});
  paint();
  $("rvmk").addEventListener("click",function(){
    busy(true,p("wait"));
    ai("k4",E.img,E.scale===4?800:1280,{scale:E.scale,face:E.face}).then(blobToCanvas).then(function(c){E.out=c;E.show="res";render()}).catch(function(e){render();setStatus("err",e.message)});
  });
  var d=$("rvdl");if(d)d.addEventListener("click",function(){
    (async function(){var q=.92,b=await blobOf(E.out,"image/jpeg",q);while(b.size>4800000&&q>.5){q-=.1;b=await blobOf(E.out,"image/jpeg",q)}return b})().then(function(b){save(b,"aniq_rasm",d)});
  });
 }
};

tile.addEventListener("click",function(){S.v="menu";render();show("rasmv")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();if(sec.classList.contains("on"))render()})}
updTile();render();
})();
