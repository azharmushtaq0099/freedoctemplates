const fs = require('fs');
const B = 'C:/Users/mastr/claude co/legal-docs/';

const STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

const STATE_CITIES = {
  'Arizona':['Phoenix','Mesa','Tucson'],
  'California':['Los Angeles','San Diego','San Jose','San Francisco','Fresno','Sacramento','Long Beach','Bakersfield','Anaheim'],
  'Colorado':['Denver','Colorado Springs','Aurora'],
  'Florida':['Jacksonville','Tampa'],
  'Georgia':['Atlanta'],
  'Hawaii':['Honolulu'],
  'Illinois':['Chicago'],
  'Indiana':['Indianapolis'],
  'Kentucky':['Louisville'],
  'Louisiana':['New Orleans'],
  'Maryland':['Baltimore'],
  'Massachusetts':['Boston'],
  'Minnesota':['Minneapolis'],
  'Missouri':['Kansas City'],
  'Nebraska':['Omaha'],
  'Nevada':['Las Vegas'],
  'New Mexico':['Albuquerque'],
  'New York':['New York City'],
  'North Carolina':['Charlotte','Raleigh'],
  'Ohio':['Columbus'],
  'Oklahoma':['Oklahoma City'],
  'Oregon':['Portland'],
  'Pennsylvania':['Philadelphia'],
  'Tennessee':['Nashville','Memphis'],
  'Texas':['Houston','San Antonio','Dallas','Austin','Fort Worth','El Paso','Arlington'],
  'Virginia':['Virginia Beach'],
  'Washington':['Seattle'],
  'Wisconsin':['Milwaukee']
};

