import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  CheckCircle2, 
  Star, 
  Award, 
  Clock, 
  FileText, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function StudentMentorship() {
  const { studentProfile, addToast } = useApp();
  const [endorsedSkills, setEndorsedSkills] = useState([]);
  const [approvedLogs, setApprovedLogs] = useState([1]);

  const students = [
    {
      id: studentProfile.id,
      name: studentProfile.name,
      department: studentProfile.department,
      internship: "Ayurvedic Phytopharmaceutical R&D Intern (Dabur R&D)",
      readiness: "82% - High Tier",
      avatar: studentProfile.avatar,
      logCount: 2,
      pendingApproval: 1
    },
    {
      id: "STU-2026-9902",
      name: "Priyanka Joshi",
      department: "Rasashastra & Bhasma Standardization",
      internship: "Quality Auditor Intern (Baidyanath)",
      readiness: "89% - Expert Tier",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      logCount: 4,
      pendingApproval: 0
    }
  ];

  const handleEndorse = (skillName) => {
    setEndorsedSkills(prev => [...prev, skillName]);
    addToast("Faculty Skill Endorsement Anchored", `You officially endorsed "${skillName}" for ${studentProfile.name}.`, "success");
  };

  const handleApproveLog = (logId) => {
    setApprovedLogs(prev => [...prev, logId]);
    addToast("Internship Hours Approved", "Academic credits calculated and signed off for AIIA registry.", "success");
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Info */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            Faculty Mentorship & Skill Validation Hub
          </span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
          Student Internship Supervision & Official Skill Endorsement
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Supervise assigned scholars during corporate internships, validate weekly laboratory logs, and issue cryptographic academic endorsements.
        </p>
      </div>

      {/* Supervised Students List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students.map((st) => (
          <div
            key={st.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex items-center space-x-3.5">
              <img
                src={st.avatar}
                alt={st.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{st.name}</h4>
                  <span className="text-[10px] font-mono text-slate-400">{st.id}</span>
                </div>
                <p className="text-xs text-slate-500">{st.department}</p>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {st.internship}
                </p>
              </div>
            </div>

            {/* Endorsement Actions for Aarav Sharma */}
            {st.id === studentProfile.id && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Pending Faculty Endorsements:
                </span>

                <div className="space-y-2">
                  {studentProfile.skills.slice(0, 3).map((sk, idx) => {
                    const isEndorsed = endorsedSkills.includes(sk.name) || sk.verified;
                    return (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{sk.name}</span>
                        {isEndorsed ? (
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Endorsed by You
                          </span>
                        ) : (
                          <button
                            onClick={() => handleEndorse(sk.name)}
                            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-[10px] transition shadow-sm"
                          >
                            Endorse Skill
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Logbook Approval */}
                <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-indigo-950 dark:text-indigo-200">
                    <span>Week 2 Lab Log Submission (40 Hours)</span>
                    <span className="text-[10px] bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 px-1.5 py-0.2 rounded font-bold">
                      Awaiting Sign-off
                    </span>
                  </div>
                  <p className="text-[11px] text-indigo-800 dark:text-indigo-300/90">
                    Topic: HPLC Baseline Drift Resolution in Ashwagandha extracts under Dabur CSO.
                  </p>
                  <button
                    onClick={() => handleApproveLog(2)}
                    className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sign-off & Credit 2.0 Academic Units</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
