const fs = require('fs');
const B = 'C:/Users/mastr/claude co/legal-docs/';

const CITIES = {
  'New York City':    {state:'New York',     sa:'NY', stateSlug:'new-york',        county:'varies by borough (Kings/NY/Queens/Bronx/Richmond)', rc:'Yes — extensive protections', court:'NYC Housing Court',                             tip:'NYC has the strongest tenant protections in the US; Good Cause Eviction Law applies citywide.'},
  'Los Angeles':      {state:'California',   sa:'CA', stateSlug:'california',      county:'Los Angeles County',   rc:'Yes — RSO for pre-1978 buildings', court:'LA Superior Court',                               tip:'LA\'s RSO covers most pre-1978 buildings; just cause eviction required for covered units.'},
  'Chicago':          {state:'Illinois',     sa:'IL', stateSlug:'illinois',         county:'Cook County',          rc:'No',                              court:'Cook County Circuit Court',                        tip:'Chicago requires landlords to pay interest on security deposits and provide specific lease disclosures.'},
  'Houston':          {state:'Texas',        sa:'TX', stateSlug:'texas',            county:'Harris County',        rc:'No',                              court:'Harris County Justice of the Peace',               tip:'Houston has no rent control; Texas is a landlord-friendly state with minimal local tenant protections.'},
  'Phoenix':          {state:'Arizona',      sa:'AZ', stateSlug:'arizona',          county:'Maricopa County',      rc:'No',                              court:'Maricopa County Justice Court',                    tip:'Phoenix landlords must follow ARLTA; Maricopa County records all real property deeds.'},
  'Philadelphia':     {state:'Pennsylvania', sa:'PA', stateSlug:'pennsylvania',     county:'Philadelphia County',  rc:'No',                              court:'Philadelphia Municipal Court',                     tip:'Philadelphia requires landlords to provide the City\'s Tenant\'s Rights booklet with every lease.'},
  'San Antonio':      {state:'Texas',        sa:'TX', stateSlug:'texas',            county:'Bexar County',         rc:'No',                              court:'Bexar County Justice of the Peace',                tip:'San Antonio follows Texas state law; Bexar County records all property deeds.'},
  'San Diego':        {state:'California',   sa:'CA', stateSlug:'california',       county:'San Diego County',     rc:'Yes — AB 1482 applies',           court:'San Diego Superior Court',                         tip:'San Diego buildings under 15 years old are exempt from AB 1482 state rent caps.'},
  'Dallas':           {state:'Texas',        sa:'TX', stateSlug:'texas',            county:'Dallas County',        rc:'No',                              court:'Dallas County Justice of the Peace',               tip:'Dallas follows Texas landlord-tenant law; no local rent control permitted under state law.'},
  'San Jose':         {state:'California',   sa:'CA', stateSlug:'california',       county:'Santa Clara County',   rc:'Yes — SJRCOA applies',            court:'Santa Clara County Superior Court',                tip:'San Jose\'s Rent Control Ordinance (SJRCOA) covers most multi-unit buildings built before 1979.'},
  'Austin':           {state:'Texas',        sa:'TX', stateSlug:'texas',            county:'Travis County',        rc:'No',                              court:'Travis County Justice of the Peace',               tip:'Austin follows Texas state law; high demand makes thorough written leases essential.'},
  'Jacksonville':     {state:'Florida',      sa:'FL', stateSlug:'florida',          county:'Duval County',         rc:'No',                              court:'Duval County Court',                               tip:'Jacksonville follows Florida\'s Landlord and Tenant Act; 3-day notice for non-payment.'},
  'Fort Worth':       {state:'Texas',        sa:'TX', stateSlug:'texas',            county:'Tarrant County',       rc:'No',                              court:'Tarrant County Justice of the Peace',              tip:'Fort Worth follows Texas state landlord-tenant law; Tarrant County records deeds.'},
  'Columbus':         {state:'Ohio',         sa:'OH', stateSlug:'ohio',             county:'Franklin County',      rc:'No',                              court:'Franklin County Municipal Court',                  tip:'Columbus landlords must maintain habitability standards under Ohio landlord-tenant law.'},
  'Indianapolis':     {state:'Indiana',      sa:'IN', stateSlug:'indiana',          county:'Marion County',        rc:'No',                              court:'Marion County Small Claims Court',                 tip:'Indianapolis follows Indiana Code § 32-31; no local rent control or additional tenant rules.'},
  'Charlotte':        {state:'North Carolina',sa:'NC',stateSlug:'north-carolina',   county:'Mecklenburg County',   rc:'No',                              court:'Mecklenburg County District Court',                tip:'Charlotte follows NC landlord-tenant law; Mecklenburg County records all property deeds.'},
  'San Francisco':    {state:'California',   sa:'CA', stateSlug:'california',       county:'San Francisco County', rc:'Yes — strong rent control',       court:'San Francisco Superior Court',                     tip:'San Francisco has some of the strongest rent control in the US; covers most pre-1979 buildings.'},
  'Seattle':          {state:'Washington',   sa:'WA', stateSlug:'washington',       county:'King County',          rc:'No (state ban)',                  court:'King County District Court',                       tip:'WA state preempts rent control; Seattle has Just Cause Eviction protections for tenants.'},
  'Denver':           {state:'Colorado',     sa:'CO', stateSlug:'colorado',         county:'Denver County',        rc:'No (state ban)',                  court:'Denver County Court',                              tip:'Colorado prohibits local rent control; SB21-173 increased tenant protections statewide in 2021.'},
  'Nashville':        {state:'Tennessee',    sa:'TN', stateSlug:'tennessee',        county:'Davidson County',      rc:'No',                              court:'Davidson County General Sessions Court',           tip:'Nashville follows Tennessee landlord-tenant law; fastest-growing rental market in the Southeast.'},
  'Oklahoma City':    {state:'Oklahoma',     sa:'OK', stateSlug:'oklahoma',         county:'Oklahoma County',      rc:'No',                              court:'Oklahoma County District Court',                   tip:'OKC follows state landlord-tenant law; no local rent control or additional tenant protections.'},
  'El Paso':          {state:'Texas',        sa:'TX', stateSlug:'texas',            county:'El Paso County',       rc:'No',                              court:'El Paso County Justice of the Peace',              tip:'El Paso follows Texas state law; SCRA military lease protections apply near Fort Bliss.'},
  'Washington DC':    {state:'Washington DC',sa:'DC', stateSlug:'',                county:'DC Superior Court land records', rc:'Yes — strong rent control', court:'DC Superior Court — Landlord & Tenant',         tip:'DC has strict rent control under the Rental Housing Act; most pre-1976 units are covered.'},
  'Boston':           {state:'Massachusetts',sa:'MA', stateSlug:'massachusetts',    county:'Suffolk County',       rc:'No',                              court:'Boston Housing Court',                             tip:'Boston\'s Housing Court specializes in landlord-tenant disputes; MA requires specific lease disclosures.'},
  'Las Vegas':        {state:'Nevada',       sa:'NV', stateSlug:'nevada',           county:'Clark County',         rc:'No',                              court:'Las Vegas Justice Court',                          tip:'Las Vegas follows Nevada state law; rapid growth makes deposit rules and lease terms critical.'},
  'Memphis':          {state:'Tennessee',    sa:'TN', stateSlug:'tennessee',        county:'Shelby County',        rc:'No',                              court:'Shelby County General Sessions Court',             tip:'Memphis has a high eviction rate; thorough written leases and proper notice procedures are essential.'},
  'Louisville':       {state:'Kentucky',     sa:'KY', stateSlug:'kentucky',         county:'Jefferson County',     rc:'No',                              court:'Jefferson County District Court',                  tip:'Louisville follows Kentucky landlord-tenant law; security deposits must be held in a separate account.'},
  'Portland':         {state:'Oregon',       sa:'OR', stateSlug:'oregon',           county:'Multnomah County',     rc:'Yes — state 7%+CPI cap',          court:'Multnomah County Circuit Court',                   tip:'Portland is subject to Oregon SB 608; annual rent increases capped at 7% + CPI.'},
  'Baltimore':        {state:'Maryland',     sa:'MD', stateSlug:'maryland',         county:'Baltimore City (independent)',rc:'No',                       court:'Baltimore City District Court',                   tip:'Baltimore City is independent — not part of any county; record deeds at Baltimore City Circuit Court.'},
  'Milwaukee':        {state:'Wisconsin',    sa:'WI', stateSlug:'wisconsin',        county:'Milwaukee County',     rc:'No',                              court:'Milwaukee County Circuit Court',                   tip:'Wisconsin landlords must use the state standard lease form or face penalties under Wis. Stat. § 704.'},
  'Albuquerque':      {state:'New Mexico',   sa:'NM', stateSlug:'new-mexico',       county:'Bernalillo County',    rc:'No',                              court:'Bernalillo County Metropolitan Court',             tip:'Albuquerque follows NMRRA; landlords must provide a written summary of tenant rights.'},
  'Tucson':           {state:'Arizona',      sa:'AZ', stateSlug:'arizona',          county:'Pima County',          rc:'No',                              court:'Pima County Justice Court',                        tip:'Tucson landlords must provide habitable cooling (A/C or evaporative) under AZ heat habitability rules.'},
  'Fresno':           {state:'California',   sa:'CA', stateSlug:'california',       county:'Fresno County',        rc:'No local RC',                     court:'Fresno Superior Court',                            tip:'Fresno is subject to AB 1482 state rent limits for qualifying buildings; no local rent control.'},
  'Sacramento':       {state:'California',   sa:'CA', stateSlug:'california',       county:'Sacramento County',    rc:'Yes — AB 1482 + local TPO',       court:'Sacramento Superior Court',                        tip:'Sacramento has both state AB 1482 and a local Tenant Protection Ordinance for covered buildings.'},
  'Mesa':             {state:'Arizona',      sa:'AZ', stateSlug:'arizona',          county:'Maricopa County',      rc:'No',                              court:'Mesa Municipal Court',                             tip:'Mesa follows Arizona ARLTA; Maricopa County records all real property deeds for Mesa properties.'},
  'Kansas City':      {state:'Missouri',     sa:'MO', stateSlug:'missouri',         county:'Jackson County',       rc:'No',                              court:'Jackson County Circuit Court',                     tip:'KC straddles MO/KS state lines; confirm which state\'s law applies based on the property address.'},
  'Atlanta':          {state:'Georgia',      sa:'GA', stateSlug:'georgia',          county:'Fulton County',        rc:'No',                              court:'Fulton County Magistrate Court',                   tip:'Atlanta follows Georgia landlord-tenant law; GA landlord lien rights are among the strongest in the US.'},
  'Omaha':            {state:'Nebraska',     sa:'NE', stateSlug:'nebraska',         county:'Douglas County',       rc:'No',                              court:'Douglas County District Court',                    tip:'Omaha follows Nebraska landlord-tenant law; landlords may self-help on commercial evictions.'},
  'Colorado Springs': {state:'Colorado',     sa:'CO', stateSlug:'colorado',         county:'El Paso County',       rc:'No',                              court:'El Paso County Court',                             tip:'Colorado Springs follows Colorado state law; SB21-173 increased notice periods statewide in 2021.'},
  'Raleigh':          {state:'North Carolina',sa:'NC',stateSlug:'north-carolina',   county:'Wake County',          rc:'No',                              court:'Wake County District Court',                       tip:'Raleigh follows NC law; Wake County Register of Deeds records all property documents.'},
  'Long Beach':       {state:'California',   sa:'CA', stateSlug:'california',       county:'Los Angeles County',   rc:'Yes — local TPO 2021',            court:'Long Beach / LA County Superior Court',            tip:'Long Beach adopted its Tenant Protections Ordinance (TPO) in 2021 covering most residential units.'},
  'Virginia Beach':   {state:'Virginia',     sa:'VA', stateSlug:'virginia',         county:'Virginia Beach (independent city)',rc:'No',                  court:'Virginia Beach General District Court',            tip:'Virginia Beach is an independent city; record deeds at the Virginia Beach Circuit Court Clerk.'},
  'Minneapolis':      {state:'Minnesota',    sa:'MN', stateSlug:'minnesota',        county:'Hennepin County',      rc:'Yes — local ordinance',           court:'Hennepin County Housing Court',                    tip:'Minneapolis has a local tenant remedies ordinance; Hennepin County has a dedicated Housing Court.'},
  'Tampa':            {state:'Florida',      sa:'FL', stateSlug:'florida',          county:'Hillsborough County',  rc:'No',                              court:'Hillsborough County Court',                        tip:'Tampa follows Florida landlord-tenant law; 3-day notice required for non-payment of rent.'},
  'New Orleans':      {state:'Louisiana',    sa:'LA', stateSlug:'louisiana',        county:'Orleans Parish',       rc:'No',                              court:'Orleans Civil District Court',                     tip:'New Orleans uses "parish" instead of "county"; record deeds with the Orleans Parish Clerk of Court.'},
  'Arlington':        {state:'Texas',        sa:'TX', stateSlug:'texas',            county:'Tarrant County',       rc:'No',                              court:'Tarrant County Justice of the Peace',              tip:'Arlington follows Texas state law; Tarrant County Clerk records all property deeds.'},
  'Bakersfield':      {state:'California',   sa:'CA', stateSlug:'california',       county:'Kern County',          rc:'No local RC',                     court:'Kern County Superior Court',                       tip:'Bakersfield has no local rent control; state AB 1482 applies to qualifying older buildings.'},
  'Honolulu':         {state:'Hawaii',       sa:'HI', stateSlug:'hawaii',           county:'Honolulu (City and County)', rc:'No',                       court:'Honolulu District Court',                          tip:'Honolulu is both city and county; record deeds with the State Bureau of Conveyances.'},
  'Anaheim':          {state:'California',   sa:'CA', stateSlug:'california',       county:'Orange County',        rc:'No local RC',                     court:'Orange County Superior Court',                     tip:'Anaheim has no local rent control; state AB 1482 rent limits apply to qualifying older buildings.'},
  'Aurora':           {state:'Colorado',     sa:'CO', stateSlug:'colorado',         county:'Arapahoe County',      rc:'No',                              court:'Arapahoe County Court',                            tip:'Aurora spans multiple counties; Arapahoe County Clerk records most Aurora property deeds.'}
};

