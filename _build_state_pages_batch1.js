const fs = require('fs');
const B = 'C:/Users/mastr/claude co/legal-docs/';
const STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

const WILL = {
  'Alabama':{'w':2,'holo':true,'sp':true,'tip':'Alabama recognizes holographic wills; two witnesses are still strongly recommended.'},
  'Alaska':{'w':2,'holo':true,'sp':true,'tip':'Alaska follows the Uniform Probate Code; small estates under $50,000 may avoid full probate.'},
  'Arizona':{'w':2,'holo':true,'sp':true,'tip':'Arizona is a community property state — coordinate your will with your spouse\'s estate plan.'},
  'Arkansas':{'w':2,'holo':true,'sp':true,'tip':'Arkansas recognizes holographic wills; a formally witnessed will is easier to probate.'},
  'California':{'w':2,'holo':true,'sp':false,'tip':'California is a community property state; jointly-titled assets pass by title, not through the will.'},
  'Colorado':{'w':2,'holo':true,'sp':true,'tip':'Colorado permits electronic wills and recently updated its Uniform Probate Code.'},
  'Connecticut':{'w':2,'holo':false,'sp':true,'tip':'Connecticut requires two witnesses; holographic wills have no legal standing here.'},
  'Delaware':{'w':2,'holo':false,'sp':true,'tip':'Delaware witnesses must sign in the testator\'s presence at the same signing ceremony.'},
  'Florida':{'w':2,'holo':false,'sp':true,'tip':'Florida does not recognize holographic wills; a notarized self-proving affidavit is highly recommended.'},
  'Georgia':{'w':2,'holo':false,'sp':true,'tip':'Georgia\'s self-proving affidavit waives the need for witness testimony at probate.'},
  'Hawaii':{'w':2,'holo':true,'sp':true,'tip':'Hawaii adopted the 2019 Uniform Probate Code and now recognizes electronic wills.'},
  'Idaho':{'w':2,'holo':true,'sp':true,'tip':'Idaho is a community property state; list separate vs. community property carefully.'},
  'Illinois':{'w':2,'holo':false,'sp':true,'tip':'Illinois requires two competent witnesses; holographic wills are not valid here.'},
  'Indiana':{'w':2,'holo':false,'sp':false,'tip':'Indiana does not recognize holographic wills and has no self-proving will procedure.'},
  'Iowa':{'w':2,'holo':false,'sp':true,'tip':'Iowa self-proved wills skip witness testimony during probate, saving time and cost.'},
  'Kansas':{'w':2,'holo':false,'sp':true,'tip':'Kansas requires the testator to sign in witnesses\' presence; holographic wills are invalid.'},
  'Kentucky':{'w':2,'holo':true,'sp':true,'tip':'Kentucky recognizes holographic wills if entirely in the testator\'s handwriting.'},
  'Louisiana':{'w':2,'holo':true,'sp':true,'tip':'Louisiana is a civil law state; forced heirship rules may protect children under 24.'},
  'Maine':{'w':2,'holo':true,'sp':true,'tip':'Maine follows the Uniform Probate Code; small estates under $40,000 may use a simplified affidavit.'},
  'Maryland':{'w':2,'holo':false,'sp':true,'tip':'Maryland does not recognize holographic wills executed after 1969; witnesses are mandatory.'},
  'Massachusetts':{'w':2,'holo':false,'sp':true,'tip':'Massachusetts requires both witnesses to be present when the testator signs.'},
  'Michigan':{'w':2,'holo':true,'sp':true,'tip':'Michigan recognizes holographic wills; date, signature, and material terms must be handwritten.'},
  'Minnesota':{'w':2,'holo':false,'sp':true,'tip':'Minnesota requires two witnesses; holographic wills are not legally recognized here.'},
  'Mississippi':{'w':2,'holo':true,'sp':true,'tip':'Mississippi recognizes holographic wills if entirely in the testator\'s own handwriting.'},
  'Missouri':{'w':2,'holo':false,'sp':true,'tip':'Missouri requires two competent witnesses; holographic wills are not valid.'},
  'Montana':{'w':2,'holo':true,'sp':true,'tip':'Montana follows the Uniform Probate Code and recognizes holographic wills.'},
  'Nebraska':{'w':2,'holo':true,'sp':true,'tip':'Nebraska recognizes holographic wills and follows the Uniform Probate Code.'},
  'Nevada':{'w':2,'holo':true,'sp':true,'tip':'Nevada is a community property state; holographic wills are valid if entirely handwritten.'},
  'New Hampshire':{'w':2,'holo':false,'sp':true,'tip':'New Hampshire requires two witnesses and does not recognize holographic wills.'},
  'New Jersey':{'w':2,'holo':true,'sp':true,'tip':'New Jersey recognizes holographic wills under its updated Uniform Probate Code.'},
  'New Mexico':{'w':2,'holo':false,'sp':true,'tip':'New Mexico is a community property state; holographic wills have very limited recognition.'},
  'New York':{'w':2,'holo':false,'sp':true,'tip':'New York does not recognize holographic wills except for active military members.'},
  'North Carolina':{'w':2,'holo':true,'sp':true,'tip':'North Carolina recognizes holographic wills if entirely in the testator\'s own handwriting.'},
  'North Dakota':{'w':2,'holo':true,'sp':true,'tip':'North Dakota follows the Uniform Probate Code and recognizes holographic wills.'},
  'Ohio':{'w':2,'holo':false,'sp':true,'tip':'Ohio eliminated holographic will recognition in 1976; two witnesses are mandatory.'},
  'Oklahoma':{'w':2,'holo':true,'sp':true,'tip':'Oklahoma recognizes holographic wills if entirely in the testator\'s handwriting.'},
  'Oregon':{'w':2,'holo':false,'sp':true,'tip':'Oregon requires two witnesses at signing; holographic wills are not recognized.'},
  'Pennsylvania':{'w':2,'holo':true,'sp':true,'tip':'Pennsylvania recognizes holographic wills; they are common for simple estates.'},
  'Rhode Island':{'w':2,'holo':false,'sp':true,'tip':'Rhode Island requires formal execution with two witnesses; holographic wills are invalid.'},
  'South Carolina':{'w':2,'holo':false,'sp':true,'tip':'South Carolina requires strict formal execution; holographic wills are not valid.'},
  'South Dakota':{'w':2,'holo':true,'sp':true,'tip':'South Dakota follows the Uniform Probate Code and recognizes holographic wills.'},
  'Tennessee':{'w':2,'holo':true,'sp':true,'tip':'Tennessee recognizes holographic wills; they go through a separate probate procedure.'},
  'Texas':{'w':2,'holo':true,'sp':true,'tip':'Texas is a community property state; holographic wills are valid if entirely handwritten.'},
  'Utah':{'w':2,'holo':true,'sp':true,'tip':'Utah permits electronic wills and recognizes holographic wills under the UPC.'},
  'Vermont':{'w':3,'holo':false,'sp':true,'tip':'Vermont requires THREE witnesses — the only state with this rule; holographic wills are not valid.'},
  'Virginia':{'w':2,'holo':true,'sp':true,'tip':'Virginia recognizes holographic wills entirely in the testator\'s handwriting; no witnesses needed.'},
  'Washington':{'w':2,'holo':false,'sp':true,'tip':'Washington is a community property state and does not recognize holographic wills.'},
  'West Virginia':{'w':2,'holo':true,'sp':true,'tip':'West Virginia recognizes holographic wills if entirely in the testator\'s handwriting.'},
  'Wisconsin':{'w':2,'holo':false,'sp':true,'tip':'Wisconsin is a marital property state and does not recognize holographic wills.'},
  'Wyoming':{'w':2,'holo':true,'sp':true,'tip':'Wyoming follows the Uniform Probate Code and recognizes holographic wills.'}
};

