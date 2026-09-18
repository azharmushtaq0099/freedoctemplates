const fs = require('fs');
const base = 'C:/Users/mastr/claude co/legal-docs/';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Free Quitclaim Deed Template 2026 | Fill In &amp; Download PDF</title>
<meta name="description" content="Free quitclaim deed template 2026. Transfer property between spouses, family members, or to/from an LLC. Fill in, preview live, download PDF. Notary block included.">
<link rel="canonical" href="https://www.freedoctemplates.xyz/quitclaim-deed-template">
<meta property="og:title" content="Free Quitclaim Deed Template 2026">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap">
<link rel="stylesheet" href="/shared/styles.css?v=1">
</head>
<body>
<header class="site-header"><div class="header-inner"><a href="/" class="site-logo">FreeDoc<span>Templates</span></a><nav class="main-nav" aria-label="Main"><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Business <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/invoice-template" class="nav-item">Invoice Template</a><a href="/nda-template" class="nav-item">NDA Template</a></div></div><div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Property <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/lease-agreement-template" class="nav-item">Lease Agreement</a><a href="/bill-of-sale-template" class="nav-item">Bill of Sale</a><a href="/quitclaim-deed-template" class="nav-item">Quitclaim Deed</a></div></div></nav><div class="header-actions"><a href="/tools" class="btn-all-tools">All Templates</a></div></div></header>
<main class="page-wrap">
<div class="container">
<nav class="breadcrumb"><a href="/">Home</a><span>›</span><a href="/tools">Templates</a><span>›</span><span aria-current="page">Quitclaim Deed</span></nav>
<h1 class="page-title" data-enter>Free Quitclaim Deed Template</h1>
<p class="page-sub" data-enter data-delay="1">Transfer real property between spouses, family members, or to/from an LLC. Fill in, preview live, download and notarize.</p>
<div class="page-badges" data-enter data-delay="2"><span class="page-badge">✓ Free, no account</span><span class="page-badge">✓ All 50 states</span><span class="page-badge">✓ Notary block included</span><span class="page-badge">✓ PDF download</span></div>
</div>
<div class="container doc-layout">
<!-- FORM -->
<div class="doc-form-panel">
  <div class="form-section">
    <div class="form-section-title">Grantor (Current Owner — Giving Property)</div>
    <div class="form-row"><label class="form-label">Grantor Full Name</label><input class="form-input" id="qc-grantor" placeholder="John Michael Smith" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Grantor Mailing Address</label><input class="form-input" id="qc-grantor-addr" placeholder="123 Main St, Denver, CO 80201" oninput="render()"></div>
  </div>
  <div class="form-section">
    <div class="form-section-title">Grantee (Receiving the Property)</div>
    <div class="form-row"><label class="form-label">Grantee Full Name</label><input class="form-input" id="qc-grantee" placeholder="Jane Marie Smith" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Grantee Mailing Address</label><input class="form-input" id="qc-grantee-addr" placeholder="123 Main St, Denver, CO 80201" oninput="render()"></div>
    <div class="form-row"><label class="form-label">Relationship (for context)</label><input class="form-input" id="qc-relationship" placeholder="Spouse / Child / LLC Member" oninput="render()"></div>
  </div>
  <div class="form-section">
    <div class="form-section-title">Property</div>
    <div class="form-row"><label class="form-label">Property Street Address</label><input class="form-input" id="qc-address" placeholder="456 Oak Ave, Denver, CO 80202" oninput="render()"></div>
    <div class="form-row two-col"><div><label class="form-label">County</label><input class="form-input" id="qc-county" placeholder="Denver" oninput="render()"></div><div><label class="form-label">State</label><select class="form-input" id="qc-state" onchange="render()"><option value="">— Select —</option><option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option></select></div></div>
    <div class="form-row"><label class="form-label">Legal Description (Parcel ID / Lot &amp; Block)</label><textarea class="form-input" id="qc-legal" rows="2" placeholder="Lot 12, Block 4, Sunny Acres Subdivision, as recorded in Book 42, Page 17 of the County Records" oninput="render()"></textarea></div>
    <div class="form-row"><label class="form-label">APN / Parcel Number</label><input class="form-input" id="qc-apn" placeholder="123-456-789-00" oninput="render()"></div>
  </div>
  <div class="form-section">
    <div class="form-section-title">Consideration</div>
    <div class="form-row"><label class="form-label">Consideration Amount</label><input class="form-input" id="qc-consideration" placeholder="10.00 (nominal) or 450,000.00" oninput="render()"></div>
    <p style="font-size:12px;color:var(--ink-3)">Most family/spousal transfers use a nominal consideration of $10.00. A real estate attorney should advise on tax implications.</p>
  </div>
  <div class="form-section">
    <div class="form-section-title">Date</div>
    <div class="form-row"><label class="form-label">Date of Execution</label><input class="form-input" id="qc-date" type="date" oninput="render()"></div>
  </div>
  <div class="form-section">
    <button class="doc-btn doc-btn--gold" type="button" onclick="window.print()" style="width:100%"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> Download / Print PDF</button>
    <p style="font-size:11px;color:var(--ink-3);text-align:center;margin-top:6px">Sign before a notary. Record the deed with your county recorder after signing.</p>
  </div>
