(function(){
var P=(window.PROBLEMS||[]).slice().sort(function(a,b){return b.id-a.id;}); // 번호 내림차순
var C=window.CATS||[];
var q=document.getElementById('q'),cat=document.getElementById('cat'),diff=document.getElementById('diff'),
    list=document.getElementById('list'),count=document.getElementById('count'),
    metaToggle=document.getElementById('metaToggle');
C.forEach(function(c){var o=document.createElement('option');o.value=c[0];o.textContent=c[0].replace(/_/g,' ')+' ('+c[1]+')';cat.appendChild(o);});
var ds=P.map(function(p){return p.diff;}).filter(function(v,i,a){return a.indexOf(v)===i;}).sort(function(a,b){return a-b;});
ds.forEach(function(d){var o=document.createElement('option');o.value=d;o.textContent='난이도 '+d;diff.appendChild(o);});
var colors=['#9aa4b2','#34b37a','#22a39a','#2f8fd8','#4f63e0','#7a52e0','#a44ad6','#d64aaa','#e0724a','#d94a4a','#b3312f','#8a1f2e'];
function chip(t){return '<a class="chip" href="index.html?cat='+encodeURIComponent(t)+'">'+t.replace(/_/g,' ')+'</a>';}
function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function render(){
  var qs=(q.value||'').trim().toLowerCase(),cv=cat.value,dv=diff.value;
  var rows=P.filter(function(p){
    if(cv&&p.cats.indexOf(cv)<0)return false;
    if(dv!==''&&String(p.diff)!==dv)return false;
    if(qs){if((p.id+' '+p.title).toLowerCase().indexOf(qs)<0)return false;}
    return true;});
  count.textContent=rows.length+' / '+P.length+' 문제';
  list.innerHTML=rows.map(function(p){
    var c=colors[Math.min(p.diff,colors.length-1)]||'#9aa4b2';
    return '<div class="prow"><span class="dchip" style="background:'+c+'">'+p.diff+'</span>'+
      '<span class="num">#'+p.id+'</span>'+
      '<span class="t"><a href="problems/'+p.id+'.html">'+esc(p.title)+'</a></span>'+
      '<span class="rtags">'+p.cats.slice(0,3).map(chip).join('')+'</span></div>';
  }).join('')||'<p style="color:var(--mut);text-align:center;padding:40px">일치하는 문제가 없습니다.</p>';
  if(window.MathJax&&window.MathJax.typesetPromise){window.MathJax.typesetPromise([list]).catch(function(){});}
}
if(metaToggle){metaToggle.addEventListener('click',function(){
  var on=document.body.classList.toggle('show-meta');
  metaToggle.classList.toggle('on',on);
  metaToggle.textContent=on?'난이도 · 유형 숨기기':'난이도 · 유형 표시';
});}
var pr=new URLSearchParams(location.search);if(pr.get('cat')){cat.value=pr.get('cat');document.body.classList.add('show-meta');if(metaToggle){metaToggle.classList.add('on');metaToggle.textContent='난이도 · 유형 숨기기';}}
q.addEventListener('input',render);cat.addEventListener('change',render);diff.addEventListener('change',render);
render();
})();