const EVIC = {
  'Alabama':{'pay':7,'cure':14,'nf':30,'tip':'Alabama landlords must file in district court; self-help evictions are illegal.'},
  'Alaska':{'pay':7,'cure':10,'nf':30,'tip':'Alaska requires written notice delivered personally or by certified mail.'},
  'Arizona':{'pay':5,'cure':10,'nf':30,'tip':'Arizona\'s ARLTA requires strict written notice; 3-day notices must not count weekends.'},
  'Arkansas':{'pay':3,'cure':14,'nf':30,'tip':'Arkansas allows filing immediately after the notice period expires.'},
  'California':{'pay':3,'cure':3,'nf':60,'tip':'California requires 60-day no-fault notice for tenants with over 1 year of occupancy.'},
  'Colorado':{'pay':10,'cure':10,'nf':91,'tip':'Colorado SB21-173 increased non-payment notice from 3 to 10 days in 2021.'},
  'Connecticut':{'pay':3,'cure':15,'nf':30,'tip':'Connecticut requires a Notice to Quit before filing summary process in housing court.'},
  'Delaware':{'pay':5,'cure':7,'nf':60,'tip':'Delaware requires 60 days notice to terminate a month-to-month tenancy.'},
  'Florida':{'pay':3,'cure':7,'nf':30,'tip':'Florida\'s 3-day pay-or-quit notice must not count weekends or legal holidays.'},
  'Georgia':{'pay':7,'cure':30,'nf':60,'tip':'Georgia requires a written demand letter before filing a dispossessory action.'},
  'Hawaii':{'pay':5,'cure':10,'nf':45,'tip':'Hawaii requires 45-day notice to terminate month-to-month tenancies.'},
  'Idaho':{'pay':3,'cure':3,'nf':30,'tip':'Idaho allows a combined pay-or-quit and quit notice in some circumstances.'},
  'Illinois':{'pay':5,'cure':10,'nf':30,'tip':'Illinois requires notices served by a process server or certified mail.'},
  'Indiana':{'pay':10,'cure':15,'nf':30,'tip':'Indiana allows filing for eviction immediately after the 10-day notice period expires.'},
  'Iowa':{'pay':3,'cure':7,'nf':30,'tip':'Iowa requires written notice delivered personally or posted conspicuously on the door.'},
  'Kansas':{'pay':3,'cure':14,'nf':30,'tip':'Kansas requires a 3-day pay-or-quit notice for non-payment of rent.'},
  'Kentucky':{'pay':7,'cure':15,'nf':30,'tip':'Kentucky\'s URLTA applies in Louisville, Lexington, and most major cities.'},
  'Louisiana':{'pay':5,'cure':5,'nf':10,'tip':'Louisiana has short notice periods; 5 days for non-payment, 10 days for no-fault.'},
  'Maine':{'pay':7,'cure':30,'nf':30,'tip':'Maine requires 30-day written notice to terminate a month-to-month tenancy.'},
  'Maryland':{'pay':10,'cure':30,'nf':60,'tip':'Maryland requires 60-day no-fault termination notice in most counties.'},
  'Massachusetts':{'pay':14,'cure':14,'nf':30,'tip':'Massachusetts requires a 14-day demand for rent before filing summary process.'},
  'Michigan':{'pay':7,'cure':30,'nf':30,'tip':'Michigan allows a combined demand notice covering both payment and possession.'},
  'Minnesota':{'pay':14,'cure':14,'nf':30,'tip':'Minnesota updated to 14-day non-payment notice following 2020 tenant protections.'},
  'Mississippi':{'pay':3,'cure':30,'nf':30,'tip':'Mississippi has a 3-day notice period — among the shortest in the nation.'},
  'Missouri':{'pay':1,'cure':10,'nf':30,'tip':'Missouri rent is due on the due date; landlords may demand immediate payment.'},
  'Montana':{'pay':3,'cure':14,'nf':30,'tip':'Montana notices must specify the exact dollar amount of rent owed.'},
  'Nebraska':{'pay':7,'cure':14,'nf':30,'tip':'Nebraska notices must be delivered in person or posted on the premises.'},
  'Nevada':{'pay':7,'cure':5,'nf':30,'tip':'Nevada requires a 7-day pay or quit notice for non-payment of rent.'},
  'New Hampshire':{'pay':7,'cure':30,'nf':30,'tip':'New Hampshire requires a 7-day demand notice for non-payment of rent.'},
  'New Jersey':{'pay':30,'cure':30,'nf':30,'tip':'New Jersey\'s Anti-Eviction Act provides strong tenant protections; no-cause evictions are limited.'},
  'New Mexico':{'pay':3,'cure':7,'nf':30,'tip':'New Mexico requires a 3-day pay or quit notice for non-payment.'},
  'New York':{'pay':14,'cure':10,'nf':30,'tip':'New York\'s 2019 HSTPA increased non-payment notice from 3 to 14 days.'},
  'North Carolina':{'pay':10,'cure':10,'nf':7,'tip':'North Carolina requires a 10-day written demand notice for money owed.'},
  'North Dakota':{'pay':3,'cure':3,'nf':30,'tip':'North Dakota requires a 3-day notice to pay or quit.'},
  'Ohio':{'pay':3,'cure':3,'nf':30,'tip':'Ohio allows a combined notice covering both payment demand and possession.'},
  'Oklahoma':{'pay':5,'cure':10,'nf':30,'tip':'Oklahoma requires a 5-day written notice to pay rent or vacate.'},
  'Oregon':{'pay':3,'cure':14,'nf':90,'tip':'Oregon requires 90-day no-fault termination notice in most areas after SB 608.'},
  'Pennsylvania':{'pay':10,'cure':15,'nf':15,'tip':'Pennsylvania requires 10 days for non-payment and 15 days for lease violations.'},
  'Rhode Island':{'pay':5,'cure':20,'nf':30,'tip':'Rhode Island requires a 5-day demand for rent before filing for eviction.'},
  'South Carolina':{'pay':5,'cure':14,'nf':30,'tip':'South Carolina requires a 5-day notice for failure to pay rent.'},
  'South Dakota':{'pay':3,'cure':3,'nf':30,'tip':'South Dakota has a 3-day notice period for non-payment of rent.'},
  'Tennessee':{'pay':14,'cure':30,'nf':30,'tip':'Tennessee requires a 14-day notice to pay or vacate for non-payment.'},
  'Texas':{'pay':3,'cure':3,'nf':30,'tip':'Texas requires 3-day notice to vacate before filing a forcible detainer action.'},
  'Utah':{'pay':3,'cure':3,'nf':15,'tip':'Utah requires a 3-day notice; file in justice court immediately after expiration.'},
  'Vermont':{'pay':14,'cure':30,'nf':60,'tip':'Vermont requires 14-day notice for non-payment and 60-day no-fault notice.'},
  'Virginia':{'pay':5,'cure':21,'nf':30,'tip':'Virginia\'s VRLTA requires a 5-day pay or quit notice for most residential tenancies.'},
  'Washington':{'pay':14,'cure':10,'nf':20,'tip':'Washington requires 14-day written notice for non-payment of rent.'},
  'West Virginia':{'pay':3,'cure':30,'nf':30,'tip':'West Virginia commonly uses 3-day notices; always state the exact amount owed.'},
  'Wisconsin':{'pay':5,'cure':5,'nf':28,'tip':'Wisconsin requires 5-day notice for non-payment and 28-day no-fault termination.'},
  'Wyoming':{'pay':3,'cure':3,'nf':30,'tip':'Wyoming has a 3-day notice period for non-payment of rent.'}
};

