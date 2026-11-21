"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, MessageCircle, Clock, CheckCircle2 } from "lucide-react";

const faq = [
  { q: "Do I need to be a member to use the courts?", a: "Members get priority booking and better rates. Walk-ins can book a Day Pass at the front desk, subject to court availability." },
  { q: "Can I bring a guest?", a: "Yes — all members except Day Pass holders can bring 1 guest per session. The guest must register at the front desk." },
  { q: "Is parking available?", a: "Yes, there is free parking for 120 vehicles within the complex. Two-wheelers have a separate parking zone near the main gate." },
  { q: "What sports equipment is provided?", a: "Shuttlecocks, Table Tennis balls, and Boxing gloves are available on loan at the desk. Racquets and personal gear are the member's responsibility." },
  { q: "How do I cancel or reschedule a booking?", a: "Cancel from the member portal up to 2 hours before your slot for no penalty. Late cancellations count against your weekly quota." },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <Navbar />

      <section className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        <Badge className="mb-4 text-xs font-semibold px-3 py-1.5" style={{ background: "#c8e64c20", color: "#3a6a00", border: "1px solid #c8e64c60" }}>
          We're here to help
        </Badge>
        <h1 className="text-5xl sm:text-6xl font-black text-neutral-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Contact Us
        </h1>
        <p className="text-neutral-500 text-lg max-w-xl">
          Reach out via WhatsApp, call, or email — or walk in during open hours. Our front desk team is always available.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 grid lg:grid-cols-3 gap-8">
        {/* Contact Cards */}
        <div className="space-y-4">
          {[
            {
              icon: MapPin,
              label: "Address",
              value: "Civil Lines, Kanpur — 208001\nUttar Pradesh, India",
              action: "Get Directions",
              color: "#c8e64c",
            },
            {
              icon: Phone,
              label: "Phone",
              value: "+91-512-4567890\n(Reception, 5:30 AM – 10 PM)",
              action: "Call Now",
              color: "#a8d54a",
            },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              value: "+91-98001-23456\n(Quick responses 8 AM – 8 PM)",
              action: "Message on WhatsApp",
              color: "#25d366",
            },
            {
              icon: Mail,
              label: "Email",
              value: "info@statesportsacademy.in\nCoaching: coaches@ssa.in",
              action: "Send Email",
              color: "#4cb8e8",
            },
          ].map((c) => (
            <div key={c.label} className="bg-white rounded-2xl p-5 border border-neutral-100 flex items-start gap-4 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: c.color + "25" }}>
                <c.icon className="w-5 h-5" style={{ color: c.color.includes("d366") ? "#128c7e" : c.color }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-0.5">{c.label}</p>
                <p className="text-sm text-neutral-700 whitespace-pre-line mb-2">{c.value}</p>
                <button className="text-xs font-semibold text-neutral-900 hover:underline">{c.action} →</button>
              </div>
            </div>
          ))}

          <div className="bg-neutral-950 rounded-2xl p-5 text-white">
            <Clock className="w-5 h-5 mb-3" style={{ color: "#c8e64c" }} />
            <p className="font-bold mb-3">Open Hours</p>
            <div className="space-y-1.5 text-sm text-neutral-300">
              <div className="flex justify-between"><span>Mon – Sat</span><span className="font-semibold text-white">5:30 AM – 10:00 PM</span></div>
              <div className="flex justify-between"><span>Sunday</span><span className="font-semibold text-white">6:00 AM – 8:00 PM</span></div>
              <div className="flex justify-between"><span>Public Holidays</span><span className="font-semibold text-yellow-400">6:00 AM – 8:00 PM</span></div>
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-100 p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#c8e64c30" }}>
                <CheckCircle2 className="w-8 h-8" style={{ color: "#3a6a00" }} />
              </div>
              <h3 className="text-2xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>Enquiry Sent!</h3>
              <p className="text-neutral-500 max-w-sm">
                Thanks for reaching out. Our team will contact you within 2 business hours. You'll also get a WhatsApp message shortly.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-2 rounded-xl">
                Send another enquiry
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-black text-neutral-950 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Send an Enquiry</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your full name" className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91-XXXXXXXXXX" className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" type="email" placeholder="you@email.com" className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sport">Sport of Interest</Label>
                  <Input id="sport" placeholder="e.g. Badminton, Boxing…" className="rounded-xl" />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="query">Your Message</Label>
                  <textarea id="query" rows={4}
                    className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 resize-none"
                    style={{ fontFamily: "var(--font-sans)" }}
                    placeholder="Tell us how we can help…" />
                </div>
              </div>
              <Button className="mt-6 w-full sm:w-auto rounded-xl font-bold px-8"
                style={{ background: "#c8e64c", color: "#1a1a1a" }}
                onClick={() => setSubmitted(true)}>
                Send Enquiry
              </Button>
            </>
          )}
        </div>
      </section>

      {/* Map placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 h-64 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="text-center z-10">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-neutral-400" />
            <p className="font-semibold text-neutral-600">Civil Lines, Kanpur — 208001</p>
            <p className="text-sm text-neutral-400 mt-1">Embedded Google Map would appear here in production</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white border-t border-neutral-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-neutral-950 mb-10 text-center" style={{ fontFamily: "var(--font-heading)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="rounded-2xl border border-neutral-100 p-6 bg-[#f5f5f0]">
                <h3 className="font-bold text-neutral-900 mb-2">{item.q}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
