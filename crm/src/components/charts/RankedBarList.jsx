// Ranking / magnitude comparison across named categories — still one hue
// (brand blue), per the dataviz skill: identity here is carried by the
// row label, not by color, so no categorical palette is needed.
export default function RankedBarList({ items, formatValue = (n) => n }) {
  const max = Math.max(...items.map((i) => i.count), 1);

  return (
    <ul className="space-y-4">
      {items.map((item) => {
        const pct = Math.max((item.count / max) * 100, 4);
        return (
          <li key={item.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="truncate text-sm font-semibold text-text-dark">
                {item.label}
              </span>
              <span className="tabular-nums shrink-0 text-sm font-bold text-brand-dark">
                {formatValue(item.count)}
              </span>
            </div>
            <div className="h-3.5 w-full overflow-hidden rounded-[4px] bg-surface-gray">
              <div
                className="h-full rounded-[4px] bg-gradient-to-r from-brand-light to-brand-dark"
                style={{ width: `${pct}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
