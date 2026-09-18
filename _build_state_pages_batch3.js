const fs = require('fs');
const B = 'C:/Users/mastr/claude co/legal-docs/';
const STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

// LLC: fee=state filing fee, ann=annual report fee/franchise tax, tip
const LLC = {
  'Alabama':{'fee':'$200','ann':'$50/yr Business Privilege Tax','tip':'Alabama LLCs pay a minimum $50 annual business privilege tax filed with the Department of Revenue.'},
  'Alaska':{'fee':'$250','ann':'$100 biennial report','tip':'Alaska LLCs file a biennial report with the Division of Corporations; no separate franchise tax.'},
  'Arizona':{'fee':'$50','ann':'No report required','tip':'Arizona LLCs are not required to file annual reports; one of the simplest states for LLCs.'},
  'Arkansas':{'fee':'$50','ann':'$150 franchise tax','tip':'Arkansas charges a flat $150 franchise tax annually; report is due May 1 each year.'},
  'California':{'fee':'$70','ann':'$800 min. franchise tax + $20 SOS fee','tip':'California LLCs pay an $800 minimum franchise tax each year regardless of income or activity.'},
  'Colorado':{'fee':'$50','ann':'$10 periodic report','tip':'Colorado\'s $10 periodic report fee is among the lowest in the nation for LLCs.'},
  'Connecticut':{'fee':'$120','ann':'$80 annual report','tip':'Connecticut LLCs file an annual report with the Secretary of State by the LLC formation month.'},
  'Delaware':{'fee':'$110','ann':'$300 flat franchise tax','tip':'Delaware is the most popular LLC state for business reasons; franchise tax is a flat $300 per year.'},
  'Florida':{'fee':'$125','ann':'$138.75 annual report','tip':'Florida LLCs file an annual report; the fee increases if filed after May 1 each year.'},
  'Georgia':{'fee':'$100','ann':'$50 annual registration','tip':'Georgia LLCs pay a $50 annual registration fee; reports are due April 1.'},
  'Hawaii':{'fee':'$50','ann':'$15 annual report','tip':'Hawaii LLCs file annual reports with the Business Registration Division; fees are minimal.'},
  'Idaho':{'fee':'$100','ann':'$0 (annual report required but free)','tip':'Idaho LLCs file a free annual report with the Secretary of State.'},
  'Illinois':{'fee':'$150','ann':'$75 annual report','tip':'Illinois LLCs pay a $75 annual report fee due the first day of the LLC\'s anniversary month.'},
  'Indiana':{'fee':'$95','ann':'$31 biennial report','tip':'Indiana LLCs file a biennial report; the fee is $31 every two years.'},
  'Iowa':{'fee':'$50','ann':'$60 biennial report','tip':'Iowa LLCs file a biennial report; $60 every two years filed by April 1 in odd years.'},
  'Kansas':{'fee':'$160','ann':'$55 annual report','tip':'Kansas LLCs file an annual report by the 15th day of the 4th month after the fiscal year ends.'},
  'Kentucky':{'fee':'$40','ann':'$15 annual report','tip':'Kentucky has one of the lowest LLC formation fees at $40; annual report is $15.'},
  'Louisiana':{'fee':'$100','ann':'$30 annual report','tip':'Louisiana LLCs file a $30 annual report with the Secretary of State.'},
  'Maine':{'fee':'$175','ann':'$85 annual report','tip':'Maine LLCs file an annual report by June 1 each year; $85 filing fee.'},
  'Maryland':{'fee':'$100','ann':'$300 personal property return','tip':'Maryland LLCs file an annual personal property return; minimum $300 fee.'},
  'Massachusetts':{'fee':'$500','ann':'$500 annual report','tip':'Massachusetts has one of the highest LLC fees; $500 to form and $500 annual report.'},
  'Michigan':{'fee':'$50','ann':'$25 annual statement','tip':'Michigan LLCs file a $25 annual statement by February 15 each year.'},
  'Minnesota':{'fee':'$155','ann':'$0 (annual renewal required)','tip':'Minnesota LLCs renew annually at no fee; initial formation is $155.'},
  'Mississippi':{'fee':'$50','ann':'$0 (annual report required)','tip':'Mississippi LLCs file a free annual report with the Secretary of State.'},
  'Missouri':{'fee':'$50','ann':'$0 (no annual report)','tip':'Missouri has no annual LLC report requirement — one of only a few states with this advantage.'},
  'Montana':{'fee':'$70','ann':'$15 annual report','tip':'Montana LLCs file a $15 annual report; no franchise or income tax on LLCs.'},
  'Nebraska':{'fee':'$100','ann':'$25 biennial report','tip':'Nebraska LLCs file a biennial report every two years; due April 1 in odd years.'},
  'Nevada':{'fee':'$75 + $150 initial list','ann':'$350 annual list + business license','tip':'Nevada LLCs pay $350+ annually; Nevada offers strong liability protection and privacy.'},
  'New Hampshire':{'fee':'$100','ann':'$100 annual report','tip':'New Hampshire has no income or sales tax; LLCs pay a $100 annual report fee.'},
  'New Jersey':{'fee':'$125','ann':'$75 annual report','tip':'New Jersey LLCs file a $75 annual report due by the last day of the LLC\'s anniversary month.'},
  'New Mexico':{'fee':'$50','ann':'$0 (no annual report)','tip':'New Mexico has no annual LLC report or fee requirement after formation.'},
  'New York':{'fee':'$200','ann':'$9 biennial statement + publication requirement','tip':'New York requires LLCs to publish formation notices in 2 newspapers; can cost $1,000+ in NYC.'},
  'North Carolina':{'fee':'$125','ann':'$202 annual report','tip':'North Carolina LLCs file a $202 annual report due April 15.'},
  'North Dakota':{'fee':'$135','ann':'$50 annual report','tip':'North Dakota LLCs file a $50 annual report; no state income tax on LLCs.'},
  'Ohio':{'fee':'$99','ann':'$0 (no annual report)','tip':'Ohio has no annual LLC report or fee; only pay the one-time formation fee.'},
  'Oklahoma':{'fee':'$100','ann':'$25 annual certificate','tip':'Oklahoma LLCs file a $25 annual certificate of compliance with the Secretary of State.'},
  'Oregon':{'fee':'$100','ann':'$100 annual report','tip':'Oregon LLCs file a $100 annual report due in the LLC\'s anniversary month.'},
  'Pennsylvania':{'fee':'$125','ann':'$70 decennial report','tip':'Pennsylvania LLCs file a decennial report only every 10 years; relatively low ongoing cost.'},
  'Rhode Island':{'fee':'$150','ann':'$50 annual report','tip':'Rhode Island LLCs file a $50 annual report due November 1.'},
  'South Carolina':{'fee':'$110','ann':'$0 (no annual report)','tip':'South Carolina has no annual LLC report requirement; only the initial formation fee applies.'},
  'South Dakota':{'fee':'$150','ann':'$50 annual report','tip':'South Dakota LLCs file a $50 annual report; no corporate income tax on pass-through income.'},
  'Tennessee':{'fee':'$300','ann':'$300 annual report (or $50/member, min $300)','tip':'Tennessee LLCs pay $50 per member with a $300 minimum for the annual report.'},
  'Texas':{'fee':'$300','ann':'Franchise tax (no tax under ~$2.47M revenue)','tip':'Texas LLCs with revenue under ~$2.47M pay no franchise tax; larger LLCs pay 0.375–0.75%.'},
  'Utah':{'fee':'$54','ann':'$18 annual renewal','tip':'Utah LLCs renew annually for $18; one of the least expensive ongoing maintenance states.'},
  'Vermont':{'fee':'$125','ann':'$35 annual report','tip':'Vermont LLCs file a $35 annual report due April 1 each year.'},
  'Virginia':{'fee':'$100','ann':'$50 annual registration fee','tip':'Virginia LLCs pay a $50 annual registration fee; no annual report form required.'},
  'Washington':{'fee':'$200','ann':'$71 annual report','tip':'Washington LLCs file a $71 annual report due in the LLC\'s anniversary month.'},
  'West Virginia':{'fee':'$100','ann':'$25 annual report','tip':'West Virginia LLCs file a $25 annual report due July 1 each year.'},
  'Wisconsin':{'fee':'$130','ann':'$25 annual report','tip':'Wisconsin LLCs file a $25 annual report due the end of the quarter in which the LLC was formed.'},
  'Wyoming':{'fee':'$100','ann':'$62 min. annual report','tip':'Wyoming LLCs pay $62 minimum annually; Wyoming is known for strong LLC privacy protections.'}
};