function sg(slug) {
  return STATES.map(function(s) {
    return '<a href="/' + s.toLowerCase().replace(/ /g,'-') + '-' + slug + '" style="display:block;padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-weight:500;color:var(--ink-1);text-decoration:none" onmouseover="this.style.borderColor=\'var(--accent)\';this.style.background=\'var(--surface-2)\'" onmouseout="this.style.borderColor=\'var(--border)\';this.style.background=\'\'">' + s + '</a>';
  }).join('');
}

var NAV = '<header class="site-header"><div class="header-inner"><a href="/" class="site-logo">FreeDoc<span>Templates</span></a><nav class="main-nav" aria-label="Main"><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Documents <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/last-will-testament-template" class="nav-item">Last Will &amp; Testament</a><a href="/power-of-attorney-template" class="nav-item">Power of Attorney</a><a href="/lease-agreement-template" class="nav-item">Lease Agreement</a><a href="/eviction-notice-template" class="nav-item">Eviction Notice</a></div></div></nav><div class="header-actions"><a href="/tools" class="btn-all-tools">All Templates</a><button id="btn-search" class="btn-search" aria-label="Search templates"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></button></div></div></header><div class="cmd-overlay" id="cmd-overlay"><div class="cmd-modal"><div class="cmd-header"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input class="cmd-input" id="cmd-input" placeholder="Search templates\u2026" autocomplete="off"></div><div class="cmd-body" id="cmd-body"></div></div></div>';

