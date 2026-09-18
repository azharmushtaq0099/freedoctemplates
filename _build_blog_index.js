const fs = require('fs');
const B = 'C:/Users/mastr/claude co/legal-docs/';
fs.mkdirSync(B + 'blog', {recursive:true});

var NAV = '<header class="site-header"><div class="header-inner"><a href="/" class="site-logo">FreeDoc<span>Templates</span></a><nav class="main-nav" aria-label="Main"><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Templates <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/lease-agreement-template" class="nav-item">Lease Agreement</a><a href="/eviction-notice-template" class="nav-item">Eviction Notice</a><a href="/bill-of-sale-template" class="nav-item">Bill of Sale</a><a href="/quitclaim-deed-template" class="nav-item">Quitclaim Deed</a><a href="/power-of-attorney-template" class="nav-item">Power of Attorney</a></div></div></nav><div class="header-actions"><a href="/tools" class="btn-all-tools">All Templates</a><button id="btn-search" class="btn-search" aria-label="Search templates"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></button></div></div></header><div class="cmd-overlay" id="cmd-overlay"><div class="cmd-modal"><div class="cmd-header"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input class="cmd-input" id="cmd-input" placeholder="Search templates\u2026" autocomplete="off"></div><div class="cmd-body" id="cmd-body"></div></div></div>';
var FTR = '<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p></div><div><div class="footer-col-title">Templates</div><nav class="footer-nav"><a href="/lease-agreement-template">Lease Agreement</a><a href="/eviction-notice-template">Eviction Notice</a><a href="/quitclaim-deed-template">Quitclaim Deed</a><a href="/power-of-attorney-template">Power of Attorney</a></nav></div></div><div class="footer-bottom"><p>\u00a9 2026 FreeDocTemplates.xyz</p></div></div></footer>';

function wrap(title, desc, canon, body) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + '</title><meta name="description" content="' + desc + '"><link rel="canonical" href="https://www.freedoctemplates.xyz/' + canon + '"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=1"></head><body>' + NAV + '<main class="page-wrap">' + body + '</main>' + FTR + '<script src="/shared/scripts.js?v=1" defer><\/script></body></html>';
}

