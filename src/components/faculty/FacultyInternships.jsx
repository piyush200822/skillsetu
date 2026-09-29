import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ArrowUpRight, 
  Clock, 
  Sparkles, 
  FileText 
} from 'lucide-react';

export default function FacultyInternships() {
  const { addToast } = useApp();
  const [appliedSabbaticals, setAppliedSabbaticals] = useState([]);

  const sabbaticals = [
    {
      id: "SABB-01",
      title: "Faculty Industrial Sabbatical & Advanced Standardization Training",
      company: "Zandu Care (Emami Group R&D)",
      location: "Vapi, Gujarat / Kolkata",
      duration: "2 Months (Summer Break)",
      fellowship: "₹75,000 / month + Travel & Stay",
      eligibility: "Permanent / Contract Faculty of recognized Ayush / Pharmacy Institutes",
      description: "Designed specifically for academicians to gain hands-on commercial plant exposure, automated granulation, and pilot-scale supercritical extraction to modernize institutional curriculum.",
      highlights: [
        "Hands-on work on 500L automated extraction reactors",
        "Curriculum modernization consultation with AIIA & NCISM",
        "Joint patent co-authorship opportunity"
      ]
    },
    {
      id: "SABB-02",
      title: "Phytopharmaceutical Analytical Chromatography Residency",
      company: "Waters India & Dabur R&D",
      location: "Bengaluru, Karnataka",
      duration: "6 Weeks",
      fellowship: "National Research Fellowship Scheme",
      eligibility: "Associate Professors / Assistant Professors in Dravyaguna or Rasashastra",
      description: "High-end training on UPLC-MS/MS triple quadrupole quantification of toxic pesticides, mycotoxins, and heavy metal speciation.",
      highlights: [
        "Complete instrument calibration and GLP compliance protocols",
        "Standard operating procedure (SOP) formulation for institutional labs"
      ]
    },
    {
      id: "SABB-03",
      title: "Ayush Clinical Trial Management & Pharmacovigilance Sabbatical",
      company: "Himalaya Wellness Clinical Operations",
      location: "Bengaluru, Karnataka",
      duration: "1 Month (Modular Hybrid)",
      fellowship: "₹50,000 Honorarium",
      eligibility: "Faculty with MD / MS (Ayurveda) teaching Kayachikitsa or Shalya Tantra",
      description: "Participate in real-time GCP multi-centre clinical trial audits, electronic data capture (EDC), and ADR causality assessment under the National Pharmacovigilance Program.",
      highlights: [
        "GCP Certified Clinical Investigator Accreditation",
        "Establishment of Pharmacovigilance satellite centres at home institute"
      ]
    }
  ];

  const handleApply = (id, title) => {
    setAppliedSabbaticals(prev => [...prev, id]);
    addToast("Sabbatical Application Dispatched", `Nomination for "${title}" submitted to AIIA Directorate and Host Industry.`, "success");
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
            Faculty Industry Sabbatical Gateway
          </span>
          <span className="text-xs text-slate-500 font-medium">National Research Scheme</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
          Industrial Training & Sabbaticals for Academicians
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Enabling professors and researchers to acquire direct corporate and pilot-plant exposure, bridging theoretical teaching with current industry benchmarks.
        </p>
      </div>

      {/* Sabbatical Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sabbaticals.map((sab) => {
          const isApplied = appliedSabbaticals.includes(sab.id);

          return (
            <div
              key={sab.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    Industrial Sabbatical
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {sab.fellowship}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {sab.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {sab.company}
                  </p>
                </div>

                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{sab.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{sab.duration}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {sab.description}
                </p>

                <div className="space-y-1 pt-2">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Program Outcomes:</span>
                  <ul className="space-y-1">
                    {sab.highlights.map((h, i) => (
                      <li key={i} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                {isApplied ? (
                  <div className="w-full py-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Nomination Dispatched
                  </div>
                ) : (
                  <button
                    onClick={() => handleApply(sab.id, sab.title)}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Submit Sabbatical Nomination</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
