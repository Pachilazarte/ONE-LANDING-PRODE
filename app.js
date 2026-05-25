/* ═══════════════════════════════════════════════════════════════════
   app.js · Prode Mundialista 2026
═══════════════════════════════════════════════════════════════════ */

AOS.init({once:true,offset:60,duration:700,easing:'ease-out-cubic'});

/* ── NAV ── */
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',scrollY>40);
});
const hamburger = document.getElementById('hamburger');
if(hamburger) hamburger.onclick=()=>{ document.getElementById('mobile-menu').classList.toggle('open'); };
function closeMobile(){const m=document.getElementById('mobile-menu');if(m)m.classList.remove('open');}

/* ── MODAL T&C ── */
function openTc(){document.getElementById('tc-modal').classList.add('open');document.body.style.overflow='hidden'}
function closeTc(){document.getElementById('tc-modal').classList.remove('open');document.body.style.overflow=''}
const tcModal=document.getElementById('tc-modal');
if(tcModal){
  tcModal.addEventListener('click',e=>{if(e.target===e.currentTarget)closeTc()});
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeTc()});

/* ── TOAST ── */
function showToast(icon,title,msg){
  document.getElementById('toast-icon').textContent=icon;
  document.getElementById('toast-title').textContent=title;
  document.getElementById('toast-msg').textContent=msg;
  const el=document.getElementById('toast');
  el.classList.add('visible');
  setTimeout(()=>el.classList.remove('visible'),5500);
}

/* ── LIVE PREDICTIONS ── */
const PREDICTIONS=[
  {n:'Ana G.',g:'🇦🇷 vs 🇧🇷',r:'2-0'},
  {n:'Carlos M.',g:'🇫🇷 vs 🇩🇪',r:'1-1'},
  {n:'Laura P.',g:'🇦🇷 vs 🇲🇽',r:'3-1'},
  {n:'Roberto S.',g:'🇪🇸 vs 🇵🇹',r:'2-0'},
  {n:'Valeria T.',g:'🇦🇷 vs 🇫🇷',r:'2-1'},
  {n:'Diego C.',g:'🇺🇾 vs 🇨🇴',r:'1-0'}
];
let predIdx=0;
function addPrediction(){
  const c=document.getElementById('predictions');if(!c)return;
  const p=PREDICTIONS[predIdx%PREDICTIONS.length];predIdx++;
  const d=document.createElement('div');
  d.className='flex items-center justify-between text-xs rounded px-3 py-2.5';
  d.style.cssText='background:rgba(255,255,255,.06);border:1px solid rgba(235,195,43,.2);animation:slideUp .35s ease';
  d.innerHTML=`<span style="color:var(--on-dark-dim)">${p.n}</span><span style="color:var(--ink-300);font-size:.72rem">${p.g}</span><span style="font-weight:700;color:var(--gold)">${p.r}</span>`;
  if(c.children.length>=3)c.removeChild(c.firstChild);
  c.appendChild(d);
}
const predEl=document.getElementById('predictions');
if(predEl){addPrediction();addPrediction();addPrediction();setInterval(addPrediction,2800);}

/* ── COUNTERS ── */
function animateCounters(){
  document.querySelectorAll('[data-to]').forEach(el=>{
    const T=+el.dataset.to,dur=+el.dataset.dur||1000;
    const step=T/(dur/16);let n=0;
    const t=setInterval(()=>{n=Math.min(n+step,T);el.textContent=Math.floor(n);if(n>=T)clearInterval(t)},16);
  });
}
setTimeout(animateCounters,500);

/* ── COUNTDOWN AL MUNDIAL ── */
(function(){
  const target=new Date('2026-06-11T19:00:00Z').getTime();
  const $d=document.getElementById('cd-d');
  const $h=document.getElementById('cd-h');
  const $m=document.getElementById('cd-m');
  const $s=document.getElementById('cd-s');
  if(!$d||!$h||!$m||!$s)return;
  const pad=n=>String(n).padStart(2,'0');
  function tick(){
    const diff=target-Date.now();
    if(diff<=0){$d.textContent='00';$h.textContent='00';$m.textContent='00';$s.textContent='00';return;}
    $d.textContent=pad(Math.floor(diff/86400000));
    $h.textContent=pad(Math.floor((diff%86400000)/3600000));
    $m.textContent=pad(Math.floor((diff%3600000)/60000));
    $s.textContent=pad(Math.floor((diff%60000)/1000));
  }
  tick();setInterval(tick,1000);
})();

