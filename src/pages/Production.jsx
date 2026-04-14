import React, { useState } from "react";
import { workOrders } from "../data/staticData";
import { StatCard, Panel, Table, Td, StatusBadge, Toast } from "../components/UI";

const Production = () => {
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 3000); };
  const avgYield = (workOrders.reduce((a, w) => a + w.yield, 0) / workOrders.length).toFixed(1);

  return (
    <div style={s.page}>
      <Toast message={toast} />

      <div style={s.kpiGrid}>
        <StatCard label="Lines Running" value={workOrders.filter(w => w.status === "Running").length} icon="▶" color="green" sub="Active production" />
        <StatCard label="Lines on Hold" value={workOrders.filter(w => w.status === "Hold").length} icon="⏸" color="red" sub="Requires attention" />
        <StatCard label="Total WIP" value={workOrders.reduce((a, w) => a + w.wip, 0)} icon="⚙" color="blue" sub="Units in progress" />
        <StatCard label="Average Yield" value={`${avgYield}%`} icon="◎" color="green" sub="Across all lines" />
      </div>

      <Panel title="Work Orders — Live Production Status" subtitle="Click a row to view details">
        <Table heads={["Work Order", "Program", "Stage", "Line", "Shift", "WIP", "Output", "Yield", "Rework", "Status", "Actions"]}>
          {workOrders.map(wo => (
            <tr key={wo.id} style={{ cursor: "pointer", background: selected?.id === wo.id ? "var(--blue-light)" : "transparent" }} onClick={() => setSelected(wo === selected ? null : wo)}>
              <Td bold mono color="var(--blue)">{wo.id}</Td>
              <Td bold>{wo.program}</Td>
              <Td>{wo.stage}</Td>
              <Td>{wo.line}</Td>
              <Td>{wo.shift}</Td>
              <Td bold color="var(--text-primary)">{wo.wip}</Td>
              <Td bold color="var(--text-primary)">{wo.output}</Td>
              <Td bold color={wo.yield >= 97 ? "var(--green)" : wo.yield >= 90 ? "var(--amber)" : "var(--red)"}>{wo.yield}%</Td>
              <Td color={wo.rework > 8 ? "var(--red)" : "var(--text-muted)"}>{wo.rework}</Td>
              <Td><StatusBadge status={wo.status} /></Td>
              <Td>
                <button onClick={e => { e.stopPropagation(); showToast(`Action triggered for ${wo.id}`); }}
                  style={{ background: "var(--blue-light)", color: "var(--blue)", border: "1px solid var(--blue-mid)", borderRadius: 7, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                  View
                </button>
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>

      {selected && (
        <div style={s.detailPanel} className="fade-in">
          <div style={s.detailHead}>
            <div style={s.detailTitle}>Work Order Detail — <span style={{ color: "var(--blue)" }}>{selected.id}</span></div>
            <button onClick={() => setSelected(null)} style={s.closeBtn}>✕ Close</button>
          </div>
          <div style={s.detailGrid}>
            {[["Work Order", selected.id], ["Program", selected.program], ["Stage", selected.stage], ["Line", selected.line], ["Shift", selected.shift], ["WIP", selected.wip], ["Output", selected.output], ["Yield", selected.yield + "%"], ["Rework", selected.rework], ["Status", selected.status]].map(([k, v]) => (
              <div key={k} style={s.detailCard}>
                <div style={s.dKey}>{k}</div>
                <div style={{ ...s.dVal, color: k === "Yield" ? (selected.yield >= 97 ? "var(--green)" : "var(--amber)") : k === "Status" ? (selected.status === "Running" ? "var(--green)" : "var(--amber)") : "var(--text-primary)" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={s.actionsRow}>
            {["📊 View Trend", "⬇ Export Report", "🔧 Log Issue", "📋 Work Instructions"].map(a => (
              <button key={a} onClick={() => showToast(`${a} for ${selected.id}`)} style={s.actionBtn}>{a}</button>
            ))}
          </div>
        </div>
      )}

      {/* Capacity Overview */}
      <Panel title="Site Capacity Overview" subtitle="Current utilization by line">
        <div style={s.capacityGrid}>
          {["Line A", "Line B", "Line C", "Line D"].map((line, i) => {
            const util = [92, 78, 45, 88][i];
            return (
              <div key={line} style={s.capacityCard}>
                <div style={s.capHeader}>
                  <span style={s.lineName}>{line}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: util > 80 ? "var(--green)" : util > 60 ? "var(--amber)" : "var(--red)" }}>{util}%</span>
                </div>
                <div style={s.capBar}>
                  <div style={{ height: "100%", width: `${util}%`, background: util > 80 ? "var(--green)" : util > 60 ? "var(--amber)" : "var(--red)", borderRadius: 6, transition: "width 0.8s ease" }} />
                </div>
                <div style={s.capLabel}>Capacity utilization</div>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
};

const s = {
  page: { padding: "28px", display: "flex", flexDirection: "column", gap: 20 },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 },
  detailPanel: { background: "var(--surface)", border: "2px solid var(--blue-mid)", borderRadius: "var(--radius-lg)", padding: "22px", boxShadow: "var(--shadow-md)" },
  detailHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  detailTitle: { fontSize: 16, fontWeight: 800, color: "var(--text-primary)" },
  closeBtn: { background: "var(--red-light)", color: "var(--red)", border: "1px solid var(--red-mid)", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" },
  detailGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 18 },
  detailCard: { background: "var(--surface2)", borderRadius: 10, padding: "12px 14px", border: "1px solid var(--border)" },
  dKey: { fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.5 },
  dVal: { fontSize: 16, fontWeight: 800, marginTop: 6, letterSpacing: "-0.3px" },
  actionsRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  actionBtn: { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 9, padding: "8px 14px", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", cursor: "pointer" },
  capacityGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, padding: "18px 22px" },
  capacityCard: { background: "var(--surface2)", borderRadius: "var(--radius-md)", padding: "16px", border: "1px solid var(--border)" },
  capHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  lineName: { fontSize: 14, fontWeight: 700, color: "var(--text-primary)" },
  capBar: { height: 8, background: "var(--border)", borderRadius: 6, overflow: "hidden", marginBottom: 6 },
  capLabel: { fontSize: 11, color: "var(--text-muted)" },
};

export default Production;
