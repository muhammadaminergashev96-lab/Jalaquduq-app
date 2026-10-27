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
uz:{tile:"Taomlar",tileS:"Retseptlar va baraban",title:"Taomlar",search:"Taom yoki masalliq qidirish…",all:"Hammasi",tab1:"Retseptlar",tab2:"Baraban",none:"Hech narsa topilmadi",ing:"Masalliqlar",steps:"Tayyorlash",min:"daqiqa",serv:"kishilik",spin:"Aylantirish",spinning:"Aylanmoqda…",res:"Bugun tayyorlang:",open:"Retseptni ochish",again:"Yana aylantirish",hint:"Baraban tasodifiy taom tanlaydi",note:"Miqdorlar taxminiy. Didingizga qarab tuz va ziravorni o‘zgartiring.",back:"← Taomlar",cats:["Birinchi taomlar","Ikkinchi taomlar","Xamirli taomlar","Salatlar","Nonushta va shirinlik"]},
ru:{tile:"Блюда",tileS:"Рецепты и барабан",title:"Блюда",search:"Поиск блюда или продукта…",all:"Все",tab1:"Рецепты",tab2:"Барабан",none:"Ничего не найдено",ing:"Ингредиенты",steps:"Приготовление",min:"мин",serv:"порций",spin:"Крутить",spinning:"Крутится…",res:"Приготовьте сегодня:",open:"Открыть рецепт",again:"Крутить ещё",hint:"Барабан выберет случайное блюдо",note:"Количество примерное. Соль и специи меняйте по вкусу.",back:"← Блюда",cats:["Первые блюда","Вторые блюда","Блюда из теста","Салаты","Завтраки и десерты"]}
};

