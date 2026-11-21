"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { coaches, achievements, academy } from "@/lib/mock-data";
import { Star, Award, Building2, Users } from "lucide-react";

const leadership = [
  { name: "Board of Directors", role: "Audi Stadia Consultants Pvt Ltd", initials: "AS", color: "#c8e64c", bio: "Founded the hub in 2015 to deliver international standards-compliant sports infrastructure to Kanpur, with thermal/acoustic insulation and para-athlete facilities." },
  { name: "Arjun Mehta", role: "Head Badminton Coach", initials: "AM", color: "#a8d54a", bio: "National doubles champion and 14-year coaching veteran. Arjun has produced 3 state-level champions from the academy's junior programme." },
  { name: "Sunita Verma", role: "Head Gymnastics Coach", initials: "SV", color: "#c84ca8", bio: "International-level gymnast with Level 3 SAI certification. Under her guidance, 5 students have represented UP at the national gymnastics meet." },
];

const infra = [
  { label: "Total Complex Area", value: "2.4 acres" },
  { label: "Indoor Sport Halls", value: "6" },
  { label: "Total Courts", value: "22+" },
  { label: "Changing Rooms", value: "8 suites" },
  { label: "Equipment Rooms", value: "4 stocked rooms" },
  { label: "Medical Room", value: "With physiotherapist" },
  { label: "Viewing Gallery", value: "Capacity 300" },
  { label: "Parking", value: "120 vehicles" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 text-xs font-semibold px-3 py-1.5" style={{ background: "#c8e64c20", color: "#3a6a00", border: "1px solid #c8e64c60" }}>
              Est. {academy.founded}
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-black text-neutral-950 mb-4 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              About the<br />Hub
            </h1>
            <p className="text-neutral-500 text-lg leading-relaxed mb-6">
              Founded in 2015 by Audi Stadia Consultants Private Limited, The Sportz Hub is Kanpur's premier, multi-sport fitness facility featuring an international standards-compliant hall with a 12-meter ceiling.
            </p>
            <p className="text-neutral-500 leading-relaxed">
              We offer comprehensive facilities with specific circulation systems for players and spectators, along with community initiatives delivering free sports coaching for under-18 athletes from economically weaker sections.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, value: "5,240+", label: "Active Members" },
              { icon: Award, value: "150+", label: "Tournaments Hosted" },
              { icon: Star, value: "97%", label: "Satisfaction Rate" },
              { icon: Building2, value: "2.4 Acres", label: "Complex Area" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-6 border border-neutral-100 flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#c8e64c25" }}>
                  <s.icon className="w-5 h-5" style={{ color: "#3a6a00" }} />
                </div>
                <p className="text-3xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</p>
                <p className="text-xs text-neutral-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-white border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-neutral-950 mb-10 text-center" style={{ fontFamily: "var(--font-heading)" }}>
            Leadership & Coaching Team
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {leadership.map((l) => (
              <Card key={l.name} className="border-neutral-100 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-base font-black text-black"
                      style={{ background: l.color }}>
                      {l.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-950">{l.name}</h3>
                      <p className="text-xs text-neutral-500">{l.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">{l.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-black text-neutral-950 mb-10" style={{ fontFamily: "var(--font-heading)" }}>
          Infrastructure Highlights
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {infra.map((item) => (
            <div key={item.label} className="bg-white rounded-2xl p-5 border border-neutral-100 text-center">
              <p className="text-xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{item.value}</p>
              <p className="text-xs text-neutral-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-neutral-950 text-white" id="news">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black mb-10" style={{ fontFamily: "var(--font-heading)" }}>
            Recent Achievements & News
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((a) => (
              <div key={a.id} className="rounded-2xl bg-neutral-900 p-5 border border-neutral-800 hover:border-neutral-600 transition-colors">
                <Badge className="mb-3 text-xs" style={{ background: "#c8e64c20", color: "#c8e64c", border: "1px solid #c8e64c30" }}>
                  {a.category}
                </Badge>
                <h3 className="font-bold text-white mb-2">{a.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{a.description}</p>
                <p className="text-xs text-neutral-600 mt-3">
                  {new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
