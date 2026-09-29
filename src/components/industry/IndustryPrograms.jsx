import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Sparkles, 
  Award, 
  Calendar, 
  Users, 
  Plus, 
  CheckCircle2, 
  Building2, 
  X,
  Globe,
  Tag,
  Gift,
  ShieldCheck,
  CheckSquare,
  Square
} from 'lucide-react';

export default function IndustryPrograms() {
  const { industryPrograms, postIndustryProgram, industryProfile, addToast } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [progTitle, setProgTitle] = useState('');
  const [progType, setProgType] = useState('Certification Course');
  const [targetAudience, setTargetAudience] = useState('Students & Faculty');
  const [allowedRoles, setAllowedRoles] = useState(['student', 'faculty']); // Default for courses
  const [progDuration, setProgDuration] = useState('4 Weeks (Weekend Hybrid)');
  const [timeline, setTimeline] = useState('Oct 10 - Nov 05, 2026');
  const [eligibility, setEligibility] = useState('Open to all BAMS / M.Sc / M.Pharm / Ph.D Scholars & Faculty');
  const [skillsCovered, setSkillsCovered] = useState('Schedule T GMP, Supercritical Extraction, HPLC Fingerprinting');
  const [prizePool, setPrizePool] = useState('');
  const [progDescription, setProgDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-set default role suggestions when category changes, but allow publisher override
  const handleCategoryChange = (newCategory) => {
    setProgType(newCategory);
    if (newCategory.includes('Hackathon') || newCategory.includes('Challenge')) {
      setAllowedRoles(['student', 'faculty', 'industry']);
      setTargetAudience('Students, Faculty & Industry');
    } else if (newCategory.includes('Mentorship')) {
      setAllowedRoles(['student']);
      setTargetAudience('Students Only');
    } else {
      setAllowedRoles(['student', 'faculty']);
      setTargetAudience('Students & Faculty');
    }
  };

  const toggleRole = (roleKey) => {
    if (allowedRoles.includes(roleKey)) {
      if (allowedRoles.length === 1) {
        addToast("Notice", "At least one role must be authorized for enrollment.", "error");
        return;
      }
      setAllowedRoles(allowedRoles.filter(r => r !== roleKey));
    } else {
      setAllowedRoles([...allowedRoles, roleKey]);
    }
  };

  const handleCreateProgram = async (e) => {
    e.preventDefault();
    if (!progTitle || !progDescription) return;

    setIsSubmitting(true);
    await postIndustryProgram({
      title: progTitle,
      type: progType,
      targetAudience,
      allowedRoles,
      duration: progDuration,
      timeline,
      eligibility,
      skillsCovered: skillsCovered.split(',').map(s => s.trim()).filter(Boolean),
      prizePool: prizePool ? `₹${prizePool}` : null,
      description: progDescription,
      benefits: ["Verified Certificate co-signed by Corporate R&D", "Pre-Placement Offer (PPO) Fast-Track", "Direct Mentorship"]
    });
    setIsSubmitting(false);

    setShowModal(false);
    setProgTitle('');
    setProgDescription('');
    setPrizePool('');
  };

  const allAvailableRoles = [
    { key: 'student', label: '🎓 Students & Scholars' },
    { key: 'faculty', label: '👨‍🏫 Faculty / Academicians' },
    { key: 'industry', label: '🏢 Industry Partners & Scouts' },
    { key: 'institution', label: '🏛️ Institutions / TPOs' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              National Corporate Upskilling & Hackathon Gateway
            </span>
            <span className="text-xs text-slate-500 font-medium">Publisher Role Controls Active</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] mt-1">
            Industry Training Programs, Certifications & Hackathons
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish specialized skill bootcamps, certification modules, and innovation challenges. <strong className="text-emerald-600 dark:text-emerald-400 font-bold">You can configure default role access or explicitly restrict enrollment to specific target groups.</strong>
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Program</span>
        </button>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industryPrograms.map((prog) => (
          <div
            key={prog.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-500/50 transition duration-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  {prog.type}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  {prog.status || 'Active'}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {prog.title}
              </h3>

              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {prog.company}
              </p>

              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Timeline: {prog.timeline || prog.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Enrolled Candidates: <strong className="text-slate-800 dark:text-slate-200">{prog.participantsCount || prog.enrolledUserIds?.length || 0}</strong></span>
                </div>
                {prog.prizePool && (
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                    <Gift className="w-3.5 h-3.5" />
                    <span>{prog.prizePool}</span>
                  </div>
                )}
              </div>

              {/* Authorized Roles badge */}
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Publisher Authorized Roles:
                </span>
                <div className="flex flex-wrap gap-1">
                  {(prog.allowedRoles || ['student', 'faculty']).map((r, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 capitalize">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                {prog.description}
              </p>

              {prog.skillsCovered && (
                <div className="pt-2 flex flex-wrap gap-1">
                  {prog.skillsCovered.map((s, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <Globe className="w-3 h-3" /> Broadcast Active
              </span>
              <span className="font-bold text-amber-600 dark:text-amber-400 cursor-pointer">
                {prog.enrolledUserIds?.length || 0} Enrolled ↗
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Publish Modal with Role Selection Controls */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Broadcast with Role Access Controls
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
                  Publish Training Program, Certification, or Hackathon
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProgram} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Program / Hackathon Title *:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Supercritical CO2 Extraction & Standardization Certification"
                  value={progTitle}
                  onChange={(e) => setProgTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Program Category:
                  </label>
                  <select
                    value={progType}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Certification Course">Industry Certification Course</option>
                    <option value="Innovation Challenge / Hackathon">Innovation Challenge / Hackathon</option>
                    <option value="Corporate Training & FDP">Corporate Training & Faculty FDP</option>
                    <option value="Mentorship Initiative">Mentorship Cohort</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Target Audience Description:
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Publisher Explicit Role Enrollment Configuration (The Upper Hand) */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Authorized Roles for Enrollment (Publisher Override):
                  </span>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">Select all allowed</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Specify precisely which personas are allowed to enroll in this offering. Unselected roles will see the program as restricted.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {allAvailableRoles.map((role) => {
                    const isChecked = allowedRoles.includes(role.key);
                    return (
                      <div
                        key={role.key}
                        onClick={() => toggleRole(role.key)}
                        className={`p-2 rounded-lg border cursor-pointer flex items-center space-x-2 transition ${
                          isChecked
                            ? 'bg-amber-100 border-amber-400 dark:bg-amber-900/60 dark:border-amber-700 text-slate-900 dark:text-white font-bold'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-amber-600 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span className="text-xs">{role.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Duration & Format:
                  </label>
                  <input
                    type="text"
                    value={progDuration}
                    onChange={(e) => setProgDuration(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Dates / Timeline:
                  </label>
                  <input
                    type="text"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Skills Covered (Comma-separated):
                </label>
                <input
                  type="text"
                  placeholder="HPLC/GC-MS, GCP Clinical Protocols, Schedule T GMP, In-Silico Docking"
                  value={skillsCovered}
                  onChange={(e) => setSkillsCovered(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Cash Grants / Prize Pool (Optional for Hackathons):
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5,00,000 Cash Grants + Incubation"
                  value={prizePool}
                  onChange={(e) => setPrizePool(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Program Overview & Syllabus *:
                </label>
                <textarea
                  rows={3}
                  required
                  value={progDescription}
                  onChange={(e) => setProgDescription(e.target.value)}
                  placeholder="Describe the modules, laboratory access, mentorship format, and certificate issuance..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? "Publishing..." : "Publish with Configured Access"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