/* ── SELECTOR DE PAÍS EN PRECIOS ── */
let selectedCountry='argentina';

window.switchCountry=function(country){
  selectedCountry=country;
  document.querySelectorAll('.country-btn').forEach(b=>{
    b.classList.toggle('active',b.dataset.country===country);
  });
  const PRICES={
    argentina:{
      basic:   {main:'$160.000', unit:'ARS', sub:'≈ USD 113'},
      standard:{main:'$280.000', unit:'ARS', sub:'≈ USD 199'},
      full:    {main:'desde USD 35', unit:'/mes', sub:'Precio fijo hasta 1.000 usuarios'},
      info:'🇦🇷 Precios en <strong>pesos argentinos (ARS)</strong>. Plan FULL cotizado en USD. Tipo de cambio ref: 1&nbsp;USD&nbsp;=&nbsp;$1.410&nbsp;ARS.',
      sindicato:true
    },
    bolivia:{
      basic:   {main:'Bs. 900',   unit:'BOB', sub:'≈ USD 130'},
      standard:{main:'Bs. 1.600', unit:'BOB', sub:'≈ USD 231'},
      full:    {main:'desde USD 35', unit:'/mes', sub:'Precio fijo hasta 1.000 usuarios'},
      info:'🇧🇴 Precios en <strong>bolivianos (BOB)</strong>. Plan FULL cotizado en USD.',
      sindicato:false
    },
    mexico:{
      basic:   {main:'$865',   unit:'MXN', sub:'≈ USD 43'},
      standard:{main:'$1.557', unit:'MXN', sub:'≈ USD 78'},
      full:    {main:'desde USD 35', unit:'/mes', sub:'Precio fijo hasta 1.000 usuarios'},
      info:'🇲🇽 Precios en <strong>pesos mexicanos (MXN)</strong>. Plan FULL cotizado en USD.',
      sindicato:false
    },
    peru:{
      basic:   {main:'S/ 240', unit:'PEN', sub:'≈ USD 64'},
      standard:{main:'S/ 430', unit:'PEN', sub:'≈ USD 115'},
      full:    {main:'desde USD 35', unit:'/mes', sub:'Precio fijo hasta 1.000 usuarios'},
      info:'🇵🇪 Precios en <strong>soles peruanos (PEN)</strong>. Plan FULL cotizado en USD.',
      sindicato:false
    },
    otro:{
      basic:   {main:'USD 113', unit:'', sub:'Precio internacional'},
      standard:{main:'USD 199', unit:'', sub:'Precio internacional'},
      full:    {main:'desde USD 35', unit:'/mes', sub:'Precio fijo hasta 1.000 usuarios'},
      info:'🌎 Precios en <strong>dólares estadounidenses (USD)</strong>.',
      sindicato:false
    }
  };
  const p=PRICES[country]||PRICES['otro'];
  const info=document.getElementById('country-info');
  if(info)info.innerHTML=p.info;
  ['basic','standard','full'].forEach(id=>{
    const main=document.getElementById('price-'+id+'-main');
    const unit=document.getElementById('price-'+id+'-unit');
    const sub =document.getElementById('price-'+id+'-sub');
    if(main)main.textContent=p[id].main;
    if(unit)unit.textContent=p[id].unit;
    if(sub) sub.textContent =p[id].sub;
  });
  const tabsWrap=document.getElementById('tabs-pricing-wrap');
  if(tabsWrap){
    tabsWrap.style.display=p.sindicato?'':'none';
    if(!p.sindicato)switchPricing('e');
  }
};