// Build state→cities map for cross-linking
var stateCities = {};
Object.keys(CITIES).forEach(function(city) {
  var st = CITIES[city].state;
  if (!stateCities[st]) stateCities[st] = [];
  stateCities[st].push(city);
});

function otherCities(city, slug) {
  var st = CITIES[city].state;
  var others = (stateCities[st] || []).filter(function(c){ return c !== city; });
  if (!others.length) return '';
  return '<div style="margin-top:32px"><p class="section-eyebrow">Other ' + st + ' cities</p>'
    + '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px">'
    + others.map(function(c){ return '<a href="/' + c.toLowerCase().replace(/ /g,'-') + '-' + slug + '" style="display:inline-block;padding:6px 14px;border:1px solid var(--border);border-radius:20px;font-size:13px;color:var(--ink-1);text-decoration:none">' + c + '</a>'; }).join('')
    + '</div></div>';
}

var NAV = '<header class="site-header"><div class="header-inner"><a href="/" class="site-logo">FreeDoc<span>Templates</span></a><nav class="main-nav" aria-label="Main"><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Templates <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/lease-agreement-template" class="nav-item">Lease Agreement</a><a href="/eviction-notice-template" class="nav-item">Eviction Notice</a><a href="/bill-of-sale-template" class="nav-item">Bill of Sale</a><a href="/quitclaim-deed-template" class="nav-item">Quitclaim Deed</a><a href="/power-of-attorney-template" class="nav-item">Power of Attorney</a></div></div></nav><div class="header-actions"><a href="/tools" class="btn-all-tools">All Templates</a><button id="btn-search" class="btn-search" aria-label="Search templates"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></button></div></div></header><div class="cmd-overlay" id="cmd-overlay"><div class="cmd-modal"><div class="cmd-header"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input class="cmd-input" id="cmd-input" placeholder="Search templates\u2026" autocomplete="off"></div><div class="cmd-body" id="cmd-body"></div></div></div>';

