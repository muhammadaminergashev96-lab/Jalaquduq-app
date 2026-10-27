(function(){
try{
  var W=window.Telegram&&Telegram.WebApp,u=W&&W.initDataUnsafe&&W.initDataUnsafe.user;
  if(!u||!u.id)return;
  var d=new Date(Date.now()+5*3600e3).toISOString().slice(0,10),k="stat_"+u.id;
  try{if(localStorage.getItem(k)===d)return}catch(e){}
  fetch("https://rasm-ai.muhammadaminergashev96.workers.dev/hit",{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({id:String(u.id),n:u.first_name||"",u:u.username||"",l:u.language_code||""})})
   .then(function(r){return r.json()}).then(function(j){if(j&&j.ok){try{localStorage.setItem(k,d)}catch(e){}}}).catch(function(){});
}catch(e){}
})();
