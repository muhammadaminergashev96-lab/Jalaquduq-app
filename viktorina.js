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
var AIW="https://rasm-ai.muhammadaminergashev96.workers.dev";
var UI={
uz:{tile:"Viktorina",tileS:"Bilimingizni sinang",title:"Viktorina",hero:"Bilimingizni sinang",heroS:"10 ta savol, haftalik reyting",solo:"Yakka o‘yin",soloS:"Hamma mavzudan 10 savol",topics:"Mavzular",topicsS:"Mavzuni tanlang",daily:"Kunlik savol",dailyS:"Har kuni yangi savol",rank:"Haftalik reyting",back:"← Viktorina",q:"Savol",of:"/",pts:"ball",score:"Natija",correct:"To‘g‘ri javob",again:"Yana o‘ynash",home:"Bosh sahifa",best:"Eng yaxshi natijangiz",newbest:"Yangi rekord! 🎉",sent:"Reytingga yozildi",rankFail:"Reyting yuklanmadi. Keyinroq urinib ko‘ring.",you:"Siz",noRank:"Hali hech kim o‘ynamagan. Birinchi bo‘ling!",week:"Hafta",players:"o‘yinchi",rightA:"To‘g‘ri! ✅",wrongA:"Noto‘g‘ri ❌",ans:"To‘g‘ri javob:",tomorrow:"Ertaga yangi savol bo‘ladi.",timeup:"Vaqt tugadi ⏱️",privacy:"Reytingda ismingiz ko‘rinadi.",leave:"Chiqish",tp:["O‘zbekiston","Tarix","Geografiya","Din va Islom","Fan va texnika","Sport","Adabiyot va madaniyat","Umumiy bilim"],
 g:["Zo‘r!","Yaxshi!","Yomon emas","Harakat qiling"]},
ru:{tile:"Викторина",tileS:"Проверьте знания",title:"Викторина",hero:"Проверьте свои знания",heroS:"10 вопросов, недельный рейтинг",solo:"Одиночная игра",soloS:"10 вопросов из всех тем",topics:"Темы",topicsS:"Выберите тему",daily:"Вопрос дня",dailyS:"Каждый день новый вопрос",rank:"Недельный рейтинг",back:"← Викторина",q:"Вопрос",of:"/",pts:"очк.",score:"Результат",correct:"Верных ответов",again:"Играть ещё",home:"Главная",best:"Ваш лучший результат",newbest:"Новый рекорд! 🎉",sent:"Записано в рейтинг",rankFail:"Не удалось загрузить рейтинг. Попробуйте позже.",you:"Вы",noRank:"Пока никто не играл. Будьте первым!",week:"Неделя",players:"игроков",rightA:"Верно! ✅",wrongA:"Неверно ❌",ans:"Правильный ответ:",tomorrow:"Завтра будет новый вопрос.",timeup:"Время вышло ⏱️",privacy:"В рейтинге отображается ваше имя.",leave:"Выйти",tp:["Узбекистан","История","География","Религия и ислам","Наука и техника","Спорт","Литература и культура","Общие знания"],
 g:["Отлично!","Хорошо!","Неплохо","Старайтесь"]}
};
var TE=["🇺🇿","🏛️","🌍","🕌","🔬","⚽","📚","💡"],TC=["#10b981","#f59e0b","#3b82f6","#14b8a6","#8b5cf6","#ef4444","#ec4899","#f97316"];
var Q=[];
function q(t,uz,ru,o,ro){Q.push({t:t,q:[uz,ru],o:o,r:ro||null})}
// Har bir savolda birinchi javob — TO‘G‘RI javob (o‘yinda aralashtiriladi). "~" belgisi — kirillchaga o‘tkazilmaydigan belgi/atama.
q(0,"O‘zbekiston poytaxti qaysi shahar?","Какой город является столицей Узбекистана?",["Toshkent","Samarqand","Buxoro","Namangan"],["Ташкент","Самарканд","Бухара","Наманган"]);
q(0,"O‘zbekiston mustaqilligi qaysi yilda e’lon qilingan?","В каком году была провозглашена независимость Узбекистана?",["1991","1989","1990","1992"]);
q(0,"Maydoni bo‘yicha O‘zbekistonning eng katta hududi qaysi?","Какая территория Узбекистана самая большая по площади?",["Qoraqalpog‘iston Respublikasi","Navoiy viloyati","Buxoro viloyati","Qashqadaryo viloyati"],["Республика Каракалпакстан","Навоийская область","Бухарская область","Кашкадарьинская область"]);
q(0,"O‘zbekiston Respublikasi Madhiyasi so‘zlari muallifi kim?","Кто автор слов гимна Республики Узбекистан?",["Abdulla Oripov","Erkin Vohidov","Hamid Olimjon","G‘afur G‘ulom"],["Абдулла Арипов","Эркин Вахидов","Хамид Алимджан","Гафур Гулям"]);
q(0,"Registon maydoni qaysi shaharda joylashgan?","В каком городе находится площадь Регистан?",["Samarqand","Buxoro","Xiva","Toshkent"],["Самарканд","Бухара","Хива","Ташкент"]);
q(0,"O‘zbekistonning eng baland cho‘qqisi — Xazrati Sulton qaysi tog‘ tizmasida joylashgan?","В каком горном хребте находится самая высокая вершина Узбекистана — Хазрет-Султан?",["Hisor","Nurota","Turkiston","Chotqol"],["Гиссарский","Нуратинский","Туркестанский","Чаткальский"]);
q(0,"Imom al-Buxoriy qaysi shaharda tug‘ilgan?","В каком городе родился имам аль-Бухари?",["Buxoro","Samarqand","Xiva","Termiz"],["Бухара","Самарканд","Хива","Термез"]);
q(0,"Ichan-Qal’a qaysi shaharda joylashgan?","В каком городе находится Ичан-Кала?",["Xiva","Buxoro","Qarshi","Urganch"],["Хива","Бухара","Карши","Ургенч"]);
q(0,"Amir Temur qaysi shaharda tug‘ilgan?","В каком городе родился Амир Темур?",["Shahrisabz (Kesh)","Samarqand","Buxoro","Termiz"],["Шахрисабз (Кеш)","Самарканд","Бухара","Термез"]);
q(0,"Toshkent metropoliteni qaysi yilda ochilgan?","В каком году открылся Ташкентский метрополитен?",["1977","1967","1985","1991"]);
q(0,"Navro‘z bayrami qachon nishonlanadi?","Когда отмечается праздник Навруз?",["21-mart","1-yanvar","1-sentyabr","9-may"],["21 марта","1 января","1 сентября","9 мая"]);
q(0,"O‘zbekiston Mustaqillik kuni qachon nishonlanadi?","Когда отмечается День независимости Узбекистана?",["1-sentyabr","8-dekabr","21-mart","9-may"],["1 сентября","8 декабря","21 марта","9 мая"]);
q(0,"O‘zbekistonda nechta viloyat bor (Qoraqalpog‘iston Respublikasi va Toshkent shahridan tashqari)?","Сколько в Узбекистане областей (не считая Республики Каракалпакстан и города Ташкента)?",["12","10","13","14"]);

