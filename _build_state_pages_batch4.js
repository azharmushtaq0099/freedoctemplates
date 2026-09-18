const fs = require('fs');
const B = 'C:/Users/mastr/claude co/legal-docs/';
const STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

// Non-compete: status=enforceable/limited/banned, maxPeriod, tip
const NC = {
  'Alabama':{'status':'Enforceable','maxPeriod':'2 years','tip':'Alabama courts enforce reasonable non-competes but will modify overbroad terms under the blue-pencil rule.'},
  'Alaska':{'status':'Enforceable','maxPeriod':'2 years','tip':'Alaska enforces non-competes that are reasonable in scope, geography, and duration.'},
  'Arizona':{'status':'Enforceable','maxPeriod':'2 years','tip':'Arizona enforces non-competes ancillary to a legitimate business interest with reasonable limits.'},
  'Arkansas':{'status':'Enforceable','maxPeriod':'2 years','tip':'Arkansas courts blue-pencil overbroad non-compete agreements rather than voiding them.'},
  'California':{'status':'Banned (most situations)','maxPeriod':'N/A','tip':'California bans nearly all employee non-compete agreements; violations expose employers to lawsuits.'},
  'Colorado':{'status':'Limited','maxPeriod':'2 years','tip':'Colorado restricts non-competes to senior executives and technical workers earning above a wage threshold.'},
  'Connecticut':{'status':'Enforceable','maxPeriod':'2 years','tip':'Connecticut enforces non-competes with reasonable geographic and time limits.'},
  'Delaware':{'status':'Enforceable','maxPeriod':'2 years','tip':'Delaware enforces reasonable non-competes; courts apply a proportionality test.'},
  'Florida':{'status':'Enforceable (strong)','maxPeriod':'2 years (6 months for trade secrets)','tip':'Florida strongly enforces non-competes; courts presume irreparable harm and often grant injunctions.'},
  'Georgia':{'status':'Enforceable','maxPeriod':'2 years','tip':'Georgia\'s 2011 Restrictive Covenants Act modernized enforcement; courts can modify overbroad terms.'},
  'Hawaii':{'status':'Banned for technology workers','maxPeriod':'N/A for tech','tip':'Hawaii bans non-competes for technology workers; other industries have limited enforceability.'},
  'Idaho':{'status':'Enforceable','maxPeriod':'18 months','tip':'Idaho added a presumption of irreparable harm for non-compete violations, making enforcement easier.'},
  'Illinois':{'status':'Limited','maxPeriod':'2 years','tip':'Illinois restricts non-competes to employees earning above $75,000/year; employers must provide 14 days to review.'},
  'Indiana':{'status':'Enforceable','maxPeriod':'2 years','tip':'Indiana courts blue-pencil overbroad non-compete agreements to make them enforceable.'},
  'Iowa':{'status':'Enforceable','maxPeriod':'2 years','tip':'Iowa enforces non-competes with reasonably limited geographic scope and duration.'},
  'Kansas':{'status':'Enforceable','maxPeriod':'2 years','tip':'Kansas courts assess non-competes under a reasonableness standard for scope and duration.'},
  'Kentucky':{'status':'Enforceable','maxPeriod':'2 years','tip':'Kentucky enforces non-competes ancillary to legitimate business transactions.'},
  'Louisiana':{'status':'Enforceable (strict requirements)','maxPeriod':'2 years','tip':'Louisiana requires specific geographic area listed by parish; courts strictly construe non-compete terms.'},
  'Maine':{'status':'Limited','maxPeriod':'1 year','tip':'Maine restricts non-competes to employees earning above 400% of the federal poverty level.'},
  'Maryland':{'status':'Limited','maxPeriod':'1 year','tip':'Maryland bans non-competes for employees earning below $15/hr or $31,200/year.'},
  'Massachusetts':{'status':'Limited','maxPeriod':'1 year','tip':'Massachusetts requires 10 days advance notice and garden leave pay for non-competes signed at hire.'},
  'Michigan':{'status':'Enforceable','maxPeriod':'2 years','tip':'Michigan enforces reasonable non-competes; courts may reduce overbroad restrictions.'},
  'Minnesota':{'status':'Banned','maxPeriod':'N/A','tip':'Minnesota banned employee non-compete agreements effective January 2023 for new agreements.'},
  'Mississippi':{'status':'Enforceable','maxPeriod':'2 years','tip':'Mississippi enforces non-competes with reasonable geographic and temporal limits.'},
  'Missouri':{'status':'Enforceable','maxPeriod':'2 years','tip':'Missouri courts apply a reasonableness test and may modify overbroad non-competes.'},
  'Montana':{'status':'Enforceable','maxPeriod':'2 years','tip':'Montana enforces non-competes with reasonable scope; courts may modify overbroad terms.'},
  'Nebraska':{'status':'Enforceable','maxPeriod':'2 years','tip':'Nebraska enforces non-competes if they are reasonably limited in time, territory, and scope.'},
  'Nevada':{'status':'Limited','maxPeriod':'2 years','tip':'Nevada restricts non-competes and requires payment of consideration beyond continued employment.'},
  'New Hampshire':{'status':'Enforceable','maxPeriod':'2 years','tip':'New Hampshire requires employers to provide non-compete terms to employees before or at the time of hire.'},
  'New Jersey':{'status':'Enforceable','maxPeriod':'2 years','tip':'New Jersey enforces non-competes protecting legitimate business interests; overbroad terms are modified.'},
  'New Mexico':{'status':'Enforceable','maxPeriod':'2 years','tip':'New Mexico enforces non-competes with reasonable limits; courts may modify overbroad restrictions.'},
  'New York':{'status':'Enforceable (narrow)','maxPeriod':'2 years','tip':'New York enforces non-competes only to protect trade secrets or prevent unfair competition; broad restrictions fail.'},
  'North Carolina':{'status':'Enforceable','maxPeriod':'2 years','tip':'North Carolina enforces non-competes with reasonable geographic and time limits; courts blue-pencil overbroad terms.'},
  'North Dakota':{'status':'Banned','maxPeriod':'N/A','tip':'North Dakota bans nearly all non-compete agreements by statute; only narrow exceptions exist.'},
  'Ohio':{'status':'Enforceable','maxPeriod':'2 years','tip':'Ohio enforces non-competes under a totality of circumstances test; courts may modify overbroad terms.'},
  'Oklahoma':{'status':'Banned (most situations)','maxPeriod':'N/A','tip':'Oklahoma statute invalidates most non-compete agreements; only limited exceptions apply.'},
  'Oregon':{'status':'Limited','maxPeriod':'12 months','tip':'Oregon restricts non-competes to employees earning above $100,533/year (2024) and requires advance notice.'},
  'Pennsylvania':{'status':'Enforceable','maxPeriod':'2 years','tip':'Pennsylvania enforces non-competes if supported by adequate consideration and reasonable in scope.'},
  'Rhode Island':{'status':'Limited','maxPeriod':'1 year','tip':'Rhode Island bans non-competes for low-wage, undergrad students, and employees under 18.'},
  'South Carolina':{'status':'Enforceable','maxPeriod':'2 years','tip':'South Carolina enforces non-competes with reasonable geographic, temporal, and scope limits.'},
  'South Dakota':{'status':'Enforceable','maxPeriod':'2 years','tip':'South Dakota enforces non-competes if they are reasonable in geographic scope and duration.'},
  'Tennessee':{'status':'Enforceable','maxPeriod':'2 years','tip':'Tennessee enforces non-competes ancillary to legitimate business relationships.'},
  'Texas':{'status':'Enforceable (must be ancillary)','maxPeriod':'2 years','tip':'Texas requires non-competes to be ancillary to an otherwise enforceable agreement and provide a specific geographic area.'},
  'Utah':{'status':'Limited','maxPeriod':'1 year','tip':'Utah limits post-employment non-competes to 1 year; physician non-competes are prohibited.'},
  'Vermont':{'status':'Enforceable','maxPeriod':'2 years','tip':'Vermont enforces non-competes with reasonable time and geographic limits.'},
  'Virginia':{'status':'Limited','maxPeriod':'2 years','tip':'Virginia bans non-competes for low-wage employees earning below the average weekly wage.'},
  'Washington':{'status':'Limited','maxPeriod':'18 months','tip':'Washington requires employers to pay 100% of base salary during enforcement period for non-competes over 18 months.'},
  'West Virginia':{'status':'Enforceable','maxPeriod':'2 years','tip':'West Virginia enforces reasonable non-competes; courts apply a strict scrutiny test to overbroad restrictions.'},
  'Wisconsin':{'status':'Enforceable','maxPeriod':'2 years','tip':'Wisconsin courts enforce reasonable non-competes; overbroad geographic scope is a common reason for invalidation.'},
  'Wyoming':{'status':'Enforceable','maxPeriod':'2 years','tip':'Wyoming enforces non-competes with reasonable geographic and time restrictions.'}
};

