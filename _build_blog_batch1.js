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

{slug:'how-to-write-a-lease-agreement',
title:'How to Write a Lease Agreement (2026 Guide)',
desc:'Step-by-step guide to writing a legally binding lease agreement. Learn what to include, what to avoid, and download a free template.',
intro:'A lease agreement is a legally binding contract between a landlord and tenant. Writing one correctly protects both parties and prevents costly court disputes.',
sections:[
{h2:'What to Include in Every Lease Agreement',
body:['Every residential lease must cover: (1) the names of all landlords and tenants, (2) the property address, (3) the lease start and end dates, (4) monthly rent amount and due date, (5) security deposit amount and conditions for return, (6) who pays which utilities, (7) maintenance responsibilities, (8) pet policy, (9) smoking policy, and (10) the notice required to terminate the lease.',
'Missing any of these basics is the most common mistake landlords make — it creates ambiguity that courts typically resolve in the tenant\'s favor. If your lease is silent on a term, state default law fills the gap (and the gap may not be what you intended).']},
{h2:'State-Specific Requirements',
body:['Every US state has its own landlord-tenant statutes that dictate required lease disclosures. California requires a bedbug disclosure. New York City leases must include a window-guard notice. Many states require a lead-paint disclosure for pre-1978 buildings. Some states — including Wisconsin — require landlords to use the state\'s official lease addendum.',
'Before finalizing your lease, look up your state\'s required disclosures. Omitting a legally required disclosure can void a lease provision or expose the landlord to statutory penalties.']},
{h2:'Common Lease Clauses to Include',
body:['Beyond the basics, consider adding: a late fee clause (typically 5–10% of rent, with a grace period); a lease-break fee clause (e.g., two months\' rent); a subletting prohibition or prior-approval requirement; an early entry notice requirement (most states require 24–48 hours); and an attorney\'s fees clause specifying who pays in a lawsuit.',
'For multi-unit buildings, a noise and nuisance clause is valuable. For properties with shared laundry or parking, a clause defining usage rights and responsibilities prevents future disagreements.']},
{h2:'How to Sign a Lease Correctly',
body:['Both parties must sign and date the lease for it to be binding. Each party should receive a complete, signed copy. If multiple tenants live in the unit, have all adult tenants sign — this makes each of them individually and jointly liable for the full rent (a doctrine called joint and several liability).',
'While leases do not need to be notarized to be enforceable, some landlords choose to notarize commercial leases or leases longer than 1 year. Keep your signed original in a safe place — if a dispute goes to court, the signed lease is your primary evidence.']}
],
faqs:[
{q:'Does a lease agreement need to be notarized?',a:'No. A residential lease does not need to be notarized to be legally binding. It is enforceable once both the landlord and all tenants sign it. Commercial leases over 1 year are sometimes notarized as a best practice.'},
{q:'What\'s the difference between a lease and a rental agreement?',a:'A lease is a fixed-term agreement (typically 1 year) that can only be changed if both parties agree. A rental agreement (month-to-month) can usually be changed with proper notice (typically 30 days). A lease provides more stability; a rental agreement provides more flexibility.'},
{q:'Can a landlord change the lease terms mid-lease?',a:'No. Once a lease is signed, neither party can change its terms without the other\'s written consent. A landlord cannot raise the rent, change rules, or modify any term until the lease expires — except as explicitly permitted by the lease itself (e.g., a rent escalation clause).'},
{q:'What happens if a tenant breaks a lease?',a:'If a tenant breaks a lease early, they are typically liable for rent until the unit is re-rented or the lease expires — whichever comes first. Many states require landlords to make a "reasonable effort" to find a new tenant (mitigate damages). A lease-break fee clause specifies a fixed penalty in advance.'}
],
ctaTxt:'Create your state-specific lease agreement — free',ctaHref:'/lease-agreement-template'},

