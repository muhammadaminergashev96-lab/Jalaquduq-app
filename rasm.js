(function(){
var MPB=window.MP_BASE||"https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1.1675465747/";

var P={
 uz:{tile:"Rasm",tileS:"4K, fon, retro",title:"Rasm montaj",
  k4:"4K sifat",k4d:"Rasmni 4K o‘lchamgacha kattalashtiradi",
  bg:"Orqa fon",bgd:"Manzara yoki Ka’ba fonini qo‘yadi",
  re:"Retro",red:"Eski plyonka uslubida",
  pick:"Rasm tanlash",other:"Boshqa rasm tanlash",make:"Tayyorlash",busy:"Ishlanmoqda…",dl:"Yuklab olish",shr:"Ulashish",
  n4:"Rasm 3840 px gacha kattalashtiriladi va aniqroq qilinadi. Rasmda yo‘q mayda detallar tiklanmaydi.",
  nbg:"Odam aniq ko‘rinib turgan rasm eng yaxshi chiqadi. Birinchi marta kerakli fayl yuklanadi, bir necha soniya kuting.",
  chBg:"Fonni tanlang",chRe:"Uslubni tanlang",hint:"Yuklab olinmasa, rasmni brauzerda oching:",ext:"Brauzerda ochish",
  eSeg:"Odamni ajratish moduli yuklanmadi. Internetni tekshirib, qayta urinib ko‘ring.",eGen:"Xatolik yuz berdi. Boshqa rasm bilan urinib ko‘ring.",size:"O‘lcham"},
 ru:{tile:"Фото",tileS:"4K, фон, ретро",title:"Фото-монтаж",
  k4:"Качество 4K",k4d:"Увеличивает фото до размера 4K",
  bg:"Фон",bgd:"Ставит фон: пейзаж или Кааба",
  re:"Ретро",red:"В стиле старой плёнки",
  pick:"Выбрать фото",other:"Выбрать другое фото",make:"Готовить",busy:"Обработка…",dl:"Скачать",shr:"Поделиться",
  n4:"Фото увеличивается до 3840 px и становится чётче. Мелкие детали, которых нет на фото, не восстанавливаются.",
  nbg:"Лучше всего получаются фото, где хорошо виден человек. При первом запуске загружается нужный файл, подождите несколько секунд.",
  chBg:"Выберите фон",chRe:"Выберите стиль",hint:"Если не скачивается, откройте приложение в браузере:",ext:"Открыть в браузере",
  eSeg:"Не загрузился модуль выделения человека. Проверьте интернет и попробуйте ещё раз.",eGen:"Произошла ошибка. Попробуйте другое фото.",size:"Размер"}
};
var BGN=[["Quyosh botishi, tog‘lar","Закат в горах"],["Ko‘l va tog‘lar","Озеро и горы"],["Yashil vodiy","Зелёная долина"],["Tungi osmon","Ночное небо"],["Sahro","Пустыня"],["Ka’ba","Кааба"]];
var REN=[["Film (90-yillar)","Плёнка 90-х"],["VHS kassetasi","VHS-кассета"],["Polaroid","Полароид"],["Eski qora-oq","Старое чёрно-белое"]];

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
function nm(a){return LANG==="ru"?a[1]:tr(a[0])}
function pad(n){return (n<10?"0":"")+n}
function $(id){return document.getElementById(id)}

/* ---------- canvas yordamchilari ---------- */
function cv(w,h){var c=document.createElement("canvas");c.width=Math.max(1,w);c.height=Math.max(1,h);return c}
function dim(o){return {w:o.naturalWidth||o.width,h:o.naturalHeight||o.height}}
function ctx2(c){var x=c.getContext("2d");x.imageSmoothingEnabled=true;x.imageSmoothingQuality="high";return x}
function resize(src,tw,th){
  var d=dim(src),cw=d.w,ch=d.h,cur=src;
  for(var n=0;n<30&&(cw!==tw||ch!==th);n++){
    var nw,nh;
    if(tw>cw){nw=Math.min(tw,Math.round(cw*1.5));nh=Math.min(th,Math.round(ch*1.5))}
    else{nw=Math.max(tw,Math.round(cw*.5));nh=Math.max(th,Math.round(ch*.5))}
    if(nw===tw||nh===th){nw=tw;nh=th}
    var c=cv(nw,nh);ctx2(c).drawImage(cur,0,0,nw,nh);
    cur=c;cw=nw;ch=nh;
  }
  if(cur===src){var c2=cv(tw,th);ctx2(c2).drawImage(src,0,0,tw,th);cur=c2}
  return cur;
}
function fit(src,maxLong){
  var d=dim(src),s=Math.min(1,maxLong/Math.max(d.w,d.h));
  return resize(src,Math.round(d.w*s),Math.round(d.h*s));
}
function sharpen(cn,a){
  var w=cn.width,h=cn.height,x=cn.getContext("2d"),id=x.getImageData(0,0,w,h),d=id.data,s=new Uint8ClampedArray(d),k=1+4*a,st=w*4;
  for(var y=1;y<h-1;y++){
    for(var px=1;px<w-1;px++){
      var o=(y*w+px)*4;
      d[o]=s[o]*k-a*(s[o-4]+s[o+4]+s[o-st]+s[o+st]);
      d[o+1]=s[o+1]*k-a*(s[o-3]+s[o+5]+s[o+1-st]+s[o+1+st]);
      d[o+2]=s[o+2]*k-a*(s[o-2]+s[o+6]+s[o+2-st]+s[o+2+st]);
    }
  }
  x.putImageData(id,0,0);
}

/* ---------- 4K ---------- */
function do4k(img){
  var d=dim(img),s=3840/Math.max(d.w,d.h),tw=Math.round(d.w*s),th=Math.round(d.h*s);
  var out=resize(img,tw,th);
  sharpen(out,s>1?.55:.25);
  return out;
}

/* ---------- orqa fonlar (hammasi canvasda chiziladi) ---------- */
function grad(c,x0,y0,x1,y1,st){var g=c.createLinearGradient(x0,y0,x1,y1);for(var i=0;i<st.length;i++)g.addColorStop(st[i][0],st[i][1]);return g}
function rnd(seed){var s=seed;return function(){s=(s*16807)%2147483647;return (s-1)/2147483646}}
function ridge(c,w,h,base,amp,seed,col,smooth){
  var r=rnd(seed),a=r()*6,b=r()*6,e=r()*6,st=Math.max(2,w/180);
  c.beginPath();c.moveTo(0,h);
  for(var x=0;x<=w+st;x+=st){
    var t=x/w,v;
    if(smooth)v=(Math.sin(t*3.2+a)*.5+Math.sin(t*7+b)*.3+Math.sin(t*13+e)*.2)*.5+.5;
    else v=Math.abs(Math.sin(t*4+a))*.6+Math.abs(Math.sin(t*9+b))*.3+Math.abs(Math.sin(t*19+e))*.1;
    c.lineTo(x,base-amp*v);
  }
  c.lineTo(w+st,h);c.closePath();c.fillStyle=col;c.fill();
}
function glow(c,x,y,r,col0,col1){var g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col0);g.addColorStop(1,col1);c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2)}
function clouds(c,w,h,top,seed,alpha){
  var r=rnd(seed);c.fillStyle="rgba(255,255,255,"+alpha+")";
  for(var i=0;i<6;i++){
    var cx=r()*w,cy=top+r()*h*.18,s=h*(.04+r()*.04);
    for(var j=0;j<5;j++){c.beginPath();c.ellipse(cx+j*s*.9,cy+Math.sin(j*1.7)*s*.25,s*1.5,s*.7,0,0,7);c.fill()}
  }
}
var BG=[
function(c,w,h,f){
  c.fillStyle=grad(c,0,0,0,h,[[0,"#2b1b4e"],[.45,"#b8407a"],[.7,"#ff8a4c"],[1,"#ffd27a"]]);c.fillRect(0,0,w,h);
  var sx=w*f,sy=h*.58,r=h*.07;
  glow(c,sx,sy,r*6,"rgba(255,235,180,.9)","rgba(255,150,80,0)");
  c.fillStyle="#fff3c4";c.beginPath();c.arc(sx,sy,r,0,7);c.fill();
  ridge(c,w,h,h*.64,h*.16,3,"#7a3b7a");ridge(c,w,h,h*.76,h*.14,7,"#4d2a62");ridge(c,w,h,h*.88,h*.12,11,"#2c1b44");
},
function(c,w,h,f){
  var hz=h*.6;
  c.fillStyle=grad(c,0,0,0,hz,[[0,"#4f9fe0"],[1,"#d8f0ff"]]);c.fillRect(0,0,w,h);
  clouds(c,w,h,h*.06,9,.8);
  ridge(c,w,hz,hz,h*.2,5,"#8aa6c8");ridge(c,w,hz,hz,h*.12,13,"#5f82ad");
  c.fillStyle=grad(c,0,hz,0,h,[[0,"#9fd3ee"],[1,"#2a7ba6"]]);c.fillRect(0,hz,w,h-hz);
  c.save();c.beginPath();c.rect(0,hz,w,h-hz);c.clip();c.translate(0,2*hz);c.scale(1,-1);c.globalAlpha=.35;
  ridge(c,w,hz,hz,h*.2,5,"#8aa6c8");ridge(c,w,hz,hz,h*.12,13,"#5f82ad");c.restore();
  ridge(c,w,h,h*.98,h*.06,19,"#1e5a3a");
},
function(c,w,h,f){
  c.fillStyle=grad(c,0,0,0,h*.7,[[0,"#3b96ee"],[1,"#d4f0ff"]]);c.fillRect(0,0,w,h);
  glow(c,w*f,h*.18,h*.35,"rgba(255,255,220,.8)","rgba(255,255,220,0)");
  clouds(c,w,h,h*.08,4,.85);
  ridge(c,w,h,h*.62,h*.14,2,"#a8dc7a",true);ridge(c,w,h,h*.74,h*.14,6,"#6fbd58",true);ridge(c,w,h,h*.9,h*.12,8,"#3f8f40",true);
},
function(c,w,h,f){
  c.fillStyle=grad(c,0,0,0,h,[[0,"#050a1c"],[.7,"#16275a"],[1,"#2a3f7a"]]);c.fillRect(0,0,w,h);
  var r=rnd(5),k=Math.max(1,w/900);
  for(var i=0;i<190;i++){var x=r()*w,y=r()*h*.7,s=(.5+r()*1.4)*k;c.fillStyle="rgba(255,255,255,"+(.3+r()*.7)+")";c.beginPath();c.arc(x,y,s,0,7);c.fill()}
  var mx=w*f,my=h*.22,mr=h*.06;
  glow(c,mx,my,mr*5,"rgba(230,235,255,.55)","rgba(230,235,255,0)");
  c.fillStyle="#f3f0dc";c.beginPath();c.arc(mx,my,mr,0,7);c.fill();
  c.fillStyle="rgba(190,185,160,.5)";c.beginPath();c.arc(mx-mr*.3,my-mr*.2,mr*.22,0,7);c.fill();c.beginPath();c.arc(mx+mr*.35,my+mr*.3,mr*.15,0,7);c.fill();
  ridge(c,w,h,h*.78,h*.16,12,"#0c1530");ridge(c,w,h,h*.92,h*.12,15,"#050914");
},
function(c,w,h,f){
  c.fillStyle=grad(c,0,0,0,h,[[0,"#f2994a"],[.5,"#ffd9a0"],[1,"#fff1d6"]]);c.fillRect(0,0,w,h);
  var sx=w*f,sy=h*.45,r=h*.06;
  glow(c,sx,sy,r*7,"rgba(255,245,200,.9)","rgba(255,200,120,0)");
  c.fillStyle="#fffbe6";c.beginPath();c.arc(sx,sy,r,0,7);c.fill();
  ridge(c,w,h,h*.62,h*.1,21,"#ebba74",true);ridge(c,w,h,h*.75,h*.12,23,"#d99a4b",true);ridge(c,w,h,h*.9,h*.1,25,"#b97934",true);
},
function(c,w,h,f){
  c.fillStyle=grad(c,0,0,0,h*.7,[[0,"#0b1d3a"],[.55,"#34568a"],[1,"#f2b479"]]);c.fillRect(0,0,w,h);
  var r=rnd(8),k=Math.max(1,w/900);
  for(var i=0;i<60;i++){c.fillStyle="rgba(255,255,255,"+(.2+r()*.5)+")";c.beginPath();c.arc(r()*w,r()*h*.3,(.5+r())*k,0,7);c.fill()}
  var by=h*.76,H=Math.min(h*.34,w*.42),Wf=H*.95,Ws=H*.5,cx=w*f;
  var x0=cx-(Wf+Ws)/2,x1=x0+Wf,x2=x1+Ws;
  var mx;
  for(var m=0;m<2;m++){
    mx=m?Math.min(w*.94,x2+H*.9):Math.max(w*.06,x0-H*.9);
    var mh=H*1.15,mw=H*.07;
    c.fillStyle="#1c2a47";c.fillRect(mx-mw/2,by-mh,mw,mh);
    c.beginPath();c.moveTo(mx-mw*.8,by-mh);c.lineTo(mx+mw*.8,by-mh);c.lineTo(mx,by-mh-H*.2);c.closePath();c.fill();
    c.fillRect(mx-mw,by-mh*.7,mw*2,mw*.5);
  }
  c.fillStyle=grad(c,0,by-H*.15,0,h,[[0,"#efe8d8"],[1,"#b8ae98"]]);c.fillRect(0,by-H*.02,w,h-by+H*.02);
  c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=Math.max(1,w/500);
  for(var q=1;q<4;q++){c.beginPath();c.ellipse(cx+Wf*.1,by+H*.05,Wf*(.75+q*.55),H*(.08+q*.07),0,0,7);c.stroke()}
  glow(c,cx,by-H*.5,H*2,"rgba(255,200,120,.35)","rgba(255,200,120,0)");
  c.fillStyle="rgba(0,0,0,.28)";c.beginPath();c.ellipse(cx+Wf*.1,by+H*.025,(Wf+Ws)*.62,H*.06,0,0,7);c.fill();
  function sy(fr,t){var nt=by-H,nb=by,ft=by-H*.94,fb=by-H*.03;return (nt+(nb-nt)*fr)*(1-t)+(ft+(fb-ft)*fr)*t}
  c.fillStyle=grad(c,x0,0,x1,0,[[0,"#151515"],[1,"#262626"]]);
  c.beginPath();c.moveTo(x0,by-H);c.lineTo(x1,by-H);c.lineTo(x1,by);c.lineTo(x0,by);c.closePath();c.fill();
  c.fillStyle="#0a0a0a";
  c.beginPath();c.moveTo(x1,sy(0,0));c.lineTo(x2,sy(0,1));c.lineTo(x2,sy(1,1));c.lineTo(x1,sy(1,0));c.closePath();c.fill();
  var gold=grad(c,x0,0,x2,0,[[0,"#f6d77a"],[.5,"#d4a017"],[1,"#8a6508"]]);
  c.fillStyle=gold;c.fillRect(x0,by-H*.82,Wf,H*.1);
  c.beginPath();c.moveTo(x1,sy(.18,0));c.lineTo(x2,sy(.18,1));c.lineTo(x2,sy(.28,1));c.lineTo(x1,sy(.28,0));c.closePath();c.fill();
  c.fillStyle="rgba(90,60,0,.55)";
  for(var d=0;d<14;d++){c.fillRect(x0+Wf*(.05+d*.065),by-H*.8,Wf*.035,H*.06)}
  c.fillStyle=gold;c.fillRect(x0+Wf*.6,by-H*.46,Wf*.2,H*.4);
  c.fillStyle="#1a1204";c.fillRect(x0+Wf*.63,by-H*.43,Wf*.14,H*.34);
  c.fillStyle=gold;c.fillRect(x0,by-H*.69,Wf,H*.012);
}
];