// Divorce: prop=property system, res=residency requirement, tip
const DIV = {
  'Alabama':{'prop':'Equitable distribution','res':'6 months','tip':'Alabama courts divide marital property equitably, considering fault and contributions of each spouse.'},
  'Alaska':{'prop':'Equitable distribution','res':'30 days','tip':'Alaska has one of the shortest residency requirements for divorce — just 30 days.'},
  'Arizona':{'prop':'Community property','res':'90 days','tip':'Arizona divides all community property (assets acquired during marriage) 50/50.'},
  'Arkansas':{'prop':'Equitable distribution','res':'60 days','tip':'Arkansas has a 30-day waiting period after filing before a divorce can be finalized.'},
  'California':{'prop':'Community property','res':'6 months','tip':'California divides all community property equally; separate property stays with the original owner.'},
  'Colorado':{'prop':'Equitable distribution','res':'91 days','tip':'Colorado requires 91 days residency before filing; 182 days before the divorce is final.'},
  'Connecticut':{'prop':'Equitable distribution','res':'12 months (exceptions)','tip':'Connecticut considers fault when dividing marital property in contested divorces.'},
  'Delaware':{'prop':'Equitable distribution','res':'6 months','tip':'Delaware uses equitable distribution; marital fault can affect property division.'},
  'Florida':{'prop':'Equitable distribution','res':'6 months','tip':'Florida is a no-fault divorce state; equitable distribution applies to all marital assets.'},
  'Georgia':{'prop':'Equitable distribution','res':'6 months','tip':'Georgia considers both fault and contributions of each spouse in property division.'},
  'Hawaii':{'prop':'Equitable distribution','res':'6 months','tip':'Hawaii courts create marital partnership values and divide them equitably.'},
  'Idaho':{'prop':'Community property','res':'6 weeks','tip':'Idaho has community property rules; both spouses share equally in assets earned during marriage.'},
  'Illinois':{'prop':'Equitable distribution','res':'90 days','tip':'Illinois uses equitable distribution; courts consider marriage length, contributions, and economic circumstances.'},
  'Indiana':{'prop':'Equitable distribution (presumed equal)','res':'6 months','tip':'Indiana presumes marital property should be divided 50/50 unless other factors apply.'},
  'Iowa':{'prop':'Equitable distribution','res':'1 year','tip':'Iowa requires 1 year residency before filing for divorce.'},
  'Kansas':{'prop':'Equitable distribution','res':'60 days','tip':'Kansas courts divide all property — including pre-marital — equitably but not necessarily equally.'},
  'Kentucky':{'prop':'Equitable distribution','res':'180 days','tip':'Kentucky divides marital property but ignores fault when doing so.'},
  'Louisiana':{'prop':'Community property','res':'12 months (or 6 months certain grounds)','tip':'Louisiana community property includes all income and property acquired during marriage.'},
  'Maine':{'prop':'Equitable distribution','res':'6 months','tip':'Maine courts consider standard of living and contributions of each spouse in division.'},
  'Maryland':{'prop':'Equitable distribution','res':'12 months (or 6 months mutual consent)','tip':'Maryland allows divorce by mutual consent with a signed separation agreement.'},
  'Massachusetts':{'prop':'Equitable distribution','res':'12 months (shorter if married in MA)','tip':'Massachusetts requires couples to live apart before filing; separation agreements speed the process.'},
  'Michigan':{'prop':'Equitable distribution','res':'180 days','tip':'Michigan divides marital property equitably; separate property is generally excluded.'},
  'Minnesota':{'prop':'Equitable distribution','res':'180 days','tip':'Minnesota divides only marital property; property brought into the marriage is separate.'},
  'Mississippi':{'prop':'Equitable distribution (title-based legacy)','res':'6 months','tip':'Mississippi uses equitable distribution based on various factors including contribution and fault.'},
  'Missouri':{'prop':'Equitable distribution','res':'90 days','tip':'Missouri divides marital property equitably; economic circumstances at the time of division are considered.'},
  'Montana':{'prop':'Equitable distribution','res':'90 days','tip':'Montana courts equitably divide all marital property, considering each spouse\'s contribution.'},
  'Nebraska':{'prop':'Equitable distribution','res':'1 year','tip':'Nebraska requires 1 year residency; equitable distribution applies to all marital assets.'},
  'Nevada':{'prop':'Community property','res':'6 weeks','tip':'Nevada has one of the shortest residency requirements; community property is split 50/50.'},
  'New Hampshire':{'prop':'Equitable distribution','res':'12 months','tip':'New Hampshire courts divide property equitably; fault can be considered in property division.'},
  'New Jersey':{'prop':'Equitable distribution','res':'12 months','tip':'New Jersey\'s divorce process encourages mediation and marital settlement agreements.'},
  'New Mexico':{'prop':'Community property','res':'6 months','tip':'New Mexico divides community property (all marital assets) equally between spouses.'},
  'New York':{'prop':'Equitable distribution','res':'12 months (various grounds)','tip':'New York has a 6-month waiting period for no-fault divorce after signing a separation agreement.'},
  'North Carolina':{'prop':'Equitable distribution','res':'6 months','tip':'North Carolina requires a 1-year separation period before a no-fault divorce can be granted.'},
  'North Dakota':{'prop':'Equitable distribution','res':'6 months','tip':'North Dakota courts equitably divide marital property; fault is generally not considered.'},
  'Ohio':{'prop':'Equitable distribution','res':'6 months','tip':'Ohio requires either fault grounds or living separately for at least 1 year for a no-fault divorce.'},
  'Oklahoma':{'prop':'Equitable distribution','res':'6 months','tip':'Oklahoma courts divide marital property equitably considering each spouse\'s contributions.'},
  'Oregon':{'prop':'Equitable distribution','res':'6 months','tip':'Oregon is a no-fault divorce state; courts divide property based on just and proper standards.'},
  'Pennsylvania':{'prop':'Equitable distribution','res':'6 months','tip':'Pennsylvania allows no-fault divorce by mutual consent after a 90-day waiting period.'},
  'Rhode Island':{'prop':'Equitable distribution','res':'12 months','tip':'Rhode Island courts consider fault and contributions when dividing marital assets.'},
  'South Carolina':{'prop':'Equitable distribution','res':'12 months (or 3 months both residents)','tip':'South Carolina requires 1 year of separation for a no-fault divorce.'},
  'South Dakota':{'prop':'Equitable distribution','res':'No specific requirement','tip':'South Dakota has no minimum residency requirement for divorce; equitable distribution applies.'},
  'Tennessee':{'prop':'Equitable distribution','res':'6 months','tip':'Tennessee divides marital property equitably; fault is one of many factors courts consider.'},
  'Texas':{'prop':'Community property','res':'6 months','tip':'Texas divides community property on a just and right basis, which may not always be 50/50.'},
  'Utah':{'prop':'Equitable distribution','res':'3 months','tip':'Utah has a relatively short residency requirement; courts encourage settlement agreements.'},
  'Vermont':{'prop':'Equitable distribution','res':'6 months','tip':'Vermont courts equitably divide all property owned by either spouse, including pre-marital.'},
  'Virginia':{'prop':'Equitable distribution','res':'6 months','tip':'Virginia requires a 1-year separation period; 6 months with no minor children and a signed settlement.'},
  'Washington':{'prop':'Community property','res':'None (but county filing)','tip':'Washington divides community property on a just and equitable basis; debts are also divided.'},
  'West Virginia':{'prop':'Equitable distribution','res':'12 months (shorter with grounds)','tip':'West Virginia courts consider contributions of each spouse, including homemaker contributions.'},
  'Wisconsin':{'prop':'Community property (marital)','res':'6 months','tip':'Wisconsin treats all marital property as community property; each spouse gets an equal share.'},
  'Wyoming':{'prop':'Equitable distribution','res':'60 days','tip':'Wyoming has one of the shortest residency requirements at 60 days; courts divide property equitably.'}
};

