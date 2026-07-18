export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* faint gradient wash, kept quiet so the price card stays the focal point */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] bg-gradient-to-br from-brand-light/10 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div className="animate-[fade-up_0.6s_ease-out_backwards]">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-gray bg-surface-tint px-3 py-1 text-xs font-semibold text-brand-dark">
            Club de compras · desde 2007
          </span>

          <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight text-text-dark sm:text-5xl">
            El poder de negociar en grupo, a tu favor.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-text-body">
            Más de 3.000 socios —particulares y empleados de pymes— pagan menos
            cada mes en energía, telefonía, seguros y tecnología gracias a las
            condiciones que negociamos por volumen con proveedores de primer
            nivel.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#hazte-socio"
              className="rounded-[3px] bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-wide text-text-dark shadow-card transition-transform hover:-translate-y-0.5"
            >
              Hazte socio gratis
            </a>
            <a
              href="#ofertas"
              className="text-sm font-semibold text-brand-dark underline decoration-brand-light/40 decoration-2 underline-offset-4 transition-colors hover:text-brand-light"
            >
              Ver ofertas destacadas →
            </a>
          </div>

          <p className="mt-6 text-xs text-text-body">
            Sin cuotas de alta. Sin permanencia. Cancela cuando quieras.
          </p>
        </div>

        {/* Signature moment: the real negotiated price, shown the way the site
            itself shows savings — old price struck through, socio price in the
            brand gradient. This is the actual product, not a generic hero graphic. */}
        <div className="relative animate-[fade-up_0.6s_ease-out_0.15s_backwards]">
          <div className="rounded-[3px] bg-white p-7 pb-7 shadow-card sm:pb-24">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-text-muted">
                Tarifa de luz · socio Club Valma
              </span>
              <span className="rounded-full bg-gradient-to-br from-brand-light to-brand-dark px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                −34%
              </span>
            </div>

            <div className="mt-5 flex items-end gap-3">
              <span className="bg-gradient-to-br from-brand-light to-brand-dark bg-clip-text text-5xl font-black tracking-tight text-transparent">
                41€
              </span>
              <span className="mb-1.5 text-sm text-text-muted line-through">
                62€
              </span>
              <span className="mb-1.5 text-sm text-text-body">/mes</span>
            </div>

            <p className="mt-4 text-sm text-text-body">
              Energía 100 % renovable, misma potencia, sin cambiar de contador.
            </p>
          </div>

          {/* small stat chip, overlapping the pb-24 reserved margin below the card
              content so it never sits on top of any text */}
          <div className="absolute -bottom-6 -left-6 hidden rounded-[3px] bg-white px-5 py-3 shadow-card sm:block">
            <p className="text-2xl font-black text-text-dark">3.000+</p>
            <p className="text-[11px] text-text-body">socios ahorrando</p>
          </div>
        </div>
      </div>
    </section>
  );
}