var POSTS = [
  {slug:'how-to-write-a-lease-agreement',     title:'How to Write a Lease Agreement (2026 Guide)',                    tag:'Lease',       desc:'Step-by-step: what every residential lease must include, state requirements, and signing correctly.'},
  {slug:'how-to-evict-a-tenant',               title:'How to Evict a Tenant: Step-by-Step (2026)',                    tag:'Eviction',    desc:'Notices, court filing, hearings, and writ enforcement — the complete legal process.'},
  {slug:'eviction-notice-vs-notice-to-vacate', title:'Eviction Notice vs Notice to Vacate: What\'s the Difference?', tag:'Eviction',    desc:'Using the wrong document can restart your case. Learn which one applies to your situation.'},
  {slug:'what-is-a-quitclaim-deed',            title:'What Is a Quitclaim Deed? When and How to Use One',            tag:'Real Estate', desc:'Quitclaim vs warranty deed, when to use each, and how to record it correctly.'},
  {slug:'what-is-power-of-attorney',           title:'What Is a Power of Attorney? Types, Uses, and How to Create',  tag:'POA',         desc:'General, durable, limited, healthcare — the four types explained.'},
  {slug:'how-to-write-a-last-will',            title:'How to Write a Last Will and Testament (2026 Guide)',           tag:'Estate',      desc:'Requirements, what to include, holographic wills, and common mistakes.'},
  {slug:'what-is-an-nda',                      title:'What Is a Non-Disclosure Agreement (NDA)?',                    tag:'Business',    desc:'Types, required clauses, state restrictions on employee NDAs, and enforceability.'},
  {slug:'employee-vs-independent-contractor',  title:'Employee vs Independent Contractor: How to Tell the Difference',tag:'Business',   desc:'ABC test, IRS 20-factor test — how states classify workers and the cost of getting it wrong.'},
  {slug:'how-to-write-a-promissory-note',      title:'How to Write a Promissory Note (Free Template + Guide)',       tag:'Financial',   desc:'Required elements, interest rate limits by state, secured vs unsecured, default clauses.'},
  {slug:'non-compete-agreement-enforceability',title:'Are Non-Compete Agreements Enforceable? State-by-State Guide', tag:'Business',   desc:'California bans them. Minnesota too. Learn which states enforce non-competes and how courts decide.'},
  {slug:'how-to-write-a-bill-of-sale-for-a-car',title:'How to Write a Bill of Sale for a Car (2026)',               tag:'Bill of Sale',desc:'VINs, title transfer steps, as-is disclaimers, and seller liability protections.'},
  {slug:'how-long-does-eviction-take',         title:'How Long Does an Eviction Take? State-by-State Timeline',      tag:'Eviction',   desc:'Notice to writ enforcement — the full 4-phase timeline by state.'},
  {slug:'lease-vs-month-to-month',             title:'Lease Agreement vs Month-to-Month Rental: Which Is Better?',   tag:'Lease',      desc:'Pros and cons for landlords and tenants, rent increases, and holdover rules.'},
  {slug:'how-to-write-an-employment-contract', title:'How to Write an Employment Contract (2026 Guide)',              tag:'Business',   desc:'At-will vs for-cause, IP assignment, severance, and what every contract must include.'},
  {slug:'security-deposit-laws-by-state',      title:'Security Deposit Laws by State: Limits, Returns, Deductions',  tag:'Lease',      desc:'Caps, return deadlines, and penalties for non-compliance in all 50 states.'},
  {slug:'how-to-write-an-affidavit',           title:'How to Write an Affidavit: Format, Requirements, Free Template',tag:'Legal',     desc:'Required elements, how to write clear statements, and getting it notarized.'},
  {slug:'divorce-settlement-agreement-guide',  title:'Divorce Settlement Agreement: What to Include (2026 Guide)',   tag:'Family',     desc:'Property, debt, custody, support, retirement accounts — complete checklist.'},
  {slug:'how-to-write-a-personal-loan-agreement',title:'How to Write a Personal Loan Agreement Between Friends or Family',tag:'Financial',desc:'IRS AFR rules, what to include, and what to do when the borrower can\'t pay.'},
  {slug:'what-should-an-llc-operating-agreement-include',title:'What Should an LLC Operating Agreement Include?',  tag:'Business',   desc:'Membership structure, management type, profit allocation, buyout clauses — complete checklist.'},
  {slug:'what-is-community-property-divorce',  title:'Community Property in Divorce: Which States and What It Means',tag:'Family',    desc:'The 9 community property states, what counts as community property, and debt division.'},
  {slug:'just-cause-eviction',                 title:'What Is Just Cause Eviction? Tenant Protections Explained',    tag:'Eviction',   desc:'Which states and cities require just cause, what the permitted reasons are, and owner move-in rules.'},
  {slug:'can-landlord-enter-without-notice',   title:'Can a Landlord Enter Without Notice? State-by-State Rules',    tag:'Lease',      desc:'24 vs 48 hours — the required notice period in all 50 states and emergency exceptions.'},
  {slug:'how-to-dissolve-an-llc',              title:'How to Dissolve an LLC: Step-by-Step Guide (2026)',            tag:'Business',   desc:'Vote, wind up, file articles of dissolution, and handle final taxes — the full process.'},
  {slug:'commercial-lease-vs-residential-lease',title:'Commercial Lease vs Residential Lease: 7 Key Differences',   tag:'Real Estate',desc:'NNN vs gross, personal guarantees, co-tenancy clauses — what you must know before signing.'},
  {slug:'power-of-attorney-for-elderly-parent',title:'How to Get Power of Attorney for an Elderly Parent',          tag:'POA',        desc:'Why timing matters, which type to get, how to execute it, and what to do if they can\'t sign.'},
  {slug:'joint-tenancy-vs-tenancy-in-common',  title:'Joint Tenancy vs Tenancy in Common: What\'s the Difference?', tag:'Real Estate',desc:'Survivorship rights, divorce impact, partition actions, and which is right for co-buyers.'},
  {slug:'what-is-a-cease-and-desist-letter',   title:'What Is a Cease and Desist Letter? How to Write One That Works',tag:'Legal',    desc:'When to use one, what to include, and whether it needs to come from a lawyer.'},
  {slug:'how-to-write-a-demand-letter',        title:'How to Write a Demand Letter: Template, Format & Tips',        tag:'Legal',     desc:'Required elements, the right tone, and why small claims courts expect one before you sue.'},
  {slug:'llc-vs-sole-proprietorship',          title:'LLC vs Sole Proprietorship: Which Is Better for Your Business?',tag:'Business', desc:'Personal liability, tax treatment, cost comparison — and when each makes sense.'},
  {slug:'what-to-include-in-a-freelancer-contract',title:'What to Include in a Freelancer Contract (2026 Checklist)',tag:'Business', desc:'Scope, payment, IP assignment, kill fees — the 8 clauses every freelance contract needs.'},
  {slug:'how-to-register-an-llc',              title:'How to Register an LLC: Step-by-Step (2026)',                  tag:'Business',  desc:'Choose a state, file articles of organization, get an EIN, and open a bank account.'},
  {slug:'roommate-agreement-what-to-include',  title:'Roommate Agreement: What to Include (Complete Checklist)',     tag:'Personal',  desc:'Rent splits, guest policies, chores, moving out — all the clauses that prevent conflict.'},
  {slug:'how-to-write-a-notice-to-vacate-as-tenant',title:'How to Write a Notice to Vacate as a Tenant (2026)',    tag:'Lease',     desc:'Required notice periods by state, what the letter must say, and how to deliver it properly.'},
  {slug:'eviction-without-a-lease',            title:'Evicting a Tenant Without a Written Lease: What Landlords Need to Know',tag:'Eviction',desc:'Month-to-month, verbal leases, and holdover tenants — the eviction rules when there\'s no written lease.'},
  {slug:'affidavit-of-heirship',               title:'What Is an Affidavit of Heirship? How to Transfer Property Without Probate',tag:'Estate',desc:'Which states allow it, requirements, holding periods, and when to use it vs full probate.'},
  {slug:'independent-contractor-agreement-what-to-include',title:'Independent Contractor Agreement: 8 Clauses You Must Have',tag:'Business',desc:'Contractor status clause, scope, IP assignment, payment, confidentiality — all 8 non-negotiables.'},
  {slug:'how-to-transfer-a-car-title',         title:'How to Transfer a Car Title After a Private Sale',            tag:'Bill of Sale',desc:'Seller and buyer steps, state deadlines, "and" vs "or" on joint titles, and the Notice of Transfer.'},
  {slug:'how-to-enforce-a-non-compete',        title:'How to Enforce a Non-Compete Agreement (Employer\'s Guide)',  tag:'Business',  desc:'C&D letter, TRO, preliminary injunction — the enforcement sequence and what courts require.'},
  {slug:'single-member-vs-multi-member-llc',   title:'Single-Member vs Multi-Member LLC: Key Differences',          tag:'Business',  desc:'Tax treatment, veil-piercing risk, operating agreement requirements — the key differences.'}
];

