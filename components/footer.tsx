import Link from "next/link";
import { Zap, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "#0a1a05", color: "#8aaa6a" }}>
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* Brand col — 2 cols wide */}
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#c8e64c" }}>
              <Zap className="w-5 h-5 text-[#0a1a05]" fill="currentColor" />
            </div>
            <span className="font-black text-white text-base uppercase tracking-tight" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}>
              TSH.
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "#8aaa6a" }}>
            Kanpur&apos;s premier multi-sport complex — where athletes are made and champions are born. Train. Compete. Excel.
          </p>
          {/* Social icons */}
          <div className="flex gap-2.5">
            {/* Instagram */}
            <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:opacity-80" style={{ background: "#1a3a08" }}>
              <svg className="w-4 h-4" fill="#8aaa6a" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            {/* YouTube */}
            <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:opacity-80" style={{ background: "#1a3a08" }}>
              <svg className="w-4 h-4" fill="#8aaa6a" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
            </a>
            {/* X/Twitter */}
            <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:opacity-80" style={{ background: "#1a3a08" }}>
              <svg className="w-4 h-4" fill="#8aaa6a" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 5.971 5.45-5.971Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-bold text-xs mb-5 uppercase tracking-widest">Company</h4>
          <ul className="space-y-3 text-sm">
            {[
              ["About Us", "/about"],
              ["Our Story", "/about"],
              ["Careers", "/contact"],
              ["Press", "/contact"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="transition-colors hover:text-[#c8e64c]">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sports & Services */}
        <div>
          <h4 className="text-white font-bold text-xs mb-5 uppercase tracking-widest">Sports & Services</h4>
          <ul className="space-y-3 text-sm">
            {["Badminton", "Table Tennis", "Boxing", "Gymnastics", "Wrestling", "Yoga & Wellness", "Swimming"].map((s) => (
              <li key={s}>
                <Link href="/sports" className="transition-colors hover:text-[#c8e64c]">{s}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-bold text-xs mb-5 uppercase tracking-widest">Support</h4>
          <ul className="space-y-3 text-sm mb-6">
            {[
              ["Contact Us", "/contact"],
              ["Membership Plans", "/membership"],
              ["Privacy Policy", "/contact"],
              ["Conditions", "/contact"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="transition-colors hover:text-[#c8e64c]">{label}</Link>
              </li>
            ))}
          </ul>
          {/* Hours pill */}
          <div className="p-3 rounded-2xl text-xs" style={{ background: "#1a3a08" }}>
            <p className="text-white font-semibold mb-1">Open Daily</p>
            <p style={{ color: "#8aaa6a" }}>5:30 AM – 10:00 PM</p>
            <p className="mt-1" style={{ color: "#c8e64c" }}>Holidays: 6 AM – 8 PM</p>
          </div>
        </div>
      </div>

      {/* Contact bar */}
      <div style={{ borderTop: "1px solid #1a3a08" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-4 items-center justify-between text-xs" style={{ color: "#5a7a3a" }}>
          <div className="flex flex-wrap gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" style={{ color: "#c8e64c" }} />
              Civil Lines, Kanpur — 208001, UP
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" style={{ color: "#c8e64c" }} />
              +91-512-4567890
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" style={{ color: "#c8e64c" }} />
              info@thesportzhub.in
            </span>
          </div>
          <p>© 2026 The Sportz Hub, Kanpur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
