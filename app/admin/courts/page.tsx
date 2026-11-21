"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { courts, sportStats } from "@/lib/mock-data";
import { CheckCircle2, Lock, Wrench, X } from "lucide-react";

const sportEmojis: Record<string, string> = {
  Badminton: "🏸",
  "Table Tennis": "🏓",
  Boxing: "🥊",
  Gymnastics: "🤸",
  Wrestling: "🤼",
  Yoga: "🧘",
  Athletics: "🏃",
  Swimming: "🏊",
};

const statusConfig: Record<string, { label: string; textColor: string; bg: string; border: string }> = {
  available: { label: "Available", textColor: "#3a6a00", bg: "#c8e64c20", border: "#c8e64c" },
  occupied: { label: "In Use", textColor: "#1a4b8a", bg: "#4cb8e820", border: "#4cb8e8" },
  maintenance: { label: "Maintenance", textColor: "#92400e", bg: "#f59e0b20", border: "#f59e0b" },
  blocked: { label: "Blocked", textColor: "#7f1d1d", bg: "#ef444420", border: "#ef4444" },
};

type Court = typeof courts[0];

function BlockModal({ court, onClose }: { court: Court; onClose: () => void }) {
  const [reason, setReason] = useState<"maintenance" | "blocked">("maintenance");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
        <div className="bg-white rounded-3xl w-full max-w-sm p-8 text-center shadow-2xl">
          <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: "#3a6a00" }} />
          <h3 className="font-black text-xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>{court.name} blocked</h3>
          <p className="text-sm text-neutral-500 mb-5">Status set to {reason}.</p>
          <Button className="w-full rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={onClose}>Done</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-neutral-900">Block {court.name}</h3>
          <button onClick={onClose}><X className="w-4 h-4 text-neutral-400" /></button>
        </div>
        <div className="space-y-2 mb-5">
          {(["maintenance", "blocked"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setReason(r)}
              className="w-full flex items-center gap-3 rounded-xl border p-3 text-sm font-semibold capitalize transition-all text-left"
              style={r === reason ? { borderColor: "#c8e64c", background: "#c8e64c20" } : { borderColor: "#e5e7eb" }}
            >
              {r === "maintenance" ? <Wrench className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              {r === "maintenance" ? "Mark as Maintenance" : "Block for Admin Use"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 rounded-xl" onClick={onClose}>Cancel</Button>
          <Button className="flex-1 rounded-xl font-bold" style={{ background: "#e8c84c", color: "#1a1a1a" }} onClick={() => setDone(true)}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminCourtsPage() {
  const [sportFilter, setSportFilter] = useState("All");
  const [blocking, setBlocking] = useState<Court | null>(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 30000);
    return () => clearInterval(t);
  }, []);

  const sports = ["All", ...Array.from(new Set(courts.map((c) => c.sport)))];
  const filtered = sportFilter === "All" ? courts : courts.filter((c) => c.sport === sportFilter);

  const available = courts.filter((c) => c.status === "available").length;
  const occupied = courts.filter((c) => c.status === "occupied").length;
  const maint = courts.filter((c) => c.status === "maintenance").length;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>Courts & Scheduling</h1>
          <p className="text-neutral-500 text-sm">Live court status, block management, and weekly utilization.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-100 rounded-xl px-3 py-2 shrink-0">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Live
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Available", value: available, textColor: "#3a6a00", bg: "#c8e64c20" },
          { label: "In Use", value: occupied, textColor: "#1a4b8a", bg: "#4cb8e820" },
          { label: "Maintenance", value: maint, textColor: "#92400e", bg: "#f59e0b20" },
        ].map((s) => (
          <Card key={s.label} className="border-neutral-100">
            <CardContent className="p-4 text-center" style={{ background: s.bg }}>
              <p className="text-3xl font-black" style={{ color: s.textColor, fontFamily: "var(--font-heading)" }}>{s.value}</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: s.textColor }}>{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sport filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {sports.map((s) => (
          <button
            key={s}
            onClick={() => setSportFilter(s)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold border shrink-0 transition-all"
            style={sportFilter === s
              ? { background: "#c8e64c", color: "#1a1a1a", borderColor: "#c8e64c" }
              : { borderColor: "#e5e7eb", color: "#555" }}
          >
            {s !== "All" ? `${sportEmojis[s] ?? ""} ` : ""}{s}
          </button>
        ))}
      </div>

      {/* Court grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((court) => {
          const sc = statusConfig[court.status] ?? statusConfig.available;
          return (
            <Card key={court.id} className="border-2 transition-all hover:shadow-md" style={{ borderColor: sc.border }}>
              <CardContent className="p-4" style={{ background: sc.bg }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg">{sportEmojis[court.sport] ?? "🏟️"}</span>
                  <Badge className="text-[10px] border-0 font-semibold" style={{ background: sc.bg, color: sc.textColor }}>
                    {sc.label}
                  </Badge>
                </div>
                <p className="font-bold text-neutral-900 text-sm">{court.name}</p>
                <p className="text-xs text-neutral-400 mb-3">{court.sport}</p>

                {court.status === "occupied" && "member" in court && court.member && (
                  <div className="text-[10px] bg-white/60 rounded-lg p-2 space-y-0.5">
                    <p className="font-semibold text-neutral-700">{court.member}</p>
                    {"until" in court && court.until && <p className="text-neutral-400">Until {court.until}</p>}
                  </div>
                )}

                {court.status === "available" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full rounded-xl text-xs mt-1 h-7 border border-neutral-200 hover:bg-white"
                    onClick={() => setBlocking(court)}
                  >
                    <Lock className="w-3 h-3 mr-1" /> Block
                  </Button>
                )}
                {(court.status === "maintenance" || court.status === "blocked") && (
                  <Button size="sm" variant="ghost" className="w-full rounded-xl text-xs mt-1 h-7 border border-green-200 text-green-700 hover:bg-white">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Mark Available
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Utilization by sport */}
      <Card className="border-neutral-100">
        <CardContent className="p-5">
          <h2 className="font-bold text-neutral-900 mb-4">Weekly Utilization by Sport</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {sportStats.map((u) => (
              <div key={u.sport} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3.5" />
                    <circle
                      cx="18" cy="18" r="15.9" fill="none"
                      stroke={u.color}
                      strokeWidth="3.5"
                      strokeDasharray={`${u.courtUtilization} ${100 - u.courtUtilization}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-neutral-900">{u.courtUtilization}%</span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-500">{u.emoji} {u.sport}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {blocking && <BlockModal court={blocking} onClose={() => setBlocking(null)} />}
    </div>
  );
}
