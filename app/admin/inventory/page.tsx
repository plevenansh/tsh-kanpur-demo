"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { inventoryItems, purchaseOrders } from "@/lib/mock-data";
import { Package, AlertTriangle, Plus, CheckCircle2, X, TrendingDown } from "lucide-react";

const conditionStyle: Record<string, string> = {
  New: "bg-green-50 text-green-700",
  Good: "bg-blue-50 text-blue-700",
  Fair: "bg-amber-50 text-amber-700",
  Poor: "bg-red-50 text-red-700",
};

const poStatus: Record<string, string> = {
  delivered: "bg-green-50 text-green-700",
  ordered: "bg-blue-50 text-blue-700",
  pending: "bg-amber-50 text-amber-700",
};

function RaisePOModal({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ item: "", vendor: "", quantity: "", cost: "", urgency: "Normal" });
  if (done) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#c8e64c30" }}>
          <CheckCircle2 className="w-8 h-8" style={{ color: "#3a6a00" }} />
        </div>
        <h3 className="font-black text-xl mb-1" style={{ fontFamily: "var(--font-heading)" }}>PO Raised!</h3>
        <p className="text-sm text-neutral-500 mb-5">Purchase order for "{form.item}" sent to vendor.</p>
        <Button className="w-full rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={onClose}>Done</Button>
      </div>
    </div>
  );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <h3 className="font-bold text-neutral-900">Raise Purchase Order</h3>
          <button onClick={onClose}><X className="w-4 h-4 text-neutral-400" /></button>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: "Item Description", key: "item", placeholder: "e.g. Yonex Shuttlecocks ×48" },
            { label: "Vendor", key: "vendor", placeholder: "e.g. Sports World India" },
            { label: "Quantity", key: "quantity", placeholder: "e.g. 24" },
            { label: "Estimated Cost (₹)", key: "cost", placeholder: "e.g. 16800" },
          ].map((f) => (
            <div key={f.key}>
              <label className="text-xs font-medium text-neutral-500 block mb-1.5">{f.label}</label>
              <input value={(form as Record<string, string>)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder} className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-2.5 text-sm outline-none" />
            </div>
          ))}
          <div>
            <label className="text-xs font-medium text-neutral-500 block mb-1.5">Urgency</label>
            <div className="flex gap-2">
              {["Normal", "High", "Urgent"].map((u) => (
                <button key={u} onClick={() => setForm({ ...form, urgency: u })}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold border transition-all"
                  style={form.urgency === u ? { background: "#c8e64c", color: "#1a1a1a", borderColor: "#c8e64c" } : { borderColor: "#e5e7eb", color: "#666" }}>
                  {u}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" className="flex-1 rounded-xl" onClick={onClose}>Cancel</Button>
            <Button className="flex-1 rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }}
              onClick={() => form.item && form.vendor ? setDone(true) : alert("Fill item and vendor")}>
              Raise PO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminInventoryPage() {
  const [raising, setRaising] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const lowStock = inventoryItems.filter((i) => i.quantity <= i.threshold);
  const categories = ["All", ...new Set(inventoryItems.map((i) => i.category))];
  const filtered = categoryFilter === "All" ? inventoryItems : inventoryItems.filter((i) => i.category === categoryFilter);
  const totalValue = inventoryItems.reduce((a, i) => a + i.quantity * i.unitCost, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>Procurement & Inventory</h1>
          <p className="text-neutral-500 text-sm">Track equipment stock, raise purchase orders, manage vendors.</p>
        </div>
        <Button className="rounded-xl font-bold gap-2 shrink-0" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={() => setRaising(true)}>
          <Plus className="w-4 h-4" /> Raise PO
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Items", value: inventoryItems.length, icon: "📦" },
          { label: "Low Stock Alerts", value: lowStock.length, icon: "⚠️" },
          { label: "Inventory Value", value: `₹${(totalValue / 1000).toFixed(1)}K`, icon: "💰" },
          { label: "Open POs", value: purchaseOrders.filter(p => p.status !== "delivered").length, icon: "📋" },
        ].map((s) => (
          <Card key={s.label} className={`border-neutral-100 ${s.label === "Low Stock Alerts" && lowStock.length > 0 ? "border-amber-200 bg-amber-50/30" : ""}`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-2xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</p>
              <p className="text-xs text-neutral-400">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Low stock alerts */}
      {lowStock.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Low Stock Alert</p>
            <p className="text-xs text-amber-700 mt-0.5">
              {lowStock.map(i => i.name).join(", ")} — these items are at or below minimum threshold.
            </p>
          </div>
          <Button size="sm" className="ml-auto shrink-0 rounded-xl text-xs font-bold" style={{ background: "#f59e0b", color: "white" }}
            onClick={() => setRaising(true)}>Raise PO</Button>
        </div>
      )}

      {/* Category filter + table */}
      <Card className="border-neutral-100">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="font-bold text-neutral-900">Inventory Register</h2>
            <div className="flex gap-2">
              {categories.map((c) => (
                <button key={c} onClick={() => setCategoryFilter(c)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all"
                  style={categoryFilter === c ? { background: "#c8e64c", color: "#1a1a1a", borderColor: "#c8e64c" } : { borderColor: "#e5e7eb", color: "#666" }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-[#fafafa]">
                  {["Item", "Sport", "Category", "Qty", "Min", "Status", "Last Restocked", "Unit Cost"].map((h) => (
                    <th key={h} className="text-left p-3 text-xs text-neutral-500 font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => {
                  const low = item.quantity <= item.threshold;
                  return (
                    <tr key={item.id} className={`border-b border-neutral-50 hover:bg-neutral-50 ${i % 2 === 0 ? "" : "bg-[#fdfdfd]"}`}>
                      <td className="p-3 font-semibold text-neutral-900 whitespace-nowrap">{item.name}</td>
                      <td className="p-3 text-neutral-600">{item.sport}</td>
                      <td className="p-3"><Badge className={`text-[10px] border-0 ${item.category === "Consumable" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>{item.category}</Badge></td>
                      <td className="p-3">
                        <span className={`font-bold ${low ? "text-red-600" : "text-neutral-900"}`}>{item.quantity}</span>
                      </td>
                      <td className="p-3 text-neutral-400">{item.threshold}</td>
                      <td className="p-3">
                        {low ? (
                          <Badge className="bg-red-50 text-red-600 border-red-100 text-[10px]">Low Stock</Badge>
                        ) : (
                          <Badge className={`text-[10px] border-0 ${conditionStyle[item.condition]}`}>{item.condition}</Badge>
                        )}
                      </td>
                      <td className="p-3 text-neutral-400 text-xs whitespace-nowrap">{new Date(item.lastRestocked).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                      <td className="p-3 text-neutral-700 font-medium">₹{item.unitCost.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Orders */}
      <Card className="border-neutral-100">
        <CardContent className="p-5">
          <h2 className="font-bold text-neutral-900 mb-4">Purchase Orders</h2>
          <div className="space-y-3">
            {purchaseOrders.map((po) => (
              <div key={po.id} className="flex items-center gap-4 rounded-xl border border-neutral-100 bg-[#fafafa] p-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-neutral-900">{po.item}</p>
                  <p className="text-xs text-neutral-400">{po.vendor} · {new Date(po.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
                {po.urgency === "High" && (
                  <Badge className="bg-red-50 text-red-600 border-red-100 text-xs shrink-0">{po.urgency} Priority</Badge>
                )}
                <div className="text-right shrink-0">
                  <p className="font-bold text-neutral-900">₹{po.amount.toLocaleString()}</p>
                  <Badge className={`text-[10px] ${poStatus[po.status]} border-0 mt-0.5`}>{po.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {raising && <RaisePOModal onClose={() => setRaising(false)} />}
    </div>
  );
}
