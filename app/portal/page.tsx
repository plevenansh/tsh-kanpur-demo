"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { currentMember, events } from "@/lib/mock-data";
import {
  CalendarCheck,
  CreditCard,
  BookOpen,
  TrendingUp,
  Bell,
  Calendar,
  Flame,
  Star,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const notifIcon = { info: "ℹ️", event: "🏆", coach: "👨‍🏫", renewal: "🔄" } as Record<string, string>;

export default function PortalDashboard() {
  const m = currentMember;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pt-2">
        <div>
          <p className="text-neutral-500 text-sm mb-1">Good morning 👋</p>
          <h1 className="text-3xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>
            {m.name}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">Member since {m.memberSince} · {m.membershipId}</p>
        </div>
        <div className="rounded-2xl px-5 py-3 text-right hidden sm:block" style={{ background: "#c8e64c" }}>
          <p className="text-xs font-semibold text-neutral-700">{m.plan} Plan</p>
          <p className="text-2xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{m.daysLeft} days</p>
          <p className="text-xs text-neutral-700">until {m.validUntil}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Book a Court", href: "/portal/booking", icon: CalendarCheck, color: "#c8e64c" },
          { label: "My QR Card", href: "/portal/card", icon: CreditCard, color: "#e8f0dc" },
          { label: "Learning Hub", href: "/portal/learning", icon: BookOpen, color: "#e8f0dc" },
          { label: "Performance", href: "/portal/performance", icon: TrendingUp, color: "#e8f0dc" },
        ].map((a) => (
          <Link key={a.href} href={a.href}
            className="flex flex-col items-center gap-2 rounded-2xl p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5 border border-neutral-100"
            style={{ background: a.color }}>
            <a.icon className="w-5 h-5 text-neutral-800" />
            <span className="text-xs font-semibold text-neutral-800">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Sessions This Week", value: m.sessionsThisWeek, icon: Calendar, suffix: "" },
          { label: "Sessions This Month", value: m.sessionsThisMonth, icon: CheckCircle2, suffix: "" },
          { label: "Attendance Streak", value: m.streak, icon: Flame, suffix: " days 🔥" },
        ].map((s) => (
          <Card key={s.label} className="border-neutral-100">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#c8e64c25" }}>
                <s.icon className="w-5 h-5" style={{ color: "#3a6a00" }} />
              </div>
              <div>
                <p className="text-2xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>
                  {s.value}{s.suffix}
                </p>
                <p className="text-xs text-neutral-500">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2">
          <Card className="border-neutral-100 h-full">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-neutral-900">Upcoming Bookings</h2>
                <Link href="/portal/booking" className="text-xs font-semibold text-neutral-500 flex items-center gap-1 hover:text-neutral-900">
                  Book more <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="space-y-3">
                {m.upcomingBookings.map((b) => (
                  <div key={b.id} className="flex items-center gap-4 rounded-xl p-3.5 border border-neutral-100 bg-[#f5f5f0]">
                    <div className="w-2 h-10 rounded-full shrink-0" style={{ background: "#c8e64c" }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-neutral-900">{b.court}</p>
                      <p className="text-xs text-neutral-500 truncate">{b.sport}{b.coach ? ` · Coach: ${b.coach}` : ""}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold text-neutral-700">{b.date}</p>
                      <p className="text-xs text-neutral-400">{b.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card className="border-neutral-100">
          <CardContent className="p-5">
            <h2 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </h2>
            <div className="space-y-3">
              {m.notifications.map((n) => (
                <div key={n.id} className="text-sm">
                  <p className="text-neutral-700 leading-snug">
                    {notifIcon[n.type]} {n.message}
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">{n.time}</p>
                  {n !== m.notifications[m.notifications.length - 1] && <hr className="border-neutral-100 mt-3" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <Card className="border-neutral-100">
        <CardContent className="p-5">
          <h2 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            Achievement Badges
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {m.badges.map((b) => (
              <div key={b.name} className="rounded-xl p-4 text-center border border-neutral-100 bg-[#f5f5f0] hover:shadow-sm transition-all">
                <div className="text-3xl mb-2">{b.icon}</div>
                <p className="font-bold text-xs text-neutral-800">{b.name}</p>
                <p className="text-[10px] text-neutral-500 mt-0.5 leading-tight">{b.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Open Events */}
      <Card className="border-neutral-100">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-neutral-900">Events You Can Register For</h2>
          </div>
          <div className="space-y-3">
            {events.filter((e) => e.status === "open").map((event) => (
              <div key={event.id} className="flex items-center gap-4 rounded-xl p-3.5 border border-neutral-100">
                <div className="w-2 h-10 rounded-full shrink-0" style={{ background: event.poster }} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-neutral-900">{event.name}</p>
                  <p className="text-xs text-neutral-500">{event.sport} · {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-neutral-900">{event.entryFee === 0 ? "Free" : `₹${event.entryFee}`}</p>
                  <Badge className="text-[10px] px-2" style={{ background: "#c8e64c30", color: "#3a6a00", border: "none" }}>Open</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