</div>
<!-- PREVIEW -->
<div class="doc-preview-panel">
  <div class="doc-preview-header"><span>Live Preview</span><span style="font-size:11px;color:var(--ink-3)">Updates as you type</span></div>
  <div class="legal-document" id="qc-preview">
    <div class="doc-title">QUITCLAIM DEED</div>
    <div class="doc-subtitle">Fill in the form to see your deed</div>
  </div>
</div>
</div>

<div class="container" style="margin-top:56px">
<section class="faq-section" style="margin:0 -24px;padding:48px 24px">
<div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:24px">Quitclaim deed questions</h2></div>
<div class="faq-list">
<details class="faq-item"><summary class="faq-q">What is a quitclaim deed vs. a warranty deed?</summary><div class="faq-a">A <strong>quitclaim deed</strong> transfers whatever interest the grantor has in the property — with no warranties. If the grantor's title has defects, liens, or competing claims, the grantee receives those problems too. A <strong>warranty deed</strong> guarantees that the grantor has clear title and will defend against any claims. Quitclaim deeds are used for low-risk transfers between known parties (spouses, family, LLC ownership). Warranty deeds are used in arm's-length real estate sales where the buyer needs title protection.</div></details>
<details class="faq-item"><summary class="faq-q">Do I need a lawyer to prepare a quitclaim deed?</summary><div class="faq-a">Not required, but recommended for complex situations. Simple transfers — adding a spouse to title, removing a deceased spouse, transferring to a family trust — are commonly done with a template deed. You must have the deed notarized and recorded with your county recorder or register of deeds to make the transfer legally effective against third parties.</div></details>
<details class="faq-item"><summary class="faq-q">What happens after I sign the quitclaim deed?</summary><div class="faq-a">After signing: (1) get the deed notarized, (2) record it with your county recorder of deeds (bring the original + recording fee, typically $10–$30 per page), (3) keep a recorded copy for your records. The transfer is not legally effective against third-party creditors or buyers until it is recorded. Check with your county for the exact recording requirements.</div></details>
<details class="faq-item"><summary class="faq-q">Will a quitclaim deed affect my mortgage?</summary><div class="faq-a">Yes — most mortgages contain a "due-on-sale" clause that technically allows the lender to call the loan due when ownership changes. In practice, lenders rarely enforce this for transfers to spouses or family trusts, but you should notify your lender and get written confirmation before recording a quitclaim deed on a mortgaged property.</div></details>
</div>
</section>

