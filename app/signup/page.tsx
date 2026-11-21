"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Zap, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { sports, plans } from "@/lib/mock-data";

// Each step
const STEPS = ["Personal Info", "Choose Your Sport", "Select Plan"];

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  const canNext = () => {
    if (step === 0) return name.trim() && email.trim() && phone.trim() && password.length >= 6;
    if (step === 1) return !!selectedSport;
    return true;
  };

  const handleNext = async () => {
    if (step < 2) {
      setStep((s) => s + 1);
      return;
    }
    // Final step — submit
    setLoading(true);
    await signup({ name, email, phone, sport: selectedSport, plan: selectedPlan });
    setLoading(false);
    setDone(true);
    setTimeout(() => router.push("/portal"), 2500);
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f0] px-4">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#c8e64c" }}>
            <CheckCircle2 className="w-12 h-12 text-black" />
          </div>
          <h2 className="text-3xl font-black text-neutral-950 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            You're in! 🎉
          </h2>
          <p className="text-neutral-500 mb-2">Welcome to The Sportz Hub, {name.split(" ")[0]}!</p>
          <p className="text-sm text-neutral-400">Redirecting to your portal…</p>
          <div className="mt-6 flex justify-center">
            <span className="w-6 h-6 border-2 border-neutral-800/20 border-t-neutral-800 rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f5f5f0]">
      {/* Left decorative */}
      <div className="hidden lg:flex flex-col justify-center px-16 w-96 shrink-0 relative overflow-hidden" style={{ background: "#1a1a1a" }}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(200,230,76,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(200,230,76,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative">
          <Link href="/" className="flex items-center gap-2.5 mb-16">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#c8e64c" }}>
              <Zap className="w-5 h-5 text-black" fill="currentColor" />
            </div>
            <span className="font-bold text-white text-lg" style={{ fontFamily: "var(--font-heading)" }}>
              The Sportz Hub
            </span>
          </Link>

          <h2 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Start your<br />
            <span style={{ color: "#c8e64c" }}>journey today</span>
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed mb-10">
            Join 5,240+ athletes training at Kanpur's premier multi-sport complex.
          </p>

          {/* Step indicators */}
          <div className="space-y-4">
            {STEPS.map((label, i) => (
              <div key={i} className={`flex items-center gap-3 transition-all duration-300 ${i === step ? "opacity-100" : "opacity-40"}`}>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={i <= step ? { background: "#c8e64c", color: "#1a1a1a" } : { background: "rgba(255,255,255,0.1)", color: "#888" }}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-sm font-medium ${i === step ? "text-white" : "text-neutral-500"}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="max-w-lg w-full mx-auto">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#c8e64c" }}>
              <Zap className="w-4 h-4 text-black" fill="currentColor" />
            </div>
            <span className="font-bold" style={{ fontFamily: "var(--font-heading)" }}>The Sportz Hub</span>
          </Link>

          {/* Mobile step bar */}
          <div className="flex gap-2 mb-8 lg:hidden">
            {STEPS.map((_, i) => (
              <div key={i} className="h-1.5 flex-1 rounded-full transition-all" style={{ background: i <= step ? "#c8e64c" : "#e5e5e5" }} />
            ))}
          </div>

          <h1 className="text-3xl font-black text-neutral-950 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            {STEPS[step]}
          </h1>
          <p className="text-neutral-500 mb-8">Step {step + 1} of {STEPS.length}</p>

          {/* ── Step 0: Personal Info ── */}
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Name</label>
                <input id="signup-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-400 transition-all"
                  placeholder="Ravi Patel" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email address</label>
                <input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-400 transition-all"
                  placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone Number</label>
                <input id="signup-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-400 transition-all"
                  placeholder="+91 98001 23456" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Password</label>
                <input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-400 transition-all"
                  placeholder="Min. 6 characters" />
              </div>
            </div>
          )}

          {/* ── Step 1: Sport Selection ── */}
          {step === 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sports.map((sport) => (
                <button
                  key={sport.id}
                  type="button"
                  onClick={() => setSelectedSport(sport.name)}
                  className={`flex flex-col items-center gap-2 rounded-2xl p-4 border-2 transition-all duration-200 text-center hover:-translate-y-0.5 hover:shadow-md`}
                  style={{
                    borderColor: selectedSport === sport.name ? sport.color : "#e5e7eb",
                    background: selectedSport === sport.name ? sport.color + "20" : "white",
                  }}
                >
                  <span className="text-3xl">{sport.emoji}</span>
                  <span className="text-sm font-semibold text-neutral-900">{sport.name}</span>
                  <span className="text-[10px] text-neutral-400">{sport.category}</span>
                </button>
              ))}
            </div>
          )}

          {/* ── Step 2: Plan Selection ── */}
          {step === 2 && (
            <div className="space-y-3">
              {plans.slice(0, 5).map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className="w-full flex items-center gap-4 rounded-2xl p-4 border-2 transition-all duration-200 text-left hover:shadow-md"
                  style={{
                    borderColor: selectedPlan === plan.id ? "#c8e64c" : "#e5e7eb",
                    background: selectedPlan === plan.id ? "#c8e64c15" : "white",
                  }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-neutral-900">{plan.name}</p>
                      {plan.popular && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-900 text-white">Popular</span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">{plan.duration} · {plan.features[0]}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-neutral-900" style={{ fontFamily: "var(--font-heading)" }}>₹{plan.price.toLocaleString()}</p>
                    {selectedPlan === plan.id && (
                      <CheckCircle2 className="w-4 h-4 ml-auto mt-1" style={{ color: "#3a6a00" }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-10">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep((s) => s - 1)} className="flex-1 rounded-xl h-12">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            )}
            <Button
              id="signup-next"
              onClick={handleNext}
              disabled={!canNext() || loading}
              className="flex-1 rounded-xl font-bold h-12"
              style={{ background: "#c8e64c", color: "#1a1a1a" }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-neutral-800/20 border-t-neutral-800 rounded-full animate-spin" />
              ) : step === 2 ? (
                <span className="flex items-center gap-2">Create Account <Zap className="w-4 h-4" /></span>
              ) : (
                <span className="flex items-center gap-2">Continue <ArrowRight className="w-4 h-4" /></span>
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-neutral-500 mt-6">
            Already a member?{" "}
            <Link href="/login" className="font-semibold text-neutral-900 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
