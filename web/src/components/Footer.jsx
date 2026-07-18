import LogoMark from "./LogoMark";

const COLUMNS = [
  {
    heading: "Productos",
    links: ["Ofertas destacadas", "Nuestras marcas"],
  },
  {
    heading: "Servicio a socios",
    links: ["Preguntas frecuentes", "Contactar"],
  },
  {
    heading: "Información",
    links: ["Política de privacidad", "Aviso legal", "Política de cookies"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-gray bg-surface-tint">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <LogoMark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-body">
              Club de compras que negocia condiciones para sus socios desde
              2007.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-bold uppercase tracking-wide text-text-dark">
                {col.heading}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-text-body transition-colors hover:text-brand-dark"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border-gray pt-8 text-xs text-text-body sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Club Valma. Todos los derechos reservados.</p>
          <p>Prototipo visual — datos de ejemplo, sin conexión a backend.</p>
        </div>
      </div>
    </footer>
  );
}
