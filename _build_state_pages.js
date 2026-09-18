const fs = require('fs');

// ─── LEASE DATA — ALL 50 STATES ───────────────────────────────────────────────
const LEASE_DATA = {
  'Alabama':        { depositLimit:'1 month rent',                                          noticeToEnter:'2 days',   depositReturn:'35 days', rentControl:false, tip:'Alabama law (Title 35) is generally landlord-friendly. Landlords must return deposits within 35 days of move-out with itemized deductions. No statewide rent control.' },
  'Alaska':         { depositLimit:'2 months rent (no limit for month-to-month)',           noticeToEnter:'24 hours', depositReturn:'14 days (30 days if disputed)', rentControl:false, tip:'Alaska requires deposit return within 14 days with itemized deductions. Landlords must provide a written move-in/move-out checklist. 24-hour entry notice is required.' },
  'Arizona':        { depositLimit:'1.5 months rent',                                       noticeToEnter:'2 days',   depositReturn:'14 days', rentControl:false, tip:'Arizona has a strong landlord-friendly environment with no rent control statewide. The 2-day notice to enter is one of the shortest in the country.' },
  'Arkansas':       { depositLimit:'2 months rent',                                         noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'60 days', rentControl:false, tip:'Arkansas has one of the longer deposit return timelines at 60 days. Arkansas is considered very landlord-friendly — there is no implied warranty of habitability statute.' },
  'California':     { depositLimit:'2 months rent (unfurnished), 3 months (furnished)',     noticeToEnter:'24 hours', depositReturn:'21 days', rentControl:true,  tip:'California AB 1482 caps annual rent increases at 5% + CPI for qualifying properties. Requires just-cause for eviction after 12 months. One of the most tenant-protective states.' },
  'Colorado':       { depositLimit:'No statutory limit',                                    noticeToEnter:'24 hours', depositReturn:'30 days (60 if disputed)', rentControl:false, tip:'Colorado passed sweeping tenant protections in 2024 including 90-day notice before non-renewal and late fees capped at the greater of $50 or 5% of monthly rent.' },
  'Connecticut':    { depositLimit:'2 months rent (age 62+: 1 month)',                      noticeToEnter:'Reasonable notice', depositReturn:'30 days', rentControl:false, tip:'Connecticut limits deposits to 1 month rent for tenants age 62 or older. Must pay 4.5% annual interest on security deposits held for more than 1 year.' },
  'Delaware':       { depositLimit:'1 month rent (after 12 months)',                        noticeToEnter:'2 days',   depositReturn:'20 days', rentControl:false, tip:'Delaware requires deposits to be reduced to 1 month rent after 12 months of tenancy. Deposits must be held in a separate escrow account. Written move-in inspection required.' },
  'Florida':        { depositLimit:'No statutory limit',                                    noticeToEnter:'12 hours', depositReturn:'15 days (claim) or 60 days (no claim)', rentControl:false, tip:'Florida requires written notice of security deposit handling method. Must use surety bond or separate account. 3-day notice for non-payment, 7-day for violations.' },
  'Georgia':        { depositLimit:'No statutory limit',                                    noticeToEnter:'No statute', depositReturn:'30 days', rentControl:false, tip:'Georgia landlords must provide a written statement of damages deducted within 30 days. Failure forfeits the right to make deductions. Atlanta has no additional local tenant protections.' },
  'Hawaii':         { depositLimit:'1 month rent',                                          noticeToEnter:'2 days',   depositReturn:'14 days', rentControl:false, tip:'Hawaii limits deposits to 1 month rent and requires return within 14 days. Written itemized deductions required. Honolulu has additional landlord-tenant rules for short-term rentals.' },
  'Idaho':          { depositLimit:'No statutory limit',                                    noticeToEnter:'24 hours', depositReturn:'21 days', rentControl:false, tip:'Idaho is a landlord-friendly state with no rent control. Security deposits must be returned within 21 days of move-out. No requirement for a separate account for deposits.' },
  'Illinois':       { depositLimit:'No statutory limit (Chicago: 1.5x monthly rent)',       noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'30 days', rentControl:false, tip:'Chicago has the RLTO with strict tenant protections. Landlords in Chicago must pay interest on deposits. Verify local ordinances — Cook County also has its own rules.' },
  'Indiana':        { depositLimit:'No statutory limit',                                    noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'45 days', rentControl:false, tip:'Indiana gives landlords 45 days to return deposits. No rent control statewide. Landlords must provide itemized deductions within 45 days or forfeit the right to withhold.' },
  'Iowa':           { depositLimit:'2 months rent',                                         noticeToEnter:'24 hours', depositReturn:'30 days', rentControl:false, tip:'Iowa caps deposits at 2 months rent. Landlords must return within 30 days with itemized statement. Iowa Uniform Residential Landlord and Tenant Act applies to most rentals.' },
  'Kansas':         { depositLimit:'1 month rent (unfurnished); 1.5 months (furnished)',    noticeToEnter:'Reasonable notice', depositReturn:'30 days', rentControl:false, tip:'Kansas caps deposits at 1 month for unfurnished units. Must return within 30 days of termination of tenancy. Landlord must provide written inventory at move-in upon tenant request.' },
  'Kentucky':       { depositLimit:'No statutory limit',                                    noticeToEnter:'2 days',   depositReturn:'30 days (60 if disputed)', rentControl:false, tip:'Kentucky requires 2-day entry notice. Deposits must be returned within 30 days with itemized deductions, or 60 days if disputed. No statewide rent control.' },
  'Louisiana':      { depositLimit:'No statutory limit',                                    noticeToEnter:'No statute', depositReturn:'30 days', rentControl:false, tip:'Louisiana requires return of deposit within 30 days with itemized deductions. Louisiana has unique civil law heritage — lease agreements may have different default rules than common law states.' },
  'Maine':          { depositLimit:'2 months rent',                                         noticeToEnter:'24 hours', depositReturn:'21 days', rentControl:false, tip:'Maine has the Maine Residential Landlord and Tenant Act. Portland has rent control for stabilized units. 24-hour entry notice required. Security deposit return within 21 days.' },
  'Maryland':       { depositLimit:'2 months rent',                                         noticeToEnter:'Reasonable notice', depositReturn:'45 days', rentControl:false, tip:'Maryland caps deposits at 2 months rent and requires 1.5% annual interest after 6 months. Baltimore City has additional tenant protections. Return deposit within 45 days.' },
  'Massachusetts':  { depositLimit:'1 month rent',                                          noticeToEnter:'Reasonable notice', depositReturn:'30 days', rentControl:true,  tip:'Massachusetts caps deposits at 1 month rent and requires 5% annual interest or current bank rate. Boston and several cities have rent control ordinances. Tenant-protective state.' },
  'Michigan':       { depositLimit:'1.5 months rent',                                       noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'30 days', rentControl:false, tip:'Michigan has the Security Deposit Act requiring landlords to send a damage checklist within 7 days of move-in and itemized deductions within 30 days of move-out.' },
  'Minnesota':      { depositLimit:'No statutory limit',                                    noticeToEnter:'Reasonable notice', depositReturn:'21 days', rentControl:true,  tip:'Saint Paul enacted rent control in 2021 (3% cap). Minneapolis has no rent control after 2023 repeal. Must return deposit in 21 days. Interest on deposits is not required.' },
  'Mississippi':    { depositLimit:'No statutory limit',                                    noticeToEnter:'No statute', depositReturn:'45 days', rentControl:false, tip:'Mississippi is one of the most landlord-friendly states. Very few state-level tenant protections. Deposits must be returned within 45 days with itemized deductions.' },
  'Missouri':       { depositLimit:'2 months rent',                                         noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'30 days', rentControl:false, tip:'Missouri caps deposits at 2 months rent. Return within 30 days of move-out with itemized statement. Landlords must disclose the name and address of the bank holding the deposit.' },
  'Montana':        { depositLimit:'No statutory limit',                                    noticeToEnter:'24 hours', depositReturn:'10 days (no damage) or 30 days', rentControl:false, tip:'Montana has one of the shortest deposit return timelines — 10 days if no deductions, 30 days with deductions. 24-hour entry notice. No statewide rent control.' },
  'Nebraska':       { depositLimit:'1.25 months rent',                                      noticeToEnter:'1 day',    depositReturn:'14 days', rentControl:false, tip:'Nebraska caps deposits at 1.25 months rent and requires return within 14 days. Nebraska requires only 1-day entry notice — one of the shortest notice requirements in the US.' },
  'Nevada':         { depositLimit:'3 months rent',                                         noticeToEnter:'24 hours', depositReturn:'30 days', rentControl:false, tip:'Nevada caps deposits at 3 months rent. Las Vegas and Clark County have no rent control. Must return within 30 days with itemized deductions.' },
  'New Hampshire':  { depositLimit:'1 month rent or $100 (whichever is greater)',           noticeToEnter:'Adequate notice', depositReturn:'30 days', rentControl:false, tip:'New Hampshire caps deposits at 1 month rent or $100. Must pay interest on deposits. 30-day return deadline with written itemization. No statewide rent control.' },
  'New Jersey':     { depositLimit:'1.5 months rent',                                       noticeToEnter:'Reasonable notice', depositReturn:'30 days (5 days after fire/flood)', rentControl:true,  tip:'New Jersey has extensive local rent control — over 100 municipalities including Newark and Jersey City. Landlords must pay annual interest on security deposits (currently ~3.5%).' },
  'New Mexico':     { depositLimit:'1 month rent (up to 1 year lease); no limit for longer',noticeToEnter:'24 hours', depositReturn:'30 days', rentControl:false, tip:'New Mexico caps deposits at 1 month rent for leases of 1 year or less. Santa Fe has rent control. 24-hour entry notice required. Return deposit within 30 days.' },
  'New York':       { depositLimit:'1 month rent (since HSTPA 2019)',                       noticeToEnter:'Reasonable notice', depositReturn:'14 days', rentControl:true,  tip:'NYC and many municipalities have rent stabilization. The HSTPA (2019) capped deposits at 1 month and introduced sweeping tenant protections. One of the most regulated markets in the US.' },
  'North Carolina': { depositLimit:'2 months rent (month-to-month: 1.5 months)',            noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'30 days', rentControl:false, tip:'North Carolina caps deposits at 2 months for fixed leases. Deposits must be held in a trust account or bonded. Written notice of where deposit is held required.' },
  'North Dakota':   { depositLimit:'1 month rent (no pets); 2 months (with pets)',          noticeToEnter:'Reasonable notice', depositReturn:'30 days', rentControl:false, tip:'North Dakota allows an additional month deposit if pets are permitted. Return within 30 days with itemized statement. No statewide rent control.' },
  'Ohio':           { depositLimit:'No statutory limit',                                    noticeToEnter:'24 hours', depositReturn:'30 days', rentControl:false, tip:'Ohio landlords must hold deposits in a separate account and pay 5% annual interest on deposits held over 6 months on leases over 6 months. 24-hour entry notice required.' },
  'Oklahoma':       { depositLimit:'No statutory limit',                                    noticeToEnter:'1 day',    depositReturn:'30 days', rentControl:false, tip:'Oklahoma requires only 1-day entry notice. Return deposit within 30 days with itemized deductions. Oklahoma is generally a landlord-friendly state with limited tenant protections.' },
  'Oregon':         { depositLimit:'No statutory limit',                                    noticeToEnter:'24 hours', depositReturn:'31 days', rentControl:true,  tip:'Oregon passed statewide rent control in 2019 — the first state to do so — capping increases at 7% + CPI. Requires just-cause eviction after 12 months in most units.' },
  'Pennsylvania':   { depositLimit:'2 months rent (first year); 1 month thereafter',        noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'30 days', rentControl:false, tip:'After year one, Pennsylvania landlords must reduce the security deposit to 1 month. Deposits exceeding $100 must earn bank interest if held more than 2 years.' },
  'Rhode Island':   { depositLimit:'1 month rent',                                          noticeToEnter:'2 days',   depositReturn:'20 days', rentControl:false, tip:'Rhode Island caps deposits at 1 month rent and requires return within 20 days. 2-day entry notice required. Providence has some additional local ordinances.' },
  'South Carolina': { depositLimit:'No statutory limit',                                    noticeToEnter:'24 hours', depositReturn:'30 days', rentControl:false, tip:'South Carolina is a landlord-friendly state. Deposits must be returned within 30 days with itemized deductions. No statewide rent control. 24-hour entry notice required.' },
  'South Dakota':   { depositLimit:'1 month rent (no pets); 2 months (with pets)',          noticeToEnter:'Reasonable notice', depositReturn:'2 weeks', rentControl:false, tip:'South Dakota allows up to 2 months deposit if pets are allowed. Return within 2 weeks (14 days) of move-out. No statewide rent control.' },
  'Tennessee':      { depositLimit:'No statutory limit',                                    noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'30 days', rentControl:false, tip:'Tennessee does not require a specific notice period to enter. Deposits must be returned within 30 days. Tennessee is generally landlord-friendly with limited tenant protections.' },
  'Texas':          { depositLimit:'No statutory limit',                                    noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'30 days', rentControl:false, tip:'Texas is landlord-friendly with no statewide rent control. Landlords must repair conditions materially affecting health/safety within a reasonable time after written notice.' },
  'Utah':           { depositLimit:'No statutory limit',                                    noticeToEnter:'24 hours', depositReturn:'30 days', rentControl:false, tip:'Utah deposits must be returned within 30 days. If deductions are made, landlord must provide written accounting. No statewide rent control. 24-hour entry notice required.' },
  'Vermont':        { depositLimit:'No statutory limit',                                    noticeToEnter:'48 hours', depositReturn:'14 days', rentControl:false, tip:'Vermont requires 48-hour entry notice — one of the longer notice periods. Must return deposit within 14 days with itemized deductions. No statewide rent control.' },
  'Virginia':       { depositLimit:'2 months rent',                                         noticeToEnter:'24 hours', depositReturn:'45 days', rentControl:false, tip:'Virginia Residential Landlord and Tenant Act governs most rentals. Landlords must provide move-in inspection report. Security deposits earn interest at the federal funds rate.' },
  'Washington':     { depositLimit:'No statutory limit',                                    noticeToEnter:'2 days',   depositReturn:'21 days', rentControl:false, tip:'Washington requires itemized deposit accounting within 21 days. Seattle and other cities have just-cause eviction requirements and move-in fee limitations.' },
  'West Virginia':  { depositLimit:'No statutory limit',                                    noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'65 days', rentControl:false, tip:'West Virginia has one of the longest deposit return timelines at 65 days. Very landlord-friendly state with limited tenant protections at the state level.' },
  'Wisconsin':      { depositLimit:'No statutory limit',                                    noticeToEnter:'12 hours', depositReturn:'21 days', rentControl:false, tip:'Wisconsin requires 12-hour entry notice. Must return deposit within 21 days with itemized statement. Madison has additional tenant protections including non-renewal notice requirements.' },
  'Wyoming':        { depositLimit:'No statutory limit',                                    noticeToEnter:'No statute (recommend 24 hrs)', depositReturn:'30 days', rentControl:false, tip:'Wyoming is one of the most landlord-friendly states with very limited tenant protections at the state level. No statewide rent control, no required entry notice period.' },
};

