import { NavLink } from "react-router-dom";
import logo from "../assets/jnpa-logo.png";

const navItems = [
  { label: "Container Terminals", path: "/container-terminals" },
  { label: "Vessel Report", path: "/vessel-report" },
  { label: "Yard Inventory", path: "/yard-inventory" },
  { label: "CFS Pendency", path: "/cfs-pendency" },
  { label: "ICD Pendency", path: "/icd-pendency" },
  { label: "Gate Movement", path: "/gate-movement" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-4">
      <div className="flex items-center gap-2 mb-8">
        <img src={logo} alt="JNPA" className="w-10 h-10" />
        <span className="font-semibold text-lg">JNPA</span>
      </div>

      {navItems.map(({ label, path }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `block w-full px-4 py-2 rounded-lg mb-2 text-sm ${
              isActive
                ? "bg-blue-100 text-blue-700 font-medium"
                : "bg-slate-50 hover:bg-blue-100"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </aside>
  );
}
