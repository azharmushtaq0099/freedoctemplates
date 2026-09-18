const fs = require('fs');
const path = require('path');

// ─── STATE DATA ──────────────────────────────────────────────────────────────
const LEASE_DATA = {
  'California':     { depositLimit:'2 months rent (unfurnished), 3 months (furnished)',   noticeToEnter:'24 hours',  depositReturn:'21 days',  rentControl:true,  tip:'California AB 1482 caps annual rent increases at 5% + CPI for qualifying properties. Requires just-cause for eviction after 12 months.' },
  'Texas':          { depositLimit:'No statutory limit',                                   noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'30 days', rentControl:false, tip:'Texas is landlord-friendly with no statewide rent control. Landlords must repair conditions materially affecting health/safety within a reasonable time.' },
  'Florida':        { depositLimit:'No statutory limit',                                   noticeToEnter:'12 hours',  depositReturn:'15 days (written claim) or 60 days (no claim)', rentControl:false, tip:'Florida requires written notice of security deposit handling method. 3-day notice for non-payment, 7-day notice for lease violations.' },
  'New York':       { depositLimit:'1 month rent (since HSTPA 2019)',                      noticeToEnter:'Reasonable notice', depositReturn:'14 days',  rentControl:true,  tip:'New York City and many municipalities have rent stabilization. The Housing Stability and Tenant Protection Act (2019) significantly strengthened tenant rights statewide.' },
  'Illinois':       { depositLimit:'No statutory limit (Chicago: 1.5x monthly rent)',      noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'30 days', rentControl:false, tip:'Chicago has the Residential Landlord and Tenant Ordinance (RLTO) with strict tenant protections. Verify local ordinances before renting in Chicago or Cook County.' },
  'Pennsylvania':   { depositLimit:'2 months rent (first year); 1 month thereafter',       noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'30 days', rentControl:false, tip:'After year one, Pennsylvania landlords must reduce the security deposit to one month\'s rent. Must provide itemized deduction list with refund.' },
  'Georgia':        { depositLimit:'No statutory limit',                                   noticeToEnter:'No statute',depositReturn:'30 days', rentControl:false, tip:'Georgia landlords must provide a written statement of damages deducted from the deposit within 30 days. Failure to comply forfeits the right to deduct.' },
  'Ohio':           { depositLimit:'No statutory limit',                                   noticeToEnter:'24 hours', depositReturn:'30 days', rentControl:false, tip:'Ohio landlords must hold security deposits in a separate account and pay 5% annual interest on deposits held over 6 months on leases over 6 months.' },
  'Arizona':        { depositLimit:'1.5 months rent',                                      noticeToEnter:'2 days',   depositReturn:'14 days', rentControl:false, tip:'Arizona has a strong landlord-friendly environment with no rent control statewide. The 2-day notice to enter is one of the shortest in the country.' },
  'North Carolina': { depositLimit:'2 months rent (month-to-month: 1.5 months)',           noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'30 days', rentControl:false, tip:'North Carolina caps deposits at 2 months for fixed leases. Week-to-week tenancies cap at 2 weeks. Security deposits must be held in a trust account.' },
  'Washington':     { depositLimit:'No statutory limit',                                   noticeToEnter:'2 days',   depositReturn:'21 days', rentControl:false, tip:'Washington requires itemized deposit accounting within 21 days. Seattle and other cities have just-cause eviction requirements and move-in fee limitations.' },
  'Colorado':       { depositLimit:'No statutory limit',                                   noticeToEnter:'24 hours', depositReturn:'30 days (60 days if disputed)', rentControl:false, tip:'Colorado passed the Tenants Bill of Rights (2024). Landlords must offer lease renewal, provide 90-day notice of non-renewal, and limit late fees to the greater of $50 or 5% of monthly rent.' },
  'Nevada':         { depositLimit:'3 months rent',                                        noticeToEnter:'24 hours', depositReturn:'30 days', rentControl:false, tip:'Nevada caps the security deposit at 3 months rent. Las Vegas and Clark County have no rent control. Landlords must provide itemized deductions within 30 days.' },
  'Michigan':       { depositLimit:'1.5 months rent',                                      noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'30 days', rentControl:false, tip:'Michigan has the Security Deposit Act requiring landlords to send a damage checklist within 7 days of move-in and itemized deductions within 30 days of move-out.' },
  'Virginia':       { depositLimit:'2 months rent',                                        noticeToEnter:'24 hours', depositReturn:'45 days', rentControl:false, tip:'Virginia\'s Residential Landlord and Tenant Act governs most rentals. Landlords must provide move-in inspection report. Security deposits must be returned within 45 days.' },
};

