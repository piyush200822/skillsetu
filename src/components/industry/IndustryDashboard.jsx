import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Users, 
  Briefcase, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Plus,
  ShieldCheck,
  Star
} from 'lucide-react';

export default function IndustryDashboard() {
  const { industryProfile, opportunities, applications, setActiveTab } = useApp();

  const activePostings = opportunities.filter(o => o.company.toLowerCase().includes(industryProfile.name.toLowerCase().split(' ')[0]));

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Industry Recruiter Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-900 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={industryProfile.logo}
              alt={industryProfile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400/50 shadow-md"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Corporate Partner • AIIA MoU Signatory</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-['Outfit']">
                {industryProfile.name}
              </h1>
              <p className="text-xs text-amber-100 font-medium">
                {industryProfile.sector} • {industryProfile.location}
              </p>
              <p className="text-xs text-slate-300">
                Talent Lead: {industryProfile.contactPerson} ({industryProfile.email})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('post-opportunity')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Role</span>
            </button>
            <button
              onClick={() => setActiveTab('candidate-matcher')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Candidate Matcher</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {industryProfile.activePostings} Active
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Live Postings</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {industryProfile.applicantsCount} Applicants
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Verified Pipeline</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {industryProfile.internsHosted} Hosted
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Interns Trained</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 fill-purple-400 text-purple-400" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              4.9 / 5.0
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Mentor Quality Rating</p>
          </div>
        </div>
      </div>

      {/* Grid: Live Openings & Candidate Matcher Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Active Openings */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-600" />
              Active Opportunities Posted by Your Organization
            </h3>
            <button
              onClick={() => setActiveTab('post-opportunity')}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              Create New <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {opportunities.slice(0, 3).map((opp) => (
              <div
                key={opp.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {opp.title}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {opp.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Type: {opp.type} • {opp.stipend}</span>
                  <span>{opp.openings} Openings • Apply by: {opp.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Top AI Matched Candidates Preview */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              AI Shortlisted Candidate Pool
            </h3>
            <button
              onClick={() => setActiveTab('candidate-matcher')}
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              Open ATS
            </button>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-slate-100">Aarav Sharma</span>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">88% Compatibility</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              AIIA Final Year BAMS • 3 Verified Certifications in Phytochemistry & HPLC.
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-500">Applied for: Phytopharmaceutical R&D Intern</span>
              <button
                onClick={() => setActiveTab('candidate-matcher')}
                className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold text-[11px] hover:bg-emerald-700 transition"
              >
                Review Dossier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
