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
import { ContentProvider } from "../context/ContentContext";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = "SevenX Media | Performance Marketing Agency India — Fintech, Insurance, D2C";
    }
  }, []);

  return (
    <ContentProvider region="india">
      <div className="relative min-h-screen bg-[#050B1F] text-[#E6EDFF] bg-noise overflow-hidden">
        {!loaded && <Preloader />}
        <Navbar />
        <RegionToggle current="india" />
        <main className={loaded ? "opacity-100 transition-opacity duration-700" : "opacity-0"}>
          <Hero />
          <BigWordmark />
          <Stats />
          <Services />
          <Verticals />
          <CaseStudies />
          <Partners />
          <Testimonials />
          <WhyChoose />
          <Contact />
          <Footer />
        </main>
      </div>
    </ContentProvider>
  );
}
