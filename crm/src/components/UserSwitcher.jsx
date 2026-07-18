import { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconCheck } from "./icons";

// Visual-only account switcher — no auth/permissions behind it yet, just
// enough UI to show the tool is built for a team, not a single login.
const USUARIOS = [
  { id: "u1", nombre: "Laura Moya", rol: "Gestión de socios", iniciales: "LM" },
  { id: "u2", nombre: "Rosa Aguilar", rol: "Administradora", iniciales: "RA" },
  { id: "u3", nombre: "Elena Campos", rol: "Comercial · Captación", iniciales: "EC" },
];

export default function UserSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(USUARIOS[0].id);
  const ref = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const activo = USUARIOS.find((u) => u.id === activeId);

  return (
    <div ref={ref} className="relative border-t border-border-gray p-4">
      {open && (
        <div className="absolute bottom-full left-4 right-4 mb-2 rounded-[3px] border border-border-gray bg-white p-1.5 shadow-card">
          <p className="px-2.5 pb-1.5 pt-1 text-[11px] font-bold uppercase tracking-wide text-text-muted">
            Cambiar de cuenta
          </p>
          {USUARIOS.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => {
                setActiveId(u.id);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-[3px] px-2.5 py-2 text-left hover:bg-surface-tint"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-light to-brand-dark text-xs font-bold text-white">
                {u.iniciales}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-text-dark">{u.nombre}</p>
                <p className="truncate text-xs text-text-muted">{u.rol}</p>
              </div>
              {u.id === activeId && (
                <IconCheck width={16} height={16} className="shrink-0 text-brand-dark" />
              )}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 rounded-[3px] px-2 py-2 text-left hover:bg-surface-tint"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-light to-brand-dark text-xs font-bold text-white">
          {activo.iniciales}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text-dark">{activo.nombre}</p>
          <p className="truncate text-xs text-text-muted">{activo.rol}</p>
        </div>
        <IconChevronDown width={16} height={16} className="shrink-0 text-text-muted" />
      </button>
    </div>
  );
}
