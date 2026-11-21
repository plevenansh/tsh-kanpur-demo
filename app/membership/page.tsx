"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { plans, testimonials, sports, academy } from "@/lib/mock-data";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  Shield,
  Smartphone,
  Users,
  Trophy,
  Calendar,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Dumbbell,
  Sparkles,
  Clock,
  CreditCard,
  QrCode,
  BarChart3,
  Gift,
  HeartHandshake,
  Wifi,
  MapPin,
} from "lucide-react";

/* ─── Feature comparison matrix ─────────────────────────────────────────────── */
const allFeatures = [
  "Court access",
  "Digital membership card",
  "Member portal access",
  "Learning Hub",
  "Coach booking",
  "Event registration priority",
  "Performance tracking",
  "Referral rewards",
  "Guest passes (1/session)",
  "Free coaching sessions",
];

const planFeatureMatrix: Record<string, string[]> = {
  "day-pass": ["Court access"],
  monthly: ["Court access", "Digital membership card", "Member portal access"],
  quarterly: [
    "Court access",
    "Digital membership card",
    "Member portal access",
    "Learning Hub",
    "Coach booking",
    "Event registration priority",
  ],
  annual: [
    "Court access",
    "Digital membership card",
    "Member portal access",
    "Learning Hub",
    "Coach booking",
    "Event registration priority",
    "Performance tracking",
    "Referral rewards",
    "Guest passes (1/session)",
    "Free coaching sessions",
  ],
  student: [
    "Court access",
    "Digital membership card",
    "Member portal access",
    "Learning Hub",
    "Event registration priority",
  ],
  family: [
    "Court access",
    "Digital membership card",
    "Member portal access",
    "Learning Hub",
    "Coach booking",
    "Event registration priority",
    "Performance tracking",
    "Referral rewards",
    "Guest passes (1/session)",
  ],
};

/* ─── Benefits data ─────────────────────────────────────────────────────────── */
const benefits = [
  {
    icon: Dumbbell,
    title: "12 World-Class Sports",
    description:
      "From Badminton to Swimming — international-standard courts, equipment, and surfaces for every discipline.",
    color: "#c8e64c",
  },
  {
    icon: Smartphone,
    title: "Fully Digital Experience",
    description:
      "QR check-in, real-time court booking, digital membership card, and instant WhatsApp notifications.",
    color: "#a8d54a",
  },
  {
    icon: BookOpen,
    title: "Learning Hub Access",
    description:
      "Video tutorials, technique breakdowns, drills, and structured learning paths created by our expert coaches.",
    color: "#7dc94a",
  },
  {
    icon: Users,
    title: "Expert Coaching",
    description:
      "National and international-level coaches with personalised session plans, progress notes, and video analysis.",
    color: "#e8c84c",
  },
  {
    icon: Trophy,
    title: "Tournaments & Events",
    description:
      "Priority registration for internal, district, and state-level competitions. Track brackets live.",
    color: "#e87a4c",
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description:
      "Detailed coach notes, session scores, attendance streaks, badges, and skill progression over time.",
    color: "#4cb8e8",
  },
  {
    icon: Gift,
    title: "Referral Rewards",
    description:
      "Earn free sessions and merchandise when friends join using your unique referral code.",
    color: "#c84ca8",
  },
  {
    icon: HeartHandshake,
    title: "Community & Network",
    description:
      "Join 5,240+ athletes. Find practice partners, join group sessions, and stay connected through the portal.",
    color: "#4c8ce8",
  },
];

/* ─── How It Works steps ────────────────────────────────────────────────────── */
const howItWorks = [
  {
    step: 1,
    title: "Choose Your Sport",
    description: "Browse our 12 disciplines and pick the one that excites you — or try them all.",
    icon: MapPin,
  },
  {
    step: 2,
    title: "Pick a Plan",
    description: "Select a membership tier that fits your schedule and budget. No hidden fees.",
    icon: CreditCard,
  },
  {
    step: 3,
    title: "Quick Sign-Up",
    description: "Create your account in under 2 minutes. Pay via UPI, card, or net banking.",
    icon: Zap,
  },
  {
    step: 4,
    title: "Start Playing",
    description: "Get your digital card, book your first court, and begin your journey.",
    icon: QrCode,
  },
];

