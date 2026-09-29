import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  Compass, 
  BarChart2 
} from 'lucide-react';

export default function SkillDemandHeatmap() {
  const { analyticsData } = useApp();

  const demandTrends = analyticsData?.skillDemandTrends || [
    { skill: "Phytochemical Chromatography (HPLC/MS)", demandScore: 96, growth: "+28% YoY" },
    { skill: "Ayush GCP Clinical Trial Operations", demandScore: 91, growth: "+34% YoY" },
    { skill: "AI Molecular Docking & In-silico Targetting", demandScore: 89, growth: "+62% YoY" },
    { skill: "Ayush Standard & Premium Mark Compliance", demandScore: 84, growth: "+19% YoY" },
    { skill: "Formulation Stability Testing (ICH Q1A)", demandScore: 80, growth: "+15% YoY" },
    { skill: "Biostatistics & R in Ayush Trials", demandScore: 78, growth: "+45% YoY" },
    { skill: "Untargeted Metabolomics Fingerprinting", demandScore: 74, growth: "+51% YoY" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Info */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            AI Market Skill Demand Heatmap
          </span>
          <span className="text-xs text-slate-500 font-medium">Updated Weekly from 480+ Job Feeds</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
          Industry Competency Demand & Emerging Ayush Trends
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Provides academic curriculum committees and Deans with real-time empirical data on rapidly emerging skills in the pharma and healthtech sectors.
        </p>
      </div>

      {/* Demand Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demandTrends.map((trend, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> {trend.growth}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Demand: {trend.demandScore}/100
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {trend.skill}
              </h3>

              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full"
                  style={{ width: `${trend.demandScore}%` }}
                ></div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span>Hiring Surge Index</span>
              <span className="font-semibold text-purple-600 dark:text-purple-400">Very High</span>
            </div>
          </div>
        ))}
      </div>

      {/* Curriculum Recommendations Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 via-emerald-500/5 to-transparent border border-purple-500/20 space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
            AI Recommendations for Institutional Board of Studies (BoS)
          </h3>
        </div>

        <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <li className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2">
            <span className="text-emerald-600 font-bold">1.</span>
            <span><strong>Integrate AutoDock & PyMOL into Dravyaguna Post-Graduate Labs:</strong> Demand for In-Silico screening candidates has grown 62% this cycle among major Ayurvedic FMCG & Pharma recruiters.</span>
          </li>
          <li className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2">
            <span className="text-emerald-600 font-bold">2.</span>
            <span><strong>Mandatory 30-Hour Ayush Schedule T & ICH Q1A Certification:</strong> Over 85% of corporate job postings list Ayush Premium Mark audit compliance as a preferred hiring filter.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
