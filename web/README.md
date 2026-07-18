# Club Valma — landing page prototype

Visual frontend prototype for the Club Valma benefits club landing page. React +
Tailwind, static example data, no backend yet.

Colors, typography, and button/card styles come from the `club-valma-brand`
skill (`.claude/skills/club-valma-brand/`) — extracted directly from the live
clubvalma.com site. See `references/design-tokens.md` there before changing
any visual token here.

## Run it

```bash
npm install
npm run dev
```

## Structure

- `src/components/` — one component per landing page section (Header, Hero,
  HowItWorks, OffersCatalog, CTASection, Footer)
- `src/index.css` — Tailwind v4 theme, mapping the brand tokens to CSS
  variables/utility classes (`brand-light`, `brand-dark`, `text-body`, etc.)
