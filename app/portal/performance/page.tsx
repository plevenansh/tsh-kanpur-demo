"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { currentMember } from "@/lib/mock-data";
import { TrendingUp, Target, Star } from "lucide-react";

const weeklyData = [
  { day: "Mon", sessions: 1 },
  { day: "Tue", sessions: 0 },
  { day: "Wed", sessions: 2 },
  { day: "Thu", sessions: 1 },
  { day: "Fri", sessions: 1 },
  { day: "Sat", sessions: 2 },
  { day: "Sun", sessions: 1 },
];
const maxSessions = Math.max(...weeklyData.map((d) => d.sessions));

const monthlyData = [
  { month: "Oct", sessions: 10 },
  { month: "Nov", sessions: 14 },
  { month: "Dec", sessions: 9 },
  { month: "Jan", sessions: 18 },
  { month: "Feb", sessions: 16 },
  { month: "Mar", sessions: 20 },
];
const maxMonthly = Math.max(...monthlyData.map((d) => d.sessions));

const goals = [
  { label: "Sessions this month", current: 20, target: 24, unit: "sessions" },
  { label: "Consecutive days", current: 7, target: 30, unit: "days" },
  { label: "Coaching sessions", current: 3, target: 4, unit: "booked" },
];

const leaderboard = [
  { rank: 1, name: "Amit Kumar", sessions: 28, sport: "Badminton", avatar: "AK" },
  { rank: 2, name: "Pooja Gupta", sessions: 25, sport: "Swimming", avatar: "PG" },
  { rank: 3, name: "Ravi Patel", sessions: 20, sport: "Badminton", avatar: "RP", isMe: true },
  { rank: 4, name: "Swati Mishra", sessions: 18, sport: "Wrestling", avatar: "SM" },
  { rank: 5, name: "Priyanka Rao", sessions: 16, sport: "Athletics", avatar: "PR" },
];

export default function PerformancePage() {
  const m = currentMember;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
          Performance
        </h1>
        <p className="text-sm text-neutral-500">Your training progress, goals, and leaderboard standing.</p>
      </div>

      {/* Weekly chart */}
      <Card className="border-neutral-100">
        <CardContent className="p-6">
          <h2 className="font-bold text-neutral-900 mb-6">Sessions This Week</h2>
          <div className="flex items-end gap-3 h-32">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-t-lg transition-all" style={{
                  height: `${maxSessions > 0 ? (d.sessions / maxSessions) * 100 : 0}%`,
                  background: d.sessions > 0 ? "#c8e64c" : "#f0f0f0",
                  minHeight: d.sessions > 0 ? 8 : 4,
                }} />
                <span className="text-[10px] text-neutral-400">{d.day}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-400 mt-2">Total: {weeklyData.reduce((a, b) => a + b.sessions, 0)} sessions this week</p>
        </CardContent>
      </Card>

      {/* Monthly chart */}
      <Card className="border-neutral-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-neutral-900">Monthly Attendance</h2>
            <div className="flex items-center gap-1.5 text-xs text-green-600">
              <TrendingUp className="w-3.5 h-3.5" />
              +25% vs last month
            </div>
          </div>
          <div className="flex items-end gap-4 h-40">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-xs font-semibold text-neutral-700">{d.sessions}</span>
                <div className="w-full rounded-t-xl transition-all" style={{
                  height: `${(d.sessions / maxMonthly) * 100}%`,
                  background: d.month === "Mar" ? "#c8e64c" : "#e8f0dc",
                  minHeight: 8,
                }} />
                <span className="text-[10px] text-neutral-400">{d.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Goals */}
        <Card className="border-neutral-100">
          <CardContent className="p-6">
            <h2 className="font-bold text-neutral-900 mb-5 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Monthly Goals
            </h2>
            <div className="space-y-5">
              {goals.map((g) => (
                <div key={g.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-neutral-700">{g.label}</span>
                    <span className="text-xs font-semibold text-neutral-900">{g.current}/{g.target} {g.unit}</span>
                  </div>
                  <Progress value={(g.current / g.target) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coach notes */}
        <Card className="border-neutral-100">
          <CardContent className="p-6">
            <h2 className="font-bold text-neutral-900 mb-5">Coach Feedback</h2>
            <div className="space-y-4">
              {m.performanceNotes.slice(0, 3).map((note) => (
                <div key={note.date} className="border-l-2 pl-4 py-1" style={{ borderColor: "#c8e64c" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-neutral-500">{note.date} · {note.coach}</span>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold">{note.score}/10</span>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed">{note.note}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card className="border-neutral-100">
        <CardContent className="p-6">
          <h2 className="font-bold text-neutral-900 mb-5">March Leaderboard — Badminton</h2>
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div key={entry.rank} className={`flex items-center gap-4 rounded-xl p-3 ${entry.isMe ? "border-2" : "border border-neutral-100 bg-[#fafafa]"}`}
                style={entry.isMe ? { background: "#c8e64c15", borderColor: "#c8e64c" } : {}}>
                <span className="w-6 text-center text-sm font-black text-neutral-400">#{entry.rank}</span>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black shrink-0"
                  style={{ background: entry.isMe ? "#c8e64c" : "#e8f0dc" }}>
                  {entry.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-neutral-900 truncate">
                    {entry.name} {entry.isMe && <Badge className="ml-1.5 text-[10px] px-1.5" style={{ background: "#c8e64c30", color: "#3a6a00", border: "none" }}>You</Badge>}
                  </p>
                  <p className="text-xs text-neutral-400">{entry.sport}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{entry.sessions}</p>
                  <p className="text-[10px] text-neutral-400">sessions</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
