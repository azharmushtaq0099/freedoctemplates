const fs = require('fs');
const B = 'C:/Users/mastr/claude co/legal-docs/';
const STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

// Quitclaim deed: tx=transfer tax note, rec=recording fee range, notary=required, tip
const QC = {
  'Alabama':{'tx':'None','rec':'$1–5/page','notary':true,'tip':'Alabama requires notarization and recording with the county probate court.'},
  'Alaska':{'tx':'None','rec':'$15–20/page','notary':true,'tip':'Alaska quitclaim deeds must be recorded with the district recorder.'},
  'Arizona':{'tx':'None','rec':'$30 flat','notary':true,'tip':'Arizona abolished real property transfer taxes; recording fees are minimal.'},
  'Arkansas':{'tx':'$3.30/$1,000','rec':'$15/page','notary':true,'tip':'Arkansas charges a real property transfer tax based on the consideration amount.'},
  'California':{'tx':'$1.10/$1,000 (county varies)','rec':'$15–20/page','notary':true,'tip':'California\'s Documentary Transfer Tax applies unless the transfer is exempt (family, trust).'},
  'Colorado':{'tx':'None','rec':'$13/page','notary':true,'tip':'Colorado has no documentary transfer tax; record with the county clerk and recorder.'},
  'Connecticut':{'tx':'$0.75–1.25/$500','rec':'$60 flat','notary':true,'tip':'Connecticut charges a conveyance tax; family transfers may qualify for exemptions.'},
  'Delaware':{'tx':'4% of value (split)','rec':'$25/page','notary':true,'tip':'Delaware\'s realty transfer tax is 4% of value, typically split between buyer and seller.'},
  'Florida':{'tx':'$0.70/$100','rec':'$10/page','notary':true,'tip':'Florida\'s documentary stamp tax is required unless the transfer is nominal consideration.'},
  'Georgia':{'tx':'$0.10/$100','rec':'$10/page','notary':true,'tip':'Georgia requires 2 witnesses in addition to notarization for a valid deed.'},
  'Hawaii':{'tx':'$0.10–1.25/$100','rec':'$36/page','notary':true,'tip':'Hawaii\'s conveyance tax rate increases with property value; some family transfers are exempt.'},
  'Idaho':{'tx':'None','rec':'$10/page','notary':true,'tip':'Idaho is a community property state; both spouses may need to sign if property is marital.'},
  'Illinois':{'tx':'$0.50/$500','rec':'$12/page','notary':true,'tip':'Illinois levies a real estate transfer tax; many counties also charge a local tax.'},
  'Indiana':{'tx':'None (generally)','rec':'$25/page','notary':true,'tip':'Indiana generally does not impose a transfer tax; record with the county recorder.'},
  'Iowa':{'tx':'$1.60/$1,000','rec':'$5/page','notary':true,'tip':'Iowa\'s real estate transfer tax applies; family transfers may be exempt.'},
  'Kansas':{'tx':'None','rec':'$9/page','notary':true,'tip':'Kansas has no real property transfer tax; record with the county register of deeds.'},
  'Kentucky':{'tx':'$0.50/$500','rec':'$13/page','notary':true,'tip':'Kentucky requires 2 witnesses in addition to a notary for a valid deed.'},
  'Louisiana':{'tx':'None','rec':'$100–200 flat','notary':true,'tip':'Louisiana requires an authentic act (notarized before 2 witnesses) for property transfers.'},
  'Maine':{'tx':'$2.20/$500','rec':'$19/page','notary':true,'tip':'Maine transfer taxes are split between grantor and grantee; many family transfers are exempt.'},
  'Maryland':{'tx':'0.5–1.5% of value','rec':'$60/page','notary':true,'tip':'Maryland has state and county transfer taxes; principal residence transfers have reduced rates.'},
  'Massachusetts':{'tx':'$4.56/$1,000','rec':'$155 flat','notary':true,'tip':'Massachusetts excise stamps are required; record at the county Registry of Deeds.'},
  'Michigan':{'tx':'$3.75+$7.50 per $1,000','rec':'$14/page','notary':true,'tip':'Michigan has state and county transfer taxes; family transfers are often exempt.'},
  'Minnesota':{'tx':'0.33% of value','rec':'$46/page','notary':true,'tip':'Minnesota deed tax applies; government agency and family transfers may be exempt.'},
  'Mississippi':{'tx':'None','rec':'$1/page','notary':true,'tip':'Mississippi has no real property transfer tax; record with the county chancery court.'},
  'Missouri':{'tx':'None','rec':'$9/page','notary':true,'tip':'Missouri has no transfer tax; record with the county recorder of deeds.'},
  'Montana':{'tx':'None','rec':'$7/page','notary':true,'tip':'Montana has no real property transfer tax; record with the county clerk and recorder.'},
  'Nebraska':{'tx':'$2.25/$1,000','rec':'$10/page','notary':true,'tip':'Nebraska\'s documentary stamp tax applies to most deeds; family transfers may be exempt.'},
  'Nevada':{'tx':'$1.95–2.55/$500','rec':'$25/page','notary':true,'tip':'Nevada is a community property state; transfer tax rates vary by county.'},
  'New Hampshire':{'tx':'$0.75/$100 (split)','rec':'$10/page','notary':true,'tip':'New Hampshire\'s real estate transfer tax is split between grantor and grantee.'},
  'New Jersey':{'tx':'$2–3.35/$500','rec':'$40/page','notary':true,'tip':'New Jersey has one of the highest transfer tax rates; calculate carefully before recording.'},
  'New Mexico':{'tx':'None','rec':'$25/page','notary':true,'tip':'New Mexico is a community property state; no documentary transfer tax applies.'},
  'New York':{'tx':'$2/$500 + county surcharge','rec':'$30/page','notary':true,'tip':'New York requires a combined real estate transfer tax return filed with the deed.'},
  'North Carolina':{'tx':'$1/$500','rec':'$26/page','notary':true,'tip':'North Carolina requires 2 witnesses in addition to notarization for a valid deed.'},
  'North Dakota':{'tx':'None','rec':'$10/page','notary':true,'tip':'North Dakota has no transfer tax; record with the county recorder.'},
  'Ohio':{'tx':'$1/$1,000','rec':'$28/page','notary':true,'tip':'Ohio\'s conveyance fee is $1/$1,000 of value; exempt transfers include family and inheritances.'},
  'Oklahoma':{'tx':'$0.75/$500','rec':'$18/page','notary':true,'tip':'Oklahoma charges a documentary stamp tax based on consideration; file with county clerk.'},
  'Oregon':{'tx':'$1–$2/$1,000 (county)','rec':'$60/page','notary':true,'tip':'Oregon has no state transfer tax; some counties levy a local tax. Multnomah County charges $1.30/$1,000.'},
  'Pennsylvania':{'tx':'2% of value (split)','rec':'$30/page','notary':true,'tip':'Pennsylvania\'s realty transfer tax is 2% of value, split between grantor and grantee.'},
  'Rhode Island':{'tx':'$2.30/$500','rec':'$50/page','notary':true,'tip':'Rhode Island charges a realty conveyance tax; record with the city or town recorder.'},
  'South Carolina':{'tx':'$1.85/$500','rec':'$10/page','notary':true,'tip':'South Carolina requires 2 witnesses and notarization; recording fees are low.'},
  'South Dakota':{'tx':'$0.50/$500','rec':'$10/page','notary':true,'tip':'South Dakota transfer taxes apply; record with the county register of deeds.'},
  'Tennessee':{'tx':'$0.37/$100','rec':'$12/page','notary':true,'tip':'Tennessee\'s realty transfer tax must be paid before recording; rate is $0.37/$100 of value.'},
  'Texas':{'tx':'None','rec':'$25/page','notary':true,'tip':'Texas has no state transfer tax; Texas is a community property state.'},
  'Utah':{'tx':'None','rec':'$30/page','notary':true,'tip':'Utah has no documentary transfer tax; record with the county recorder.'},
  'Vermont':{'tx':'1.25% of value','rec':'$10/page','notary':true,'tip':'Vermont property transfer tax is 1.25%; principal residence first $100K is taxed at 0.5%.'},
  'Virginia':{'tx':'$0.25+$0.10/$100','rec':'$25/page','notary':true,'tip':'Virginia charges a recordation tax and a grantor tax; exempt for transfers to a spouse.'},
  'Washington':{'tx':'1.1–3% graduated','rec':'$20/page','notary':true,'tip':'Washington\'s REET (real estate excise tax) is graduated; family transfers may be exempt.'},
  'West Virginia':{'tx':'$1.65/$500','rec':'$20/page','notary':true,'tip':'West Virginia charges a real estate transfer tax; record with the county clerk.'},
  'Wisconsin':{'tx':'$3/$1,000','rec':'$30/page','notary':true,'tip':'Wisconsin\'s real estate transfer fee is $3/$1,000 of value; record with the county register of deeds.'},
  'Wyoming':{'tx':'None','rec':'$12/page','notary':true,'tip':'Wyoming has no real property transfer tax; record with the county clerk.'}
};