const NOTES = {
  'Alabama':'Alabama is a landlord-friendly state; non-competes are generally enforceable; holographic wills are recognized.',
  'Alaska':'Alaska recognizes holographic wills; self-proving affidavits are available; LLCs pay no state income tax.',
  'Arizona':'Arizona uses the ARLTA for landlord-tenant matters; community property state; non-competes enforceable with limits.',
  'Arkansas':'Arkansas enforces non-competes with a 2-year cap; no corporate income tax on LLCs; holographic wills recognized.',
  'California':'California bans non-competes, uses ABC test for contractors, has AB 1482 rent caps, and charges LLCs $800/yr minimum.',
  'Colorado':'Colorado\'s SB21-173 increased tenant protections; state bans local rent control; non-competes limited post-2022.',
  'Connecticut':'Connecticut requires 2 witnesses for wills; non-competes enforceable with reasonable limits; no transfer tax on LLCs.',
  'Delaware':'Delaware has no transfer tax, no usury limit on commercial loans, and is the most popular state for LLC formation.',
  'Florida':'Florida charges sales tax on commercial rents; has detailed landlord-tenant statute (Ch. 83); strong homestead protections.',
  'Georgia':'Georgia landlord lien rights are among the strongest in the US; non-competes enforceable by statute since 2011.',
  'Hawaii':'Hawaii records all deeds with the State Bureau of Conveyances (not counties); strict contractor ABC test applies.',
  'Idaho':'Idaho is a community property state; recognizes holographic wills; non-competes enforceable with reasonable limits.',
  'Illinois':'Illinois requires landlords to pay interest on deposits in Chicago; non-competes limited to employees earning over $75K/yr.',
  'Indiana':'Indiana follows a pure at-will employment doctrine; non-competes enforced if reasonable in scope and duration.',
  'Iowa':'Iowa recognizes holographic wills; non-competes enforceable with reasonable limits; 30-day eviction notice for month-to-month.',
  'Kansas':'Kansas enforces non-competes; holographic wills recognized; landlords must return deposits within 30 days.',
  'Kentucky':'Kentucky requires security deposits held in a separate account; non-competes generally enforceable.',
  'Louisiana':'Louisiana uses civil (Napoleonic) law; "parishes" replace counties; estate planning documents need special attention.',
  'Maine':'Maine requires 45-day notice to terminate a month-to-month tenancy; non-competes limited to 1 year post-2019.',
  'Maryland':'Maryland caps security deposits at 2 months rent; several independent cities exist (not part of any county).',
  'Massachusetts':'Massachusetts requires specific lease disclosures; last month\'s rent treated as a deposit; non-competes limited post-2018.',
  'Michigan':'Michigan enforces non-competes with reasonable limits; holographic wills recognized; no state income tax on LLCs.',
  'Minnesota':'Minnesota bans employee non-competes (2023 law); has a local tenant remedies ordinance in Minneapolis.',
  'Mississippi':'Mississippi is a landlord-friendly state; non-competes enforceable; holographic wills recognized.',
  'Missouri':'Missouri non-competes enforceable; pay-or-quit notice is only 1 day; no annual LLC report required.',
  'Montana':'Montana is the ONLY state without at-will employment; the Wrongful Discharge from Employment Act applies.',
  'Nebraska':'Nebraska allows commercial self-help evictions; non-competes enforceable with reasonable limits.',
  'Nevada':'Nevada allows same-day divorce residency in some cases; non-competes limited; no state income tax.',
  'New Hampshire':'New Hampshire has no state income tax; non-competes enforceable; security deposits capped at one month.',
  'New Jersey':'New Jersey\'s Anti-Eviction Act requires 30-day notice; strong tenant protections; non-competes enforceable.',
  'New Mexico':'New Mexico has no annual LLC report; community property state; non-competes enforceable with limits.',
  'New York':'New York bans most employee non-competes (2024 law); has the strongest tenant protections via Good Cause Eviction.',
  'North Carolina':'North Carolina enforces non-competes with a 2-year cap; 7-day pay-or-quit notice; deed stamps at county level.',
  'North Dakota':'North Dakota bans non-competes; community property state; holographic wills recognized.',
  'Ohio':'Ohio LLCs file biennial reports; non-competes enforceable; 3-day pay-or-quit notice required.',
  'Oklahoma':'Oklahoma bans non-competes (with narrow exceptions); community property is NOT applicable (common law state).',
  'Oregon':'Oregon caps rent increases at 7%+CPI; non-competes limited to 18 months; pay-or-quit notice is 72 hours.',
  'Pennsylvania':'Pennsylvania has no statewide security deposit interest requirement; non-competes enforceable with limits.',
  'Rhode Island':'Rhode Island enforces non-competes with reasonable limits; 5-day pay-or-quit notice for non-payment.',
  'South Carolina':'South Carolina requires no annual LLC report; non-competes enforceable; holographic wills recognized.',
  'South Dakota':'South Dakota has no state income tax; non-competes enforceable; 3-day pay-or-quit notice.',
  'Tennessee':'Tennessee is a landlord-friendly state; non-competes enforceable; LLCs pay a $300 annual fee.',
  'Texas':'Texas is community property; bans local rent control; non-competes enforceable if ancillary to a valid agreement.',
  'Utah':'Utah enforces non-competes with a 1-year cap (post-2016); holographic wills recognized.',
  'Vermont':'Vermont is the ONLY state requiring 3 witnesses on a will; no state income tax on out-of-state LLCs.',
  'Virginia':'Virginia has several independent cities not part of any county; non-competes limited post-2020.',
  'Washington':'Washington bans local rent control; non-competes limited to $100K+ earners; community property state.',
  'West Virginia':'West Virginia enforces non-competes; holographic wills recognized; landlord-friendly state.',
  'Wisconsin':'Wisconsin landlords must use the state standard lease form or face penalties; non-competes enforceable.',
  'Wyoming':'Wyoming has no state income tax or corporate tax; strong LLC charging-order protection; no annual LLC report fee.'
};

