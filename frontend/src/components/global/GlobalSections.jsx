import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import content from "../../content/globalContent.json";
import { Section, SectionHeader, Body, IntentCta, StepStrip, FlowDiagram, ItemGrid } from "./ui";

// New sections for the Global hub. Copy describes capabilities only: no
// figures, clients or market coverage that haven't been confirmed.

function MoreLink({ to, children }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#00A3FF] hover:text-white"
    >
      {children}
      <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
    </Link>
  );
}

const CAPABILITIES = [
  { t: "Performance Marketing", d: "Paid acquisition focused on measurable outcomes.", href: "#performance-marketing" },
  { t: "Media Buying", d: "Campaign planning, buying, optimisation and scaling.", href: "#media-buying" },
  { t: "Lead Generation", d: "High-intent acquisition and conversion funnels.", href: "#lead-generation" },
  { t: "Affiliate Management", d: "An extension of your internal affiliate team.", to: "/global/affiliate-management" },
  { t: "Affiliate Recruitment", d: "Publisher and partner hunting across relevant markets.", to: "/global/affiliate-recruitment" },
  { t: "Sub-Affiliate Operations", d: "Managing downstream acquisition partners, where permitted.", to: "/global/sub-affiliate" },
  { t: "GEO Expansion", d: "Entering new markets through paid and partner acquisition.", href: "#market-expansion" },
  { t: "Tracking & Attribution", d: "Connecting traffic to conversions and business outcomes.", href: "#tracking" },
  { t: "CRO", d: "Turning more of your existing traffic into customers.", href: "#cro" },
];

export function Capabilities() {
  return (
    <Section id="capabilities" testId="global-capabilities">
      <SectionHeader
        no="NO_001"
        label="WHAT_WE_ACTUALLY_DO"
        title={<>One acquisition team. <span className="text-[#00A3FF]">Every growth channel.</span></>}
        aside="From paid media and lead generation to affiliate management, publisher acquisition and sub-affiliate operations, SevenX gives ambitious companies an acquisition team built around measurable growth."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#1B2A4A]">
        {CAPABILITIES.map((c, i) => {
          const inner = (
            <>
              <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest">NO_{String(i + 1).padStart(3, "0")}</div>
              <h3 className="mt-6 font-display text-2xl md:text-3xl uppercase leading-[0.95] text-[#E6EDFF] group-hover:text-[#00A3FF] transition-colors">
                {c.t}
              </h3>
              <p className="mt-3 font-mono text-[11px] md:text-xs text-[#9BB0D6] leading-[1.7]">{c.d}</p>
              <ArrowUpRight className="absolute top-5 right-5 w-4 h-4 text-[#2E4270] group-hover:text-[#00A3FF] group-hover:rotate-45 transition-all" />
            </>
          );
          const cls = "group relative block border-r border-b border-[#1B2A4A] p-6 md:p-8 min-h-[190px] hover:bg-[#0A1128]/70 transition-colors";
          return c.to ? (
            <Link key={c.t} to={c.to} className={cls}>{inner}</Link>
          ) : (
            <a key={c.t} href={c.href} className={cls}>{inner}</a>
          );
        })}
      </div>
    </Section>
  );
}

const AUDIENCES = [
  { who: "Fintech company", line: "We can build your performance acquisition engine." },
  { who: "D2C brand", line: "We can operate your paid acquisition and conversion funnel." },
  { who: "iGaming operator", line: "We can help build and manage your affiliate acquisition channel." },
  { who: "Affiliate program", line: "We can act as an extension of your affiliate team." },
  { who: "Company entering a new market", line: "We can combine paid and partner acquisition to enter that market." },
];

