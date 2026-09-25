import React from "react";
import { ArrowUpRight, ArrowDown, ArrowRight } from "lucide-react";
import { selectIntent } from "../../lib/intent";

// Shared building blocks for the Global hub and service pages, in the site's
// existing visual language (mono NO_ labels, display headings, hairlines).

export function Section({ id, className = "", children, testId }) {
  return (
    <section
      id={id}
      data-testid={testId}
      className={`relative px-6 md:px-10 py-20 md:py-28 border-t border-[#0F1B36] ${className}`}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ no, children }) {
  return (
    <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-3">
      <span className="bg-[#00A3FF] text-[#050B1F] px-1 font-bold mr-2">{no}</span> {children}
    </div>
  );
}

export function SectionHeader({ no, label, title, aside, as: Tag = "h2" }) {
  return (
    <div className="flex items-start justify-between gap-6 flex-wrap mb-10 md:mb-14">
      <div className="max-w-3xl">
        <Eyebrow no={no}>{label}</Eyebrow>
        <Tag className="font-display text-4xl md:text-6xl uppercase leading-[0.92] tracking-tight text-[#E6EDFF] text-balance">
          {title}
        </Tag>
      </div>
      {aside && (
        <p className="font-mono text-[11px] md:text-xs text-[#9BB0D6] leading-[1.8] max-w-sm">{aside}</p>
      )}
    </div>
  );
}

export function Body({ children, className = "" }) {
  return (
    <p className={`font-mono text-[12px] md:text-sm text-[#9BB0D6] leading-[1.85] max-w-3xl ${className}`}>
      {children}
    </p>
  );
}

// Scrolls to the form and pre-selects the matching "What do you need?" option.
export function IntentCta({ label, intent, href = "#contact", variant = "solid", testId }) {
  const solid = variant === "solid";
  return (
    <a
      href={href}
      onClick={() => selectIntent(intent, label)}
      data-testid={testId}
      className={`group inline-flex items-center gap-4 px-6 py-4 font-mono text-xs tracking-widest uppercase transition-colors border ${
        solid
          ? "bg-[#0057FF] border-[#0057FF] text-white hover:bg-[#00A3FF] hover:border-[#00A3FF] hover:text-[#050B1F]"
          : "border-[#0057FF] text-white bg-[#0057FF]/10 hover:bg-[#0057FF]"
      }`}
    >
      <span>{label}</span>
      <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" strokeWidth={2.5} />
    </a>
  );
}

// Numbered step strip that wraps into a grid.
export function StepStrip({ steps }) {
  return (
    <ol className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 border-t border-l border-[#1B2A4A]">
      {steps.map((s, i) => (
        <li key={s.t || s} className="relative border-r border-b border-[#1B2A4A] p-4 md:p-5 min-h-[120px]">
          <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-3">
            {String(i + 1).padStart(2, "0")}
            {i < steps.length - 1 && <ArrowRight className="inline w-3 h-3 ml-2 opacity-60" />}
          </div>
          <div className="font-display text-lg md:text-xl uppercase leading-tight text-[#E6EDFF]">{s.t || s}</div>
          {s.d && <div className="mt-2 font-mono text-[11px] text-[#6B7FA8] leading-[1.6]">{s.d}</div>}
        </li>
      ))}
    </ol>
  );
}

// Vertical flow diagram; `highlight` marks the SevenX node.
export function FlowDiagram({ nodes, highlight = "SevenX", note }) {
  return (
    <div>
      <ol className="flex flex-col items-stretch max-w-md">
        {nodes.map((n, i) => {
          const hot = n === highlight;
          return (
            <li key={n} className="flex flex-col items-center">
              <div
                className={`w-full text-center px-4 py-3 font-mono text-[11px] md:text-xs tracking-widest uppercase border ${
                  hot
                    ? "bg-[#0057FF] border-[#0057FF] text-white shadow-[0_0_24px_rgba(0,87,255,0.45)]"
                    : "border-[#1B2A4A] text-[#E6EDFF] bg-[#0A1128]/70"
                }`}
              >
                {n}
              </div>
              {i < nodes.length - 1 && <ArrowDown className="w-4 h-4 my-1.5 text-[#00A3FF]" strokeWidth={2} />}
            </li>
          );
        })}
      </ol>
      {note && (
        <p className="mt-5 max-w-md font-mono text-[10px] md:text-[11px] text-[#6B7FA8] leading-[1.7] border-l-2 border-[#0057FF] pl-3">
          {note}
        </p>
      )}
    </div>
  );
}

// Two-column title/description list.
export function ItemGrid({ items, cols = "md:grid-cols-2" }) {
  return (
    <ul className={`grid grid-cols-1 ${cols} border-t border-[#1B2A4A]`}>
      {items.map((it) => (
        <li key={it.t} className="border-b border-[#1B2A4A] py-4 md:pr-8 flex gap-4">
          <span className="mt-1.5 w-1.5 h-1.5 bg-[#00A3FF] flex-shrink-0" />
          <div>
            <div className="font-display text-lg md:text-xl uppercase text-[#E6EDFF] leading-tight">{it.t}</div>
            {it.d && <div className="mt-1 font-mono text-[11px] md:text-xs text-[#9BB0D6] leading-[1.7]">{it.d}</div>}
          </div>
        </li>
      ))}
    </ul>
  );
}
