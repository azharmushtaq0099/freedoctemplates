const fs = require('fs');
const p = 'C:/Users/mastr/claude co/legal-docs/bill-of-sale-template.html';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Free Bill of Sale Template 2026 | Fill In &amp; Download PDF</title>
<meta name="description" content="Free bill of sale template. Fill in online, see live preview, download as PDF. Works for vehicles, cars, motorcycles, boats, trailers, and general merchandise.">
<link rel="canonical" href="https://www.freedoctemplates.xyz/bill-of-sale-template">
<meta property="og:title" content="Free Bill of Sale Template 2026 — Fill In &amp; Download PDF">
<meta property="og:description" content="Fill in your bill of sale online. Live preview updates as you type. Download as clean PDF — no watermarks, no account.">
<meta property="og:type" content="website">
<meta name="robots" content="index,follow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap">
<link rel="stylesheet" href="/shared/styles.css?v=1">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebApplication","name":"Free Bill of Sale Template 2026","url":"https://www.freedoctemplates.xyz/bill-of-sale-template","description":"Fill in a bill of sale online and download as PDF. Works for vehicles, cars, motorcycles, boats, trailers, and general merchandise.","applicationCategory":"LegalApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is a bill of sale legally binding?","acceptedAnswer":{"@type":"Answer","text":"Yes. A bill of sale is a legally binding document that transfers ownership from seller to buyer. Both parties should sign it, and in many states a notary signature is required for motor vehicles. Keep a copy for your records."}},{"@type":"Question","name":"Do I need a bill of sale to sell a car?","acceptedAnswer":{"@type":"Answer","text":"Yes. Most states require a bill of sale when transferring vehicle title. It protects the seller by documenting the as-is sale and releases them from liability after the transfer. The buyer needs it to register the vehicle in their name."}},{"@type":"Question","name":"Does a bill of sale need to be notarized?","acceptedAnswer":{"@type":"Answer","text":"It depends on your state. States that require notarization for vehicle bills of sale include Louisiana, Maryland, Montana, Nebraska, New Hampshire, West Virginia. For general merchandise, notarization is usually optional but recommended for high-value items."}},{"@type":"Question","name":"What information should be on a bill of sale?","acceptedAnswer":{"@type":"Answer","text":"A complete bill of sale should include: full legal names and addresses of buyer and seller, date of sale, detailed description of the item (including VIN for vehicles), sale price, any warranties or as-is clause, and signatures of both parties."}}]}
</script>
</head>
<body>
<div class="cmd-overlay" id="cmd-overlay" role="dialog" aria-modal="true" aria-label="Search templates">
  <div class="cmd-modal">
    <div class="cmd-search-row">
      <span class="cmd-search-icon"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></span>
      <input class="cmd-input" id="cmd-input" type="text" placeholder="Search 15+ templates..." autocomplete="off" spellcheck="false">
      <kbd class="cmd-kbd-esc" onclick="closeCmd()">esc</kbd>
    </div>
    <div class="cmd-body" id="cmd-body"></div>
    <div class="cmd-footer">
      <span class="cmd-hint"><kbd class="cmd-key">&uarr;&darr;</kbd> navigate</span>
      <span class="cmd-hint"><kbd class="cmd-key">&#x21b5;</kbd> open</span>
      <span class="cmd-hint"><kbd class="cmd-key">esc</kbd> close</span>
    </div>
  </div>
</div>
<header class="site-header">
  <div class="header-inner">
    <a href="/" class="site-logo">FreeDoc<span>Templates</span></a>
    <nav class="main-nav" aria-label="Main">
      <div class="nav-group">
        <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Business <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button>
        <div class="nav-dropdown">
          <a href="/invoice-template" class="nav-item">Invoice Template</a>
          <a href="/independent-contractor-agreement-template" class="nav-item">Contractor Agreement</a>
          <a href="/nda-template" class="nav-item">NDA Template</a>
          <a href="/employment-contract-template" class="nav-item">Employment Contract</a>
        </div>
      </div>
      <div class="nav-group">
        <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Real Estate <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button>
        <div class="nav-dropdown">
          <a href="/lease-agreement-template" class="nav-item">Lease Agreement</a>
          <a href="/bill-of-sale-template" class="nav-item nav-item--active">Bill of Sale</a>
        </div>
      </div>
      <div class="nav-group">
        <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Personal <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button>
        <div class="nav-dropdown">
          <a href="/power-of-attorney-template" class="nav-item">Power of Attorney</a>
          <a href="/llc-operating-agreement-template" class="nav-item">LLC Agreement</a>
          <a href="/promissory-note-template" class="nav-item">Promissory Note</a>
        </div>
      </div>
    </nav>
    <div class="header-actions">
      <button class="btn-search" id="btn-search" aria-label="Search"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></button>
      <a href="/tools" class="btn-all-tools">All Templates</a>
    </div>
  </div>
