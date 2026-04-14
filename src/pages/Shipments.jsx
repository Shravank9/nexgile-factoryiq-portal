import React, { useState } from "react";
import { shipments } from "../data/staticData";
import { StatCard, Panel, StatusBadge, Toast, Btn } from "../components/UI";

const steps = ["Order", "Preparing", "Shipped", "In Transit", "Delivered"];

const ShipmentCard = ({ s: sh, onAction }) => {
  const curr = sh.status === "On Hold" ? 1 : steps.indexOf(sh.status);
  const borderColors = { "In Transit": "var(--blue-mid)", Delivered: "var(--green-mid)", Preparing: "var(--amber-mid)", "On Hold": "var(--red-mid)" };
  return (
    <div style={{ background: "var(--surface)", border: `1.5px solid ${borderColors[sh.status] || "var(--border)"}`, borderRadius: 16, padding: "20px", boxShadow: "var(--shadow-sm)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{sh.id}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginTop: 3 }}>{sh.customer}</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Program: <span style={{ color: "var(--blue)", fontWeight: 600 }}>{sh.program}</span></div>
        </div>
        <StatusBadge status={sh.status} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[["Items", sh.items], ["Carrier", sh.carrier], ["ETA", sh.eta], ["Tracking", sh.trackingNo]].map(([k, v]) => (
          <div key={k} style={{ background: "var(--surface2)", borderRadius: 8, padding: "8px 12px", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>{k}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginTop: 3, fontFamily: k === "Tracking" ? "var(--font-mono)" : "var(--font)" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 10, left: "5%", right: "5%", height: 2, background: "var(--border)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          {steps.map((step, i) => {
            const done = i <= curr;
            return (
              <div key={step} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: done ? "var(--blue)" : "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: done ? "#fff" : "var(--text-muted)", fontSize: 10, fontWeight: 700, border: "3px solid var(--surface)", zIndex: 1 }}>
                  {done ? "✓" : ""}
                </div>
                <div style={{ fontSize: 9, fontWeight: 600, color: done ? "var(--blue)" : "var(--text-muted)", textAlign: "center" }}>{step}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
        <button onClick={() => onAction(`Tracking ${sh.id}`)} style={{ flex: 1, padding: "8px", background: "var(--blue-light)", color: "var(--blue)", border: "1px solid var(--blue-mid)", borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          Track Shipment
        </button>
        <button onClick={() => onAction(`Documents for ${sh.id}`)} style={{ flex: 1, padding: "8px", background: "var(--surface2)", color: "var(--text-secondary)", border: "1px solid var(--border)", borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          View Docs
        </button>
      </div>
    </div>
  );
};

const Shipments = () => {
  const [toast, setToast] = useState("");
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  return (
    <div style={s.page}>
      <Toast message={toast} />
      <div style={s.kpiGrid}>
        <StatCard label="Total Shipments" value={shipments.length} icon="✈" color="blue" />
        <StatCard label="In Transit" value={shipments.filter(s => s.status === "In Transit").length} icon="➤" color="blue" />
        <StatCard label="Delivered" value={shipments.filter(s => s.status === "Delivered").length} icon="✓" color="green" />
        <StatCard label="On Hold" value={shipments.filter(s => s.status === "On Hold").length} icon="⏸" color="red" />
      </div>
      <div style={s.grid}>
        {shipments.map(sh => <ShipmentCard key={sh.id} s={sh} onAction={showToast} />)}
      </div>
    </div>
  );
};

const s = {
  page: { padding: "28px", display: "flex", flexDirection: "column", gap: 20 },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 },
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 },
};

export default Shipments;