<section style="margin-top:48px">
<p class="section-eyebrow">State-Specific</p>
<h2 class="section-title" style="font-size:22px;margin-bottom:4px">Quitclaim Deed by State</h2>
<p style="font-size:13px;color:var(--ink-3);margin-bottom:20px">Recording requirements, transfer taxes, and required form language vary by state.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">
${['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'].map(s=>`<a href="/${s.toLowerCase().replace(/\s+/g,'-')}-quitclaim-deed-template" style="display:block;padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-weight:500;color:var(--ink-1);text-decoration:none;transition:border-color .15s,background .15s" onmouseover="this.style.borderColor='var(--accent)';this.style.background='var(--surface-2)'" onmouseout="this.style.borderColor='var(--border)';this.style.background=''">${s}</a>`).join('')}
</div>
</section>
</div>
</main>
<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p><p class="footer-disclaimer" style="margin-top:8px">Not a law firm. Record this deed with your county recorder after notarization.</p></div><div><div class="footer-col-title">Property</div><nav class="footer-nav"><a href="/quitclaim-deed-template">Quitclaim Deed</a><a href="/bill-of-sale-template">Bill of Sale</a><a href="/lease-agreement-template">Lease Agreement</a></nav></div><div><div class="footer-col-title">Personal</div><nav class="footer-nav"><a href="/power-of-attorney-template">Power of Attorney</a><a href="/last-will-testament-template">Last Will &amp; Testament</a></nav></div></div><div class="footer-bottom"><p>© 2026 FreeDocTemplates.xyz</p></div></div></footer>
<script src="/shared/scripts.js?v=1" defer></script>
<script>
function gv(id){return(document.getElementById(id)||{}).value||'';}
function fld(v,ph){return v?'<span class="doc-field">'+v+'</span>':'<span class="doc-field empty">'+ph+'</span>';}
function render(){
  var grantor=gv('qc-grantor'),grantorAddr=gv('qc-grantor-addr');
  var grantee=gv('qc-grantee'),granteeAddr=gv('qc-grantee-addr');
  var addr=gv('qc-address'),county=gv('qc-county'),state=gv('qc-state');
  var legal=gv('qc-legal'),apn=gv('qc-apn'),consideration=gv('qc-consideration');
  var dateStr=gv('qc-date');
  var out='';
  out+='<div class="doc-title">QUITCLAIM DEED</div>';
  out+='<p style="font-size:9pt;text-align:right">Recording Requested By and Return To:<br>'
      +fld(grantee,'[Grantee Name]')+'<br>'+fld(granteeAddr,'[Grantee Address]')+'</p>';
  out+='<p class="doc-clause">THIS QUITCLAIM DEED ("Deed"), made this '
      +fld(dateStr,'____ day of _________, 2026')
      +', between '+fld(grantor,'[Grantor Name]')+', residing at '+fld(grantorAddr,'[Grantor Address]')
      +' ("Grantor"), and '+fld(grantee,'[Grantee Name]')+', residing at '+fld(granteeAddr,'[Grantee Address]')
      +' ("Grantee").</p>';
  out+='<p class="doc-clause"><span class="doc-label">WITNESSETH:</span><br>'
      +'For and in consideration of the sum of <strong>$'+fld(consideration,'[Amount]')+'</strong> '
      +'('+fld(consideration,'[Amount]')+' Dollars) and other good and valuable consideration, '
      +'the receipt and sufficiency of which is hereby acknowledged, '
      +'Grantor hereby remises, releases, and QUITCLAIMS to Grantee, all right, title, and interest '
      +'which Grantor has in and to the following described property situated in the County of '
      +fld(county,'[County]')+', State of '+fld(state,'[State]')+':</p>';
  out+='<div style="border:1px solid #ccc;padding:12px;margin:12px 0;background:#fafafa">';
  out+='<p class="doc-label">PROPERTY ADDRESS</p><p>'+fld(addr,'[Property Street Address]')+'</p>';
  out+='<p class="doc-label" style="margin-top:8px">LEGAL DESCRIPTION</p><p>'+fld(legal,'[Legal Description — Lot, Block, Subdivision, Book/Page as recorded in county records]')+'</p>';
  if(apn){out+='<p class="doc-label" style="margin-top:8px">ASSESSOR\'S PARCEL NUMBER</p><p>'+apn+'</p>';}
  out+='</div>';
  out+='<p class="doc-clause">TO HAVE AND TO HOLD the premises above described, with the appurtenances, '
      +'unto the said Grantee and their heirs and assigns forever. '
      +'Grantor, for Grantor and Grantor\'s heirs, executors, and administrators, '
      +'does hereby covenant to warrant and defend the said premises against the lawful claims and demands '
      +'of all persons claiming by, through, or under Grantor.</p>';
  out+='<div class="doc-sig-block">';
  out+='<table class="doc-sig-table"><tbody>'
      +'<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">Grantor Signature — '+fld(grantor,'[Grantor Name]')+'</span></td><td><div class="doc-sig-line"></div><span class="doc-sig-label">Date</span></td></tr>'
      +'</tbody></table>';
  out+='<p class="doc-label" style="margin-top:20px">NOTARY ACKNOWLEDGMENT</p>';
  out+='<p style="font-size:10pt">State of '+fld(state,'___________')+', County of '+fld(county,'___________')+'<br><br>'
      +'Before me, the undersigned Notary Public, personally appeared '+fld(grantor,'[Grantor Name]')
      +', personally known to me (or proved to me on the basis of satisfactory evidence) to be the person '
      +'whose name is subscribed to the within instrument, and acknowledged to me that they executed the same '
      +'in their authorized capacity, and that by their signature on the instrument, the person, or the entity '
      +'upon behalf of which the person acted, executed the instrument.</p>';
  out+='<table class="doc-sig-table" style="margin-top:10px"><tbody>'
      +'<tr><td><div class="doc-sig-line"></div><span class="doc-sig-label">Notary Public Signature</span></td><td><div class="doc-sig-line"></div><span class="doc-sig-label">Commission Expires</span></td></tr>'
      +'</tbody></table>';
  out+='<p style="font-size:9pt;margin-top:8px">[ NOTARY SEAL ]</p>';
  out+='</div>';
  document.getElementById('qc-preview').innerHTML=out;
}
render();
</script>
</body>
</html>`;

fs.writeFileSync(base+'quitclaim-deed-template.html',html);
console.log('quitclaim ok',html.length);