/* ── PRICING TOGGLE (Empresas / Sindicatos) ── */
function switchPricing(type){
  const isE=type==='e';
  document.getElementById('pricing-empresa').classList.toggle('hidden',!isE);
  document.getElementById('pricing-sindicato').classList.toggle('hidden',isE);
  document.getElementById('tab-empresa').classList.toggle('active',isE);
  document.getElementById('tab-sindicato').classList.toggle('active',!isE);
}

/* ── FULL PLAN TIER TOGGLE ── */
function toggleFullTiers(){
  const el=document.getElementById('full-tiers');
  const arrow=document.getElementById('full-tiers-arrow');
  if(el)el.classList.toggle('open');
  if(arrow)arrow.classList.toggle('rotated');
}

/* ── FAQ ── */
function toggleFaq(btn){
  const body=btn.nextElementSibling,arrow=btn.querySelector('.faq-arrow');
  body.classList.toggle('open');arrow.classList.toggle('rotated');
}

/* ════════════════════════════════════
   PRICING DATA — Sub-planes completos
════════════════════════════════════ */
const RATE=1410;
const FULL_BASE_ARS=400000;
const fmtARS=n=>'$'+n.toLocaleString('es-AR')+' ARS';
const fmtARStoUSD=n=>'≈ USD '+Math.round(n/RATE).toLocaleString('en-US');

function getPriceLine(info){
  if(!info)return{main:'-',sub:'-',combined:'-'};
  // Plan FULL: plataforma ARS + infraestructura USD
  if(info.ars!==null&&info.ars!==undefined&&info.usd!==null&&info.usd!==undefined){
    return{
      main:  fmtARS(info.ars),
      sub:   '+ USD '+info.usd+'/mes infraestructura',
      combined: fmtARS(info.ars)+' + USD '+info.usd+'/mes'
    };
  }
  // Plan base (solo ARS)
  return{main:fmtARS(info.ars),sub:fmtARStoUSD(info.ars),combined:fmtARS(info.ars)};
}