// ─── BILL OF SALE DATA — ALL 50 STATES ───────────────────────────────────────
const BOS_DATA = {
  'Alabama':     { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$15–23',  tip:'Alabama title transfers must be completed within 20 days. No sales tax exemption for private sales — sales tax (2%) is paid at the DMV.' },
  'Alaska':      { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$15',     tip:'Alaska has no state sales tax on vehicle sales. Title transfer must be completed within 30 days. Remote areas may have different processing requirements.' },
  'Arizona':     { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$4',      tip:'Arizona has one of the lowest title fees. Emissions testing required in Maricopa and Pima counties. No sales tax on private party vehicle sales in Arizona.' },
  'Arkansas':    { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$10',     tip:'Arkansas title transfer must be done within 30 days. A 6.5% state sales tax applies to private vehicle sales paid at the revenue office.' },
  'California':  { notary:'Not required but recommended',odom:'Required for vehicles under 10 years', titlingFee:'$15',    tip:'California requires a smog check for most vehicle sales over 4 years old. The seller provides smog certification. Form REG 262 (Release of Liability) should be filed within 5 days.' },
  'Colorado':    { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$7.20',   tip:'Colorado title transfers within 60 days. Specific ownership tax (SOT) is paid at transfer. Emissions testing required in Denver metro and certain Front Range counties.' },
  'Connecticut': { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$25',     tip:'Connecticut title transfers within 60 days. A H-13B (bill of sale) form is commonly used. 6.35% sales tax on private party vehicle sales is paid at the DMV.' },
  'Delaware':    { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$40',     tip:'Delaware has no sales tax — making it a popular state for vehicle purchases. Title transfer must be completed within 30 days at the DMV.' },
  'Florida':     { notary:'Required',                   odom:'Required for vehicles under 10 years', titlingFee:'$75.25',  tip:'Florida requires notarization of the Bill of Sale AND the title signature. Bring government ID to the notary. Title transfer must be done within 30 days to avoid penalty fees.' },
  'Georgia':     { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$18',     tip:'Georgia requires Form T-7 for tag/title transfer. Emissions inspection required in Atlanta metro counties. Title transfer within 30 days. 7% sales tax on vehicle sales.' },
  'Hawaii':      { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$5',      tip:'Hawaii title transfers within 30 days. Safety check (inspection) required for all registered vehicles. 4% general excise tax on vehicle sales.' },
  'Idaho':       { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$14',     tip:'Idaho title transfers within 30 days. No emissions testing required statewide. 6% sales tax on vehicle sales paid at the county DMV.' },
  'Illinois':    { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$155',    tip:'Illinois has one of the highest title transfer fees. Private party sales require a Bill of Sale and odometer disclosure. Chicago adds a city sticker requirement.' },
  'Indiana':     { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$15',     tip:'Indiana title transfers within 45 days. State Form 44237 is the standard Bill of Sale. 7% sales tax on vehicle sales paid at the BMV.' },
  'Iowa':        { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$25',     tip:'Iowa title transfers within 30 days. An Iowa Bill of Sale (Form 411047) is available from the DOT. 5% one-time registration fee in lieu of sales tax.' },
  'Kansas':      { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$10',     tip:'Kansas title transfers within 30 days. TR-12 is the standard Bill of Sale form. 6.3% sales tax on vehicle sales (varies by county due to local taxes).' },
  'Kentucky':    { notary:'Required',                   odom:'Required for vehicles under 10 years', titlingFee:'$9',      tip:'Kentucky requires the seller to sign the title transfer section in front of a notary. Title must be transferred within 15 days. 6% usage tax on vehicle sales.' },
  'Louisiana':   { notary:'Required',                   odom:'Required for vehicles under 10 years', titlingFee:'$68.50',  tip:'Louisiana requires notarization of vehicle sales. Must complete Louisiana DPSMV 1799 form. Title transfer within 40 days. 4.45% state sales tax applies.' },
  'Maine':       { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$33',     tip:'Maine title transfers within 30 days. Emissions testing required in some southern Maine counties. 5.5% sales tax on vehicle sales paid at the BMV.' },
  'Maryland':    { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$100',    tip:'Maryland has a high title fee ($100). Must complete Form VR-181 (Bill of Sale). 6% excise tax on vehicle sales. MVA Form VR-217 is required for private sales.' },
  'Massachusetts':{ notary:'Not required',              odom:'Required for vehicles under 10 years', titlingFee:'$75',     tip:'Massachusetts requires Form RMV-1 for registration. 6.25% sales tax on vehicle sales. Title transfer within 10 days. Inspection sticker required within 7 days of purchase.' },
  'Michigan':    { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$15',     tip:'Michigan sellers remove license plates — they do not transfer with the vehicle. Title transfer within 15 days. 6% use tax on vehicle sales paid at the SOS office.' },
  'Minnesota':   { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$8.25',   tip:'Minnesota requires PS2000 (Transfer of Title) to accompany vehicle sales. 6.5% sales tax. Sellers must notify DVS of the sale within 10 days.' },
  'Mississippi': { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$9',      tip:'Mississippi title transfers within 30 days. 5% sales tax on vehicle sales. DPS Form 78-007 can be used as a Bill of Sale. Very straightforward process.' },
  'Missouri':    { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$11',     tip:'Missouri requires Form 1957 (Bill of Sale) for title transfer. 4.225% state sales tax plus local taxes. Title transfer within 30 days of purchase.' },
  'Montana':     { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$10.30',  tip:'Montana has no sales tax on vehicle sales — popular for out-of-state LLC vehicle registrations. Title transfer within 20 days. Very straightforward process.' },
  'Nebraska':    { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$10',     tip:'Nebraska title transfers within 30 days. Form 67-NF (Certificate of Title for Vehicle) used for transfers. 5.5% sales tax on vehicle sales paid at the county treasurer.' },
  'Nevada':      { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$29.25',  tip:'Nevada title transfers within 30 days. Smog check required in Clark and Washoe counties. 6.85% sales tax on vehicle sales paid at the DMV.' },
  'New Hampshire':{ notary:'Not required',              odom:'Required for vehicles under 10 years', titlingFee:'$25',     tip:'New Hampshire has no sales tax on vehicle sales. Title transfer within 20 days. NHDOT Form TDMV 19A is used for transfers. Very straightforward process.' },
  'New Jersey':  { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$60',     tip:'New Jersey requires Form OS/SS-7 (Odometer Disclosure Statement) for private sales. 6.625% sales tax on vehicle sales. Title transfer within 10 days.' },
  'New Mexico':  { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$5',      tip:'New Mexico has one of the lowest title fees. MVD Form 10009 used for title transfer. 4% gross receipts tax on vehicle sales. Title transfer within 30 days.' },
  'New York':    { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$50',     tip:'New York requires Form MV-912 (Statement of Transaction) for sales tax purposes. Submit to DMV within 10 days. 4% state sales tax plus local taxes on vehicle sales.' },
  'North Carolina':{ notary:'Not required',             odom:'Required for vehicles under 10 years', titlingFee:'$56',     tip:'North Carolina requires NCDMV Form MVR-1 for title transfer. 3% highway use tax (capped at $250) on vehicle sales. Title transfer within 28 days.' },
  'North Dakota':{ notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$5',      tip:'North Dakota has very low fees. Title transfer within 30 days. Form SFN 2872 used for odometer disclosure. 5% sales tax on vehicle sales.' },
  'Ohio':        { notary:'Required',                   odom:'Required for vehicles under 10 years', titlingFee:'$15',     tip:'Ohio requires the seller\'s signature on the title to be notarized. Complete form BMV 3771 for odometer disclosure. Title must be transferred within 30 days.' },
  'Oklahoma':    { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$11',     tip:'Oklahoma title transfers within 30 days. Oklahoma Bill of Sale (OTC Form 722) available from the Tax Commission. 3.25% excise tax on vehicle sales.' },
  'Oregon':      { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$77',     tip:'Oregon has no sales tax on vehicle sales. Title transfer within 30 days. Emissions testing required in Portland metro area. Oregon DMV Form 735-6293 used.' },
  'Pennsylvania':{ notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$58',     tip:'Pennsylvania requires Form MV-4ST (Vehicle Sales and Use Tax Return) at title transfer. 6% state sales tax on vehicle sales. Title transfer within 20 days.' },
  'Rhode Island':{ notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$52.50',  tip:'Rhode Island title transfers within 30 days. Form TR-1 used for transfers. 7% sales tax on vehicle sales. Emissions testing required annually.' },
  'South Carolina':{ notary:'Not required',             odom:'Required for vehicles under 10 years', titlingFee:'$15',     tip:'South Carolina has a maximum sales tax of $500 on vehicle sales (6% rate capped). Title transfer within 45 days. SCDMV Form 400 used for Bill of Sale.' },
  'South Dakota':{ notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$10',     tip:'South Dakota has no limit on security deposits for rentals. Title transfer within 45 days. No emissions requirements. 4% excise tax on vehicle purchases.' },
  'Tennessee':   { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$13.25',  tip:'Tennessee title transfers within 30 days. Form RV-F1301201 (Application for Title) required. 7% sales tax on vehicle sales. Emissions testing in some counties.' },
  'Texas':       { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$28–33',  tip:'Texas requires Form VTR-346 (Odometer Disclosure) for vehicles under 10 years old. 6.25% sales tax on vehicle sales. Title transfer within 30 days at the county tax office.' },
  'Utah':        { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$6',      tip:'Utah title transfers within 30 days. Form TC-843 (Bill of Sale) available from the DMV. 6.85% combined sales tax on vehicle sales. Emissions testing in some counties.' },
  'Vermont':     { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$35',     tip:'Vermont title transfers within 30 days. Form VD-119 used for Bill of Sale. 6% purchase and use tax on vehicle sales. No emissions testing required statewide.' },
  'Virginia':    { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$15',     tip:'Virginia requires Form VSA-14B for title transfer. 4.15% sales tax on vehicle sales. Title transfer within 30 days. Emissions testing required in Northern Virginia.' },
  'Washington':  { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$15',     tip:'Washington title transfers within 15 days. 10.4% combined sales tax (state + local) on vehicle sales — one of the highest in the US. Emissions testing in Puget Sound region.' },
  'West Virginia':{ notary:'Not required',              odom:'Required for vehicles under 10 years', titlingFee:'$15',     tip:'West Virginia title transfers within 30 days. Form DMV-1-TR (Application for Certificate of Title) required. 6% sales tax on vehicle sales.' },
  'Wisconsin':   { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$69.50',  tip:'Wisconsin has a relatively high title fee. TR-1 form (Title/License Plate Application) required. 5% sales tax on vehicle sales. Transfers within 10 days.' },
  'Wyoming':     { notary:'Not required',               odom:'Required for vehicles under 10 years', titlingFee:'$15',     tip:'Wyoming has no sales tax on vehicle sales (only a 4% use tax for dealers). Title transfers within 30 days at the county clerk. One of the most straightforward states for vehicle sales.' },
};

// ─── POA DATA — ALL 50 STATES ─────────────────────────────────────────────────
const POA_DATA = {
  'Alabama':     { witnesses:'No witnesses required',          notary:'Required',             tip:'Alabama POA is governed by the Alabama Uniform Power of Attorney Act (2012). Notarization is required. Third parties must accept a properly executed POA within a reasonable time.' },
  'Alaska':      { witnesses:'No witnesses required',          notary:'Required',             tip:'Alaska POA under AS 13.26. Notarization required. A durable POA must contain the specific statutory durability language. POA is presumed to be durable in Alaska unless stated otherwise.' },
  'Arizona':     { witnesses:'No witnesses required',          notary:'Required',             tip:'Arizona adopted the Uniform Power of Attorney Act (A.R.S. Title 14, Chapter 12). Notarization required. Agents are required to keep records of actions taken under the POA.' },
  'Arkansas':    { witnesses:'No witnesses required',          notary:'Required',             tip:'Arkansas POA must be signed before a notary. For real estate transactions, must also be recorded with the county circuit clerk. Durable POA must include specific durability language.' },
  'California':  { witnesses:'2 witnesses OR notarization',    notary:'Required (or 2 witnesses)', tip:'California POA is governed by Probate Code 4000–4465. Healthcare POA (AHCD) requires either 2 witnesses or notarization, with specific witness restrictions (not care providers or heirs).' },
  'Colorado':    { witnesses:'No witnesses required',          notary:'Required',             tip:'Colorado adopted the Uniform Power of Attorney Act in 2010. Notarization required. Agent must sign an "acknowledgment of agent\'s duties" before exercising authority for many matters.' },
  'Connecticut': { witnesses:'2 witnesses required',           notary:'Required',             tip:'Connecticut requires 2 witnesses in addition to notarization. The witnesses must sign a declaration that the principal appeared competent. Healthcare POA has separate requirements.' },
  'Delaware':    { witnesses:'No witnesses required',          notary:'Required',             tip:'Delaware POA under Title 12, Chapter 49A. Notarization required. Delaware is popular for business entity POAs due to its favorable corporate law environment.' },
  'Florida':     { witnesses:'2 witnesses required',           notary:'Required',             tip:'Florida requires 2 subscribing witnesses AND a notary. Florida law changed significantly in 2011. POAs signed without proper witnesses before 2011 may be valid only for some purposes.' },
  'Georgia':     { witnesses:'1 witness required',             notary:'Required',             tip:'Georgia POA requires 1 witness (not the agent) and notarization under O.C.G.A. Section 10-6B-1. The Georgia Uniform Power of Attorney Act took effect July 2018.' },
  'Hawaii':      { witnesses:'No witnesses required',          notary:'Required',             tip:'Hawaii POA under HRS Chapter 551E. Notarization required. Hawaii adopted the Uniform Power of Attorney Act. Financial institutions must accept a valid POA within a reasonable time.' },
  'Idaho':       { witnesses:'No witnesses required',          notary:'Required',             tip:'Idaho POA under Idaho Code 15-12. Notarization required. A durable POA must include the specific language that it shall not be affected by incapacity of the principal.' },
  'Illinois':    { witnesses:'No witnesses required',          notary:'Required',             tip:'Illinois has separate POA forms for property (755 ILCS 45) and healthcare (755 ILCS 45, Art. 4). No witnesses required — just notarization. The Illinois Statutory Short-Form is widely accepted.' },
  'Indiana':     { witnesses:'No witnesses required',          notary:'Required',             tip:'Indiana POA under IC 30-5. Notarization required. The 2019 Indiana Uniform Power of Attorney Act modernized the requirements. Financial institutions must honor properly executed POAs.' },
  'Iowa':        { witnesses:'No witnesses required',          notary:'Required',             tip:'Iowa adopted the Uniform Power of Attorney Act (Iowa Code Chapter 633B). Notarization required. The agent must sign an acknowledgment of their duties before acting under most provisions.' },
  'Kansas':      { witnesses:'No witnesses required',          notary:'Required',             tip:'Kansas POA under K.S.A. 58-650 et seq. Notarization required. Kansas does not require witnesses. The POA must include specific language about durability if intended to be durable.' },
  'Kentucky':    { witnesses:'No witnesses required',          notary:'Required',             tip:'Kentucky adopted the Uniform Power of Attorney Act (KRS Chapter 457). Notarization required. Kentucky courts are generally receptive to properly executed out-of-state POAs.' },
  'Louisiana':   { witnesses:'2 witnesses required',           notary:'Required',             tip:'Louisiana requires 2 witnesses and notarization. Louisiana civil law heritage means POA rules differ from other states. For real estate matters, the POA must be in authentic (notarial) form.' },
  'Maine':       { witnesses:'No witnesses required',          notary:'Required',             tip:'Maine adopted the Uniform Power of Attorney Act. Notarization required. The agent must sign an acknowledgment. Financial institutions must accept the POA within 7 business days.' },
  'Maryland':    { witnesses:'No witnesses required',          notary:'Required',             tip:'Maryland POA under Estates and Trusts Article 17-101 et seq. Notarization required. Maryland has specific statutory short-form language that may need to be included for broader authority.' },
  'Massachusetts':{ witnesses:'2 witnesses required',          notary:'Required',             tip:'Massachusetts requires 2 witnesses and notarization under M.G.L. c. 190B, Article V. The healthcare proxy (healthcare POA) is a separate document with slightly different requirements.' },
  'Michigan':    { witnesses:'No witnesses required',          notary:'Required',             tip:'Michigan POA under MCL 700.5501. Notarization required. Michigan financial institutions are required to accept a properly executed POA within a reasonable time or face liability.' },
  'Minnesota':   { witnesses:'No witnesses required',          notary:'Required',             tip:'Minnesota adopted the Uniform Power of Attorney Act (Minn. Stat. 523.01). Notarization required. Minnesota has a statutory short form that is widely recognized by financial institutions.' },
  'Mississippi': { witnesses:'No witnesses required',          notary:'Required',             tip:'Mississippi POA under Miss. Code Ann. 87-3-1. Notarization required. A durable POA must include the specific statutory durability language. Very few restrictions on the form.' },
  'Missouri':    { witnesses:'No witnesses required',          notary:'Required',             tip:'Missouri POA under RSMo 404.700. Notarization required. Missouri requires that a durable POA include specific language: "This power of attorney shall not be affected by disability of the principal." ' },
  'Montana':     { witnesses:'No witnesses required',          notary:'Required',             tip:'Montana adopted the Uniform Power of Attorney Act (MCA 72-31-301). Notarization required. Financial institutions must accept a valid POA or provide written refusal with reason within 7 business days.' },
  'Nebraska':    { witnesses:'No witnesses required',          notary:'Required',             tip:'Nebraska adopted the Uniform Power of Attorney Act (Neb. Rev. Stat. 30-4001). Notarization required. Nebraska financial institutions must accept a properly presented POA within 7 days.' },
  'Nevada':      { witnesses:'No witnesses required',          notary:'Required',             tip:'Nevada POA under NRS Chapter 162A. Notarization required. Nevada adopted the Uniform Power of Attorney Act in 2009. Financial institutions must accept or reject a POA within 7 business days.' },
  'New Hampshire':{ witnesses:'No witnesses required',         notary:'Required',             tip:'New Hampshire POA under RSA 564-E. Notarization required. New Hampshire adopted the Uniform Power of Attorney Act. Agents must act in good faith and according to the principal\'s best interests.' },
  'New Jersey':  { witnesses:'No witnesses required',          notary:'Required',             tip:'New Jersey POA under N.J.S.A. 46:2B-8.9 et seq. Notarization required. The New Jersey Short Form Power of Attorney is widely accepted by banks. Financial powers are broad without limitation.' },
  'New Mexico':  { witnesses:'No witnesses required',          notary:'Required',             tip:'New Mexico adopted the Uniform Power of Attorney Act (NMSA 1978, Chapter 45, Article 5B). Notarization required. The agent must sign a separate certification before acting on the POA.' },
  'New York':    { witnesses:'2 witnesses required',           notary:'Required',             tip:'New York has strict POA requirements under GOL Article 5. Both principal AND all agents must sign in the presence of 2 witnesses and a notary. A Statutory Gifts Rider is needed for gifting authority.' },
  'North Carolina':{ witnesses:'No witnesses required',        notary:'Required',             tip:'North Carolina POA under N.C.G.S. Chapter 32C. Notarization required. North Carolina adopted the Uniform Power of Attorney Act in 2018. No witnesses required — simplifies execution.' },
  'North Dakota':{ witnesses:'No witnesses required',          notary:'Required',             tip:'North Dakota adopted the Uniform Power of Attorney Act (N.D.C.C. Chapter 30.1-30). Notarization required. The agent must sign a certificate of acknowledgment before exercising authority.' },
  'Ohio':        { witnesses:'No witnesses required',          notary:'Required',             tip:'Ohio adopted the Uniform Power of Attorney Act (R.C. 1337.21). Notarization required. Ohio courts presume good faith for agents acting under a POA. Financial institutions must accept within reasonable time.' },
  'Oklahoma':    { witnesses:'No witnesses required',          notary:'Required',             tip:'Oklahoma POA under 58 O.S. Section 1071. Notarization required. Oklahoma financial institutions must accept or refuse a presented POA within 5 business days.' },
  'Oregon':      { witnesses:'No witnesses required',          notary:'Required',             tip:'Oregon adopted the Uniform Power of Attorney Act (ORS Chapter 127). Notarization required. Oregon financial institutions must accept a properly executed POA within 7 business days or face liability.' },
  'Pennsylvania':{ witnesses:'2 witnesses required',           notary:'Required',             tip:'Pennsylvania requires 2 witnesses and notarization under the 2015 POA Act (20 Pa. C.S. 5601). The agent must sign an acknowledgment. Specific notice language must appear at the top of the document.' },
  'Rhode Island':{ witnesses:'No witnesses required',          notary:'Required',             tip:'Rhode Island POA under R.I.G.L. 18-16-1. Notarization required. No witnesses required. Rhode Island generally follows the Uniform Power of Attorney Act framework.' },
  'South Carolina':{ witnesses:'No witnesses required',        notary:'Required',             tip:'South Carolina adopted the Uniform Power of Attorney Act (S.C. Code 62-8-101). Notarization required. The agent must sign a certificate of authority before relying on it.' },
  'South Dakota':{ witnesses:'No witnesses required',          notary:'Required',             tip:'South Dakota adopted the Uniform Power of Attorney Act (SDCL Chapter 59-12). Notarization required. Financial institutions must accept a validly executed POA without unreasonable delay.' },
  'Tennessee':   { witnesses:'No witnesses required',          notary:'Required',             tip:'Tennessee adopted the Uniform Power of Attorney Act (T.C.A. 34-6-101). Notarization required. No witnesses required. Tennessee courts give significant deference to properly executed POAs.' },
  'Texas':       { witnesses:'No witnesses required',          notary:'Required',             tip:'Texas durable POA must use specific statutory language under the Durable Power of Attorney Act (Estates Code 752.051). The agent can use a "Certification of Authority" to prove authority to third parties.' },
  'Utah':        { witnesses:'No witnesses required',          notary:'Required',             tip:'Utah adopted the Uniform Power of Attorney Act (U.C.A. 75-9-101). Notarization required. No witnesses required. Utah financial institutions must honor a properly executed POA within 7 days.' },
  'Vermont':     { witnesses:'No witnesses required',          notary:'Required',             tip:'Vermont POA under 14 V.S.A. Chapter 121. Notarization required. No witnesses required. Vermont generally follows the Uniform Power of Attorney Act with minor modifications.' },
  'Virginia':    { witnesses:'No witnesses required',          notary:'Required',             tip:'Virginia adopted the Uniform Power of Attorney Act (Va. Code 64.2-1600). Notarization required. Financial institutions must accept or refuse a POA within 7 business days with written reason for refusal.' },
  'Washington':  { witnesses:'No witnesses required',          notary:'Required',             tip:'Washington adopted the Uniform Power of Attorney Act in 2017 (RCW 11.125). Notarization required. Third parties are required by law to accept a properly executed POA unless they have a reasonable basis to refuse.' },
  'West Virginia':{ witnesses:'No witnesses required',         notary:'Required',             tip:'West Virginia adopted the Uniform Power of Attorney Act (W.Va. Code 39B-1-101). Notarization required. No witnesses required. Financial institutions must accept within a reasonable time.' },
  'Wisconsin':   { witnesses:'No witnesses required',          notary:'Required',             tip:'Wisconsin POA under Wis. Stat. 244.01. Notarization required. Wisconsin follows the Uniform Power of Attorney Act framework. Financial institutions have 7 days to accept or reject a presented POA.' },
  'Wyoming':     { witnesses:'No witnesses required',          notary:'Required',             tip:'Wyoming adopted the Uniform Power of Attorney Act (W.S. 3-9-101). Notarization required. No witnesses required. Wyoming is generally agent-friendly with limited restrictions on POA authority.' },
};

// ─── PAGE GENERATOR (same as before) ─────────────────────────────────────────
function makeStatePage(template, state, data) {
  var slug, title, metaDesc, h1Sub, h1, legalBoxTitle, stateContent, guideTitle, guideBody, faqItems, relatedLinks;
  var mainLink = template==='lease' ? '/lease-agreement-template' : template==='bos' ? '/bill-of-sale-template' : '/power-of-attorney-template';
  var mainLabel = template==='lease' ? 'Lease Agreement' : template==='bos' ? 'Bill of Sale' : 'Power of Attorney';

  if (template === 'lease') {
    slug = state.toLowerCase().replace(/\s+/g,'-') + '-lease-agreement-template';
    title = 'Free ' + state + ' Lease Agreement Template 2026 | Fill In &amp; Download PDF';
    metaDesc = 'Free ' + state + ' residential lease agreement template 2026. Security deposit limit: ' + data.depositLimit + '. Deposit return: ' + data.depositReturn + '. Fill in, preview, download PDF. No sign-up.';
    h1 = 'Free ' + state + ' Lease Agreement';
    h1Sub = '2026 — Residential Rental';
    legalBoxTitle = state + ' Landlord-Tenant Law';
    stateContent = '<table class="doc-table" style="margin-bottom:0"><tbody>'
      +'<tr><td><strong>Security Deposit Limit</strong></td><td>'+data.depositLimit+'</td></tr>'
      +'<tr><td><strong>Notice to Enter</strong></td><td>'+data.noticeToEnter+'</td></tr>'
      +'<tr><td><strong>Deposit Return Deadline</strong></td><td>'+data.depositReturn+'</td></tr>'
      +'<tr><td><strong>Rent Control</strong></td><td>'+(data.rentControl?'Yes — applies in some areas':'No statewide rent control')+'</td></tr>'
      +'</tbody></table>'
      +'<p style="margin-top:10px;font-size:12px;color:#555"><strong>'+state+'-specific note:</strong> '+data.tip+'</p>';
    guideTitle = state + ' Lease Agreement — Key Legal Requirements';
    guideBody = '<p>'+state+' residential leases are governed by state landlord-tenant law. Key rules for '+state+' landlords and tenants:</p><ul>'
      +'<li><strong>Security deposit:</strong> '+data.depositLimit+'. Must be returned within '+data.depositReturn+' with itemized deductions.</li>'
      +'<li><strong>Entry notice:</strong> Landlords must give '+data.noticeToEnter+' advance notice for non-emergency entry.</li>'
      +(data.rentControl?'<li><strong>Rent control:</strong> Applies in certain '+state+' jurisdictions. Verify local rules before setting or raising rent.</li>':'')
      +'</ul><p>'+data.tip+'</p>';
    faqItems = [
      { q:'What is the security deposit limit in '+state+'?', a:'In '+state+', the security deposit limit is: <strong>'+data.depositLimit+'</strong>. Collecting more than the legal limit can expose landlords to double or triple damages plus attorney fees.' },
      { q:'How long does a '+state+' landlord have to return a security deposit?', a:''+state+' landlords must return the deposit within <strong>'+data.depositReturn+'</strong> of the tenant vacating, along with an itemized list of any deductions. Failure to comply can forfeit the landlord\'s right to withhold any portion of the deposit.' },
      { q:'How much notice must a '+state+' landlord give before entering?', a:'In '+state+', landlords must provide <strong>'+data.noticeToEnter+'</strong> before entering a rental unit for non-emergency purposes. Emergency entries (fire, gas leak, flooding) are exempt.' },
      { q:'Is there rent control in '+state+'?', a:(data.rentControl?'Yes, some municipalities in '+state+' have rent control or rent stabilization. '+data.tip:''+state+' does not have statewide rent control. Landlords may raise rent with proper notice at lease renewal.') },
    ];
    relatedLinks = [
      { href:'/lease-agreement-template', label:'Standard Lease (all states)', desc:'Full form with all state options.' },
      { href:'/bill-of-sale-template', label:'Bill of Sale', desc:'Transfer property or vehicle ownership.' },
      { href:'/promissory-note-template', label:'Promissory Note', desc:'Document a payment plan or loan.' },
    ];

  } else if (template === 'bos') {
    slug = state.toLowerCase().replace(/\s+/g,'-') + '-bill-of-sale-template';
    title = 'Free ' + state + ' Bill of Sale Template 2026 | Fill In &amp; Download PDF';
    metaDesc = 'Free ' + state + ' bill of sale template 2026. Notary: ' + data.notary + '. Title fee: ' + data.titlingFee + '. Fill in, preview, download PDF instantly. No sign-up.';
    h1 = 'Free ' + state + ' Bill of Sale';
    h1Sub = '2026 — Vehicle, Boat &amp; Property';
    legalBoxTitle = state + ' Bill of Sale Requirements';
    stateContent = '<table class="doc-table" style="margin-bottom:0"><tbody>'
      +'<tr><td><strong>Notary Requirement</strong></td><td>'+data.notary+'</td></tr>'
      +'<tr><td><strong>Odometer Disclosure</strong></td><td>'+data.odom+'</td></tr>'
      +'<tr><td><strong>Title Transfer Fee</strong></td><td>'+data.titlingFee+'</td></tr>'
      +'</tbody></table>'
      +'<p style="margin-top:10px;font-size:12px;color:#555"><strong>'+state+'-specific note:</strong> '+data.tip+'</p>';
    guideTitle = state + ' Bill of Sale — Requirements &amp; Process';
    guideBody = '<p>In '+state+', a bill of sale documents private sales of vehicles and personal property. Key '+state+' requirements:</p><ul>'
      +'<li><strong>Notary:</strong> '+data.notary+'.</li>'
      +'<li><strong>Odometer:</strong> '+data.odom+'.</li>'
      +'<li><strong>Title transfer fee:</strong> '+data.titlingFee+' at the DMV.</li>'
      +'</ul><p>'+data.tip+'</p>';
    faqItems = [
      { q:'Does a '+state+' bill of sale need to be notarized?', a:'In '+state+': <strong>'+data.notary+'</strong>. '+data.tip },
      { q:'How do I transfer a vehicle title in '+state+'?', a:'After completing the bill of sale, both parties sign the title. Take the signed title, bill of sale, and the title fee ('+data.titlingFee+') to the '+state+' DMV. The buyer typically has 30 days to complete the transfer.' },
      { q:'What should a '+state+' bill of sale include?', a:'A valid '+state+' bill of sale should include: seller and buyer full names and addresses, a description of the item sold (vehicle VIN, equipment description, etc.), the sale price and date, the odometer reading for vehicles under 10 years old, and signatures of both parties.' },
      { q:'Do I need a bill of sale for a private sale in '+state+'?', a:'Yes. While '+state+' may use the title itself for vehicle transfers, a separate bill of sale protects both parties by documenting the agreed price, condition, and date of sale — important for tax purposes and resolving any later disputes.' },
    ];
    relatedLinks = [
      { href:'/bill-of-sale-template', label:'Standard Bill of Sale (all states)', desc:'All property types and states.' },
      { href:'/promissory-note-template', label:'Promissory Note', desc:'Finance the sale with installment payments.' },
      { href:'/lease-agreement-template', label:'Lease Agreement', desc:'Rent instead of sell your property.' },
    ];

  } else { // poa
    slug = state.toLowerCase().replace(/\s+/g,'-') + '-power-of-attorney-template';
    title = 'Free ' + state + ' Power of Attorney Form 2026 | Fill In &amp; Download PDF';
    metaDesc = 'Free ' + state + ' power of attorney form 2026. General, durable, limited, and medical POA. ' + state + ' requires: ' + data.witnesses + ' + notarization. Fill in, preview, download PDF. No sign-up.';
    h1 = 'Free ' + state + ' Power of Attorney Form';
    h1Sub = '2026';
    legalBoxTitle = state + ' POA Execution Requirements';
    stateContent = '<table class="doc-table" style="margin-bottom:0"><tbody>'
      +'<tr><td><strong>Witnesses Required</strong></td><td>'+data.witnesses+'</td></tr>'
      +'<tr><td><strong>Notarization</strong></td><td>'+data.notary+'</td></tr>'
      +'</tbody></table>'
      +'<p style="margin-top:10px;font-size:12px;color:#555"><strong>'+state+'-specific note:</strong> '+data.tip+'</p>';
    guideTitle = state + ' Power of Attorney — Signing Requirements';
    guideBody = '<p>To be legally valid in '+state+', a power of attorney must comply with '+state+' state law:</p><ul>'
      +'<li><strong>Witnesses:</strong> '+data.witnesses+'</li>'
      +'<li><strong>Notarization:</strong> '+data.notary+'</li>'
      +'</ul><p>'+data.tip+'</p>'
      +'<p>After completing this form, sign it before a notary public'+(data.witnesses.includes('required') ? ' with the required witnesses present' : '')+'. Keep the original in a secure location and give copies to your agent, bank, and healthcare providers.</p>';
    faqItems = [
      { q:'What are the signing requirements for a '+state+' power of attorney?', a:'In '+state+', a valid POA requires: <strong>'+data.witnesses+'</strong> and <strong>'+data.notary+'</strong>. '+data.tip },
      { q:'Does a '+state+' power of attorney need to be filed with the court?', a:'No. A '+state+' power of attorney is an internal document — you keep it in your records. You do not file it with any court. For real estate transactions, the POA may need to be recorded with the county recorder.' },
      { q:'Can I use a '+state+' POA in another state?', a:'Generally yes. Most states honor a validly executed out-of-state POA, especially one that meets the more demanding state\'s requirements. If the POA involves real estate in another state, consult an attorney about that state\'s acceptance standards.' },
      { q:'How do I revoke a '+state+' power of attorney?', a:'To revoke a '+state+' POA: sign a written Revocation of Power of Attorney before a notary, deliver it to the agent in writing, and notify all institutions that relied on the POA. Collect and destroy existing copies of the original where possible.' },
    ];
    relatedLinks = [
      { href:'/power-of-attorney-template', label:'Standard POA (all states)', desc:'General, durable, limited, and medical.' },
      { href:'/llc-operating-agreement-template', label:'LLC Operating Agreement', desc:'Authorize someone to manage your LLC.' },
      { href:'/bill-of-sale-template', label:'Bill of Sale', desc:'Transfer property or vehicle ownership.' },
    ];
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${metaDesc}">
<link rel="canonical" href="https://www.freedoctemplates.xyz/${slug}">
<meta property="og:title" content="${title}">
<meta property="og:type" content="website">
<meta name="robots" content="index,follow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap">
<link rel="stylesheet" href="/shared/styles.css?v=1">
</head>
<body>
<header class="site-header">
  <div class="header-inner">
    <a href="/" class="site-logo">FreeDoc<span>Templates</span></a>
    <nav class="main-nav" aria-label="Main">
      <div class="nav-group">
        <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Business <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button>
        <div class="nav-dropdown"><a href="/invoice-template" class="nav-item">Invoice Template</a><a href="/nda-template" class="nav-item">NDA Template</a><a href="/independent-contractor-agreement-template" class="nav-item">Contractor Agreement</a></div>
      </div>
      <div class="nav-group">
        <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Personal <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button>
        <div class="nav-dropdown"><a href="/power-of-attorney-template" class="nav-item">Power of Attorney</a><a href="/llc-operating-agreement-template" class="nav-item">LLC Agreement</a><a href="/bill-of-sale-template" class="nav-item">Bill of Sale</a><a href="/lease-agreement-template" class="nav-item">Lease Agreement</a></div>
      </div>
    </nav>
    <div class="header-actions"><a href="/tools" class="btn-all-tools">All Templates</a></div>
  </div>
</header>
<main class="page-wrap">
  <div class="container">
    <nav class="breadcrumb"><a href="/">Home</a><span>&#x203A;</span><a href="${mainLink}">${mainLabel}</a><span>&#x203A;</span><span aria-current="page">${state}</span></nav>
    <h1 class="page-title" data-enter>${h1} <span style="color:var(--ink-3);font-weight:400;font-size:.6em">${h1Sub}</span></h1>
    <p class="page-sub" data-enter data-delay="1">Fill in your ${state} details, see a live document preview, and download as PDF. Free, no sign-up, no watermark.</p>
    <div class="page-badges" data-enter data-delay="2">
      <span class="page-badge"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Free, no account</span>
      <span class="page-badge"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ${state}-specific law</span>
      <span class="page-badge"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> PDF download</span>
    </div>
    <div class="doc-card" style="margin-bottom:24px;border-left:4px solid var(--accent)" data-enter>
      <div class="doc-card-header">${legalBoxTitle}</div>
      <div class="doc-card-body">${stateContent}</div>
    </div>
    <div style="text-align:center;padding:32px;border:2px dashed var(--border);border-radius:12px;margin-bottom:32px">
      <p style="font-size:15px;font-weight:700;color:var(--ink-1);margin-bottom:8px">Open the ${state} ${mainLabel} Generator</p>
      <p style="font-size:13px;color:var(--ink-3);margin-bottom:16px">Fill in, preview live, download PDF — pre-set for ${state}</p>
      <a href="${mainLink}" class="doc-btn doc-btn--gold" style="display:inline-flex;text-decoration:none">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        Open ${mainLabel} Generator &rarr;
      </a>
    </div>
    <section class="article-section">
      <div class="article-body">
        <h2>${guideTitle}</h2>
        ${guideBody}
      </div>
    </section>
    <section class="faq-section" style="margin:48px -24px 0;padding:48px 24px">
      <div class="faq-header"><p class="section-eyebrow">FAQ</p><h2 class="section-title" style="font-size:24px">${state} ${mainLabel} questions</h2></div>
      <div class="faq-list">${faqItems.map(f=>'<details class="faq-item"><summary class="faq-q">'+f.q+'</summary><div class="faq-a">'+f.a+'</div></details>').join('')}</div>
    </section>
    <section class="related-section">
      <p class="section-eyebrow">Related Templates</p>
      <h2 class="section-title" style="font-size:22px;margin-bottom:16px">You might also need</h2>
      <div class="tools-grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">
        ${relatedLinks.map((r,i)=>{var ic=['tc-blue','tc-gold','tc-green'][i];return '<a href="'+r.href+'" class="tool-card"><div class="tc-icon '+ic+'"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div><div class="tool-card-title">'+r.label+'</div><div class="tool-card-desc">'+r.desc+'</div></div></a>';}).join('')}
      </div>
    </section>
  </div>
</main>
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div><a href="/" class="footer-logo">FreeDocTemplates</a><p class="footer-tagline">Free legal document templates. No sign-up, no watermarks.</p><p class="footer-disclaimer" style="margin-top:8px">Not a law firm. For informational use only. Consult a licensed ${state} attorney for legal advice.</p></div>
      <div><div class="footer-col-title">Business</div><nav class="footer-nav"><a href="/invoice-template">Invoice</a><a href="/nda-template">NDA</a><a href="/independent-contractor-agreement-template">Contractor Agreement</a></nav></div>
      <div><div class="footer-col-title">Property</div><nav class="footer-nav"><a href="/lease-agreement-template">Lease Agreement</a><a href="/bill-of-sale-template">Bill of Sale</a></nav></div>
      <div><div class="footer-col-title">Personal</div><nav class="footer-nav"><a href="/power-of-attorney-template">Power of Attorney</a><a href="/llc-operating-agreement-template">LLC Agreement</a></nav></div>
    </div>
    <div class="footer-bottom"><p>&copy; 2026 FreeDocTemplates.xyz</p></div>
  </div>
</footer>
<script src="/shared/scripts.js?v=1" defer></script>
</body>
</html>`;
}

// ─── GENERATE ALL PAGES ───────────────────────────────────────────────────────
var count = 0;
var base = 'C:/Users/mastr/claude co/legal-docs/';
var generated = [];

Object.keys(LEASE_DATA).forEach(function(state) {
  var slug = state.toLowerCase().replace(/\s+/g,'-') + '-lease-agreement-template';
  fs.writeFileSync(base + slug + '.html', makeStatePage('lease', state, LEASE_DATA[state]));
  generated.push(slug); count++;
});

Object.keys(BOS_DATA).forEach(function(state) {
  var slug = state.toLowerCase().replace(/\s+/g,'-') + '-bill-of-sale-template';
  fs.writeFileSync(base + slug + '.html', makeStatePage('bos', state, BOS_DATA[state]));
  generated.push(slug); count++;
});

Object.keys(POA_DATA).forEach(function(state) {
  var slug = state.toLowerCase().replace(/\s+/g,'-') + '-power-of-attorney-template';
  fs.writeFileSync(base + slug + '.html', makeStatePage('poa', state, POA_DATA[state]));
  generated.push(slug); count++;
});

console.log('State pages generated:', count);
console.log('Breakdown: ' + Object.keys(LEASE_DATA).length + ' lease + ' + Object.keys(BOS_DATA).length + ' bos + ' + Object.keys(POA_DATA).length + ' poa');
