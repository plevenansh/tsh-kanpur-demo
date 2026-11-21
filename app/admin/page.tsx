"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminSummary, revenueData, attendanceData, memberMixData, members } from "@/lib/mock-data";
import {
  Users,
  IndianRupee,
  CalendarCheck,
  Activity,
  TrendingUp,
  Bell,
  Clock,
  AlertCircle,
} from "lucide-react";

const expiringMembers = members.filter((m) => ["expiring", "expired"].includes(m.status));
const heatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const heatmapHours = ["6", "8", "10", "12", "14", "16", "18", "20"];
const heatmapData = heatmapHours.flatMap((h) =>
  heatmapDays.map((d) => ({
    day: d,
    hour: h,
    value: Math.round(20 + Math.random() * 80),
  }))
);

const maxRevenue = Math.max(...revenueData.map((r) => r.revenue));
const maxAttend = Math.max(...attendanceData.map((a) => a.count));

export default function AdminOverview() {
  const s = adminSummary;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>
            Admin Overview
          </h1>
          <p className="text-neutral-500 text-sm mt-0.5">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <Button size="sm" className="rounded-xl font-bold text-xs gap-2" style={{ background: "#c8e64c", color: "#1a1a1a" }}>
          <Bell className="w-4 h-4" />
          Send Renewal Alerts ({expiringMembers.length})
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Check-ins", value: s.todayCheckins, icon: Activity, color: "#c8e64c", trend: "+18%" },
          { label: "Active Bookings", value: s.activeBookings, icon: CalendarCheck, color: "#4cb8e8", trend: "+5%" },
          { label: "Courts in Use", value: `${s.courtsInUse}/19`, icon: Clock, color: "#e8c84c", trend: null },
          { label: "Today's Revenue", value: `₹${s.todayRevenue.toLocaleString()}`, icon: IndianRupee, color: "#a8d54a", trend: "+12%" },
        ].map((kpi) => (
          <Card key={kpi.label} className="border-neutral-100">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: kpi.color + "25" }}>
                  <kpi.icon className="w-4 h-4" style={{ color: kpi.color === "#c8e64c" ? "#3a6a00" : kpi.color }} />
                </div>
                {kpi.trend && (
                  <span className="text-xs font-semibold text-green-600 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />{kpi.trend}
                  </span>
                )}
              </div>
              <p className="text-2xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{kpi.value}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Revenue chart */}
        <Card className="lg:col-span-2 border-neutral-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-neutral-900">Monthly Revenue</h2>
              <Badge variant="outline" className="text-xs border-neutral-200">Last 6 months</Badge>
            </div>
            <div className="flex items-end gap-3 h-40">
              {revenueData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-neutral-500">₹{(d.revenue / 100000).toFixed(1)}L</span>
                  <div className="w-full flex flex-col gap-0.5">
                    <div className="w-full rounded-t-lg" style={{
                      height: `${(d.revenue / maxRevenue) * 120}px`,
                      background: d.month === "Mar" ? "#c8e64c" : "#e8f0dc",
                    }} />
                  </div>
                  <span className="text-[10px] text-neutral-400">{d.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Membership Mix */}
        <Card className="border-neutral-100">
          <CardContent className="p-6">
            <h2 className="font-bold text-neutral-900 mb-5">Membership Mix</h2>
            <div className="space-y-3">
              {memberMixData.map((m) => (
                <div key={m.plan}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-700 font-medium">{m.plan}</span>
                    <span className="text-neutral-500">{m.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${m.value}%`, background: m.fill }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Attendance this week */}
        <Card className="border-neutral-100">
          <CardContent className="p-6">
            <h2 className="font-bold text-neutral-900 mb-5">Check-ins This Week</h2>
            <div className="flex items-end gap-2 h-28">
              {attendanceData.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-md" style={{
                    height: `${(d.count / maxAttend) * 90}px`,
                    background: d.day === "Sat" || d.day === "Sun" ? "#c8e64c" : "#e8f0dc",
                  }} />
                  <span className="text-[9px] text-neutral-400">{d.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Renewal Alerts */}
        <Card className="lg:col-span-2 border-neutral-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-neutral-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Renewal Alerts
              </h2>
              <Badge className="text-xs bg-amber-50 text-amber-700 border-amber-200" variant="outline">
                {expiringMembers.length} members
              </Badge>
            </div>
            <div className="space-y-3">
              {expiringMembers.map((m) => (
                <div key={m.id} className="flex items-center gap-4 rounded-xl p-3 border border-neutral-100 bg-[#fafafa]">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-black shrink-0" style={{ background: "#c8e64c" }}>
                    {m.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-neutral-900">{m.name}</p>
                    <p className="text-xs text-neutral-500">{m.plan} · {m.sport}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge className={`text-xs ${m.status === "expired" ? "bg-red-50 text-red-700 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200"}`} variant="outline">
                      {m.status === "expired" ? "Expired" : `${m.daysLeft}d left`}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" className="rounded-lg text-xs shrink-0">Remind</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Occupancy heatmap */}
      <Card className="border-neutral-100">
        <CardContent className="p-6">
          <h2 className="font-bold text-neutral-900 mb-5">Weekly Occupancy Heatmap</h2>
          <div className="overflow-x-auto">
            <div>
              <div className="flex gap-1 mb-1 ml-8">
                {heatmapDays.map((d) => (
                  <div key={d} className="flex-1 text-center text-[10px] text-neutral-400 font-medium">{d}</div>
                ))}
              </div>
              <div className="space-y-1">
                {heatmapHours.map((h) => (
                  <div key={h} className="flex items-center gap-1">
                    <div className="w-7 text-[10px] text-neutral-400 text-right">{h}h</div>
                    {heatmapDays.map((d) => {
                      const cell = heatmapData.find((c) => c.day === d && c.hour === h);
                      const v = cell?.value ?? 0;
                      return (
                        <div key={d} className="flex-1 h-8 rounded-md transition-all"
                          title={`${d} ${h}:00 — ${v}% utilisation`}
                          style={{ background: `rgba(200, 230, 76, ${v / 100})` }} />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3 justify-end">
                <span className="text-[10px] text-neutral-400">Low</span>
                <div className="flex gap-0.5">
                  {[0.1, 0.3, 0.5, 0.7, 0.9].map((o) => (
                    <div key={o} className="w-5 h-3 rounded" style={{ background: `rgba(200, 230, 76, ${o})` }} />
                  ))}
                </div>
                <span className="text-[10px] text-neutral-400">High</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
