import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  UserPlus, 
  GraduationCap, 
  Building2, 
  Landmark, 
  BookOpen, 
  TrendingUp, 
  FileSpreadsheet, 
  Sparkles, 
  ArrowRight,
  Activity,
  Server
} from 'lucide-react';

export default function AdminDashboard() {
  const { adminProfile, usersList, stats, setActiveTab } = useApp();

  const studentCount = usersList.filter(u => u.role === 'student').length;
  const facultyCount = usersList.filter(u => u.role === 'faculty').length;
  const industryCount = usersList.filter(u => u.role === 'industry').length;
  const institutionCount = usersList.filter(u => u.role === 'institution').length;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Hero Admin Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-400/30 text-red-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>National System Administration & Governance Portal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-['Outfit']">
              {adminProfile.name}
            </h1>
            <p className="text-xs text-red-100 font-medium">
              {adminProfile.designation} • {adminProfile.department}
            </p>
            <p className="text-xs text-slate-300">
              {adminProfile.organization}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('user-management')}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>User Provisioning Hub</span>
            </button>
            <button
              onClick={() => setActiveTab('compliance-export')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
              <span>NAAC/NIRF Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core User Counts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {studentCount} Enrolled
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Registered Students</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {facultyCount} Verified
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Faculty Academicians</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {industryCount} Affiliated
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Corporate Partners</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {institutionCount} Institutes
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Ayush Universities & TPOs</p>
          </div>
        </div>
      </div>

      {/* Grid: Quick Actions & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Administrative Quick Hub */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
            Administrative Governance Modules
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              onClick={() => setActiveTab('user-management')}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-red-500/60 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer transition space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center">
                <UserPlus className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">User Provisioning Hub</h4>
              <p className="text-[11px] text-slate-500">Authorize faculty, corporates & colleges.</p>
            </div>

            <div
              onClick={() => setActiveTab('skill-trends')}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/60 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer transition space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Industry Skill Trends</h4>
              <p className="text-[11px] text-slate-500">AI heatmap on pharma and healthcare demand.</p>
            </div>

            <div
              onClick={() => setActiveTab('mous')}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer transition space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Corporate MoUs Oversight</h4>
              <p className="text-[11px] text-slate-500">Track 142 active industry partnerships.</p>
            </div>

            <div
              onClick={() => setActiveTab('compliance-export')}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer transition space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">NAAC / NIRF Exporter</h4>
              <p className="text-[11px] text-slate-500">Generate 1-click audit-compliant CSV reports.</p>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: System Health & Verifiable Ledger Status */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-500" />
              Infrastructure & Ledger Status
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              All Systems Nominal
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex justify-between items-center">
              <span>National Ayush Hyperledger</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Block #489201 (Synced)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex justify-between items-center">
              <span>AI Skill Gap Inference Engine</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">99.98% Uptime</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex justify-between items-center">
              <span>Security & Role RBAC Policy</span>
              <span className="text-slate-700 dark:text-slate-300 font-bold">Schedule T / ISO 27001</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
