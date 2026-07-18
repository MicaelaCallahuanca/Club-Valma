const OFFERS = [
  {
    category: "Seguros",
    title: "Seguro de salud",
    description:
      "Cobertura completa con la aseguradora líder del sector, sin periodos de carencia para los socios.",
    price: "34,90€",
    oldPrice: "49,90€",
    unit: "/mes",
    badge: "−30 % socios",
  },
  {
    category: "Energía",
    title: "Tarifa de luz",
    description:
      "Energía 100 % renovable a precio negociado, sin cambiar de contador ni de potencia.",
    price: "0,098€",
    oldPrice: "0,148€",
    unit: "/kWh",
    badge: "Sin permanencia",
  },
  {
    category: "Telefonía",
    title: "Móvil 20GB",
    description:
      "Llamadas ilimitadas y 20GB de datos con cobertura nacional, portabilidad incluida.",
    price: "9,90€",
    oldPrice: "14,90€",
    unit: "/mes",
    badge: "−33 % socios",
  },
];

function OfferCard({ offer }) {
  return (
    <article className="flex flex-col rounded-[3px] bg-white p-7 shadow-card transition-transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-brand-dark">
          {offer.category}
        </span>
        <span className="rounded-full bg-surface-tint px-2.5 py-1 text-[10px] font-bold uppercase text-text-body">
          {offer.badge}
        </span>
      </div>

      <h3 className="mt-3 text-xl font-bold text-text-dark">{offer.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-body">
        {offer.description}
      </p>

      <div className="mt-6 flex items-end gap-2 border-t border-border-gray pt-5">
        <span className="text-3xl font-black tracking-tight text-text-dark">
          {offer.price}
        </span>
        <span className="mb-1 text-sm text-text-muted line-through">
          {offer.oldPrice}
        </span>
        <span className="mb-1 text-sm text-text-body">{offer.unit}</span>
      </div>

      <a
        href="#hazte-socio"
        className="mt-6 inline-flex items-center justify-center rounded-[3px] bg-gradient-to-br from-brand-light to-brand-dark px-5 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-card transition-opacity hover:opacity-90"
      >
        Ver oferta
      </a>
    </article>
  );
}

export default function OffersCatalog() {
  return (
    <section id="ofertas" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black tracking-tight text-text-dark sm:text-4xl">
              Ofertas destacadas
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-body">
              Un ejemplo de lo que negociamos con nuestros proveedores. Las
              condiciones completas están disponibles al hacerte socio.
            </p>
          </div>
          <a
            href="#hazte-socio"
            className="hidden text-sm font-semibold text-brand-dark underline decoration-brand-light/40 decoration-2 underline-offset-4 hover:text-brand-light sm:block"
          >
            Ver todas las ofertas →
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {OFFERS.map((offer) => (
            <OfferCard key={offer.title} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
