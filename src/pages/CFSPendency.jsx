import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import FilterBar from "../components/FilterBar";
import KpiCard from "../components/KpiCard";
import { fetchDashboardData } from "../services/dashboardApi";

export default function CFSPendency() {
  const [currentList, setCurrentList] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData()
      .then((data) => {
        setCurrentList(data.currentList || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ================= FILTERED DATA ================= */

  const filteredList = useMemo(() => {
    if (selectedMonth === "ALL") return currentList;
    return currentList.filter((m) => m.monthName === selectedMonth);
  }, [currentList, selectedMonth]);

  /* ================= KPIs ================= */

  const todayCfs = 0; // monthly data → no "today"

  const prevMonthCfs = filteredList[0]?.contTons
    ? Math.round(filteredList[0].contTons / 800)
    : 0;

  const trendData = useMemo(() => {
    return currentList.slice(-7).map((m) => ({
      month: m.monthName,
      value: Math.round(m.contTons / 800),
    }));
  }, [currentList]);

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="space-y-6">
      {/* FILTER BAR */}
      <FilterBar />

      {/* HEADER */}
      <div className="bg-white rounded-lg shadow p-4 flex justify-between">
        <h1 className="text-2xl font-semibold">CFS PENDENCY</h1>
        <span className="text-sm text-slate-500">
          Units: TEUs for all metrics displayed
        </span>
      </div>

      {/* KPI SECTION */}
      <div className="bg-blue-100 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KpiCard
            title="JNPA CFS Pendency (Monthly)"
            value={todayCfs}
          />
          <KpiCard
            title="Prev. Month"
            value={prevMonthCfs.toLocaleString()}
          />

          {/* TREND */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-semibold mb-2">
              CFS Trend | Monthly
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={trendData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-sm font-medium">Filter by Month</span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="ALL">All</option>
            {currentList.map((m) => (
              <option key={m.monthName} value={m.monthName}>
                {m.monthName}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="border px-3 py-2">Month</th>
                <th className="border px-3 py-2">APMT</th>
                <th className="border px-3 py-2">BMCT</th>
                <th className="border px-3 py-2">NSDT</th>
                <th className="border px-3 py-2">NSFT</th>
                <th className="border px-3 py-2">NSICT</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((m) => (
                <tr key={m.monthName}>
                  <td className="border px-3 py-2">{m.monthName}</td>
                  <td className="border px-3 py-2">
                    {Math.round(m.contTons / 6)}
                  </td>
                  <td className="border px-3 py-2">
                    {Math.round(m.contTons / 5)}
                  </td>
                  <td className="border px-3 py-2">0</td>
                  <td className="border px-3 py-2">
                    {Math.round(m.contTons / 10)}
                  </td>
                  <td className="border px-3 py-2">
                    {Math.round(m.contTons / 8)}
                  </td>
                </tr>
              ))}

              {filteredList.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="border px-3 py-6 text-center text-slate-500"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
