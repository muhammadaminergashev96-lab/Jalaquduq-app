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
uz:{tile:"Yosh kalkulyatori",tileS:"Necha yoshdasiz?",title:"Yosh kalkulyatori",lab:"Tug‘ilgan sanangiz",calc:"Hisoblash",ph:"Sanani tanlang",age:"Yoshingiz",y:"yil",m:"oy",d:"kun",tot:"Tug‘ilganingizdan beri o‘tgan vaqt",days:"kun",weeks:"hafta",months:"oy",hours:"soat",next:"Keyingi tug‘ilgan kuningizgacha",today:"Bugun tug‘ilgan kuningiz! 🎉",born:"Tug‘ilgan hafta kuni",zod:"Burjingiz",bad:"Sana noto‘g‘ri yoki kelajakda",enter:"Tug‘ilgan sanangizni tanlang",wd:["Yakshanba","Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"],
 z:["Tog‘ echkisi","Qovg‘a","Baliqlar","Qo‘y","Buzoq","Egizaklar","Qisqichbaqa","Sher","Parizod","Tarozi","Chayon","Mergan"]},
ru:{tile:"Калькулятор возраста",tileS:"Сколько вам лет?",title:"Калькулятор возраста",lab:"Дата рождения",calc:"Рассчитать",ph:"Выберите дату",age:"Ваш возраст",y:"лет",m:"мес.",d:"дн.",tot:"С момента рождения прошло",days:"дней",weeks:"недель",months:"месяцев",hours:"часов",next:"До следующего дня рождения",today:"Сегодня ваш день рождения! 🎉",born:"День недели рождения",zod:"Знак зодиака",bad:"Дата неверна или в будущем",enter:"Выберите дату рождения",wd:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],
 z:["Козерог","Водолей","Рыбы","Овен","Телец","Близнецы","Рак","Лев","Дева","Весы","Скорпион","Стрелец"]}
};
function p(k){return LANG==="ru"?UI.ru[k]:tr(UI.uz[k])}
function pa(k,i){return LANG==="ru"?UI.ru[k][i]:tr(UI.uz[k][i])}
function $(id){return document.getElementById(id)}
function pad(n){return n<10?"0"+n:""+n}
function fmt(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g," ")}
// zodiac index: 0 Capricorn ... by month/day
function zodiac(m,d){
  var e=[20,19,20,20,21,21,22,23,23,23,22,22]; // end day of sign that starts previous month
  // m 1..12; sign index = m-1 if d<e[m-1] else m (mod 12)
  var i=d<e[m-1]?m-1:m;return i%12;
}
function calc(y,mo,d,now){
  var by=y,bm=mo,bd=d,ny=now.getFullYear(),nm=now.getMonth()+1,nd=now.getDate();
  var Y=ny-by,Mm=nm-bm,D=nd-bd;
  if(D<0){Mm--;var pm=new Date(ny,nm-1,0).getDate();D+=pm}
  if(Mm<0){Y--;Mm+=12}
  var t0=Date.UTC(by,bm-1,bd),t1=Date.UTC(ny,nm-1,nd),days=Math.round((t1-t0)/864e5);
  var nb=Date.UTC(ny,bm-1,bd);if(bm===2&&bd===29&&new Date(ny,1,29).getMonth()!==1)nb=Date.UTC(ny,2,1);
  if(nb<t1){var y2=ny+1;nb=Date.UTC(y2,bm-1,bd);if(bm===2&&bd===29&&new Date(y2,1,29).getMonth()!==1)nb=Date.UTC(y2,2,1)}
  return {Y:Y,M:Mm,D:D,days:days,next:Math.round((nb-t1)/864e5),wd:new Date(by,bm-1,bd).getDay(),zi:zodiac(bm,bd),months:Y*12+Mm};
}
var S={v:""};try{S.v=localStorage.getItem("yosh")||""}catch(e){}
var css=document.createElement("style");
css.textContent=".ys-in{width:100%;padding:13px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:17px;font-family:inherit;margin:6px 0 10px;box-sizing:border-box}.ys-b{width:100%;padding:14px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-weight:700;font-size:16px;font-family:inherit}.ys-big{text-align:center;margin:16px 0 6px}.ys-big b{font-size:44px;color:var(--acc);line-height:1}.ys-big span{display:block;color:var(--mut);font-size:14px;margin-top:4px}.ys-sm{text-align:center;font-size:17px;font-weight:700;margin-bottom:12px}.ys-g{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0}.ys-g div{background:var(--accbg);border-radius:12px;padding:12px;text-align:center}.ys-g b{display:block;font-size:18px;color:var(--acc)}.ys-g span{font-size:12px;color:var(--mut)}.ys-r{display:flex;justify-content:space-between;padding:11px 2px;border-top:1px solid var(--line);font-size:15px}.ys-r span{color:var(--mut)}.ys-e{color:var(--dn);text-align:center;margin-top:10px}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="yosh";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#7c3aed,#c084fc)";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🎂</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}
function result(){
  var el=$("ysr");if(!el)return;
  if(!S.v){el.innerHTML="";return}
  var a=S.v.split("-"),y=+a[0],m=+a[1],d=+a[2],now=new Date(),t=new Date(y,m-1,d);
  if(!y||y<1900||t.getMonth()!==m-1||t>now){el.innerHTML='<div class="ys-e">'+p("bad")+'</div>';return}
  try{localStorage.setItem("yosh",S.v)}catch(e){}
  var r=calc(y,m,d,now);
  el.innerHTML='<div class="ys-big"><b>'+r.Y+'</b><span>'+p("age")+' · '+r.Y+' '+p("y")+' '+r.M+' '+p("m")+' '+r.D+' '+p("d")+'</span></div>'+
  '<div class="ys-sm">'+(r.next===0?p("today"):p("next")+': '+r.next+' '+p("days"))+'</div>'+
  '<div class="sub" style="text-align:center;margin:0">'+p("tot")+'</div>'+
  '<div class="ys-g"><div><b>'+fmt(r.days)+'</b><span>'+p("days")+'</span></div><div><b>'+fmt(Math.floor(r.days/7))+'</b><span>'+p("weeks")+'</span></div><div><b>'+fmt(r.months)+'</b><span>'+p("months")+'</span></div><div><b>'+fmt(r.days*24)+'</b><span>'+p("hours")+'</span></div></div>'+
  '<div class="ys-r"><span>'+p("born")+'</span><b>'+pa("wd",r.wd)+'</b></div><div class="ys-r"><span>'+p("zod")+'</span><b>'+pa("z",r.zi)+'</b></div>';
}
function draw(){
  sec.innerHTML='<button class="back" id="yb">← '+T[LANG].back+'</button><div class="card"><h2>'+p("title")+'</h2><div class="sub" style="margin:0">'+p("lab")+'</div><input class="ys-in" id="yd" type="date" min="1900-01-01" max="'+new Date().getFullYear()+'-12-31" value="'+S.v+'"><button class="ys-b" id="yc">'+p("calc")+'</button><div id="ysr"></div></div>';
  $("yb").addEventListener("click",function(){show("home")});
  $("yc").addEventListener("click",function(){S.v=$("yd").value;if(!S.v){$("ysr").innerHTML='<div class="ys-e">'+p("enter")+'</div>';return}result()});
  $("yd").addEventListener("change",function(){S.v=this.value;result()});
  result();
}
tile.addEventListener("click",function(){draw();show("yosh")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();if(sec.classList.contains("on"))draw()})}
updTile();draw();
})();
