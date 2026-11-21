"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { learningContent } from "@/lib/mock-data";
import {
  Play, Pause, Volume2, Maximize2, CheckCircle2, ChevronLeft,
  MessageSquare, BookOpen, Star,
} from "lucide-react";

const levelColor: Record<string, string> = {
  Beginner: "bg-green-50 text-green-700",
  Intermediate: "bg-amber-50 text-amber-700",
  Advanced: "bg-red-50 text-red-700",
};

const chapters = [
  { time: "0:00", title: "Introduction" },
  { time: "1:24", title: "Stance & Ready Position" },
  { time: "2:48", title: "Footwork Patterns" },
  { time: "4:10", title: "Court Coverage Drill" },
  { time: "5:30", title: "Advanced Movement" },
  { time: "6:05", title: "Practice Exercises" },
];

export default function VideoPage() {
  const { id } = useParams<{ id: string }>();
  const content = learningContent.find((c) => c.id === id);
  const related = learningContent.filter((c) => c.id !== id).slice(0, 3);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(content?.progress ?? 0);
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [completed, setCompleted] = useState(content?.progress === 100);

  if (!content) return (
    <div className="p-6 text-center text-neutral-500">
      Video not found. <Link href="/portal/learning" className="text-neutral-900 underline">Back to Learning Hub</Link>
    </div>
  );

  const handleSaveNote = () => {
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleMarkComplete = () => {
    setProgress(100);
    setCompleted(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Link href="/portal/learning" className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-5">
        <ChevronLeft className="w-4 h-4" /> Back to Learning Hub
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Video player */}
          <div className="rounded-2xl overflow-hidden bg-neutral-950 relative">
            <div
              className="w-full aspect-video flex items-center justify-center relative cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${content.thumbnail}30 0%, #1a1a1a 100%)` }}
              onClick={() => setPlaying((p) => !p)}
            >
              {!playing ? (
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Pause className="w-8 h-8 text-white" fill="white" />
                </div>
              )}
              {/* Overlay badge */}
              <div className="absolute top-4 right-4">
                <span className="text-xs font-semibold bg-black/60 text-white px-2 py-1 rounded-full">{content.duration}</span>
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge className={`text-[10px] ${levelColor[content.level]}`}>{content.level}</Badge>
              </div>
            </div>

            {/* Controls bar */}
            <div className="px-4 py-3 flex items-center gap-3">
              <button onClick={() => setPlaying((p) => !p)} className="text-white hover:text-lime-400 transition-colors">
                {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <div className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden cursor-pointer">
                <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: "#c8e64c" }} />
              </div>
              <span className="text-xs text-neutral-400 shrink-0">{content.duration}</span>
              <Volume2 className="w-4 h-4 text-white/60" />
              <Maximize2 className="w-4 h-4 text-white/60" />
            </div>
          </div>

          {/* Progress */}
          {!completed && (
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-xs text-neutral-500 mb-1">
                  <span>Your progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <Button size="sm" className="rounded-xl font-semibold shrink-0" style={{ background: "#c8e64c", color: "#1a1a1a" }}
                onClick={handleMarkComplete}>
                <CheckCircle2 className="w-4 h-4 mr-1.5" /> Mark Complete
              </Button>
            </div>
          )}
          {completed && (
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
              <CheckCircle2 className="w-4 h-4" /> Completed! Great work.
            </div>
          )}

          {/* Info */}
          <div>
            <h1 className="text-2xl font-black text-neutral-950 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              {content.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: content.thumbnail + "60" }}>
                {content.coach.split(" ").map(w => w[0]).join("")}
              </div>
              {content.coach}
              <span>·</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              4.9
              <span>·</span>
              {content.views.toLocaleString()} views
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">{content.description}</p>
          </div>

          {/* Chapters */}
          <Card className="border-neutral-100">
            <CardContent className="p-5">
              <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Chapters
              </h3>
              <div className="space-y-2">
                {chapters.map((ch, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors">
                    <span className="text-xs font-mono text-neutral-400 w-10 shrink-0">{ch.time}</span>
                    <span className="text-sm text-neutral-700">{ch.title}</span>
                    {i === 0 && <Badge className="ml-auto text-[10px] bg-green-50 text-green-700 border-0">Done</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="border-neutral-100">
            <CardContent className="p-5">
              <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> My Training Notes
              </h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add your notes here — key takeaways, things to practice, questions for your coach…"
                className="w-full rounded-xl border border-neutral-200 bg-[#f5f5f0] px-4 py-3 text-sm text-neutral-700 outline-none resize-none"
                rows={4}
              />
              <div className="flex items-center justify-between mt-3">
                {noteSaved ? (
                  <span className="text-xs text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Saved!</span>
                ) : <span />}
                <Button size="sm" variant="outline" className="rounded-xl" onClick={handleSaveNote}>
                  Save Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related videos sidebar */}
        <div className="space-y-4">
          <h2 className="font-bold text-neutral-900">Related Videos</h2>
          {related.map((v) => (
            <Link key={v.id} href={`/portal/learning/${v.id}`}>
              <div className="flex gap-3 hover:bg-neutral-50 rounded-xl p-2 transition-colors cursor-pointer">
                <div
                  className="w-20 h-14 rounded-lg flex items-center justify-center shrink-0 relative"
                  style={{ background: `linear-gradient(135deg, ${v.thumbnail}40, ${v.thumbnail}20)` }}
                >
                  <Play className="w-4 h-4 text-neutral-700" fill="currentColor" />
                  <span className="absolute bottom-1 right-1 text-[10px] bg-black/50 text-white px-1 rounded">{v.duration}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900 leading-snug line-clamp-2">{v.title}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{v.coach}</p>
                  <Badge className={`text-[10px] mt-1 ${levelColor[v.level]}`}>{v.level}</Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