q(1,"Amir Temur qaysi yilda vafot etgan?","В каком году умер Амир Темур?",["1405","1370","1336","1500"]);
q(1,"«Boburnoma» muallifi kim?","Кто автор «Бабур-наме»?",["Zahiriddin Muhammad Bobur","Alisher Navoiy","Amir Temur","Mirzo Ulug‘bek"],["Захириддин Мухаммад Бабур","Алишер Навои","Амир Темур","Мирзо Улугбек"]);
q(1,"Ikkinchi jahon urushi qaysi yilda tugagan?","В каком году закончилась Вторая мировая война?",["1945","1941","1939","1950"]);
q(1,"Birinchi jahon urushi qaysi yilda boshlangan?","В каком году началась Первая мировая война?",["1914","1905","1918","1939"]);
q(1,"Buyuk Ipak yo‘li qaysi qit’alarni bog‘lagan?","Какие континенты связывал Великий шёлковый путь?",["Osiyo va Yevropa","Amerika va Afrika","Avstraliya va Osiyo","Afrika va Antarktida"],["Азию и Европу","Америку и Африку","Австралию и Азию","Африку и Антарктиду"]);
q(1,"Mirzo Ulug‘bek rasadxonasi qaysi shaharda qurilgan?","В каком городе построена обсерватория Мирзо Улугбека?",["Samarqand","Buxoro","Toshkent","Hirot"],["Самарканд","Бухара","Ташкент","Герат"]);
q(1,"«Algebra» atamasi qaysi buyuk alloma asari nomidan kelib chiqqan?","От названия труда какого учёного произошёл термин «алгебра»?",["Al-Xorazmiy","Ibn Sino","Beruniy","Farobiy"],["Аль-Хорезми","Ибн Сина","Бируни","Фараби"]);
q(1,"«Tib qonunlari» asarining muallifi kim?","Кто автор «Канона врачебной науки»?",["Ibn Sino","Beruniy","Al-Xorazmiy","Imom Buxoriy"],["Ибн Сина","Бируни","Аль-Хорезми","Имам Бухари"]);
q(1,"Xristofor Kolumb Amerikaga qaysi yilda yetib kelgan?","В каком году Христофор Колумб достиг Америки?",["1492","1453","1519","1607"]);
q(1,"Buyuk Fransuz inqilobi qaysi yilda boshlangan?","В каком году началась Великая французская революция?",["1789","1776","1812","1848"]);
q(1,"Insoniyat tarixida birinchi bo‘lib kosmosga uchgan odam kim?","Кто первым в истории человечества полетел в космос?",["Yuriy Gagarin","Nil Armstrong","German Titov","Valentina Tereshkova"],["Юрий Гагарин","Нил Армстронг","Герман Титов","Валентина Терешкова"]);
q(1,"Berlin devori qaysi yilda quladi?","В каком году пала Берлинская стена?",["1989","1961","1991","1945"]);

