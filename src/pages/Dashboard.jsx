import React from "react";
import { useUser } from "../context/UserContext";
import { kpis, programs, workOrders, qualityEvents, notifications } from "../data/staticData";
import { StatCard, Panel, StatusBadge, ProgressBar } from "../components/UI";

// Customer sees only their own programs (GreenDrive Motors = jane@customer.com)
const CUSTOMER_PROGRAMS = ["PRG-002"];

const Dashboard = () => {
  const user = useUser();
  const isAdmin = user?.role === "Admin";

  const visiblePrograms = isAdmin
    ? programs
    : programs.filter(p => CUSTOMER_PROGRAMS.includes(p.id));

  return (
    <div style={s.page}>

      {/* Role-specific welcome banner */}
      <div style={{ ...s.welcomeBar, background: isAdmin ? "linear-gradient(135deg, #1D40AF, #2563EB)" : "linear-gradient(135deg, #065F46, #059669)" }}>
        <div>
          <div style={s.welcomeTitle}>
            {isAdmin ? `Welcome back, ${user?.name} 👋` : `Hello, ${user?.name} 👋`}
          </div>
          <div style={s.welcomeSub}>
            {isAdmin
              ? "Full portal access — managing all programs, production & analytics."
              : "Customer portal — viewing your programs, shipments & documents."}
          </div>
        </div>
        <div style={s.roleTag}>
          <span style={{ fontSize: 13, fontWeight: 800 }}>
            {isAdmin ? "🔑 Admin View" : "👤 Customer View"}
          </span>
          <span style={{ fontSize: 11, opacity: 0.7, marginTop: 2, display: "block" }}>
            {isAdmin ? "All programs visible" : `${visiblePrograms.length} program(s) assigned`}
          </span>
        </div>
      </div>

      {/* KPI Grid — Admin sees all 6, Customer sees only 3 relevant ones */}
      <div style={{ display: "grid", gridTemplateColumns: isAdmin ? "repeat(6,1fr)" : "repeat(3,1fr)", gap: 16 }}>
        {isAdmin ? (
          <>
            <StatCard label="On-Time Delivery" value={`${kpis.onTimeDelivery}%`} icon="✈" color="blue" trend="+2.1%" />
            <StatCard label="Quality Yield"     value={`${kpis.qualityYield}%`}   icon="✓" color="green" trend="+0.8%" />
            <StatCard label="Capacity Util."    value={`${kpis.capacityUtilization}%`} icon="⚙" color="purple" />
            <StatCard label="Open NCRs"         value={kpis.openNCRs}             icon="⚠" color="red" sub="Requires attention" />
            <StatCard label="Active Programs"   value={kpis.totalPrograms}        icon="◈" color="blue" sub={`${kpis.greenPrograms}G · ${kpis.yellowPrograms}Y · ${kpis.redPrograms}R`} />
            <StatCard label="Pending Shipments" value={kpis.pendingShipments}     icon="➤" color="amber" />
          </>
        ) : (
          <>
            <StatCard label="My Programs"  value={visiblePrograms.length}  icon="◈" color="green" sub="Assigned to you" />
            <StatCard label="Open NCRs"    value={qualityEvents.filter(e => CUSTOMER_PROGRAMS.some(p => e.program === p) && e.status !== "Closed").length} icon="⚠" color="red" sub="Your programs" />
            <StatCard label="My Shipments" value={kpis.pendingShipments}   icon="➤" color="blue" sub="In progress" />
          </>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isAdmin ? "1.5fr 1fr" : "1fr", gap: 20 }}>
        {/* Programs panel */}
        <Panel
          title={isAdmin ? "All Programs — Portfolio View" : "My Programs"}
          subtitle={isAdmin ? "Health & status overview" : "Programs assigned to your account"}
        >
          <div>
            {visiblePrograms.map((p) => (
              <div key={p.id} style={s.progRow} className="fade-in">
                <StatusBadge status={p.status} />
                <div style={s.progInfo}>
                  <div style={s.progName}>{p.name}</div>
                  <div style={s.progMeta}>{p.customer} · {p.site} · <span style={{ color: "#2563EB", fontWeight: 600 }}>{p.phase}</span></div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, width: 140 }}>
                  <ProgressBar value={p.health} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#4A5578", width: 30 }}>{p.health}%</span>
                </div>
              </div>
            ))}
            {!isAdmin && (
              <div style={s.customerNote}>
                🔒 Only programs assigned to your account are visible here.
              </div>
            )}
          </div>
        </Panel>

        {/* Right column — Admin sees production + quality, Customer sees quality alerts for their programs */}
        {isAdmin && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Panel title="Live Production Lines" subtitle="Real-time status">
              <div>
                {workOrders.slice(0, 4).map(wo => (
                  <div key={wo.id} style={s.woRow}>
                    <div style={{ ...s.woDot, background: wo.status === "Running" ? "#10B981" : "#F59E0B" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#0F1733" }}>{wo.id} <span style={{ color: "#8C97B8", fontWeight: 400 }}>{wo.stage}</span></div>
                      <div style={{ fontSize: 12, color: "#8C97B8", marginTop: 1 }}>{wo.line} · {wo.shift}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: wo.yield >= 97 ? "#059669" : wo.yield >= 90 ? "#D97706" : "#DC2626" }}>{wo.yield}% yield</div>
                      <StatusBadge status={wo.status} />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Quality Alerts" subtitle="Open events">
              <div>
                {qualityEvents.filter(e => e.status !== "Closed").slice(0, 4).map(ev => (
                  <div key={ev.id} style={s.qaRow}>
                    <div style={{ ...s.qaBadge, background: ev.severity === "Major" ? "#FEF2F2" : "#FFFBEB", color: ev.severity === "Major" ? "#DC2626" : "#D97706" }}>{ev.type}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#0F1733" }}>{ev.description}</div>
                      <div style={{ fontSize: 11, color: "#8C97B8", marginTop: 2 }}>{ev.id} · {ev.date}</div>
                    </div>
                    <StatusBadge status={ev.status} />
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}
      </div>

      {/* Notifications — filtered for customer */}
      <Panel title="Recent Notifications" subtitle="Unread alerts">
        <div>
          {notifications
            .filter(n => !n.read)
            .filter(n => isAdmin || n.type !== "alert") // customers don't see internal alerts
            .map(n => (
              <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 22px", borderBottom: "1px solid #E4E9F4" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: n.type === "alert" ? "#EF4444" : "#F59E0B", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#0F1733", fontWeight: 500, flex: 1 }}>{n.message}</span>
                <span style={{ fontSize: 11, color: "#8C97B8", whiteSpace: "nowrap" }}>{n.time}</span>
              </div>
            ))}
        </div>
      </Panel>
    </div>
  );
};

const s = {
  page: { padding: "28px", display: "flex", flexDirection: "column", gap: 24 },
  welcomeBar: { borderRadius: 16, padding: "22px 28px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" },
  welcomeTitle: { fontSize: 20, fontWeight: 800, letterSpacing: "-0.3px" },
  welcomeSub: { fontSize: 13, opacity: 0.8, marginTop: 4 },
  roleTag: { background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 18px", backdropFilter: "blur(8px)", textAlign: "center" },
  progRow: { display: "flex", alignItems: "center", gap: 14, padding: "14px 22px", borderBottom: "1px solid #E4E9F4" },
  progInfo: { flex: 1 },
  progName: { fontSize: 13, fontWeight: 700, color: "#0F1733" },
  progMeta: { fontSize: 12, color: "#8C97B8", marginTop: 2 },
  customerNote: { padding: "12px 22px", fontSize: 12, color: "#8C97B8", background: "#F8FAFF", borderTop: "1px solid #E4E9F4", fontStyle: "italic" },
  woRow: { display: "flex", alignItems: "center", gap: 12, padding: "12px 22px", borderBottom: "1px solid #E4E9F4" },
  woDot: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  qaRow: { display: "flex", alignItems: "center", gap: 12, padding: "12px 22px", borderBottom: "1px solid #E4E9F4" },
  qaBadge: { borderRadius: 6, padding: "3px 9px", fontSize: 11, fontWeight: 700, flexShrink: 0 },
};

export default Dashboard;
