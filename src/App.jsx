import React, { useState } from "react";
import {
  BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation,
} from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Programs from "./pages/Programs";
import Production from "./pages/Production";
import Quality from "./pages/Quality";
import SupplyChain from "./pages/SupplyChain";
import Shipments from "./pages/Shipments";
import AfterSales from "./pages/AfterSales";
import Documents from "./pages/Documents";
import Analytics from "./pages/Analytics";

const pageTitles = {
  "/dashboard":   "Dashboard",
  "/programs":    "Programs & Projects",
  "/production":  "Production Visibility",
  "/quality":     "Quality & Compliance",
  "/supplychain": "Supply Chain & Materials",
  "/shipments":   "Shipments & Logistics",
  "/aftersales":  "After-Sales / RMA",
  "/documents":   "Documents & Knowledge",
  "/analytics":   "Analytics & Reporting",
};

const ADMIN_ONLY_PAGES = ["production", "supplychain", "analytics"];

function PortalLayout({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = user.role === "Admin";
  const sidebarWidth = collapsed ? 68 : 248;
  const title = pageTitles[location.pathname] || "Dashboard";
  const activeKey = location.pathname.replace("/", "") || "dashboard";

  const handleNav = (pageId) => {
    if (!isAdmin && ADMIN_ONLY_PAGES.includes(pageId)) return;
    navigate("/" + pageId);
  };

  return (
    <div style={styles.app}>
      <Sidebar
        active={activeKey}
        setActive={handleNav}
        user={user}
        onLogout={onLogout}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isAdmin={isAdmin}
        adminOnlyPages={ADMIN_ONLY_PAGES}
      />
      <div style={{ ...styles.main, marginLeft: sidebarWidth, transition: "margin-left 0.25s ease" }}>
        <Header title={title} user={user} />
        <div style={styles.content}>
          <Routes>
            <Route path="/dashboard"   element={<Dashboard />} />
            <Route path="/programs"    element={<Programs />} />
            <Route path="/shipments"   element={<Shipments />} />
            <Route path="/quality"     element={<Quality />} />
            <Route path="/aftersales"  element={<AfterSales />} />
            <Route path="/documents"   element={<Documents />} />
            <Route path="/production"  element={isAdmin ? <Production /> : <Navigate to="/dashboard" />} />
            <Route path="/supplychain" element={isAdmin ? <SupplyChain /> : <Navigate to="/dashboard" />} />
            <Route path="/analytics"   element={isAdmin ? <Analytics /> : <Navigate to="/dashboard" />} />
            <Route path="*"            element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        {!user ? (
          <Login onLogin={(u) => setUser(u)} />
        ) : (
          <PortalLayout user={user} onLogout={() => setUser(null)} />
        )}
      </UserContext.Provider>
    </BrowserRouter>
  );
}

const styles = {
  app: { background: "var(--bg)", minHeight: "100vh", fontFamily: "var(--font)", color: "var(--text-primary)" },
  main: { display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--bg)" },
  content: { flex: 1 },
};
