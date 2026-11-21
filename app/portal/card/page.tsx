"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { currentMember } from "@/lib/mock-data";
import { Download, Share2, Shield, Check } from "lucide-react";

function QRPattern() {
  // Deterministic QR-like pattern for demo
  const cells: boolean[] = [];
  for (let i = 0; i < 625; i++) {
    const row = Math.floor(i / 25);
    const col = i % 25;
    const inFinder = (row < 7 && col < 7) || (row < 7 && col > 17) || (row > 17 && col < 7);
    const seed = (row * 31 + col * 17 + row ^ col) % 3;
    cells.push(inFinder || seed === 0);
  }
  return (
    <div className="grid gap-0.5" style={{ gridTemplateColumns: "repeat(25, 1fr)", width: 180, height: 180 }}>
      {cells.map((filled, i) => (
        <div key={i} className={`rounded-[1px] ${filled ? "bg-neutral-950" : "bg-white"}`} />
      ))}
    </div>
  );
}

export default function MemberCardPage() {
  const m = currentMember;
  const [tapped, setTapped] = useState(false);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
        My Membership Card
      </h1>
      <p className="text-neutral-500 text-sm mb-8">Scan this QR at the academy entry for instant check-in.</p>

      {/* Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-6"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)" }}>
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl" style={{ background: "#c8e64c" }} />

        {/* Decorative patterns */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-5" style={{ background: "#c8e64c", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-5" style={{ background: "#c8e64c", transform: "translate(-30%, 30%)" }} />

        <div className="relative p-7">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest">The Sportz Hub</p>
              <p className="text-[10px] text-neutral-500">Kanpur · Est. 2010</p>
            </div>
            <Badge className="text-[10px] px-2 py-1 font-bold" style={{ background: "#c8e64c", color: "#1a1a1a", border: "none" }}>
              {m.plan.toUpperCase()}
            </Badge>
          </div>

          {/* Member info + QR */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-black mb-4" style={{ background: "#c8e64c" }}>
                {m.name.slice(0, 2).toUpperCase()}
              </div>
              <p className="text-white font-black text-xl leading-tight" style={{ fontFamily: "var(--font-heading)" }}>{m.name}</p>
              <p className="text-neutral-400 text-xs mt-1">{m.membershipId}</p>
              <p className="text-neutral-400 text-xs mt-0.5">Sport: {m.sport}</p>

              <div className="mt-4 p-2.5 rounded-xl bg-neutral-800/60">
                <p className="text-[10px] text-neutral-500 uppercase tracking-wide">Valid Until</p>
                <p className="text-white font-semibold text-sm">{m.validUntil}</p>
                <p className="text-lime-400 text-xs">{m.daysLeft} days remaining</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white rounded-2xl p-3 shrink-0 shadow-lg">
              <QRPattern />
            </div>
          </div>

          {/* Status bar */}
          <div className="mt-6 flex items-center gap-2 px-3 py-2 rounded-xl bg-green-900/40">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 text-xs font-medium">Active · Valid for entry</span>
            <Shield className="w-3.5 h-3.5 text-green-400 ml-auto" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 rounded-xl gap-2 font-semibold">
          <Download className="w-4 h-4" />
          Save PDF
        </Button>
        <Button variant="outline" className="flex-1 rounded-xl gap-2 font-semibold">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>

      {/* Scan sim */}
      <div className="mt-6 bg-white rounded-2xl p-5 border border-neutral-100">
        <p className="font-bold text-neutral-900 mb-3 text-sm">Simulate Entry Scan</p>
        <Button className="w-full rounded-xl font-bold" style={{ background: tapped ? "#16a34a" : "#c8e64c", color: tapped ? "white" : "#1a1a1a" }}
          onClick={() => { setTapped(true); setTimeout(() => setTapped(false), 3000); }}>
          {tapped ? <><Check className="w-4 h-4 mr-2" /> Entry Approved — Welcome, {m.name.split(" ")[0]}!</> : "Tap to Simulate QR Scan"}
        </Button>
        {tapped && (
          <div className="mt-3 text-xs text-neutral-500 text-center animate-in fade-in">
            ✅ Check-in logged · 10:24 AM · Today
          </div>
        )}
      </div>

      {/* Referral */}
      <div className="mt-4 rounded-2xl p-5 border border-neutral-100" style={{ background: "#c8e64c10" }}>
        <p className="font-bold text-neutral-900 text-sm mb-1">🎁 Your Referral Code</p>
        <div className="flex items-center gap-3">
          <code className="text-lg font-black tracking-widest text-neutral-950 bg-white px-4 py-2 rounded-xl border border-neutral-100">
            {m.referralCode}
          </code>
          <div>
            <p className="text-xs text-neutral-600">{m.referrals} referrals made</p>
            <p className="text-xs text-neutral-500">= 3 free sessions earned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
