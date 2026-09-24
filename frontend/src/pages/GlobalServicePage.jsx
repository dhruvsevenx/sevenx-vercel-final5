import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import RegionToggle from "../components/RegionToggle";
import ComplianceBanner from "../components/ComplianceBanner";
import { ContentProvider } from "../context/ContentContext";
import { Section, SectionHeader, Body, IntentCta, StepStrip, FlowDiagram, ItemGrid, Eyebrow } from "../components/global/ui";
import { FaqSection } from "../components/global/GlobalSections";
import { useSeo } from "../lib/seo";
import content from "../content/globalContent.json";

const bySlug = Object.fromEntries(content.services.map((s) => [s.slug, s]));

function Block({ block, index }) {
  const no = `NO_${String(index + 2).padStart(3, "0")}`;
  const label = block.heading.toUpperCase().replace(/\s+/g, "_");
  switch (block.type) {
    case "list":
      return (
        <Section>
          <SectionHeader no={no} label={label} title={block.heading} />
          <ItemGrid items={block.items} />
        </Section>
      );
    case "steps":
      return (
        <Section>
          <SectionHeader no={no} label={label} title={block.heading} />
          <StepStrip steps={block.steps} />
        </Section>
      );
    case "flow":
      return (
        <Section>
          <SectionHeader no={no} label={label} title={block.heading} />
          <FlowDiagram nodes={block.nodes} note={block.note} />
        </Section>
      );
    default:
      return (
        <Section className="py-16 md:py-20">
          <SectionHeader no={no} label={label} title={block.heading} />
          <div className="space-y-4">
            {block.paragraphs.map((p) => <Body key={p}>{p}</Body>)}
          </div>
        </Section>
      );
  }
}

// Dedicated Global service page (/global/<slug>), rendered from globalContent.json.
export default function GlobalServicePage({ slug }) {
  const page = bySlug[slug];
  useSeo({ title: page.title, description: page.description, path: `/global/${slug}` });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <ContentProvider region="global">
      <div className="relative min-h-screen bg-[#050B1F] text-[#E6EDFF] bg-noise overflow-hidden">
        <ComplianceBanner />
        <Navbar base="/global" />
        <RegionToggle current="global" />
        <main className="pt-8">
          <section className="relative px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden" data-testid="service-hero">
            <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
            <div className="absolute inset-0 radial-blue pointer-events-none" style={{ opacity: 0.5 }} />
            <div className="relative">
              <nav aria-label="Breadcrumb" className="font-mono text-[10px] tracking-widest uppercase text-[#6B7FA8] mb-8">
                <Link to="/global" className="hover:text-[#00A3FF]">SevenX Global</Link>
                <span className="mx-2 text-[#00A3FF]">/</span>
                <span className="text-[#9BB0D6]">{page.name}</span>
              </nav>
              <Eyebrow no="NO_001">{page.eyebrow}</Eyebrow>
              <h1 className="font-display text-[12vw] md:text-[7vw] leading-[0.9] tracking-tight uppercase text-[#E6EDFF] max-w-6xl text-balance">
                {page.h1}
              </h1>
              <div className="mt-8 space-y-4">
                {page.intro.map((p) => <Body key={p}>{p}</Body>)}
              </div>
              <div className="mt-10">
                <IntentCta label={page.cta.label} intent={page.cta.intent} testId="service-cta" />
              </div>
            </div>
          </section>

          {page.blocks.map((b, i) => <Block key={b.heading} block={b} index={i} />)}

          <FaqSection items={page.faq} no={`NO_${String(page.blocks.length + 2).padStart(3, "0")}`} />

          <Section className="py-14 md:py-16">
            <div className="font-mono text-[10px] text-[#6B7FA8] tracking-widest uppercase mb-4">Related services</div>
            <div className="flex flex-wrap gap-3">
              {page.related.map((r) => (
                <Link
                  key={r}
                  to={`/global/${r}`}
                  className="group inline-flex items-center gap-3 px-4 py-3 border border-[#1B2A4A] hover:border-[#00A3FF] font-display text-lg uppercase text-[#E6EDFF] hover:text-[#00A3FF] transition-colors"
                >
                  {bySlug[r].name}
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </Link>
              ))}
              <Link
                to="/global"
                className="inline-flex items-center gap-3 px-4 py-3 border border-[#1B2A4A] hover:border-[#00A3FF] font-display text-lg uppercase text-[#9BB0D6] hover:text-[#00A3FF] transition-colors"
              >
                All Global services
              </Link>
            </div>
          </Section>

          <Contact />
          <Footer />
        </main>
      </div>
    </ContentProvider>
  );
}

export const SERVICE_SLUGS = Object.keys(bySlug);
