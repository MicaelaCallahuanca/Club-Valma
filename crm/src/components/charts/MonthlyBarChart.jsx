// Single-series magnitude chart: altas de socios por mes.
// One hue (brand blue) — sequential is the color job for "compare magnitude"
// per the dataviz skill; length encodes the value, color doesn't need to vary
// per bar. No legend: the card title already says what's plotted.
const PLOT_HEIGHT = 140;

export default function MonthlyBarChart({ data }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const gridSteps = [0.25, 0.5, 0.75, 1];

  return (
    <div>
      <div className="relative" style={{ height: PLOT_HEIGHT }}>
        {gridSteps.map((step) => (
          <div
            key={step}
            className="absolute inset-x-0 border-t border-border-gray/60"
            style={{ bottom: PLOT_HEIGHT * step }}
            aria-hidden="true"
          />
        ))}

        <div className="absolute inset-0 flex items-end justify-between gap-3 px-1">
          {data.map((d) => {
            const barHeight = Math.max((d.count / max) * PLOT_HEIGHT, 3);
            return (
              <div key={d.label} className="flex flex-1 flex-col items-center">
                <span className="tabular-nums mb-1 text-xs font-bold text-text-dark">
                  {d.count}
                </span>
                <div
                  className="w-full max-w-[28px] rounded-t-[4px] bg-gradient-to-t from-brand-dark to-brand-light"
                  style={{ height: barHeight }}
                  title={`${d.label}: ${d.count} altas`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-2 flex justify-between gap-3 border-t border-border-gray px-1 pt-2">
        {data.map((d) => (
          <span
            key={d.label}
            className="flex-1 text-center text-xs capitalize text-text-muted"
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}
