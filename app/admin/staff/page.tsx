"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staffMembers, leaveRequests } from "@/lib/mock-data";
import { UserCog, CheckCircle2, X, Clock, Star, Calendar, Phone, Mail, TrendingUp } from "lucide-react";

const statusStyles: Record<string, string> = {
  active: "bg-green-50 text-green-700",
  "on-leave": "bg-amber-50 text-amber-700",
  inactive: "bg-neutral-100 text-neutral-500",
};
const leaveStatusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  approved: "bg-green-50 text-green-700 border-green-100",
  rejected: "bg-red-50 text-red-700 border-red-100",
};

export default function AdminStaffPage() {
  const [tab, setTab] = useState<"directory" | "leaves" | "payroll">("directory");
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [leaveStates, setLeaveStates] = useState<Record<string, string>>(
    Object.fromEntries(leaveRequests.map((l) => [l.id, l.status]))
  );

  const staff = staffMembers.find((s) => s.id === selectedStaff);

  const totalPayroll = staffMembers.reduce((a, s) => a + s.salary, 0);
  const activeCount = staffMembers.filter((s) => s.status === "active").length;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>Staff Management</h1>
        <p className="text-neutral-500 text-sm">Coaches, admin staff, payroll, attendance, and leave approvals.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Staff", value: staffMembers.length, icon: "👤" },
          { label: "Active Today", value: activeCount, icon: "🟢" },
          { label: "Monthly Payroll", value: `₹${(totalPayroll / 1000).toFixed(1)}K`, icon: "💸" },
          { label: "Pending Leaves", value: leaveRequests.filter(l => l.status === "pending").length, icon: "📋" },
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

      {/* Tabs */}
      <div className="flex gap-2">
        {(["directory", "leaves", "payroll"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="px-4 py-2 rounded-xl text-sm font-semibold capitalize border transition-all"
            style={tab === t ? { background: "#c8e64c", color: "#1a1a1a", borderColor: "#c8e64c" } : { borderColor: "#e5e7eb", color: "#555" }}>
            {t === "directory" ? "Staff Directory" : t === "leaves" ? "Leave Requests" : "Payroll Summary"}
          </button>
        ))}
      </div>

      {tab === "directory" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {staffMembers.map((s) => (
            <Card key={s.id} className={`border-neutral-100 cursor-pointer transition-all hover:shadow-md ${selectedStaff === s.id ? "ring-2 ring-lime-400" : ""}`}
              onClick={() => setSelectedStaff(selectedStaff === s.id ? null : s.id)}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold text-black shrink-0" style={{ background: "#c8e64c" }}>
                    {s.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-neutral-900 truncate">{s.name}</p>
                    <p className="text-xs text-neutral-400">{s.role}</p>
                  </div>
                  <Badge className={`ml-auto text-[10px] border-0 shrink-0 ${statusStyles[s.status]}`}>
                    {s.status === "on-leave" ? "On Leave" : s.status}
                  </Badge>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-500">
                  <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" />{s.phone}</div>
                  <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" />{s.email}</div>
                  <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />Joined {new Date(s.joined).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</div>
                </div>

                {s.sport !== "Admin" && (
                  <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
                    <div className="text-center">
                      <p className="font-bold text-neutral-900 text-sm">{s.sessionsThisMonth}</p>
                      <p className="text-[10px] text-neutral-400">Sessions</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-neutral-900 text-sm flex items-center gap-0.5 justify-center">{s.rating} <Star className="w-3 h-3 fill-amber-400 text-amber-400" /></p>
                      <p className="text-[10px] text-neutral-400">Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-neutral-900 text-sm">{s.leaveBalance}</p>
                      <p className="text-[10px] text-neutral-400">Leave left</p>
                    </div>
                  </div>
                )}

                {selectedStaff === s.id && (
                  <div className="mt-3 border-t border-neutral-100 pt-3">
                    <p className="text-xs font-semibold text-neutral-500 mb-2">30-day Attendance</p>
                    <div className="flex gap-1 flex-wrap">
                      {s.attendance.map((present, i) => (
                        <div key={i} className={`w-4 h-4 rounded ${present ? "opacity-100" : "opacity-30"}`}
                          style={{ background: present ? "#c8e64c" : "#aaa" }} />
                      ))}
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">
                      {s.attendance.filter(Boolean).length}/{s.attendance.length} days present
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1 rounded-xl text-xs">Message</Button>
                      <Button size="sm" className="flex-1 rounded-xl text-xs font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }}>Edit Profile</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "leaves" && (
        <Card className="border-neutral-100">
          <CardContent className="p-5">
            <h2 className="font-bold text-neutral-900 mb-4">Leave Requests</h2>
            <div className="space-y-3">
              {leaveRequests.map((lr) => {
                const currentStatus = leaveStates[lr.id];
                return (
                  <div key={lr.id} className="flex items-center gap-4 rounded-xl border border-neutral-100 bg-[#fafafa] p-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-black shrink-0" style={{ background: "#c8e64c" }}>
                      {lr.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-neutral-900">{lr.staffName}</p>
                      <p className="text-xs text-neutral-400">{lr.type} · {lr.from} to {lr.to} ({lr.days}d)</p>
                      <p className="text-xs text-neutral-500 mt-0.5 italic">"{lr.reason}"</p>
                    </div>
                    <Badge className={`text-xs ${leaveStatusStyles[currentStatus]} shrink-0`}>{currentStatus}</Badge>
                    {currentStatus === "pending" && (
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => setLeaveStates({ ...leaveStates, [lr.id]: "rejected" })}
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                        <button onClick={() => setLeaveStates({ ...leaveStates, [lr.id]: "approved" })}
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "payroll" && (
        <Card className="border-neutral-100">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-neutral-900">April 2026 Payroll</h2>
              <Badge style={{ background: "#c8e64c30", color: "#3a6a00", border: "none" }}>Total: ₹{totalPayroll.toLocaleString()}</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 bg-[#fafafa]">
                    {["Staff", "Role", "Sport", "Base Salary", "Bonus", "Deductions", "Net Pay", "Status"].map((h) => (
                      <th key={h} className="text-left p-3 text-xs text-neutral-500 font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {staffMembers.map((s, i) => {
                    const bonus = s.sport !== "Admin" ? Math.round(s.sessionsThisMonth * 100) : 0;
                    const deduction = s.status === "on-leave" ? 2000 : 0;
                    const net = s.salary + bonus - deduction;
                    return (
                      <tr key={s.id} className={`border-b border-neutral-50 hover:bg-neutral-50 ${i % 2 === 0 ? "" : "bg-[#fdfdfd]"}`}>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-black shrink-0" style={{ background: "#c8e64c" }}>{s.avatar}</div>
                            <span className="font-semibold text-neutral-900 whitespace-nowrap">{s.name}</span>
                          </div>
                        </td>
                        <td className="p-3 text-neutral-600 whitespace-nowrap">{s.role}</td>
                        <td className="p-3 text-neutral-500">{s.sport}</td>
                        <td className="p-3 text-neutral-700">₹{s.salary.toLocaleString()}</td>
                        <td className="p-3 text-green-700">+₹{bonus.toLocaleString()}</td>
                        <td className="p-3 text-red-600">{deduction > 0 ? `-₹${deduction.toLocaleString()}` : "—"}</td>
                        <td className="p-3 font-bold text-neutral-950">₹{net.toLocaleString()}</td>
                        <td className="p-3">
                          <Badge className={`text-[10px] border-0 ${s.status === "active" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                            {s.status === "active" ? "Processing" : "Hold"}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
