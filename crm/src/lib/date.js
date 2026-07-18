// ISO date-only strings ("YYYY-MM-DD") represent a calendar date, not an
// instant. `new Date("YYYY-MM-DD")` parses that as UTC midnight per the
// ECMA-262 spec, so formatting it with local getters/toLocaleDateString
// rolls back a day for any viewer in a timezone behind UTC (e.g. "18 jul"
// silently becoming "17 jul"). Parse manually as a local date instead so
// the displayed day always matches the day the data actually encodes.
export function parseLocalDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const DEFAULT_OPTIONS = { day: "2-digit", month: "long", year: "numeric" };

export function formatFecha(iso, options = DEFAULT_OPTIONS) {
  if (!iso) return "—";
  return parseLocalDate(iso).toLocaleDateString("es-ES", options);
}

// For real timestamps (e.g. "última actualización"), not date-only calendar
// values — this IS an instant, so the normal `new Date(iso)` UTC parsing is
// correct here and needs no local-date workaround.
export function formatFechaHora(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
