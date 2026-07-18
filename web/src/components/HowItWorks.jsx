const STEPS = [
  {
    number: "01",
    title: "Únete gratis",
    body: "Regístrate como particular o a través de tu empresa. Sin cuotas de alta ni letra pequeña.",
  },
  {
    number: "02",
    title: "Elige tus proveedores",
    body: "Compara las condiciones que hemos negociado en energía, telefonía, seguros y tecnología.",
  },
  {
    number: "03",
    title: "Empieza a ahorrar",
    body: "Cambia cuando quieras y paga el precio de socio cada mes, sin permanencia.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-surface-tint py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <h2 className="text-3xl font-black tracking-tight text-text-dark sm:text-4xl">
            Cómo funciona
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-body">
            Tres pasos, el mismo proceso desde 2007: unimos el volumen de
            miles de socios para conseguir mejores condiciones de las que
            conseguirías tú solo.
          </p>
        </div>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.number} className="relative">
              {i < STEPS.length - 1 && (
                <div
                  className="absolute left-0 top-6 hidden h-px w-full translate-x-[60%] bg-gradient-to-r from-border-gray to-transparent md:block"
                  aria-hidden="true"
                />
              )}
              <span className="bg-gradient-to-br from-brand-light to-brand-dark bg-clip-text text-4xl font-black text-transparent">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-bold text-text-dark">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
