import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { programs as initialPrograms } from "../data/staticData";
import { StatusBadge,  Btn, SearchBar, FilterTabs, ProgressBar, Toast, Modal, Input, Select, EmptyState } from "../components/UI";

const CUSTOMER_PROGRAMS = ["PRG-002"];

const MilestoneTimeline = ({ milestones }) => {
  const colors = { Completed: "#10B981", "In Progress": "#3B82F6", Delayed: "#EF4444", "At Risk": "#F59E0B", Pending: "#D1D5DB" };
  return (
    <div style={{ position: "relative", padding: "8px 0" }}>
      <div style={{ position: "absolute", top: 20, left: 14, right: 14, height: 2, background: "#E4E9F4" }} />
      <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
        {milestones.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: colors[m.status] || "#D1D5DB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: m.status === "Pending" ? "#9CA3AF" : "#fff", fontWeight: 700, border: "3px solid #fff", boxShadow: `0 0 0 2px ${colors[m.status] || "#D1D5DB"}`, zIndex: 1 }}>
              {m.status === "Completed" ? "✓" : m.status === "Delayed" ? "!" : m.status === "In Progress" ? "▶" : (i + 1)}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#0F1733" }}>{m.name}</div>
              <div style={{ fontSize: 9, color: "#8C97B8", marginTop: 1 }}>{m.date}</div>
              <StatusBadge status={m.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Programs = () => {
  const user = useUser();
  const isAdmin = user?.role === "Admin";

  const [programs, setPrograms] = useState(initialPrograms);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ name: "", customer: "", site: "", owner: "", phase: "R&D", startDate: "", endDate: "" });

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  // Customer sees only their programs
  const basePrograms = isAdmin ? programs : programs.filter(p => CUSTOMER_PROGRAMS.includes(p.id));

  const filtered = basePrograms.filter(p =>
    (filter === "All" || p.status === filter) &&
    (!search || [p.name, p.customer, p.id].some(v => v.toLowerCase().includes(search.toLowerCase())))
  );

  const handleAdd = () => {
    if (!form.name || !form.customer) return;
    const id = `PRG-00${programs.length + 1}`;
    setPrograms([...programs, { ...form, id, status: "Green", health: 100, milestones: [{ name: "Kickoff", date: form.startDate, status: "Pending" }, { name: "Design", date: "", status: "Pending" }, { name: "Delivery", date: form.endDate, status: "Pending" }] }]);
    setModal(false);
    setForm({ name: "", customer: "", site: "", owner: "", phase: "R&D", startDate: "", endDate: "" });
    showToast(`Program ${id} created`);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setPrograms(programs.filter(p => p.id !== id));
    if (selected?.id === id) setSelected(null);
    showToast(`Program ${id} removed`);
  };

  return (
    <div style={s.page}>
      <Toast message={toast} />

      {/* Customer read-only banner */}
      {!isAdmin && (
        <div style={s.customerBanner}>
          <span style={{ fontSize: 16 }}>👤</span>
          <div>
            <div style={s.bannerTitle}>Customer View — Read Only</div>
            <div style={s.bannerSub}>You can view your assigned programs and milestone timelines. Contact your account manager to make changes.</div>
          </div>
        </div>
      )}

      <div style={s.toolbar}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search programs..." />
        <FilterTabs tabs={["All", "Green", "Yellow", "Red"]} active={filter} onChange={setFilter} />
        <div style={{ fontSize: 13, color: "#8C97B8" }}>{filtered.length} programs</div>
        {/* Only Admin can create programs */}
        {isAdmin && <Btn onClick={() => setModal(true)} icon="+">New Program</Btn>}
      </div>

      <div style={s.grid}>
        <div style={s.list}>
          {filtered.length === 0 && <EmptyState icon="◈" message="No programs found" />}
          {filtered.map((p) => (
            <div key={p.id} onClick={() => setSelected(p)} className="fade-in"
              style={{ ...s.card, border: selected?.id === p.id ? "2px solid #2563EB" : "1px solid #E4E9F4", background: selected?.id === p.id ? "#EFF6FF" : "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#8C97B8", fontFamily: "var(--font-mono)" }}>{p.id}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0F1733", marginTop: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#8C97B8", marginTop: 2 }}>{p.customer} · {p.site}</div>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", borderRadius: 20, padding: "3px 10px" }}>{p.phase}</span>
                <div style={{ flex: 1 }}>
                  <ProgressBar value={p.health} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#4A5578" }}>{p.health}%</span>
              </div>
              {/* Only Admin can delete */}
              {isAdmin && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Btn variant="danger" size="sm" onClick={e => handleDelete(p.id, e)}>Delete</Btn>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detail pane */}
        <div style={s.detail}>
          {selected ? (
            <div className="fade-in">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #E4E9F4" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#8C97B8", fontFamily: "var(--font-mono)" }}>{selected.id}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#0F1733", marginTop: 4 }}>{selected.name}</div>
                  <div style={{ fontSize: 13, color: "#4A5578", marginTop: 4 }}>{selected.customer}</div>
                </div>
                <StatusBadge status={selected.status} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {[["Owner", selected.owner], ["Site", selected.site], ["Phase", selected.phase], ["Health", selected.health + "%"], ["Start", selected.startDate], ["End", selected.endDate]].map(([k, v]) => (
                  <div key={k} style={{ background: "#F8FAFF", borderRadius: 10, padding: "10px 14px", border: "1px solid #E4E9F4" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#8C97B8", textTransform: "uppercase" }}>{k}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0F1733", marginTop: 4 }}>{v || "—"}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid #E4E9F4", paddingTop: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#8C97B8", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 14 }}>Milestone Timeline</div>
                <MilestoneTimeline milestones={selected.milestones} />
              </div>
              <div style={{ borderTop: "1px solid #E4E9F4", paddingTop: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#8C97B8", textTransform: "uppercase", marginBottom: 10 }}>
                  {isAdmin ? "Quick Actions" : "Available Actions"}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {/* Admin actions */}
                  {isAdmin && ["📋 View BOM", "🔄 ECO Log", "⬇ Download Report", "⚠ Raise NCR", "🗓 Schedule Audit"].map(a => (
                    <Btn key={a} variant="secondary" size="sm" onClick={() => showToast(`${a} for ${selected.id}`)}>{a}</Btn>
                  ))}
                  {/* Customer actions — read only */}
                  {!isAdmin && ["📋 View BOM", "⬇ Download Report", "📞 Contact Manager"].map(a => (
                    <Btn key={a} variant="secondary" size="sm" onClick={() => showToast(`${a} for ${selected.id}`)}>{a}</Btn>
                  ))}
                </div>
                {!isAdmin && (
                  <div style={{ marginTop: 12, fontSize: 12, color: "#8C97B8", fontStyle: "italic" }}>
                    🔒 Create, edit and delete actions are restricted to Admin users.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <EmptyState icon="◈" message="Select a program to view details" />
          )}
        </div>
      </div>

      {/* Create Modal — Admin only */}
      {isAdmin && (
        <Modal open={modal} onClose={() => setModal(false)} title="Create New Program"
          footer={<><Btn variant="secondary" onClick={() => setModal(false)}>Cancel</Btn><Btn onClick={handleAdd}>Create</Btn></>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Input label="Program Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Aerospace NPI" />
            <Input label="Customer *" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} placeholder="e.g. AeroTech Inc." />
            <Input label="Site" value={form.site} onChange={e => setForm({ ...form, site: e.target.value })} placeholder="e.g. Hyderabad Plant" />
            <Input label="Owner" value={form.owner} onChange={e => setForm({ ...form, owner: e.target.value })} placeholder="e.g. Ravi Kumar" />
            <Input label="Start Date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} placeholder="YYYY-MM-DD" />
            <Input label="End Date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} placeholder="YYYY-MM-DD" />
            <Select label="Phase" value={form.phase} onChange={e => setForm({ ...form, phase: e.target.value })} options={["R&D", "NPI", "Production"]} />
          </div>
        </Modal>
      )}
    </div>
  );
};

const s = {
  page: { padding: "28px", display: "flex", flexDirection: "column", gap: 20 },
  customerBanner: { display: "flex", alignItems: "flex-start", gap: 14, background: "#ECFDF5", border: "1.5px solid #6EE7B7", borderRadius: 14, padding: "16px 20px" },
  bannerTitle: { fontSize: 14, fontWeight: 700, color: "#065F46" },
  bannerSub: { fontSize: 12, color: "#059669", marginTop: 3, lineHeight: 1.5 },
  toolbar: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  list: { display: "flex", flexDirection: "column", gap: 10 },
  card: { borderRadius: 14, padding: "16px 18px", cursor: "pointer", transition: "all 0.15s", boxShadow: "0 1px 3px rgba(15,23,51,0.06)" },
  detail: { background: "#fff", border: "1px solid #E4E9F4", borderRadius: 16, padding: "22px", boxShadow: "0 1px 3px rgba(15,23,51,0.06)", position: "sticky", top: 90, alignSelf: "start", minHeight: 300 },
};

export default Programs;
