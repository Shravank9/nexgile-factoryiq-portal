import React, { useState } from "react";
import { rmaRecords } from "../data/staticData";
import { StatCard, Panel, Table, Td, StatusBadge, Toast, Modal, Input, Select, Btn } from "../components/UI";

const AfterSales = () => {
  const [rmas, setRmas] = useState(rmaRecords);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ customer: "", program: "", reason: "", qty: "" });
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleAdd = () => {
    if (!form.customer || !form.reason) return;
    const id = `RMA-00${rmas.length + 1}`;
    setRmas([...rmas, { ...form, id, qty: parseInt(form.qty) || 1, status: "Under Repair", receivedDate: new Date().toISOString().split("T")[0] }]);
    setModal(false);
    setForm({ customer: "", program: "", reason: "", qty: "" });
    showToast(`${id} created successfully`);
  };

  return (
    <div style={s.page}>
      <Toast message={toast} />
      <div style={s.kpiGrid}>
        <StatCard label="Total RMAs" value={rmas.length} icon="↩" color="blue" />
        <StatCard label="Under Repair" value={rmas.filter(r => r.status === "Under Repair").length} icon="🔧" color="amber" />
        <StatCard label="Warranty Claims" value={rmas.filter(r => r.status === "Warranty Claim").length} icon="🛡" color="purple" />
        <StatCard label="Total Units" value={rmas.reduce((a, r) => a + r.qty, 0)} icon="📦" color="blue" sub="Returned units" />
      </div>

      <Panel title="RMA Records" subtitle="Return, repair & warranty tracking"
        action={<Btn onClick={() => setModal(true)} icon="+" >New RMA</Btn>}>
        <Table heads={["RMA ID", "Customer", "Program", "Reason", "Qty", "Status", "Received Date", "Action"]}>
          {rmas.map(r => (
            <tr key={r.id}>
              <Td mono bold color="var(--blue)">{r.id}</Td>
              <Td bold color="var(--text-primary)">{r.customer}</Td>
              <Td>{r.program}</Td>
              <Td color="var(--text-primary)">{r.reason}</Td>
              <Td bold>{r.qty}</Td>
              <Td><StatusBadge status={r.status} /></Td>
              <Td>{r.receivedDate}</Td>
              <Td><button onClick={() => showToast(`Opening repair log for ${r.id}`)} style={{ background: "var(--blue-light)", color: "var(--blue)", border: "1px solid var(--blue-mid)", borderRadius: 7, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>View</button></Td>
            </tr>
          ))}
        </Table>
      </Panel>

      <div style={s.serviceGrid}>
        {[["📥", "Self-Service RMA Intake", "Customers submit requests, reason codes, labels, and track triage routing.", "blue"],
          ["🔧", "Repair Diagnostics", "Diagnostics, quote/approval workflow, repair actions log, outbound tracking.", "amber"],
          ["🛡", "Warranty Handling", "Coverage checks, claims workflow, failure trend analytics, approvals.", "purple"],
          ["⚙", "Spare Parts Catalog", "Catalog, stock/availability, ordering, delivery tracking, cross-references.", "green"],
          ["📋", "EOL Support", "EOL notices, LTB programs, long-term storage/consignment, redesign coordination.", "red"]
        ].map(([icon, title, desc, color]) => {
          const colors = { blue: "var(--blue)", amber: "var(--amber)", purple: "var(--purple)", green: "var(--green)", red: "var(--red)" };
          const bgs = { blue: "var(--blue-light)", amber: "var(--amber-light)", purple: "var(--purple-light)", green: "var(--green-light)", red: "var(--red-light)" };
          return (
            <div key={title} style={{ ...s.serviceCard, borderTop: `3px solid ${colors[color]}` }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: bgs[color], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 12 }}>{icon}</div>
              <div style={s.serviceTitle}>{title}</div>
              <div style={s.serviceDesc}>{desc}</div>
            </div>
          );
        })}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Create New RMA"
        footer={<><Btn variant="secondary" onClick={() => setModal(false)}>Cancel</Btn><Btn onClick={handleAdd}>Create RMA</Btn></>}>
        <Input label="Customer *" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} placeholder="e.g. AeroTech Inc." />
        <Input label="Program ID" value={form.program} onChange={e => setForm({ ...form, program: e.target.value })} placeholder="e.g. PRG-001" />
        <Input label="Reason / Issue *" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder="Describe the issue..." />
        <Input label="Qty Returned" value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} placeholder="e.g. 5" type="number" />
      </Modal>
    </div>
  );
};

const s = {
  page: { padding: "28px", display: "flex", flexDirection: "column", gap: 20 },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 },
  serviceGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 },
  serviceCard: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "20px", boxShadow: "var(--shadow-sm)" },
  serviceTitle: { fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 },
  serviceDesc: { fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 },
};

export default AfterSales;