const PLANS={
  empresa:{
    '1-30':        {plan:'BÁSICO',       ars:160000,          usd:null},
    '31-60':       {plan:'ESTÁNDAR',     ars:280000,          usd:null},
    '61-200':      {plan:'FULL MICRO',   ars:FULL_BASE_ARS,   usd:25,  tier:'Micro',  label:'Hasta 200 usuarios'},
    '201-1000':    {plan:'FULL MICRO',   ars:FULL_BASE_ARS,   usd:25,  tier:'Micro',  label:'200 a 1.000 usuarios'},
    '1001-2000':   {plan:'FULL SMALL',   ars:FULL_BASE_ARS,   usd:40,  tier:'Small',  label:'1.000 a 2.000 usuarios'},
    '2001-3000':   {plan:'FULL MEDIUM',  ars:FULL_BASE_ARS,   usd:85,  tier:'Medium', label:'2.000 a 3.000 usuarios'},
    '3001-4000':   {plan:'FULL MEDIUM',  ars:FULL_BASE_ARS,   usd:85,  tier:'Medium', label:'3.000 a 4.000 usuarios'},
    '4001-5000':   {plan:'FULL MEDIUM',  ars:FULL_BASE_ARS,   usd:85,  tier:'Medium', label:'4.000 a 5.000 usuarios'},
    '5001-8000':   {plan:'FULL LARGE',   ars:FULL_BASE_ARS,   usd:135, tier:'Large',  label:'5.000 a 8.000 usuarios'},
    '8001-10000':  {plan:'FULL LARGE',   ars:FULL_BASE_ARS,   usd:135, tier:'Large',  label:'8.000 a 10.000 usuarios'},
    '10001-15000': {plan:'FULL LARGE',   ars:FULL_BASE_ARS,   usd:135, tier:'Large',  label:'10.000 a 15.000 usuarios'},
    '15001-20000': {plan:'FULL XL',      ars:FULL_BASE_ARS,   usd:210, tier:'XL',     label:'15.000 a 20.000 usuarios'}
  },
  sindicato:{
    '1-30':        {plan:'BÁSICO',       ars:400000,          usd:null},
    '31-60':       {plan:'ESTÁNDAR',     ars:580000,          usd:null},
    '61-200':      {plan:'FULL MICRO',   ars:FULL_BASE_ARS,   usd:25,  tier:'Micro',  label:'Hasta 200 usuarios'},
    '201-1000':    {plan:'FULL MICRO',   ars:FULL_BASE_ARS,   usd:25,  tier:'Micro',  label:'200 a 1.000 usuarios'},
    '1001-2000':   {plan:'FULL SMALL',   ars:FULL_BASE_ARS,   usd:40,  tier:'Small',  label:'1.000 a 2.000 usuarios'},
    '2001-3000':   {plan:'FULL MEDIUM',  ars:FULL_BASE_ARS,   usd:85,  tier:'Medium', label:'2.000 a 3.000 usuarios'},
    '3001-4000':   {plan:'FULL MEDIUM',  ars:FULL_BASE_ARS,   usd:85,  tier:'Medium', label:'3.000 a 4.000 usuarios'},
    '4001-5000':   {plan:'FULL MEDIUM',  ars:FULL_BASE_ARS,   usd:85,  tier:'Medium', label:'4.000 a 5.000 usuarios'},
    '5001-8000':   {plan:'FULL LARGE',   ars:FULL_BASE_ARS,   usd:135, tier:'Large',  label:'5.000 a 8.000 usuarios'},
    '8001-10000':  {plan:'FULL LARGE',   ars:FULL_BASE_ARS,   usd:135, tier:'Large',  label:'8.000 a 10.000 usuarios'},
    '10001-15000': {plan:'FULL LARGE',   ars:FULL_BASE_ARS,   usd:135, tier:'Large',  label:'10.000 a 15.000 usuarios'},
    '15001-20000': {plan:'FULL XL',      ars:FULL_BASE_ARS,   usd:210, tier:'XL',     label:'15.000 a 20.000 usuarios'}
  },
  institucional:{
    '1-30':        {plan:'BÁSICO',       ars:400000,          usd:null},
    '31-60':       {plan:'ESTÁNDAR',     ars:580000,          usd:null},
    '61-200':      {plan:'FULL MICRO',   ars:FULL_BASE_ARS,   usd:25,  tier:'Micro',  label:'Hasta 200 usuarios'},
    '201-1000':    {plan:'FULL MICRO',   ars:FULL_BASE_ARS,   usd:25,  tier:'Micro',  label:'200 a 1.000 usuarios'},
    '1001-2000':   {plan:'FULL SMALL',   ars:FULL_BASE_ARS,   usd:40,  tier:'Small',  label:'1.000 a 2.000 usuarios'},
    '2001-3000':   {plan:'FULL MEDIUM',  ars:FULL_BASE_ARS,   usd:85,  tier:'Medium', label:'2.000 a 3.000 usuarios'},
    '3001-4000':   {plan:'FULL MEDIUM',  ars:FULL_BASE_ARS,   usd:85,  tier:'Medium', label:'3.000 a 4.000 usuarios'},
    '4001-5000':   {plan:'FULL MEDIUM',  ars:FULL_BASE_ARS,   usd:85,  tier:'Medium', label:'4.000 a 5.000 usuarios'},
    '5001-8000':   {plan:'FULL LARGE',   ars:FULL_BASE_ARS,   usd:135, tier:'Large',  label:'5.000 a 8.000 usuarios'},
    '8001-10000':  {plan:'FULL LARGE',   ars:FULL_BASE_ARS,   usd:135, tier:'Large',  label:'8.000 a 10.000 usuarios'},
    '10001-15000': {plan:'FULL LARGE',   ars:FULL_BASE_ARS,   usd:135, tier:'Large',  label:'10.000 a 15.000 usuarios'},
    '15001-20000': {plan:'FULL XL',      ars:FULL_BASE_ARS,   usd:210, tier:'XL',     label:'15.000 a 20.000 usuarios'}
  }
};

function getPlanInfo(){
  const q=document.getElementById('fqty').value;
  if(!q||!orgValue)return null;
  return PLANS[orgValue]?.[q]||null;
}

/* ── FORM STATE ── */
let currentStep=1,orgValue='';