q(2,"Dunyodagi eng katta okean qaysi?","Какой океан самый большой в мире?",["Tinch okeani","Atlantika okeani","Hind okeani","Shimoliy Muz okeani"],["Тихий океан","Атлантический океан","Индийский океан","Северный Ледовитый океан"]);
q(2,"Amazonka daryosi qaysi qit’ada oqadi?","На каком континенте течёт река Амазонка?",["Janubiy Amerika","Afrika","Osiyo","Shimoliy Amerika"],["Южная Америка","Африка","Азия","Северная Америка"]);
q(2,"Dunyodagi eng baland tog‘ cho‘qqisi qaysi?","Какая самая высокая вершина мира?",["Everest (Chomolungma)","K2","Elbrus","Monblan"],["Эверест (Джомолунгма)","К2","Эльбрус","Монблан"]);
q(2,"Afrikadagi eng katta cho‘l qaysi?","Какая самая большая пустыня Африки?",["Sahroi Kabir","Kalaxari","Namib","Nubiya"],["Сахара","Калахари","Намиб","Нубийская"]);
q(2,"Yaponiya poytaxti qaysi shahar?","Какой город является столицей Японии?",["Tokio","Pekin","Seul","Osaka"],["Токио","Пекин","Сеул","Осака"]);
q(2,"Avstraliya poytaxti qaysi shahar?","Какой город является столицей Австралии?",["Kanberra","Sidney","Melburn","Pert"],["Канберра","Сидней","Мельбурн","Перт"]);
q(2,"Maydoni bo‘yicha eng katta mamlakat qaysi?","Какая страна самая большая по площади?",["Rossiya","Kanada","Xitoy","AQSH"],["Россия","Канада","Китай","США"]);
q(2,"Baykal ko‘li qaysi mamlakatda joylashgan?","В какой стране находится озеро Байкал?",["Rossiya","Qozog‘iston","Mo‘g‘uliston","Xitoy"],["Россия","Казахстан","Монголия","Китай"]);
q(2,"Turkiya poytaxti qaysi shahar?","Какой город является столицей Турции?",["Anqara","Istanbul","Izmir","Bursa"],["Анкара","Стамбул","Измир","Бурса"]);
q(2,"Maydoni bo‘yicha eng kichik qit’a qaysi?","Какой континент самый маленький по площади?",["Avstraliya","Yevropa","Antarktida","Janubiy Amerika"],["Австралия","Европа","Антарктида","Южная Америка"]);
q(2,"Qozog‘iston poytaxti qaysi shahar?","Какой город является столицей Казахстана?",["Ostona","Olmaota","Bishkek","Toshkent"],["Астана","Алматы","Бишкек","Ташкент"]);
q(2,"Dunyodagi eng baland sharshara qaysi?","Какой водопад самый высокий в мире?",["Anxel (Venesuela)","Niagara","Viktoriya","Iguasu"],["Анхель (Венесуэла)","Ниагарский","Виктория","Игуасу"]);

q(3,"Islomning nechta ustuni (farzi) bor?","Сколько столпов у ислама?",["5","4","6","7"]);
q(3,"Ramazon hijriy yilning nechanchi oyi?","Каким по счёту месяцем хиджрийского года является Рамадан?",["9","7","10","12"]);
q(3,"Qur’oni Karimda nechta sura bor?","Сколько сур в Священном Коране?",["114","99","110","120"]);
q(3,"Musulmonlar namozda qaysi tomonga yuzlanadi?","В какую сторону обращаются мусульмане во время намаза?",["Ka’ba (Makka)","Madina","Quddus","Sharq"],["Кааба (Мекка)","Медина","Иерусалим","Восток"]);
q(3,"Qur’on nozil bo‘la boshlagan oy qaysi?","В каком месяце начал ниспосылаться Коран?",["Ramazon","Shavvol","Rajab","Muharram"],["Рамадан","Шавваль","Раджаб","Мухаррам"]);
q(3,"Islomning birinchi xalifasi kim?","Кто был первым халифом ислама?",["Abu Bakr","Umar","Usmon","Ali"],["Абу Бакр","Умар","Усман","Али"]);
q(3,"Kuniga necha vaqt farz namozi o‘qiladi?","Сколько обязательных намазов совершается в день?",["5","3","4","6"]);
q(3,"Payg‘ambarimiz Muhammad (s.a.v.) Makkadan qaysi shaharga hijrat qilgan?","В какой город совершил хиджру пророк Мухаммад (с.а.в.) из Мекки?",["Madina","Quddus","Toif","Damashq"],["Медина","Иерусалим","Таиф","Дамаск"]);
q(3,"Qur’onning eng uzun surasi qaysi?","Какая сура Корана самая длинная?",["Baqara","Fotiha","Ixlos","Yosin"],["Аль-Бакара","Аль-Фатиха","Аль-Ихлас","Ясин"]);
q(3,"Juma namozi haftaning qaysi kunida o‘qiladi?","В какой день недели совершается пятничный намаз?",["Juma","Payshanba","Shanba","Yakshanba"],["Пятница","Четверг","Суббота","Воскресенье"]);
q(3,"«Sahih al-Buxoriy» qanday asar?","Что представляет собой «Сахих аль-Бухари»?",["Hadislar to‘plami","Tafsir","Fiqh kitobi","Tarixiy asar"],["Сборник хадисов","Толкование Корана","Книга по фикху","Исторический труд"]);
q(3,"Haj amallaridan Arafotda turish qaysi shahar yaqinida bajariladi?","Вблизи какого города совершается стояние на Арафате во время хаджа?",["Makka","Madina","Jidda","Toif"],["Мекка","Медина","Джидда","Таиф"]);

