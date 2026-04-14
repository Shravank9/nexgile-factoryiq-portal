import React, { useEffect } from "react";

// ─── Badge ───────────────────────────────────────────
export const Badge = ({ label, color = "blue", size = "md" }) => {
  const colors = {
    green: { bg: "var(--green-light)", text: "var(--green)", border: "var(--green-mid)" },
    amber: { bg: "var(--amber-light)", text: "var(--amber)", border: "var(--amber-mid)" },
    red: { bg: "var(--red-light)", text: "var(--red)", border: "var(--red-mid)" },
    blue: { bg: "var(--blue-light)", text: "var(--blue)", border: "var(--blue-mid)" },
    purple: { bg: "var(--purple-light)", text: "var(--purple)", border: "#C4B5FD" },
    gray: { bg: "var(--surface2)", text: "var(--text-secondary)", border: "var(--border)" },
  };
  const c = colors[color] || colors.blue;
  const pad = size === "sm" ? "2px 8px" : "4px 10px";
  const fs = size === "sm" ? 11 : 12;
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: 20, padding: pad, fontSize: fs, fontWeight: 700, whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 4 }}>
      {label}
    </span>
  );
};

// ─── Status Badge ─────────────────────────────────────
export const StatusBadge = ({ status }) => {
  const map = {
    Green: "green", Yellow: "amber", Red: "red",
    Open: "red", Closed: "green", "In Progress": "blue", "Under Review": "amber",
    Released: "green", Draft: "blue", Pending: "amber",
    Running: "green", Hold: "red",
    Delivered: "green", "In Transit": "blue", Preparing: "amber", "On Hold": "red",
    Confirmed: "green", Scheduled: "purple",
    "Under Repair": "blue", Diagnosed: "amber", "Warranty Claim": "purple",
    "At Risk": "red", Delayed: "red", Completed: "green",
  };
  return <Badge label={status} color={map[status] || "gray"} />;
};

// ─── Stat Card ───────────────────────────────────────
export const StatCard = ({ label, value, sub, icon, color = "blue", trend }) => {
  const colors = { blue: "#2563EB", green: "#059669", amber: "#D97706", red: "#DC2626", purple: "#7C3AED" };
  const bgs = { blue: "var(--blue-light)", green: "var(--green-light)", amber: "var(--amber-light)", red: "var(--red-light)", purple: "var(--purple-light)" };
  return (
    <div style={sc.card}>
      <div style={sc.top}>
        <div>
          <div style={sc.label}>{label}</div>
          <div style={{ ...sc.value, color: colors[color] }}>{value}</div>
          {sub && <div style={sc.sub}>{sub}</div>}
        </div>
        {icon && (
          <div style={{ ...sc.iconBox, background: bgs[color], color: colors[color] }}>
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div style={{ ...sc.trend, color: trend.startsWith("+") ? "var(--green)" : "var(--red)" }}>
          {trend.startsWith("+") ? "↑" : "↓"} {trend} vs last month
        </div>
      )}
    </div>
  );
};
const sc = {
  card: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "20px 22px", boxShadow: "var(--shadow-sm)" },
  top: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  label: { fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 },
  value: { fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1 },
  sub: { fontSize: 12, color: "var(--text-muted)", marginTop: 6 },
  iconBox: { width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
  trend: { fontSize: 12, fontWeight: 600, marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" },
};

// ─── Panel ───────────────────────────────────────────
export const Panel = ({ title, subtitle, action, children }) => (
  <div style={pan.wrap}>
    {(title || action) && (
      <div style={pan.head}>
        <div>
          {title && <div style={pan.title}>{title}</div>}
          {subtitle && <div style={pan.subtitle}>{subtitle}</div>}
        </div>
        {action && <div>{action}</div>}
      </div>
    )}
    {children}
  </div>
);
const pan = {
  wrap: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", overflow: "hidden" },
  head: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: "1px solid var(--border)" },
  title: { fontSize: 15, fontWeight: 700, color: "var(--text-primary)" },
  subtitle: { fontSize: 12, color: "var(--text-muted)", marginTop: 2 },
};

