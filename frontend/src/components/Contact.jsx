import React, { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const services = ["AFFILIATE MARKETING", "MEDIA BUYING", "TRACKING & ATTRIBUTION", "BRAND POSITIONING", "CONVERSION OPTIMIZATION", "TELEGRAM BOT FUNNELS", "SEO/GEO OPTIMIZATION", "OTHER"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", telegram: "", vertical: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "MISSING FIELDS", description: "Name, email and message are required." });
      return;
    }
    // Persist to localStorage as mock
    try {
      const list = JSON.parse(localStorage.getItem("sevenx_leads") || "[]");
      list.push({ ...form, ts: new Date().toISOString() });
      localStorage.setItem("sevenx_leads", JSON.stringify(list));
    } catch (e) { /* ignore */ }
    setSent(true);
    toast({ title: "TRANSMISSION SENT", description: "Our team will reach out within 24h." });
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", company: "", email: "", telegram: "", vertical: "", budget: "", message: "" });
    }, 3200);
  };

  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <section id="contact" className="relative px-6 md:px-10 py-20 md:py-32 border-t border-[#111]">
      <div className="absolute inset-0 radial-red opacity-30 pointer-events-none" />
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="font-mono text-[10px] text-[#FF0033] tracking-widest mb-3">
            <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">NO_001</span> WORK_WITH_US
          </div>
          <h3 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] tracking-tight text-[#E3E8EC]">
            READY TO<br/>
            LAUNCH YOUR<br/>
            <span className="text-[#FF0033]">BRAND?</span>
          </h3>
          <p className="font-mono text-[12px] text-[#999] leading-[1.8] uppercase mt-8 max-w-md">
            <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">NO_002</span>
            48-hour campaign turnaround. Dedicated pods per GEO. ROI-first thinking baked in from day zero.
          </p>

          <div className="mt-10 space-y-3 font-mono text-xs text-[#999]">
            <div className="flex items-center gap-3">
              <span className="text-[#FF0033]">■</span> INFO@SEVENXM.COM
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#FF0033]">■</span> NEW DELHI · DUBAI · MANILA
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#FF0033]">■</span> 28°36'48.99"N / 77°13'19.99"E
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <form onSubmit={submit} className="border border-[#1a1a1a] bg-black/60 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="NAME" idx="NO_001" value={form.name} onChange={upd("name")} required />
              <Field label="COMPANY" idx="NO_002" value={form.company} onChange={upd("company")} />
              <Field label="EMAIL" idx="NO_003" type="email" value={form.email} onChange={upd("email")} required />
              <Field label="TELEGRAM" idx="NO_004" value={form.telegram} onChange={upd("telegram")} />
              <div className="md:col-span-2">
                <div className="font-mono text-[10px] text-[#FF0033] tracking-widest mb-2">
                  <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">NO_005</span> VERTICAL
                </div>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, vertical: s })}
                      className={`px-3 py-2 font-mono text-[10px] tracking-widest border transition-all ${
                        form.vertical === s
                          ? "bg-[#FF0033] text-black border-[#FF0033]"
                          : "text-[#999] border-[#1a1a1a] hover:border-[#FF0033] hover:text-[#FF0033]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <Field label="MONTHLY BUDGET (USD)" idx="NO_006" value={form.budget} onChange={upd("budget")} className="md:col-span-2" placeholder="e.g. $10K — $50K" />
              <div className="md:col-span-2">
                <div className="font-mono text-[10px] text-[#FF0033] tracking-widest mb-2">
                  <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">NO_007</span> MESSAGE *
                </div>
                <textarea
                  value={form.message}
                  onChange={upd("message")}
                  rows={4}
                  required
                  placeholder="Tell us about your project, target GEOs, and KPIs..."
                  className="w-full bg-transparent border border-[#1a1a1a] focus:border-[#FF0033] outline-none px-4 py-3 font-mono text-sm text-[#E3E8EC] placeholder:text-[#444] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sent}
              className="mt-6 group w-full flex items-center justify-between bg-[#FF0033] text-black px-6 py-5 font-display text-xl md:text-2xl uppercase tracking-tight hover:bg-white transition-colors disabled:opacity-70"
            >
              <span>{sent ? "TRANSMISSION SENT" : "SUBMIT TRANSMISSION"}</span>
              {sent ? <Check className="w-6 h-6" strokeWidth={3} /> : <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" strokeWidth={2.5} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, idx, value, onChange, type = "text", required, className = "", placeholder = "" }) {
  return (
    <div className={className}>
      <div className="font-mono text-[10px] text-[#FF0033] tracking-widest mb-2">
        <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">{idx}</span> {label}{required ? " *" : ""}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border border-[#1a1a1a] focus:border-[#FF0033] outline-none px-4 py-3 font-mono text-sm text-[#E3E8EC] placeholder:text-[#444] transition-colors"
      />
    </div>
  );
}