{slug:'how-to-evict-a-tenant',
title:'How to Evict a Tenant: Step-by-Step (2026)',
desc:'Complete guide to the legal eviction process. Learn the correct notices, timeline, court filing, and enforcement — by state.',
intro:'Eviction is a court process — not something a landlord can do unilaterally. Skipping any step, or doing it in the wrong order, can restart the entire process and cost you months of unpaid rent.',
sections:[
{h2:'Step 1: Determine the Reason and Required Notice',
body:['Before anything else, identify why you are evicting the tenant — non-payment of rent, lease violation, illegal activity, or end of tenancy. Each reason requires a different type of notice and a different notice period. Non-payment evictions use a "pay or quit" notice; lease violations use a "cure or quit" notice; no-fault evictions (like owner move-in) use an "unconditional quit" or termination notice.',
'Notice periods vary significantly by state. California requires 3 days for non-payment; New Jersey requires 30 days. Colorado\'s SB21-173 increased notice periods. Always check your state\'s current statute before serving notice.']},
{h2:'Step 2: Serve the Notice Correctly',
body:['An improperly served notice is one of the top reasons evictions are thrown out of court. Most states allow personal service (handing the notice to the tenant), substituted service (leaving it with a person of suitable age and mailing a copy), or posting-and-mailing (taping it to the door and mailing a copy).',
'Document how and when you served the notice. Keep a copy with notes — date, time, method, and who served it. If the tenant claims they never received it, your documentation is the only evidence you have.']},
{h2:'Step 3: Wait the Full Notice Period',
body:['Do not file with the court until the notice period fully expires. If the notice says "3 days," count carefully — most states exclude the day of service and weekends may or may not count (check your state). Filing one day early can result in dismissal.',
'If the tenant pays during the notice period (for a pay-or-quit), the notice is cured and the eviction process ends. If they do not pay or move out by the deadline, you may proceed to court.']},
{h2:'Step 4: File, Attend the Hearing, and Enforce',
body:['File an eviction petition (called an "unlawful detainer" in most states) at the appropriate court — small claims, district, or housing court depending on your jurisdiction. Pay the filing fee (typically $80–$300). The court schedules a hearing, usually 1–3 weeks out.',
'At the hearing, bring your lease, the signed/served notice, and any payment records. If you win, the court issues a judgment and then a "writ of possession." A sheriff or marshal — not the landlord — enforces the writ and physically removes the tenant if they haven\'t left voluntarily.']}
],
faqs:[
{q:'Can a landlord lock out a tenant without a court order?',a:'No. Self-help eviction — changing locks, removing belongings, cutting utilities, or physically removing a tenant without a court order — is illegal in all 50 states. Landlords who do this face significant liability including statutory damages and attorney\'s fees.'},
{q:'How long does the eviction process take?',a:'End-to-end, including notice period, court filing, hearing, and writ enforcement: typically 4–8 weeks in most states. States with strong tenant protections (California, New York, New Jersey) can take 3–6 months. COVID-era backlogs in some housing courts continue to add delays.'},
{q:'Does the eviction show on the tenant\'s credit report?',a:'Not automatically. The eviction filing becomes part of the public court record, which some tenant-screening agencies pull. If the landlord obtains a money judgment for unpaid rent and the tenant doesn\'t pay, the landlord can report it to credit bureaus or collect through wage garnishment.'},
{q:'What is a "writ of possession"?',a:'A writ of possession is the court order that authorizes a sheriff or marshal to remove the tenant. After winning the eviction hearing, the landlord applies for the writ, pays a fee, and schedules the lockout with the sheriff. The landlord cannot personally remove the tenant — only the sheriff can.'}
],
ctaTxt:'Create a state-specific eviction notice — free',ctaHref:'/eviction-notice-template'},

{slug:'eviction-notice-vs-notice-to-vacate',
title:'Eviction Notice vs Notice to Vacate: What\'s the Difference?',
desc:'Confused about eviction notices and notice to vacate letters? Learn when to use each, the legal requirements, and download free templates.',
intro:'These two documents serve different purposes. Using the wrong one — or serving it incorrectly — can delay your case by weeks.',
sections:[
{h2:'What Is an Eviction Notice?',
body:['An eviction notice is a formal legal warning served by a landlord to a tenant, triggering the first step of the court eviction process. There are three main types: (1) <strong>Pay or Quit</strong> — the tenant has X days to pay overdue rent or leave; (2) <strong>Cure or Quit</strong> — the tenant has X days to fix a lease violation (e.g., unauthorized pet) or leave; (3) <strong>Unconditional Quit</strong> — the tenant must leave with no option to cure, used for severe violations.',
'An eviction notice is not the same as an eviction. It is a prerequisite. Without serving the proper notice first, a landlord cannot file an eviction lawsuit.']},
{h2:'What Is a Notice to Vacate?',
body:['A notice to vacate is a letter informing the other party that a tenancy is ending. Landlords use it to end a month-to-month tenancy without cause. Tenants use it to notify their landlord that they are moving out.',
'A notice to vacate is not punitive — it does not allege any violation. It simply says: "This tenancy will end on [date]." Most states require 30 days\' notice for month-to-month tenancies, though some require 60 days for tenants who have lived there 1+ year (California) or 90 days for subsidized housing.']},
{h2:'Key Differences at a Glance',
body:['<strong>Purpose:</strong> An eviction notice responds to a problem (unpaid rent, lease violation). A notice to vacate simply ends a tenancy. <strong>Who sends it:</strong> Only landlords send eviction notices. Either landlord or tenant can send a notice to vacate. <strong>Next step:</strong> An eviction notice leads to court if ignored. A notice to vacate simply marks the end date of the tenancy.']},
{h2:'When to Use Each',
body:['Use an eviction notice when a tenant has unpaid rent, has violated the lease (unauthorized pet, subletting, noise), or is engaging in illegal activity on the property. Use a notice to vacate when you want to end a month-to-month tenancy without cause, when a lease has expired and you don\'t want to renew, or when you are a tenant giving your landlord proper move-out notice.',
'In just-cause eviction cities (NYC, San Francisco, Seattle, Portland), landlords cannot use a simple notice to vacate — they must have a legally recognized reason to end a tenancy. Check your local ordinances before proceeding.']}
],
faqs:[
{q:'Can a landlord send both notices at the same time?',a:'Generally no. You serve the notice that matches the situation. If the issue is unpaid rent, you serve a pay-or-quit notice. If you simply want to end a month-to-month tenancy with no cause, you serve a notice to vacate. Sending both simultaneously can confuse the legal record.'},
{q:'Does a notice to vacate have to be notarized?',a:'No. Neither an eviction notice nor a notice to vacate needs to be notarized to be valid. They must be in writing, include the required information (names, property address, reason if required, and deadline), and be served correctly.'},
{q:'What if the tenant ignores an eviction notice?',a:'If the tenant does not pay, cure the violation, or vacate by the notice deadline, the landlord files an eviction (unlawful detainer) lawsuit at the appropriate court. The landlord cannot remove the tenant themselves — they must obtain a court order and writ of possession.'},
{q:'How much notice must a tenant give before moving out?',a:'Most states require tenants to give the same notice period as the tenancy cycle — 30 days for a month-to-month lease. Check your lease agreement, which may specify a longer notice period (60 days is common in California). Leaving without proper notice can result in the tenant being liable for rent through the notice period.'}
],
ctaTxt:'Create a free eviction notice or notice to vacate',ctaHref:'/eviction-notice-template'},

