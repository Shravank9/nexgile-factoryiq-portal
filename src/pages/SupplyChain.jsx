import React, { useState } from "react";
import { inventory, purchaseOrders } from "../data/staticData";
import { StatCard, Panel, Table, Td, StatusBadge, Toast, Btn } from "../components/UI";

const SupplyChain = () => {
  const [toast, setToast] = useState("");
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 3000); };
  const lowStock = inventory.filter(i => i.available <= i.minThreshold).length;

  return (
    <div style={s.page}>
      <Toast message={toast} />
      <div style={s.kpiGrid}>
        <StatCard label="Total SKUs" value={inventory.length} icon="📦" color="blue" />
        <StatCard label="Low Stock Alerts" value={lowStock} icon="⚠" color="red" sub="Below threshold" />
        <StatCard label="Active POs" value={purchaseOrders.filter(p => p.status !== "Delivered").length} icon="🛒" color="amber" />
        <StatCard label="Total PO Value" value={"₹" + (purchaseOrders.reduce((a, p) => a + p.amount, 0) / 1000).toFixed(0) + "K"} icon="₹" color="green" />
      </div>

      <Panel title="Inventory Overview" subtitle="Global stock across all facilities">
        <Table heads={["SKU", "Item", "Total Stock", "Allocated", "Available", "Min Threshold", "Location", "Status"]}>
          {inventory.map(inv => {
            const low = inv.available <= inv.minThreshold;
            return (
              <tr key={inv.id}>
                <Td mono bold color="var(--blue)">{inv.sku}</Td>
                <Td bold color="var(--text-primary)">{inv.item}</Td>
                <Td>{inv.stock.toLocaleString()}</Td>
                <Td>{inv.allocated.toLocaleString()}</Td>
                <Td bold color={low ? "var(--red)" : "var(--green)"}>{inv.available.toLocaleString()}</Td>
                <Td>{inv.minThreshold}</Td>
                <Td>{inv.location}</Td>
                <Td><StatusBadge status={low ? "At Risk" : "Completed"} /></Td>
              </tr>
            );
          })}
        </Table>
      </Panel>

      <Panel title="Purchase Orders" subtitle="Supplier tracking & lead times">
        <Table heads={["PO ID", "Supplier", "Item", "Qty", "Amount", "Status", "Lead Time", "ETA", "Action"]}>
          {purchaseOrders.map(po => (
            <tr key={po.id}>
              <Td mono bold color="var(--blue)">{po.id}</Td>
              <Td bold color="var(--text-primary)">{po.supplier}</Td>
              <Td>{po.item}</Td>
              <Td>{po.qty.toLocaleString()}</Td>
              <Td bold>₹{po.amount.toLocaleString()}</Td>
              <Td><StatusBadge status={po.status} /></Td>
              <Td>{po.leadTime}</Td>
              <Td>{po.eta}</Td>
              <Td>
                <button onClick={() => showToast(`Viewing PO ${po.id}`)} style={{ background: "var(--blue-light)", color: "var(--blue)", border: "1px solid var(--blue-mid)", borderRadius: 7, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>View</button>
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  );
};

const s = {
  page: { padding: "28px", display: "flex", flexDirection: "column", gap: 20 },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 },
};

export default SupplyChain;
