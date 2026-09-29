import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Building2, 
  UserCheck, 
  Landmark, 
  ShieldCheck, 
  Bell, 
  Sun, 
  Moon, 
  LogOut, 
  ChevronDown,
  Sparkles,
  Eye,
  ArrowLeftCircle
} from 'lucide-react';

export default function Header() {
  const { 
    currentUser, 
    currentRole, 
    effectiveRoleView,
    activeRoleView,
    switchAdminView,
    logout, 
    isDarkMode, 
    setIsDarkMode,
    setActiveTab
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);

  const roleInspectionOptions = [
    { id: 'admin', label: '🛡️ Admin Directorate', icon: ShieldCheck, color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800' },
    { id: 'student', label: '🎓 Student Portal', icon: GraduationCap, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800' },
    { id: 'faculty', label: '👨‍🏫 Faculty Portal', icon: UserCheck, color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800' },
    { id: 'industry', label: '🏢 Industry Portal', icon: Building2, color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800' },
    { id: 'institution', label: '🏛️ Institute Portal', icon: Landmark, color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800' },
  ];

  const isAdmin = currentUser?.role === 'admin';
  const isInspectingAnotherRole = isAdmin && activeRoleView !== 'admin';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Top National Framework Ribbon */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-emerald-100 text-xs px-4 py-1 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-semibold tracking-wider flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            NATIONAL ACADEMIA–INDUSTRY COLLABORATION PLATFORM
          </span>
          <span className="hidden md:inline text-emerald-300/80">|</span>
          <span className="hidden md:inline text-emerald-200">All India Institute of Ayurveda (AIIA) Portal</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="bg-emerald-800/80 px-2 py-0.5 rounded border border-emerald-600/40 text-emerald-200">
            Problem Statement ID: 26044
          </span>
          <span className="hidden sm:inline text-emerald-300 font-medium">Smart Automation</span>
        </div>
      </div>

      {/* Super-Admin Inspector Notice Bar (Only shown when Admin is inspecting other views) */}
      {isInspectingAnotherRole && (
        <div className="bg-amber-500 text-slate-950 text-xs font-bold px-4 py-1.5 flex items-center justify-between shadow-inner">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 animate-pulse" />
            <span>
              SUPER-ADMIN INSPECTOR MODE: You are currently inspecting the <strong className="uppercase underline">{activeRoleView}</strong> view as Administrator ({currentUser.name}).
            </span>
          </div>
          <button
            onClick={() => switchAdminView('admin')}
            className="px-2.5 py-0.5 bg-slate-950 hover:bg-slate-800 text-white rounded-md text-[11px] font-bold transition flex items-center gap-1 shadow-sm"
          >
            <ArrowLeftCircle className="w-3.5 h-3.5" />
            <span>Return to Admin Directorate</span>
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer select-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white font-['Outfit']">SkillSetu</span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                PORTAL
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none">
              Academia-Industry Collaboration & Skill Mapping Engine
            </p>
          </div>
        </div>

        {/* ADMIN-ONLY Portal Inspector Switcher (STRICTLY HIDDEN for Student, Faculty, Industry, Institution) */}
        {isAdmin && (
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 px-2 flex items-center gap-1">
              <Eye className="w-3 h-3 text-red-500" /> Admin Inspector:
            </span>
            {roleInspectionOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = activeRoleView === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => switchAdminView(opt.id)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? `${opt.color} border shadow-sm`
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{opt.label.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Right Tools & User Profile / Logout */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Mobile Inspector for Admin */}
          {isAdmin && (
            <div className="lg:hidden">
              <select
                value={activeRoleView}
                onChange={(e) => switchAdminView(e.target.value)}
                className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 font-medium"
              >
                <option value="admin">🛡️ Admin View</option>
                <option value="student">🎓 Inspect Student View</option>
                <option value="faculty">👨‍🏫 Inspect Faculty View</option>
                <option value="industry">🏢 Inspect Industry View</option>
                <option value="institution">🏛️ Inspect Institute View</option>
              </select>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications dropdown trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Live System Alerts
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                    Active Session
                  </span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700/50 text-xs">
                  <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/40 cursor-pointer">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Role-Based Security Policy Active</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Your access level is scoped strictly to: <strong className="uppercase">{currentUser?.role}</strong></p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill - Always Displays the Actual Authenticated User */}
          <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
            <img
              src={currentUser?.avatar || currentUser?.logo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover border border-emerald-500/40 shrink-0"
            />
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight truncate max-w-[140px]">
                {currentUser?.name || currentUser?.contactPerson}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="uppercase font-bold">{currentUser?.role}</span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
