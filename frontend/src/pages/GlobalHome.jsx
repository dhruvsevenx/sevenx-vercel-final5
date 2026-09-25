import React, { useEffect, useState } from "react";
import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BigWordmark from "../components/BigWordmark";
import Stats from "../components/Stats";
import Services from "../components/Services";
import CaseStudies from "../components/CaseStudies";
import Partners from "../components/Partners";
import Testimonials from "../components/Testimonials";
import WhyChoose from "../components/WhyChoose";
import Verticals from "../components/Verticals";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import RegionToggle from "../components/RegionToggle";
import ComplianceBanner, { BANNER_HEIGHT } from "../components/ComplianceBanner";
import { ContentProvider } from "../context/ContentContext";
import {
  Capabilities,
  WhoWeWorkWith,
  AcquisitionEcosystem,
  CoreServices,
  AffiliateTeam,
  AffiliateRecruitment,
  SubAffiliate,
  CommercialModels,
  IGamingGrowth,
  MarketExpansion,
  TrackingOptimization,
  GlobalFaq,
} from "../components/global/GlobalSections";
import { useSeo } from "../lib/seo";
import content from "../content/globalContent.json";

/**
 * SevenX Global: international performance marketing, media buying, lead
 * generation and affiliate growth, with iGaming as one specialist vertical.
 * Hub for the /global/<service> pages. Also reachable via the Region Toggle.
 */
export default function GlobalHome() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(t);
  }, []);

  useSeo({ title: content.hub.title, description: content.hub.description, path: content.hub.path });

  return (
    <ContentProvider region="global">
      <div className="relative min-h-screen bg-[#050B1F] text-[#E6EDFF] bg-noise overflow-hidden">
        <ComplianceBanner />
        {!loaded && <Preloader />}
        <Navbar offset={BANNER_HEIGHT} />
        <RegionToggle current="global" />
        <main className={`${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-700 pt-8`}>
          <Hero />
          <BigWordmark />
          <Stats />
          <Capabilities />
          <WhoWeWorkWith />
          <AcquisitionEcosystem />
          <CoreServices />
          <AffiliateTeam />
          <AffiliateRecruitment />
          <SubAffiliate />
          <CommercialModels />
          <IGamingGrowth />
          <Services />

          {/* Long-form compliance block — required for iGaming SEO trust */}
          <section className="relative px-6 md:px-10 py-16 md:py-24 border-t border-[#0F1B36]" data-testid="jurisdiction-notice">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-3">
                  <span className="bg-[#00A3FF] text-[#050B1F] px-1 font-bold mr-2">NO_004</span> JURISDICTIONS &amp; COMPLIANCE
                </div>
                <h2 className="font-display text-3xl md:text-5xl uppercase leading-[0.9] tracking-tight text-[#E6EDFF]">
                  LICENSED<br/>MARKETS<br/><span className="text-[#00A3FF]">ONLY.</span>
                </h2>
              </div>
              <div className="md:col-span-8 space-y-4 font-mono text-[12px] md:text-sm text-[#9BB0D6] leading-[1.8]">
                <p>
                  SevenX Media is a B2B marketing, acquisition and affiliate service provider. We are not a gambling operator. Our iGaming, sportsbook, casino, poker, lottery, fantasy sports and crypto/Web3 services are provided <strong className="text-white">only for operators holding valid licenses</strong> in the jurisdictions they target, such as those issued by <strong className="text-white">MGA (Malta), UKGC (United Kingdom), KGC (Kahnawake), Curacao Gaming, Ontario iGO (Canada), Colombia Coljuegos, Brazil SPA and equivalent regulators</strong>.
                </p>
                <p>
                  All activity is subject to applicable laws, platform policies, advertiser terms and affiliate-program requirements. Sub-affiliate activity takes place only where the relevant affiliate program permits it. We do not provide legal, licensing or regulatory advice.
                </p>
                <p className="text-[#00A3FF]">
                  <strong>These services are strictly not offered in India</strong>, in US states where real-money gambling is prohibited, or in any market where iGaming or crypto activities are restricted. India-based enquiries are directed to our
                  {" "}<a href="/?region=in" className="underline hover:text-white" data-testid="link-back-to-india">SevenX India site</a>{" "}
                  which covers only fully-compliant Indian verticals (fintech, insurance, real estate, EdTech, D2C, SEBI-registered advisory and crypto/forex <em>education</em>).
                </p>
                <p>
                  All advertising respects age-gating (18+/21+ per jurisdiction), responsible gaming disclosures, source-of-funds requirements and every applicable data-protection law including GDPR (EU) and India&apos;s DPDP Act 2023.
                </p>
              </div>
            </div>
          </section>

          <MarketExpansion />
          <TrackingOptimization />
          <Verticals />
          <CaseStudies />
          <Partners />
          <Testimonials />
          <WhyChoose />
          <GlobalFaq />
          <Contact />
          <Footer />
        </main>
      </div>
    </ContentProvider>
  );
}
