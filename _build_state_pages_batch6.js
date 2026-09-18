const fs = require('fs');
const B = 'C:/Users/mastr/claude co/legal-docs/';
const STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

// Personal loan: usury=max rate, tip
const PL = {
  'Alabama':{'usury':'8% written contract','tip':'Alabama caps personal loan interest at 8% by written agreement; higher rates require a lending license.'},
  'Alaska':{'usury':'10.5% or 5% above Fed rate','tip':'Alaska personal loan rates are capped at 10.5% or 5% above the Federal Reserve discount rate.'},
  'Arizona':{'usury':'No limit for written contracts','tip':'Arizona has no usury limit for written personal loan agreements; parties set rates by agreement.'},
  'Arkansas':{'usury':'5% above Fed discount rate','tip':'Arkansas strictly enforces usury limits; lenders who violate Arkansas usury law forfeit all interest.'},
  'California':{'usury':'10% non-exempt lenders','tip':'California caps personal loans from non-licensed lenders at 10%; document the loan in writing.'},
  'Colorado':{'usury':'45% APR cap','tip':'Colorado caps most consumer loans at 45% APR; personal loans between individuals generally follow this.'},
  'Connecticut':{'usury':'12% general','tip':'Connecticut\'s general usury limit is 12% for personal loans between individuals.'},
  'Delaware':{'usury':'No limit written contracts','tip':'Delaware has no usury limit for written personal loan agreements — a key reason financial companies use DE.'},
  'Florida':{'usury':'18% personal','tip':'Florida caps personal loan interest at 18%; criminal usury begins above 45%.'},
  'Georgia':{'usury':'16% personal loans','tip':'Georgia caps personal loan interest at 16% annually; document the agreement in writing.'},
  'Hawaii':{'usury':'10% consumer','tip':'Hawaii limits consumer loan interest to 10% per year; business-to-business loans differ.'},
  'Idaho':{'usury':'No statutory max for written contracts','tip':'Idaho has no general usury limit for written loan contracts; document all terms carefully.'},
  'Illinois':{'usury':'9% general / higher by contract','tip':'Illinois allows written contracts to specify rates above the 9% general limit; document clearly.'},
  'Indiana':{'usury':'21% consumer loans','tip':'Indiana caps consumer loans at 21% annually; written loan agreements must state the interest rate.'},
  'Iowa':{'usury':'5% above Fed rate (min 7.5%)','tip':'Iowa ties its usury limit to Federal Reserve rates; document the rate and payment schedule.'},
  'Kansas':{'usury':'15% consumer loans','tip':'Kansas caps consumer loan interest at 15% annually for loans between individuals.'},
  'Kentucky':{'usury':'4% above Fed discount rate','tip':'Kentucky\'s usury ceiling is 4% above the Federal Reserve rate; written contracts may set a specific agreed rate.'},
  'Louisiana':{'usury':'12% general','tip':'Louisiana caps consumer interest at 12% generally; civil law principles apply to loan agreements.'},
  'Maine':{'usury':'18% consumer','tip':'Maine caps personal loan interest at 18% annually; no cap applies to commercial loans.'},
  'Maryland':{'usury':'6% general','tip':'Maryland\'s general usury rate is 6%; the loan agreement should specify the rate clearly in writing.'},
  'Massachusetts':{'usury':'20% annual consumer','tip':'Massachusetts caps consumer loan interest at 20% annually; document all loan terms in writing.'},
  'Michigan':{'usury':'7% legal / 25% by contract','tip':'Michigan allows up to 25% by written contract for personal loans; document the agreement carefully.'},
  'Minnesota':{'usury':'8% general / market with contract','tip':'Minnesota\'s general rate is 8%; written contracts can set market rates for most personal loans.'},
  'Mississippi':{'usury':'10% general','tip':'Mississippi caps most personal loans at 10%; written agreements may specify the exact rate.'},
  'Missouri':{'usury':'Market rate with written contract','tip':'Missouri allows any rate agreed to in a written contract; the legal rate without a contract is 9%.'},
  'Montana':{'usury':'6% general / 10% by contract','tip':'Montana allows up to 10% by written agreement; document the loan amount and repayment schedule.'},
  'Nebraska':{'usury':'16% consumer','tip':'Nebraska caps personal loan interest at 16%; both parties should sign the written loan agreement.'},
  'Nevada':{'usury':'No statutory maximum','tip':'Nevada has no general usury limit for written personal loan agreements.'},
  'New Hampshire':{'usury':'No limit written contracts','tip':'New Hampshire has no usury limit for written personal loan agreements between individuals.'},
  'New Jersey':{'usury':'16% consumer','tip':'New Jersey caps consumer loans at 16%; criminal usury begins at 30%.'},
  'New Mexico':{'usury':'36% consumer APR cap','tip':'New Mexico caps consumer loans at 36% APR; lower rates are typical for personal loans between individuals.'},
  'New York':{'usury':'16% civil / 25% criminal','tip':'New York strictly caps civil usury at 16%; criminal usury begins at 25%. These limits are enforced.'},
  'North Carolina':{'usury':'16% written contract','tip':'North Carolina caps written personal loan interest at 16% for most consumer loans.'},
  'North Dakota':{'usury':'7% by written contract','tip':'North Dakota allows up to 7% by written contract; lower rates are common for family loans.'},
  'Ohio':{'usury':'21% by written contract','tip':'Ohio allows up to 21% by written contract; the general rate is 8% without a specific agreement.'},
  'Oklahoma':{'usury':'10% by written contract','tip':'Oklahoma allows up to 10% in a written personal loan agreement; document all terms.'},
  'Oregon':{'usury':'12% by written contract','tip':'Oregon caps most personal loans at 12% by written agreement; document the repayment schedule.'},
  'Pennsylvania':{'usury':'6% unlicensed / 24% licensed','tip':'Pennsylvania caps unlicensed personal lenders at 6%; licensed consumer lenders may charge up to 24%.'},
  'Rhode Island':{'usury':'21% consumer credit','tip':'Rhode Island caps consumer credit at 21%; document the loan in writing with a clear repayment schedule.'},
  'South Carolina':{'usury':'8.75% general','tip':'South Carolina allows higher rates by written agreement; the general rate is 8.75%.'},
  'South Dakota':{'usury':'No limit written contracts','tip':'South Dakota has no usury limit for written personal loan agreements.'},
  'Tennessee':{'usury':'10% general / 24% licensed','tip':'Tennessee caps general personal lending at 10%; document all terms clearly in the loan agreement.'},
  'Texas':{'usury':'10% personal / 18% commercial','tip':'Texas caps most personal loan interest at 10% absent a specific written agreement.'},
  'Utah':{'usury':'No limit written contracts','tip':'Utah has no usury ceiling for written personal loan agreements; document terms carefully.'},
  'Vermont':{'usury':'12% civil limit','tip':'Vermont caps civil loan interest at 12%; document the loan amount, interest rate, and repayment terms.'},
  'Virginia':{'usury':'12% consumer loans','tip':'Virginia caps personal loan interest at 12% annually; use a written agreement for any significant loan.'},
  'Washington':{'usury':'12% per annum','tip':'Washington caps most personal loans at 12% per year; violations may void the interest portion.'},
  'West Virginia':{'usury':'8% general','tip':'West Virginia allows higher rates by written contract; the general legal rate is 8%.'},
  'Wisconsin':{'usury':'No limit written contracts','tip':'Wisconsin has no usury limit for written personal loan agreements; document all terms.'},
  'Wyoming':{'usury':'7% general / market by contract','tip':'Wyoming\'s general rate is 7%; written contracts may set market rates for personal loans.'}
};

