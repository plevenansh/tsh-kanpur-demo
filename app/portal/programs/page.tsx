"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trainingPrograms, enrolledPrograms } from "@/lib/mock-data";
import { CheckCircle2, Clock, Users, Calendar, ChevronDown, ChevronUp, X, GraduationCap } from "lucide-react";

type Program = typeof trainingPrograms[0];

const categoryColors: Record<string, { bg: string; text: string }> = {
  Foundation: { bg: "bg-lime-50", text: "text-lime-700" },
  Competition: { bg: "bg-blue-50", text: "text-blue-700" },
  Fitness: { bg: "bg-orange-50", text: "text-orange-700" },
  Camp: { bg: "bg-purple-50", text: "text-purple-700" },
  Wellness: { bg: "bg-teal-50", text: "text-teal-700" },
};

function EnrollModal({ program, onClose }: { program: Program; onClose: () => void }) {
  const [done, setDone] = useState(false);
  if (done) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-8 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#c8e64c30" }}>
          <CheckCircle2 className="w-10 h-10" style={{ color: "#3a6a00" }} />
        </div>
        <h3 className="text-xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>Enrolled! 🎉</h3>
        <p className="text-sm text-neutral-500 mb-1">You've enrolled in <strong>{program.name}</strong></p>
        <p className="text-xs text-neutral-400">First session: {program.schedule.split(" · ")[0]}</p>
        <Button className="w-full mt-6 rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }} onClick={onClose}>Done</Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="h-2 w-full" style={{ background: program.color }} />
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-black text-xl text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{program.name}</h3>
              <p className="text-sm text-neutral-500">with {program.coach}</p>
            </div>
            <button onClick={onClose}><X className="w-4 h-4 text-neutral-400" /></button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl bg-[#f5f5f0] p-3 text-sm">
              <p className="text-[10px] text-neutral-400">Duration</p>
              <p className="font-semibold text-neutral-900">{program.duration} weeks</p>
            </div>
            <div className="rounded-xl bg-[#f5f5f0] p-3 text-sm">
              <p className="text-[10px] text-neutral-400">Sessions/Week</p>
              <p className="font-semibold text-neutral-900">{program.sessionsPerWeek}×</p>
            </div>
            <div className="rounded-xl bg-[#f5f5f0] p-3 text-sm col-span-2">
              <p className="text-[10px] text-neutral-400">Schedule</p>
              <p className="font-semibold text-neutral-900 text-xs">{program.schedule}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-neutral-400">Program Fee</p>
              <p className="text-2xl font-black text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>₹{program.price.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-400">Seats left</p>
              <p className="font-bold text-neutral-900">{program.maxEnrolled - program.enrolled}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 rounded-xl" onClick={onClose}>Cancel</Button>
            <Button className="flex-1 rounded-xl font-bold" style={{ background: "#c8e64c", color: "#1a1a1a" }}
              onClick={() => setDone(true)}>
              Confirm Enroll
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProgramsPage() {
  const [category, setCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState<Program | null>(null);

  const categories = ["All", ...new Set(trainingPrograms.map((p) => p.category))];
  const filtered = category === "All" ? trainingPrograms : trainingPrograms.filter((p) => p.category === category);

  const enrolledIds = enrolledPrograms.map((ep) => ep.programId);
  const myPrograms = trainingPrograms.filter((p) => enrolledIds.includes(p.id));

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-neutral-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
          Training Programs
        </h1>
        <p className="text-neutral-500 text-sm">Structured multi-week coaching programs led by certified coaches.</p>
      </div>

      {/* My enrolled programs */}
      {myPrograms.length > 0 && (
        <div>
          <h2 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> My Enrolled Programs
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {myPrograms.map((prog) => {
              const ep = enrolledPrograms.find((e) => e.programId === prog.id)!;
              return (
                <Card key={prog.id} className="border-neutral-100 overflow-hidden">
                  <div className="h-1.5 w-full" style={{ background: prog.color }} />
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-neutral-900 text-sm">{prog.name}</h3>
                        <p className="text-xs text-neutral-400">with {prog.coach}</p>
                      </div>
                      <Badge style={{ background: prog.color + "30", color: "#1a1a1a", border: "none", fontSize: "10px" }}>Active</Badge>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-neutral-500">Progress</span>
                        <span className="font-semibold text-neutral-900">{ep.completedWeeks}/{ep.totalWeeks} weeks</span>
                      </div>
                      <Progress value={ep.progress} className="h-2" />
                    </div>

                    <div className="space-y-1.5">
                      {ep.curriculumStatus.map((c, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          {c.done
                            ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                            : <div className="w-3.5 h-3.5 rounded-full border-2 border-neutral-300 shrink-0 mt-0.5" />
                          }
                          <span className={c.done ? "text-neutral-500 line-through" : "text-neutral-700"}>{c.week}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500">
                      <Clock className="w-3.5 h-3.5" />
                      Next: {ep.nextSession}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Browse programs */}
      <div>
        <h2 className="font-bold text-neutral-900 mb-3">Browse Programs</h2>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
          {categories.map((cat) => (
            <Button key={cat} size="sm" onClick={() => setCategory(cat)} variant={category === cat ? "default" : "outline"}
              className="rounded-xl text-xs font-semibold shrink-0"
              style={category === cat ? { background: "#c8e64c", color: "#1a1a1a" } : {}}>
              {cat}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((prog) => {
            const expanded = expandedId === prog.id;
            const isEnrolled = enrolledIds.includes(prog.id);
            const isFull = prog.enrolled >= prog.maxEnrolled;
            const catStyle = categoryColors[prog.category] ?? { bg: "bg-neutral-50", text: "text-neutral-700" };

            return (
              <Card key={prog.id} className="border-neutral-100 overflow-hidden">
                <div className="h-1.5 w-full" style={{ background: prog.color }} />
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-neutral-900">{prog.name}</h3>
                        <Badge className={`text-[10px] ${catStyle.bg} ${catStyle.text} border-0`}>{prog.category}</Badge>
                        <Badge variant="outline" className="text-[10px]">{prog.level}</Badge>
                      </div>
                      <p className="text-xs text-neutral-500 mb-3">{prog.description}</p>

                      <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: prog.color + "40" }}>
                            {prog.coachInitials}
                          </div>
                          {prog.coach}
                        </div>
                        <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{prog.duration} weeks</div>
                        <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{prog.sessionsPerWeek}× / week</div>
                        <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{prog.enrolled}/{prog.maxEnrolled} enrolled</div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-black text-xl text-neutral-950" style={{ fontFamily: "var(--font-heading)" }}>₹{prog.price.toLocaleString()}</p>
                      <p className="text-[10px] text-neutral-400 mb-3">{prog.schedule.split(" · ")[0]}</p>

                      {isEnrolled ? (
                        <Badge style={{ background: "#c8e64c30", color: "#3a6a00", border: "none" }}>Enrolled ✓</Badge>
                      ) : isFull ? (
                        <Badge className="bg-red-50 text-red-600 border-0">Full</Badge>
                      ) : (
                        <Button size="sm" className="rounded-xl font-semibold text-xs" style={{ background: "#c8e64c", color: "#1a1a1a" }}
                          onClick={() => setEnrolling(prog)}>
                          Enroll Now
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Expand/collapse */}
                  <button
                    className="flex items-center gap-1.5 mt-4 text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
                    onClick={() => setExpandedId(expanded ? null : prog.id)}
                  >
                    {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    {expanded ? "Hide curriculum" : "View curriculum"}
                  </button>

                  {expanded && (
                    <div className="mt-3 pl-4 space-y-2 border-l-2" style={{ borderColor: prog.color }}>
                      {prog.curriculum.map((c, i) => (
                        <div key={i} className="text-xs text-neutral-600">{c}</div>
                      ))}
                      <p className="text-[10px] text-neutral-400 pt-1">Schedule: {prog.schedule}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {enrolling && <EnrollModal program={enrolling} onClose={() => setEnrolling(null)} />}
    </div>
  );
}