</header>

<main class="page-wrap">
  <div class="container">
    <nav class="breadcrumb"><a href="/">Home</a><span>&#x203A;</span><span aria-current="page">Bill of Sale Template</span></nav>
    <h1 class="page-title" data-enter>Free Bill of Sale Template <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
    <p class="page-sub" data-enter data-delay="1">Fill in the form, see your document preview live, then download as PDF. Works for vehicles, cars, motorcycles, boats, trailers, or general merchandise.</p>
    <div class="page-badges" data-enter data-delay="2">
      <span class="page-badge"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Free, no account</span>
      <span class="page-badge"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> No watermark</span>
      <span class="page-badge"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> PDF download</span>
      <span class="page-badge"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> All 50 states</span>
    </div>

    <div class="doc-layout">
      <!-- FORM -->
      <div class="doc-form-panel" data-enter data-delay="1">
        <div class="doc-card">
          <div class="doc-card-header">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Document Type
          </div>
          <div class="doc-card-body">
            <div class="form-group">
              <label class="form-label">Type of Sale</label>
              <select id="bos-type" class="form-select">
                <option value="general">General Merchandise</option>
                <option value="vehicle">Motor Vehicle (Car/Truck/SUV)</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="boat">Boat / Watercraft</option>
                <option value="trailer">Trailer</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">State</label>
              <select id="bos-state" class="form-select">
                <option value="">Select state...</option>
                <option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option>
                <option>California</option><option>Colorado</option><option>Connecticut</option><option>Delaware</option>
                <option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option>
                <option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option>
                <option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option>
                <option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option>
                <option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option>
                <option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option>
                <option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option>
                <option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option>
                <option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option>
                <option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option>
                <option>Wisconsin</option><option>Wyoming</option>
              </select>
            </div>
          </div>
        </div>

        <div class="doc-card" style="margin-top:12px">
          <div class="doc-card-header"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Seller Information</div>
          <div class="doc-card-body">
            <div class="form-group"><label class="form-label">Full Legal Name</label><input type="text" id="bos-seller-name" class="form-input" placeholder="John A. Smith"></div>
            <div class="form-group"><label class="form-label">Address</label><input type="text" id="bos-seller-addr" class="form-input" placeholder="123 Main St, Austin, TX 78701"></div>
            <div class="form-group"><label class="form-label">Phone (optional)</label><input type="text" id="bos-seller-phone" class="form-input" placeholder="(512) 555-0100"></div>
          </div>
        </div>

        <div class="doc-card" style="margin-top:12px">
          <div class="doc-card-header"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Buyer Information</div>
          <div class="doc-card-body">
            <div class="form-group"><label class="form-label">Full Legal Name</label><input type="text" id="bos-buyer-name" class="form-input" placeholder="Jane B. Doe"></div>
            <div class="form-group"><label class="form-label">Address</label><input type="text" id="bos-buyer-addr" class="form-input" placeholder="456 Oak Ave, Dallas, TX 75201"></div>
            <div class="form-group"><label class="form-label">Phone (optional)</label><input type="text" id="bos-buyer-phone" class="form-input" placeholder="(214) 555-0200"></div>
          </div>
        </div>

        <div class="doc-card" style="margin-top:12px" id="bos-item-card">
          <div class="doc-card-header"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg> Item Details</div>
          <div class="doc-card-body" id="bos-item-fields">
            <!-- populated by JS based on type -->
          </div>
        </div>

        <div class="doc-card" style="margin-top:12px">
          <div class="doc-card-header"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> Sale Details</div>
          <div class="doc-card-body">
            <div class="form-row">
              <div class="form-group"><label class="form-label">Sale Price</label><input type="text" id="bos-price" class="form-input" placeholder="$5,000"></div>
              <div class="form-group"><label class="form-label">Date of Sale</label><input type="date" id="bos-date" class="form-input"></div>
            </div>
            <div class="form-group">
              <label class="form-label">Condition / Warranty</label>
              <select id="bos-warranty" class="form-select">
                <option value="as-is">Sold AS-IS (no warranty)</option>
                <option value="warranty">With warranty (describe below)</option>
              </select>
            </div>
            <div class="form-group" id="bos-warranty-desc-wrap" style="display:none">
              <label class="form-label">Warranty Description</label>
              <textarea id="bos-warranty-desc" class="form-textarea" placeholder="Describe warranty terms..."></textarea>
            </div>
          </div>
        </div>

        <div class="btn-group" style="margin-top:12px">
          <button class="doc-btn doc-btn--gold" onclick="window.print()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Download / Print PDF
          </button>
          <p style="font-size:11px;color:var(--ink-3);text-align:center;margin-top:4px">Use &ldquo;Save as PDF&rdquo; in the print dialog</p>
        </div>
      </div>

      <!-- PREVIEW -->
      <div class="doc-preview-panel" data-enter data-delay="2">
        <div class="preview-toolbar">
          <span class="preview-label">Live Preview</span>
          <div class="preview-actions">
            <button class="preview-btn preview-btn--primary" onclick="window.print()">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Download PDF
            </button>
          </div>
        </div>
        <div class="legal-document" id="bos-preview">
          <!-- rendered by JS -->
        </div>
      </div>
    </div>

    <!-- ARTICLE -->
    <section class="article-section">
      <div class="article-body">
        <h2>Bill of Sale — What You Need to Know (2026)</h2>
        <p>A bill of sale is a written record that documents the transfer of ownership of personal property from a seller to a buyer. It is one of the most commonly required documents for private-party vehicle sales and is legally binding in all 50 states.</p>
        <h3>When You Need a Bill of Sale</h3>
        <ul>
          <li><strong>Selling a car privately</strong> &mdash; protects the seller from future liability and gives the buyer proof of purchase for DMV registration</li>
          <li><strong>Selling a motorcycle, boat, trailer, or RV</strong> &mdash; same as above for any titled vehicle</li>
          <li><strong>High-value personal property</strong> &mdash; equipment, electronics, furniture, farm animals</li>
          <li><strong>Any transaction where you want a written record</strong></li>
        </ul>
        <h3>As-Is vs. With Warranty</h3>
        <p>Most private-party sales are &ldquo;as-is,&rdquo; meaning the buyer accepts the item in its current condition with no warranty from the seller. Always include this language explicitly. If you offer any warranty, describe the exact terms in writing.</p>
        <h3>After Signing</h3>
        <p>Both parties should keep a signed copy. For vehicle sales, the seller should also notify the DMV of the transfer (available online in most states) to remove the vehicle from their name immediately.</p>
      </div>
    </section>

    <section class="faq-section" style="margin:0 -24px;padding:48px 24px">
      <div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:24px">Bill of sale questions answered</h2></div>
      <div class="faq-list">
        <details class="faq-item"><summary class="faq-q">Does a bill of sale transfer the title to a car?</summary><div class="faq-a">No. A bill of sale documents the sale but does not itself transfer legal title. To transfer title, the seller must sign the back of the physical title certificate and give it to the buyer. The buyer then takes the signed title and bill of sale to the DMV to register the vehicle in their name.</div></details>
        <details class="faq-item"><summary class="faq-q">Can I write a bill of sale by hand?</summary><div class="faq-a">Yes. A handwritten bill of sale is legally valid as long as it contains all the necessary information: parties&apos; names and addresses, item description, sale price, date, and both signatures. However, a typed and printed document is more professional and harder to dispute.</div></details>
        <details class="faq-item"><summary class="faq-q">How many copies of a bill of sale do I need?</summary><div class="faq-a">You need at least two signed originals &mdash; one for the buyer and one for the seller. For vehicle sales in some states, you may also need a copy for the DMV. Having three copies (buyer, seller, DMV) is best practice.</div></details>
        <details class="faq-item"><summary class="faq-q">What states require a notarized bill of sale for a vehicle?</summary><div class="faq-a">States that require or strongly recommend a notarized vehicle bill of sale: Louisiana, Maryland, Montana, Nebraska, New Hampshire, and West Virginia require notarization. Most other states do not require it but it adds extra legal protection.</div></details>
      </div>
    </section>

    <section class="related-section">
      <p class="section-eyebrow">Related Templates</p>
      <h2 class="section-title" style="font-size:22px;margin-bottom:16px">You might also need</h2>
      <div class="tools-grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">
        <a href="/power-of-attorney-template" class="tool-card"><div class="tc-icon tc-gold"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div><div><div class="tool-card-title">Power of Attorney</div><div class="tool-card-desc">Authorize someone to act on your behalf.</div></div></a>
        <a href="/promissory-note-template" class="tool-card"><div class="tc-icon tc-blue"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div><div class="tool-card-title">Promissory Note</div><div class="tool-card-desc">Seller financing agreement for installment sales.</div></div></a>
        <a href="/invoice-template" class="tool-card"><div class="tc-icon tc-green"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div><div><div class="tool-card-title">Invoice Template</div><div class="tool-card-desc">Professional invoice for business sales.</div></div></a>
      </div>
    </section>
  </div>
