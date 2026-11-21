"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pricingEngine } from "@/lib/mock-data";
import { Tag, Edit3, CheckCircle2, IndianRupee } from "lucide-react";

export default function AdminPricingPage() {
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [editedPrices, setEditedPrices] = useState<Record<string, number>>(
    Object.fromEntries(pricingEngine.sessionFees.map((f) => [f.sport, f.perSession]))
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>Pricing Engine</h1>
          <p className="text-neutral-500 text-sm">Configure membership plans, session fees, coaching packages, and GST settings.</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-2">
            <CheckCircle2 className="w-4 h-4" /> Changes saved!
          </div>
        )}
      </div>

      {/* Membership Plans */}
      <div>
        <h2 className="font-bold text-neutral-900 mb-3">Membership Plans</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {pricingEngine.membershipPlans.map((plan) => (
            <Card key={plan.id} className={`border-2 transition-all cursor-pointer ${activePlan === plan.id ? "border-lime-400" : "border-neutral-100"}`}
              onClick={() => setActivePlan(activePlan === plan.id ? null : plan.id)}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-black text-neutral-900">{plan.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-4 rounded-full relative" style={{ background: plan.active ? "#c8e64c" : "#d1d5db" }}>
                      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${plan.active ? "translate-x-4" : "translate-x-0.5"}`} />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-3xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>
                    ₹{plan.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-neutral-400">{plan.duration} days · +{plan.gst}% GST</p>
                </div>

                <div className="space-y-1.5">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-1.5 text-xs text-neutral-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                      {f}
                    </div>
                  ))}
                </div>

                {activePlan === plan.id && (
                  <div className="mt-4 border-t border-neutral-100 pt-4 space-y-3">
                    <div>
                      <label className="text-xs font-medium text-neutral-500 block mb-1">Price (₹)</label>
                      <input type="number" defaultValue={plan.price}
                        className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-3 py-2 text-sm outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-neutral-500 block mb-1">Duration (days)</label>
                      <input type="number" defaultValue={plan.duration}
                        className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-3 py-2 text-sm outline-none" />
                    </div>
                    <Button className="w-full rounded-xl text-xs font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={handleSave}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Session Fees */}
      <Card className="border-neutral-100">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-neutral-900 flex items-center gap-2">
              <IndianRupee className="w-4 h-4" /> Sport-Wise Session Fees
            </h2>
            <Button size="sm" className="rounded-xl font-semibold text-xs gap-1.5" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={handleSave}>
              <CheckCircle2 className="w-3.5 h-3.5" /> Save All
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-[#fafafa]">
                  {["Sport", "Per Session (₹)", "Pack of 5 (₹)", "Pack of 10 (₹)"].map((h) => (
                    <th key={h} className="text-left p-3 text-xs text-neutral-500 font-semibold uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricingEngine.sessionFees.map((fee) => (
                  <tr key={fee.sport} className="border-b border-neutral-50 hover:bg-neutral-50">
                    <td className="p-3 font-semibold text-neutral-900">{fee.sport}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={editedPrices[fee.sport] ?? fee.perSession}
                        onChange={(e) => setEditedPrices({ ...editedPrices, [fee.sport]: Number(e.target.value) })}
                        className="w-20 rounded-lg border border-neutral-200 bg-white px-2 py-1.5 text-sm outline-none text-center"
                      />
                    </td>
                    <td className="p-3 text-neutral-700">₹{fee.bulkPack5}</td>
                    <td className="p-3 text-neutral-700">₹{fee.bulkPack10}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Coaching packages */}
      <div>
        <h2 className="font-bold text-neutral-900 mb-3">Coaching Packages</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {pricingEngine.coachingPackages.map((pkg) => (
            <Card key={pkg.name} className="border-neutral-100">
              <CardContent className="p-5">
                <h3 className="font-bold text-neutral-900 mb-1">{pkg.name}</h3>
                <p className="text-2xl font-black text-neutral-950 mb-0.5" style={{ fontFamily: "var(--font-heading)" }}>₹{pkg.price.toLocaleString()}</p>
                <p className="text-xs text-neutral-400 mb-3">{pkg.sessions} sessions · ₹{pkg.perSession}/session</p>
                <Button size="sm" variant="outline" className="w-full rounded-xl text-xs gap-1.5">
                  <Edit3 className="w-3.5 h-3.5" /> Edit Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
