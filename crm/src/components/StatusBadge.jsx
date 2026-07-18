// Reserved status palette (good/warning/neutral) — distinct from the brand's
// chart hue on purpose, so a state badge never gets mistaken for a data series.
// See src/index.css for the underlying tokens.
const STATUS_STYLES = {
  activo: { bg: "bg-status-good-bg", text: "text-status-good-text", dot: "bg-status-good-dot", label: "Activo" },
  "socio activo": { bg: "bg-status-good-bg", text: "text-status-good-text", dot: "bg-status-good-dot", label: "Socio activo" },
  pendiente: { bg: "bg-status-warn-bg", text: "text-status-warn-text", dot: "bg-status-warn-dot", label: "Pendiente" },
  baja: { bg: "bg-status-neutral-bg", text: "text-status-neutral-text", dot: "bg-status-neutral-dot", label: "Baja" },
  activa: { bg: "bg-status-good-bg", text: "text-status-good-text", dot: "bg-status-good-dot", label: "Activa" },
  pausada: { bg: "bg-status-neutral-bg", text: "text-status-neutral-text", dot: "bg-status-neutral-dot", label: "Pausada" },
  al_dia: { bg: "bg-status-good-bg", text: "text-status-good-text", dot: "bg-status-good-dot", label: "Al día" },
  vencido: { bg: "bg-status-critical-bg", text: "text-status-critical-text", dot: "bg-status-critical-dot", label: "Vencido" },
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.baja;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${style.bg} ${style.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
      {style.label}
    </span>
  );
}