const BOS_DATA = {
  'California':     { notary:'Not required but recommended', odom:'Required for vehicles under 10 years old', titlingFee:'$15', tip:'California requires a smog check for most vehicle sales over 4 years old. The seller must provide a smog certification. A Lien Satisfied or DMV release may be needed if there is a lien.' },
  'Texas':          { notary:'Not required',                 odom:'Required for vehicles under 10 years old', titlingFee:'$28–33', tip:'Texas requires the seller to complete Form VTR-346 (Odometer Disclosure) for vehicles under 10 years old. Title transfer must be completed within 30 days.' },
  'Florida':        { notary:'Required',                     odom:'Required for vehicles under 10 years old', titlingFee:'$75.25', tip:'Florida requires notarization of the Bill of Sale AND the title signature. Bring government ID to the notary. Title transfer must be done within 30 days to avoid penalty fees.' },
  'New York':       { notary:'Not required',                 odom:'Required for vehicles under 10 years old', titlingFee:'$50',    tip:'New York requires a completed Form MV-912 (Statement of Transaction) for tax purposes. Submit to the DMV within 10 days. Sales tax is paid at the time of title transfer.' },
  'Ohio':           { notary:'Required',                     odom:'Required for vehicles under 10 years old', titlingFee:'$15',    tip:'Ohio requires the seller\'s signature on the title to be notarized. Complete form BMV 3771 for odometer disclosure. Title must be transferred within 30 days.' },
  'Georgia':        { notary:'Not required',                 odom:'Required for vehicles under 10 years old', titlingFee:'$18',    tip:'Georgia requires a completed Bill of Sale (Form T-7) for tag/title transfer. Emissions inspection may be required in certain counties (Atlanta metro). Title transfer within 30 days.' },
  'Pennsylvania':   { notary:'Not required',                 odom:'Required for vehicles under 10 years old', titlingFee:'$58',    tip:'Pennsylvania requires completing Form MV-4ST (Vehicle Sales and Use Tax Return) at time of title transfer. There is a 6% state sales tax on vehicle purchases.' },
  'Illinois':       { notary:'Not required',                 odom:'Required for vehicles under 10 years old', titlingFee:'$155',   tip:'Illinois has one of the highest title transfer fees. Private party sales require a Bill of Sale and odometer disclosure. Chicago adds a city sticker requirement for vehicles registered there.' },
  'Michigan':       { notary:'Not required',                 odom:'Required for vehicles under 10 years old', titlingFee:'$15',    tip:'Michigan requires the seller to remove their license plates — they do not transfer with the vehicle. Plates go with the seller, not the car. Title transfer must be done within 15 days.' },
  'Arizona':        { notary:'Not required',                 odom:'Required for vehicles under 10 years old', titlingFee:'$4',     tip:'Arizona has one of the lowest title fees. Emissions testing required in Maricopa and Pima counties. No sales tax on private party vehicle sales in Arizona (only on dealer sales).' },
};