/* ---------- retro ---------- */
function vig(x,w,h,s){
  var g=x.createRadialGradient(w/2,h/2,Math.min(w,h)*.3,w/2,h/2,Math.hypot(w,h)*.55);
  g.addColorStop(0,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(0,0,0,"+s+")");x.fillStyle=g;x.fillRect(0,0,w,h);
}
function leak(x,w,h){
  x.globalCompositeOperation="screen";
  var g=x.createLinearGradient(0,0,w*.4,0);g.addColorStop(0,"rgba(255,110,40,.5)");g.addColorStop(1,"rgba(255,110,40,0)");x.fillStyle=g;x.fillRect(0,0,w,h);
  var g2=x.createRadialGradient(w,0,0,w,0,w*.35);g2.addColorStop(0,"rgba(255,200,90,.35)");g2.addColorStop(1,"rgba(255,200,90,0)");x.fillStyle=g2;x.fillRect(0,0,w,h);
  x.globalCompositeOperation="source-over";
}
function grade(cn,sat,mul,add,rm,bm,noise){
  var w=cn.width,h=cn.height,x=cn.getContext("2d"),id=x.getImageData(0,0,w,h),d=id.data;
  for(var i=0;i<d.length;i+=4){
    var r=d[i],g=d[i+1],b=d[i+2],l=.299*r+.587*g+.114*b;
    r=l+(r-l)*sat;g=l+(g-l)*sat;b=l+(b-l)*sat;
    r=r*mul+add;g=g*mul+add*.85;b=b*mul+add*.6;
    r*=rm;b*=bm;
    var n=(Math.random()-.5)*noise;
    d[i]=r+n;d[i+1]=g+n;d[i+2]=b+n;
  }
  x.putImageData(id,0,0);
}
function stamp(x,w,h,txt){
  var fs=Math.round(Math.min(w,h)*.04);
  x.font="bold "+fs+"px monospace";x.textAlign="right";x.textBaseline="bottom";
  x.shadowColor="rgba(255,120,0,.8)";x.shadowBlur=fs*.3;x.fillStyle="#ff9a3c";x.fillText(txt,w-fs,h-fs);
  x.shadowBlur=0;x.shadowColor="transparent";
}
function reFilm(cn){
  var w=cn.width,h=cn.height,x=cn.getContext("2d");
  grade(cn,.78,.86,28,1.07,.9,30);leak(x,w,h);vig(x,w,h,.5);
  var n=new Date();stamp(x,w,h,pad(n.getDate())+" "+pad(n.getMonth()+1)+" ’98");
  return cn;
}
function reVhs(cn){
  var w=cn.width,h=cn.height,x=cn.getContext("2d"),id=x.getImageData(0,0,w,h),d=id.data,s=new Uint8ClampedArray(d),sh=Math.max(2,Math.round(w/300));
  for(var y=0;y<h;y++){
    var row=y*w;
    for(var px=0;px<w;px++){
      var o=(row+px)*4,xr=px-sh<0?0:px-sh,xb=px+sh>=w?w-1:px+sh;
      var r=s[(row+xr)*4],g=s[o+1],b=s[(row+xb)*4+2],l=.299*r+.587*g+.114*b,n=(Math.random()-.5)*34;
      r=l+(r-l)*1.25;g=l+(g-l)*1.25;b=l+(b-l)*1.25;
      d[o]=(r-128)*1.08+128+n;d[o+1]=(g-128)*1.08+128+n;d[o+2]=(b-128)*1.08+128+n;
    }
  }
  x.putImageData(id,0,0);
  var t=cv(Math.round(w*.5),Math.round(h*.5));ctx2(t).drawImage(cn,0,0,t.width,t.height);
  x.globalAlpha=.3;x.drawImage(t,0,0,w,h);x.globalAlpha=1;
  var st=Math.max(3,Math.round(h/300));x.fillStyle="rgba(0,0,0,.2)";
  for(var yy=0;yy<h;yy+=st)x.fillRect(0,yy,w,Math.max(1,st/3));
  x.fillStyle="rgba(255,255,255,.1)";x.fillRect(0,h*(.55+Math.random()*.3),w,h*.025);
  var fs=Math.round(Math.min(w,h)*.045),m=fs;
  x.fillStyle="#fff";x.shadowColor="#000";x.shadowBlur=fs*.2;x.shadowOffsetX=fs*.06;x.shadowOffsetY=fs*.06;
  x.beginPath();x.moveTo(m,m);x.lineTo(m,m+fs);x.lineTo(m+fs*.85,m+fs/2);x.closePath();x.fill();
  x.font="bold "+fs+"px monospace";x.textAlign="left";x.textBaseline="top";x.fillText("PLAY",m+fs*1.2,m+fs*.05);
  x.textBaseline="bottom";var n=new Date();x.fillText(pad(n.getDate())+"."+pad(n.getMonth()+1)+".1998",m,h-m);
  x.shadowBlur=0;x.shadowOffsetX=0;x.shadowOffsetY=0;x.shadowColor="transparent";
  return cn;
}
function rePol(cn){
  var w=cn.width,h=cn.height;
  grade(cn,.85,.92,22,1.05,.93,16);vig(cn.getContext("2d"),w,h,.25);
  var m=Math.round(Math.max(w,h)*.05),bs=Math.round(w*.05),bb=Math.round(w*.2);
  var pw=w+bs*2,ph=h+bs+bb,out=cv(pw+m*2,ph+m*2),x=out.getContext("2d");
  x.fillStyle="#cfc8b8";x.fillRect(0,0,out.width,out.height);
  x.shadowColor="rgba(0,0,0,.4)";x.shadowBlur=m*.6;x.shadowOffsetY=m*.2;
  x.fillStyle="#f7f3e8";x.fillRect(m,m,pw,ph);
  x.shadowBlur=0;x.shadowOffsetY=0;x.shadowColor="transparent";
  x.drawImage(cn,m+bs,m+bs);
  var fs=Math.round(bb*.3);x.font="italic "+fs+"px 'Segoe Script','Bradley Hand','Comic Sans MS',cursive";
  x.textAlign="center";x.textBaseline="middle";x.fillStyle="#3b3b3b";x.fillText("Jalaquduq ovozi",m+pw/2,m+ph-bb*.45);
  return out;
}
function reBw(cn){
  var w=cn.width,h=cn.height,x=cn.getContext("2d"),id=x.getImageData(0,0,w,h),d=id.data;
  for(var i=0;i<d.length;i+=4){
    var l=.299*d[i]+.587*d[i+1]+.114*d[i+2];
    l=(l-128)*1.18+138+(Math.random()-.5)*40;
    d[i]=l*1.02;d[i+1]=l;d[i+2]=l*.94;
  }
  x.putImageData(id,0,0);vig(x,w,h,.6);
  x.strokeStyle="rgba(255,255,255,.22)";x.lineWidth=Math.max(1,w/1500);
  for(var s=0;s<14;s++){var sx=Math.random()*w,y0=Math.random()*h*.8,y1=y0+Math.random()*h*.4;x.beginPath();x.moveTo(sx,y0);x.lineTo(sx+(Math.random()*6-3),y1);x.stroke()}
  for(var k=0;k<70;k++){x.fillStyle=Math.random()<.5?"rgba(255,255,255,.5)":"rgba(0,0,0,.45)";x.beginPath();x.arc(Math.random()*w,Math.random()*h,Math.random()*Math.max(1.5,w/600),0,7);x.fill()}
  return cn;
}
var RE=[reFilm,reVhs,rePol,reBw];
function doRetro(img,i){
  var base=fit(img,i===2?1800:2400);
  var c=cv(base.width,base.height);c.getContext("2d").drawImage(base,0,0);
  return RE[i](c);
}

/* ---------- orqa fon: odamni ajratish ---------- */
var segP=null;
function loadSeg(){
  if(segP)return segP;
  segP=new Promise(function(res,rej){
    function init(){
      try{
        var sg=new window.SelfieSegmentation({locateFile:function(f){return MPB+f}});
        sg.setOptions({modelSelection:0});
        var pr=sg.initialize?sg.initialize():Promise.resolve();
        pr.then(function(){res(sg)}).catch(rej);
      }catch(e){rej(e)}
    }
    if(window.SelfieSegmentation){init();return}
    var s=document.createElement("script");s.src=MPB+"selfie_segmentation.js";
    s.onload=init;s.onerror=function(){rej(new Error("load"))};
    document.head.appendChild(s);
  });
  segP.catch(function(){segP=null});
  return segP;
}
function segment(sg,cn){
  return new Promise(function(res,rej){
    sg.onResults(function(r){res(r.segmentationMask)});
    var pr=sg.send({image:cn});if(pr&&pr.catch)pr.catch(rej);
  });
}
function composite(base,mask,bi){
  var w=base.width,h=base.height,mc=cv(w,h),mx=ctx2(mc);
  mx.drawImage(mask,0,0,w,h);
  var md=mx.getImageData(0,0,w,h).data,minA=255,i;
  for(i=3;i<md.length;i+=388){if(md[i]<minA)minA=md[i]}
  var useR=minA>250;
  var pc=cv(w,h),px=pc.getContext("2d");px.drawImage(base,0,0);
  var pd=px.getImageData(0,0,w,h),d=pd.data,sx=0,sw=0;
  for(var o=0,q=0;o<d.length;o+=4,q++){
    var a=(useR?md[o]:md[o+3])/255;
    a=a<.3?0:a>.7?1:(a-.3)/.4;a=a*a*(3-2*a);
    d[o+3]=a*255;
    if(a>.5&&q%7===0){sx+=q%w;sw++}
  }
  px.putImageData(pd,0,0);
  var cx=sw>50?sx/sw/w:.5,focus=cx<.5?.72:.28;
  var out=cv(w,h),ox=out.getContext("2d");BG[bi](ox,w,h,focus);ox.drawImage(pc,0,0);
  return out;
}
function doBg(img,bi){
  var base=fit(img,2400);
  return loadSeg().catch(function(){var e=new Error("seg");e.seg=true;throw e}).then(function(sg){
    return segment(sg,fit(base,1024));
  }).then(function(mask){return composite(base,mask,bi)});
}

/* ---------- interfeys ---------- */
var S={sub:null,src:null,img:null,bg:0,re:0,busy:false,err:"",out:null};
var css=document.createElement("style");
css.textContent=".t8{background:linear-gradient(135deg,#d6336c,#7048e8)}.rr{display:flex;align-items:center;gap:12px;width:100%;padding:14px;border-radius:14px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;font-weight:600;margin-bottom:8px;text-align:left;font-family:inherit}.rr .e{font-size:26px}.rbtn{display:block;width:100%;text-align:center;padding:13px;border-radius:12px;background:var(--accbg);color:var(--acc);font-size:16px;font-weight:700;margin:10px 0;font-family:inherit}.rmk{display:block;width:100%;padding:14px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-size:16px;font-weight:700;margin-top:8px;font-family:inherit}.rmk:disabled{opacity:.5}.rimg{display:block;width:100%;max-height:420px;object-fit:contain;border-radius:12px;margin:10px 0;background:var(--bg)}.rch{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}.rc{border:2px solid var(--line);border-radius:12px;background:var(--bg);color:var(--text);padding:6px;font-size:13px;font-weight:600;font-family:inherit;text-align:center}.rc img{display:block;width:100%;border-radius:8px;margin-bottom:5px}.rc.on{border-color:var(--acc);color:var(--acc)}.rrow{display:flex;gap:8px}.rrow button{flex:1}";
document.head.appendChild(css);

var sec=document.createElement("div");sec.className="sec";sec.id="rasm";
document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile t8";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🖼️</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}

var thumbs=[];
function thumb(i){
  if(!thumbs[i]){var c=cv(160,100);BG[i](c.getContext("2d"),160,100,.5);thumbs[i]=c.toDataURL("image/jpeg",.8)}
  return thumbs[i];
}
function reset(){
  if(S.src)try{URL.revokeObjectURL(S.src)}catch(e){}
  if(S.out)try{URL.revokeObjectURL(S.out.url)}catch(e){}
  S.src=null;S.img=null;S.out=null;S.err="";S.busy=false;
}
function draw(){
  var h='<button class="back" id="rb">← '+T[LANG].back+'</button>';
  if(S.sub===null){
    h+='<div class="card"><h2>'+p("title")+'</h2>'+[["k4","🔍"],["bg","🏞️"],["re","📼"]].map(function(x){
      return '<button class="rr" data-s="'+x[0]+'"><span class="e">'+x[1]+'</span><span>'+p(x[0])+'<div class="sub" style="margin:2px 0 0;font-weight:400">'+p(x[0]+"d")+'</div></span></button>';
    }).join("")+'</div>';
  }else{
    h+='<div class="card"><h2>'+p(S.sub)+'</h2>';
    if(S.sub==="k4")h+='<div class="sub" style="margin:0">'+p("n4")+'</div>';
    if(S.sub==="bg"){
      h+='<div class="sub" style="margin:0">'+p("nbg")+'</div><h2 style="margin:14px 0 0">'+p("chBg")+'</h2><div class="rch">'+
        BGN.map(function(n,i){return '<button class="rc'+(i===S.bg?' on':'')+'" data-bg="'+i+'"><img src="'+thumb(i)+'" alt="">'+nm(n)+'</button>'}).join("")+'</div>';
    }
    if(S.sub==="re"){
      h+='<h2 style="margin:14px 0 0">'+p("chRe")+'</h2><div class="rch">'+
        REN.map(function(n,i){return '<button class="rc'+(i===S.re?' on':'')+'" data-re="'+i+'">'+nm(n)+'</button>'}).join("")+'</div>';
    }
    h+='<label class="rbtn">'+(S.src?p("other"):p("pick"))+'<input type="file" accept="image/*" id="rf" hidden></label>';
    if(S.src&&!S.out)h+='<img class="rimg" src="'+S.src+'" alt="">';
    h+='<button class="rmk" id="rm"'+((!S.img||S.busy)?' disabled':'')+'>'+(S.busy?p("busy"):p("make"))+'</button>';
    if(S.err)h+='<div class="sub" style="margin:10px 0 0;color:var(--dn)">'+p(S.err)+'</div>';
    if(S.out){
      h+='<img class="rimg" src="'+S.out.url+'" alt=""><div class="sub" style="margin:0 0 8px">'+p("size")+': '+S.out.w+' × '+S.out.h+'</div>'+
        '<div class="rrow"><button class="rmk" id="rd">'+p("dl")+'</button>'+((navigator.share&&typeof File!=="undefined")?'<button class="rmk" id="rs">'+p("shr")+'</button>':'')+'</div>'+
        '<div class="sub" style="margin:10px 0 0">'+p("hint")+' <a href="#" id="rx">'+p("ext")+'</a></div>';
    }
    h+='</div>';
  }
  sec.innerHTML=h;
  $("rb").addEventListener("click",function(){show("home")});
  function on(sel,fn){var bs=sec.querySelectorAll(sel);for(var i=0;i<bs.length;i++)(function(b){b.addEventListener("click",function(e){fn(b,e)})})(bs[i])}
  on("[data-s]",function(b){S.sub=b.getAttribute("data-s");draw();window.scrollTo(0,0)});
  on("[data-bg]",function(b){S.bg=+b.getAttribute("data-bg");draw()});
  on("[data-re]",function(b){S.re=+b.getAttribute("data-re");draw()});
  var rf=$("rf");if(rf)rf.addEventListener("change",function(){pickFile(rf.files&&rf.files[0])});
  var rm=$("rm");if(rm)rm.addEventListener("click",run);
  var rd=$("rd");if(rd)rd.addEventListener("click",download);
  var rs=$("rs");if(rs)rs.addEventListener("click",share);
  var rx=$("rx");if(rx)rx.addEventListener("click",function(e){e.preventDefault();var u=location.href.split("#")[0];try{if(tg&&tg.openLink){tg.openLink(u);return}}catch(er){}window.open(u,"_blank")});
}
function pickFile(f){
  if(!f)return;
  var sub=S.sub;reset();S.sub=sub;
  var u=URL.createObjectURL(f),im=new Image();
  im.onload=function(){S.src=u;S.img=im;draw()};
  im.onerror=function(){try{URL.revokeObjectURL(u)}catch(e){}S.err="eGen";draw()};
  im.src=u;
}
function finish(cn){
  return new Promise(function(res,rej){
    cn.toBlob(function(b){
      if(!b){rej(new Error("blob"));return}
      if(S.out)try{URL.revokeObjectURL(S.out.url)}catch(e){}
      S.out={url:URL.createObjectURL(b),blob:b,w:cn.width,h:cn.height,name:"jalaquduq-"+S.sub+".jpg"};res();
    },"image/jpeg",.92);
  });
}
function run(){
  if(!S.img||S.busy)return;
  if(S.out){try{URL.revokeObjectURL(S.out.url)}catch(e){}S.out=null}S.busy=true;S.err="";draw();
  setTimeout(function(){
    var pr;
    try{
      if(S.sub==="k4")pr=Promise.resolve(do4k(S.img));
      else if(S.sub==="re")pr=Promise.resolve(doRetro(S.img,S.re));
      else pr=doBg(S.img,S.bg);
    }catch(e){pr=Promise.reject(e)}
    pr.then(finish).catch(function(e){S.out=null;S.err=(e&&e.seg)?"eSeg":"eGen"}).then(function(){S.busy=false;draw()});
  },80);
}
function download(){
  if(!S.out)return;
  var a=document.createElement("a");a.href=S.out.url;a.download=S.out.name;document.body.appendChild(a);a.click();document.body.removeChild(a);
}
function share(){
  if(!S.out)return;
  try{
    var f=new File([S.out.blob],S.out.name,{type:"image/jpeg"});
    if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f]}).catch(function(){});return}
  }catch(e){}
  download();
}

function up(){
  if(S.sub!==null){reset();S.sub=null;return true}
  return false;
}
var _show=show;
show=function(id){
  if(id==="home"&&sec.classList.contains("on")&&up()){draw();window.scrollTo(0,0);return}
  _show(id);
};
tile.addEventListener("click",function(){reset();S.sub=null;draw();show("rasm")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();draw()})}
updTile();draw();
})();
