/* FreeDocTemplates — shared scripts */
(function(){
  'use strict';

  var TOOLS = [
    { name:'Bill of Sale Template', desc:'Vehicle, general merchandise, or trailer', url:'/bill-of-sale-template', icon:'doc' },
    { name:'Power of Attorney Form', desc:'General, durable, limited, or medical', url:'/power-of-attorney-template', icon:'doc' },
    { name:'Invoice Template', desc:'Professional invoice with line items and tax', url:'/invoice-template', icon:'doc' },
    { name:'LLC Operating Agreement', desc:'Single or multi-member LLC agreement', url:'/llc-operating-agreement-template', icon:'doc' },
    { name:'Independent Contractor Agreement', desc:'Freelance/contractor service agreement', url:'/independent-contractor-agreement-template', icon:'doc' },
    { name:'NDA Template', desc:'Mutual or one-way non-disclosure agreement', url:'/nda-template', icon:'doc' },
    { name:'Lease Agreement Template', desc:'Residential or commercial lease', url:'/lease-agreement-template', icon:'doc' },
    { name:'Employment Contract Template', desc:'Full-time or part-time employment agreement', url:'/employment-contract-template', icon:'doc' },
    { name:'Bill of Sale for Car', desc:'Vehicle-specific bill of sale with VIN', url:'/car-bill-of-sale-template', icon:'doc' },
    { name:'Promissory Note Template', desc:'Loan repayment agreement between parties', url:'/promissory-note-template', icon:'doc' },
    { name:'Cease and Desist Letter', desc:'Formal demand to stop harmful activity', url:'/cease-and-desist-letter-template', icon:'doc' },
    { name:'Partnership Agreement', desc:'Business partnership terms and structure', url:'/partnership-agreement-template', icon:'doc' },
    { name:'Rental Agreement Template', desc:'Month-to-month or fixed-term rental', url:'/rental-agreement-template', icon:'doc' },
    { name:'Privacy Policy Generator', desc:'GDPR/CCPA-compliant privacy policy', url:'/privacy-policy-generator', icon:'doc' },
    { name:'Terms of Service Generator', desc:'Website terms and conditions', url:'/terms-of-service-generator', icon:'doc' },
  ];

  function iconSVG() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
  }

  function buildResults(query) {
    var q = (query||'').toLowerCase().trim();
    var list = q ? TOOLS.filter(function(t){
      return t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q);
    }) : TOOLS.slice(0,8);
    if (!list.length) {
      return '<div style="padding:24px;text-align:center;color:var(--ink-3);font-size:13px">No tools found for &ldquo;'+q+'&rdquo;</div>';
    }
    var html = q ? '' : '<div class="cmd-section-label">Popular templates</div>';
    list.forEach(function(t){
      html += '<a class="cmd-result" href="'+t.url+'">'
        + '<div class="cmd-result-icon">'+iconSVG()+'</div>'
        + '<div><div class="cmd-result-name">'+t.name+'</div><div class="cmd-result-desc">'+t.desc+'</div></div>'
        + '</a>';
    });
    return html;
  }

  var overlay = document.getElementById('cmd-overlay');
  var input   = document.getElementById('cmd-input');
  var body    = document.getElementById('cmd-body');
  var btnSearch = document.getElementById('btn-search');

  function openCmd() {
    if (!overlay) return;
    overlay.classList.add('open');
    if (body) body.innerHTML = buildResults('');
    setTimeout(function(){ if(input) input.focus(); }, 50);
  }
  function closeCmd() {
    if (!overlay) return;
    overlay.classList.remove('open');
    if (input) input.value = '';
  }
  window.closeCmd = closeCmd;
  window.openCmd  = openCmd;

  if (btnSearch) btnSearch.addEventListener('click', openCmd);
  if (overlay) overlay.addEventListener('click', function(e){ if(e.target===overlay) closeCmd(); });
  if (input) input.addEventListener('input', function(){
    if (body) body.innerHTML = buildResults(input.value);
  });
  document.addEventListener('keydown', function(e){
    if ((e.metaKey||e.ctrlKey) && e.key==='k') { e.preventDefault(); openCmd(); }
    if (e.key==='Escape') closeCmd();
  });

  /* nav dropdowns */
  document.querySelectorAll('.nav-trigger').forEach(function(btn){
    btn.addEventListener('click', function(){
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.nav-trigger').forEach(function(b){ b.setAttribute('aria-expanded','false'); });
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });
  document.addEventListener('click', function(e){
    if (!e.target.closest('.nav-group')) {
      document.querySelectorAll('.nav-trigger').forEach(function(b){ b.setAttribute('aria-expanded','false'); });
    }
  });

  /* scroll enter animations */
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting) en.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-enter]').forEach(function(el){ obs.observe(el); });
})();