const POA_DATA = {
  'California':  { witnesses:'2 witnesses OR notarization',      notary:'Required (or 2 witnesses)', tip:'California POA is governed by Probate Code Sections 4000–4465. A durable POA must include specific durability language. Healthcare POA (AHCD) requires either 2 witnesses or notarization, and specific witnesses (not care providers, not heirs) are required.' },
  'Texas':       { witnesses:'Not required',                      notary:'Required',                  tip:'Texas durable POA must use specific statutory language under the Durable Power of Attorney Act. The agent can use the "Certification of Authority" form to prove authority to third parties without showing the full POA document.' },
  'Florida':     { witnesses:'2 witnesses required',              notary:'Required',                  tip:'Florida requires 2 subscribing witnesses AND a notary. Florida law changed in 2011 and old POAs signed without witnesses may not be valid for healthcare decisions. Florida Statute Chapter 709 governs.' },
  'New York':    { witnesses:'2 witnesses required',              notary:'Required',                  tip:'New York has strict POA requirements under GOL Article 5. The document must be signed by the principal AND all agents in the presence of 2 witnesses and a notary. Banks may require a "Statutory Gifts Rider" for gifting authority.' },
  'Illinois':    { witnesses:'Not required',                      notary:'Required',                  tip:'Illinois POA for property (755 ILCS 45) and healthcare (755 ILCS 45, Art. 4) are separate documents. A statutory short-form POA provides a standardized, widely accepted format. No witnesses required — just notarization.' },
  'Pennsylvania':{ witnesses:'2 witnesses required',              notary:'Required',                  tip:'Pennsylvania requires 2 witnesses and notarization under the 2015 POA Act. The agent must also sign an acknowledgment. A notice to the principal must appear at the top of the document in a specific format.' },
  'Georgia':     { witnesses:'1 witness required',                notary:'Required',                  tip:'Georgia POA requires 1 witness and notarization. The witness cannot be the agent or a relative of the principal. A durable POA must include the specific statutory language from O.C.G.A. Section 10-6B-1.' },
  'Ohio':        { witnesses:'Not required',                      notary:'Required',                  tip:'Ohio adopted the Uniform Power of Attorney Act (effective 2012). Notarization is required. Signing in the presence of the notary constitutes the acknowledgment. Ohio courts presume good faith for agents acting under a POA.' },
  'Arizona':     { witnesses:'Not required',                      notary:'Required',                  tip:'Arizona adopted the Uniform Power of Attorney Act (A.R.S. Title 14, Chapter 12). Notarization is required but witnesses are not. The document must include a Notice to Agent if a statutory form is used.' },
  'Washington':  { witnesses:'Not required',                      notary:'Required',                  tip:'Washington adopted the Uniform Power of Attorney Act in 2017 (RCW 11.125). Notarization required but witnesses optional. Third parties (banks, etc.) are required by law to accept a properly executed POA unless they have a reasonable basis to refuse.' },
};