var FTR = '<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p></div><div><div class="footer-col-title">Templates</div><nav class="footer-nav"><a href="/lease-agreement-template">Lease Agreement</a><a href="/eviction-notice-template">Eviction Notice</a><a href="/quitclaim-deed-template">Quitclaim Deed</a><a href="/power-of-attorney-template">Power of Attorney</a></nav></div></div><div class="footer-bottom"><p>\u00a9 2026 FreeDocTemplates.xyz</p></div></div></footer>';

function wrap(title, desc, canon, body) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + '</title><meta name="description" content="' + desc + '"><link rel="canonical" href="https://www.freedoctemplates.xyz/' + canon + '"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=1"></head><body>' + NAV + '<main class="page-wrap">' + body + '</main>' + FTR + '<script src="/shared/scripts.js?v=1" defer><\/script></body></html>';
}

function stateLink(d, slug, label) {
  if (!d.stateSlug) return '';
  return '<div style="margin-top:20px;padding:16px;background:var(--surface-2);border:1px solid var(--border);border-radius:10px">'
    + '<p style="font-size:13px;color:var(--ink-2);margin-bottom:6px">' + d.state + ' state law applies:</p>'
    + '<a href="/' + d.stateSlug + '-' + slug + '" style="font-weight:600;color:var(--accent);text-decoration:none">&#8594; ' + d.state + ' ' + label + ' →</a>'
    + '</div>';
}

