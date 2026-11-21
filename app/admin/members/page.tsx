"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { members } from "@/lib/mock-data";
import { Search, Download, MoreHorizontal, Plus, X, CheckCircle2, TrendingUp, Users, UserCheck, AlertCircle } from "lucide-react";

const statusColors: Record<string, string> = {
  active: "bg-green-50 text-green-700 border-green-200",
  expiring: "bg-amber-50 text-amber-700 border-amber-200",
  expired: "bg-red-50 text-red-700 border-red-200",
};

type Member = typeof members[0];

function MemberDrawer({ member, onClose }: { member: Member; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: "rgba(0,0,0,0.4)" }} onClick={onClose}>
      <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-neutral-100 p-5 flex items-center justify-between">
          <h3 className="font-bold text-neutral-900">Member Profile</h3>
          <button onClick={onClose}><X className="w-4 h-4 text-neutral-400" /></button>
        </div>

        <div className="p-5 space-y-5">
          {/* Profile header */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-black shrink-0" style={{ background: "#c8e64c" }}>
              {member.avatar}
            </div>
            <div>
              <h4 className="font-black text-lg text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{member.name}</h4>
              <p className="text-sm text-neutral-400">{member.id} · {member.sport}</p>
              <Badge className={`text-xs capitalize ${statusColors[member.status]}`} variant="outline">
                {member.status === "expiring" ? `Expiring in ${member.daysLeft} days` : member.status}
              </Badge>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Sessions", value: member.sessions },
              { label: "Plan", value: member.plan },
              { label: "Days Left", value: member.daysLeft ?? "—" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-[#f5f5f0] p-3 text-center">
                <p className="font-bold text-neutral-900 text-sm">{s.value}</p>
                <p className="text-[10px] text-neutral-400">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="space-y-2 text-sm">
            {[
              { label: "Member Since", value: new Date(member.joined).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
              { label: "Plan", value: member.plan },
              { label: "Sport", value: member.sport },
              { label: "Status", value: member.status },
            ].map((row) => (
              <div key={row.label} className="flex justify-between border-b border-neutral-50 pb-2">
                <span className="text-neutral-400">{row.label}</span>
                <span className="font-semibold text-neutral-900 capitalize">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="rounded-xl text-xs font-semibold">Extend Plan</Button>
            <Button variant="outline" className="rounded-xl text-xs font-semibold">Change Plan</Button>
            <Button variant="outline" className="rounded-xl text-xs font-semibold">Send Reminder</Button>
            <Button variant="outline" className="rounded-xl text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50">Freeze Account</Button>
          </div>

          <Button className="w-full rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }}>
            Export Member Report
          </Button>
        </div>
      </div>
    </div>
  );
}

function AddMemberModal({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(1);
  const sports = ["Badminton", "Table Tennis", "Boxing", "Gymnastics", "Wrestling", "Yoga", "Athletics", "Swimming"];
  const plans = ["Monthly", "Quarterly", "Annual"];

  if (done) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#c8e64c30" }}>
          <CheckCircle2 className="w-8 h-8" style={{ color: "#3a6a00" }} />
        </div>
        <h3 className="font-black text-xl mb-1" style={{ fontFamily: "var(--font-heading)" }}>Member Added!</h3>
        <p className="text-sm text-neutral-500 mb-5">New member profile created and welcome message sent.</p>
        <Button className="w-full rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={onClose}>Done</Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between sticky top-0 bg-white">
          <h3 className="font-bold text-neutral-900">Add New Member <span className="text-neutral-400 font-normal text-sm">Step {step}/2</span></h3>
          <button onClick={onClose}><X className="w-4 h-4 text-neutral-400" /></button>
        </div>
        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-neutral-500 block mb-1.5">First Name</label>
                  <input className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-2.5 text-sm outline-none" placeholder="Rahul" />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500 block mb-1.5">Last Name</label>
                  <input className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-2.5 text-sm outline-none" placeholder="Kumar" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 block mb-1.5">Email</label>
                <input type="email" className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-2.5 text-sm outline-none" placeholder="rahul@example.com" />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 block mb-1.5">Phone</label>
                <input type="tel" className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-2.5 text-sm outline-none" placeholder="+91 98001 xxxxx" />
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={onClose}>Cancel</Button>
                <Button className="flex-1 rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={() => setStep(2)}>Next →</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-500 block mb-1.5">Primary Sport</label>
                <select className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-2.5 text-sm outline-none">
                  {sports.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 block mb-1.5">Membership Plan</label>
                <div className="flex gap-2">
                  {plans.map(p => (
                    <button key={p} className="flex-1 py-2.5 rounded-xl border text-sm font-semibold hover:border-lime-400 transition-all">{p}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 block mb-1.5">Payment Method</label>
                <select className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-2.5 text-sm outline-none">
                  <option>UPI</option><option>Card</option><option>Net Banking</option><option>Cash</option>
                </select>
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setStep(1)}>← Back</Button>
                <Button className="flex-1 rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={() => setDone(true)}>
                  Add Member
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminMembersPage() {
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [adding, setAdding] = useState(false);

  const filtered = members.filter((m) => {
    const matchQuery = m.name.toLowerCase().includes(query.toLowerCase()) || m.id.includes(query);
    const matchStatus = filterStatus === "all" || m.status === filterStatus;
    return matchQuery && matchStatus;
  });

  const active = members.filter((m) => m.status === "active").length;
  const expiring = members.filter((m) => m.status === "expiring").length;
  const expired = members.filter((m) => m.status === "expired").length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>Member Management</h1>
          <p className="text-neutral-500 text-sm mt-0.5">{members.length} total members · Click a row to view profile</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="rounded-xl font-bold text-xs gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button size="sm" className="rounded-xl font-bold text-xs gap-2" style={{ background: "#c8e64c", color: "#1a1a1a" }}
            onClick={() => setAdding(true)}>
            <Plus className="w-4 h-4" /> Add Member
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active", value: active, color: "#c8e64c", icon: UserCheck },
          { label: "Expiring", value: expiring, color: "#e8c84c", icon: AlertCircle },
          { label: "Expired", value: expired, color: "#ef4444", icon: X },
          { label: "New This Month", value: 8, color: "#4cb8e8", icon: TrendingUp },
        ].map((s) => (
          <Card key={s.label} className="border-neutral-100">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.color + "25" }}>
                <s.icon className="w-4 h-4" style={{ color: s.color === "#c8e64c" ? "#3a6a00" : s.color }} />
              </div>
              <div>
                <p className="text-xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</p>
                <p className="text-xs text-neutral-400">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or member ID…"
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-200 bg-white text-sm outline-none"
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "expiring", "expired"].map((s) => (
            <Button key={s} size="sm" variant={filterStatus === s ? "default" : "outline"}
              onClick={() => setFilterStatus(s)}
              className="rounded-xl text-xs font-semibold capitalize"
              style={filterStatus === s ? { background: "#c8e64c", color: "#1a1a1a" } : {}}>
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-[#fafafa]">
              <th className="text-left p-4 text-neutral-500 font-semibold text-xs uppercase tracking-wide">Member</th>
              <th className="text-left p-4 text-neutral-500 font-semibold text-xs uppercase tracking-wide">Plan</th>
              <th className="text-left p-4 text-neutral-500 font-semibold text-xs uppercase tracking-wide">Sport</th>
              <th className="text-left p-4 text-neutral-500 font-semibold text-xs uppercase tracking-wide">Status</th>
              <th className="text-left p-4 text-neutral-500 font-semibold text-xs uppercase tracking-wide">Sessions</th>
              <th className="text-left p-4 text-neutral-500 font-semibold text-xs uppercase tracking-wide">Joined</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={m.id}
                className={`border-b border-neutral-50 hover:bg-neutral-50 transition-colors cursor-pointer ${i % 2 === 0 ? "" : "bg-[#fdfdfd]"}`}
                onClick={() => setSelectedMember(m)}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black shrink-0" style={{ background: "#c8e64c" }}>
                      {m.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">{m.name}</p>
                      <p className="text-xs text-neutral-400">{m.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-neutral-700 font-medium">{m.plan}</td>
                <td className="p-4 text-neutral-600">{m.sport}</td>
                <td className="p-4">
                  <Badge className={`text-xs capitalize ${statusColors[m.status]}`} variant="outline">
                    {m.status === "expiring" ? `Expiring (${m.daysLeft}d)` : m.status}
                  </Badge>
                </td>
                <td className="p-4 text-neutral-700 font-semibold">{m.sessions}</td>
                <td className="p-4 text-neutral-500 text-xs">{new Date(m.joined).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                <td className="p-4">
                  <Button size="sm" variant="ghost" className="rounded-lg p-2 h-auto" onClick={(e) => { e.stopPropagation(); }}>
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-neutral-400 text-sm">No members match your search.</div>
        )}
      </div>

      {selectedMember && <MemberDrawer member={selectedMember} onClose={() => setSelectedMember(null)} />}
      {adding && <AddMemberModal onClose={() => setAdding(false)} />}
    </div>
  );
}