var FTR = '<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p></div><div><div class="footer-col-title">Templates</div><nav class="footer-nav"><a href="/last-will-testament-template">Last Will</a><a href="/lease-agreement-template">Lease Agreement</a><a href="/nda-template">NDA</a><a href="/eviction-notice-template">Eviction Notice</a></nav></div></div><div class="footer-bottom"><p>\u00a9 2026 FreeDocTemplates.xyz</p></div></div></footer>';

function wrap(title, desc, canon, body) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + '</title><meta name="description" content="' + desc + '"><link rel="canonical" href="https://www.freedoctemplates.xyz/' + canon + '"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=1"></head><body>' + NAV + '<main class="page-wrap">' + body + '</main>' + FTR + '<script src="/shared/scripts.js?v=1" defer><\/script></body></html>';
}

function days(n) { return n === 1 ? '1 day' : n + ' days'; }

function willPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var holo = d.holo ? 'Recognized' : 'Not recognized';
  var sp = d.sp ? 'Available' : 'Not available';
  var body = ''
    + '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/last-will-testament-template">Last Will &amp; Testament</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Last Will and Testament Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; ' + d.w + ' witnesses required</span><span class="page-badge">&#10003; Notary block included</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' Will Requirements</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Witnesses Required</td><td style="padding:10px 0;font-weight:600">' + d.w + ' witnesses</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Holographic (Handwritten) Will</td><td style="padding:10px 0;font-weight:600;color:' + (d.holo ? 'var(--accent)' : 'inherit') + '">' + holo + '</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Self-Proving Affidavit</td><td style="padding:10px 0;font-weight:600">' + sp + '</td></tr>'
    + '</table>'
    + '</div>'
    + '<p class="section-eyebrow">How to Make a Valid Will in ' + state + '</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">' + state + ' Will Execution Requirements</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">To create a legally valid will in ' + state + ', the testator must be at least 18 years old and of sound mind. The will must be in writing, signed by the testator, and witnessed by <strong>' + d.w + ' competent witnesses</strong> who are present at the time of signing and are not beneficiaries named in the will.</p>'
    + (d.holo
        ? '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">' + state + ' <strong>recognizes holographic wills</strong> — wills written entirely in the testator\'s own handwriting, with no witnesses required. A formally witnessed will is still recommended as it is easier to probate and harder to contest.</p>'
        : '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">' + state + ' <strong>does not recognize holographic (handwritten) wills</strong>. Your will must be witnessed by ' + d.w + ' witnesses regardless of whether it is typed or handwritten.</p>')
    + (d.sp ? '<p style="color:var(--ink-2);line-height:1.7">A <strong>self-proving affidavit</strong> is available in ' + state + ' — notarize the will at signing so witnesses do not need to testify in probate court, saving time and cost.</p>' : '')
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/last-will-testament-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' Will &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' will questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">How many witnesses does a will require in ' + state + '?</summary><div class="faq-a">' + state + ' requires <strong>' + d.w + ' witnesses</strong> to sign the will in the testator\'s presence. Witnesses must be adults who are not named as beneficiaries. All parties should sign at the same ceremony.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does ' + state + ' recognize a holographic (handwritten) will?</summary><div class="faq-a">' + (d.holo ? 'Yes. ' + state + ' recognizes holographic wills written entirely in the testator\'s own handwriting. No witnesses are required for a holographic will in ' + state + ', but a formally witnessed will is recommended for easier probate.' : 'No. ' + state + ' does not recognize holographic wills. Your will must be signed in front of ' + d.w + ' witnesses whether it is typed or handwritten.') + '</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does a will in ' + state + ' need to be notarized?</summary><div class="faq-a">' + (d.sp ? 'Notarization is not required to make a will valid in ' + state + ', but a notarized self-proving affidavit is highly recommended. It means witnesses do not need to testify at probate, saving time and cost.' : 'Notarization is not required to make a will valid in ' + state + '. However, consulting an estate planning attorney is recommended.') + '</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What happens if you die without a will in ' + state + '?</summary><div class="faq-a">Dying without a will in ' + state + ' means your estate passes under intestacy laws — generally to a surviving spouse first, then to children, then to more distant relatives. You cannot name a guardian for minor children or direct specific assets to specific people without a valid will.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px">'
    + '<p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Last Will &amp; Testament Template by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Witness requirements and holographic will recognition vary by state.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('last-will-testament-template') + '</div>'
    + '</section>'
    + '</div>';
  return wrap(
    'Free ' + state + ' Last Will and Testament Template 2026',
    'Free ' + state + ' last will and testament template. ' + d.w + ' witnesses required. Holographic wills: ' + holo.toLowerCase() + '. Fill out online, download PDF. No account needed.',
    sl + '-last-will-testament-template',
    body
  );
}

function evicPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var body = ''
    + '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/eviction-notice-template">Eviction Notice</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Eviction Notice Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; ' + days(d.pay) + ' pay or quit</span><span class="page-badge">&#10003; All notice types</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' Eviction Notice Requirements</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Non-Payment of Rent Notice</td><td style="padding:10px 0;font-weight:600">' + days(d.pay) + '</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Lease Violation (Cure or Quit)</td><td style="padding:10px 0;font-weight:600">' + days(d.cure) + '</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">No-Fault / Month-to-Month Termination</td><td style="padding:10px 0;font-weight:600">' + days(d.nf) + '</td></tr>'
    + '</table>'
    + '</div>'
    + '<p class="section-eyebrow">' + state + ' Eviction Process</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">How to Serve an Eviction Notice in ' + state + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">In ' + state + ', landlords must provide written notice before filing for eviction. For non-payment of rent, give the tenant <strong>' + days(d.pay) + '</strong> to pay or vacate. For lease violations, the tenant has <strong>' + days(d.cure) + '</strong> to cure the violation or leave. To terminate a month-to-month tenancy without cause, <strong>' + days(d.nf) + '\' notice</strong> is required.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">After the notice period expires without compliance, the landlord may file for eviction in ' + state + ' court. Changing locks, removing belongings, or cutting utilities to force a tenant out are illegal self-help evictions in all states.</p>'
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/eviction-notice-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' Eviction Notice &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' eviction questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">How many days notice is required for non-payment of rent in ' + state + '?</summary><div class="faq-a">' + state + ' landlords must give tenants <strong>' + days(d.pay) + '</strong> to pay the overdue rent or vacate before filing for eviction. The notice must be in writing and delivered per ' + state + '\'s service requirements.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">How long does the eviction process take in ' + state + '?</summary><div class="faq-a">After the ' + days(d.pay) + ' notice expires unpaid, the landlord files an eviction lawsuit. Court hearings are typically set within 1–3 weeks. If the landlord wins, a writ of possession is issued and the sheriff enforces the eviction. The full process usually takes 3–8 weeks depending on court schedule and any tenant appeal.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Can a landlord evict without notice in ' + state + '?</summary><div class="faq-a">No. ' + state + ' landlords must provide written notice and wait for the period to expire before filing for eviction. Changing locks, removing belongings, or shutting off utilities without a court order are illegal self-help evictions in ' + state + '.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What notice is needed to end a month-to-month lease in ' + state + '?</summary><div class="faq-a">To terminate a month-to-month tenancy in ' + state + ' without cause, the landlord must provide <strong>' + days(d.nf) + '\' written notice</strong>. The notice should state the date by which the tenant must vacate.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px">'
    + '<p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Eviction Notice Template by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Notice periods and eviction procedures vary significantly by state.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('eviction-notice-template') + '</div>'
    + '</section>'
    + '</div>';
  return wrap(
    'Free ' + state + ' Eviction Notice Template 2026 | ' + days(d.pay) + ' Pay or Quit',
    'Free ' + state + ' eviction notice template. ' + days(d.pay) + ' pay or quit. ' + days(d.cure) + ' cure or quit. ' + days(d.nf) + ' no-fault notice. Fill out online, download PDF.',
    sl + '-eviction-notice-template',
    body
  );
}

var wc = 0, ec = 0;
STATES.forEach(function(s) {
  var sl = s.toLowerCase().replace(/ /g, '-');
  fs.writeFileSync(B + sl + '-last-will-testament-template.html', willPage(s, WILL[s]));
  wc++;
  fs.writeFileSync(B + sl + '-eviction-notice-template.html', evicPage(s, EVIC[s]));
  ec++;
});
console.log('Will pages:', wc, '| Eviction pages:', ec, '| Total:', wc + ec);
