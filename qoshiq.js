(function(){
var L={uz:["Qo‘shiqlar","@yangrabot"],oz:["Қўшиқлар","@yangrabot"],ru:["Песни","@yangrabot"]};
var tile=document.createElement("button");
tile.className="tile";
tile.style.background="linear-gradient(135deg,#d6336c,#ff8fab)";
document.querySelector(".grid").appendChild(tile);
function upd(){var l=L[LANG]||L.uz;tile.innerHTML='<div class="ic">🎵</div><b>'+l[0]+'</b><span>'+l[1]+'</span>'}
tile.addEventListener("click",function(){
  var u="https://t.me/yangrabot";
  try{if(tg&&tg.openTelegramLink){tg.openTelegramLink(u);return}}catch(e){}
  window.open(u,"_blank");
});
var lb=document.querySelectorAll(".lang button");
for(var i=0;i<lb.length;i++){lb[i].addEventListener("click",upd)}
upd();
})();
