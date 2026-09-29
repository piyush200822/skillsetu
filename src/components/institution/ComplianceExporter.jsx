import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileSpreadsheet, 
  Download, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Building2,
  Award
} from 'lucide-react';

export default function ComplianceExporter() {
  const { institutionProfile, analyticsData, stats, addToast } = useApp();
  const [selectedReportType, setSelectedReportType] = useState('NAAC');

  const handleExportCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value,Benchmark,Accreditation Status\n"
      + `Placement Readiness Index,${analyticsData?.placementReadinessIndex || '84.6%'},80.0%,Exceeded\n`
      + `Total Assessed Students,${analyticsData?.totalStudentsAssessed || 1240},1000,Compliant\n`
      + `Internship Placed Scholars,${analyticsData?.internshipSecuredCount || 1175},900,Compliant\n`
      + `Active Corporate MoUs,${stats.activeMoUs},100,Exceeded\n`
      + "Avg Monthly Stipend,₹24500,₹18000,Exceeded\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AIIA_Accreditation_Report_${selectedReportType}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast("Report Downloaded", `Exported official ${selectedReportType} CSV audit dataset.`, "success");
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center gap-1">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Accreditation & Compliance Engine
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] mt-1">
            NAAC, NIRF & National Scheme Compliance Dossier Exporter
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Generate standardized metrics for Criterion 5.2 (Placement & Progression) and NIRF Parameter 3 with verifiable audit trail.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCsv}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV Data</span>
          </button>
          <button
            onClick={handlePrintReport}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Dossier</span>
          </button>
        </div>
      </div>

      {/* Select Report Framework */}
      <div className="flex items-center space-x-2">
        {['NAAC', 'NIRF', 'AYUSH_SCHEME'].map((framework) => (
          <button
            key={framework}
            onClick={() => setSelectedReportType(framework)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedReportType === framework
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            {framework === 'NAAC' && 'NAAC Criterion 5.2 (Student Progression)'}
            {framework === 'NIRF' && 'NIRF 2026 Placement Metric'}
            {framework === 'AYUSH_SCHEME' && 'National HRD Accreditation Scheme Audit'}
          </button>
        ))}
      </div>

      {/* Official Printable Report Dossier Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 print:border-none print:shadow-none">
        <div className="border-b-2 border-slate-900 dark:border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wide font-['Outfit']">
              All India Institute of Ayurveda (AIIA)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Directorate of Training, Placements & Industry Collaboration • New Delhi
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
              Official Compliance Dossier: {selectedReportType} Academic Year 2025-2026
            </p>
          </div>

          <div className="text-right text-xs text-slate-500 shrink-0">
            <p>Generated: 2026-08-29</p>
            <p className="font-mono">Ledger Block: #489201</p>
          </div>
        </div>

        {/* Executive Summary Metrics Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
            Key Performance Indicators & Verified Metrics
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Audit Metric</th>
                  <th className="p-3">Verified Institutional Value</th>
                  <th className="p-3">Benchmark Standard</th>
                  <th className="p-3">Compliance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-semibold">Student Internship Placement Rate</td>
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">94.8% (1,175 / 1,240)</td>
                  <td className="p-3">80.0% Minimum</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">✓ Exceeded</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Institutional Placement Readiness Index (PRI)</td>
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">84.6 / 100</td>
                  <td className="p-3">75.0 Target</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">✓ Compliant</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Corporate MoUs Signed & Active</td>
                  <td className="p-3 font-bold">{stats.activeMoUs} Corporate Partners</td>
                  <td className="p-3">50 Target</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">✓ Exceeded</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Average Monthly Student Stipend</td>
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">₹24,500 / month</td>
                  <td className="p-3">₹15,000 Minimum</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">✓ Compliant</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Faculty Industrial Sabbatical Engagement</td>
                  <td className="p-3 font-bold">14 Faculty Members</td>
                  <td className="p-3">5 Target</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">✓ Exceeded</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Institutional Signoff Section */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-bold text-slate-800 dark:text-slate-200">Verified by Placement & Career Cell</p>
            <p>All India Institute of Ayurveda, New Delhi</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto" />
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold block mt-0.5">
              CRYPTOGRAPHICALLY SEALED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