// ─── PAGE GENERATOR ───────────────────────────────────────────────────────────
function makeStatePage(template, state, data) {
  var slug, title, metaDesc, h1Sub, h1, legalBoxTitle, stateContent, guideTitle, guideBody, faqItems, relatedLinks;

  if (template === 'lease') {
    slug = state.toLowerCase().replace(/\s+/g,'-') + '-lease-agreement-template';
    title = 'Free ' + state + ' Lease Agreement Template 2026 | Fill In &amp; Download PDF';
    metaDesc = 'Free ' + state + ' residential lease agreement template 2026. ' + (data.rentControl?'Includes '+state+' rent control notes. ':'') + 'Security deposit limit: ' + data.depositLimit + '. Fill in, preview, download PDF. No sign-up.';
    h1 = 'Free ' + state + ' Lease Agreement';
    h1Sub = '2026 — Residential Rental';
    legalBoxTitle = state + ' Landlord-Tenant Law';
    stateContent = '<table class="doc-table" style="margin-bottom:0"><tbody>'
      +'<tr><td><strong>Security Deposit Limit</strong></td><td>'+data.depositLimit+'</td></tr>'
      +'<tr><td><strong>Notice to Enter</strong></td><td>'+data.noticeToEnter+'</td></tr>'
      +'<tr><td><strong>Deposit Return Deadline</strong></td><td>'+data.depositReturn+'</td></tr>'
      +'<tr><td><strong>Rent Control</strong></td><td>'+(data.rentControl?'Yes — applies in some areas':'No statewide rent control')+'</td></tr>'
      +'</tbody></table>'
      +'<p style="margin-top:10px;font-size:12px;color:#555"><strong>'+state+'-specific note:</strong> '+data.tip+'</p>';
    guideTitle = state + ' Lease Agreement — Key Legal Requirements';
    guideBody = '<p>'+state+' residential leases are governed by state landlord-tenant law. Key rules for '+state+' landlords and tenants:</p>'
      +'<ul>'
      +'<li><strong>Security deposit:</strong> '+data.depositLimit+'. Must be returned within '+data.depositReturn+' of move-out with itemized deductions.</li>'
      +'<li><strong>Entry notice:</strong> Landlords must give '+data.noticeToEnter+' advance notice for non-emergency entry.</li>'
      +(data.rentControl?'<li><strong>Rent control:</strong> Applies in certain '+state+' jurisdictions. Verify local rules before setting or raising rent.</li>':'')
      +'</ul>'
      +'<p>'+data.tip+'</p>';
    faqItems = [
      { q:'What is the maximum security deposit in '+state+'?', a:'In '+state+', the security deposit limit is: <strong>'+data.depositLimit+'</strong>. Collecting more than the legal limit exposes landlords to liability for double or triple damages in many states.' },
      { q:'How long does a landlord have to return the security deposit in '+state+'?', a:''+state+' landlords must return the security deposit within <strong>'+data.depositReturn+'</strong> of the tenant vacating, along with an itemized list of any deductions. Failure to comply forfeits the right to keep any portion of the deposit in many states.' },
      { q:'How much notice must a '+state+' landlord give before entering?', a:'In '+state+', landlords must provide <strong>'+data.noticeToEnter+'</strong> advance notice before entering a rental unit for non-emergency purposes. Emergency entries (fire, gas leak, flooding) are exempt from notice requirements.' },
      { q:'Is rent control legal in '+state+'?', a:(data.rentControl?'Yes, some municipalities in '+state+' have rent control or rent stabilization laws. '+data.tip:''+state+' does not have statewide rent control. Landlords may generally raise rent to market rate with proper notice (typically 30 days for month-to-month, or at lease renewal for fixed-term leases).') },
    ];
    relatedLinks = [
      { href:'/lease-agreement-template', label:'Standard Lease Agreement', desc:'For any state.' },
      { href:'/bill-of-sale-template', label:'Bill of Sale', desc:'Transfer property or vehicle ownership.' },
      { href:'/promissory-note-template', label:'Promissory Note', desc:'Document a loan or payment plan.' },
    ];

  } else if (template === 'bos') {
    slug = state.toLowerCase().replace(/\s+/g,'-') + '-bill-of-sale-template';
    title = 'Free ' + state + ' Bill of Sale Template 2026 | Fill In &amp; Download PDF';
    metaDesc = 'Free ' + state + ' bill of sale template 2026. Vehicle, boat, and general property. Notary ' + data.notary.toLowerCase() + '. Fill in, preview, download PDF. No sign-up.';
    h1 = 'Free ' + state + ' Bill of Sale';
    h1Sub = '2026 — Vehicle, Boat &amp; Property';
    legalBoxTitle = state + ' Bill of Sale Requirements';
    stateContent = '<table class="doc-table" style="margin-bottom:0"><tbody>'
      +'<tr><td><strong>Notary Requirement</strong></td><td>'+data.notary+'</td></tr>'
      +'<tr><td><strong>Odometer Disclosure</strong></td><td>'+data.odom+'</td></tr>'
      +'<tr><td><strong>Title Transfer Fee</strong></td><td>'+data.titlingFee+'</td></tr>'
      +'</tbody></table>'
      +'<p style="margin-top:10px;font-size:12px;color:#555"><strong>'+state+'-specific note:</strong> '+data.tip+'</p>';
    guideTitle = state + ' Bill of Sale — Key Requirements';
    guideBody = '<p>In '+state+', a bill of sale documents the private sale of a vehicle or personal property. Key '+state+'-specific rules:</p>'
      +'<ul>'
      +'<li><strong>Notary:</strong> '+data.notary+'.</li>'
      +'<li><strong>Odometer:</strong> '+data.odom+'.</li>'
      +'<li><strong>Title fee:</strong> '+data.titlingFee+' at the DMV/county clerk.</li>'
      +'</ul>'
      +'<p>'+data.tip+'</p>';
    faqItems = [
      { q:'Does a '+state+' bill of sale need to be notarized?', a:'In '+state+': <strong>'+data.notary+'</strong>. '+data.tip },
      { q:'How do I transfer a vehicle title in '+state+'?', a:'After completing the bill of sale, both parties sign the title. Take the signed title, bill of sale, and payment for the title transfer fee ('+data.titlingFee+') to the '+state+' DMV or county clerk. The buyer typically has 30 days to complete the transfer.' },
      { q:'What should a '+state+' bill of sale include?', a:'A valid '+state+' bill of sale should include: seller and buyer full names and addresses, vehicle description (year, make, model, VIN), sale price and date, odometer reading (for vehicles under 10 years old), and signatures of both parties'+(data.notary.includes('Required')?', notarized before a notary public':'')+'.' },
      { q:'Do I need a bill of sale for a private vehicle sale in '+state+'?', a:'Yes. While '+state+' may not always legally require a separate bill of sale (some states just use the title), a bill of sale protects both buyer and seller by documenting the transaction details, "as-is" condition, and agreed price. '+state+' requires a bill of sale or equivalent documentation for title transfer.' },
    ];
    relatedLinks = [
      { href:'/bill-of-sale-template', label:'Standard Bill of Sale', desc:'All states, all property types.' },
      { href:'/vehicle-bill-of-sale-template', label:'Vehicle Bill of Sale', desc:'Motor vehicle specific.' },
      { href:'/promissory-note-template', label:'Promissory Note', desc:'Finance the sale with a payment plan.' },
    ];

  } else { // poa
    slug = state.toLowerCase().replace(/\s+/g,'-') + '-power-of-attorney-template';
    title = 'Free ' + state + ' Power of Attorney Form 2026 | Fill In &amp; Download PDF';
    metaDesc = 'Free ' + state + ' power of attorney form 2026. General, durable, limited, and medical POA. ' + state + ' requires: ' + data.witnesses + ' + notary. Fill in, preview, download PDF.';
    h1 = 'Free ' + state + ' Power of Attorney Form';
    h1Sub = '2026';
    legalBoxTitle = state + ' POA Requirements';
    stateContent = '<table class="doc-table" style="margin-bottom:0"><tbody>'
      +'<tr><td><strong>Witnesses Required</strong></td><td>'+data.witnesses+'</td></tr>'
      +'<tr><td><strong>Notarization</strong></td><td>'+data.notary+'</td></tr>'
      +'</tbody></table>'
      +'<p style="margin-top:10px;font-size:12px;color:#555"><strong>'+state+'-specific note:</strong> '+data.tip+'</p>';
    guideTitle = state + ' Power of Attorney — Execution Requirements';
    guideBody = '<p>To be legally valid in '+state+', a power of attorney must be executed according to '+state+' state law:</p>'
      +'<ul>'
      +'<li><strong>Witnesses:</strong> '+data.witnesses+'</li>'
      +'<li><strong>Notarization:</strong> '+data.notary+'</li>'
      +'</ul>'
      +'<p>'+data.tip+'</p>'
      +'<p>After completing this form, sign it before a '+state+' notary public. Keep the original in a safe place and give copies to the agent, your bank, and any relevant healthcare providers.</p>';
    faqItems = [
      { q:'What are the signing requirements for a '+state+' power of attorney?', a:'In '+state+', a valid POA requires: <strong>'+data.witnesses+'</strong> and <strong>'+data.notary+'</strong>. '+data.tip },
      { q:'Does a '+state+' power of attorney need to be filed with the court?', a:'No — a '+state+' power of attorney is an internal document. You do not file it with any court or government agency unless it involves a real estate transaction, in which case it may need to be recorded with the county recorder.' },
      { q:'Can I use a '+state+' POA in another state?', a:'Generally yes. Most states honor a validly executed out-of-state POA, especially if it meets the more demanding state\'s requirements. If you need to use a '+state+' POA for real estate in another state, consult an attorney about that state\'s acceptance standards.' },
      { q:'How do I revoke a '+state+' power of attorney?', a:'To revoke a '+state+' POA: sign a written Notice of Revocation before a notary, deliver it to the agent, and notify any institutions (banks, healthcare providers) that relied on the POA. You should also collect and destroy existing copies of the original POA.' },
    ];
    relatedLinks = [
      { href:'/power-of-attorney-template', label:'Standard POA (all states)', desc:'General, durable, limited, and medical.' },
      { href:'/llc-operating-agreement-template', label:'LLC Operating Agreement', desc:'Authorize someone to manage your LLC.' },
      { href:'/bill-of-sale-template', label:'Bill of Sale', desc:'Transfer property ownership.' },
    ];
  }

  var mainLink = template==='lease' ? '/lease-agreement-template' : template==='bos' ? '/bill-of-sale-template' : '/power-of-attorney-template';
  var mainLabel = template==='lease' ? 'Lease Agreement' : template==='bos' ? 'Bill of Sale' : 'Power of Attorney';
  var preselect = template==='lease' ? 'la-state' : template==='bos' ? 'bos-state' : 'poa-state';
  var mainScript = template==='lease' ? '/lease-agreement-template' : template==='bos' ? '/bill-of-sale-template' : '/power-of-attorney-template';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${metaDesc}">
<link rel="canonical" href="https://www.freedoctemplates.xyz/${slug}">
<meta property="og:title" content="${title}">
<meta property="og:type" content="website">
<meta name="robots" content="index,follow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap">
<link rel="stylesheet" href="/shared/styles.css?v=1">
</head>
<body>
<header class="site-header">
  <div class="header-inner">
    <a href="/" class="site-logo">FreeDoc<span>Templates</span></a>
    <nav class="main-nav" aria-label="Main">
      <div class="nav-group">
        <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Business <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button>
        <div class="nav-dropdown"><a href="/invoice-template" class="nav-item">Invoice Template</a><a href="/nda-template" class="nav-item">NDA Template</a><a href="/independent-contractor-agreement-template" class="nav-item">Contractor Agreement</a></div>
      </div>
      <div class="nav-group">
        <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Personal <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button>
        <div class="nav-dropdown"><a href="/power-of-attorney-template" class="nav-item">Power of Attorney</a><a href="/llc-operating-agreement-template" class="nav-item">LLC Agreement</a><a href="/bill-of-sale-template" class="nav-item">Bill of Sale</a><a href="/lease-agreement-template" class="nav-item">Lease Agreement</a></div>
      </div>
    </nav>
    <div class="header-actions">
      <a href="/tools" class="btn-all-tools">All Templates</a>
    </div>
  </div>
</header>
<main class="page-wrap">
  <div class="container">
    <nav class="breadcrumb"><a href="/">Home</a><span>&#x203A;</span><a href="${mainLink}">${mainLabel}</a><span>&#x203A;</span><span aria-current="page">${state}</span></nav>
    <h1 class="page-title" data-enter>${h1} <span style="color:var(--ink-3);font-weight:400;font-size:.6em">${h1Sub}</span></h1>
    <p class="page-sub" data-enter data-delay="1">Fill in your ${state} details, see a live document preview, and download as PDF. Free, no sign-up, no watermark.</p>
    <div class="page-badges" data-enter data-delay="2">
      <span class="page-badge"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Free, no account</span>
      <span class="page-badge"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ${state}-specific</span>
      <span class="page-badge"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> PDF download</span>
    </div>

    <div class="doc-card" style="margin-bottom:24px;border-left:4px solid var(--accent)" data-enter>
      <div class="doc-card-header">${legalBoxTitle}</div>
      <div class="doc-card-body">${stateContent}</div>
    </div>

    <p style="font-size:14px;color:var(--ink-2);margin-bottom:24px">This page uses the same generator as our <a href="${mainLink}" style="color:var(--accent);font-weight:600">${mainLabel} template</a>, pre-set for ${state}. Fill in your details below.</p>

    <div style="text-align:center;padding:32px;border:2px dashed var(--border);border-radius:12px;margin-bottom:32px">
      <p style="font-size:15px;font-weight:700;color:var(--ink-1);margin-bottom:8px">Use the full ${mainLabel} generator</p>
      <p style="font-size:13px;color:var(--ink-3);margin-bottom:16px">Pre-filled for ${state} with all your state-specific legal requirements</p>
      <a href="${mainLink}?state=${encodeURIComponent(state)}" class="doc-btn doc-btn--gold" style="display:inline-flex;text-decoration:none">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        Open ${state} ${mainLabel} Generator
      </a>
    </div>

    <section class="article-section">
      <div class="article-body">
        <h2>${guideTitle}</h2>
        ${guideBody}
      </div>
    </section>

    <section class="faq-section" style="margin:48px -24px 0;padding:48px 24px">
      <div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:24px">${state} ${mainLabel} questions</h2></div>
      <div class="faq-list">
        ${faqItems.map(function(f){ return '<details class="faq-item"><summary class="faq-q">'+f.q+'</summary><div class="faq-a">'+f.a+'</div></details>'; }).join('')}
      </div>
    </section>

    <section class="related-section">
      <p class="section-eyebrow">Related Templates</p>
      <h2 class="section-title" style="font-size:22px;margin-bottom:16px">You might also need</h2>
      <div class="tools-grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">
        ${relatedLinks.map(function(r,i){ var icons=['tc-blue','tc-gold','tc-green']; return '<a href="'+r.href+'" class="tool-card"><div class="tc-icon '+icons[i]+'"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div><div class="tool-card-title">'+r.label+'</div><div class="tool-card-desc">'+r.desc+'</div></div></a>'; }).join('')}
      </div>
    </section>
  </div>
</main>
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p><p class="footer-disclaimer" style="margin-top:8px">Not a law firm. For informational use only. Consult a licensed attorney in ${state} for legal advice.</p></div>
      <div><div class="footer-col-title">Business</div><nav class="footer-nav"><a href="/invoice-template">Invoice</a><a href="/nda-template">NDA</a><a href="/independent-contractor-agreement-template">Contractor Agreement</a></nav></div>
      <div><div class="footer-col-title">Property</div><nav class="footer-nav"><a href="/lease-agreement-template">Lease Agreement</a><a href="/bill-of-sale-template">Bill of Sale</a></nav></div>
      <div><div class="footer-col-title">Personal</div><nav class="footer-nav"><a href="/power-of-attorney-template">Power of Attorney</a><a href="/llc-operating-agreement-template">LLC Agreement</a></nav></div>
    </div>
    <div class="footer-bottom"><p>&copy; 2026 FreeDocTemplates.xyz</p></div>
  </div>
</footer>
<script src="/shared/scripts.js?v=1" defer></script>
</body>
</html>`;
}

// ─── GENERATE ALL STATE PAGES ────────────────────────────────────────────────
var count = 0;
var base = 'C:/Users/mastr/claude co/legal-docs/';

Object.keys(LEASE_DATA).forEach(function(state) {
  var slug = state.toLowerCase().replace(/\s+/g,'-') + '-lease-agreement-template';
  fs.writeFileSync(base + slug + '.html', makeStatePage('lease', state, LEASE_DATA[state]));
  count++;
});

Object.keys(BOS_DATA).forEach(function(state) {
  var slug = state.toLowerCase().replace(/\s+/g,'-') + '-bill-of-sale-template';
  fs.writeFileSync(base + slug + '.html', makeStatePage('bos', state, BOS_DATA[state]));
  count++;
});

Object.keys(POA_DATA).forEach(function(state) {
  var slug = state.toLowerCase().replace(/\s+/g,'-') + '-power-of-attorney-template';
  fs.writeFileSync(base + slug + '.html', makeStatePage('poa', state, POA_DATA[state]));
  count++;
});

console.log('State pages generated:', count);
