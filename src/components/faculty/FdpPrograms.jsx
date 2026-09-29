import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Sparkles, 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Building2, 
  ExternalLink,
  Users,
  Search,
  Filter,
  Globe
} from 'lucide-react';

export default function FdpPrograms() {
  const { currentUser, industryPrograms, enrollInProgram, addToast } = useApp();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const userId = currentUser ? currentUser.id : "FAC-1049";

  const facultyRelevantPrograms = (industryPrograms || []).filter(p => 
    !p.targetAudience || p.targetAudience.includes('Faculty') || p.targetAudience === 'All'
  );

  const filtered = facultyRelevantPrograms.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filter === 'All' || p.type.toLowerCase().includes(filter.toLowerCase());
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            National & Industry Sponsored Faculty Development Programs
          </span>
          <span className="text-xs text-slate-500 font-medium">100% Sponsored</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
          Industry Masterclasses, FDPs & Certification Programs
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Enrich pedagogical practice and lab curriculum through state-of-the-art corporate instrument training, molecular modeling masterclasses, and GLP certification sprints.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search FDPs, workshops, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {['All', 'Corporate Training', 'Certification', 'Hackathon'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                filter === tab
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab === 'All' ? '🌟 All Faculty FDPs' :
               tab === 'Corporate Training' ? '🔬 Instrument Workshops' :
               tab === 'Certification' ? '📜 Certifications' :
               '⚡ Joint Hackathons'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prog) => {
          const isEnrolled = prog.enrolledUserIds?.includes(userId);

          return (
            <div
              key={prog.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    {prog.type}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">
                    {prog.participantsCount || prog.enrolledUserIds?.length || 0} Registered
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {prog.title}
                </h3>

                <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {prog.company}
                </p>

                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{prog.timeline || prog.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>Nationally Sponsored / UGC & NAAC Recognized</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {prog.description}
                </p>

                {prog.skillsCovered && (
                  <div className="pt-2 flex flex-wrap gap-1">
                    {prog.skillsCovered.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                {isEnrolled ? (
                  <div className="w-full py-2 bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-indigo-300 dark:border-indigo-800">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span>Enrolled Faculty Member</span>
                  </div>
                ) : (
                  <button
                    onClick={() => enrollInProgram(prog.id)}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Enroll in FDP Masterclass</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
