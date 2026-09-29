import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileCheck2, 
  Building2, 
  Calendar, 
  Users, 
  Award, 
  Plus, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function MouManager() {
  const { addToast } = useApp();

  const [mous, setMous] = useState([
    {
      id: "MOU-AIIA-2024-01",
      partner: "Dabur Research & Development Foundation",
      signedDate: "2024-03-15",
      validUntil: "2029-03-14",
      status: "Active (Year 3 of 5)",
      scope: "Student Internships, Pilot-Scale Formulation Standardisation, Joint Patents",
      internsPlaced: 145,
      jointPublications: 8,
      leadOfficer: "Dr. Vikramaditya Nair & Dr. Sunita Varma"
    },
    {
      id: "MOU-AIIA-2025-04",
      partner: "Himalaya Wellness Company",
      signedDate: "2025-01-10",
      validUntil: "2028-01-09",
      status: "Active (Year 2 of 3)",
      scope: "Multicentric Ayush Clinical Trials, GCP Training, Pharmacovigilance Monitoring",
      internsPlaced: 92,
      jointPublications: 4,
      leadOfficer: "Director of Clinical Operations & Dean AIIA"
    },
    {
      id: "MOU-AIIA-2025-09",
      partner: "Waters India Pvt. Ltd.",
      signedDate: "2025-08-20",
      validUntil: "2030-08-19",
      status: "Active (Year 2 of 5)",
      scope: "Centre of Excellence in Phytochemical LC-MS/MS, Faculty FDP Sponsorship",
      internsPlaced: 40,
      jointPublications: 6,
      leadOfficer: "Waters Chief Chromatographer & Head of Dravyaguna"
    }
  ]);

  const handleRenew = (id, partner) => {
    addToast("MoU Renewal Initiated", `Formal renewal dispatch sent to legal board for ${partner}.`, "success");
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center gap-1">
              <FileCheck2 className="w-3.5 h-3.5" />
              Corporate Partnerships & MoUs Hub
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] mt-1">
            Institutional Memorandums of Understanding (MoUs)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track contractual commitments, student hiring quotas, joint research deliverables, and intellectual property terms.
          </p>
        </div>

        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
          Total Active MoUs: <strong className="text-purple-600 dark:text-purple-400">{mous.length} Partnerships</strong>
        </div>
      </div>

      {/* MoU Cards List */}
      <div className="space-y-4">
        {mous.map((mou) => (
          <div
            key={mou.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-400 font-mono">{mou.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {mou.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {mou.partner}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleRenew(mou.id, mou.partner)}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  Initiate Extension
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
              <div className="space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300">Scope of Collaboration:</span>
                <p>{mou.scope}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300">Agreement Timeline:</span>
                <p>Signed: {mou.signedDate} • Valid Until: {mou.validUntil}</p>
                <p className="text-[11px] text-slate-500">Coordinators: {mou.leadOfficer}</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span>Scholars Hosted:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">{mou.internsPlaced} Interns</strong>
                </div>
                <div className="flex justify-between">
                  <span>Joint Patents / Papers:</span>
                  <strong className="text-purple-600 dark:text-purple-400">{mou.jointPublications} Published</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