var tagColors = {
  'Lease':'#3b82f6','Eviction':'#ef4444','Real Estate':'#8b5cf6','POA':'#06b6d4',
  'Estate':'#6366f1','Business':'#f59e0b','Financial':'#10b981','Legal':'#64748b',
  'Bill of Sale':'#14b8a6','Family':'#ec4899'
};

var cards = POSTS.map(function(p) {
  var color = tagColors[p.tag] || '#6366f1';
  return '<a href="/blog/' + p.slug + '" style="display:block;padding:22px 24px;border:1px solid var(--border);border-radius:12px;text-decoration:none;background:var(--surface-1);transition:border-color .15s,transform .15s">'
    + '<div style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;color:#fff;background:' + color + ';margin-bottom:10px">' + p.tag + '</div>'
    + '<div style="font-weight:700;font-size:16px;color:var(--ink-1);margin-bottom:8px;line-height:1.4">' + p.title + '</div>'
    + '<div style="font-size:13px;color:var(--ink-2);line-height:1.5">' + p.desc + '</div>'
    + '</a>';
}).join('');

var body = '<div class="container">'
  + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><span aria-current="page">Legal Guides</span></nav>'
  + '<h1 class="page-title" data-enter>Free Legal Guides & How-To Articles</h1>'
  + '<p class="page-sub" data-enter data-delay="1">Plain-English guides to leases, evictions, wills, LLCs, and more. Written for US landlords, tenants, small businesses, and individuals.</p>'
  + '</div>'
  + '<div class="container" style="margin-top:40px">'
  + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">'
  + cards
  + '</div>'
  + '</div>';

fs.writeFileSync(B + 'blog.html', wrap(
  'Free Legal Guides & How-To Articles | FreeDocTemplates',
  'Plain-English legal guides — how to write a lease, evict a tenant, create an LLC, write a will, and more. Free templates included.',
  'blog',
  body
));
console.log('Blog index: 1 page | Articles listed: ' + POSTS.length);