function selectOrg(v){
  orgValue=v;
  ['empresa','sindicato','institucional'].forEach(k=>{
    const el=document.getElementById('opt-'+k);
    if(el)el.classList.remove('selected');
  });
  const opt=document.getElementById('opt-'+v);
  if(opt)opt.classList.add('selected');
  const err=document.getElementById('err-org');
  if(err)err.classList.remove('active');
  updatePlanPreview();
}

function preSelectPlan(org,qty){
  selectOrg(org);
  setTimeout(()=>{
    const sel=document.getElementById('fqty');
    if(sel){sel.value=qty;updatePlanPreview();}
  },100);
  const sec=document.getElementById('contacto');
  if(sec)sec.scrollIntoView({behavior:'smooth'});
}

function updatePlanPreview(){
  const info=getPlanInfo();
  const box=document.getElementById('plan-preview-box');
  if(info&&box){
    box.classList.remove('hidden');
    const price=getPriceLine(info);
    const ppPlan=document.getElementById('pp-plan');
    const ppArs=document.getElementById('pp-ars');
    const ppUsd=document.getElementById('pp-usd');
    const ppTier=document.getElementById('pp-tier');
    if(ppPlan)ppPlan.textContent=info.plan;
    if(ppArs) ppArs.textContent=price.main;
    if(ppUsd) ppUsd.textContent=price.sub;
    if(ppTier){
      if(info.tier){ppTier.textContent='Compute: '+info.tier;ppTier.style.display='';}
      else ppTier.style.display='none';
    }
  } else if(box)box.classList.add('hidden');
}

function setDot(i,state){
  const d=document.getElementById('dot'+i);if(!d)return;
  d.classList.remove('active','done');
  if(state==='active')d.classList.add('active');
  else if(state==='done')d.classList.add('done');
}
function setLine(id,done){
  const l=document.getElementById(id);if(l)l.classList.toggle('done',done);
}
function updateProgress(step){
  const pct=Math.round(step/4*100);
  const pbfill=document.getElementById('pbfill');
  const slabel=document.getElementById('step-label');
  const spct=document.getElementById('step-pct');
  if(pbfill)pbfill.style.width=pct+'%';
  if(slabel)slabel.textContent='Paso '+step+' de 4';
  if(spct)spct.textContent=pct+'%';
  for(let i=1;i<=4;i++){
    if(i<step)setDot(i,'done');
    else if(i===step)setDot(i,'active');
    else setDot(i,'');
  }
  setLine('line12',step>1);setLine('line23',step>2);setLine('line34',step>3);
}

function nextStep(from){
  if(!validateStep(from))return;
  if(from===3)buildSummary();
  document.getElementById('step'+from).classList.remove('active');
  currentStep=from+1;
  document.getElementById('step'+currentStep).classList.add('active');
  updateProgress(currentStep);
  const sec=document.getElementById('contacto');
  if(sec)sec.scrollIntoView({behavior:'smooth',block:'start'});
}
function prevStep(from){
  document.getElementById('step'+from).classList.remove('active');
  currentStep=from-1;
  document.getElementById('step'+currentStep).classList.add('active');
  updateProgress(currentStep);
}

function validateStep(step){
  let ok=true;
  if(step===1){
    if(!orgValue){const e=document.getElementById('err-org');if(e)e.classList.add('active');ok=false;}
  }
  if(step===2){
    const nm=document.getElementById('fn'),em=document.getElementById('fe2'),ph=document.getElementById('ftel');
    const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!nm.value.trim()){showErr('err-fn',nm);ok=false;}else hideErr('err-fn',nm);
    if(!em.value.trim()||!re.test(em.value)){showErr('err-fe',em);ok=false;}else hideErr('err-fe',em);
    if(!ph.value.trim()){showErr('err-ftel',ph);ok=false;}else hideErr('err-ftel',ph);
  }
  if(step===3){
    const org=document.getElementById('forg'),qty=document.getElementById('fqty');
    if(!org.value.trim()){showErr('err-forg',org);ok=false;}else hideErr('err-forg',org);
    if(!qty.value){showErr('err-fqty',qty);ok=false;}else hideErr('err-fqty',qty);
  }
  return ok;
}
function showErr(id,inp){const e=document.getElementById(id);if(e)e.classList.add('active');if(inp)inp.style.borderColor='var(--rd-600)'}
function hideErr(id,inp){const e=document.getElementById(id);if(e)e.classList.remove('active');if(inp)inp.style.borderColor=''}

