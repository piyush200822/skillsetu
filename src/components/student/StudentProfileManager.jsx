import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Award, 
  BookOpen, 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Save, 
  ExternalLink, 
  Sliders, 
  GraduationCap, 
  Building2, 
  Globe, 
  Github, 
  FileText, 
  Layers, 
  QrCode,
  Tag,
  Check,
  AlertCircle
} from 'lucide-react';

export default function StudentProfileManager() {
  const { studentProfile, updateStudentProfile, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('skills'); // 'skills' | 'certifications' | 'courses' | 'general'

  // Editable State Copied from Student Profile
  const [formData, setFormData] = useState({
    name: studentProfile.name || '',
    email: studentProfile.email || '',
    institute: studentProfile.institute || '',
    department: studentProfile.department || '',
    year: studentProfile.year || '',
    rollNumber: studentProfile.rollNumber || '',
    targetRole: studentProfile.targetRole || '',
    cgpa: studentProfile.cgpa || '',
    bio: studentProfile.bio || '',
    githubUrl: studentProfile.githubUrl || '',
    orcidId: studentProfile.orcidId || '',
    linkedinUrl: studentProfile.linkedinUrl || '',
    skills: studentProfile.skills ? JSON.parse(JSON.stringify(studentProfile.skills)) : [],
    verifiedCertifications: studentProfile.verifiedCertifications ? JSON.parse(JSON.stringify(studentProfile.verifiedCertifications)) : [],
    completedCourses: studentProfile.completedCourses ? JSON.parse(JSON.stringify(studentProfile.completedCourses)) : [
      {
        id: "CRS-01",
        title: "Modern Extraction Methodologies & Supercritical CO2",
        platform: "AIIA National Digital Lab",
        duration: "6 Weeks",
        completionDate: "Dec 2025",
        verified: true,
        skillsLearned: ["Soxhlet Extraction", "Supercritical CO2", "Fractionation"],
        grade: "A+ (94%)"
      },
      {
        id: "CRS-02",
        title: "HPLC / HPTLC Chromatographic Fingerprinting Pro",
        platform: "Waters Analytical Academy",
        duration: "4 Weeks",
        completionDate: "Jan 2026",
        verified: true,
        skillsLearned: ["UPLC Method Dev", "Marker Quantification", "GLP Calibration"],
        grade: "Distinction (91%)"
      }
    ],
    projects: studentProfile.projects ? JSON.parse(JSON.stringify(studentProfile.projects)) : [
      {
        id: "PROJ-01",
        title: "UHPLC-MS Profiling of Active Withanolides in Withania somnifera",
        category: "Translational Phytopharmacy Capstone",
        timeline: "Oct 2025 - Jan 2026",
        outcomes: "Isolated 4 distinct withanolide glycosides with 98.4% chromatographic purity.",
        githubUrl: "https://github.com/aarav-ayurbio/withania-chromatography"
      }
    ]
  });

  const [isSaving, setIsSaving] = useState(false);

  // New Skill Modal / Input State
  const [newSkill, setNewSkill] = useState({
    name: '',
    score: 80,
    level: 'Advanced',
    verified: false
  });

  // New Certification Input State
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: 'AIIA National Certification Board',
    issuedDate: 'Aug 2026',
    credentialId: `AYU-CERT-${Math.floor(1000 + Math.random() * 9000)}`,
    verified: true
  });

  // New Course Input State
  const [newCourse, setNewCourse] = useState({
    title: '',
    platform: 'CSIR / AIIA Online Portal',
    duration: '4 Weeks',
    completionDate: 'Aug 2026',
    grade: 'A+ (92%)',
    skillsLearned: 'Standardization, Phytochemical Assays',
    verified: true
  });

  // Pre-configured Ayush skill suggestions
  const suggestedSkills = [
    "Phytochemistry & Extraction",
    "HPLC / GC-MS Profiling",
    "Ayurvedic Pharmacopoeia (API)",
    "Clinical Trial Protocols (GCP)",
    "AI Molecular Docking / In-silico",
    "Scientific Writing & Biostatistics",
    "Regulatory Compliance (AYUSH GMP/FDA)",
    "Herbal Cosmeceuticals Formulation",
    "Heavy Metal Speciation (ICP-MS)",
    "Panchakarma Clinical Operations",
    "MedDRA Pharmacovigilance Coding",
    "Ayush Ahara & Functional Food Dev",
    "Traditional Knowledge Patent Search"
  ];

  // 1. Skill Operations
  const handleAddSkill = () => {
    if (!newSkill.name.trim()) {
      addToast("Notice", "Please select or type a skill name.", "error");
      return;
    }
    const exists = formData.skills.some(s => s.name.toLowerCase() === newSkill.name.toLowerCase());
    if (exists) {
      addToast("Notice", "This skill is already in your profile.", "error");
      return;
    }

    const updatedSkills = [
      ...formData.skills,
      {
        name: newSkill.name.trim(),
        score: Number(newSkill.score),
        level: newSkill.level,
        verified: newSkill.verified
      }
    ];

    // Compute average skill score
    const avgScore = Math.round(updatedSkills.reduce((a, b) => a + Number(b.score), 0) / updatedSkills.length);

    setFormData(prev => ({
      ...prev,
      skillScore: avgScore,
      skills: updatedSkills
    }));

    setNewSkill({ name: '', score: 80, level: 'Advanced', verified: false });
    addToast("Skill Added!", `Added "${newSkill.name}" to your profile.`, "success");
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    const avgScore = updatedSkills.length > 0
      ? Math.round(updatedSkills.reduce((a, b) => a + Number(b.score), 0) / updatedSkills.length)
      : 70;

    setFormData(prev => ({
      ...prev,
      skillScore: avgScore,
      skills: updatedSkills
    }));
    addToast("Skill Removed", "Skill removed from profile.", "info");
  };

  const handleSkillScoreChange = (index, newScore) => {
    const updatedSkills = formData.skills.map((s, i) => i === index ? { ...s, score: Number(newScore) } : s);
    const avgScore = Math.round(updatedSkills.reduce((a, b) => a + Number(b.score), 0) / updatedSkills.length);
    setFormData(prev => ({
      ...prev,
      skillScore: avgScore,
      skills: updatedSkills
    }));
  };

  // 2. Certification Operations
  const handleAddCert = () => {
    if (!newCert.title.trim()) {
      addToast("Notice", "Please enter certification title.", "error");
      return;
    }

    const hash = '0x' + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('');

    const certItem = {
      id: `CERT-${Date.now().toString().slice(-4)}`,
      title: newCert.title.trim(),
      issuer: newCert.issuer,
      issuedDate: newCert.issuedDate,
      credentialId: newCert.credentialId,
      hash,
      verified: true
    };

    setFormData(prev => ({
      ...prev,
      verifiedCertifications: [certItem, ...prev.verifiedCertifications]
    }));

    setNewCert({
      title: '',
      issuer: 'AIIA National Certification Board',
      issuedDate: 'Aug 2026',
      credentialId: `AYU-CERT-${Math.floor(1000 + Math.random() * 9000)}`,
      verified: true
    });
    addToast("Certificate Added & Cryptographically Verified!", `"${certItem.title}" recorded with hash ${hash.slice(0, 10)}...`, "success");
  };

  const handleRemoveCert = (id) => {
    setFormData(prev => ({
      ...prev,
      verifiedCertifications: prev.verifiedCertifications.filter(c => c.id !== id)
    }));
    addToast("Certificate Removed", "Certificate removed from verified ledger.", "info");
  };

  // 3. Course Operations
  const handleAddCourse = () => {
    if (!newCourse.title.trim()) {
      addToast("Notice", "Please enter course title.", "error");
      return;
    }

    const courseItem = {
      id: `CRS-${Date.now().toString().slice(-4)}`,
      title: newCourse.title.trim(),
      platform: newCourse.platform,
      duration: newCourse.duration,
      completionDate: newCourse.completionDate,
      grade: newCourse.grade,
      skillsLearned: typeof newCourse.skillsLearned === 'string' 
        ? newCourse.skillsLearned.split(',').map(s => s.trim()).filter(Boolean)
        : newCourse.skillsLearned,
      verified: true
    };

    setFormData(prev => ({
      ...prev,
      completedCourses: [courseItem, ...prev.completedCourses]
    }));

    setNewCourse({
      title: '',
      platform: 'CSIR / AIIA Online Portal',
      duration: '4 Weeks',
      completionDate: 'Aug 2026',
      grade: 'A+ (92%)',
      skillsLearned: 'Standardization, Phytochemical Assays',
      verified: true
    });
    addToast("Course Added!", `Added "${courseItem.title}" to completed courses list.`, "success");
  };

  const handleRemoveCourse = (id) => {
    setFormData(prev => ({
      ...prev,
      completedCourses: prev.completedCourses.filter(c => c.id !== id)
    }));
    addToast("Course Removed", "Course removed from portfolio.", "info");
  };

  // 4. Save entire profile to Database
  const handleSaveAll = async () => {
    setIsSaving(true);
    const avgScore = formData.skills.length > 0 
      ? Math.round(formData.skills.reduce((a, b) => a + Number(b.score), 0) / formData.skills.length)
      : studentProfile.skillScore || 82;

    const payload = {
      ...formData,
      skillScore: avgScore
    };

    const res = await updateStudentProfile(payload);
    setIsSaving(false);

    if (res.success) {
      addToast("Profile Saved to Database!", "All skills, certifications, and academic details are updated and live.", "success");
    }
  };

  const verifiedSkillsCount = formData.skills.filter(s => s.verified).length;
  const currentSkillScore = formData.skills.length > 0 
    ? Math.round(formData.skills.reduce((a, b) => a + Number(b.score), 0) / formData.skills.length)
    : 80;

  return (
    <div className="space-y-6 animate-in fade-in max-w-6xl mx-auto pb-12">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Student Profile & Skill Credentials Manager
            </span>
            <span className="text-xs text-slate-500 font-mono">Roll: {formData.rollNumber}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] mt-1">
            Manage Skills, Certifications, Courses & Academic Identity
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Add new competencies, verifiable certificate hashes, and completed projects. Changes are automatically saved into the national database.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Saving to Database..." : "Save Profile & Skills"}</span>
        </button>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Skill Readiness Score</div>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {currentSkillScore}%
          </div>
          <div className="text-[11px] text-slate-400">Live AI Index</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Total Skills Recorded</div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            {formData.skills.length}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold">{verifiedSkillsCount} Verified</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Verifiable Certificates</div>
          <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
            {formData.verifiedCertifications.length}
          </div>
          <div className="text-[11px] text-slate-400">Blockchain Verified</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Completed Courses</div>
          <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {formData.completedCourses.length}
          </div>
          <div className="text-[11px] text-slate-400">Lab & Digital Modules</div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'skills'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Skills & Competencies ({formData.skills.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('certifications')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'certifications'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Certifications ({formData.verifiedCertifications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'courses'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Courses & Projects ({formData.completedCourses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'general'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Academic & Personal Identity</span>
        </button>
      </div>

      {/* TAB 1: SKILLS MANAGEMENT */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          {/* Add New Skill Form Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-600" />
              Add New Technical or Clinical Skill
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Skill Name / Topic:
                </label>
                <input
                  type="text"
                  placeholder="e.g. UHPLC Method Validation, In-Silico Docking, GCP Auditing..."
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Proficiency Level:
                </label>
                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Beginner">Beginner (50-65%)</option>
                  <option value="Intermediate">Intermediate (65-80%)</option>
                  <option value="Advanced">Advanced (80-90%)</option>
                  <option value="Expert">Expert (90-100%)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Proficiency Score: <strong className="text-emerald-600">{newSkill.score}%</strong>
                </label>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={newSkill.score}
                    onChange={(e) => setNewSkill({ ...newSkill, score: e.target.value })}
                    className="w-full accent-emerald-600"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Suggestions Chips */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Quick Ayush & Biotech Suggestions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedSkills.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setNewSkill({ ...newSkill, name: s })}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-600 dark:text-slate-300 hover:text-emerald-700 font-medium transition border border-slate-200/60 dark:border-slate-700"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Current Skills List Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
              Current Skills Inventory ({formData.skills.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {skill.name}
                      </span>
                      {skill.verified ? (
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 font-medium">
                          Self-Assessed
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleRemoveSkill(index)}
                      className="text-slate-400 hover:text-rose-600 transition"
                      title="Remove Skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 capitalize">{skill.level} Proficiency</span>
                      <span className="font-bold text-emerald-600">{skill.score}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${skill.score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Slider to adjust score dynamically */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] text-slate-400">Score Adjust:</span>
                    <input
                      type="range"
                      min="30"
                      max="100"
                      value={skill.score}
                      onChange={(e) => handleSkillScoreChange(index, e.target.value)}
                      className="w-full accent-emerald-600 h-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CERTIFICATIONS MANAGEMENT */}
      {activeTab === 'certifications' && (
        <div className="space-y-6">
          {/* Add Certificate Form */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" />
              Add Verifiable Certificate or Professional License
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Certificate Title:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Good Clinical Practice (GCP) for Ayush Clinical Trials"
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Issuing Body / Authority:
                </label>
                <select
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="AIIA National Certification Board">AIIA Certification Board</option>
                  <option value="Council of Scientific and Industrial Research (CSIR)">CSIR India</option>
                  <option value="Clinical Development Services Agency (CDSA)">CDSA GCP Board</option>
                  <option value="Waters Analytical Academy">Waters India</option>
                  <option value="Dabur Research & Development Foundation">Dabur R&D</option>
                  <option value="National NPTEL / Swayam Portal">NPTEL / Swayam</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Issue Date / Year:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jan 2026"
                  value={newCert.issuedDate}
                  onChange={(e) => setNewCert({ ...newCert, issuedDate: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Credential ID:
                </label>
                <input
                  type="text"
                  placeholder="e.g. AYU-GLP-2026-9901"
                  value={newCert.credentialId}
                  onChange={(e) => setNewCert({ ...newCert, credentialId: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleAddCert}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>Verify & Add Certificate</span>
                </button>
              </div>
            </div>
          </div>

          {/* Current Certifications Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
              Verified Blockchain Certificates ({formData.verifiedCertifications.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.verifiedCertifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                        {cert.issuer}
                      </span>
                      <button
                        onClick={() => handleRemoveCert(cert.id)}
                        className="text-slate-400 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {cert.title}
                    </h4>

                    <div className="text-xs text-slate-500 space-y-1">
                      <p>Issued: <strong>{cert.issuedDate}</strong> • Credential: <span className="font-mono text-indigo-600">{cert.credentialId}</span></p>
                      <p className="font-mono text-[10px] text-slate-400 truncate">
                        Hash: {cert.hash || '0x8f2d4e89a1c03b6e82f1b4a90cd7e51f'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Ledger Proof
                    </span>
                    <span className="text-slate-400">Ayush Hyperledger</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COURSES & PROJECTS MANAGEMENT */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {/* Add Course Form */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-600" />
              Add Completed Course, Training Residency, or Capstone Project
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Course / Project Title:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Advanced UPLC Fingerprinting of Polyherbal Extracts"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Platform / Organization:
                </label>
                <input
                  type="text"
                  value={newCourse.platform}
                  onChange={(e) => setNewCourse({ ...newCourse, platform: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Duration & Completion Date:
                </label>
                <input
                  type="text"
                  placeholder="e.g. 6 Weeks • Aug 2026"
                  value={`${newCourse.duration} • ${newCourse.completionDate}`}
                  onChange={(e) => {
                    const parts = e.target.value.split('•');
                    setNewCourse({ ...newCourse, duration: parts[0]?.trim() || '', completionDate: parts[1]?.trim() || 'Aug 2026' });
                  }}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Skills Applied (Comma-separated):
                </label>
                <input
                  type="text"
                  placeholder="HPLC, Extraction, Schedule T GMP"
                  value={newCourse.skillsLearned}
                  onChange={(e) => setNewCourse({ ...newCourse, skillsLearned: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleAddCourse}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Add Course to Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Current Courses List */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
              Completed Learning Modules & Capstones ({formData.completedCourses.length})
            </h3>

            <div className="space-y-3">
              {formData.completedCourses.map((crs) => (
                <div
                  key={crs.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {crs.title}
                      </h4>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold">
                        {crs.grade || 'Completed'}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">
                      {crs.platform} • {crs.duration} ({crs.completionDate})
                    </p>
                    {crs.skillsLearned && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(Array.isArray(crs.skillsLearned) ? crs.skillsLearned : [crs.skillsLearned]).map((sk, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                            {sk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleRemoveCourse(crs.id)}
                    className="text-slate-400 hover:text-rose-600 transition shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GENERAL & ACADEMIC IDENTITY */}
      {activeTab === 'general' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] border-b border-slate-100 dark:border-slate-800 pb-2">
            Academic Credentials & Career Aspirations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Full Name:
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Email Address:
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Academic Institution:
              </label>
              <input
                type="text"
                value={formData.institute}
                onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Department / Branch:
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Current Year / Semester:
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Cumulative CGPA / Score:
              </label>
              <input
                type="text"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Target Career Role / Specialization:
              </label>
              <input
                type="text"
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                placeholder="e.g. Ayurvedic R&D Formulation Scientist / Clinical Trial Coordinator"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-emerald-700 dark:text-emerald-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Professional Bio & Career Objective:
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                GitHub / Repository Link:
              </label>
              <input
                type="text"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ORCID / Researcher ID:
              </label>
              <input
                type="text"
                value={formData.orcidId}
                onChange={(e) => setFormData({ ...formData, orcidId: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
