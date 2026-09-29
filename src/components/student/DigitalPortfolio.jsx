import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  ShieldCheck, 
  Download, 
  Share2, 
  ExternalLink, 
  CheckCircle2, 
  BookOpen, 
  QrCode, 
  Sparkles,
  FileBadge,
  Lock,
  Globe,
  Github,
  Mail,
  GraduationCap,
  Sliders,
  Edit3
} from 'lucide-react';

export default function DigitalPortfolio() {
  const { studentProfile, setSelectedVerificationItem, addToast, setActiveTab } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSharePortfolio = () => {
    navigator.clipboard.writeText(`https://skillbridge.ayush.gov.in/portfolio/${studentProfile.id}`);
    setCopiedLink(true);
    addToast("Public Portfolio Link Copied", "Share this tamper-proof link with recruiters and evaluators.", "info");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner with Share, Edit, and Download actions */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Student Digital Portfolio
            </span>
            <span className="text-xs text-slate-500 font-mono">ID: {studentProfile.id}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] mt-1">
            Dynamic Cryptographic Portfolio & Resume
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveTab('profile-manager')}
            className="px-3.5 py-2 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition flex items-center gap-1.5 shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Manage Skills & Certs</span>
          </button>

          <button
            onClick={handleSharePortfolio}
            className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition flex items-center gap-1.5 shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>{copiedLink ? "Link Copied!" : "Share Public Link"}</span>
          </button>

          <button
            onClick={handlePrintResume}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export Verified Resume</span>
          </button>
        </div>
      </div>

      {/* Main Resume Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden print:shadow-none print:border-none">
        {/* Profile Header Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <img
              src={studentProfile.avatar}
              alt={studentProfile.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-emerald-400/40 shadow-xl shrink-0"
            />
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-bold font-['Outfit'] text-white">
                  {studentProfile.name}
                </h2>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-extrabold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> AIIA Certified Scholar
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                {studentProfile.institute}
              </p>
              <p className="text-xs text-emerald-200/80">
                Department: <strong>{studentProfile.department}</strong> • {studentProfile.year}
              </p>
              <p className="text-xs text-slate-300 max-w-2xl pt-1 italic">
                "{studentProfile.bio}"
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-emerald-200">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> {studentProfile.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> CGPA: {studentProfile.cgpa}
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> ORCID: {studentProfile.orcidId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Section 1: Verified Credentials & Blockchain Seal */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2 font-['Outfit']">
                <Award className="w-4 h-4 text-emerald-600" />
                Verified Ayush & Life Sciences Certifications
              </h3>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                Anchored to Gov Digital Ledger
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {studentProfile.verifiedCertifications.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedVerificationItem(cert)}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500 cursor-pointer transition flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {cert.issuedDate}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Verified Proof ↗
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-2 leading-snug">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 truncate border-t border-slate-200/60 dark:border-slate-700/60 pt-2">
                    Hash: {cert.hash}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Verified Technical & Analytical Skills */}
          <div className="space-y-3">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2 font-['Outfit']">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Validated Competency Matrix
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {studentProfile.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {skill.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{skill.level}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{skill.score}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Publications, Patents & Live Projects */}
          <div className="space-y-3">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2 font-['Outfit']">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                Selected Research Publications & Live Industry Projects
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                    "HPTLC Bioautography and Free Radical Scavenging Assays of Polyherbal Formulations in Metabolic Syndrome"
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Journal of Ayurveda & Integrative Medicine (JAIM) • 2026</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Co-authored with Dr. Sunita Varma (AIIA). Identified novel anti-glycation markers using automated scanning densitometry.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                    "In-Silico Binding Assessment of Withanolides against Pro-Inflammatory Cytokines"
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">CCRAS National Ayush Innovation Challenge • 2025</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Second Prize Winner at National level. PyMOL 3D models and AutoDock binding simulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
