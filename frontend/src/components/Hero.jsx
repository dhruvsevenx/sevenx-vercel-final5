import React, { Suspense, lazy, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { selectIntent } from "../lib/intent";

// three.js lives in its own chunk so it never blocks first paint.
const HeroGlobe = lazy(() => import("./HeroGlobe"));

function supportsWebGL2() {
  try {
    return !!(window.WebGL2RenderingContext && document.createElement("canvas").getContext("webgl2"));
  } catch (_e) {
    return false;
  }
}

// Quiet CSS orb shown while the globe loads, without WebGL, or if it fails.
function Orb() {
  return <div className="hero-orb" aria-hidden="true" />;
}

class GlobeBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <Orb /> : this.props.children;
  }
}

function HeroVisual() {
  const [webgl] = useState(supportsWebGL2);
  if (!webgl) return <Orb />;
  return (
    <GlobeBoundary>
      <Suspense fallback={<Orb />}>
        <HeroGlobe />
      </Suspense>
    </GlobeBoundary>
  );
}

const COPY = {
  global: {
    pill: ["SevenX Global", "Performance & affiliate growth"],
    title: (
      <>
        Performance marketing &amp; acquisition{" "}
        <span className="text-[#8EA3C7] [-webkit-text-fill-color:#8EA3C7]">across markets.</span>
      </>
    ),
    body:
      "From paid media and lead generation to affiliate management, publisher acquisition and sub-affiliate operations, SevenX gives ambitious companies an acquisition team built around measurable growth.",
    note: "Specialist iGaming affiliate growth for licensed operators. Never marketed in India or unlicensed markets.",
    primary: { label: "Talk to SevenX", href: "#contact" },
    secondary: { label: "Explore services", href: "#capabilities" },
    trust: ["Performance marketing", "Media buying", "Lead generation", "Affiliate management"],
  },
  india: {
    pill: ["SevenX Media", "Performance marketing, India"],
    title: (
      <>
        Performance marketing for{" "}
        <span className="text-[#8EA3C7] [-webkit-text-fill-color:#8EA3C7]">high-intent India.</span>
      </>
    ),
    body:
      "Fintech, insurance, real estate, EdTech, D2C, healthcare, SEBI-registered advisory and crypto & forex education. RBI, IRDAI, ASCI, SEBI and DPDP-compliant lead generation across 22+ Indian states.",
    note: null,
    primary: { label: "Start a project", href: "#contact" },
    secondary: { label: "See our services", href: "#services" },
    trust: ["42 brands scaled", "22 states", "8.4M+ qualified leads"],
  },
};

export default function Hero() {
  const { region } = useContent();
  const c = region === "global" ? COPY.global : COPY.india;

  return (
    <section id="top" className="hero-pm relative overflow-hidden" data-testid="hero-section">
      <div className="hero-pm-bg" aria-hidden="true" />
      <div className="hero-pm-grid" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center min-h-[100svh]">
        <div className="lg:col-span-7 hero-sans hero-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[13px] text-[#B8C4DC] backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4C8DFF] shadow-[0_0_10px_#4C8DFF]" />
            {c.pill[0]}
            <span className="hidden sm:inline text-[#7D8AA5]">· {c.pill[1]}</span>
          </div>

          <h1 className="hero-title mt-7 font-semibold text-[42px] leading-[1.04] sm:text-6xl lg:text-[72px] xl:text-[84px] tracking-[-0.035em] text-balance max-w-[16ch]">
            {c.title}
          </h1>

          <p className="mt-7 text-[17px] md:text-xl leading-relaxed text-[#9AA8C3] max-w-2xl">{c.body}</p>
          {c.note && <p className="mt-3 text-sm text-[#6F7C96] max-w-2xl">{c.note}</p>}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={c.primary.href}
              onClick={() => region === "global" && selectIntent("OTHER", c.primary.label)}
              data-testid="hero-cta-contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white text-[#070B16] px-6 py-3.5 text-[15px] font-medium hover:bg-[#E3E9F6] transition-colors"
            >
              {c.primary.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href={c.secondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 text-white px-6 py-3.5 text-[15px] font-medium hover:bg-white/[0.06] transition-colors"
            >
              {c.secondary.label}
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#76839E]">
            {c.trust.map((t, i) => (
              <li key={t} className="flex items-center gap-5">
                {i > 0 && <span className="hidden sm:block w-1 h-1 rounded-full bg-[#3A4661]" aria-hidden="true" />}
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 relative h-[340px] sm:h-[440px] lg:h-[640px] lg:-mr-16 xl:-mr-24">
          <HeroVisual />
        </div>
      </div>

      <div className="hero-pm-fade" aria-hidden="true" />
    </section>
  );
}
