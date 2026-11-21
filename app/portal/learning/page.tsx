"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { learningContent } from "@/lib/mock-data";
import { Play, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";

const sportFilters = ["All", "Badminton", "Table Tennis", "Boxing", "Athletics", "Gymnastics", "Yoga", "Swimming"];

const levelColor: Record<string, string> = {
  Beginner: "bg-green-50 text-green-700",
  Intermediate: "bg-amber-50 text-amber-700",
  Advanced: "bg-red-50 text-red-700",
};

export default function LearningHubPage() {
  const [activeSport, setActiveSport] = useState("All");

  const filtered = activeSport === "All" ? learningContent : learningContent.filter((c) => c.sport === activeSport);

  const completed = learningContent.filter((c) => c.progress === 100).length;
  const inProgress = learningContent.filter((c) => c.progress > 0 && c.progress < 100).length;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
            Learning Hub
          </h1>
          <p className="text-neutral-500 text-sm">Expert coaching videos, drills, and technique guides — all in one place.</p>
        </div>
        <Link href="/portal/learning/paths">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors shrink-0">
            <BookOpen className="w-4 h-4" /> Learning Paths <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      {/* Progress summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Videos Completed", value: completed, icon: CheckCircle2, color: "#c8e64c" },
          { label: "In Progress", value: inProgress, icon: Play, color: "#4cb8e8" },
          { label: "Total Content", value: learningContent.length, icon: BookOpen, color: "#e8c84c" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-neutral-100 text-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: s.color + "25" }}>
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <p className="text-2xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</p>
            <p className="text-xs text-neutral-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Sport filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {sportFilters.map((s) => (
          <Button
            key={s}
            size="sm"
            onClick={() => setActiveSport(s)}
            variant={activeSport === s ? "default" : "outline"}
            className="rounded-xl text-xs font-semibold shrink-0"
            style={activeSport === s ? { background: "#c8e64c", color: "#1a1a1a" } : {}}>
            {s}
          </Button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((content) => (
          <Link key={content.id} href={`/portal/learning/${content.id}`} className="group">
            <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              {/* Thumbnail */}
              <div className="relative h-36 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${content.thumbnail}40 0%, ${content.thumbnail}20 100%)` }}>
                <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-neutral-800 ml-0.5" fill="currentColor" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-semibold bg-black/50 text-white px-2 py-0.5 rounded-full">
                    {content.duration}
                  </span>
                </div>
                {content.progress === 100 && (
                  <div className="absolute top-3 left-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`text-[10px] px-2 py-0 ${levelColor[content.level]}`} variant="outline">
                    {content.level}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-2 py-0 border-neutral-200">
                    {content.sport}
                  </Badge>
                </div>
                <h3 className="font-bold text-neutral-900 text-sm mb-1 leading-snug">{content.title}</h3>
                <p className="text-xs text-neutral-500 mb-3">{content.coach}</p>

                {content.progress > 0 && (
                  <div>
                    <div className="flex justify-between text-[10px] text-neutral-400 mb-1">
                      <span>Progress</span>
                      <span>{content.progress}%</span>
                    </div>
                    <Progress value={content.progress} className="h-1.5" />
                  </div>
                )}

                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] text-neutral-400">{content.views.toLocaleString()} views</span>
                  <span className="text-xs font-semibold text-neutral-700 group-hover:text-neutral-900 transition-colors">
                    {content.progress === 0 ? "Start →" : content.progress === 100 ? "Rewatch →" : "Continue →"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