const TEMPLATES = [
  {slug:'last-will-testament-template',    label:'Last Will & Testament',          cat:'Estate',    desc:'Declare how your assets will be distributed and name an executor.'},
  {slug:'eviction-notice-template',        label:'Eviction Notice',                cat:'Real Estate',desc:'Pay or quit, cure or quit, and no-fault termination notices.'},
  {slug:'quitclaim-deed-template',         label:'Quitclaim Deed',                 cat:'Real Estate',desc:'Transfer real property between spouses, family, or to an LLC.'},
  {slug:'notice-to-vacate-template',       label:'Notice to Vacate',               cat:'Real Estate',desc:'Tenant notice to end a tenancy or landlord notice to reclaim a unit.'},
  {slug:'commercial-lease-template',       label:'Commercial Lease',               cat:'Real Estate',desc:'Lease agreement for office, retail, or warehouse space.'},
  {slug:'llc-operating-agreement-template',label:'LLC Operating Agreement',        cat:'Business',   desc:'Define ownership, management, and profit sharing for your LLC.'},
  {slug:'employment-contract-template',    label:'Employment Contract',            cat:'Business',   desc:'Set salary, role, benefits, and termination terms in writing.'},
  {slug:'nda-template',                    label:'Non-Disclosure Agreement (NDA)', cat:'Business',   desc:'Protect confidential information shared with employees or partners.'},
  {slug:'non-compete-agreement-template',  label:'Non-Compete Agreement',          cat:'Business',   desc:'Restrict former employees from competing in the same market.'},
  {slug:'independent-contractor-agreement-template',label:'Independent Contractor Agreement',cat:'Business',desc:'Classify workers correctly and define project scope and pay.'},
  {slug:'promissory-note-template',        label:'Promissory Note',                cat:'Financial',  desc:'Legally binding promise to repay a loan with interest terms.'},
  {slug:'personal-loan-agreement-template',label:'Personal Loan Agreement',        cat:'Financial',  desc:'Document a loan between individuals with repayment schedule.'},
  {slug:'divorce-settlement-agreement-template',label:'Divorce Settlement Agreement',cat:'Family', desc:'Divide assets, debts, and custody in an uncontested divorce.'},
  {slug:'affidavit-template',              label:'Affidavit',                      cat:'Legal',      desc:'Sworn written statement of fact for court or official use.'},
  {slug:'cease-and-desist-template',       label:'Cease and Desist Letter',        cat:'Legal',      desc:'Demand someone stop an infringing or harmful activity.'},
  {slug:'roommate-agreement-template',     label:'Roommate Agreement',             cat:'Personal',   desc:'Set house rules, expense splits, and guest policies between roommates.'}
];

const EXTRA = [
  {slug:'lease-agreement-template',       label:'Lease Agreement',          desc:'Residential lease with rent, deposit, and maintenance terms.'},
  {slug:'bill-of-sale-template',          label:'Bill of Sale',             desc:'Document vehicle, boat, and personal property sales.'},
  {slug:'power-of-attorney-template',     label:'Power of Attorney',        desc:'General, durable, limited, and healthcare POA forms.'}
];

var NAV = '<header class="site-header"><div class="header-inner"><a href="/" class="site-logo">FreeDoc<span>Templates</span></a><nav class="main-nav" aria-label="Main"><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Templates <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/lease-agreement-template" class="nav-item">Lease Agreement</a><a href="/eviction-notice-template" class="nav-item">Eviction Notice</a><a href="/bill-of-sale-template" class="nav-item">Bill of Sale</a><a href="/quitclaim-deed-template" class="nav-item">Quitclaim Deed</a><a href="/power-of-attorney-template" class="nav-item">Power of Attorney</a></div></div></nav><div class="header-actions"><a href="/tools" class="btn-all-tools">All Templates</a><button id="btn-search" class="btn-search" aria-label="Search templates"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></button></div></div></header><div class="cmd-overlay" id="cmd-overlay"><div class="cmd-modal"><div class="cmd-header"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input class="cmd-input" id="cmd-input" placeholder="Search templates\u2026" autocomplete="off"></div><div class="cmd-body" id="cmd-body"></div></div></div>';
var FTR = '<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p></div><div><div class="footer-col-title">Templates</div><nav class="footer-nav"><a href="/lease-agreement-template">Lease Agreement</a><a href="/eviction-notice-template">Eviction Notice</a><a href="/quitclaim-deed-template">Quitclaim Deed</a><a href="/power-of-attorney-template">Power of Attorney</a></nav></div></div><div class="footer-bottom"><p>\u00a9 2026 FreeDocTemplates.xyz</p></div></div></footer>';

function wrap(title, desc, canon, body) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + '</title><meta name="description" content="' + desc + '"><link rel="canonical" href="https://www.freedoctemplates.xyz/' + canon + '"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=1"></head><body>' + NAV + '<main class="page-wrap">' + body + '</main>' + FTR + '<script src="/shared/scripts.js?v=1" defer><\/script></body></html>';
}