{slug:'what-is-a-quitclaim-deed',
title:'What Is a Quitclaim Deed? When and How to Use One',
desc:'Learn what a quitclaim deed is, how it differs from a warranty deed, and when to use it. Free quitclaim deed template included.',
intro:'A quitclaim deed transfers whatever ownership interest the grantor has in a property — no warranties, no guarantees. It\'s the right tool for the right situation.',
sections:[
{h2:'How a Quitclaim Deed Works',
body:['A quitclaim deed ("quit claim" — meaning to give up a claim) transfers the grantor\'s entire ownership interest in a property to the grantee. The key word is "whatever interest" — if the grantor has clear title, the grantee gets clear title. If the grantor has no ownership interest, the grantee gets nothing.',
'Unlike a warranty deed, a quitclaim deed makes no promises about the title\'s quality. The grantor doesn\'t guarantee there are no liens, back taxes, or competing ownership claims. This is why quitclaim deeds are used between parties who already trust each other.']},
{h2:'When to Use a Quitclaim Deed',
body:['Quitclaim deeds are appropriate for: (1) transfers between spouses — adding or removing a name after marriage or divorce; (2) transfers to a revocable living trust; (3) parent-to-child transfers as a gift; (4) transferring a personally owned property into your LLC; (5) clearing a title cloud — removing a potential claim from a distant relative or former co-owner.',
'They are NOT appropriate for arm\'s-length sales to strangers. If you are buying property from someone you don\'t know, insist on a warranty deed, which gives you legal recourse if there are hidden title defects.']},
{h2:'How to Complete and Record a Quitclaim Deed',
body:['A valid quitclaim deed must include: grantor\'s full legal name and address, grantee\'s full legal name and address, a legal description of the property (from the existing deed — not just the street address), the consideration paid ($1 is common for gifts within families), and the grantor\'s notarized signature.',
'After signing before a notary, record the deed at the county recorder of deeds or register of deeds office. Recording makes the transfer part of the public record and protects the grantee against competing claims. Recording fees are typically $10–$60 per page. Some states also charge a transfer tax based on the sale price.']},
{h2:'Quitclaim Deed vs Warranty Deed',
body:['A <strong>warranty deed</strong> contains the grantor\'s guarantee ("warranty") that they have clear title and the right to transfer the property, and that they will defend the grantee against any future title claims. This is what you want when buying property from a stranger for full market value.',
'A <strong>quitclaim deed</strong> contains no such warranty. It simply says: "I give you whatever I have, and if that turns out to be nothing, too bad." Use warranty deeds for purchases. Use quitclaim deeds for family transfers, trust transfers, and title corrections.']}
],
faqs:[
{q:'Does a quitclaim deed transfer the mortgage?',a:'No. A quitclaim deed transfers ownership but does not affect the mortgage. The original borrower remains personally liable for the loan unless the lender specifically agrees to release them. Many mortgages have a "due-on-sale" clause that makes the entire loan immediately due if ownership is transferred — check with your lender before using a quitclaim deed on a mortgaged property.'},
{q:'Can a quitclaim deed be reversed?',a:'Once recorded, a quitclaim deed is very difficult to reverse. The grantee would need to sign a new deed transferring the property back. If the grantee refuses, the only option is a court proceeding to void the deed — which requires proving fraud, undue influence, or lack of capacity.'},
{q:'Do I need a lawyer to prepare a quitclaim deed?',a:'For simple family transfers or trust transfers, a properly prepared template is legally valid. For complex situations — transferring a mortgaged property, transfers affecting estate plans, or transfers with tax implications — consult a real estate attorney. The cost of a title review is worth it for high-value properties.'},
{q:'How long does recording take?',a:'In-person recording at the county recorder\'s office is typically same-day or within a few business days. Mail-in recording can take 1–2 weeks. You will receive a stamped copy confirming the book and page number (the deed\'s permanent public record address).'}
],
ctaTxt:'Create your free quitclaim deed — state-specific',ctaHref:'/quitclaim-deed-template'},

