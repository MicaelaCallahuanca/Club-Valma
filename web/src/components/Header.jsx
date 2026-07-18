import LogoMark from "./LogoMark";

const NAV_LINKS = [
  { label: "Ofertas", href: "#ofertas" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Empresas", href: "#empresas" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-gray/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="shrink-0">
          <LogoMark />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-body transition-colors hover:text-brand-dark"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#acceder"
            className="hidden text-sm font-semibold text-text-dark transition-colors hover:text-brand-dark sm:block"
          >
            Acceder
          </a>
          <a
            href="#hazte-socio"
            className="rounded-[3px] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-text-dark shadow-card transition-shadow hover:shadow-md"
          >
            Hazte socio
          </a>
        </div>
      </div>
    </header>
  );
}
