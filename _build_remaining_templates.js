const fs = require('fs');
const base = 'C:/Users/mastr/claude co/legal-docs/';

const STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
function stateOpts(){return STATES.map(s=>'<option>'+s+'</option>').join('');}
function stateGrid(slug){return STATES.map(s=>'<a href="/'+s.toLowerCase().replace(/\s+/g,'-')+'-'+slug+'" style="display:block;padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-weight:500;color:var(--ink-1);text-decoration:none;transition:border-color .15s,background .15s" onmouseover="this.style.borderColor=\'var(--accent)\';this.style.background=\'var(--surface-2)\'" onmouseout="this.style.borderColor=\'var(--border)\';this.style.background=\'\'">'+s+'</a>').join('');}

function header(title,desc,canon){
return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="https://www.freedoctemplates.xyz/${canon}">
<meta property="og:title" content="${title}"><meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap">
<link rel="stylesheet" href="/shared/styles.css?v=1">
</head>
<body>
<header class="site-header"><div class="header-inner"><a href="/" class="site-logo">FreeDoc<span>Templates</span></a><nav class="main-nav" aria-label="Main"><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Business <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/invoice-template" class="nav-item">Invoice Template</a><a href="/nda-template" class="nav-item">NDA Template</a><a href="/independent-contractor-agreement-template" class="nav-item">Contractor Agreement</a></div></div><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Personal <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/power-of-attorney-template" class="nav-item">Power of Attorney</a><a href="/last-will-testament-template" class="nav-item">Last Will &amp; Testament</a><a href="/lease-agreement-template" class="nav-item">Lease Agreement</a></div></div></nav><div class="header-actions"><a href="/tools" class="btn-all-tools">All Templates</a></div></div></header>`;
}
function footer(){return `<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p><p class="footer-disclaimer" style="margin-top:8px">Not a law firm. For informational use only.</p></div><div><div class="footer-col-title">Business</div><nav class="footer-nav"><a href="/invoice-template">Invoice</a><a href="/nda-template">NDA</a><a href="/independent-contractor-agreement-template">Contractor</a></nav></div><div><div class="footer-col-title">Personal</div><nav class="footer-nav"><a href="/last-will-testament-template">Last Will</a><a href="/power-of-attorney-template">Power of Attorney</a><a href="/lease-agreement-template">Lease Agreement</a></nav></div></div><div class="footer-bottom"><p>© 2026 FreeDocTemplates.xyz</p></div></div></footer><script src="/shared/scripts.js?v=1" defer></script>`;}

// ─────────────────────────────────────────────────────────────────────────────
// 1. PERSONAL LOAN AGREEMENT
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(base+'personal-loan-agreement-template.html', header(
  'Free Personal Loan Agreement Template 2026 | Fill In & Download PDF',
  'Free personal loan agreement template 2026. Document loans between individuals with or without interest. Auto-calculates payments. Fill in, preview, download PDF.',
  'personal-loan-agreement-template'
)+`
<main class="page-wrap">
<div class="container">
<nav class="breadcrumb"><a href="/">Home</a><span>›</span><a href="/tools">Templates</a><span>›</span><span>Personal Loan Agreement</span></nav>
<h1 class="page-title" data-enter>Free Personal Loan Agreement Template</h1>
<p class="page-sub" data-enter data-delay="1">Document a personal loan between friends, family, or business partners. Fixed or installment payments. Free, no sign-up.</p>
<div class="page-badges" data-enter data-delay="2"><span class="page-badge">✓ Free, no account</span><span class="page-badge">✓ Interest calculator</span><span class="page-badge">✓ All 50 states</span><span class="page-badge">✓ PDF download</span></div>
</div>
<div class="container doc-layout">
<div class="doc-form-panel">
  <div class="form-section"><div class="form-section-title">Lender</div>
    <div class="form-row"><label class="form-label">Lender Full Name</label><input class="form-input" id="pl-lender" placeholder="Robert James Smith" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Lender Address</label><input class="form-input" id="pl-lender-addr" placeholder="100 Oak St, Chicago, IL 60601" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Borrower</div>
    <div class="form-row"><label class="form-label">Borrower Full Name</label><input class="form-input" id="pl-borrower" placeholder="Maria Elena Garcia" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Borrower Address</label><input class="form-input" id="pl-borrower-addr" placeholder="200 Elm Ave, Chicago, IL 60602" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Loan Terms</div>
    <div class="form-row two-col"><div><label class="form-label">Loan Amount ($)</label><input class="form-input" id="pl-amount" type="number" placeholder="5000" oninput="render()"></div><div><label class="form-label">Annual Interest Rate (%)</label><input class="form-input" id="pl-rate" type="number" placeholder="0" step="0.1" oninput="render()"></div></div>
    <div class="form-row"><label class="form-label">Repayment Type</label><select class="form-input" id="pl-repay-type" onchange="render()"><option value="lump">Lump Sum (one payment)</option><option value="installment" selected>Monthly Installments</option></select></div>
    <div class="form-row" id="pl-months-row"><label class="form-label">Loan Term (months)</label><input class="form-input" id="pl-months" type="number" placeholder="12" oninput="render()"></div>
    <div class="form-row two-col"><div><label class="form-label">First Payment Date</label><input class="form-input" id="pl-first-payment" type="date" oninput="render()"></div><div><label class="form-label">State</label><select class="form-input" id="pl-state" onchange="render()"><option value="">— Select —</option>${stateOpts()}</select></div></div>
    <div class="form-row"><label class="form-label">Late Fee ($)</label><input class="form-input" id="pl-late-fee" type="number" placeholder="25" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Date</div>
    <div class="form-row"><label class="form-label">Agreement Date</label><input class="form-input" id="pl-date" type="date" oninput="render()"></div>
  </div>
  <div class="form-section">
    <button class="doc-btn doc-btn--gold" type="button" onclick="window.print()" style="width:100%">Download / Print PDF</button>
  </div>
</div>
<div class="doc-preview-panel">
  <div class="doc-preview-header"><span>Live Preview</span><span style="font-size:11px;color:var(--ink-3)">Updates as you type</span></div>
  <div class="legal-document" id="pl-preview"><div class="doc-title">PERSONAL LOAN AGREEMENT</div><div class="doc-subtitle">Fill in the form to see your document</div></div>
</div>
</div>
<div class="container" style="margin-top:56px">
<section style="margin-top:0">
<p class="section-eyebrow">State-Specific</p>
<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Personal Loan Agreement by State</h2>
<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Usury (maximum interest rate) laws vary by state. Select your state for specific limits.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">${stateGrid('personal-loan-agreement-template')}</div>
</section>
</div>
</main>
${footer()}
<script>
function gv(id){return(document.getElementById(id)||{}).value||'';}
function fld(v,ph){return v?'<span class="doc-field">'+v+'</span>':'<span class="doc-field empty">'+ph+'</span>';}
document.getElementById('pl-repay-type').addEventListener('change',function(){
  document.getElementById('pl-months-row').style.display=this.value==='installment'?'block':'none'; render();
});
function pmt(r,n,pv){if(r===0)return pv/n; return pv*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);}
function render(){
  var lender=gv('pl-lender'),lAddr=gv('pl-lender-addr');
  var borrower=gv('pl-borrower'),bAddr=gv('pl-borrower-addr');
  var amount=parseFloat(gv('pl-amount'))||0;
  var rate=parseFloat(gv('pl-rate'))||0;
  var months=parseInt(gv('pl-months'))||0;
  var repayType=gv('pl-repay-type');
  var firstPayment=gv('pl-first-payment'),state=gv('pl-state');
  var lateFee=gv('pl-late-fee')||'25';
  var dateStr=gv('pl-date');
  var monthly=0;
  if(repayType==='installment'&&months>0&&amount>0){monthly=pmt(rate/100/12,months,amount);}
  var out='<div class="doc-title">PERSONAL LOAN AGREEMENT</div>';
  out+='<p class="doc-clause">This Personal Loan Agreement ("Agreement") is entered into on '+fld(dateStr,'[Date]')
      +' by and between '+fld(lender,'[Lender Name]')+', residing at '+fld(lAddr,'[Lender Address]')
      +' ("Lender"), and '+fld(borrower,'[Borrower Name]')+', residing at '+fld(bAddr,'[Borrower Address]')+' ("Borrower").</p>';
  out+='<p class="doc-clause"><span class="doc-label">1. LOAN AMOUNT</span><br>Lender agrees to lend Borrower the principal sum of <strong>$'+(amount?amount.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}):fld('','[Amount]'))+'</strong> ("Principal"), to be disbursed upon signing of this Agreement.</p>';
  out+='<p class="doc-clause"><span class="doc-label">2. INTEREST RATE</span><br>'+(rate===0?'This is an interest-free (0%) loan. No interest shall accrue on the outstanding principal.':'This loan shall bear interest at an annual rate of <strong>'+rate+'%</strong> ('+(rate/12).toFixed(3)+'% per month), computed on a 30/360 basis.')+'</p>';
  if(repayType==='lump'){
    out+='<p class="doc-clause"><span class="doc-label">3. REPAYMENT</span><br>The entire principal'+(rate>0?' plus accrued interest':'')+' shall be repaid in a single lump-sum payment due on '+fld(firstPayment,'[Due Date]')+'.</p>';
  } else {
    out+='<p class="doc-clause"><span class="doc-label">3. REPAYMENT</span><br>Borrower shall repay this loan in <strong>'+fld(months.toString(),'[N]')+' monthly installments</strong>'+(monthly>0?' of approximately <strong>$'+monthly.toFixed(2)+'</strong> each':'')+', beginning on '+fld(firstPayment,'[First Payment Date]')+'. Each payment shall be applied first to accrued interest, then to principal.</p>';
  }
  out+='<p class="doc-clause"><span class="doc-label">4. LATE PAYMENT</span><br>Payments received more than 5 days after the due date shall incur a late fee of <strong>$'+lateFee+'</strong>.</p>';
  out+='<p class="doc-clause"><span class="doc-label">5. PREPAYMENT</span><br>Borrower may prepay any amount of the outstanding principal at any time without penalty.</p>';
  out+='<p class="doc-clause"><span class="doc-label">6. DEFAULT</span><br>If Borrower fails to make any payment within 15 days of its due date, or fails to comply with any term of this Agreement, the entire unpaid principal and accrued interest shall become immediately due and payable at Lender\'s election.</p>';
  out+='<p class="doc-clause"><span class="doc-label">7. GOVERNING LAW</span><br>This Agreement shall be governed by the laws of the State of '+fld(state,'[State]')+'.</p>';
  out+='<div class="doc-sig-block"><table class="doc-sig-table"><tbody>'
      +'<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">Lender — '+fld(lender,'[Lender Name]')+'</span></td><td><div class="doc-sig-line"></div><span class="doc-sig-label">Date</span></td></tr>'
      +'<tr style="height:24px"><td></td></tr>'
      +'<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">Borrower — '+fld(borrower,'[Borrower Name]')+'</span></td><td><div class="doc-sig-line"></div><span class="doc-sig-label">Date</span></td></tr>'
      +'</tbody></table></div>';
  document.getElementById('pl-preview').innerHTML=out;
}
render();
</script>
</body></html>`);
console.log('personal-loan ok');

// ─────────────────────────────────────────────────────────────────────────────
// 2. NON-COMPETE AGREEMENT
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(base+'non-compete-agreement-template.html', header(
  'Free Non-Compete Agreement Template 2026 | Fill In & Download PDF',
  'Free non-compete agreement template 2026. Restrict employees or contractors from competing. Customize restriction period, territory, and scope. Download PDF.',
  'non-compete-agreement-template'
)+`
<main class="page-wrap">
<div class="container">
<nav class="breadcrumb"><a href="/">Home</a><span>›</span><a href="/tools">Templates</a><span>›</span><span>Non-Compete Agreement</span></nav>
<h1 class="page-title" data-enter>Free Non-Compete Agreement Template</h1>
<p class="page-sub" data-enter data-delay="1">Protect your business from competition. Customize restriction period, geographic scope, and activities. All states — note: California, Minnesota, Oklahoma, and North Dakota ban non-competes.</p>
<div class="page-badges" data-enter data-delay="2"><span class="page-badge">✓ Free, no account</span><span class="page-badge">✓ All states</span><span class="page-badge">✓ State enforcement notes</span><span class="page-badge">✓ PDF download</span></div>
</div>
<div class="container doc-layout">
<div class="doc-form-panel">
  <div class="form-section"><div class="form-section-title">Parties</div>
    <div class="form-row"><label class="form-label">Company / Employer Name</label><input class="form-input" id="nc-company" placeholder="Acme Corp LLC" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Employee / Contractor Name</label><input class="form-input" id="nc-employee" placeholder="John Smith" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Employee's Role / Title</label><input class="form-input" id="nc-title" placeholder="Senior Software Engineer" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Restriction Terms</div>
    <div class="form-row"><label class="form-label">Restriction Period</label><select class="form-input" id="nc-period" onchange="render()"><option value="6 months">6 Months</option><option value="1 year" selected>1 Year</option><option value="18 months">18 Months</option><option value="2 years">2 Years</option></select></div>
    <div class="form-row"><label class="form-label">Geographic Scope</label><input class="form-input" id="nc-geo" placeholder="within 50 miles of Dallas, Texas" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Restricted Activities / Industry</label><textarea class="form-input" id="nc-activities" rows="3" placeholder="providing software development services to any competitor in the SaaS CRM industry" oninput="render()"></textarea></div>
    <div class="form-row"><label class="form-label">Consideration (what employee receives)</label><input class="form-input" id="nc-consideration" placeholder="employment, continued employment, or a signing bonus of $[amount]" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Date &amp; State</div>
    <div class="form-row two-col"><div><label class="form-label">Effective Date</label><input class="form-input" id="nc-date" type="date" oninput="render()"></div><div><label class="form-label">Governing State</label><select class="form-input" id="nc-state" onchange="render()"><option value="">— Select —</option>${stateOpts()}</select></div></div>
  </div>
  <div class="form-section"><button class="doc-btn doc-btn--gold" type="button" onclick="window.print()" style="width:100%">Download / Print PDF</button></div>