{slug:'what-is-power-of-attorney',
title:'What Is a Power of Attorney? Types, Uses, and How to Create One',
desc:'Understand the different types of power of attorney — general, durable, limited, medical — and when you need each. Free POA template.',
intro:'A power of attorney (POA) lets someone you trust — your agent or attorney-in-fact — make legal, financial, or medical decisions on your behalf. Getting the type right matters enormously.',
sections:[
{h2:'The Four Main Types of Power of Attorney',
body:['<strong>General POA</strong>: Grants broad authority over financial and legal matters — banking, real estate, contracts, taxes. Automatically terminates if the principal becomes incapacitated. Used for short-term situations when the principal is unavailable (overseas, recovering from surgery).',
'<strong>Durable POA</strong>: Identical to a general POA but specifically remains in effect — or takes effect — when the principal becomes incapacitated. This is the POA used for long-term financial planning and elder care. The word "durable" must appear in the document in most states.',
'<strong>Limited (Special) POA</strong>: Authorizes the agent to do one specific thing — sign a real estate closing, sell a specific vehicle, manage one bank account. Automatically expires after the specified act is completed.',
'<strong>Healthcare (Medical) POA</strong>: Authorizes the agent to make medical decisions — treatment choices, end-of-life care, surgery consent — if the principal cannot communicate. Often paired with a living will (advance directive).']},
{h2:'When Do You Need a Power of Attorney?',
body:['Common situations requiring a POA: (1) You are traveling or living abroad and need someone to manage US property or finances. (2) You are having surgery and want someone able to make decisions if complications arise. (3) You are estate planning and want someone to manage finances if you become incapacitated. (4) You are elderly and need a trusted person to handle day-to-day banking and bills.',
'Without a POA, if you become incapacitated, a court must appoint a guardian or conservator — a process that costs thousands of dollars and takes months. A durable POA avoids this entirely.']},
{h2:'How to Create a Valid Power of Attorney',
body:['Requirements vary by state, but generally: (1) The principal must be mentally competent at the time of signing. (2) The document must be signed by the principal in front of a notary public. (3) Some states also require 1–2 witnesses (who cannot be the agent or a beneficiary). (4) The document should clearly describe the scope of authority.',
'Once signed and notarized, provide a copy to the agent and any institutions where the POA will be used (banks, brokerages, hospitals). You do not need to file or register a POA in most states — it is effective immediately upon signing.']},
{h2:'How to Revoke a Power of Attorney',
body:['You can revoke a POA at any time while you are competent. To revoke: (1) Create a written "Revocation of Power of Attorney" document. (2) Sign and notarize it. (3) Notify the agent and any third parties (banks, doctors) who were acting under the old POA in writing. (4) If the POA was recorded with a county recorder, record the revocation there too.',
'A POA automatically terminates at the principal\'s death. After death, the executor of the estate (named in the will) takes over — not the agent.']}
],
faqs:[
{q:'Can a POA be used after the principal dies?',a:'No. A power of attorney automatically terminates at the principal\'s death. After death, the executor named in the will (or administrator appointed by the court if there is no will) manages the estate — not the POA agent. Using a POA after death is legally unauthorized and potentially fraudulent.'},
{q:'What is the difference between a POA and a living will?',a:'A power of attorney for healthcare lets your agent make medical decisions on your behalf. A living will (advance directive) states your own wishes about specific medical treatments (ventilators, feeding tubes, resuscitation). They serve different functions — a living will speaks for you; a healthcare POA appoints someone to speak for you. Having both is ideal.'},
{q:'Does a POA give the agent access to bank accounts?',a:'A general or durable financial POA typically authorizes bank account access. However, each bank has its own procedures for accepting POAs — some require their own form. Bring the original POA (or a certified copy) to the bank and have the agent\'s authority confirmed in person.'},
{q:'Can I appoint multiple agents in a POA?',a:'Yes. You can name co-agents (who must act jointly) or successor agents (the second takes over if the first is unable to act). Co-agents provide a check against abuse but can be impractical for time-sensitive decisions. Most estate planning attorneys recommend one primary agent and one or two successors.'}
],
ctaTxt:'Create your free power of attorney — all types included',ctaHref:'/power-of-attorney-template'},

