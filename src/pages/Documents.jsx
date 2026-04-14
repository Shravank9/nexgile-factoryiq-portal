import React, { useState, useRef, useEffect } from "react";
import { documents as init } from "../data/staticData";
import { Btn, SearchBar, FilterTabs, Toast, Modal, Input, Select, EmptyState } from "../components/UI";

const typeIcon = { BOM: "📋", "ECO/ECR": "🔄", "Test Plan": "🧪", Certification: "🏅", Compliance: "🛡" };
const typeColor = { BOM: "blue", "ECO/ECR": "amber", "Test Plan": "purple", Certification: "green", Compliance: "red" };

// Status style definitions — each status gets its own distinct color
const STATUS_STYLES = {
  Draft:          { bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE", dot: "#3B82F6" },
  "Under Review": { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A", dot: "#F59E0B" },
  Released:       { bg: "#ECFDF5", text: "#065F46", border: "#6EE7B7", dot: "#10B981" },
  Pending:        { bg: "#F5F3FF", text: "#5B21B6", border: "#C4B5FD", dot: "#8B5CF6" },
};

const STATUS_OPTIONS = ["Draft", "Under Review", "Released", "Pending"];

// Custom dropdown — fully styled, no native select ugliness
const StatusDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = STATUS_STYLES[value] || STATUS_STYLES["Draft"];

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          background: current.bg, color: current.text,
          border: `1.5px solid ${current.border}`,
          borderRadius: 8, padding: "6px 12px",
          fontSize: 12, fontWeight: 700, cursor: "pointer",
          fontFamily: "var(--font)", whiteSpace: "nowrap",
          transition: "all 0.15s",
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: current.dot, flexShrink: 0 }} />
        {value}
        <span style={{ marginLeft: 2, fontSize: 10, opacity: 0.7 }}>▼</span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 999,
          background: "#fff", border: "1.5px solid #E4E9F4", borderRadius: 12,
          boxShadow: "0 12px 32px rgba(15,23,51,0.14)", minWidth: 160, overflow: "hidden",
          animation: "fadeIn 0.15s ease",
        }}>
          {STATUS_OPTIONS.map(opt => {
            const st = STATUS_STYLES[opt];
            const isSelected = opt === value;
            return (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%",
                  padding: "10px 14px", border: "none", cursor: "pointer",
                  background: isSelected ? st.bg : "#fff",
                  borderLeft: isSelected ? `3px solid ${st.dot}` : "3px solid transparent",
                  transition: "all 0.1s",
                  fontFamily: "var(--font)",
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#F8FAFF"; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "#fff"; }}
              >
                <span style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: st.dot, flexShrink: 0,
                  boxShadow: `0 0 0 3px ${st.bg}`,
                }} />
                <span style={{ fontSize: 13, fontWeight: isSelected ? 700 : 500, color: st.text }}>
                  {opt}
                </span>
                {isSelected && (
                  <span style={{ marginLeft: "auto", fontSize: 13, color: st.dot, fontWeight: 700 }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Documents = () => {
  const [docs, setDocs] = useState(init);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ name: "", type: "BOM", program: "", version: "1.0" });
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const types = ["All", ...new Set(docs.map(d => d.type))];
  const filtered = docs.filter(d =>
    (filter === "All" || d.type === filter) &&
    (!search || d.name.toLowerCase().includes(search.toLowerCase()) || d.program.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAdd = () => {
    if (!form.name || !form.program) return;
    const id = `DOC-${String(docs.length + 1).padStart(3, "0")}`;
    setDocs([...docs, { ...form, id, status: "Draft", date: new Date().toISOString().split("T")[0] }]);
    setModal(false);
    setForm({ name: "", type: "BOM", program: "", version: "1.0" });
    showToast(`${id} uploaded successfully`);
  };

  const updateStatus = (id, status) => {
    setDocs(docs.map(d => d.id === id ? { ...d, status } : d));
    showToast(`Status updated to "${status}"`);
  };

  return (
    <div style={s.page}>
      <Toast message={toast} />

      <div style={s.toolbar}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search documents..." />
        <FilterTabs tabs={types} active={filter} onChange={setFilter} />
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{filtered.length} docs</span>
        <Btn onClick={() => setModal(true)} icon="⬆">Upload</Btn>
      </div>

      {filtered.length === 0
        ? <EmptyState icon="❑" message="No documents match your search" />
        : <div style={s.grid}>
            {filtered.map((doc) => {
              const tc = typeColor[doc.type] || "blue";
              const colorMap = {
                blue:   { bg: "#EFF6FF", text: "#2563EB" },
                amber:  { bg: "#FFFBEB", text: "#B45309" },
                purple: { bg: "#F5F3FF", text: "#5B21B6" },
                green:  { bg: "#ECFDF5", text: "#065F46" },
                red:    { bg: "#FEF2F2", text: "#991B1B" },
              };
              const c = colorMap[tc];
              const st = STATUS_STYLES[doc.status] || STATUS_STYLES["Draft"];

              return (
                <div key={doc.id} style={{ ...s.card, borderTop: `3px solid ${st.dot}` }} className="fade-in">
                  {/* Top row */}
                  <div style={s.cardTop}>
                    <div style={{ ...s.iconBox, background: c.bg, color: c.text }}>
                      {typeIcon[doc.type] || "📄"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={s.docId}>{doc.id} · v{doc.version}</div>
                      <div style={s.docName}>{doc.name}</div>
                      <div style={s.docMeta}>{doc.program} · {doc.date}</div>
                    </div>
                  </div>

                  {/* Type chip row */}
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ ...s.chip, background: c.bg, color: c.text }}>{doc.type}</span>
                    <span style={s.chip}>{doc.program}</span>
                  </div>

                  {/* Bottom row — status dropdown + action buttons */}
                  <div style={s.cardBottom}>
                    <StatusDropdown
                      value={doc.status}
                      onChange={(newStatus) => updateStatus(doc.id, newStatus)}
                    />
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => showToast(`Opening ${doc.name}`)} style={s.docBtn}>
                        👁 View
                      </button>
                      <button onClick={() => showToast(`Downloading ${doc.name}`)} style={s.docBtn}>
                        ⬇
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
      }

      {/* Capabilities section */}
      <div style={s.capGrid}>
        {[
          ["📝", "Versioning & Approvals", "blue",   "#EFF6FF", "#2563EB"],
          ["🔔", "Change Notifications",   "amber",  "#FFFBEB", "#B45309"],
          ["🖊", "Markup & Annotation",    "purple", "#F5F3FF", "#5B21B6"],
          ["📐", "3D CAD Viewing",         "green",  "#ECFDF5", "#065F46"],
          ["📚", "Knowledge Base",         "blue",   "#EFF6FF", "#2563EB"],
        ].map(([icon, label, , bg, text]) => (
          <div key={label} style={{ ...s.capCard, borderTop: `3px solid ${text}` }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 10 }}>{icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0F1733" }}>{label}</div>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Upload Document"
        footer={<><Btn variant="secondary" onClick={() => setModal(false)}>Cancel</Btn><Btn onClick={handleAdd}>Upload</Btn></>}>
        <Input label="Document Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Servo BOM v2.0" />
        <Input label="Program ID *" value={form.program} onChange={e => setForm({ ...form, program: e.target.value })} placeholder="e.g. PRG-001" />
        <Input label="Version" value={form.version} onChange={e => setForm({ ...form, version: e.target.value })} placeholder="e.g. 1.0" />
        <Select label="Document Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} options={["BOM", "ECO/ECR", "Test Plan", "Certification", "Compliance"]} />
        <div onClick={() => showToast("File picker — attach your file here")}
          style={{ border: "2px dashed #D0D9EE", borderRadius: 10, padding: "24px", textAlign: "center", color: "#8C97B8", fontSize: 13, cursor: "pointer", background: "#F8FAFF" }}>
          📎 Click to attach file (PDF, DOCX, XLSX)
        </div>
      </Modal>
    </div>
  );
};

const s = {
  page: { padding: "28px", display: "flex", flexDirection: "column", gap: 20 },
  toolbar: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 },
  card: {
    background: "#fff", border: "1px solid #E4E9F4",
    borderRadius: 16, padding: "18px 20px",
    boxShadow: "0 1px 3px rgba(15,23,51,0.06)",
    display: "flex", flexDirection: "column", gap: 12,
    transition: "box-shadow 0.2s",
  },
  cardTop: { display: "flex", gap: 14, alignItems: "flex-start" },
  iconBox: { width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 },
  docId: { fontSize: 11, fontWeight: 700, color: "#8C97B8", fontFamily: "var(--font-mono)" },
  docName: { fontSize: 14, fontWeight: 700, color: "#0F1733", marginTop: 3, lineHeight: 1.3 },
  docMeta: { fontSize: 12, color: "#8C97B8", marginTop: 3 },
  chip: { fontSize: 11, fontWeight: 600, background: "#F4F6FB", color: "#4A5578", border: "1px solid #E4E9F4", borderRadius: 20, padding: "3px 10px" },
  cardBottom: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "1px solid #E4E9F4", gap: 8 },
  docBtn: {
    background: "#F8FAFF", border: "1px solid #E4E9F4", borderRadius: 8,
    padding: "6px 12px", color: "#4A5578", cursor: "pointer",
    fontSize: 12, fontWeight: 600, fontFamily: "var(--font)",
  },
  capGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 },
  capCard: { background: "#fff", border: "1px solid #E4E9F4", borderRadius: 14, padding: "16px", boxShadow: "0 1px 3px rgba(15,23,51,0.06)" },
};

export default Documents;