q(4,"Suvning kimyoviy formulasi qanday?","Какова химическая формула воды?",["~H2O","~CO2","~O2","~NaCl"]);
q(4,"Quyosh tizimidagi eng katta sayyora qaysi?","Какая планета Солнечной системы самая большая?",["Yupiter","Saturn","Neptun","Yer"],["Юпитер","Сатурн","Нептун","Земля"]);
q(4,"Katta yoshli odam skeletida nechta suyak bor?","Сколько костей в скелете взрослого человека?",["206","106","300","150"]);
q(4,"Yorug‘lik 1 soniyada taxminan qancha masofani bosib o‘tadi?","Какое расстояние проходит свет примерно за 1 секунду?",["300 000 km","30 000 km","3 000 km","3 000 000 km"]);
q(4,"Oyga birinchi bo‘lib qadam qo‘ygan inson kim?","Кто первым ступил на Луну?",["Nil Armstrong","Yuriy Gagarin","Baz Oldrin","Maykl Kollinz"],["Нил Армстронг","Юрий Гагарин","Базз Олдрин","Майкл Коллинз"]);
q(4,"Oltinning kimyoviy belgisi qaysi?","Каков химический символ золота?",["~Au","~Ag","~Fe","~Cu"]);
q(4,"Quyoshga eng yaqin sayyora qaysi?","Какая планета ближе всего к Солнцу?",["Merkuriy","Venera","Mars","Yer"],["Меркурий","Венера","Марс","Земля"]);
q(4,"Yer atmosferasining asosiy qismini qaysi gaz tashkil qiladi?","Какой газ составляет основную часть атмосферы Земли?",["Azot","Kislorod","Karbonat angidrid","Vodorod"],["Азот","Кислород","Углекислый газ","Водород"]);
q(4,"Bir baytda nechta bit bor?","Сколько бит в одном байте?",["8","4","16","10"]);
q(4,"Quyidagilardan qaysi biri eng qattiq mineral?","Какой из этих минералов самый твёрдый?",["Olmos","Kvars","Talk","Gips"],["Алмаз","Кварц","Тальк","Гипс"]);
q(4,"Odatda telefonning ixtirochisi deb kim tan olinadi?","Кого обычно признают изобретателем телефона?",["Aleksandr Bell","Tomas Edison","Nikola Tesla","Gulyelmo Markoni"],["Александр Белл","Томас Эдисон","Никола Тесла","Гульельмо Маркони"]);
q(4,"Yer Quyosh atrofida bir marta to‘liq aylanishi uchun qancha vaqt ketadi?","За какое время Земля совершает полный оборот вокруг Солнца?",["Taxminan 365 kun","30 kun","24 soat","7 kun"],["Около 365 дней","30 дней","24 часа","7 дней"]);

q(5,"Futbolda maydonda bir jamoadan nechta o‘yinchi o‘ynaydi?","Сколько игроков одной команды одновременно находятся на поле в футболе?",["11","9","10","12"]);
q(5,"Yozgi Olimpiya o‘yinlari necha yilda bir marta o‘tkaziladi?","Раз в сколько лет проводятся летние Олимпийские игры?",["4","2","3","5"]);
q(5,"2022-yilgi futbol bo‘yicha jahon chempionatida kim g‘olib bo‘lgan?","Кто выиграл чемпионат мира по футболу 2022 года?",["Argentina","Fransiya","Braziliya","Xorvatiya"],["Аргентина","Франция","Бразилия","Хорватия"]);
q(5,"2018-yilgi futbol bo‘yicha jahon chempionati qaysi mamlakatda o‘tkazilgan?","В какой стране проходил чемпионат мира по футболу 2018 года?",["Rossiya","Qatar","Braziliya","Germaniya"],["Россия","Катар","Бразилия","Германия"]);
q(5,"Marafon yugurish masofasi qancha?","Какова дистанция марафонского бега?",["42 km 195 m","21 km","50 km","30 km"],["42 км 195 м","21 км","50 км","30 км"]);
q(5,"Olimpiya bayrog‘idagi halqalar soni nechta?","Сколько колец на олимпийском флаге?",["5","4","6","7"]);
q(5,"Shaxmatda qaysi dona eng kuchli hisoblanadi?","Какая фигура в шахматах считается самой сильной?",["Farzin","Fil","Ot","Rux"],["Ферзь","Слон","Конь","Ладья"]);
q(5,"Uimbldon turniri qaysi sport turiga oid?","К какому виду спорта относится Уимблдонский турнир?",["Tennis","Golf","Kriket","Regbi"],["Теннис","Гольф","Крикет","Регби"]);
q(5,"Kurash qaysi mamlakatning an’anaviy kurash turi hisoblanadi?","Курош — традиционный вид борьбы какой страны?",["O‘zbekiston","Yaponiya","Turkiya","Mo‘g‘uliston"],["Узбекистана","Японии","Турции","Монголии"]);
q(5,"Kristianu Ronaldu qaysi mamlakat terma jamoasida o‘ynaydi?","За сборную какой страны играет Криштиану Роналду?",["Portugaliya","Ispaniya","Braziliya","Argentina"],["Португалии","Испании","Бразилии","Аргентины"]);
q(5,"2024-yilgi yozgi Olimpiya o‘yinlari qaysi shaharda o‘tkazilgan?","В каком городе прошли летние Олимпийские игры 2024 года?",["Parij","Tokio","Rio-de-Janeyro","London"],["Париж","Токио","Рио-де-Жанейро","Лондон"]);
q(5,"Futbolda asosiy o‘yin vaqti necha daqiqa?","Сколько минут длится основное время футбольного матча?",["90","60","80","120"]);

