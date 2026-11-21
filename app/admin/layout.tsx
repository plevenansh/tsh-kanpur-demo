"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, Users, IndianRupee, BarChart3, CalendarCheck,
  Trophy, Megaphone, Tag, Package, UserCog,
  Zap, ChevronRight, LogOut, Shield, Menu, X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Members & Revenue",
    items: [
      { href: "/admin/members", label: "Member Management", icon: Users },
      { href: "/admin/billing", label: "Billing & Finance", icon: IndianRupee },
    ],
  },
  {
    label: "Sports Operations",
    items: [
      { href: "/admin/sports", label: "Sport-Wise Stats", icon: BarChart3 },
      { href: "/admin/courts", label: "Courts & Scheduling", icon: CalendarCheck },
    ],
  },
  {
    label: "Programs & Events",
    items: [
      { href: "/admin/events", label: "Competitions & Events", icon: Trophy },
    ],
  },
  {
    label: "Growth",
    items: [
      { href: "/admin/marketing", label: "Marketing & CRM", icon: Megaphone },
      { href: "/admin/pricing", label: "Pricing Engine", icon: Tag },
    ],
  },
  {
    label: "Academy Ops",
    items: [
      { href: "/admin/inventory", label: "Procurement & Inventory", icon: Package },
      { href: "/admin/staff", label: "Staff Management", icon: UserCog },
    ],
  },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950">
      {/* Logo */}
      <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#c8e64c" }}>
            <Zap className="w-4 h-4 text-black" fill="currentColor" />
          </div>
          <div>
            <p className="text-xs font-black leading-tight text-white">The Sportz Hub</p>
            <p className="text-[10px] text-neutral-500">Admin Dashboard</p>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-neutral-400 hover:text-white md:hidden">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Admin badge */}
      <div className="px-4 py-3 border-b border-neutral-800">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(200,230,76,0.1)" }}>
          <Shield className="w-4 h-4" style={{ color: "#c8e64c" }} />
          <span className="text-xs font-semibold text-neutral-300">Owner Access</span>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 p-3 space-y-5 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 px-3 mb-1.5">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active ? "text-black" : "text-neutral-400 hover:text-white hover:bg-neutral-800"
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
      <div className="p-3 border-t border-neutral-800">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors mb-1">
          <Zap className="w-4 h-4" />
          View Public Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, role } = useAuth();
  const [checking, setChecking] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setChecking(false), 100);
    return () => clearTimeout(t);
  }, []);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && !checking && (!isLoggedIn || role !== "admin")) {
      router.replace("/admin/login");
    }
  }, [checking, isLoggedIn, role, router, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking || !isLoggedIn || role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#111111" }}>
        <span className="w-8 h-8 border-2 border-neutral-700 border-t-neutral-300 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 overflow-hidden">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-72 h-full overflow-y-auto">
            <Sidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Mobile top bar */}
        <div className="md:hidden sticky top-0 z-30 bg-white border-b border-neutral-100 flex items-center gap-3 px-4 py-3">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg hover:bg-neutral-100">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "#c8e64c" }}>
              <Zap className="w-3.5 h-3.5 text-black" fill="currentColor" />
            </div>
            <span className="font-bold text-sm">Admin</span>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
