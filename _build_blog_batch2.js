const fs = require('fs');
const B = 'C:/Users/mastr/claude co/legal-docs/blog/';
fs.mkdirSync(B, {recursive:true});

var NAV = '<header class="site-header"><div class="header-inner"><a href="/" class="site-logo">FreeDoc<span>Templates</span></a><nav class="main-nav" aria-label="Main"><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Templates <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/lease-agreement-template" class="nav-item">Lease Agreement</a><a href="/eviction-notice-template" class="nav-item">Eviction Notice</a><a href="/bill-of-sale-template" class="nav-item">Bill of Sale</a><a href="/quitclaim-deed-template" class="nav-item">Quitclaim Deed</a><a href="/power-of-attorney-template" class="nav-item">Power of Attorney</a></div></div></nav><div class="header-actions"><a href="/tools" class="btn-all-tools">All Templates</a><button id="btn-search" class="btn-search" aria-label="Search templates"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></button></div></div></header><div class="cmd-overlay" id="cmd-overlay"><div class="cmd-modal"><div class="cmd-header"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input class="cmd-input" id="cmd-input" placeholder="Search templates\u2026" autocomplete="off"></div><div class="cmd-body" id="cmd-body"></div></div></div>';
var FTR = '<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p></div><div><div class="footer-col-title">Templates</div><nav class="footer-nav"><a href="/lease-agreement-template">Lease Agreement</a><a href="/eviction-notice-template">Eviction Notice</a><a href="/quitclaim-deed-template">Quitclaim Deed</a><a href="/power-of-attorney-template">Power of Attorney</a></nav></div></div><div class="footer-bottom"><p>\u00a9 2026 FreeDocTemplates.xyz</p></div></div></footer>';

function wrap(title, desc, canon, body) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + '</title><meta name="description" content="' + desc + '"><link rel="canonical" href="https://www.freedoctemplates.xyz/blog/' + canon + '"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=1"></head><body>' + NAV + '<main class="page-wrap">' + body + '</main>' + FTR + '<script src="/shared/scripts.js?v=1" defer><\/script></body></html>';
}

function sec(h2, paras) {
  return '<h2 style="font-size:20px;font-weight:700;color:var(--ink-1);margin:32px 0 12px">' + h2 + '</h2>'
    + paras.map(function(p){ return '<p style="color:var(--ink-2);line-height:1.75;margin-bottom:14px">' + p + '</p>'; }).join('');
}

function faqBlock(faqs) {
  return '<section class="faq-section" style="margin:40px -24px 0;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p></div>'
    + '<div class="faq-list">'
    + faqs.map(function(f){ return '<details class="faq-item"><summary class="faq-q">' + f.q + '</summary><div class="faq-a">' + f.a + '</div></details>'; }).join('')
    + '</div></section>';
}

function ctaBox(text, href) {
  return '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;text-align:center;margin:32px 0">'
    + '<p style="font-weight:600;color:var(--ink-1);margin-bottom:10px">' + text + '</p>'
    + '<a href="' + href + '" style="display:inline-block;padding:11px 26px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Get Free Template &#8594;</a>'
    + '</div>';
}

function article(slug, title, desc, intro, sections, faqs, ctaTxt, ctaHref) {
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/blog">Blog</a><span>&#8250;</span><span aria-current="page">' + title + '</span></nav>'
    + '<h1 class="page-title" data-enter>' + title + '</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + intro + '</p>'
    + '</div>'
    + '<div class="container" style="max-width:760px;margin-top:32px">'
    + sections.map(function(s){ return sec(s.h2, s.body); }).join('')
    + ctaBox(ctaTxt, ctaHref)
    + faqBlock(faqs)
    + '</div>';
  return wrap(title + ' | FreeDocTemplates', desc, slug, body);
}