// NDA: emp=employee NDA enforceable, ts=trade secret law, tip
const NDA = {
  'Alabama':{'emp':true,'ts':'AUTSA','tip':'Alabama follows the Uniform Trade Secrets Act; NDA terms must be reasonable in scope.'},
  'Alaska':{'emp':true,'ts':'AUTSA','tip':'Alaska NDAs are enforceable with reasonable duration and geographic limits.'},
  'Arizona':{'emp':true,'ts':'AUTSA','tip':'Arizona enforces NDAs under the Uniform Trade Secrets Act; broad NDAs may be reduced.'},
  'Arkansas':{'emp':true,'ts':'AUTSA','tip':'Arkansas courts blue-pencil overly broad NDAs rather than invalidating them entirely.'},
  'California':{'emp':false,'ts':'CUTSA','tip':'California broadly restricts NDAs that prevent employees from disclosing unlawful workplace conduct.'},
  'Colorado':{'emp':true,'ts':'CUTSA','tip':'Colorado restricts employee NDAs that are broader than necessary to protect trade secrets.'},
  'Connecticut':{'emp':true,'ts':'CUTSA','tip':'Connecticut courts may narrow overbroad NDA terms rather than void the entire agreement.'},
  'Delaware':{'emp':true,'ts':'DTSA/DUTSA','tip':'Delaware is the preferred state for business NDAs; courts are sophisticated on IP matters.'},
  'Florida':{'emp':true,'ts':'FUTSA','tip':'Florida strongly enforces NDAs and non-disclosure terms in employment agreements.'},
  'Georgia':{'emp':true,'ts':'GTSA','tip':'Georgia\'s 2011 trade secret act modernized enforcement; NDAs with reasonable scope are fully enforced.'},
  'Hawaii':{'emp':false,'ts':'HUTSA','tip':'Hawaii prohibits NDAs that prevent employees from discussing wages, hours, or working conditions.'},
  'Idaho':{'emp':true,'ts':'ITSA','tip':'Idaho enforces NDAs with reasonable scope; courts apply the blue-pencil doctrine.'},
  'Illinois':{'emp':true,'ts':'ITSA','tip':'Illinois requires adequate consideration for NDAs; continued employment may be insufficient alone.'},
  'Indiana':{'emp':true,'ts':'IUTSA','tip':'Indiana enforces NDAs with reasonable geographic, temporal, and subject-matter scope.'},
  'Iowa':{'emp':true,'ts':'IUTSA','tip':'Iowa follows the Uniform Trade Secrets Act; NDA terms must protect legitimate business interests.'},
  'Kansas':{'emp':true,'ts':'KUTSA','tip':'Kansas enforces NDAs under the Uniform Trade Secrets Act with reasonable limitations.'},
  'Kentucky':{'emp':true,'ts':'KUTSA','tip':'Kentucky NDAs must be supported by adequate consideration to be enforceable.'},
  'Louisiana':{'emp':true,'ts':'LUTSA','tip':'Louisiana civil law principles apply; NDAs must have a defined term and object.'},
  'Maine':{'emp':true,'ts':'MUTSA','tip':'Maine NDAs are enforceable; adequate consideration beyond continued employment is best practice.'},
  'Maryland':{'emp':true,'ts':'MUTSA','tip':'Maryland enforces NDAs protecting legitimate business interests with reasonable scope.'},
  'Massachusetts':{'emp':true,'ts':'MUTSA','tip':'Massachusetts restricts NDAs that prevent employees from disclosing wage information.'},
  'Michigan':{'emp':true,'ts':'MUTSA','tip':'Michigan enforces NDAs; courts look for legitimate business justification for the restriction.'},
  'Minnesota':{'emp':false,'ts':'MUTSA','tip':'Minnesota prohibits NDAs that prevent employees from discussing pay, benefits, or working conditions.'},
  'Mississippi':{'emp':true,'ts':'MUTSA','tip':'Mississippi enforces NDAs with reasonable scope under the Uniform Trade Secrets Act.'},
  'Missouri':{'emp':true,'ts':'MUTSA','tip':'Missouri NDAs must be ancillary to an otherwise valid agreement and reasonably limited.'},
  'Montana':{'emp':true,'ts':'MUTSA','tip':'Montana enforces NDAs; courts narrow overbroad terms rather than voiding the agreement.'},
  'Nebraska':{'emp':true,'ts':'NUTSA','tip':'Nebraska NDAs with reasonable confidentiality scope are enforceable.'},
  'Nevada':{'emp':true,'ts':'NUTSA','tip':'Nevada broadly enforces NDAs; courts will sever unenforceable provisions.'},
  'New Hampshire':{'emp':true,'ts':'NHUTSA','tip':'New Hampshire enforces NDAs protecting legitimate trade secrets with reasonable terms.'},
  'New Jersey':{'emp':true,'ts':'NJTSPA','tip':'New Jersey restricts NDAs that silence employees about unlawful conduct in the workplace.'},
  'New Mexico':{'emp':true,'ts':'NMUTSA','tip':'New Mexico enforces NDAs under the Uniform Trade Secrets Act.'},
  'New York':{'emp':true,'ts':'NYTSPA','tip':'New York\'s HERO Act and other statutes restrict NDAs that silence sexual harassment disclosures.'},
  'North Carolina':{'emp':true,'ts':'NCTSPA','tip':'North Carolina enforces NDAs ancillary to employment; courts blue-pencil overbroad terms.'},
  'North Dakota':{'emp':false,'ts':'NDUTSA','tip':'North Dakota restricts employee NDAs that prevent disclosure of wages or working conditions.'},
  'Ohio':{'emp':true,'ts':'OTSPA','tip':'Ohio enforces NDAs protecting legitimate trade secrets; courts apply reasonableness tests.'},
  'Oklahoma':{'emp':false,'ts':'OUTSA','tip':'Oklahoma restricts employee NDAs that go beyond protecting specific trade secrets.'},
  'Oregon':{'emp':true,'ts':'OUTSA','tip':'Oregon restricts NDAs that prevent employees from disclosing pay or working conditions.'},
  'Pennsylvania':{'emp':true,'ts':'PUTSA','tip':'Pennsylvania requires consideration beyond continued employment for new NDAs with existing employees.'},
  'Rhode Island':{'emp':true,'ts':'RIUTSA','tip':'Rhode Island enforces NDAs with reasonable scope and duration.'},
  'South Carolina':{'emp':true,'ts':'SCUTSA','tip':'South Carolina enforces NDAs under the Uniform Trade Secrets Act with reasonable limits.'},
  'South Dakota':{'emp':true,'ts':'SDUTSA','tip':'South Dakota enforces NDAs; courts will narrow overbroad confidentiality terms.'},
  'Tennessee':{'emp':true,'ts':'TUTSA','tip':'Tennessee enforces NDAs protecting trade secrets; courts apply reasonableness analysis.'},
  'Texas':{'emp':true,'ts':'TUTSA','tip':'Texas requires NDAs to be ancillary to an otherwise enforceable agreement with adequate consideration.'},
  'Utah':{'emp':true,'ts':'UUTSA','tip':'Utah enforces NDAs with reasonable scope; new statute restricts pay-secrecy NDAs.'},
  'Vermont':{'emp':true,'ts':'VUTSA','tip':'Vermont prohibits NDAs used to silence employees about sexual harassment or assault.'},
  'Virginia':{'emp':true,'ts':'VUTSA','tip':'Virginia restricts NDAs that prevent employees from discussing pay or workplace safety.'},
  'Washington':{'emp':true,'ts':'WUTSA','tip':'Washington prohibits NDAs that silence employees on sexual harassment and wage discussions.'},
  'West Virginia':{'emp':true,'ts':'WVUTSA','tip':'West Virginia enforces NDAs protecting trade secrets with reasonable scope.'},
  'Wisconsin':{'emp':true,'ts':'WUTSA','tip':'Wisconsin enforces NDAs; courts apply a rule of reason to confidentiality restrictions.'},
  'Wyoming':{'emp':true,'ts':'WUTSA','tip':'Wyoming enforces NDAs under the Uniform Trade Secrets Act with reasonable terms.'}
};

