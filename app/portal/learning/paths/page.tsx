"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { learningPaths, learningContent } from "@/lib/mock-data";
import { Play, Lock, CheckCircle2, ArrowRight, BookOpen } from "lucide-react";

export default function LearningPathsPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
          Learning Paths
        </h1>
        <p className="text-neutral-500 text-sm">Curated video playlists that take you from beginner to expert, step by step.</p>
      </div>

      <div className="space-y-6">
        {learningPaths.map((path) => {
          const pathVideos = path.videoIds
            .map((vid) => learningContent.find((c) => c.id === vid))
            .filter(Boolean) as typeof learningContent;

          return (
            <Card key={path.id} className="border-neutral-100 overflow-hidden">
              <div className="h-2 w-full" style={{ background: path.color }} />
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: path.color + "25" }}>
                      {path.emoji}
                    </div>
                    <div>
                      <h2 className="font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>{path.title}</h2>
                      <p className="text-xs text-neutral-500 mt-0.5">{path.sport} · {path.totalVideos} videos · {path.estimatedHours}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>
                      {path.completedVideos}/{path.totalVideos}
                    </p>
                    <p className="text-[10px] text-neutral-400">completed</p>
                  </div>
                </div>

                <p className="text-sm text-neutral-600 mb-4">{path.description}</p>

                {/* Progress */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs text-neutral-500 mb-1.5">
                    <span>Path progress</span>
                    <span>{Math.round((path.completedVideos / path.totalVideos) * 100)}%</span>
                  </div>
                  <Progress value={(path.completedVideos / path.totalVideos) * 100} className="h-2" />
                </div>

                {/* Video list */}
                <div className="space-y-2 mb-5">
                  {pathVideos.map((video, i) => {
                    const isCompleted = video.progress === 100;
                    const isLocked = i > path.completedVideos; // lock if haven't completed previous
                    const isCurrent = i === path.completedVideos && !isCompleted;

                    return (
                      <Link
                        key={video.id}
                        href={isLocked ? "#" : `/portal/learning/${video.id}`}
                        className={`flex items-center gap-3 rounded-xl p-3 border transition-all ${
                          isLocked ? "opacity-40 cursor-not-allowed" : "hover:shadow-sm cursor-pointer"
                        } ${isCurrent ? "border-2" : "border-neutral-100 bg-[#fafafa]"}`}
                        style={isCurrent ? { borderColor: path.color, background: path.color + "10" } : {}}
                        onClick={(e) => isLocked && e.preventDefault()}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                          style={{ background: video.thumbnail + "30" }}
                        >
                          {isCompleted
                            ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                            : isLocked
                            ? <Lock className="w-4 h-4 text-neutral-400" />
                            : <Play className="w-4 h-4" style={{ color: path.color }} />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-neutral-900 truncate">{video.title}</p>
                          <p className="text-xs text-neutral-400">{video.coach} · {video.duration}</p>
                          {isCurrent && (
                            <Badge className="text-[10px] mt-1" style={{ background: path.color + "30", color: "#1a1a1a", border: "none" }}>
                              Up Next
                            </Badge>
                          )}
                        </div>
                        {isCompleted && (
                          <Badge className="text-[10px] bg-green-50 text-green-700 border-0 shrink-0">Done</Badge>
                        )}
                        {!isLocked && !isCompleted && (
                          <ArrowRight className="w-4 h-4 text-neutral-300 shrink-0" />
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* CTA */}
                {path.completedVideos < path.totalVideos && (
                  <Link href={`/portal/learning/${pathVideos[path.completedVideos]?.id ?? pathVideos[0].id}`}>
                    <Button className="w-full rounded-xl font-semibold" style={{ background: path.color, color: "#1a1a1a" }}>
                      <Play className="w-4 h-4 mr-2" />
                      {path.completedVideos === 0 ? "Start Path" : "Continue Learning"}
                    </Button>
                  </Link>
                )}
                {path.completedVideos === path.totalVideos && (
                  <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-50 text-green-700 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> Path Completed!
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Link href="/portal/learning">
          <Button variant="outline" className="rounded-xl">
            <BookOpen className="w-4 h-4 mr-2" /> Browse All Videos
          </Button>
        </Link>
      </div>
    </div>
  );
}
