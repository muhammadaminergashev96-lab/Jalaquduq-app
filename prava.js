(function(){
var Q=[
{u:"Shaharlarda yengil avtomobil uchun ruxsat etilgan eng yuqori tezlik qancha?",uo:["40 km/soat","60 km/soat","80 km/soat"],a:1,r:"Какова максимально разрешённая скорость легкового автомобиля в городах?",ro:["40 км/ч","60 км/ч","80 км/ч"]},
{u:"Svetoforning qizil signali yonganda haydovchi nima qilishi kerak?",uo:["To‘xtash chizig‘i oldida to‘xtashi","Sekinlashib o‘tib ketishi","Signal berib o‘tib ketishi"],a:0,r:"Что должен сделать водитель при красном сигнале светофора?",ro:["Остановиться перед стоп-линией","Замедлиться и проехать","Подать сигнал и проехать"]},
{u:"Tartibga solinmagan piyodalar o‘tish joyiga yaqinlashganda haydovchi nima qilishi shart?",uo:["Piyodalarga yo‘l berishi","Tezlikni oshirishi","Signal berib o‘tib ketishi"],a:0,r:"Что обязан сделать водитель при приближении к нерегулируемому пешеходному переходу?",ro:["Уступить дорогу пешеходам","Увеличить скорость","Подать сигнал и проехать"]},
{u:"Haydovchi harakatlanayotganda telefondan qanday foydalanishi mumkin?",uo:["Qo‘lda ushlab gaplashishi","Faqat qo‘l tegizmasdan (garnitura orqali)","Xabar yozishi"],a:1,r:"Как водитель может пользоваться телефоном во время движения?",ro:["Разговаривать, держа его в руке","Только без помощи рук (гарнитура)","Писать сообщения"]},
{u:"Xavfsizlik kamarini kimlar taqishi shart?",uo:["Faqat haydovchi","Haydovchi va yo‘lovchilar","Faqat shahar tashqarisida haydovchi"],a:1,r:"Кто обязан пристёгиваться ремнём безопасности?",ro:["Только водитель","Водитель и пассажиры","Только водитель за городом"]},
{u:"Mast holatda transport vositasini boshqarish mumkinmi?",uo:["Yo‘q, qat’iyan taqiqlanadi","Yo‘l bo‘sh bo‘lsa mumkin","Qisqa masofaga mumkin"],a:0,r:"Можно ли управлять транспортом в состоянии опьянения?",ro:["Нет, категорически запрещено","Можно, если дорога свободна","Можно на короткое расстояние"]},
{u:"Piyodalar o‘tish joyida transport vositasini to‘xtatib qo‘yish mumkinmi?",uo:["Yo‘q, taqiqlanadi","Ha, 5 daqiqaga","Ha, kechasi"],a:0,r:"Можно ли парковать автомобиль на пешеходном переходе?",ro:["Нет, запрещено","Да, на 5 минут","Да, ночью"]},
{u:"Quvib o‘tish qayerda taqiqlanadi?",uo:["Piyodalar o‘tish joylarida","Keng va bo‘sh yo‘lda","To‘g‘ri yo‘l qismida"],a:0,r:"Где запрещён обгон?",ro:["На пешеходных переходах","На широкой пустой дороге","На прямом участке дороги"]},
{u:"«STOP» belgisi qo‘yilgan joyda haydovchi nima qilishi kerak?",uo:["To‘xtash chizig‘i oldida to‘liq to‘xtab, yo‘l berishi","Sekinlashib o‘tib ketishi","Faqat boshqa transport bo‘lsa to‘xtashi"],a:0,r:"Что должен сделать водитель у знака «СТОП»?",ro:["Полностью остановиться перед стоп-линией и уступить дорогу","Замедлиться и проехать","Остановиться, только если есть другие машины"]},
{u:"«Yo‘l bering» belgisi oldida haydovchi nima qilishi kerak?",uo:["Asosiy yo‘ldagi transport vositalariga yo‘l berishi","Ustuvorlik o‘zida deb hisoblashi","Har doim to‘liq to‘xtashi"],a:0,r:"Что должен сделать водитель перед знаком «Уступите дорогу»?",ro:["Уступить дорогу транспорту на главной дороге","Считать, что преимущество за ним","Всегда полностью останавливаться"]},
{u:"Qorong‘ida yoki ko‘rinish yomonlashganda qaysi chiroqlar yoqilishi kerak?",uo:["Faqat gabarit chiroqlari","Yaqinni yoritish chiroqlari","Hech qanday chiroq shart emas"],a:1,r:"Какие огни необходимо включать в темноте или при плохой видимости?",ro:["Только габаритные","Ближний свет фар","Никакие не обязательны"]},
{u:"Qarshi tomondan transport kelayotganda uzoqni yoritish chiroqlari bilan nima qilish kerak?",uo:["Yaqinni yoritishga o‘tkazish","Yoqiq holda qoldirish","Ko‘p marta miltillatish"],a:0,r:"Что нужно сделать с дальним светом при встречном транспорте?",ro:["Переключить на ближний","Оставить включённым","Много раз мигнуть"]},
{u:"Yo‘l-transport hodisasi sodir bo‘lsa, haydovchi birinchi navbatda nima qilishi kerak?",uo:["Transportni to‘xtatib, avariya signalini yoqishi","Joyni tark etishi","Hech narsa qilmasdan uyga ketishi"],a:0,r:"Что должен сделать водитель в первую очередь при ДТП?",ro:["Остановить транспорт и включить аварийную сигнализацию","Покинуть место происшествия","Ничего не делать и уехать домой"]},
{u:"Bolani avtomobilda tashiganda nima qilish kerak?",uo:["Yoshi va bo‘yiga mos mahkamlash vositasidan (o‘rindiqdan) foydalanish","Hech narsa shart emas","Kamarsiz old o‘rindiqqa o‘tqazish"],a:0,r:"Что необходимо при перевозке ребёнка в автомобиле?",ro:["Использовать детское удерживающее устройство по возрасту и росту","Ничего не нужно","Посадить на переднее сиденье без ремня"]},
{u:"O‘zbekistonda transport vositalari yo‘lning qaysi tomonidan harakatlanadi?",uo:["O‘ng tomonidan","Chap tomonidan","Istalgan tomonidan"],a:0,r:"По какой стороне дороги движется транспорт в Узбекистане?",ro:["По правой","По левой","По любой"]},
{u:"Haydovchi harakatlanayotganda o‘zida qaysi hujjatlar bo‘lishi kerak?",uo:["Haydovchilik guvohnomasi va transport vositasining ro‘yxatdan o‘tganlik hujjati","Faqat pasport","Hech qanday hujjat shart emas"],a:0,r:"Какие документы должны быть у водителя при себе?",ro:["Водительское удостоверение и регистрационный документ на транспорт","Только паспорт","Никакие документы не нужны"]},
{u:"Teng ahamiyatli yo‘llar kesishgan chorrahada kim ustuvorlikka ega?",uo:["O‘ng tomondan kelayotgan transport vositasi","Chap tomondan kelayotgani","Tezroq kelayotgani"],a:0,r:"Кто имеет преимущество на перекрёстке равнозначных дорог?",ro:["Транспорт, приближающийся справа","Транспорт, приближающийся слева","Тот, кто едет быстрее"]},
{u:"Tormozlanish masofasi nimaga bog‘liq?",uo:["Tezlik va yo‘l qoplamasi holatiga","Faqat avtomobil rangiga","Faqat kun vaqtiga"],a:0,r:"От чего зависит тормозной путь?",ro:["От скорости и состояния покрытия","Только от цвета автомобиля","Только от времени суток"]},
{u:"Yo‘l qoplamasi nam yoki sirpanchiq bo‘lganda nima qilish kerak?",uo:["Tezlikni kamaytirish va masofani oshirish","Tezlikni oshirish","Tez-tez keskin tormoz berish"],a:0,r:"Что делать, если дорога мокрая или скользкая?",ro:["Снизить скорость и увеличить дистанцию","Увеличить скорость","Часто резко тормозить"]},
{u:"Haydovchi charchoq yoki uyquni sezsa nima qilishi kerak?",uo:["Xavfsiz joyda to‘xtab dam olishi","Radioni baland qo‘yib davom etishi","Tezlikni oshirib, tezroq yetib olishga harakat qilishi"],a:0,r:"Что делать водителю при усталости или сонливости?",ro:["Остановиться в безопасном месте и отдохнуть","Включить погромче радио и ехать дальше","Увеличить скорость, чтобы быстрее доехать"]},
{u:"Yo‘lda bolalar ko‘rinsa, haydovchi nima qilishi kerak?",uo:["Tezlikni kamaytirib, ehtiyot bo‘lishi","Signal berib tezlashishi","Tezligini o‘zgartirmasligi"],a:0,r:"Что должен сделать водитель, увидев на дороге детей?",ro:["Снизить скорость и быть осторожным","Посигналить и ускориться","Не менять скорость"]},
{u:"Turar joy zonasida (hovlilar, uylar oralig‘ida) ruxsat etilgan eng yuqori tezlik qancha?",uo:["20 km/soat","40 km/soat","60 km/soat"],a:0,r:"Какова максимальная скорость в жилой зоне (во дворах, между домами)?",ro:["20 км/ч","40 км/ч","60 км/ч"]},
{u:"Burilish yoki qatorni o‘zgartirishdan oldin haydovchi nima qilishi kerak?",uo:["Burilish ko‘rsatkichini oldindan yoqishi","Ko‘rsatkichni burilish paytida yoqishi","Hech narsa qilmasligi"],a:0,r:"Что должен сделать водитель перед поворотом или перестроением?",ro:["Заблаговременно включить указатель поворота","Включить указатель во время поворота","Ничего не делать"]},
{u:"Ogohlantiruvchi yo‘l belgilari odatda qanday shaklda bo‘ladi?",uo:["Qizil hoshiyali uchburchak","Ko‘k fonli doira","Sariq kvadrat"],a:0,r:"Какую форму обычно имеют предупреждающие знаки?",ro:["Треугольник с красной каймой","Круг на синем фоне","Жёлтый квадрат"]},
{u:"Qizil hoshiyali dumaloq belgilar odatda nimani bildiradi?",uo:["Taqiqlashni","Yo‘nalishni majburiy ko‘rsatishni","Servis xizmati joylashuvini"],a:0,r:"Что обычно означают круглые знаки с красной каймой?",ro:["Запрет","Обязательное направление движения","Расположение сервиса"]},
{u:"Uzluksiz (yaxlit) o‘rta chiziqni kesib o‘tish mumkinmi?",uo:["Yo‘q, taqiqlanadi","Ha, yo‘l bo‘sh bo‘lsa","Ha, kechasi"],a:0,r:"Можно ли пересекать сплошную осевую линию?",ro:["Нет, запрещено","Да, если дорога свободна","Да, ночью"]},
{u:"Sizni quvib o‘tayotgan haydovchi bo‘lsa, nima qilishingiz kerak?",uo:["Tezlikni oshirmasligingiz","Tezlikni oshirib, to‘sqinlik qilishingiz","Yo‘lning o‘rtasiga chiqishingiz"],a:0,r:"Что должен делать водитель, которого обгоняют?",ro:["Не увеличивать скорость","Ускориться и помешать обгону","Выехать на середину дороги"]},
{u:"Maxsus ovozli va yoritgichli signal bilan kelayotgan tez yordam mashinasiga qanday munosabatda bo‘lish kerak?",uo:["Yo‘l berish","Orqasidan tezlikni oshirib ketish","E’tibor bermaslik"],a:0,r:"Как следует поступить при приближении скорой помощи со специальными сигналами?",ro:["Уступить дорогу","Ускориться и ехать за ней","Не обращать внимания"]}
];
var N=20;
var P={
uz:{title:"Prava imtihoniga tayyorlov",tile:"Prava",tileS:"Mashq testlari",intro:"Yo‘l harakati qoidalari bo‘yicha mashq savollari. Bu rasmiy imtihon bazasi emas: tayyorgarlikka yordam beradi, qoidalarni rasmiy matn bilan solishtirib turing.",start:"Testni boshlash ({n} savol)",q:"Savol",next:"Keyingi",fin:"Natijani ko‘rish",res:"Natija",ca:"To‘g‘ri javob",again:"Qayta boshlash",wr:"Xatolar",g1:"Ajoyib natija!",g2:"Yaxshi, yana mashq qiling.",g3:"Qoidalarni qayta o‘qib chiqing."},
ru:{title:"Подготовка к экзамену по ПДД",tile:"Права",tileS:"Тренировочные тесты",intro:"Тренировочные вопросы по правилам дорожного движения. Это не официальная экзаменационная база: она помогает готовиться, сверяйтесь с официальным текстом правил.",start:"Начать тест ({n} вопросов)",q:"Вопрос",next:"Далее",fin:"Показать результат",res:"Результат",ca:"Правильный ответ",again:"Начать заново",wr:"Ошибки",g1:"Отличный результат!",g2:"Хорошо, потренируйтесь ещё.",g3:"Перечитайте правила."}
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
css.textContent=".t5{background:linear-gradient(135deg,#6a3fd1,#a06cf0)}.pq{font-size:17px;font-weight:600;margin-bottom:12px;line-height:1.35}.po{display:block;width:100%;text-align:left;padding:12px;margin-bottom:8px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:15px;font-family:inherit}.po.ok{background:var(--accbg);border-color:var(--acc);color:var(--acc);font-weight:700}.po.no{border-color:var(--dn);color:var(--dn)}.pbtn{display:block;width:100%;padding:13px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-size:16px;font-weight:700;margin-top:8px;font-family:inherit}.pw{border-top:1px solid var(--line);padding:10px 0;font-size:14px}.pw b{color:var(--acc)}.pscore{font-size:34px;font-weight:700;color:var(--acc)}";
document.head.appendChild(css);

var sec=document.createElement("div");sec.className="sec";sec.id="prava";
document.body.appendChild(sec);
var tile=document.createElement("button");
tile.className="tile t5";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🚗</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}
tile.addEventListener("click",function(){st=null;draw();show("prava")});

function startQuiz(){
  var all=[];for(var i=0;i<Q.length;i++)all.push(i);
  st={ids:shuffle(all).slice(0,Math.min(N,Q.length)),i:0,score:0,wrong:[],pick:null,ord:shuffle([0,1,2])};
}
function draw(){
  var h='<button class="back" id="pb">← '+T[LANG].back+'</button>';
  if(!st){
    h+='<div class="card"><h2>'+p("title")+'</h2><div class="sub" style="margin:0 0 12px">'+p("intro")+'</div><button class="pbtn" id="ps">'+p("start").replace("{n}",Math.min(N,Q.length))+'</button></div>';
  }else if(st.i<st.ids.length){
    var q=Q[st.ids[st.i]],o=qo(q);
    h+='<div class="card"><h2>'+p("q")+' '+(st.i+1)+'/'+st.ids.length+'</h2><div class="pq">'+qt(q)+'</div>';
    h+=st.ord.map(function(k){
      var c="po";
      if(st.pick!==null){if(k===q.a)c+=" ok";else if(k===st.pick)c+=" no"}
      return '<button class="'+c+'" data-o="'+k+'"'+(st.pick!==null?' disabled':'')+'>'+o[k]+'</button>';
    }).join("");
    if(st.pick!==null){h+='<button class="pbtn" id="pn">'+(st.i+1<st.ids.length?p("next"):p("fin"))+'</button>'}
    h+='</div>';
  }else{
    var tot=st.ids.length,pc=Math.round(st.score*100/tot);
    h+='<div class="card"><h2>'+p("res")+'</h2><div class="pscore">'+st.score+' / '+tot+'</div><div class="sub" style="margin:4px 0 0">'+(pc>=90?p("g1"):pc>=70?p("g2"):p("g3"))+'</div>';
    if(st.wrong.length){
      h+='<h2 style="margin-top:16px">'+p("wr")+'</h2>';
      h+=st.wrong.map(function(id){var q=Q[id];return '<div class="pw">'+qt(q)+'<br>'+p("ca")+': <b>'+qo(q)[q.a]+'</b></div>'}).join("");
    }
    h+='<button class="pbtn" id="pa">'+p("again")+'</button></div>';
  }
  sec.innerHTML=h;
  document.getElementById("pb").addEventListener("click",function(){st=null;show("home")});
  var b=document.getElementById("ps");if(b)b.addEventListener("click",function(){startQuiz();draw();window.scrollTo(0,0)});
  b=document.getElementById("pa");if(b)b.addEventListener("click",function(){startQuiz();draw();window.scrollTo(0,0)});
  b=document.getElementById("pn");if(b)b.addEventListener("click",function(){st.i++;st.pick=null;st.ord=shuffle([0,1,2]);draw();window.scrollTo(0,0)});
  var bs=sec.querySelectorAll("[data-o]");
  for(var j=0;j<bs.length;j++){bs[j].addEventListener("click",function(){
    if(st.pick!==null)return;
    var k=parseInt(this.getAttribute("data-o"),10),id=st.ids[st.i];
    st.pick=k;if(k===Q[id].a)st.score++;else st.wrong.push(id);
    draw();
  })}
}
var lb=document.querySelectorAll(".lang button");
for(var m=0;m<lb.length;m++){lb[m].addEventListener("click",function(){updTile();draw()})}
updTile();draw();
})();
