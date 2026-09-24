// Intent-specific CTAs pre-select the "What do you need?" option on the
// contact form and send a GA4 event, so leads arrive already qualified.

export const INTENT_EVENT = "sevenx:intent";

export function selectIntent(intent, ctaLabel) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(INTENT_EVENT, { detail: intent }));
  if (typeof window.gtag === "function") {
    window.gtag("event", "select_cta", { cta_label: ctaLabel, intent });
  }
}
