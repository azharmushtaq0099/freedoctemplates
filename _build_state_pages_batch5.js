const fs = require('fs');
const B = 'C:/Users/mastr/claude co/legal-docs/';
const STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

// Affidavit: notary=required tip
const AFF = {
  'Alabama':{'tip':'Alabama notaries are appointed by county probate judges; affidavits must be sworn before a licensed notary.'},
  'Alaska':{'tip':'Alaska notaries have a 4-year term; affidavits signed remotely are allowed under remote notarization rules.'},
  'Arizona':{'tip':'Arizona allows online/remote notarization; affidavits can be sworn before any commissioned notary.'},
  'Arkansas':{'tip':'Arkansas notaries serve 10-year terms; the affiant must personally appear and swear before signing.'},
  'California':{'tip':'California notaries hold 4-year commissions; the jurat (sworn statement) is the standard affidavit form.'},
  'Colorado':{'tip':'Colorado allows remote notarization; electronic affidavits are legally valid under Colorado law.'},
  'Connecticut':{'tip':'Connecticut notaries are appointed by the Secretary of State; affidavits must state facts within personal knowledge.'},
  'Delaware':{'tip':'Delaware notary commissions last 2 years; affidavits used in court must comply with Delaware Rules of Evidence.'},
  'Florida':{'tip':'Florida notaries hold 4-year commissions and can perform remote notarization; the jurat must include venue and date.'},
  'Georgia':{'tip':'Georgia notary commissions last 4 years; affidavits submitted to Georgia courts must include the county of venue.'},
  'Hawaii':{'tip':'Hawaii notaries are appointed by the Attorney General; affidavits are commonly used in probate and real estate.'},
  'Idaho':{'tip':'Idaho notaries hold 4-year commissions; remote notarization is authorized under Idaho Code.'},
  'Illinois':{'tip':'Illinois notaries serve 4-year terms; affidavits must state facts within the affiant\'s personal knowledge.'},
  'Indiana':{'tip':'Indiana notaries serve 8-year terms; affidavits used in court proceedings must comply with Indiana Trial Rules.'},
  'Iowa':{'tip':'Iowa notaries hold 3-year commissions; the affiant must swear or affirm the truthfulness of the statement.'},
  'Kansas':{'tip':'Kansas notaries serve 4-year terms; Kansas allows remote notarization for valid electronic affidavits.'},
  'Kentucky':{'tip':'Kentucky notaries hold 4-year commissions; affidavits must be signed in the notary\'s personal presence.'},
  'Louisiana':{'tip':'Louisiana notaries (civil law notaries) have specialized powers; affidavits (affidavits of heirship are common in probate).'},
  'Maine':{'tip':'Maine notaries serve 7-year terms; affidavits of residency and heirship are commonly used in estate proceedings.'},
  'Maryland':{'tip':'Maryland notaries hold 4-year commissions; the jurat must include the county where notarized.'},
  'Massachusetts':{'tip':'Massachusetts notaries serve 7-year terms; affidavits of service and heirship are common legal documents.'},
  'Michigan':{'tip':'Michigan notaries hold 6-year commissions; affidavits must be witnessed by the notary at the time of signing.'},
  'Minnesota':{'tip':'Minnesota notaries serve indefinitely; affidavits in court must comply with Minnesota Rules of Civil Procedure.'},
  'Mississippi':{'tip':'Mississippi notaries hold 4-year commissions; affidavits are commonly used in real estate title and heirship matters.'},
  'Missouri':{'tip':'Missouri notaries serve 4-year terms; the affidavit venue must state the county where notarization occurs.'},
  'Montana':{'tip':'Montana notaries serve 4-year terms; Montana allows remote notarization for valid electronic affidavits.'},
  'Nebraska':{'tip':'Nebraska notaries hold 4-year commissions; affidavits of heirship can be used to transfer property without probate.'},
  'Nevada':{'tip':'Nevada notaries serve 4-year terms; remote notarization is permitted for electronic affidavits in Nevada.'},
  'New Hampshire':{'tip':'New Hampshire notaries serve 5-year terms; affidavits must be sworn before a licensed notary or justice of the peace.'},
  'New Jersey':{'tip':'New Jersey notaries serve 5-year terms; remote notarization is permitted; affidavits of service are commonly required.'},
  'New Mexico':{'tip':'New Mexico notaries hold 4-year commissions; affidavits of heirship and residency are common.'},
  'New York':{'tip':'New York notaries hold 2-year terms; affidavits must include venue (county) and a jurat signed by the notary.'},
  'North Carolina':{'tip':'North Carolina notaries serve 5-year terms; remote notarization is authorized for electronic affidavits.'},
  'North Dakota':{'tip':'North Dakota notaries serve 6-year terms; affidavits of heirship can transfer property without probate.'},
  'Ohio':{'tip':'Ohio notaries hold commissions valid until age 70; affidavits are commonly used in estate and real estate proceedings.'},
  'Oklahoma':{'tip':'Oklahoma notaries serve 4-year terms; affidavits of heirship can be used for property transfers outside of probate.'},
  'Oregon':{'tip':'Oregon notaries hold 4-year commissions; Oregon permits remote notarization for electronic affidavits.'},
  'Pennsylvania':{'tip':'Pennsylvania notaries serve 4-year terms; affidavits used in court must comply with Pennsylvania Rules of Evidence.'},
  'Rhode Island':{'tip':'Rhode Island notaries are appointed by the Governor; affidavits must be sworn in person before the notary.'},
  'South Carolina':{'tip':'South Carolina notaries serve 10-year terms; affidavits of heirship and residency are commonly used.'},
  'South Dakota':{'tip':'South Dakota notaries hold 6-year commissions; affidavits of heirship can transfer small estates without probate.'},
  'Tennessee':{'tip':'Tennessee notaries serve 4-year terms; remote notarization is authorized for electronic affidavits.'},
  'Texas':{'tip':'Texas notaries serve 4-year terms; affidavits of heirship are widely used to transfer real property without probate.'},
  'Utah':{'tip':'Utah notaries hold 4-year commissions; remote notarization is permitted under Utah\'s updated notary law.'},
  'Vermont':{'tip':'Vermont notaries are appointed by the Secretary of State; affidavits must be sworn or affirmed before a notary.'},
  'Virginia':{'tip':'Virginia notaries serve 4-year terms; remote notarization is authorized under the RULONA-based Virginia statute.'},
  'Washington':{'tip':'Washington notaries hold 4-year commissions; remote notarization is permitted for electronic affidavits.'},
  'West Virginia':{'tip':'West Virginia notaries serve 10-year terms; remote notarization is authorized by West Virginia statute.'},
  'Wisconsin':{'tip':'Wisconsin notaries hold 4-year commissions; affidavits must be sworn before the notary with the jurat completed.'},
  'Wyoming':{'tip':'Wyoming notaries serve 4-year terms; affidavits of heirship and residency are commonly used in estate matters.'}
};