// Cease & desist: tip
const CND = {
  'Alabama':{'tip':'Alabama cease and desist letters are not legally required but establish a formal record before litigation.'},
  'Alaska':{'tip':'Alaska courts consider a demand letter as evidence of good faith before awarding attorney fees.'},
  'Arizona':{'tip':'Arizona\'s Uniform Trade Secrets Act supports cease and desist letters for IP violations.'},
  'Arkansas':{'tip':'Arkansas courts may require pre-suit demand before awarding attorney fees in some cases.'},
  'California':{'tip':'California has strict anti-SLAPP laws; ensure your C&D has legal merit before sending.'},
  'Colorado':{'tip':'Colorado courts may consider bad faith if a legally baseless C&D causes harm to the recipient.'},
  'Connecticut':{'tip':'Connecticut CUTPA (consumer protection act) supports C&D letters for deceptive trade practices.'},
  'Delaware':{'tip':'Delaware\'s Court of Chancery is ideal for IP-related cease and desist enforcement.'},
  'Florida':{'tip':'Florida\'s FDUTPA supports C&D letters for unfair or deceptive business practices.'},
  'Georgia':{'tip':'Georgia\'s GTSA supports cease and desist for trade secret misappropriation; act promptly.'},
  'Hawaii':{'tip':'Hawaii courts consider pre-litigation C&D letters when determining attorney fees in IP disputes.'},
  'Idaho':{'tip':'Idaho C&D letters should reference specific Idaho statutes for stronger legal standing.'},
  'Illinois':{'tip':'Illinois courts view C&D letters favorably as evidence of mitigatory efforts before litigation.'},
  'Indiana':{'tip':'Indiana C&D letters should specify the exact conduct to stop and a reasonable response deadline.'},
  'Iowa':{'tip':'Iowa courts may require a formal demand before awarding punitive damages in IP cases.'},
  'Kansas':{'tip':'Kansas C&D letters create a documented timeline that is valuable if the matter goes to court.'},
  'Kentucky':{'tip':'Kentucky C&D letters for defamation must be carefully worded to avoid tortious interference claims.'},
  'Louisiana':{'tip':'Louisiana civil law principles apply; C&D letters should reference specific Civil Code articles.'},
  'Maine':{'tip':'Maine courts look favorably on documented pre-litigation correspondence in IP disputes.'},
  'Maryland':{'tip':'Maryland C&D letters for copyright or trademark are bolstered by federal registration.'},
  'Massachusetts':{'tip':'Massachusetts Chapter 93A supports C&D letters for unfair or deceptive trade practices.'},
  'Michigan':{'tip':'Michigan C&D letters for non-compete violations should state the specific breach and remedy sought.'},
  'Minnesota':{'tip':'Minnesota courts may consider C&D letters when assessing bad faith in patent litigation.'},
  'Mississippi':{'tip':'Mississippi C&D letters should be specific about the action requested and give a clear deadline.'},
  'Missouri':{'tip':'Missouri C&D letters create a formal record showing the recipient had notice of the dispute.'},
  'Montana':{'tip':'Montana courts consider pre-suit demand letters in determining attorney fee awards.'},
  'Nebraska':{'tip':'Nebraska C&D letters for debt collection must comply with the Nebraska Consumer Protection Act.'},
  'Nevada':{'tip':'Nevada C&D letters for IP violations should reference specific federal or state law protections.'},
  'New Hampshire':{'tip':'New Hampshire courts consider documented pre-litigation efforts when awarding attorney fees.'},
  'New Jersey':{'tip':'New Jersey C&D letters for consumer fraud must be specific about the NJCFA violation alleged.'},
  'New Mexico':{'tip':'New Mexico courts view C&D letters as evidence of good faith before litigation is filed.'},
  'New York':{'tip':'New York C&D letters carry significant weight; be prepared to follow through with legal action.'},
  'North Carolina':{'tip':'North Carolina\'s UDTP Act supports C&D letters for unfair and deceptive trade practices.'},
  'North Dakota':{'tip':'North Dakota courts consider pre-litigation demand letters in determining costs and fees.'},
  'Ohio':{'tip':'Ohio C&D letters for consumer protection violations should reference Ohio Consumer Sales Practices Act.'},
  'Oklahoma':{'tip':'Oklahoma C&D letters should specify a deadline for response — typically 10–14 business days.'},
  'Oregon':{'tip':'Oregon\'s UTPA supports C&D letters for unlawful trade practices; act within the statute of limitations.'},
  'Pennsylvania':{'tip':'Pennsylvania C&D letters for defamation should cite specific false statements to be actionable.'},
  'Rhode Island':{'tip':'Rhode Island courts consider pre-litigation correspondence when assessing litigation conduct.'},
  'South Carolina':{'tip':'South Carolina\'s UTPA supports C&D letters for unfair trade practices.'},
  'South Dakota':{'tip':'South Dakota C&D letters should be sent via certified mail to create a verifiable delivery record.'},
  'Tennessee':{'tip':'Tennessee C&D letters for non-compete violations should state the specific contractual provision breached.'},
  'Texas':{'tip':'Texas C&D letters for DTPA violations may trigger a treble damage claim if the defendant ignores the notice.'},
  'Utah':{'tip':'Utah C&D letters should reference the Utah Pattern Jury Instructions when asserting trade secret claims.'},
  'Vermont':{'tip':'Vermont courts look favorably on C&D letters as evidence of good faith effort to resolve disputes.'},
  'Virginia':{'tip':'Virginia C&D letters for copyright violations should cite the specific federal copyright registrations.'},
  'Washington':{'tip':'Washington\'s Consumer Protection Act supports C&D letters for unfair or deceptive trade practices.'},
  'West Virginia':{'tip':'West Virginia C&D letters for consumer protection should cite the WVCCPA specifically.'},
  'Wisconsin':{'tip':'Wisconsin C&D letters create a formal record of notice, important if injunctive relief is later sought.'},
  'Wyoming':{'tip':'Wyoming C&D letters should be concise, specific, and sent via certified mail for proof of delivery.'}
};