// Independent contractor: ic=classification notes, tip
const IC = {
  'Alabama':{'test':'Common law control test','tip':'Alabama uses a common law control test; written contracts help establish independent contractor status.'},
  'Alaska':{'test':'IRS 20-factor / common law','tip':'Alaska follows IRS guidelines for contractor classification; a written agreement is essential.'},
  'Arizona':{'test':'Arizona IRC § 23-902','tip':'Arizona has a statutory contractor definition; a written signed agreement is required for protection.'},
  'Arkansas':{'test':'Common law control test','tip':'Arkansas courts use the right-to-control test to determine employment vs. contractor status.'},
  'California':{'test':'ABC test (Labor Code § 2775)','tip':'California\'s ABC test is the strictest in the nation — most workers default to employee status. Consult an attorney.'},
  'Colorado':{'test':'IRS 20-factor + CCIOA','tip':'Colorado uses multi-factor tests; a strong written contractor agreement supports your classification.'},
  'Connecticut':{'test':'ABC test','tip':'Connecticut uses the ABC test; written agreements and independent business operation strengthen contractor status.'},
  'Delaware':{'test':'Common law control test','tip':'Delaware courts apply a common law control test to determine worker classification.'},
  'Florida':{'test':'IRS 20-factor','tip':'Florida uses IRS factors; clear written contracts with defined deliverables support contractor status.'},
  'Georgia':{'test':'Common law control test','tip':'Georgia courts use the right-to-control test; written agreements should specify contractor controls their work.'},
  'Hawaii':{'test':'ABC test','tip':'Hawaii\'s ABC test requires contractors to have an independently established business; written agreements help.'},
  'Idaho':{'test':'IRS 20-factor','tip':'Idaho follows IRS classification factors; a comprehensive written contract is the best protection.'},
  'Illinois':{'test':'3-factor ABC test','tip':'Illinois uses a 3-factor ABC test for unemployment; IRS factors apply for other purposes.'},
  'Indiana':{'test':'Economic reality test','tip':'Indiana uses the economic reality test; contractors must have real independence from the hiring party.'},
  'Iowa':{'test':'IRS 20-factor','tip':'Iowa uses IRS factors; signed written agreements with clear scope of work support contractor status.'},
  'Kansas':{'test':'Common law control test','tip':'Kansas courts apply the right-to-control test; contractors should set their own hours and methods.'},
  'Kentucky':{'test':'IRS 20-factor','tip':'Kentucky uses IRS factors; written agreements specifying the contractor\'s business independence are important.'},
  'Louisiana':{'test':'Four-factor economic realities','tip':'Louisiana applies an economic realities test; a strong written agreement helps establish contractor status.'},
  'Maine':{'test':'ABC test','tip':'Maine uses the ABC test; contractors must be customarily engaged in an independently established business.'},
  'Maryland':{'test':'Common law control test','tip':'Maryland applies a right-to-control test; the nature of the work and level of supervision are key factors.'},
  'Massachusetts':{'test':'Strict ABC test','tip':'Massachusetts has one of the strictest ABC tests; many workers will be classified as employees. Seek legal advice.'},
  'Michigan':{'test':'IRS 20-factor','tip':'Michigan uses IRS factors for most purposes; written contracts with defined deliverables support classification.'},
  'Minnesota':{'test':'Economic reality test','tip':'Minnesota uses an economic realities test; contractors should have multiple clients and set their own rates.'},
  'Mississippi':{'test':'Common law control test','tip':'Mississippi applies a common law control test; contractors should control the means and methods of work.'},
  'Missouri':{'test':'IRS 20-factor + Department of Labor test','tip':'Missouri uses multi-factor tests; a detailed written agreement is the best starting point.'},
  'Montana':{'test':'IRS 20-factor','tip':'Montana uses IRS factors; contractors who set their own hours and supply their own tools are more easily classified.'},
  'Nebraska':{'test':'IRS 20-factor','tip':'Nebraska follows IRS guidelines; a written agreement stating the contractor\'s independent status helps avoid misclassification.'},
  'Nevada':{'test':'IRS 20-factor','tip':'Nevada uses IRS factors; signed written agreements specifying contractor responsibilities are important.'},
  'New Hampshire':{'test':'IRS 20-factor','tip':'New Hampshire uses IRS factors; contractors should maintain multiple client relationships to support independent status.'},
  'New Jersey':{'test':'ABC test (strict)','tip':'New Jersey\'s ABC test is strict; contractors must be in a different business than the hiring party.'},
  'New Mexico':{'test':'IRS 20-factor','tip':'New Mexico uses IRS classification factors; written contracts with clear deliverables are recommended.'},
  'New York':{'test':'Multi-factor economic realities','tip':'New York uses multi-factor tests varying by agency; independent contractors should have their own business entity.'},
  'North Carolina':{'test':'IRS 20-factor','tip':'North Carolina uses IRS factors; written agreements and independent business operation support contractor status.'},
  'North Dakota':{'test':'IRS 20-factor','tip':'North Dakota follows IRS guidelines for contractor classification; written agreements are essential.'},
  'Ohio':{'test':'IRS 20-factor + common law','tip':'Ohio uses IRS factors and common law tests; a detailed written contract establishes the business relationship.'},
  'Oklahoma':{'test':'IRS 20-factor','tip':'Oklahoma follows IRS guidelines; contractors should set their own rates, schedule, and work methods.'},
  'Oregon':{'test':'ABC test','tip':'Oregon uses the ABC test; contractors must be in an independently established business to avoid employee classification.'},
  'Pennsylvania':{'test':'Economic reality test','tip':'Pennsylvania uses an economic realities test; contractors should have genuine independence in their business operations.'},
  'Rhode Island':{'test':'ABC test','tip':'Rhode Island uses the ABC test; contractors must perform work outside the usual course of the hiring entity\'s business.'},
  'South Carolina':{'test':'Common law control test','tip':'South Carolina applies a right-to-control test; written agreements help document the independent nature of the relationship.'},
  'South Dakota':{'test':'IRS 20-factor','tip':'South Dakota uses IRS factors; a written contractor agreement with clear deliverables is the key protection.'},
  'Tennessee':{'test':'IRS 20-factor','tip':'Tennessee uses IRS classification factors; contractors should set their own hours and supply their own tools.'},
  'Texas':{'test':'IRS 20-factor','tip':'Texas follows IRS guidelines; a comprehensive written agreement is the foundation of any contractor relationship.'},
  'Utah':{'test':'IRS 20-factor','tip':'Utah uses IRS factors; contractors with multiple clients and their own business entity are more easily classified.'},
  'Vermont':{'test':'ABC test','tip':'Vermont uses the ABC test; contractors must carry on an independently established trade to avoid employee classification.'},
  'Virginia':{'test':'IRS 20-factor','tip':'Virginia uses IRS factors; written agreements with defined scope of services and payment terms are essential.'},
  'Washington':{'test':'Economic reality test (ESD)','tip':'Washington uses an economic reality test for unemployment purposes; independent contractors need clear written agreements.'},
  'West Virginia':{'test':'IRS 20-factor','tip':'West Virginia follows IRS classification guidelines; detailed written contracts support contractor classification.'},
  'Wisconsin':{'test':'IRS 20-factor','tip':'Wisconsin uses IRS factors; contractors should have multiple clients and control over how they complete their work.'},
  'Wyoming':{'test':'IRS 20-factor','tip':'Wyoming follows IRS guidelines; contractors with their own tools, schedule, and multiple clients are easily classified.'}
};