// Notice to vacate: res=residential, comm=commercial tip
const NTV = {
  'Alabama':{'res30':30,'res60':60,'tip':'Alabama landlords may use a 30-day notice for month-to-month; tenants typically give 30 days as well.'},
  'Alaska':{'res30':30,'res60':60,'tip':'Alaska requires 30-day notice from tenant or landlord to end a month-to-month tenancy.'},
  'Arizona':{'res30':30,'res60':60,'tip':'Arizona tenants on month-to-month leases should give 30 days written notice before vacating.'},
  'Arkansas':{'res30':30,'res60':60,'tip':'Arkansas tenants should give at least 30 days written notice to terminate a month-to-month lease.'},
  'California':{'res30':30,'res60':60,'tip':'California tenants with under 1 year tenancy give 30 days; over 1 year requires 60 days notice.'},
  'Colorado':{'res21':21,'res91':91,'tip':'Colorado SB21-173 changed notice periods; landlords need 91 days for no-fault; tenants give 21 days.'},
  'Connecticut':{'res30':30,'res60':60,'tip':'Connecticut tenants should give their landlord at least 30 days written notice to vacate.'},
  'Delaware':{'res60':60,'res60l':60,'tip':'Delaware requires 60-day notice from both landlords and tenants for month-to-month termination.'},
  'Florida':{'res15':15,'res30':30,'tip':'Florida requires 15-day notice for week-to-week, 30-day notice for month-to-month tenancies.'},
  'Georgia':{'res30':30,'res60':60,'tip':'Georgia tenants should give 30 days written notice to terminate a month-to-month lease.'},
  'Hawaii':{'res28':28,'res45':45,'tip':'Hawaii requires 28-day notice for month-to-month; 45 days for landlord no-fault termination.'},
  'Idaho':{'res30':30,'res30l':30,'tip':'Idaho requires 30 days for both tenants and landlords to terminate a month-to-month tenancy.'},
  'Illinois':{'res30':30,'res60':60,'tip':'Illinois requires 30-day notice for both parties to terminate a month-to-month tenancy.'},
  'Indiana':{'res30':30,'res30l':30,'tip':'Indiana requires 30 days notice from tenants to end a month-to-month rental agreement.'},
  'Iowa':{'res30':30,'res30l':30,'tip':'Iowa requires 30 days written notice from both parties to terminate a month-to-month tenancy.'},
  'Kansas':{'res30':30,'res30l':30,'tip':'Kansas tenants should give 30 days written notice to terminate their month-to-month lease.'},
  'Kentucky':{'res30':30,'res30l':30,'tip':'Kentucky requires 30 days notice for both parties to end a month-to-month rental.'},
  'Louisiana':{'res10':10,'res10l':10,'tip':'Louisiana has a short 10-day notice period for both parties on month-to-month tenancies.'},
  'Maine':{'res30':30,'res30l':30,'tip':'Maine requires 30 days notice for both parties to terminate a month-to-month tenancy.'},
  'Maryland':{'res60':60,'res60l':60,'tip':'Maryland requires 60 days notice in most counties; Montgomery County requires 90 days.'},
  'Massachusetts':{'res30':30,'res30l':30,'tip':'Massachusetts requires a notice to quit equal to the rent period (usually 30 days).'},
  'Michigan':{'res30':30,'res30l':30,'tip':'Michigan requires 30 days notice for both parties to terminate a month-to-month tenancy.'},
  'Minnesota':{'res30':30,'res30l':30,'tip':'Minnesota requires one rental period notice (usually 30 days) to terminate a month-to-month.'},
  'Mississippi':{'res30':30,'res30l':30,'tip':'Mississippi requires 30 days notice to terminate a month-to-month tenancy.'},
  'Missouri':{'res30':30,'res30l':30,'tip':'Missouri requires one month\'s notice to terminate a month-to-month tenancy.'},
  'Montana':{'res30':30,'res30l':30,'tip':'Montana requires 30 days notice to terminate a month-to-month tenancy from either party.'},
  'Nebraska':{'res30':30,'res30l':30,'tip':'Nebraska requires 30 days notice from tenants to terminate a month-to-month rental.'},
  'Nevada':{'res30':30,'res60':60,'tip':'Nevada requires 30 days notice for tenants; 60 days for landlords on month-to-month tenancies.'},
  'New Hampshire':{'res30':30,'res30l':30,'tip':'New Hampshire requires 30 days written notice to terminate a month-to-month tenancy.'},
  'New Jersey':{'res30':30,'res60':60,'tip':'New Jersey has strong tenant protections; notice periods vary based on length of tenancy.'},
  'New Mexico':{'res30':30,'res30l':30,'tip':'New Mexico requires 30 days notice for both parties to terminate a month-to-month tenancy.'},
  'New York':{'res30':30,'res60':60,'tip':'New York requires 30 days notice under 2 years; 60 days for 2–3 years; 90 days over 3 years.'},
  'North Carolina':{'res7':7,'res7l':7,'tip':'North Carolina only requires 7 days notice for month-to-month; tenants and landlords both give 7 days.'},
  'North Dakota':{'res30':30,'res30l':30,'tip':'North Dakota requires 30 days notice to terminate a month-to-month rental agreement.'},
  'Ohio':{'res30':30,'res30l':30,'tip':'Ohio requires 30 days notice for month-to-month; week-to-week requires 7 days.'},
  'Oklahoma':{'res30':30,'res30l':30,'tip':'Oklahoma requires 30 days written notice to terminate a month-to-month tenancy.'},
  'Oregon':{'res30':30,'res90':90,'tip':'Oregon requires 30 days from tenants; 30–90 days from landlords depending on tenancy length.'},
  'Pennsylvania':{'res15':15,'res30':30,'tip':'Pennsylvania requires 15 days notice for leases of 1 year or less; 30 days for longer tenancies.'},
  'Rhode Island':{'res30':30,'res30l':30,'tip':'Rhode Island requires 30 days written notice to terminate a month-to-month tenancy.'},
  'South Carolina':{'res30':30,'res30l':30,'tip':'South Carolina requires 30 days notice for both parties on a month-to-month tenancy.'},
  'South Dakota':{'res30':30,'res30l':30,'tip':'South Dakota requires one month\'s notice to terminate a month-to-month rental.'},
  'Tennessee':{'res30':30,'res30l':30,'tip':'Tennessee requires 30 days written notice to terminate a month-to-month tenancy.'},
  'Texas':{'res30':30,'res30l':30,'tip':'Texas requires 30 days notice to vacate for month-to-month tenancies unless the lease says otherwise.'},
  'Utah':{'res15':15,'res15l':15,'tip':'Utah requires 15 days notice to terminate a month-to-month tenancy.'},
  'Vermont':{'res60':60,'res60l':60,'tip':'Vermont requires 60 days notice for both tenants and landlords to terminate a month-to-month.'},
  'Virginia':{'res30':30,'res30l':30,'tip':'Virginia requires 30 days notice to terminate a month-to-month tenancy under the VRLTA.'},
  'Washington':{'res20':20,'res20l':20,'tip':'Washington requires 20 days notice from tenants to end a month-to-month tenancy.'},
  'West Virginia':{'res30':30,'res30l':30,'tip':'West Virginia requires one month\'s notice to terminate a month-to-month rental agreement.'},
  'Wisconsin':{'res28':28,'res28l':28,'tip':'Wisconsin requires 28 days notice for both parties to terminate a month-to-month tenancy.'},
  'Wyoming':{'res30':30,'res30l':30,'tip':'Wyoming requires 30 days notice to terminate a month-to-month rental agreement.'}
};