function sg(slug) {
  return STATES.map(function(s) {
    return '<a href="/' + s.toLowerCase().replace(/ /g,'-') + '-' + slug + '" style="display:block;padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-weight:500;color:var(--ink-1);text-decoration:none" onmouseover="this.style.borderColor=\'var(--accent)\';this.style.background=\'var(--surface-2)\'" onmouseout="this.style.borderColor=\'var(--border)\';this.style.background=\'\'">' + s + '</a>';
  }).join('');
}

var NAV = '<header class="site-header"><div class="header-inner"><a href="/" class="site-logo">FreeDoc<span>Templates</span></a><nav class="main-nav" aria-label="Main"><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Legal <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/non-compete-agreement-template" class="nav-item">Non-Compete Agreement</a><a href="/divorce-settlement-agreement-template" class="nav-item">Divorce Settlement</a><a href="/cease-and-desist-letter-template" class="nav-item">Cease &amp; Desist</a><a href="/nda-template" class="nav-item">NDA Template</a></div></div></nav><div class="header-actions"><a href="/tools" class="btn-all-tools">All Templates</a><button id="btn-search" class="btn-search" aria-label="Search templates"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></button></div></div></header><div class="cmd-overlay" id="cmd-overlay"><div class="cmd-modal"><div class="cmd-header"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input class="cmd-input" id="cmd-input" placeholder="Search templates\u2026" autocomplete="off"></div><div class="cmd-body" id="cmd-body"></div></div></div>';

