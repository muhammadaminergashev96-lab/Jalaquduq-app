(function(){
var A=window.TL;
A.TP.push(
{n:["Hafta kunlari","Дни недели"],u:["Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba","Yakshanba"]},
{n:["Kasblar","Профессии"],u:["Shifokor","O‘qituvchi","Haydovchi","Muhandis","Oshpaz","Sotuvchi","Politsiyachi","Dehqon"]},
{n:["Transport","Транспорт"],u:["Avtomobil","Avtobus","Poyezd","Samolyot","Velosiped","Taksi","Yo‘l","Bekat"]},
{n:["Kundalik iboralar","Повседневные фразы"],u:["Mening ismim...","Yordam bering!","Tushunmadim","Qancha turadi?","Qayerda?","Xayrli tong","Xayrli kech","Tanishganimdan xursandman"]}
);
var W=[
[["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
 ["doctor","teacher","driver","engineer","cook","seller","policeman","farmer"],
 ["car","bus","train","airplane","bicycle","taxi","road","station"],
 ["My name is...","Help me!","I don't understand","How much is it?","Where?","Good morning","Good evening","Nice to meet you"]],
[["понедельник","вторник","среда","четверг","пятница","суббота","воскресенье"],
 ["врач","учитель","водитель","инженер","повар","продавец","полицейский","фермер"],
 ["машина","автобус","поезд","самолёт","велосипед","такси","дорога","станция"],
 ["Меня зовут...","Помогите!","Я не понимаю","Сколько стоит?","Где?","Доброе утро","Добрый вечер","Приятно познакомиться"]],
[["الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت","الأحد"],
 ["طبيب","معلم","سائق","مهندس","طباخ","بائع","شرطي","مزارع"],
 ["سيارة","حافلة","قطار","طائرة","دراجة","تاكسي","طريق","محطة"],
 ["اسمي...","ساعدني!","لا أفهم","بكم هذا؟","أين؟","صباح الخير","مساء الخير","تشرفنا"]],
[["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"],
 ["doktor","öğretmen","şoför","mühendis","aşçı","satıcı","polis","çiftçi"],
 ["araba","otobüs","tren","uçak","bisiklet","taksi","yol","istasyon"],
 ["Benim adım...","Yardım edin!","Anlamadım","Ne kadar?","Nerede?","Günaydın","İyi akşamlar","Memnun oldum"]],
[["월요일","화요일","수요일","목요일","금요일","토요일","일요일"],
 ["의사","선생님","운전사","엔지니어","요리사","판매원","경찰관","농부"],
 ["자동차","버스","기차","비행기","자전거","택시","길","역"],
 ["제 이름은...","도와주세요!","이해 못 해요","얼마예요?","어디예요?","좋은 아침입니다","좋은 저녁입니다","만나서 반갑습니다"]],
[["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"],
 ["Arzt","Lehrer","Fahrer","Ingenieur","Koch","Verkäufer","Polizist","Bauer"],
 ["Auto","Bus","Zug","Flugzeug","Fahrrad","Taxi","Straße","Haltestelle"],
 ["Ich heiße...","Hilfe!","Ich verstehe nicht","Wie viel kostet das?","Wo?","Guten Morgen","Guten Abend","Freut mich"]]
];
var R=[null,null,
[["al-isnayn","as-salasa","al-arbaa","al-xamis","al-juma","as-sabt","al-ahad"],
 ["tabib","muallim","saiq","muhandis","tabbax","baye","shurti","muzari"],
 ["sayyara","hafila","qitar","tayyara","darraja","taksi","tariq","mahatta"],
 ["ismi","saidni","la afham","bikam haza","ayna","sabax al-xayr","masa al-xayr","tasharrafna"]],
null,
[["voryoil","xvayoil","suyoil","mokyoil","kumyoil","toyoil","iryoil"],
 ["uisa","sonsenim","unjonsa","enjinio","yorisa","panmevon","kyongchalgvan","nongbu"],
 ["jadonja","bosu","kicha","pihengi","jajongo","teksi","kil","yok"],
 ["je irumun","dovajuseyo","ihe mot heyo","olmayeyo","odiyeyo","choun achimimnida","choun jonyokimnida","mannaso pankapsumnida"]],
null];
for(var i=0;i<A.LG.length;i++){
  for(var j=0;j<W[i].length;j++){A.LG[i].w.push(W[i][j]);if(R[i])A.LG[i].r.push(R[i][j])}
}
})();
