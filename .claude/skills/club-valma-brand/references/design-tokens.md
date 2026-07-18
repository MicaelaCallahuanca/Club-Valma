# Club Valma — Design Tokens

Source of truth: live HTML, `main.css`, and logo assets on clubvalma.com, pulled and
verified via `curl`/`grep` on 2026-07-18 (not guessed, not inferred from screenshots).
Pages checked: homepage (`/`) and `/que-es-club-valma`. `/ofertas` redirects to a
login-gated `/acceder` and wasn't reachable without a member session — if you need
its exact markup later, the tokens below should still hold since it's the same
template/stylesheet.

## Why some colors/fonts are excluded

clubvalma.com runs on a repurposed Bootstrap e-commerce template. `main.css` still
ships full color/font themes for product categories the template supports but Club
Valma never used: "organic food" (Club Valma's actual theme — the class names just
kept that name), "furniture", "jewellery", "electronics". Each theme has its own
gradient pair and sometimes its own font-family, and they're all defined in the same
stylesheet whether or not anything on the live pages references them.

To find the *real* tokens, every color/font below was checked against which CSS
selectors actually appear in the rendered HTML of the two pages fetched — not just
which rules exist in `main.css`. Anything that only shows up in an unused theme
(`.jewellery-body`, `.furniture-*`, `.header-electronics`, etc.) is called out
explicitly as **excluded** so it doesn't get reused by mistake.

## Colors

### Primary — the brand color

```
linear-gradient(135deg, #01a3e5 0%, #004791 100%)
```

| Token | Hex | Notes |
|---|---|---|
| `brand-blue-light` | `#01a3e5` | bright cyan-blue, gradient start |
| `brand-blue-dark` | `#004791` | deep navy blue, gradient end |

This gradient is THE Club Valma color — it matches the blue mosaic icon in the logo
and is used site-wide for: primary CTA/button accents (`.view-btn.color-2`,
`.submit-btn.color-2`), price/discount badge backgrounds, breadcrumb backgrounds,
banner backgrounds, and hover-state text gradients on nav links and headings. When in
doubt about "what color is Club Valma," it's this gradient — use both stops together
via `linear-gradient(135deg, #01a3e5 0%, #004791 100%)` rather than flattening it to
a single hex, since the real site never uses either stop as a flat fill.

### Secondary / accent

```
linear-gradient(135deg, #a0d05e 0%, #41b153 100%)
```

Light green to medium green. Used only for hover states (e.g. carousel nav arrows on
the organic banner) — a secondary highlight, never a primary surface or a CTA
background. Reach for this when you need a "success" or secondary-emphasis accent
distinct from the primary blue, not as an alternative brand color.

### Text

| Token | Hex | Usage |
|---|---|---|
| `text-body` | `#555555` | body copy, default `<body>` color |
| `text-dark` | `#333333` | headings, button labels, emphasized UI text |
| `text-muted` | `#cccccc` | disabled/strikethrough text (e.g. old price) |

### Neutrals / surfaces

| Token | Hex | Usage |
|---|---|---|
| `surface-white` | `#fff` | cards, primary CTA button background |
| `surface-tint` | `#f9fafc` | very light section background for alternation |
| `surface-gray` | `#eeeeee` / `#eee` | secondary section background |
| `border-gray` | `#ddd` | dividers, card borders |

### Explicitly excluded (template leftovers — do not use)

These appear in `main.css` but belong to theme variants that never render on Club
Valma's live pages (confirmed: their classes don't appear in the fetched HTML):

- Purple `#6809c8` / `#8e2aeb` — "jewellery" theme
- Pink `#f6497c` — "jewellery" theme
- Yellow `#fbd600` — unused utility theme
- Orange `#f9a448` — unused utility theme
- Bright green/cyan pair `#8eed88` / `#3fcaff` — "furniture" theme

If a design tool, template dump, or old mockup suggests one of these is "on brand,"
it isn't — it's demo content from the template Club Valma's site was built on.

## Typography

**Real, applied font: `"Maven Pro", sans-serif`** (weights loaded: 400, 500, 700).
This is the only font-family that actually reaches rendered Club Valma pages — it's
set on `body` and inherited by headings. Base body copy is `14px`, `line-height:
1.5em`, weight `400`.

```css
font-family: "Maven Pro", sans-serif;
```

### Excluded (loaded but unused)

The page's `<head>` also pulls in Google Fonts for **Roboto** (300/400/500/700) and
**Great Vibes** (a cursive/script font). Tracing their CSS usage: Roboto only applies
to `.jewellery-body` and its descendants — the unused jewellery theme — and Great
Vibes only applies via `.second-font`, a class that doesn't appear anywhere in the
live markup. Neither reaches an actual Club Valma page. Don't treat either as a
Club Valma brand font, even though they're sitting right there in the `<link>` tags —
that's template residue, not a design decision.

## Buttons

Primary CTA (e.g. "Hazte socio", "Acceder", "¡Llámanos Ya!") — a white pill button,
not a filled-blue button:

```css
.cart-btn {
  background: #fff;
  height: 40px;
  width: 174px; /* adjust to content, not a hard rule */
  border-radius: 3px;
  box-shadow: 2.828px 2.828px 15px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.cart-btn span {
  color: #333333;
  font-weight: 700;
  text-transform: uppercase;
}
```

On hover, an icon slides in via a `0.3s ease` transform transition (icon translates
up into view while the label stays put) — if you're building an interactive CTA,
that subtle icon-reveal-on-hover is part of the real pattern, not just a static pill.

Secondary buttons (`.view-btn.color-2`, used for "+ Info", "Comprar") use the primary
blue gradient as their background/accent instead of white.

## Cards

Product/offer cards share the exact same shadow recipe as the CTA buttons — treat
`2.828px 2.828px 15px 0px rgba(0, 0, 0, 0.1)` as a site-wide elevation token, not a
one-off:

```css
.offer-card {
  background: #fff;
  border-radius: 3px;
  box-shadow: 2.828px 2.828px 15px 0px rgba(0, 0, 0, 0.1);
}
```

Old/strikethrough prices use `color: #cccccc`. Featured/highlighted section titles
(e.g. "Promociones destacadas") are centered headings; badges and breadcrumbs inside
those sections use the primary blue gradient as a background fill, not the secondary
green.

## Logo

Wordmark "CLUB VALMA", bold sans-serif, all caps: "CLUB" in dark gray/near-black,
"VALMA" in blue, paired with an abstract mosaic/pixel-square icon rendered in the
primary blue gradient. Files on the live site: `/assets/img/logo/logo2.png` (main
header), `/assets/img/logo/f-logo2.png` (footer variant), favicon at `/favicon.png`.
Don't recolor or re-typeset the wordmark — treat the logo file itself as the
reference, this section is just so you recognize it in context.

## Tone of voice

Club Valma's own copy (from `/que-es-club-valma`) is mid-formal and institutional but
member- and trust-focused — not stiff-corporate, not casual either. Recurring
vocabulary: "socios" (members, never "usuarios" or "clientes"), "confianza mutua",
"relación a largo plazo", "descuentos", "marcas de primer nivel". The value
proposition is always framed as *collective negotiating power → real savings*, with
an emphasis on longevity and trust rather than urgency or hype. Avoid exclamation-
heavy hype copy or startup-casual phrasing ("¡Descubre ya las mejores ofertas!!") —
match the calmer, reassurance-first register of the real site instead.