</div>
<div class="doc-preview-panel">
  <div class="doc-preview-header"><span>Live Preview</span><span style="font-size:11px;color:var(--ink-3)">Updates as you type</span></div>
  <div class="legal-document" id="nc-preview"><div class="doc-title">NON-COMPETE AGREEMENT</div><div class="doc-subtitle">Fill in the form to see your document</div></div>
</div>
</div>
<div class="container" style="margin-top:56px">
<section><p class="section-eyebrow">State-Specific</p>
<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Non-Compete Agreement by State</h2>
<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Enforceability varies dramatically by state. CA, MN, ND, and OK ban most non-competes entirely.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">${stateGrid('non-compete-agreement-template')}</div>
</section>
</div>
</main>
${footer()}
<script>
function gv(id){return(document.getElementById(id)||{}).value||'';}
function fld(v,ph){return v?'<span class="doc-field">'+v+'</span>':'<span class="doc-field empty">'+ph+'</span>';}
var BAN_STATES=['California','Minnesota','North Dakota','Oklahoma'];
function render(){
  var company=gv('nc-company'),employee=gv('nc-employee'),title=gv('nc-title');
  var period=gv('nc-period'),geo=gv('nc-geo'),activities=gv('nc-activities');
  var consideration=gv('nc-consideration'),dateStr=gv('nc-date'),state=gv('nc-state');
  var out='<div class="doc-title">NON-COMPETE AGREEMENT</div>';
  if(state&&BAN_STATES.includes(state)){
    out+='<div style="background:#fef3cd;border:1px solid #ffc107;border-radius:6px;padding:12px;margin-bottom:16px;font-size:11pt"><strong>⚠ Note:</strong> '+state+' broadly prohibits or severely restricts non-compete agreements. This agreement may not be enforceable in '+state+'. Consult a '+state+' employment attorney before relying on this document.</div>';
  }
  out+='<p class="doc-clause">This Non-Compete Agreement ("Agreement") is entered into as of '+fld(dateStr,'[Date]')
      +' between '+fld(company,'[Company Name]')+' ("Company") and '+fld(employee,'[Employee Name]')
      +', '+fld(title,'[Title]')+' ("Employee").</p>';
  out+='<p class="doc-clause"><span class="doc-label">1. CONSIDERATION</span><br>In consideration of '+fld(consideration,'[consideration provided]')+', the parties agree as follows.</p>';
  out+='<p class="doc-clause"><span class="doc-label">2. RESTRICTIVE COVENANT</span><br>During employment and for a period of <strong>'+fld(period,'[Period]')+'</strong> following the termination of employment for any reason, Employee agrees not to, directly or indirectly, engage in '+fld(activities,'[restricted activities]')+', '+fld(geo,'[geographic scope]')+'.</p>';
  out+='<p class="doc-clause"><span class="doc-label">3. NON-SOLICITATION</span><br>During the restriction period, Employee shall not solicit any customers, clients, or employees of Company that Employee had material contact with during the last 12 months of employment.</p>';
  out+='<p class="doc-clause"><span class="doc-label">4. CONFIDENTIALITY</span><br>Employee acknowledges that during employment, Employee has or will have access to confidential and proprietary information of Company. Employee agrees to maintain strict confidentiality of such information indefinitely.</p>';
  out+='<p class="doc-clause"><span class="doc-label">5. REASONABLENESS</span><br>Employee acknowledges that the time, geographic, and scope limitations set forth herein are reasonable and necessary to protect the legitimate business interests of Company.</p>';
  out+='<p class="doc-clause"><span class="doc-label">6. INJUNCTIVE RELIEF</span><br>Employee agrees that a breach of this Agreement would cause irreparable harm to Company for which monetary damages would be inadequate, and that Company shall be entitled to seek injunctive relief to enforce this Agreement.</p>';
  out+='<p class="doc-clause"><span class="doc-label">7. GOVERNING LAW</span><br>This Agreement shall be governed by the laws of the State of '+fld(state,'[State]')+'.</p>';
  out+='<div class="doc-sig-block"><table class="doc-sig-table"><tbody>'
      +'<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">Company Representative</span></td><td><div class="doc-sig-line"></div><span class="doc-sig-label">Date</span></td></tr>'
      +'<tr style="height:20px"><td></td></tr>'
      +'<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">Employee — '+fld(employee,'[Employee Name]')+'</span></td><td><div class="doc-sig-line"></div><span class="doc-sig-label">Date</span></td></tr>'
      +'</tbody></table></div>';
  document.getElementById('nc-preview').innerHTML=out;
}
render();
</script>
</body></html>`);
console.log('non-compete ok');

// ─────────────────────────────────────────────────────────────────────────────
// 3. DEMAND LETTER
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(base+'demand-letter-template.html', header(
  'Free Demand Letter Template 2026 | Fill In & Download PDF',
  'Free demand letter template 2026. Demand payment, property return, or action. Professional legal tone. Fill in, preview live, download PDF instantly.',
  'demand-letter-template'
)+`
<main class="page-wrap">
<div class="container">
<nav class="breadcrumb"><a href="/">Home</a><span>›</span><a href="/tools">Templates</a><span>›</span><span>Demand Letter</span></nav>
<h1 class="page-title" data-enter>Free Demand Letter Template</h1>
<p class="page-sub" data-enter data-delay="1">Formal demand for payment, return of property, or corrective action. Used before filing a lawsuit or small claims court.</p>
<div class="page-badges" data-enter data-delay="2"><span class="page-badge">✓ Free, no account</span><span class="page-badge">✓ Multiple demand types</span><span class="page-badge">✓ Professional tone</span><span class="page-badge">✓ PDF download</span></div>
</div>
<div class="container doc-layout">
<div class="doc-form-panel">
  <div class="form-section"><div class="form-section-title">Demand Type</div>
    <div class="form-row"><label class="form-label">Type of Demand</label><select class="form-input" id="dl-type" onchange="render()"><option value="payment">Payment of Money Owed</option><option value="property">Return of Property</option><option value="contract">Breach of Contract</option><option value="injury">Personal Injury / Property Damage</option><option value="other">Other / Custom</option></select></div>
  </div>
  <div class="form-section"><div class="form-section-title">Sender (You)</div>
    <div class="form-row"><label class="form-label">Your Full Name / Company</label><input class="form-input" id="dl-sender" placeholder="Jane Smith" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Your Address</label><input class="form-input" id="dl-sender-addr" placeholder="100 Main St, Atlanta, GA 30301" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Your Phone / Email</label><input class="form-input" id="dl-sender-contact" placeholder="(404) 555-1234 / jane@email.com" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Recipient</div>
    <div class="form-row"><label class="form-label">Recipient Full Name / Company</label><input class="form-input" id="dl-recipient" placeholder="Robert Jones" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Recipient Address</label><input class="form-input" id="dl-recipient-addr" placeholder="200 Elm Ave, Atlanta, GA 30302" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Demand Details</div>
    <div class="form-row" id="dl-amount-row"><label class="form-label">Amount Demanded ($)</label><input class="form-input" id="dl-amount" placeholder="3,500.00" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Background / Facts</label><textarea class="form-input" id="dl-facts" rows="4" placeholder="On March 15, 2026, we entered into an agreement for... Despite my repeated requests, you have failed to..." oninput="render()"></textarea></div>
    <div class="form-row"><label class="form-label">Specific Action Demanded</label><textarea class="form-input" id="dl-action" rows="2" placeholder="Pay $3,500 representing unpaid invoices #1001 and #1002" oninput="render()"></textarea></div>
    <div class="form-row"><label class="form-label">Response Deadline (days)</label><select class="form-input" id="dl-deadline" onchange="render()"><option value="7">7 days</option><option value="10">10 days</option><option value="14" selected>14 days</option><option value="30">30 days</option></select></div>
  </div>
  <div class="form-section"><div class="form-section-title">Date</div>
    <div class="form-row"><label class="form-label">Letter Date</label><input class="form-input" id="dl-date" type="date" oninput="render()"></div>
  </div>
  <div class="form-section"><button class="doc-btn doc-btn--gold" type="button" onclick="window.print()" style="width:100%">Download / Print PDF</button></div>