// ── 1. LEASE ──────────────────────────────────────────────────────────────────
function leasePage(city, d) {
  var sl = city.toLowerCase().replace(/ /g, '-');
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/lease-agreement-template">Lease Agreement</a><span>&#8250;</span>'
    + (d.stateSlug ? '<a href="/' + d.stateSlug + '-lease-agreement-template">' + d.state + '</a><span>&#8250;</span>' : '')
    + '<span aria-current="page">' + city + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + city + ', ' + d.sa + ' Lease Agreement Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; ' + d.state + ' law</span><span class="page-badge">&#10003; Rent control: ' + d.rc + '</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + city + ' Rental Law Overview</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">State Law</td><td style="padding:10px 0;font-weight:600">' + d.state + ' Landlord-Tenant Act</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Rent Control</td><td style="padding:10px 0;font-weight:600">' + d.rc + '</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Eviction Court</td><td style="padding:10px 0;font-weight:600">' + d.court + '</td></tr>'
    + '</table></div>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Lease Agreements in ' + city + ', ' + d.sa + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">Residential leases in ' + city + ' are governed by <strong>' + d.state + '</strong> landlord-tenant law. Rent control status in ' + city + ': <strong>' + d.rc + '</strong>. Both landlords and tenants should have a signed written lease agreement before any tenancy begins — it defines rent, deposit, maintenance responsibilities, and the notice required to end the tenancy.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:24px">If a lease dispute goes to court in ' + city + ', it is filed at <strong>' + d.court + '</strong>. A clear, state-compliant lease agreement is your best protection against disputes.</p>'
    + '<div style="text-align:center;margin-bottom:32px"><a href="/lease-agreement-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + city + ' Lease &#8594; Free Generator</a></div>'
    + stateLink(d, 'lease-agreement-template', 'Lease Agreement — State Law Guide')
    + '<section class="faq-section" style="margin:32px -24px 0;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + city + ' lease questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Is there rent control in ' + city + '?</summary><div class="faq-a">Rent control status in ' + city + ': <strong>' + d.rc + '</strong>. Check whether your specific property is covered — exemptions commonly apply to newer construction, single-family homes, or owner-occupied duplexes. Consult a local attorney if unsure.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What court handles evictions in ' + city + '?</summary><div class="faq-a">Eviction cases in ' + city + ' are filed at the <strong>' + d.court + '</strong>. After serving the required notice (typically 3–14 days depending on the violation), the landlord files an unlawful detainer or eviction lawsuit in this court.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does a lease in ' + city + ' need to be notarized?</summary><div class="faq-a">No. A residential lease agreement in ' + city + ' does not need to be notarized to be legally binding. It is enforceable once both the landlord and tenant sign it. Both parties should keep a signed copy.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What is the security deposit limit in ' + city + '?</summary><div class="faq-a">Security deposit limits are set by <strong>' + d.state + '</strong> state law, not by the city. Check the ' + d.state + ' lease agreement state page for the current security deposit limit, interest requirements, and return deadline.</div></details>'
    + '</div></section>'
    + otherCities(city, 'lease-agreement-template')
    + '</div>';
  return wrap('Free ' + city + ', ' + d.sa + ' Lease Agreement Template 2026',
    'Free ' + city + ', ' + d.sa + ' lease agreement template. Rent control: ' + d.rc + '. ' + d.state + ' law. Fill in online, download PDF. No account needed.',
    sl + '-lease-agreement-template', body);
}

