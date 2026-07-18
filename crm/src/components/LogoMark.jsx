// Original wordmark inspired by the real Club Valma logo (mosaic icon +
// two-tone text), rebuilt from scratch for this prototype.
export default function LogoMark({ className = "" }) {
  const tiles = [
    "bg-brand-dark/90", "bg-brand-light", "bg-brand-dark/60",
    "bg-brand-light/70", "bg-brand-dark", "bg-brand-light/40",
    "bg-brand-dark/40", "bg-brand-light/90", "bg-brand-dark/70",
  ];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="grid grid-cols-3 gap-[3px]" aria-hidden="true">
        {tiles.map((tile, i) => (
          <span key={i} className={`h-[6px] w-[6px] rounded-[1px] ${tile}`} />
        ))}
      </div>
      <span className="font-sans text-base font-black tracking-tight">
        <span className="text-text-dark">CLUB</span>{" "}
        <span className="text-brand-dark">VALMA</span>
      </span>
    </div>
  );
}
