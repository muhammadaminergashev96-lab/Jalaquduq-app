(function(){
try{
var W=window.Telegram&&Telegram.WebApp;if(!W||!W.initData)return;
var API="https://rasm-ai.muhammadaminergashev96.workers.dev/ev";
var Q={o:{},t:{},b:{}},dirty=false,last="home",lastSend=Date.now();
function inc(m,k,n){m[k]=(m[k]||0)+(n||1);dirty=true}
function flush(){
  if(!dirty)return;
  var body=JSON.stringify({init:W.initData,d:Q});Q={o:{},t:{},b:{}};dirty=false;lastSend=Date.now();
  try{fetch(API,{method:"POST",headers:{"Content-Type":"text/plain"},body:body,keepalive:true}).catch(function(){})}catch(e){}
}
var _show=window.show;
if(typeof _show==="function"){
  window.show=function(id){
    try{if(id&&id!=="home"&&id!==last){inc(Q.o,String(id).slice(0,24))}last=id||last}catch(e){}
    return _show.apply(this,arguments);
  };
}
var SKIP=/(^|\s)(po|lo|ltile|bb|back|pn|ps)(\s|$)/;
document.addEventListener("click",function(e){
  try{
    var t=e.target;if(!t||!t.closest)return;
    var sc=t.closest(".sec"),sid=sc&&sc.id?sc.id:"home";
    if(sid!=="home")inc(Q.t,sid);
    var el=t.closest("button,a,.tile,[role=button],[data-m]");
    if(!el||el.tagName==="INPUT"||el.tagName==="TEXTAREA")return;
    if(SKIP.test(el.className||""))return;
    var lb=(el.getAttribute("data-track")||(el.innerText||el.textContent||"")).replace(/\s+/g," ").trim();
    var nl=(el.innerText||"").split("\n")[0].replace(/\s+/g," ").trim();
    var bd=el.querySelector&&el.querySelector("b,strong,h3");
    if(!el.getAttribute("data-track")){if(bd&&bd.textContent.trim())lb=bd.textContent.replace(/\s+/g," ").trim();else if(nl)lb=nl}
    lb=lb.slice(0,28);
    if(lb.length<2||/^[\d\s.,:%/+-]+$/.test(lb))return;
    inc(Q.b,sid+"|"+lb);
  }catch(x){}
},true);
setInterval(function(){if(dirty&&Date.now()-lastSend>45000)flush()},15000);
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")flush()});
window.addEventListener("pagehide",flush);
}catch(e){}
})();
