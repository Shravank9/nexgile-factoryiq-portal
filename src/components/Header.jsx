import React, { useState } from "react";
import { notifications } from "../data/staticData";

const Header = ({ title, user }) => {
  const [showNotif, setShowNotif] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  const typeColors = { alert: "var(--red)", warning: "var(--amber)", info: "var(--blue)" };
  const typeBg = { alert: "var(--red-light)", warning: "var(--amber-light)", info: "var(--blue-light)" };

  return (
    <header style={s.header}>
      <div style={s.left}>
        <div style={s.titleRow}>
          <h1 style={s.title}>{title}</h1>
        </div>
        <div style={s.breadcrumb}>
          Manufacturing Excellence Portal &rsaquo; <span style={{ color: "var(--blue)", fontWeight: 600 }}>{title}</span>
        </div>
      </div>

      <div style={s.right}>
        {/* Search */}
        <div style={s.searchWrap}>
          <svg style={s.searchIcon} viewBox="0 0 20 20" fill="none" width="16" height="16">
            <circle cx="9" cy="9" r="6" stroke="var(--text-muted)" strokeWidth="1.5"/>
            <path d="M13.5 13.5L17 17" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input placeholder="Search programs, orders, docs..." style={s.search} />
        </div>

        {/* Role badge */}
        <div style={{
          padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700,
          background: user.role === "Admin" ? "#EFF6FF" : "#ECFDF5",
          color:      user.role === "Admin" ? "#2563EB"  : "#059669",
          border: `1.5px solid ${user.role === "Admin" ? "#BFDBFE" : "#6EE7B7"}`,
        }}>
          {user.role === "Admin" ? "🔑 Admin" : "👤 Customer"}
        </div>

        {/* Date */}
        <div style={s.dateBadge}>
          {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
        </div>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button style={s.notifBtn} onClick={() => setShowNotif(!showNotif)}>
            <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
              <path d="M10 2a6 6 0 0 0-6 6v2l-1.5 2.5A1 1 0 0 0 3.5 14h13a1 1 0 0 0 .866-1.5L16 10V8a6 6 0 0 0-6-6z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 18a2 2 0 0 0 2-2H8a2 2 0 0 0 2 2z" fill="currentColor"/>
            </svg>
            {unread > 0 && <span style={s.badge}>{unread}</span>}
          </button>

          {showNotif && (
            <div style={s.dropdown}>
              <div style={s.dropHead}>
                <span style={s.dropTitle}>Notifications</span>
                <span style={s.dropCount}>{unread} unread</span>
              </div>
              <div style={{ maxHeight: 320, overflowY: "auto" }}>
                {notifications.map(n => (
                  <div key={n.id} style={{ ...s.notifItem, background: n.read ? "transparent" : typeBg[n.type] }}>
                    <div style={{ ...s.notifDot, background: typeColors[n.type] }} />
                    <div style={s.notifBody}>
                      <div style={{ ...s.notifMsg, fontWeight: n.read ? 400 : 600 }}>{n.message}</div>
                      <div style={s.notifTime}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User avatar */}
        <div style={s.userAvatar}>
          {user.name.slice(0, 2).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

const s = {
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 28px", height: 72,
    background: "var(--surface)", borderBottom: "1px solid var(--border)",
    position: "sticky", top: 0, zIndex: 50,
    boxShadow: "var(--shadow-sm)",
  },
  left: {},
  titleRow: { display: "flex", alignItems: "center", gap: 10 },
  title: { fontSize: 18, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.3px" },
  breadcrumb: { fontSize: 12, color: "var(--text-muted)", marginTop: 2 },
  right: { display: "flex", alignItems: "center", gap: 12 },
  searchWrap: { position: "relative" },
  searchIcon: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" },
  search: {
    padding: "9px 14px 9px 36px", border: "1.5px solid var(--border)", borderRadius: 10,
    fontSize: 13, color: "var(--text-primary)", background: "var(--bg)", width: 280,
    transition: "all 0.15s",
  },
  dateBadge: { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, whiteSpace: "nowrap" },
  notifBtn: {
    position: "relative", width: 40, height: 40,
    background: "var(--surface2)", border: "1.5px solid var(--border)", borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "var(--text-secondary)", cursor: "pointer",
  },
  badge: {
    position: "absolute", top: -4, right: -4,
    background: "var(--red)", color: "#fff",
    borderRadius: "50%", width: 18, height: 18,
    fontSize: 10, fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center",
    border: "2px solid var(--surface)",
  },
  dropdown: {
    position: "absolute", right: 0, top: "calc(100% + 10px)",
    background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)", width: 360,
    boxShadow: "var(--shadow-xl)", zIndex: 200,
    overflow: "hidden",
  },
  dropHead: { padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" },
  dropTitle: { fontWeight: 700, fontSize: 14, color: "var(--text-primary)" },
  dropCount: { fontSize: 12, color: "var(--blue)", fontWeight: 600, background: "var(--blue-light)", padding: "2px 8px", borderRadius: 20 },
  notifItem: { display: "flex", gap: 12, padding: "12px 18px", borderBottom: "1px solid var(--border)", alignItems: "flex-start", transition: "background 0.1s" },
  notifDot: { width: 8, height: 8, borderRadius: "50%", marginTop: 5, flexShrink: 0 },
  notifBody: {},
  notifMsg: { fontSize: 13, color: "var(--text-primary)", lineHeight: 1.4 },
  notifTime: { fontSize: 11, color: "var(--text-muted)", marginTop: 3 },
  userAvatar: {
    width: 38, height: 38, borderRadius: 10,
    background: "linear-gradient(135deg, #2563EB, #7C3AED)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer",
    boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
  },
};

export default Header;