</div>
<div class="doc-preview-panel">
  <div class="doc-preview-header"><span>Live Preview</span><span style="font-size:11px;color:var(--ink-3)">Updates as you type</span></div>
  <div class="legal-document" id="dl-preview"><div class="doc-title">DEMAND LETTER</div><div class="doc-subtitle">Fill in the form to see your letter</div></div>
</div>
</div>
<div class="container" style="margin-top:56px">
<section class="faq-section" style="margin:0 -24px;padding:48px 24px">
<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:24px">Demand letter questions</h2></div>
<div class="faq-list">
<details class="faq-item"><summary class="faq-q">What is the purpose of a demand letter?</summary><div class="faq-a">A demand letter is a formal written notice requesting that someone pay money, return property, or take a specific action. It creates a paper trail proving you attempted to resolve the matter before filing a lawsuit. Many small claims courts require proof that a demand was made before filing. It often prompts voluntary resolution without litigation.</div></details>
<details class="faq-item"><summary class="faq-q">How should I send a demand letter?</summary><div class="faq-a">Send via: (1) certified mail with return receipt — this creates legal proof of delivery, (2) email with read receipt as a backup, (3) hand delivery with a signed acknowledgment. Keep copies of everything. If the letter leads to litigation, you'll need to prove the recipient received it.</div></details>
<details class="faq-item"><summary class="faq-q">What happens if they ignore my demand letter?</summary><div class="faq-a">If the deadline passes without compliance, your next steps are: small claims court (for amounts typically under $5,000–$10,000 depending on state), filing a civil lawsuit, or reporting to a collection agency. The demand letter becomes evidence in any subsequent proceeding. For larger amounts, consult an attorney about your litigation options.</div></details>
</div>
</section>
<section class="related-section">
<p class="section-eyebrow">Related</p>
<h2 class="section-title" style="font-size:22px;margin-bottom:16px">You might also need</h2>
<div class="tools-grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">
<a href="/cease-and-desist-letter-template" class="tool-card"><div class="tc-icon tc-blue"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div><div><div class="tool-card-title">Cease &amp; Desist Letter</div><div class="tool-card-desc">Stop trademark, defamation, or harassment.</div></div></a>
<a href="/promissory-note-template" class="tool-card"><div class="tc-icon tc-gold"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div><div class="tool-card-title">Promissory Note</div><div class="tool-card-desc">Document the original debt in writing.</div></div></a>
</div>
</section>
</div>
</main>
${footer()}
<script>
function gv(id){return(document.getElementById(id)||{}).value||'';}
function fld(v,ph){return v?'<span class="doc-field">'+v+'</span>':'<span class="doc-field empty">'+ph+'</span>';}
function render(){
  var type=gv('dl-type'),sender=gv('dl-sender'),sAddr=gv('dl-sender-addr'),sContact=gv('dl-sender-contact');
  var recipient=gv('dl-recipient'),rAddr=gv('dl-recipient-addr');
  var amount=gv('dl-amount'),facts=gv('dl-facts'),action=gv('dl-action'),deadline=gv('dl-deadline');
  var dateStr=gv('dl-date');
  var out='<p style="text-align:right">'+fld(dateStr,'[Date]')+'</p>';
  out+='<p>'+fld(sender,'[Your Name]')+'<br>'+fld(sAddr,'[Your Address]')+(sContact?'<br>'+sContact:'')+'</p>';
  out+='<p style="margin-top:12px">'+fld(recipient,'[Recipient Name]')+'<br>'+fld(rAddr,'[Recipient Address]')+'</p>';
  out+='<p style="margin-top:12px"><strong>Re: Formal Demand for '+(type==='payment'?'Payment':(type==='property'?'Return of Property':(type==='contract'?'Remedy of Breach of Contract':(type==='injury'?'Compensation for Damages':'Action'))))+'</strong></p>';
  out+='<p class="doc-clause">Dear '+fld(recipient,'[Recipient Name]')+',</p>';
  out+='<p class="doc-clause">I am writing to formally demand '+(action?fld(action,'[action]'):'that you take the action described below')+'. This letter constitutes a formal legal notice and demand.</p>';
  if(facts){out+='<p class="doc-clause"><span class="doc-label">BACKGROUND</span><br>'+facts.replace(/\n/g,'<br>')+'</p>';}
  out+='<p class="doc-clause"><span class="doc-label">DEMAND</span><br>You are hereby formally demanded to '
      +fld(action,'[describe required action]')
      +(amount?', in the amount of <strong>$'+amount+'</strong>':'')
      +' within <strong>'+fld(deadline,'[N]')+' days</strong> of the date of this letter.</p>';
  out+='<p class="doc-clause">If you fail to comply with this demand within the specified time period, I will be left with no choice but to pursue all available legal remedies, which may include filing a lawsuit in the appropriate court, seeking compensatory and other damages, attorney\'s fees, and court costs as permitted by law.</p>';
  out+='<p class="doc-clause">I strongly urge you to address this matter promptly to avoid the costs and inconvenience of litigation. This letter is written without prejudice to any and all rights and remedies available to me, none of which are waived.</p>';
  out+='<p style="margin-top:24px">Sincerely,</p>';
  out+='<div class="doc-sig-block"><div class="doc-sig-line" style="width:200px"></div>'
      +'<p>'+fld(sender,'[Your Name]')+'</p></div>';
  document.getElementById('dl-preview').innerHTML=out;
}
render();
</script>
</body></html>`);
console.log('demand-letter ok');

// ─────────────────────────────────────────────────────────────────────────────
// 4. ROOMMATE AGREEMENT
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(base+'roommate-agreement-template.html', header(
  'Free Roommate Agreement Template 2026 | Fill In & Download PDF',
  'Free roommate agreement template 2026. Split rent, utilities, and responsibilities. Add up to 6 roommates. Fill in, preview live, download PDF. No sign-up.',
  'roommate-agreement-template'
)+`
<main class="page-wrap">
<div class="container">
<nav class="breadcrumb"><a href="/">Home</a><span>›</span><a href="/tools">Templates</a><span>›</span><span>Roommate Agreement</span></nav>
<h1 class="page-title" data-enter>Free Roommate Agreement Template</h1>
<p class="page-sub" data-enter data-delay="1">Document rent splits, utility shares, house rules, and shared responsibilities. Protect all roommates with a written agreement.</p>
<div class="page-badges" data-enter data-delay="2"><span class="page-badge">✓ Free, no account</span><span class="page-badge">✓ Up to 6 roommates</span><span class="page-badge">✓ Auto rent split</span><span class="page-badge">✓ PDF download</span></div>
</div>
<div class="container doc-layout">
<div class="doc-form-panel">
  <div class="form-section"><div class="form-section-title">Property</div>
    <div class="form-row"><label class="form-label">Property Address</label><input class="form-input" id="rm-address" placeholder="123 College Ave, Apt 4, Austin, TX 78701" oninput="render()"></div>
    <div class="form-row two-col"><div><label class="form-label">Lease Start Date</label><input class="form-input" id="rm-start" type="date" oninput="render()"></div><div><label class="form-label">Lease End Date</label><input class="form-input" id="rm-end" type="date" oninput="render()"></div></div>
    <div class="form-row"><label class="form-label">Total Monthly Rent ($)</label><input class="form-input" id="rm-total-rent" type="number" placeholder="3000" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Roommates &amp; Rent Shares</div>
    <div id="rm-roommates"></div>
    <button class="doc-btn doc-btn--ghost" type="button" onclick="addRoommate()" style="width:100%;margin-top:8px">+ Add Roommate</button>
  </div>
  <div class="form-section"><div class="form-section-title">Utilities</div>
    <div class="form-row"><label class="form-label">Electricity Bill — Paid By</label><select class="form-input" id="rm-elec" onchange="render()"><option value="split-equal">Split equally</option><option value="one-person">One person (rotating)</option><option value="included">Included in rent</option></select></div>
    <div class="form-row"><label class="form-label">Internet Bill — Paid By</label><select class="form-input" id="rm-internet" onchange="render()"><option value="split-equal">Split equally</option><option value="one-person">One person (rotating)</option><option value="included">Included in rent</option></select></div>
  </div>
  <div class="form-section"><div class="form-section-title">House Rules</div>
    <div class="form-row"><label class="form-label">Quiet Hours</label><input class="form-input" id="rm-quiet" placeholder="10:00 PM – 8:00 AM on weekdays, 12:00 AM – 9:00 AM weekends" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Guest Policy</label><input class="form-input" id="rm-guests" placeholder="Overnight guests max 3 consecutive nights without roommate consent" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Pets</label><select class="form-input" id="rm-pets" onchange="render()"><option value="not allowed">Not allowed</option><option value="allowed with approval">Allowed with all roommates' written approval</option><option value="allowed">Allowed</option></select></div>
    <div class="form-row"><label class="form-label">Smoking</label><select class="form-input" id="rm-smoking" onchange="render()"><option value="not allowed indoors">Not allowed indoors</option><option value="not allowed on property">Not allowed on property</option><option value="allowed outdoors only">Allowed outdoors only</option></select></div>
    <div class="form-row"><label class="form-label">Move-Out Notice Required</label><select class="form-input" id="rm-notice" onchange="render()"><option value="30 days">30 days</option><option value="60 days">60 days</option></select></div>
  </div>
  <div class="form-section"><div class="form-section-title">Date</div>
    <div class="form-row"><label class="form-label">Agreement Date</label><input class="form-input" id="rm-date" type="date" oninput="render()"></div>
  </div>
  <div class="form-section"><button class="doc-btn doc-btn--gold" type="button" onclick="window.print()" style="width:100%">Download / Print PDF</button></div>
</div>
<div class="doc-preview-panel">
  <div class="doc-preview-header"><span>Live Preview</span><span style="font-size:11px;color:var(--ink-3)">Updates as you type</span></div>
  <div class="legal-document" id="rm-preview"><div class="doc-title">ROOMMATE AGREEMENT</div><div class="doc-subtitle">Fill in the form to see your agreement</div></div>
