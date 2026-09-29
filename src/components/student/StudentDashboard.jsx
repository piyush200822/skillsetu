import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Award, 
  Briefcase, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  BookOpen, 
  ShieldCheck, 
  Clock, 
  Building2,
  ChevronRight,
  Target
} from 'lucide-react';

export default function StudentDashboard() {
  const { 
    studentProfile, 
    opportunities, 
    applications, 
    setActiveTab, 
    learningPaths,
    setSelectedVerificationItem 
  } = useApp();

  const topMatches = opportunities
    .filter(o => o.type === 'Internship' || o.type === 'Placement' || o.type === 'Live Project')
    .slice(0, 3);

  const activeApps = applications.filter(a => a.status !== 'Rejected');

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Welcome & AI Readiness Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart AI Skill Engine Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Outfit']">
              Welcome back, {studentProfile.name}
            </h1>
            <p className="text-emerald-100/90 text-sm leading-relaxed">
              {studentProfile.institute} • {studentProfile.department}
            </p>
            <p className="text-xs text-emerald-200/80">
              Target Career Role: <strong className="text-white underline decoration-emerald-400 decoration-2">{studentProfile.targetRole}</strong>
            </p>
          </div>

          {/* Quick Readiness Dial / Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-center shrink-0 min-w-[200px]">
            <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-300">
              Skill Readiness Index
            </span>
            <div className="text-3xl font-extrabold text-white mt-1">
              {studentProfile.skillScore}%
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${studentProfile.skillScore}%` }}
              ></div>
            </div>
            <div className="flex flex-col gap-1.5 mt-3">
              <button
                onClick={() => setActiveTab('assessment')}
                className="w-full py-1.5 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition shadow"
              >
                Retake Diagnostic Quiz
              </button>
              <button
                onClick={() => setActiveTab('profile-manager')}
                className="w-full py-1.5 px-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-lg transition"
              >
                ✏️ Edit Skills & Profile
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Decorative Background Ring */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"></div>
      </div>

      {/* 4 Core Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {opportunities.length} Openings
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Industry Opportunities</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {activeApps.length} Active
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Applications Tracked</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {studentProfile.verifiedCertifications.length} Credentials
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Verifiable Certificates</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              3 Modules
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Skill Gap Track Active</p>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Matched Opportunities & Skill Gap Action Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Matched Opportunities */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
                AI Compatibility-Matched Opportunities
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('opportunities')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              Explore All ({opportunities.length}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {topMatches.map((opp) => (
              <div
                key={opp.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 transition duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        opp.type === 'Internship' 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : opp.type === 'Placement'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                      }`}>
                        {opp.type}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {opp.domain}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {opp.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {opp.company} • <span className="text-slate-500">{opp.location}</span>
                    </p>
                  </div>

                  {/* Match Score Badge */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Match</span>
                      <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                        {opp.matchPercentage || 88}% Match
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTab('opportunities')}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
                    >
                      {opp.isApplied ? 'View Status' : 'View & Apply'}
                    </button>
                  </div>
                </div>

                {/* Required Skills tags */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-medium mr-1">Required Skills:</span>
                  {opp.requiredSkills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      {sk.name} ({sk.minScore}%+)
                    </span>
                  ))}
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 ml-auto">
                    {opp.stipend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Skill Gap Recommendations & Verified Portfolio Preview */}
        <div className="space-y-6">
          {/* Skill Gap Box */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 font-['Outfit']">
                <Target className="w-4 h-4 text-amber-500" />
                Target Skill Gaps Identified
              </h3>
              <button
                onClick={() => setActiveTab('skill-gap')}
                className="text-[11px] font-bold text-emerald-600 hover:underline"
              >
                AI Roadmap
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Based on your target role (<strong className="text-slate-800 dark:text-slate-200">{studentProfile.targetRole.split('/')[0]}</strong>), our AI identified 2 critical skill gaps to bridge:
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-900 dark:text-amber-200">AI Molecular Docking</span>
                  <span className="text-[10px] bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded font-bold">Deficit: -22%</span>
                </div>
                <p className="text-[11px] text-amber-700 dark:text-amber-300/90 mt-1">
                  Required for premier computational pharmacology fellowships.
                </p>
                <button
                  onClick={() => setActiveTab('skill-gap')}
                  className="mt-2 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  Start Recommended PyMOL Module <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Scientific Writing & IND Filings</span>
                  <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded font-bold">Deficit: -15%</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Boosts clinical trial coordinator match score from 75% to 92%.
                </p>
              </div>
            </div>
          </div>

          {/* Verifiable Credentials Snippet */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 font-['Outfit']">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verifiable Credentials
              </h3>
              <button
                onClick={() => setActiveTab('portfolio')}
                className="text-[11px] font-bold text-emerald-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2">
              {studentProfile.verifiedCertifications.slice(0, 2).map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedVerificationItem(cert)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 cursor-pointer bg-slate-50/50 dark:bg-slate-800/40 transition flex items-center justify-between"
                >
                  <div className="space-y-0.5 pr-2">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                      {cert.title}
                    </p>
                    <p className="text-[10px] text-slate-500">{cert.issuer}</p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    Verify ↗
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
