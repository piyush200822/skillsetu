import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Star, 
  Award, 
  ShieldCheck, 
  ChevronRight, 
  FileText, 
  Building2,
  Mail,
  UserCheck
} from 'lucide-react';

export default function CandidateMatcher() {
  const { applications, updateApplicationStatus, studentProfile, setSelectedVerificationItem } = useApp();
  const [selectedApp, setSelectedApp] = useState(applications.length > 0 ? applications[0] : null);
  const [filterStage, setFilterStage] = useState('All');

  const filteredApps = applications.filter(a => {
    if (filterStage === 'All') return true;
    return a.status.toLowerCase() === filterStage.toLowerCase();
  });

  const handleAdvanceStatus = (newStage) => {
    if (!selectedApp) return;
    updateApplicationStatus(selectedApp.id, newStage, `Advanced to ${newStage} by Dabur Talent Acquisition Lead.`);
    setSelectedApp(prev => ({ ...prev, status: newStage }));
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Candidate Matcher & ATS
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] mt-1">
            Talent Discovery & Application Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Intelligent candidate ranking based on verified laboratory competencies, academic transcripts, and algorithmic role fit.
          </p>
        </div>

        {/* Filter Stage Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-slate-500">Filter Stage:</span>
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="All">All Stages ({applications.length})</option>
            <option value="Applied">Applied</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Technical Interview">Interview Scheduled</option>
            <option value="Offer Issued">Offer Issued</option>
          </select>
        </div>
      </div>

      {/* Grid: Candidate List + Candidate Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Candidates List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Matched Applicant Roster
          </h3>

          {filteredApps.map((app) => {
            const isSelected = selectedApp?.id === app.id;
            return (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {app.studentName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">({app.id})</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    {app.matchScore}% Fit
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                  Applied for: <strong className="text-slate-800 dark:text-slate-200">{app.opportunityTitle}</strong>
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800/80 mt-2">
                  <span>Status: <strong className="text-amber-700 dark:text-amber-400">{app.status}</strong></span>
                  <span>{app.appliedDate}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Candidate Detailed Dossier */}
        {selectedApp && (
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={studentProfile.avatar}
                    alt={selectedApp.studentName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40 shadow"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {selectedApp.studentName}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Verified Candidate
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{studentProfile.institute}</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      {studentProfile.department} (CGPA: {studentProfile.cgpa})
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Current Status</span>
                  <div className="text-sm font-extrabold text-amber-700 dark:text-amber-400">
                    {selectedApp.status}
                  </div>
                </div>
              </div>

              {/* Skill Match Breakdown Matrix */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Role Skill Compatibility Breakdown:
                </h4>

                <div className="space-y-2">
                  {studentProfile.skills.slice(0, 4).map((sk, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{sk.name}</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-slate-500 font-medium">Candidate: {sk.score}% / Req: 70%</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                          ✓ Exceeds Req
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Credentials */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Attached Verified Credentials:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {studentProfile.verifiedCertifications.map((cert) => (
                    <div
                      key={cert.id}
                      onClick={() => setSelectedVerificationItem(cert)}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 hover:border-emerald-500 cursor-pointer transition flex items-center justify-between text-xs"
                    >
                      <div className="pr-2 truncate">
                        <p className="font-bold text-slate-800 dark:text-slate-200 truncate">{cert.title}</p>
                        <p className="text-[10px] text-slate-400">{cert.issuer}</p>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold shrink-0">Audit ↗</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cover Note */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300">Candidate Note:</span>
                <p className="text-slate-600 dark:text-slate-400 italic">
                  "{selectedApp.coverNote || 'Enthusiastic to apply my verified analytical chromatography competencies to your flagship R&D pipeline.'}"
                </p>
              </div>

              {/* ATS Action Pipeline Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Advance Recruitment Pipeline:
                </span>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAdvanceStatus("Shortlisted")}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    1. Shortlist Candidate
                  </button>
                  <button
                    onClick={() => handleAdvanceStatus("Technical Interview")}
                    className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    2. Schedule Technical Round
                  </button>
                  <button
                    onClick={() => handleAdvanceStatus("Offer Issued")}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>3. Issue Internship Offer Letter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