{slug:'how-to-write-a-last-will',
title:'How to Write a Last Will and Testament (2026 Guide)',
desc:'Step-by-step guide to writing a valid last will and testament. Learn the requirements, what to include, and common mistakes to avoid.',
intro:'A will is one of the most important legal documents you can create — yet over half of American adults die without one, leaving their families with no instructions and potential court battles.',
sections:[
{h2:'Basic Requirements for a Valid Will',
body:['For a will to be legally valid in most states, you must: (1) Be at least 18 years old (exceptions for married minors). (2) Be of "sound mind" — you understand what you own, who your natural heirs are, and what you\'re doing. (3) State clearly that the document is your last will. (4) Sign the will. (5) Have at least two witnesses sign (Vermont requires three — the only state with this rule). Most states allow the witnesses to sign at any time; some require all signatures at the same time.',
'Note that witnesses typically cannot be beneficiaries of the will — having an interested witness can partially invalidate that gift. Choose witnesses who are adults, US residents, and who stand to receive nothing under the will.']},
{h2:'What to Include in a Will',
body:['Every will should include: (1) A personal-property clause listing who receives specific items (jewelry, vehicles, collections). (2) A residuary clause that catches everything not specifically listed ("the rest and remainder of my estate I give to..."). (3) A named executor — the person responsible for carrying out the will\'s instructions. (4) A guardian designation for minor children. (5) Alternate beneficiaries (in case a named beneficiary dies before you).',
'Do not name a beneficiary for accounts with designated beneficiary forms (401k, IRAs, life insurance, payable-on-death bank accounts) — those pass outside the will and the beneficiary designation controls, not the will.']},
{h2:'Holographic Wills: Handwritten and Unsigned',
body:['About 28 states recognize holographic wills — entirely handwritten and signed by the testator, but not witnessed. While legally valid in those states, holographic wills are the most commonly contested. Courts struggle to confirm authenticity, date of writing, and mental capacity without witnesses.',
'If your state recognizes holographic wills, use one only as a temporary emergency measure. A witnessed, typed will is always stronger.']},
{h2:'What a Will Cannot Do',
body:['A will cannot: override a beneficiary designation on a life insurance policy, 401(k), or IRA; transfer assets held in joint tenancy with right of survivorship (those pass automatically to the surviving owner); or transfer assets in a living trust (those are controlled by the trust document).',
'A will can be changed any time before death by signing a new will or a codicil (an amendment). Store your signed original in a fireproof safe, with your attorney, or with the probate court in states that offer will registration. Tell your executor where it is.']}
],
faqs:[
{q:'Does a will need to be notarized?',a:'Not in most states — notarization is not required for a will to be valid. However, a "self-proving affidavit" (a notarized statement by the witnesses confirming they watched the signing) lets the will skip probate court confirmation of the signatures. About 48 states allow self-proving affidavits. They add almost no cost but can save significant time and trouble.'},
{q:'What happens if I die without a will?',a:'Dying without a will is called dying "intestate." Your state\'s intestate succession laws determine who inherits — typically your spouse, then children, then other relatives, in a fixed order set by state law. Unmarried partners, stepchildren, and close friends receive nothing unless named in a will. A judge appoints a guardian for your minor children.'},
{q:'Can I write my own will without a lawyer?',a:'Yes. A properly witnessed will that you write yourself is legally valid in all 50 states. However, for estates with a home, business interests, complex assets, or minor children, a consultation with an estate planning attorney can prevent costly mistakes. Attorney fees for a simple will are typically $150–$500.'},
{q:'When should I update my will?',a:'Update your will after any major life event: marriage, divorce (in most states divorce does not automatically remove a spouse from a will), birth or adoption of a child, death of a named beneficiary or executor, significant acquisition or sale of property, or relocation to a different state.'}
],
ctaTxt:'Create your free last will and testament — state-specific',ctaHref:'/last-will-testament-template'},

