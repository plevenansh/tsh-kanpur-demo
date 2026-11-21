"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { currentMember, paymentHistory } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { User, Mail, Phone, Trophy, Calendar, Edit3, Copy, CheckCircle2, Star, CreditCard } from "lucide-react";

export default function AccountPage() {
  const { user } = useAuth();
  const m = currentMember;
  const displayName = user?.name ?? m.name;
  const displayPlan = user?.plan ?? m.plan;
  const displaySport = user?.sport ?? m.sport;
  const initials = user?.initials ?? displayName.slice(0, 2).toUpperCase();
  const memberId = user?.memberId ?? m.membershipId;

  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editName, setEditName] = useState(displayName);
  const [editPhone, setEditPhone] = useState("+91 98001 23456");
  const [editEmail, setEditEmail] = useState(user?.email ?? "ravi@tsh.com");
  const [saved, setSaved] = useState(false);

  const totalPaid = paymentHistory.filter((p) => p.status === "paid").reduce((a, p) => a + p.total, 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(m.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
          My Account
        </h1>
        <p className="text-neutral-500 text-sm">Manage your profile, membership, and referrals.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
          <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <Card className="border-neutral-100">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-black shrink-0"
                    style={{ background: "#c8e64c" }}>
                    {initials}
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>
                      {editName}
                    </h2>
                    <p className="text-sm text-neutral-500">{memberId}</p>
                    <Badge className="mt-1 text-[10px]" style={{ background: "#c8e64c30", color: "#3a6a00", border: "none" }}>
                      {displayPlan} Member
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="rounded-xl shrink-0" onClick={() => setEditing(!editing)}>
                  <Edit3 className="w-3.5 h-3.5 mr-1.5" /> {editing ? "Cancel" : "Edit"}
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  { icon: User, label: "Full Name", value: editName, field: "name" as const },
                  { icon: Mail, label: "Email", value: editEmail, field: "email" as const },
                  { icon: Phone, label: "Phone", value: editPhone, field: "phone" as const },
                  { icon: Trophy, label: "Primary Sport", value: displaySport ?? "Badminton", field: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#f5f5f0" }}>
                      <item.icon className="w-4 h-4 text-neutral-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-neutral-400">{item.label}</p>
                      {editing && item.field ? (
                        <input
                          type="text"
                          value={item.field === "name" ? editName : item.field === "email" ? editEmail : editPhone}
                          onChange={(e) => {
                            if (item.field === "name") setEditName(e.target.value);
                            else if (item.field === "email") setEditEmail(e.target.value);
                            else setEditPhone(e.target.value);
                          }}
                          className="w-full text-sm font-medium text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1 outline-none mt-0.5"
                        />
                      ) : (
                        <p className="text-sm font-medium text-neutral-900 truncate">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {editing && (
                <Button className="w-full mt-5 rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={handleSave}>
                  Save Changes
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar cards */}
        <div className="space-y-4">
          {/* Membership Status */}
          <Card className="border-neutral-100">
            <CardContent className="p-5">
              <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Membership
              </h3>
              <div className="rounded-xl p-4 mb-4" style={{ background: "#c8e64c" }}>
                <p className="text-xs font-semibold text-neutral-700">{displayPlan} Plan</p>
                <p className="text-3xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{m.daysLeft}</p>
                <p className="text-xs text-neutral-700">days remaining</p>
              </div>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Member since</span>
                  <span className="font-medium">{m.memberSince}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Expires</span>
                  <span className="font-medium">{m.validUntil}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Total paid</span>
                  <span className="font-bold text-neutral-900">₹{totalPaid.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
              <Button size="sm" className="w-full mt-4 rounded-xl font-semibold" style={{ background: "#c8e64c", color: "#1a1a1a" }}>
                Renew Plan
              </Button>
            </CardContent>
          </Card>

          {/* Referral */}
          <Card className="border-neutral-100">
            <CardContent className="p-5">
              <h3 className="font-bold text-neutral-900 mb-3">Referral Code</h3>
              <p className="text-xs text-neutral-500 mb-3">Share and earn ₹500 per successful referral.</p>
              <div className="flex items-center gap-2 rounded-xl bg-[#f5f5f0] border border-neutral-200 px-4 py-3">
                <span className="flex-1 font-mono font-bold text-neutral-900 text-sm">{m.referralCode}</span>
                <button onClick={handleCopy} className="text-neutral-500 hover:text-neutral-900 transition-colors">
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-neutral-500">
                <span>{m.referrals} referrals made</span>
                <span className="font-semibold text-green-600">₹{m.referrals * 500} earned</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Badges */}
      <Card className="border-neutral-100">
        <CardContent className="p-5">
          <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Achievement Badges
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {m.badges.map((b) => (
              <div key={b.name} className="rounded-xl p-4 text-center border border-neutral-100 bg-[#f5f5f0] hover:shadow-sm transition-all">
                <div className="text-3xl mb-2">{b.icon}</div>
                <p className="font-bold text-xs text-neutral-800">{b.name}</p>
                <p className="text-[10px] text-neutral-500 mt-0.5 leading-tight">{b.description}</p>
              </div>
            ))}
            {/* Locked badge */}
            <div className="rounded-xl p-4 text-center border border-dashed border-neutral-200 opacity-50">
              <div className="text-3xl mb-2">🔒</div>
              <p className="font-bold text-xs text-neutral-400">Legend</p>
              <p className="text-[10px] text-neutral-400 mt-0.5">50 sessions streak</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Sessions", value: m.totalSessions, icon: "🏃" },
          { label: "This Month", value: m.sessionsThisMonth, icon: "📅" },
          { label: "Best Streak", value: `${m.streak} days`, icon: "🔥" },
          { label: "Referrals Made", value: m.referrals, icon: "🤝" },
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
    </div>
  );
}
