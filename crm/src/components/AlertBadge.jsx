import { IconAlertTriangle } from "./icons";

// Reuses the critical status color (see index.css) — an alert is always a
// "needs follow-up" signal, never a brand or chart color.
export default function AlertBadge({ label, title }) {
  return (
    <span
      title={title}
      className="inline-flex items-center gap-1 rounded-full bg-status-critical-bg px-2 py-0.5 text-[11px] font-bold text-status-critical-text"
    >
      <IconAlertTriangle width={12} height={12} strokeWidth={2} />
      {label}
    </span>
  );
}