var FTR = '<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p></div><div><div class="footer-col-title">Templates</div><nav class="footer-nav"><a href="/non-compete-agreement-template">Non-Compete</a><a href="/divorce-settlement-agreement-template">Divorce Settlement</a><a href="/cease-and-desist-letter-template">Cease &amp; Desist</a></nav></div></div><div class="footer-bottom"><p>\u00a9 2026 FreeDocTemplates.xyz</p></div></div></footer>';

function wrap(title, desc, canon, body) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + '</title><meta name="description" content="' + desc + '"><link rel="canonical" href="https://www.freedoctemplates.xyz/' + canon + '"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=1"></head><body>' + NAV + '<main class="page-wrap">' + body + '</main>' + FTR + '<script src="/shared/scripts.js?v=1" defer><\/script></body></html>';
}

function isBanned(s) { return s === 'Banned' || s.toLowerCase().indexOf('banned') !== -1; }

function ncPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var banned = isBanned(d.status);
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/non-compete-agreement-template">Non-Compete Agreement</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Non-Compete Agreement Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; ' + d.status + '</span><span class="page-badge">&#10003; Max period: ' + d.maxPeriod + '</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + (banned ? '<div style="background:#fef2f2;border:1px solid #fca5a5;border-radius:12px;padding:20px;margin-bottom:24px"><p style="font-weight:600;color:#dc2626;margin-bottom:4px">&#9888; Non-Compete Agreements Are Restricted in ' + state + '</p><p style="color:#7f1d1d;font-size:14px;line-height:1.7">' + d.tip + '</p></div>' : '')
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' Non-Compete Overview</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Enforceability Status</td><td style="padding:10px 0;font-weight:600;color:' + (banned ? '#dc2626' : 'var(--accent)') + '">' + d.status + '</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Typical Maximum Period</td><td style="padding:10px 0;font-weight:600">' + d.maxPeriod + '</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Federal Overlay</td><td style="padding:10px 0;font-weight:600">FTC Rule (pending)</td></tr>'
    + '</table>'
    + '</div>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Non-Compete Agreements in ' + state + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">' + (banned ? state + ' restricts or bans most employee non-compete agreements. Using an unenforceable non-compete in ' + state + ' can expose the employer to legal liability. Consult a ' + state + ' employment attorney before asking employees to sign any restrictive covenants.' : 'Non-compete agreements in ' + state + ' are <strong>' + d.status.toLowerCase() + '</strong> when they protect a legitimate business interest and are reasonable in scope. The agreement must specify a geographic area, the type of restricted activity, and a time limit of no more than <strong>' + d.maxPeriod + '</strong> to be enforceable.') + '</p>'
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/non-compete-agreement-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your Non-Compete Agreement &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' non-compete questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Are non-compete agreements enforceable in ' + state + '?</summary><div class="faq-a">' + (banned ? state + ' does not enforce most employee non-compete agreements. The restriction exists to protect employee mobility. Independent contractor non-competes may have different treatment — consult an attorney.' : state + ' enforces non-compete agreements that are reasonable in time (generally up to ' + d.maxPeriod + '), geographic area, and scope of restricted activities. Courts may modify overbroad terms.') + '</div></details>'
    + '<details class="faq-item"><summary class="faq-q">How long can a non-compete last in ' + state + '?</summary><div class="faq-a">' + (d.maxPeriod === 'N/A' ? state + ' does not allow most non-compete agreements, so duration is not typically at issue.' : 'Courts in ' + state + ' generally enforce non-competes for up to <strong>' + d.maxPeriod + '</strong>. Longer periods are more likely to be modified or rejected by courts. The shorter and more targeted the restriction, the more likely it is to be enforced.') + '</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Can an employee be fired for violating a non-compete in ' + state + '?</summary><div class="faq-a">' + (banned ? 'In ' + state + ', most non-compete agreements are not enforceable, so termination based solely on violating an unenforceable non-compete could itself be wrongful. Consult an employment attorney.' : 'Yes. If an employee violates a valid non-compete in ' + state + ', the employer can seek an injunction to stop the violation and may sue for damages. The employee can also be terminated for breach of contract.') + '</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does a non-compete need to be notarized in ' + state + '?</summary><div class="faq-a">No. A non-compete agreement in ' + state + ' does not need to be notarized to be enforceable. Both parties must sign the agreement, which should be provided to the employee before or at the time of hire, along with a copy of what they are signing.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px"><p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Non-Compete Agreement by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Non-compete enforceability varies dramatically by state — some ban them entirely.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('non-compete-agreement-template') + '</div>'
    + '</section></div>';
  return wrap('Free ' + state + ' Non-Compete Agreement Template 2026', 'Free ' + state + ' non-compete agreement template. Status: ' + d.status + '. Max period: ' + d.maxPeriod + '. Fill out online, download PDF.', sl + '-non-compete-agreement-template', body);
}

function divPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var isCom = d.prop.toLowerCase().indexOf('community') !== -1;
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/divorce-settlement-agreement-template">Divorce Settlement</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Divorce Settlement Agreement Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; ' + (isCom ? 'Community property' : 'Equitable distribution') + '</span><span class="page-badge">&#10003; Residency: ' + d.res + '</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' Divorce Overview</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Property Division System</td><td style="padding:10px 0;font-weight:600">' + d.prop + '</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Residency Requirement</td><td style="padding:10px 0;font-weight:600">' + d.res + '</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Divorce Type</td><td style="padding:10px 0;font-weight:600">Uncontested (settlement agreement)</td></tr>'
    + '</table>'
    + '</div>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Divorce in ' + state + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">' + state + ' uses <strong>' + d.prop + '</strong> for dividing marital assets. ' + (isCom ? 'In community property states, assets and debts acquired during the marriage are generally owned equally by both spouses and divided 50/50 in a divorce.' : 'In equitable distribution states, courts divide marital property fairly but not necessarily equally — factors include each spouse\'s contribution, earning capacity, and length of the marriage.') + '</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">To file for divorce in ' + state + ', at least one spouse must have been a resident for <strong>' + d.res + '</strong>. A divorce settlement agreement allows both spouses to resolve property division, debt allocation, child custody, and support without a contested court hearing.</p>'
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/divorce-settlement-agreement-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' Divorce Settlement &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' divorce questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Is ' + state + ' a community property state?</summary><div class="faq-a">' + (isCom ? 'Yes. ' + state + ' is a <strong>community property state</strong>. Generally, all assets and debts acquired by either spouse during the marriage are jointly owned and divided 50/50 in a divorce. Assets owned before marriage or received as gifts/inheritances are typically separate property.' : 'No. ' + state + ' uses <strong>equitable distribution</strong> rather than community property. Courts divide marital property fairly based on factors like each spouse\'s contributions, earning potential, and the length of the marriage. This does not always mean 50/50.') + '</div></details>'
    + '<details class="faq-item"><summary class="faq-q">How long do you have to live in ' + state + ' before filing for divorce?</summary><div class="faq-a">You must be a resident of ' + state + ' for at least <strong>' + d.res + '</strong> before filing for divorce. File in the county where you or your spouse lives. Some states have additional waiting periods after filing before the divorce is finalized.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What does a divorce settlement agreement cover?</summary><div class="faq-a">A divorce settlement agreement (also called a marital settlement agreement or MSA) covers: (1) division of marital property and debts, (2) real estate and vehicle disposition, (3) child custody and parenting schedule, (4) child support amounts, (5) spousal support / alimony, and (6) how future disputes will be handled.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does a divorce settlement need to be notarized in ' + state + '?</summary><div class="faq-a">Most states, including ' + state + ', require or strongly recommend that divorce settlement agreements be signed before a notary public. The agreement is then submitted to the family court judge for approval. Once approved, it becomes a court order.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px"><p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Divorce Settlement Agreement by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Property division rules and residency requirements vary by state.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('divorce-settlement-agreement-template') + '</div>'
    + '</section></div>';
  return wrap('Free ' + state + ' Divorce Settlement Agreement Template 2026', 'Free ' + state + ' divorce settlement agreement. ' + d.prop + '. Residency: ' + d.res + '. Uncontested divorce template. Download PDF.', sl + '-divorce-settlement-agreement-template', body);
}

function cndPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/cease-and-desist-letter-template">Cease &amp; Desist</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Cease and Desist Letter Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; Multiple claim types</span><span class="page-badge">&#10003; ' + state + ' law</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">Common Uses in ' + state + '</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Copyright / Trademark Infringement</td><td style="padding:10px 0;font-weight:600">Supported</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Non-Compete / NDA Violation</td><td style="padding:10px 0;font-weight:600">Supported</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Defamation / Harassment</td><td style="padding:10px 0;font-weight:600">Supported</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Debt / Payment Demand</td><td style="padding:10px 0;font-weight:600">Supported</td></tr>'
    + '</table>'
    + '</div>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Sending a Cease and Desist Letter in ' + state + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">A cease and desist letter in ' + state + ' is a formal written demand that someone stop a specific activity or face legal action. While it is not a court order, it creates a documented record that the recipient was on notice, which is valuable if you later need to sue.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">Common uses include demanding someone stop using your intellectual property, cease defamatory statements, stop harassing behavior, or honor a contract. Send the letter via certified mail with return receipt to prove delivery.</p>'
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/cease-and-desist-letter-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' Cease &amp; Desist &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' cease and desist questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Is a cease and desist letter legally binding in ' + state + '?</summary><div class="faq-a">A cease and desist letter itself is not a court order and cannot legally force the recipient to stop. However, it creates an important paper trail showing the recipient had notice of your claim. If the recipient ignores the letter, you can use it as evidence in a lawsuit or when seeking a temporary restraining order.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Should I send a cease and desist letter by certified mail in ' + state + '?</summary><div class="faq-a">Yes. Sending via certified mail with return receipt requested in ' + state + ' creates an undeniable record that the letter was delivered and received. This proof of service is important if you later need to demonstrate that the recipient had notice of your claim before you filed a lawsuit.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What happens if someone ignores a cease and desist letter in ' + state + '?</summary><div class="faq-a">If the recipient ignores a cease and desist letter in ' + state + ', your next step is typically to file a lawsuit or seek a temporary restraining order (TRO) from the court. The letter itself demonstrates good faith and prior notice, which can support your case for attorney fees or injunctive relief.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Do I need a lawyer to send a cease and desist letter in ' + state + '?</summary><div class="faq-a">You do not need a lawyer to send a cease and desist letter in ' + state + ' for most situations. However, a letter on attorney letterhead carries more weight. For serious IP violations, defamation cases, or matters involving significant money, consulting a ' + state + ' attorney before sending is advisable.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px"><p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Cease and Desist Letter by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">State laws and consumer protection statutes vary; tailor your letter to ' + state + ' law.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('cease-and-desist-letter-template') + '</div>'
    + '</section></div>';
  return wrap('Free ' + state + ' Cease and Desist Letter Template 2026', 'Free ' + state + ' cease and desist letter template. Copyright, trademark, defamation, NDA violations. Fill out online, download PDF.', sl + '-cease-and-desist-letter-template', body);
}

var nc = 0, dc = 0, cc = 0;
STATES.forEach(function(s) {
  var sl = s.toLowerCase().replace(/ /g, '-');
  fs.writeFileSync(B + sl + '-non-compete-agreement-template.html', ncPage(s, NC[s]));
  nc++;
  fs.writeFileSync(B + sl + '-divorce-settlement-agreement-template.html', divPage(s, DIV[s]));
  dc++;
  fs.writeFileSync(B + sl + '-cease-and-desist-letter-template.html', cndPage(s, CND[s]));
  cc++;
});
console.log('Non-compete:', nc, '| Divorce:', dc, '| C&D:', cc, '| Total:', nc + dc + cc);
