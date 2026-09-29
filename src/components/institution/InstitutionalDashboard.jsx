import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  Landmark, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Award, 
  FileSpreadsheet, 
  CheckCircle2, 
  Sparkles, 
  Download,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function InstitutionalDashboard() {
  const { institutionProfile, analyticsData, stats, setActiveTab } = useApp();

  const data = analyticsData || {
    placementReadinessIndex: 84.6,
    totalStudentsAssessed: 1240,
    internshipSecuredCount: 1175,
    averageStipend: "₹24,500 / mo",
    topHiringPartners: [
      { name: "Dabur R&D", count: 86, rating: 4.9 },
      { name: "Himalaya Wellness", count: 74, rating: 4.8 },
      { name: "Patanjali Research", count: 68, rating: 4.7 },
      { name: "Baidyanath", count: 52, rating: 4.6 },
      { name: "Charak Pharma", count: 44, rating: 4.8 }
    ],
    departmentReadiness: [
      { department: "Dravyaguna (Phytopharmacy)", readiness: 92, gap: "AI Cheminformatics" },
      { department: "Rasashastra (Bhasma Tech)", readiness: 88, gap: "ICP-MS Automation" },
      { department: "Kayachikitsa (Clinical)", readiness: 85, gap: "Biostatistics & R" },
      { department: "Panchakarma Tech", readiness: 90, gap: "Digital Patient Monitoring" },
      { department: "Ayur-Biotech & Genomics", readiness: 81, gap: "GLP/GMP Auditing" }
    ],
    monthlyPlacementTrend: [
      { month: "Jan", internships: 45, placements: 28 },
      { month: "Feb", internships: 72, placements: 45 },
      { month: "Mar", internships: 110, placements: 80 },
      { month: "Apr", internships: 165, placements: 120 },
      { month: "May", internships: 220, placements: 185 },
      { month: "Jun", internships: 310, placements: 260 },
      { month: "Jul", internships: 280, placements: 240 },
      { month: "Aug", internships: 190, placements: 160 }
    ]
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Hero Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-semibold">
              <Landmark className="w-3.5 h-3.5" />
              <span>AIIA Institutional Placement & Accreditation Directorate</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-['Outfit']">
              {institutionProfile.name}
            </h1>
            <p className="text-xs text-purple-100 font-medium">
              Accreditation Status: <strong className="text-emerald-300 font-bold">{institutionProfile.accreditationScore}</strong>
            </p>
            <p className="text-xs text-slate-300">
              Admin Head: {institutionProfile.adminName} ({institutionProfile.email})
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('compliance-export')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export NAAC/NIRF Report</span>
            </button>
            <button
              onClick={() => setActiveTab('skill-trends')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <TrendingUp className="w-4 h-4 text-emerald-300" />
              <span>Skill Demand Heatmap</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {data.placementReadinessIndex}%
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Institutional PRI Score</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {data.internshipSecuredCount} / {data.totalStudentsAssessed}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Internship Placed (94.8%)</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {data.averageStipend}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Average Industry Stipend</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {stats.activeMoUs} Active
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Corporate MoUs Signed</p>
          </div>
        </div>
      </div>

      {/* Grid: Placement Growth Chart + Department Readiness Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Monthly Placement & Internship Trend Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
              2026 Monthly Internship & Placement Trajectory
            </h3>
            <div className="flex items-center space-x-3 text-[11px] font-medium">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Internships
              </span>
              <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Final Placements
              </span>
            </div>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.monthlyPlacementTrend}>
                <defs>
                  <linearGradient id="colorIntern" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPlace" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="internships" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIntern)" />
                <Area type="monotone" dataKey="placements" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorPlace)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 5 Cols: Department Readiness Scores */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
              Department Placement Readiness
            </h3>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Avg: 87.2%
            </span>
          </div>

          <div className="space-y-3">
            {data.departmentReadiness.map((dept, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{dept.department}</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{dept.readiness}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${dept.readiness}%` }}
                  ></div>
                </div>
                <div className="text-[10px] text-slate-500">
                  Identified Priority Gap: <span className="text-amber-600 font-semibold">{dept.gap}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Recruiting Partners Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] flex items-center gap-2">
            <Building2 className="w-4 h-4 text-purple-600" />
            Premier Industry Recruiting Partners & Volume
          </h3>
          <span className="text-xs font-semibold text-slate-500">480 Total Corporate Affiliates</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {data.topHiringPartners.map((partner, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-center space-y-1"
            >
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{partner.name}</h4>
              <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">{partner.count} Hires</p>
              <p className="text-[10px] text-slate-500">⭐ {partner.rating} / 5.0 Recruiter Score</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