// Commercial lease: tip
const CL = {
  'Alabama':{'tip':'Alabama commercial leases are largely unregulated; negotiated terms govern. Triple net (NNN) leases are common.'},
  'Alaska':{'tip':'Alaska commercial leases must specify rent escalation, CAM charges, and allowed use with precision.'},
  'Arizona':{'tip':'Arizona commercial real estate transactions are frequently handled without brokers; detailed written leases are essential.'},
  'Arkansas':{'tip':'Arkansas commercial leases should address holdover provisions, as Arkansas law favors year-to-year holdovers.'},
  'California':{'tip':'California commercial tenants have fewer statutory protections; negotiate ADA compliance obligations in the lease.'},
  'Colorado':{'tip':'Colorado commercial leases should specify which party handles ADA accessibility upgrades in leased premises.'},
  'Connecticut':{'tip':'Connecticut commercial leases must clearly define CAM charges; courts strictly interpret ambiguous lease language.'},
  'Delaware':{'tip':'Delaware is favorable for commercial real estate; its Court of Chancery handles commercial lease disputes efficiently.'},
  'Florida':{'tip':'Florida imposes a sales tax on commercial rent — currently 4.5% state plus any local surtax; include in lease terms.'},
  'Georgia':{'tip':'Georgia commercial leases should address the Landlord\'s lien for unpaid rent, which is significant under GA law.'},
  'Hawaii':{'tip':'Hawaii commercial leases often involve long ground leases (leasehold interests); review title carefully.'},
  'Idaho':{'tip':'Idaho commercial leases should address water rights if the property has well or irrigation interests attached.'},
  'Illinois':{'tip':'Illinois commercial tenants should address Landlord Distress provisions, which allow landlords to seize property.'},
  'Indiana':{'tip':'Indiana commercial leases should define force majeure carefully; Indiana courts interpret these clauses narrowly.'},
  'Iowa':{'tip':'Iowa commercial leases should address the landlord\'s right of entry and advance notice requirements.'},
  'Kansas':{'tip':'Kansas commercial leases should address agricultural use if the property has outbuildings or land associated.'},
  'Kentucky':{'tip':'Kentucky commercial leases should address mechanics\' lien rights and landlord consent for improvements.'},
  'Louisiana':{'tip':'Louisiana commercial leases follow civil law; the lease must specify a definite term or termination notice procedure.'},
  'Maine':{'tip':'Maine commercial leases in coastal areas should address flood zone, environmental, and zoning issues specifically.'},
  'Maryland':{'tip':'Maryland commercial leases should address distraint remedies and specify permitted alterations by the tenant.'},
  'Massachusetts':{'tip':'Massachusetts commercial leases must address the Chapter 93A consumer protection act for retail tenants.'},
  'Michigan':{'tip':'Michigan commercial leases should address the Landlord\'s self-help remedy, which is permitted for commercial leases.'},
  'Minnesota':{'tip':'Minnesota commercial leases should address the environmental indemnification clause given MN\'s MERLA requirements.'},
  'Mississippi':{'tip':'Mississippi commercial leases should address distress and landlord lien rights under Mississippi Code § 89-7-51.'},
  'Missouri':{'tip':'Missouri commercial leases should address Landlord lien and distress statutes, which differ from residential law.'},
  'Montana':{'tip':'Montana commercial leases should address agricultural exclusions and water rights if rural property is included.'},
  'Nebraska':{'tip':'Nebraska commercial leases should address Landlord\'s lien for unpaid rent, which is significant under Nebraska law.'},
  'Nevada':{'tip':'Nevada commercial leases should address the Personal Property Tax on leasehold improvements, which can be significant.'},
  'New Hampshire':{'tip':'New Hampshire commercial leases should include specific holdover provisions; NH law favors automatic term renewals.'},
  'New Jersey':{'tip':'New Jersey commercial leases must be carefully negotiated; NJ courts may impose equitable relief not in the contract.'},
  'New Mexico':{'tip':'New Mexico commercial leases should address gross receipts tax obligations, which apply to commercial rents.'},
  'New York':{'tip':'New York commercial leases often include personal guarantees; negotiate caps or burndown provisions carefully.'},
  'North Carolina':{'tip':'North Carolina commercial leases should address lien rights and distraint provisions under NC General Statutes.'},
  'North Dakota':{'tip':'North Dakota commercial leases should address agricultural or mineral rights if the leased land has such interests.'},
  'Ohio':{'tip':'Ohio commercial tenants should negotiate carefully around self-help eviction, which is permitted for commercial leases.'},
  'Oklahoma':{'tip':'Oklahoma commercial leases should address the Landlord\'s lien for rent under the Oklahoma Lien Act.'},
  'Oregon':{'tip':'Oregon commercial leases should address Oregon\'s Commercial Property Assessed Clean Energy (PACE) financing impacts.'},
  'Pennsylvania':{'tip':'Pennsylvania commercial leases should address distress remedies; PA allows landlords to distrain personal property.'},
  'Rhode Island':{'tip':'Rhode Island commercial leases should address flood insurance requirements for waterfront commercial properties.'},
  'South Carolina':{'tip':'South Carolina commercial leases should include detailed provisions on permitted use and exclusivity for retail tenants.'},
  'South Dakota':{'tip':'South Dakota commercial leases should address wind energy rights if the property is in a wind-resource area.'},
  'Tennessee':{'tip':'Tennessee commercial leases should address the Landlord\'s lien and the distress statute under TCA § 66-7-101.'},
  'Texas':{'tip':'Texas commercial leases should address the Landlord\'s lien (sometimes a "superior lien") and subordination to mortgages.'},
  'Utah':{'tip':'Utah commercial leases should address the Distraint of Goods statute, which differs from residential tenant law.'},
  'Vermont':{'tip':'Vermont commercial leases should address the Landlord\'s statutory lien and VEPC environmental permit requirements.'},
  'Virginia':{'tip':'Virginia commercial leases are governed by common law; the VRLTA (residential) does not apply to commercial properties.'},
  'Washington':{'tip':'Washington commercial leases should address the B&O tax impact on rent paid by commercial tenants.'},
  'West Virginia':{'tip':'West Virginia commercial leases should address mineral rights, which are frequently severed from surface rights.'},
  'Wisconsin':{'tip':'Wisconsin commercial leases should address holdover provisions carefully; WI courts treat holdovers as year-to-year.'},
  'Wyoming':{'tip':'Wyoming commercial leases should address mineral and water rights if the leased land has such interests severed.'}
};