// Promissory note: usury=max interest, tip
const PN = {
  'Alabama':{'usury':'6% (general) / 8% (written contract)','tip':'Alabama interest limits are 6% general and 8% by written agreement; higher rates require special license.'},
  'Alaska':{'usury':'10.5% or 5% above Federal Reserve rate','tip':'Alaska usury limits are 10.5% or 5% above the Federal Reserve discount rate, whichever is higher.'},
  'Arizona':{'usury':'No limit for written contracts','tip':'Arizona has no usury limit for loans governed by a written agreement; market rates apply.'},
  'Arkansas':{'usury':'5% above Federal Reserve discount rate','tip':'Arkansas usury law is strictly enforced; lenders who violate it forfeit all interest.'},
  'California':{'usury':'10% for non-exempt lenders','tip':'California limits interest to 10% for personal loans by non-exempt lenders; commercial loans may differ.'},
  'Colorado':{'usury':'45% per annum','tip':'Colorado sets a 45% APR cap on most consumer loans; personal loans between individuals are more flexible.'},
  'Connecticut':{'usury':'12% general / higher for licensed lenders','tip':'Connecticut\'s general usury limit is 12%; commercial loans between businesses are largely exempt.'},
  'Delaware':{'usury':'No limit for written contracts','tip':'Delaware has no usury limit for written loan agreements; a key reason many financial companies incorporate there.'},
  'Florida':{'usury':'18% personal / 25% corporate','tip':'Florida caps consumer loan interest at 18% and corporate loans at 25%; criminal usury above 45%.'},
  'Georgia':{'usury':'16% for personal loans','tip':'Georgia caps personal loan interest at 16% annually; commercial loans between businesses are largely exempt.'},
  'Hawaii':{'usury':'10% general consumer limit','tip':'Hawaii limits consumer loan interest to 10%; the limit does not apply to most business loans.'},
  'Idaho':{'usury':'No statutory maximum for written contracts','tip':'Idaho has no general usury limit for written loan contracts; parties set rates by agreement.'},
  'Illinois':{'usury':'9% general / higher with written contract','tip':'Illinois caps interest at 9% unless a higher rate is agreed to in writing; commercial rates vary.'},
  'Indiana':{'usury':'21% for consumer loans','tip':'Indiana caps consumer loans at 21%; loan agreements must state the rate in writing.'},
  'Iowa':{'usury':'5% above Federal Reserve rate (min 7.5%)','tip':'Iowa ties its usury limit to Federal Reserve rates; most personal loans cap at around 7.5–12.5%.'},
  'Kansas':{'usury':'15% for consumer loans','tip':'Kansas caps consumer loan interest at 15% annually; commercial loans are generally exempt.'},
  'Kentucky':{'usury':'4% above Federal Reserve discount rate','tip':'Kentucky\'s usury limit is 4% above the Federal Reserve rate; contracts may specify a higher agreed rate.'},
  'Louisiana':{'usury':'12% general / 36% small loans','tip':'Louisiana caps consumer interest at 12% generally; small loan laws allow up to 36% in some cases.'},
  'Maine':{'usury':'No limit for commercial / 18% consumer','tip':'Maine caps consumer interest at 18%; no cap applies to commercial loans between businesses.'},
  'Maryland':{'usury':'6% general / 24% for licensed lenders','tip':'Maryland\'s general usury limit is 6%; licensed small loan companies may charge up to 24%.'},
  'Massachusetts':{'usury':'20% annual for consumer credit','tip':'Massachusetts caps most consumer loan interest at 20%; commercial loans are largely unregulated.'},
  'Michigan':{'usury':'7% legal / 25% with written agreement','tip':'Michigan\'s legal rate is 7%; written contracts may set rates up to 25% for personal loans.'},
  'Minnesota':{'usury':'8% general / market rate with written contract','tip':'Minnesota\'s general rate is 8%; written contracts can set market rates for most loan purposes.'},
  'Mississippi':{'usury':'10% general / higher by contract','tip':'Mississippi\'s general usury limit is 10%; written contracts may specify higher rates for certain loans.'},
  'Missouri':{'usury':'10% without contract / market rate with contract','tip':'Missouri allows any rate agreed to in writing; without a written contract, the legal rate is 9%.'},
  'Montana':{'usury':'6% general / 10% with contract','tip':'Montana caps interest at 6% without a contract; written agreements may set rates up to 10%.'},
  'Nebraska':{'usury':'16% for consumer loans','tip':'Nebraska caps consumer loan interest at 16% annually; commercial loans may exceed this with agreement.'},
  'Nevada':{'usury':'No statutory maximum (parties agree)','tip':'Nevada has no general usury limit; interest rates are set by agreement between the parties.'},
  'New Hampshire':{'usury':'No limit for written contracts','tip':'New Hampshire has no usury limit for written loan agreements; market rates apply.'},
  'New Jersey':{'usury':'16% for consumer / 30% criminal usury','tip':'New Jersey caps consumer loans at 16%; criminal usury begins at 30% per annum.'},
  'New Mexico':{'usury':'No limit for commercial / 36% consumer','tip':'New Mexico caps consumer loans at 36% APR; commercial loans between businesses are exempt.'},
  'New York':{'usury':'16% civil / 25% criminal','tip':'New York caps civil usury at 16%; criminal usury begins at 25%. These limits are strictly enforced.'},
  'North Carolina':{'usury':'8% legal / 16% with written contract','tip':'North Carolina caps written contract interest at 16% for most consumer loans.'},
  'North Dakota':{'usury':'5.5% general / 7% with written contract','tip':'North Dakota has relatively low usury limits; parties may contract for up to 7%.'},
  'Ohio':{'usury':'8% general / 21% with written contract','tip':'Ohio allows up to 21% with a written contract; the general rate without a contract is 8%.'},
  'Oklahoma':{'usury':'6% general / 10% with written contract','tip':'Oklahoma allows up to 10% in a written promissory note; commercial rates may be higher.'},
  'Oregon':{'usury':'9% general / 12% with written contract','tip':'Oregon caps most consumer loans at 12% by written agreement; commercial rates vary.'},
  'Pennsylvania':{'usury':'6% without license / 24% licensed lenders','tip':'Pennsylvania caps unlicensed lenders at 6%; licensed consumer lenders may charge up to 24%.'},
  'Rhode Island':{'usury':'21% for consumer credit','tip':'Rhode Island caps consumer credit at 21%; commercial loans between businesses are largely exempt.'},
  'South Carolina':{'usury':'8.75% general / higher by written contract','tip':'South Carolina allows higher rates by written agreement; the general legal rate is 8.75%.'},
  'South Dakota':{'usury':'No limit for written contracts','tip':'South Dakota has no usury limit for written loan agreements; banks use SD law for this reason.'},
  'Tennessee':{'usury':'10% general / 24% for licensed lenders','tip':'Tennessee caps general lending at 10%; licensed consumer lenders may charge up to 24%.'},
  'Texas':{'usury':'6% without contract / 18% commercial contract','tip':'Texas caps commercial loan interest at 18% by written contract; consumer rates vary.'},
  'Utah':{'usury':'No limit for written contracts','tip':'Utah has no usury ceiling for written loan agreements; market rates apply.'},
  'Vermont':{'usury':'12% civil usury limit','tip':'Vermont caps civil loan interest at 12%; commercial loans between sophisticated parties may differ.'},
  'Virginia':{'usury':'12% for consumer loans','tip':'Virginia caps consumer loan interest at 12% annually; commercial loans are largely unregulated.'},
  'Washington':{'usury':'12% per annum','tip':'Washington caps most loans at 12% per annum; violations may void the interest portion of the note.'},
  'West Virginia':{'usury':'8% general / higher with written contract','tip':'West Virginia allows higher rates by written agreement; the general legal rate is 8%.'},
  'Wisconsin':{'usury':'No limit for written contracts','tip':'Wisconsin has no usury limit for written loan agreements; interest is set by the parties.'},
  'Wyoming':{'usury':'7% general / market rate by contract','tip':'Wyoming\'s general rate is 7%; written contracts may set market rates for most lending purposes.'}
};

