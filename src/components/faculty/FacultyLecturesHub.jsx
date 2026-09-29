import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Video, 
  Sparkles, 
  Calendar, 
  Clock, 
  Users, 
  Plus, 
  CheckCircle2, 
  Building2, 
  X, 
  Globe, 
  MessageSquare, 
  Award,
  Link as LinkIcon,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  CheckSquare,
  Square
} from 'lucide-react';

export default function FacultyLecturesHub() {
  const { facultyLectures, publishFacultyLecture, facultyProfile, registerForFacultyLecture, currentUser, addToast } = useApp();
  
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Expert Masterclass');
  const [allowedRoles, setAllowedRoles] = useState(['student', 'faculty']);
  const [dateTime, setDateTime] = useState('Oct 15, 2026 • 04:00 PM - 05:30 PM IST');
  const [format, setFormat] = useState('Live Interactive Broadcast & Smart Lab Demo');
  const [targetAudience, setTargetAudience] = useState('Students, Research Scholars & Industry R&D Teams');
  const [skillsCovered, setSkillsCovered] = useState('HPLC/GC-MS Profiling, Standardization, Pharmacopoeial Protocols');
  const [meetingLink, setMeetingLink] = useState('https://webex.ayush.gov.in/meet/dr-faculty-session');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    if (newCat.includes('Mentoring') || newCat.includes('Career')) {
      setAllowedRoles(['student']);
      setTargetAudience('Students & Scholars');
    } else if (newCat.includes('Webinar') || newCat.includes('Clinical')) {
      setAllowedRoles(['student', 'faculty', 'industry', 'institution']);
      setTargetAudience('Open to All Stakeholders');
    } else {
      setAllowedRoles(['student', 'faculty']);
      setTargetAudience('Students & Faculty');
    }
  };

  const toggleRole = (roleKey) => {
    if (allowedRoles.includes(roleKey)) {
      if (allowedRoles.length === 1) {
        addToast("Notice", "At least one role must be authorized for attendance.", "error");
        return;
      }
      setAllowedRoles(allowedRoles.filter(r => r !== roleKey));
    } else {
      setAllowedRoles([...allowedRoles, roleKey]);
    }
  };

  const handleCreateLecture = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsSubmitting(true);
    await publishFacultyLecture({
      title,
      category,
      allowedRoles,
      dateTime,
      format,
      targetAudience,
      skillsCovered: skillsCovered.split(',').map(s => s.trim()).filter(Boolean),
      meetingLink,
      description
    });
    setIsSubmitting(false);

    setShowModal(false);
    setTitle('');
    setDescription('');
  };

  const userId = currentUser ? currentUser.id : "FAC-1049";

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
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
              <Video className="w-3.5 h-3.5" />
              National Faculty Lecture & Mentorship Publishing Gateway
            </span>
            <span className="text-xs text-slate-500 font-medium">Publisher Role Controls Active</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] mt-1">
            Publish Expert Lectures, Masterclasses & Mentorship Clinics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Host live webcasts, clinical case reviews, and 1-on-1 mentorship office hours. <strong className="text-emerald-600 dark:text-emerald-400 font-bold">You can configure default role access or explicitly restrict attendance to specific groups.</strong>
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Host / Publish Lecture</span>
        </button>
      </div>

      {/* Grid of Published Lectures */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facultyLectures.map((lec) => {
          const isEnrolled = lec.enrolledUserIds?.includes(userId);

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

                {/* Authorized Roles badge */}
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Publisher Authorized Roles:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(lec.allowedRoles || ['student', 'faculty']).map((r, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 capitalize">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {lec.description}
                </p>

                {lec.skillsCovered && (
                  <div className="pt-2 flex flex-wrap gap-1">
                    {lec.skillsCovered.map((s, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <a
                  href={lec.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>Join Webex Link</span>
                </a>

                {isEnrolled ? (
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Registered
                  </span>
                ) : (
                  <button
                    onClick={() => registerForFacultyLecture(lec.id)}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-[11px] transition"
                  >
                    RSVP Seat
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Publish Modal with Role Selection Controls */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Broadcast with Role Access Controls
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
                  Publish Expert Lecture, Masterclass or Mentoring Session
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLecture} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Lecture / Masterclass Title *:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Chromatographic Deconvolution in Dravyaguna Research"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Category:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Expert Masterclass">Expert Masterclass</option>
                    <option value="Career Guidance & 1-on-1 Mentoring">Career Guidance & 1-on-1 Mentoring</option>
                    <option value="Clinical Research Webinar">Clinical Research Webinar</option>
                    <option value="Open Q&A Office Hours">Open Q&A Office Hours</option>
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
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Publisher Explicit Role Enrollment Configuration (The Upper Hand) */}
              <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    Authorized Roles for RSVP / Attendance (Publisher Override):
                  </span>
                  <span className="text-[10px] text-indigo-700 dark:text-indigo-400 font-semibold">Select all allowed</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Specify which personas can RSVP. Unselected roles will see the session marked as restricted to allowed target groups.
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
                            ? 'bg-indigo-100 border-indigo-400 dark:bg-indigo-900/60 dark:border-indigo-700 text-slate-900 dark:text-white font-bold'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-indigo-600 shrink-0" />
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
                    Date & Time *:
                  </label>
                  <input
                    type="text"
                    required
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Format:
                  </label>
                  <input
                    type="text"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Skills Covered (Comma-separated):
                </label>
                <input
                  type="text"
                  placeholder="Dravyaguna, HPLC/MS, Schedule T GMP, Pharmacopoeial Standards"
                  value={skillsCovered}
                  onChange={(e) => setSkillsCovered(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Meeting / Webex Join Link:
                </label>
                <input
                  type="url"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Lecture Syllabus & Learning Outcomes *:
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide an overview of the key concepts, practical demonstration, case studies, and Q&A interaction..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? "Publishing..." : "Broadcast with Configured Access"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
