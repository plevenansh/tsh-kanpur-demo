"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sports } from "@/lib/mock-data";
import { CheckCircle2, Clock, Users, MonitorPlay } from "lucide-react";

export default function SportsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        <Badge className="mb-4 text-xs font-semibold px-3 py-1.5" style={{ background: "#c8e64c20", color: "#3a6a00", border: "1px solid #c8e64c60" }}>
          12 Disciplines
        </Badge>
        <h1 className="text-5xl sm:text-6xl font-black text-neutral-950 mb-4 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
          Sports &<br />Facilities
        </h1>
        <p className="text-neutral-500 text-lg max-w-xl">
          Every sport in our complex is supported by world-class infrastructure, trained coaches, and smart booking — so you can focus on training.
        </p>
      </section>

      {/* Sports Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-6">
        {sports.map((sport, idx) => (
          <div key={sport.id} className={`bg-white rounded-3xl border border-neutral-100 overflow-hidden hover:shadow-lg transition-all duration-300 ${idx % 2 === 0 ? "" : ""}`}>
            <div className="grid md:grid-cols-5 gap-0">
              {/* Color accent sidebar */}
              <div className="md:col-span-2 relative min-h-[180px] flex flex-col justify-between p-8"
                style={{ background: `linear-gradient(135deg, ${sport.color}30, ${sport.color}10)` }}>
                <div className="absolute top-6 right-6 text-6xl opacity-20">{sport.emoji}</div>
                <div>
                  <div className="text-5xl mb-4">{sport.emoji}</div>
                  <h2 className="text-2xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{sport.name}</h2>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className="text-xs" style={{ background: sport.color + "40", color: "#1a1a1a", border: "none" }}>
                      {sport.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-neutral-300">
                      {sport.indoor ? "Indoor" : "Outdoor"}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4">
                  <Button size="sm" asChild className="rounded-xl font-semibold text-xs" style={{ background: "#1a1a1a", color: "white" }}>
                    <Link href="/portal/booking">Book a Slot</Link>
                  </Button>
                </div>
              </div>

              {/* Details */}
              <div className="md:col-span-3 p-8">
                <p className="text-neutral-500 text-sm leading-relaxed mb-6">{sport.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {[
                    { icon: MonitorPlay, label: "Courts", value: sport.courts },
                    { icon: Users, label: "Capacity", value: sport.capacity },
                    { icon: Users, label: "Members", value: sport.members },
                    { icon: Clock, label: "Peak Hours", value: sport.peakHours, small: true },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl p-3 text-center" style={{ background: "#f5f5f0" }}>
                      <stat.icon className="w-4 h-4 mx-auto mb-1 text-neutral-400" />
                      <p className={`font-bold text-neutral-950 ${stat.small ? "text-xs" : "text-lg"}`}>{stat.value}</p>
                      <p className="text-xs text-neutral-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Coaching Available</p>
                  <div className="flex flex-wrap gap-2">
                    {sport.coaching.map((c) => (
                      <div key={c} className="flex items-center gap-1.5 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-lime-500" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