export function WhoWeWorkWith() {
  return (
    <Section testId="global-audiences" className="py-16 md:py-20">
      <SectionHeader no="NO_002" label="WHO_WE_WORK_WITH" title={<>If you are a<span className="text-[#00A3FF]">…</span></>} />
      <ul className="border-t border-[#1B2A4A]">
        {AUDIENCES.map((a) => (
          <li key={a.who} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 border-b border-[#1B2A4A] py-5 md:py-6">
            <div className="md:col-span-4 font-mono text-xs tracking-widest uppercase text-[#00A3FF]">{a.who}</div>
            <div className="md:col-span-8 font-display text-2xl md:text-4xl uppercase leading-[0.95] text-[#E6EDFF]">{a.line}</div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function AcquisitionEcosystem() {
  return (
    <Section id="ecosystem" testId="global-ecosystem">
      <div className="absolute inset-0 radial-blue opacity-25 pointer-events-none" />
      <div className="relative">
        <SectionHeader
          no="NO_003"
          label="ACQUISITION_ECOSYSTEM"
          title={<>One team. <span className="text-[#00A3FF]">Multiple acquisition channels.</span></>}
          aside="SevenX doesn't run channels in isolation. Paid media, affiliates and publishers share one tracking layer and one set of targets, so budget and partner effort move to whatever converts."
        />
        <StepStrip
          steps={[
            { t: "Paid media", d: "Search, social, programmatic and native." },
            { t: "Lead generation", d: "Funnels that qualify intent." },
            { t: "Affiliate partners", d: "Performance-paid partners." },
            { t: "Publishers", d: "Content, comparison and SEO sites." },
            { t: "Sub-affiliates", d: "Downstream partners, where permitted." },
            { t: "Tracking", d: "Every click tied to a source." },
            { t: "Conversion", d: "Landing pages, forms and flows." },
            { t: "Revenue", d: "The number that matters." },
          ]}
        />
      </div>
    </Section>
  );
}

const CORE = [
  {
    id: "performance-marketing",
    t: "Performance marketing",
    d: "Paid acquisition planned and optimised against the outcome you pay for (leads, sales, registrations or deposits), not clicks.",
    points: ["Channel and budget planning", "Creative and landing-page testing", "Audience, bid and placement optimisation", "Reporting on cost per outcome"],
  },
  {
    id: "media-buying",
    t: "Media buying",
    d: "Planning, buying, optimising and scaling campaigns across the channels and inventory that reach your audience, within each platform's policies.",
    points: ["Search and social", "Programmatic and native", "Direct publisher placements", "Scaling what converts"],
  },
  {
    id: "lead-generation",
    t: "Lead generation",
    d: "Acquisition funnels built to produce leads your sales team can use: qualified, tracked and delivered quickly.",
    points: ["Landing pages and forms", "Qualification steps", "CRM delivery", "Lead-quality feedback loops"],
  },
];

export function CoreServices() {
  return (
    <Section testId="global-core-services">
      <SectionHeader
        no="NO_004"
        label="PAID_ACQUISITION"
        title={<>Performance marketing, <span className="text-[#00A3FF]">media buying & lead generation.</span></>}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#1B2A4A]">
        {CORE.map((c) => (
          <div key={c.id} id={c.id} className="border-r border-b border-[#1B2A4A] p-6 md:p-8 scroll-mt-24">
            <h3 className="font-display text-3xl md:text-4xl uppercase leading-[0.95] text-[#E6EDFF]">{c.t}</h3>
            <p className="mt-4 font-mono text-[12px] text-[#9BB0D6] leading-[1.8]">{c.d}</p>
            <ul className="mt-6 space-y-2">
              {c.points.map((p) => (
                <li key={p} className="flex gap-3 font-mono text-[11px] tracking-wide uppercase text-[#E6EDFF]">
                  <span className="text-[#00A3FF]">■</span>{p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <IntentCta label="Discuss Your Acquisition Goals" intent="PERFORMANCE MARKETING" testId="cta-acquisition" />
      </div>
    </Section>
  );
}

export function AffiliateTeam() {
  return (
    <Section id="affiliate" testId="global-affiliate-team">
      <div className="absolute inset-0 radial-blue opacity-30 pointer-events-none" />
      <div className="relative">
        <SectionHeader
          no="NO_005"
          label="OUTSOURCED_AFFILIATE_TEAM"
          title={<>Need an affiliate team <span className="text-[#00A3FF]">without building one from scratch?</span></>}
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7 space-y-4">
            <Body>
              SevenX can operate as an extension of your affiliate department: recruiting publishers, managing
              relationships, negotiating commercial terms, activating partners, monitoring performance and expanding
              into new GEOs.
            </Body>
            <Body>
              You don't always need to build a seven-person affiliate department internally. Depending on the
              program's needs, SevenX can operate as an extension of your existing affiliate team or manage defined
              parts of the affiliate function.
            </Body>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-2 content-start">
            {["Strategy", "Affiliate recruitment", "Publisher hunting", "Partner communication", "Commercial negotiations", "GEO expansion", "Activation", "Optimisation", "Tracking", "Reporting", "Relationship management", "Inactive partner reactivation"].map((f) => (
              <span key={f} className="px-3 py-2 border border-[#1B2A4A] font-mono text-[10px] tracking-widest uppercase text-[#9BB0D6]">
                {f}
              </span>
            ))}
          </div>
        </div>
        <StepStrip steps={["Strategy", "Hunt", "Recruit", "Negotiate", "Onboard", "Activate", "Optimise", "Scale"]} />
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <IntentCta label="Build Your Affiliate Channel" intent="AFFILIATE MANAGEMENT" testId="cta-affiliate" />
          <MoreLink to="/global/affiliate-management">How affiliate management works</MoreLink>
        </div>
      </div>
    </Section>
  );
}

export function AffiliateRecruitment() {
  return (
    <Section testId="global-affiliate-recruitment">
      <SectionHeader
        no="NO_006"
        label="AFFILIATE_RECRUITMENT"
        title={<>Recruitment, <span className="text-[#00A3FF]">not mass email.</span></>}
        aside="We research which publishers can actually reach your audience in each market, then contact, negotiate with, onboard and activate them."
      />
      <StepStrip
        steps={["Market identification", "Publisher research", "Outreach", "Commercial negotiation", "Onboarding", "Tracking", "Activation", "Optimisation"]}
      />
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8">
          <div className="font-mono text-[10px] text-[#6B7FA8] tracking-widest mb-3 uppercase">Partner types we look for</div>
          <div className="flex flex-wrap gap-2">
            {["Niche publishers", "Comparison sites", "Content affiliates", "SEO publishers", "Media buyers", "Community publishers", "Local GEO specialists", "Sub-affiliate partners"].map((p) => (
              <span key={p} className="px-3 py-2 border border-[#1B2A4A] font-mono text-[10px] tracking-widest uppercase text-[#E6EDFF]">{p}</span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <MoreLink to="/global/affiliate-recruitment">Our recruitment process</MoreLink>
        </div>
      </div>
    </Section>
  );
}

export function SubAffiliate() {
  return (
    <Section testId="global-sub-affiliate">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader
            no="NO_007"
            label="SUB_AFFILIATE_OPERATIONS"
            title={<>Sub-affiliate <span className="text-[#00A3FF]">operations.</span></>}
          />
          <div className="space-y-4">
            <Body>
              Where an affiliate program or advertiser permits it, SevenX can join as a partner and manage its own
              downstream network of publishers and traffic partners, giving the program reach into many publishers
              through one relationship.
            </Body>
            <Body>
              We confirm permission first, give every downstream publisher its own sub ID, monitor traffic quality and
              pass the program's rules down to every partner, subject to the relevant affiliate terms, tracking and
              compliance requirements.
            </Body>
          </div>
          <div className="mt-8">
            <MoreLink to="/global/sub-affiliate">How the sub-affiliate model works</MoreLink>
          </div>
        </div>
        <div className="lg:col-span-5">
          <FlowDiagram
            nodes={["Brand", "Affiliate program / network", "SevenX", "Sub-affiliates & publishers", "End user"]}
            note="Where permitted by the program or advertiser, and subject to the relevant affiliate terms, tracking and compliance requirements."
          />
        </div>
      </div>
    </Section>
  );
}

const MODELS = [
  { t: "CPA", d: "A fixed payment per qualifying action." },
  { t: "RevShare", d: "A share of revenue from referred customers." },
  { t: "Hybrid", d: "A lower CPA combined with a revenue share." },
  { t: "Fixed placements", d: "Paid positions on a publisher's site or channel." },
  { t: "Performance-based", d: "Custom agreements tied to agreed outcomes." },
];

export function CommercialModels() {
  return (
    <Section testId="global-commercial-models" className="py-16 md:py-20">
      <SectionHeader
        no="NO_008"
        label="COMMERCIAL_MODELS"
        title={<>How partner deals <span className="text-[#00A3FF]">are structured.</span></>}
        aside="We negotiate within the limits you set. We don't publish rates or promise terms before we know the factors that drive them."
      />
      <div className="grid grid-cols-2 md:grid-cols-5 border-t border-l border-[#1B2A4A]">
        {MODELS.map((m) => (
          <div key={m.t} className="border-r border-b border-[#1B2A4A] p-5 md:p-6">
            <h3 className="font-display text-2xl md:text-3xl uppercase text-[#E6EDFF]">{m.t}</h3>
            <p className="mt-2 font-mono text-[11px] text-[#9BB0D6] leading-[1.6]">{m.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] text-[#6B7FA8] tracking-widest uppercase mr-2">Terms depend on</span>
        {["GEO", "Traffic quality", "Vertical", "Volume", "Conversion", "Brand economics", "Program terms"].map((f) => (
          <span key={f} className="px-2.5 py-1.5 bg-[#0A1128] border border-[#1B2A4A] font-mono text-[10px] tracking-widest uppercase text-[#9BB0D6]">{f}</span>
        ))}
      </div>
    </Section>
  );
}

const IGAMING_SERVICES = [
  "Casino affiliate management", "Sports betting affiliate management", "Affiliate recruitment", "Publisher hunting",
  "Sub-affiliate operations", "GEO expansion", "Partner negotiations", "CPA / RevShare / Hybrid structures",
  "Tracking and attribution", "FTD / conversion optimisation", "Affiliate activation", "Performance reporting",
];

export function IGamingGrowth() {
  return (
    <Section id="igaming" testId="global-igaming">
      <div className="absolute inset-0 radial-blue opacity-25 pointer-events-none" />
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader
            no="NO_009"
            label="SPECIALIST_VERTICAL"
            title={<>iGaming <span className="text-[#00A3FF]">affiliate growth.</span></>}
          />
          <Body>
            SevenX works with licensed iGaming operators and affiliate programs that need additional hands on the
            ground, from affiliate recruitment and publisher outreach to GEO expansion, partner management and
            performance optimisation. SevenX is a B2B marketing and affiliate service provider, not a gambling operator.
          </Body>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-[#1B2A4A]">
            {IGAMING_SERVICES.map((s) => (
              <li key={s} className="flex gap-3 border-b border-[#1B2A4A] py-3 font-mono text-[11px] tracking-wide uppercase text-[#E6EDFF]">
                <span className="text-[#00A3FF]">■</span>{s}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <IntentCta label="Discuss Affiliate Growth" intent="IGAMING AFFILIATE GROWTH" testId="cta-igaming" />
            <MoreLink to="/global/igaming-affiliate-management">iGaming affiliate management</MoreLink>
          </div>
        </div>
        <div className="lg:col-span-5">
          <FlowDiagram
            nodes={["iGaming brand", "Affiliate program", "SevenX", "Affiliates & publishers", "Sub-affiliates", "Qualified traffic", "Registrations · conversions · FTDs"]}
            note="Where permitted by the advertiser, affiliate program and applicable terms."
          />
        </div>
      </div>
    </Section>
  );
}

// Add confirmed markets here to show the market map (status: active | partner | expansion).
// Left empty on purpose: coverage must not be claimed until it is confirmed.
const MARKETS = [];

export function MarketExpansion() {
  return (
    <Section id="market-expansion" testId="global-market-expansion">
      <SectionHeader
        no="NO_010"
        label="GEO_EXPANSION"
        title={<>One partner. <span className="text-[#00A3FF]">Multiple markets.</span></>}
        aside="Entering a new market takes more than translating ads. We combine paid and partner acquisition, subject to the laws and platform policies of each market."
      />
      <div className="flex flex-wrap items-center gap-3">
        {["Market research", "Paid media", "Affiliate partners", "Sub-affiliate network*", "Localised creative", "Tracking", "Optimisation"].map((p, i, arr) => (
          <React.Fragment key={p}>
            <span className="px-4 py-3 border border-[#1B2A4A] bg-[#0A1128]/70 font-display text-lg md:text-2xl uppercase text-[#E6EDFF]">{p}</span>
            {i < arr.length - 1 && <Plus className="w-4 h-4 text-[#00A3FF]" strokeWidth={3} />}
          </React.Fragment>
        ))}
      </div>
      <p className="mt-4 font-mono text-[10px] text-[#6B7FA8]">*Where permitted by the relevant affiliate program.</p>
      {MARKETS.length > 0 && (
        <ul className="mt-10 grid grid-cols-2 md:grid-cols-6 border-t border-l border-[#1B2A4A]">
          {MARKETS.map((m) => (
            <li key={m.name} className="border-r border-b border-[#1B2A4A] p-4">
              <div className="font-display text-xl uppercase text-[#E6EDFF]">{m.name}</div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-[#00A3FF]">{m.status}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-10">
        <IntentCta label="Plan Your Market Expansion" intent="MARKET EXPANSION" variant="outline" testId="cta-expansion" />
      </div>
    </Section>
  );
}

export function TrackingOptimization() {
  return (
    <Section id="tracking" testId="global-tracking">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <SectionHeader
            no="NO_011"
            label="TRACKING_&_ATTRIBUTION"
            title={<>Every click, <span className="text-[#00A3FF]">tied to an outcome.</span></>}
          />
          <ItemGrid
            cols=""
            items={[
              { t: "Conversion tracking", d: "GA4 and platform conversion events set up and verified." },
              { t: "Server-side & first-party", d: "Server-side tracking and first-party data where the setup allows." },
              { t: "Affiliate tracking", d: "Click IDs, sub IDs and server-to-server postbacks where available." },
              { t: "Attribution", d: "Results at publisher, campaign and channel level, including FTDs where relevant." },
              { t: "CRM & reporting", d: "Leads and conversions connected to your CRM and reporting." },
            ]}
          />
        </div>
        <div id="cro" className="scroll-mt-24">
          <SectionHeader
            no="NO_012"
            label="OPTIMISATION_&_CRO"
            title={<>We don't stop <span className="text-[#00A3FF]">at launch.</span></>}
          />
          <Body>
            Conversion rate optimisation turns more of the traffic you already pay for into customers: landing pages,
            forms and funnels, plus registration and deposit flows in iGaming.
          </Body>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {["Data", "Analyse", "Identify", "Test", "Optimise", "Scale"].map((s, i, arr) => (
              <React.Fragment key={s}>
                <span className="px-3 py-2 bg-[#0057FF]/15 border border-[#0057FF] font-mono text-[11px] tracking-widest uppercase text-white">{s}</span>
                {i < arr.length - 1 && <span className="text-[#00A3FF] font-mono">→</span>}
              </React.Fragment>
            ))}
          </div>
          <p className="mt-6 font-mono text-[11px] text-[#6B7FA8] leading-[1.8] uppercase tracking-wide">
            Across creative · audience · publisher · offer · landing page · GEO · campaign · commercial terms · traffic quality
          </p>
        </div>
      </div>
    </Section>
  );
}

export function FaqSection({ items, no = "NO_013" }) {
  return (
    <Section id="faq" testId="global-faq">
      <SectionHeader no={no} label="FAQ" title={<>Questions, <span className="text-[#00A3FF]">answered.</span></>} />
      <div className="border-t border-[#1B2A4A] max-w-5xl">
        {items.map((f) => (
          <details key={f.q} className="group border-b border-[#1B2A4A] py-5">
            <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
              <h3 className="font-display text-xl md:text-2xl uppercase leading-tight text-[#E6EDFF] group-open:text-[#00A3FF]">{f.q}</h3>
              <Plus className="w-5 h-5 mt-1 flex-shrink-0 text-[#00A3FF] group-open:rotate-45 transition-transform" />
            </summary>
            <p className="mt-4 font-mono text-[12px] md:text-sm text-[#9BB0D6] leading-[1.85] max-w-3xl">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function GlobalFaq() {
  return <FaqSection items={content.hub.faq} />;
}
