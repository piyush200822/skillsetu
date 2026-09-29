import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  ClipboardCheck,
  Compass,
  Briefcase,
  Layers,
  Award,
  Users,
  BookOpen,
  FlaskConical,
  FileSpreadsheet,
  TrendingUp,
  PlusCircle,
  ShieldCheck,
  Building2,
  FileCheck2,
  Sparkles,
  UserPlus,
  Network,
  Video,
  ArrowLeftCircle,
  Eye,
  Sliders,
  UserCheck
} from 'lucide-react';

export default function Sidebar() {
  const { 
    currentUser,
    effectiveRoleView, 
    activeTab, 
    setActiveTab, 
    studentProfile, 
    opportunities, 
    applications, 
    industryPrograms,
    facultyLectures,
    usersList,
    switchAdminView
  } = useApp();

  const isAdmin = currentUser?.role === 'admin';
  const isInspectingAnotherRole = isAdmin && effectiveRoleView !== 'admin';

  const getMenuItems = () => {
    switch (effectiveRoleView) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
          { id: 'profile-manager', label: 'My Skills & Profile', icon: Sliders, badge: 'New' },
          { id: 'assessment', label: 'Skill Assessment', icon: ClipboardCheck, badge: 'Diagnostic' },
          { id: 'skill-gap', label: 'Skill Gap & AI Roadmap', icon: Compass, badge: 'AI' },
          { id: 'opportunities', label: 'Internships & Jobs', icon: Briefcase, badge: `${opportunities.length}` },
          { id: 'applications', label: 'Application Tracker', icon: Layers, badge: `${applications.length}` },
          { id: 'portfolio', label: 'Verifiable Portfolio', icon: Award, badge: 'Verified' },
          { id: 'collaboration', label: 'Hackathons & Lectures', icon: Users, badge: `${(industryPrograms?.length || 0) + (facultyLectures?.length || 0)}` },
        ];
      case 'faculty':
        return [
          { id: 'dashboard', label: 'Faculty Overview', icon: LayoutDashboard, badge: null },
          { id: 'expert-lectures', label: 'Publish Lectures & Mentoring', icon: Video, badge: 'Publish' },
          { id: 'faculty-internships', label: 'Industrial Sabbaticals', icon: Building2, badge: 'Sponsored' },
          { id: 'fdp-programs', label: 'FDPs & Training', icon: BookOpen, badge: 'National' },
          { id: 'research-rfp', label: 'Joint R&D & Consultancy', icon: FlaskConical, badge: 'Active' },
          { id: 'mentorship', label: 'Student Mentoring & Logs', icon: Users, badge: '22 Students' },
          { id: 'collaboration', label: 'National Exchange Hub', icon: Network, badge: null },
        ];
      case 'industry':
        return [
          { id: 'dashboard', label: 'Recruiter Dashboard', icon: LayoutDashboard, badge: null },
          { id: 'post-opportunity', label: 'Post Opportunity', icon: PlusCircle, badge: 'New' },
          { id: 'candidate-matcher', label: 'AI Candidate Matcher', icon: Sparkles, badge: 'AI ATS' },
          { id: 'industry-programs', label: 'Learning Programs & FDPs', icon: BookOpen, badge: 'Publish' },
          { id: 'evaluations', label: 'Intern Feedback & Rating', icon: ClipboardCheck, badge: null },
          { id: 'collaboration', label: 'National Challenges', icon: Users, badge: null },
        ];
      case 'institution':
        return [
          { id: 'dashboard', label: 'Institutional Readiness', icon: LayoutDashboard, badge: 'Live KPI' },
          { id: 'skill-trends', label: 'Skill Demand Heatmap', icon: TrendingUp, badge: 'Ayush YoY' },
          { id: 'mous', label: 'MoU & Partnership Hub', icon: FileCheck2, badge: '142 Active' },
          { id: 'compliance-export', label: 'NAAC / NIRF Reports', icon: FileSpreadsheet, badge: 'Export' },
          { id: 'collaboration', label: 'Innovation Ecosystem', icon: Network, badge: null },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Directorate Overview', icon: LayoutDashboard, badge: 'Admin' },
          { id: 'user-management', label: 'User Provisioning Hub', icon: UserPlus, badge: `${usersList.length}` },
          { id: 'skill-trends', label: 'Industry Skill Trends', icon: TrendingUp, badge: 'Market' },
          { id: 'mous', label: 'MoUs & Collaborations', icon: FileCheck2, badge: 'Oversight' },
          { id: 'compliance-export', label: 'Accreditation Reports', icon: FileSpreadsheet, badge: 'NAAC/NIRF' },
          { id: 'collaboration', label: 'National Challenges', icon: Network, badge: null },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 shrink-0 hidden md:block bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <div className="space-y-5">
        {/* Role Header Banner */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {isInspectingAnotherRole ? 'Inspecting View' : 'Active Portal'}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              effectiveRoleView === 'student' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
              effectiveRoleView === 'faculty' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' :
              effectiveRoleView === 'industry' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
              effectiveRoleView === 'institution' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' :
              'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
            }`}>
              {effectiveRoleView.toUpperCase()}
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
            {effectiveRoleView === 'student' && 'Student Career & Skill Hub'}
            {effectiveRoleView === 'faculty' && 'Faculty Research & Mentorship'}
            {effectiveRoleView === 'industry' && 'Corporate Talent & R&D Hub'}
            {effectiveRoleView === 'institution' && 'AIIA Placement & Analytics'}
            {effectiveRoleView === 'admin' && 'National Administration Console'}
          </p>
        </div>

        {/* Quick Return button for Admin inspecting another role */}
        {isInspectingAnotherRole && (
          <button
            onClick={() => switchAdminView('admin')}
            className="w-full py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <ArrowLeftCircle className="w-3.5 h-3.5" />
            <span>Exit to Admin Console</span>
          </button>
        )}

        {/* Navigation List */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status Card */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        {effectiveRoleView === 'student' && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Skill Readiness
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{studentProfile.skillScore}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${studentProfile.skillScore}%` }}
              ></div>
            </div>
          </div>
        )}

        {effectiveRoleView === 'admin' && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 text-xs">
            <p className="font-bold text-red-900 dark:text-red-300">National Governance</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {usersList.length} verified accounts provisioned across 5 roles.
            </p>
          </div>
        )}

        {effectiveRoleView === 'faculty' && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 text-xs">
            <p className="font-bold text-indigo-900 dark:text-indigo-300">Mentorship & Lectures</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {facultyLectures.length} live sessions published for scholars.
            </p>
          </div>
        )}

        {effectiveRoleView === 'industry' && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 text-xs">
            <p className="font-bold text-amber-900 dark:text-amber-300">AIIA Talent Pool</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Verified BAMS & M.Sc scholars available.
            </p>
          </div>
        )}

        {effectiveRoleView === 'institution' && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 text-xs">
            <p className="font-bold text-purple-900 dark:text-purple-300">NIRF 2026 Audit</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Placement score at 94.8%.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
