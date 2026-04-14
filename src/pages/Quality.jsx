import React, { useState, useRef, useEffect } from "react";
import { qualityEvents as init } from "../data/staticData";
import { StatCard, Panel, Table, Td, StatusBadge, Btn, SearchBar, FilterTabs, Toast, Modal, Input, Select, EmptyState } from "../components/UI";

const Q_STATUS_STYLES = {
  "Open":          { bg: "#FEF2F2", text: "#991B1B", border: "#FCA5A5", dot: "#EF4444" },
  "Under Review":  { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A", dot: "#F59E0B" },
  "In Progress":   { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE", dot: "#3B82F6" },
  "Closed":        { bg: "#ECFDF5", text: "#065F46", border: "#6EE7B7", dot: "#10B981" },
  "Scheduled":     { bg: "#F5F3FF", text: "#5B21B6", border: "#C4B5FD", dot: "#8B5CF6" },
};

const QStatusDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const cur = Q_STATUS_STYLES[value] || Q_STATUS_STYLES["Open"];

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: 6, background: cur.bg, color: cur.text, border: `1.5px solid ${cur.border}`, borderRadius: 7, padding: "5px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font)", whiteSpace: "nowrap" }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: cur.dot, flexShrink: 0 }} />
        {value} <span style={{ fontSize: 9, opacity: 0.6 }}>▼</span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 999, background: "#fff", border: "1.5px solid #E4E9F4", borderRadius: 10, boxShadow: "0 12px 28px rgba(15,23,51,0.14)", minWidth: 150, overflow: "hidden" }}>
          {Object.keys(Q_STATUS_STYLES).map(opt => {
            const st = Q_STATUS_STYLES[opt];
            const isSel = opt === value;
            return (
              <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
                style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 12px", border: "none", cursor: "pointer", background: isSel ? st.bg : "#fff", borderLeft: isSel ? `3px solid ${st.dot}` : "3px solid transparent", fontFamily: "var(--font)" }}
                onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = "#F8FAFF"; }}
                onMouseLeave={e => { if (!isSel) e.currentTarget.style.background = "#fff"; }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: st.dot, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: isSel ? 700 : 500, color: st.text }}>{opt}</span>
                {isSel && <span style={{ marginLeft: "auto", color: st.dot, fontSize: 12, fontWeight: 700 }}>✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Quality = () => {
  const [events, setEvents] = useState(init);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ type: "NCR", program: "", description: "", severity: "Minor", assignee: "" });
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const filtered = events.filter(e =>
    (filter === "All" || e.type === filter) &&
    (!search || e.description.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAdd = () => {
    if (!form.description || !form.program) return;
    const count = events.filter(e => e.type === form.type).length + 1;
    const id = `${form.type}-${String(count).padStart(3, "0")}`;
    setEvents([...events, { ...form, id, status: "Open", date: new Date().toISOString().split("T")[0] }]);
    setModal(false);
    setForm({ type: "NCR", program: "", description: "", severity: "Minor", assignee: "" });
    showToast(`${id} raised successfully`);
  };

  const updateStatus = (id, status) => {
    setEvents(events.map(e => e.id === id ? { ...e, status } : e));
    showToast(`${id} updated to "${status}"`);
  };

  const sevColor = { Major: "red", Minor: "amber", Info: "blue" };

  return (
    <div style={s.page}>
      <Toast message={toast} />

      <div style={s.kpiGrid}>
        <StatCard label="Total Events" value={events.length} icon="◎" color="blue" />
        <StatCard label="NCRs" value={events.filter(e => e.type === "NCR").length} icon="⚠" color="red" />
        <StatCard label="CAPAs" value={events.filter(e => e.type === "CAPA").length} icon="🔧" color="amber" sub="Corrective actions" />
        <StatCard label="Audits" value={events.filter(e => e.type === "Audit").length} icon="✓" color="purple" />
        <StatCard label="Open" value={events.filter(e => ["Open", "In Progress", "Under Review"].includes(e.status)).length} icon="!" color="red" sub="Active issues" />
        <StatCard label="Closed" value={events.filter(e => e.status === "Closed").length} icon="✓" color="green" sub="Resolved" />
      </div>

      <Panel title="Quality Events"
        action={
          <div style={{ display: "flex", gap: 10 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search events..." />
            <FilterTabs tabs={["All", "NCR", "CAPA", "Audit"]} active={filter} onChange={setFilter} />
            <Btn onClick={() => setModal(true)} icon="+" variant="primary">Raise Event</Btn>
          </div>
        }>
        {filtered.length === 0
          ? <EmptyState message="No quality events match your filters" />
          : <Table heads={["ID", "Type", "Program", "Description", "Severity", "Status", "Date", "Assignee", "Update Status"]}>
              {filtered.map(ev => (
                <tr key={ev.id}>
                  <Td bold mono color="var(--blue)">{ev.id}</Td>
                  <Td><span style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 6, padding: "3px 9px", fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>{ev.type}</span></Td>
                  <Td>{ev.program}</Td>
                  <Td color="var(--text-primary)">{ev.description}</Td>
                  <Td><StatusBadge status={ev.severity === "Major" ? "Red" : ev.severity === "Minor" ? "Yellow" : "Scheduled"} /></Td>
                  <Td><StatusBadge status={ev.status} /></Td>
                  <Td>{ev.date}</Td>
                  <Td bold>{ev.assignee}</Td>
                  <Td>
                    <QStatusDropdown value={ev.status} onChange={s => updateStatus(ev.id, s)} />
                  </Td>
                </tr>
              ))}
            </Table>
        }
      </Panel>

      {/* SPC Charts */}
      <Panel title="SPC & Quality Analytics" subtitle="Statistical Process Control">
        <div style={s.spcGrid}>
          {[["Cp/Cpk Index", "#2563EB"], ["Out-of-Control Alerts", "#DC2626"], ["Yield Trend", "#059669"], ["Escaped Defects", "#D97706"]].map(([label, color], idx) => (
            <div key={label} style={s.spcCard}>
              <div style={s.spcLabel}>{label}</div>
              <div style={s.spcBars}>
                {Array(12).fill(0).map((_, i) => {
                  const h = 20 + Math.abs(Math.sin((i + idx) * 1.3) * 50);
                  const isAlert = idx === 1 && i === 8;
                  return <div key={i} style={{ flex: 1, borderRadius: "4px 4px 0 0", height: h, background: isAlert ? "#DC2626" : color, opacity: isAlert ? 1 : 0.7 }} />;
                })}
              </div>
              <div style={s.spcFooter}>Last 12 months</div>
            </div>
          ))}
        </div>
      </Panel>

      <Modal open={modal} onClose={() => setModal(false)} title="Raise NCR / CAPA / Audit"
        footer={<><Btn variant="secondary" onClick={() => setModal(false)}>Cancel</Btn><Btn onClick={handleAdd}>Raise Event</Btn></>}>
        <Select label="Event Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} options={["NCR", "CAPA", "Audit"]} />
        <Input label="Program ID *" value={form.program} onChange={e => setForm({ ...form, program: e.target.value })} placeholder="e.g. PRG-001" />
        <Input label="Description *" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the quality issue..." />
        <Input label="Assignee" value={form.assignee} onChange={e => setForm({ ...form, assignee: e.target.value })} placeholder="e.g. Ravi Kumar" />
        <Select label="Severity" value={form.severity} onChange={e => setForm({ ...form, severity: e.target.value })} options={["Minor", "Major", "Info"]} />
      </Modal>
    </div>
  );
};

const s = {
  page: { padding: "28px", display: "flex", flexDirection: "column", gap: 20 },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 },
  spcGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, padding: "18px 22px" },
  spcCard: { background: "var(--surface2)", borderRadius: "var(--radius-md)", padding: "14px", border: "1px solid var(--border)" },
  spcLabel: { fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 10 },
  spcBars: { display: "flex", gap: 3, alignItems: "flex-end", height: 80 },
  spcFooter: { fontSize: 10, color: "var(--text-muted)", marginTop: 8 },
};

export default Quality;
