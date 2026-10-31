(function(){
var API="https://rasm-ai.muhammadaminergashev96.workers.dev/sched";
function apply(list){
  try{
    if(typeof SCHEDULE==="undefined"||!list||!list.length)return;
    SCHEDULE=SCHEDULE.filter(function(x){return !x.__w});
    list.slice().sort(function(a,b){return a.from<b.from?1:-1}).forEach(function(x){
      if(x&&x.from&&x.to&&x.t)SCHEDULE.unshift({from:x.from,to:x.to,t:x.t,__w:1});
    });
    if(typeof renderPray==="function")renderPray();
  }catch(e){}
}
try{apply(JSON.parse(localStorage.getItem("sch_w")||"null"))}catch(e){}
try{
  fetch(API).then(function(r){return r.json()}).then(function(j){
    if(j&&j.list){try{localStorage.setItem("sch_w",JSON.stringify(j.list))}catch(e){}apply(j.list)}
  }).catch(function(){});
}catch(e){}
})();