{slug:'what-is-an-nda',
title:'What Is a Non-Disclosure Agreement (NDA)? 2026 Guide',
desc:'Learn what an NDA is, what it should include, when you need one, and which states restrict employee NDAs. Free NDA template.',
intro:'An NDA (also called a confidentiality agreement) is a contract that prevents the signing party from disclosing confidential information. Used correctly, it\'s one of the most powerful tools to protect trade secrets.',
sections:[
{h2:'Types of NDAs',
body:['<strong>Unilateral NDA</strong>: One party discloses confidential information; the other party agrees not to share it. Used when sharing with an employee, contractor, investor, or vendor.',
'<strong>Mutual NDA</strong>: Both parties share confidential information and both agree to protect the other\'s information. Used in merger discussions, joint ventures, or when two companies are evaluating a partnership.',
'<strong>Multilateral NDA</strong>: Three or more parties, at least one of which is sharing confidential information. Less common but useful for multi-party deals.']},
{h2:'What Every NDA Must Include',
body:['A well-drafted NDA defines: (1) <strong>What is confidential</strong> — be specific. "All information" is overbroad; courts dislike it. Name the specific categories (technical data, customer lists, financial projections, source code). (2) <strong>What is excluded</strong> — information already public, information the recipient already knew, or information they received from a third party without restriction. (3) <strong>Duration</strong> — how long the obligation lasts (2–5 years is standard; some NDAs are perpetual for true trade secrets). (4) <strong>Permitted disclosures</strong> — legal requirements (court order) and authorized internal sharing.',
'Also include: the governing state\'s law, the remedy for breach (injunctive relief plus damages), and who the agreement binds (employees of the recipient company, subcontractors, etc.).']},
{h2:'State Restrictions on Employee NDAs',
body:['Several states restrict or ban employee NDAs covering certain topics. California, Minnesota, Hawaii, and North Dakota ban NDAs that prevent employees from disclosing working conditions, wages, or workplace misconduct to government agencies. Illinois restricts NDAs in settlement agreements related to harassment. New York prohibits NDAs in sexual harassment settlements unless the employee requests them.',
'Post-#MeToo legislation has expanded these restrictions. If you are using an NDA with employees, have an employment attorney review it — especially in California, which has the most aggressive restrictions.']},
{h2:'What an NDA Cannot Protect',
body:['An NDA cannot protect information that is already publicly known, information the other party already possessed, information they develop independently without using your confidential information, or information they must disclose by law (court subpoena, regulatory requirement). Overly broad NDAs that try to cover everything — including lawfully public information — are often held unenforceable by courts.']}
],
faqs:[
{q:'Does an NDA need to be notarized?',a:'No. An NDA does not need to be notarized to be legally binding. It is enforceable once both parties sign. If the NDA is part of an employment offer, it should be signed before or at the start of employment — not weeks later, which can create a "lack of consideration" challenge.'},
{q:'How long does an NDA last?',a:'The duration is whatever the parties agree to. Most commercial NDAs run 2–5 years from the date of signing or disclosure. For trade secrets (formulas, proprietary code, customer databases), perpetual NDAs are common and enforceable in most states. Courts occasionally reject perpetual NDAs for generic business information.'},
{q:'What happens if someone violates an NDA?',a:'The non-breaching party can seek: (1) an injunction to stop ongoing disclosure; (2) actual damages — provable financial harm caused by the disclosure; (3) liquidated damages if the NDA specifies a fixed amount for breach. Trade secret misappropriation may also trigger state and federal criminal liability under the Defend Trade Secrets Act.'},
{q:'Can an employee be fired for refusing to sign an NDA?',a:'In at-will employment states (49 states + DC), an employer can generally require signing an NDA as a condition of employment. However, NDAs that try to prohibit disclosures protected by the NLRA (discussing wages with coworkers) are unenforceable and their enforcement is an unfair labor practice.'}
],
ctaTxt:'Create your free NDA — mutual or unilateral',ctaHref:'/nda-template'},

{slug:'employee-vs-independent-contractor',
title:'Employee vs Independent Contractor: How to Tell the Difference',
desc:'Misclassifying a worker costs thousands in back taxes and penalties. Learn the key tests — ABC, IRS 20-factor, economic reality — used in each state.',
intro:'Worker misclassification is one of the most common and costly legal mistakes small businesses make. Getting it wrong means owing back payroll taxes, benefits, and penalties.',
sections:[
{h2:'Why Classification Matters',
body:['Employees receive: payroll taxes withheld (Social Security, Medicare), potential benefits (workers\' comp, unemployment insurance, health insurance), labor law protections (minimum wage, overtime, anti-discrimination). Employers pay roughly 7.65% in payroll taxes on top of wages.',
'Independent contractors receive none of that. They manage their own taxes (self-employment tax), their own benefits, and are protected only by the contract, not labor law. If you classify someone as an IC to avoid these costs, but they are actually an employee, the IRS, state labor departments, and plaintiffs\' attorneys will eventually notice.']},
{h2:'The IRS 20-Factor Test (Federal Default)',
body:['The IRS looks at 20 factors grouped into three categories: (1) <strong>Behavioral control</strong> — does the company control when, where, and how the work is done? Employees are controlled; ICs direct their own work. (2) <strong>Financial control</strong> — does the worker have their own investment in tools and equipment, serve multiple clients, and bear a profit/loss risk? (3) <strong>Type of relationship</strong> — is there a written contract? Are permanent benefits provided? Is the relationship indefinite?',
'No single factor is decisive. The IRS considers the overall picture. If in doubt, file Form SS-8 to ask the IRS to make a determination.']},
{h2:'The ABC Test (California and 11 Other States)',
body:['California\'s AB 5 (and similar laws in NJ, MA, IL, and others) uses the stricter ABC test. A worker is an employee unless ALL THREE conditions are met: (A) The worker is free from the company\'s control. (B) The work performed is outside the usual course of the company\'s business. (C) The worker is customarily engaged in an independently established trade or business of the same nature.',
'Prong B is the killer for most gig companies. If an Uber driver drives for a transportation company, driving is "the usual course of the company\'s business," so prong B fails — the driver is an employee. California has carved out some exemptions (licensed professionals, certain creative roles) but the ABC test is the default.']},
{h2:'How to Protect Yourself',
body:['Steps to correctly classify and document independent contractor relationships: (1) Have a written independent contractor agreement clearly establishing IC status. (2) Let the IC set their own schedule and methods. (3) Do not provide equipment unless absolutely necessary. (4) Allow or encourage the IC to work for multiple clients. (5) Do not integrate the IC into your regular employee team structure.',
'If someone truly is an employee but you want IC flexibility, consider a staffing agency or a Professional Employer Organization (PEO), which employs the worker while you direct the work.']}
],
faqs:[
{q:'Can a worker choose to be classified as an independent contractor?',a:'No. Worker classification is based on the actual nature of the working relationship, not what the parties call it or agree to. Both parties can agree to an IC relationship, but if the facts show employment, it is employment — regardless of the label on the contract.'},
{q:'What penalties apply for misclassification?',a:'Federal penalties include back payroll taxes (both employee and employer share), plus a 20% penalty on wrongly withheld income taxes and 100% of unpaid FICA taxes. State penalties vary. California adds fines of $5,000–$25,000 per misclassified worker. Private lawsuits can add back wages, benefits, and attorney\'s fees.'},
{q:'Can an IC work exclusively for one company?',a:'Working exclusively for one company is a strong indicator of employee status in most tests. True ICs typically have multiple clients. That said, exclusivity alone does not automatically create employment status — courts look at the full picture.'},
{q:'Does an IC agreement protect me from misclassification claims?',a:'A written IC agreement helps but does not protect you if the actual working relationship looks like employment. Courts look past contract labels to the economic reality. Use the agreement to document the IC nature of the relationship, but ensure the day-to-day reality matches.'}
],
ctaTxt:'Create your free independent contractor agreement',ctaHref:'/independent-contractor-agreement-template'},

