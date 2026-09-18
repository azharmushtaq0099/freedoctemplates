const fs = require('fs');
const p = 'C:/Users/mastr/claude co/legal-docs/promissory-note-template.html';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Free Promissory Note Template 2026 | Fill In &amp; Download PDF</title>
<meta name="description" content="Free promissory note template. Simple, interest-bearing, or installment payment plans. Auto-calculates interest and monthly payments. Fill, preview, download PDF. No sign-up.">
<link rel="canonical" href="https://www.freedoctemplates.xyz/promissory-note-template">
<meta property="og:title" content="Free Promissory Note Template 2026 — Fill In &amp; Download PDF">
<meta property="og:type" content="website">
<meta name="robots" content="index,follow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap">
<link rel="stylesheet" href="/shared/styles.css?v=1">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebApplication","name":"Free Promissory Note Template 2026","url":"https://www.freedoctemplates.xyz/promissory-note-template","description":"Create a promissory note online. Supports simple, interest-bearing, and installment loans. Auto-calculates payments. Download as PDF instantly. No sign-up.","applicationCategory":"LegalApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
</script>
</head>
<body>
<div class="cmd-overlay" id="cmd-overlay" role="dialog" aria-modal="true" aria-label="Search templates">
  <div class="cmd-modal">
    <div class="cmd-search-row">
      <span class="cmd-search-icon"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></span>
      <input class="cmd-input" id="cmd-input" type="text" placeholder="Search 15+ templates..." autocomplete="off" spellcheck="false">
      <kbd class="cmd-kbd-esc" onclick="closeCmd()">esc</kbd>
    </div>
    <div class="cmd-body" id="cmd-body"></div>
    <div class="cmd-footer"><span class="cmd-hint"><kbd class="cmd-key">&uarr;&darr;</kbd> navigate</span><span class="cmd-hint"><kbd class="cmd-key">&#x21b5;</kbd> open</span><span class="cmd-hint"><kbd class="cmd-key">esc</kbd> close</span></div>
  </div>
</div>
<header class="site-header">
  <div class="header-inner">
    <a href="/" class="site-logo">FreeDoc<span>Templates</span></a>
    <nav class="main-nav" aria-label="Main">
      <div class="nav-group">
        <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Business <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button>
        <div class="nav-dropdown"><a href="/invoice-template" class="nav-item">Invoice Template</a><a href="/independent-contractor-agreement-template" class="nav-item">Contractor Agreement</a><a href="/nda-template" class="nav-item">NDA Template</a></div>
      </div>
      <div class="nav-group">
        <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Personal <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button>
        <div class="nav-dropdown"><a href="/power-of-attorney-template" class="nav-item">Power of Attorney</a><a href="/llc-operating-agreement-template" class="nav-item">LLC Agreement</a><a href="/promissory-note-template" class="nav-item nav-item--active">Promissory Note</a><a href="/bill-of-sale-template" class="nav-item">Bill of Sale</a></div>
      </div>
    </nav>
    <div class="header-actions">
      <button class="btn-search" id="btn-search" aria-label="Search"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></button>
      <a href="/tools" class="btn-all-tools">All Templates</a>
    </div>
  </div>
