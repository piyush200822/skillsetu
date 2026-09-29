import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { 
  Compass, 
  Sparkles, 
  Target, 
  BookOpen, 
  CheckCircle2, 
  PlayCircle, 
  Lock, 
  ArrowRight, 
  Award,
  BarChart3,
  ExternalLink
} from 'lucide-react';

export default function SkillProfileGap() {
  const { studentProfile, learningPaths, addToast } = useApp();
  const [selectedTargetRole, setSelectedTargetRole] = useState(studentProfile.targetRole);
  const [activeLearningPath, setActiveLearningPath] = useState(
    learningPaths.length > 0 ? learningPaths[0] : null
  );

  // Role options with different industry benchmarks
  const roleBenchmarks = {
    "Ayurvedic R&D Formulation Scientist / Clinical Research Associate": {
      "Phytochemistry & Extraction": 85,
      "HPLC / GC-MS Profiling": 80,
      "Ayurvedic Pharmacopoeia (API)": 90,
      "Clinical Trial Protocols (GCP)": 75,
      "AI Molecular Docking / In-silico": 80,
      "Scientific Writing & Biostatistics": 75,
      "Regulatory Compliance (AYUSH GMP/FDA)": 75
    },
    "Quality Assurance & Regulatory Auditor (Ayush Premium Mark)": {
      "Phytochemistry & Extraction": 75,
      "HPLC / GC-MS Profiling": 85,
      "Ayurvedic Pharmacopoeia (API)": 85,
      "Clinical Trial Protocols (GCP)": 60,
      "AI Molecular Docking / In-silico": 45,
      "Scientific Writing & Biostatistics": 80,
      "Regulatory Compliance (AYUSH GMP/FDA)": 95
    },
    "Computational Ayur-Informatics & Molecular Modeler": {
      "Phytochemistry & Extraction": 65,
      "HPLC / GC-MS Profiling": 70,
      "Ayurvedic Pharmacopoeia (API)": 65,
      "Clinical Trial Protocols (GCP)": 50,
      "AI Molecular Docking / In-silico": 95,
      "Scientific Writing & Biostatistics": 85,
      "Regulatory Compliance (AYUSH GMP/FDA)": 60
    }
  };

  const currentBenchmark = roleBenchmarks[selectedTargetRole] || roleBenchmarks["Ayurvedic R&D Formulation Scientist / Clinical Research Associate"];

  const radarData = studentProfile.skills.map(sk => ({
    subject: sk.name.length > 18 ? sk.name.slice(0, 16) + '...' : sk.name,
    fullName: sk.name,
    studentScore: sk.score,
    industryBenchmark: currentBenchmark[sk.name] || 75
  }));

  const handleStartModule = (modTitle) => {
    addToast("Module Initiated", `Launching interactive training: "${modTitle}". Progress will update automatically upon quiz completion.`, "success");
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              AI Skill Gap Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">Real-Time Demand Taxonomy</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
            Skill Profiling & AI Learning Roadmap
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Compare your verified competencies against industry hiring benchmarks and access targeted upskilling tracks.
          </p>
        </div>

        {/* Target Role Selector */}
        <div className="space-y-1 min-w-[280px]">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Target Career Benchmark
          </label>
          <select
            value={selectedTargetRole}
            onChange={(e) => setSelectedTargetRole(e.target.value)}
            className="w-full text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="Ayurvedic R&D Formulation Scientist / Clinical Research Associate">
              🔬 R&D Formulation Scientist
            </option>
            <option value="Quality Assurance & Regulatory Auditor (Ayush Premium Mark)">
              📋 QA & Ayush Regulatory Auditor
            </option>
            <option value="Computational Ayur-Informatics & Molecular Modeler">
              💻 AI In-Silico Molecular Modeler
            </option>
          </select>
        </div>
      </div>

      {/* Grid: Radar Chart & Skill Gap Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Radar Visualizer */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
                Competency Radar Analysis
              </h3>
              <div className="flex items-center space-x-3 text-[11px] font-medium">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> You ({studentProfile.skillScore}%)
                </span>
                <span className="flex items-center gap-1 text-amber-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Target (80%)
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Polygon area demonstrates multidimensional alignment with industry expectations.
            </p>
          </div>

          <div className="w-full h-72 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#94a3b8" strokeDasharray="3 3" opacity={0.3} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-xl border border-slate-700">
                          <p className="font-bold">{data.fullName}</p>
                          <p className="text-emerald-400">Your Score: {data.studentScore}%</p>
                          <p className="text-amber-300">Industry Req: {data.industryBenchmark}%</p>
                          <p className="text-slate-300 text-[10px] mt-1">
                            {data.studentScore >= data.industryBenchmark ? '✓ Target Met' : `Gap: -${data.industryBenchmark - data.studentScore}%`}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Radar
                  name="Your Score"
                  dataKey="studentScore"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Industry Benchmark"
                  dataKey="industryBenchmark"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.15}
                  strokeDasharray="4 4"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Algorithmic Fit: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">88.4% Match</strong></span>
            <span>Accredited by AIIA Board</span>
          </div>
        </div>

        {/* Right: Skill Gap Matrix */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
              Skill Gap & Deficit Breakdown
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              {studentProfile.skills.length} Competency Vectors
            </span>
          </div>

          <div className="space-y-3">
            {studentProfile.skills.map((skill, idx) => {
              const req = currentBenchmark[skill.name] || 75;
              const gap = req - skill.score;
              const isMet = gap <= 0;

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{skill.name}</span>
                      {skill.verified && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500 font-medium">Actual: {skill.score}% / Req: {req}%</span>
                      {isMet ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                          Requirement Met
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold">
                          Deficit -{gap}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dual Bar (Actual vs Benchmark) */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full ${isMet ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Personalized AI Learning Track */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
                AI-Generated Personalized Learning Roadmap
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Curated modules designed to close identified skill deficits and maximize recruiter shortlist probabilities.
            </p>
          </div>
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
            {activeLearningPath?.matchRelevance || "96% Alignment"}
          </div>
        </div>

        {/* Modules List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeLearningPath?.modules.map((mod, index) => {
            const isDone = mod.status === 'Completed';
            const isInProgress = mod.status === 'In Progress';
            const isRecommended = mod.status === 'Recommended';
            const isLocked = mod.status === 'Locked';

            return (
              <div
                key={mod.id}
                className={`p-5 rounded-2xl border transition duration-200 flex flex-col justify-between space-y-4 ${
                  isRecommended
                    ? 'border-emerald-500/80 bg-emerald-50/40 dark:bg-emerald-950/30 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Module {index + 1} • {mod.duration}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : isInProgress
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        : isRecommended
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {mod.status}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {mod.title}
                  </h4>

                  {mod.gapAddressed && (
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                      ⚡ Bridges: {mod.gapAddressed}
                    </p>
                  )}

                  {mod.verifiedBadge && (
                    <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                      <Award className="w-3.5 h-3.5" />
                      Badge: {mod.verifiedBadge}
                    </div>
                  )}
                </div>

                <div>
                  {isDone ? (
                    <div className="w-full py-2 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Score: {mod.score}% (Completed)
                    </div>
                  ) : isLocked ? (
                    <div className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" /> {mod.action}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleStartModule(mod.title)}
                      className={`w-full py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm ${
                        isRecommended
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white'
                      }`}
                    >
                      <PlayCircle className="w-4 h-4" />
                      {mod.action || "Start Training"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
