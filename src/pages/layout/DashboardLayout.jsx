import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/jnpa-logo.png";

const menu = [
  { label: "Container Terminals", path: "/" },
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
      <aside className="w-64 bg-white shadow-lg p-4">
        <div className="flex items-center gap-2 mb-8">
          <img src={logo} className="w-10 h-10" />
          <span className="font-semibold text-lg">JNPA</span>
        </div>

        {menu.map((m) => (
          <NavLink
            key={m.path}
            to={m.path}
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg mb-2 text-sm ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "bg-slate-50 hover:bg-blue-100"
              }`
            }
          >
            {m.label}
          </NavLink>
        ))}
      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