// Employment contract: atWill=true means at-will state, fpc=final paycheck days, tip
const EMP = {
  'Alabama':{'atWill':true,'fpc':'Next regular payday','tip':'Alabama is a strict at-will state; employment contracts should clearly state any exceptions.'},
  'Alaska':{'atWill':true,'fpc':'Next regular payday (3 days if requested)','tip':'Alaska recognizes implied contract exceptions to at-will employment.'},
  'Arizona':{'atWill':true,'fpc':'Next regular payday (7 days max)','tip':'Arizona is at-will; written employment contracts create binding obligations.'},
  'Arkansas':{'atWill':true,'fpc':'Next regular payday','tip':'Arkansas follows at-will employment; contracts limiting termination must be in writing.'},
  'California':{'atWill':true,'fpc':'Immediate (termination) / 72 hours (resignation)','tip':'California has strong employee protections; many at-will presumptions are rebutted by implied contracts.'},
  'Colorado':{'atWill':true,'fpc':'Immediate (termination) / Next payday (resignation)','tip':'Colorado\'s HELP Act requires employers to notify employees of restrictive covenant rights at hire.'},
  'Connecticut':{'atWill':true,'fpc':'Next regular payday','tip':'Connecticut recognizes implied contract and public policy exceptions to at-will employment.'},
  'Delaware':{'atWill':true,'fpc':'Next regular payday','tip':'Delaware is at-will; employment contracts are strictly enforced as written.'},
  'Florida':{'atWill':true,'fpc':'Next regular payday','tip':'Florida is a strong at-will state; written employment contracts greatly reduce termination disputes.'},
  'Georgia':{'atWill':true,'fpc':'Next regular payday','tip':'Georgia is at-will; courts narrowly interpret implied employment contract exceptions.'},
  'Hawaii':{'atWill':true,'fpc':'Next regular payday (within 7 days)','tip':'Hawaii recognizes public policy and implied contract exceptions to at-will employment.'},
  'Idaho':{'atWill':true,'fpc':'Next regular payday','tip':'Idaho is at-will; the employment-at-will doctrine is strongly presumed.'},
  'Illinois':{'atWill':true,'fpc':'Next payday (within 13 days)','tip':'Illinois recognizes implied contract and public policy exceptions; employee handbooks may create contracts.'},
  'Indiana':{'atWill':true,'fpc':'Next regular payday','tip':'Indiana is at-will with very limited exceptions; written contracts provide the clearest protections.'},
  'Iowa':{'atWill':true,'fpc':'Next regular payday','tip':'Iowa is at-will; written employment agreements with clear terms are strongly recommended.'},
  'Kansas':{'atWill':true,'fpc':'Next regular payday','tip':'Kansas is at-will; clear written contracts are the best protection for both parties.'},
  'Kentucky':{'atWill':true,'fpc':'Next regular payday','tip':'Kentucky is at-will; implied contract exceptions exist where handbooks promise job security.'},
  'Louisiana':{'atWill':true,'fpc':'Next regular payday (within 15 days)','tip':'Louisiana civil law applies; employment contracts must have a definite term or clear termination conditions.'},
  'Maine':{'atWill':true,'fpc':'Next regular payday','tip':'Maine recognizes just-cause protections for long-term employees under specific circumstances.'},
  'Maryland':{'atWill':true,'fpc':'Next regular payday','tip':'Maryland recognizes public policy and implied contract exceptions to at-will employment.'},
  'Massachusetts':{'atWill':true,'fpc':'Next regular payday','tip':'Massachusetts recognizes implied-in-fact contract exceptions; employee manuals may be binding.'},
  'Michigan':{'atWill':true,'fpc':'Next regular payday','tip':'Michigan has a clear employment-at-will rule; disclaimers in handbooks preserve at-will status.'},
  'Minnesota':{'atWill':true,'fpc':'Next regular payday','tip':'Minnesota recognizes implied contract and promissory estoppel exceptions to at-will employment.'},
  'Mississippi':{'atWill':true,'fpc':'Next regular payday','tip':'Mississippi is a strong at-will state with limited implied contract exceptions.'},
  'Missouri':{'atWill':true,'fpc':'Next regular payday','tip':'Missouri is at-will; court-recognized exceptions are narrow and fact-specific.'},
  'Montana':{'atWill':false,'fpc':'Next regular payday','tip':'Montana is the ONLY state without at-will employment; cause is required after probation.'},
  'Nebraska':{'atWill':true,'fpc':'Next regular payday','tip':'Nebraska is at-will; written contracts override the presumption of at-will employment.'},
  'Nevada':{'atWill':true,'fpc':'Immediate (termination) / 7 days (resignation)','tip':'Nevada is at-will; employers must pay terminated employees immediately.'},
  'New Hampshire':{'atWill':true,'fpc':'Next regular payday','tip':'New Hampshire recognizes public policy exceptions to at-will employment.'},
  'New Jersey':{'atWill':true,'fpc':'Next regular payday','tip':'New Jersey recognizes strong public policy and implied contract exceptions to at-will employment.'},
  'New Mexico':{'atWill':true,'fpc':'Within 5 days','tip':'New Mexico recognizes implied covenant of good faith in employment relationships.'},
  'New York':{'atWill':true,'fpc':'Next regular payday','tip':'New York is at-will; written employment contracts are common and enforceable.'},
  'North Carolina':{'atWill':true,'fpc':'Next regular payday','tip':'North Carolina is at-will; exceptions exist for public policy violations and written contracts.'},
  'North Dakota':{'atWill':true,'fpc':'Next regular payday','tip':'North Dakota is at-will; written employment agreements clearly define the employment relationship.'},
  'Ohio':{'atWill':true,'fpc':'Next regular payday','tip':'Ohio is at-will; implied contract exceptions exist where employers make specific promises.'},
  'Oklahoma':{'atWill':true,'fpc':'Next regular payday','tip':'Oklahoma is at-will; courts rarely recognize implied employment contract exceptions.'},
  'Oregon':{'atWill':true,'fpc':'Immediate (termination) / Next payday (resignation)','tip':'Oregon is at-will but has strong worker protections; terminated employees must be paid immediately.'},
  'Pennsylvania':{'atWill':true,'fpc':'Next regular payday','tip':'Pennsylvania is at-will; implied contract exceptions require a clear employer promise of job security.'},
  'Rhode Island':{'atWill':true,'fpc':'Next regular payday','tip':'Rhode Island recognizes public policy and implied covenant exceptions to at-will employment.'},
  'South Carolina':{'atWill':true,'fpc':'Next regular payday','tip':'South Carolina is at-will; written contracts are the primary way to limit at-will termination rights.'},
  'South Dakota':{'atWill':true,'fpc':'Next regular payday','tip':'South Dakota is at-will; courts apply the at-will doctrine broadly.'},
  'Tennessee':{'atWill':true,'fpc':'Next regular payday','tip':'Tennessee is strongly at-will; retaliatory discharge exceptions are narrowly defined.'},
  'Texas':{'atWill':true,'fpc':'Within 6 days (termination) / Next payday (resignation)','tip':'Texas is at-will; written employment contracts must include adequate consideration.'},
  'Utah':{'atWill':true,'fpc':'Next regular payday','tip':'Utah is at-will; implied-in-fact contract exceptions require specific employer promises.'},
  'Vermont':{'atWill':true,'fpc':'Next regular payday','tip':'Vermont recognizes public policy and implied contract exceptions to at-will employment.'},
  'Virginia':{'atWill':true,'fpc':'Next regular payday','tip':'Virginia is at-will; employment contracts limiting termination must be clear and supported by consideration.'},
  'Washington':{'atWill':true,'fpc':'Next regular payday','tip':'Washington recognizes broad public policy exceptions to at-will employment.'},
  'West Virginia':{'atWill':true,'fpc':'Next regular payday','tip':'West Virginia recognizes implied contract and public policy exceptions to at-will employment.'},
  'Wisconsin':{'atWill':true,'fpc':'Next regular payday','tip':'Wisconsin is at-will; employers may not retaliate for lawful off-duty activities.'},
  'Wyoming':{'atWill':true,'fpc':'Next regular payday','tip':'Wyoming is at-will; there are limited exceptions for public policy violations.'}
};