function sg(slug) {
  return STATES.map(function(s) {
    return '<a href="/' + s.toLowerCase().replace(/ /g,'-') + '-' + slug + '" style="display:block;padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-weight:500;color:var(--ink-1);text-decoration:none" onmouseover="this.style.borderColor=\'var(--accent)\';this.style.background=\'var(--surface-2)\'" onmouseout="this.style.borderColor=\'var(--border)\';this.style.background=\'\'">' + s + '</a>';
  }).join('');
}

var NAV = '<header class="site-header"><div class="header-inner"><a href="/" class="site-logo">FreeDoc<span>Templates</span></a><nav class="main-nav" aria-label="Main"><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Business <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/llc-operating-agreement-template" class="nav-item">LLC Operating Agreement</a><a href="/independent-contractor-agreement-template" class="nav-item">Contractor Agreement</a><a href="/promissory-note-template" class="nav-item">Promissory Note</a><a href="/nda-template" class="nav-item">NDA Template</a></div></div></nav><div class="header-actions"><a href="/tools" class="btn-all-tools">All Templates</a><button id="btn-search" class="btn-search" aria-label="Search templates"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></button></div></div></header><div class="cmd-overlay" id="cmd-overlay"><div class="cmd-modal"><div class="cmd-header"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input class="cmd-input" id="cmd-input" placeholder="Search templates\u2026" autocomplete="off"></div><div class="cmd-body" id="cmd-body"></div></div></div>';