{slug:'how-to-write-a-promissory-note',
title:'How to Write a Promissory Note (Free Template + Guide)',
desc:'Learn what a promissory note must include to be legally enforceable. Interest rates, repayment schedules, default clauses — all explained.',
intro:'A promissory note is a legally binding "I owe you" — it records the loan amount, interest rate, repayment schedule, and what happens if the borrower defaults.',
sections:[
{h2:'What a Promissory Note Must Include',
body:['A legally enforceable promissory note must state: (1) The names and addresses of the lender and borrower. (2) The principal amount of the loan. (3) The interest rate — expressed as an annual percentage (APR). (4) The repayment schedule — lump sum on a fixed date, equal monthly installments, or interest-only with balloon payment. (5) The due date(s). (6) What constitutes default (missing a payment, filing for bankruptcy). (7) The lender\'s remedies on default (accelerate the entire balance, charge late fees, pursue legal action). (8) Governing state law.',
'Both parties should sign and date the note. The borrower keeps a copy; the lender keeps the original (it is the evidence of the debt).']},
{h2:'Interest Rate Limits (Usury Laws)',
body:['Every state caps interest rates on private loans — called usury laws. Rates vary significantly: New York caps civil loans at 16% APR (criminal usury kicks in at 25%); California caps personal loans under $2,500 at 30%; many states allow unlimited rates for commercial loans or loans above a certain threshold.',
'Always check your state\'s current usury limits before setting an interest rate. A note with an usurious interest rate can be voided or reformed by a court — you may still recover the principal but lose all interest.']},
{h2:'Secured vs Unsecured Promissory Notes',
body:['An <strong>unsecured promissory note</strong> is backed only by the borrower\'s promise to pay. If they default, the lender must sue and then pursue collection through wage garnishment or bank levies.',
'A <strong>secured promissory note</strong> is backed by collateral — a vehicle, equipment, or real estate. If the borrower defaults, the lender can repossess or foreclose on the collateral. For real estate, a promissory note is paired with a deed of trust or mortgage. For vehicles, a lien is placed on the title.']},
{h2:'What Happens on Default',
body:['A well-drafted promissory note includes an "acceleration clause" — on default, the full outstanding balance becomes immediately due. It should also include a late fee clause (typically 5% of the overdue payment), a cure period (5–15 days to pay before default is declared), and attorney\'s fees if the lender has to sue to collect.',
'If the borrower files for bankruptcy, the promissory note becomes a claim in the bankruptcy proceeding. Secured notes have priority over unsecured notes.']}
],
faqs:[
{q:'Does a promissory note need to be notarized?',a:'No. A promissory note is valid without notarization — both parties\' signatures make it binding. However, if the note is secured by real estate, the accompanying deed of trust or mortgage must be notarized and recorded. Some lenders notarize promissory notes as a fraud-prevention measure.'},
{q:'Can a promissory note be transferred?',a:'Yes. A negotiable promissory note can be endorsed and transferred to a third party, who then has the right to collect the debt. This is how mortgage loans are bundled and sold on secondary markets. If you want to prevent transfer, include a "non-negotiable" clause in the note.'},
{q:'What is the difference between a promissory note and a loan agreement?',a:'A promissory note is a one-page promise to pay — the borrower signs, the lender does not need to. A loan agreement is a more detailed bilateral contract signed by both parties, covering additional terms (purpose of loan, representations, covenants). For large or complex loans, use a full loan agreement; for simple personal loans, a promissory note is usually sufficient.'},
{q:'How long do I have to collect on a promissory note?',a:'The statute of limitations on promissory notes varies by state — typically 3–6 years for written contracts. The clock starts when the borrower misses a payment (or when the full amount is due, for lump-sum notes). If the note is under seal, some states allow up to 10–20 years.'}
],
ctaTxt:'Create your free promissory note — state usury limits included',ctaHref:'/promissory-note-template'},