function buildSummary(){
  const info=getPlanInfo();
  const ORG_LABEL={empresa:'Empresa',sindicato:'Sindicato',institucional:'Institución Sindical'};
  const price=getPriceLine(info);
  const rows=[
    ['Tipo de organización',ORG_LABEL[orgValue]||'-'],
    ['Nombre',document.getElementById('fn').value],
    ['Email',document.getElementById('fe2').value],
    ['Teléfono',document.getElementById('ftel').value],
    ['Organización',document.getElementById('forg').value],
    ['Participantes',document.getElementById('fqty').selectedOptions?.[0]?.text||'-'],
    ['Cuándo',document.getElementById('fwhn').selectedOptions?.[0]?.text||'-']
  ];
  const box=document.getElementById('summary-box');
  if(box)box.innerHTML=rows.map(([k,v])=>`
    <div class="flex items-center justify-between gap-4 py-1.5" style="border-bottom:1px dashed var(--cream-2)">
      <span style="color:var(--ink-500);font-size:.8rem;flex-shrink:0">${k}</span>
      <span style="font-size:.88rem;text-align:right;color:var(--ink-900);font-weight:500">${v}</span>
    </div>
  `).join('');
  if(info){
    const fpPlan=document.getElementById('fp-plan');
    const fpArs=document.getElementById('fp-ars');
    const fpUsd=document.getElementById('fp-usd');
    if(fpPlan)fpPlan.textContent=info.plan;
    if(fpArs) fpArs.textContent=price.main;
    if(fpUsd) fpUsd.textContent=price.sub;
  }
}

/* ════════════════════════════════════
   SUBMIT — POST JSON via no-cors fetch
════════════════════════════════════ */
const GAS='https://script.google.com/macros/s/AKfycbxLkU2auZ_q8eH97XN3RsO7MMY3cI6HjR2BkfBeqMTfu1KGUUnzwQmTc9en3EE9MRgbjw/exec';

function doSubmit(){
  const chk=document.getElementById('fchk');
  if(!chk.checked){
    const e=document.getElementById('err-chk');if(e)e.classList.add('active');
    return;
  }
  const e=document.getElementById('err-chk');if(e)e.classList.remove('active');

  const info=getPlanInfo();
  const ORG_LABEL={empresa:'Empresa',sindicato:'Sindicato',institucional:'Institución Sindical'};
  const price=getPriceLine(info);

  const displayData={
    Nombre:       document.getElementById('fn').value.trim(),
    Email:        document.getElementById('fe2').value.trim(),
    Telefono:     document.getElementById('ftel').value.trim(),
    Organizacion: document.getElementById('forg').value.trim(),
    Tipo:         ORG_LABEL[orgValue]||orgValue,
    Plan:         info?info.plan:'-',
    Precio:       price.combined||price.main,
    Precio_sub:   info&&info.usd?'Plataforma ARS $400.000 + USD '+info.usd+'/mes infra':price.sub,
    Participantes:document.getElementById('fqty').selectedOptions?.[0]?.text||'-',
    Cuando:       document.getElementById('fwhn').selectedOptions?.[0]?.text||'-',
    Comentarios:  document.getElementById('fcmt').value.trim()
  };

  // Columnas A→M del sheet (sin cambios de cabeceras)
  const fila=[
    new Date().toLocaleString('es-AR',{timeZone:'America/Argentina/Buenos_Aires'}), // A - Fecha
    displayData.Nombre,        // B - Nombre
    displayData.Email,         // C - Email
    displayData.Telefono,      // D - Teléfono
    displayData.Organizacion,  // E - Organización
    displayData.Tipo,          // F - Tipo
    document.getElementById('fqty').value,  // G - Rango participantes
    displayData.Plan,          // H - Plan
    displayData.Precio,        // I - Precio principal (combinado para FULL)
    displayData.Precio_sub,    // J - Precio referencial
    displayData.Cuando,        // K - Cuándo
    displayData.Comentarios,   // L - Comentarios
    selectedCountry            // M - País
  ];

  const sbText=document.getElementById('submit-text');
  const sbSpin=document.getElementById('submit-spin');
  const sbBtn =document.getElementById('submit-btn');
  if(sbText)sbText.classList.add('hidden');
  if(sbSpin)sbSpin.classList.remove('hidden');
  if(sbBtn) sbBtn.disabled=true;

  let done=false;
  function finish(){if(done)return;done=true;showSuccess(displayData);}

  fetch(GAS,{
    method:'POST',
    mode:'no-cors',
    headers:{'Content-Type':'text/plain;charset=UTF-8'},
    body:JSON.stringify({nombreHoja:'Hoja 1',fila:fila})
  }).then(finish).catch(finish);

  setTimeout(finish,6000);
}

