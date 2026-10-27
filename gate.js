(function(){
var API="https://rasm-ai.muhammadaminergashev96.workers.dev/member";
var TX={
uz:{errt:"Tekshirib bo‘lmadi",retry:"Qayta urinish",chk:"Tekshirilmoqda…",title:"Kanalga a‘zo bo‘ling",msg:"Ilovadan foydalanish uchun «Jalaquduq ovozi» kanaliga a‘zo bo‘lishingiz kerak.",join:"Kanalga o‘tish",again:"A‘zo bo‘ldim, tekshirish",no:"Hali a‘zo emassiz. Avval kanalga a‘zo bo‘ling.",tg:"Ilovani Telegram ichida oching",tgm:"Bu ilova faqat Telegram orqali ishlaydi."},
oz:{errt:"Текшириб бўлмади",retry:"Қайта уриниш",chk:"Текширилмоқда…",title:"Каналга аъзо бўлинг",msg:"Иловадан фойдаланиш учун «Jalaquduq ovozi» каналига аъзо бўлишингиз керак.",join:"Каналга ўтиш",again:"Аъзо бўлдим, текшириш",no:"Ҳали аъзо эмассиз. Аввал каналга аъзо бўлинг.",tg:"Иловани Telegram ичида очинг",tgm:"Бу илова фақат Telegram орқали ишлайди."},
ru:{errt:"Не удалось проверить",retry:"Повторить",chk:"Проверка…",title:"Подпишитесь на канал",msg:"Чтобы пользоваться приложением, нужно подписаться на канал «Jalaquduq ovozi».",join:"Перейти в канал",again:"Я подписался, проверить",no:"Вы ещё не подписаны. Сначала подпишитесь на канал.",tg:"Откройте приложение в Telegram",tgm:"Это приложение работает только в Telegram."}
};
function L(){var l="uz";try{l=localStorage.getItem("lang")||"uz"}catch(e){}return TX[l]?l:"uz"}
var W=window.Telegram&&Telegram.WebApp,init=W&&W.initData,uid=W&&W.initDataUnsafe&&W.initDataUnsafe.user&&W.initDataUnsafe.user.id;
var CK="gm2_"+(uid||0);
try{var t=+localStorage.getItem(CK);if(uid&&t&&Date.now()-t<3600e3)return}catch(e){}
var o=document.createElement("div");
o.style.cssText="position:fixed;inset:0;z-index:2147483000;background:#0f1419;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px;text-align:center;font-family:-apple-system,Roboto,sans-serif;gap:14px";
document.body.appendChild(o);
function set(h){o.innerHTML=h}
function done(){try{if(uid)localStorage.setItem(CK,String(Date.now()))}catch(e){}if(o.parentNode)o.parentNode.removeChild(o)}
function open(u){try{if(W&&W.openTelegramLink&&/^https:\/\/t\.me\//.test(u)){W.openTelegramLink(u);return}if(W&&W.openLink){W.openLink(u);return}}catch(e){}window.open(u,"_blank")}
function check(manual){
  var x=TX[L()];
  set('<div style="font-size:18px">'+x.chk+'</div>');
  var ctl=window.AbortController?new AbortController():null,tm=setTimeout(function(){ctl&&ctl.abort()},9000);
  fetch(API,{method:"POST",headers:{"Content-Type":"text/plain"},body:init,signal:ctl?ctl.signal:undefined})
   .then(function(r){return r.json()}).then(function(j){
     clearTimeout(tm);
     if(j&&j.ok&&j.member){done();return}
     if(j&&j.ok&&j.member===false){block(j.link,manual);return}
     fail((j&&j.error)||"javob noto‘g‘ri");
   }).catch(function(e){clearTimeout(tm);fail(e&&e.name==="AbortError"?"vaqt tugadi":"ulanib bo‘lmadi")});
}
function fail(why){
  var x=TX[L()];
  set('<div style="font-size:44px">⚠️</div><div style="font-size:20px;font-weight:700">'+x.errt+'</div><div style="font-size:13px;opacity:.7;max-width:320px;word-break:break-word">'+String(why).replace(/[<>&]/g,"")+'</div><button id="gr" style="width:100%;max-width:320px;padding:14px;border:0;border-radius:12px;background:#3ecfa6;color:#06251d;font-weight:700;font-size:16px">'+x.retry+'</button>');
  document.getElementById("gr").onclick=function(){check(false)};
}
function block(link,manual){
  var x=TX[L()];
  set('<div style="font-size:48px">📢</div><div style="font-size:22px;font-weight:700">'+x.title+'</div><div style="font-size:16px;opacity:.85;max-width:340px;line-height:1.45">'+x.msg+'</div>'+(manual?'<div style="color:#ff9b9b;font-size:14px">'+x.no+'</div>':'')+
  (link?'<button id="gj" style="width:100%;max-width:320px;padding:14px;border:0;border-radius:12px;background:#3ecfa6;color:#06251d;font-weight:700;font-size:16px">'+x.join+'</button>':'')+
  '<button id="ga" style="width:100%;max-width:320px;padding:14px;border:2px solid #3ecfa6;border-radius:12px;background:transparent;color:#3ecfa6;font-weight:700;font-size:16px">'+x.again+'</button>');
  var j=document.getElementById("gj");if(j)j.onclick=function(){open(link)};
  document.getElementById("ga").onclick=function(){check(true)};
}
if(!init){set('<div style="font-size:48px">📱</div><div style="font-size:20px;font-weight:700">'+TX[L()].tg+'</div><div style="opacity:.85">'+TX[L()].tgm+'</div>');return}
check(false);
})();
