import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  GraduationCap, 
  UserCheck, 
  Building2, 
  Landmark, 
  ShieldAlert, 
  Lock, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  BookOpen, 
  Layers, 
  Compass,
  AlertCircle,
  Briefcase,
  Award,
  Globe,
  MapPin,
  FileCheck2,
  Users
} from 'lucide-react';

export default function AuthPage() {
  const { login, loginAsRole, registerUser, isDarkMode, setIsDarkMode } = useApp();
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [regRole, setRegRole] = useState('student'); // 'student' | 'faculty' | 'industry' | 'institution'
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Student Registration Form
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    password: '',
    institute: 'All India Institute of Ayurveda (AIIA), New Delhi',
    department: 'Dravyaguna & Pharmaceutical Sciences',
    year: 'Final Year (BAMS / M.Sc Ayur-Biotech)',
    rollNumber: '',
    targetRole: 'Ayurvedic R&D Formulation Scientist / Clinical Research Associate'
  });

  // 2. Faculty Registration Form
  const [facultyForm, setFacultyForm] = useState({
    name: '',
    email: '',
    password: '',
    institute: 'All India Institute of Ayurveda (AIIA), New Delhi',
    department: 'Dravyaguna & Phytopharmacy',
    designation: 'Associate Professor',
    expertise: 'Standardization of Ayush Formulations, HPLC/GC-MS, Clinical Trials',
    experience: '8 Years Teaching & Research',
    facultyCode: ''
  });

  // 3. Industry Partner Registration Form
  const [industryForm, setIndustryForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    password: '',
    sector: 'Ayurvedic FMCG & Healthcare Biotechnology',
    location: 'Delhi NCR & Pan-India',
    website: 'https://www.ayush-enterprise.com'
  });

  // 4. Institution / TPO Registration Form
  const [institutionForm, setInstitutionForm] = useState({
    institutionName: '',
    adminName: '',
    email: '',
    password: '',
    department: 'Directorate of Training & Placement',
    accreditationScore: 'NAAC A+ / Grade-1 Center of Excellence',
    location: 'New Delhi, India'
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please enter both email address and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(loginEmail, loginPassword);
    setIsSubmitting(false);
    if (!result.success) {
      setErrorMessage(result.message || 'Invalid email or password.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    let payload = { role: regRole };

    if (regRole === 'student') {
      if (!studentForm.name || !studentForm.email || !studentForm.password || !studentForm.institute) {
        setErrorMessage('Please fill in all mandatory student registration fields.');
        return;
      }
      payload = { ...payload, ...studentForm };
    } else if (regRole === 'faculty') {
      if (!facultyForm.name || !facultyForm.email || !facultyForm.password || !facultyForm.institute) {
        setErrorMessage('Please fill in all mandatory faculty registration fields.');
        return;
      }
      payload = { ...payload, ...facultyForm };
    } else if (regRole === 'industry') {
      if (!industryForm.companyName || !industryForm.email || !industryForm.password || !industryForm.contactPerson) {
        setErrorMessage('Please fill in organization name, contact person, corporate email, and password.');
        return;
      }
      payload = { ...payload, ...industryForm };
    } else if (regRole === 'institution') {
      if (!institutionForm.institutionName || !institutionForm.email || !institutionForm.password || !institutionForm.adminName) {
        setErrorMessage('Please fill in institution name, TPO officer name, administrative email, and password.');
        return;
      }
      payload = { ...payload, ...institutionForm };
    }

    setIsSubmitting(true);
    const result = await registerUser(payload);
    setIsSubmitting(false);
    if (!result.success) {
      setErrorMessage(result.message || 'Registration failed.');
    }
  };

  const demoRoles = [
    {
      id: 'student',
      title: 'Student / Scholar',
      name: 'Aarav Sharma',
      email: 'student@aiia.gov.in',
      pass: 'student123',
      icon: GraduationCap,
      badge: 'BAMS / Ayur-Bio',
      desc: 'Take diagnostic quiz, gap radar, apply to internships & verified portfolio.',
      color: 'hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
    },
    {
      id: 'faculty',
      title: 'Faculty / Academician',
      name: 'Dr. Sunita Varma',
      email: 'faculty@aiia.gov.in',
      pass: 'faculty123',
      icon: UserCheck,
      badge: 'Associate Professor',
      desc: 'Industrial sabbaticals, National FDPs, joint R&D RFPs & logbook sign-offs.',
      color: 'hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
    },
    {
      id: 'industry',
      title: 'Industry Partner',
      name: 'Dabur R&D / Dr. Nair',
      email: 'recruitment@dabur-rnd.com',
      pass: 'industry123',
      icon: Building2,
      badge: 'Corporate Recruiter',
      desc: 'Post roles across 15 domains, AI candidate matcher & applicant tracker.',
      color: 'hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/40 text-amber-600 dark:text-amber-400'
    },
    {
      id: 'institution',
      title: 'Institution / TPO',
      name: 'Prof. Anand Kulkarni',
      email: 'tpo@aiia.gov.in',
      pass: 'tpo123',
      icon: Landmark,
      badge: 'AIIA Placement Dean',
      desc: 'Institutional Placement Readiness Index, MoUs & NAAC/NIRF CSV report export.',
      color: 'hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-950/40 text-purple-600 dark:text-purple-400'
    },
    {
      id: 'admin',
      title: 'National Administrator',
      name: 'Dr. Rajeshwar Sharma',
      email: 'admin@ayush.gov.in',
      pass: 'admin123',
      icon: ShieldCheck,
      badge: 'Director General',
      desc: 'Super-Admin Inspector across all portals + user provisioning & system audit.',
      color: 'hover:border-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col justify-between font-['Plus_Jakarta_Sans'] transition-colors duration-200">
      {/* Top National Header Ribbon */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-emerald-100 text-xs px-4 py-1.5 flex items-center justify-between border-b border-emerald-900/40">
        <div className="flex items-center space-x-3">
          <span className="font-bold tracking-wider flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            NATIONAL ACADEMIA–INDUSTRY COLLABORATION PLATFORM
          </span>
          <span className="hidden md:inline text-emerald-400/60">|</span>
          <span className="hidden md:inline text-emerald-200">All India Institute of Ayurveda (AIIA)</span>
        </div>
        <div className="text-[11px] font-semibold text-emerald-300">
          Problem Statement ID: 26044 • Smart Automation
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Branding, Value Prop & Live Metrics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Centralized Academia–Industry Portal</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Outfit'] leading-tight">
                SkillSetu <span className="text-emerald-600 dark:text-emerald-400">Portal</span>
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                A unified intelligent platform connecting <strong>Students</strong>, <strong>Faculty</strong>, <strong>Industries</strong>, and <strong>Institutions</strong> for skill mapping, internships, R&D collaboration, and automated placement tracking.
              </p>
            </div>

            {/* Key Pillars */}
            <div className="space-y-2.5 pt-2">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start space-x-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">AI Skill Radar & Diagnostic Assessment</h4>
                  <p className="text-[11px] text-slate-500">Instant competency profiling and target career gap closure.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start space-x-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Faculty Sabbaticals & Expert Lectures</h4>
                  <p className="text-[11px] text-slate-500">Publish masterclasses, industrial training, and joint research RFPs.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start space-x-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Industry Matching & Institutional NIRF</h4>
                  <p className="text-[11px] text-slate-500">15 specialized domains, blockchain credentials & 1-click accreditation reports.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Auth Card (Login & Multi-Role Registration) */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              
              {/* Auth Tab Switcher */}
              <div className="grid grid-cols-2 border-b border-slate-200 dark:border-slate-800 text-center text-xs font-bold">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setErrorMessage(''); }}
                  className={`py-4 transition ${
                    authMode === 'login'
                      ? 'border-b-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-slate-50/50 dark:bg-slate-800/40'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Unified Sign In
                </button>

                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setErrorMessage(''); }}
                  className={`py-4 transition ${
                    authMode === 'register'
                      ? 'border-b-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-slate-50/50 dark:bg-slate-800/40'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Create New Account / Register
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* TAB 1: LOGIN FORM */}
                {authMode === 'login' ? (
                  <div className="space-y-6">
                    <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          Email Address:
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="email"
                            required
                            placeholder="e.g. student@aiia.gov.in / faculty@aiia.gov.in"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          Password:
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="w-full pl-9 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isSubmitting ? "Authenticating..." : "Sign In to Portal"}</span>
                      </button>
                    </form>

                    {/* Quick 1-Click Demo Accounts Selector */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          ⚡ Instant 1-Click Demo Logins:
                        </span>
                        <span className="text-[10px] text-slate-400">Select any role to test</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {demoRoles.map((role) => {
                          const Icon = role.icon;
                          return (
                            <button
                              key={role.id}
                              type="button"
                              onClick={() => loginAsRole(role.id)}
                              className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-left transition flex items-start space-x-2.5 ${role.color}`}
                            >
                              <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                              <div className="space-y-0.5 truncate flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{role.title}</span>
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">{role.badge}</span>
                                </div>
                                <p className="text-[10px] text-slate-500 truncate">{role.email}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* TAB 2: MULTI-ROLE REGISTRATION FORM */
                  <div className="space-y-5">
                    {/* Role Pill Selector */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                        Select Registration Persona:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button
                          type="button"
                          onClick={() => { setRegRole('student'); setErrorMessage(''); }}
                          className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between space-y-1 ${
                            regRole === 'student'
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <GraduationCap className="w-4 h-4 text-emerald-600" />
                            {regRole === 'student' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          </div>
                          <span className="text-xs">Student</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => { setRegRole('faculty'); setErrorMessage(''); }}
                          className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between space-y-1 ${
                            regRole === 'faculty'
                              ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-800 dark:text-indigo-300 font-bold'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <UserCheck className="w-4 h-4 text-indigo-600" />
                            {regRole === 'faculty' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                          </div>
                          <span className="text-xs">Faculty</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => { setRegRole('industry'); setErrorMessage(''); }}
                          className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between space-y-1 ${
                            regRole === 'industry'
                              ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-800 dark:text-amber-300 font-bold'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <Building2 className="w-4 h-4 text-amber-600" />
                            {regRole === 'industry' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
                          </div>
                          <span className="text-xs">Industry Partner</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => { setRegRole('institution'); setErrorMessage(''); }}
                          className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between space-y-1 ${
                            regRole === 'institution'
                              ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-800 dark:text-purple-300 font-bold'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <Landmark className="w-4 h-4 text-purple-600" />
                            {regRole === 'institution' && <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />}
                          </div>
                          <span className="text-xs">Institution / TPO</span>
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
                      {/* 1. STUDENT REGISTRATION FIELDS */}
                      {regRole === 'student' && (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Full Name *:
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Priya Sharma"
                                value={studentForm.name}
                                onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Student Email Address *:
                              </label>
                              <input
                                type="email"
                                required
                                placeholder="priya.sharma@aiia.gov.in"
                                value={studentForm.email}
                                onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Academic Institute *:
                              </label>
                              <input
                                type="text"
                                required
                                value={studentForm.institute}
                                onChange={(e) => setStudentForm({ ...studentForm, institute: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Department / Branch *:
                              </label>
                              <input
                                type="text"
                                required
                                value={studentForm.department}
                                onChange={(e) => setStudentForm({ ...studentForm, department: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Year of Study:
                              </label>
                              <select
                                value={studentForm.year}
                                onChange={(e) => setStudentForm({ ...studentForm, year: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                              >
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="Final Year">Final Year</option>
                                <option value="Post-Graduate Scholar">Post-Graduate Scholar</option>
                              </select>
                            </div>

                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Roll / Enrollment No:
                              </label>
                              <input
                                type="text"
                                placeholder="AIIA-2023-BAMS-088"
                                value={studentForm.rollNumber}
                                onChange={(e) => setStudentForm({ ...studentForm, rollNumber: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Account Password *:
                              </label>
                              <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={studentForm.password}
                                onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                              Target Career Track / Specialization:
                            </label>
                            <input
                              type="text"
                              value={studentForm.targetRole}
                              onChange={(e) => setStudentForm({ ...studentForm, targetRole: e.target.value })}
                              placeholder="e.g. Ayurvedic R&D Formulation Scientist / Clinical Trial Coordinator"
                              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                          </div>
                        </>
                      )}

                      {/* 2. FACULTY REGISTRATION FIELDS */}
                      {regRole === 'faculty' && (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Faculty Full Name *:
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Dr. Raghavendra Rao"
                                value={facultyForm.name}
                                onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Academic Email Address *:
                              </label>
                              <input
                                type="email"
                                required
                                placeholder="e.g. raghavendra@aiia.gov.in"
                                value={facultyForm.email}
                                onChange={(e) => setFacultyForm({ ...facultyForm, email: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Academic Institution / University *:
                              </label>
                              <input
                                type="text"
                                required
                                value={facultyForm.institute}
                                onChange={(e) => setFacultyForm({ ...facultyForm, institute: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Department & Designation *:
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Associate Professor, Rasashastra Dept"
                                value={`${facultyForm.designation}, ${facultyForm.department}`}
                                onChange={(e) => {
                                  const parts = e.target.value.split(',');
                                  setFacultyForm({ ...facultyForm, designation: parts[0]?.trim() || '', department: parts[1]?.trim() || 'Ayurvedic Sciences' });
                                }}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Research Expertise / Specialization:
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Phytopharmacy, GCP Clinical Trials, Standardization"
                                value={facultyForm.expertise}
                                onChange={(e) => setFacultyForm({ ...facultyForm, expertise: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Account Password *:
                              </label>
                              <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={facultyForm.password}
                                onChange={(e) => setFacultyForm({ ...facultyForm, password: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* 3. INDUSTRY PARTNER REGISTRATION FIELDS */}
                      {regRole === 'industry' && (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Enterprise / Company Name *:
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Himalaya Wellness Company / Dabur R&D"
                                value={industryForm.companyName}
                                onChange={(e) => setIndustryForm({ ...industryForm, companyName: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Corporate HR / Recruiter Email *:
                              </label>
                              <input
                                type="email"
                                required
                                placeholder="e.g. recruitment@himalayawellness.com"
                                value={industryForm.email}
                                onChange={(e) => setIndustryForm({ ...industryForm, email: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Key Contact Person / Lead Scientist *:
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Dr. Vikramaditya Nair (Chief Scientific Officer)"
                                value={industryForm.contactPerson}
                                onChange={(e) => setIndustryForm({ ...industryForm, contactPerson: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Industry Sector / Domain *:
                              </label>
                              <select
                                value={industryForm.sector}
                                onChange={(e) => setIndustryForm({ ...industryForm, sector: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                              >
                                <option value="Ayurvedic FMCG & Healthcare Biotechnology">🌿 Ayurvedic FMCG & Biotech</option>
                                <option value="Phytopharmaceuticals & Analytical R&D">🧪 Phytopharmaceuticals & Analytical</option>
                                <option value="Herbal Cosmeceuticals & Dermato-Care">✨ Herbal Cosmeceuticals & Personal Care</option>
                                <option value="Clinical Research Organization (CRO) & GCP">🏥 Clinical Trials & GCP Operations</option>
                                <option value="Nutraceuticals & Functional Ayush Ahara">🍃 Nutraceuticals & Dietary Supplements</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Headquarter / Facility Location:
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Bengaluru, Karnataka"
                                value={industryForm.location}
                                onChange={(e) => setIndustryForm({ ...industryForm, location: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Account Password *:
                              </label>
                              <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={industryForm.password}
                                onChange={(e) => setIndustryForm({ ...industryForm, password: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* 4. INSTITUTION / TPO REGISTRATION FIELDS */}
                      {regRole === 'institution' && (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                University / Institute Name *:
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. National Institute of Ayurveda (NIA), Jaipur"
                                value={institutionForm.institutionName}
                                onChange={(e) => setInstitutionForm({ ...institutionForm, institutionName: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Official Administrative / TPO Email *:
                              </label>
                              <input
                                type="email"
                                required
                                placeholder="e.g. tpo@nia.nic.in"
                                value={institutionForm.email}
                                onChange={(e) => setInstitutionForm({ ...institutionForm, email: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Dean / TPO Officer Name *:
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Prof. (Dr.) Anand Kulkarni"
                                value={institutionForm.adminName}
                                onChange={(e) => setInstitutionForm({ ...institutionForm, adminName: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                NAAC / NIRF / Institutional Accreditation Grade:
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. NAAC A++ / NIRF Rank #12"
                                value={institutionForm.accreditationScore}
                                onChange={(e) => setInstitutionForm({ ...institutionForm, accreditationScore: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Campus Location:
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Jaipur, Rajasthan"
                                value={institutionForm.location}
                                onChange={(e) => setInstitutionForm({ ...institutionForm, location: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Administrative Account Password *:
                              </label>
                              <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={institutionForm.password}
                                onChange={(e) => setInstitutionForm({ ...institutionForm, password: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 text-white rounded-xl font-bold transition shadow-md flex items-center justify-center gap-2 ${
                          regRole === 'student'
                            ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
                            : regRole === 'faculty'
                            ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'
                            : regRole === 'industry'
                            ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30'
                            : 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/30'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          {isSubmitting
                            ? "Creating Account..."
                            : regRole === 'student'
                            ? "Complete Student Registration & Launch Portal"
                            : regRole === 'faculty'
                            ? "Register Faculty Account & Access R&D Hub"
                            : regRole === 'industry'
                            ? "Register Industry Enterprise & Post Roles"
                            : "Register Academic Institution & Access Placement Portal"}
                        </span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
        © 2026 All India Institute of Ayurveda (AIIA) • National Collaboration & Skill Mapping Framework
      </footer>
    </div>
  );
}