// ── 2. EVICTION ────────────────────────────────────────────────────────────────
function evicPage(city, d) {
  var sl = city.toLowerCase().replace(/ /g, '-');
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/eviction-notice-template">Eviction Notice</a><span>&#8250;</span>'
    + (d.stateSlug ? '<a href="/' + d.stateSlug + '-eviction-notice-template">' + d.state + '</a><span>&#8250;</span>' : '')
    + '<span aria-current="page">' + city + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + city + ', ' + d.sa + ' Eviction Notice Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; ' + d.state + ' law</span><span class="page-badge">&#10003; Pay or quit</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + city + ' Eviction Overview</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Governing Law</td><td style="padding:10px 0;font-weight:600">' + d.state + ' Landlord-Tenant Act</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Eviction Court</td><td style="padding:10px 0;font-weight:600">' + d.court + '</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Tenant Protections</td><td style="padding:10px 0;font-weight:600">' + d.rc + '</td></tr>'
    + '</table></div>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Eviction Process in ' + city + ', ' + d.sa + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">Evictions in ' + city + ' are governed by <strong>' + d.state + '</strong> landlord-tenant law. The landlord must first serve a written notice (pay or quit, cure or quit, or unconditional quit) and wait for the notice period to expire before filing at the <strong>' + d.court + '</strong>.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:24px">Self-help evictions — changing locks, removing belongings, or cutting utilities without a court order — are illegal everywhere, including ' + city + '. Always follow the formal notice and court process.</p>'
    + '<div style="text-align:center;margin-bottom:32px"><a href="/eviction-notice-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + city + ' Eviction Notice &#8594; Free Generator</a></div>'
    + stateLink(d, 'eviction-notice-template', 'Eviction Notice — State Notice Periods')
    + '<section class="faq-section" style="margin:32px -24px 0;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + city + ' eviction questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Where do I file an eviction in ' + city + '?</summary><div class="faq-a">Eviction (unlawful detainer) cases in ' + city + ' are filed at the <strong>' + d.court + '</strong>. After the notice period expires without the tenant paying or leaving, the landlord files an eviction petition and the court schedules a hearing.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">How long does eviction take in ' + city + '?</summary><div class="faq-a">The eviction process in ' + city + ' typically takes 4–10 weeks from serving notice to the sheriff enforcing a writ of possession. This includes the notice period, court filing, a hearing date (usually 1–3 weeks out), and if the landlord wins, the time to obtain and execute the writ.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does ' + city + ' have just cause eviction requirements?</summary><div class="faq-a">Just cause eviction requirements in ' + city + ': <strong>' + d.rc + '</strong>. Where just cause protections apply, landlords cannot evict tenants without a legally recognized reason (non-payment, lease violation, owner move-in, etc.) even if the lease has ended.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Can a landlord evict a tenant without notice in ' + city + '?</summary><div class="faq-a">No. ' + city + ' landlords must serve proper written notice and wait for the notice period to expire before filing for eviction. Locking out a tenant, removing their belongings, or cutting utilities without a court order is an illegal self-help eviction.</div></details>'
    + '</div></section>'
    + otherCities(city, 'eviction-notice-template')
    + '</div>';
  return wrap('Free ' + city + ', ' + d.sa + ' Eviction Notice Template 2026',
    'Free ' + city + ', ' + d.sa + ' eviction notice template. File at ' + d.court + '. Pay or quit, cure or quit, unconditional. ' + d.state + ' law. Download PDF.',
    sl + '-eviction-notice-template', body);
}

