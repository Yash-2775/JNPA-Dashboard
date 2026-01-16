import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/jnpa-logo.png";

const menu = [
  { label: "Container Terminals", path: "/container-terminals" },
  { label: "Vessel Report", path: "/vessel-report" },
  { label: "Yard Inventory", path: "/yard-inventory" },
  { label: "CFS Pendency", path: "/cfs-pendency" },
  { label: "ICD Pendency", path: "/icd-pendency" },
  { label: "Gate Movement", path: "/gate-movement" },
];

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-4 border-r border-slate-200">
        <div className="flex items-center gap-2 mb-8 px-2">
          <img src={logo} alt="JNPA Logo" className="w-10 h-10 object-contain" />
          <span className="font-bold text-lg text-slate-800 uppercase tracking-tight">JNPA</span>
        </div>

        <nav className="space-y-1">
          {menu.map((m) => (
            <NavLink
              key={m.path}
              to={m.path}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {m.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
           <Outlet />
        </div>
      </main>
    </div>
  );
}