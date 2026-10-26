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
uz:{tile:"Tabrik",tileS:"Tug‘ilgan kunga",title:"Tug‘ilgan kun tabrigi",who:"Kimga?",name:"Ismi (ixtiyoriy)",age:"Yoshi (ixtiyoriy)",tone:"Uslub",form:"Murojaat",sen:"Sen",siz:"Siz",
 make:"Tabrik yaratish",another:"Boshqa variant",copy:"Nusxalash",copied:"Nusxalandi ✓",share:"Ulashish",card:"Ochiqcha yaratish",theme:"Rang",dl:"Yuklab olish",shr:"Rasmni ulashish",
 hint:"Matnni o‘zgartirishingiz mumkin. Yuklab olinmasa, “Rasmni ulashish” yoki rasmni bosib turib saqlang.",ph:"Masalan: Aziz",
 r:{ota:"Ota",ona:"Ona",dost:"Do‘st",opa:"Opa",singil:"Singil",aka:"Aka",uka:"Uka",umr:"Umr yo‘ldosh",ustoz:"Ustoz",hamkasb:"Hamkasb",farzand:"Farzand"},
 t:{samimiy:"Samimiy",rasmiy:"Rasmiy",hazil:"Hazil",duo:"Duo"},
 head:"Tug‘ilgan kuning muborak!",headSiz:"Tug‘ilgan kuningiz muborak!",
 th:["Pushti","Ko‘k","Yashil","Binafsha","Oltin"]},
ru:{tile:"Поздравление",tileS:"С днём рождения",title:"Поздравление с днём рождения",who:"Кому?",name:"Имя (необязательно)",age:"Возраст (необязательно)",tone:"Стиль",form:"Обращение",sen:"На «ты»",siz:"На «Вы»",
 make:"Создать поздравление",another:"Другой вариант",copy:"Копировать",copied:"Скопировано ✓",share:"Поделиться",card:"Создать открытку",theme:"Цвет",dl:"Скачать",shr:"Поделиться картинкой",
 hint:"Текст можно изменить. Если не скачивается, нажмите «Поделиться картинкой» или удерживайте картинку и сохраните.",ph:"Например: Азиз",
 r:{ota:"Папа",ona:"Мама",dost:"Друг",opa:"Сестра старшая",singil:"Сестра младшая",aka:"Брат старший",uka:"Брат младший",umr:"Любимый человек",ustoz:"Учитель",hamkasb:"Коллега",farzand:"Ребёнок"},
 t:{samimiy:"Тёплое",rasmiy:"Официальное",hazil:"С юмором",duo:"Пожелание"},
 head:"С днём рождения!",headSiz:"С днём рождения!",
 th:["Розовый","Синий","Зелёный","Фиолетовый","Золотой"]}
};
function p(k){var v=LANG==="ru"?UI.ru[k]:UI.uz[k];return typeof v==="string"&&LANG==="oz"?cyr(v):v}
function pr(k,id){var v=(LANG==="ru"?UI.ru:UI.uz)[k][id];return LANG==="oz"?cyr(v):v}

