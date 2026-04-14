# Nexgile–FactoryIQ Manufacturing Excellence Portal

A full React web portal built as per the Nexgile functional requirements.
Uses **static data only** — no database, no backend.

---

## 🚀 How to Run in VS Code

### Step 1 — Open the project folder in VS Code
```
File → Open Folder → nexgile-portal
```

### Step 2 — Open the Terminal in VS Code
```
Terminal → New Terminal
```

### Step 3 — Install dependencies
```bash
npm install
```

### Step 4 — Start the app
```bash
npm start
```
The app will open at **http://localhost:3000**

---

## 🔑 Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@nexgile.com | admin123 |
| Customer | jane@customer.com | customer123 |

---

## 📋 Pages Included

| Page | Description |
|------|-------------|
| Dashboard | KPIs, program health, live production, quality alerts |
| Programs & Projects | Portfolio view with milestone timelines |
| Production Visibility | Work orders, yield, WIP, line status |
| Quality & Compliance | NCR/CAPA, audits, SPC charts |
| Supply Chain | Inventory, PO tracker, supplier scorecards |
| Shipments | Shipment tracker with status progress |
| After-Sales / RMA | RMA records, warranty, repair tracking |
| Documents | BOM, ECO/ECR, certifications, compliance packs |
| Analytics & Reporting | Charts, dashboards, self-serve export |

---

## 📁 Project Structure

```
src/
  data/
    staticData.js       ← All static data (no DB)
  components/
    Login.jsx           ← Login page
    Sidebar.jsx         ← Navigation sidebar
    Header.jsx          ← Top header with notifications
  pages/
    Dashboard.jsx
    Programs.jsx
    Production.jsx
    Quality.jsx
    SupplyChain.jsx
    Shipments.jsx
    AfterSales.jsx
    Documents.jsx
    Analytics.jsx
  App.jsx               ← Main app with routing
  index.jsx             ← Entry point
```

---

Built for Nexgile–FactoryIQ assignment | React + Static Data | No Database
