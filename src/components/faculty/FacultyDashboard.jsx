import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  BookOpen, 
  FlaskConical, 
  Users, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function FacultyDashboard() {
  const { facultyProfile, collaborations, setActiveTab } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Faculty Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={facultyProfile.avatar}
              alt={facultyProfile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-400/50 shadow-md"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Academician Excellence & Industrial Sabbatical Portal</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-['Outfit']">
                {facultyProfile.name}
              </h1>
              <p className="text-xs text-indigo-100 font-medium">
                {facultyProfile.designation} • {facultyProfile.institute}
              </p>
              <p className="text-xs text-slate-300">
                Experience: {facultyProfile.experience}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('faculty-internships')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              Explore Sabbaticals
            </button>
            <button
              onClick={() => setActiveTab('research-rfp')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition"
            >
              Submit Joint RFP
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {facultyProfile.activeProposals} Active
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Joint R&D RFPs</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {facultyProfile.supervisedStudents} Scholars
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Students Supervised</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {facultyProfile.publicationsCount} Publications
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Scopus / Q1 Indexed</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {facultyProfile.patentsCount} Patents
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Filed / Granted</p>
          </div>
        </div>
      </div>

      {/* Grid: Active Industrial Programs & Joint Proposals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Active MoUs & RFPs */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-indigo-600" />
              Active Joint Industry R&D & MoUs
            </h3>
            <button
              onClick={() => setActiveTab('research-rfp')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              Manage RFPs <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {collaborations.map((collab) => (
              <div
                key={collab.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">{collab.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {collab.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{collab.title}</h4>
                <p className="text-slate-500">{collab.industryPartner || collab.organizer || collab.client}</p>
                {collab.budget && (
                  <p className="text-emerald-700 dark:text-emerald-400 font-bold">
                    Sanctioned Budget: {collab.budget} ({collab.duration})
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Faculty Industrial Sabbatical Opportunities */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              Featured Faculty Sabbatical Openings
            </h3>
            <button
              onClick={() => setActiveTab('faculty-internships')}
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              Browse All
            </button>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
                National Sponsored Sabbatical
              </span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">₹75,000 Fellowship</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Advanced Standardization Training & Pilot Plant Exposure
            </h4>
            <p className="text-slate-600 dark:text-slate-400">
              Zandu Care (Emami Group R&D) • Vapi, Gujarat / Kolkata (2 Months)
            </p>
            <p className="text-[11px] text-slate-500">
              Hands-on commercial plant exposure, automated granulation, and pilot-scale supercritical extraction.
            </p>
            <button
              onClick={() => setActiveTab('faculty-internships')}
              className="mt-2 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition text-xs shadow-sm"
            >
              Apply for Sabbatical Nomination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
