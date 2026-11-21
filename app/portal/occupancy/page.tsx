"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { courts, sports } from "@/lib/mock-data";
import { Activity, Clock, CheckCircle2, Wrench, X, RefreshCw } from "lucide-react";

type Court = typeof courts[0];

const statusConfig = {
  available: { label: "Available", bg: "#c8e64c20", border: "#c8e64c60", dot: "#22c55e", text: "#3a6a00" },
  occupied: { label: "Occupied", bg: "#4cb8e820", border: "#4cb8e860", dot: "#4cb8e8", text: "#0a4a6a" },
  maintenance: { label: "Maintenance", bg: "#fee2e2", border: "#fca5a5", dot: "#ef4444", text: "#b91c1c" },
};

const sportEmojis: Record<string, string> = {
  Badminton: "🏸", "Table Tennis": "🏓", Boxing: "🥊",
  Gymnastics: "🤸", Wrestling: "🤼", Yoga: "🧘",
  Athletics: "🏃", Swimming: "🏊",
};

function CourtDetailModal({ court, onClose }: { court: Court; onClose: () => void }) {
  const cfg = statusConfig[court.status as keyof typeof statusConfig];
  const sport = sports.find(s => s.name === court.sport);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
        <div className="h-2 w-full" style={{ background: sport?.color ?? "#c8e64c" }} />
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: (sport?.color ?? "#c8e64c") + "25" }}>
                {sportEmojis[court.sport] ?? "🏟️"}
              </div>
              <div>
                <h3 className="font-bold text-neutral-900">{court.name}</h3>
                <p className="text-xs text-neutral-400">{court.sport}</p>
              </div>
            </div>
            <button onClick={onClose}><X className="w-4 h-4 text-neutral-400" /></button>
          </div>

          <div className="rounded-xl p-4 mb-4" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: cfg.dot }} />
              <span className="font-semibold text-sm" style={{ color: cfg.text }}>{cfg.label}</span>
            </div>
            {court.status === "occupied" && (
              <div className="mt-2 text-sm text-neutral-700">
                <p>Currently: <strong>{court.member}</strong></p>
                <p className="text-xs text-neutral-500 mt-0.5">Session until {court.until}</p>
              </div>
            )}
            {court.status === "maintenance" && (
              <p className="text-xs text-neutral-500 mt-1">Court under scheduled maintenance</p>
            )}
            {court.status === "available" && (
              <p className="text-xs text-neutral-600 mt-1">Ready to book — next slot available now</p>
            )}
          </div>

          <div className="space-y-2 text-sm text-neutral-600 mb-5">
            <div className="flex justify-between"><span className="text-neutral-400">Next available</span><span className="font-medium">{court.status === "available" ? "Now" : court.until ?? "After maintenance"}</span></div>
            <div className="flex justify-between"><span className="text-neutral-400">Surface</span><span className="font-medium">{sports.find(s => s.name === court.sport)?.surface ?? "—"}</span></div>
          </div>

          {court.status === "available" && (
            <Button className="w-full rounded-xl font-semibold" style={{ background: "#c8e64c", color: "#1a1a1a" }}
              onClick={onClose}>
              Book This Court
            </Button>
          )}
          {court.status !== "available" && (
            <Button className="w-full rounded-xl font-semibold" variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OccupancyPage() {
  const [courtData, setCourtData] = useState(courts);
  const [selected, setSelected] = useState<Court | null>(null);
  const [timer, setTimer] = useState(30);

  // Simulated auto-refresh countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          // Simulate a refresh
          return 30;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const sportGroups = [...new Set(courtData.map((c) => c.sport))];
  const summaryStats = {
    available: courtData.filter((c) => c.status === "available").length,
    occupied: courtData.filter((c) => c.status === "occupied").length,
    maintenance: courtData.filter((c) => c.status === "maintenance").length,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
            Live Occupancy
          </h1>
          <p className="text-neutral-500 text-sm">Real-time court status across all sports facilities.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-500 shrink-0">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
          Refreshing in {timer}s
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Available", value: summaryStats.available, icon: CheckCircle2, color: "#c8e64c", textColor: "#3a6a00" },
          { label: "Occupied", value: summaryStats.occupied, icon: Activity, color: "#4cb8e8", textColor: "#0a4a6a" },
          { label: "Maintenance", value: summaryStats.maintenance, icon: Wrench, color: "#ef4444", textColor: "#b91c1c" },
        ].map((s) => (
          <Card key={s.label} className="border-neutral-100">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.color + "25" }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-2xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</p>
                <p className="text-xs text-neutral-500">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        {Object.entries(statusConfig).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: cfg.dot }} />
            <span className="text-neutral-600">{cfg.label}</span>
          </div>
        ))}
        <span className="text-neutral-400 ml-2">· Click any court for details</span>
      </div>

      {/* Court grids by sport */}
      {sportGroups.map((sport) => {
        const sportCourts = courtData.filter((c) => c.sport === sport);
        const availCount = sportCourts.filter(c => c.status === "available").length;
        return (
          <div key={sport} className="bg-white rounded-2xl border border-neutral-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">{sportEmojis[sport] ?? "🏟️"}</span>
                <h2 className="font-bold text-neutral-900">{sport}</h2>
              </div>
              <Badge
                className="text-xs"
                style={availCount > 0
                  ? { background: "#c8e64c30", color: "#3a6a00", border: "none" }
                  : { background: "#fee2e230", color: "#b91c1c", border: "none" }}
              >
                {availCount}/{sportCourts.length} available
              </Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {sportCourts.map((court) => {
                const cfg = statusConfig[court.status as keyof typeof statusConfig];
                return (
                  <button
                    key={court.id}
                    onClick={() => setSelected(court)}
                    className="rounded-xl p-4 border text-left hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
                    style={{ background: cfg.bg, borderColor: cfg.border }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-sm text-neutral-900">{court.name}</p>
                      <div className="w-2 h-2 rounded-full" style={{ background: cfg.dot }} />
                    </div>
                    {court.status === "occupied" && (
                      <div>
                        <p className="text-xs text-neutral-600 truncate">{court.member}</p>
                        <div className="flex items-center gap-1 mt-0.5 text-[10px] text-neutral-400">
                          <Clock className="w-3 h-3" />
                          Until {court.until}
                        </div>
                      </div>
                    )}
                    {court.status === "maintenance" && (
                      <p className="text-xs text-red-400">Under maintenance</p>
                    )}
                    {court.status === "available" && (
                      <p className="text-xs" style={{ color: "#3a6a00" }}>Ready to book</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {selected && <CourtDetailModal court={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
