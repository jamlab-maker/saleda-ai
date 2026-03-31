# Why this version is better than `saleda.ai` (section-by-section)

Comparison target: [`https://saleda.ai/`](https://saleda.ai/)

This doc explains why the multi-page version we built is stronger than the current site for **conversion (demo booking / lead capture)** and **trust (security / integrations / product comprehension)**, organized **by section**.  
(*Note: the “current site” references are based on the public page copy observed on 2026-03-31.*)

---

## 1) Hero: “claims” → “instant experience”

### Current `saleda.ai`
- Strong positioning exists (“Capture every lead. Never miss a call.”), but the hero provides limited **hands-on product validation**.
- Even with CTAs, visitors can’t quickly confirm product quality *before* committing to a demo flow.

### New version (`/saleda/index.html`, `/saleda/agents.html`)
- Adds an inline **Talk to Maya (Voice/Chat)** demo so visitors can confirm “this is real conversational intake” in 5–10 seconds.
- Shows **system status (Idle → Listening → Speaking)** via orb states, increasing perceived reliability (“it’s working right now”).
- Splits the conversion path into two clear tracks:
  - **Fast validation**: Talk to Maya
  - **Decision-making**: Pricing → Book a Demo

**Why it’s better**: the product is perceived as **immediately testable**, not just described—this directly impacts conversion.

---

## 2) Product: one-page repetition → task-based structure

### Current `saleda.ai`
Core messages repeat across the page:
- Capture / CRM integrations / full-context handoff / security
- “Built for high-volume legal intake”

The content is solid, but it’s harder for a buyer to **complete key tasks quickly** (verify integrations, scan security, understand pricing, test the agent).

### New version
- Home uses a **2×2 product grid** so the four core values are understood at a glance.
- Each card routes to a dedicated page that separates **information density from decision-making**:
  - Platform: workflow / analytics
  - Agents: live experience
  - Integrations: searchable list
  - Security: doc-style FAQ

**Why it’s better**: the IA is organized around buyer intent (validate → decide), reducing cognitive load and speeding up decisions.

---

## 3) Agents: static explanation → playground

### Current `saleda.ai`
There’s strong copy about “Maya AI Voice Agent” and testimonials, but the “talk to an agent” experience isn’t emphasized as an immediate, repeatable playground.

### New version (`/saleda/agents.html`)
- Voice + chat demos live side-by-side.
- **Scenario chips** (After-hours, Roundup, Camp Lejeune) fill the input instantly so people can test flows fast.
- Visitors can repeat the “qualification feel” in seconds.

**Why it’s better**: understanding shifts from reading to doing, lowering trust barriers before a booked demo.

---

## 4) Integrations: logo strip → searchable directory

### Current `saleda.ai`
Integrations are listed (“HubSpot, Salesforce, Twilio, Vonage, Zapier, 60+ more”) and linked to `/integrations`.

### New version (`/saleda/integrations.html`)
- Adds a **search input + live filtering** so users can instantly answer “do you integrate with X?”
- The page becomes a task-complete verification tool, not just branding.

**Why it’s better**: integrations are often a hard “no” gate in B2B—searchable UI reduces drop-off.

---

## 5) Security: marketing section → reviewer-friendly doc page

### Current `saleda.ai`
There’s a “Security & Compliance” section, but it’s not structured for quick scanning by security reviewers (encryption, access controls, audit logging).

### New version (`/saleda/security.html`)
- Breaks controls into clear cards (HIPAA / RBAC / encryption / reliability).
- Uses an **accordion FAQ** so dense content is scannable.

**Why it’s better**: security rarely increases conversion—it removes blockers. Doc-style structure reduces decision bottlenecks.

---

## 6) Pricing: static CTA → interactive toggle + estimator

### Current `saleda.ai`
CTA-driven flow exists, but there’s limited interactivity for buyers to self-validate rough pricing.

### New version (`/saleda/pricing.html`)
- **Monthly/annual** billing toggle.
- **Call-minutes slider → instant estimate updates** (demo formula).

**Why it’s better**: buyers can self-check budget fit, improving lead quality and reducing low-signal inquiries.

---

## 7) Site-wide UX/accessibility: consistent components + keyboard UX

### Improvements in the new version
- Shared design tokens (color/border/radius/buttons) keep visual consistency across pages.
- Skip link + focus-visible + roles/ARIA as baseline.
- Tabs/toggles/accordions are keyboard-operable.

**Why it’s better**: for B2B, “polished and trustworthy” beats flashy. Accessibility signals operational maturity.

---

## Appendix: file/page map

- `/saleda/index.html`: home + inline demo
- `/saleda/platform.html`: platform/workflow
- `/saleda/agents.html`: demo playground (scenario chips)
- `/saleda/integrations.html`: searchable integrations directory
- `/saleda/security.html`: doc-style security page + FAQ accordion
- `/saleda/pricing.html`: billing toggle + estimator
- `/saleda/assets/site.css`, `/saleda/assets/site.js`: shared styling/interactions

