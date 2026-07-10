import React, { useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useContent } from "../context/ContentContext";

const services = [
  "PERFORMANCE MARKETING",
  "LEAD GENERATION",
  "TRACKING & ATTRIBUTION",
  "BRAND & CREATIVE",
  "CRO",
  "WHATSAPP FUNNELS",
  "SEO / GEO",
  "OTHER",
];

// Configure in /app/frontend/.env  →  REACT_APP_SHEETS_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
const SHEETS_ENDPOINT = process.env.REACT_APP_SHEETS_ENDPOINT || "https://script.google.com/macros/s/AKfycbyqPCm4GSOUHqNvepSOVyvMJFxkQkX6EDqYM_TzwJ9qif90umxGRTuPIuvhxnBadhVn-w/exec";

export default function Contact() {
  const { region } = useContent();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    vertical: "",
    budget: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "MISSING FIELDS", description: "Name, email and message are required." });
      return;
    }

    setLoading(true);
    const payload = {
      ...form,
      region: region || "india",
      timestamp: new Date().toISOString(),
      page: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
    };

    // Local fallback (never lose a lead)
    try {
      const list = JSON.parse(localStorage.getItem("sevenx_leads") || "[]");
      list.push(payload);
      localStorage.setItem("sevenx_leads", JSON.stringify(list));
    } catch (_) { /* ignore */ }

    // Push to Google Sheets via Apps Script Web App (text/plain avoids CORS preflight)
    let sheetsOk = false;
    if (SHEETS_ENDPOINT) {
      try {
        await fetch(SHEETS_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
        sheetsOk = true;
      } catch (err) {
        console.error("Sheets webhook failed:", err);
      }
    }

    // GA4 conversion event
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        event_category: "contact_form",
        event_label: form.vertical || "unspecified",
        value: 1,
      });
    }

    setLoading(false);
    setSent(true);
    toast({
      title: sheetsOk || !SHEETS_ENDPOINT ? "TRANSMISSION SENT" : "SAVED LOCALLY",
      description: "Our team will reach out within 24 hours.",
    });
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", company: "", email: "", phone: "", vertical: "", budget: "", message: "" });
    }, 3400);
  };

  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <section id="contact" className="relative px-6 md:px-10 py-20 md:py-32 border-t border-[#0F1B36]" data-testid="contact-section">
      <div className="absolute inset-0 radial-blue opacity-30 pointer-events-none" />
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-3">
            <span className="bg-[#00A3FF] text-[#050B1F] px-1 font-bold mr-2">NO_001</span> WORK_WITH_US
          </div>
          <h3 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] tracking-tight text-[#E6EDFF]">
            {region === "global" ? (
              <>
                READY TO<br />
                LAUNCH IN<br />
                <span className="gradient-text">LICENSED MARKETS?</span>
              </>
            ) : (
              <>
                READY TO<br />
                LAUNCH IN<br />
                <span className="gradient-text">INDIA?</span>
              </>
            )}
          </h3>
          <p className="font-mono text-[12px] text-[#9BB0D6] leading-[1.8] uppercase mt-8 max-w-md">
            <span className="bg-[#00A3FF] text-[#050B1F] px-1 font-bold mr-2">NO_002</span>
            48-hour campaign turnaround. Vernacular pods per state. ROI-first thinking baked in from day zero.
          </p>

          <div className="mt-10 space-y-3 font-mono text-xs text-[#9BB0D6]">
            <div className="flex items-center gap-3">
              <span className="text-[#00A3FF]">■</span> INFO@SEVENXMEDIA.IN
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#00A3FF]">■</span> {region === "global" ? "MALTA \u00b7 CURA\u00c7AO \u00b7 DUBAI" : "NEW DELHI \u00b7 MUMBAI \u00b7 BENGALURU"}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#00A3FF]">■</span> {region === "global" ? "35\u00b053\u2032N / 14\u00b030\u2032E" : "28\u00b036\u203248.99\u2033N / 77\u00b013\u203219.99\u2033E"}
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <form onSubmit={submit} className="border border-[#1B2A4A] bg-[#0A1128]/70 p-6 md:p-8" data-testid="contact-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="NAME" idx="NO_001" value={form.name} onChange={upd("name")} required testId="input-name" />
              <Field label="COMPANY" idx="NO_002" value={form.company} onChange={upd("company")} testId="input-company" />
              <Field label="EMAIL" idx="NO_003" type="email" value={form.email} onChange={upd("email")} required testId="input-email" />
              <Field label="PHONE / WHATSAPP" idx="NO_004" value={form.phone} onChange={upd("phone")} placeholder={region === "global" ? "+ country code ..." : "+91 ..."} testId="input-phone" />
              <div className="md:col-span-2">
                <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-2">
                  <span className="bg-[#00A3FF] text-[#050B1F] px-1 font-bold mr-2">NO_005</span> VERTICAL
                </div>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <button
                      key={s}
                      type="button"
                      data-testid={`vertical-chip-${s.toLowerCase().replace(/[\s/]+/g, "-")}`}
                      onClick={() => setForm({ ...form, vertical: s })}
                      className={`px-3 py-2 font-mono text-[10px] tracking-widest border transition-all ${
                        form.vertical === s
                          ? "bg-[#00A3FF] text-[#050B1F] border-[#00A3FF]"
                          : "text-[#9BB0D6] border-[#1B2A4A] hover:border-[#00A3FF] hover:text-[#00A3FF]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <Field
                label={region === "global" ? "MONTHLY BUDGET (USD)" : "MONTHLY BUDGET (INR)"}
                idx="NO_006"
                value={form.budget}
                onChange={upd("budget")}
                className="md:col-span-2"
                placeholder={region === "global" ? "e.g. $25K - $250K" : "e.g. Rs 5L - Rs 25L"}
                testId="input-budget"
              />
              <div className="md:col-span-2">
                <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-2">
                  <span className="bg-[#00A3FF] text-[#050B1F] px-1 font-bold mr-2">NO_007</span> MESSAGE *
                </div>
                <textarea
                  value={form.message}
                  onChange={upd("message")}
                  rows={4}
                  required
                  data-testid="input-message"
                  placeholder={region === "global"
                    ? "Tell us about your product, licensed jurisdictions, languages and KPIs..."
                    : "Tell us about your product, target states, languages and KPIs..."}
                  className="w-full bg-transparent border border-[#1B2A4A] focus:border-[#00A3FF] outline-none px-4 py-3 font-mono text-sm text-[#E6EDFF] placeholder:text-[#3A517A] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sent || loading}
              data-testid="contact-submit-btn"
              className="mt-6 group w-full flex items-center justify-between bg-[#0057FF] text-white px-6 py-5 font-display text-xl md:text-2xl uppercase tracking-tight hover:bg-[#00A3FF] hover:text-[#050B1F] transition-colors disabled:opacity-70"
            >
              <span>
                {loading ? "TRANSMITTING..." : sent ? "TRANSMISSION SENT" : "SUBMIT TRANSMISSION"}
              </span>
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" strokeWidth={2.5} />
              ) : sent ? (
                <Check className="w-6 h-6" strokeWidth={3} />
              ) : (
                <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" strokeWidth={2.5} />
              )}
            </button>

            <p className="mt-4 font-mono text-[9px] text-[#6B7FA8] tracking-widest leading-relaxed">
              Your data is processed under India&apos;s DPDP Act 2023. We use it solely to respond to
              your enquiry. See our Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, idx, value, onChange, type = "text", required, className = "", placeholder = "", testId }) {
  return (
    <div className={className}>
      <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-2">
        <span className="bg-[#00A3FF] text-[#050B1F] px-1 font-bold mr-2">{idx}</span> {label}{required ? " *" : ""}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        data-testid={testId}
        className="w-full bg-transparent border border-[#1B2A4A] focus:border-[#00A3FF] outline-none px-4 py-3 font-mono text-sm text-[#E6EDFF] placeholder:text-[#3A517A] transition-colors"
      />
    </div>
  );
}
