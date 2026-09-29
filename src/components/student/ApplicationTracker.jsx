import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Star, 
  Building2, 
  ChevronRight, 
  FileText, 
  Plus, 
  FileCheck,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function ApplicationTracker() {
  const { applications, studentProfile, addToast, setSelectedVerificationItem } = useApp();
  const [selectedApp, setSelectedApp] = useState(applications.length > 0 ? applications[0] : null);
  const [newLogTopic, setNewLogTopic] = useState('');
  const [newLogHours, setNewLogHours] = useState('');
  const [showAddLogModal, setShowAddLogModal] = useState(false);

  const stages = ["Applied", "AI Matched", "Shortlisted", "Technical Interview", "Offer Issued", "Completed"];

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newLogTopic || !newLogHours) return;

    if (selectedApp) {
      const updatedLog = [
        ...(selectedApp.logbook || []),
        {
          week: (selectedApp.logbook?.length || 0) + 1,
          topic: newLogTopic,
          hours: Number(newLogHours),
          status: "Pending Mentor Review"
        }
      ];
      selectedApp.logbook = updatedLog;
      addToast("Logbook Entry Saved", `Submitted Week ${updatedLog.length} task for mentor approval.`, "success");
      setNewLogTopic('');
      setNewLogHours('');
      setShowAddLogModal(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Info */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              Live Recruitment & Internship ATS
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] mt-1">
            Application Tracker & Internship Logbook
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track real-time candidate progression, scheduled interview rounds, weekly logbook submissions, and mentor sign-offs.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-bold text-slate-700 dark:text-slate-300">
          <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            Total Applications: {applications.length}
          </span>
        </div>
      </div>

      {/* Main Grid: Application List + Detailed View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Applications List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Submitted Applications
          </h3>

          {applications.map((app) => {
            const isSelected = selectedApp?.id === app.id;
            return (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">{app.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {app.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {app.opportunityTitle}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {app.company}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800/80 mt-2">
                  <span>Applied: {app.appliedDate}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {app.matchScore}% Match
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Application Details & Logbook */}
        {selectedApp && (
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pipeline Progress */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {selectedApp.opportunityTitle}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedApp.company}</p>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  {selectedApp.status}
                </span>
              </div>

              {/* Multi-step Status Timeline */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Application Lifecycle Progress
                </span>
                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200 dark:before:bg-emerald-900">
                  {selectedApp.timeline?.map((step, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-sm"></span>
                      <div className="text-xs">
                        <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                          <span>{step.stage}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{step.date}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">{step.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor Feedback & Rating (if applicable) */}
              {selectedApp.mentorRating && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      Industry Mentor Evaluation: {selectedApp.mentorRating} / 5.0
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-200 dark:bg-amber-900 px-2 py-0.5 rounded">
                      Distinction
                    </span>
                  </div>
                  <p className="text-xs text-amber-800 dark:text-amber-300 italic leading-relaxed">
                    "{selectedApp.mentorFeedback}"
                  </p>
                </div>
              )}
            </div>

            {/* Weekly Internship Logbook Section */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
                    Internship Work Logbook & Hours
                  </h3>
                  <p className="text-xs text-slate-500">
                    Mandatory for academic credit transfer and final Ayush completion certification.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddLogModal(true)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Hours</span>
                </button>
              </div>

              {selectedApp.logbook && selectedApp.logbook.length > 0 ? (
                <div className="space-y-2">
                  {selectedApp.logbook.map((log, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          Week {log.week}: {log.topic}
                        </span>
                        <p className="text-[11px] text-slate-500">{log.hours} Practical Lab Hours logged</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs">
                  No log entries submitted yet. Click "+ Log Hours" to record your lab sessions.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Log Modal */}
      {showAddLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
              Submit Weekly Lab & Internship Log
            </h3>

            <form onSubmit={handleAddLog} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Topics / Tasks Completed:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Phytochemical solvent partitioning, HPLC validation"
                  value={newLogTopic}
                  onChange={(e) => setNewLogTopic(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Total Lab Hours:
                </label>
                <input
                  type="number"
                  required
                  placeholder="35"
                  value={newLogHours}
                  onChange={(e) => setNewLogHours(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddLogModal(false)}
                  className="px-3.5 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