// ─── Table ───────────────────────────────────────────
export const Table = ({ heads, children }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "var(--surface2)" }}>
          {heads.map(h => (
            <th key={h} style={{ padding: "10px 20px", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "left", whiteSpace: "nowrap", borderBottom: "1px solid var(--border)" }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

export const Td = ({ children, bold, color, mono, center }) => (
  <td style={{ padding: "13px 20px", fontSize: 13, color: color || (bold ? "var(--text-primary)" : "var(--text-secondary)"), fontWeight: bold ? 700 : 400, fontFamily: mono ? "var(--font-mono)" : "var(--font)", borderBottom: "1px solid var(--border)", textAlign: center ? "center" : "left", whiteSpace: "nowrap" }}>
    {children}
  </td>
);

// ─── Button ──────────────────────────────────────────
export const Btn = ({ children, onClick, variant = "primary", size = "md", icon }) => {
  const variants = {
    primary: { background: "var(--blue)", color: "#fff", border: "none", boxShadow: "0 2px 8px rgba(37,99,235,0.3)" },
    secondary: { background: "var(--surface)", color: "var(--text-secondary)", border: "1.5px solid var(--border)", boxShadow: "none" },
    danger: { background: "var(--red-light)", color: "var(--red)", border: "1.5px solid var(--red-mid)", boxShadow: "none" },
    ghost: { background: "transparent", color: "var(--text-secondary)", border: "none", boxShadow: "none" },
    success: { background: "var(--green-light)", color: "var(--green)", border: "1.5px solid var(--green-mid)", boxShadow: "none" },
  };
  const sizes = {
    sm: { padding: "6px 12px", fontSize: 12, borderRadius: 8 },
    md: { padding: "9px 18px", fontSize: 13, borderRadius: 10 },
    lg: { padding: "12px 24px", fontSize: 15, borderRadius: 11 },
  };
  return (
    <button onClick={onClick} style={{ ...variants[variant], ...sizes[size], fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.15s", fontFamily: "var(--font)" }}>
      {icon && <span>{icon}</span>}{children}
    </button>
  );
};

// ─── Input / Select ──────────────────────────────────
export const Input = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {label && <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>{label}</label>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{ padding: "10px 13px", border: "1.5px solid var(--border)", borderRadius: 9, fontSize: 13, color: "var(--text-primary)", background: "var(--surface)", fontFamily: "var(--font)" }} />
  </div>
);

export const Select = ({ label, value, onChange, options }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {label && <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>{label}</label>}
    <select value={value} onChange={onChange} style={{ padding: "10px 13px", border: "1.5px solid var(--border)", borderRadius: 9, fontSize: 13, color: "var(--text-primary)", background: "var(--surface)", fontFamily: "var(--font)", cursor: "pointer" }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

// ─── Modal ───────────────────────────────────────────
export const Modal = ({ open, onClose, title, children, footer }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div style={mo.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={mo.modal} className="fade-in">
        <div style={mo.head}>
          <span style={mo.title}>{title}</span>
          <button onClick={onClose} style={mo.closeBtn}>✕</button>
        </div>
        <div style={mo.body}>{children}</div>
        {footer && <div style={mo.footer}>{footer}</div>}
      </div>
    </div>
  );
};
const mo = {
  overlay: { position: "fixed", inset: 0, background: "rgba(15,23,51,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500, backdropFilter: "blur(4px)", padding: 20 },
  modal: { background: "var(--surface)", borderRadius: "var(--radius-xl)", width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto", boxShadow: "var(--shadow-xl)", border: "1px solid var(--border)" },
  head: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid var(--border)" },
  title: { fontSize: 17, fontWeight: 800, color: "var(--text-primary)" },
  closeBtn: { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 14, color: "var(--text-secondary)" },
  body: { padding: "22px 24px", display: "flex", flexDirection: "column", gap: 16 },
  footer: { padding: "16px 24px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 10 },
};

// ─── Toast ───────────────────────────────────────────
export const Toast = ({ message, type = "success" }) => {
  if (!message) return null;
  const colors = {
    success: { bg: "var(--green-light)", border: "var(--green-mid)", text: "var(--green)", icon: "✓" },
    error: { bg: "var(--red-light)", border: "var(--red-mid)", text: "var(--red)", icon: "✕" },
    info: { bg: "var(--blue-light)", border: "var(--blue-mid)", text: "var(--blue)", icon: "ℹ" },
  };
  const c = colors[type] || colors.success;
  return (
    <div style={{ position: "fixed", top: 24, right: 24, zIndex: 9999, background: c.bg, border: `1.5px solid ${c.border}`, borderRadius: "var(--radius-md)", padding: "12px 18px", boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: 10, animation: "toastIn 0.3s ease", maxWidth: 400 }}>
      <span style={{ width: 24, height: 24, borderRadius: "50%", background: c.text, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{c.icon}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{message}</span>
    </div>
  );
};

// ─── Empty State ─────────────────────────────────────
export const EmptyState = ({ icon = "○", message = "No data found" }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", gap: 12 }}>
    <div style={{ fontSize: 36, color: "var(--border2)" }}>{icon}</div>
    <div style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 500 }}>{message}</div>
  </div>
);

// ─── Search Bar ──────────────────────────────────────
export const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <div style={{ position: "relative", flex: 1 }}>
    <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} viewBox="0 0 20 20" fill="none" width="15" height="15">
      <circle cx="9" cy="9" r="6" stroke="var(--text-muted)" strokeWidth="1.5"/>
      <path d="M13.5 13.5L17 17" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ paddingLeft: 36, padding: "9px 14px 9px 36px", border: "1.5px solid var(--border)", borderRadius: 10, fontSize: 13, color: "var(--text-primary)", background: "var(--surface)", width: "100%", fontFamily: "var(--font)" }} />
  </div>
);

// ─── Filter Tabs ──────────────────────────────────────
export const FilterTabs = ({ tabs, active, onChange }) => (
  <div style={{ display: "flex", gap: 6 }}>
    {tabs.map(t => (
      <button key={t} onClick={() => onChange(t)} style={{ padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${active === t ? "var(--blue)" : "var(--border)"}`, background: active === t ? "var(--blue-light)" : "var(--surface)", color: active === t ? "var(--blue)" : "var(--text-secondary)", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", fontFamily: "var(--font)" }}>
        {t}
      </button>
    ))}
  </div>
);

// ─── Progress Bar ─────────────────────────────────────
export const ProgressBar = ({ value, color }) => {
  const c = color || (value >= 80 ? "var(--green)" : value >= 60 ? "var(--amber)" : "var(--red)");
  return (
    <div style={{ height: 6, background: "var(--border)", borderRadius: 10, overflow: "hidden", width: "100%" }}>
      <div style={{ height: "100%", width: `${value}%`, background: c, borderRadius: 10, transition: "width 0.5s ease" }} />
    </div>
  );
};
