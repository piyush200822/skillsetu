import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FlaskConical, 
  FileCheck2, 
  DollarSign, 
  Plus, 
  CheckCircle2, 
  X, 
  Building2, 
  Sparkles,
  ArrowRight,
  Handshake
} from 'lucide-react';

export default function ResearchRfpHub() {
  const { collaborations, postCollaboration, facultyProfile, addToast } = useApp();
  const [showNewRfpModal, setShowNewRfpModal] = useState(false);
  const [rfpTitle, setRfpTitle] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [rfpBudget, setRfpBudget] = useState('');
  const [rfpDuration, setRfpDuration] = useState('12 Months');
  const [rfpDescription, setRfpDescription] = useState('');

  const handleCreateRfp = (e) => {
    e.preventDefault();
    if (!rfpTitle || !partnerName) return;

    postCollaboration({
      title: rfpTitle,
      industryPartner: partnerName,
      facultyLead: `${facultyProfile.name} (${facultyProfile.institute})`,
      budget: rfpBudget ? `₹${rfpBudget}` : "₹25,00,000",
      duration: rfpDuration,
      type: "Collaborative Research",
      description: rfpDescription
    });

    setShowNewRfpModal(false);
    setRfpTitle('');
    setPartnerName('');
    setRfpBudget('');
    setRfpDescription('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Info */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
              <Handshake className="w-3.5 h-3.5" />
              Industry-Academia R&D & MoU Exchange
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] mt-1">
            Joint Research Proposals, MoUs & Faculty Consultancy
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Facilitating industry-sponsored research grants, formulation technology transfer, and expert faculty advisory retainers.
          </p>
        </div>

        <button
          onClick={() => setShowNewRfpModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Joint R&D Proposal</span>
        </button>
      </div>

      {/* Active Research Collaborations List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
          Active Joint Grants & MoUs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collaborations.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">{item.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {item.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  Partner: {item.industryPartner || item.client || item.organizer}
                </p>

                {item.budget && (
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 pt-1">
                    Grant / Remuneration: {item.budget || item.remuneration} ({item.duration})
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Type: <strong className="text-slate-700 dark:text-slate-300">{item.type}</strong></span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">View MoU Terms ↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Joint RFP Modal */}
      {showNewRfpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
                Submit Joint R&D / Consultancy Proposal
              </h3>
              <button
                onClick={() => setShowNewRfpModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRfp} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Research Project / Consultancy Title:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Standardizing Nano-Polyherbal Formulations for Cognitive Health"
                  value={rfpTitle}
                  onChange={(e) => setRfpTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target Industry Partner / Recruiter:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Himalaya Wellness R&D / Dabur / Baidyanath"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Proposed Grant / Budget (INR):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 35,00,000"
                    value={rfpBudget}
                    onChange={(e) => setRfpBudget(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Project Duration:
                  </label>
                  <select
                    value={rfpDuration}
                    onChange={(e) => setRfpDuration(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="6 Months">6 Months</option>
                    <option value="12 Months">12 Months</option>
                    <option value="18 Months">18 Months</option>
                    <option value="24 Months">24 Months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Scope of Translational Work & Deliverables:
                </label>
                <textarea
                  rows={3}
                  value={rfpDescription}
                  onChange={(e) => setRfpDescription(e.target.value)}
                  placeholder="Outline lab analytical markers, in-vitro assays, clinical validation and student involvement..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewRfpModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow"
                >
                  Submit for Joint Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
