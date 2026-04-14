import React from "react";

const navItems = [
  { id: "dashboard",   label: "Dashboard",           icon: "⊞" },
  { id: "programs",    label: "Programs & Projects",  icon: "◈" },
  { id: "production",  label: "Production",           icon: "⚙", adminOnly: true },
  { id: "quality",     label: "Quality & Compliance", icon: "✓" },
  { id: "supplychain", label: "Supply Chain",         icon: "⬡", adminOnly: true },
  { id: "shipments",   label: "Shipments",            icon: "➤" },
  { id: "aftersales",  label: "After-Sales / RMA",    icon: "↩" },
  { id: "documents",   label: "Documents",            icon: "❑" },
  { id: "analytics",   label: "Analytics",            icon: "◎", adminOnly: true },
];

const Sidebar = ({ active, setActive, user, onLogout, collapsed, setCollapsed, isAdmin }) => {
  const roleColor = isAdmin ? "#2563EB" : "#059669";
  const roleBg   = isAdmin ? "#EFF6FF"  : "#ECFDF5";
  const roleLabel = isAdmin ? "Admin"   : "Customer";

  return (
    <aside style={{ ...s.sidebar, width: collapsed ? 68 : 248 }}>
      {/* Logo */}
      <div style={s.logoWrap} onClick={() => setCollapsed(!collapsed)} title="Toggle sidebar">
        <div style={s.logoIcon}>
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
            <rect width="12" height="12" rx="3" fill="#fff"/>
            <rect x="16" width="12" height="12" rx="3" fill="rgba(255,255,255,0.6)"/>
            <rect y="16" width="12" height="12" rx="3" fill="rgba(255,255,255,0.6)"/>
            <rect x="16" y="16" width="12" height="12" rx="3" fill="rgba(255,255,255,0.3)"/>
          </svg>
        </div>
        {!collapsed && (
          <div>
            <div style={s.brandName}>Nexgile</div>
            <div style={s.brandSub}>FactoryIQ</div>
          </div>
        )}
      </div>

      {/* Role badge — clearly shows who is logged in */}
      {!collapsed && (
        <div style={{ padding: "10px 14px 4px" }}>
          <div style={{ background: roleBg, color: roleColor, border: `1.5px solid ${roleColor}33`, borderRadius: 8, padding: "7px 12px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: roleColor, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: roleColor }}>{roleLabel} Account</div>
              <div style={{ fontSize: 10, color: roleColor, opacity: 0.7, marginTop: 1 }}>
                {isAdmin ? "Full access" : "Limited access"}
              </div>
            </div>
          </div>
        </div>
      )}

      {!collapsed && <div style={s.navSection}>NAVIGATION</div>}

      {/* Nav items */}
      <nav style={s.nav}>
        {navItems.map((item) => {
          const isActive   = active === item.id;
          const isLocked   = !isAdmin && item.adminOnly;

          return (
            <button
              key={item.id}
              onClick={() => !isLocked && setActive(item.id)}
              title={collapsed ? (isLocked ? `${item.label} — Admin only` : item.label) : ""}
              style={{
                ...s.navBtn,
                background:  isActive  ? "#EFF6FF" : isLocked ? "#FAFAFA" : "transparent",
                color:       isLocked  ? "#C4CFDE" : isActive  ? "#2563EB" : "#4A5578",
                borderLeft:  isActive  ? "3px solid #2563EB" : "3px solid transparent",
                fontWeight:  isActive  ? 700 : 500,
                cursor:      isLocked  ? "not-allowed" : "pointer",
                justifyContent: collapsed ? "center" : "flex-start",
                opacity: isLocked ? 0.6 : 1,
              }}
            >
              <span style={{
                ...s.navIcon,
                background: isActive  ? "#2563EB" : isLocked ? "#F0F3F8" : "transparent",
                color:      isActive  ? "#fff"    : isLocked ? "#C4CFDE" : "#8C97B8",
              }}>
                {item.icon}
              </span>
              {!collapsed && (
                <span style={{ fontSize: 13, flex: 1, textAlign: "left" }}>{item.label}</span>
              )}
              {!collapsed && isLocked && (
                <span style={{ fontSize: 11, color: "#C4CFDE" }}>🔒</span>
              )}
              {!collapsed && item.adminOnly && isAdmin && (
                <span style={{ fontSize: 9, background: "#EFF6FF", color: "#2563EB", borderRadius: 4, padding: "1px 5px", fontWeight: 700, letterSpacing: 0.3 }}>ADMIN</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom user card */}
      <div style={s.bottom}>
        <div style={s.userCard}>
          <div style={{ ...s.avatar, background: isAdmin ? "linear-gradient(135deg, #2563EB, #7C3AED)" : "linear-gradient(135deg, #059669, #0EA5E9)" }}>
            {user.name.slice(0, 2).toUpperCase()}
          </div>
          {!collapsed && (
            <div style={s.userInfo}>
              <div style={s.userName}>{user.name}</div>
              <div style={{ ...s.userRole, color: roleColor }}>{roleLabel}</div>
            </div>
          )}
        </div>
        {!collapsed && (
          <button onClick={onLogout} style={s.logoutBtn}>↩ Logout</button>
        )}
      </div>
    </aside>
  );
};

const s = {
  sidebar: { background: "#fff", borderRight: "1px solid #E4E9F4", display: "flex", flexDirection: "column", height: "100vh", position: "fixed", left: 0, top: 0, transition: "width 0.25s ease", zIndex: 100, overflow: "hidden" },
  logoWrap: { display: "flex", alignItems: "center", gap: 12, padding: "20px 16px", cursor: "pointer", borderBottom: "1px solid #E4E9F4", minHeight: 72 },
  logoIcon: { width: 40, height: 40, borderRadius: 11, background: "linear-gradient(135deg, #2563EB, #0EA5E9)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 10px rgba(37,99,235,0.3)" },
  brandName: { fontSize: 15, fontWeight: 800, color: "#0F1733", letterSpacing: "-0.3px" },
  brandSub: { fontSize: 11, color: "#8C97B8", marginTop: 1 },
  navSection: { padding: "14px 20px 4px", fontSize: 10, fontWeight: 700, color: "#8C97B8", letterSpacing: 1.2, textTransform: "uppercase" },
  nav: { flex: 1, padding: "4px 10px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" },
  navBtn: { display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 10, border: "none", fontSize: 13, width: "100%", transition: "all 0.15s", whiteSpace: "nowrap" },
  navIcon: { width: 28, height: 28, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, transition: "all 0.15s" },
  bottom: { padding: "12px", borderTop: "1px solid #E4E9F4" },
  userCard: { display: "flex", alignItems: "center", gap: 10, padding: "8px", borderRadius: 10, background: "#F8FAFF", marginBottom: 8 },
  avatar: { width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13, flexShrink: 0 },
  userInfo: { overflow: "hidden" },
  userName: { fontSize: 13, fontWeight: 700, color: "#0F1733", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  userRole: { fontSize: 11, marginTop: 1, fontWeight: 600 },
  logoutBtn: { width: "100%", padding: "8px", background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 9, color: "#DC2626", fontSize: 12, fontWeight: 700, cursor: "pointer" },
};

export default Sidebar;
