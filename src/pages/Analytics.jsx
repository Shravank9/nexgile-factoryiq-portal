import React, { useState } from "react";
import { kpis, programs, workOrders } from "../data/staticData";
import { StatCard, Panel, Toast } from "../components/UI";

const BarChart = ({ data, color, height = 100 }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-muted)" }}>{d.value}{d.unit || ""}</div>
          <div style={{ width: "100%", height: `${(d.value / max) * (height - 20)}px`, background: color, borderRadius: "4px 4px 0 0", opacity: 0.85, minHeight: 4 }} />
          <div style={{ fontSize: 9, color: "var(--text-muted)", textAlign: "center" }}>{d.name}</div>
        </div>
      ))}
    </div>
  );
};

const Analytics = () => {
  const [toast, setToast] = useState("");
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const deliveryTrend = [
    { name: "Jan", value: 82 }, { name: "Feb", value: 85 }, { name: "Mar", value: 79 },
    { name: "Apr", value: 88 }, { name: "May", value: 91 }, { name: "Jun", value: 87 },
    { name: "Jul", value: 84 }, { name: "Aug", value: 90 }, { name: "Sep", value: 86 },
    { name: "Oct", value: 87 }, { name: "Nov", value: 89 }, { name: "Dec", value: 92 },
  ];
  const yieldData = workOrders.map(w => ({ name: w.id.replace("WO-", ""), value: w.yield, unit: "%" }));
  const healthData = programs.map(p => ({ name: p.id.replace("PRG-", "P"), value: p.health }));

  return (
    <div style={s.page}>
      <Toast message={toast} />

      <div style={s.kpiGrid}>
        <StatCard label="On-Time Delivery" value={`${kpis.onTimeDelivery}%`} icon="✈" color="blue" trend="+2.1%" />
        <StatCard label="Quality Yield" value={`${kpis.qualityYield}%`} icon="✓" color="green" trend="+0.8%" />
        <StatCard label="Capacity Util." value={`${kpis.capacityUtilization}%`} icon="⚙" color="purple" trend="-1.3%" />
        <StatCard label="Open NCRs" value={kpis.openNCRs} icon="⚠" color="red" sub="Active issues" />
      </div>

      <div style={s.chartGrid}>
        <Panel title="On-Time Delivery Trend" subtitle="Monthly % — Last 12 months">
          <div style={{ padding: "20px 22px" }}>
            <BarChart data={deliveryTrend} color="#2563EB" height={130} />
          </div>
        </Panel>
        <Panel title="Production Yield by Work Order" subtitle="Current yield %">
          <div style={{ padding: "20px 22px" }}>
            <BarChart data={yieldData} color="#059669" height={130} />
          </div>
        </Panel>
      </div>

      <div style={s.chartGrid}>
        <Panel title="Program Health Scores" subtitle="Portfolio overview">
          <div style={{ padding: "20px 22px" }}>
            <BarChart data={healthData} color="#7C3AED" height={130} />
          </div>
        </Panel>

        <Panel title="Self-Serve Reporting" subtitle="Generate & export reports">
          <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 10 }}>
            {["📊 Portfolio Summary Report", "📋 Quality Events Report", "🚚 On-Time Delivery Report", "📦 Inventory Status Report", "⚙ Production Yield Report"].map(r => (
              <button key={r} onClick={() => showToast(`Generating: ${r}`)}
                style={{ padding: "11px 16px", background: "var(--surface2)", border: "1.5px solid var(--border)", borderRadius: 10, textAlign: "left", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {r}
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Generate →</span>
              </button>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: 12, color: "var(--text-muted)", alignSelf: "center" }}>Export as:</span>
              {["PDF", "Excel", "CSV"].map(f => (
                <button key={f} onClick={() => showToast(`Exporting as ${f}...`)}
                  style={{ padding: "6px 14px", background: "var(--blue-light)", color: "var(--blue)", border: "1.5px solid var(--blue-mid)", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <div style={s.dashGrid}>
        {[
          ["👔", "Executive Dashboard", "Portfolio health, on-time delivery, quality trends, capacity utilization & service KPIs", "blue"],
          ["👥", "Customer Dashboard", "Configurable widgets for project status, quality, shipments and relevant program documents", "green"],
          ["🔮", "Predictive Insights", "Delivery risk flags, quality risk indicators, supply disruption alerts based on trends", "purple"],
        ].map(([icon, title, desc, color]) => {
          const colors = { blue: "var(--blue)", green: "var(--green)", purple: "var(--purple)" };
          const bgs = { blue: "var(--blue-light)", green: "var(--green-light)", purple: "var(--purple-light)" };
          return (
            <div key={title} style={{ ...s.dashCard, borderLeft: `4px solid ${colors[color]}` }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: bgs[color], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>{icon}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const s = {
  page: { padding: "28px", display: "flex", flexDirection: "column", gap: 20 },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 },
  chartGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  dashGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 },
  dashCard: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "22px", boxShadow: "var(--shadow-sm)" },
};

export default Analytics;