/* ---------- O‘zbekcha shablonlar ---------- */
var ADR={ota:"Aziz otajonim",ona:"Aziz onajonim",dost:"Qadrdon do‘stim",opa:"Mehribon opajonim",singil:"Suyukli singlim",aka:"Hurmatli akajonim",uka:"Aziz ukajonim",umr:"Umr yo‘ldoshim",ustoz:"Hurmatli ustozim",hamkasb:"Hurmatli hamkasbim",farzand:"Suyukli farzandim"};
var SIZ0={ota:1,ona:1,ustoz:1,hamkasb:1};
var TK={ // [sen, siz]
 s:["sen","siz"],sg:["senga","sizga"],k:["kuning","kuningiz"],h:["hayoting","hayotingiz"],o:["oilang","oilangiz"],orz:["orzularing","orzularingiz"],
 y:["yuraging","yuragingiz"],ish:["ishlaring","ishlaringiz"],yo:["yo‘ling","yo‘lingiz"],tol:["to‘lishing","to‘lishingiz"],qal:["qalbing","qalbingiz"],um:["umring","umringiz"],
 kal:["kulging","kulgingiz"],ham:["hamrohing","hamrohingiz"],kuch:["kuching","kuchingiz"],hamy:["hamyoning","hamyoningiz"],bol:["bo‘l","bo‘ling"],yur:["yur","yuring"],qoy:["qo‘y","qo‘ying"],yaq:["yaqinlaringni","yaqinlaringizni"],ishi:["ishingda","ishingizda"],erish:["erishishing","erishishingiz"],yod:["yodingdasan","yodingizdasiz"],meh:["mehr-muhabbating","mehr-muhabbatingiz"],yon:["yoningda","yoningizda"]
};
var TIN={
samimiy:{
 op:["{A}, tug‘ilgan {k} muborak bo‘lsin! 🎉","{A}, bugun juda quvonchli kun: tug‘ilgan {k} bilan chin dildan tabriklayman! 🎂","{A}, tug‘ilgan {k} bilan! Bugun hamma quvonch faqat {sg} bo‘lsin! 🎈"],
 w:["{sg} mustahkam sog‘lik tilayman 🌿","{h} baxt va quvonchga to‘la bo‘lsin ✨","{orz} ro‘yobga chiqsin 🌟","{o}dagilar doim omon va baxtli bo‘lsin 🏡","Har bir {k} yaxshi xabarlar bilan boshlansin ☀️","{yo}da faqat yaxshi insonlar uchrasin 🤝","{h}da omad doim yor bo‘lsin 🍀","{y}ga doim xotirjamlik va mehr to‘lsin ❤️"],
 cl:["Yana bir bor tug‘ilgan {k} bilan! ❤️","Doim shunday quvnoq va baxtli {bol}! 🌹","{s}ni chin dildan yaxshi ko‘raman va qadrlayman! 💐"]},
rasmiy:{
 op:["{A}, tug‘ilgan {k} munosabati bilan {s}ni samimiy qutlayman.","{A}, tug‘ilgan {k} muborak bo‘lsin! Bu kun {sg} quvonch olib kelsin.","{A}, hayotingizning yangi yoshi muborak bo‘lsin!"],
 w:["{sg} mustahkam sog‘lik, oilaviy baxt va yuksak muvaffaqiyatlar tilayman.","{ish}da doim yutuq va muvaffaqiyat hamroh bo‘lsin.","{o}da tinchlik, to‘kinlik va hamjihatlik hukm sursin.","{h}da barcha ezgu {orz} amalga oshsin.","Har bir kuningiz baraka va xotirjamlikka to‘la bo‘lsin.","Bergan mehr va e’tiboringiz uchun minnatdorchilik bildiraman."],
 cl:["Hurmat bilan, chin dildan tabriklayman!","Sog‘-salomat bo‘ling, doim omadli bo‘ling!","Yangi yosh {sg} yangi marralar olib kelsin."]},
hazil:{
 op:["{A}, tug‘ilgan {k} muborak! Yosh ulg‘aymayapti, shunchaki “tajriba” to‘planyapti 😄","{A}, tug‘ilgan {k} bilan! Shamlar ko‘paydi, lekin tort baribir hammaga yetadi 🎂","{A}, bugun hamma {s}ni tabriklashi kerak. Tortdan bizga ham tegsin 😉"],
 w:["Yosh ortgani sayin {s} ham donoroq, chiroyliroq va mazaliroq bo‘lib borsin 😎","{hamy} doim to‘lib tursin, muzlatgiching esa hech qachon bo‘sh bo‘lmasin 🍖","Tortning hamma qismi {sg}, kaloriyalar esa hammaga! 🍰","Charchoq “kech qoldim” deb eshikdan qaytsin, kayfiyat esa doim joyida bo‘lsin 😄","Yosh haqida so‘rashsa, “tajriba yig‘yapman” deb aytish eng yaxshi javob 😉","{ish} ishlasin, dam olish kunlari esa ko‘paysin 🏖️"],
 cl:["Tug‘ilgan {k} bilan, sog‘ {bol}! 🎉","Doim kulib {yur}, bizga ham shu yetadi! 😄","Yana bir bor tabriklayman, tortdan olib {qoy}! 🎂"]},
duo:{
 op:["{A}, tug‘ilgan {k} muborak bo‘lsin! Alloh {sg} sog‘lik-salomatlik va baraka ato qilsin. 🤲","{A}, tug‘ilgan {k} bilan chin dildan tabriklayman. Alloh {um}ni barakali qilsin. 🌙","{A}, bugungi kuningiz hayrli va barakali bo‘lsin! 🤲"],
 w:["Alloh {sg} mustahkam sog‘lik va uzoq umr ato etsin.","{h}da iymon, tinchlik va rizq-nasiba kengligi bo‘lsin.","Alloh {o}ni va {yaq} O‘z panohida asrasin.","Barcha yaxshi {orz}ni Alloh ijobat qilsin.","Har bir {ishi} Alloh yordam va madad bersin.","Dunyoda ham, oxiratda ham yaxshiliklarga {erish} nasib etsin."],
 cl:["Alloh rozi bo‘lsin! Omin. 🤲","Allohdan sog‘lik, baraka va omad so‘rayman. Omin.","Duolarimizda doim {yod}. Omin. 🌙"]}
};
var EXT={ota:["Tayanchimiz va g‘ururimiz — {s} 🤍","Bergan tarbiya va mehr uchun cheksiz rahmat."],
 ona:["Dunyomizdagi eng aziz inson — {s} 🤍","{meh} uchun har kuni shukr qilaman."],
 dost:["Do‘stligimiz abadiy bo‘lsin 🤝","{sg} o‘xshagan do‘st nasib etgani uchun Allohga shukr."],
 opa:["Doim bir-birimizga tayanch bo‘laylik 🤍","Hayotimdagi eng yaqin insonlardan biri — {s} 🤍"],
 singil:["Doim bir-birimizga tayanch bo‘laylik 🤍","Hayotimdagi eng yaqin insonlardan biri — {s} 🤍"],
 aka:["Tayanchimiz va g‘ururimiz — {s} 🤍","{sg} o‘xshagan akam borligi uchun Allohga shukr."],
 uka:["{s} bilan faxrlanaman, doim {yon} bo‘laman 🤍","{orz} ro‘yobga chiqishiga ishonaman."],
 umr:["{s} bilan o‘tgan har bir kun men uchun baxt 🤍","Hayot yo‘limizda doim yonma-yon bo‘laylik."],
 ustoz:["Bergan ilm va tarbiya uchun chuqur minnatdorchilik bildiraman.","{sg} o‘xshagan ustoz borligidan g‘ururlanaman."],
 hamkasb:["Hamkorligimiz uzoq va samarali davom etsin 🤝","Jamoamizda {s} borligi uchun minnatdormiz."],
 farzand:["{kal}dan uyimiz yorishadi 🌟","Eng katta baxtim — {s} 🤍"]};

