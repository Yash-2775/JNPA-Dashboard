import { useEffect, useMemo, useState } from "react";
import logo from "../assets/jnpa-logo.png";
import FilterBar from "../components/FilterBar";
import KpiCard from "../components/KpiCard";
import { fetchDashboardData } from "../services/dashboardApi";

export default function YardInventory() {
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

  /* ================= DERIVED KPI METRICS ================= */

  const totals = useMemo(() => {
    return currentList.reduce(
      (acc, m) => {
        acc.containerTons += m.contTons || 0;
        acc.bulkTons += m.bulkTotalTons || 0;
        acc.containerVessels += m.contVessel || 0;
        acc.bulkVessels += m.bulkVessel || 0;
        return acc;
      },
      {
        containerTons: 0,
        bulkTons: 0,
        containerVessels: 0,
        bulkVessels: 0,
      }
    );
  }, [currentList]);

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <div className="flex items-center gap-2 mb-8">
          <img src={logo} alt="JNPA" className="w-10 h-10" />
          <span className="font-semibold text-lg">JNPA</span>
        </div>

        {[
          "Container Terminals",
          "Vessel Report",
          "Yard Inventory",
          "CFS Pendency",
          "ICD Pendency",
          "Gate Movement",
        ].map((item) => (
          <div
            key={item}
            className={`w-full px-4 py-2 rounded-lg mb-2 text-sm ${
              item === "Yard Inventory"
                ? "bg-blue-100 text-blue-700"
                : "bg-slate-50"
            }`}
          >
            {item}
          </div>
        ))}
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-6 space-y-6">
        {/* FILTER BAR */}
        <FilterBar />

        {/* HEADER */}
        <div className="bg-white rounded-lg shadow p-4 flex justify-between">
          <h1 className="text-2xl font-semibold">YARD INVENTORY</h1>
          <span className="text-sm text-slate-500">
            Units: Tons / Count
          </span>
        </div>

        {/* ================= KPI STRIP ================= */}
        <div className="bg-blue-100 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KpiCard
              title="Total Container Tons"
              value={(totals.containerTons / 1e6).toFixed(2) + " M"}
            />
            <KpiCard
              title="Total Bulk Tons"
              value={(totals.bulkTons / 1e6).toFixed(2) + " M"}
            />
            <KpiCard
              title="Container Vessels"
              value={totals.containerVessels}
            />
            <KpiCard
              title="Bulk Vessels"
              value={totals.bulkVessels}
            />
          </div>
        </div>

        {/* ================= PANELS (MATCH IMAGE UX) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <NoDataCard title="Yard Occupancy | Daily" />
          <NoDataCard title="Yard Inventory by Terminals" large />
          <NoDataCard title="Avg Yard Dwell Time | Daily" />
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
