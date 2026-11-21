"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { competitionHistory, events } from "@/lib/mock-data";
import { Trophy, Target, TrendingUp, CalendarDays, Users, CheckCircle2, X, Clock } from "lucide-react";

type Competition = typeof competitionHistory[0];

const resultStyle: Record<string, { bg: string; text: string }> = {
  Won: { bg: "bg-green-50", text: "text-green-700" },
  Lost: { bg: "bg-red-50", text: "text-red-700" },
  Upcoming: { bg: "bg-amber-50", text: "text-amber-700" },
};

function DetailModal({ comp, onClose }: { comp: Competition; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="h-2 w-full" style={{ background: comp.color }} />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <Badge variant="outline" className="text-xs mb-2">{comp.type}</Badge>
              <h3 className="font-black text-xl text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{comp.name}</h3>
              <p className="text-sm text-neutral-500">{comp.sport} · {comp.category}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="rounded-xl bg-[#f5f5f0] p-3">
              <p className="text-[10px] text-neutral-400 mb-0.5">Result</p>
              <Badge className={`text-xs ${resultStyle[comp.result]?.bg ?? ""} ${resultStyle[comp.result]?.text ?? ""} border-0`}>
                {comp.result}
              </Badge>
            </div>
            <div className="rounded-xl bg-[#f5f5f0] p-3">
              <p className="text-[10px] text-neutral-400 mb-0.5">Position</p>
              <p className="font-bold text-neutral-900">{comp.position ? `#${comp.position}` : "TBD"}</p>
            </div>
            <div className="rounded-xl bg-[#f5f5f0] p-3">
              <p className="text-[10px] text-neutral-400 mb-0.5">Date</p>
              <p className="font-semibold text-sm text-neutral-900">
                {new Date(comp.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
            <div className="rounded-xl bg-[#f5f5f0] p-3">
              <p className="text-[10px] text-neutral-400 mb-0.5">Prize</p>
              <p className="font-semibold text-sm text-neutral-900">{comp.prize || "—"}</p>
            </div>
          </div>

          {comp.score && (
            <div className="rounded-xl border border-neutral-100 p-4 mb-4">
              <p className="text-xs text-neutral-400 mb-2">Match Score vs {comp.opponent}</p>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-xs text-neutral-400 mb-1">You</p>
                  <p className="font-black text-2xl" style={{ fontFamily: "var(--font-heading)" }}>
                    {comp.score.split(", ").map(s => s.split("-")[0]).join(" · ")}
                  </p>
                </div>
                <div className="text-neutral-300 font-bold">vs</div>
                <div className="text-center">
                  <p className="text-xs text-neutral-400 mb-1">{comp.opponent?.split(" / ")[0].split(" ")[0]}</p>
                  <p className="font-black text-2xl text-neutral-400" style={{ fontFamily: "var(--font-heading)" }}>
                    {comp.score.split(", ").map(s => s.split("-")[1]).join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button className="w-full rounded-xl font-semibold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

function RegisterModal({ eventName, onClose }: { eventName: string; onClose: () => void }) {
  const [done, setDone] = useState(false);
  if (done) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#c8e64c30" }}>
          <CheckCircle2 className="w-8 h-8" style={{ color: "#3a6a00" }} />
        </div>
        <h3 className="font-black text-lg text-neutral-950 mb-1">Registered!</h3>
        <p className="text-sm text-neutral-500 mb-5">You're registered for {eventName}. Good luck! 🏆</p>
        <Button className="w-full rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={onClose}>Done</Button>
      </div>
    </div>
  );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-neutral-900">Confirm Registration</h3>
          <button onClick={onClose}><X className="w-4 h-4 text-neutral-400" /></button>
        </div>
        <p className="text-sm text-neutral-600 mb-4">Register for <strong>{eventName}</strong>? Entry fee will be charged to your account.</p>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 rounded-xl" onClick={onClose}>Cancel</Button>
          <Button className="flex-1 rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={() => setDone(true)}>Register</Button>
        </div>
      </div>
    </div>
  );
}

export default function CompetitionsPage() {
  const [tab, setTab] = useState<"mine" | "history" | "upcoming">("mine");
  const [detail, setDetail] = useState<Competition | null>(null);
  const [regEvent, setRegEvent] = useState<string | null>(null);

  const completed = competitionHistory.filter(c => c.status === "completed");
  const wins = completed.filter(c => c.result === "Won").length;
  const winRate = completed.length > 0 ? Math.round((wins / completed.length) * 100) : 0;
  const trophies = competitionHistory.filter(c => c.position === 1).length;
  const upcoming = events.filter(e => e.status === "open" || e.status === "upcoming");

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
          Competition Center
        </h1>
        <p className="text-neutral-500 text-sm">Your tournament history, results, and upcoming events.</p>
      </div>

      {/* Stats banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Participated", value: competitionHistory.length, icon: "🏟️", color: "#c8e64c" },
          { label: "Wins", value: wins, icon: "🏅", color: "#a8d54a" },
          { label: "Win Rate", value: `${winRate}%`, icon: "📈", color: "#4cb8e8" },
          { label: "Trophies", value: trophies, icon: "🏆", color: "#e8c84c" },
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
        {([
          { id: "mine", label: "My Competitions" },
          { id: "history", label: "Full History" },
          { id: "upcoming", label: "Upcoming Events" },
        ] as const).map((t) => (
          <Button
            key={t.id}
            size="sm"
            onClick={() => setTab(t.id)}
            className="rounded-xl text-xs font-semibold"
            variant={tab === t.id ? "default" : "outline"}
            style={tab === t.id ? { background: "#c8e64c", color: "#1a1a1a" } : {}}
          >
            {t.label}
          </Button>
        ))}
      </div>

      {/* Tab content */}
      {(tab === "mine" || tab === "history") && (
        <div className="space-y-3">
          {competitionHistory.map((comp) => {
            const rs = resultStyle[comp.result] ?? { bg: "bg-neutral-50", text: "text-neutral-700" };
            return (
              <Card key={comp.id} className="border-neutral-100 hover:shadow-md transition-all cursor-pointer" onClick={() => setDetail(comp)}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-12 rounded-full shrink-0" style={{ background: comp.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="font-semibold text-sm text-neutral-900">{comp.name}</p>
                        <Badge variant="outline" className="text-[10px]">{comp.type}</Badge>
                      </div>
                      <p className="text-xs text-neutral-500">{comp.sport} · {comp.category}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {new Date(comp.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        {comp.opponent && ` · vs ${comp.opponent}`}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <Badge className={`text-xs ${rs.bg} ${rs.text} border-0 mb-1`}>{comp.result}</Badge>
                      {comp.position && <p className="text-xs text-neutral-400">#{comp.position}</p>}
                      {comp.prize && comp.prize !== "—" && <p className="text-xs text-neutral-600 font-medium">{comp.prize}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "upcoming" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {upcoming.map((event) => (
            <Card key={event.id} className="border-neutral-100 overflow-hidden">
              <div className="h-1.5 w-full" style={{ background: event.poster }} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <Badge variant="outline" className="text-xs mb-2">{event.type}</Badge>
                    <h3 className="font-bold text-neutral-900 text-sm">{event.name}</h3>
                    <p className="text-xs text-neutral-500">{event.sport} · {event.format}</p>
                  </div>
                  <Badge className={`text-xs shrink-0 ${event.status === "open" ? "bg-green-50 text-green-700 border-green-100" : "bg-amber-50 text-amber-700 border-amber-100"}`} variant="outline">
                    {event.status === "open" ? "Open" : "Coming Soon"}
                  </Badge>
                </div>
                <div className="space-y-1.5 text-xs text-neutral-500 mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" />
                    {event.participants}/{event.maxParticipants} registered
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-neutral-900">{event.entryFee === 0 ? "Free Entry" : `₹${event.entryFee}`}</span>
                  {event.status === "open" && (
                    <Button size="sm" className="rounded-xl text-xs font-semibold" style={{ background: "#c8e64c", color: "#1a1a1a" }}
                      onClick={() => setRegEvent(event.name)}>
                      Register
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modals */}
      {detail && <DetailModal comp={detail} onClose={() => setDetail(null)} />}
      {regEvent && <RegisterModal eventName={regEvent} onClose={() => setRegEvent(null)} />}
    </div>
  );
}