// Roommate: subletting=landlord consent, tip
const RM = {
  'Alabama':{'sublet':'Requires landlord consent','tip':'Alabama roommate agreements should address rent splits, utilities, and house rules in writing.'},
  'Alaska':{'sublet':'Requires landlord consent','tip':'Alaska roommate agreements are not legally required but help prevent disputes between tenants.'},
  'Arizona':{'sublet':'Requires landlord consent','tip':'Arizona roommate agreements should include an exit clause if one roommate wants to leave early.'},
  'Arkansas':{'sublet':'Requires landlord consent','tip':'Arkansas roommate agreements should address how rent is collected and paid to the landlord.'},
  'California':{'sublet':'Requires landlord consent usually','tip':'California roommates may each have independent tenancy rights; get a written roommate agreement.'},
  'Colorado':{'sublet':'Requires landlord consent','tip':'Colorado roommate agreements should address cleaning duties, guests, and noise policies.'},
  'Connecticut':{'sublet':'Requires landlord consent','tip':'Connecticut roommate agreements should specify how shared utilities and internet costs are split.'},
  'Delaware':{'sublet':'Requires landlord consent','tip':'Delaware roommate agreements should include what happens if one roommate fails to pay rent.'},
  'Florida':{'sublet':'Requires landlord consent','tip':'Florida roommate agreements should address early termination and deposit refund procedures.'},
  'Georgia':{'sublet':'Requires landlord consent','tip':'Georgia roommate agreements help prevent disputes about chores, guests, and shared expenses.'},
  'Hawaii':{'sublet':'Requires landlord consent','tip':'Hawaii roommate agreements should address the high cost of living and how shared costs are managed.'},
  'Idaho':{'sublet':'Requires landlord consent','tip':'Idaho roommate agreements should address pets, smoking, and overnight guest policies.'},
  'Illinois':{'sublet':'Requires landlord consent','tip':'Illinois roommate agreements should include all roommates\' names and their share of rent.'},
  'Indiana':{'sublet':'Requires landlord consent','tip':'Indiana roommate agreements should address what happens when the lease ends and one roommate wants to stay.'},
  'Iowa':{'sublet':'Requires landlord consent','tip':'Iowa roommate agreements should cover shared household chores, cleaning, and quiet hours.'},
  'Kansas':{'sublet':'Requires landlord consent','tip':'Kansas roommate agreements should address parking assignments and storage responsibilities.'},
  'Kentucky':{'sublet':'Requires landlord consent','tip':'Kentucky roommate agreements should address what happens if a roommate is asked to leave early.'},
  'Louisiana':{'sublet':'Requires landlord consent','tip':'Louisiana roommate agreements should address how the security deposit refund will be divided.'},
  'Maine':{'sublet':'Requires landlord consent','tip':'Maine roommate agreements should address winter utility costs, which are significant in Maine.'},
  'Maryland':{'sublet':'Requires landlord consent','tip':'Maryland roommate agreements should specify how shared expenses like renters\' insurance are handled.'},
  'Massachusetts':{'sublet':'Requires landlord consent','tip':'Massachusetts roommate agreements should clarify whether all tenants are on the master lease.'},
  'Michigan':{'sublet':'Requires landlord consent','tip':'Michigan roommate agreements should address winter utilities and snow removal responsibilities.'},
  'Minnesota':{'sublet':'Requires landlord consent','tip':'Minnesota roommate agreements should address what happens if one roommate must leave mid-lease.'},
  'Mississippi':{'sublet':'Requires landlord consent','tip':'Mississippi roommate agreements should include a clear rent payment schedule and due dates.'},
  'Missouri':{'sublet':'Requires landlord consent','tip':'Missouri roommate agreements should address shared cleaning duties and common area rules.'},
  'Montana':{'sublet':'Requires landlord consent','tip':'Montana roommate agreements should include utility responsibilities and heating cost splits.'},
  'Nebraska':{'sublet':'Requires landlord consent','tip':'Nebraska roommate agreements should address overnight guests, pet policies, and noise limits.'},
  'Nevada':{'sublet':'Requires landlord consent','tip':'Nevada roommate agreements should address Las Vegas-specific policies like visitor hours and common areas.'},
  'New Hampshire':{'sublet':'Requires landlord consent','tip':'New Hampshire roommate agreements should cover heating and utility costs, especially in winter.'},
  'New Jersey':{'sublet':'Requires landlord consent','tip':'New Jersey roommate agreements should address what happens if one roommate is evicted.'},
  'New Mexico':{'sublet':'Requires landlord consent','tip':'New Mexico roommate agreements should include rent amounts, due dates, and shared utility splits.'},
  'New York':{'sublet':'NYC may have subletting rights','tip':'New York City tenants may have subletting rights; outside NYC, landlord consent is typically required.'},
  'North Carolina':{'sublet':'Requires landlord consent','tip':'North Carolina roommate agreements should address early termination fees if one roommate leaves.'},
  'North Dakota':{'sublet':'Requires landlord consent','tip':'North Dakota roommate agreements should address winter utilities and heating responsibilities.'},
  'Ohio':{'sublet':'Requires landlord consent','tip':'Ohio roommate agreements should include all cost-sharing arrangements in writing to avoid disputes.'},
  'Oklahoma':{'sublet':'Requires landlord consent','tip':'Oklahoma roommate agreements should cover shared expenses, cleaning duties, and quiet hours.'},
  'Oregon':{'sublet':'Requires landlord consent','tip':'Oregon roommate agreements should address the high rents in Portland and other cities.'},
  'Pennsylvania':{'sublet':'Requires landlord consent','tip':'Pennsylvania roommate agreements should address what happens if a roommate loses their job.'},
  'Rhode Island':{'sublet':'Requires landlord consent','tip':'Rhode Island roommate agreements should cover utilities, internet, and cable TV cost splits.'},
  'South Carolina':{'sublet':'Requires landlord consent','tip':'South Carolina roommate agreements should address guests and overnight visitor policies.'},
  'South Dakota':{'sublet':'Requires landlord consent','tip':'South Dakota roommate agreements should cover heating costs in winter and shared chores.'},
  'Tennessee':{'sublet':'Requires landlord consent','tip':'Tennessee roommate agreements should address Nashville\'s short-term rental rules if applicable.'},
  'Texas':{'sublet':'Requires landlord consent','tip':'Texas roommate agreements should include who pays which utilities and when the rent is due.'},
  'Utah':{'sublet':'Requires landlord consent','tip':'Utah roommate agreements should address who contacts the landlord for maintenance issues.'},
  'Vermont':{'sublet':'Requires landlord consent','tip':'Vermont roommate agreements should cover heating costs, which are high in winter months.'},
  'Virginia':{'sublet':'Requires landlord consent','tip':'Virginia roommate agreements should address noise rules, guest policies, and cleaning duties.'},
  'Washington':{'sublet':'Requires landlord consent','tip':'Washington roommate agreements should address Seattle-area high rents and utility sharing.'},
  'West Virginia':{'sublet':'Requires landlord consent','tip':'West Virginia roommate agreements should cover shared utilities and household chores.'},
  'Wisconsin':{'sublet':'Requires landlord consent','tip':'Wisconsin roommate agreements should address winter heating costs and snow removal duties.'},
  'Wyoming':{'sublet':'Requires landlord consent','tip':'Wyoming roommate agreements should include rent amounts, due dates, and utility responsibilities.'}
};