function sg(slug) {
  return STATES.map(function(s) {
    return '<a href="/' + s.toLowerCase().replace(/ /g,'-') + '-' + slug + '" style="display:block;padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-weight:500;color:var(--ink-1);text-decoration:none" onmouseover="this.style.borderColor=\'var(--accent)\';this.style.background=\'var(--surface-2)\'" onmouseout="this.style.borderColor=\'var(--border)\';this.style.background=\'\'">' + s + '</a>';
  }).join('');
}

var NAV = '<header class="site-header"><div class="header-inner"><a href="/" class="site-logo">FreeDoc<span>Templates</span></a><nav class="main-nav" aria-label="Main"><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Business <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/nda-template" class="nav-item">NDA Template</a><a href="/employment-contract-template" class="nav-item">Employment Contract</a><a href="/independent-contractor-agreement-template" class="nav-item">Contractor Agreement</a></div></div><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Property <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/quitclaim-deed-template" class="nav-item">Quitclaim Deed</a><a href="/lease-agreement-template" class="nav-item">Lease Agreement</a><a href="/eviction-notice-template" class="nav-item">Eviction Notice</a></div></div></nav><div class="header-actions"><a href="/tools" class="btn-all-tools">All Templates</a><button id="btn-search" class="btn-search" aria-label="Search templates"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></button></div></div></header><div class="cmd-overlay" id="cmd-overlay"><div class="cmd-modal"><div class="cmd-header"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input class="cmd-input" id="cmd-input" placeholder="Search templates\u2026" autocomplete="off"></div><div class="cmd-body" id="cmd-body"></div></div></div>';