var FTR = '<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p></div><div><div class="footer-col-title">Templates</div><nav class="footer-nav"><a href="/llc-operating-agreement-template">LLC Agreement</a><a href="/independent-contractor-agreement-template">Contractor Agreement</a><a href="/promissory-note-template">Promissory Note</a></nav></div></div><div class="footer-bottom"><p>\u00a9 2026 FreeDocTemplates.xyz</p></div></div></footer>';

function wrap(title, desc, canon, body) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + '</title><meta name="description" content="' + desc + '"><link rel="canonical" href="https://www.freedoctemplates.xyz/' + canon + '"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=1"></head><body>' + NAV + '<main class="page-wrap">' + body + '</main>' + FTR + '<script src="/shared/scripts.js?v=1" defer><\/script></body></html>';
}

function llcPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/llc-operating-agreement-template">LLC Operating Agreement</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' LLC Operating Agreement Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; ' + state + ' LLC law</span><span class="page-badge">&#10003; Multi or single member</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' LLC Costs</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">State Filing Fee</td><td style="padding:10px 0;font-weight:600">' + d.fee + '</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Annual Report / Franchise Tax</td><td style="padding:10px 0;font-weight:600">' + d.ann + '</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Operating Agreement Required?</td><td style="padding:10px 0;font-weight:600">Strongly recommended</td></tr>'
    + '</table>'
    + '</div>'
    + '<p class="section-eyebrow">Forming an LLC in ' + state + '</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">' + state + ' LLC Operating Agreement</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">To form an LLC in ' + state + ', file Articles of Organization with the Secretary of State and pay the <strong>' + d.fee + ' filing fee</strong>. While ' + state + ' may not legally require an operating agreement, every LLC should have one — it governs member rights, profit distributions, voting, and what happens if a member leaves.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">After formation, ' + state + ' LLCs must pay <strong>' + d.ann + '</strong>. Missing this deadline can result in late fees or administrative dissolution of the LLC.</p>'
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/llc-operating-agreement-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' LLC Operating Agreement &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' LLC questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Does ' + state + ' require an LLC operating agreement?</summary><div class="faq-a">Most states do not legally require an operating agreement, but it is strongly recommended for every LLC. Without one, your LLC is governed by default ' + state + ' LLC statutes — which may not reflect what the members actually want. Banks and investors often require an operating agreement before doing business with an LLC.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">How much does it cost to form an LLC in ' + state + '?</summary><div class="faq-a">The state filing fee to form an LLC in ' + state + ' is <strong>' + d.fee + '</strong>. After formation, ' + state + ' LLCs must pay <strong>' + d.ann + '</strong> to maintain good standing. These fees are in addition to any registered agent fees.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Can a single-member LLC use the same operating agreement?</summary><div class="faq-a">Yes. A single-member LLC operating agreement is slightly simpler — it covers the sole member\'s rights, the management structure, and how the LLC will be taxed (disregarded entity vs. S-Corp). It is still important to have in writing for liability protection and banking purposes.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does an LLC operating agreement need to be notarized in ' + state + '?</summary><div class="faq-a">No. An LLC operating agreement in ' + state + ' does not need to be notarized or filed with the state. It is an internal document signed by the members. Keep the signed original with your LLC records.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px"><p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">LLC Operating Agreement by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">LLC filing fees and annual costs vary significantly by state.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('llc-operating-agreement-template') + '</div>'
    + '</section></div>';
  return wrap('Free ' + state + ' LLC Operating Agreement Template 2026', 'Free ' + state + ' LLC operating agreement template. Filing fee: ' + d.fee + '. Annual cost: ' + d.ann + '. Multi or single member. Download PDF.', sl + '-llc-operating-agreement-template', body);
}

function icPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/independent-contractor-agreement-template">Contractor Agreement</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Independent Contractor Agreement Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; ' + state + ' law</span><span class="page-badge">&#10003; Protects both parties</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' Contractor Classification</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Classification Test Used</td><td style="padding:10px 0;font-weight:600">' + d.test + '</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Federal Overlay</td><td style="padding:10px 0;font-weight:600">IRS 20-factor test</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Written Agreement Required?</td><td style="padding:10px 0;font-weight:600">Strongly recommended</td></tr>'
    + '</table>'
    + '</div>'
    + '<p class="section-eyebrow">' + state + ' Contractor Law</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Independent Contractor Classification in ' + state + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">' + state + ' uses the <strong>' + d.test + '</strong> to determine whether a worker is an independent contractor or an employee. Misclassifying an employee as a contractor can result in back taxes, penalties, and liability for unpaid benefits.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">A written independent contractor agreement is the foundation of any contractor relationship. It should clearly define the scope of work, payment terms, ownership of work product (IP assignment), and each party\'s responsibilities.</p>'
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/independent-contractor-agreement-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' Contractor Agreement &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' contractor questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">What test does ' + state + ' use to classify contractors vs. employees?</summary><div class="faq-a">' + state + ' primarily uses the <strong>' + d.test + '</strong> to determine worker classification. Factors generally include the degree of control the hiring party has over the work, whether the worker has an independent business, and the economic reality of the relationship.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does an independent contractor agreement prevent misclassification in ' + state + '?</summary><div class="faq-a">A written agreement helps establish the parties\' intent, but it is not dispositive. ' + state + ' agencies look at the actual working relationship, not just the contract label. The agreement should accurately reflect how the work is actually performed.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Who is responsible for taxes for an independent contractor in ' + state + '?</summary><div class="faq-a">Independent contractors in ' + state + ' are responsible for their own federal self-employment tax (15.3%), estimated quarterly tax payments, and any applicable state income tax. The hiring party does not withhold taxes — they issue a Form 1099-NEC for payments of $600 or more.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Can I include an NDA in an independent contractor agreement?</summary><div class="faq-a">Yes. It is common practice to include confidentiality and non-disclosure provisions in a contractor agreement. You can also include an IP assignment clause to ensure any work product created for the client is owned by the client. Our generator includes both provisions.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px"><p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Independent Contractor Agreement by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Worker classification tests and contractor laws vary significantly by state.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('independent-contractor-agreement-template') + '</div>'
    + '</section></div>';
  return wrap('Free ' + state + ' Independent Contractor Agreement Template 2026', 'Free ' + state + ' independent contractor agreement template. Classification test: ' + d.test + '. Protects both parties. Download PDF.', sl + '-independent-contractor-agreement-template', body);
}

function pnPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/promissory-note-template">Promissory Note</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Promissory Note Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; ' + state + ' usury compliant</span><span class="page-badge">&#10003; With or without interest</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' Promissory Note Requirements</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Maximum Interest Rate (Usury Limit)</td><td style="padding:10px 0;font-weight:600">' + d.usury + '</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Notarization Required?</td><td style="padding:10px 0;font-weight:600">Not required (recommended)</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Statute of Limitations (written contract)</td><td style="padding:10px 0;font-weight:600">Typically 5–10 years</td></tr>'
    + '</table>'
    + '</div>'
    + '<p class="section-eyebrow">' + state + ' Loan Law</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Promissory Notes in ' + state + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">A promissory note in ' + state + ' is a binding written promise to repay a loan. The maximum interest rate (usury limit) in ' + state + ' is <strong>' + d.usury + '</strong>. Charging interest above this limit may void the interest portion of the note or expose the lender to penalties.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">For loans between family members or friends, it is especially important to document the loan in a written promissory note. The IRS requires minimum "applicable federal rates" (AFR) for family loans over $10,000 to avoid gift tax implications.</p>'
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/promissory-note-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' Promissory Note &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' promissory note questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">What is the maximum interest rate for a promissory note in ' + state + '?</summary><div class="faq-a">The usury limit in ' + state + ' is <strong>' + d.usury + '</strong>. Charging interest above this rate may result in forfeiture of the excess interest or other penalties. Commercial loans between businesses may be treated differently — check current ' + state + ' usury statutes or consult an attorney.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does a promissory note need to be notarized in ' + state + '?</summary><div class="faq-a">A promissory note in ' + state + ' does not legally need to be notarized to be enforceable. However, notarization adds credibility and makes the document easier to use in court if the borrower defaults. It is especially recommended for larger loan amounts.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">How do I collect on a defaulted promissory note in ' + state + '?</summary><div class="faq-a">If the borrower defaults, the lender should first send a written demand letter requesting payment. If the borrower still does not pay, the lender may file a lawsuit in ' + state + ' small claims court (for smaller amounts) or civil court. The promissory note is the primary evidence of the debt. The statute of limitations for written contracts in ' + state + ' is typically 5–10 years.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Is a promissory note the same as a loan agreement?</summary><div class="faq-a">Not exactly. A promissory note is a simpler document — a promise to repay a specific amount by a specific date. A full loan agreement includes more terms: what the money is for, default provisions, remedies, and governing law. For larger or more complex loans, a full personal loan agreement or business loan agreement is more appropriate.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px"><p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Promissory Note Template by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Usury limits and promissory note laws vary by state.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('promissory-note-template') + '</div>'
    + '</section></div>';
  return wrap('Free ' + state + ' Promissory Note Template 2026 | Usury Limit ' + d.usury, 'Free ' + state + ' promissory note template. Maximum interest rate: ' + d.usury + '. Fill out online, download PDF. No account needed.', sl + '-promissory-note-template', body);
}

var lc = 0, ic = 0, pc = 0;
STATES.forEach(function(s) {
  var sl = s.toLowerCase().replace(/ /g, '-');
  fs.writeFileSync(B + sl + '-llc-operating-agreement-template.html', llcPage(s, LLC[s]));
  lc++;
  fs.writeFileSync(B + sl + '-independent-contractor-agreement-template.html', icPage(s, IC[s]));
  ic++;
  fs.writeFileSync(B + sl + '-promissory-note-template.html', pnPage(s, PN[s]));
  pc++;
});
console.log('LLC:', lc, '| IC:', ic, '| Promissory:', pc, '| Total:', lc + ic + pc);
