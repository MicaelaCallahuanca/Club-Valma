export default function CTASection() {
  return (
    <section
      id="hazte-socio"
      className="relative overflow-hidden bg-gradient-to-br from-brand-light to-brand-dark py-20"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          ¿Lista para empezar a ahorrar?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/85">
          Únete gratis a Club Valma y accede hoy mismo a las condiciones que
          negociamos con nuestros proveedores. Sin cuotas de alta, sin
          permanencia.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#registro"
            className="rounded-[3px] bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-wide text-text-dark shadow-card transition-transform hover:-translate-y-0.5"
          >
            Hazte socio
          </a>
          <a
            href="#empresas"
            className="text-sm font-semibold text-white underline decoration-white/40 decoration-2 underline-offset-4 hover:decoration-white"
          >
            Soy una empresa →
          </a>
        </div>
      </div>
    </section>
  );
}
