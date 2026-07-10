import React, { useEffect, useState } from "react";

export default function Preloader() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, Math.round((elapsed / 2000) * 100));
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050B1F] flex flex-col items-center justify-center bg-noise" data-testid="preloader">
      <div className="absolute top-6 left-6 font-mono text-xs text-[#00A3FF] tracking-widest">
        <span className="animate-blink">&#9632;</span> LOADING . . .
      </div>
      <div className="absolute top-6 right-6 font-mono text-xs text-[#00A3FF] tracking-widest">
        &bull; 2026
      </div>

      <div className="text-center">
        <div className="font-display text-[18vw] leading-[0.85] text-[#E6EDFF]">
          {pct}%
        </div>
        <div className="font-mono text-[11px] tracking-[0.4em] text-[#00A3FF] mt-4">
          // SEVENX LOADING . . .
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[10px] text-[#6B7FA8]">
        <span>28&deg;36&apos;48.99&quot;N / 77&deg;13&apos;19.99&quot;E</span>
        <span>SEVENX&trade; // MEDIA / 2026</span>
      </div>
    </div>
  );
}
