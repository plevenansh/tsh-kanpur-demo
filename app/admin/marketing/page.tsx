"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { campaigns, referralLeaderboard, conversionFunnel, discountCodes } from "@/lib/mock-data";
import { Megaphone, Plus, TrendingUp, Users, Send, CheckCircle2, X } from "lucide-react";

const typeColors: Record<string, string> = {
  WhatsApp: "bg-green-50 text-green-700",
  Email: "bg-blue-50 text-blue-700",
  SMS: "bg-amber-50 text-amber-700",
};

const maxFunnel = conversionFunnel[0].count;

function CreateCampaignModal({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", type: "WhatsApp", audience: "All Active Members", message: "" });
  const audiences = ["All Active Members", "Expiring Members", "Badminton Members", "Table Tennis Members", "Inactive 30+ days", "New Members (30 days)"];
  const types = ["WhatsApp", "Email", "SMS"];
  if (done) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#c8e64c30" }}>
          <Send className="w-8 h-8" style={{ color: "#3a6a00" }} />
        </div>
        <h3 className="font-black text-xl mb-1" style={{ fontFamily: "var(--font-heading)" }}>Campaign Scheduled!</h3>
        <p className="text-sm text-neutral-500 mb-5">"{form.name}" will be sent to {form.audience}.</p>
        <Button className="w-full rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={onClose}>Done</Button>
      </div>
    </div>
  );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between sticky top-0 bg-white">
          <h3 className="font-bold text-neutral-900">Create Campaign</h3>
          <button onClick={onClose}><X className="w-4 h-4 text-neutral-400" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-neutral-500 block mb-1.5">Campaign Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. April Badminton Push" className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-2.5 text-sm outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-neutral-500 block mb-1.5">Channel</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-2.5 text-sm outline-none">
                {types.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-500 block mb-1.5">Audience</label>
              <select value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-2.5 text-sm outline-none">
                {audiences.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-500 block mb-1.5">Message</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Hi {name}, we have exciting news for you at The Sportz Hub…" rows={4}
              className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-2.5 text-sm outline-none resize-none" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 rounded-xl" onClick={onClose}>Cancel</Button>
            <Button className="flex-1 rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }}
              onClick={() => form.name && form.message ? setDone(true) : alert("Fill campaign name and message")}>
              <Send className="w-4 h-4 mr-2" /> Schedule Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminMarketingPage() {
  const [creating, setCreating] = useState(false);

  const totalSent = campaigns.filter(c => c.status === "sent").reduce((a, c) => a + c.sent, 0);
  const totalConverted = campaigns.reduce((a, c) => a + c.converted, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>Marketing & CRM</h1>
          <p className="text-neutral-500 text-sm">Campaigns, referrals, conversion funnel, and discount codes.</p>
        </div>
        <Button className="rounded-xl font-bold gap-2 shrink-0" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={() => setCreating(true)}>
          <Plus className="w-4 h-4" /> New Campaign
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Messages Sent", value: totalSent.toLocaleString(), icon: "📤" },
          { label: "Total Conversions", value: totalConverted, icon: "✅" },
          { label: "Avg Conversion Rate", value: `${Math.round((totalConverted / totalSent) * 100)}%`, icon: "📊" },
          { label: "Active Promo Codes", value: discountCodes.filter(d => d.active).length, icon: "🏷️" },
        ].map((s) => (
          <Card key={s.label} className="border-neutral-100">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-2xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</p>
              <p className="text-xs text-neutral-400">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Conversion Funnel */}
        <Card className="border-neutral-100">
          <CardContent className="p-5">
            <h2 className="font-bold text-neutral-900 mb-4">Conversion Funnel</h2>
            <div className="space-y-3">
              {conversionFunnel.map((stage, i) => (
                <div key={stage.stage}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-600 font-medium">{stage.stage}</span>
                    <span className="text-neutral-500">{stage.count}</span>
                  </div>
                  <div className="h-3 rounded-full bg-neutral-100 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{
                      width: `${(stage.count / maxFunnel) * 100}%`,
                      background: i === 0 ? "#4cb8e8" : i === 1 ? "#c8e64c" : i === 2 ? "#a8d54a" : "#3a6a00"
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campaigns list */}
        <Card className="lg:col-span-2 border-neutral-100">
          <CardContent className="p-5">
            <h2 className="font-bold text-neutral-900 mb-4">Campaign History</h2>
            <div className="space-y-3">
              {campaigns.map((c) => (
                <div key={c.id} className="flex items-start gap-3 rounded-xl border border-neutral-100 bg-[#fafafa] p-3">
                  <div className="mt-0.5">
                    <Badge className={`text-[10px] ${typeColors[c.type]} border-0`}>{c.type}</Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-neutral-900 truncate">{c.name}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{c.audience} · {new Date(c.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                  </div>
                  {c.status === "sent" ? (
                    <div className="text-right shrink-0 text-xs text-neutral-500 space-y-0.5">
                      <p><span className="font-bold text-neutral-900">{c.sent}</span> sent</p>
                      <p><span className="font-bold text-neutral-900">{c.opened}</span> opened</p>
                      <p><span className="font-bold text-green-700">{c.converted}</span> converted</p>
                    </div>
                  ) : (
                    <Badge className="bg-amber-50 text-amber-700 border-amber-100 text-xs shrink-0">Scheduled</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Referral Leaderboard */}
        <Card className="border-neutral-100">
          <CardContent className="p-5">
            <h2 className="font-bold text-neutral-900 mb-4">Referral Leaderboard</h2>
            <div className="space-y-3">
              {referralLeaderboard.map((r, i) => (
                <div key={r.name} className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center font-black text-sm text-neutral-400">{i + 1}</div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black shrink-0" style={{ background: "#c8e64c" }}>{r.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-neutral-900">{r.name}</p>
                    <p className="text-xs text-neutral-400">{r.referrals} referrals · {r.pending} pending reward</p>
                  </div>
                  <Badge style={{ background: "#c8e64c30", color: "#3a6a00", border: "none" }} className="text-xs shrink-0">{r.rewarded} rewarded</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Discount Codes */}
        <Card className="border-neutral-100">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-neutral-900">Promo Codes</h2>
              <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1"><Plus className="w-3.5 h-3.5" /> Add Code</Button>
            </div>
            <div className="space-y-2">
              {discountCodes.map((d) => (
                <div key={d.code} className={`flex items-center gap-3 rounded-xl p-3 border ${d.active ? "border-neutral-100 bg-[#fafafa]" : "border-neutral-100 bg-neutral-50 opacity-60"}`}>
                  <code className="font-mono font-bold text-sm text-neutral-900 flex-1">{d.code}</code>
                  <div className="text-xs text-neutral-500 shrink-0">{d.discount}{d.type === "percent" ? "%" : "₹"} off</div>
                  <div className="text-xs text-neutral-400 shrink-0">{d.used}/{d.cap} used</div>
                  <div className="w-8 h-5 rounded-full transition-colors shrink-0 relative"
                    style={{ background: d.active ? "#c8e64c" : "#d1d5db" }}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow flex items-center justify-center transition-transform ${d.active ? "translate-x-3" : "translate-x-0.5"}`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {creating && <CreateCampaignModal onClose={() => setCreating(false)} />}
    </div>
  );
}
