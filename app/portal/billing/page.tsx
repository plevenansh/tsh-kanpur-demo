"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { paymentHistory, currentMember, plans } from "@/lib/mock-data";
import {
  Receipt, CheckCircle2, Clock, X, CreditCard, Smartphone, Building2,
  Download, ChevronRight, AlertCircle, IndianRupee,
} from "lucide-react";

type PayEntry = typeof paymentHistory[0];

const statusStyle: Record<string, { bg: string; text: string; label: string }> = {
  paid: { bg: "bg-green-50", text: "text-green-700", label: "Paid" },
  pending: { bg: "bg-amber-50", text: "text-amber-700", label: "Pending" },
  failed: { bg: "bg-red-50", text: "text-red-700", label: "Failed" },
};

// Payment modal
function PaymentModal({ item, onClose }: { item: PayEntry | null; onClose: () => void }) {
  const [tab, setTab] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("ravi@okaxis");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!item) return null;

  const handlePay = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500">Pay to The Sportz Hub</p>
            <p className="font-black text-2xl text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>
              ₹{item.total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#c8e64c30" }}>
              <CheckCircle2 className="w-10 h-10" style={{ color: "#3a6a00" }} />
            </div>
            <h3 className="text-xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>Payment Successful!</h3>
            <p className="text-sm text-neutral-500 mb-1">{item.description}</p>
            <p className="text-xs text-neutral-400">Receipt will be sent to your email.</p>
            <Button className="w-full mt-6 rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={onClose}>
              Done
            </Button>
          </div>
        ) : (
          <div className="p-5">
            {/* Tabs */}
            <div className="flex gap-2 mb-5">
              {([
                { id: "upi", label: "UPI", icon: Smartphone },
                { id: "card", label: "Card", icon: CreditCard },
                { id: "netbanking", label: "Net Banking", icon: Building2 },
              ] as const).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={
                    tab === t.id
                      ? { background: "#c8e64c", color: "#1a1a1a" }
                      : { background: "#f5f5f0", color: "#666" }
                  }
                >
                  <t.icon className="w-3.5 h-3.5" /> {t.label}
                </button>
              ))}
            </div>

            {tab === "upi" && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-neutral-500 block mb-1.5">UPI ID</label>
                  <input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-3 text-sm outline-none"
                    placeholder="yourname@bank"
                  />
                </div>
                <div className="flex gap-2">
                  {["GPay", "PhonePe", "Paytm"].map((app) => (
                    <button
                      key={app}
                      onClick={() => setUpiId(`upi@${app.toLowerCase()}`)}
                      className="flex-1 py-2 rounded-xl text-xs font-semibold border border-neutral-200 hover:bg-neutral-50 transition-colors"
                    >
                      {app}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tab === "card" && (
              <div className="space-y-3">
                <div className="rounded-xl bg-neutral-950 p-4 text-white">
                  <p className="text-xs text-neutral-400 mb-4">Credit / Debit Card</p>
                  <p className="text-xl tracking-widest font-mono">**** **** **** 4242</p>
                  <div className="flex justify-between mt-3 text-xs text-neutral-400">
                    <span>RAVI PATEL</span>
                    <span>12/27</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-400 text-center">Card ending in 4242 • Visa</p>
              </div>
            )}

            {tab === "netbanking" && (
              <div className="grid grid-cols-2 gap-2">
                {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB"].map((bank) => (
                  <button
                    key={bank}
                    className="py-3 rounded-xl text-sm font-semibold border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-all"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            )}

            {/* Summary */}
            <div className="mt-5 rounded-xl bg-[#f5f5f0] p-4 space-y-1.5 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Amount</span>
                <span>₹{item.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>GST (18%)</span>
                <span>₹{item.gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-neutral-900 border-t border-neutral-200 pt-1.5 mt-1.5">
                <span>Total</span>
                <span>₹{item.total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            <Button
              className="w-full mt-4 rounded-xl font-bold h-12"
              style={{ background: "#c8e64c", color: "#1a1a1a" }}
              onClick={handlePay}
              disabled={processing}
            >
              {processing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-neutral-800/20 border-t-neutral-800 rounded-full animate-spin" />
                  Processing…
                </span>
              ) : (
                `Pay ₹${item.total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Invoice modal
function InvoiceModal({ item, onClose }: { item: PayEntry; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <h3 className="font-bold text-neutral-900">Invoice</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#c8e64c" }}>
              <span className="text-lg">⚡</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-500">{item.receipt}</p>
              <p className="text-xs text-neutral-400">{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          </div>
          <div>
            <p className="font-black text-neutral-900" style={{ fontFamily: "var(--font-heading)" }}>The Sportz Hub</p>
            <p className="text-xs text-neutral-400">Kanpur, Uttar Pradesh · GSTIN: 09AABCT1332L1ZX</p>
          </div>
          <hr />
          <div>
            <p className="text-sm font-semibold text-neutral-900">{item.description}</p>
            <p className="text-xs text-neutral-400 mt-0.5">Payment via {item.method}</p>
          </div>
          <div className="space-y-2 text-sm rounded-xl bg-[#f5f5f0] p-4">
            <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span>₹{item.amount.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">CGST (9%)</span><span>₹{(item.gst / 2).toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">SGST (9%)</span><span>₹{(item.gst / 2).toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-neutral-900 border-t border-neutral-200 pt-2 mt-1">
              <span>Total Paid</span>
              <span>₹{item.total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
          <Button className="w-full rounded-xl" variant="outline" onClick={() => window.print()}>
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function BillingPage() {
  const m = currentMember;
  const [payModal, setPayModal] = useState<PayEntry | null>(null);
  const [invoiceModal, setInvoiceModal] = useState<PayEntry | null>(null);

  const activePlan = plans.find((p) => p.id === "annual")!;
  const pendingPayments = paymentHistory.filter((p) => p.status === "pending");
  const totalSpent = paymentHistory.filter((p) => p.status === "paid").reduce((a, p) => a + p.total, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
          Billing & Payments
        </h1>
        <p className="text-neutral-500 text-sm">Track your membership, payments, and invoices.</p>
      </div>

      {/* Active plan summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="sm:col-span-2 border-neutral-100">
          <CardContent className="p-5 flex gap-5 items-start">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "#c8e64c" }}>
              <IndianRupee className="w-7 h-7 text-neutral-900" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-bold text-neutral-900">Annual Plan</h2>
                  <p className="text-xs text-neutral-500 mt-0.5">Member since {m.memberSince} · Expires {m.validUntil}</p>
                </div>
                <Badge style={{ background: "#c8e64c30", color: "#3a6a00", border: "none" }}>Active</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-neutral-400 text-xs">Days Left</p>
                  <p className="font-black text-2xl" style={{ fontFamily: "var(--font-heading)" }}>{m.daysLeft}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-xs">Plan Price</p>
                  <p className="font-bold text-neutral-900">₹{activePlan.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-xs">Next Renewal</p>
                  <p className="font-bold text-neutral-900">{m.validUntil}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-100">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div>
              <p className="text-xs text-neutral-400 mb-1">Total Spent (all time)</p>
              <p className="text-3xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>
                ₹{totalSpent.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-neutral-400 mt-1">{paymentHistory.filter(p => p.status === "paid").length} transactions</p>
            </div>
            <Button size="sm" className="w-full mt-4 rounded-xl font-semibold" style={{ background: "#c8e64c", color: "#1a1a1a" }}
              onClick={() => setPayModal({ id: "renew", date: new Date().toISOString().slice(0, 10), description: "Annual Membership — Renewal", amount: 11999, gst: 2159.82, total: 14158.82, status: "pending", method: "—", receipt: null, plan: null })}>
              Renew Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Pending alert */}
      {pendingPayments.length > 0 && (
        <div className="flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <div className="flex-1 text-sm text-amber-800">
            You have {pendingPayments.length} pending payment{pendingPayments.length > 1 ? "s" : ""} totaling <strong>₹{pendingPayments.reduce((a, p) => a + p.total, 0).toFixed(0)}</strong>
          </div>
          <Button size="sm" className="shrink-0 rounded-xl text-xs font-semibold" style={{ background: "#f59e0b", color: "white" }}
            onClick={() => setPayModal(pendingPayments[0])}>
            Pay Now
          </Button>
        </div>
      )}

      {/* Payment history */}
      <Card className="border-neutral-100">
        <CardContent className="p-5">
          <h2 className="font-bold text-neutral-900 mb-4">Payment History</h2>
          <div className="space-y-2">
            {paymentHistory.map((p) => {
              const st = statusStyle[p.status];
              return (
                <div key={p.id} className="flex items-center gap-4 rounded-xl p-3 border border-neutral-100 bg-[#fafafa] hover:shadow-sm transition-all">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: p.status === "pending" ? "#fef3c720" : "#c8e64c20" }}>
                    {p.status === "pending" ? <Clock className="w-4 h-4 text-amber-500" /> : <CheckCircle2 className="w-4 h-4" style={{ color: "#3a6a00" }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-900 truncate">{p.description}</p>
                    <p className="text-xs text-neutral-400">{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {p.method}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm text-neutral-900">₹{p.total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                    <Badge className={`text-[10px] ${st.bg} ${st.text} border-0`}>{st.label}</Badge>
                  </div>
                  {p.status === "pending" ? (
                    <Button size="sm" variant="outline" className="rounded-lg text-xs shrink-0" onClick={() => setPayModal(p)}>Pay</Button>
                  ) : (
                    <button className="text-neutral-400 hover:text-neutral-700 transition-colors shrink-0" onClick={() => setInvoiceModal(p)}>
                      <Receipt className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {payModal && <PaymentModal item={payModal} onClose={() => setPayModal(null)} />}
      {invoiceModal && <InvoiceModal item={invoiceModal} onClose={() => setInvoiceModal(null)} />}
    </div>
  );
}
