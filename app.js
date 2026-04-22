/* ═══════════════════════════════════════════════════════════════════
   app.js · Prode Mundialista 2026
   ═════════════════════════════════
   Incluye: nav, modal, toast, live predictions, counters animados,
   pricing toggle, FAQ, form 4 pasos, submit al GAS,
   countdown al Mundial, switchCountry (selector de país en precios).
═══════════════════════════════════════════════════════════════════ */

AOS.init({once:true,offset:60,duration:700,easing:'ease-out-cubic'});

/* ── NAV ── */
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',scrollY>40);
});
document.getElementById('hamburger').onclick=()=>{
  document.getElementById('mobile-menu').classList.toggle('open');
};
function closeMobile(){document.getElementById('mobile-menu').classList.remove('open')}

/* ── MODAL T&C ── */
function openTc(){document.getElementById('tc-modal').classList.add('open');document.body.style.overflow='hidden'}
function closeTc(){document.getElementById('tc-modal').classList.remove('open');document.body.style.overflow=''}
document.getElementById('tc-modal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeTc()});
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
addPrediction();addPrediction();addPrediction();
setInterval(addPrediction,2800);

/* ── COUNTERS (para cualquier elemento con data-to) ── */
function animateCounters(){
  document.querySelectorAll('[data-to]').forEach(el=>{
    const T=+el.dataset.to,dur=+el.dataset.dur||1000;
    const step=T/(dur/16);let n=0;
    const t=setInterval(()=>{n=Math.min(n+step,T);el.textContent=Math.floor(n);if(n>=T)clearInterval(t)},16);
  });
}
setTimeout(animateCounters,500);

/* ── COUNTDOWN AL MUNDIAL ──
   Inicio: Jueves 11 de junio de 2026 · 16:00 hs Argentina (UTC-3) = 19:00 UTC */
(function(){
  const target = new Date('2026-06-11T19:00:00Z').getTime();
  const $d = document.getElementById('cd-d');
  const $h = document.getElementById('cd-h');
  const $m = document.getElementById('cd-m');
  const $s = document.getElementById('cd-s');
  if(!$d || !$h || !$m || !$s) return;
  const pad = n => String(n).padStart(2,'0');
  function tick(){
    const diff = target - Date.now();
    if(diff <= 0){
      $d.textContent='00'; $h.textContent='00'; $m.textContent='00'; $s.textContent='00';
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hrs  = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    $d.textContent=pad(days); $h.textContent=pad(hrs); $m.textContent=pad(mins); $s.textContent=pad(secs);
  }
  tick();
  setInterval(tick,1000);
})();

/* ── SELECTOR DE PAÍS EN PRECIOS ── */
let selectedCountry = 'argentina';

window.switchCountry = function(country){
  selectedCountry = country;

  document.querySelectorAll('.country-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.country === country);
  });

  const PRICES = {
    argentina: {
      basic:    { main: '$160.000',  unit: 'ARS', sub: '≈ USD 113' },
      standard: { main: '$280.000',  unit: 'ARS', sub: '≈ USD 199' },
      full:     { main: '$400.000',  unit: 'ARS', sub: '≈ USD 284' },
      info: '🇦🇷 Precios en <strong>pesos argentinos (ARS)</strong>. Tipo de cambio referencial: 1&nbsp;USD&nbsp;=&nbsp;$1.410&nbsp;ARS.',
      sindicato: true
    },
    bolivia: {
      basic:    { main: 'Bs. 900',   unit: 'BOB', sub: '≈ USD 130' },
      standard: { main: 'Bs. 1.600', unit: 'BOB', sub: '≈ USD 231' },
      full:     { main: 'Bs. 2.300', unit: 'BOB', sub: '≈ USD 333' },
      info: '🇧🇴 Precios en <strong>bolivianos (BOB)</strong>.',
      sindicato: false
    },
    mexico: {
      basic:    { main: '$865',   unit: 'MXN', sub: '≈ USD 43' },
      standard: { main: '$1.557', unit: 'MXN', sub: '≈ USD 78' },
      full:     { main: '$2.249', unit: 'MXN', sub: '≈ USD 112' },
      info: '🇲🇽 Precios en <strong>pesos mexicanos (MXN)</strong>.',
      sindicato: false
    },
    peru: {
      basic:    { main: 'S/ 240', unit: 'PEN', sub: '≈ USD 64' },
      standard: { main: 'S/ 430', unit: 'PEN', sub: '≈ USD 115' },
      full:     { main: 'S/ 620', unit: 'PEN', sub: '≈ USD 165' },
      info: '🇵🇪 Precios en <strong>soles peruanos (PEN)</strong>.',
      sindicato: false
    },
    otro: {
      basic:    { main: 'USD 113', unit: '', sub: 'Precio internacional' },
      standard: { main: 'USD 199', unit: '', sub: 'Precio internacional' },
      full:     { main: 'USD 284', unit: '', sub: 'Precio internacional' },
      info: '🌎 Precios en <strong>dólares estadounidenses (USD)</strong>.',
      sindicato: false
    }
  };

  const p = PRICES[country] || PRICES['otro'];

  // Actualizar info contextual
  const info = document.getElementById('country-info');
  if(info) info.innerHTML = p.info;

  // Actualizar las tres tarjetas de precio
  ['basic','standard','full'].forEach(id => {
    const main = document.getElementById('price-'+id+'-main');
    const unit = document.getElementById('price-'+id+'-unit');
    const sub  = document.getElementById('price-'+id+'-sub');
    if(main) main.textContent = p[id].main;
    if(unit) unit.textContent = p[id].unit;
    if(sub)  sub.textContent  = p[id].sub;
  });

  // Mostrar/ocultar tabs de sindicatos
  const tabsWrap = document.getElementById('tabs-pricing-wrap');
  if(tabsWrap){
    tabsWrap.style.display = p.sindicato ? '' : 'none';
    if(!p.sindicato) switchPricing('e');
  }
};

/* ── PRICING TOGGLE (Empresas / Sindicatos) ── */
function switchPricing(type){
  const isE = type === 'e';
  document.getElementById('pricing-empresa').classList.toggle('hidden',!isE);
  document.getElementById('pricing-sindicato').classList.toggle('hidden',isE);
  document.getElementById('tab-empresa').classList.toggle('active',isE);
  document.getElementById('tab-sindicato').classList.toggle('active',!isE);
}

/* ── FAQ ── */
function toggleFaq(btn){
  const body=btn.nextElementSibling,arrow=btn.querySelector('.faq-arrow');
  body.classList.toggle('open');arrow.classList.toggle('rotated');
}

/* ── PRICING DATA ── */
const RATE=1410;
const PLANS={
  empresa:      {'1-30':{plan:'BÁSICO',ars:160000},'31-60':{plan:'ESTÁNDAR',ars:280000},'61+':{plan:'FULL',ars:400000}},
  sindicato:    {'1-30':{plan:'BÁSICO',ars:400000},'31-60':{plan:'ESTÁNDAR',ars:580000},'61+':{plan:'FULL',ars:1000000}},
  institucional:{'1-30':{plan:'BÁSICO',ars:400000},'31-60':{plan:'ESTÁNDAR',ars:580000},'61+':{plan:'FULL',ars:400000}}
};
const fmtARS=n=>'$'+n.toLocaleString('es-AR')+' ARS';
const fmtUSD=n=>'≈ USD '+Math.round(n/RATE).toLocaleString('en-US');
function getPlanInfo(){
  const q=document.getElementById('fqty').value;
  if(!q||!orgValue)return null;
  return PLANS[orgValue]?.[q]||null;
}

/* ── FORM STATE ── */
let currentStep=1,orgValue='';

function selectOrg(v){
  orgValue=v;
  ['empresa','sindicato','institucional'].forEach(k=>document.getElementById('opt-'+k).classList.remove('selected'));
  document.getElementById('opt-'+v).classList.add('selected');
  document.getElementById('err-org').classList.remove('active');
  updatePlanPreview();
}

function preSelectPlan(org,qty){
  selectOrg(org);
  setTimeout(()=>{
    const sel=document.getElementById('fqty');
    sel.value=qty;updatePlanPreview();
  },100);
  document.getElementById('contacto').scrollIntoView({behavior:'smooth'});
}

function updatePlanPreview(){
  const info=getPlanInfo();
  const box=document.getElementById('plan-preview-box');
  if(info&&box){
    box.classList.remove('hidden');
    document.getElementById('pp-plan').textContent=info.plan;
    document.getElementById('pp-ars').textContent=fmtARS(info.ars);
    document.getElementById('pp-usd').textContent=fmtUSD(info.ars);
  } else if(box) box.classList.add('hidden');
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
  document.getElementById('pbfill').style.width=pct+'%';
  document.getElementById('step-label').textContent='Paso '+step+' de 4';
  document.getElementById('step-pct').textContent=pct+'%';
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
  document.getElementById('contacto').scrollIntoView({behavior:'smooth',block:'start'});
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
    if(!orgValue){document.getElementById('err-org').classList.add('active');ok=false;}
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
function showErr(id,inp){document.getElementById(id).classList.add('active');if(inp)inp.style.borderColor='var(--rd-600)'}
function hideErr(id,inp){document.getElementById(id)?.classList.remove('active');if(inp)inp.style.borderColor=''}

function buildSummary(){
  const info=getPlanInfo();
  const ORG_LABEL={empresa:'Empresa',sindicato:'Sindicato',institucional:'Institución Sindical'};
  const rows=[
    ['Tipo de organización',ORG_LABEL[orgValue]||'-'],
    ['Nombre',document.getElementById('fn').value],
    ['Email',document.getElementById('fe2').value],
    ['Teléfono',document.getElementById('ftel').value],
    ['Organización',document.getElementById('forg').value],
    ['Participantes',document.getElementById('fqty').selectedOptions?.[0]?.text||'-'],
    ['Cuándo',document.getElementById('fwhn').selectedOptions?.[0]?.text||'-']
  ];
  document.getElementById('summary-box').innerHTML=rows.map(([k,v])=>`
    <div class="flex items-center justify-between gap-4 py-1.5" style="border-bottom:1px dashed var(--cream-2)">
      <span style="color:var(--ink-500);font-size:.8rem;flex-shrink:0">${k}</span>
      <span style="font-size:.88rem;text-align:right;color:var(--ink-900);font-weight:500">${v}</span>
    </div>
  `).join('');
  if(info){
    document.getElementById('fp-plan').textContent=info.plan;
    document.getElementById('fp-ars').textContent=fmtARS(info.ars);
    document.getElementById('fp-usd').textContent=fmtUSD(info.ars);
  }
}

/* ════════════════════════════════════
   SUBMIT — POST JSON via no-cors fetch
   GAS recibe el body en e.postData.contents
════════════════════════════════════ */
const GAS='https://script.google.com/macros/s/AKfycbxLkU2auZ_q8eH97XN3RsO7MMY3cI6HjR2BkfBeqMTfu1KGUUnzwQmTc9en3EE9MRgbjw/exec';

function doSubmit(){
  if(!document.getElementById('fchk').checked){
    document.getElementById('err-chk').classList.add('active');
    return;
  }
  document.getElementById('err-chk').classList.remove('active');

  const info=getPlanInfo();
  const ORG_LABEL={empresa:'Empresa',sindicato:'Sindicato',institucional:'Institución Sindical'};

  const displayData={
    Nombre:       document.getElementById('fn').value.trim(),
    Email:        document.getElementById('fe2').value.trim(),
    Organizacion: document.getElementById('forg').value.trim(),
    Plan:         info?info.plan:'-',
    Precio_ARS:   info?fmtARS(info.ars):'-',
    Precio_USD:   info?fmtUSD(info.ars):'-'
  };

  // Columnas A→M del sheet
  const fila=[
    new Date().toLocaleString('es-AR',{timeZone:'America/Argentina/Buenos_Aires'}), // A - Fecha
    displayData.Nombre,                                                               // B - Nombre
    displayData.Email,                                                                // C - Email
    document.getElementById('ftel').value.trim(),                                    // D - Teléfono
    displayData.Organizacion,                                                         // E - Organización
    ORG_LABEL[orgValue]||orgValue,                                                    // F - Tipo
    document.getElementById('fqty').value,                                            // G - Rango participantes
    displayData.Plan,                                                                 // H - Plan
    displayData.Precio_ARS,                                                           // I - Precio ARS
    displayData.Precio_USD,                                                           // J - Precio USD
    document.getElementById('fwhn').selectedOptions?.[0]?.text||'',                  // K - Cuándo
    document.getElementById('fcmt').value.trim(),                                     // L - Comentarios
    selectedCountry                                                                   // M - País
  ];

  document.getElementById('submit-text').classList.add('hidden');
  document.getElementById('submit-spin').classList.remove('hidden');
  document.getElementById('submit-btn').disabled=true;

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
  document.getElementById('step4').classList.remove('active');
  document.getElementById('step-success').classList.add('active');
  document.getElementById('pbfill').style.width='100%';
  document.getElementById('step-label').textContent='✓ Solicitud enviada';
  document.getElementById('step-pct').textContent='100%';
  for(let i=1;i<=4;i++)setDot(i,'done');

  document.getElementById('success-summary').innerHTML=`
    <p class="mono-label mb-3" style="color:var(--navy)">Resumen</p>
    <div class="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
      <span style="color:var(--ink-500)">Nombre</span><span style="color:var(--ink-900)">${data.Nombre}</span>
      <span style="color:var(--ink-500)">Email</span><span style="color:var(--ink-900)">${data.Email}</span>
      <span style="color:var(--ink-500)">Organización</span><span style="color:var(--ink-900)">${data.Organizacion}</span>
      <span style="color:var(--ink-500)">Plan</span><span style="color:var(--navy);font-weight:700">${data.Plan}</span>
      <span style="color:var(--ink-500)">Precio ARS</span><span style="color:var(--ink-900);font-weight:600">${data.Precio_ARS}</span>
      <span style="color:var(--ink-500)">Precio USD</span><span style="color:var(--gold-dark)">${data.Precio_USD}</span>
    </div>
  `;
  showToast('✅','¡Solicitud enviada!','Te contactaremos por email a la brevedad.');
  document.getElementById('contacto').scrollIntoView({behavior:'smooth',block:'start'});
}