// ── 3. BILL OF SALE ────────────────────────────────────────────────────────────
function bosPage(city, d) {
  var sl = city.toLowerCase().replace(/ /g, '-');
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/bill-of-sale-template">Bill of Sale</a><span>&#8250;</span>'
    + (d.stateSlug ? '<a href="/' + d.stateSlug + '-bill-of-sale-template">' + d.state + '</a><span>&#8250;</span>' : '')
    + '<span aria-current="page">' + city + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + city + ', ' + d.sa + ' Bill of Sale Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">A bill of sale documents vehicle, boat, and personal property sales in ' + city + ', ' + d.sa + '. ' + d.state + ' law governs title transfers.</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; Vehicle, boat, general</span><span class="page-badge">&#10003; ' + d.state + ' law</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + city + ' Bill of Sale Overview</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Governing Law</td><td style="padding:10px 0;font-weight:600">' + d.state + ' Motor Vehicle Code</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Title Transfer County</td><td style="padding:10px 0;font-weight:600">' + d.county + '</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Notarization</td><td style="padding:10px 0;font-weight:600">May be required for title</td></tr>'
    + '</table></div>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Bill of Sale in ' + city + ', ' + d.sa + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">A bill of sale for a vehicle or personal property in ' + city + ' is governed by <strong>' + d.state + '</strong> law. For vehicle title transfers, take the signed bill of sale and the title to the <strong>' + d.county + '</strong> DMV or tax collector\'s office to complete the transfer and pay any applicable sales tax.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:24px">Always document private-party sales with a written bill of sale — it protects both the buyer (proof of purchase) and the seller (releases liability for the vehicle after sale).</p>'
    + '<div style="text-align:center;margin-bottom:32px"><a href="/bill-of-sale-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + city + ' Bill of Sale &#8594; Free Generator</a></div>'
    + stateLink(d, 'bill-of-sale-template', 'Bill of Sale — State Title Transfer Guide')
    + '<section class="faq-section" style="margin:32px -24px 0;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + city + ' bill of sale questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Where do I transfer a vehicle title in ' + city + '?</summary><div class="faq-a">To transfer a vehicle title in ' + city + ', take the signed title and bill of sale to the <strong>' + d.county + '</strong> DMV office or motor vehicle department. You will need to pay a title transfer fee and any applicable sales tax on the sale price.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does a bill of sale need to be notarized in ' + city + '?</summary><div class="faq-a">Some states require a notarized bill of sale for vehicle title transfers. Check current ' + d.state + ' DMV requirements for your vehicle type. For general personal property (not requiring title transfer), notarization is not legally required but adds credibility.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">How long do I have to transfer a vehicle title in ' + d.state + '?</summary><div class="faq-a">Most states require vehicle title transfers within 30 days of the sale. Missing this deadline may result in late fees. After the sale, the seller should remove their name from the registration and notify the DMV to avoid liability for the vehicle.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Can I use a bill of sale as proof of ownership?</summary><div class="faq-a">A bill of sale proves you purchased the item but is not the same as a legal title. For vehicles, boats, and real property, you must also transfer the title document. For general personal property without a title, a signed bill of sale is the primary proof of ownership.</div></details>'
    + '</div></section>'
    + otherCities(city, 'bill-of-sale-template')
    + '</div>';
  return wrap('Free ' + city + ', ' + d.sa + ' Bill of Sale Template 2026',
    'Free ' + city + ', ' + d.sa + ' bill of sale template. Vehicle, boat, and general property. ' + d.state + ' law. Transfer title at ' + d.county + '. Download PDF.',
    sl + '-bill-of-sale-template', body);
}

