import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import logo from "../assets/jnpa-logo.png";
import FilterBar from "../components/FilterBar";
import KpiCard from "../components/KpiCard";
import { fetchDashboardData } from "../services/dashboardApi";

export default function GateMovement() {
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

  /* ---------------- DERIVED DATA ---------------- */

  const latestMonth = currentList[currentList.length - 1];
  const previousMonth = currentList[currentList.length - 2];

  const exportTrend = useMemo(
    () =>
      currentList.map((m) => ({
        month: m.monthName,
        value: m.expTeus || 0,
      })),
    [currentList]
  );

  const importTrend = useMemo(
    () =>
      currentList.map((m) => ({
        month: m.monthName,
        value: m.impTeus || 0,
      })),
    [currentList]
  );

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* SIDEBAR */}
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
              item === "Gate Movement"
                ? "bg-blue-100 text-blue-700"
                : "bg-slate-50"
            }`}
          >
            {item}
          </div>
        ))}
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 space-y-6">
        <FilterBar />

        {/* HEADER */}
        <div className="bg-white rounded-lg shadow p-4 flex justify-between">
          <h1 className="text-2xl font-semibold">GATE MOVEMENT</h1>
          <span className="text-sm text-slate-500">
            Units: TEUs for all metrics displayed
          </span>
        </div>

        {/* EXPORT & IMPORT PANELS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* EXPORT */}
          <Section title="Export" bg="bg-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <KpiCard
                title="Current Month Export"
                value={latestMonth?.expTeus ?? "—"}
              />
              <KpiCard
                title="Prev. Month Export"
                value={previousMonth?.expTeus ?? "—"}
              />
            </div>

            <ChartBox title="Export Trend | Monthly">
              <LineChart data={exportTrend}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ChartBox>
          </Section>

          {/* IMPORT */}
          <Section title="Import" bg="bg-orange-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <KpiCard
                title="Current Month Import"
                value={latestMonth?.impTeus ?? "—"}
              />
              <KpiCard
                title="Prev. Month Import"
                value={previousMonth?.impTeus ?? "—"}
              />
            </div>

            <ChartBox title="Import Trend | Monthly">
              <LineChart data={importTrend}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  dataKey="value"
                  stroke="#ea580c"
                  strokeWidth={2}
                />
              </LineChart>
            </ChartBox>
          </Section>
        </div>

        {/* MONTHLY TABLE */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-semibold mb-4">
            Gate Movement | Monthly
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border px-3 py-2">Month</th>
                  <th className="border px-3 py-2">Export TEUs</th>
                  <th className="border px-3 py-2">Import TEUs</th>
                </tr>
              </thead>
              <tbody>
                {currentList.map((m) => (
                  <tr key={m.monthName}>
                    <td className="border px-3 py-2">{m.monthName}</td>
                    <td className="border px-3 py-2">{m.expTeus}</td>
                    <td className="border px-3 py-2">{m.impTeus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Section({ title, bg, children }) {
  return (
    <div className={`${bg} rounded-lg p-4`}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function ChartBox({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}
