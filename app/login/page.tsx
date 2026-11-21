"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, Zap, ArrowRight, AlertCircle } from "lucide-react";

const DEMO_EMAIL = "ravi@tsh.com";
const DEMO_PASSWORD = "demo123";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password, false);
    setLoading(false);
    if (ok) {
      router.push("/portal");
    } else {
      setError("Invalid credentials. Use the demo credentials shown above.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 bg-[#f5f5f0]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-12">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#c8e64c" }}>
            <Zap className="w-5 h-5 text-black" fill="currentColor" />
          </div>
          <span className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
            The Sportz Hub
          </span>
        </Link>

        <div className="max-w-sm w-full mx-auto lg:mx-0">
          <h1 className="text-4xl font-black text-neutral-950 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            Welcome back
          </h1>
          <p className="text-neutral-500 mb-8">Sign in to your member portal</p>

          {/* Demo hint */}
          <div className="rounded-xl p-4 mb-6 border flex items-start gap-3" style={{ background: "#c8e64c20", borderColor: "#c8e64c60" }}>
            <Zap className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#3a6a00" }} />
            <div className="text-sm">
              <p className="font-semibold text-neutral-800">Demo credentials pre-filled</p>
              <p className="text-neutral-600 text-xs mt-0.5">
                Email: <code className="bg-white/70 px-1 rounded">{DEMO_EMAIL}</code> &nbsp; Password: <code className="bg-white/70 px-1 rounded">{DEMO_PASSWORD}</code>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email address</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-neutral-400 focus:ring-2 transition-all"
                style={{ focusBorderColor: "#c8e64c" } as React.CSSProperties}
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-neutral-700">Password</label>
                <button
                  type="button"
                  className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
                  onClick={() => alert("In a real app, you'd receive a reset email. For the demo, use: demo123")}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 pr-11 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-neutral-400 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-neutral-300 accent-lime-400"
              />
              <label htmlFor="remember" className="text-sm text-neutral-600 select-none">
                Keep me signed in
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              id="login-submit"
              disabled={loading}
              className="w-full rounded-xl font-bold text-base h-12 mt-2"
              style={{ background: "#c8e64c", color: "#1a1a1a" }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-neutral-800/30 border-t-neutral-800 rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <hr className="flex-1 border-neutral-200" />
            <span className="text-xs text-neutral-400">or continue with</span>
            <hr className="flex-1 border-neutral-200" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Google", icon: "G" },
              { label: "Apple", icon: "🍎" },
            ].map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => alert("Social login coming soon — use the demo credentials above!")}
                className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all"
              >
                <span className="font-bold text-base">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-neutral-500 mt-8">
            New member?{" "}
            <Link href="/signup" className="font-semibold text-neutral-900 hover:underline">
              Create an account
            </Link>
          </p>

          <p className="text-center text-xs text-neutral-400 mt-4">
            Admin?{" "}
            <Link href="/admin/login" className="text-neutral-600 hover:underline">
              Sign in as admin →
            </Link>
          </p>
        </div>
      </div>

      {/* Right — decorative */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center relative overflow-hidden" style={{ background: "#1a1a1a" }}>
        {/* Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(200,230,76,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(200,230,76,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,230,76,0.18) 0%, transparent 70%)" }} />

        <div className="relative text-center px-12 max-w-md">
          {/* Floating sport emojis */}
          {[
            { emoji: "🏸", top: "12%", left: "15%" },
            { emoji: "🏓", top: "20%", right: "12%" },
            { emoji: "🥊", top: "45%", left: "8%" },
            { emoji: "🤸", bottom: "25%", right: "10%" },
            { emoji: "🏊", bottom: "15%", left: "20%" },
            { emoji: "🏃", top: "65%", right: "18%" },
          ].map((item, i) => (
            <div
              key={i}
              className="absolute text-4xl opacity-20 select-none"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
                animation: `float ${3 + i * 0.4}s ease-in-out infinite alternate`,
              }}
            >
              {item.emoji}
            </div>
          ))}

          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8" style={{ background: "#c8e64c" }}>
            <Zap className="w-8 h-8 text-black" fill="currentColor" />
          </div>

          <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Train Smarter.<br />
            <span style={{ color: "#c8e64c" }}>Compete Better.</span>
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            Access 12 world-class sports, track your performance, book courts instantly, and climb the leaderboard.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            {[
              { value: "5,240+", label: "Members" },
              { value: "22", label: "Courts" },
              { value: "97%", label: "Satisfaction" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-3" style={{ background: "rgba(200,230,76,0.08)", border: "1px solid rgba(200,230,76,0.15)" }}>
                <p className="text-xl font-black" style={{ color: "#c8e64c", fontFamily: "var(--font-heading)" }}>{s.value}</p>
                <p className="text-xs text-neutral-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes float {
            from { transform: translateY(0px) rotate(-5deg); }
            to { transform: translateY(-16px) rotate(5deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
