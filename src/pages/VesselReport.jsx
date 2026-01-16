import { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/jnpa-logo.png";
import FilterBar from "../components/FilterBar";
import KpiCard from "../components/KpiCard";
import { fetchDashboardData } from "../services/dashboardApi";

export default function VesselReport() {
  const [currentList, setCurrentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData()
      .then((data) => {
        setCurrentList(data.currentList || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ================= DERIVED METRICS ================= */

  const totalVessels = useMemo(() => {
    return currentList.reduce(
      (sum, m) => sum + (m.contVessel || 0),
      0
    );
  }, [currentList]);

  const terminalCount = 6;

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <div className="flex items-center gap-2 mb-8">
          <img src={logo} alt="JNPA" className="w-10 h-10" />
          <span className="font-semibold text-lg">JNPA</span>
        </div>

        <nav className="space-y-2">
          <NavLink
            to="/container-terminals"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "bg-slate-50 hover:bg-blue-100"
              }`
            }
          >
            Container Terminals
          </NavLink>

          <NavLink
            to="/vessel-report"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "bg-slate-50 hover:bg-blue-100"
              }`
            }
          >
            Vessel Report
          </NavLink>

          <NavLink
            to="/yard-inventory"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "bg-slate-50 hover:bg-blue-100"
              }`
            }
          >
            Yard Inventory
          </NavLink>

          <NavLink
            to="/cfs-pendency"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "bg-slate-50 hover:bg-blue-100"
              }`
            }
          >
            CFS Pendency
          </NavLink>

          <NavLink
            to="/icd-pendency"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "bg-slate-50 hover:bg-blue-100"
              }`
            }
          >
            ICD Pendency
          </NavLink>

          <NavLink
            to="/gate-movement"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "bg-slate-50 hover:bg-blue-100"
              }`
            }
          >
            Gate Movement
          </NavLink>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 space-y-6">
        <FilterBar />

        {/* HEADER */}
        <div className="bg-white rounded-lg shadow p-4 flex justify-between">
          <h1 className="text-2xl font-semibold">CONTAINER VESSEL</h1>
          <span className="text-sm text-slate-500">
            Units: Hours / Count
          </span>
        </div>

        {/* KPIs */}
        <div className="bg-blue-100 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KpiCard
              title="Sailed Vessel | Daily"
              value="—"
              subtitle="No daily data available"
            />
            <KpiCard
              title="No. of Terminals"
              value={terminalCount}
            />
            <KpiCard
              title="Total Idle Berth"
              value="—"
              subtitle="Not available in API"
            />
          </div>
        </div>

        {/* PANELS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <NoDataCard title="Berth Hours" />
          <NoDataCard title="Vessel by Terminals" large />
          <NoDataCard title="Avg Berth Stay in Hours by Terminals | Daily" />
        </div>
      </main>
    </div>
  );
}

/* ================= REUSABLE ================= */

function NoDataCard({ title, large }) {
  return (
    <div
      className={`bg-white rounded-lg shadow p-4 ${
        large ? "min-h-[300px]" : "min-h-[180px]"
      }`}
    >
      <h3 className="text-sm font-semibold mb-4">{title}</h3>
      <div className="flex items-center justify-center h-full text-slate-500">
        No Data Found
      </div>
    </div>
  );
}