function sg(slug) {
  return STATES.map(function(s) {
    return '<a href="/' + s.toLowerCase().replace(/ /g,'-') + '-' + slug + '" style="display:block;padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-weight:500;color:var(--ink-1);text-decoration:none" onmouseover="this.style.borderColor=\'var(--accent)\';this.style.background=\'var(--surface-2)\'" onmouseout="this.style.borderColor=\'var(--border)\';this.style.background=\'\'">' + s + '</a>';
  }).join('');
}

var NAV = '<header class="site-header"><div class="header-inner"><a href="/" class="site-logo">FreeDoc<span>Templates</span></a><nav class="main-nav" aria-label="Main"><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Property <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/lease-agreement-template" class="nav-item">Lease Agreement</a><a href="/commercial-lease-agreement-template" class="nav-item">Commercial Lease</a><a href="/notice-to-vacate-template" class="nav-item">Notice to Vacate</a></div></div><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Personal <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/affidavit-template" class="nav-item">Affidavit Template</a><a href="/power-of-attorney-template" class="nav-item">Power of Attorney</a><a href="/last-will-testament-template" class="nav-item">Last Will &amp; Testament</a></div></div></nav><div class="header-actions"><a href="/tools" class="btn-all-tools">All Templates</a><button id="btn-search" class="btn-search" aria-label="Search templates"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></button></div></div></header><div class="cmd-overlay" id="cmd-overlay"><div class="cmd-modal"><div class="cmd-header"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input class="cmd-input" id="cmd-input" placeholder="Search templates\u2026" autocomplete="off"></div><div class="cmd-body" id="cmd-body"></div></div></div>';

