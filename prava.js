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
function X(u,uo,r,ro){return{u:u,uo:uo,a:0,r:r,ro:ro}}
var Q2=[
X("Tartibga solingan chorrahada svetofor yashil yonganda haydovchi nima qiladi?",["Chorrahada qolgan transportga va piyodalarga yo‘l berib, harakatni davom ettiradi","Hamma narsadan qat’i nazar birinchi bo‘lib o‘tadi","Signal berib piyodalarni haydaydi"],"Что делает водитель при зелёном сигнале на регулируемом перекрёстке?",["Продолжает движение, уступив тем, кто ещё завершает проезд, и пешеходам","Проезжает первым несмотря ни на что","Сигналит пешеходам"]),
X("Svetoforning sariq signali nimani bildiradi?",["Harakatni to‘xtatish tayyorgarligi; xavfsiz to‘xtash imkoni bo‘lmasa, davom etish mumkin","Tezlikni oshirib o‘tish kerak","Faqat piyodalar o‘tishi mumkin"],"Что означает жёлтый сигнал светофора?",["Подготовка к остановке; если остановиться безопасно нельзя, можно продолжить","Нужно ускориться и проехать","Проходить могут только пешеходы"]),
X("Svetofor ishlamayotgan (o‘chgan) chorrahada qanday harakatlanish kerak?",["Ustuvorlik belgilari yoki umumiy qoidalar bo‘yicha","Eng tez haydagan o‘tadi","Katta mashina o‘tadi"],"Как двигаться на перекрёстке с неработающим светофором?",["По знакам приоритета или по общим правилам","Проезжает самый быстрый","Проезжает самая большая машина"]),
X("Tartibga soluvchi (GAI inspektori) ishorasi va svetofor signali bir-biriga zid bo‘lsa, kimga bo‘ysunish kerak?",["Tartibga soluvchi ishorasiga","Svetofor signaliga","Yo‘l belgisiga"],"Чьим сигналам нужно подчиняться, если сигналы регулировщика и светофора противоречат?",["Сигналам регулировщика","Сигналам светофора","Дорожному знаку"]),
X("Asosiy yo‘l va ikkinchi darajali yo‘l kesishganda kim yo‘l berishi kerak?",["Ikkinchi darajali yo‘ldagi haydovchi","Asosiy yo‘ldagi haydovchi","O‘ngdagi haydovchi har doim"],"Кто должен уступить при пересечении главной и второстепенной дорог?",["Водитель на второстепенной дороге","Водитель на главной дороге","Всегда водитель справа"]),
X("Chorrahada chapga burilayotgan haydovchi qarshidan to‘g‘ri yoki o‘ngga ketayotgan transportga qanday munosabatda bo‘ladi?",["Yo‘l beradi","Birinchi o‘tadi","Signal berib o‘tadi"],"Как поступает водитель, поворачивающий налево, по отношению к встречному транспорту, едущему прямо или направо?",["Уступает дорогу","Проезжает первым","Проезжает, подав сигнал"]),
X("Piyodalar o‘tish joyida piyoda yo‘lga chiqqan bo‘lsa, haydovchi nima qiladi?",["To‘xtab, piyodaga yo‘l beradi","Tezlikni oshirib o‘tib ketadi","Signal berib piyodani to‘xtatadi"],"Что делает водитель, если пешеход вступил на проезжую часть на пешеходном переходе?",["Останавливается и уступает дорогу","Ускоряется и проезжает","Сигналит, чтобы пешеход остановился"]),
X("Piyodalar o‘tish joyi oldida boshqa transport to‘xtab turgan bo‘lsa, siz qanday harakat qilasiz?",["To‘xtayman: u piyodaga yo‘l berayotgan bo‘lishi mumkin, uni quvib o‘tmayman","Uni quvib o‘tib ketaman","Tezlikni oshiraman"],"Как поступить, если перед пешеходным переходом стоит другое транспортное средство?",["Остановиться: оно может уступать пешеходу, обгонять его нельзя","Объезжаю его на скорости","Ускоряюсь"]),
X("Quvib o‘tish nima?",["O‘sha yo‘nalishda harakatlanayotgan sekinroq transportdan oldinga o‘tish","Chorrahada burilish","To‘xtash"],"Что такое обгон?",["Опережение движущегося в том же направлении транспорта с выездом на полосу встречного движения","Поворот на перекрёстке","Остановка"]),
X("Quvib o‘tish qaysi hollarda taqiqlanadi?",["Piyodalar o‘tish joylarida va ko‘rinish cheklangan joylarda","Faqat kunduzi","Faqat yomg‘irda"],"В каких случаях обгон запрещён?",["На пешеходных переходах и там, где ограничена видимость","Только днём","Только в дождь"]),
X("Quvib o‘tib bo‘lgach, o‘z qatoringizga qachon qaytasiz?",["Quvib o‘tilgan transportga xalaqit bermay, xavfsiz masofa bo‘lganda","Darhol, kesib o‘tib","Tezlikni oshirmasdan oldin"],"Когда следует вернуться на свою полосу после обгона?",["Когда можно сделать это, не создавая помех обогнанному транспорту","Сразу, подрезав","Только после ускорения"]),
X("«Kirish taqiqlangan» (g‘isht) belgisi nimani bildiradi?",["Ushbu yo‘nalishda transport vositalarining kirishi taqiqlanadi","Faqat yuk mashinalari kirmaydi","Faqat to‘xtash taqiqlanadi"],"Что означает знак «Въезд запрещён» (кирпич)?",["Въезд всех транспортных средств в данном направлении запрещён","Запрещён въезд только грузовых","Запрещена только остановка"]),
X("«Bir tomonlama harakat» belgisi nimani bildiradi?",["Yo‘lda faqat ko‘rsatilgan yo‘nalishda harakatlanish mumkin","Faqat to‘xtash mumkin","Qarama-qarshi harakat bor"],"Что означает знак «Односторонное движение»?",["Движение по дороге разрешено только в указанном направлении","Можно только остановиться","Есть встречное движение"]),
X("Zangori (ko‘k) rangdagi dumaloq belgilar nimani bildiradi?",["Buyuruvchi: faqat ko‘rsatilgan harakatga ruxsat beradi","Ogohlantiradi","Taqiqlaydi"],"Что означают круглые знаки синего цвета?",["Предписывающие: разрешают только указанное движение","Предупреждающие","Запрещающие"]),
X("Uchburchak shakldagi qizil hoshiyali belgilar odatda nimani bildiradi?",["Ogohlantiradi: xavfli joy oldinda","Taqiqlaydi","Ma’lumot beradi"],"Что обычно означают треугольные знаки с красной каймой?",["Предупреждают об опасном участке впереди","Запрещают","Информируют"]),
X("To‘rtburchak ko‘k belgilar (ma’lumot-ishora) nimani bildiradi?",["Ma’lumot beradi yoki ishora qiladi","Taqiqlaydi","Ogohlantiradi"],"Что означают прямоугольные синие знаки (информационно-указательные)?",["Информируют или указывают","Запрещают","Предупреждают"]),
X("Yo‘l chizig‘i va yo‘l belgisi bir-biriga zid bo‘lsa, nimaga amal qilinadi?",["Yo‘l belgisiga","Chiziqqa","Ikkalasiga ham ixtiyoriy"],"Чем руководствоваться, если разметка и знак противоречат друг другу?",["Дорожным знаком","Разметкой","На выбор"]),
X("Uzuq-uzuq (punktir) o‘rta chiziq nimani bildiradi?",["Qarama-qarshi harakat bo‘lgan yo‘lda chiziqni kesib o‘tishga qoidalar doirasida ruxsat beriladi","Chiziqni kesish mutlaqo taqiqlanadi","To‘xtash taqiqlanadi"],"Что означает прерывистая осевая линия?",["Её пересечение допускается в рамках правил","Пересекать запрещено","Остановка запрещена"]),
X("Piyodalar o‘tish joyi oldida to‘xtash chizig‘i bo‘lmasa, haydovchi qayerda to‘xtaydi?",["Piyodalar o‘tish joyi oldida, piyodalarga xalaqit bermaydigan joyda","O‘tish joyining o‘rtasida","Piyodalar yo‘lagida"],"Где останавливается водитель, если перед переходом нет стоп-линии?",["Перед пешеходным переходом, не мешая пешеходам","Посередине перехода","На тротуаре"]),
X("Burilish ko‘rsatkichi (povorotnik) qachon yoqilishi kerak?",["Manevrni boshlashdan oldin, oldindan","Burilish paytida","Burilgandan keyin"],"Когда нужно включить указатель поворота?",["Заранее, до начала маневра","Во время поворота","После поворота"]),
X("Avariya signali (avariya chiroqlari) qachon yoqiladi?",["Yo‘l-transport hodisasida, to‘xtashga majbur bo‘lganda va xavfni ogohlantirish uchun","Doim, tumanda emas","Har safar to‘xtaganda"],"Когда включается аварийная сигнализация?",["При ДТП, вынужденной остановке и для предупреждения об опасности","Всегда, кроме тумана","При каждой остановке"]),
X("Avariya to‘xtash belgisi (uchburchak) nima uchun qo‘yiladi?",["Boshqa haydovchilarni to‘xtab qolgan transport haqida ogohlantirish uchun","Parkovka joyini egallash uchun","Yo‘lni yopib qo‘yish uchun"],"Для чего ставится знак аварийной остановки?",["Чтобы предупредить других водителей о стоящем транспортном средстве","Чтобы занять место парковки","Чтобы перекрыть дорогу"]),
X("Ko‘rinish tuman, yomg‘ir yoki qor tufayli yomonlashganda nima qilish kerak?",["Tezlikni kamaytirib, tegishli chiroqlarni yoqish","Tezlikni oshirish","Faqat o‘lchamli chiroqlar bilan yurish"],"Что делать при ухудшении видимости из-за тумана, дождя или снега?",["Снизить скорость и включить соответствующие огни","Увеличить скорость","Ехать только с габаритами"]),
X("Qorong‘i vaqtda yoritilmagan yo‘lda qaysi chiroqlar ishlatiladi?",["Yaqinni yoki uzoqni yoritish chiroqlari","Faqat o‘lchamli chiroqlar","Faqat tuman chiroqlari"],"Какие огни используются в тёмное время на неосвещённой дороге?",["Ближний или дальний свет","Только габариты","Только противотуманные"]),
X("Transport vositasini to‘xtatib qo‘yganda nima qilish kerak?",["Dvigatelni o‘chirib, qo‘l tormozini tortish va kalitni olish","Dvigatel yoniq qoldirish","Eshikni ochiq qoldirish"],"Что нужно сделать, оставляя транспортное средство?",["Заглушить двигатель, включить стояночный тормоз и взять ключ","Оставить двигатель включённым","Оставить дверь открытой"]),
X("Qanday joyda to‘xtash va to‘xtab turish taqiqlanadi?",["Piyodalar o‘tish joyida va undan oldin yaqin masofada","Faqat tunda","Faqat shahar tashqarisida"],"Где запрещены остановка и стоянка?",["На пешеходных переходах и вблизи них","Только ночью","Только за городом"]),
X("«To‘xtash taqiqlangan» va «To‘xtab turish taqiqlangan» belgilarining farqi nimada?",["Birinchisida to‘xtash ham taqiqlanadi; ikkinchisida uzoq to‘xtab turish taqiqlanadi","Hech qanday farq yo‘q","Ikkalasida ham yo‘lovchi tushirish mumkin"],"В чём разница между знаками «Остановка запрещена» и «Стоянка запрещена»?",["Первый запрещает и остановку; второй запрещает длительную стоянку","Разницы нет","Оба разрешают высадку пассажиров"]),
X("Haydovchi guvohnomasini yo‘qotib qo‘ysa, nima qilishi kerak?",["Qaytadan olish uchun vakolatli organga murojaat qiladi","Boshqa guvohnoma bilan haydaydi","Guvohnomasiz haydashda davom etadi"],"Что должен сделать водитель, потерявший водительское удостоверение?",["Обратиться в уполномоченный орган для восстановления","Ездить по чужому удостоверению","Продолжить ездить без него"]),
X("Transport vositasini haydash huquqiga ega bo‘lmagan shaxsga boshqarish uchun berish mumkinmi?",["Yo‘q, taqiqlanadi","Ha, agar u tanish bo‘lsa","Ha, qisqa masofaga"],"Можно ли передать управление лицу, не имеющему права управления?",["Нет, запрещено","Да, если он знакомый","Да, на короткое расстояние"]),
X("Yo‘l-transport hodisasida jabrlanganlarga birinchi yordam qanday ko‘rsatiladi?",["Tez yordam chaqirish va imkon qadar birinchi tibbiy yordam ko‘rsatish","Jabrlanganni darhol joyidan sudrab chiqarish","Hech narsa qilmay ketish"],"Как оказывается помощь пострадавшим в ДТП?",["Вызвать скорую и по возможности оказать первую помощь","Немедленно вытаскивать пострадавшего любой ценой","Уехать с места"]),
X("Ko‘p qon ketayotgan jarohatda birinchi yordamda nima qilinadi?",["Qon ketishini to‘xtatish uchun jarohat ustidan bosim yoki bog‘lam qo‘yiladi","Jarohatni suv bilan ishqalash","Hech narsa qilinmaydi"],"Что делают при сильном кровотечении при оказании первой помощи?",["Останавливают кровотечение давящей повязкой или нажатием","Трут рану водой","Ничего не делают"]),
X("Yo‘l-transport hodisasi sodir bo‘lgan joyni tark etish mumkinmi?",["Yo‘q, bu taqiqlanadi","Ha, agar zarar kichik bo‘lsa","Ha, agar shoshilayotgan bo‘lsa"],"Можно ли покинуть место ДТП, участником которого вы являетесь?",["Нет, запрещено","Да, если ущерб небольшой","Да, если спешите"]),
X("Yo‘lovchi tashiyotgan haydovchi nimaga javobgar?",["Yo‘lovchilarning xavfsizligi va qoidalarga rioya qilinishi uchun","Faqat o‘z xavfsizligi uchun","Hech narsaga"],"За что отвечает водитель, перевозящий пассажиров?",["За безопасность пассажиров и соблюдение правил","Только за свою безопасность","Ни за что"]),
X("Bolalarni avtomobil old o‘rindig‘ida tashish qanday amalga oshiriladi?",["Maxsus bolalar o‘rindig‘i yoki mos tutqich vositalari bilan","Quchoqda ushlab","Mahkamlamasdan"],"Как перевозят детей на переднем сиденье автомобиля?",["С использованием детского удерживающего устройства","На руках","Без фиксации"]),
X("Avtomobil eshigini ochishdan oldin nima qilish kerak?",["Orqadan kelayotgan transport yoki piyoda yo‘qligiga ishonch hosil qilish","Zudlik bilan ochish","Faqat oynani tushirish"],"Что нужно сделать перед открытием двери автомобиля?",["Убедиться, что нет приближающегося транспорта или пешеходов","Открыть сразу","Только опустить стекло"]),
X("Orqaga harakatlanishda haydovchi nima qiladi?",["Xavfsizligiga ishonch hosil qilib, kerak bo‘lsa yordamchi yordamida harakat qiladi","Tez orqaga chiqadi","Ko‘zgularga qaramaydi"],"Что должен делать водитель при движении задним ходом?",["Убедиться в безопасности, при необходимости воспользоваться помощью","Быстро сдать назад","Не смотреть в зеркала"]),
X("Qayrilib olish (U-burilish) qaysi joylarda taqiqlanadi?",["Ko‘rinish cheklangan joylarda va ko‘prik, tunnelda","Faqat chorrahada","Hamma joyda mumkin"],"Где запрещён разворот?",["В местах с ограниченной видимостью, на мостах и в тоннелях","Только на перекрёстках","Можно везде"]),
X("Tormozlanish masofasi tezlik oshgani sari qanday o‘zgaradi?",["Ortadi","Kamayadi","O‘zgarmaydi"],"Как меняется тормозной путь при увеличении скорости?",["Увеличивается","Уменьшается","Не меняется"]),
X("Oldingi transport bilan qanday masofa saqlanishi kerak?",["Xavfsiz, tezlik va yo‘l sharoitiga mos masofa","Imkon qadar yaqin","Masofa muhim emas"],"Какую дистанцию нужно соблюдать до впереди идущего транспорта?",["Безопасную, соответствующую скорости и дорожным условиям","Как можно ближе","Дистанция не важна"]),
X("Muz va qor bo‘lgan yo‘lda tormoz berishda nima qilish kerak?",["Silliq, bosqichma-bosqich tormozlash","Keskin tormozlash","Tormozlamaslik"],"Как тормозить на дороге со льдом и снегом?",["Плавно и постепенно","Резко","Не тормозить"]),
X("Qishda shinalar haqida qaysi talab to‘g‘ri?",["Shinalar yo‘l sharoitiga va mavsumga mos bo‘lishi kerak","Mavsumning ahamiyati yo‘q","Eskirgan shina yetarli"],"Какое требование к шинам зимой верно?",["Шины должны соответствовать сезону и дорожным условиям","Сезон не важен","Достаточно изношенных шин"]),
X("Haydovchi reaksiyani sekinlashtiruvchi dori ichgan bo‘lsa, nima qilishi kerak?",["Rulga o‘tirmaydi","Ehtiyotkorlik bilan haydaydi","Faqat shahar ichida haydaydi"],"Что должен сделать водитель, если принял лекарство, замедляющее реакцию?",["Не садиться за руль","Ехать осторожно","Ехать только по городу"]),
X("Alkogol ichgan haydovchi rulga o‘tirishi mumkinmi?",["Yo‘q, mumkin emas","Ha, oz miqdor bo‘lsa","Ha, tun bo‘lsa"],"Может ли водитель, употребивший алкоголь, управлять автомобилем?",["Нет, нельзя","Да, если немного","Да, ночью"]),
X("Haydovchi rul ortida qanday holatda bo‘lishi kerak?",["Charchamagan, e’tiborli va sog‘lig‘i yo‘l qo‘ymasa haydamaydi","Uyqusirab ham haydashi mumkin","Faqat tez haydaydi"],"В каком состоянии должен быть водитель за рулём?",["Бодрым и внимательным; при плохом самочувствии не ехать","Можно ехать сонным","Только быстро"]),
X("Velosipedchiga yaqinlashganda qanday harakat qilish kerak?",["Yetarli yon masofani saqlash","Yaqinidan o‘tib ketish","Signal bilan qo‘rqitish"],"Как поступить при приближении к велосипедисту?",["Соблюдать достаточный боковой интервал","Проезжать вплотную","Сигналить, чтобы напугать"]),
X("Ko‘rish qobiliyati yomon yoki nogiron piyodani (oq tayoq bilan) ko‘rsangiz nima qilasiz?",["Yo‘l berib, to‘xtab, o‘tishiga yordam beraman","Signal berib o‘tib ketaman","Tezlikni oshiraman"],"Что вы сделаете, увидев слепого пешехода с белой тростью?",["Остановлюсь и уступлю дорогу","Просигналю и проеду","Ускорюсь"]),
X("Maktab yoki bolalar bog‘chasi yonidan o‘tganda qanday harakat qilinadi?",["Tezlikni kamaytirib, ehtiyotkor bo‘lish","Odatdagi tezlikda","Signal berib o‘tish"],"Как двигаться возле школы или детского сада?",["Снизить скорость и быть особенно внимательным","С обычной скоростью","С сигналом"]),
X("Temir yo‘l kesishmasida shlagbaum tushayotgan yoki tushirilgan bo‘lsa, nima qilinadi?",["To‘xtab, temir yo‘l kesishmasiga kirmaslik","Tez o‘tib ketish","Shlagbaum yonidan aylanib o‘tish"],"Что делать, если шлагбаум на переезде опускается или опущен?",["Остановиться и не въезжать на переезд","Проскочить","Объехать шлагбаум"]),
X("Temir yo‘l kesishmasida transport to‘xtab qolsa, haydovchi nima qiladi?",["Odamlarni tushirib, poyezdni to‘xtatish choralarini ko‘radi","Mashinada kutib o‘tiradi","Ishlamay qolgan mashinani qoldirib ketadi"],"Что делает водитель, если на переезде заглох автомобиль?",["Высаживает людей и принимает меры для остановки поезда","Ждёт в машине","Бросает машину и уходит"]),
X("Tramvay yo‘li kesishmasida kimga ustuvorlik beriladi?",["Tramvayga","Avtomobilga","Piyodaga qarama-qarshi"],"Кому уступают при пересечении трамвайных путей на равнозначном перекрёстке?",["Трамваю","Автомобилю","Встречному пешеходу"]),
X("Transport vositasining texnik nosozligi bo‘lsa, haydash mumkinmi?",["Tormoz yoki rul boshqaruvi nosoz bo‘lsa, taqiqlanadi","Har doim mumkin","Faqat kunduzi mumkin"],"Можно ли управлять транспортным средством при технической неисправности?",["При неисправности тормозов или рулевого управления запрещено","Всегда можно","Только днём"]),
X("Dvigatel qizib ketsa, haydovchi nima qiladi?",["Xavfsiz joyda to‘xtab, sovishini kutadi","Tezlikni oshiradi","Qopqoqni darhol ochadi"],"Что делает водитель при перегреве двигателя?",["Останавливается в безопасном месте и даёт остыть","Увеличивает скорость","Сразу открывает крышку радиатора"]),
X("Avtomobilning yuk ortish qoidalari qanday?",["Yuk mahkamlangan bo‘lishi va ko‘rinishga xalaqit bermasligi kerak","Yuk ixtiyoriy joylashtiriladi","Ko‘zgularni to‘sib qo‘yish mumkin"],"Каковы правила размещения груза в автомобиле?",["Груз должен быть закреплён и не ограничивать обзор","Груз размещается произвольно","Можно закрывать зеркала"]),
X("Yo‘lovchi tashiganda avtomobilga ruxsat etilgandan ortiq odam o‘tirg‘izish mumkinmi?",["Yo‘q, taqiqlanadi","Ha, qisqa yo‘lda","Ha, bolalar bo‘lsa"],"Можно ли перевозить пассажиров сверх разрешённого количества?",["Нет, запрещено","Да, на короткие расстояния","Да, если это дети"]),
X("Tez yordam yoki yong‘in mashinasi ko‘k chiroq va sirena bilan kelayotganda siz nima qilasiz?",["Yo‘l beraman: o‘ngga olib, to‘xtayman yoki sekinlayman","Tezlashaman","O‘rtada to‘xtayman"],"Как поступить при приближении спецтранспорта с синими маячками и сиреной?",["Уступить дорогу: принять вправо и остановиться или снизить скорость","Ускориться","Остановиться посередине"]),
X("Piyoda yo‘lning qayerida yurishi kerak?",["Yo‘lakda, bo‘lmasa yo‘l chetida harakatga qarshi","Yo‘lning o‘rtasida","Istalgan joyda"],"Где должны идти пешеходы?",["По тротуару, а при его отсутствии — по краю дороги навстречу движению","По середине дороги","Где угодно"]),
X("Piyodalar yo‘lni qayerda kesib o‘tishi kerak?",["Piyodalar o‘tish joyida","Yo‘lning istalgan joyida","Chorrahada transport orasidan"],"Где пешеходы должны переходить дорогу?",["По пешеходному переходу","В любом месте","Между машинами на перекрёстке"]),
X("Velosipedchi yo‘lda qanday harakat qiladi?",["Yo‘lning o‘ng chetida, qoidalarga rioya qilib","Yo‘lning o‘rtasida","Chap tomonda qarshi harakatda"],"Как должен двигаться велосипедист по дороге?",["По правому краю, соблюдая правила","По середине","По левой стороне навстречу движению"]),
X("Mototsiklchi nimaga rioya qilishi kerak?",["Dubulg‘a taqishi","Faqat kunduzi haydashi","Dubulg‘a shart emas"],"Что обязан соблюдать мотоциклист?",["Быть в застёгнутом мотошлеме","Ездить только днём","Шлем не обязателен"]),
X("O‘quv haydovchi (instruktor yonida) mashinada qanday belgi bo‘lishi kerak?",["«O‘quv avtomobili» belgisi","Hech qanday","«Bolalar tashiladi»"],"Какой знак должен быть на учебном автомобиле?",["Опознавательный знак «Учебное транспортное средство»","Никакого","«Перевозка детей»"]),
X("Tumanda orqadagi tuman chiroq qachon yoqiladi?",["Ko‘rinish juda yomon bo‘lganda","Doim","Hech qachon"],"Когда включают задний противотуманный фонарь?",["При очень плохой видимости","Всегда","Никогда"]),
X("Yo‘l qurilishi (ta’mirlash) belgisi oldida haydovchi nima qiladi?",["Tezlikni kamaytirib, ehtiyot bo‘ladi","Tezlikni oshiradi","E’tibor bermaydi"],"Что делает водитель перед знаком «Дорожные работы»?",["Снижает скорость и проявляет осторожность","Увеличивает скорость","Не обращает внимания"]),
X("Tunnelda qanday harakat qilinadi?",["Yaqin chiroqlarni yoqib, masofani saqlab","Quvib o‘tib","Tunnel ichida to‘xtab"],"Как двигаться в тоннеле?",["С включённым ближним светом, соблюдая дистанцию","Совершая обгон","Останавливаясь внутри"]),
X("Qiyalikda (tepalikda) qanday to‘xtab turiladi?",["Qo‘l tormozi va uzatma yoqilgan, g‘ildiraklar yo‘l chetiga burilgan holda","Faqat neytralda","Tormozsiz"],"Как оставляют автомобиль на уклоне?",["С включённым стояночным тормозом и передачей, колёса повёрнуты к обочине","Только на нейтрали","Без торможения"]),
X("Qatorlar bo‘yicha harakatlanishda haydovchi qaysi qatordan yuradi?",["Yo‘l sharoiti va tezligiga mos, imkon qadar o‘ng qatordan","Doim chap qatordan","Doim o‘rtadan"],"Какой полосой движется водитель на многополосной дороге?",["Подходящей скорости и условиям, как правило правой","Всегда левой","Всегда средней"]),
X("Telefon bilan gaplashish haydovchining e’tiboriga qanday ta’sir qiladi?",["E’tiborni pasaytiradi va xavfni oshiradi","Ta’sir qilmaydi","E’tiborni oshiradi"],"Как разговор по телефону влияет на внимание водителя?",["Снижает внимание и повышает риск","Не влияет","Повышает внимание"]),
X("Yo‘ldagi chuqur yoki to‘siq oldidan qanday harakat qilinadi?",["Tezlikni kamaytirib, xavfsiz aylanib o‘tish yoki sekin o‘tish","Tezlikni oshirib o‘tish","Keskin burilish"],"Как поступить перед выбоиной или препятствием?",["Снизить скорость, безопасно объехать или проехать медленно","Проехать на скорости","Резко свернуть"]),
X("Yo‘lda qo‘qqisdan sakrab chiqqan hayvon bo‘lsa, haydovchi nima qiladi?",["Mumkin qadar xavfsiz tormoz berib, xavfni kamaytirishga harakat qiladi","Keskin rulni buradi","Tezlikni oshiradi"],"Что делает водитель, если на дорогу внезапно выбежало животное?",["Старается безопасно затормозить, не создавая аварийной ситуации","Резко выворачивает руль","Ускоряется"]),
X("Rul boshqaruvida qo‘llar qanday bo‘lishi kerak?",["Ikkala qo‘l bilan ishonchli ushlab","Bir qo‘l bilan","Rulni qo‘yib yuborib"],"Как нужно держать руль?",["Двумя руками, надёжно","Одной рукой","Отпустив руль"]),
X("Haydovchi yon ko‘zgularni qachon sozlaydi?",["Harakatni boshlashdan oldin","Harakatda","Hech qachon"],"Когда водитель настраивает зеркала?",["Перед началом движения","В пути","Никогда"]),
X("Tormoz tizimidagi nosozlik belgisi sezilsa, nima qilinadi?",["Xavfsiz joyda to‘xtab, nosozlik bartaraf etilmaguncha haydamaslik","Davom etib haydash","Tezlikni oshirish"],"Что делать при признаках неисправности тормозной системы?",["Остановиться в безопасном месте и не ехать до устранения","Продолжить движение","Увеличить скорость"]),
X("Haydovchi harakatdan oldin nimaga ishonch hosil qiladi?",["Avtomobil texnik jihatdan soz va xavfsizlik kamari taqilgan","Faqat yoqilg‘i borligiga","Hech narsaga"],"В чём убеждается водитель перед началом движения?",["Автомобиль исправен, ремни пристёгнуты","Только в наличии топлива","Ни в чём"]),
X("«Yo‘l bering» belgisi qo‘yilgan joyda kimga yo‘l beriladi?",["Asosiy yo‘ldagi transportga","Ikkinchi darajali yo‘ldagi transportga","Faqat piyodalarga"],"Кому уступают дорогу перед знаком «Уступите дорогу»?",["Транспорту на главной дороге","Транспорту на второстепенной дороге","Только пешеходам"]),
X("«Asosiy yo‘l» belgisi nimani bildiradi?",["Ushbu yo‘lda harakatlanuvchi kesishmalarda ustuvorlikka ega","Barcha chorrahalarda yo‘l beradi","To‘xtash taqiqlangan"],"Что означает знак «Главная дорога»?",["Движущийся по ней имеет преимущество на перекрёстках","Нужно уступать на всех перекрёстках","Остановка запрещена"]),
X("Piyodalar yo‘lagida (trotuarda) transport to‘xtatish mumkinmi?",["Yo‘q, belgilangan hollardan tashqari taqiqlanadi","Ha, doim","Ha, tunda"],"Можно ли ставить автомобиль на тротуаре?",["Нет, кроме специально обозначенных случаев","Да, всегда","Да, ночью"]),
X("Texnik ko‘rikdan o‘tmagan transport vositasini boshqarish mumkinmi?",["Belgilangan hollarda taqiqlanadi; ko‘rik muddatini kuzatish kerak","Har doim mumkin","Faqat shaharda"],"Можно ли управлять транспортным средством, не прошедшим технический осмотр?",["В установленных случаях запрещено; нужно следить за сроком осмотра","Всегда можно","Только в городе"]),
X("Majburiy sug‘urta (fuqarolik javobgarligi) polisi bo‘lmasa, haydash mumkinmi?",["Yo‘q, polis bo‘lishi shart","Ha, doim","Faqat shahar tashqarisida"],"Можно ли управлять автомобилем без обязательного страхового полиса?",["Нет, полис обязателен","Да, всегда","Только за городом"]),
X("Transport vositasini boshqarishda televizor yoki video ko‘rish mumkinmi?",["Yo‘q, haydovchi e’tiborini chalg‘itadi","Ha, ovozsiz","Ha, to‘xtamasdan"],"Можно ли смотреть видео за рулём во время движения?",["Нет, это отвлекает водителя","Да, без звука","Да, не останавливаясь"])
];
Q=Q.concat(Q2);
/* ===== Rasmli savollar (o‘zimiz chizgan SVG) ===== */
var RED="#d32f2f",BLUE="#1565c0";
function svg(vb,inner){return '<svg viewBox="'+vb+'" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto">'+inner+'</svg>'}
var WALK='<circle cx="20" cy="8" r="6"/><path d="M20 16 L20 38 M20 20 L10 32 M20 20 L30 30 M20 38 L12 56 M20 38 L28 56" stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"/>';
function walker(x,y,k,col){return '<g transform="translate('+x+','+y+') scale('+k+')" style="color:'+col+'" fill="'+col+'">'+WALK+'</g>'}
function carSide(x,y,k,col){return '<g transform="translate('+x+','+y+') scale('+k+')"><path d="M4 22 L4 14 Q4 12 7 11 L16 10 L22 3 Q23 2 25 2 L40 2 Q42 2 43 3 L50 10 L55 11 Q58 12 58 15 L58 22 Z" fill="'+col+'"/><circle cx="16" cy="23" r="5" fill="#111"/><circle cx="46" cy="23" r="5" fill="#111"/></g>'}
function carTop(x,y,w,h,col){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(w*.3)+'" fill="'+col+'"/><rect x="'+(x+w*.15)+'" y="'+(y+h*.22)+'" width="'+(w*.7)+'" height="'+(h*.18)+'" rx="2" fill="rgba(255,255,255,.55)"/>'}
function arrowUp(col,sw){return '<path d="M50 80 L50 32 M32 50 L50 28 L68 50" stroke="'+col+'" stroke-width="'+(sw||9)+'" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'}
function tri(c){return '<polygon points="50,8 95,87 5,87" fill="#fff" stroke="'+RED+'" stroke-width="9" stroke-linejoin="round"/>'+c}
function ring(c){return '<circle cx="50" cy="50" r="43" fill="#fff" stroke="'+RED+'" stroke-width="10"/>'+c}
function mand(c){return '<circle cx="50" cy="50" r="46" fill="'+BLUE+'"/>'+c}
function info(c){return '<rect x="5" y="5" width="90" height="90" rx="11" fill="'+BLUE+'" stroke="#fff" stroke-width="2"/>'+c}
var SG={
 stop:'<polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill="'+RED+'" stroke="#fff" stroke-width="3"/><text x="50" y="60" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="27" fill="#fff">STOP</text>',
 yield:'<polygon points="6,12 94,12 50,92" fill="#fff" stroke="'+RED+'" stroke-width="9" stroke-linejoin="round"/>',
 main:'<polygon points="50,3 97,50 50,97 3,50" fill="#fff" stroke="#222" stroke-width="2"/><polygon points="50,14 86,50 50,86 14,50" fill="#f7c600" stroke="#222" stroke-width="2"/>',
 noent:'<circle cx="50" cy="50" r="46" fill="'+RED+'"/><rect x="19" y="43" width="62" height="14" fill="#fff"/>',
 nomove:'<circle cx="50" cy="50" r="43" fill="#fff" stroke="'+RED+'" stroke-width="10"/>',
 speed:ring('<text x="50" y="63" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="38" fill="#111">40</text>'),
 noover:ring(carTop(30,30,15,32,RED)+carTop(55,38,15,32,"#222")),
 nostop:'<circle cx="50" cy="50" r="43" fill="'+BLUE+'" stroke="'+RED+'" stroke-width="10"/><path d="M26 26 L74 74 M74 26 L26 74" stroke="'+RED+'" stroke-width="9"/>',
 nopark:'<circle cx="50" cy="50" r="43" fill="'+BLUE+'" stroke="'+RED+'" stroke-width="10"/><path d="M24 76 L76 24" stroke="'+RED+'" stroke-width="9"/>',
 noleft:ring('<path d="M62 78 L62 44 Q62 34 52 34 L36 34 M46 20 L32 34 L46 48" stroke="#111" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 78 L78 22" stroke="'+RED+'" stroke-width="8"/>'),
 nouturn:ring('<path d="M64 76 L64 42 Q64 26 50 26 Q36 26 36 42 L36 56 M24 46 L36 60 L48 46" stroke="#111" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 78 L78 22" stroke="'+RED+'" stroke-width="8"/>'),
 straight:mand(arrowUp("#fff",10)),
 right:mand('<g transform="rotate(90 50 50)">'+arrowUp("#fff",10)+'</g>'),
 pedpath:mand(walker(30,22,.95,"#fff")),
 ped:info('<polygon points="50,14 84,76 16,76" fill="#fff"/>'+walker(40,38,.55,"#111")+'<path d="M24 82 L76 82" stroke="#fff" stroke-width="3"/>'),
 oneway:info('<path d="M50 84 L50 30 M30 50 L50 26 L70 50" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),
 park:info('<text x="50" y="72" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="68" fill="#fff">P</text>'),
 kids:tri(walker(30,36,.42,"#111")+walker(52,42,.34,"#111")),
 barrier:tri('<rect x="22" y="56" width="56" height="9" fill="#111"/><rect x="28" y="56" width="8" height="9" fill="#fff"/><rect x="44" y="56" width="8" height="9" fill="#fff"/><rect x="60" y="56" width="8" height="9" fill="#fff"/><rect x="24" y="40" width="5" height="30" fill="#111"/><rect x="71" y="40" width="5" height="30" fill="#111"/>'),
 slip:tri(carSide(28,36,.75,"#111")+'<path d="M28 74 q5-6 10 0 t10 0 t10 0 t10 0" stroke="#111" stroke-width="3" fill="none"/>'),
 works:tri(walker(26,36,.5,"#111")+'<path d="M52 42 L68 66" stroke="#111" stroke-width="3"/><polygon points="52,72 62,58 74,72" fill="#111"/>'),
 curve:tri('<path d="M42 76 L42 52 Q42 38 56 38 L62 38" stroke="#111" stroke-width="6" fill="none" stroke-linecap="round"/><polygon points="60,29 74,38 60,47" fill="#111"/>'),
 light:tri('<rect x="38" y="30" width="24" height="46" rx="5" fill="#111"/><circle cx="50" cy="40" r="5" fill="'+RED+'"/><circle cx="50" cy="53" r="5" fill="#f7c600"/><circle cx="50" cy="66" r="5" fill="#2e7d32"/>')
};
function sign(k,w){return '<div style="width:'+(w||120)+'px;margin:0 auto">'+svg("0 0 100 100",SG[k])+'</div>'}
function nested(k,x,y,w){return '<svg x="'+x+'" y="'+y+'" width="'+w+'" height="'+w+'" viewBox="0 0 100 100">'+SG[k]+'</svg>'}

/* chorraha / yo‘l sahnalari */
function carG(side,col,turn){
  var pos={S:[140,198,0],N:[100,42,180],E:[198,100,-90],W:[42,140,90]}[side];
  var path="";
  if(turn==="s")path='M0 -26 L0 -62';
  else if(turn==="r")path='M0 -26 L0 -40 Q0 -52 12 -52 L30 -52';
  else if(turn==="l")path='M0 -26 L0 -40 Q0 -52 -12 -52 L-30 -52';
  var head=turn==="s"?'<polygon points="-5,-60 5,-60 0,-72" fill="#fff"/>':(turn==="r"?'<polygon points="28,-57 28,-47 40,-52" fill="#fff"/>':(turn==="l"?'<polygon points="-28,-57 -28,-47 -40,-52" fill="#fff"/>':''));
  return '<g transform="translate('+pos[0]+','+pos[1]+') rotate('+pos[2]+')">'+(path?'<path d="'+path+'" stroke="#fff" stroke-width="3" fill="none" stroke-dasharray="5 4"/>'+head:'')+carTop(-11,-19,22,38,col)+'</g>';
}
function inter(cars,signs){
  var b='<rect width="240" height="240" fill="#cfd8c9"/><rect x="80" y="0" width="80" height="240" fill="#565b63"/><rect x="0" y="80" width="240" height="80" fill="#565b63"/>';
  b+='<path d="M120 0 L120 80 M120 160 L120 240 M0 120 L80 120 M160 120 L240 120" stroke="#fff" stroke-width="2" stroke-dasharray="10 8"/>';
  cars.forEach(function(c){b+=carG(c[0],c[1],c[2])});
  (signs||[]).forEach(function(s){b+=nested(s[0],s[1],s[2],s[3]||34)});
  return svg("0 0 240 240",b);
}
var YOU="#e53935",OTH="#1e88e5";
function roadV(cars,center,extra){
  var b='<rect width="240" height="220" fill="#cfd8c9"/><rect x="60" y="0" width="120" height="220" fill="#565b63"/><path d="M60 0 L60 220 M180 0 L180 220" stroke="#fff" stroke-width="3"/>';
  b+=center==="solid"?'<path d="M120 0 L120 220" stroke="#fff" stroke-width="4"/>':'<path d="M120 0 L120 220" stroke="#fff" stroke-width="4" stroke-dasharray="16 12"/>';
  cars.forEach(function(c){b+=carTop(c[0]-11,c[1]-19,22,38,c[2])});
  return svg("0 0 240 220",b+(extra||""));
}
function zebra(){
  var b='<rect width="240" height="240" fill="#cfd8c9"/><rect x="80" y="0" width="80" height="240" fill="#565b63"/><rect x="0" y="95" width="80" height="50" fill="#b9bfc4"/><rect x="160" y="95" width="80" height="50" fill="#b9bfc4"/><path d="M120 0 L120 240" stroke="#fff" stroke-width="2" stroke-dasharray="10 8"/>';
  for(var i=0;i<6;i++)b+='<rect x="'+(84+i*13)+'" y="92" width="8" height="56" fill="#fff"/>';
  return b;
}
var Z=zebra();
var QZ_PED=svg("0 0 240 240",Z+carTop(129,170,22,38,YOU)+'<g transform="translate(70,100)"><circle cx="8" cy="3" r="4" fill="#ffb300"/><rect x="3" y="8" width="10" height="16" rx="3" fill="#ffb300"/></g><path d="M85 118 L100 118" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/>');
var QZ_PED2=svg("0 0 240 240",Z+carTop(129,196,22,38,YOU)+carTop(129,152,22,38,OTH)+'<g transform="translate(150,98)"><circle cx="8" cy="3" r="4" fill="#ffb300"/><rect x="3" y="8" width="10" height="16" rx="3" fill="#ffb300"/></g>');
var QLIGHT=svg("0 0 240 240",'<rect width="240" height="240" fill="#cfd8c9"/><rect x="80" y="0" width="80" height="240" fill="#565b63"/><rect x="0" y="80" width="240" height="60" fill="#565b63"/><rect x="120" y="140" width="40" height="5" fill="#fff"/><path d="M120 0 L120 240" stroke="#fff" stroke-width="2" stroke-dasharray="10 8"/>'+carTop(129,170,22,38,YOU)+'<rect x="166" y="150" width="10" height="34" rx="3" fill="#222"/><circle cx="171" cy="157" r="3.5" fill="#f44336"/><circle cx="171" cy="167" r="3.5" fill="#555"/><circle cx="171" cy="177" r="3.5" fill="#555"/>');

function PX(img,u,uo,r,ro){return{img:img,u:u,uo:uo,a:0,r:r,ro:ro}}
var QP=[
 PX(sign("stop"),"Ushbu belgi nimani bildiradi?",["To‘xtash shart; to‘xtash chizig‘i oldida to‘liq to‘xtab, yo‘l berish kerak","Faqat sekinlashish kerak","To‘xtab turish taqiqlanadi"],"Что означает этот знак?",["Остановка обязательна: полностью остановиться у стоп-линии и уступить дорогу","Нужно только снизить скорость","Стоянка запрещена"]),
 PX(sign("yield"),"Ushbu belgi nimani bildiradi?",["Kesishayotgan yo‘ldagi asosiy yo‘l transportiga yo‘l berish kerak","Chorrahada to‘xtash shart","Yo‘lda ustuvorlik sizda"],"Что означает этот знак?",["Нужно уступить дорогу транспорту на пересекаемой главной дороге","Остановка обязательна","Вы имеете преимущество"]),
 PX(sign("main"),"Ushbu belgi nimani bildiradi?",["Asosiy yo‘l: chorrahalarda ustuvorlik sizda","Ikkinchi darajali yo‘l","Yo‘l tugadi"],"Что означает этот знак?",["Главная дорога: на перекрёстках вы имеете преимущество","Второстепенная дорога","Дорога закончилась"]),
 PX(sign("noent"),"Ushbu belgi nimani bildiradi?",["Kirish taqiqlangan","Faqat yuk mashinalariga kirish taqiqlangan","Harakat tugagan"],"Что означает этот знак?",["Въезд запрещён","Въезд запрещён только грузовым","Движение закончилось"]),
 PX(sign("nomove"),"Ushbu belgi nimani bildiradi?",["Harakat taqiqlangan (barcha transport uchun)","Faqat to‘xtash taqiqlangan","Faqat quvib o‘tish taqiqlangan"],"Что означает этот знак?",["Движение запрещено (всем транспортным средствам)","Запрещена только остановка","Запрещён только обгон"]),
 PX(sign("speed"),"Ushbu belgi nimani bildiradi?",["Tezlik ko‘rsatilgan qiymatdan oshmasligi kerak","Minimal tezlik ko‘rsatilgan","Tavsiya etilgan tezlik"],"Что означает этот знак?",["Скорость не должна превышать указанную","Указана минимальная скорость","Рекомендуемая скорость"]),
 PX(sign("noover"),"Ushbu belgi nimani bildiradi?",["Quvib o‘tish taqiqlangan","Qarshi harakat bor","Ikkita avtomobil uchun yo‘l"],"Что означает этот знак?",["Обгон запрещён","Есть встречное движение","Дорога для двух автомобилей"]),
 PX(sign("nostop"),"Ushbu belgi nimani bildiradi?",["To‘xtash (va to‘xtab turish) taqiqlangan","Faqat to‘xtab turish taqiqlangan","Faqat tungi to‘xtash"],"Что означает этот знак?",["Остановка (и стоянка) запрещена","Запрещена только стоянка","Остановка запрещена только ночью"]),
 PX(sign("nopark"),"Ushbu belgi nimani bildiradi?",["To‘xtab turish taqiqlangan; qisqa to‘xtash mumkin","To‘xtash ham, to‘xtab turish ham taqiqlangan","Faqat velosiped uchun"],"Что означает этот знак?",["Стоянка запрещена; кратковременная остановка допускается","Запрещены и остановка, и стоянка","Только для велосипедов"]),
 PX(sign("noleft"),"Ushbu belgi nimani bildiradi?",["Chapga burilish taqiqlangan","Faqat chapga burilish mumkin","Chapdan quvib o‘tish taqiqlangan"],"Что означает этот знак?",["Поворот налево запрещён","Разрешён только поворот налево","Обгон слева запрещён"]),
 PX(sign("nouturn"),"Ushbu belgi nimani bildiradi?",["Qayrilib olish (U-burilish) taqiqlangan","Chapga burilish taqiqlangan","Aylanma harakat"],"Что означает этот знак?",["Разворот запрещён","Поворот налево запрещён","Круговое движение"]),
 PX(sign("straight"),"Ushbu belgi nimani bildiradi?",["Faqat to‘g‘riga harakatlanish majburiy","Faqat to‘g‘riga harakatlanish taqiqlangan","Yo‘l tugaydi"],"Что означает этот знак?",["Движение только прямо","Движение прямо запрещено","Дорога заканчивается"]),
 PX(sign("right"),"Ushbu belgi nimani bildiradi?",["Faqat o‘ngga harakatlanish majburiy","O‘ngga burilish taqiqlangan","O‘ngga xavfli burilish"],"Что означает этот знак?",["Движение только направо","Поворот направо запрещён","Опасный поворот направо"]),
 PX(sign("pedpath"),"Ushbu belgi nimani bildiradi?",["Piyodalar yo‘lagi (faqat piyodalar uchun)","Piyodalar o‘tish joyi","Piyodalarga yo‘l berish"],"Что означает этот знак?",["Пешеходная дорожка (только для пешеходов)","Пешеходный переход","Уступить пешеходам"]),
 PX(sign("ped"),"Ushbu belgi nimani bildiradi?",["Piyodalar o‘tish joyi","Piyodalar yo‘lagi","Maktab zonasi"],"Что означает этот знак?",["Пешеходный переход","Пешеходная дорожка","Школьная зона"]),
 PX(sign("oneway"),"Ushbu belgi nimani bildiradi?",["Bir tomonlama harakat yo‘li","Faqat to‘g‘riga yurish majburiy","Tupik yo‘l"],"Что означает этот знак?",["Дорога с односторонним движением","Движение только прямо","Тупик"]),
 PX(sign("park"),"Ushbu belgi nimani bildiradi?",["To‘xtab turish joyi (parkovka)","To‘xtab turish taqiqlangan","Yo‘l bering"],"Что означает этот знак?",["Место стоянки (парковка)","Стоянка запрещена","Уступи дорогу"]),
 PX(sign("kids"),"Ushbu belgi nimani bildiradi?",["Bolalar (yo‘lda bolalar bo‘lishi mumkin)","Piyodalar o‘tish joyi","Maktab avtobusi"],"Что означает этот знак?",["Дети (на дороге могут быть дети)","Пешеходный переход","Школьный автобус"]),
 PX(sign("barrier"),"Ushbu belgi nimani bildiradi?",["Shlagbaumli temir yo‘l kesishmasi","Yo‘l ta’miri","Yo‘l to‘siq bilan yopilgan"],"Что означает этот знак?",["Железнодорожный переезд со шлагбаумом","Дорожные работы","Дорога перекрыта"]),
 PX(sign("slip"),"Ushbu belgi nimani bildiradi?",["Silliq yo‘l","Qiyalik yo‘l","Notekis yo‘l"],"Что означает этот знак?",["Скользкая дорога","Крутой спуск","Неровная дорога"]),
 PX(sign("works"),"Ushbu belgi nimani bildiradi?",["Yo‘l ishlari","Ish vaqti","Qurilish maydoni kirish"],"Что означает этот знак?",["Дорожные работы","Рабочее время","Въезд на стройплощадку"]),
 PX(sign("curve"),"Ushbu belgi nimani bildiradi?",["O‘ngga xavfli burilish","Faqat o‘ngga harakat","O‘ngga burilish taqiqlangan"],"Что означает этот знак?",["Опасный поворот направо","Движение только направо","Поворот направо запрещён"]),
 PX(sign("light"),"Ushbu belgi nimani bildiradi?",["Svetofor bilan tartibga solish","Svetofor ishlamayapti","Piyodalar svetofori"],"Что означает этот знак?",["Регулирование светофором","Светофор не работает","Пешеходный светофор"]),
 PX(roadV([[150,150,YOU],[150,100,OTH]],"solid"),"Siz qizil avtomobildasiz. O‘rta chiziq uzluksiz. Oldingi transportni quvib o‘tish mumkinmi?",["Yo‘q, uzluksiz chiziqni kesib o‘tib bo‘lmaydi","Ha, qarshidan transport bo‘lmasa","Ha, signal berib"],"Вы на красном автомобиле. Осевая линия сплошная. Можно ли обогнать впереди идущий автомобиль?",["Нет, сплошную линию пересекать нельзя","Да, если нет встречных","Да, подав сигнал"]),
 PX(roadV([[150,150,YOU],[150,100,OTH]],"dash"),"Siz qizil avtomobildasiz. O‘rta chiziq uzuq-uzuq, qarshidan transport yo‘q, ko‘rinish yaxshi. Quvib o‘tish mumkinmi?",["Ha, xavfsiz bo‘lsa va qoidalarga rioya qilib","Yo‘q, hech qachon","Faqat tunda"],"Вы на красном автомобиле. Осевая прерывистая, встречных нет, видимость хорошая. Можно ли обгонять?",["Да, если это безопасно и по правилам","Нет, никогда","Только ночью"]),
 PX(QZ_PED,"Piyoda piyodalar o‘tish joyiga chiqmoqda. Siz qizil avtomobildasiz. Nima qilasiz?",["To‘xtab, piyodaga yo‘l beraman","Tezlikni oshirib o‘tib ketaman","Signal berib o‘taman"],"Пешеход выходит на пешеходный переход. Вы на красном автомобиле. Что сделаете?",["Остановлюсь и уступлю пешеходу","Ускорюсь и проеду","Просигналю и проеду"]),
 PX(QZ_PED2,"Moviy avtomobil piyodalar o‘tish joyi oldida to‘xtadi. Siz qizil avtomobildasiz. Nima qilasiz?",["To‘xtayman va uni quvib o‘tmayman","Uni quvib o‘taman","Tezlikni oshiraman"],"Синий автомобиль остановился перед пешеходным переходом. Вы на красном. Что сделаете?",["Остановлюсь и не буду его обгонять","Обгоню его","Ускорюсь"]),
 PX(QLIGHT,"Svetoforda qizil signal yonmoqda. Siz qizil avtomobildasiz. Qayerda to‘xtaysiz?",["To‘xtash chizig‘i oldida","Chorrahaning o‘rtasida","Chiziqdan o‘tib, svetofor yonida"],"Горит красный сигнал светофора. Вы на красном автомобиле. Где остановитесь?",["Перед стоп-линией","На середине перекрёстка","За линией, у светофора"]),
 PX(inter([["S",YOU,"s"],["E",OTH,"s"]],[]),"Teng ahamiyatli yo‘llar chorrahasi (belgilarsiz). Siz qizil avtomobildasiz. Kim yo‘l beradi?",["Siz: o‘ng tomondan kelayotgan transportga yo‘l berasiz","Moviy avtomobil: u sizga yo‘l beradi","Kim birinchi yetib kelsa"],"Равнозначные дороги (без знаков). Вы на красном. Кто уступает?",["Вы: уступаете транспорту справа","Синий: он уступает вам","Кто первым подъехал"]),
 PX(inter([["S",YOU,"s"],["W",OTH,"s"]],[]),"Teng ahamiyatli yo‘llar chorrahasi. Siz qizil avtomobildasiz, moviy avtomobil chap tomondan kelmoqda. Kim birinchi o‘tadi?",["Siz: o‘ng tomondan transport yo‘q","Moviy avtomobil","Ikkalasi bir vaqtda"],"Равнозначные дороги. Вы на красном, синий приближается слева. Кто проезжает первым?",["Вы: справа нет транспорта","Синий автомобиль","Оба одновременно"]),
 PX(inter([["S",YOU,"l"],["N",OTH,"s"]],[]),"Siz qizil avtomobilda chapga burilmoqchisiz, qarshidan moviy avtomobil to‘g‘ri harakatlanmoqda. Nima qilasiz?",["Qarshidan to‘g‘ri ketayotgan transportga yo‘l beraman","Birinchi burilaman","Signal berib burilaman"],"Вы поворачиваете налево на красном, навстречу едет синий прямо. Что сделаете?",["Уступлю встречному транспорту, едущему прямо","Поверну первым","Просигналю и поверну"]),
 PX(inter([["S",YOU,"s"],["E",OTH,"s"]],[["yield",168,170,38],["main",196,40,34]]),"Siz qizil avtomobildasiz. Chorrahada «Yo‘l bering» belgisi bor. Kim birinchi o‘tadi?",["Moviy avtomobil: asosiy yo‘lda ustuvorlik unda","Siz","Kim tezroq haydasa"],"Вы на красном. На перекрёстке знак «Уступи дорогу». Кто проезжает первым?",["Синий: у него преимущество на главной дороге","Вы","Кто быстрее"]),
 PX(inter([["S",YOU,"s"],["E",OTH,"s"]],[["main",168,170,36]]),"Siz qizil avtomobildasiz. Yo‘lingizda «Asosiy yo‘l» belgisi o‘rnatilgan. Moviy avtomobil o‘ngdan kelmoqda. Kim birinchi o‘tadi?",["Siz: siz asosiy yo‘ldasiz","Moviy avtomobil, chunki u o‘ngda","Hech kim"],"Вы на красном. Для вас установлен знак «Главная дорога». Синий справа. Кто проезжает первым?",["Вы: вы на главной дороге","Синий, потому что он справа","Никто"]),
 PX(inter([["S",YOU,"s"],["W",OTH,"s"]],[["stop",168,170,36]]),"Siz qizil avtomobildasiz va yo‘lingizda «STOP» belgisi bor. Nima qilasiz?",["Chiziq oldida to‘liq to‘xtab, kesishayotgan yo‘ldagi transportga yo‘l beraman","Sekinlashib, o‘tib ketaman","Faqat piyodalar bo‘lsa to‘xtayman"],"Для вас установлен знак «STOP». Что сделаете?",["Полностью остановлюсь у линии и уступлю движущимся по пересекаемой дороге","Замедлюсь и проеду","Остановлюсь только при пешеходах"])
];

Q=Q.concat(QP);
var N=20,EXAM_MIN=25,EXAM_ERR=2;
var P={
uz:{title:"Prava imtihoniga tayyorlov",tile:"Prava",tileS:"Mashq testlari",intro:"Yo‘l harakati qoidalari bo‘yicha mashq savollari. Bu rasmiy imtihon bazasi emas: tayyorgarlikka yordam beradi, qoidalarni rasmiy matn bilan solishtirib turing.",start:"Mashq rejimi ({n} savol)",exam:"Imtihon rejimi",examS:"20 savol · 25 daqiqa · ko‘pi bilan 2 ta xato",errs:"Xato",pass:"Imtihondan o‘tdingiz!",fail:"Imtihondan o‘ta olmadingiz",timeup:"Vaqt tugadi",bank:"Savollar soni: {n}",q:"Savol",next:"Keyingi",fin:"Natijani ko‘rish",res:"Natija",ca:"To‘g‘ri javob",again:"Qayta boshlash",wr:"Xatolar",g1:"Ajoyib natija!",g2:"Yaxshi, yana mashq qiling.",g3:"Qoidalarni qayta o‘qib chiqing."},
ru:{title:"Подготовка к экзамену по ПДД",tile:"Права",tileS:"Тренировочные тесты",intro:"Тренировочные вопросы по правилам дорожного движения. Это не официальная экзаменационная база: она помогает готовиться, сверяйтесь с официальным текстом правил.",start:"Режим тренировки ({n} вопросов)",exam:"Режим экзамена",examS:"20 вопросов · 25 минут · не более 2 ошибок",errs:"Ошибки",pass:"Вы сдали экзамен!",fail:"Экзамен не сдан",timeup:"Время вышло",bank:"Вопросов в базе: {n}",q:"Вопрос",next:"Далее",fin:"Показать результат",res:"Результат",ca:"Правильный ответ",again:"Начать заново",wr:"Ошибки",g1:"Отличный результат!",g2:"Хорошо, потренируйтесь ещё.",g3:"Перечитайте правила."}
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
css.textContent=".t5{background:linear-gradient(135deg,#6a3fd1,#a06cf0)}.pq{font-size:17px;font-weight:600;margin-bottom:12px;line-height:1.35}.po{display:block;width:100%;text-align:left;padding:12px;margin-bottom:8px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:15px;font-family:inherit}.po.ok{background:var(--accbg);border-color:var(--acc);color:var(--acc);font-weight:700}.po.no{border-color:var(--dn);color:var(--dn)}.pbtn{display:block;width:100%;padding:13px;border:0;border-radius:12px;background:var(--acc);color:#fff;font-size:16px;font-weight:700;margin-top:8px;font-family:inherit}.pw{border-top:1px solid var(--line);padding:10px 0;font-size:14px}.pw b{color:var(--acc)}.pimg{width:100%;max-width:280px;margin:0 auto 12px;border-radius:12px;overflow:hidden}.pscore{font-size:34px;font-weight:700;color:var(--acc)}";
document.head.appendChild(css);

var sec=document.createElement("div");sec.className="sec";sec.id="prava";
document.body.appendChild(sec);
var tile=document.createElement("button");
tile.className="tile t5";
document.querySelector(".grid").appendChild(tile);
function updTile(){tile.innerHTML='<div class="ic">🚗</div><b>'+p("tile")+'</b><span>'+p("tileS")+'</span>'}
tile.addEventListener("click",function(){stopTimer();st=null;draw();show("prava")});

var tmr=null;
function stopTimer(){if(tmr){clearInterval(tmr);tmr=null}}
function fmt(ms){var s=Math.max(0,Math.ceil(ms/1000)),m=Math.floor(s/60);s=s%60;return m+":"+(s<10?"0":"")+s}
function startQuiz(exam){
  stopTimer();
  var all=[];for(var i=0;i<Q.length;i++)all.push(i);
  st={exam:!!exam,total:Math.min(N,Q.length),ids:shuffle(all).slice(0,Math.min(N,Q.length)),i:0,score:0,wrong:[],pick:null,ord:shuffle([0,1,2]),over:null,t0:Date.now(),end:Date.now()+EXAM_MIN*60000};
  if(exam){tmr=setInterval(tick,1000)}
}
function tick(){
  if(!st||!st.exam||st.over||st.i>=st.ids.length){stopTimer();return}
  var left=st.end-Date.now();
  if(left<=0){st.over="time";st.i=st.ids.length;stopTimer();draw();return}
  var e=document.getElementById("pt");if(e)e.textContent="⏱ "+fmt(left);
}
function draw(){
  var h='<button class="back" id="pb">← '+T[LANG].back+'</button>';
  if(!st){
    h+='<div class="card"><h2>'+p("title")+'</h2><div class="sub" style="margin:0 0 12px">'+p("intro")+'</div><div class="sub" style="margin:0 0 12px">'+p("bank").replace("{n}",Q.length)+'</div><button class="pbtn" id="pe">'+p("exam")+'<br><small style="font-weight:400;font-size:12px">'+p("examS")+'</small></button><button class="pbtn" id="ps" style="background:var(--accbg);color:var(--acc)">'+p("start").replace("{n}",Math.min(N,Q.length))+'</button></div>';
  }else if(st.i<st.ids.length){
    var q=Q[st.ids[st.i]],o=qo(q);
    h+='<div class="card"><h2>'+p("q")+' '+(st.i+1)+'/'+st.ids.length+(st.exam?' · '+p("errs")+': '+st.wrong.length+'/'+EXAM_ERR+' · <span id="pt">⏱ '+fmt(st.end-Date.now())+'</span>':'')+'</h2>'+(q.img?'<div class="pimg">'+q.img+'</div>':'')+'<div class="pq">'+qt(q)+'</div>';
    h+=st.ord.map(function(k){
      var c="po";
      if(st.pick!==null){if(k===q.a)c+=" ok";else if(k===st.pick)c+=" no"}
      return '<button class="'+c+'" data-o="'+k+'"'+(st.pick!==null?' disabled':'')+'>'+o[k]+'</button>';
    }).join("");
    if(st.pick!==null){h+='<button class="pbtn" id="pn">'+(st.i+1<st.ids.length?p("next"):p("fin"))+'</button>'}
    h+='</div>';
  }else{
    stopTimer();
    var tot=st.total||st.ids.length,pc=Math.round(st.score*100/tot);
    h+='<div class="card"><h2>'+p("res")+'</h2><div class="pscore">'+st.score+' / '+tot+'</div>';
    if(st.exam){var ok=!st.over&&st.wrong.length<=EXAM_ERR;h+='<div class="sub" style="margin:4px 0 0;font-weight:700;color:'+(ok?'var(--acc)':'var(--dn)')+'">'+(ok?'✅ '+p("pass"):'❌ '+(st.over==="time"?p("timeup")+'. ':'')+p("fail"))+'</div><div class="sub" style="margin:4px 0 0">'+p("errs")+': '+st.wrong.length+' · ⏱ '+fmt(Math.min(Date.now(),st.end)-st.t0)+'</div>'}
    else h+='<div class="sub" style="margin:4px 0 0">'+(pc>=90?p("g1"):pc>=70?p("g2"):p("g3"))+'</div>';
    if(st.wrong.length){
      h+='<h2 style="margin-top:16px">'+p("wr")+'</h2>';
      h+=st.wrong.map(function(id){var q=Q[id];return '<div class="pw">'+(q.img?'<div class="pimg" style="width:110px;margin:0 0 6px">'+q.img+'</div>':'')+qt(q)+'<br>'+p("ca")+': <b>'+qo(q)[q.a]+'</b></div>'}).join("");
    }
    h+='<button class="pbtn" id="pa">'+p("again")+'</button><button class="pbtn" id="pm" style="background:var(--accbg);color:var(--acc)">← '+T[LANG].back+'</button></div>';
  }
  sec.innerHTML=h;
  document.getElementById("pb").addEventListener("click",function(){stopTimer();st=null;show("home")});
  var b=document.getElementById("ps");if(b)b.addEventListener("click",function(){startQuiz(false);draw();window.scrollTo(0,0)});
  b=document.getElementById("pe");if(b)b.addEventListener("click",function(){startQuiz(true);draw();window.scrollTo(0,0)});
  b=document.getElementById("pa");if(b)b.addEventListener("click",function(){var ex=st&&st.exam;startQuiz(ex);draw();window.scrollTo(0,0)});
  b=document.getElementById("pm");if(b)b.addEventListener("click",function(){stopTimer();st=null;draw();window.scrollTo(0,0)});
  b=document.getElementById("pn");if(b)b.addEventListener("click",function(){st.i++;st.pick=null;st.ord=shuffle([0,1,2]);draw();window.scrollTo(0,0)});
  var bs=sec.querySelectorAll("[data-o]");
  for(var j=0;j<bs.length;j++){bs[j].addEventListener("click",function(){
    if(st.pick!==null)return;
    var k=parseInt(this.getAttribute("data-o"),10),id=st.ids[st.i];
    st.pick=k;if(k===Q[id].a)st.score++;else st.wrong.push(id);
    if(st.exam&&st.wrong.length>EXAM_ERR){st.i=st.ids.length-1;st.ids=st.ids.slice(0,st.i+1)}
    draw();
  })}
}
var lb=document.querySelectorAll(".lang button");
for(var m=0;m<lb.length;m++){lb[m].addEventListener("click",function(){updTile();draw()})}
updTile();draw();
})();