</div>
</div>
<div class="container" style="margin-top:48px">
<section class="related-section">
<p class="section-eyebrow">Related</p>
<h2 class="section-title" style="font-size:22px;margin-bottom:16px">You might also need</h2>
<div class="tools-grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">
<a href="/lease-agreement-template" class="tool-card"><div class="tc-icon tc-blue"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div><div class="tool-card-title">Lease Agreement</div><div class="tool-card-desc">Full landlord-tenant lease agreement.</div></div></a>
<a href="/eviction-notice-template" class="tool-card"><div class="tc-icon tc-gold"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 3H6a2 2 0 00-2 2v14c0 1.1.9 2 2 2h12a2 2 0 002-2V9l-6-6z"/></svg></div><div><div class="tool-card-title">Eviction Notice</div><div class="tool-card-desc">Formal notice to remove a tenant or roommate.</div></div></a>
</div>
</section>
</div>
</main>
${footer()}
<script>
function gv(id){return(document.getElementById(id)||{}).value||'';}
function fld(v,ph){return v?'<span class="doc-field">'+v+'</span>':'<span class="doc-field empty">'+ph+'</span>';}
var rmCount=0;
function addRoommate(){
  rmCount++;
  var d=document.createElement('div');d.className='form-row';d.id='rm-row-'+rmCount;
  d.innerHTML='<div style="display:grid;grid-template-columns:1fr 100px 28px;gap:6px;align-items:end">'
    +'<div><label class="form-label">Name</label><input class="form-input" id="rm-name-'+rmCount+'" placeholder="Alex Johnson" oninput="render()"></div>'
    +'<div><label class="form-label">Rent Share ($)</label><input class="form-input" id="rm-rent-'+rmCount+'" type="number" placeholder="1000" oninput="render()"></div>'
    +'<button type="button" onclick="document.getElementById(\'rm-row-'+rmCount+'\').remove();render()" style="background:none;border:none;color:var(--ink-3);cursor:pointer;font-size:18px;padding:0;margin-bottom:4px">×</button>'
    +'</div>';
  document.getElementById('rm-roommates').appendChild(d);render();
}
addRoommate();addRoommate();
function render(){
  var addr=gv('rm-address'),start=gv('rm-start'),end=gv('rm-end'),totalRent=gv('rm-total-rent');
  var elec=gv('rm-elec'),internet=gv('rm-internet');
  var quiet=gv('rm-quiet'),guests=gv('rm-guests'),pets=gv('rm-pets'),smoking=gv('rm-smoking'),notice=gv('rm-notice');
  var dateStr=gv('rm-date');
  var roommates=[];
  document.querySelectorAll('[id^="rm-name-"]').forEach(function(el){
    var i=el.id.split('-').pop();
    var n=el.value,r=(document.getElementById('rm-rent-'+i)||{}).value||'';
    if(n){roommates.push({name:n,rent:r});}
  });
  var totalSplit=roommates.reduce(function(s,r){return s+(parseFloat(r.rent)||0);},0);
  var out='<div class="doc-title">ROOMMATE AGREEMENT</div>';
  out+='<p class="doc-clause">This Roommate Agreement ("Agreement") is entered into on '+fld(dateStr,'[Date]')
      +' for the property located at '+fld(addr,'[Property Address]')
      +(start&&end?' for the lease term '+start+' through '+end:'')+'.</p>';
  out+='<p class="doc-clause"><span class="doc-label">PARTIES</span><br>This agreement is entered into between the following roommates (collectively "Roommates"):<br>';
  if(roommates.length>0){roommates.forEach(function(r){out+=fld(r.name,'[Name]')+'<br>';});}
  else{out+=fld('','[Roommate 1]')+'<br>'+fld('','[Roommate 2]')+'<br>';}
  out+='</p>';
  out+='<p class="doc-clause"><span class="doc-label">RENT</span><br>';
  if(totalRent){out+='Total monthly rent: <strong>$'+parseFloat(totalRent).toLocaleString()+'</strong>. Each roommate\'s share:<br>';}
  if(roommates.length>0){
    out+='<table class="doc-table"><tbody>';
    roommates.forEach(function(r){out+='<tr><td>'+fld(r.name,'[Name]')+'</td><td><strong>$'+(r.rent||'—')+'</strong> / month</td></tr>';});
    if(totalRent&&Math.round(totalSplit)!==Math.round(parseFloat(totalRent))){
      out+='<tr><td colspan="2" style="color:#c0392b;font-size:10pt">⚠ Shares total $'+totalSplit.toFixed(2)+' — does not match total rent $'+parseFloat(totalRent).toLocaleString()+'</td></tr>';
    }
    out+='</tbody></table>';
  }
  out+='</p>';
  out+='<p class="doc-clause"><span class="doc-label">UTILITIES</span><br>Electricity: '+fld(elec,'[arrangement]')+'.<br>Internet: '+fld(internet,'[arrangement]')+'.<br>All other utilities not listed shall be split equally.</p>';
  out+='<p class="doc-clause"><span class="doc-label">HOUSE RULES</span><br>'
      +(quiet?'Quiet hours: '+quiet+'<br>':'')
      +(guests?'Guests: '+guests+'<br>':'')
      +'Pets: '+fld(pets,'[policy]')+'<br>'
      +'Smoking: '+fld(smoking,'[policy]')+'.</p>';
  out+='<p class="doc-clause"><span class="doc-label">MOVE-OUT NOTICE</span><br>Any Roommate wishing to move out must provide <strong>'+fld(notice,'[N days]')+'</strong> written notice to all other Roommates.</p>';
  out+='<p class="doc-clause"><span class="doc-label">MODIFICATIONS</span><br>This Agreement may be modified only by written consent of all Roommates.</p>';
  if(roommates.length>0){
    out+='<div class="doc-sig-block"><table class="doc-sig-table"><tbody>';
    roommates.forEach(function(r){
      out+='<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">'+fld(r.name,'[Roommate]')+'</span></td><td><div class="doc-sig-line"></div><span class="doc-sig-label">Date</span></td></tr><tr style="height:16px"><td></td></tr>';
    });
    out+='</tbody></table></div>';
  }
  document.getElementById('rm-preview').innerHTML=out;
}
render();
</script>
</body></html>`);
console.log('roommate ok');

// ─────────────────────────────────────────────────────────────────────────────
// 5. AFFIDAVIT
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(base+'affidavit-template.html', header(
  'Free Affidavit Template 2026 | General, Financial & Heirship | Fill & Download',
  'Free affidavit template 2026. General affidavit, affidavit of heirship, financial affidavit. Fill in facts, preview live, download PDF with notary block.',
  'affidavit-template'
)+`
<main class="page-wrap">
<div class="container">
<nav class="breadcrumb"><a href="/">Home</a><span>›</span><a href="/tools">Templates</a><span>›</span><span>Affidavit</span></nav>
<h1 class="page-title" data-enter>Free Affidavit Template</h1>
<p class="page-sub" data-enter data-delay="1">A sworn statement of facts under oath. General, heirship, and financial affidavit types. Notary block included.</p>
<div class="page-badges" data-enter data-delay="2"><span class="page-badge">✓ Free, no account</span><span class="page-badge">✓ 3 affidavit types</span><span class="page-badge">✓ Notary block</span><span class="page-badge">✓ PDF download</span></div>
</div>
<div class="container doc-layout">
<div class="doc-form-panel">
  <div class="form-section"><div class="form-section-title">Affidavit Type</div>
    <div class="form-row"><select class="form-input" id="af-type" onchange="render()"><option value="general">General Affidavit</option><option value="heirship">Affidavit of Heirship</option><option value="financial">Financial Affidavit</option></select></div>
  </div>
  <div class="form-section"><div class="form-section-title">Affiant (Person Making Sworn Statement)</div>
    <div class="form-row"><label class="form-label">Full Legal Name</label><input class="form-input" id="af-name" placeholder="John Michael Smith" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Address</label><input class="form-input" id="af-address" placeholder="100 Main St, Houston, TX 77001" oninput="render()"></div>
    <div class="form-row two-col"><div><label class="form-label">County</label><input class="form-input" id="af-county" placeholder="Harris" oninput="render()"></div><div><label class="form-label">State</label><select class="form-input" id="af-state" onchange="render()"><option value="">— Select —</option>${stateOpts()}</select></div></div>
  </div>
  <div class="form-section" id="af-general-section"><div class="form-section-title">Statement of Facts</div>
    <div class="form-row"><label class="form-label">I, the undersigned, do hereby swear and affirm that the following statements are true and correct to the best of my knowledge:</label>
      <textarea class="form-input" id="af-facts" rows="8" placeholder="1. I am over the age of 18 and competent to make this affidavit.&#10;2. [State your facts here, numbered for clarity]&#10;3. ..." oninput="render()"></textarea>
    </div>
  </div>
  <div class="form-section" id="af-heirship-section" style="display:none"><div class="form-section-title">Deceased Person's Information</div>
    <div class="form-row"><label class="form-label">Deceased Full Name</label><input class="form-input" id="af-deceased" placeholder="Mary Ann Johnson" oninput="render()"></div>
    <div class="form-row two-col"><div><label class="form-label">Date of Death</label><input class="form-input" id="af-dod" type="date" oninput="render()"></div><div><label class="form-label">Last Known State</label><input class="form-input" id="af-deceased-state" placeholder="Texas" oninput="render()"></div></div>
    <div class="form-row"><label class="form-label">Heirs (names, relationships, shares)</label><textarea class="form-input" id="af-heirs" rows="4" placeholder="1. Robert Johnson — son — 50%&#10;2. Susan Williams — daughter — 50%" oninput="render()"></textarea></div>
  </div>
  <div class="form-section"><div class="form-section-title">Date</div>
    <div class="form-row"><label class="form-label">Date Signed</label><input class="form-input" id="af-date" type="date" oninput="render()"></div>
  </div>
  <div class="form-section"><button class="doc-btn doc-btn--gold" type="button" onclick="window.print()" style="width:100%">Download / Print PDF</button></div>
</div>
<div class="doc-preview-panel">
  <div class="doc-preview-header"><span>Live Preview</span><span style="font-size:11px;color:var(--ink-3)">Updates as you type</span></div>
  <div class="legal-document" id="af-preview"><div class="doc-title">AFFIDAVIT</div><div class="doc-subtitle">Fill in the form to see your affidavit</div></div>
