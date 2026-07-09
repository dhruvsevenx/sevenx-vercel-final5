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
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center bg-noise">
      <div className="absolute top-6 left-6 font-mono text-xs text-[#FF0033] tracking-widest">
        <span className="animate-blink">■</span> LOADING . . .
      </div>
      <div className="absolute top-6 right-6 font-mono text-xs text-[#FF0033] tracking-widest">
        • 2026
      </div>

      <div className="text-center">
        <div className="font-display text-[18vw] leading-[0.85] text-[#E3E8EC]">
          {pct}%
        </div>
        <div className="font-mono text-[11px] tracking-[0.4em] text-[#FF0033] mt-4">
          // SEVENX LOADING . . .
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[10px] text-[#666]">
        <span>28°36'48.99"N / 77°13'19.99"E</span>
        <span>SEVENX™ // MEDIA / 2026</span>
      </div>
    </div>
  );
}
