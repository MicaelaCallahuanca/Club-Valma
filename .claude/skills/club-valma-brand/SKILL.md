---
name: club-valma-brand
description: Club Valma's real brand design tokens — colors, typography, button/card styles, and tone of voice, extracted directly from the live site (clubvalma.com) rather than guessed. Use this skill whenever writing or reviewing anything visual or brand-facing for Club Valma — HTML/CSS, mockups, landing pages, emails, UI copy, buttons, cards, color choices, or any prompt that mentions "Club Valma" alongside design, branding, colores, estilo, marca, or UI. Trigger it even if the user doesn't explicitly ask for "brand guidelines" — e.g. requests like "hazme un botón para la web", "crea una tarjeta de oferta", "qué color uso para el CTA" should all pull this in first, since guessing colors instead of using this skill produces off-brand output.
---

# Club Valma Brand

Club Valma (clubvalma.com) is a Spanish "grupo de compras" (purchasing club/buying
group) founded in 2007 by Valma Inversiones. It negotiates discounts with top-tier
providers (mobile telephony, insurance, fuel, etc.) on behalf of ~3,000 members
("socios"). Keep that context in mind for copy: the brand's whole value proposition
is trust + negotiating power + savings, not novelty or excitement.

**Before producing any visual or brand-facing output for Club Valma — HTML/CSS,
a mockup, a button, a card, an email, marketing copy — read
[references/design-tokens.md](references/design-tokens.md) first** and use the exact
values there (hex codes, gradients, shadow recipe, border-radius, font-family). Don't
approximate or invent adjacent colors/fonts "in the spirit of" the brand — the tokens
file has the real, verified values, and off-by-a-shade colors or a swapped font are
immediately noticeable as wrong once placed next to the real site.

## Why these tokens are trustworthy

The site runs on a repurposed Bootstrap e-commerce template (you'll see leftover
class names like `header-organic-food` or `.jewellery-body` in the CSS). That
template ships with half a dozen unused color themes and font families for product
categories Club Valma never sells (furniture, jewellery, electronics). The tokens in
this skill were filtered to **only what actually renders on the live pages** —
verified by cross-checking which CSS classes/selectors appear in the real page HTML,
not just what's defined somewhere in `main.css`. Extracted 2026-07-18 directly from
clubvalma.com's markup, stylesheet, and logo files.

If you're ever unsure whether a color or style you found in a template dump is real
brand or leftover cruft, the rule of thumb is: **if it's not in
design-tokens.md, don't use it** — re-derive from the live site instead of guessing.

## Quick reference

- **Primary color**: blue gradient `#01a3e5 → #004791` — this is the actual brand
  color (matches the logo). Use it for primary CTAs, highlighted badges, and any
  "this is Club Valma" accent.
- **Secondary/accent**: green gradient `#a0d05e → #41b153` — hover states and
  secondary highlights only, not a primary surface.
- **Typography**: `"Maven Pro", sans-serif` for everything — body and headings alike.
  See the tokens file for why Roboto and a script font show up in the page source but
  should **not** be used.
- **Tone**: mid-formal, trust-focused, benefit-driven. Words like "socios",
  "confianza", "ahorro". Not playful, not stiff-corporate either.

Full details, exact CSS recipes, and rationale are in
[references/design-tokens.md](references/design-tokens.md) — open it rather than
relying on this summary when you're actually writing code or copy.
