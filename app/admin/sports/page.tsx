"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sportStats } from "@/lib/mock-data";
import { TrendingUp, Users, IndianRupee, Activity, ChevronRight } from "lucide-react";

const weeklyTrend = [40, 55, 48, 62, 70, 85, 78];
const days = ["M", "T", "W", "T", "F", "S", "S"];
const maxTrend = Math.max(...weeklyTrend);

export default function AdminSportsPage() {
  const [activeSport, setActiveSport] = useState(sportStats[0].sport);
  const sport = sportStats.find((s) => s.sport === activeSport)!;

  const totalMembers = sportStats.reduce((a, s) => a + s.members, 0);
  const totalRevenue = sportStats.reduce((a, s) => a + s.revenue, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
          Sport-Wise Dashboard
        </h1>
        <p className="text-neutral-500 text-sm">Deep dive into members, revenue, and performance by individual sport.</p>
      </div>

      {/* Global Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Enrolled", value: totalMembers.toLocaleString(), icon: "👥", color: "#c8e64c" },
          { label: "Sports Offered", value: sportStats.length, icon: "🏟️", color: "#4cb8e8" },
          { label: "Total Revenue", value: `₹${(totalRevenue / 1000).toFixed(0)}K`, icon: "💰", color: "#a8d54a" },
          { label: "Active Coaches", value: sportStats.length, icon: "🎽", color: "#e87a4c" },
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

      {/* Sport tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sportStats.map((s) => (
          <button key={s.sport} onClick={() => setActiveSport(s.sport)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold shrink-0 border transition-all"
            style={s.sport === activeSport
              ? { background: s.color, color: "#1a1a1a", borderColor: s.color }
              : { background: "white", color: "#555", borderColor: "#e5e7eb" }}>
            <span>{s.emoji}</span>
            {s.sport}
          </button>
        ))}
      </div>

      {/* Sport detail */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Stats */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Members", value: sport.members.toLocaleString(), icon: Users },
            { label: "Active This Month", value: sport.activeThisMonth.toLocaleString(), icon: Activity },
            { label: "Monthly Revenue", value: `₹${(sport.revenue / 1000).toFixed(1)}K`, icon: IndianRupee },
            { label: "Court Utilization", value: `${sport.courtUtilization}%`, icon: TrendingUp },
            { label: "Sessions Held", value: sport.sessions, icon: Activity },
            { label: "Coach", value: sport.coach, icon: Users },
          ].map((stat) => (
            <Card key={stat.label} className="border-neutral-100">
              <CardContent className="p-4">
                <stat.icon className="w-4 h-4 mb-2 text-neutral-400" />
                <p className="text-xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          ))}

          {/* Weekly activity chart */}
          <Card className="border-neutral-100 col-span-2 sm:col-span-3">
            <CardContent className="p-5">
              <h3 className="font-bold text-neutral-900 mb-4">Weekly Check-ins (This Week)</h3>
              <div className="flex items-end gap-3 h-24">
                {weeklyTrend.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-lg" style={{
                      height: `${(val / maxTrend) * 80}px`,
                      background: i >= 5 ? sport.color : sport.color + "60"
                    }} />
                    <span className="text-[9px] text-neutral-400">{days[i]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coach card + rankings */}
        <div className="space-y-4">
          {/* Coach info */}
          <Card className="border-neutral-100 overflow-hidden">
            <div className="h-1.5 w-full" style={{ background: sport.color }} />
            <CardContent className="p-5">
              <h3 className="font-bold text-neutral-900 mb-3">Head Coach</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-black text-sm" style={{ background: sport.color + "40" }}>
                  {sport.coach.split(" ").map(w => w[0]).join("")}
                </div>
                <div>
                  <p className="font-bold text-neutral-900">{sport.coach}</p>
                  <p className="text-xs text-neutral-400">{sport.sport} · Head Coach</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-neutral-400">Sessions this month</span><span className="font-semibold">{sport.sessions}</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">Member rating</span><span className="font-semibold">4.8 ⭐</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">Court utilization</span><span className="font-semibold">{sport.courtUtilization}%</span></div>
              </div>
            </CardContent>
          </Card>

          {/* All sports comparison */}
          <Card className="border-neutral-100">
            <CardContent className="p-5">
              <h3 className="font-bold text-neutral-900 mb-4">Revenue by Sport</h3>
              <div className="space-y-2">
                {sportStats.map((s) => (
                  <div key={s.sport} className="flex items-center gap-2">
                    <span className="text-sm shrink-0">{s.emoji}</span>
                    <div className="flex-1 h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(s.revenue / Math.max(...sportStats.map(x => x.revenue))) * 100}%`, background: s.color }} />
                    </div>
                    <span className="text-xs text-neutral-500 w-12 text-right">₹{(s.revenue / 1000).toFixed(0)}K</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
