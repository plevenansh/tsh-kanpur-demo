"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminEvents } from "@/lib/mock-data";
import { Trophy, Users, IndianRupee, Plus, X, CheckCircle2, Calendar } from "lucide-react";

type AEvent = typeof adminEvents[0];

const statusStyle: Record<string, string> = {
  open: "bg-green-50 text-green-700 border-green-100",
  draft: "bg-neutral-100 text-neutral-600 border-neutral-200",
  completed: "bg-blue-50 text-blue-700 border-blue-100",
  cancelled: "bg-red-50 text-red-700 border-red-100",
};

function CreateEventModal({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", sport: "Badminton", type: "Tournament", date: "", entryFee: "", maxParticipants: "", prizePool: "" });
  const sports = ["Badminton", "Table Tennis", "Boxing", "Gymnastics", "Wrestling", "Yoga", "Athletics", "Swimming"];
  const types = ["Tournament", "Camp", "Gala", "Invitational", "Workshop"];

  if (done) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#c8e64c30" }}>
          <CheckCircle2 className="w-8 h-8" style={{ color: "#3a6a00" }} />
        </div>
        <h3 className="font-black text-xl mb-1" style={{ fontFamily: "var(--font-heading)" }}>Event Created!</h3>
        <p className="text-sm text-neutral-500 mb-5">"{form.name}" has been saved as a draft.</p>
        <Button className="w-full rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={onClose}>Done</Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between sticky top-0 bg-white">
          <h3 className="font-bold text-neutral-900">Create New Event</h3>
          <button onClick={onClose}><X className="w-4 h-4 text-neutral-400" /></button>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: "Event Name", key: "name", type: "text", placeholder: "e.g. Summer Badminton Open 2026" },
            { label: "Date", key: "date", type: "date", placeholder: "" },
            { label: "Entry Fee (₹)", key: "entryFee", type: "number", placeholder: "0 for free" },
            { label: "Max Participants", key: "maxParticipants", type: "number", placeholder: "e.g. 64" },
            { label: "Prize Pool (₹)", key: "prizePool", type: "number", placeholder: "0 if none" },
          ].map((f) => (
            <div key={f.key}>
              <label className="text-xs font-medium text-neutral-500 block mb-1.5">{f.label}</label>
              <input
                type={f.type}
                value={(form as Record<string, string>)[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-2.5 text-sm outline-none"
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-neutral-500 block mb-1.5">Sport</label>
              <select value={form.sport} onChange={(e) => setForm({ ...form, sport: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-2.5 text-sm outline-none">
                {sports.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-500 block mb-1.5">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-2.5 text-sm outline-none">
                {types.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <Button variant="outline" className="flex-1 rounded-xl" onClick={onClose}>Cancel</Button>
            <Button className="flex-1 rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }}
              onClick={() => form.name && form.date ? setDone(true) : alert("Fill in Event Name and Date")}>
              Create Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminEventsPage() {
  const [filter, setFilter] = useState("All");
  const [creating, setCreating] = useState(false);

  const filtered = filter === "All" ? adminEvents : adminEvents.filter(e => e.status === filter.toLowerCase());
  const totalCollected = adminEvents.reduce((a, e) => a + e.totalCollected, 0);
  const prizeDistributed = adminEvents.filter(e => e.status === "completed").reduce((a, e) => a + e.prizePool, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
            Competitions & Events
          </h1>
          <p className="text-neutral-500 text-sm">Manage all tournaments, camps, and sporting events.</p>
        </div>
        <Button className="rounded-xl font-bold gap-2 shrink-0" style={{ background: "#c8e64c", color: "#1a1a1a" }}
          onClick={() => setCreating(true)}>
          <Plus className="w-4 h-4" /> Create Event
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Events", value: adminEvents.length, icon: "🏆" },
          { label: "Open / Live", value: adminEvents.filter(e => e.status === "open").length, icon: "🟢" },
          { label: "Fees Collected", value: `₹${(totalCollected / 1000).toFixed(1)}K`, icon: "💵" },
          { label: "Prize Distributed", value: `₹${(prizeDistributed / 1000).toFixed(0)}K`, icon: "🥇" },
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

      {/* Filters */}
      <div className="flex gap-2">
        {["All", "Open", "Draft", "Completed"].map((f) => (
          <Button key={f} size="sm" onClick={() => setFilter(f)} variant={filter === f ? "default" : "outline"}
            className="rounded-xl text-xs font-semibold"
            style={filter === f ? { background: "#c8e64c", color: "#1a1a1a" } : {}}>
            {f}
          </Button>
        ))}
      </div>

      {/* Events list */}
      <div className="space-y-4">
        {filtered.map((ev) => (
          <Card key={ev.id} className="border-neutral-100 overflow-hidden hover:shadow-md transition-all">
            <div className="h-1.5 w-full" style={{ background: ev.color }} />
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-bold text-neutral-900">{ev.name}</h3>
                    <Badge className={`text-[10px] ${statusStyle[ev.status]}`} variant="outline">{ev.status}</Badge>
                    <Badge variant="outline" className="text-[10px]">{ev.type}</Badge>
                  </div>
                  <p className="text-xs text-neutral-500">{ev.sport} · {ev.format}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    <div className="rounded-xl bg-[#f5f5f0] p-3 text-xs">
                      <p className="text-neutral-400 mb-0.5">Date</p>
                      <p className="font-semibold text-neutral-900">{new Date(ev.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                    </div>
                    <div className="rounded-xl bg-[#f5f5f0] p-3 text-xs">
                      <p className="text-neutral-400 mb-0.5">Participants</p>
                      <p className="font-semibold text-neutral-900">{ev.participants}/{ev.maxParticipants}</p>
                    </div>
                    <div className="rounded-xl bg-[#f5f5f0] p-3 text-xs">
                      <p className="text-neutral-400 mb-0.5">Entry Fee</p>
                      <p className="font-semibold text-neutral-900">{ev.entryFee === 0 ? "Free" : `₹${ev.entryFee}`}</p>
                    </div>
                    <div className="rounded-xl bg-[#f5f5f0] p-3 text-xs">
                      <p className="text-neutral-400 mb-0.5">Fees Collected</p>
                      <p className="font-bold text-neutral-900">₹{ev.totalCollected.toLocaleString()}</p>
                    </div>
                  </div>

                  {ev.prizePool > 0 && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                      <Trophy className="w-3.5 h-3.5" /> Prize Pool: ₹{ev.prizePool.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="shrink-0 flex flex-col gap-2">
                  <Button size="sm" variant="outline" className="rounded-xl text-xs">View Details</Button>
                  {ev.status === "open" && (
                    <Button size="sm" className="rounded-xl text-xs font-semibold" style={{ background: "#c8e64c", color: "#1a1a1a" }}>
                      Manage
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {creating && <CreateEventModal onClose={() => setCreating(false)} />}
    </div>
  );
}
