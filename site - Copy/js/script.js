document.addEventListener('DOMContentLoaded',()=>{
  // Гар утасны цэс
  const burger=document.getElementById('burger'),nav=document.getElementById('nav');
  burger&&burger.addEventListener('click',()=>nav.classList.toggle('open'));
  document.querySelectorAll('.has-sub>a').forEach(a=>a.addEventListener('click',e=>{
    if(window.innerWidth<=900){e.preventDefault();a.parentElement.classList.toggle('open');}
  }));
  // Дээш товч
  const top=document.getElementById('toTop');
  window.addEventListener('scroll',()=>{top.style.display=window.scrollY>400?'block':'none'});
  top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  // Гарч ирэх анимаци
  const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('show');io.unobserve(x.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  // Тоо тоолуур
  document.querySelectorAll('[data-count]').forEach(el=>{
    const end=+el.dataset.count;let n=0;const step=Math.max(1,Math.ceil(end/60));
    const t=setInterval(()=>{n+=step;if(n>=end){n=end;clearInterval(t)}el.textContent=n.toLocaleString('mn-MN')},25);
  });
  // Прогресс бар
  setTimeout(()=>document.querySelectorAll('.bar i').forEach(b=>b.style.width=b.dataset.w+'%'),200);
  // Мэдээ хайх
  const s=document.getElementById('newsSearch');
  s&&s.addEventListener('input',()=>{
    const q=s.value.toLowerCase();
    document.querySelectorAll('#newsGrid .card').forEach(c=>{
      c.style.display=c.textContent.toLowerCase().includes(q)?'':'none';
    });
  });
  // Маягт шалгах
  const f=document.getElementById('feedbackForm');
  f&&f.addEventListener('submit',e=>{
    e.preventDefault();let ok=true;
    f.querySelectorAll('[required]').forEach(i=>{
      const er=i.nextElementSibling;const bad=!i.value.trim()||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value));
      er.textContent=bad?'Талбарыг зөв бөглөнө үү.':'';if(bad)ok=false;
    });
    if(ok){document.getElementById('okMsg').style.display='block';f.reset();}
  });
  // Санал асуулга
  const sv=document.getElementById('surveyForm');
  sv&&sv.addEventListener('submit',e=>{e.preventDefault();document.getElementById('okMsg').style.display='block';sv.reset();});
});

// ===== Камерын лого хулганыг дагаж хөдөлнө =====
const cam=document.querySelector('.logo-cam');
if(cam&&matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  let tx=0,ty=0,cx=0,cy=0,run=false;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const loop=()=>{
    cx+=(tx-cx)*.15;cy+=(ty-cy)*.15;
    cam.style.transform=`perspective(300px) rotateY(${cx*32}deg) rotateX(${-cy*32}deg) translate(${cx*4}px,${cy*4}px)`;
    if(Math.abs(tx-cx)>.001||Math.abs(ty-cy)>.001)requestAnimationFrame(loop);else run=false;
  };
  const kick=()=>{if(!run){run=true;requestAnimationFrame(loop)}};
  window.addEventListener('mousemove',e=>{
    const r=cam.getBoundingClientRect();
    tx=clamp((e.clientX-(r.left+r.width/2))/(innerWidth/2),-1,1);
    ty=clamp((e.clientY-(r.top+r.height/2))/(innerHeight/2),-1,1);
    kick();
  });
  document.addEventListener('mouseleave',()=>{tx=0;ty=0;kick()});
}