</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p><p class="footer-disclaimer" style="margin-top:8px">Not a law firm. For informational use only.</p></div>
      <div><div class="footer-col-title">Business</div><nav class="footer-nav"><a href="/invoice-template">Invoice Template</a><a href="/independent-contractor-agreement-template">Contractor Agreement</a><a href="/nda-template">NDA</a></nav></div>
      <div><div class="footer-col-title">Property</div><nav class="footer-nav"><a href="/bill-of-sale-template">Bill of Sale</a><a href="/lease-agreement-template">Lease Agreement</a><a href="/rental-agreement-template">Rental Agreement</a></nav></div>
      <div><div class="footer-col-title">Personal</div><nav class="footer-nav"><a href="/power-of-attorney-template">Power of Attorney</a><a href="/llc-operating-agreement-template">LLC Agreement</a><a href="/promissory-note-template">Promissory Note</a></nav></div>
    </div>
    <div class="footer-bottom"><p>&copy; 2026 FreeDocTemplates.xyz</p></div>
  </div>
</footer>

<script>
(function(){
  var ITEM_FIELDS = {
    general: '<div class="form-group"><label class="form-label">Item Description</label><textarea id="bos-desc" class="form-textarea" placeholder="E.g. 2019 Apple MacBook Pro 15-inch, Space Gray, Serial No. C02X12345678"></textarea></div>',
    vehicle: '<div class="form-row"><div class="form-group"><label class="form-label">Year</label><input type="text" id="bos-year" class="form-input" placeholder="2019"></div><div class="form-group"><label class="form-label">Make</label><input type="text" id="bos-make" class="form-input" placeholder="Toyota"></div></div><div class="form-row"><div class="form-group"><label class="form-label">Model</label><input type="text" id="bos-model" class="form-input" placeholder="Camry"></div><div class="form-group"><label class="form-label">Color</label><input type="text" id="bos-color" class="form-input" placeholder="Silver"></div></div><div class="form-group"><label class="form-label">VIN</label><input type="text" id="bos-vin" class="form-input" placeholder="1HGBH41JXMN109186" maxlength="17"></div><div class="form-group"><label class="form-label">Mileage</label><input type="text" id="bos-mileage" class="form-input" placeholder="85,420"></div>',
    motorcycle: '<div class="form-row"><div class="form-group"><label class="form-label">Year</label><input type="text" id="bos-year" class="form-input" placeholder="2021"></div><div class="form-group"><label class="form-label">Make</label><input type="text" id="bos-make" class="form-input" placeholder="Harley-Davidson"></div></div><div class="form-row"><div class="form-group"><label class="form-label">Model</label><input type="text" id="bos-model" class="form-input" placeholder="Sportster 883"></div><div class="form-group"><label class="form-label">Color</label><input type="text" id="bos-color" class="form-input" placeholder="Black"></div></div><div class="form-group"><label class="form-label">VIN</label><input type="text" id="bos-vin" class="form-input" placeholder="1HD1BX3117Y012345"></div><div class="form-group"><label class="form-label">Mileage</label><input type="text" id="bos-mileage" class="form-input" placeholder="12,500"></div>',
    boat: '<div class="form-row"><div class="form-group"><label class="form-label">Year</label><input type="text" id="bos-year" class="form-input" placeholder="2018"></div><div class="form-group"><label class="form-label">Make</label><input type="text" id="bos-make" class="form-input" placeholder="Ranger"></div></div><div class="form-row"><div class="form-group"><label class="form-label">Model</label><input type="text" id="bos-model" class="form-input" placeholder="Z520C"></div><div class="form-group"><label class="form-label">Length</label><input type="text" id="bos-length" class="form-input" placeholder="21 ft"></div></div><div class="form-group"><label class="form-label">Hull ID (HIN)</label><input type="text" id="bos-vin" class="form-input" placeholder="ABC12345D678"></div>',
    trailer: '<div class="form-row"><div class="form-group"><label class="form-label">Year</label><input type="text" id="bos-year" class="form-input" placeholder="2020"></div><div class="form-group"><label class="form-label">Make</label><input type="text" id="bos-make" class="form-input" placeholder="Big Tex"></div></div><div class="form-row"><div class="form-group"><label class="form-label">Model</label><input type="text" id="bos-model" class="form-input" placeholder="70PI-20"></div><div class="form-group"><label class="form-label">Type</label><input type="text" id="bos-type-detail" class="form-input" placeholder="Flatbed"></div></div><div class="form-group"><label class="form-label">VIN</label><input type="text" id="bos-vin" class="form-input" placeholder="5PVBF2028LN123456"></div>'
  };

  function gv(id){ var el=document.getElementById(id); return el?(el.value||'').trim():''; }
  function field(val, placeholder){ return val ? '<span class="doc-field">'+val+'</span>' : '<span class="doc-field empty">'+placeholder+'</span>'; }

  function getItemDesc() {
    var type = gv('bos-type');
    if (type === 'general') return (gv('bos-desc')||'[Item Description]');
    var yr = gv('bos-year'), mk = gv('bos-make'), mo = gv('bos-model'), cl = gv('bos-color'), vin = gv('bos-vin'), mi = gv('bos-mileage');
    var parts = [];
    if (yr) parts.push(yr); if (mk) parts.push(mk); if (mo) parts.push(mo); if (cl) parts.push('('+cl+')');
    var desc = parts.length ? parts.join(' ') : '[Year Make Model]';
    if (type === 'vehicle' || type === 'motorcycle') {
      desc += vin ? ', VIN: '+vin : ', VIN: [__________]';
      if (mi) desc += ', Odometer: '+mi+' miles';
    } else if (type === 'boat') {
      desc += vin ? ', HIN: '+vin : ', HIN: [__________]';
    } else if (type === 'trailer') {
      desc += vin ? ', VIN: '+vin : ', VIN: [__________]';
    }
    return desc;
  }

  function getTitleLabel() {
    var t = gv('bos-type');
    if (t==='vehicle') return 'MOTOR VEHICLE BILL OF SALE';
    if (t==='motorcycle') return 'MOTORCYCLE BILL OF SALE';
    if (t==='boat') return 'BOAT BILL OF SALE';
    if (t==='trailer') return 'TRAILER BILL OF SALE';
    return 'BILL OF SALE';
  }

  function getNotaryNote() {
    var s = gv('bos-state');
    var requireStates = ['Louisiana','Maryland','Montana','Nebraska','New Hampshire','West Virginia'];
    if (requireStates.includes(s)) return '<p style="font-size:11px;color:#555;font-style:italic;margin-top:8px">Note: '+s+' requires notarization for vehicle bill of sale documents.</p>';
    return '';
  }

  function render() {
    var sName  = gv('bos-seller-name') || '[Seller Full Name]';
    var sAddr  = gv('bos-seller-addr') || '[Seller Address]';
    var bName  = gv('bos-buyer-name')  || '[Buyer Full Name]';
    var bAddr  = gv('bos-buyer-addr')  || '[Buyer Address]';
    var price  = gv('bos-price')       || '[Sale Price]';
    var date   = gv('bos-date') ? new Date(gv('bos-date')+'T12:00:00').toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) : '[Date of Sale]';
    var state  = gv('bos-state') || '[State]';
    var itemDesc = getItemDesc();
    var warranty = gv('bos-warranty');
    var warDesc  = gv('bos-warranty-desc');
    var warText  = warranty === 'as-is'
      ? 'The above-described property is sold <strong>AS-IS</strong>, with no warranties, expressed or implied.'
      : 'Seller warrants: ' + (warDesc || '[Warranty terms]');

    document.getElementById('bos-preview').innerHTML =
      '<div class="doc-title">'+getTitleLabel()+'</div>'
      + '<div class="doc-subtitle">State of '+state+'</div>'
      + '<div class="doc-clause"><p>This Bill of Sale is made and entered into on '+field(gv('bos-date')?date:'',(date))+', by and between:</p></div>'
      + '<div class="doc-section"><div class="doc-section-title">Seller</div>'
      + '<p><strong>Name:</strong> '+field(gv('bos-seller-name'),sName)+'<br>'
      + '<strong>Address:</strong> '+field(gv('bos-seller-addr'),sAddr)+'</p></div>'
      + '<div class="doc-section"><div class="doc-section-title">Buyer</div>'
      + '<p><strong>Name:</strong> '+field(gv('bos-buyer-name'),bName)+'<br>'
      + '<strong>Address:</strong> '+field(gv('bos-buyer-addr'),bAddr)+'</p></div>'
      + '<div class="doc-divider"></div>'
      + '<div class="doc-section"><div class="doc-section-title">Property Being Sold</div>'
      + '<p>'+itemDesc+'</p></div>'
      + '<div class="doc-section"><div class="doc-section-title">Sale Terms</div>'
      + '<p>In consideration of the sum of '+field(gv('bos-price'),price)+', paid in full, the Seller hereby transfers all right, title, and interest in the above-described property to the Buyer.</p>'
      + '<p>'+warText+'</p></div>'
      + '<p>The Seller certifies that they are the legal owner of the property and have the right to sell it, free and clear of all liens and encumbrances, except as noted above.</p>'
      + getNotaryNote()
      + '<div class="doc-sig-row">'
      + '<div class="doc-sig-block"><div style="height:40px"></div><div><strong>Seller Signature</strong></div><div class="doc-sig-label">'+sName+'</div><div class="doc-sig-label">Date: ________</div></div>'
      + '<div class="doc-sig-block"><div style="height:40px"></div><div><strong>Buyer Signature</strong></div><div class="doc-sig-label">'+bName+'</div><div class="doc-sig-label">Date: ________</div></div>'
      + '</div>';
  }

  function setItemFields() {
    var type = gv('bos-type');
    document.getElementById('bos-item-fields').innerHTML = ITEM_FIELDS[type] || ITEM_FIELDS.general;
    document.getElementById('bos-item-fields').querySelectorAll('input,textarea').forEach(function(el){
      el.addEventListener('input', render);
    });
    render();
  }

  document.getElementById('bos-type').addEventListener('change', setItemFields);
  document.getElementById('bos-warranty').addEventListener('change', function(){
    var wrap = document.getElementById('bos-warranty-desc-wrap');
    wrap.style.display = this.value === 'warranty' ? '' : 'none';
    render();
  });

  document.querySelectorAll('#bos-seller-name,#bos-seller-addr,#bos-seller-phone,#bos-buyer-name,#bos-buyer-addr,#bos-buyer-phone,#bos-price,#bos-date,#bos-state,#bos-warranty-desc').forEach(function(el){
    el.addEventListener('input', render);
    el.addEventListener('change', render);
  });

  // set today as default date
  var today = new Date().toISOString().split('T')[0];
  document.getElementById('bos-date').value = today;

  setItemFields();
})();
</script>
<script src="/shared/scripts.js?v=1" defer></script>
</body>
</html>`;

fs.writeFileSync(p, html);
console.log('bill of sale ok', fs.statSync(p).size);