function showSuccess(data){
  const step4=document.getElementById('step4');
  const stepOk=document.getElementById('step-success');
  if(step4)step4.classList.remove('active');
  if(stepOk)stepOk.classList.add('active');

  const pbfill=document.getElementById('pbfill');
  const slabel=document.getElementById('step-label');
  const spct=document.getElementById('step-pct');
  if(pbfill)pbfill.style.width='100%';
  if(slabel)slabel.textContent='✓ Solicitud enviada';
  if(spct)spct.textContent='100%';
  for(let i=1;i<=4;i++)setDot(i,'done');

  const sumEl=document.getElementById('success-summary');
  if(sumEl)sumEl.innerHTML=`
    <p class="mono-label mb-3" style="color:var(--navy)">Resumen</p>
    <div class="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
      <span style="color:var(--ink-500)">Nombre</span><span style="color:var(--ink-900)">${data.Nombre}</span>
      <span style="color:var(--ink-500)">Email</span><span style="color:var(--ink-900)">${data.Email}</span>
      <span style="color:var(--ink-500)">Organización</span><span style="color:var(--ink-900)">${data.Organizacion}</span>
      <span style="color:var(--ink-500)">Plan</span><span style="color:var(--navy);font-weight:700">${data.Plan}</span>
      <span style="color:var(--ink-500)">Precio</span><span style="color:var(--ink-900);font-weight:600">${data.Precio}</span>
      <span style="color:var(--ink-500)">Ref.</span><span style="color:var(--gold-dark)">${data.Precio_sub}</span>
    </div>
  `;

  // WhatsApp message para el vendedor
  const lines=[
    '🏆 *PRODE TALENTO 2026 · Nuevo Presupuesto*',
    '━━━━━━━━━━━━━━━━━━━━━━',
    `👤 *Nombre:* ${data.Nombre}`,
    `📧 *Email:* ${data.Email}`,
    `📱 *Tel:* ${data.Telefono}`,
    `🏢 *Organización:* ${data.Organizacion}`,
    `📋 *Tipo:* ${data.Tipo}`,
    `👥 *Participantes:* ${data.Participantes}`,
    `📦 *Plan:* ${data.Plan}`,
    `💰 *Precio:* ${data.Precio} (${data.Precio_sub})`,
    `⏰ *Cuándo:* ${data.Cuando}`
  ];
  if(data.Comentarios)lines.push(`💬 *Comentarios:* ${data.Comentarios}`);
  const waMsg=lines.join('\n');
  const waUrl='https://wa.me/5491133588062?text='+encodeURIComponent(waMsg);
  const qrUrl='https://api.qrserver.com/v1/create-qr-code/?size=180x180&data='+encodeURIComponent(waUrl)+'&color=0c182b&bgcolor=ffffff&margin=10&qzone=1';

  const waEl=document.getElementById('success-wa-link');
  const qrEl=document.getElementById('success-qr');
  if(waEl)waEl.href=waUrl;
  if(qrEl)qrEl.src=qrUrl;

  showToast('✅','¡Solicitud enviada!','Te contactaremos por email a la brevedad.');
  const sec=document.getElementById('contacto');
  if(sec)sec.scrollIntoView({behavior:'smooth',block:'start'});
}
