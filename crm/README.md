# Club Valma — CRM interno (prototipo)

Panel interno para gestionar socios, empresas afiliadas, el pipeline
comercial y el catálogo de ofertas de Club Valma. React + Tailwind,
datos de ejemplo generados de forma determinista, sin backend todavía.

Colores, tipografía y estilo de tarjetas/botones vienen de la skill
`club-valma-brand` (`.claude/skills/club-valma-brand/`). Los colores de
estado (activo/pendiente/baja) y los del gráfico del dashboard son una
paleta funcional aparte, siguiendo la skill `dataviz` — están documentados
como tokens en `src/index.css` (bloque `@theme`, prefijo `status-*`).

## Ejecutar

```bash
npm install
npm run dev
```

## Estructura

- `src/data/mockData.js` — fuente única de datos de ejemplo (812 socios,
  16 empresas, 12 ofertas, 22 leads de pipeline), generados con un PRNG
  con semilla fija para que el dataset sea estable entre recargas. Las
  métricas del dashboard se derivan de aquí, no están hardcodeadas aparte.
- `src/pages/` — una vista por ruta: Dashboard, Socios, SocioDetalle,
  Empresas, Pipeline, Ofertas.
- `src/components/charts/` — gráficos simples (barras) construidos a mano
  en vez de una librería, siguiendo las especificaciones de marca de
  `dataviz` (barras de un solo color, extremos redondeados, sin leyenda
  en series únicas).
