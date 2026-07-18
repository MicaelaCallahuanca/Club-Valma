import Card from "./Card";

// Stat tile contract (dataviz skill): label (sentence case, no colon) · value
// (semibold, auto-compact) · optional helper text for context.
export default function StatTile({ label, value, helper }) {
  return (
    <Card className="p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </p>
      <p className="tabular-nums mt-2 text-3xl font-black text-text-dark">
        {value}
      </p>
      {helper && <p className="mt-1 text-xs text-text-body">{helper}</p>}
    </Card>
  );
}
