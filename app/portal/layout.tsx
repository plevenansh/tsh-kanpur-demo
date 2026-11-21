"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  CreditCard,
  BarChart2,
  BookOpen,
  LogOut,
  Zap,
  ChevronRight,
  Trophy,
  LineChart,
  Receipt,
  User,
  Activity,
  GraduationCap,
  Map,
  Menu,
  X,
} from "lucide-react";
import { currentMember } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

const navGroups = [
  {
    label: "Dashboard",
    items: [
      { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Training",
    items: [
      { href: "/portal/booking", label: "Book a Court", icon: CalendarCheck },
      { href: "/portal/occupancy", label: "Live Occupancy", icon: Activity },
      { href: "/portal/programs", label: "Training Programs", icon: GraduationCap },
      { href: "/portal/learning", label: "Learning Hub", icon: BookOpen },
      { href: "/portal/performance", label: "Performance", icon: BarChart2 },
    ],
  },
  {
    label: "Compete",
    items: [
      { href: "/portal/competitions", label: "Competitions", icon: Trophy },
      { href: "/portal/analytics", label: "Analytics", icon: LineChart },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/portal/billing", label: "Billing", icon: Receipt },
      { href: "/portal/account", label: "My Account", icon: User },
      { href: "/portal/card", label: "My Card", icon: CreditCard },
    ],
  },
];

function SidebarContent({ onNav }: { onNav?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const displayName = user?.name ?? currentMember.name;
  const displayPlan = user?.plan ?? currentMember.plan;
  const displayInitials = user?.initials ?? displayName.slice(0, 2).toUpperCase();
  const daysLeft = currentMember.daysLeft;

  const handleLogout = () => {
    logout();
    router.push("/");
    onNav?.();
  };

  return (
    <>
      {/* Logo */}
      <div className="p-5 border-b border-neutral-100 shrink-0">
        <Link href="/" className="flex items-center gap-2.5" onClick={onNav}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#c8e64c" }}>
            <Zap className="w-4 h-4 text-black" fill="currentColor" />
          </div>
          <div>
            <p className="text-xs font-black leading-tight text-neutral-900">The Sportz Hub</p>
            <p className="text-[10px] text-neutral-400">Member Portal</p>
          </div>
        </Link>
      </div>

      {/* Member mini profile */}
      <div className="p-4 border-b border-neutral-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-black shrink-0" style={{ background: "#c8e64c" }}>
            {displayInitials}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-neutral-900 truncate">{displayName}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Badge className="text-[10px] px-1.5 py-0" style={{ background: "#c8e64c30", color: "#3a6a00", border: "none" }}>
                {displayPlan}
              </Badge>
              <span className="text-[10px] text-neutral-400">{daysLeft}d left</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-3 mb-1.5">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNav}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "text-black"
                        : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                    }`}
                    style={active ? { background: "#c8e64c" } : {}}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                    {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-neutral-100 shrink-0">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  );
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, role } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Small delay to allow auth to hydrate from localStorage
    const t = setTimeout(() => {
      setChecking(false);
    }, 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!checking && (!isLoggedIn || role === "admin")) {
      router.replace("/login");
    }
  }, [checking, isLoggedIn, role, router]);

  if (checking || !isLoggedIn || role === "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f0]">
        <span className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white border-r border-neutral-100 h-screen sticky top-0 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-neutral-100 flex items-center justify-between px-4 h-14">
        <Link href="/portal" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#c8e64c" }}>
            <Zap className="w-4 h-4 text-black" fill="currentColor" />
          </div>
          <span className="font-bold text-sm" style={{ fontFamily: "var(--font-heading)" }}>Sportz Hub</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 bg-white h-full flex flex-col shadow-2xl overflow-hidden">
            <div className="absolute top-3 right-3">
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <SidebarContent onNav={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto pt-14 md:pt-0">
        {children}
      </main>
    </div>
  );
}