var cats = ['Estate','Real Estate','Business','Financial','Family','Legal','Personal'];

function hubPage(state, sl, cities, note) {
  var grid = cats.map(function(cat) {
    var items = TEMPLATES.filter(function(t){ return t.cat === cat; });
    if (!items.length) return '';
    return '<div style="margin-bottom:32px">'
      + '<p class="section-eyebrow" style="margin-bottom:14px">' + cat + '</p>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px">'
      + items.map(function(t){
          return '<a href="/' + sl + '-' + t.slug + '" style="display:block;padding:16px 18px;border:1px solid var(--border);border-radius:10px;text-decoration:none;background:var(--surface-2);transition:border-color .15s">'
            + '<div style="font-weight:600;color:var(--ink-1);margin-bottom:4px">' + t.label + '</div>'
            + '<div style="font-size:13px;color:var(--ink-2);line-height:1.5">' + t.desc + '</div>'
            + '</a>';
        }).join('')
      + '</div></div>';
  }).join('');

  var extraGrid = '<div style="margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:14px">Also available</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px">'
    + EXTRA.map(function(t){
        return '<a href="/' + t.slug + '" style="display:block;padding:16px 18px;border:1px solid var(--border);border-radius:10px;text-decoration:none;background:var(--surface-2)">'
          + '<div style="font-weight:600;color:var(--ink-1);margin-bottom:4px">' + t.label + '</div>'
          + '<div style="font-size:13px;color:var(--ink-2);line-height:1.5">' + t.desc + '</div>'
          + '</a>';
      }).join('')
    + '</div></div>';

  var citySec = '';
  if (cities.length) {
    citySec = '<div style="margin-top:40px">'
      + '<p class="section-eyebrow" style="margin-bottom:14px">Browse by ' + state + ' city</p>'
      + '<div style="display:flex;flex-wrap:wrap;gap:8px">'
      + cities.map(function(c){
          return '<a href="/' + c.toLowerCase().replace(/ /g,'-') + '-lease-agreement-template" style="display:inline-block;padding:6px 16px;border:1px solid var(--border);border-radius:20px;font-size:13px;color:var(--ink-1);text-decoration:none">' + c + '</a>';
        }).join('')
      + '</div></div>';
  }

  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><span aria-current="page">' + state + ' Legal Documents</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Legal Document Templates</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + note + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; ' + state + ' law</span><span class="page-badge">&#10003; 16 template types</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:40px">'
    + grid
    + extraGrid
    + citySec
    + '<section class="faq-section" style="margin:40px -24px 0;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' legal document questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Are these ' + state + ' legal document templates free?</summary><div class="faq-a">Yes. Every template on this page is 100% free. There is no account, subscription, or watermark. Fill in the form online and download a clean PDF or copy the text. The templates are designed for ' + state + ' law but you should always review with an attorney for complex or high-value matters.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Do I need a lawyer to use these templates in ' + state + '?</summary><div class="faq-a">For straightforward transactions — simple leases, family property transfers, basic business agreements — a properly completed template is legally valid in ' + state + ' without an attorney\'s signature. For complex matters (contested divorce, large real estate deals, commercial litigation), consulting a ' + state + ' licensed attorney is strongly recommended.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What is the most important legal document for ' + state + ' landlords?</summary><div class="faq-a">A written lease agreement and a properly formatted eviction notice are the two most critical documents for ' + state + ' landlords. The lease defines the tenancy terms; the eviction notice (served correctly with the right notice period) is the required first step before filing with the court if a tenant fails to pay or violates the lease.</div></details>'
    + '</div></section>'
    + '</div>';

  return wrap(
    'Free ' + state + ' Legal Document Templates 2026 — All 16 Types',
    'Free legal document templates for ' + state + ' — lease, eviction, will, LLC, deed, NDA, and 10 more. No sign-up. Download PDF. Updated for 2026 ' + state + ' law.',
    sl + '-legal-documents',
    body
  );
}

STATES.forEach(function(state) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var cities = STATE_CITIES[state] || [];
  var note = NOTES[state] || (state + ' state law governs all documents on this page.');
  fs.writeFileSync(B + sl + '-legal-documents.html', hubPage(state, sl, cities, note));
});
console.log('State hub pages: 50');
