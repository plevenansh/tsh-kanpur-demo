"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { timetable, slotTimes, sports, BOOKING_SLOT_TIMES } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, CalendarDays, Clock, QrCode, BellPlus, RotateCcw } from "lucide-react";

const displaySports = ["Badminton", "Table Tennis", "Boxing", "Gymnastics", "Yoga", "Swimming"];

const TABS = [
  { id: "today", label: "Today", sub: new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }) },
  { id: "tomorrow", label: "Tomorrow", sub: new Date(Date.now() + 86400000).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }) },
  { id: "week", label: "This Week", sub: "Pick a date" },
];

type Slot = "available" | "booked" | "maintenance" | "mine";

const slotStyle: Record<Slot, string> = {
  available: "bg-white border border-neutral-200 text-neutral-600 hover:border-lime-400 hover:bg-lime-50 cursor-pointer transition-all",
  booked: "bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed",
  maintenance: "bg-red-50 text-red-400 border border-red-100 cursor-not-allowed",
  mine: "text-black font-semibold border cursor-default",
};

const courts = Object.keys(timetable);
const USE_SLOT_TIMES = BOOKING_SLOT_TIMES;

// Simple QR-like SVG
function FakeQRCode({ value }: { value: string }) {
  const seed = value.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const cells: boolean[][] = Array.from({ length: 10 }, (_, r) =>
    Array.from({ length: 10 }, (_, c) => (seed + r * 13 + c * 7) % 3 !== 0)
  );
  return (
    <svg width="120" height="120" viewBox="0 0 10 10" shapeRendering="crispEdges">
      {cells.map((row, r) =>
        row.map((on, c) => on ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#1a1a1a" /> : null)
      )}
      {/* Corner squares */}
      {[[0, 0], [0, 7], [7, 0]].map(([rx, ry], i) => (
        <g key={i}>
          <rect x={ry} y={rx} width={3} height={3} fill="#1a1a1a" />
          <rect x={ry + 0.5} y={rx + 0.5} width={2} height={2} fill="white" />
          <rect x={ry + 1} y={rx + 1} width={1} height={1} fill="#1a1a1a" />
        </g>
      ))}
    </svg>
  );
}

export default function BookingPage() {
  const [activeSport, setActiveSport] = useState("Badminton");
  const [activeTab, setActiveTab] = useState("today");
  const [selectedSlot, setSelectedSlot] = useState<{ court: string; time: string } | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [waitlistCourt, setWaitlistCourt] = useState<string | null>(null);

  const handleSlotClick = (court: string, time: string, status: Slot) => {
    if (status === "available") setSelectedSlot({ court, time });
    else if (status === "booked") setWaitlistCourt(`${court} at ${time}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
          Book a Court
        </h1>
        <p className="text-neutral-500 text-sm">Select a sport, then tap any available slot.</p>
      </div>

      {/* Sport tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
        {displaySports.map((s) => {
          const sport = sports.find((sp) => sp.name === s);
          return (
            <button
              key={s}
              onClick={() => setActiveSport(s)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold shrink-0 border transition-all"
              style={
                s === activeSport
                  ? { background: "#c8e64c", color: "#1a1a1a", borderColor: "#c8e64c" }
                  : { background: "white", color: "#555", borderColor: "#e5e7eb" }
              }
            >
              <span>{sport?.emoji ?? "🏟️"}</span>
              {s}
            </button>
          );
        })}
      </div>

      {/* Day tabs */}
      <div className="flex gap-2 mb-5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="flex flex-col items-start rounded-xl px-4 py-2.5 border transition-all"
            style={
              t.id === activeTab
                ? { background: "#1a1a1a", color: "white", borderColor: "#1a1a1a" }
                : { background: "white", color: "#555", borderColor: "#e5e7eb" }
            }
          >
            <span className="text-sm font-bold">{t.label}</span>
            <span className="text-[10px] opacity-60">{t.sub}</span>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs">
        {[
          { color: "bg-white border border-neutral-200", label: "Available" },
          { color: "bg-neutral-100 border border-neutral-200", label: "Booked (tap to waitlist)" },
          { color: "bg-red-50 border border-red-100", label: "Maintenance" },
          { color: "border", label: "My Booking", style: { background: "#c8e64c" } },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`w-4 h-4 rounded ${l.color}`} style={l.style} />
            <span className="text-neutral-600">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Timetable */}
      <div className="bg-white rounded-2xl border border-neutral-100 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-neutral-100">
              <th className="text-left p-3 pl-5 text-neutral-400 font-semibold sticky left-0 bg-white min-w-[90px]">Court</th>
              {USE_SLOT_TIMES.map((t) => (
                <th key={t} className="p-3 text-center text-neutral-500 font-medium min-w-[70px]">{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courts.map((court, i) => (
              <tr key={court} className={`border-b border-neutral-50 ${i % 2 === 0 ? "" : "bg-[#fafafa]"}`}>
                <td className="p-3 pl-5 font-semibold text-neutral-900 sticky left-0 bg-inherit whitespace-nowrap">{court}</td>
                {USE_SLOT_TIMES.map((time) => {
                  const status: Slot = (timetable[court]?.[time] as Slot) ?? "available";
                  return (
                    <td key={time} className="p-2 text-center">
                      <button
                        onClick={() => handleSlotClick(court, time, status)}
                        disabled={status === "maintenance"}
                        className={`w-full py-2 px-1 rounded-lg text-center ${slotStyle[status]}`}
                        style={status === "mine" ? { background: "#c8e64c" } : {}}
                      >
                        {status === "mine" ? "Mine" : status === "maintenance" ? "Maint." : status === "booked" ? "Full" : "Free"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-neutral-400 mt-3">
        {activeTab === "today" ? "Today" : activeTab === "tomorrow" ? "Tomorrow" : "This Week"} · Annual plan: Unlimited bookings
      </p>

      {/* Booking modal */}
      <Dialog open={!!selectedSlot} onOpenChange={(o) => { if (!o) { setSelectedSlot(null); setConfirmed(false); setRecurring(false); } }}>
        <DialogContent className="rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle>{confirmed ? "Booking Confirmed!" : "Confirm Booking"}</DialogTitle>
          </DialogHeader>
          {confirmed ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ background: "#c8e64c30" }}>
                <CheckCircle2 className="w-8 h-8" style={{ color: "#3a6a00" }} />
              </div>
              <p className="font-bold text-neutral-950 text-lg">{selectedSlot?.court} at {selectedSlot?.time}</p>
              {recurring && <Badge className="bg-amber-50 text-amber-700 border-amber-100 text-xs">Recurring weekly booking set</Badge>}
              {/* QR Code */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs text-neutral-500">Scan at the entrance</p>
                <div className="p-3 bg-white border-2 border-neutral-100 rounded-xl">
                  <FakeQRCode value={`TSH-${selectedSlot?.court}-${selectedSlot?.time}`} />
                </div>
                <p className="text-[10px] text-neutral-400">TSH-{selectedSlot?.court}-{selectedSlot?.time}</p>
              </div>
              <p className="text-sm text-neutral-500">You'll receive a WhatsApp confirmation shortly.</p>
              <Button className="w-full rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }}
                onClick={() => { setSelectedSlot(null); setConfirmed(false); setRecurring(false); }}>
                Done
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl p-4 border border-neutral-100 bg-[#f5f5f0] space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="w-4 h-4 text-neutral-400" />
                  <span className="font-semibold text-neutral-900">{selectedSlot?.court}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span>{selectedSlot?.time} – {selectedSlot?.time ? `${parseInt(selectedSlot.time) + 1}:00` : ""}</span>
                </div>
                <div className="text-xs text-neutral-400">{activeSport} · {activeTab === "today" ? "Today" : "Tomorrow"} · 1 hour slot</div>
              </div>

              {/* Recurring toggle */}
              <div className="flex items-center justify-between rounded-xl border border-neutral-100 px-4 py-3 bg-[#f5f5f0]">
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <RotateCcw className="w-4 h-4 text-neutral-400" />
                  Repeat weekly
                </div>
                <button
                  onClick={() => setRecurring((r) => !r)}
                  className="relative w-10 h-5 rounded-full transition-colors"
                  style={{ background: recurring ? "#c8e64c" : "#d1d5db" }}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${recurring ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setSelectedSlot(null)}>Cancel</Button>
                <Button className="flex-1 rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={() => setConfirmed(true)}>
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Waitlist toast */}
      <Dialog open={!!waitlistCourt} onOpenChange={(o) => !o && setWaitlistCourt(null)}>
        <DialogContent className="rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle>Join Waitlist?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-neutral-600">
              <strong>{waitlistCourt}</strong> is currently booked. Join the waitlist and we'll notify you if it becomes available.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setWaitlistCourt(null)}>Cancel</Button>
              <Button className="flex-1 rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }}
                onClick={() => {
                  setWaitlistCourt(null);
                  alert("Added to waitlist! You'll be notified by WhatsApp if the slot opens up.");
                }}>
                <BellPlus className="w-4 h-4 mr-1.5" /> Join Waitlist
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