</div>
</div>
<div class="container" style="margin-top:48px">
<section><p class="section-eyebrow">State-Specific</p>
<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Affidavit by State</h2>
<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Notarization requirements and specific form language vary by state and court.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">${stateGrid('affidavit-template')}</div>
</section>
</div>
</main>
${footer()}
<script>
function gv(id){return(document.getElementById(id)||{}).value||'';}
function fld(v,ph){return v?'<span class="doc-field">'+v+'</span>':'<span class="doc-field empty">'+ph+'</span>';}
document.getElementById('af-type').addEventListener('change',function(){
  document.getElementById('af-general-section').style.display=this.value!=='heirship'?'block':'none';
  document.getElementById('af-heirship-section').style.display=this.value==='heirship'?'block':'none';
  render();
});
function render(){
  var type=gv('af-type'),name=gv('af-name'),addr=gv('af-address'),county=gv('af-county'),state=gv('af-state');
  var facts=gv('af-facts'),dateStr=gv('af-date');
  var deceased=gv('af-deceased'),dod=gv('af-dod'),heirs=gv('af-heirs');
  var titles={'general':'GENERAL AFFIDAVIT','heirship':'AFFIDAVIT OF HEIRSHIP','financial':'FINANCIAL AFFIDAVIT'};
  var out='<div class="doc-title">'+titles[type]+'</div>';
  out+='<p class="doc-clause"><strong>State of '+fld(state,'[State]')+'</strong><br><strong>County of '+fld(county,'[County]')+'</strong></p>';
  out+='<p class="doc-clause">I, '+fld(name,'[Your Full Name]')+', residing at '+fld(addr,'[Address]')
      +', being first duly sworn, depose and state as follows under penalty of perjury:</p>';
  if(type==='heirship'){
    out+='<p class="doc-clause"><span class="doc-label">1. IDENTITY</span><br>I am personally acquainted with the family and heirs of '+fld(deceased,'[Deceased Name]')+', who died on '+fld(dod,'[Date]')+' in '+fld(gv('af-deceased-state'),'[State]')+'.</p>';
    out+='<p class="doc-clause"><span class="doc-label">2. HEIRS</span><br>To the best of my knowledge, the following persons are the sole heirs and distributees of the estate:<br>'
        +(heirs?heirs.replace(/\n/g,'<br>'):'<span class="doc-field empty">[List heirs, relationships, and shares]</span>')+'</p>';
    out+='<p class="doc-clause"><span class="doc-label">3. NO WILL</span><br>To the best of my knowledge, '+fld(deceased,'[Deceased Name]')+' died without a valid Will, or the Will has been duly probated and the estate closed.</p>';
  } else {
    out+='<p class="doc-clause">'+(facts?facts.replace(/\n/g,'<br>'):fld('','[Enter your statement of facts here]'))+'</p>';
  }
  out+='<p class="doc-clause">I declare under penalty of perjury under the laws of the State of '+fld(state,'[State]')+' that the foregoing is true and correct to the best of my knowledge and belief.</p>';
  out+='<p>Executed on '+fld(dateStr,'[Date]')+'.</p>';
  out+='<div class="doc-sig-block"><table class="doc-sig-table"><tbody>'
      +'<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">Affiant Signature — '+fld(name,'[Your Name]')+'</span></td></tr>'
      +'</tbody></table>';
  out+='<p class="doc-label" style="margin-top:24px">NOTARY ACKNOWLEDGMENT</p>';
  out+='<p style="font-size:10pt">Subscribed and sworn to (or affirmed) before me on ______________ by '+fld(name,'[Your Name]')
      +', personally known to me or proved to me on the basis of satisfactory evidence to be the person who appeared before me.</p>';
  out+='<table class="doc-sig-table" style="margin-top:10px"><tbody>'
      +'<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">Notary Public</span></td><td><div class="doc-sig-line"></div><span class="doc-sig-label">Commission Expires</span></td></tr>'
      +'</tbody></table><p style="font-size:9pt">[ NOTARY SEAL ]</p></div>';
  document.getElementById('af-preview').innerHTML=out;
}
render();
</script>
</body></html>`);
console.log('affidavit ok');

// ─────────────────────────────────────────────────────────────────────────────
// 6. NOTICE TO VACATE
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(base+'notice-to-vacate-template.html', header(
  'Free Notice to Vacate Template 2026 | Tenant & Landlord | Fill & Download',
  'Free notice to vacate template 2026. Tenant to landlord or landlord to tenant. 30-day, 60-day, or custom notice period. Fill in, preview, download PDF.',
  'notice-to-vacate-template'
)+`
<main class="page-wrap">
<div class="container">
<nav class="breadcrumb"><a href="/">Home</a><span>›</span><a href="/tools">Templates</a><span>›</span><span>Notice to Vacate</span></nav>
<h1 class="page-title" data-enter>Free Notice to Vacate Template</h1>
<p class="page-sub" data-enter data-delay="1">Written notice to end a tenancy — from tenant to landlord, or landlord to tenant. Free, no sign-up, download PDF.</p>
<div class="page-badges" data-enter data-delay="2"><span class="page-badge">✓ Free, no account</span><span class="page-badge">✓ Both directions</span><span class="page-badge">✓ All 50 states</span><span class="page-badge">✓ PDF download</span></div>
</div>
<div class="container doc-layout">
<div class="doc-form-panel">
  <div class="form-section"><div class="form-section-title">Notice Direction</div>
    <div class="form-row"><select class="form-input" id="nv-direction" onchange="render()"><option value="tenant-landlord">Tenant giving notice to Landlord</option><option value="landlord-tenant">Landlord giving notice to Tenant</option></select></div>
    <div class="form-row"><label class="form-label">Notice Period</label><select class="form-input" id="nv-days" onchange="render()"><option value="30">30 days</option><option value="60">60 days</option><option value="90">90 days</option></select></div>
  </div>
  <div class="form-section"><div class="form-section-title">Tenant Information</div>
    <div class="form-row"><label class="form-label">Tenant Name(s)</label><input class="form-input" id="nv-tenant" placeholder="John Smith and Jane Smith" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Landlord Information</div>
    <div class="form-row"><label class="form-label">Landlord / Property Manager</label><input class="form-input" id="nv-landlord" placeholder="Sunrise Properties LLC" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Landlord Address</label><input class="form-input" id="nv-landlord-addr" placeholder="100 Office Blvd, Suite 5, Austin, TX 78701" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Property</div>
    <div class="form-row"><label class="form-label">Rental Property Address</label><input class="form-input" id="nv-property" placeholder="456 Oak Ave, Unit 2B, Austin, TX 78702" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Vacate Date</label><input class="form-input" id="nv-vacate-date" type="date" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Date &amp; Forwarding Address</div>
    <div class="form-row"><label class="form-label">Date of Notice</label><input class="form-input" id="nv-date" type="date" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Forwarding Address <span style="font-weight:400;color:var(--ink-3)">(for deposit return)</span></label><input class="form-input" id="nv-forward" placeholder="789 New St, Austin, TX 78703" oninput="render()"></div>
  </div>
  <div class="form-section"><button class="doc-btn doc-btn--gold" type="button" onclick="window.print()" style="width:100%">Download / Print PDF</button></div>
</div>
<div class="doc-preview-panel">
  <div class="doc-preview-header"><span>Live Preview</span><span style="font-size:11px;color:var(--ink-3)">Updates as you type</span></div>
  <div class="legal-document" id="nv-preview"><div class="doc-title">NOTICE TO VACATE</div><div class="doc-subtitle">Fill in the form to see your notice</div></div>
</div>
</div>
<div class="container" style="margin-top:48px">
<section><p class="section-eyebrow">State-Specific</p>
<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Notice to Vacate by State</h2>
<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Required notice periods vary by state and tenancy type.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">${stateGrid('notice-to-vacate-template')}</div>
</section>
</div>
</main>
${footer()}
<script>
function gv(id){return(document.getElementById(id)||{}).value||'';}
function fld(v,ph){return v?'<span class="doc-field">'+v+'</span>':'<span class="doc-field empty">'+ph+'</span>';}
function render(){
  var dir=gv('nv-direction'),days=gv('nv-days');
  var tenant=gv('nv-tenant'),landlord=gv('nv-landlord'),landlordAddr=gv('nv-landlord-addr');
  var property=gv('nv-property'),vacateDate=gv('nv-vacate-date');
  var dateStr=gv('nv-date'),forward=gv('nv-forward');
  var isTenant=dir==='tenant-landlord';
  var fromName=isTenant?fld(tenant,'[Tenant Name]'):fld(landlord,'[Landlord Name]');
  var toName=isTenant?fld(landlord,'[Landlord Name]'):fld(tenant,'[Tenant Name]');
  var toAddr=isTenant?fld(landlordAddr,'[Landlord Address]'):'';
  var out='<div class="doc-title">NOTICE TO VACATE</div>';
  out+='<p style="text-align:right">'+fld(dateStr,'[Date]')+'</p>';
  out+='<p>'+toName+(toAddr?'<br>'+toAddr:'')+'</p>';
  out+='<p style="margin-top:12px"><strong>Re: Notice to Vacate — '+fld(property,'[Property Address]')+'</strong></p>';
  out+='<p class="doc-clause">Dear '+(isTenant?fld(landlord,'[Landlord]'):fld(tenant,'[Tenant]'))+',</p>';
  out+='<p class="doc-clause">Please be advised that '+(isTenant?'I, '+fld(tenant,'[Tenant Name]')+', intend to vacate':'you are hereby notified that your tenancy at the above-referenced property will be terminated')
      +' effective <strong>'+fld(vacateDate,'[Vacate Date]')+'</strong>. This letter serves as your required <strong>'+days+'-day</strong> written notice as required by the lease agreement and applicable state law.</p>';
  if(isTenant){
    out+='<p class="doc-clause">I will ensure the property is left in the same condition as when I moved in, ordinary wear and tear excepted. All keys, access cards, and garage openers will be returned on or before the vacate date.</p>';
    if(forward){out+='<p class="doc-clause">Please forward my security deposit to my new address: <strong>'+forward+'</strong>.</p>';}
  } else {
    out+='<p class="doc-clause">You must vacate and surrender possession of the above-described premises on or before the vacate date stated above. '
        +'Please remove all personal belongings and return all keys to the address above on or before the vacate date.</p>';
  }
  out+='<p class="doc-clause">If you have any questions, please contact me at the information below.</p>';
  out+='<p style="margin-top:16px">Sincerely,</p>';
  out+='<div class="doc-sig-block"><table class="doc-sig-table"><tbody>'
      +'<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">Signature — '+(isTenant?fld(tenant,'[Tenant Name]'):fld(landlord,'[Landlord Name]'))+'</span></td><td><div class="doc-sig-line"></div><span class="doc-sig-label">Date</span></td></tr>'
      +'</tbody></table></div>';
  document.getElementById('nv-preview').innerHTML=out;
}
render();
</script>
</body></html>`);
console.log('notice-to-vacate ok');

// ─────────────────────────────────────────────────────────────────────────────
// 7. COMMERCIAL LEASE AGREEMENT
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(base+'commercial-lease-agreement-template.html', header(
  'Free Commercial Lease Agreement Template 2026 | Fill In & Download PDF',
  'Free commercial lease agreement template 2026. Office, retail, and industrial space leases. NNN, gross, and modified gross lease types. Fill in, preview, download PDF.',
  'commercial-lease-agreement-template'
)+`
<main class="page-wrap">
<div class="container">
<nav class="breadcrumb"><a href="/">Home</a><span>›</span><a href="/tools">Templates</a><span>›</span><span>Commercial Lease</span></nav>
<h1 class="page-title" data-enter>Free Commercial Lease Agreement Template</h1>
<p class="page-sub" data-enter data-delay="1">Office, retail, and industrial space. Gross, net, and triple-net (NNN) lease types. Fill in, preview live, download PDF.</p>
<div class="page-badges" data-enter data-delay="2"><span class="page-badge">✓ Free, no account</span><span class="page-badge">✓ NNN / Gross / Modified</span><span class="page-badge">✓ All 50 states</span><span class="page-badge">✓ PDF download</span></div>
</div>
<div class="container doc-layout">
<div class="doc-form-panel">
  <div class="form-section"><div class="form-section-title">Lease Type</div>
    <div class="form-row"><select class="form-input" id="cl-type" onchange="render()">
      <option value="gross">Gross Lease (landlord pays property costs)</option>
      <option value="nnn">Triple Net / NNN (tenant pays taxes + insurance + maintenance)</option>
      <option value="modified">Modified Gross (split costs)</option>
    </select></div>
    <div class="form-row"><label class="form-label">Space Type</label><select class="form-input" id="cl-space" onchange="render()"><option value="office">Office Space</option><option value="retail">Retail Space</option><option value="industrial">Warehouse / Industrial</option><option value="restaurant">Restaurant / Food Service</option></select></div>
  </div>
  <div class="form-section"><div class="form-section-title">Landlord</div>
    <div class="form-row"><label class="form-label">Landlord Name / Entity</label><input class="form-input" id="cl-landlord" placeholder="Oak Street Properties LLC" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Landlord Address</label><input class="form-input" id="cl-landlord-addr" placeholder="100 Capital Blvd, Suite 200, Chicago, IL 60601" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Tenant</div>
    <div class="form-row"><label class="form-label">Tenant Name / Business Entity</label><input class="form-input" id="cl-tenant" placeholder="Smith Consulting LLC" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Permitted Use (business purpose)</label><input class="form-input" id="cl-use" placeholder="general office use for a marketing consulting firm" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Premises</div>
    <div class="form-row"><label class="form-label">Property / Suite Address</label><input class="form-input" id="cl-property" placeholder="200 Commerce Dr, Suite 400, Chicago, IL 60602" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Square Footage</label><input class="form-input" id="cl-sqft" type="number" placeholder="1500" oninput="render()"></div>
    <div class="form-row two-col"><div><label class="form-label">State</label><select class="form-input" id="cl-state" onchange="render()"><option value="">— Select —</option>${stateOpts()}</select></div><div><label class="form-label">County</label><input class="form-input" id="cl-county" placeholder="Cook" oninput="render()"></div></div>
  </div>
  <div class="form-section"><div class="form-section-title">Lease Terms</div>
    <div class="form-row two-col"><div><label class="form-label">Lease Start</label><input class="form-input" id="cl-start" type="date" oninput="render()"></div><div><label class="form-label">Lease End</label><input class="form-input" id="cl-end" type="date" oninput="render()"></div></div>
    <div class="form-row two-col"><div><label class="form-label">Monthly Base Rent ($)</label><input class="form-input" id="cl-rent" type="number" placeholder="4500" oninput="render()"></div><div><label class="form-label">Security Deposit ($)</label><input class="form-input" id="cl-deposit" type="number" placeholder="9000" oninput="render()"></div></div>
    <div class="form-row"><label class="form-label">Annual Rent Increase</label><select class="form-input" id="cl-increase" onchange="render()"><option value="none">No automatic increase</option><option value="3%">3% per year</option><option value="5%">5% per year</option><option value="CPI">CPI-adjusted</option></select></div>
    <div class="form-row"><label class="form-label">Renewal Option</label><select class="form-input" id="cl-renewal" onchange="render()"><option value="none">No renewal option</option><option value="1 year">1-year renewal option</option><option value="3 years">3-year renewal option</option><option value="5 years">5-year renewal option</option></select></div>
  </div>
  <div class="form-section"><button class="doc-btn doc-btn--gold" type="button" onclick="window.print()" style="width:100%">Download / Print PDF</button></div>
