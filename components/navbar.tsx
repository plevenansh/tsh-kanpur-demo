"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, LogOut, User, ArrowUpRight, Zap } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { href: "/sports", label: "Sports", hasDropdown: true },
  { href: "/about", label: "About us" },
  { href: "/membership", label: "Membership" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, user, role, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isPortal = pathname?.startsWith("/portal") || pathname?.startsWith("/admin");

  const handleLogout = () => {
    logout();
    router.push("/");
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isPortal
          ? "bg-white/95 backdrop-blur-xl border-b border-[#e4eedd] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex h-[68px] items-center justify-between gap-6">

        {/* Logo — TSH style matching GolfGrid logo treatment */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#c8e64c" }}
          >
            <Zap className="w-4 h-4 text-[#0a1a05]" fill="currentColor" />
          </div>
          <span
            className="font-black text-base tracking-tight text-[#0a1a05] uppercase"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            TSH.
          </span>
        </Link>

        {/* Desktop center nav — GolfGrid pill style */}
        <nav className="hidden md:flex items-center gap-0.5 bg-white/70 border border-[#d4e8c0] rounded-full px-2 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                pathname === link.href
                  ? "bg-[#0a1a05] text-white"
                  : "text-[#2a440a] hover:bg-[#eaf2df] hover:text-[#0a1a05]"
              }`}
            >
              {link.label}
              {link.hasDropdown && (
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="opacity-50">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </Link>
          ))}
          <Link
            href="/admin"
            className="px-4 py-1.5 rounded-full text-sm font-medium text-[#2a440a] hover:bg-[#eaf2df] hover:text-[#0a1a05] transition-all"
          >
            Admin
          </Link>
        </nav>

        {/* Desktop right CTA — GolfGrid "Join Club" pill button style */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href={role === "admin" ? "/admin" : "/portal"}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-[#0a1a05] transition-all hover:opacity-90"
                style={{ background: "#c8e64c" }}
              >
                <User className="w-3.5 h-3.5" />
                {user?.name?.split(" ")[0]}
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-[#6a8a4a] hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-[#2a440a] hover:text-[#0a1a05] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold text-[#0a1a05] transition-all hover:opacity-90"
                style={{ background: "#c8e64c" }}
              >
                Join Now
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden p-2 rounded-xl hover:bg-[#eaf2df] transition-colors text-[#0a1a05]">
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-6 bg-[#f0f5e8] border-l border-[#d4e8c0]">
            <div className="flex flex-col gap-4 mt-6">
              <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setOpen(false)}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#c8e64c" }}>
                  <Zap className="w-4 h-4 text-[#0a1a05]" fill="currentColor" />
                </div>
                <span className="font-black text-base text-[#0a1a05] uppercase" style={{ fontFamily: "var(--font-heading)" }}>TSH.</span>
              </Link>

              {isLoggedIn && (
                <div className="flex items-center gap-3 bg-white rounded-2xl p-3 mb-2 border border-[#d4e8c0]">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#0a1a05] shrink-0" style={{ background: "#c8e64c" }}>
                    {user?.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate text-[#0a1a05]">{user?.name}</p>
                    <p className="text-xs text-[#6a8a4a]">{user?.plan ?? "Admin"} member</p>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium py-2.5 px-4 rounded-xl transition-colors block ${
                    pathname === link.href
                      ? "bg-[#0a1a05] text-white"
                      : "text-[#2a440a] hover:bg-white hover:text-[#0a1a05]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-[#d4e8c0]" />
              <Link href="/admin" onClick={() => setOpen(false)}
                className="block text-center py-2.5 px-4 rounded-xl text-sm font-medium border border-[#d4e8c0] bg-white hover:bg-[#eaf2df] transition-colors text-[#2a440a]">
                Admin Dashboard
              </Link>

              {isLoggedIn ? (
                <>
                  <Link href="/portal" onClick={() => setOpen(false)}
                    className="block text-center py-2.5 px-4 rounded-xl text-sm font-bold text-[#0a1a05]"
                    style={{ background: "#c8e64c" }}>
                    My Portal
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 px-3 py-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}
                    className="block text-center py-2.5 px-4 rounded-xl text-sm font-medium border border-[#d4e8c0] bg-white text-[#2a440a]">
                    Login
                  </Link>
                  <Link href="/signup" onClick={() => setOpen(false)}
                    className="block text-center py-2.5 px-4 rounded-xl text-sm font-bold text-[#0a1a05]"
                    style={{ background: "#c8e64c" }}>
                    Join Now
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
