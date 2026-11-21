"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminTransactions, adminRevenueByType, monthlyForecast } from "@/lib/mock-data";
import { IndianRupee, TrendingUp, Download, Search, AlertCircle, CheckCircle2, Clock, X } from "lucide-react";

const typeColors: Record<string, string> = {
  Membership: "bg-lime-50 text-lime-700",
  Coaching: "bg-blue-50 text-blue-700",
  Competition: "bg-amber-50 text-amber-700",
  Other: "bg-neutral-100 text-neutral-600",
};
const statusStyle: Record<string, { bg: string; text: string }> = {
  paid: { bg: "bg-green-50", text: "text-green-700" },
  pending: { bg: "bg-amber-50", text: "text-amber-700" },
  failed: { bg: "bg-red-50", text: "text-red-700" },
};

const maxForecast = Math.max(...monthlyForecast.map(d => Math.max(d.actual ?? 0, d.forecast)));

export default function AdminBillingPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const totalRevenue = adminTransactions.filter(t => t.status === "paid").reduce((a, t) => a + t.total, 0);
  const pendingAmount = adminTransactions.filter(t => t.status === "pending").reduce((a, t) => a + t.total, 0);
  const totalTransactions = adminTransactions.length;

  const filtered = adminTransactions.filter(t => {
    const matchQ = t.memberName.toLowerCase().includes(query.toLowerCase()) || t.id.includes(query);
    const matchType = typeFilter === "All" || t.type === typeFilter;
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchQ && matchType && matchStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
            Billing & Finance
          </h1>
          <p className="text-neutral-500 text-sm">Academy-wide revenue, payments, and financial overview.</p>
        </div>
        <Button size="sm" variant="outline" className="rounded-xl gap-2 font-semibold shrink-0">
          <Download className="w-4 h-4" /> Export
        </Button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue (All Time)", value: `₹${(totalRevenue / 100000).toFixed(2)}L`, sub: "incl. GST", color: "#c8e64c", icon: "💰" },
          { label: "This Month", value: "₹1.89L", sub: "+14.5% vs Feb", color: "#a8d54a", icon: "📈" },
          { label: "Pending Dues", value: `₹${pendingAmount.toFixed(0)}`, sub: `${adminTransactions.filter(t => t.status === "pending").length} invoices`, color: "#e8c84c", icon: "⏳" },
          { label: "Transactions", value: totalTransactions, sub: "All time records", color: "#4cb8e8", icon: "🧾" },
        ].map((s) => (
          <Card key={s.label} className="border-neutral-100">
            <CardContent className="p-4">
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="text-xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</p>
              <p className="text-xs font-semibold text-neutral-700">{s.label}</p>
              <p className="text-[10px] text-neutral-400">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Revenue Forecast */}
        <Card className="lg:col-span-2 border-neutral-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-neutral-900">Revenue — Actual vs Forecast</h2>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded" style={{ background: "#c8e64c" }} />Actual</div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-neutral-300" />Forecast</div>
              </div>
            </div>
            <div className="flex items-end gap-3 h-36">
              {monthlyForecast.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-1 items-end" style={{ height: 120 }}>
                    {d.actual !== null && (
                      <div className="flex-1 rounded-t-md" style={{ height: `${(d.actual / maxForecast) * 120}px`, background: "#c8e64c" }} />
                    )}
                    <div className="flex-1 rounded-t-md bg-neutral-200" style={{ height: `${(d.forecast / maxForecast) * 120}px` }} />
                  </div>
                  <span className="text-[10px] text-neutral-400">{d.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue by type */}
        <Card className="border-neutral-100">
          <CardContent className="p-6">
            <h2 className="font-bold text-neutral-900 mb-5">Income Breakdown</h2>
            <div className="space-y-3">
              {adminRevenueByType.map((r) => {
                const total = adminRevenueByType.reduce((a, i) => a + i.amount, 0);
                const pct = Math.round((r.amount / total) * 100);
                return (
                  <div key={r.type}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-neutral-700 font-medium">{r.type}</span>
                      <span className="text-neutral-500">₹{(r.amount / 1000).toFixed(1)}K ({pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: r.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction ledger */}
      <Card className="border-neutral-100">
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="font-bold text-neutral-900">Transaction Ledger</h2>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search member…"
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-neutral-200 text-xs bg-white outline-none w-44"
                />
              </div>
              {["All", "Membership", "Coaching", "Competition"].map((t) => (
                <button key={t} onClick={() => setTypeFilter(t)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all"
                  style={typeFilter === t ? { background: "#c8e64c", color: "#1a1a1a", borderColor: "#c8e64c" } : { borderColor: "#e5e7eb", color: "#666" }}>
                  {t}
                </button>
              ))}
              {["All", "paid", "pending", "failed"].map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all capitalize"
                  style={statusFilter === s ? { background: "#1a1a1a", color: "white", borderColor: "#1a1a1a" } : { borderColor: "#e5e7eb", color: "#666" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-[#fafafa]">
                  {["Txn ID", "Member", "Type", "Amount", "GST", "Total", "Method", "Date", "Status"].map((h) => (
                    <th key={h} className="text-left p-3 text-neutral-500 font-semibold text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => {
                  const ss = statusStyle[t.status];
                  return (
                    <tr key={t.id} className={`border-b border-neutral-50 hover:bg-neutral-50 transition-colors ${i % 2 === 0 ? "" : "bg-[#fdfdfd]"}`}>
                      <td className="p-3 text-xs font-mono text-neutral-400">{t.id}</td>
                      <td className="p-3 font-semibold text-neutral-900 whitespace-nowrap">{t.memberName}</td>
                      <td className="p-3"><Badge className={`text-[10px] border-0 ${typeColors[t.type] ?? "bg-neutral-100 text-neutral-600"}`}>{t.type}</Badge></td>
                      <td className="p-3 text-neutral-700">₹{t.amount.toLocaleString()}</td>
                      <td className="p-3 text-neutral-400 text-xs">₹{t.gst.toFixed(0)}</td>
                      <td className="p-3 font-bold text-neutral-950">₹{Math.round(t.total).toLocaleString()}</td>
                      <td className="p-3 text-neutral-500 text-xs whitespace-nowrap">{t.method}</td>
                      <td className="p-3 text-neutral-500 text-xs whitespace-nowrap">{new Date(t.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                      <td className="p-3">
                        <Badge className={`text-[10px] border-0 capitalize ${ss.bg} ${ss.text}`}>
                          {t.status === "paid" ? <CheckCircle2 className="w-2.5 h-2.5 inline mr-1" /> : t.status === "pending" ? <Clock className="w-2.5 h-2.5 inline mr-1" /> : <X className="w-2.5 h-2.5 inline mr-1" />}
                          {t.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-8 text-neutral-400 text-sm">No transactions match your filters.</div>
            )}
          </div>

          <div className="flex justify-between items-center mt-3 text-xs text-neutral-400">
            <span>Showing {filtered.length} of {adminTransactions.length} transactions</span>
            <span>Total filtered: ₹{filtered.reduce((a, t) => a + Math.round(t.total), 0).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