</div>
<div class="doc-preview-panel">
  <div class="doc-preview-header"><span>Live Preview</span><span style="font-size:11px;color:var(--ink-3)">Updates as you type</span></div>
  <div class="legal-document" id="cl-preview"><div class="doc-title">COMMERCIAL LEASE AGREEMENT</div><div class="doc-subtitle">Fill in the form to see your lease</div></div>
</div>
</div>
<div class="container" style="margin-top:48px">
<section><p class="section-eyebrow">State-Specific</p>
<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Commercial Lease by State</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">${stateGrid('commercial-lease-agreement-template')}</div>
</section>
</div>
</main>
${footer()}
<script>
function gv(id){return(document.getElementById(id)||{}).value||'';}
function fld(v,ph){return v?'<span class="doc-field">'+v+'</span>':'<span class="doc-field empty">'+ph+'</span>';}
function render(){
  var type=gv('cl-type'),space=gv('cl-space');
  var landlord=gv('cl-landlord'),lAddr=gv('cl-landlord-addr');
  var tenant=gv('cl-tenant'),use=gv('cl-use');
  var property=gv('cl-property'),sqft=gv('cl-sqft'),state=gv('cl-state'),county=gv('cl-county');
  var start=gv('cl-start'),end=gv('cl-end'),rent=gv('cl-rent'),deposit=gv('cl-deposit');
  var increase=gv('cl-increase'),renewal=gv('cl-renewal');
  var typeLabels={'gross':'GROSS LEASE','nnn':'TRIPLE NET (NNN) LEASE','modified':'MODIFIED GROSS LEASE'};
  var spaceLabels={'office':'Office Space','retail':'Retail Space','industrial':'Warehouse/Industrial Space','restaurant':'Restaurant Space'};
  var out='<div class="doc-title">COMMERCIAL LEASE AGREEMENT</div>';
  out+='<div class="doc-subtitle">'+typeLabels[type]+(space?' — '+spaceLabels[space]:'')+'</div>';
  out+='<p class="doc-clause">This Commercial Lease Agreement ("Lease") is entered into as of '
      +(start?start:'____________')
      +' between '+fld(landlord,'[Landlord]')+' ("Landlord"), and '+fld(tenant,'[Tenant]')+' ("Tenant").</p>';
  out+='<p class="doc-clause"><span class="doc-label">1. PREMISES</span><br>Landlord leases to Tenant the premises described as: '+fld(property,'[Address]')
      +(sqft?', consisting of approximately <strong>'+parseInt(sqft).toLocaleString()+' square feet</strong>':'')
      +', located in '+fld(county,'[County]')+' County, '+fld(state,'[State]')+'.</p>';
  out+='<p class="doc-clause"><span class="doc-label">2. PERMITTED USE</span><br>Tenant shall use the Premises solely for: '+fld(use,'[permitted business use]')+'. Tenant shall not use the Premises for any other purpose without Landlord\'s prior written consent.</p>';
  out+='<p class="doc-clause"><span class="doc-label">3. TERM</span><br>The lease term shall commence on '+fld(start,'[Start Date]')+' and expire on '+fld(end,'[End Date]')+'.</p>';
  out+='<p class="doc-clause"><span class="doc-label">4. BASE RENT</span><br>Tenant shall pay a monthly base rent of <strong>$'+(rent?parseFloat(rent).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}):fld('','[Amount]'))+'</strong>, due on the 1st day of each calendar month.'
      +(increase!=='none'?' Rent shall increase by '+fld(increase,'[%]')+' on each anniversary of the lease commencement date.':'')+'</p>';
  out+='<p class="doc-clause"><span class="doc-label">5. SECURITY DEPOSIT</span><br>Upon execution, Tenant shall deposit <strong>$'+(deposit?parseFloat(deposit).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}):fld('','[Amount]'))+'</strong> as a security deposit, to be held by Landlord and returned within 30 days of lease termination less any deductions for damages or unpaid rent.</p>';
  if(type==='nnn'){
    out+='<p class="doc-clause"><span class="doc-label">6. TRIPLE NET EXPENSES</span><br>In addition to base rent, Tenant shall pay Tenant\'s proportionate share of: (a) real property taxes and assessments, (b) property insurance premiums, and (c) common area maintenance (CAM) expenses. Landlord shall provide an annual reconciliation statement.</p>';
  } else if(type==='gross'){
    out+='<p class="doc-clause"><span class="doc-label">6. OPERATING EXPENSES</span><br>This is a Gross Lease. Landlord shall be responsible for all operating expenses including real property taxes, building insurance, and structural maintenance. Tenant is responsible for personal property insurance, telephone, utilities, and janitorial services within the Premises.</p>';
  } else {
    out+='<p class="doc-clause"><span class="doc-label">6. OPERATING EXPENSES</span><br>This is a Modified Gross Lease. Landlord shall pay real property taxes and building insurance. Tenant shall pay for utilities, janitorial services, and routine maintenance of the Premises.</p>';
  }
  out+='<p class="doc-clause"><span class="doc-label">7. IMPROVEMENTS &amp; ALTERATIONS</span><br>Tenant shall not make any alterations, additions, or improvements to the Premises without Landlord\'s prior written consent. Any approved alterations shall, at Landlord\'s election, become the property of Landlord upon lease termination or be removed by Tenant at Tenant\'s expense.</p>';
  if(renewal!=='none'){
    out+='<p class="doc-clause"><span class="doc-label">8. RENEWAL OPTION</span><br>Provided Tenant is not in default, Tenant shall have the option to renew this Lease for one additional term of '+renewal+' upon written notice to Landlord at least 90 days prior to lease expiration. Rent for the renewal term shall be negotiated in good faith.</p>';
  }
  out+='<p class="doc-clause"><span class="doc-label">'+(renewal!=='none'?9:8)+'. GOVERNING LAW</span><br>This Lease shall be governed by the laws of the State of '+fld(state,'[State]')+'.</p>';
  out+='<div class="doc-sig-block"><table class="doc-sig-table"><tbody>'
      +'<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">Landlord — '+fld(landlord,'[Landlord Name]')+'</span></td><td><div class="doc-sig-line"></div><span class="doc-sig-label">Date</span></td></tr>'
      +'<tr style="height:20px"><td></td></tr>'
      +'<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">Tenant — '+fld(tenant,'[Tenant Name]')+'</span></td><td><div class="doc-sig-line"></div><span class="doc-sig-label">Date</span></td></tr>'
      +'</tbody></table></div>';
  document.getElementById('cl-preview').innerHTML=out;
}
render();
</script>
</body></html>`);
console.log('commercial-lease ok');

// ─────────────────────────────────────────────────────────────────────────────
// 8. PARTNERSHIP AGREEMENT
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(base+'partnership-agreement-template.html', header(
  'Free Partnership Agreement Template 2026 | Fill In & Download PDF',
  'Free partnership agreement template 2026. General partnership with profit/loss splits, capital contributions, and dissolution clause. Fill in, preview, download PDF.',
  'partnership-agreement-template'
)+`
<main class="page-wrap">
<div class="container">
<nav class="breadcrumb"><a href="/">Home</a><span>›</span><a href="/tools">Templates</a><span>›</span><span>Partnership Agreement</span></nav>
<h1 class="page-title" data-enter>Free Partnership Agreement Template</h1>
<p class="page-sub" data-enter data-delay="1">Document ownership splits, capital contributions, profit/loss distributions, and management for a general or limited partnership.</p>
<div class="page-badges" data-enter data-delay="2"><span class="page-badge">✓ Free, no account</span><span class="page-badge">✓ 2–6 partners</span><span class="page-badge">✓ Auto profit split</span><span class="page-badge">✓ PDF download</span></div>
</div>
<div class="container doc-layout">
<div class="doc-form-panel">
  <div class="form-section"><div class="form-section-title">Partnership</div>
    <div class="form-row"><label class="form-label">Partnership Name</label><input class="form-input" id="pa-name" placeholder="Smith & Jones Partners" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Business Purpose</label><textarea class="form-input" id="pa-purpose" rows="2" placeholder="to engage in the business of residential real estate investment and property management" oninput="render()"></textarea></div>
    <div class="form-row two-col"><div><label class="form-label">Principal Place of Business</label><input class="form-input" id="pa-address" placeholder="100 Main St, Dallas, TX 75201" oninput="render()"></div><div><label class="form-label">State</label><select class="form-input" id="pa-state" onchange="render()"><option value="">— Select —</option>${stateOpts()}</select></div></div>
    <div class="form-row"><label class="form-label">Partnership Type</label><select class="form-input" id="pa-type" onchange="render()"><option value="general">General Partnership</option><option value="limited">Limited Partnership (LP)</option></select></div>
  </div>
  <div class="form-section"><div class="form-section-title">Partners</div>
    <div id="pa-partners"></div>
    <button class="doc-btn doc-btn--ghost" type="button" onclick="addPartner()" style="width:100%;margin-top:8px">+ Add Partner</button>
  </div>
  <div class="form-section"><div class="form-section-title">Financial Terms</div>
    <div class="form-row"><label class="form-label">Fiscal Year End</label><select class="form-input" id="pa-fiscal" onchange="render()"><option value="December 31">December 31</option><option value="March 31">March 31</option><option value="June 30">June 30</option><option value="September 30">September 30</option></select></div>
    <div class="form-row"><label class="form-label">Profit/Loss Distribution</label><select class="form-input" id="pa-distribution" onchange="render()"><option value="proportional">Proportional to ownership %</option><option value="equal">Equal share regardless of ownership</option></select></div>
  </div>
  <div class="form-section"><div class="form-section-title">Date</div>
    <div class="form-row"><label class="form-label">Agreement Date</label><input class="form-input" id="pa-date" type="date" oninput="render()"></div>
  </div>
  <div class="form-section"><button class="doc-btn doc-btn--gold" type="button" onclick="window.print()" style="width:100%">Download / Print PDF</button></div>