</header>
<main class="page-wrap">
  <div class="container">
    <nav class="breadcrumb"><a href="/">Home</a><span>&#x203A;</span><span aria-current="page">Promissory Note Template</span></nav>
    <h1 class="page-title" data-enter>Free Promissory Note <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
    <p class="page-sub" data-enter data-delay="1">For personal loans between friends, family, or businesses. Simple, interest-bearing, or installment. Auto-calculates monthly payment. Fill in and download PDF.</p>
    <div class="page-badges" data-enter data-delay="2">
      <span class="page-badge"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Free, no account</span>
      <span class="page-badge"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Auto-calculates payments</span>
      <span class="page-badge"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> All 50 states</span>
    </div>
    <div class="doc-layout">
      <div class="doc-form-panel" data-enter data-delay="1">
        <div class="doc-card">
          <div class="doc-card-header">Loan Type</div>
          <div class="doc-card-body">
            <div class="form-group">
              <label class="form-label">Payment Structure</label>
              <select id="pn-type" class="form-select">
                <option value="lump">Lump sum (all due on maturity date)</option>
                <option value="interest">Interest-only + lump sum at maturity</option>
                <option value="installment">Fixed monthly installments</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Governing State</label>
              <select id="pn-state" class="form-select">
                <option value="">Select state...</option>
                <option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option>
                <option>California</option><option>Colorado</option><option>Connecticut</option><option>Delaware</option>
                <option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option>
                <option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option>
                <option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option>
                <option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option>
                <option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option>
                <option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option>
                <option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option>
                <option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option>
                <option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option>
                <option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option>
                <option>Wisconsin</option><option>Wyoming</option>
              </select>
            </div>
          </div>
        </div>
        <div class="doc-card" style="margin-top:12px">
          <div class="doc-card-header">Lender</div>
          <div class="doc-card-body">
            <div class="form-group"><label class="form-label">Full Name</label><input type="text" id="pn-lender" class="form-input" placeholder="Robert Williams"></div>
            <div class="form-group"><label class="form-label">Address</label><input type="text" id="pn-lender-addr" class="form-input" placeholder="123 Main St, Chicago, IL 60601"></div>
          </div>
        </div>
        <div class="doc-card" style="margin-top:12px">
          <div class="doc-card-header">Borrower</div>
          <div class="doc-card-body">
            <div class="form-group"><label class="form-label">Full Name</label><input type="text" id="pn-borrower" class="form-input" placeholder="Sarah Johnson"></div>
            <div class="form-group"><label class="form-label">Address</label><input type="text" id="pn-borrower-addr" class="form-input" placeholder="456 Oak Ave, Chicago, IL 60602"></div>
          </div>
        </div>
        <div class="doc-card" style="margin-top:12px">
          <div class="doc-card-header">Loan Details</div>
          <div class="doc-card-body">
            <div class="form-group"><label class="form-label">Principal Amount ($)</label><input type="number" id="pn-principal" class="form-input" placeholder="10000" min="0"></div>
            <div class="form-row">
              <div class="form-group"><label class="form-label">Annual Interest Rate (%)</label><input type="number" id="pn-rate" class="form-input" placeholder="5.0" min="0" max="36" step="0.1" value="5.0"></div>
              <div class="form-group"><label class="form-label">Term (months)</label><input type="number" id="pn-term" class="form-input" placeholder="24" min="1" value="24"></div>
            </div>
            <div class="form-group"><label class="form-label">Loan Date</label><input type="date" id="pn-date" class="form-input"></div>
            <div class="form-group" id="pn-late-wrap">
              <label class="form-label">Late Fee (if payment overdue by 10+ days)</label>
              <input type="number" id="pn-late" class="form-input" placeholder="25" value="25" min="0">
            </div>
          </div>
        </div>
        <div class="doc-card doc-card--highlight" style="margin-top:12px" id="pn-calc-card">
          <div class="doc-card-header">Payment Summary</div>
          <div class="doc-card-body" id="pn-calc-body" style="font-size:13px"></div>
        </div>
        <div class="btn-group" style="margin-top:12px">
          <button class="doc-btn doc-btn--gold" onclick="window.print()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Download / Print PDF
          </button>
        </div>
      </div>
      <div class="doc-preview-panel" data-enter data-delay="2">
        <div class="preview-toolbar">
          <span class="preview-label">Live Preview</span>
          <div class="preview-actions">
            <button class="preview-btn preview-btn--primary" onclick="window.print()">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Download PDF
            </button>
          </div>
        </div>
        <div class="legal-document" id="pn-preview"></div>
      </div>
    </div>
    <section class="faq-section" style="margin:48px -24px 0;padding:48px 24px">
      <div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:24px">Promissory note questions</h2></div>
      <div class="faq-list">
        <details class="faq-item"><summary class="faq-q">Is a promissory note legally binding?</summary><div class="faq-a">Yes. A properly signed promissory note is a legally binding contract. The lender can sue the borrower in court for the outstanding balance if they default. For loans over certain amounts, notarization and witnesses are recommended but generally not required. Courts regularly enforce handwritten promissory notes between family and friends.</div></details>
        <details class="faq-item"><summary class="faq-q">Does a promissory note need to be notarized?</summary><div class="faq-a">Not in most states. A promissory note is legally binding with just the borrower&apos;s signature. However, notarization adds credibility and makes it harder for the borrower to deny signing. For loans secured by real estate, a mortgage or deed of trust (which must be notarized and recorded) is also required alongside the promissory note.</div></details>
        <details class="faq-item"><summary class="faq-q">What is the difference between a promissory note and an IOU?</summary><div class="faq-a">An IOU is an informal acknowledgment of debt with no repayment terms. A promissory note is a formal legal document with a specific principal amount, interest rate, repayment schedule, and maturity date. Promissory notes are enforceable in court; IOUs generally are too, but they provide far less protection because repayment terms are undefined.</div></details>
        <details class="faq-item"><summary class="faq-q">What happens if the borrower doesn&apos;t repay?</summary><div class="faq-a">The lender can: (1) send a formal demand letter, (2) file in small claims court (for amounts typically under $5,000&ndash;$10,000 depending on state), or (3) file a civil lawsuit for larger amounts. If the note includes a security interest (collateral), the lender may be able to repossess the collateral without going to court.</div></details>
      </div>
    </section>
  </div>