var posts = [

{slug:'how-to-write-a-bill-of-sale-for-a-car',
title:'How to Write a Bill of Sale for a Car (2026)',
desc:'Learn what a car bill of sale must include, how to transfer the title, and download a free vehicle bill of sale template.',
intro:'A bill of sale for a car is your proof of purchase. Without one, you have no documentation of the sale price (needed for tax purposes) or the liability transfer.',
sections:[
{h2:'What a Vehicle Bill of Sale Must Include',
body:['A complete car bill of sale should include: (1) Full legal names and addresses of buyer and seller. (2) Vehicle identification number (VIN) — 17 characters, found on the dashboard and on the title. (3) Year, make, model, and color. (4) Current odometer reading. (5) Sale price in both numbers and words. (6) Date of sale. (7) Both parties\' signatures.',
'Some states require a notarized bill of sale for title transfer — check your state\'s DMV. AS-IS disclaimer language ("buyer accepts the vehicle in its present condition") is standard for private sales and limits the seller\'s liability for post-sale issues.']},
{h2:'Title Transfer: What Happens After the Bill of Sale',
body:['A bill of sale proves you bought the car, but title transfer is the official change of ownership in state records. After signing the bill of sale: (1) The seller signs the back of the existing title. (2) Buyer takes the signed title and bill of sale to the county DMV or tax collector. (3) Buyer pays transfer fee and sales tax on the purchase price. (4) New title is issued in buyer\'s name.',
'Most states give you 30 days to complete the title transfer. Missing this deadline triggers late fees. The seller should also notify the DMV that the vehicle was sold to protect against liability for the new owner\'s actions.']},
{h2:'"As-Is" vs Implied Warranty',
body:['All private-party used car sales in the US are "as-is" unless the seller makes specific written representations. This means the buyer has no legal recourse if the car breaks down after the sale — barring fraud or concealment of known defects.',
'Dealer sales are different — most states\'s consumer protection laws impose implied warranties on dealer sales of used vehicles. If a dealer represents a car as having passed inspection and it hasn\'t, the buyer may have recourse under lemon law or consumer protection statutes.']},
{h2:'Seller Protections',
body:['After the sale, the seller should: (1) Keep a copy of the signed bill of sale. (2) Remove the license plates (in most states, plates stay with the seller, not the car). (3) Submit a "Notice of Transfer" or "Release of Liability" form to the state DMV — this removes the seller from responsibility for any future tickets, tolls, or accidents. (4) Cancel or transfer the auto insurance. If you skip the DMV notice and the buyer gets a red-light camera ticket, it may come to you first.']}
],
faqs:[
{q:'Do I need a bill of sale to transfer a car title?',a:'Many states accept a signed title transfer without a separate bill of sale — the title itself has fields for the sale price and odometer. However, a bill of sale provides additional documentation of the sale terms and protects both parties. Some states require a separate bill of sale for title transfer — check your state DMV.'},
{q:'Can I write my own car bill of sale?',a:'Yes. A handwritten or typed car bill of sale is legally valid in all 50 states provided it includes the required information (VIN, parties, price, date, signatures). You do not need a lawyer or official form — though some states provide optional DMV forms.'},
{q:'What if the seller lost the title?',a:'The seller must apply for a duplicate title through the state DMV before transferring ownership. Buying a car without a title is risky — it may have a lien on it, be reported stolen, or be from a junked vehicle. Never pay full price for a car without a clean title.'},
{q:'How is sales tax calculated on a private car sale?',a:'Sales tax on private car sales is calculated on the sale price shown on the bill of sale — not the market value. This is why some buyers and sellers consider understating the price on a bill of sale. This is tax fraud. Auditors and DMV agents are trained to spot below-market sale prices and may assess tax on fair market value instead.'}
],
ctaTxt:'Create your free vehicle bill of sale',ctaHref:'/bill-of-sale-template'},

{slug:'how-long-does-eviction-take',
title:'How Long Does an Eviction Take? State-by-State Timeline',
desc:'Eviction timelines vary by state from 3 weeks to 6 months. See the full breakdown — notice periods, court filing, hearings, and writ enforcement.',
intro:'The eviction process has four phases: notice, court filing, hearing, and writ enforcement. Each phase has a different timeline depending on which state you\'re in.',
sections:[
{h2:'Phase 1: The Notice Period',
body:['The eviction process starts with a written notice. Notice periods for non-payment of rent range from: <strong>1 day</strong> (Missouri), <strong>3 days</strong> (Florida, Texas, California, New York for NYC), <strong>5 days</strong> (Illinois, Rhode Island), <strong>7 days</strong> (Alabama, many others), <strong>10 days</strong> (Colorado post-SB21-173), <strong>14 days</strong> (many states for lease violations), <strong>30 days</strong> (New Jersey, which has the Anti-Eviction Act).',
'The clock doesn\'t start until the tenant is properly served. If service is botched, you start over.']},
{h2:'Phase 2: Filing and Serving the Summons',
body:['After the notice expires without payment or vacation, the landlord files an eviction petition at court. Filing fees are typically $80–$300. The court clerk issues a summons, which must be served on the tenant by a process server or sheriff (not the landlord).',
'The tenant then has time to respond — typically 5–10 days depending on the state. If the tenant files an answer, a full hearing is scheduled. If they don\'t respond, the landlord can often get a default judgment without a hearing.']},
{h2:'Phase 3: The Hearing',
body:['Courts schedule eviction hearings faster than regular civil cases. A hearing date typically comes 1–4 weeks after filing in most states. In NYC Housing Court, backlogs can push this to 2–3 months. In California, evictions with a jury demand can take 3–6 months.',
'At the hearing, bring: the lease, the notice (with proof of service), payment records, and any written communications with the tenant. If the tenant doesn\'t show up, you typically win by default.']},
{h2:'Phase 4: Writ of Possession and Lockout',
body:['After a judgment in the landlord\'s favor, the landlord applies for a writ of possession. The clerk issues it; the sheriff schedules the lockout. Sheriff scheduling adds 1–2 weeks in most jurisdictions (longer in busy urban counties).',
'Total timeline: <strong>Fastest</strong> (Texas, landlord-friendly states): 3–5 weeks. <strong>Average</strong> (Midwest, Southeast): 4–8 weeks. <strong>Slowest</strong> (California, New York, New Jersey): 2–6 months. Contested evictions with counterclaims or jury demands take much longer.']}
],
faqs:[
{q:'Can a landlord evict a tenant during winter?',a:'Yes, in all 50 US states. There is no blanket "winter eviction moratorium" in the US. However, some states have limited cold-weather protections: Minnesota prohibits utility shutoff in extreme cold but does not stop evictions. California restricts eviction of elderly, disabled, or ill tenants in some jurisdictions. Some municipalities enacted temporary moratoria during COVID — most have since expired.'},
{q:'What if the tenant files for bankruptcy during eviction?',a:'A bankruptcy filing triggers an "automatic stay" that pauses most legal proceedings, including evictions. However, if the landlord has already obtained a judgment for possession, they can often proceed. Landlords can file a motion in bankruptcy court to "lift the stay" for residential evictions, especially for illegal drug use or property damage.'},
{q:'Can a tenant delay an eviction by paying partial rent?',a:'Accepting any amount of rent after the notice period has expired can, in some states, restart the pay-or-quit clock — or be deemed a waiver of the eviction. If you decide to pursue eviction for non-payment, do not accept partial payment after serving notice without a written conditional acceptance agreement.'},
{q:'What happens to a tenant\'s belongings after eviction?',a:'After a writ of possession is enforced, the landlord cannot immediately throw away or sell the tenant\'s property. Most states require the landlord to store belongings for a period (7–30 days) and give the tenant written notice to retrieve them. Improperly disposing of a tenant\'s property can expose the landlord to liability.'}
],
ctaTxt:'Create a state-specific eviction notice — free',ctaHref:'/eviction-notice-template'},

{slug:'lease-vs-month-to-month',
title:'Lease Agreement vs Month-to-Month Rental: Which Is Better?',
desc:'Fixed-term leases vs month-to-month rentals — the pros and cons for landlords and tenants, and when each makes sense.',
intro:'The choice between a fixed-term lease and a month-to-month rental affects rent stability, eviction protections, flexibility, and tenant turnover costs.',
sections:[
{h2:'Fixed-Term Lease: Pros and Cons',
body:['<strong>For landlords</strong>: Guaranteed rent revenue for the lease term. The tenant cannot leave without penalty until the lease ends. You can plan repairs, renovations, and re-listing more predictably. Drawback: If you need the unit back early (owner move-in, sale, renovation), you must wait for the lease to expire or pay the tenant to leave.',
'<strong>For tenants</strong>: Rent cannot increase during the lease term. You cannot be asked to leave without cause (in most states) until the lease expires. Drawback: If your circumstances change (job relocation, health, relationship), breaking the lease costs you 1–2 months\' rent in most cases.']},
{h2:'Month-to-Month Rental: Pros and Cons',
body:['<strong>For landlords</strong>: More flexibility to end the tenancy or raise rent with 30 days\' notice (or whatever your state requires). Useful when you are planning to sell or renovate. Drawback: You have no guarantee the tenant will stay. Turnover costs — cleaning, repairs, finding a new tenant — average $1,500–$3,000 per unit.',
'<strong>For tenants</strong>: Maximum flexibility to move with just 30 days\' notice. Useful for job changes, life transitions, or uncertainty about the future. Drawback: The landlord can also give 30 days\' notice (except in just-cause cities), and rent can increase at any time.']},
{h2:'Rent Increases: When Each Allows Them',
body:['Under a fixed-term lease, rent is locked in until the lease expires — the landlord cannot raise rent mid-lease unless the lease includes a specific rent escalation clause. Under a month-to-month agreement, the landlord can generally raise rent with proper notice (30 days in most states; 90 days in California for increases over 10%).',
'In rent-controlled jurisdictions (NYC, San Francisco, Los Angeles), annual rent increases are capped regardless of whether you have a lease or month-to-month agreement.']},
{h2:'What Happens When a Lease Expires',
body:['When a fixed-term lease expires, it usually converts to a month-to-month tenancy automatically — unless either party gives notice to end the tenancy or the parties sign a new lease. Many landlords use lease expiration as an opportunity to raise rent for the new term.',
'Some states allow a "holdover" tenant (one who stays past lease expiration without a new agreement) to be treated as a month-to-month tenant or a tenant at sufferance (who can be evicted with minimal notice). Check your state\'s law on holdover tenants.']}
],
faqs:[
{q:'Can a landlord break a fixed-term lease to sell the property?',a:'No. In most states, a fixed-term lease survives a property sale — the new owner takes the property subject to the existing lease. Tenants cannot be evicted simply because the property was sold until the lease expires. The new owner steps into the former landlord\'s shoes.'},
{q:'Can a tenant switch from a lease to month-to-month?',a:'Not unilaterally. The current lease terms govern until expiration. A tenant can ask the landlord to agree to switch to month-to-month before the lease expires, but the landlord can decline. Once the lease expires and neither party signs a renewal, it typically converts to month-to-month automatically.'},
{q:'What is a "lease renewal" vs a "lease extension"?',a:'A lease renewal is a new agreement for a new term — typically with updated rent and potentially updated terms. A lease extension just extends the end date of the existing lease with the same terms. Both require the signatures of all original parties (or at least written confirmation).'},
{q:'Who is better protected — tenant with a lease or month-to-month?',a:'A tenant with a fixed-term lease has stronger stability protections for the lease term — guaranteed rent, no-cause termination protection, and rent lock. A month-to-month tenant has flexibility but less security. In just-cause eviction cities, both types of tenants get strong protections — landlords can\'t end either tenancy without a legal reason.'}
],
ctaTxt:'Create your free residential lease agreement',ctaHref:'/lease-agreement-template'},

{slug:'how-to-write-an-employment-contract',
title:'How to Write an Employment Contract (2026 Guide)',
desc:'Employment contract essentials — what to include, what to avoid, and the difference between at-will and contract employment.',
intro:'An employment contract defines the relationship between employer and employee. Done correctly, it protects both parties. Done incorrectly, it creates more disputes than it resolves.',
sections:[
{h2:'Employment Contract vs At-Will Employment',
body:['In 49 states plus DC, employment is "at-will" by default — meaning either party can end the employment relationship at any time, for any reason (or no reason), as long as it isn\'t an illegal reason (discrimination, retaliation). Montana is the only exception.',
'A written employment contract can modify this by specifying that the employee can only be terminated "for cause" — defining what cause means (poor performance, misconduct, business closure). This provides job security but creates more obligations for the employer. Most companies offer contracts only to executives, key technical employees, and senior managers.']},
{h2:'What Every Employment Contract Should Include',
body:['Essential terms: (1) Job title and description. (2) Start date and whether the position is full-time or part-time. (3) Compensation — base salary, pay frequency, overtime policy. (4) Benefits summary — health, dental, vision, 401k, PTO policy. (5) At-will clause OR termination-for-cause definition. (6) Confidentiality obligation. (7) Intellectual property assignment (work created on the job belongs to the employer). (8) Governing state law.',
'Optional but important: non-solicitation clause (not non-compete — those are riskier); arbitration clause; severance terms; and a "full agreement" integration clause stating that this contract supersedes all prior discussions.']},
{h2:'IP Assignment: Who Owns What the Employee Creates?',
body:['Under the "work made for hire" doctrine, work created by an employee within the scope of their employment belongs to the employer — not the employee. But this doctrine has gaps, especially for creative work done on personal time. An explicit intellectual property assignment clause eliminates ambiguity.',
'A strong IP clause should cover: inventions conceived during employment (even at home, if using company resources), work product created for the company, and improvements to existing company technology. California limits how broadly IP assignment clauses can reach into employees\' personal time — consult an attorney for California employees.']},
{h2:'Severance and Termination Terms',
body:['Most at-will employment contracts do not include severance — it is optional. If you include severance, tie it to a signed release of claims to protect the company from lawsuits. Typical severance formulas: 1–2 weeks per year of service; executive contracts often specify 3–12 months.',
'If you want to require arbitration of employment disputes (a common practice), the arbitration clause must be clearly written and, in some states, provide equivalent remedies to what a court would offer. The Supreme Court has broadly upheld employment arbitration agreements.']}
],
faqs:[
{q:'Does an employment contract need to be notarized?',a:'No. An employment contract is binding once both parties sign it. Notarization is not required. Keep a signed original in the employee\'s HR file and give the employee a copy at signing.'},
{q:'Can an employer change the terms of an employment contract?',a:'Not unilaterally if the contract is for a fixed term. For at-will agreements, the employer can modify terms going forward (with notice) but cannot change already-earned wages or accrued PTO retroactively. Any modification should be documented in a written amendment signed by both parties.'},
{q:'What is the difference between an employment contract and an offer letter?',a:'An offer letter is typically informal and non-binding — it outlines the key terms (title, salary, start date) but doesn\'t create contractual obligations. An employment contract is a binding legal agreement. Offer letters are fine for most hires; employment contracts are used for senior roles where the terms need legal enforcement.'},
{q:'Can a non-citizen work under an employment contract?',a:'Yes, but the employer must verify employment authorization using Form I-9. Employment contracts cannot override immigration requirements — the employee must have legal work authorization (US citizenship, green card, valid work visa). Some employment contracts include conditions precedent on obtaining necessary work authorization.'}
],
ctaTxt:'Create your free employment contract',ctaHref:'/employment-contract-template'},

{slug:'security-deposit-laws-by-state',
title:'Security Deposit Laws by State: Limits, Returns, and Deductions',
desc:'Security deposit limits, required return deadlines, and allowed deductions for all 50 states. Find out if your landlord is breaking the law.',
intro:'Security deposit disputes are the most common landlord-tenant conflict. Every state has strict rules — and violating them can cost landlords double or triple the deposit amount in penalties.',
sections:[
{h2:'Security Deposit Limits by State',
body:['Most states cap security deposits at 1–3 months\' rent: <strong>1 month\'s rent</strong> — New York, New Hampshire, Kansas, Hawaii, Nebraska, North Carolina. <strong>2 months\' rent</strong> — California, Maryland, Delaware. <strong>3 months\' rent</strong> — Alabama. <strong>No statutory limit</strong> — Texas, Florida, Indiana, Illinois, Colorado, and others (landlord discretion). Some states charge extra for month-to-month tenancies.',
'For furnished units, many states allow an additional half-month to full month\'s additional deposit. Pet deposits are separate from the security deposit and vary — some states ban non-refundable pet fees; others allow them.']},
{h2:'Required Return Deadlines',
body:['Landlords must return the deposit (or the balance after allowed deductions, with an itemized list of deductions) within: <strong>14 days</strong> — California, Maryland. <strong>21 days</strong> — California (if tenant paid last month\'s rent separately). <strong>30 days</strong> — Most states (Texas, Florida, New York, Colorado, Ohio). <strong>45 days</strong> — Arkansas. <strong>60 days</strong> — Iowa (if no deductions). <strong>90 days</strong> — Some states if the landlord is disputing the deposit.',
'The deadline usually runs from the later of the tenant\'s move-out date or the return of keys. Missing the deadline is a common landlord mistake — it often results in forfeiture of the entire deposit, plus penalties.']},
{h2:'What Can Be Deducted',
body:['Allowed deductions typically include: unpaid rent, damage beyond normal wear and tear, and unpaid utility bills charged to the tenant. <strong>Normal wear and tear</strong> — scuffs on walls, minor carpet wear, faded paint — cannot be deducted. The distinction is a gray area that generates enormous litigation.',
'Some states require landlords to provide a move-in checklist and document existing damage before taking any deduction for it. If you did not document pre-existing damage, you cannot deduct for it. Always do a joint walk-through at move-in and move-out, signed by both parties.']},
{h2:'Penalties for Non-Compliance',
body:['Landlords who fail to return the deposit within the deadline or make improper deductions face significant penalties: California — up to 2× the wrongfully withheld deposit; New York — if bad faith, up to 2× the deposit; Texas — up to 3× the deposit plus $100 plus attorney\'s fees; Massachusetts — up to 3× the deposit plus attorney\'s fees. Courts take security deposit violations seriously.']}
],
faqs:[
{q:'Can a landlord use the security deposit while the tenant is still living there?',a:'No. Security deposits must be held in trust for the tenant — they are not the landlord\'s money until legitimately applied after move-out. Some states (Massachusetts, New Jersey) require the deposit to be held in a separate interest-bearing bank account, and interest must be paid to the tenant annually or at move-out.'},
{q:'What is "normal wear and tear"?',a:'Normal wear and tear refers to the expected deterioration of a property from ordinary use over time — scuffs on doorknobs, minor nail holes, carpet wear in high-traffic areas, faded paint. Damage, by contrast, results from negligence or misuse — large holes in walls, stained carpet from pet accidents, broken fixtures. Landlords can deduct for damage, not wear and tear.'},
{q:'Can a landlord charge for cleaning after move-out?',a:'Generally yes, if the unit is left in an unreasonably dirty condition beyond what\'s expected from ordinary use. But if the unit was dirty when the tenant moved in, the landlord cannot charge for that. Itemized cleaning receipts from a professional cleaner strengthen the landlord\'s position; vague "cleaning fee" deductions are often disputed.'},
{q:'What should a tenant do if the landlord doesn\'t return the deposit?',a:'(1) Send a written demand letter citing your state\'s deposit return deadline and penalty statute. (2) File in small claims court — deposit disputes are exactly what small claims courts are designed for. (3) Include the required return deadline, the improper deduction amount, and the statutory penalty in your claim. Bring photos, the move-in checklist, and your lease to court.'}
],
ctaTxt:'Browse free lease and rental templates by state',ctaHref:'/lease-agreement-template'},

{slug:'how-to-write-an-affidavit',
title:'How to Write an Affidavit: Format, Requirements, and Free Template',
desc:'Learn what an affidavit is, what it must include, and how to write one correctly. Free affidavit template with notary block.',
intro:'An affidavit is a written sworn statement of facts — the court or government agency relying on it needs to know it was made under oath, by someone who knows what they\'re talking about.',
sections:[
{h2:'What an Affidavit Is and When You Need One',
body:['An affidavit is a written statement of facts that the affiant (the person making the statement) swears or affirms to be true under penalty of perjury. It is signed in front of a notary public, who verifies the affiant\'s identity and witnesses the oath.',
'Common uses: court proceedings (supporting motions, proving facts the court can\'t otherwise confirm), estate administration (affidavit of heirship to claim an estate without probate), financial transactions (affidavit of domicile for securities transfers), government applications, immigration documents, and sworn witness statements.']},
{h2:'Required Elements of a Valid Affidavit',
body:['A properly formatted affidavit must include: (1) A title identifying it as an affidavit — e.g., "Affidavit of John Smith." (2) The affiant\'s full legal name, address, and a statement that they are of legal age and competent to make the statement. (3) The factual statements, numbered paragraph by paragraph — keep each paragraph to a single fact. (4) A declaration paragraph: "I declare under penalty of perjury that the foregoing is true and correct." (5) The affiant\'s signature. (6) A notary block with the notary\'s signature, seal, commission number, and expiration date.',
'State the facts, not arguments. Courts want "On March 3, 2026, I observed defendant leave the building at 9:47 AM," not "defendant was clearly trying to escape."']},
{h2:'How to Write Clear, Enforceable Statements',
body:['Best practices for the statement paragraphs: Write in the first person ("I saw," "I received," "I know"). Only include facts you have personal knowledge of — not hearsay, not speculation. If you are repeating something you were told, say so clearly ("On April 5, 2026, Jane Doe told me that..."). Avoid legal conclusions — that\'s the lawyer\'s job.',
'Number each paragraph. Keep paragraphs short (2–4 sentences). Avoid emotional language. An affidavit should read like a dry factual police report — just the facts.']},
{h2:'Getting It Notarized',
body:['After writing the affidavit, you must sign it in front of a notary — not before. The notary\'s job is to verify your identity (bring a government-issued photo ID) and witness you take the oath. They do not verify the truth of your statements.',
'Notary services are available at banks, UPS and FedEx stores, law offices, courthouses, and through online remote notarization services. Most cost $5–$15 per signature. After notarization, provide the original to the court or agency that requested it and keep a copy for yourself.']}
],
faqs:[
{q:'Is an affidavit the same as a sworn statement?',a:'Yes — an affidavit is a type of sworn statement. The term "affidavit" specifically refers to a written sworn statement notarized by a notary public. A "sworn statement" can be broader — including verbal oaths. For legal proceedings, courts typically require a formal affidavit (written, notarized) rather than a simple sworn statement.'},
{q:'Can I write an affidavit myself?',a:'Yes. You do not need a lawyer to prepare an affidavit. Write the facts clearly and in numbered paragraphs, use the correct declaratory language, and sign it before a notary. For complex legal proceedings (criminal cases, immigration hearings, contested litigation), having an attorney review your affidavit before submission is advisable.'},
{q:'What is perjury in the context of an affidavit?',a:'Perjury is the crime of knowingly making a false statement under oath in a proceeding where an oath is required. Signing an affidavit with false statements can result in criminal prosecution for perjury — a felony in most states carrying up to 5 years in prison, plus the affidavit\'s evidence value is destroyed. Never include anything in an affidavit that you do not personally know to be true.'},
{q:'What is an "affidavit of heirship"?',a:'An affidavit of heirship is used in several states (Texas, Colorado, and others) to transfer real property without going through full probate. Two disinterested witnesses swear to the decedent\'s family history and rightful heirs. After being recorded in the county records for a holding period (typically 5 years in Texas), it can be used to convey clear title.'}
],
ctaTxt:'Create your free affidavit with notary block',ctaHref:'/affidavit-template'},

{slug:'divorce-settlement-agreement-guide',
title:'Divorce Settlement Agreement: What to Include (2026 Guide)',
desc:'A complete checklist of what your divorce settlement agreement must cover — property, debt, custody, support, and retirement accounts.',
intro:'A divorce settlement agreement (also called a marital settlement agreement or MSA) is the document that ends your marriage on agreed terms. Getting it right avoids going back to court for years.',
sections:[
{h2:'Property Division',
body:['Your settlement agreement must address every asset: (1) The marital home — who keeps it, buys out the other, or sells it and splits proceeds. (2) Bank accounts — what goes to each party. (3) Investment accounts. (4) Vehicles. (5) Business interests. (6) Personal property (furniture, art, jewelry).',
'In the 9 community property states (Arizona, California, Idaho, Louisiana, Nevada, New Mexico, Texas, Washington, Wisconsin), property acquired during marriage is generally split 50/50. In common-law property states, courts divide property "equitably" — which often means 50/50 but can vary based on each spouse\'s contributions.']},
{h2:'Debt Division',
body:['Debts are as important as assets. Your agreement should specify who pays: the mortgage (if one spouse keeps the house), auto loans (on each vehicle), credit card balances, student loans (generally the borrower\'s), medical bills, and tax liabilities.',
'Important: a divorce agreement between spouses does not bind the creditor. If both spouses are on a joint credit card and the agreement says Spouse A will pay it, the credit card company can still pursue Spouse B if Spouse A defaults. The only way to remove liability is to pay off and close joint accounts or refinance into one spouse\'s name.']},
{h2:'Child Custody and Parenting Plan',
body:['For divorcing parents, the agreement must include: (1) Legal custody — who makes major decisions (education, healthcare, religion). Joint legal custody is the default in most states. (2) Physical custody — where the children primarily live. (3) A detailed parenting plan — alternating weekends, holidays, vacations, school breaks. (4) Communication rules — how parents will communicate with children during the other\'s time.',
'Courts apply the "best interests of the child" standard. Agreements that are clearly in the child\'s best interest get approved quickly; agreements that look punitive toward the other parent face scrutiny.']},
{h2:'Alimony and Child Support',
body:['Spousal support (alimony): whether it will be paid, how much, and for how long. Most modern divorces have limited or no alimony — it depends on the length of the marriage, income disparity, and each state\'s guidelines. The agreement should specify whether it is modifiable.',
'Child support is usually calculated by a state formula (income shares or percentage of income model) and is not waivable by the parents. Even if both parents agree on a lower amount, courts must approve child support arrangements that meet the state\'s minimum guidelines.']}
],
faqs:[
{q:'Do I need a lawyer for a divorce settlement agreement?',a:'Not legally required, but strongly recommended for high-asset divorces, divorces with minor children, or any situation with significant disputes. For simple divorces with little property and no children, many couples use an online template and get it reviewed by an attorney ($200–$500 for a review). Attempting to DIY a complex divorce usually costs more in corrections and litigation than the initial attorney fee would have.'},
{q:'What makes a divorce settlement agreement enforceable?',a:'Once both spouses sign the agreement and a court approves it, it becomes a court order — fully enforceable by contempt proceedings. If a spouse doesn\'t pay court-ordered support or violates the custody agreement, the other spouse can file a motion for contempt, which can result in fines or jail time.'},
{q:'Can a divorce settlement agreement be changed?',a:'Yes, but typically only by going back to court. Spousal support can be modified if there is a substantial change in circumstances (loss of income, remarriage in some states). Child support can be modified if circumstances change significantly. Property division is generally final once the decree is entered — courts are reluctant to reopen it.'},
{q:'What are QDROs and why do they matter?',a:'A Qualified Domestic Relations Order (QDRO) is a special court order needed to divide a 401(k), pension, or retirement account in a divorce without triggering early withdrawal taxes. Simply listing the retirement account in the settlement agreement is not enough — you must obtain a separate QDRO, have it approved by the plan administrator, and submit it. Forgetting the QDRO is one of the most costly divorce mistakes.'}
],
ctaTxt:'Create your free divorce settlement agreement',ctaHref:'/divorce-settlement-agreement-template'},

{slug:'how-to-write-a-personal-loan-agreement',
title:'How to Write a Personal Loan Agreement Between Friends or Family',
desc:'Lending money to friends or family? A written loan agreement prevents misunderstandings and protects your relationship. Free template included.',
intro:'More money is lost to informal loans among friends and family than to any bank fraud. The solution is simple: put it in writing.',
sections:[
{h2:'Why You Need a Written Agreement for Personal Loans',
body:['Without a written agreement, personal loans between friends or family members: (1) Have no agreed interest rate — borrower may assume 0%, lender may expect something. (2) Have no repayment schedule — "when you can" becomes "never." (3) Are treated as gifts by the IRS if not documented correctly. (4) Are uncollectable in court — the borrower can claim it was a gift with no obligation to repay.',
'A one-page personal loan agreement takes 10 minutes to fill out and eliminates all of this ambiguity. The IRS also requires documentation for loans above $10,000 between family members — and requires that the interest rate meet the Applicable Federal Rate (AFR) published monthly by the IRS.']},
{h2:'Key Terms to Include',
body:['Your personal loan agreement should cover: (1) Loan amount in numbers and words. (2) Interest rate — can be 0% for family, but must be at least the AFR for loans over $10,000 to avoid the IRS imputing interest. (3) Repayment schedule — specific dates and amounts. (4) What happens if a payment is missed — grace period, late fee. (5) Whether payments go toward principal first or interest first (simple interest vs compound). (6) Governing state\'s law.',
'Optional: collateral (what the lender can take if the borrower defaults), an acceleration clause (full balance due on default), and a forgiveness clause (lender can forgive the remaining balance).']},
{h2:'The IRS Applicable Federal Rate Rule',
body:['For loans between family members exceeding $10,000, the IRS requires the interest rate to be at least the Applicable Federal Rate (AFR) — the minimum rate the IRS considers arm\'s-length. For 2026, short-term AFR (under 3 years) is approximately 4–5% (check IRS.gov monthly — it adjusts).',
'If you charge less than the AFR, the IRS "imputes" the difference — treating the lender as having received interest they never received and taxing it. For loans under $10,000, the AFR rule doesn\'t apply. For loans between $10,000 and $100,000, imputation only applies to net investment income.']},
{h2:'What Happens If the Borrower Can\'t Pay',
body:['Build a plan for this before it happens. Options: (1) Pause payments for 90 days with a formal forbearance addendum. (2) Restructure — reduce monthly payments, extend the term. (3) Forgive the balance — the lender can treat it as a gift (but the gift tax annual exclusion limits still apply). (4) Sue — small claims court handles loans up to $10,000–$25,000 (limit varies by state) without an attorney.',
'Lending to family or friends is inherently risky — only lend what you can afford to lose. The agreement doesn\'t prevent default; it gives you a legal pathway if default happens.']}
],
faqs:[
{q:'Does a personal loan agreement need to be notarized?',a:'No. A personal loan agreement is legally binding without notarization. Both signatures make it enforceable. However, notarization does make it harder for a party to later deny they signed it — worth doing for loans over $5,000.'},
{q:'Can I charge interest on a personal loan to a friend?',a:'Yes. There is no law against charging interest on a personal loan. Both parties agree to the rate in the contract. The only legal constraint is your state\'s usury law — which caps the maximum rate on personal loans. Check your state\'s limit before setting a rate above 15% APR.'},
{q:'What if the loan is never repaid?',a:'If you sue and win in small claims court, you get a judgment. Collecting on the judgment requires additional steps — wage garnishment, bank levy, or placing a lien on the borrower\'s property. Collections between friends and family are almost always awkward and often unsuccessful. If repayment is uncertain, consider gifting the money instead of lending it.'},
{q:'Does the loan need to be reported on taxes?',a:'The lender must report any interest earned as income on their federal tax return. If the lender forgives the loan, it may be treated as a gift — subject to gift tax rules if over the annual exclusion ($18,000 per recipient in 2026). For loans between family members over $10,000, the IRS imputed interest rules apply — consult a tax advisor.'}
],
ctaTxt:'Create your free personal loan agreement',ctaHref:'/personal-loan-agreement-template'},

{slug:'what-should-an-llc-operating-agreement-include',
title:'What Should an LLC Operating Agreement Include? Complete Checklist',
desc:'LLC operating agreement essentials — member rights, voting, profit distribution, manager powers, and buyout provisions. Free template.',
intro:'Your state may not require an LLC operating agreement, but without one, your LLC is governed by generic default state rules — which rarely reflect what you actually agreed.',
sections:[
{h2:'Ownership and Membership Structure',
body:['The operating agreement must define: (1) Who the members are — full legal names and addresses. (2) Each member\'s ownership percentage. (3) Capital contributions — how much each member contributed in cash, property, or services. (4) Whether membership interests can be transferred and if so, how (right of first refusal provisions are common). (5) What happens if a member dies or becomes incapacitated.',
'Without a transfer restriction clause, a member could theoretically sell their LLC interest to a stranger — bringing in an unwanted business partner. Most operating agreements require existing member approval for any transfer.']},
{h2:'Management: Member-Managed vs Manager-Managed',
body:['<strong>Member-managed</strong>: All members share in managing day-to-day operations. Every member has actual authority to bind the LLC. Best for small LLCs where all members are active participants.',
'<strong>Manager-managed</strong>: One or more designated managers (who may or may not be members) run the business. Other members are passive investors. The agreement specifies the manager\'s powers (what they can do without member approval) and limitations (large expenditures, contracts over a certain dollar amount, taking on debt require member vote).']},
{h2:'Profit and Loss Allocation',
body:['Profits and losses don\'t have to be split proportionally to ownership percentages — but if you want a different arrangement, it must be in the operating agreement. A 50/50 LLC might give one member 70% of profits for the first 3 years to reflect their larger capital contribution. Special allocations must have "substantial economic effect" to be respected by the IRS.',
'The agreement should also specify: when distributions are made (quarterly, annually, or at manager/member discretion), whether guaranteed payments are made to any members for services, and how to handle situations where the LLC lacks funds for distributions.']},
{h2:'Buyout, Dissolution, and Deadlock',
body:['What happens when a member wants to exit or members can\'t agree? Your agreement should cover: (1) <strong>Voluntary exit</strong> — can a member just leave? Do they get their capital account back? (2) <strong>Buyout formula</strong> — how is the departing member\'s interest valued? (3) <strong>Deadlock</strong> — what if a 50/50 LLC is split on a key decision? Options: mediator, supermajority requirement, buy-sell ("shotgun") clause. (4) <strong>Dissolution</strong> — what vote is required to wind down the LLC and how are assets distributed?',
'A "shotgun" clause is an elegant deadlock solution: either party can offer to buy the other out at a named price, and the other must either accept the offer or buy the first party out at that same price. This forces both parties to name a fair price.']}
],
faqs:[
{q:'Is an operating agreement required by law?',a:'Most states do not require LLCs to have a written operating agreement. Exceptions: California, New York, Missouri, Maine, and Delaware. Even where not required, not having one is a serious mistake — it leaves the LLC governed by generic default state rules and makes it harder to prove the LLC is a legitimate separate business entity.'},
{q:'Can a single-member LLC have an operating agreement?',a:'Yes — and it should. A single-member LLC operating agreement documents that the LLC is a genuine separate entity from the owner, which is crucial for maintaining liability protection. Courts can "pierce the corporate veil" and hold the owner personally liable if the LLC appears to be just an alter ego of the owner.'},
{q:'Can an operating agreement override state law?',a:'Within limits. Operating agreements can change most default state rules — voting thresholds, profit allocations, management structure. But they cannot override mandatory statutory protections — like a member\'s right to inspect company records or statutory protections for creditors. State law sets a floor; the operating agreement customizes everything above it.'},
{q:'When should an operating agreement be updated?',a:'Update it when: a member joins or leaves, ownership percentages change, the management structure changes, the business adds a new major activity, or any member\'s role changes significantly. Store the executed original with the company\'s permanent records along with the articles of organization and any amendments.'}
],
ctaTxt:'Create your free LLC operating agreement',ctaHref:'/llc-operating-agreement-template'},

{slug:'what-is-community-property-divorce',
title:'Community Property in Divorce: Which States and What It Means',
desc:'How community property works in divorce, which 9 states use it, and how it differs from equitable distribution. State-by-state guide.',
intro:'If you live in one of the 9 community property states, nearly everything you and your spouse acquired during marriage is owned 50/50 — and split that way in divorce.',
sections:[
{h2:'The 9 Community Property States',
body:['Community property states: <strong>Arizona, California, Idaho, Louisiana, Nevada, New Mexico, Texas, Washington, and Wisconsin</strong>. Alaska is an opt-in community property state — spouses can agree to treat assets as community property.',
'In all other states (41 states + DC), the equitable distribution model applies — courts divide marital property "fairly," which usually means roughly 50/50 but can vary based on factors like income disparity, length of marriage, and contributions to the marriage.']},
{h2:'What Is Community Property?',
body:['In community property states, any asset acquired during the marriage (income, home purchased during marriage, investments made with marital income) is community property — owned equally by both spouses, regardless of whose name is on the title or whose paycheck paid for it.',
'<strong>Separate property</strong> — owned entirely by one spouse — includes: assets brought into the marriage, inheritances received during the marriage, and gifts to one spouse specifically. Separate property can become community property ("commingling") if it is mixed with marital funds — for example, depositing an inheritance into a joint account.']},
{h2:'How Community Property Splits in Divorce',
body:['In California, Arizona, and most community property states, community property is split 50/50 in divorce. There is little judicial discretion — it\'s a rule, not a guideline. Texas and Louisiana have slightly more flexibility in how courts divide community property, but 50/50 is still the starting point.',
'Separate property goes back to its original owner. The battleground in community property divorces is proving what is separate property vs what became commingled. Keep records of separate property assets (inheritance documentation, pre-marital account statements) to maintain their separate character.']},
{h2:'Debts in Community Property States',
body:['In most community property states, debts incurred during the marriage are also community debts — both spouses share liability. This includes credit card debt, auto loans, and even student loans (in some states). In California, community debts are generally shared 50/50 in divorce.',
'Exceptions: debts incurred before the marriage or after permanent legal separation are typically separate. Debts incurred for purely personal purposes (gambling debts in some states) may also be treated as separate. The divorce agreement can specify who pays each debt, but the agreement doesn\'t bind creditors — both spouses remain liable to creditors unless the account is refinanced.']}
],
faqs:[
{q:'Does community property apply if we never bought anything together?',a:'Community property applies to income — not just assets. If one spouse earned income during the marriage, the other spouse owns half of it as community property, regardless of who is named on the bank accounts. The character of the property (community vs separate) is determined by the source of funds used to acquire it.'},
{q:'What happens to community property if a spouse dies?',a:'In community property states, each spouse owns half of all community property outright. When one spouse dies, their half goes through probate (or to beneficiaries named in a will or trust). The surviving spouse automatically owns their own half — no probate needed for that portion. This is different from joint tenancy with right of survivorship.'},
{q:'Can a prenuptial agreement override community property rules?',a:'Yes. A valid prenuptial agreement can designate all or some assets as separate property — effectively opting out of community property rules. The prenup must be in writing, signed by both parties, with full financial disclosure, and ideally with separate attorneys. Courts scrutinize prenups for coercion or unfairness.'},
{q:'Does community property affect estate planning?',a:'Significantly. In community property states, each spouse can only leave their half of community property in their will — they can\'t give away the other spouse\'s half. This affects trust planning, beneficiary designations, and retirement account rules. Estate plans created in common-law states should be reviewed after moving to a community property state.'}
],
ctaTxt:'Create your free divorce settlement agreement',ctaHref:'/divorce-settlement-agreement-template'},

];

posts.forEach(function(p) {
  fs.writeFileSync(B + p.slug + '.html', article(p.slug, p.title, p.desc, p.intro, p.sections, p.faqs, p.ctaTxt, p.ctaHref));
});
console.log('Blog batch 2: ' + posts.length + ' articles');