</div>
<div class="doc-preview-panel">
  <div class="doc-preview-header"><span>Live Preview</span><span style="font-size:11px;color:var(--ink-3)">Updates as you type</span></div>
  <div class="legal-document" id="pa-preview"><div class="doc-title">PARTNERSHIP AGREEMENT</div><div class="doc-subtitle">Fill in the form to see your agreement</div></div>
</div>
</div>
<div class="container" style="margin-top:48px">
<section class="related-section"><p class="section-eyebrow">Related</p>
<h2 class="section-title" style="font-size:22px;margin-bottom:16px">You might also need</h2>
<div class="tools-grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">
<a href="/llc-operating-agreement-template" class="tool-card"><div class="tc-icon tc-blue"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg></div><div><div class="tool-card-title">LLC Operating Agreement</div><div class="tool-card-desc">Structure your business as an LLC instead.</div></div></a>
<a href="/nda-template" class="tool-card"><div class="tc-icon tc-gold"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div><div><div class="tool-card-title">NDA Template</div><div class="tool-card-desc">Protect confidential business information.</div></div></a>
</div>
</section>
</div>
</main>
${footer()}
<script>
function gv(id){return(document.getElementById(id)||{}).value||'';}
function fld(v,ph){return v?'<span class="doc-field">'+v+'</span>':'<span class="doc-field empty">'+ph+'</span>';}
var paCount=0;
function addPartner(){
  paCount++;
  var d=document.createElement('div');d.className='form-row';d.id='pa-row-'+paCount;
  d.innerHTML='<div style="display:grid;grid-template-columns:1fr 80px 110px 28px;gap:6px;align-items:end">'
    +'<div><label class="form-label">Name</label><input class="form-input" id="pa-pname-'+paCount+'" placeholder="John Smith" oninput="render()"></div>'
    +'<div><label class="form-label">Share (%)</label><input class="form-input" id="pa-pct-'+paCount+'" type="number" min="0" max="100" placeholder="50" oninput="render()"></div>'
    +'<div><label class="form-label">Capital ($)</label><input class="form-input" id="pa-cap-'+paCount+'" type="number" placeholder="10000" oninput="render()"></div>'
    +'<button type="button" onclick="document.getElementById(\'pa-row-'+paCount+'\').remove();render()" style="background:none;border:none;color:var(--ink-3);cursor:pointer;font-size:18px;padding:0;margin-bottom:4px">×</button>'
    +'</div>';
  document.getElementById('pa-partners').appendChild(d);render();
}
addPartner();addPartner();
function render(){
  var name=gv('pa-name'),purpose=gv('pa-purpose'),addr=gv('pa-address'),state=gv('pa-state');
  var type=gv('pa-type'),fiscal=gv('pa-fiscal'),distribution=gv('pa-distribution'),dateStr=gv('pa-date');
  var partners=[];
  document.querySelectorAll('[id^="pa-pname-"]').forEach(function(el){
    var i=el.id.split('-').pop();
    var n=el.value,pct=(document.getElementById('pa-pct-'+i)||{}).value||'',cap=(document.getElementById('pa-cap-'+i)||{}).value||'';
    if(n){partners.push({name:n,pct:pct,cap:cap});}
  });
  var totalPct=partners.reduce(function(s,p){return s+(parseFloat(p.pct)||0);},0);
  var typeLabel=type==='limited'?'LIMITED PARTNERSHIP AGREEMENT':'GENERAL PARTNERSHIP AGREEMENT';
  var out='<div class="doc-title">'+typeLabel+'</div>';
  out+='<p class="doc-clause">This '+typeLabel.replace(' AGREEMENT','')+' ("Agreement") is entered into as of '+fld(dateStr,'[Date]')+' by and between the Partners listed below, who agree to form a '+(type==='limited'?'Limited Partnership':'General Partnership')+' under the laws of the State of '+fld(state,'[State]')+'.</p>';
  out+='<p class="doc-clause"><span class="doc-label">1. PARTNERSHIP NAME &amp; PURPOSE</span><br>The name of the Partnership shall be: <strong>'+fld(name,'[Partnership Name]')+'</strong>.<br>The purpose of the Partnership is '+fld(purpose,'[describe business purpose]')+'.<br>Principal place of business: '+fld(addr,'[Address]')+'.</p>';
  out+='<p class="doc-clause"><span class="doc-label">2. PARTNERS &amp; OWNERSHIP</span><br>';
  if(partners.length>0){
    out+='<table class="doc-table"><tbody><tr><th>Partner</th><th>Ownership %</th><th>Capital Contribution</th></tr>';
    partners.forEach(function(p){
      out+='<tr><td>'+fld(p.name,'[Name]')+'</td><td>'+fld(p.pct,'[%]')+'%</td><td>$'+(p.cap?parseFloat(p.cap).toLocaleString():'—')+'</td></tr>';
    });
    if(totalPct>0&&Math.round(totalPct)!==100){out+='<tr><td colspan="3" style="color:#c0392b">⚠ Shares total '+totalPct+'% — must equal 100%</td></tr>';}
    out+='</tbody></table>';
  }
  out+='</p>';
  out+='<p class="doc-clause"><span class="doc-label">3. PROFIT &amp; LOSS DISTRIBUTION</span><br>Net profits and losses shall be allocated '+(distribution==='equal'?'equally among all Partners':'to each Partner in proportion to their ownership percentage')+'. Distributions shall be made as determined by unanimous consent of the Partners, but no less frequently than annually.</p>';
  out+='<p class="doc-clause"><span class="doc-label">4. MANAGEMENT</span><br>The Partnership shall be managed by the Partners by majority vote (based on ownership percentage) on all ordinary business matters. The following matters require unanimous consent: amendment of this Agreement, admission of new partners, sale of all or substantially all assets, and dissolution of the Partnership.</p>';
  out+='<p class="doc-clause"><span class="doc-label">5. FISCAL YEAR</span><br>The fiscal year of the Partnership shall end on <strong>'+fld(fiscal,'[Date]')+'</strong> of each year.</p>';
  out+='<p class="doc-clause"><span class="doc-label">6. DISSOLUTION</span><br>The Partnership may be dissolved by unanimous written consent of all Partners, or by operation of law. Upon dissolution, Partnership assets shall first be used to pay creditors, then to return capital contributions, then to distribute remaining amounts in proportion to ownership percentages.</p>';
  out+='<p class="doc-clause"><span class="doc-label">7. GOVERNING LAW</span><br>This Agreement shall be governed by the laws of the State of '+fld(state,'[State]')+'.</p>';
  if(partners.length>0){
    out+='<div class="doc-sig-block"><table class="doc-sig-table"><tbody>';
    partners.forEach(function(p){
      out+='<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">'+fld(p.name,'[Partner Name]')+'</span></td><td><div class="doc-sig-line"></div><span class="doc-sig-label">Date</span></td></tr><tr style="height:16px"><td></td></tr>';
    });
    out+='</tbody></table></div>';
  }
  document.getElementById('pa-preview').innerHTML=out;
}
render();
</script>
</body></html>`);
console.log('partnership ok');

// ─────────────────────────────────────────────────────────────────────────────
// 9. DIVORCE SETTLEMENT AGREEMENT
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(base+'divorce-settlement-agreement-template.html', header(
  'Free Divorce Settlement Agreement Template 2026 | Fill In & Download PDF',
  'Free divorce settlement agreement template 2026. Uncontested divorce property division, child custody, support, and alimony. Fill in, preview live, download PDF.',
  'divorce-settlement-agreement-template'
)+`
<main class="page-wrap">
<div class="container">
<nav class="breadcrumb"><a href="/">Home</a><span>›</span><a href="/tools">Templates</a><span>›</span><span>Divorce Settlement</span></nav>
<h1 class="page-title" data-enter>Free Divorce Settlement Agreement Template</h1>
<p class="page-sub" data-enter data-delay="1">For uncontested divorces. Document property division, child custody and support, and spousal support. Review with a family law attorney before filing.</p>
<div class="page-badges" data-enter data-delay="2"><span class="page-badge">✓ Free, no account</span><span class="page-badge">✓ Property &amp; custody</span><span class="page-badge">✓ All 50 states</span><span class="page-badge">✓ PDF download</span></div>
</div>
<div class="container doc-layout">
<div class="doc-form-panel">
  <div class="form-section"><div class="form-section-title">Petitioner (Spouse Filing)</div>
    <div class="form-row"><label class="form-label">Petitioner Full Name</label><input class="form-input" id="ds-petitioner" placeholder="John Michael Smith" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Respondent (Other Spouse)</div>
    <div class="form-row"><label class="form-label">Respondent Full Name</label><input class="form-input" id="ds-respondent" placeholder="Jane Marie Smith" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Marriage Details</div>
    <div class="form-row two-col"><div><label class="form-label">Marriage Date</label><input class="form-input" id="ds-married" type="date" oninput="render()"></div><div><label class="form-label">Separation Date</label><input class="form-input" id="ds-separated" type="date" oninput="render()"></div></div>
    <div class="form-row two-col"><div><label class="form-label">County</label><input class="form-input" id="ds-county" placeholder="Denver" oninput="render()"></div><div><label class="form-label">State</label><select class="form-input" id="ds-state" onchange="render()"><option value="">— Select —</option>${stateOpts()}</select></div></div>
  </div>
  <div class="form-section"><div class="form-section-title">Children</div>
    <div class="form-row"><select class="form-input" id="ds-has-children" onchange="toggleDsChildren();render()"><option value="no">No minor children</option><option value="yes">Yes, we have minor children</option></select></div>
    <div id="ds-children-section" style="display:none">
      <div class="form-row"><label class="form-label">Children's Names &amp; Ages</label><textarea class="form-input" id="ds-children" rows="2" placeholder="Emma Smith (age 8), Lucas Smith (age 5)" oninput="render()"></textarea></div>
      <div class="form-row"><label class="form-label">Custody Arrangement</label><select class="form-input" id="ds-custody" onchange="render()"><option value="joint-physical">Joint Physical Custody</option><option value="petitioner-primary">Petitioner has primary physical custody</option><option value="respondent-primary">Respondent has primary physical custody</option></select></div>
      <div class="form-row"><label class="form-label">Monthly Child Support ($)</label><input class="form-input" id="ds-child-support" type="number" placeholder="1200" oninput="render()"></div>
      <div class="form-row"><label class="form-label">Child Support Paid By</label><select class="form-input" id="ds-cs-payer" onchange="render()"><option value="petitioner">Petitioner</option><option value="respondent">Respondent</option></select></div>
    </div>
  </div>
  <div class="form-section"><div class="form-section-title">Spousal Support</div>
    <div class="form-row"><select class="form-input" id="ds-alimony-type" onchange="render()"><option value="none">No spousal support</option><option value="petitioner-pays">Petitioner pays Respondent</option><option value="respondent-pays">Respondent pays Petitioner</option></select></div>
    <div class="form-row" id="ds-alimony-row" style="display:none"><label class="form-label">Monthly Spousal Support ($)</label><input class="form-input" id="ds-alimony" type="number" placeholder="2000" oninput="render()"></div>
    <div class="form-row" id="ds-alimony-duration-row" style="display:none"><label class="form-label">Duration</label><input class="form-input" id="ds-alimony-duration" placeholder="24 months" oninput="render()"></div>
  </div>
  <div class="form-section"><div class="form-section-title">Property Division (summary)</div>
    <div class="form-row"><label class="form-label">Real Estate</label><textarea class="form-input" id="ds-realestate" rows="2" placeholder="Marital home at 123 Main St to be sold; proceeds split equally. OR: Petitioner retains marital home and refinances mortgage in their name." oninput="render()"></textarea></div>
    <div class="form-row"><label class="form-label">Vehicles</label><textarea class="form-input" id="ds-vehicles" rows="2" placeholder="Petitioner retains 2019 Toyota Camry. Respondent retains 2021 Honda CR-V." oninput="render()"></textarea></div>
    <div class="form-row"><label class="form-label">Bank Accounts &amp; Assets</label><textarea class="form-input" id="ds-assets" rows="2" placeholder="Joint savings account to be split equally. Each party retains their own retirement accounts." oninput="render()"></textarea></div>
    <div class="form-row"><label class="form-label">Debts</label><textarea class="form-input" id="ds-debts" rows="2" placeholder="Each party is responsible for debts in their own name. Joint credit card balance split equally." oninput="render()"></textarea></div>
  </div>
  <div class="form-section"><div class="form-section-title">Date</div>
    <div class="form-row"><label class="form-label">Agreement Date</label><input class="form-input" id="ds-date" type="date" oninput="render()"></div>
  </div>
  <div class="form-section">
    <div class="doc-card" style="background:var(--surface-2);border:1px solid var(--border);margin-bottom:12px"><div class="doc-card-header" style="font-size:12px">⚠ Important Notice</div><div class="doc-card-body" style="font-size:11px;color:var(--ink-2)">This template is for informational purposes only. A divorce settlement agreement should be reviewed by a licensed family law attorney before filing with the court. Courts must approve the agreement before it becomes legally binding.</div></div>
    <button class="doc-btn doc-btn--gold" type="button" onclick="window.print()" style="width:100%">Download / Print PDF</button>
  </div>
