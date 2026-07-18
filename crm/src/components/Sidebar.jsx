import { NavLink } from "react-router-dom";
import LogoMark from "./LogoMark";
import UserSwitcher from "./UserSwitcher";
import { IconDashboard, IconUsers, IconBuilding, IconPipeline, IconTag } from "./icons";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: IconDashboard, end: true },
  { to: "/socios", label: "Socios", icon: IconUsers },
  { to: "/empresas", label: "Empresas afiliadas", icon: IconBuilding },
  { to: "/pipeline", label: "Pipeline comercial", icon: IconPipeline },
  { to: "/ofertas", label: "Catálogo de ofertas", icon: IconTag },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border-gray bg-white">
      <div className="flex h-16 items-center border-b border-border-gray px-6">
        <LogoMark />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-[3px] px-3 py-2.5 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-brand-dark/[0.07] text-brand-dark"
                  : "text-text-body hover:bg-surface-tint hover:text-text-dark"
              }`
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>

      <UserSwitcher />
    </aside>
  );
}
