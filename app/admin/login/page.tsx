"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, Zap, ArrowRight, AlertCircle, Shield } from "lucide-react";

const ADMIN_EMAIL = "admin@tsh.com";
const ADMIN_PASSWORD = "admin123";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [role, setRole] = useState<"owner" | "manager">("owner");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password, true);
    setLoading(false);
    if (ok) {
      router.push("/admin");
    } else {
      setError("Invalid admin credentials. Use the pre-filled demo credentials.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "#111111" }}>
      {/* Pattern overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(200,230,76,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(200,230,76,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#c8e64c" }}>
            <Zap className="w-6 h-6 text-black" fill="currentColor" />
          </div>
          <span className="font-bold text-xl text-white" style={{ fontFamily: "var(--font-heading)" }}>
            The Sportz Hub
          </span>
        </Link>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 p-8" style={{ background: "#1a1a1a" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(200,230,76,0.15)" }}>
              <Shield className="w-5 h-5" style={{ color: "#c8e64c" }} />
            </div>
            <div>
              <h1 className="text-xl font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>Admin Dashboard</h1>
              <p className="text-xs text-neutral-500">Restricted access</p>
            </div>
          </div>

          {/* Demo hint */}
          <div className="rounded-xl p-3.5 mb-6 border flex items-start gap-3" style={{ background: "rgba(200,230,76,0.08)", borderColor: "rgba(200,230,76,0.2)" }}>
            <Zap className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#c8e64c" }} />
            <div>
              <p className="text-sm font-semibold text-neutral-300">Demo credentials pre-filled</p>
              <p className="text-xs text-neutral-500 mt-0.5">
                <code className="text-neutral-400">{ADMIN_EMAIL}</code> / <code className="text-neutral-400">{ADMIN_PASSWORD}</code>
              </p>
            </div>
          </div>

          {/* Role selector */}
          <div className="flex gap-2 mb-5">
            {(["owner", "manager"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className="flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all"
                style={
                  role === r
                    ? { background: "#c8e64c", color: "#1a1a1a" }
                    : { background: "rgba(255,255,255,0.06)", color: "#888", border: "1px solid rgba(255,255,255,0.1)" }
                }
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1.5">Email</label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-neutral-600 outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <Button
              id="admin-login-submit"
              type="submit"
              disabled={loading}
              className="w-full rounded-xl font-bold text-base h-12 mt-2"
              style={{ background: "#c8e64c", color: "#1a1a1a" }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-neutral-800/30 border-t-neutral-800 rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Access Dashboard <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-neutral-600 mt-6">
          Not an admin?{" "}
          <Link href="/login" className="text-neutral-400 hover:text-white transition-colors">
            Member login →
          </Link>
        </p>
      </div>
    </div>
  );
}