/* ─── FAQ data ──────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "Can I switch plans mid-cycle?",
    a: "Absolutely! You can upgrade anytime and we'll pro-rate the remaining days. Downgrades take effect at the next billing cycle.",
  },
  {
    q: "Is there a joining fee or hidden charges?",
    a: "No joining fee, no hidden charges. The price you see is what you pay + 18% GST. That's it.",
  },
  {
    q: "How do I book courts once I'm a member?",
    a: "Through the Member Portal — available on both web and mobile. You can book up to 7 days in advance (Annual plans). Real-time court availability is shown on the booking grid.",
  },
  {
    q: "What happens when my membership expires?",
    a: "You'll receive WhatsApp and email reminders 7 days before expiry. If it lapses, you can renew anytime and your history is preserved.",
  },
  {
    q: "Can I try a day pass before committing?",
    a: "Yes! Our ₹199 Day Pass gives you full walk-in access for one day. No commitment, no signup required.",
  },
  {
    q: "What does the Family plan include?",
    a: "Up to 4 members under a single plan with individual digital cards, multi-sport access, 2 family coaching sessions per month, and exclusive lounge access.",
  },
  {
    q: "Is the Student plan available for college students?",
    a: "Yes — the Student plan is available for anyone with a valid student ID (school or college). Valid for 180 days at a discounted rate.",
  },
  {
    q: "Do you offer corporate memberships?",
    a: "Yes! Contact us for custom corporate packages with bulk discounts, dedicated court slots, and team-building event support.",
  },
];

/* ─── Animated counter ──────────────────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const step = target / 50;
          const timer = setInterval(() => {
            setCount((c) => {
              if (c + step >= target) {
                clearInterval(timer);
                return target;
              }
              return c + step;
            });
          }, 25);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testimIdx, setTestimIdx] = useState(0);
  const t = testimonials[testimIdx];

  /* Scroll-to-plans helper */
  const plansRef = useRef<HTMLDivElement>(null);
  const scrollToPlans = () =>
    plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <Navbar />

      {/* ════════════════════════════════════════ HERO ════════════════════════ */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #c8e64c 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #a8d54a 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Badge
            className="mb-6 text-xs font-semibold px-4 py-2 mx-auto"
            style={{
              background: "#c8e64c20",
              color: "#3a6a00",
              border: "1px solid #c8e64c60",
            }}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline-block" />
            Membership at The Sportz Hub
          </Badge>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-neutral-950 mb-6 leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            One Membership.
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">Unlimited Sport.</span>
              <span
                className="absolute bottom-1 left-0 w-full h-4 opacity-50 -z-0 rounded-sm"
                style={{ background: "#c8e64c" }}
              />
            </span>
          </h1>

          <p className="text-neutral-500 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Access 12 sports, 22+ courts, expert coaches, a fully digital
            member portal, and a vibrant community of 5,000+ athletes — all
            starting at just ₹199.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <Button
              size="lg"
              onClick={scrollToPlans}
              className="font-bold px-10 rounded-xl text-base shadow-lg shadow-lime-200/50 hover:shadow-xl hover:shadow-lime-200/60 transition-all"
              style={{ background: "#c8e64c", color: "#1a1a1a" }}
            >
              View Plans & Pricing
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="font-medium px-8 rounded-xl text-base border-neutral-300"
            >
              <Link href="/sports">Explore Sports First</Link>
            </Button>
          </div>

          {/* Micro-stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[
              { label: "Active Members", value: academy.activeMembers, suffix: "+" },
              { label: "Total Sports", value: academy.totalSports },
              { label: "Courts", value: academy.totalCourts, suffix: "+" },
              { label: "Satisfaction", value: academy.satisfactionRate, suffix: "%" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-3xl sm:text-4xl font-black text-neutral-950"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <AnimatedCounter target={s.value} suffix={s.suffix ?? ""} />
                </div>
                <div className="text-xs text-neutral-500 font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ BENEFITS ════════════════════════ */}
      <section className="py-24 bg-white border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              Why Members Love Us
            </p>
            <h2
              className="text-4xl sm:text-5xl font-black text-neutral-950"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Everything You Get
            </h2>
            <p className="text-neutral-500 mt-4 text-base max-w-xl mx-auto">
              More than just courts. A complete ecosystem designed to help you
              train, grow, compete, and connect.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="group bg-[#f5f5f0] rounded-2xl p-6 border border-transparent hover:border-neutral-200 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ background: b.color + "20" }}
                >
                  <b.icon className="w-6 h-6" style={{ color: b.color }} />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2 text-sm">
                  {b.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ HOW IT WORKS ════════════════════════ */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              Simple & Fast
            </p>
            <h2
              className="text-4xl sm:text-5xl font-black text-neutral-950"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              How to Get Started
            </h2>
            <p className="text-neutral-500 mt-4 text-base max-w-lg mx-auto">
              Go from deciding to playing in under 5 minutes. Here's how.
            </p>
          </div>

          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-lime-300 via-lime-400 to-lime-300 opacity-40" />

            {howItWorks.map((s) => (
              <div key={s.step} className="relative text-center group">
                {/* Step circle */}
                <div className="relative mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-lime-100/50 transition-transform group-hover:scale-105"
                  style={{ background: "#c8e64c" }}
                >
                  <s.icon className="w-7 h-7 text-neutral-900" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-neutral-950 text-white text-xs font-bold flex items-center justify-center">
                    {s.step}
                  </div>
                </div>
                <h3
                  className="font-bold text-neutral-900 mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed max-w-[220px] mx-auto">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ PLAN CARDS ══════════════════════════ */}
      <section
        ref={plansRef}
        className="py-24 bg-neutral-950 text-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: "#c8e64c" }}
            >
              Simple, Transparent Pricing
            </p>
            <h2
              className="text-4xl sm:text-5xl font-black"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Choose Your Plan
            </h2>
            <p className="text-neutral-400 mt-4 text-base max-w-lg mx-auto">
              No hidden charges. No lock-ins. Cancel or upgrade anytime. All
              prices are exclusive of 18% GST.
            </p>
          </div>

          {/* Plan grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              const isHighlight = plan.highlight;

              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative rounded-2xl p-6 text-left transition-all duration-300 border-2 cursor-pointer group ${
                    isSelected
                      ? "border-lime-400 shadow-2xl shadow-lime-400/10 scale-[1.02]"
                      : "border-neutral-800 hover:border-neutral-600"
                  }`}
                  style={{
                    background: isSelected
                      ? "linear-gradient(145deg, #1e2a0e, #151515)"
                      : "#1a1a1a",
                  }}
                >
                  {isHighlight && (
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold rounded-full text-black"
                      style={{ background: "#c8e64c" }}
                    >
                      ⭐ Most Popular
                    </div>
                  )}

                  {/* Selected indicator */}
                  {isSelected && (
                    <div
                      className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: "#c8e64c" }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-black" />
                    </div>
                  )}

                  <div className="mb-4">
                    <h3
                      className="text-xl font-black mb-0.5"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-sm text-neutral-500">{plan.duration}</p>
                  </div>

                  <div className="mb-5">
                    <span
                      className="text-4xl font-black"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: isSelected ? "#c8e64c" : "white",
                      }}
                    >
                      ₹{plan.price.toLocaleString()}
                    </span>
                    {plan.id !== "day-pass" && (
                      <span className="text-sm text-neutral-500 ml-1">
                        / plan
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-neutral-300"
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: "#c8e64c" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`w-full py-3 rounded-xl font-bold text-sm text-center transition-all ${
                      isSelected
                        ? "text-black"
                        : "bg-neutral-800 text-neutral-300 group-hover:bg-neutral-700"
                    }`}
                    style={
                      isSelected ? { background: "#c8e64c" } : {}
                    }
                  >
                    {isSelected ? "Selected — Continue ↓" : plan.cta}
                  </div>
                </button>
              );
            })}
          </div>

          {/* CTA under plans */}
          <div className="text-center mt-12 space-y-4">
            <Button
              size="lg"
              asChild
              className="font-bold px-12 py-6 rounded-xl text-base shadow-lg shadow-lime-400/20 hover:shadow-xl hover:shadow-lime-400/30 transition-all"
              style={{ background: "#c8e64c", color: "#1a1a1a" }}
            >
              <Link href="/signup">
                Get {plans.find((p) => p.id === selectedPlan)?.name ?? ""}{" "}
                Membership
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <p className="text-neutral-500 text-sm">
              {selectedPlan === "day-pass"
                ? "No account needed — walk in and play today."
                : "Takes less than 2 minutes. Cancel anytime."}
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════ FEATURE COMPARISON ══════════════════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              Side-by-Side
            </p>
            <h2
              className="text-4xl font-black text-neutral-950"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Compare All Plans
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="text-left p-4 font-semibold text-neutral-600 w-52 sticky left-0 bg-white z-10">
                      Feature
                    </th>
                    {plans.map((p) => (
                      <th
                        key={p.id}
                        className={`p-4 text-center font-semibold min-w-[100px] transition-colors ${
                          selectedPlan === p.id
                            ? "text-black"
                            : "text-neutral-500"
                        }`}
                        style={
                          selectedPlan === p.id
                            ? { background: "#c8e64c20" }
                            : {}
                        }
                      >
                        <div className="font-bold text-sm">{p.name}</div>
                        <div className="text-xs font-normal text-neutral-400 mt-0.5">
                          ₹{p.price.toLocaleString()}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((feat, i) => (
                    <tr
                      key={feat}
                      className={`border-b border-neutral-50 ${
                        i % 2 === 0 ? "bg-[#fafafa]" : ""
                      }`}
                    >
                      <td className="p-4 text-neutral-600 font-medium sticky left-0 bg-inherit z-10">
                        {feat}
                      </td>
                      {plans.map((p) => {
                        const has =
                          planFeatureMatrix[p.id]?.includes(feat);
                        return (
                          <td
                            key={p.id}
                            className="p-4 text-center"
                            style={
                              selectedPlan === p.id
                                ? { background: "#c8e64c10" }
                                : {}
                            }
                          >
                            {has ? (
                              <CheckCircle2 className="w-5 h-5 text-lime-500 mx-auto" />
                            ) : (
                              <XCircle className="w-5 h-5 text-neutral-200 mx-auto" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {/* Price row */}
                  <tr className="bg-neutral-950">
                    <td className="p-4 font-bold text-white sticky left-0 bg-neutral-950 z-10">
                      Price
                    </td>
                    {plans.map((p) => (
                      <td key={p.id} className="p-4 text-center">
                        <span
                          className={`font-black text-lg ${
                            selectedPlan === p.id
                              ? ""
                              : "text-white"
                          }`}
                          style={
                            selectedPlan === p.id
                              ? {
                                  color: "#c8e64c",
                                  fontFamily: "var(--font-heading)",
                                }
                              : { fontFamily: "var(--font-heading)" }
                          }
                        >
                          ₹{p.price.toLocaleString()}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════ WHAT'S INCLUDED (VISUAL STRIP) ══════════ */}
      <section className="py-20 bg-white border-y border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              Every Member Gets
            </p>
            <h2
              className="text-4xl font-black text-neutral-950"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Included With Every Plan
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: QrCode, label: "QR Check-In", sub: "Touchless entry" },
              { icon: Wifi, label: "Free Wi-Fi", sub: "In all areas" },
              { icon: Shield, label: "Insurance Cover", sub: "On-site coverage" },
              { icon: Clock, label: "Extended Hours", sub: "6 AM – 10 PM daily" },
              { icon: Smartphone, label: "Member Portal", sub: "Web & mobile" },
              { icon: Calendar, label: "Court Booking", sub: "Real-time slots" },
              { icon: Star, label: "Loyalty Points", sub: "Earn on every session" },
              { icon: Zap, label: "WhatsApp Alerts", sub: "Instant updates" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#f5f5f0] border border-transparent hover:border-neutral-200 hover:bg-white transition-all group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: "#c8e64c20" }}
                >
                  <item.icon className="w-5 h-5" style={{ color: "#7aaa00" }} />
                </div>
                <div>
                  <p className="font-bold text-sm text-neutral-900">
                    {item.label}
                  </p>
                  <p className="text-xs text-neutral-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════ SPORTS AVAILABLE ════════════════════════ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              All Accessible
            </p>
            <h2
              className="text-4xl font-black text-neutral-950"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              12 Sports, One Card
            </h2>
            <p className="text-neutral-500 mt-3">
              Your membership unlocks every facility. Pick one focus or play them
              all.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {sports.map((sport) => (
              <Link
                key={sport.id}
                href="/sports"
                className="group flex items-center gap-3 bg-white rounded-2xl p-4 border border-neutral-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: sport.color + "20" }}
                >
                  {sport.emoji}
                </div>
                <div>
                  <p className="font-bold text-sm text-neutral-900">
                    {sport.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {sport.courts} {sport.courts === 1 ? "court" : "courts"} ·{" "}
                    {sport.members} members
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════ TESTIMONIALS ════════════════════════════ */}
      <section className="py-20 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{ color: "#c8e64c" }}
          >
            Member Stories
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black mb-12"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Loved by 5,000+ Athletes
          </h2>

          <div className="relative min-h-[200px]">
            <div className="text-6xl opacity-30 mb-6" style={{ color: "#c8e64c" }}>
              "
            </div>
            <p className="text-lg sm:text-xl text-neutral-200 leading-relaxed mb-8 italic">
              {t.quote}
            </p>
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-black"
                style={{ background: t.color }}
              >
                {t.initials}
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-neutral-500">
                  {t.sport} · {t.plan} member
                </p>
              </div>
              <div className="flex ml-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() =>
                setTestimIdx(
                  (i) => (i - 1 + testimonials.length) % testimonials.length
                )
              }
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-neutral-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimIdx(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    background: i === testimIdx ? "#c8e64c" : "#555",
                  }}
                />
              ))}
            </div>
            <button
              onClick={() =>
                setTestimIdx((i) => (i + 1) % testimonials.length)
              }
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-neutral-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════ FAQ ═════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              Got Questions?
            </p>
            <h2
              className="text-4xl font-black text-neutral-950"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Frequently Asked
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-lime-300 shadow-md shadow-lime-100/30"
                      : "border-neutral-100 hover:border-neutral-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-semibold text-neutral-900 text-sm">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-5 pb-5 text-sm text-neutral-500 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════ FINAL CTA ══════════════════════════════ */}
      <section
        className="mx-4 sm:mx-6 mb-16 rounded-3xl overflow-hidden relative"
        style={{ background: "#c8e64c" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-16">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-black text-neutral-950 mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to Begin?
            </h2>
            <p className="text-neutral-700 text-base max-w-md">
              Join 5,000+ athletes already training at The Sportz Hub.
              Create your account in under 2 minutes and book your first
              session today.
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm text-neutral-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-neutral-700" /> No joining fee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-neutral-700" /> Cancel anytime
              </span>
              <span className="flex items-center gap-1.5 hidden sm:flex">
                <CheckCircle2 className="w-4 h-4 text-neutral-700" /> Instant access
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Button
              size="lg"
              asChild
              className="rounded-xl font-bold px-10 bg-neutral-950 text-white hover:bg-neutral-800 shadow-lg"
            >
              <Link href="/signup">
                Sign Up Now <Zap className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-xl font-medium px-8 border-neutral-900/30 bg-white/40 hover:bg-white/60"
            >
              <Link href="/contact">Talk to Us First</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
