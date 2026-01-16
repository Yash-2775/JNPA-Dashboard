import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { useEffect, useMemo, useState } from "react";
import { fetchDashboardData } from "../services/dashboardApi";
import { transformMonthlyTrend } from "../utils/transformMonthlyTrend";
import { computeKpis } from "../utils/computeKpis";

import KpiCard from "../components/KpiCard";
import FilterBar from "../components/FilterBar";

export default function ContainerTerminals() {
  const [kpis, setKpis] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [previousList, setPreviousList] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetchDashboardData()
      .then((data) => {
        setCurrentList(data.currentList);
        setPreviousList(data.previousList);
        setTrendData(transformMonthlyTrend(data.currentList));
        setKpis(computeKpis(data.currentList, data.previousList));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ================= MONTH FILTER ================= */
  const filteredCurrentList = useMemo(() => {
    if (selectedMonth === "ALL") return currentList;
    return currentList.filter((m) => m.monthName === selectedMonth);
  }, [currentList, selectedMonth]);

  const filteredPreviousList = useMemo(() => {
    if (selectedMonth === "ALL") return previousList;
    const index = currentList.findIndex(
      (m) => m.monthName === selectedMonth
    );
    return index >= 0 ? [previousList[index]] : [];
  }, [previousList, currentList, selectedMonth]);

  const filteredKpis = useMemo(() => {
    return computeKpis(filteredCurrentList, filteredPreviousList);
  }, [filteredCurrentList, filteredPreviousList]);

  if (loading) return <div>Loading dashboard…</div>;
  if (!filteredKpis) return <div>No Data Found</div>;

  const { overall, export: exportData, import: importData } = filteredKpis;
  const displayToday = (v) => (v === 0 ? "—" : v);

  return (
    <div className="space-y-6">
      {/* FILTER BAR */}
      <FilterBar />

      {/* HEADER */}
      <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">CONTAINER TERMINALS</h1>

        {/* MONTH DROPDOWN */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="ALL">All Months</option>
          {currentList.map((m) => (
            <option key={m.monthName} value={m.monthName}>
              {m.monthName}
            </option>
          ))}
        </select>
      </div>

      {/* ================= TOTAL ================= */}
      <Section title="Total" bg="bg-blue-50 border border-blue-100">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <KpiCard
              title="Total | FY"
              value={`${(overall.totalFY / 1e6).toFixed(2)}M`}
              subtitle={`Prev. Year ${(overall.prevFY / 1e6).toFixed(2)}M`}
            />
            <KpiCard
              title="Current Month's Total"
              value={`${(overall.currentMonth / 1e3).toFixed(1)}L`}
            />
            <KpiCard
              title="Today's Total"
              value={displayToday(overall.today)}
            />
          </div>

          <ChartBox title="Total by Terminals | Fiscal Year">
            <BarChart
              data={mergeByMonth(
                filteredCurrentList,
                filteredPreviousList,
                "totalTeus"
              )}
            >
              <XAxis dataKey="label" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Bar dataKey="current" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="previous" fill="#9ca3af" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartBox>
        </div>
      </Section>

      {/* ================= EXPORT ================= */}
      <DualSection
        title="Export"
        color="blue"
        kpis={[
          ["Overall Export | FY", `${(exportData.overallFY / 1e6).toFixed(2)}M`],
          ["Current Month's Export", `${(exportData.currentMonth / 1e3).toFixed(1)}L`],
          ["Today's Export", displayToday(exportData.today)],
        ]}
        dataKey="expTeus"
        currentList={filteredCurrentList}
        previousList={filteredPreviousList}
      />

      {/* ================= IMPORT ================= */}
      <DualSection
        title="Import"
        color="orange"
        kpis={[
          ["Overall Import | FY", `${(importData.overallFY / 1e6).toFixed(2)}M`],
          ["Current Month's Import", `${(importData.currentMonth / 1e3).toFixed(1)}L`],
          ["Today's Import", displayToday(importData.today)],
        ]}
        dataKey="impTeus"
        currentList={filteredCurrentList}
        previousList={filteredPreviousList}
      />

      {/* ================= TREND ================= */}
      <ChartBox title="Monthly Import vs Export Trend">
        <LineChart data={trendData}>
          <XAxis dataKey="month" fontSize={10} />
          <YAxis fontSize={10} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: '10px' }} />
          <Line type="monotone" dataKey="import" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="export" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ChartBox>
    </div>
  );
}

/* ================= HELPERS ================= */

function mergeByMonth(current, previous, key) {
  return current.map((c, i) => ({
    label: c.monthName,
    current: c[key],
    previous: previous[i]?.[key] || 0,
  }));
}

function Section({ title, bg, children }) {
  return (
    <div className={`${bg} rounded-lg p-4 shadow-sm`}>
      <h2 className="text-lg font-semibold mb-4 text-slate-800">{title}</h2>
      {children}
    </div>
  );
}

function ChartBox({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <h3 className="text-xs font-bold text-slate-500 uppercase mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}

function DualSection({ title, color, kpis, dataKey, currentList, previousList }) {
  return (
    <Section
      title={title}
      bg={color === "blue" ? "bg-blue-50 border border-blue-100" : "bg-orange-50 border border-orange-100"}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {kpis.map(([t, v]) => (
          <KpiCard key={t} title={t} value={v} />
        ))}
      </div>

      <ChartBox title={`${title} by Terminals | Fiscal Year`}>
        <BarChart data={mergeByMonth(currentList, previousList, dataKey)}>
          <XAxis dataKey="label" fontSize={10} />
          <YAxis fontSize={10} />
          <Tooltip cursor={{fill: 'transparent'}} />
          <Legend wrapperStyle={{ fontSize: '10px' }} />
          <Bar
            dataKey="current"
            fill={color === "blue" ? "#2563eb" : "#ea580c"}
            radius={[2, 2, 0, 0]}
          />
          <Bar dataKey="previous" fill="#9ca3af" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ChartBox>
    </Section>
  );
}