// ── 4. QUITCLAIM DEED ──────────────────────────────────────────────────────────
function qcPage(city, d) {
  var sl = city.toLowerCase().replace(/ /g, '-');
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/quitclaim-deed-template">Quitclaim Deed</a><span>&#8250;</span>'
    + (d.stateSlug ? '<a href="/' + d.stateSlug + '-quitclaim-deed-template">' + d.state + '</a><span>&#8250;</span>' : '')
    + '<span aria-current="page">' + city + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + city + ', ' + d.sa + ' Quitclaim Deed Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">Transfer real property in ' + city + ' between spouses, family members, or to an LLC. Record with the <strong>' + d.county + '</strong>.</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; Notary block included</span><span class="page-badge">&#10003; Record at ' + d.county + '</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + city + ' Deed Recording</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Recording Office</td><td style="padding:10px 0;font-weight:600">' + d.county + '</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Governing Law</td><td style="padding:10px 0;font-weight:600">' + d.state + ' Property Code</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Notarization</td><td style="padding:10px 0;font-weight:600">Required before recording</td></tr>'
    + '</table></div>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Recording a Quitclaim Deed in ' + city + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">To transfer real property in ' + city + ' using a quitclaim deed, the grantor must sign before a notary public, then record the deed with the <strong>' + d.county + '</strong> recorder of deeds. The transfer is legally effective against third parties only after recording.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:24px">Quitclaim deeds in ' + city + ' are commonly used for transfers between spouses (divorce or marriage), parent-to-child transfers, transfers to a revocable living trust, or transferring a personal property into an LLC. For arm\'s-length sales, use a warranty deed instead.</p>'
    + '<div style="text-align:center;margin-bottom:32px"><a href="/quitclaim-deed-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + city + ' Quitclaim Deed &#8594; Free Generator</a></div>'
    + stateLink(d, 'quitclaim-deed-template', 'Quitclaim Deed — State Transfer Tax & Fees')
    + '<section class="faq-section" style="margin:32px -24px 0;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + city + ' quitclaim deed questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Where do I record a quitclaim deed in ' + city + '?</summary><div class="faq-a">Record the deed at the <strong>' + d.county + '</strong> recorder or register of deeds office. Bring the original notarized deed plus the recording fee. Some counties accept mail-in recording. The deed becomes public record once filed.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">How much does it cost to record a deed in ' + city + '?</summary><div class="faq-a">Recording fees in ' + d.county + ' vary but are typically $10–$60 per page. Many states also impose a documentary transfer or conveyance tax based on the sale price. See the ' + d.state + ' quitclaim deed state page for the current transfer tax rate.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Do I need a lawyer to prepare a quitclaim deed in ' + city + '?</summary><div class="faq-a">A lawyer is not legally required to prepare a quitclaim deed in ' + city + ' for simple transfers (spouses, family, to a trust). However, for complex situations — transfers affecting a mortgage, transfers with tax implications, or disputed ownership — consulting a ' + d.state + ' real estate attorney is recommended.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">How long does recording a deed take in ' + city + '?</summary><div class="faq-a">Recording is typically same-day or within a few business days when you bring the deed to the ' + d.county + ' recorder\'s office in person. Mail-in recording may take 1–2 weeks. You will receive a stamped copy with the recording information as proof of recording.</div></details>'
    + '</div></section>'
    + otherCities(city, 'quitclaim-deed-template')
    + '</div>';
  return wrap('Free ' + city + ', ' + d.sa + ' Quitclaim Deed Template 2026',
    'Free ' + city + ', ' + d.sa + ' quitclaim deed template. Record with ' + d.county + '. Notary block included. Transfer between spouses, family, or to LLC. Download PDF.',
    sl + '-quitclaim-deed-template', body);
}