/* ---------- Ruscha ---------- */
var ADRU={ota:"Дорогой папа",ona:"Дорогая мама",dost:"Дорогой друг",opa:"Дорогая сестра",singil:"Дорогая сестрёнка",aka:"Дорогой брат",uka:"Дорогой братишка",umr:"Любимый человек",ustoz:"Уважаемый учитель",hamkasb:"Уважаемый коллега",farzand:"Дорогое моё дитя"};
var TKR={tb:["тебе","Вам"],tv:["твой","Ваш"],tvy:["твоя","Ваша"],tvi:["твои","Ваши"],tvoe:["твоё","Ваше"],tvom:["твоём","Вашем"],tbya:["тебя","Вас"]};
var TINR={
samimiy:{op:["{A}, с днём рождения! 🎉","{A}, поздравляю {tbya} с днём рождения от всего сердца! 🎂","{A}, пусть {tv} день рождения будет самым счастливым! 🎈"],
 w:["Желаю {tb} крепкого здоровья 🌿","Пусть {tvy} жизнь будет наполнена счастьем и радостью ✨","Пусть {tvi} мечты сбываются 🌟","Пусть в {tvom} доме всегда царят мир и тепло 🏡","Пусть каждый день начинается с хороших новостей ☀️","Пусть удача всегда будет рядом 🍀"],
 cl:["Ещё раз с днём рождения! ❤️","Счастья {tb} и тепла! 🌹","Люблю и ценю {tbya}! 💐"]},
rasmiy:{op:["{A}, от души поздравляю {tbya} с днём рождения.","{A}, примите мои искренние поздравления с днём рождения!","{A}, пусть новый год жизни принесёт {tb} радость и успех."],
 w:["Желаю {tb} крепкого здоровья, семейного благополучия и больших успехов.","Пусть {tb} всегда сопутствует удача в делах.","Пусть в {tvom} доме царят мир и согласие.","Пусть все {tvi} добрые мечты исполнятся."],
 cl:["С уважением и наилучшими пожеланиями!","Здоровья, счастья и удачи!","Пусть новый год жизни принесёт новые победы."]},
hazil:{op:["{A}, с днём рождения! Возраст не растёт, просто копится опыт 😄","{A}, поздравляю! Свечей стало больше, но торта хватит на всех 🎂","{A}, сегодня тост за {tbya}, а торт делим поровну 😉"],
 w:["Желаю {tb} хорошего настроения и всегда полного холодильника 😄","Пусть работа работает, а выходных становится больше 🏖️","Пусть торт достанется {tb}, а калории — всем! 🍰","Пусть усталость уходит, а настроение всегда остаётся с {tb} 😎"],
 cl:["С днём рождения, будь здоров! 🎉","Улыбайся чаще, нам тоже достанется! 😄","Ещё раз поздравляю, оставь кусочек торта! 🎂"]},
duo:{op:["{A}, с днём рождения! Пусть Аллах дарует {tb} здоровье и благополучие. 🤲","{A}, поздравляю {tbya}! Пусть Аллах сделает {tvoe} жизнь благословенной. 🌙","{A}, пусть этот день будет благословенным! 🤲"],
 w:["Пусть Аллах дарует {tb} крепкое здоровье и долгую жизнь.","Пусть в {tvom} доме будут мир, вера и достаток.","Пусть Аллах исполнит все {tvi} добрые желания.","Пусть Аллах поможет {tb} во всех делах."],
 cl:["Амин. 🤲","Прошу у Аллаха здоровья, благополучия и удачи. Амин.","Помню {tbya} в своих молитвах. Амин. 🌙"]}};