var R=[
{e:"🍚",c:1,t:120,s:6,n:["Osh (palov)","Плов"],
 i:[["1 kg guruch","1 kg mol yoki qo‘y go‘shti","1 kg sabzi","2 ta piyoz","200 ml o‘simlik yog‘i","1 choy qoshiq zira","1 bosh sarimsoq","Tuz, zirabor (xohlasa)"],["1 кг риса","1 кг говядины или баранины","1 кг моркови","2 луковицы","200 мл растительного масла","1 ч. л. зиры","1 головка чеснока","Соль, барбарис (по желанию)"]],
 p:[["Guruchni 5–6 marta yuvib, 1 soat iliq tuzli suvda ivitib qo‘ying.","Qozonda yog‘ni qizdiring, yarim halqa piyozni qizarguncha qovuring.","Katta bo‘laklangan go‘shtni qo‘shib, 10 daqiqa qovuring.","Somoncha to‘g‘ralgan sabzini soling, 5 daqiqa qovurib, tuz va zira qo‘shing.","Go‘sht usti bekilguncha suv quyib, 40 daqiqa past olovda zirvak qiling.","Guruchni tekis yoying, ustiga 1 barmoq qalinlikda suv quying, sarimsoqni o‘rtasiga joylang.","Suv singgach, guruchni to‘plab, teshiklar qiling, qopqoq yopib 20–25 daqiqa dam bering.","Ohista aralashtirib, go‘sht bilan dasturxonga torting."],["Рис промойте 5–6 раз и на час замочите в тёплой солёной воде.","В казане разогрейте масло и обжарьте лук до золотистого цвета.","Добавьте крупно нарезанное мясо, жарьте 10 минут.","Положите морковь соломкой, жарьте 5 минут, добавьте соль и зиру.","Залейте водой чуть выше мяса и готовьте зирвак 40 минут на малом огне.","Разровняйте рис, залейте водой на палец выше, в центр вдавите чеснок.","Когда вода впитается, соберите рис горкой, сделайте отверстия, накройте крышкой на 20–25 минут.","Аккуратно перемешайте и подавайте с мясом."]]},
{e:"🍜",c:1,t:90,s:4,n:["Lag‘mon","Лагман"],
 i:[["500 g lag‘mon xamiri (tayyor)","500 g mol go‘shti","2 ta sabzi","2 ta piyoz","2 ta bulg‘or qalampir","2 ta pomidor","1 ta kartoshka","3 chinni sarimsoq","3 osh qoshiq yog‘","1 osh qoshiq pomidor pastasi","Tuz, zira, qora murch","Ko‘kat"],["500 г лапши для лагмана","500 г говядины","2 моркови","2 луковицы","2 болгарских перца","2 помидора","1 картофелина","3 зубчика чеснока","3 ст. л. масла","1 ст. л. томатной пасты","Соль, зира, чёрный перец","Зелень"]],
 p:[["Go‘shtni mayda to‘g‘rab, qozonda yog‘da qovuring.","Piyoz, so‘ng sabzi va kartoshkani qo‘shib 10 daqiqa qovuring.","Pomidor, bulg‘or qalampir, pomidor pastasi va ziravorlarni soling.","Ustiga 600–700 ml suv quyib, 40 daqiqa past olovda dimlang. Oxirida sarimsoq qo‘shing.","Lag‘mon xamirini qaynoq tuzli suvda 5–7 daqiqa pishiring va suzib oling.","Likopchaga lag‘monni solib, ustidan qovurma va ko‘kat qo‘shing."],["Мясо мелко нарежьте и обжарьте в казане на масле.","Добавьте лук, затем морковь и картофель, жарьте 10 минут.","Положите помидоры, болгарский перец, томатную пасту и специи.","Залейте 600–700 мл воды и тушите 40 минут на малом огне. В конце добавьте чеснок.","Отварите лапшу в кипящей солёной воде 5–7 минут и откиньте.","Выложите лапшу в тарелку, сверху — соус и зелень."]]},
{e:"🥟",c:2,t:90,s:5,n:["Manti","Манты"],
 i:[["500 g un","250 ml suv","1 choy qoshiq tuz","500 g mol yoki qo‘y go‘shti","3 ta piyoz","100 g dumba yoki yog‘","Tuz, zira, qora murch"],["500 г муки","250 мл воды","1 ч. л. соли","500 г говядины или баранины","3 луковицы","100 г курдюка или жира","Соль, зира, чёрный перец"]],
 p:[["Un, suv va tuzdan qattiq xamir qorib, 30 daqiqa dam bering.","Go‘shtni pichoqda mayda to‘g‘rang, piyoz va dumba, ziravorlarni qo‘shib aralashtiring.","Xamirni yupqa yoyib, kvadratlarga kesing.","Har biriga qiyma solib, burchaklarini yopishtiring.","Yog‘langan manti qozonga joylab, 40–45 daqiqa bug‘da pishiring.","Qatiq yoki sirka bilan issiq holda torting."],["Замесите крутое тесто из муки, воды и соли, оставьте на 30 минут.","Мясо мелко нарубите ножом, смешайте с луком, курдюком и специями.","Тесто тонко раскатайте и нарежьте квадратами.","Положите начинку и защипните уголки.","Манты смажьте маслом, выложите в мантышницу и готовьте на пару 40–45 минут.","Подавайте горячими со сметаной или кислым молоком."]]},
{e:"🥮",c:2,t:90,s:8,n:["Somsa","Самса"],
 i:[["500 g un","250 ml suv","1 tuxum","1 choy qoshiq tuz","100 g saryog‘ (qatlash uchun)","500 g go‘sht","4 ta piyoz","100 g dumba","Zira, tuz, qora murch"],["500 г муки","250 мл воды","1 яйцо","1 ч. л. соли","100 г сливочного масла (для слоёв)","500 г мяса","4 луковицы","100 г курдюка","Зира, соль, чёрный перец"]],
 p:[["Un, suv va tuzdan xamir qorib, 30 daqiqa dam bering.","Xamirni yupqa yoyib, saryog‘ surting, rulet qilib o‘rang va 30 daqiqa sovuqda saqlang.","Go‘sht, piyoz va dumbani mayda to‘g‘rab, ziravorlar bilan aralashtiring.","Rulet bo‘laklarini yoyib, qiyma solib, uchburchak qilib buking.","Ustiga tuxum sarig‘ini surting.","200°C da 35–40 daqiqa tillarang bo‘lguncha pishiring."],["Замесите тесто из муки, воды и соли, оставьте на 30 минут.","Раскатайте тонко, смажьте маслом, сверните рулетом и уберите на 30 минут в холод.","Мясо, лук и курдюк мелко нарежьте, смешайте со специями.","Нарежьте рулет, раскатайте кусочки, выложите начинку и сложите треугольником.","Смажьте сверху яичным желтком.","Выпекайте при 200°C 35–40 минут до золотистого цвета."]]},
{e:"🍲",c:0,t:75,s:5,n:["Mastava","Мастава"],
 i:[["300 g go‘sht","100 g guruch","2 ta kartoshka","1 ta sabzi","1 ta piyoz","2 ta pomidor","1 ta bulg‘or qalampir","3 osh qoshiq yog‘","1,5 l suv","Tuz, zira, ko‘kat","Qatiq (ustiga)"],["300 г мяса","100 г риса","2 картофелины","1 морковь","1 луковица","2 помидора","1 болгарский перец","3 ст. л. масла","1,5 л воды","Соль, зира, зелень","Катык или сметана (для подачи)"]],
 p:[["Go‘sht va piyozni yog‘da qovuring, sabzi va pomidorni qo‘shing.","Suv quyib, qaynagach ko‘pigini olib, 30 daqiqa pishiring.","Kubik to‘g‘ralgan kartoshka, bulg‘or qalampir va yuvilgan guruchni soling.","Tuz va ziravor qo‘shib, 20–25 daqiqa past olovda pishiring.","Ko‘kat sepib, qatiq bilan torting."],["Обжарьте мясо с луком в масле, добавьте морковь и помидоры.","Залейте водой, после закипания снимите пену и варите 30 минут.","Добавьте картофель кубиками, болгарский перец и промытый рис.","Посолите, добавьте специи и варите 20–25 минут на малом огне.","Посыпьте зеленью и подавайте с катыком."]]},
{e:"🍖",c:0,t:100,s:5,n:["Sho‘rva","Шурпа"],
 i:[["700 g suyakli go‘sht (qo‘y yoki mol)","3 ta kartoshka","2 ta sabzi","2 ta piyoz","2 ta bulg‘or qalampir","2 ta pomidor","2 l suv","Tuz, zira, qora murch","Ko‘kat (rayhon, kashnich)"],["700 г мяса на кости (баранина или говядина)","3 картофелины","2 моркови","2 луковицы","2 болгарских перца","2 помидора","2 л воды","Соль, зира, чёрный перец","Зелень (базилик, кинза)"]],
 p:[["Go‘shtni sovuq suvga solib qaynating, ko‘pigini olib tashlang.","Past olovda 1 soat pishiring, tuz qo‘shing.","Piyoz, sabzi va pomidorni yirik bo‘laklab soling.","Kartoshka va bulg‘or qalampirni qo‘shib, yana 25–30 daqiqa pishiring.","Ziravor sepib, ko‘kat bilan torting."],["Мясо залейте холодной водой, доведите до кипения, снимите пену.","Варите на малом огне 1 час, посолите.","Добавьте лук, морковь и помидоры крупными кусками.","Положите картофель и болгарский перец, варите ещё 25–30 минут.","Приправьте специями и подавайте с зеленью."]]},
{e:"🥟",c:2,t:70,s:4,n:["Chuchvara","Чучвара"],
 i:[["400 g un","1 ta tuxum","150 ml suv","1 choy qoshiq tuz","300 g qiyma go‘sht","1 ta piyoz","Tuz, qora murch","Ko‘kat, qatiq yoki sirka"],["400 г муки","1 яйцо","150 мл воды","1 ч. л. соли","300 г фарша","1 луковица","Соль, чёрный перец","Зелень, катык или уксус"]],
 p:[["Un, tuxum, suv va tuzdan qattiq xamir qorib, 30 daqiqa dam bering.","Qiymaga mayda to‘g‘ralgan piyoz, tuz va murch qo‘shing.","Xamirni yupqa yoyib, 3×3 sm kvadratlarga kesing.","Har biriga ozgina qiyma solib, uchburchak qilib yopishtiring va burchaklarini birlashtiring.","Qaynoq tuzli suvda suzib chiqqandan keyin 7–10 daqiqa pishiring.","Sho‘rva bilan yoki qatiq-sirka va ko‘kat bilan torting."],["Замесите крутое тесто из муки, яйца, воды и соли, оставьте на 30 минут.","В фарш добавьте мелко нарезанный лук, соль и перец.","Раскатайте тесто тонко и нарежьте квадратами 3×3 см.","Положите немного фарша, сложите треугольником и соедините уголки.","Варите в кипящей солёной воде 7–10 минут после всплытия.","Подавайте в бульоне или с катыком, уксусом и зеленью."]]},
{e:"🥘",c:1,t:120,s:5,n:["Dimlama","Димлама"],
 i:[["600 g go‘sht (qo‘y yoki mol)","4 ta kartoshka","2 ta sabzi","3 ta piyoz","300 g karam","2 ta pomidor","2 ta bulg‘or qalampir","100 ml suv","Tuz, zira, qora murch","Ko‘kat"],["600 г мяса (баранина или говядина)","4 картофелины","2 моркови","3 луковицы","300 г капусты","2 помидора","2 болгарских перца","100 мл воды","Соль, зира, чёрный перец","Зелень"]],
 p:[["Qozon tubiga yog‘ surting, go‘shtni yirik bo‘laklab joylang.","Ustiga qatlam-qatlam: piyoz, sabzi, karam, kartoshka, pomidor, bulg‘or qalampir.","Har qatlamga tuz va ziravor sepib chiqing.","Suv quying, qopqoqni mahkam yopib, past olovda 1,5–2 soat pishiring.","Dimlama vaqtida aralashtirmang, ko‘kat sepib torting."],["Смажьте дно казана маслом, выложите крупно нарезанное мясо.","Сверху слоями: лук, морковь, капуста, картофель, помидоры, болгарский перец.","Каждый слой посыпайте солью и специями.","Влейте воду, плотно закройте крышкой и тушите 1,5–2 часа на малом огне.","Во время тушения не мешайте, подавайте с зеленью."]]},
{e:"🍢",c:1,t:180,s:5,n:["Shashlik (kabob)","Шашлык"],
 i:[["1 kg go‘sht (qo‘y yoki mol)","3 ta piyoz","150 g dumba (xohlasa)","1,5 choy qoshiq tuz","1 choy qoshiq zira","Qora murch","Sirka yoki limon suvi (ixtiyoriy)","Shashlik uchun ko‘mir"],["1 кг мяса (баранина или говядина)","3 луковицы","150 г курдюка (по желанию)","1,5 ч. л. соли","1 ч. л. зиры","Чёрный перец","Уксус или лимонный сок (по желанию)","Угли для мангала"]],
 p:[["Go‘shtni 3–4 sm kubik qilib to‘g‘rang, piyozni halqa qiling.","Tuz, zira, murch va piyoz bilan aralashtirib, kamida 2 soat marinadlang.","Go‘sht va dumbani sixga navbat bilan tering.","Cho‘g‘da har tomonini aylantirib 15–20 daqiqa pishiring.","Piyoz, non va ko‘kat bilan issiq torting."],["Мясо нарежьте кубиками 3–4 см, лук — кольцами.","Смешайте с солью, зирой, перцем и луком, замаринуйте минимум на 2 часа.","Нанизывайте мясо и курдюк на шампуры поочерёдно.","Жарьте на углях, переворачивая, 15–20 минут.","Подавайте горячим с луком, лепёшкой и зеленью."]]},
{e:"🍝",c:1,t:180,s:4,n:["Norin","Нарын"],
 i:[["500 g mol go‘shti","400 g un","2 ta tuxum","3 ta piyoz","1 choy qoshiq tuz","Qora murch","Go‘sht shirasi (sho‘rva)"],["500 г говядины","400 г муки","2 яйца","3 луковицы","1 ч. л. соли","Чёрный перец","Мясной бульон"]],
 p:[["Go‘shtni tuzlab, 2 soat yumshaguncha qaynating, shirasini saqlang.","Un, tuxum, suv va tuzdan qattiq xamir qoring, 20 daqiqa dam bering.","Xamirni juda yupqa yoyib, uzun ingichka lapshaga yoki romblarga kesing.","Lapshani qaynoq tuzli suvda pishiring va suzib oling.","Go‘shtni mayda to‘g‘rang, piyozni halqa qilib shirada pishiring.","Lapsha, go‘sht va piyozni aralashtirib, murch sepib, issiq shira bilan torting."],["Мясо посолите и варите 2 часа до мягкости, бульон сохраните.","Замесите крутое тесто из муки, яиц, воды и соли, оставьте на 20 минут.","Раскатайте тесто очень тонко и нарежьте тонкой лапшой или ромбами.","Отварите лапшу в кипящей солёной воде и откиньте.","Мясо мелко нарежьте, лук кольцами отварите в бульоне.","Смешайте лапшу, мясо и лук, посыпьте перцем, подавайте с горячим бульоном."]]},
{e:"🍅",c:0,t:100,s:6,n:["Borsh","Борщ"],
 i:[["500 g suyakli mol go‘shti","3 ta kartoshka","1 ta lavlagi","1 ta sabzi","1 ta piyoz","200 g karam","2 osh qoshiq pomidor pastasi","1 ta lavr bargi","2 l suv","Tuz, murch","Qaymoq (smetana), ko‘kat"],["500 г говядины на кости","3 картофелины","1 свёкла","1 морковь","1 луковица","200 г капусты","2 ст. л. томатной пасты","1 лавровый лист","2 л воды","Соль, перец","Сметана, зелень"]],
 p:[["Go‘shtni sovuq suvda qaynatib, ko‘pigini oling va 1 soat pishiring.","Piyoz, sabzi va tarashlangan lavlagini yog‘da pomidor pastasi bilan 10 daqiqa dimlang.","Sho‘rvaga kartoshka solib, 10 daqiqa pishiring.","Maydalangan karam va qovurmani qo‘shing.","Tuz, murch va lavr bargini soling, 10–15 daqiqa pishiring.","Qaymoq va ko‘kat bilan torting."],["Мясо залейте холодной водой, снимите пену и варите 1 час.","Лук, морковь и тёртую свёклу тушите на масле с томатной пастой 10 минут.","В бульон добавьте картофель, варите 10 минут.","Положите нашинкованную капусту и зажарку.","Добавьте соль, перец и лавровый лист, варите 10–15 минут.","Подавайте со сметаной и зеленью."]]},
{e:"🍔",c:1,t:40,s:4,n:["Kotlet","Котлеты"],
 i:[["500 g qiyma go‘sht","1 ta piyoz","1 ta tuxum","2 bo‘lak non (sutga ivitilgan)","Tuz, qora murch","Un yoki non uvoqi","Qovurish uchun yog‘"],["500 г фарша","1 луковица","1 яйцо","2 куска хлеба (размоченного в молоке)","Соль, чёрный перец","Мука или панировочные сухари","Масло для жарки"]],
 p:[["Piyozni maydalab, ivitilgan non va tuxum bilan qiymaga qo‘shing.","Tuz va murch sepib, yaxshilab aralashtiring.","Qo‘lingizni ho‘llab, kotlet shakllang va undan yoki non uvoqida yumalating.","Qizigan yog‘da har tomonini 4–5 daqiqadan qovuring.","Past olovda qopqoq ostida 5 daqiqa dimlang va garnir bilan torting."],["Лук измельчите, добавьте в фарш с размоченным хлебом и яйцом.","Посолите, поперчите и хорошо вымесите.","Смочив руки, сформируйте котлеты и обваляйте в муке или сухарях.","Обжарьте на горячем масле по 4–5 минут с каждой стороны.","Доведите под крышкой 5 минут на малом огне, подавайте с гарниром."]]},
{e:"🍗",c:1,t:80,s:4,n:["Tovuq va kartoshka","Курица с картошкой"],
 i:[["1 ta tovuq (1,2–1,5 kg)","5 ta kartoshka","2 ta piyoz","3 chinni sarimsoq","3 osh qoshiq yog‘","Tuz, qora murch, zira","Ko‘kat"],["1 курица (1,2–1,5 кг)","5 картофелин","2 луковицы","3 зубчика чеснока","3 ст. л. масла","Соль, чёрный перец, зира","Зелень"]],
 p:[["Tovuqni bo‘laklarga bo‘lib, tuz, murch va ziradan aralashmaga 30 daqiqa qo‘ying.","Qozonda yog‘ni qizdirib, tovuqni har tomonidan tillarang bo‘lguncha qovuring.","Halqa piyoz va sarimsoqni qo‘shib, 5 daqiqa qovuring.","Yirik to‘g‘ralgan kartoshkani soling, 150 ml issiq suv quying.","Qopqoq yopib, past olovda 40 daqiqa pishiring.","Ko‘kat sepib, issiq torting."],["Курицу разделите на куски, натрите солью, перцем и зирой, оставьте на 30 минут.","Обжарьте в казане на горячем масле со всех сторон до золотистой корочки.","Добавьте лук и чеснок, жарьте 5 минут.","Положите крупно нарезанный картофель, влейте 150 мл горячей воды.","Накройте крышкой и тушите 40 минут на малом огне.","Посыпьте зеленью и подавайте горячим."]]},
{e:"🥗",c:3,t:10,s:4,n:["Achichuk salati","Салат «Ачичук»"],
 i:[["3 ta pomidor","1 ta piyoz","1 ta achchiq qalampir (ixtiyoriy)","Tuz","Ko‘kat (rayhon, kashnich)"],["3 помидора","1 луковица","1 острый перец (по желанию)","Соль","Зелень (базилик, кинза)"]],
 p:[["Piyozni juda yupqa yarim halqa qilib kesing, tuz sepib, qo‘lda ezib suvini oling.","Pomidorni yupqa yarim doira qilib to‘g‘rang.","Piyoz, pomidor va maydalangan qalampirni aralashtiring.","Ko‘kat sepib, 5 daqiqa qo‘yib, so‘ng torting."],["Лук очень тонко нарежьте полукольцами, посолите, примните руками и отожмите сок.","Помидоры нарежьте тонкими полукружьями.","Смешайте лук, помидоры и мелко нарезанный перец.","Посыпьте зеленью, дайте постоять 5 минут и подавайте."]]},
{e:"🥔",c:3,t:50,s:6,n:["Olivye salati","Салат «Оливье»"],
 i:[["4 ta kartoshka","3 ta sabzi","4 ta tuxum","300 g qaynatilgan tovuq yoki kolbasa","4 ta tuzlangan bodring","1 banka yashil no‘xat","Mayonez","Tuz, murch"],["4 картофелины","3 моркови","4 яйца","300 г отварной курицы или колбасы","4 солёных огурца","1 банка зелёного горошка","Майонез","Соль, перец"]],
 p:[["Kartoshka, sabzi va tuxumni qaynatib, sovuting.","Hammasini va bodringni kichik kubiklarga to‘g‘rang.","Go‘sht yoki kolbasani ham kubik qilib to‘g‘rang.","No‘xat, tuz va murch qo‘shing.","Mayonez bilan aralashtirib, 1 soat sovutgichda saqlab torting."],["Отварите картофель, морковь и яйца, остудите.","Нарежьте всё и огурцы мелкими кубиками.","Мясо или колбасу тоже нарежьте кубиками.","Добавьте горошек, соль и перец.","Заправьте майонезом, дайте настояться 1 час в холодильнике."]]},
{e:"🍳",c:4,t:10,s:2,n:["Pomidorli omlet","Омлет с помидорами"],
 i:[["3 ta tuxum","50 ml sut","1 ta pomidor","1 osh qoshiq saryog‘","Tuz, qora murch","Ko‘kat"],["3 яйца","50 мл молока","1 помидор","1 ст. л. сливочного масла","Соль, чёрный перец","Зелень"]],
 p:[["Tuxum, sut, tuz va murchni ko‘pirtirib aralashtiring.","Tovada saryog‘ni eritib, mayda to‘g‘ralgan pomidorni 2 daqiqa qovuring.","Tuxum aralashmasini quying.","Qopqoq yopib, past olovda 4–5 daqiqa pishiring.","Ko‘kat sepib torting."],["Взбейте яйца с молоком, солью и перцем.","На сковороде растопите масло, обжарьте мелко нарезанный помидор 2 минуты.","Влейте яичную смесь.","Накройте крышкой и готовьте 4–5 минут на малом огне.","Посыпьте зеленью и подавайте."]]},
{e:"🥞",c:4,t:30,s:4,n:["Blinchik","Блины"],
 i:[["2 ta tuxum","500 ml sut","200 g un","2 osh qoshiq shakar","Bir chimdim tuz","2 osh qoshiq o‘simlik yog‘i","Qaymoq, murabbo yoki asal"],["2 яйца","500 мл молока","200 г муки","2 ст. л. сахара","Щепотка соли","2 ст. л. растительного масла","Сметана, варенье или мёд"]],
 p:[["Tuxum, shakar va tuzni ko‘pirtiring.","Sutning yarmini qo‘shib, unni asta aralashtiring — bo‘lakchalar qolmasin.","Qolgan sut va yog‘ni qo‘shing, 15 daqiqa dam bering.","Qizigan tovani yog‘lab, 1 oshqoshiq xamir quyib, yupqa yoying.","Har tomonini 1–2 daqiqadan pishiring.","Qaymoq, murabbo yoki asal bilan torting."],["Взбейте яйца с сахаром и солью.","Влейте половину молока и постепенно введите муку, размешивая до отсутствия комочков.","Добавьте остальное молоко и масло, оставьте на 15 минут.","Смажьте горячую сковороду, налейте половник теста и распределите тонким слоем.","Жарьте с каждой стороны по 1–2 минуты.","Подавайте со сметаной, вареньем или мёдом."]]},
{e:"🍚",c:4,t:50,s:4,n:["Sutli guruch","Молочная рисовая каша"],
 i:[["200 g guruch","1 l sut","2 osh qoshiq shakar","Bir chimdim tuz","1 osh qoshiq saryog‘"],["200 г риса","1 л молока","2 ст. л. сахара","Щепотка соли","1 ст. л. сливочного масла"]],
 p:[["Guruchni yuvib, 10 daqiqa qaynoq suvda yarim pishiring.","Suvni to‘kib, sutni qaynating.","Guruchni qaynoq sutga solib, tuz va shakar qo‘shing.","Past olovda tez-tez aralashtirib, 30–35 daqiqa pishiring.","Saryog‘ qo‘shib, 10 daqiqa dam bering."],["Рис промойте и 10 минут проварите в кипятке.","Воду слейте, молоко доведите до кипения.","Добавьте рис в кипящее молоко, посолите и положите сахар.","Варите на малом огне 30–35 минут, часто помешивая.","Добавьте масло и дайте настояться 10 минут."]]}
];