</main>
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p><p class="footer-disclaimer" style="margin-top:8px">Not a law firm. For informational use only.</p></div>
      <div><div class="footer-col-title">Business</div><nav class="footer-nav"><a href="/invoice-template">Invoice</a><a href="/independent-contractor-agreement-template">Contractor Agreement</a><a href="/nda-template">NDA</a></nav></div>
      <div><div class="footer-col-title">Property</div><nav class="footer-nav"><a href="/bill-of-sale-template">Bill of Sale</a><a href="/lease-agreement-template">Lease Agreement</a><a href="/promissory-note-template">Promissory Note</a></nav></div>
      <div><div class="footer-col-title">Personal</div><nav class="footer-nav"><a href="/power-of-attorney-template">Power of Attorney</a><a href="/llc-operating-agreement-template">LLC Agreement</a></nav></div>
    </div>
    <div class="footer-bottom"><p>&copy; 2026 FreeDocTemplates.xyz</p></div>
  </div>
</footer>
<script>
(function(){
  function gv(id){ var el=document.getElementById(id); return el?(el.value||'').trim():''; }
  function field(v,ph){ return v?'<span class="doc-field">'+v+'</span>':'<span class="doc-field empty">'+ph+'</span>'; }
  function fmt(n){ return '$'+parseFloat(n||0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,','); }
  function fmtD(d){ return d?new Date(d+'T12:00:00').toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}):null; }

  function pmt(P,r,n){ if(r===0) return P/n; return P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); }

  function addMonths(d,n){ var x=new Date(d+'T12:00:00'); x.setMonth(x.getMonth()+n); return x.toISOString().split('T')[0]; }

  function calcSummary() {
    var P = parseFloat(gv('pn-principal'))||0;
    var rate = parseFloat(gv('pn-rate'))||0;
    var n = parseInt(gv('pn-term'))||1;
    var type = gv('pn-type');
    var r = rate/100/12;
    var totalInterest = 0, monthlyPmt = 0;
    if(type==='installment') {
      monthlyPmt = pmt(P,r,n);
      totalInterest = monthlyPmt*n - P;
    } else if(type==='interest') {
      monthlyPmt = P*r;
      totalInterest = monthlyPmt*n;
    } else {
      totalInterest = P*(rate/100)*(n/12);
    }
    var total = P+totalInterest;
    var summary = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'
      + (type==='installment'?'<div><div style="font-size:10px;color:var(--ink-3);font-weight:600;text-transform:uppercase;letter-spacing:.05em">Monthly Payment</div><div style="font-size:18px;font-weight:800;color:var(--accent)">'+fmt(monthlyPmt)+'</div></div>':'')
      + (type==='interest'?'<div><div style="font-size:10px;color:var(--ink-3);font-weight:600;text-transform:uppercase;letter-spacing:.05em">Monthly Interest</div><div style="font-size:18px;font-weight:800;color:var(--accent)">'+fmt(monthlyPmt)+'</div></div>':'')
      + '<div><div style="font-size:10px;color:var(--ink-3);font-weight:600;text-transform:uppercase;letter-spacing:.05em">Total Interest</div><div style="font-size:18px;font-weight:800;color:var(--gold)">'+fmt(totalInterest)+'</div></div>'
      + '<div><div style="font-size:10px;color:var(--ink-3);font-weight:600;text-transform:uppercase;letter-spacing:.05em">Total Repaid</div><div style="font-size:18px;font-weight:800;color:var(--ink-1)">'+fmt(total)+'</div></div>'
      + '</div>';
    document.getElementById('pn-calc-body').innerHTML = summary;
    return { P, rate, n, r, type, monthlyPmt, totalInterest, total };
  }

  function render() {
    var c = calcSummary();
    var lender  = gv('pn-lender')       || '[Lender Name]';
    var lAddr   = gv('pn-lender-addr')  || '[Lender Address]';
    var borrower= gv('pn-borrower')     || '[Borrower Name]';
    var bAddr   = gv('pn-borrower-addr')|| '[Borrower Address]';
    var date    = gv('pn-date');
    var state   = gv('pn-state')        || '[State]';
    var late    = gv('pn-late')         || '25';
    var matDate = date ? fmtD(addMonths(date, c.n)) : '[Maturity Date]';
    var dateDisp = fmtD(date) || '[Date]';

    var payClause = '';
    if(c.type === 'installment') {
      payClause = 'Borrower shall repay the principal and interest in equal monthly installments of '+fmt(c.monthlyPmt)+', beginning one month from the date hereof, and continuing until the loan is fully repaid on '+matDate+'.';
    } else if(c.type === 'interest') {
      payClause = 'Borrower shall pay interest-only payments of '+fmt(c.monthlyPmt)+' per month, beginning one month from the date hereof. The entire unpaid principal balance of '+fmt(c.P)+' plus any accrued interest shall be due and payable in full on '+matDate+'.';
    } else {
      payClause = 'The entire principal amount of '+fmt(c.P)+', together with all accrued interest, shall be due and payable in a single lump sum on '+matDate+'.';
    }

    document.getElementById('pn-preview').innerHTML =
      '<div class="doc-title">PROMISSORY NOTE</div>'
      + '<div class="doc-subtitle">State of '+state+'</div>'
      + '<div class="doc-clause"><p>FOR VALUE RECEIVED, the undersigned Borrower promises to pay to the order of Lender the principal sum of '+fmt(c.P)+'.</p></div>'
      + '<div class="doc-section"><div class="doc-section-title">Parties</div>'
      + '<p><strong>Lender:</strong> '+field(gv('pn-lender'),lender)+(gv('pn-lender-addr')?' of '+gv('pn-lender-addr'):'')+'</p>'
      + '<p><strong>Borrower:</strong> '+field(gv('pn-borrower'),borrower)+(gv('pn-borrower-addr')?' of '+gv('pn-borrower-addr'):'')+'</p>'
      + '<p><strong>Date:</strong> '+dateDisp+'</p></div>'
      + '<div class="doc-section"><div class="doc-section-title">1. Principal &amp; Interest</div>'
      + '<p>Principal: '+fmt(c.P)+'. Annual Interest Rate: '+c.rate+'% ('+gv('pn-type')==='lump'?'simple':'compound monthly'+'). Total amount repayable: '+fmt(c.total)+'.</p></div>'
      + '<div class="doc-section"><div class="doc-section-title">2. Payment Schedule</div><p>'+payClause+'</p></div>'
      + '<div class="doc-section"><div class="doc-section-title">3. Late Payment</div><p>If any payment is not received within 10 days of its due date, Borrower shall pay a late fee of '+fmt(late)+'. Continued non-payment constitutes default.</p></div>'
      + '<div class="doc-section"><div class="doc-section-title">4. Prepayment</div><p>Borrower may prepay any amount of the outstanding principal at any time without penalty. Any prepayment shall first be applied to accrued interest and then to outstanding principal.</p></div>'
      + '<div class="doc-section"><div class="doc-section-title">5. Governing Law</div><p>This Note shall be governed by the laws of the State of '+state+'.</p></div>'
      + '<div class="doc-sig-row">'
      + '<div class="doc-sig-block"><div style="height:40px"></div><div><strong>Borrower Signature</strong></div><div class="doc-sig-label">'+field(gv('pn-borrower'),borrower)+'</div><div class="doc-sig-label">Date: ________</div></div>'
      + '<div class="doc-sig-block"><div style="height:40px"></div><div><strong>Lender Signature</strong></div><div class="doc-sig-label">'+field(gv('pn-lender'),lender)+'</div><div class="doc-sig-label">Date: ________</div></div>'
      + '</div>';
  }

  document.querySelectorAll('[id^="pn-"]').forEach(function(el){
    el.addEventListener('input', render);
    el.addEventListener('change', render);
  });

  var today = new Date().toISOString().split('T')[0];
  document.getElementById('pn-date').value = today;
  render();
})();
</script>
<script src="/shared/scripts.js?v=1" defer></script>
</body>
</html>`;

fs.writeFileSync(p, html);
console.log('promissory ok', fs.statSync(p).size);