var FTR = '<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p></div><div><div class="footer-col-title">Templates</div><nav class="footer-nav"><a href="/affidavit-template">Affidavit</a><a href="/notice-to-vacate-template">Notice to Vacate</a><a href="/commercial-lease-agreement-template">Commercial Lease</a></nav></div></div><div class="footer-bottom"><p>\u00a9 2026 FreeDocTemplates.xyz</p></div></div></footer>';

function wrap(title, desc, canon, body) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + '</title><meta name="description" content="' + desc + '"><link rel="canonical" href="https://www.freedoctemplates.xyz/' + canon + '"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=1"></head><body>' + NAV + '<main class="page-wrap">' + body + '</main>' + FTR + '<script src="/shared/scripts.js?v=1" defer><\/script></body></html>';
}

function affPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/affidavit-template">Affidavit Template</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Affidavit Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; Notary block included</span><span class="page-badge">&#10003; General, heirship &amp; financial</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' Affidavit Requirements</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Notarization Required</td><td style="padding:10px 0;font-weight:600;color:var(--accent)">Yes — required</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Affiant Must Appear in Person</td><td style="padding:10px 0;font-weight:600">Yes (in-person or remote)</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Witness Requirement</td><td style="padding:10px 0;font-weight:600">Notary only (no witnesses required)</td></tr>'
    + '</table>'
    + '</div>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Affidavits in ' + state + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">An affidavit in ' + state + ' is a written statement of facts sworn under oath before a notary public. The person signing (the affiant) must personally appear before a licensed ' + state + ' notary, swear that the statements are true, and sign the document in the notary\'s presence.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">Common uses include: general statements of fact for court proceedings, affidavits of heirship (to transfer property without probate), financial affidavits (for divorce or support proceedings), affidavits of residency, and affidavits of service.</p>'
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/affidavit-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' Affidavit &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' affidavit questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">Does an affidavit need to be notarized in ' + state + '?</summary><div class="faq-a">Yes. An affidavit in ' + state + ' must be signed in the presence of a licensed notary public who administers an oath. Without notarization, the document is simply a written statement, not a sworn affidavit. Courts in ' + state + ' require notarized affidavits for most filings.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Can I use an affidavit of heirship in ' + state + '?</summary><div class="faq-a">Yes. An affidavit of heirship is commonly used in ' + state + ' to transfer real property without going through the full probate process, especially when the deceased did not leave a will. It must be signed by two disinterested witnesses who knew the deceased and notarized. Check with the county recorder for specific requirements.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What is the difference between an affidavit and a declaration?</summary><div class="faq-a">An affidavit is sworn before a notary under oath; making a false statement is perjury. A declaration (used under 28 U.S.C. § 1746) is signed under penalty of perjury but does not require a notary. Federal courts generally accept both; ' + state + ' courts may prefer notarized affidavits for state filings.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Where can I get an affidavit notarized in ' + state + '?</summary><div class="faq-a">In ' + state + ', you can get an affidavit notarized at banks, UPS/FedEx stores, law offices, title companies, courthouses, and through online notary services (if remote notarization is permitted in ' + state + '). Mobile notaries are also available who will come to your location.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px"><p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Affidavit Template by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Notary requirements and affidavit procedures vary by state.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('affidavit-template') + '</div>'
    + '</section></div>';
  return wrap('Free ' + state + ' Affidavit Template 2026 | Notary Block Included', 'Free ' + state + ' affidavit template. General, heirship, and financial affidavits. Notary block included. Fill out online, download PDF.', sl + '-affidavit-template', body);
}

function ntvPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  // pick first notice period key
  var keys = Object.keys(d).filter(function(k){ return k !== 'tip'; });
  var tenantDays = d[keys[0]] || 30;
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/notice-to-vacate-template">Notice to Vacate</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Notice to Vacate Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; Tenant and landlord versions</span><span class="page-badge">&#10003; ' + tenantDays + '-day notice</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' Notice to Vacate Requirements</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Tenant Notice (Month-to-Month)</td><td style="padding:10px 0;font-weight:600">' + tenantDays + ' days</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Written Notice Required</td><td style="padding:10px 0;font-weight:600">Yes</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Delivery Method</td><td style="padding:10px 0;font-weight:600">Written (certified mail recommended)</td></tr>'
    + '</table>'
    + '</div>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Notice to Vacate in ' + state + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">A notice to vacate in ' + state + ' is a written notice from either the tenant or the landlord to end a rental tenancy. For month-to-month rentals, tenants in ' + state + ' generally need to give <strong>' + tenantDays + ' days written notice</strong> before their intended move-out date. Send via certified mail to create proof of delivery.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">This is different from an eviction notice — a notice to vacate is used when the tenant or landlord simply wants to end the tenancy, not due to a lease violation. If you are ending a fixed-term lease, check your lease agreement for any specific notice requirements.</p>'
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/notice-to-vacate-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' Notice to Vacate &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' notice to vacate questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">How much notice does a tenant need to give in ' + state + '?</summary><div class="faq-a">For a month-to-month tenancy in ' + state + ', a tenant must give <strong>' + tenantDays + ' days\' written notice</strong> before the intended move-out date. If your rental agreement specifies a different notice period, follow the lease terms.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What is the difference between a notice to vacate and an eviction notice in ' + state + '?</summary><div class="faq-a">A notice to vacate is sent when either party wants to end the tenancy — there is no lease violation. An eviction notice (pay or quit, cure or quit) is served because the tenant violated the lease. A notice to vacate can come from the tenant (I\'m moving out) or the landlord (please leave by this date).</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Does a notice to vacate in ' + state + ' need to be delivered by certified mail?</summary><div class="faq-a">Certified mail is not always legally required in ' + state + ', but it is strongly recommended. A certified mail receipt proves the date and fact of delivery, which is important if there is a dispute about when notice was given or whether it was received.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">What happens if a tenant does not vacate after a notice in ' + state + '?</summary><div class="faq-a">If the tenant fails to vacate after the notice period expires in ' + state + ', the landlord must file for formal eviction (unlawful detainer) in court. The landlord cannot lock the tenant out, remove belongings, or cut utilities — these are illegal self-help evictions in all states.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px"><p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Notice to Vacate Template by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Notice periods vary by state and tenancy type.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('notice-to-vacate-template') + '</div>'
    + '</section></div>';
  return wrap('Free ' + state + ' Notice to Vacate Template 2026 | ' + tenantDays + '-Day Notice', 'Free ' + state + ' notice to vacate template. ' + tenantDays + '-day notice for month-to-month tenancies. Tenant and landlord versions. Download PDF.', sl + '-notice-to-vacate-template', body);
}