q(6,"«Xamsa» asarining muallifi kim?","Кто автор «Хамсы»?",["Alisher Navoiy","Bobur","Fuzuliy","Lutfiy"],["Алишер Навои","Бабур","Физули","Лутфи"]);
q(6,"«O‘tkan kunlar» romanining muallifi kim?","Кто автор романа «Минувшие дни»?",["Abdulla Qodiriy","Cho‘lpon","G‘afur G‘ulom","Oybek"],["Абдулла Кадыри","Чулпан","Гафур Гулям","Ойбек"]);
q(6,"«Shum bola» qissasining muallifi kim?","Кто автор повести «Шум бола»?",["G‘afur G‘ulom","Abdulla Qodiriy","Oybek","Hamza"],["Гафур Гулям","Абдулла Кадыри","Ойбек","Хамза"]);
q(6,"«Alpomish» qanday asar?","Что представляет собой «Алпамыш»?",["Xalq dostoni","Roman","Drama","Ertaklar to‘plami"],["Народный дастан","Роман","Драма","Сборник сказок"]);
q(6,"«Hamlet» tragediyasi muallifi kim?","Кто автор трагедии «Гамлет»?",["Vilyam Shekspir","Dante","Servantes","Gyote"],["Уильям Шекспир","Данте","Сервантес","Гёте"]);
q(6,"«Urush va tinchlik» romani muallifi kim?","Кто автор романа «Война и мир»?",["Lev Tolstoy","Fyodor Dostoyevskiy","Anton Chexov","Aleksandr Pushkin"],["Лев Толстой","Фёдор Достоевский","Антон Чехов","Александр Пушкин"]);
q(6,"«Kichik shahzoda» asari muallifi kim?","Кто автор «Маленького принца»?",["Antuan de Sent-Ekzyuperi","Jyul Vern","Viktor Gyugo","Aleksandr Dyuma"],["Антуан де Сент-Экзюпери","Жюль Верн","Виктор Гюго","Александр Дюма"]);
q(6,"«Mona Liza» portretini kim chizgan?","Кто написал портрет «Мона Лиза»?",["Leonardo da Vinchi","Mikelanjelo","Rafael","Pikasso"],["Леонардо да Винчи","Микеланджело","Рафаэль","Пикассо"]);
q(6,"«Qutadg‘u bilig» asarining muallifi kim?","Кто автор «Кутадгу билиг»?",["Yusuf Xos Hojib","Mahmud Koshg‘ariy","Ahmad Yassaviy","Rabg‘uziy"],["Юсуф Хас Хаджиб","Махмуд Кашгари","Ахмад Ясави","Рабгузи"]);
q(6,"«Devonu lug‘otit turk» asarining muallifi kim?","Кто автор «Диван лугат ат-тюрк»?",["Mahmud Koshg‘ariy","Yusuf Xos Hojib","Alisher Navoiy","Bobur"],["Махмуд Кашгари","Юсуф Хас Хаджиб","Алишер Навои","Бабур"]);
q(6,"«Ikki eshik orasi» romanining muallifi kim?","Кто автор романа «Ики эшик орасы»?",["O‘tkir Hoshimov","Abdulla Qahhor","Pirimqul Qodirov","Said Ahmad"],["Уткир Хашимов","Абдулла Каххар","Пиримкул Кадыров","Саид Ахмад"]);
q(6,"Doira qanday turdagi cholg‘u asbobi?","К какому типу музыкальных инструментов относится дойра?",["Zarbli","Torli","Nafasli","Klavishli"],["Ударный","Струнный","Духовой","Клавишный"]);

q(7,"Ipak qurti nima bilan oziqlanadi?","Чем питается тутовый шелкопряд?",["Tut bargi","Paxta","Bug‘doy","Olma bargi"],["Листьями шелковицы","Хлопком","Пшеницей","Листьями яблони"]);
q(7,"Quruqlikdagi eng tez yuguruvchi hayvon qaysi?","Какое сухопутное животное бегает быстрее всех?",["Gepard","Sher","Ot","Yo‘lbars"],["Гепард","Лев","Лошадь","Тигр"]);
q(7,"Dunyodagi eng katta sutemizuvchi hayvon qaysi?","Какое млекопитающее самое большое в мире?",["Ko‘k kit","Fil","Jirafa","Kashalot"],["Синий кит","Слон","Жираф","Кашалот"]);
q(7,"12 × 12 nechiga teng?","Сколько будет 12 × 12?",["144","124","154","134"]);
q(7,"Pi (π) soni taxminan nechaga teng?","Чему примерно равно число Пи (π)?",["3,14","2,17","3,41","4,13"]);
q(7,"Uchburchak ichki burchaklari yig‘indisi necha gradus?","Чему равна сумма внутренних углов треугольника?",["180°","90°","360°","270°"]);
q(7,"Ona tili sifatida eng ko‘p kishi so‘zlashadigan til qaysi?","Какой язык имеет больше всего носителей?",["Xitoy (mandarin)","Ingliz","Ispan","Hind"],["Китайский (мандаринский)","Английский","Испанский","Хинди"]);
q(7,"Qaysi hayvon «cho‘l kemasi» deb ataladi?","Какое животное называют «кораблём пустыни»?",["Tuya","Ot","Eshak","Fil"],["Верблюд","Лошадь","Осёл","Слон"]);
q(7,"Qaysi sutemizuvchi hayvon uchishga qodir?","Какое млекопитающее умеет летать?",["Ko‘rshapalak","Boyqush","Kapalak","Qarg‘a"],["Летучая мышь","Сова","Бабочка","Ворона"]);
q(7,"Inson tanasidagi eng katta a’zo qaysi?","Какой орган самый большой в теле человека?",["Teri","Jigar","Miya","O‘pka"],["Кожа","Печень","Мозг","Лёгкие"]);
q(7,"Tomoni 5 sm bo‘lgan kvadratning perimetri qancha?","Чему равен периметр квадрата со стороной 5 см?",["20 sm","10 sm","25 sm","15 sm"],["20 см","10 см","25 см","15 см"]);
q(7,"Dunyodagi eng mashhur qidiruv tizimi qaysi?","Какая поисковая система самая популярная в мире?",["~Google","~Bing","~Yahoo","~DuckDuckGo"]);

