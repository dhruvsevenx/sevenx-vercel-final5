import React, { useState } from "react";
import { testimonials } from "../mock/mock";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  const prev = () => setI((v) => (v - 1 + testimonials.length) % testimonials.length);
  const next = () => setI((v) => (v + 1) % testimonials.length);

  return (
    <section className="relative px-6 md:px-10 py-20 md:py-32 border-t border-[#111] overflow-hidden">
      <div className="absolute inset-0 radial-red opacity-30" />
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <div className="font-mono text-[10px] text-[#FF0033] tracking-widest mb-3">
            <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">NO_001</span> CLIENT_FEEDBACK
          </div>
          <h3 className="font-display text-3xl md:text-4xl uppercase leading-[0.95] tracking-tight text-[#E3E8EC]">
            WHAT OUR<br/>
            <span className="text-[#FF0033]">CLIENTS SAY.</span>
          </h3>
        </div>

        <div className="md:col-span-9">
          <div className="relative border border-[#FF0033]/40 bg-[#0a0000]/60 p-8 md:p-12 red-glow">
            <Quote className="absolute top-6 right-6 w-10 h-10 text-[#FF0033]/40" strokeWidth={1} />
            <div className="font-mono text-[10px] text-[#FF6680] tracking-widest mb-6">{t.id} // TRANSCRIPT</div>
            <blockquote className="font-display text-2xl md:text-4xl leading-[1.15] tracking-tight text-[#E3E8EC] uppercase">
              “{t.quote}”
            </blockquote>
            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="font-mono text-[10px] text-[#999] tracking-widest">{t.author}</div>
                <div className="font-display text-lg text-[#FF0033] tracking-widest">{t.company}</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={prev} className="w-11 h-11 border border-[#FF0033] text-[#FF0033] hover:bg-[#FF0033] hover:text-black transition flex items-center justify-center">
                  <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                </button>
                <span className="font-mono text-xs text-[#999] w-16 text-center">
                  0{i + 1} / 0{testimonials.length}
                </span>
                <button onClick={next} className="w-11 h-11 border border-[#FF0033] text-[#FF0033] hover:bg-[#FF0033] hover:text-black transition flex items-center justify-center">
                  <ChevronRight className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
