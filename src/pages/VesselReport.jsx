import { useEffect, useState, useMemo } from "react";
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

  const terminalCount = 6;

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="space-y-6">
      <FilterBar />

      {/* HEADER */}
      <div className="bg-white rounded-lg shadow p-4 flex justify-between">
        <h1 className="text-2xl font-semibold uppercase">Container Vessel</h1>
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
    </div>
  );
}

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