function p(k){return LANG==="ru"?UI.ru[k]:tr(UI.uz[k])}
function pa(k,i){return LANG==="ru"?UI.ru[k][i]:tr(UI.uz[k][i])}
function qt(it){return LANG==="ru"?it.q[1]:tr(it.q[0])}
function ot(it,i){
  var s=(LANG==="ru"&&it.r)?it.r[i]:it.o[i];
  if(s.charAt(0)==="~")return s.slice(1);
  return LANG==="ru"?s:tr(s);
}
function $(id){return document.getElementById(id)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function rng(seed){var a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function shuffle(a,r){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(r()*(i+1)),x=a[i];a[i]=a[j];a[j]=x}return a}
function dayNum(){return Math.floor((Date.now()+5*3600e3)/864e5)}
function gcd(a,b){return b?gcd(b,a%b):a}
function init(){try{return window.Telegram&&Telegram.WebApp&&Telegram.WebApp.initData||""}catch(e){return ""}}
function buzz(k){try{var H=Telegram.WebApp.HapticFeedback;if(k==="ok")H.notificationOccurred("success");else if(k==="bad")H.notificationOccurred("error");else H.impactOccurred("light")}catch(e){try{navigator.vibrate&&navigator.vibrate(k==="bad"?[40,30,40]:15)}catch(_){}}}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
var LIM=20000,COLS=["#ef4444","#3b82f6","#d97706","#10b981"];
var css=document.createElement("style");
css.textContent=".vk-hero{border-radius:18px;padding:18px;background:linear-gradient(135deg,#6d28d9,#8b5cf6);color:#fff;margin-bottom:12px}.vk-hero h3{margin:0 0 4px;font-size:24px}.vk-hero p{margin:0;opacity:.9;font-size:14px}.vk-g2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}.vk-t{border:0;border-radius:18px;padding:16px;color:#fff;text-align:left;font-family:inherit;min-height:120px;display:flex;flex-direction:column;justify-content:flex-end}.vk-t .e{font-size:30px;margin-bottom:auto}.vk-t b{font-size:17px}.vk-t span{font-size:12px;opacity:.9;margin-top:2px}.vk-w{width:100%;border:1px solid var(--line);background:var(--bg);color:var(--text);border-radius:14px;padding:14px;text-align:left;font-family:inherit;display:flex;gap:12px;align-items:center;margin-bottom:10px}.vk-w .e{font-size:28px}.vk-w b{display:block;font-size:16px}.vk-w small{color:var(--mut);font-size:12px}.vk-bar{height:8px;border-radius:6px;background:var(--line);overflow:hidden;margin:6px 0 14px}.vk-bar i{display:block;height:100%;width:100%;background:var(--acc);transition:width .1s linear}.vk-hd{display:flex;justify-content:space-between;font-size:14px;color:var(--mut);font-weight:700}.vk-q{font-size:20px;font-weight:700;line-height:1.35;margin:4px 0 14px}.vk-o{width:100%;border:0;border-radius:14px;padding:15px 14px;margin-bottom:10px;color:#fff;font-size:16px;font-weight:700;text-align:left;font-family:inherit;transition:opacity .2s,transform .1s}.vk-o:active{transform:scale(.98)}.vk-o.dim{opacity:.35}.vk-o.ok{outline:4px solid #22c55e;opacity:1}.vk-o.bad{outline:4px solid #fff;opacity:1;filter:grayscale(.6)}.vk-big{text-align:center;margin:10px 0}.vk-big b{font-size:54px;color:var(--acc);display:block;line-height:1.1}.vk-big span{color:var(--mut)}.vk-btn{width:100%;padding:14px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-weight:700;font-size:16px;font-family:inherit;margin-top:8px}.vk-btn.s{background:var(--accbg);color:var(--acc)}.vk-r{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--line);font-size:15px}.vk-r:first-of-type{border-top:0}.vk-r b{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vk-r .n{width:32px;text-align:center;font-weight:800;color:var(--mut)}.vk-r.me{background:var(--accbg);border-radius:10px;padding-left:6px;padding-right:6px}.vk-m{font-size:13px;color:var(--mut);text-align:center;margin-top:10px}.vk-fb{text-align:center;font-weight:800;font-size:17px;margin:4px 0 10px;min-height:24px}";
document.head.appendChild(css);
var sec=document.createElement("div");sec.className="sec";sec.id="viktorina";document.body.appendChild(sec);
var tile=document.createElement("button");tile.className="tile";tile.style.background="linear-gradient(135deg,#6d28d9,#a78bfa)";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🧠</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}
var S={v:"home",G:null,timer:null,topicCount:[]};
for(var ti=0;ti<8;ti++)S.topicCount[ti]=Q.filter(function(x){return x.t===ti}).length;
function stopT(){if(S.timer){clearInterval(S.timer);S.timer=null}}
function head(back){return '<button class="back" id="vb">'+(back||"← "+T[LANG].back)+'</button>'}
function bindBack(fn){var b=$("vb");if(b)b.addEventListener("click",fn)}
function goHome(){stopT();S.G=null;S.v="home";draw()}
function bestScore(){return +ls("vkb")||0}
function dailyInfo(){
  var N=Q.length,d=dayNum(),step=31;while(gcd(step,N)!==1)step++;
  var idx=(d*step)%N,it=Q[idx],order=shuffle([0,1,2,3],rng(d*977+idx));
  var st=null;try{st=JSON.parse(ls("vkd")||"null")}catch(e){}
  if(st&&st.d!==d)st=null;
  return {d:d,it:it,order:order,st:st};
}
function drawHome(){
  var dl=dailyInfo(),b=bestScore();
  sec.innerHTML=head("← "+T[LANG].back)+'<div class="card"><div class="vk-hero"><h3>🧠 '+p("hero")+'</h3><p>'+p("heroS")+'</p></div>'+
  '<div class="vk-g2"><button class="vk-t" id="vs" style="background:linear-gradient(135deg,#7c3aed,#4f46e5)"><div class="e">🎯</div><b>'+p("solo")+'</b><span>'+p("soloS")+'</span></button><button class="vk-t" id="vt" style="background:linear-gradient(135deg,#0d9488,#10b981)"><div class="e">🗂️</div><b>'+p("topics")+'</b><span>'+p("topicsS")+'</span></button></div>'+
  '<button class="vk-w" id="vd"><span class="e">🔥</span><span><b>'+p("daily")+'</b><small>'+(dl.st?(dl.st.ok?p("rightA"):p("wrongA")):p("dailyS"))+'</small></span></button>'+
  '<button class="vk-w" id="vr"><span class="e">🏆</span><span><b>'+p("rank")+'</b><small>'+(b?p("best")+': '+b:p("privacy"))+'</small></span></button></div>';
  $("vb").addEventListener("click",function(){show("home")});
  $("vs").addEventListener("click",function(){start(-1)});
  $("vt").addEventListener("click",function(){S.v="topics";draw()});
  $("vd").addEventListener("click",function(){S.v="daily";draw()});
  $("vr").addEventListener("click",function(){S.v="rank";draw()});
}
function drawTopics(){
  var h=head("← "+p("title"))+'<div class="card"><h2>'+p("topics")+'</h2><div class="vk-g2">';
  for(var i=0;i<8;i++)h+='<button class="vk-t" data-t="'+i+'" style="background:'+TC[i]+'"><div class="e">'+TE[i]+'</div><b>'+esc(pa("tp",i))+'</b><span>'+S.topicCount[i]+' '+(LANG==="ru"?"вопр.":p("q").toLowerCase())+'</span></button>';
  sec.innerHTML=h+'</div></div>';
  bindBack(function(){S.v="home";draw()});
  var bs=sec.querySelectorAll("[data-t]");for(var j=0;j<bs.length;j++)bs[j].addEventListener("click",function(){start(+this.getAttribute("data-t"))});
}
function start(topic){
  var pool=Q.filter(function(x){return topic<0||x.t===topic});
  var list=shuffle(pool,Math.random).slice(0,10);
  S.G={list:list,n:0,score:0,ok:0,topic:topic};
  S.v="game";nextQ();
}
function nextQ(){
  var G=S.G;
  if(G.n>=G.list.length){finish();return}
  var it=G.list[G.n];G.cur={it:it,order:shuffle([0,1,2,3],Math.random),locked:false,t0:Date.now()};
  S.v="game";drawGame();
  stopT();
  S.timer=setInterval(function(){
    var left=LIM-(Date.now()-G.cur.t0),bar=$("vkb");
    if(bar)bar.style.width=Math.max(0,left/LIM*100)+"%";
    if(left<=0){stopT();answer(-1)}
  },100);
}
function drawGame(){
  var G=S.G,c=G.cur;
  var h='<button class="back" id="vb">'+p("leave")+'</button><div class="card"><div class="vk-hd"><span>'+p("q")+' '+(G.n+1)+p("of")+G.list.length+'</span><span>'+G.score+' '+p("pts")+'</span></div><div class="vk-bar"><i id="vkb"></i></div><div class="vk-q">'+esc(qt(c.it))+'</div><div class="vk-fb" id="vf"></div>';
  c.order.forEach(function(oi,pos){h+='<button class="vk-o" data-o="'+oi+'" style="background:'+COLS[pos]+'">'+esc(ot(c.it,oi))+'</button>'});
  sec.innerHTML=h+'</div>';
  $("vb").addEventListener("click",goHome);
  var bs=sec.querySelectorAll("[data-o]");for(var i=0;i<bs.length;i++)bs[i].addEventListener("click",function(){stopT();answer(+this.getAttribute("data-o"))});
}
function answer(oi){
  var G=S.G,c=G.cur;if(!c||c.locked)return;c.locked=true;
  var ok=oi===0,left=Math.max(0,LIM-(Date.now()-c.t0));
  if(ok){G.ok++;G.score+=100+Math.round(left/LIM*50)}
  buzz(ok?"ok":"bad");
  var bs=sec.querySelectorAll("[data-o]");
  for(var i=0;i<bs.length;i++){var v=+bs[i].getAttribute("data-o");if(v===0)bs[i].className+=" ok";else if(v===oi)bs[i].className+=" bad";else bs[i].className+=" dim"}
  var f=$("vf");if(f)f.textContent=oi<0?p("timeup"):(ok?p("rightA"):p("wrongA"));
  var hd=sec.querySelector(".vk-hd span:last-child");if(hd)hd.textContent=G.score+' '+p("pts");
  setTimeout(function(){if(S.G===G&&S.v==="game"){G.n++;nextQ()}},ok?900:1500);
}
function finish(){
  stopT();var G=S.G,prev=bestScore(),nb=G.score>prev;
  if(nb)ls("vkb",String(G.score));
  S.v="result";
  var gi=G.ok>=9?0:G.ok>=7?1:G.ok>=5?2:3;
  sec.innerHTML=head("← "+p("title"))+'<div class="card"><div class="vk-big"><span>'+pa("g",gi)+'</span><b>'+G.score+'</b><span>'+p("pts")+'</span></div><div class="vk-m" style="font-size:16px;color:var(--text)">'+p("correct")+': <b>'+G.ok+'</b> / '+G.list.length+'</div>'+(nb&&G.score>0?'<div class="vk-fb" style="margin-top:10px">'+p("newbest")+'</div>':'')+'<div class="vk-m" id="vks"></div>'+
  '<button class="vk-btn" id="va">'+p("again")+'</button><button class="vk-btn s" id="vr2">🏆 '+p("rank")+'</button><button class="vk-btn s" id="vh">'+p("home")+'</button></div>';
  bindBack(goHome);
  $("va").addEventListener("click",function(){start(G.topic)});
  $("vr2").addEventListener("click",function(){S.v="rank";draw()});
  $("vh").addEventListener("click",goHome);
  buzz("ok");
  var ini=init();
  if(ini&&G.ok>0){
    fetch(AIW+"/score",{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({init:ini,score:G.score,correct:G.ok})})
     .then(function(r){return r.json()}).then(function(j){var e=$("vks");if(e&&j&&j.ok)e.textContent=p("sent")}).catch(function(){});
  }
}
function drawDaily(){
  var dl=dailyInfo(),it=dl.it,st=dl.st;
  var h=head("← "+p("title"))+'<div class="card"><h2>🔥 '+p("daily")+'</h2><div class="vk-q">'+esc(qt(it))+'</div><div class="vk-fb" id="vf">'+(st?(st.ok?p("rightA"):p("wrongA")):"")+'</div>';
  dl.order.forEach(function(oi,pos){
    var cls="vk-o";if(st){cls+=oi===0?" ok":(oi===st.pick?" bad":" dim")}
    h+='<button class="'+cls+'" data-o="'+oi+'" style="background:'+COLS[pos]+'"'+(st?" disabled":"")+'>'+esc(ot(it,oi))+'</button>';
  });
  if(st)h+='<div class="vk-m">'+p("tomorrow")+'</div>';
  sec.innerHTML=h+'</div>';
  bindBack(function(){S.v="home";draw()});
  if(!st){var bs=sec.querySelectorAll("[data-o]");for(var i=0;i<bs.length;i++)bs[i].addEventListener("click",function(){
    var pick=+this.getAttribute("data-o");ls("vkd",JSON.stringify({d:dl.d,pick:pick,ok:pick===0}));buzz(pick===0?"ok":"bad");drawDaily();
  })}
}
function drawRank(){
  sec.innerHTML=head("← "+p("title"))+'<div class="card"><h2>🏆 '+p("rank")+'</h2><div id="vrl"><div class="vk-m">…</div></div><div class="vk-m">'+p("privacy")+'</div></div>';
  bindBack(function(){S.v="home";draw()});
  fetch(AIW+"/top",{method:"POST",headers:{"Content-Type":"text/plain"},body:init()}).then(function(r){return r.json()}).then(function(j){
    if(S.v!=="rank")return;var el=$("vrl");if(!el)return;
    if(!j||!j.rows){el.innerHTML='<div class="vk-m">'+p("rankFail")+'</div>';return}
    var h='<div class="vk-m" style="margin:0 0 6px">'+p("week")+': '+esc(j.week)+' · '+j.total+' '+p("players")+'</div>';
    if(!j.rows.length)h+='<div class="vk-m">'+p("noRank")+'</div>';
    j.rows.forEach(function(r,i){
      var me=j.me&&j.me.rank===i+1;
      h+='<div class="vk-r'+(me?' me':'')+'"><span class="n">'+(i<3?["🥇","🥈","🥉"][i]:(i+1))+'</span><b>'+esc(r.n)+(me?' ('+p("you")+')':'')+'</b><span>'+r.s+'</span></div>';
    });
    if(j.me&&j.me.rank>20)h+='<div class="vk-r me"><span class="n">'+j.me.rank+'</span><b>'+p("you")+'</b><span>'+j.me.s+'</span></div>';
    el.innerHTML=h;
  }).catch(function(){var el=$("vrl");if(el)el.innerHTML='<div class="vk-m">'+p("rankFail")+'</div>'});
}
function draw(){
  if(S.v==="game"&&S.G){drawGame();return}
  if(S.v==="topics")drawTopics();
  else if(S.v==="daily")drawDaily();
  else if(S.v==="rank")drawRank();
  else if(S.v==="result"&&S.G){finish2()}
  else{S.v="home";drawHome()}
}
function finish2(){S.v="home";drawHome()}
tile.addEventListener("click",function(){stopT();S.G=null;S.v="home";draw();show("viktorina")});
var lb=document.querySelectorAll(".lang button");
for(var j=0;j<lb.length;j++){lb[j].addEventListener("click",function(){updTile();if(sec.classList.contains("on")&&S.v!=="game"&&S.v!=="result")draw()})}
updTile();draw();
})();