var EXTR={ota:["Ты наша опора и гордость 🤍"],ona:["Ты самый дорогой человек в нашем мире 🤍"],dost:["Пусть наша дружба будет вечной 🤝"],opa:["Пусть мы всегда будем опорой друг для друга 🤍"],singil:["Пусть мы всегда будем опорой друг для друга 🤍"],aka:["Ты наша опора и гордость 🤍"],uka:["Горжусь тобой и всегда рядом 🤍"],umr:["Каждый день с тобой для меня счастье 🤍"],ustoz:["Благодарю за знания и воспитание."],hamkasb:["Пусть наше сотрудничество будет долгим и плодотворным 🤝"],farzand:["Ты моё самое большое счастье 🤍"]};

function fill(s,vals){return s.replace(/\{(\w+)\}/g,function(m,k){return vals[k]!==undefined?vals[k]:m})}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function pickN(a,n){var c=a.slice(),o=[];while(o.length<n&&c.length){o.push(c.splice(Math.floor(Math.random()*c.length),1)[0])}return o}

var S={rel:"dost",tone:"samimiy",siz:false,name:"",age:"",text:"",theme:0,out:null};
function useSiz(){return S.siz}
function gen(){
  var siz=S.tone==="rasmiy"?true:S.siz,idx=siz?1:0,vals={},ru=LANG==="ru",nm=S.name.trim(),age=parseInt(S.age,10);
  var A;
  if(ru){A=ADRU[S.rel]+(nm?" "+nm:"");for(var k in TKR)vals[k]=TKR[k][idx];vals.tf=siz?"те":"";vals.tfe=siz?"ы":"";vals.A=A}
  else{A=ADR[S.rel]+(nm?" "+nm:"");for(var k2 in TK)vals[k2]=TK[k2][idx];vals.A=A}
  var pool=(ru?TINR:TIN)[S.tone],ex=(ru?EXTR:EXT)[S.rel];
  var op=pick(pool.op),ws=pickN(pool.w,3),cl=pick(pool.cl);
  if(S.tone==="samimiy"||S.tone==="duo"||S.tone==="hazil"){if(Math.random()<.6&&ex)ws[2]=pick(ex)}
  var lines=[op];
  if(age>0&&age<130){lines.push(ru?("Сегодня "+age+" "+yearRu(age)+": это прекрасная дата! 🎈"):("Bugun "+age+" yoshga "+vals.tol+" bilan alohida tabriklayman! 🎈"))}
  lines=lines.concat(ws);lines.push(cl);
  var t=lines.map(function(l){l=fill(l,vals);return l.charAt(0).toUpperCase()+l.slice(1)}).join("\n\n");
  if(!ru&&LANG==="oz")t=cyr(t);
  return t;
}
function yearRu(n){var m=n%100,d=n%10;return (m>10&&m<20)?"лет":d===1?"год":(d>1&&d<5)?"года":"лет"}

