import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Sparkles, 
  Calendar, 
  Video, 
  Award, 
  CheckCircle2, 
  Building2, 
  Plus, 
  MessageSquare,
  Clock,
  ArrowRight,
  BookOpen,
  Gift,
  Search,
  Filter,
  Globe,
  Tag,
  GraduationCap,
  Link as LinkIcon,
  ShieldAlert,
  ShieldCheck,
  Info,
  Lock
} from 'lucide-react';

export default function CollaborationHub() {
  const { currentUser, currentRole, industryPrograms, enrollInProgram, facultyLectures, registerForFacultyLecture, addToast } = useApp();
  const [activeMainTab, setActiveMainTab] = useState('all'); // 'all' | 'industry-programs' | 'faculty-lectures'
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const userId = currentUser ? currentUser.id : "STU-2026-8841";
  const userRole = currentRole || currentUser?.role || 'student';

  // Publisher-Driven Role-Based Enrollment Evaluation:
  // 1. Checks item.allowedRoles configured explicitly by publisher.
  // 2. If not explicitly present, falls back to standard defaults:
  //    - Hackathons: ['student', 'faculty', 'industry']
  //    - Workshops/Masterclasses: ['student', 'faculty']
  const checkEnrollmentEligibility = (item) => {
    let effectiveRoles = item.allowedRoles;

    if (!effectiveRoles || !Array.isArray(effectiveRoles) || effectiveRoles.length === 0) {
      const typeStr = (item.type || item.category || '').toLowerCase();
      const isHackathon = typeStr.includes('hackathon') || typeStr.includes('challenge') || typeStr.includes('innovation');
      effectiveRoles = isHackathon ? ['student', 'faculty', 'industry'] : ['student', 'faculty'];
    }

    // Admin always has oversight/super-user access
    const isEligible = userRole === 'admin' || effectiveRoles.includes(userRole);

    return {
      eligible: isEligible,
      allowedRoles: effectiveRoles
    };
  };

  // Filter industry programs
  const filteredIndustryPrograms = (industryPrograms || []).filter(prog => {
    const matchesSearch = 
      prog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prog.skillsCovered && prog.skillsCovered.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesType = filterType === 'All' || prog.type.toLowerCase().includes(filterType.toLowerCase());

    return matchesSearch && matchesType;
  });

  // Filter faculty lectures
  const filteredFacultyLectures = (facultyLectures || []).filter(lec => {
    const matchesSearch = 
      lec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lec.speakerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lec.institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lec.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'All' || lec.category.toLowerCase().includes(filterType.toLowerCase());

    return matchesSearch && matchesType;
  });

  const getEnrollButtonText = (item) => {
    const typeStr = (item.type || item.category || '').toLowerCase();
    const isHackathon = typeStr.includes('hackathon') || typeStr.includes('challenge');
    if (isHackathon) {
      if (userRole === 'industry') return 'Register as Industry Scout / Partner';
      if (userRole === 'faculty') return 'Enroll as Faculty Mentor / Participant';
      return 'Enroll & Join Hackathon Team';
    }
    if (userRole === 'faculty') return 'Enroll in Faculty Masterclass';
    if (userRole === 'industry') return 'RSVP Corporate Seat';
    return 'Enroll / Register Free';
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Header Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            National Collaboration & Knowledge Exchange Hub
          </span>
          <span className="text-xs text-slate-500 font-medium">Publisher Role Controls Enforced</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
          Industry Hackathons, Certifications & Faculty Expert Lectures
        </h1>
        
        {/* Publisher-controlled role policy explanation banner */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Publisher Role Policy Active:</strong> Default role configurations apply, and <em>program publishers hold the upper hand</em> to explicitly authorize or restrict enrollment for specific roles (e.g. Faculty-only challenges or Open masterclasses).
            </span>
          </div>
          <span className="text-[11px] px-2.5 py-1 rounded-lg font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 uppercase shrink-0 border border-emerald-300 dark:border-emerald-800">
            Logged In As: {userRole}
          </span>
        </div>
      </div>

      {/* Main Channel Selector Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-bold">
        <button
          onClick={() => { setActiveMainTab('all'); setFilterType('All'); }}
          className={`px-4 py-2 rounded-xl transition ${
            activeMainTab === 'all'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🌟 All Offerings ({industryPrograms.length + facultyLectures.length})
        </button>

        <button
          onClick={() => { setActiveMainTab('industry-programs'); setFilterType('All'); }}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
            activeMainTab === 'industry-programs'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Industry Programs & Hackathons ({industryPrograms.length})</span>
        </button>

        <button
          onClick={() => { setActiveMainTab('faculty-lectures'); setFilterType('All'); }}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
            activeMainTab === 'faculty-lectures'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Faculty Lectures & Mentoring ({facultyLectures.length})</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search lectures, hackathons, workshops, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing {
            activeMainTab === 'all' ? (filteredIndustryPrograms.length + filteredFacultyLectures.length) :
            activeMainTab === 'industry-programs' ? filteredIndustryPrograms.length :
            filteredFacultyLectures.length
          } verified live opportunities
        </div>
      </div>

      {/* SECTION 1: FACULTY LECTURES & MASTERCLASSES */}
      {(activeMainTab === 'all' || activeMainTab === 'faculty-lectures') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              Faculty Expert Lectures, Masterclasses & Mentorship
            </h2>
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
              Live National Webcasts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacultyLectures.map((lec) => {
              const isEnrolled = lec.enrolledUserIds?.includes(userId);
              const eligibility = checkEnrollmentEligibility(lec);

              return (
                <div
                  key={lec.id}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition duration-200"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                        {lec.category}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        {lec.status || 'Live Broadcast'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {lec.title}
                    </h3>

                    <div className="space-y-1 text-xs">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{lec.speakerName}</span>
                        <span className="text-[10px] text-slate-400">({lec.speakerDesignation?.split('&')[0]})</span>
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{lec.institute}</span>
                      </p>
                    </div>

                    <div className="space-y-1 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{lec.dateTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Registered Attendees: <strong className="text-slate-800 dark:text-slate-200">{lec.attendeesCount || lec.enrolledUserIds?.length || 0}</strong></span>
                      </div>
                    </div>

                    {/* Publisher Authorized Roles Pill List */}
                    <div className="p-2 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Publisher Authorized Roles:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {eligibility.allowedRoles.map((r, idx) => (
                          <span
                            key={idx}
                            className={`text-[9px] px-1.5 py-0.2 rounded font-bold capitalize ${
                              r === userRole
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 ring-1 ring-emerald-500'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {r} {r === userRole ? '✓' : ''}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {lec.description}
                    </p>

                    {lec.skillsCovered && (
                      <div className="pt-1 flex flex-wrap gap-1">
                        {lec.skillsCovered.map((s, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Bar based on Publisher Role Authorization */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs gap-2">
                    <a
                      href={lec.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 shrink-0"
                    >
                      <LinkIcon className="w-3 h-3" />
                      <span>Webex Link</span>
                    </a>

                    {isEnrolled ? (
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Registered Pass
                      </span>
                    ) : eligibility.eligible ? (
                      <button
                        onClick={() => registerForFacultyLecture(lec.id)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs transition shadow-sm"
                      >
                        {getEnrollButtonText(lec)}
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>Restricted for {eligibility.allowedRoles.join(' & ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: INDUSTRY PROGRAMS, CERTIFICATIONS & HACKATHONS */}
      {(activeMainTab === 'all' || activeMainTab === 'industry-programs') && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Industry Training Programs, Certifications & Hackathons
            </h2>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
              Corporate Sprints & Challenges
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIndustryPrograms.map((prog) => {
              const isEnrolled = prog.enrolledUserIds?.includes(userId);
              const eligibility = checkEnrollmentEligibility(prog);
              const isHackathon = (prog.type || '').toLowerCase().includes('hackathon') || (prog.type || '').toLowerCase().includes('challenge');

              return (
                <div
                  key={prog.id}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-500/50 transition duration-200"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isHackathon ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' :
                        prog.type.includes('Corporate') ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' :
                        'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {prog.type}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        {prog.participantsCount || prog.enrolledUserIds?.length || 0} Registered
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {prog.title}
                    </h3>

                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {prog.company}
                    </p>

                    <div className="space-y-1 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{prog.timeline || prog.duration}</span>
                      </div>
                      {prog.prizePool && (
                        <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-400 font-bold">
                          <Gift className="w-3.5 h-3.5 shrink-0" />
                          <span>{prog.prizePool}</span>
                        </div>
                      )}
                    </div>

                    {/* Publisher Authorized Roles Pill List */}
                    <div className="p-2 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Publisher Authorized Roles:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {eligibility.allowedRoles.map((r, idx) => (
                          <span
                            key={idx}
                            className={`text-[9px] px-1.5 py-0.2 rounded font-bold capitalize ${
                              r === userRole
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 ring-1 ring-emerald-500'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {r} {r === userRole ? '✓' : ''}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {prog.description}
                    </p>

                    {prog.skillsCovered && (
                      <div className="pt-1 flex flex-wrap gap-1">
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

                  {/* Action Button configured strictly by publisher authorization */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    {isEnrolled ? (
                      <div className="w-full py-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>
                          {userRole === 'industry' ? 'Registered Industry Scout' : 
                           userRole === 'faculty' ? 'Registered Faculty Mentor' : 
                           'Registered & Verified Pass'}
                        </span>
                      </div>
                    ) : eligibility.eligible ? (
                      <button
                        onClick={() => enrollInProgram(prog.id)}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5 text-white ${
                          isHackathon 
                            ? 'bg-purple-600 hover:bg-purple-700' 
                            : 'bg-emerald-600 hover:bg-emerald-700'
                        }`}
                      >
                        <span>{getEnrollButtonText(prog)}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="w-full py-2 text-center text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Restricted for {eligibility.allowedRoles.join(' & ')} only</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