function sg(slug) {
  return STATES.map(function(s) {
    return '<a href="/' + s.toLowerCase().replace(/ /g,'-') + '-' + slug + '" style="display:block;padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-weight:500;color:var(--ink-1);text-decoration:none" onmouseover="this.style.borderColor=\'var(--accent)\';this.style.background=\'var(--surface-2)\'" onmouseout="this.style.borderColor=\'var(--border)\';this.style.background=\'\'">' + s + '</a>';
  }).join('');
}

var NAV = '<header class="site-header"><div class="header-inner"><a href="/" class="site-logo">FreeDoc<span>Templates</span></a><nav class="main-nav" aria-label="Main"><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Personal <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/personal-loan-agreement-template" class="nav-item">Personal Loan Agreement</a><a href="/roommate-agreement-template" class="nav-item">Roommate Agreement</a><a href="/promissory-note-template" class="nav-item">Promissory Note</a></div></div><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Property <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/lease-agreement-template" class="nav-item">Lease Agreement</a><a href="/eviction-notice-template" class="nav-item">Eviction Notice</a><a href="/notice-to-vacate-template" class="nav-item">Notice to Vacate</a></div></div></nav><div class="header-actions"><a href="/tools" class="btn-all-tools">All Templates</a><button id="btn-search" class="btn-search" aria-label="Search templates"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></button></div></div></header><div class="cmd-overlay" id="cmd-overlay"><div class="cmd-modal"><div class="cmd-header"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input class="cmd-input" id="cmd-input" placeholder="Search templates\u2026" autocomplete="off"></div><div class="cmd-body" id="cmd-body"></div></div></div>';