// ── 5. POWER OF ATTORNEY ───────────────────────────────────────────────────────
function poaPage(city, d) {
  var sl = city.toLowerCase().replace(/ /g, '-');
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/power-of-attorney-template">Power of Attorney</a><span>&#8250;</span>'
    + (d.stateSlug ? '<a href="/' + d.stateSlug + '-power-of-attorney-template">' + d.state + '</a><span>&#8250;</span>' : '')
    + '<span aria-current="page">' + city + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + city + ', ' + d.sa + ' Power of Attorney Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">Create a general, durable, limited, or medical POA under ' + d.state + ' law. Notarization available at banks, UPS stores, and courthouses throughout ' + city + '.</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; ' + d.state + ' law</span><span class="page-badge">&#10003; Notary block included</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + city + ' POA Requirements</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Governing Law</td><td style="padding:10px 0;font-weight:600">' + d.state + ' Power of Attorney Act</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Notarization Required</td><td style="padding:10px 0;font-weight:600;color:var(--accent)">Yes — required</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Where to Notarize in ' + city + '</td><td style="padding:10px 0;font-weight:600">Banks, UPS, FedEx, law offices, courthouse</td></tr>'
    + '</table></div>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Power of Attorney in ' + city + ', ' + d.sa + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">A power of attorney (POA) in ' + city + ' is governed by <strong>' + d.state + '</strong> law. The principal (person granting authority) must sign the POA before a notary public. Most ' + d.state + ' POAs also require one or two witnesses, depending on the type of POA.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:24px">In ' + city + ', notary services are widely available at banks (Bank of America, Chase, Wells Fargo), shipping stores (UPS, FedEx), title companies, law offices, and online through remote notarization services. A durable POA remains in effect even if the principal becomes incapacitated.</p>'
    + '<div style="text-align:center;margin-bottom:32px"><a href="/power-of-attorney-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + city + ' Power of Attorney &#8594; Free Generator</a></div>'
    + stateLink(d, 'power-of-attorney-template', 'Power of Attorney — State Witness & Notary Requirements')
    + '<section class="faq-section" style="margin:32px -24px 0;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + city + ' power of attorney questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Where can I get a power of attorney notarized in ' + city + '?</summary><div class="faq-a">In ' + city + ', POA notarization services are available at banks (free for account holders), UPS and FedEx stores, title companies, law offices, hospitals (for medical POAs), and through online notary services (if ' + d.state + ' permits remote notarization). Mobile notaries will also come to your location.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">How many witnesses does a POA require in ' + d.state + '?</summary><div class="faq-a">Witness requirements vary by ' + d.state + ' law and the type of POA. Financial (general/durable) POAs typically require 1–2 witnesses plus a notary. Healthcare POAs often require 2 witnesses. Check the ' + d.state + ' power of attorney state page for current witness requirements.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What is the difference between a durable and a limited POA?</summary><div class="faq-a">A <strong>durable POA</strong> remains in effect if the principal becomes incapacitated — it is used for long-term financial planning and elder care. A <strong>limited POA</strong> authorizes the agent to perform a specific act (like signing a real estate closing) and expires after that act is complete.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does a power of attorney expire in ' + d.state + '?</summary><div class="faq-a">A durable POA in ' + d.state + ' does not expire unless you set an expiration date in the document or revoke it in writing. It automatically terminates at the principal\'s death. A non-durable POA automatically terminates if the principal becomes incapacitated.</div></details>'
    + '</div></section>'
    + otherCities(city, 'power-of-attorney-template')
    + '</div>';
  return wrap('Free ' + city + ', ' + d.sa + ' Power of Attorney Template 2026',
    'Free ' + city + ', ' + d.sa + ' power of attorney template. General, durable, limited, and medical POA. ' + d.state + ' law. Notary block included. Download PDF.',
    sl + '-power-of-attorney-template', body);
}

var counts = {lease:0,evic:0,bos:0,qc:0,poa:0};
Object.keys(CITIES).forEach(function(city) {
  var sl = city.toLowerCase().replace(/ /g, '-');
  var d = CITIES[city];
  fs.writeFileSync(B + sl + '-lease-agreement-template.html', leasePage(city, d)); counts.lease++;
  fs.writeFileSync(B + sl + '-eviction-notice-template.html', evicPage(city, d)); counts.evic++;
  fs.writeFileSync(B + sl + '-bill-of-sale-template.html', bosPage(city, d)); counts.bos++;
  fs.writeFileSync(B + sl + '-quitclaim-deed-template.html', qcPage(city, d)); counts.qc++;
  fs.writeFileSync(B + sl + '-power-of-attorney-template.html', poaPage(city, d)); counts.poa++;
});
var total = counts.lease + counts.evic + counts.bos + counts.qc + counts.poa;
console.log('Lease:', counts.lease, '| Eviction:', counts.evic, '| BoS:', counts.bos, '| QC:', counts.qc, '| POA:', counts.poa, '| TOTAL:', total);
