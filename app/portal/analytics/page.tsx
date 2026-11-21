"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { skillRatings, trainingLoad, personalBests, currentMember } from "@/lib/mock-data";
import { TrendingUp, Target, Zap } from "lucide-react";

const monthlyData = [
  { month: "Oct", sessions: 10 },
  { month: "Nov", sessions: 14 },
  { month: "Dec", sessions: 9 },
  { month: "Jan", sessions: 18 },
  { month: "Feb", sessions: 16 },
  { month: "Mar", sessions: 20 },
];
const maxMonthly = Math.max(...monthlyData.map((d) => d.sessions));
const maxLoad = Math.max(...trainingLoad.map((d) => Math.max(d.hours, d.recommended)));

// Simple SVG radar chart
function RadarChart({ data }: { data: Record<string, number> }) {
  const keys = Object.keys(data);
  const n = keys.length;
  const cx = 100;
  const cy = 100;
  const r = 75;

  const getPoint = (i: number, value: number) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    const dist = (value / 10) * r;
    return {
      x: cx + dist * Math.cos(angle),
      y: cy + dist * Math.sin(angle),
    };
  };

  const getLabel = (i: number) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    const dist = r + 18;
    return {
      x: cx + dist * Math.cos(angle),
      y: cy + dist * Math.sin(angle),
    };
  };

  const dataPoints = keys.map((k, i) => getPoint(i, data[k]));
  const polyPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto">
      {/* Grid */}
      {gridLevels.map((level) => {
        const pts = keys.map((_, i) => {
          const angle = (2 * Math.PI * i) / n - Math.PI / 2;
          return `${cx + level * r * Math.cos(angle)},${cy + level * r * Math.sin(angle)}`;
        }).join(" ");
        return <polygon key={level} points={pts} fill="none" stroke="#e5e7eb" strokeWidth="0.5" />;
      })}
      {/* Axes */}
      {keys.map((_, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)} stroke="#e5e7eb" strokeWidth="0.5" />;
      })}
      {/* Data polygon */}
      <polygon points={polyPoints} fill="rgba(200,230,76,0.25)" stroke="#c8e64c" strokeWidth="1.5" />
      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#c8e64c" />
      ))}
      {/* Labels */}
      {keys.map((k, i) => {
        const pos = getLabel(i);
        return (
          <text key={k} x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#6b7280">
            {k.split(" ")[0]}
          </text>
        );
      })}
    </svg>
  );
}

export default function AnalyticsPage() {
  const m = currentMember;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
          Sports Analytics
        </h1>
        <p className="text-neutral-500 text-sm">Deep dive into your performance, skills, and training patterns.</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Sessions", value: m.totalSessions, sub: "All time", icon: "📊" },
          { label: "This Month", value: m.sessionsThisMonth, sub: "+25% vs last month", icon: "📈" },
          { label: "Avg/Week", value: "4.5", sub: "Last 8 weeks", icon: "⏱️" },
          { label: "Peak Week", value: "11h", sub: "W2 Mar training load", icon: "⚡" },
        ].map((s) => (
          <Card key={s.label} className="border-neutral-100">
            <CardContent className="p-4">
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="text-2xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</p>
              <p className="text-xs font-medium text-neutral-700">{s.label}</p>
              <p className="text-[10px] text-neutral-400">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Monthly trend */}
        <Card className="border-neutral-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-neutral-900">Monthly Sessions</h2>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="w-3.5 h-3.5" /> +25% growth
              </div>
            </div>
            <div className="flex items-end gap-3 h-40">
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

        {/* Skills radar */}
        <Card className="border-neutral-100">
          <CardContent className="p-6">
            <h2 className="font-bold text-neutral-900 mb-1">Skill Radar</h2>
            <p className="text-xs text-neutral-400 mb-4">As rated by Coach Arjun Mehta · Scale: /10</p>
            <RadarChart data={skillRatings} />
          </CardContent>
        </Card>
      </div>

      {/* Training load */}
      <Card className="border-neutral-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-neutral-900">Training Load (Weekly Hours)</h2>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full" style={{ background: "#c8e64c" }} />Actual</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-neutral-300" />Recommended</div>
            </div>
          </div>
          <p className="text-xs text-neutral-400 mb-5">Recommended zone: 8 hrs/week for your level</p>
          <div className="flex items-end gap-2 h-40">
            {trainingLoad.map((d) => (
              <div key={d.week} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 items-end" style={{ height: `${(maxLoad / maxLoad) * 120}px` }}>
                  <div className="flex-1 rounded-t-md transition-all" style={{ height: `${(d.hours / maxLoad) * 120}px`, background: d.hours > d.recommended ? "#e8c84c" : "#c8e64c" }} />
                  <div className="flex-1 rounded-t-md opacity-30 bg-neutral-400" style={{ height: `${(d.recommended / maxLoad) * 120}px` }} />
                </div>
                <span className="text-[9px] text-neutral-400">{d.week}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill breakdown */}
      <Card className="border-neutral-100">
        <CardContent className="p-6">
          <h2 className="font-bold text-neutral-900 mb-5 flex items-center gap-2">
            <Target className="w-4 h-4" /> Skill Breakdown
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {Object.entries(skillRatings).map(([skill, score]) => (
              <div key={skill}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-neutral-700">{skill}</span>
                  <span className="text-xs font-bold text-neutral-900">{score}<span className="font-normal text-neutral-400">/10</span></span>
                </div>
                <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${score * 10}%`, background: score >= 8 ? "#c8e64c" : score >= 6 ? "#4cb8e8" : "#e87a4c" }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personal bests */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {personalBests.map((pb) => (
          <Card key={pb.label} className="border-neutral-100 overflow-hidden">
            <div className="h-1 w-full" style={{ background: "#c8e64c" }} />
            <CardContent className="p-4">
              <div className="text-2xl mb-2">{pb.icon}</div>
              <p className="text-xs text-neutral-400 mb-0.5">Personal Best</p>
              <p className="font-black text-xl text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{pb.value}</p>
              <p className="text-xs font-medium text-neutral-700 mt-0.5">{pb.label}</p>
              <p className="text-[10px] text-neutral-400">{pb.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison bar */}
      <Card className="border-neutral-100">
        <CardContent className="p-6">
          <h2 className="font-bold text-neutral-900 mb-5">You vs Average Member</h2>
          <div className="space-y-4">
            {[
              { label: "Sessions / Month", you: 20, avg: 12 },
              { label: "Training Hours / Week", you: 9.5, avg: 5.5 },
              { label: "Competitions Entered", you: 6, avg: 2 },
              { label: "Coach Sessions Booked", you: 12, avg: 4 },
            ].map((item) => {
              const max = Math.max(item.you, item.avg) * 1.2;
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-neutral-500 mb-1.5">
                    <span>{item.label}</span>
                    <span className="flex items-center gap-2">
                      <span style={{ color: "#3a6a00" }} className="font-semibold">You: {item.you}</span>
                      <span>·</span>
                      <span>Avg: {item.avg}</span>
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(item.you / max) * 100}%`, background: "#c8e64c" }} />
                    </div>
                    <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full rounded-full bg-neutral-300" style={{ width: `${(item.avg / max) * 100}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
