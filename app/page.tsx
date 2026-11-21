"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LiveTicker } from "@/components/live-ticker";
import {
  sports,
  plans,
  coaches,
  testimonials,
  events,
  achievements,
} from "@/lib/mock-data";
import {
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Users,
  Trophy,
  Zap,
  CheckCircle2,
  TrendingUp,
  Activity,
  MapPin,
  Play,
  ArrowUpRight,
} from "lucide-react";

/* ─── Animated counter ──────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const step = target / 60;
    const timer = setInterval(() => {
      setCount((c) => {
        if (c + step >= target) { clearInterval(timer); return target; }
        return c + step;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [target]);
  return <>{Math.floor(count).toLocaleString()}{suffix}</>;
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function HomePage() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % testimonials.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#f0f5e8" }}>
      <Navbar />

      {/* ═══════════════════════════════════════════ HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#f0f5e8", minHeight: "100vh" }}
      >
        <Image
          src="/landing/tsh-hero-courts.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(240,245,232,0.96) 0%, rgba(240,245,232,0.88) 34%, rgba(240,245,232,0.54) 62%, rgba(240,245,232,0.2) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(0deg, #f0f5e8 0%, rgba(240,245,232,0) 100%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
          <div className="grid lg:grid-cols-2 gap-8 items-start">

            {/* ── Left — headline + CTA ─────────────────── */}
            <div className="pt-8">
              {/* Small pill label — GolfGrid "Swing with Purpose" style */}
              <div className="flex items-center gap-2 mb-8">
                <div
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-[#2a440a] shadow-sm"
                  style={{ background: "white", borderColor: "#d4e8c0" }}
                >
                  <span style={{ color: "#c8e64c" }}>⚡</span>
                  Train with Purpose
                </div>
              </div>

              {/* Giant CAPS hero heading — GolfGrid style */}
              <h1
                className="text-[clamp(3rem,6vw,6.5rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-[#0a1a05] mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Precision
                <br />
                <span style={{ color: "#2a6415" }}>in every</span>
                <br />
                Court.
              </h1>

              {/* Subtitle */}
              <p className="text-[#4a6a2a] text-base leading-relaxed mb-8 max-w-sm">
                Experience sports like never before — crafted for champions, refined by national-level coaching insight.
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3 mb-12">
                <Link
                  href="/portal/booking"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-7 text-sm font-bold text-[#0a1a05] hover:opacity-90 transition-opacity"
                  style={{ background: "#c8e64c", border: "2px solid #a8cf2a" }}
                >
                  <CalendarDays className="w-4 h-4" />
                  Book a Court
                </Link>
                <Link
                  href="/sports"
                  className="inline-flex h-11 items-center justify-center rounded-full border px-7 text-sm font-medium hover:opacity-90 transition-opacity"
                  style={{ borderColor: "#b8d898", color: "#2a440a", background: "white" }}
                >
                  View Sports
                </Link>
              </div>

              {/* Avatar + coaching unlock row */}
              <div className="flex items-center gap-3">
                {/* Avatar cluster */}
                <div className="flex -space-x-2">
                  {["AM", "PS", "RK", "SV"].map((ini, i) => (
                    <div
                      key={ini}
                      className="w-8 h-8 rounded-full border-2 border-[#f0f5e8] flex items-center justify-center text-xs font-bold text-[#0a1a05]"
                      style={{
                        background: ["#c8e64c", "#a8d54a", "#e8c84c", "#c84ca8"][i],
                        zIndex: 4 - i,
                      }}
                    >
                      {ini}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "#c8e64c" }}
                  >
                    <Play className="w-3 h-3 fill-[#0a1a05] text-[#0a1a05] ml-0.5" />
                  </div>
                  <p className="text-xs text-[#4a6a2a] font-medium leading-tight max-w-[160px]">
                    Unlock national-level precision coaching by our experts
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right — composed booking dashboard ───── */}
            <div className="relative hidden lg:block pt-4">
              <div
                className="ml-auto w-[470px] overflow-hidden rounded-[2rem] shadow-2xl"
                style={{ background: "#0a1a05", border: "1px solid rgba(200,230,76,0.22)" }}
              >
                <div className="relative h-60">
                  <Image
                    src="/landing/tsh-community.png"
                    alt=""
                    fill
                    loading="eager"
                    sizes="470px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a05] via-[#0a1a05]/40 to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6">
                    <p className="text-[#c8e64c] text-[10px] font-semibold uppercase tracking-widest mb-2">Live Availability</p>
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-white font-black text-2xl uppercase leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                          Court B2
                        </p>
                        <p className="text-[#d4e8c0] text-sm mt-1">Badminton · Indoor wooden court</p>
                      </div>
                      <div className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                        4 open slots
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {["06:00", "07:00", "08:00", "09:00", "10:00", "11:00"].map((slot, i) => (
                      <button
                        key={slot}
                        className="h-11 rounded-xl text-xs font-bold transition-transform hover:-translate-y-0.5"
                        style={
                          i === 1
                            ? { background: "#c8e64c", color: "#0a1a05" }
                            : i === 3
                            ? { background: "#162b0c", color: "#466a2f" }
                            : { background: "#18370b", color: "#a8c98b" }
                        }
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl p-4" style={{ background: "#132a09" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4" style={{ color: "#c8e64c" }} />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7fa560]">Momentum</span>
                      </div>
                      <p className="font-black text-4xl text-white leading-none" style={{ fontFamily: "var(--font-heading)" }}>96%</p>
                      <p className="text-xs text-[#8aaa6a] mt-2">Skill progress tracked</p>
                    </div>
                    <div className="rounded-2xl p-4" style={{ background: "#c8e64c" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="w-4 h-4 text-[#0a1a05]" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2a440a]">Hosted</span>
                      </div>
                      <p className="font-black text-4xl text-[#0a1a05] leading-none" style={{ fontFamily: "var(--font-heading)" }}>150+</p>
                      <p className="text-xs text-[#2a440a] mt-2">Tournaments & leagues</p>
                    </div>
                  </div>

                  <div className="mt-3 rounded-2xl bg-white p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6a8a4a]">Member Kit</p>
                      <p className="font-black text-[#0a1a05] uppercase" style={{ fontFamily: "var(--font-heading)" }}>Pro Sport Kit</p>
                      <p className="text-xs text-[#6a8a4a]">₹2,499 · members save 20%</p>
                    </div>
                    <Link
                      href="/membership"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#0a1a05]"
                      style={{ background: "#eaf2df" }}
                      aria-label="Explore membership"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8aaa6a]">
          <div className="w-5 h-8 border-2 border-[#b8d898] rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: "#c8e64c" }} />
          </div>
        </div>
      </section>

      {/* ═══════════════════ LIVE TICKER */}
      <LiveTicker />

      {/* ═══════════════════ COACHING SECTION — GolfGrid "Tailored Coaching" */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left — big heading */}
          <div>
            <h2
              className="text-[clamp(2rem,4.5vw,4.5rem)] font-black uppercase leading-[0.9] text-[#0a1a05] mb-6"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.015em" }}
            >
              Tailored Coaching For
              <br />
              <span style={{ color: "#2a6415" }}>Every Athlete</span>
            </h2>
            <p className="text-[#4a6a2a] text-sm leading-relaxed mb-8 max-w-sm">
              From beginners to pros — personal coaching sessions designed to sharpen your skills and unlock your full potential.
            </p>
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[#0a1a05] hover:opacity-90 transition-opacity"
              style={{ background: "#c8e64c" }}
            >
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — coach card + event card */}
          <div className="flex flex-col gap-4">
            {/* Coach profile — GolfGrid Cameron Williamson style */}
            <div
              className="rounded-3xl overflow-hidden shadow-lg"
              style={{ background: "#1a3a08" }}
            >
              <div
                className="h-[360px] relative flex items-end p-6"
              >
                <Image
                  src="/landing/tsh-coaching.png"
                  alt="Coach guiding a young athlete through badminton technique"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[65%_45%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a05] via-[#0a1a05]/35 to-transparent" />
                <div className="relative">
                  <p className="text-[10px] text-[#8aaa6a] font-semibold uppercase tracking-widest mb-1">Head Coach</p>
                  <p className="text-white font-black text-xl uppercase" style={{ fontFamily: "var(--font-heading)" }}>
                    Arjun Mehta
                  </p>
                  <p className="text-[#c8e64c] text-xs font-medium">National Badminton Champion</p>
                </div>
              </div>
              {/* Stats row */}
              <div className="p-6 grid grid-cols-3 gap-3">
                {[
                  { label: "Experience", value: "14 yrs" },
                  { label: "Rating", value: "4.9 ⭐" },
                  { label: "Sessions", value: "1,240+" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-white font-bold text-base">{s.value}</p>
                    <p className="text-[#5a7a3a] text-[10px]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming event card — GolfGrid "Senior 37 City Match" style */}
            <div
              className="rounded-2xl p-4 flex items-center gap-4"
              style={{ background: "#eaf2df", border: "1px solid #d4e8c0" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[#0a1a05] shrink-0"
                style={{ background: "#c8e64c" }}
              >
                <Trophy className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6a8a4a] mb-0.5">Upcoming</p>
                <p className="font-black text-sm text-[#0a1a05] uppercase truncate" style={{ fontFamily: "var(--font-heading)" }}>
                  Spring Badminton Open
                </p>
                <p className="text-xs text-[#6a8a4a]">₹10,000 + Trophy · 32 slots</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "#0a1a05" }}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#c8e64c]" />
                </div>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "white" }}
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0a1a05]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ELEVATE GAME — Editorial mosaic */}
      <section
        className="py-20 px-4 sm:px-6 mx-4 sm:mx-6 rounded-3xl mb-4 overflow-hidden"
        style={{ background: "white", border: "1px solid #e4eedd" }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-center">
          <div>
            <h2
              className="text-[clamp(2.4rem,5vw,5.25rem)] font-black uppercase leading-[0.88] text-[#0a1a05] mb-6"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.015em" }}
            >
              Elevate Your Game,<br />
              One Court at a Time
            </h2>
            <p className="text-[#4a6a2a] text-sm leading-relaxed max-w-md mb-8">
              Train, recover, compete, and connect in a campus built around the rhythm of athletes.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                { label: "ESTB. ×", value: "2015" },
                { label: "Members ·", value: "5,000+" },
                { label: "Champions Produced", value: "150+" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border"
                  style={{ background: "#f0f5e8", borderColor: "#d4e8c0", color: "#2a440a" }}
                >
                  <span className="text-[#6a8a4a]">{s.label}</span>
                  <span className="font-black text-[#0a1a05]">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 grid-rows-[160px_120px_150px] gap-3">
            <div className="relative col-span-7 row-span-2 overflow-hidden rounded-3xl">
              <Image
                src="/landing/tsh-coaching.png"
                alt="Badminton coaching session"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-[64%_62%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a05]/55 to-transparent" />
              <p className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-white">Technique Lab</p>
            </div>
            <div className="relative col-span-5 overflow-hidden rounded-3xl">
              <Image
                src="/landing/tsh-community.png"
                alt="Club members at the courts"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover object-[48%_70%]"
              />
            </div>
            <div className="col-span-5 rounded-3xl p-5 flex flex-col justify-between" style={{ background: "#0a1a05" }}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "#c8e64c" }}>
                <Trophy className="w-5 h-5 text-[#0a1a05]" />
              </div>
              <div>
                <p className="text-[#c8e64c] font-black text-3xl leading-none" style={{ fontFamily: "var(--font-heading)" }}>12</p>
                <p className="text-[#d4e8c0] text-xs">disciplines under one membership</p>
              </div>
            </div>
            <div className="col-span-4 rounded-3xl p-5" style={{ background: "#c8e64c" }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#2a440a] mb-3">Daily Energy</p>
              <p className="font-black text-4xl text-[#0a1a05] leading-none" style={{ fontFamily: "var(--font-heading)" }}>2.4k+</p>
              <p className="text-xs text-[#2a440a] mt-2">coaching hours each month</p>
            </div>
            <div className="relative col-span-4 overflow-hidden rounded-3xl">
              <Image
                src="/landing/tsh-campus-wide.png"
                alt="The Sportz Hub campus courts"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="col-span-4 rounded-3xl p-5 border flex flex-col justify-between" style={{ background: "#f0f5e8", borderColor: "#d4e8c0" }}>
              <Activity className="w-7 h-7 text-[#2a6415]" />
              <div>
                <p className="font-black text-[#0a1a05] uppercase leading-tight" style={{ fontFamily: "var(--font-heading)" }}>Recovery + Matchplay</p>
                <p className="text-xs text-[#6a8a4a] mt-2">Built into every athlete journey.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SPORTS GRID — "Play Better, Achieve More" */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-6 items-start">

          {/* Left — big bento card with sports grid */}
          <div className="lg:col-span-2">
            {/* Top heading */}
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold text-[#6a8a4a] uppercase tracking-widest mb-2">12 Disciplines</p>
                <h2
                  className="text-[clamp(1.8rem,3.5vw,3rem)] font-black uppercase leading-[0.92] text-[#0a1a05]"
                  style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.015em" }}
                >
                  Play Smarter,<br />Achieve More
                </h2>
              </div>
              <Link
                href="/sports"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#2a6415] hover:text-[#0a1a05] transition-colors shrink-0"
              >
                All sports <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Sport tiles grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sports.map((sport) => (
                <Link key={sport.id} href="/sports" className="group">
                  <div
                    className="rounded-2xl p-4 border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    style={{ background: "white", borderColor: "#e4eedd" }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110"
                        style={{ background: sport.color + "22" }}
                      >
                        {sport.emoji}
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#b8d898] group-hover:text-[#2a6415] transition-colors" />
                    </div>
                    <h3 className="font-bold text-sm text-[#0a1a05] mb-0.5">{sport.name}</h3>
                    <p className="text-[10px] text-[#8aaa6a]">{sport.courts} {sport.courts === 1 ? "court" : "courts"} · {sport.members} members</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right — "Beyond the Sport" lifestyle card */}
          <div className="flex flex-col gap-4">
            <div
              className="rounded-3xl p-6 relative overflow-hidden min-h-[320px] flex flex-col justify-end"
              style={{ background: "#0a1a05" }}
            >
              <Image
                src="/landing/tsh-community.png"
                alt="The Sportz Hub members gathering after training"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a05] via-[#0a1a05]/45 to-transparent" />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c8e64c] mb-3 relative">Our Vision</p>
              <h3
                className="font-black uppercase text-white text-2xl leading-[0.95] mb-4 relative"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Beyond the Sport,<br />Into Lifestyle
              </h3>
              <p className="text-sm text-[#d4e8c0] leading-relaxed mb-6 relative">
                Discover how sport becomes a way of living — not just a game, but your identity.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#0a1a05] hover:opacity-90 transition-opacity relative w-fit"
                style={{ background: "#c8e64c" }}
              >
                <Activity className="w-3.5 h-3.5" />
                Book a Tour
              </Link>
            </div>

            {/* Subscription discount card */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "#eaf2df", border: "1px solid #d4e8c0" }}
            >
              <p className="text-xs font-semibold text-[#6a8a4a] mb-2">Members Save Up To</p>
              <p
                className="font-black text-3xl text-[#0a1a05] mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                30%
              </p>
              <p className="text-xs text-[#6a8a4a] mb-3">With Quarterly Plan</p>
              <p className="text-sm font-bold text-[#0a1a05] mb-0.5">Starting from</p>
              <p className="text-2xl font-black text-[#2a6415]" style={{ fontFamily: "var(--font-heading)" }}>
                ₹3,999
              </p>
            </div>

            {/* Precision training stat */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "white", border: "1px solid #e4eedd" }}
            >
              <p className="text-xs font-semibold text-[#6a8a4a] mb-2">Solid Contact</p>
              <p className="text-sm text-[#4a6a2a] leading-snug mb-3">
                With dialled accuracy in just a few swings — our coaches deliver results.
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg shrink-0"
                  style={{ background: "#eaf2df" }}
                >
                  🎯
                </div>
                <div className="h-1.5 flex-1 rounded-full overflow-hidden" style={{ background: "#e4eedd" }}>
                  <div className="h-full rounded-full" style={{ width: "86%", background: "#c8e64c" }} />
                </div>
                <span className="text-sm font-bold text-[#0a1a05]">86%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRAIN + TEAM CTA */}
      <section className="pb-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Train with purpose dark card */}
          <div
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{ background: "#0a1a05" }}
          >
            <Image
              src="/landing/tsh-coaching.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[65%_45%]"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(10,26,5,0.95) 0%, rgba(10,26,5,0.78) 45%, rgba(10,26,5,0.22) 100%)",
              }}
            />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8aaa6a] mb-4 relative">Driven by Excellence</p>
            <h3
              className="font-black uppercase text-white text-3xl leading-[0.92] mb-6 relative"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Train with Purpose<br />
              <span style={{ color: "#c8e64c" }}>Play with</span><br />
              Confidence
            </h3>
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-[#0a1a05] hover:opacity-90 relative"
              style={{ background: "#c8e64c" }}
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Bring your circle card */}
          <div
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{ background: "#c8e64c" }}
          >
            <Image
              src="/landing/tsh-community.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#c8e64c]/95 via-[#c8e64c]/78 to-[#c8e64c]/20" />
            {/* Avatar row */}
            <div className="flex items-center gap-2 mb-6 relative">
              {["RP", "AS", "SY", "MT"].map((ini, i) => (
                <div
                  key={ini}
                  className="w-10 h-10 rounded-full border-2 border-[#c8e64c] flex items-center justify-center text-xs font-bold text-[#0a1a05]"
                  style={{
                    background: ["white", "#a8d54a", "#e8c84c", "#1a3a08"][i],
                    color: i === 3 ? "#c8e64c" : "#0a1a05",
                  }}
                >
                  {ini}
                </div>
              ))}
              <div
                className="w-10 h-10 rounded-full border-2 border-[#c8e64c] flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "#1a3a08" }}
              >
                +
              </div>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#2a440a] mb-3 relative">Community</p>
            <h3
              className="font-black uppercase text-[#0a1a05] text-2xl leading-[0.92] mb-6 relative"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Bring Your Circle<br />to the Court
            </h3>
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-[#c8e64c] hover:opacity-90 relative"
              style={{ background: "#0a1a05" }}
            >
              Family Plans <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ STATS DARK BANNER */}
      <section style={{ background: "#0a1a05" }} className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, label: "Athletes Trained", value: 10000, suffix: "+", sub: "Since 2015" },
              { icon: Trophy, label: "Tournaments Hosted", value: 150, suffix: "+", sub: "State & National" },
              { icon: Star, label: "Satisfaction Rate", value: 97, suffix: "%", sub: "Member survey" },
              { icon: Zap, label: "Coaching Hours / Mo", value: 2400, suffix: "+", sub: "All sports" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
                  style={{ background: "#c8e64c18" }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: "#c8e64c" }} />
                </div>
                <div
                  className="text-4xl font-black text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-semibold text-sm text-[#d4e8c0]">{stat.label}</div>
                <div className="text-xs text-[#5a7a3a]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRUSTED SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-10">
          <div>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-[0.9] text-[#0a1a05]"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.015em" }}
            >
              Trusted by Athletes<br />
              <span style={{ color: "#2a6415" }}>Across Kanpur</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-[#4a6a2a] leading-relaxed max-w-sm">
              Proven results, built court by court from local greens where your journey begins.
            </p>
            <Link
              href="/sports"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-[#0a1a05] shrink-0 hover:opacity-90 transition-opacity"
              style={{ background: "#c8e64c" }}
            >
              Explore Sports <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Photo-style testimony cards */}
          {[
            { image: "/landing/tsh-coaching.png", stat: "98%", statLabel: "Skill improvement rate", name: "Badminton", position: "65% 55%" },
            { image: "/landing/tsh-community.png", stat: "4.9★", statLabel: "Average coach rating", name: "Table Tennis", position: "72% 58%" },
            { image: "/landing/tsh-hero-courts.png", stat: "320+", statLabel: "Active members this month", name: "Club Training", position: "50% 60%" },
          ].map((c) => (
            <div
              key={c.name}
              className="rounded-3xl overflow-hidden relative"
              style={{ background: "#0a1a05", minHeight: "220px" }}
            >
              <Image
                src={c.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
                style={{ objectPosition: c.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a05]/95 via-[#0a1a05]/45 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-white font-black text-4xl" style={{ fontFamily: "var(--font-heading)" }}>{c.stat}</p>
                <p className="text-[#d4e8c0] text-xs text-center px-4 mt-1">{c.statLabel}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c8e64c]">{c.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* New member badge + text */}
        <div className="mt-8 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          <div
            className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-center shrink-0 shadow-lg"
            style={{ background: "#c8e64c" }}
          >
            <p className="font-black text-2xl text-[#0a1a05]" style={{ fontFamily: "var(--font-heading)" }}>50+</p>
            <p className="text-[8px] font-bold uppercase text-[#2a440a] leading-tight">New Coaches<br />This Year</p>
          </div>
          <div>
            <p className="font-black text-xl text-[#0a1a05] uppercase mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Confidence backed by players across Kanpur
            </p>
            <p className="text-sm text-[#4a6a2a]">
              Join a community that trains hard, competes fair, and celebrates every win together.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ COACHES */}
      <section
        className="py-20 mx-4 sm:mx-6 rounded-3xl mb-8"
        style={{ background: "white", border: "1px solid #e4eedd" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold text-[#6a8a4a] uppercase tracking-widest mb-2">Expert Guidance</p>
              <h2
                className="text-[clamp(1.8rem,3vw,2.8rem)] font-black uppercase leading-[0.92] text-[#0a1a05]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Learn from<br />Champions
              </h2>
            </div>
            <Link href="/contact" className="text-xs font-semibold text-[#2a6415] hover:text-[#0a1a05] flex items-center gap-1 transition-colors">
              All coaches <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coaches.map((coach) => (
              <div
                key={coach.id}
                className="rounded-2xl p-5 border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: "#f5faf0", borderColor: "#e4eedd" }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black text-[#0a1a05] shrink-0"
                    style={{ background: coach.color }}
                  >
                    {coach.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-[#0a1a05]">{coach.name}</h3>
                    <p className="text-xs text-[#6a8a4a]">{coach.sport}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold text-[#0a1a05]">{coach.rating}</span>
                      <span className="text-xs text-[#8aaa6a]">· {coach.sessions} sessions</span>
                    </div>
                  </div>
                  <span
                    className="text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0"
                    style={{ background: coach.color + "30", color: "#1a3a08" }}
                  >
                    {coach.level}
                  </span>
                </div>
                <p className="text-xs text-[#4a6a2a] leading-relaxed">{coach.bio}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-xs text-[#6a8a4a]">{coach.experience} years experience</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS */}
      <section style={{ background: "#0a1a05" }} className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#c8e64c" }}>Member Stories</p>
              <h2
                className="text-[clamp(2rem,4vw,4rem)] font-black uppercase mb-5 text-white leading-[0.9]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Real Progress,<br />Shared Weekly
              </h2>
              <p className="text-sm text-[#8aaa6a] leading-relaxed max-w-sm">
                A moving wall of players who found coaching, courts, and community in one place.
              </p>
            </div>

            <div className="relative">
              <div className="grid md:grid-cols-3 gap-4">
                {testimonials.map((story, i) => {
                  const active = i === testimonialIdx;
                  return (
                    <button
                      key={story.id}
                      onClick={() => setTestimonialIdx(i)}
                      className="text-left rounded-3xl p-5 transition-all duration-300 border min-h-[270px]"
                      style={
                        active
                          ? { background: "#c8e64c", borderColor: "#c8e64c", transform: "translateY(-8px)" }
                          : { background: "#132a09", borderColor: "#244615" }
                      }
                    >
                      <div className="flex items-center justify-between mb-7">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm"
                          style={{ background: active ? "#0a1a05" : story.color, color: active ? "#c8e64c" : "#0a1a05" }}
                        >
                          {story.initials}
                        </div>
                        <div className="flex">
                          {Array.from({ length: story.rating }).map((_, star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${active ? "fill-[#0a1a05] text-[#0a1a05]" : "fill-amber-400 text-amber-400"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className={`text-base leading-relaxed mb-7 ${active ? "text-[#0a1a05]" : "text-[#d4e8c0]"}`}>
                        “{story.quote}”
                      </p>
                      <div>
                        <p className={`font-bold text-sm ${active ? "text-[#0a1a05]" : "text-white"}`}>{story.name}</p>
                        <p className={`text-xs ${active ? "text-[#2a440a]" : "text-[#8aaa6a]"}`}>{story.sport} · {story.plan} member</p>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="absolute -bottom-5 left-8 right-8 h-10 rounded-full blur-2xl opacity-40" style={{ background: "#c8e64c" }} />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-[#1a3a08] transition-colors"
              style={{ borderColor: "#2a4a12", color: "#8aaa6a" }}
              aria-label="Previous story"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i === testimonialIdx ? "#c8e64c" : "#2a4a12" }}
                  aria-label={`Show story ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setTestimonialIdx((i) => (i + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-[#1a3a08] transition-colors"
              style={{ borderColor: "#2a4a12", color: "#8aaa6a" }}
              aria-label="Next story"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════ EVENTS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold text-[#6a8a4a] uppercase tracking-widest mb-2">Don&apos;t Miss Out</p>
            <h2
              className="text-[clamp(1.8rem,3.5vw,3rem)] font-black uppercase leading-[0.92] text-[#0a1a05]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Upcoming Events
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.filter((e) => e.status !== "completed").map((event, index) => {
            const eventImage = ["/landing/tsh-community.png", "/landing/tsh-coaching.png", "/landing/tsh-campus-wide.png"][index % 3];
            return (
            <div
              key={event.id}
              className="group rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border"
              style={{ background: "white", borderColor: "#e4eedd" }}
            >
              <div className="relative h-44">
                <Image
                  src={eventImage}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a05]/85 via-[#0a1a05]/22 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c8e64c] mb-1">{event.sport}</p>
                    <h3 className="font-black text-xl text-white uppercase leading-[0.94]" style={{ fontFamily: "var(--font-heading)" }}>
                      {event.name}
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-white px-3 py-2 text-center shrink-0">
                    <p className="text-[10px] uppercase text-[#6a8a4a]">
                      {new Date(event.date).toLocaleDateString("en-IN", { month: "short" })}
                    </p>
                    <p className="text-lg font-black text-[#0a1a05] leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                      {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric" })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <span
                    className="text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: "#eaf2df", color: "#2a6415" }}
                  >
                    {event.type}
                  </span>
                  <span
                    className={`text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full`}
                    style={
                      event.status === "open"
                        ? { background: "#dcfce7", color: "#166534" }
                        : { background: "#fef9c3", color: "#854d0e" }
                    }
                  >
                    {event.status === "open" ? "Registration Open" : "Coming Soon"}
                  </span>
                </div>
                <p className="text-xs text-[#6a8a4a] mb-4">{event.format} · {event.prize}</p>
                <div className="space-y-3 text-xs text-[#6a8a4a] mb-5">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" />
                    <span>{event.participants}/{event.maxParticipants} registered</span>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#e4eedd" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(event.participants / event.maxParticipants) * 100}%`, background: "#c8e64c" }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>Deadline {new Date(event.registrationDeadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#0a1a05]">
                    {event.entryFee === 0 ? "Free Entry" : `₹${event.entryFee}`}
                  </span>
                  <Link
                    href="/portal"
                    className="px-4 py-1.5 rounded-full text-xs font-bold text-[#0a1a05] hover:opacity-90 transition-opacity"
                    style={{ background: "#c8e64c" }}
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          );})}
        </div>
      </section>

      {/* ═══════════════════ MEMBERSHIP */}
      <section
        className="py-20 mx-4 sm:mx-6 rounded-3xl mb-8"
        style={{ background: "#eaf2df", border: "1px solid #d4e8c0" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-[#6a8a4a] uppercase tracking-widest mb-2">Simple Pricing</p>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-[0.92] text-[#0a1a05] mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Find Your Plan
            </h2>
            <p className="text-sm text-[#4a6a2a]">No hidden fees. No lock-ins. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {plans.slice(0, 4).map((plan) => (
              <div
                key={plan.id}
                className="relative rounded-3xl p-6 min-h-[390px] border transition-all duration-200 hover:shadow-xl hover:-translate-y-1 flex flex-col"
                style={
                  plan.highlight
                    ? { background: "#0a1a05", borderColor: "#0a1a05" }
                    : { background: "white", borderColor: "#d4e8c0" }
                }
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold"
                    style={{ background: "#c8e64c", color: "#0a1a05" }}
                  >
                    Most Popular
                  </div>
                )}
                <p className={`font-bold text-sm mb-0.5 ${plan.highlight ? "text-white" : "text-[#0a1a05]"}`}>
                  {plan.name}
                </p>
                <p className={`text-xs mb-3 ${plan.highlight ? "text-[#5a7a3a]" : "text-[#6a8a4a]"}`}>
                  {plan.duration}
                </p>
                <p
                  className={`font-black text-4xl mb-1 ${plan.highlight ? "text-white" : "text-[#0a1a05]"}`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  ₹{plan.price.toLocaleString()}
                </p>
                <p className={`text-xs mb-6 ${plan.highlight ? "text-[#8aaa6a]" : "text-[#6a8a4a]"}`}>Best for consistent court time</p>
                <ul className="space-y-3 mb-7">
                  {plan.features.slice(0, 5).map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-xs leading-relaxed ${plan.highlight ? "text-[#d4e8c0]" : "text-[#4a6a2a]"}`}>
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: plan.highlight ? "#c8e64c" : "#2a6415" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/membership"
                  className="mt-auto block text-center py-3 rounded-2xl text-sm font-bold transition-all hover:opacity-90"
                  style={
                    plan.highlight
                      ? { background: "#c8e64c", color: "#0a1a05" }
                      : { background: "#eaf2df", color: "#0a1a05" }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/membership"
              className="text-sm font-medium text-[#2a6415] hover:text-[#0a1a05] inline-flex items-center gap-1 transition-colors"
            >
              View all plans including Student & Family options <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ACHIEVEMENTS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#6a8a4a] uppercase tracking-widest mb-2">Latest from the Academy</p>
          <h2
            className="text-[clamp(1.8rem,3.5vw,3rem)] font-black uppercase leading-[0.92] text-[#0a1a05]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            News & Achievements
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl p-5 border hover:shadow-md transition-all group"
              style={{ background: "white", borderColor: "#e4eedd" }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 mt-0.5"
                  style={{ background: "#eaf2df", color: "#2a6415" }}
                >
                  {a.category}
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#0a1a05] mb-1 group-hover:text-[#2a6415] transition-colors">{a.title}</h3>
                  <p className="text-xs text-[#4a6a2a] leading-relaxed">{a.description}</p>
                  <p className="text-[10px] text-[#8aaa6a] mt-2">
                    {new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ BOTTOM CTA — GolfGrid style large dark banner */}
      <section
        className="mx-4 sm:mx-6 mb-16 rounded-3xl overflow-hidden relative min-h-[360px]"
        style={{ background: "#0a1a05" }}
      >
        <Image
          src="/landing/tsh-campus-wide.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,26,5,0.95) 0%, rgba(10,26,5,0.78) 45%, rgba(10,26,5,0.38) 100%)",
          }}
        />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-16">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5a7a3a] mb-4">Play Beyond Limits</p>
            <h2
              className="text-3xl sm:text-5xl font-black uppercase text-white mb-3 leading-[0.92]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to Start<br />
              <span style={{ color: "#c8e64c" }}>Your Journey?</span>
            </h2>
            <p className="text-sm text-[#5a7a3a]">
              Join 5,000+ athletes training at The Sportz Hub today.
            </p>
          </div>
          <div className="flex gap-3 shrink-0 flex-wrap">
            <Link
              href="/membership"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-[#0a1a05] hover:opacity-90 transition-opacity"
              style={{ background: "#c8e64c" }}
            >
              Join Now <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-white border hover:bg-[#1a3a08] transition-colors"
              style={{ borderColor: "#2a4a12" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