function clPage(state, d) {
  var sl = state.toLowerCase().replace(/ /g, '-');
  var body = '<div class="container">'
    + '<nav class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/commercial-lease-agreement-template">Commercial Lease</a><span>&#8250;</span><span aria-current="page">' + state + '</span></nav>'
    + '<h1 class="page-title" data-enter>Free ' + state + ' Commercial Lease Agreement Template</h1>'
    + '<p class="page-sub" data-enter data-delay="1">' + d.tip + '</p>'
    + '<div class="page-badges" data-enter data-delay="2"><span class="page-badge">&#10003; Free, no account</span><span class="page-badge">&#10003; Gross, NNN, or modified</span><span class="page-badge">&#10003; Office, retail &amp; industrial</span><span class="page-badge">&#10003; PDF download</span></div>'
    + '</div>'
    + '<div class="container" style="margin-top:32px">'
    + '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:32px">'
    + '<p class="section-eyebrow" style="margin-bottom:12px">' + state + ' Commercial Lease Types</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2);width:55%">Gross Lease</td><td style="padding:10px 0;font-weight:600">Landlord pays operating expenses</td></tr>'
    + '<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 0;color:var(--ink-2)">Triple Net (NNN)</td><td style="padding:10px 0;font-weight:600">Tenant pays taxes + insurance + CAM</td></tr>'
    + '<tr><td style="padding:10px 0;color:var(--ink-2)">Modified Gross</td><td style="padding:10px 0;font-weight:600">Split between landlord and tenant</td></tr>'
    + '</table>'
    + '</div>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:12px">Commercial Leases in ' + state + '</h2>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">Commercial leases in ' + state + ' are governed primarily by contract law — unlike residential leases, they are subject to very little statutory protection. Landlords and tenants have wide freedom to negotiate terms including rent escalations, build-out allowances, exclusivity clauses, subletting rights, and renewal options.</p>'
    + '<p style="color:var(--ink-2);line-height:1.7;margin-bottom:12px">The three main commercial lease structures are: <strong>Gross</strong> (landlord pays all operating costs), <strong>Triple Net / NNN</strong> (tenant pays base rent plus property taxes, insurance, and maintenance), and <strong>Modified Gross</strong> (some operating costs shared). Always have a ' + state + ' commercial real estate attorney review a lease before signing.</p>'
    + '<div style="text-align:center;margin-top:24px;margin-bottom:40px"><a href="/commercial-lease-agreement-template" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;text-decoration:none">Create Your ' + state + ' Commercial Lease &#8594; Free Generator</a></div>'
    + '<section class="faq-section" style="margin:0 -24px;padding:48px 24px">'
    + '<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:22px">' + state + ' commercial lease questions</h2></div>'
    + '<div class="faq-list">'
    + '<details class="faq-item"><summary class="faq-q">What is the difference between a gross lease and a NNN lease in ' + state + '?</summary><div class="faq-a">In a <strong>gross lease</strong>, the tenant pays one all-inclusive rent and the landlord pays property taxes, insurance, and maintenance. In a <strong>triple net (NNN) lease</strong>, the tenant pays a lower base rent plus their proportionate share of property taxes, building insurance, and common area maintenance (CAM charges).</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Do commercial tenants have the same protections as residential tenants in ' + state + '?</summary><div class="faq-a">No. ' + state + '\'s residential landlord-tenant laws do not apply to commercial leases. Commercial tenants have fewer statutory protections and are expected to negotiate their own terms. This is why having a commercial real estate attorney review the lease before signing is strongly recommended.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">How long is a typical commercial lease in ' + state + '?</summary><div class="faq-a">Commercial lease terms in ' + state + ' typically range from 1 to 10 years depending on the type of space. Retail and restaurant leases are often 5–10 years. Office leases range from 1–5 years. Industrial leases tend to be longer. Most include options to renew for additional terms.</div></details>'
    + '<details class="faq-item"><summary class="faq-q">Can a commercial landlord evict a tenant in ' + state + '?</summary><div class="faq-a">Yes. Commercial landlords in ' + state + ' can evict tenants for non-payment of rent or lease violations. Commercial evictions generally follow the same notice and court filing process as residential evictions, though self-help remedies (changing locks without a court order) may be permitted in commercial leases in some states — check ' + state + ' law before proceeding.</div></details>'
    + '</div></section>'
    + '<section style="margin-top:48px"><p class="section-eyebrow">All States</p>'
    + '<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Commercial Lease Agreement by State</h2>'
    + '<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Commercial lease law varies by state; always consult a local attorney for commercial properties.</p>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' + sg('commercial-lease-agreement-template') + '</div>'
    + '</section></div>';
  return wrap('Free ' + state + ' Commercial Lease Agreement Template 2026', 'Free ' + state + ' commercial lease agreement template. Gross, NNN, and modified gross leases. Office, retail, and industrial. Download PDF.', sl + '-commercial-lease-agreement-template', body);
}

var ac = 0, nc = 0, cc = 0;
STATES.forEach(function(s) {
  var sl = s.toLowerCase().replace(/ /g, '-');
  fs.writeFileSync(B + sl + '-affidavit-template.html', affPage(s, AFF[s]));
  ac++;
  fs.writeFileSync(B + sl + '-notice-to-vacate-template.html', ntvPage(s, NTV[s]));
  nc++;
  fs.writeFileSync(B + sl + '-commercial-lease-agreement-template.html', clPage(s, CL[s]));
  cc++;
});
console.log('Affidavit:', ac, '| Notice to Vacate:', nc, '| Commercial Lease:', cc, '| Total:', ac + nc + cc);