var FTR = '<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p></div><div><div class="footer-col-title">Templates</div><nav class="footer-nav"><a href="/nda-template">NDA</a><a href="/employment-contract-template">Employment Contract</a><a href="/quitclaim-deed-template">Quitclaim Deed</a><a href="/lease-agreement-template">Lease Agreement</a></nav></div></div><div class="footer-bottom"><p>\u00a9 2026 FreeDocTemplates.xyz</p></div></div></footer>';

function wrap(title, desc, canon, body) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + '</title><meta name="description" content="' + desc + '"><link rel="canonical" href="https://www.freedoctemplates.xyz/' + canon + '"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=1"></head><body>' + NAV + '<main class="page-wrap">' + body + '</main>' + FTR + '<script src="/shared/scripts.js?v=1" defer><\/script></body></html>';
}

function qcPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/quitclaim-deed-template">Quitclaim Deed</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Quitclaim Deed Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; Notary block included</span><span class="page-badge">&#10003; Recording ready</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' Deed Requirements</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Transfer Tax</td><td style="padding:10px 0;font-weight:600">' + d.tx + '</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Recording Fee (approx.)</td><td style="padding:10px 0;font-weight:600">' + d.rec + '</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Notarization Required</td><td style="padding:10px 0;font-weight:600">Yes — required</td></tr>'
    + '</table>'
    + '</div>'
    + '<p class="section-eyebrow">How to Record a Quitclaim Deed in ' + state + '</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">' + state + ' Quitclaim Deed Recording Process</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">To transfer property using a quitclaim deed in ' + state + ', the grantor must sign the deed before a notary public. The deed is then recorded with the county recorder (or register of deeds) in the county where the property is located. Recording fees in ' + state + ' are approximately <strong>' + d.rec + '</strong>.</p>'
    + (d.tx === 'None' ? '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">' + state + ' does not impose a documentary transfer tax, making it an affordable state for family property transfers.</p>' : '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">A documentary transfer tax of <strong>' + d.tx + '</strong> applies in ' + state + '. Family transfers and certain exempt transfers may qualify for an exclusion — consult a real estate attorney to confirm eligibility.</p>')
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/quitclaim-deed-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' Quitclaim Deed &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' quitclaim deed questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Does a quitclaim deed in ' + state + ' need to be notarized?</summary><div class="faq-a">Yes. A quitclaim deed in ' + state + ' must be signed in front of a notary public before it can be recorded. Without notarization, the county recorder will not accept the deed for recording, and the transfer will not be legally effective against third parties.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Where do I record a quitclaim deed in ' + state + '?</summary><div class="faq-a">Record the deed with the county recorder or register of deeds in the county where the property is located. Bring the original notarized deed plus the recording fee (approximately ' + d.rec + '). Some counties accept mail-in recording.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What is the transfer tax on a quitclaim deed in ' + state + '?</summary><div class="faq-a">' + (d.tx === 'None' ? state + ' does not impose a documentary transfer tax on deed recordings. You will only pay the county recording fee of approximately ' + d.rec + '.' : 'The transfer tax in ' + state + ' is <strong>' + d.tx + '</strong>. Certain transfers (spouses, parent-child, to a trust) may be exempt. Check with the county assessor or a real estate attorney before recording.') + '</div></details>'
    + '<details class="faq-item"><summary class="faq-q">How long does a quitclaim deed take in ' + state + '?</summary><div class="faq-a">Once you bring the notarized deed to the county recorder\'s office in ' + state + ', recording is typically same-day or within a few business days. The transfer is legally effective against third parties from the date of recording.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px"><p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Quitclaim Deed Template by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Transfer tax rates and recording requirements vary by state.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('quitclaim-deed-template') + '</div>'
    + '</section></div>';
  return wrap('Free ' + state + ' Quitclaim Deed Template 2026', 'Free ' + state + ' quitclaim deed template. Transfer tax: ' + d.tx + '. Recording fee: ' + d.rec + '. Fill out online, download PDF. Notary block included.', sl + '-quitclaim-deed-template', body);
}

function ndaPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var enf = d.emp ? 'Generally enforceable' : 'Restricted';
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/nda-template">NDA Template</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' NDA Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; Mutual or one-way</span><span class="page-badge">&#10003; ' + state + ' law</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' NDA Overview</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Employee NDA Enforceability</td><td style="padding:10px 0;font-weight:600;color:' + (d.emp ? 'var(--accent)' : 'var(--err, #dc2626)') + '">' + enf + '</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Trade Secret Law</td><td style="padding:10px 0;font-weight:600">' + d.ts + '</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Federal Overlay</td><td style="padding:10px 0;font-weight:600">DTSA 2016</td></tr>'
    + '</table>'
    + '</div>'
    + '<p class="section-eyebrow">' + state + ' NDA Law</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Enforcing an NDA in ' + state + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">Non-disclosure agreements in ' + state + ' are governed by state contract law and the <strong>' + d.ts + '</strong> trade secret statute. To be enforceable, an NDA must protect a legitimate business interest (such as trade secrets, customer lists, or proprietary processes), have a reasonable duration, and be supported by adequate consideration.</p>'
    + (d.emp ? '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">Employee NDAs are <strong>generally enforceable</strong> in ' + state + ' when they have reasonable scope. Courts in ' + state + ' may narrow overbroad NDA terms rather than voiding the entire agreement.</p>' : '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px"><strong>Note:</strong> ' + state + ' restricts employee NDAs in certain contexts — particularly around wage discussions, workplace safety, and unlawful conduct. Review current ' + state + ' statutes or consult an employment attorney before using this NDA with employees.</p>')
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/nda-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' NDA &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' NDA questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Is an NDA enforceable in ' + state + '?</summary><div class="faq-a">Yes — NDAs with reasonable scope, duration, and consideration are enforceable in ' + state + ' under ' + d.ts + '. Courts may narrow overbroad terms rather than striking the whole agreement. Both parties must sign for the agreement to be binding.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What trade secret law applies in ' + state + '?</summary><div class="faq-a">' + state + ' follows the <strong>' + d.ts + '</strong> for state trade secret claims. Federal trade secret claims are governed by the Defend Trade Secrets Act (DTSA, 2016). Most NDAs should specify that both statutes may apply.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">How long can an NDA last in ' + state + '?</summary><div class="faq-a">NDA duration in ' + state + ' should be tied to the type of information protected. For trade secrets that remain confidential, indefinite or long-term NDAs are more acceptable. For general business information, 2–5 years is typical. An "indefinite" NDA for general business information is more likely to be challenged in court.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does an NDA need to be notarized in ' + state + '?</summary><div class="faq-a">No. An NDA in ' + state + ' does not need to be notarized to be enforceable. Both parties must simply sign the agreement. Keeping a signed copy with each party is the best practice for recordkeeping.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px"><p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">NDA Template by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">NDA enforceability and trade secret laws vary by state.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('nda-template') + '</div>'
    + '</section></div>';
  return wrap('Free ' + state + ' NDA Template 2026 | Non-Disclosure Agreement', 'Free ' + state + ' NDA template. Employee NDAs: ' + enf.toLowerCase() + '. Governed by ' + d.ts + '. Mutual or one-way. Fill out online, download PDF.', sl + '-nda-template', body);
}

function empPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var atWillStr = d.atWill ? 'At-will state' : 'Not at-will (Montana)';
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/employment-contract-template">Employment Contract</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Employment Contract Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; ' + atWillStr + '</span><span class="page-badge">&#10003; Full-time or part-time</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' Employment Law Overview</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Employment Doctrine</td><td style="padding:10px 0;font-weight:600">' + atWillStr + '</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Final Paycheck (Termination)</td><td style="padding:10px 0;font-weight:600">' + d.fpc + '</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Federal Minimum Wage Floor</td><td style="padding:10px 0;font-weight:600">$7.25/hr (state may be higher)</td></tr>'
    + '</table>'
    + '</div>'
    + '<p class="section-eyebrow">' + state + ' Employment Contract Law</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Employment Contracts in ' + state + '</h2>'
    + (d.atWill
        ? '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">' + state + ' is an <strong>at-will employment state</strong>, meaning either the employer or employee may terminate the relationship at any time, for any lawful reason, with or without notice. A written employment contract can modify this presumption by specifying a fixed term, a notice period, or requiring cause for termination.</p>'
        : '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px"><strong>Montana is the only state without at-will employment.</strong> After an employee completes the probationary period (typically 6 months), an employer must have just cause to terminate. A written employment contract should define the probationary period and specify grounds for termination.</p>')
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">When an employee is terminated in ' + state + ', the final paycheck must be delivered <strong>' + d.fpc.toLowerCase() + '</strong>. Failing to pay on time exposes the employer to penalties under ' + state + ' wage and hour law.</p>'
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/employment-contract-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' Employment Contract &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' employment contract questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Is ' + state + ' an at-will employment state?</summary><div class="faq-a">' + (d.atWill ? 'Yes. ' + state + ' is an at-will employment state. Either party may terminate the employment relationship at any time, for any lawful reason, unless a written employment contract specifies otherwise.' : 'No. Montana is the only state without at-will employment. After the probationary period, employers must have just cause to terminate. A written contract should define the probationary period.') + '</div></details>'
    + '<details class="faq-item"><summary class="faq-q">When must a final paycheck be issued in ' + state + '?</summary><div class="faq-a">In ' + state + ', an employer must issue a terminated employee\'s final paycheck on <strong>' + d.fpc.toLowerCase() + '</strong>. Failure to timely pay may subject the employer to penalties under ' + state + ' wage and hour law.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does an employment contract need to be notarized in ' + state + '?</summary><div class="faq-a">No. Employment contracts in ' + state + ' do not need to be notarized. They are binding once signed by both parties. Best practice is to have both employer and employee sign two copies and each retain one original.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Can an employer include a non-compete clause in a ' + state + ' employment contract?</summary><div class="faq-a">Non-compete enforceability varies. In ' + state + ', non-compete clauses must typically be reasonable in geographic scope, duration, and scope of restricted activities. Some states (like California) largely prohibit non-competes. Always review current state law before including a non-compete clause.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px"><p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Employment Contract Template by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">At-will doctrine, final paycheck rules, and employment law vary by state.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('employment-contract-template') + '</div>'
    + '</section></div>';
  return wrap('Free ' + state + ' Employment Contract Template 2026', 'Free ' + state + ' employment contract template. ' + atWillStr + '. Final paycheck: ' + d.fpc + '. Fill out online, download PDF.', sl + '-employment-contract-template', body);
}

var qcc = 0, nc = 0, ec = 0;
STATES.forEach(function(s) {
  var sl = s.toLowerCase().replace(/ /g, '-');
  fs.writeFileSync(B + sl + '-quitclaim-deed-template.html', qcPage(s, QC[s]));
  qcc++;
  fs.writeFileSync(B + sl + '-nda-template.html', ndaPage(s, NDA[s]));
  nc++;
  fs.writeFileSync(B + sl + '-employment-contract-template.html', empPage(s, EMP[s]));
  ec++;
});
console.log('Quitclaim:', qcc, '| NDA:', nc, '| Employment:', ec, '| Total:', qcc + nc + ec);