</div>
<div class="doc-preview-panel">
  <div class="doc-preview-header"><span>Live Preview</span><span style="font-size:11px;color:var(--ink-3)">Updates as you type</span></div>
  <div class="legal-document" id="ds-preview"><div class="doc-title">DIVORCE SETTLEMENT AGREEMENT</div><div class="doc-subtitle">Fill in the form to see your agreement</div></div>
</div>
</div>
</main>
${footer()}
<script>
function gv(id){return(document.getElementById(id)||{}).value||'';}
function fld(v,ph){return v?'<span class="doc-field">'+v+'</span>':'<span class="doc-field empty">'+ph+'</span>';}
function toggleDsChildren(){document.getElementById('ds-children-section').style.display=gv('ds-has-children')==='yes'?'block':'none';}
document.getElementById('ds-alimony-type').addEventListener('change',function(){
  var show=this.value!=='none';
  document.getElementById('ds-alimony-row').style.display=show?'block':'none';
  document.getElementById('ds-alimony-duration-row').style.display=show?'block':'none';
  render();
});
function render(){
  var pet=gv('ds-petitioner'),res=gv('ds-respondent');
  var married=gv('ds-married'),separated=gv('ds-separated');
  var county=gv('ds-county'),state=gv('ds-state'),dateStr=gv('ds-date');
  var hasChildren=gv('ds-has-children')==='yes';
  var children=gv('ds-children'),custody=gv('ds-custody'),csAmt=gv('ds-child-support'),csPayer=gv('ds-cs-payer');
  var alimonyType=gv('ds-alimony-type'),alimony=gv('ds-alimony'),alimonyDur=gv('ds-alimony-duration');
  var re=gv('ds-realestate'),vehicles=gv('ds-vehicles'),assets=gv('ds-assets'),debts=gv('ds-debts');
  var out='<div class="doc-title">DIVORCE SETTLEMENT AGREEMENT</div>';
  out+='<p class="doc-clause">This Divorce Settlement Agreement ("Agreement") is entered into as of '+fld(dateStr,'[Date]')
      +' between '+fld(pet,'[Petitioner]')+' ("Petitioner") and '+fld(res,'[Respondent]')+' ("Respondent").</p>';
  out+='<p class="doc-clause"><span class="doc-label">1. MARRIAGE FACTS</span><br>The parties were married on '+fld(married,'[Marriage Date]')+'.'+(separated?' They have lived separate and apart since '+separated+'.':'')+'<br>This Agreement is filed in '+fld(county,'[County]')+' County, '+fld(state,'[State]')+'.</p>';
  if(hasChildren){
    var custodyDesc={
      'joint-physical':'Joint physical custody — children will reside with each parent on an agreed schedule',
      'petitioner-primary':'Primary physical custody to Petitioner; Respondent has reasonable visitation rights',
      'respondent-primary':'Primary physical custody to Respondent; Petitioner has reasonable visitation rights'
    };
    out+='<p class="doc-clause"><span class="doc-label">2. CHILDREN</span><br>The parties have the following minor children: <strong>'+fld(children,'[Children]')+'</strong>.<br>'
        +'The parties agree to the following custody arrangement: '+fld(custodyDesc[custody]||custody,'[custody arrangement]')+'.<br>'
        +'Both parties shall share legal custody and major decisions shall be made jointly.</p>';
    if(csAmt){
      out+='<p class="doc-clause"><span class="doc-label">3. CHILD SUPPORT</span><br>'
          +fld(csPayer==='petitioner'?pet:res,'[Payer]')+' shall pay '+fld(csPayer==='petitioner'?res:pet,'[Recipient]')
          +' child support in the amount of <strong>$'+parseFloat(csAmt).toLocaleString('en-US',{minimumFractionDigits:2})+'</strong> per month, beginning on the 1st of the month following court approval.</p>';
    }
  }
  if(alimonyType!=='none'&&alimony){
    var artNum=hasChildren?'4.':'2.';
    var payer=alimonyType==='petitioner-pays'?fld(pet,'[Petitioner]'):fld(res,'[Respondent]');
    var recipient=alimonyType==='petitioner-pays'?fld(res,'[Respondent]'):fld(pet,'[Petitioner]');
    out+='<p class="doc-clause"><span class="doc-label">'+artNum+' SPOUSAL SUPPORT</span><br>'
        +payer+' shall pay '+recipient+' spousal support ("alimony") of <strong>$'+parseFloat(alimony).toLocaleString('en-US',{minimumFractionDigits:2})+'</strong> per month'
        +(alimonyDur?' for '+alimonyDur:'')+'.</p>';
  }
  var propArt=hasChildren?(alimonyType!=='none'&&alimony?5:4):2;
  out+='<p class="doc-clause"><span class="doc-label">'+propArt+'. PROPERTY DIVISION</span><br>';
  if(re){out+='<strong>Real Estate:</strong> '+re+'<br>';}
  if(vehicles){out+='<strong>Vehicles:</strong> '+vehicles+'<br>';}
  if(assets){out+='<strong>Bank Accounts &amp; Assets:</strong> '+assets+'<br>';}
  if(debts){out+='<strong>Debts:</strong> '+debts;}
  if(!re&&!vehicles&&!assets&&!debts){out+=fld('','[Describe property division]');}
  out+='</p>';
  out+='<p class="doc-clause"><span class="doc-label">'+(propArt+1)+'. FULL DISCLOSURE &amp; FINALITY</span><br>The parties acknowledge that this Agreement was entered into voluntarily after full disclosure of all assets and liabilities. This Agreement, when approved by the court, shall be incorporated into and survive the Final Decree of Divorce.</p>';
  out+='<div class="doc-sig-block"><p class="doc-label">Signatures — Both parties must sign before a notary</p>'
      +'<table class="doc-sig-table"><tbody>'
      +'<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">Petitioner — '+fld(pet,'[Petitioner Name]')+'</span></td><td><div class="doc-sig-line"></div><span class="doc-sig-label">Date</span></td></tr>'
      +'<tr style="height:20px"><td></td></tr>'
      +'<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">Respondent — '+fld(res,'[Respondent Name]')+'</span></td><td><div class="doc-sig-line"></div><span class="doc-sig-label">Date</span></td></tr>'
      +'</tbody></table></div>';
  document.getElementById('ds-preview').innerHTML=out;
}
render();
</script>
</body></html>`);
console.log('divorce-settlement ok');

console.log('\n=== ALL TEMPLATES WRITTEN ===');