var FTR = '<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p></div><div><div class="footer-col-title">Templates</div><nav class="footer-nav"><a href="/personal-loan-agreement-template">Personal Loan</a><a href="/roommate-agreement-template">Roommate Agreement</a><a href="/promissory-note-template">Promissory Note</a></nav></div></div><div class="footer-bottom"><p>\u00a9 2026 FreeDocTemplates.xyz</p></div></div></footer>';

function wrap(title, desc, canon, body) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + '</title><meta name="description" content="' + desc + '"><link rel="canonical" href="https://www.freedoctemplates.xyz/' + canon + '"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=1"></head><body>' + NAV + '<main class="page-wrap">' + body + '</main>' + FTR + '<script src="/shared/scripts.js?v=1" defer><\/script></body></html>';
}

function plPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/personal-loan-agreement-template">Personal Loan Agreement</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Personal Loan Agreement Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; Max rate: ' + d.usury + '</span><span class="page-badge">&#10003; With or without interest</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' Personal Loan Requirements</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Maximum Interest Rate</td><td style="padding:10px 0;font-weight:600">' + d.usury + '</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Notarization Required</td><td style="padding:10px 0;font-weight:600">Not required (recommended)</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Written Agreement Required</td><td style="padding:10px 0;font-weight:600">Strongly recommended</td></tr>'
    + '</table>'
    + '</div>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Personal Loans in ' + state + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">A personal loan agreement in ' + state + ' documents a loan between two individuals — commonly between family members, friends, or colleagues. The maximum interest rate allowed is <strong>' + d.usury + '</strong>. Charging above this limit may cause the interest (or the entire note) to be unenforceable.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">For loans of $10,000 or more between family members, the IRS requires a minimum interest rate (the Applicable Federal Rate, or AFR) to avoid characterizing the loan as a gift. Always document family loans with a signed written agreement and keep records of all payments.</p>'
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/personal-loan-agreement-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' Loan Agreement &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' personal loan questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">What is the maximum interest rate for a personal loan in ' + state + '?</summary><div class="faq-a">The maximum interest rate for a personal loan in ' + state + ' is <strong>' + d.usury + '</strong>. Charging above this rate may result in the lender forfeiting all interest or facing other penalties under ' + state + ' usury law. Always state the interest rate in writing.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does a personal loan agreement need to be notarized in ' + state + '?</summary><div class="faq-a">A personal loan agreement in ' + state + ' does not legally need to be notarized to be enforceable. Both parties should sign the agreement, with each keeping a copy. Notarization adds credibility and is recommended for larger loan amounts.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What happens if someone doesn\'t repay a personal loan in ' + state + '?</summary><div class="faq-a">If the borrower defaults, the lender should send a written demand for payment first. If the borrower still does not pay, the lender can sue in ' + state + ' small claims court (for smaller amounts) or civil court. The signed loan agreement is the primary evidence of the debt and the repayment terms.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Are loans between family members enforceable in ' + state + '?</summary><div class="faq-a">Yes. Loans between family members in ' + state + ' are legally enforceable if documented in a signed written agreement. Without documentation, it can be difficult to distinguish a loan from a gift if a dispute arises. A written agreement with a repayment schedule protects both parties.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px"><p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Personal Loan Agreement by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Maximum interest rates and personal loan laws vary by state.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('personal-loan-agreement-template') + '</div>'
    + '</section></div>';
  return wrap('Free ' + state + ' Personal Loan Agreement Template 2026', 'Free ' + state + ' personal loan agreement template. Max rate: ' + d.usury + '. Family or friend loans. With or without interest. Download PDF.', sl + '-personal-loan-agreement-template', body);
}

function rmPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/roommate-agreement-template">Roommate Agreement</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Roommate Agreement Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; Up to 6 roommates</span><span class="page-badge">&#10003; Rent split calculator</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' Roommate Agreement Overview</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Adding a New Roommate / Subletting</td><td style="padding:10px 0;font-weight:600">' + d.sublet + '</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Legally Required</td><td style="padding:10px 0;font-weight:600">Not required (strongly recommended)</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Enforceable as Contract</td><td style="padding:10px 0;font-weight:600">Yes, when signed by all roommates</td></tr>'
    + '</table>'
    + '</div>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Roommate Agreements in ' + state + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">A roommate agreement in ' + state + ' is a private contract between co-tenants that governs how the shared space will be managed. It covers rent splits, utility shares, cleaning duties, guest policies, quiet hours, and what happens if a roommate needs to leave early.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">A roommate agreement is separate from the lease — it does not change who is responsible to the landlord. If all roommates are on the master lease, all are jointly liable for the full rent. The roommate agreement governs the relationship <em>between</em> the tenants.</p>'
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/roommate-agreement-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' Roommate Agreement &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' roommate agreement questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Is a roommate agreement legally enforceable in ' + state + '?</summary><div class="faq-a">Yes. A signed roommate agreement in ' + state + ' is an enforceable contract between co-tenants. If a roommate violates the agreement — for example, by not paying their share of rent — the other roommates can pursue legal action to recover the unpaid amount in small claims court.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does a roommate agreement override the master lease in ' + state + '?</summary><div class="faq-a">No. The master lease between the tenant(s) and the landlord takes priority. A roommate agreement governs the relationship between co-tenants, not the relationship with the landlord. All tenants on the master lease remain jointly and individually responsible for the full rent.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Can I add a new roommate in ' + state + ' without telling the landlord?</summary><div class="faq-a">Generally no. In ' + state + ', adding a new occupant or subletting typically ' + d.sublet.toLowerCase() + '. Check your lease agreement for specific subletting provisions. Violating the lease by adding an unauthorized occupant could result in an eviction notice.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What should a roommate agreement include?</summary><div class="faq-a">A good roommate agreement should include: (1) each roommate\'s rent share, (2) how utilities are split, (3) a cleaning schedule, (4) guest and overnight visitor policies, (5) quiet hours, (6) what happens if a roommate wants to leave before the lease ends, and (7) how the security deposit will be divided when you move out.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px"><p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Roommate Agreement Template by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Subletting rules and tenant rights vary by state.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('roommate-agreement-template') + '</div>'
    + '</section></div>';
  return wrap('Free ' + state + ' Roommate Agreement Template 2026', 'Free ' + state + ' roommate agreement template. Rent split, utilities, house rules, and guest policies. Up to 6 roommates. Download PDF.', sl + '-roommate-agreement-template', body);
}

var pc = 0, rc = 0;
STATES.forEach(function(s) {
  var sl = s.toLowerCase().replace(/ /g, '-');
  fs.writeFileSync(B + sl + '-personal-loan-agreement-template.html', plPage(s, PL[s]));
  pc++;
  fs.writeFileSync(B + sl + '-roommate-agreement-template.html', rmPage(s, RM[s]));
  rc++;
});
console.log('Personal Loan:', pc, '| Roommate:', rc, '| Total:', pc + rc);