/* ---------- ochiqcha ---------- */
var THEMES=[["#ff7eb3","#ff758c","#fff1f5"],["#4facfe","#3b6fd8","#eef6ff"],["#43e97b","#12a36b","#effff6"],["#a18cd1","#6a4fbf","#f5f0ff"],["#f6d365","#d4890f","#fff8e6"]];
function wrap(x,text,maxW){
  var words=text.split(/\s+/),lines=[],cur="";
  words.forEach(function(w){var t=cur?cur+" "+w:w;if(x.measureText(t).width>maxW&&cur){lines.push(cur);cur=w}else cur=t});
  if(cur)lines.push(cur);return lines;
}
function rnd(seed){var s=seed;return function(){s=(s*16807)%2147483647;return (s-1)/2147483646}}
function drawCard(){
  var W=1080,H=1350,c=document.createElement("canvas");c.width=W;c.height=H;var x=c.getContext("2d"),th=THEMES[S.theme],ru=LANG==="ru";
  var g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,th[0]);g.addColorStop(1,th[1]);x.fillStyle=g;x.fillRect(0,0,W,H);
  var r=rnd(7);
  for(var i=0;i<70;i++){x.fillStyle="rgba(255,255,255,"+(.1+r()*.35)+")";x.beginPath();x.arc(r()*W,r()*H,4+r()*16,0,7);x.fill()}
  var cols=["#ffd166","#ef476f","#06d6a0","#118ab2","#ffffff"];
  for(i=0;i<50;i++){x.save();x.translate(r()*W,r()*H*.5);x.rotate(r()*6);x.fillStyle=cols[i%5];x.fillRect(-6,-12,12,24);x.restore()}
  for(i=0;i<4;i++){var bx=110+i*290+r()*40,by=H*.22+r()*80;x.strokeStyle="rgba(255,255,255,.7)";x.lineWidth=3;x.beginPath();x.moveTo(bx,by+75);x.quadraticCurveTo(bx-20,by+170,bx+10,by+260);x.stroke();x.fillStyle=cols[i%4];x.beginPath();x.ellipse(bx,by,55,70,0,0,7);x.fill();x.fillStyle="rgba(255,255,255,.35)";x.beginPath();x.ellipse(bx-18,by-22,12,20,.5,0,7);x.fill()}
  var cardX=90,cardY=H*.36,cardW=W-180,cardH=H*.54;
  x.fillStyle="rgba(255,255,255,.94)";x.shadowColor="rgba(0,0,0,.25)";x.shadowBlur=40;x.shadowOffsetY=14;
  x.beginPath();if(x.roundRect)x.roundRect(cardX,cardY,cardW,cardH,40);else x.rect(cardX,cardY,cardW,cardH);x.fill();x.shadowBlur=0;x.shadowOffsetY=0;
  x.textAlign="center";x.fillStyle=th[1];x.font="bold 64px sans-serif";
  var siz=S.tone==="rasmiy"?true:S.siz,head=ru?UI.ru.head:(LANG==="oz"?cyr(siz?UI.uz.headSiz:UI.uz.head):(siz?UI.uz.headSiz:UI.uz.head));
  var y=cardY+110;
  wrap(x,head,cardW-100).forEach(function(l){x.fillText(l,W/2,y);y+=76});
  var nm=S.name.trim();
  if(nm){x.fillStyle="#222";x.font="bold 82px sans-serif";var fs=82;while(x.measureText(nm).width>cardW-100&&fs>36){fs-=4;x.font="bold "+fs+"px sans-serif"}y+=30;x.fillText(nm,W/2,y);y+=60}
  var age=parseInt(S.age,10);
  if(age>0&&age<130){
    y+=20;x.fillStyle=th[0];x.beginPath();x.arc(W/2,y+60,70,0,7);x.fill();x.fillStyle="#fff";x.font="bold 78px sans-serif";x.textBaseline="middle";x.fillText(String(age),W/2,y+62);x.textBaseline="alphabetic";y+=160;
  }
  var msg=(S.text||"").split(/\n+/).filter(function(l){return l.trim()});var short=msg.length>2?msg[msg.length-2]:msg[0];
  x.fillStyle="#444";x.font="40px sans-serif";
  var ls=wrap(x,short,cardW-120),maxL=Math.max(2,Math.floor((cardY+cardH-60-y)/52));
  y+=20;ls.slice(0,maxL).forEach(function(l){x.fillText(l,W/2,y);y+=52});
  x.fillStyle="rgba(255,255,255,.95)";x.font="bold 34px sans-serif";x.fillText("Jalaquduq ovozi",W/2,H-60);
  return c;
}
function makeCard(){
  var c=drawCard();
  c.toBlob(function(b){
    if(!b)return;
    if(S.out)try{URL.revokeObjectURL(S.out.url)}catch(e){}
    S.out={url:URL.createObjectURL(b),blob:b};draw(true);
    var el=$("tcard");if(el)el.scrollIntoView({block:"center"});
  },"image/jpeg",.92);
}
function $(id){return document.getElementById(id)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

var css=document.createElement("style");
css.textContent=".tk-l{font-size:13px;color:var(--mut);margin:14px 0 6px;font-weight:700}.tk-ch{display:flex;flex-wrap:wrap;gap:6px}.tk-c{padding:9px 12px;border-radius:18px;border:2px solid var(--line);background:var(--card);color:var(--text);font-size:14px;font-weight:700;font-family:inherit}.tk-c.on{border-color:var(--acc);background:var(--accbg);color:var(--acc)}.tk-in{width:100%;padding:12px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;font-family:inherit}.tk-r{display:flex;gap:8px}.tk-r>*{flex:1}.tk-ta{width:100%;min-height:230px;padding:12px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;line-height:1.5;font-family:inherit;resize:vertical;margin-top:12px}.tk-b{display:block;width:100%;padding:13px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-size:16px;font-weight:700;margin-top:10px;font-family:inherit}.tk-b.l{background:var(--accbg);color:var(--acc)}.tk-img{display:block;width:100%;border-radius:14px;margin:12px 0}.tk-sw{display:flex;gap:8px;margin-top:6px}.tk-sw button{width:36px;height:36px;border-radius:50%;border:3px solid transparent}.tk-sw button.on{border-color:var(--text)}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="tabrik";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#f43f5e,#fb923c)";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🎂</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}
function chips(list,cur,attr){return '<div class="tk-ch">'+list.map(function(x){return '<button class="tk-c'+(x[0]===cur?' on':'')+'" data-'+attr+'="'+x[0]+'">'+esc(x[1])+'</button>'}).join("")+'</div>'}
function draw(keep){
  var rels=Object.keys(UI.uz.r).map(function(k){return [k,pr("r",k)]}),tones=Object.keys(UI.uz.t).map(function(k){return [k,pr("t",k)]});
  var h='<button class="back" id="tb0">← '+T[LANG].back+'</button><div class="card"><h2>'+p("title")+'</h2>'+
   '<div class="tk-l">'+p("who")+'</div>'+chips(rels,S.rel,"r")+
   '<div class="tk-l">'+p("name")+'</div><input class="tk-in" id="tn" placeholder="'+p("ph")+'" value="'+esc(S.name)+'">'+
   '<div class="tk-l">'+p("age")+'</div><input class="tk-in" id="ta" type="number" inputmode="numeric" min="1" max="120" value="'+esc(S.age)+'">'+
   '<div class="tk-l">'+p("tone")+'</div>'+chips(tones,S.tone,"t")+
   '<div class="tk-l">'+p("form")+'</div>'+chips([["0",p("sen")],["1",p("siz")]],S.siz?"1":"0","f")+
   '<button class="tk-b" id="tg">'+p("make")+'</button>';
  if(S.text){
    h+='<textarea class="tk-ta" id="tt">'+esc(S.text)+'</textarea><button class="tk-b l" id="tg2">🔄 '+p("another")+'</button>'+
     '<div class="tk-r"><button class="tk-b" id="tcp">'+p("copy")+'</button><button class="tk-b" id="tsh">'+p("share")+'</button></div>'+
     '<div class="tk-l" id="tcard">'+p("card")+'</div><div class="tk-sw">'+THEMES.map(function(t,i){return '<button data-th="'+i+'" class="'+(i===S.theme?'on':'')+'" style="background:linear-gradient(135deg,'+t[0]+','+t[1]+')" title="'+pr("th",i)+'"></button>'}).join("")+'</div>'+
     '<button class="tk-b l" id="tmc">🖼️ '+p("card")+'</button>';
    if(S.out)h+='<img class="tk-img" src="'+S.out.url+'" alt=""><div class="tk-r"><button class="tk-b" id="tdl">'+p("dl")+'</button>'+((navigator.share&&typeof File!=="undefined")?'<button class="tk-b" id="tis">'+p("shr")+'</button>':'')+'</div><div class="sub" style="margin:10px 0 0">'+p("hint")+'</div>';
  }
  h+='</div>';sec.innerHTML=h;
  function on(sel,fn){var bs=sec.querySelectorAll(sel);for(var i=0;i<bs.length;i++)(function(b){b.addEventListener("click",function(e){fn(b,e)})})(bs[i])}
  $("tb0").addEventListener("click",function(){show("home")});
  on("[data-r]",function(b){S.rel=b.getAttribute("data-r");S.siz=!!SIZ0[S.rel];S.text="";S.out=null;draw()});
  on("[data-t]",function(b){S.tone=b.getAttribute("data-t");S.text="";S.out=null;draw()});
  on("[data-f]",function(b){S.siz=b.getAttribute("data-f")==="1";S.text="";S.out=null;draw()});
  on("[data-th]",function(b){S.theme=+b.getAttribute("data-th");draw()});
  $("tn").addEventListener("input",function(){S.name=this.value});
  $("ta").addEventListener("input",function(){S.age=this.value});
  function mk(){S.text=gen();S.out=null;draw()}
  $("tg").addEventListener("click",mk);
  var t2=$("tg2");if(t2)t2.addEventListener("click",mk);
  var tt=$("tt");if(tt)tt.addEventListener("input",function(){S.text=this.value});
  var cp=$("tcp");if(cp)cp.addEventListener("click",function(){copy(S.text,cp)});
  var sh=$("tsh");if(sh)sh.addEventListener("click",function(){shareText(S.text)});
  var mc=$("tmc");if(mc)mc.addEventListener("click",makeCard);
  var dl=$("tdl");if(dl)dl.addEventListener("click",function(){var a=document.createElement("a");a.href=S.out.url;a.download="tabrik.jpg";document.body.appendChild(a);a.click();document.body.removeChild(a)});
  var is=$("tis");if(is)is.addEventListener("click",function(){try{var f=new File([S.out.blob],"tabrik.jpg",{type:"image/jpeg"});if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f]}).catch(function(){});return}}catch(e){}dl&&dl.click()});
}
function copy(t,btn){
  function ok(){var o=btn.textContent;btn.textContent=p("copied");setTimeout(function(){btn.textContent=p("copy")},1500)}
  try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,fb);return}}catch(e){}
  fb();
  function fb(){var ta=document.createElement("textarea");ta.value=t;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");ok()}catch(e){}document.body.removeChild(ta)}
}
function shareText(t){
  var u="https://t.me/share/url?url="+encodeURIComponent(" ")+"&text="+encodeURIComponent(t);
  try{if(window.Telegram&&Telegram.WebApp&&Telegram.WebApp.openTelegramLink){Telegram.WebApp.openTelegramLink(u);return}}catch(e){}
  window.open(u,"_blank");
}
tile.addEventListener("click",function(){S.siz=!!SIZ0[S.rel];draw();show("tabrik")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();S.text="";S.out=null;if(sec.classList.contains("on"))draw()})}
updTile();draw();
})();