var COL=["#ef4444","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899","#14b8a6","#f97316"];
function p(k){return LANG==="ru"?UI.ru[k]:tr(UI.uz[k])}
function cat(i){return LANG==="ru"?UI.ru.cats[i]:tr(UI.uz.cats[i])}
function nm(r){return LANG==="ru"?r.n[1]:tr(r.n[0])}
function lst(r,k){return LANG==="ru"?r[k][1]:r[k][0].map(tr)}
function $(id){return document.getElementById(id)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function norm(s){return String(s).toLowerCase().replace(/[‘’'ʻʼ`]/g,"").replace(/ё/g,"е")}
var HAY=R.map(function(r){
  var uz=r.n[0]+" "+r.i[0].join(" "),ru=r.n[1]+" "+r.i[1].join(" ");
  return norm(uz+" "+cyr(uz)+" "+ru);
});
var S={tab:0,c:-1,q:"",open:-1,pick:-1,rot:0,spin:false};
window.TAOM=R;window.TAOMOPEN=function(i){S.open=i;draw();show("taomlar")};
var css=document.createElement("style");
css.textContent=".tm-s{width:100%;padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:16px;margin:8px 0;font-family:inherit;box-sizing:border-box}.tm-tabs{display:flex;gap:8px;margin:6px 0 4px}.tm-tabs button{flex:1;padding:11px;border-radius:12px;border:2px solid var(--line);background:var(--card);color:var(--text);font-weight:700;font-size:15px;font-family:inherit}.tm-tabs button.on{border-color:var(--acc);background:var(--accbg);color:var(--acc)}.tm-ch{display:flex;gap:6px;overflow-x:auto;padding:4px 0 8px}.tm-c{flex:none;padding:8px 12px;border-radius:18px;border:2px solid var(--line);background:var(--card);color:var(--text);font-size:13px;font-weight:700;font-family:inherit}.tm-c.on{border-color:var(--acc);background:var(--accbg);color:var(--acc)}.tm-i{display:flex;align-items:center;gap:12px;width:100%;padding:12px;border-radius:14px;border:1px solid var(--line);background:var(--bg);color:var(--text);text-align:left;font-family:inherit;margin-bottom:8px}.tm-i .e{font-size:30px}.tm-i b{display:block;font-size:15px}.tm-i small{color:var(--mut);font-size:12px}.tm-d h3{margin:6px 0 2px;font-size:22px}.tm-m{color:var(--mut);font-size:13px;margin-bottom:8px}.tm-d h4{margin:14px 0 6px;font-size:14px;color:var(--acc);text-transform:uppercase;letter-spacing:.04em}.tm-d ul{margin:0;padding-left:20px;line-height:1.6}.tm-d ol{margin:0;padding-left:22px;line-height:1.55}.tm-d li{margin-bottom:5px}.tm-w{position:relative;width:300px;max-width:88vw;aspect-ratio:1;margin:14px auto 8px}.tm-w canvas{width:100%;height:100%;display:block;border-radius:50%;box-shadow:0 6px 22px rgba(0,0,0,.25)}.tm-p{position:absolute;left:50%;top:-8px;transform:translateX(-50%);width:0;height:0;border-left:13px solid transparent;border-right:13px solid transparent;border-top:26px solid #111;z-index:2}.tm-go{width:100%;padding:14px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-weight:700;font-size:16px;font-family:inherit}.tm-go:disabled{opacity:.6}.tm-res{text-align:center;margin:14px 0 4px;min-height:80px}.tm-res .e{font-size:44px}.tm-res b{display:block;font-size:20px;margin:2px 0 8px}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="taomlar";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#ea580c,#f59e0b)";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🍽️</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}
function buzz(){try{Telegram.WebApp.HapticFeedback.impactOccurred("light")}catch(e){try{navigator.vibrate&&navigator.vibrate(10)}catch(_){}}}
function listHtml(){
  var q=norm(S.q.trim()),out="",n=0;
  R.forEach(function(r,i){
    if(S.c>=0&&r.c!==S.c)return;
    if(q&&HAY[i].indexOf(q)<0&&!(q.length>4&&HAY[i].indexOf(q.slice(0,-1))>=0))return;
    n++;
    out+='<button class="tm-i" data-o="'+i+'"><span class="e">'+r.e+'</span><span><b>'+esc(nm(r))+'</b><small>'+cat(r.c)+' · '+r.t+' '+p("min")+'</small></span></button>';
  });
  return n?out:'<div class="sub" style="text-align:center;margin:14px 0">'+p("none")+'</div>';
}
function bindList(){var b=sec.querySelectorAll("[data-o]");for(var i=0;i<b.length;i++)b[i].addEventListener("click",function(){S.open=+this.getAttribute("data-o");draw();window.scrollTo(0,0)})}
function detail(){
  var r=R[S.open];
  sec.innerHTML='<button class="back" id="tb">'+p("back")+'</button><div class="card tm-d"><div style="font-size:46px">'+r.e+'</div><h3>'+esc(nm(r))+'</h3><div class="tm-m">'+cat(r.c)+' · '+r.t+' '+p("min")+' · '+r.s+' '+p("serv")+'</div><h4>'+p("ing")+'</h4><ul>'+lst(r,"i").map(function(x){return '<li>'+esc(x)+'</li>'}).join("")+'</ul><h4>'+p("steps")+'</h4><ol>'+lst(r,"p").map(function(x){return '<li>'+esc(x)+'</li>'}).join("")+'</ol><div class="sub" style="margin:14px 0 0">'+p("note")+'</div></div>';
  $("tb").addEventListener("click",function(){S.open=-1;draw()});
}
function drawWheel(){
  var c=$("twc");if(!c)return;var d=c.width,x=c.getContext("2d"),n=R.length,a=2*Math.PI/n;
  x.clearRect(0,0,d,d);x.save();x.translate(d/2,d/2);x.rotate(S.rot);
  for(var i=0;i<n;i++){
    x.beginPath();x.moveTo(0,0);x.arc(0,0,d/2-4,i*a-Math.PI/2-a/2,i*a-Math.PI/2+a/2);x.closePath();x.fillStyle=COL[i%COL.length];x.fill();x.strokeStyle="#fff";x.lineWidth=2;x.stroke();
    x.save();x.rotate(i*a);x.translate(0,-(d/2-38));x.font=Math.round(d/13)+"px sans-serif";x.textAlign="center";x.textBaseline="middle";x.fillText(R[i].e,0,0);x.restore();
  }
  x.restore();
  x.beginPath();x.arc(d/2,d/2,26,0,7);x.fillStyle="#fff";x.fill();x.strokeStyle="#ddd";x.lineWidth=3;x.stroke();
}
function resHtml(){
  if(S.pick<0)return '<div class="sub">'+p("hint")+'</div>';
  var r=R[S.pick];
  return '<div class="sub">'+p("res")+'</div><div class="e">'+r.e+'</div><b>'+esc(nm(r))+'</b><button class="tm-go" id="two" style="background:var(--accbg);color:var(--acc)">'+p("open")+'</button>';
}
function spin(){
  if(S.spin)return;S.spin=true;S.pick=-1;
  var btn=$("tws");btn.disabled=true;btn.textContent=p("spinning");$("twr").innerHTML="";
  var n=R.length,a=2*Math.PI/n,target=Math.floor(Math.random()*n);
  // rotation so that slice 'target' is at top: slice center angle = target*a, need rot = -target*a (mod 2pi)
  var start=S.rot%(2*Math.PI),final=-target*a+(Math.random()-.5)*a*.7,turns=5+Math.floor(Math.random()*3);
  var end=start+turns*2*Math.PI+((final-start)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);
  var t0=Date.now(),dur=4200,lastTick=-1;
  (function f(){
    var k=Math.min(1,(Date.now()-t0)/dur),e=1-Math.pow(1-k,3);
    S.rot=start+(end-start)*e;drawWheel();
    var tick=Math.floor(S.rot/a);if(tick!==lastTick){lastTick=tick;if(k<.95)buzz()}
    if(k<1){requestAnimationFrame(f)}else{
      S.rot=end;S.spin=false;S.pick=target;
      var b=$("tws"),r=$("twr");if(b){b.disabled=false;b.textContent=p("again")}if(r){r.innerHTML=resHtml();bindRes()}
      try{Telegram.WebApp.HapticFeedback.notificationOccurred("success")}catch(_){}
    }
  })();
}
function bindRes(){var o=$("two");if(o)o.addEventListener("click",function(){S.open=S.pick;draw();window.scrollTo(0,0)})}
function draw(){
  if(S.open>=0){detail();return}
  var h='<button class="back" id="tb">← '+T[LANG].back+'</button><div class="card"><h2>'+p("title")+'</h2><div class="tm-tabs"><button data-t="0" class="'+(S.tab===0?"on":"")+'">'+p("tab1")+'</button><button data-t="1" class="'+(S.tab===1?"on":"")+'">🎡 '+p("tab2")+'</button></div>';
  if(S.tab===0){
    h+='<input class="tm-s" id="tq" type="search" placeholder="'+p("search")+'" value="'+esc(S.q)+'"><div class="tm-ch"><button class="tm-c'+(S.c<0?" on":"")+'" data-c="-1">'+p("all")+'</button>'+UI.uz.cats.map(function(_,i){return '<button class="tm-c'+(S.c===i?" on":"")+'" data-c="'+i+'">'+cat(i)+'</button>'}).join("")+'</div><div id="tl">'+listHtml()+'</div>';
  }else{
    h+='<div class="tm-w"><div class="tm-p"></div><canvas id="twc" width="600" height="600"></canvas></div><button class="tm-go" id="tws">'+(S.pick<0?p("spin"):p("again"))+'</button><div class="tm-res" id="twr">'+resHtml()+'</div>';
  }
  sec.innerHTML=h+'</div>';
  $("tb").addEventListener("click",function(){show("home")});
  var ts=sec.querySelectorAll("[data-t]");for(var i=0;i<ts.length;i++)ts[i].addEventListener("click",function(){if(S.spin)return;S.tab=+this.getAttribute("data-t");draw()});
  if(S.tab===0){
    $("tq").addEventListener("input",function(){S.q=this.value;$("tl").innerHTML=listHtml();bindList()});
    var cs=sec.querySelectorAll("[data-c]");for(i=0;i<cs.length;i++)cs[i].addEventListener("click",function(){S.c=+this.getAttribute("data-c");draw()});
    bindList();
  }else{drawWheel();$("tws").addEventListener("click",spin);bindRes()}
}
tile.addEventListener("click",function(){S.open=-1;draw();show("taomlar")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();if(sec.classList.contains("on")&&!S.spin)draw()})}
updTile();draw();
})();