{slug:'non-compete-agreement-enforceability',
title:'Are Non-Compete Agreements Enforceable? State-by-State Guide',
desc:'Non-competes are banned in California, Minnesota, and others. Learn which states enforce them, the requirements, and how courts decide.',
intro:'Non-compete enforceability is one of the most heavily litigated areas of employment law. The answer is completely different depending on which state you\'re in.',
sections:[
{h2:'States That Ban Non-Competes',
body:['Several states make most employee non-competes unenforceable as a matter of public policy: <strong>California</strong> (banned since 1872, with AB 2288 adding penalties for trying to enforce them), <strong>Minnesota</strong> (banned in 2023 for agreements signed after Jan 1, 2023), <strong>North Dakota</strong>, and <strong>Oklahoma</strong>.',
'<strong>New York</strong> passed a ban in 2024 for employees earning under ~$169K. <strong>Illinois</strong> bans them for employees earning under $75,000/year. The FTC attempted a federal ban in 2024 but it was blocked by federal courts — the state-by-state patchwork remains.']},
{h2:'What Courts Require for Enforcement',
body:['In states that allow non-competes, courts apply a "reasonableness" test. A non-compete is enforceable only if: (1) It protects a legitimate business interest (trade secrets, customer relationships, specialized training — not just preventing competition). (2) The geographic scope is reasonable (nationwide non-competes are usually overkill for a local HVAC tech). (3) The time period is reasonable (2 years is the typical outer limit; courts are skeptical of anything longer). (4) The scope of restricted activity is no broader than necessary.',
'Courts in most states will "blue-pencil" an overbroad non-compete — narrowing it rather than voiding it entirely. But some states (like California) will not: they void the whole thing.']},
{h2:'What Employers Must Provide',
body:['Most states require "consideration" (something of value) in exchange for signing a non-compete. For new hires, the job offer itself is sufficient consideration. For existing employees, requiring them to sign a non-compete mid-employment requires additional consideration — a raise, bonus, promotion, or access to new confidential information. Without new consideration, mid-employment non-competes are often void.',
'Some states (Florida, notably) place the burden on the employee to prove the non-compete is unreasonable. Others place the burden on the employer to prove it is necessary. Know which state\'s rules govern before drafting.']},
{h2:'Drafting Tips for Enforceable Non-Competes',
body:['To maximize enforceability: (1) Define specific competitors — don\'t just say "any competing business" in the relevant industry. (2) Limit geography to the actual trade area where the employee worked. (3) Limit duration to 1–2 years maximum. (4) Include a non-solicitation clause as an alternative or backup — courts view customer non-solicitation agreements far more favorably than full non-competes. (5) Include a choice-of-law clause that specifies a favorable state\'s law (though employees in California will likely still get California protection regardless).']}
],
faqs:[
{q:'Can my employer enforce a non-compete if I was laid off?',a:'Many courts are more skeptical of non-competes when the employer terminates the employee — especially layoffs for business reasons rather than for cause. Some states (like Massachusetts) require continued pay during the restriction period. If you were laid off, consult an employment attorney before assuming the non-compete is enforceable.'},
{q:'What is a non-solicitation agreement?',a:'A non-solicitation agreement prohibits a former employee from soliciting the employer\'s customers or employees — but does not restrict them from working for a competitor. Courts in almost every state uphold reasonable non-solicitation clauses, including California (with limitations). They are a less restrictive alternative to a full non-compete.'},
{q:'Can an independent contractor be subject to a non-compete?',a:'Yes. Non-competes can apply to contractors, not just employees. However, California and some other states that ban employee non-competes also extend the ban to independent contractor relationships. Check your state\'s law.'},
{q:'What happens if I violate a non-compete?',a:'The former employer can seek an injunction (court order to stop the competing activity) and monetary damages. Because damages can be hard to prove, most non-compete cases focus on injunctions. A temporary restraining order can be obtained very quickly — sometimes within days — and can prevent you from working in the field while the case is litigated.'}
],
ctaTxt:'Create your free non-compete agreement — state-specific enforceability',ctaHref:'/non-compete-agreement-template'},

];

posts.forEach(function(p) {
  fs.writeFileSync(B + p.slug + '.html', article(p.slug, p.title, p.desc, p.intro, p.sections, p.faqs, p.ctaTxt, p.ctaHref));
});
console.log('Blog batch 1: ' + posts.length + ' articles');
