import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const initialSeedUsers = [
  {
    id: "ADM-001",
    name: "Dr. Rajeshwar Sharma",
    email: "admin@ayush.gov.in",
    password: "admin123",
    role: "admin",
    designation: "Chief Director & System Administrator",
    department: "National Skill & Institutional Accreditation Directorate",
    organization: "National Skill & Institutional Accreditation Directorate",
    status: "Active",
    createdAt: "2025-01-10",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "STU-2026-8841",
    name: "Aarav Sharma",
    email: "student@aiia.gov.in",
    password: "student123",
    role: "student",
    institute: "All India Institute of Ayurveda (AIIA), New Delhi",
    department: "Dravyaguna & Pharmaceutical Sciences",
    year: "Final Year (BAMS / M.Sc Ayur-Biotech)",
    rollNumber: "AIIA-2022-BAMS-042",
    targetRole: "Ayurvedic R&D Formulation Scientist / Clinical Research Associate",
    cgpa: "8.92 / 10",
    skillScore: 82,
    readinessLevel: "High",
    status: "Active",
    createdAt: "2026-01-15",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Passionate about bridging classical Ayurvedic pharmacognosy with modern analytical chromatography (HPLC/GC-MS) and AI-driven molecular docking.",
    verifiedCertifications: [
      {
        id: "CERT-AYUSH-904",
        title: "Standardization of Herbal Formulations (GLP/GMP)",
        issuer: "AIIA National Certification Board",
        issuedDate: "Jan 2026",
        credentialId: "AYU-GLP-2026-4410",
        hash: "0x8f2d4e89a1c03b6e82f1b4a90cd7e51f",
        verified: true
      },
      {
        id: "CERT-AYUSH-882",
        title: "Advanced Phytochemical Chromatography & Spectral Analysis",
        issuer: "Council of Scientific and Industrial Research (CSIR)",
        issuedDate: "Nov 2025",
        credentialId: "CSIR-SPEC-8821",
        hash: "0x3b1c90ef4a5d6e7189c2fa4b910de832",
        verified: true
      },
      {
        id: "CERT-AYUSH-710",
        title: "Good Clinical Practice (GCP) for Ayush Clinical Trials",
        issuer: "Clinical Development Services Agency (CDSA)",
        issuedDate: "Sep 2025",
        credentialId: "CDSA-GCP-7104",
        hash: "0x91dae340cf88921a41b52c08ea394df1",
        verified: true
      }
    ],
    skills: [
      { name: "Phytochemistry & Extraction", score: 88, verified: true, level: "Advanced" },
      { name: "HPLC / GC-MS Profiling", score: 82, verified: true, level: "Advanced" },
      { name: "Ayurvedic Pharmacopoeia (API)", score: 92, verified: true, level: "Expert" },
      { name: "Clinical Trial Protocols (GCP)", score: 75, verified: true, level: "Intermediate" },
      { name: "AI Molecular Docking / In-silico", score: 58, verified: false, level: "Beginner" },
      { name: "Scientific Writing & Biostatistics", score: 65, verified: true, level: "Intermediate" },
      { name: "Regulatory Compliance (AYUSH GMP/FDA)", score: 70, verified: false, level: "Intermediate" }
    ],
    githubUrl: "https://github.com/aarav-ayurbio",
    orcidId: "0000-0002-1825-0097",
    portfolioViews: 342
  },
  {
    id: "FAC-1049",
    name: "Dr. Sunita Varma",
    email: "faculty@aiia.gov.in",
    password: "faculty123",
    role: "faculty",
    designation: "Associate Professor & Head of Phytopharmacy",
    institute: "All India Institute of Ayurveda (AIIA), New Delhi",
    department: "Dravyaguna & Phytopharmacy",
    status: "Active",
    createdAt: "2025-02-20",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    expertise: ["Standardization of Rasashastra Formulations", "Heavy Metal Safety Testing", "Clinical Phase II Trials", "Industry-Academia Sabbaticals"],
    experience: "14 Years Teaching & 8 Years Translational Research",
    publicationsCount: 38,
    patentsCount: 3,
    activeProposals: 4,
    supervisedStudents: 22
  },
  {
    id: "IND-5082",
    name: "Dabur Research & Development Foundation",
    contactPerson: "Dr. Vikramaditya Nair (Chief Scientific Officer)",
    email: "recruitment@dabur-rnd.com",
    password: "industry123",
    role: "industry",
    sector: "Ayurvedic FMCG & Healthcare Biotechnology",
    location: "Ghaziabad & Delhi NCR, India",
    status: "Active",
    createdAt: "2025-03-05",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&auto=format&fit=crop&q=80",
    activePostings: 8,
    applicantsCount: 142,
    internsHosted: 45,
    mouStatus: "Active Partner with AIIA & CCRAS",
    verifiedEnterprise: true
  },
  {
    id: "INST-001",
    name: "All India Institute of Ayurveda (AIIA)",
    contactPerson: "Prof. (Dr.) Anand Kulkarni",
    email: "tpo@aiia.gov.in",
    password: "tpo123",
    role: "institution",
    department: "Directorate of Training, Placements & Industry Collaboration",
    adminName: "Dean of Academic Affairs & Training",
    accreditationScore: "NAAC A++ / NIRF Rank 1 in Ayush",
    location: "Gautampuri, Sarita Vihar, New Delhi",
    status: "Active",
    createdAt: "2025-01-01",
    totalStudents: 1240,
    placedStudents: 940,
    internshipParticipationRate: "94.8%"
  }
];

const initialFacultyLectures = [
  {
    id: "LEC-101",
    title: "Translational Phytopharmacy: Bridging Charaka Samhita with Modern HPLC-MS",
    speakerName: "Dr. Sunita Varma",
    speakerDesignation: "Associate Professor & Head of Phytopharmacy",
    institute: "All India Institute of Ayurveda (AIIA), New Delhi",
    category: "Expert Masterclass",
    dateTime: "Sept 12, 2026 • 04:00 PM - 05:30 PM IST",
    format: "Live Interactive Broadcast & Smart Lab Demo",
    targetAudience: "Students & Faculty",
    allowedRoles: ["student", "faculty"],
    attendeesCount: 238,
    enrolledUserIds: ["STU-2026-8841"],
    skillsCovered: ["Dravyaguna Standardization", "UHPLC Chromatographic Deconvolution", "Phytochemical Fingerprinting"],
    description: "Deep dive into isolating active biomarkers from polyherbal formulations while maintaining classical synergy principles. Includes real-time chromatography data analysis.",
    meetingLink: "https://webex.ayush.gov.in/meet/dr-sunita-varma-lec101",
    status: "Upcoming Live Session",
    createdAt: "2026-08-25"
  },
  {
    id: "LEC-102",
    title: "Clinical Trial Protocols & GCP Compliance for Herbal Formulations",
    speakerName: "Prof. (Dr.) Anand Kulkarni",
    speakerDesignation: "Dean of Academic Affairs & Clinical Trials Lead",
    institute: "All India Institute of Ayurveda (AIIA)",
    category: "Clinical Research Webinar",
    dateTime: "Sept 18, 2026 • 03:00 PM - 04:30 PM IST",
    format: "Online Lecture & Case Review",
    targetAudience: "Open to All Stakeholders",
    allowedRoles: ["student", "faculty", "industry", "institution"],
    attendeesCount: 175,
    enrolledUserIds: [],
    skillsCovered: ["Ayush GCP Protocols", "eCRF Auditing", "IEC Review Protocol"],
    description: "Systematic methodology for designing phase II/III integrative clinical trials, preparing investigator brochures, and avoiding common regulatory auditing pitfalls. Publisher opened enrollment to all roles!",
    meetingLink: "https://webex.ayush.gov.in/meet/dr-kulkarni-gcp",
    status: "Upcoming Live Session",
    createdAt: "2026-08-26"
  },
  {
    id: "LEC-103",
    title: "Open Mentorship Clinic: Navigating Career Pathways from BAMS to Industrial R&D",
    speakerName: "Dr. Sunita Varma",
    speakerDesignation: "Associate Professor & Industry Liaison Officer",
    institute: "All India Institute of Ayurveda (AIIA)",
    category: "Career Guidance & 1-on-1 Mentoring",
    dateTime: "Sept 25, 2026 • 05:00 PM - 06:30 PM IST",
    format: "Open Q&A Office Hours",
    targetAudience: "Students Only (Publisher Restricted)",
    allowedRoles: ["student"],
    attendeesCount: 312,
    enrolledUserIds: [],
    skillsCovered: ["Resume Building", "Industrial Skill Gap Closure", "Technical Interview Prep"],
    description: "Interactive mentoring session specifically dedicated for final-year students looking to crack top corporate R&D fellowships.",
    meetingLink: "https://webex.ayush.gov.in/meet/career-mentor-clinic",
    status: "Upcoming Live Session",
    createdAt: "2026-08-27"
  }
];

const initialIndustryPrograms = [
  {
    id: "PROG-01",
    title: "Dabur Phytochemical Extraction & Formulation Masterclass",
    company: "Dabur Research & Development Foundation",
    type: "Certification Course",
    targetAudience: "Students & Faculty",
    allowedRoles: ["student", "faculty"],
    duration: "4 Weeks (Weekend Hybrid)",
    timeline: "Sept 15 - Oct 12, 2026",
    participantsCount: 148,
    enrolledUserIds: ["STU-2026-8841"],
    skillsCovered: ["Schedule T GMP", "Supercritical CO2 Extraction", "HPTLC Bioautography", "Standardization"],
    description: "Hands-on industrial masterclass covering commercial-scale extraction, marker compound quantification, and pharmacopoeial documentation.",
    benefits: ["Co-signed Certificate by Dabur CSO & AIIA Board", "Direct Shortlist for Summer R&D Internships", "Free Standard Extract Kit"],
    status: "Registration Open",
    eligibility: "BAMS / M.Sc / M.Pharm / Ph.D Scholars & Faculty"
  },
  {
    id: "PROG-02",
    title: "National Ayush Bio-Hackathon 2026: AI in Classical Formulation Optimization",
    company: "Patanjali Research Foundation & National Science Council",
    type: "Innovation Challenge / Hackathon",
    targetAudience: "Students, Faculty & Industry Partners",
    allowedRoles: ["student", "faculty", "industry"],
    duration: "36-Hour Hackathon + 2 Months Incubation",
    timeline: "Oct 02 - Oct 04, 2026",
    participantsCount: 485,
    enrolledUserIds: [],
    prizePool: "₹5,00,000 Cash Grants + Incubation at AIIA Innovation Cell",
    skillsCovered: ["AI Molecular Docking", "Cheminformatics", "Classical Rasashastra", "Patent Filing"],
    description: "National grand challenge to develop AI algorithms for predicting polyherbal synergy and identifying novel therapeutic indications.",
    benefits: ["Direct Seed Funding", "Fast-track Intellectual Property Filing", "Pre-Placement Offers (PPO)"],
    status: "Registration Open",
    eligibility: "Interdisciplinary teams of Students, Faculty Mentors, and Corporate Scouts"
  },
  {
    id: "PROG-03",
    title: "Waters India UPLC-MS/MS Bio-Standardization Hands-on Workshop",
    company: "Waters Corporation in collaboration with AIIA",
    type: "Corporate Training & FDP",
    targetAudience: "Faculty & Post-Graduate Scholars",
    allowedRoles: ["faculty", "student"],
    duration: "2 Weeks (Hands-on Instrument Residency)",
    timeline: "Oct 18 - Oct 30, 2026",
    participantsCount: 42,
    enrolledUserIds: ["FAC-1049"],
    skillsCovered: ["UPLC-MS/MS Triple Quad", "Metabolomics", "Pesticide Residue Analysis", "GLP Calibration"],
    description: "Advanced instrumental training on High Resolution Accurate Mass (HRAM) fingerprinting and untargeted metabolomics for herbal extracts.",
    benefits: ["Waters Certified Chromatographer Certificate", "Academic Unit Credits", "Travel Allowance Provided"],
    status: "Registration Open",
    eligibility: "Faculty Members & PG/Ph.D Scholars with basic chromatography knowledge"
  },
  {
    id: "PROG-04",
    title: "Faculty Senior Sabbatical & Advanced Formulation Hackathon",
    company: "Emami Group R&D Division",
    type: "Innovation Challenge / Hackathon",
    targetAudience: "Faculty Academicians Only (Publisher Override)",
    allowedRoles: ["faculty"],
    duration: "48-Hour Faculty Grand Challenge",
    timeline: "Nov 12 - Nov 14, 2026",
    participantsCount: 28,
    enrolledUserIds: [],
    prizePool: "₹10,00,000 Joint R&D Grants",
    skillsCovered: ["Curriculum Reform", "Pilot Plant Scale-Up", "Patent Drafting"],
    description: "Dedicated faculty innovation challenge where academic professors compete to pitch high-throughput modernized teaching modules to industrial leaders.",
    benefits: ["Direct Research Sanction", "Curriculum Co-Authorship"],
    status: "Registration Open",
    eligibility: "Permanent and Contract Faculty Members Only"
  },
  {
    id: "PROG-05",
    title: "Corporate Mentorship Cohort: From BAMS to Industrial R&D Scientist",
    company: "Baidyanath & Charak Pharma Collaborative",
    type: "Mentorship Initiative",
    targetAudience: "Students Only",
    allowedRoles: ["student"],
    duration: "3 Months (1-on-1 Weekly Mentoring)",
    timeline: "Sept 20 - Dec 20, 2026",
    participantsCount: 65,
    enrolledUserIds: [],
    skillsCovered: ["Formulation R&D", "Scientific Writing", "Industrial Networking", "Career Navigation"],
    description: "Weekly 1-on-1 mentorship pairings between final-year students and senior industry Directors to bridge the career transition.",
    benefits: ["Personalized Career Roadmap", "Direct Recommendation Letters", "Mock Technical Interviews"],
    status: "Registration Open",
    eligibility: "Final Year Undergraduates & Master's Students"
  }
];

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Default to login screen
  const [usersList, setUsersList] = useState(initialSeedUsers);
  
  // For Admin inspector view
  const [activeRoleView, setActiveRoleView] = useState('student');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [stats, setStats] = useState({
    activeStudents: 14250,
    partnerIndustries: 480,
    academicInstitutes: 215,
    verifiedInternships: 3200,
    successfulPlacements: 2890,
    collaborativeProjects: 410,
    skillGapClosureRate: "87.4%",
    activeMoUs: 142
  });

  const [studentProfile, setStudentProfile] = useState(initialSeedUsers[1]);
  const [facultyProfile, setFacultyProfile] = useState(initialSeedUsers[2]);
  const [industryProfile, setIndustryProfile] = useState(initialSeedUsers[3]);
  const [institutionProfile, setInstitutionProfile] = useState(initialSeedUsers[4]);
  const [adminProfile, setAdminProfile] = useState(initialSeedUsers[0]);

  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [collaborations, setCollaborations] = useState([]);
  const [industryPrograms, setIndustryPrograms] = useState(initialIndustryPrograms);
  const [facultyLectures, setFacultyLectures] = useState(initialFacultyLectures);
  const [learningPaths, setLearningPaths] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [assessmentQuestions, setAssessmentQuestions] = useState([]);
  const [lastAssessmentResult, setLastAssessmentResult] = useState(null);
  const [selectedVerificationItem, setSelectedVerificationItem] = useState(null);
  const [toasts, setToasts] = useState([]);

  const effectiveRoleView = currentUser ? (currentUser.role === 'admin' ? activeRoleView : currentUser.role) : 'student';

  // Fetch initial data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resStats = await fetch('/api/stats');
        if (resStats.ok) {
          const d = await resStats.json();
          if (d.success) setStats(d.data);
        }

        const resOpp = await fetch('/api/opportunities');
        if (resOpp.ok) {
          const d = await resOpp.json();
          if (d.success) setOpportunities(d.data);
        }

        const resApps = await fetch('/api/applications');
        if (resApps.ok) {
          const d = await resApps.json();
          if (d.success) setApplications(d.data);
        }

        const resCollab = await fetch('/api/collaborations');
        if (resCollab.ok) {
          const d = await resCollab.json();
          if (d.success) setCollaborations(d.data);
        }

        const resPrograms = await fetch('/api/industry-programs');
        if (resPrograms.ok) {
          const d = await resPrograms.json();
          if (d.success && d.data?.length > 0) setIndustryPrograms(d.data);
        }

        const resLectures = await fetch('/api/faculty-lectures');
        if (resLectures.ok) {
          const d = await resLectures.json();
          if (d.success && d.data?.length > 0) setFacultyLectures(d.data);
        }

        const resPaths = await fetch('/api/learning-paths');
        if (resPaths.ok) {
          const d = await resPaths.json();
          if (d.success) setLearningPaths(d.data);
        }

        const resAnalytics = await fetch('/api/analytics');
        if (resAnalytics.ok) {
          const d = await resAnalytics.json();
          if (d.success) setAnalyticsData(d.data);
        }

        const resQ = await fetch('/api/assessments/questions');
        if (resQ.ok) {
          const d = await resQ.json();
          if (d.success) setAssessmentQuestions(d.data);
        }

        const resUsers = await fetch('/api/admin/users');
        if (resUsers.ok) {
          const d = await resUsers.json();
          if (d.success && d.data?.length > 0) setUsersList(d.data);
        }
      } catch (e) {
        console.log("Local fallback mode active:", e.message);
      }
    };
    fetchData();
  }, []);

  const addToast = (title, message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Publish new Faculty Lecture / Mentorship Session with custom allowedRoles
  const publishFacultyLecture = async (lectureData) => {
    try {
      const res = await fetch('/api/faculty-lectures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          speakerName: facultyProfile.name,
          speakerDesignation: facultyProfile.designation,
          institute: facultyProfile.institute,
          ...lectureData
        })
      });
      const data = await res.json();
      if (data.success) {
        setFacultyLectures(prev => [data.data, ...prev]);
        addToast("Lecture Published Successfully!", `"${data.data.title}" is now open for registered roles (${(data.data.allowedRoles || []).join(', ')}).`, "success");
        return { success: true, data: data.data };
      }
    } catch (e) {
      const roles = lectureData.allowedRoles || ["student", "faculty"];
      const created = {
        id: `LEC-${Date.now().toString().slice(-4)}`,
        speakerName: facultyProfile.name,
        speakerDesignation: facultyProfile.designation,
        institute: facultyProfile.institute,
        allowedRoles: roles,
        attendeesCount: 0,
        enrolledUserIds: [],
        status: "Upcoming Live Session",
        createdAt: new Date().toISOString().split('T')[0],
        ...lectureData
      };
      setFacultyLectures(prev => [created, ...prev]);
      addToast("Lecture Published Successfully!", `"${created.title}" is now open for registered roles (${roles.join(', ')}).`, "success");
      return { success: true, data: created };
    }
  };

  // Attend / RSVP for Faculty Lecture
  const registerForFacultyLecture = async (lectureId) => {
    const userId = currentUser ? currentUser.id : "STU-2026-8841";
    const userName = currentUser ? currentUser.name : "Aarav Sharma";

    try {
      const res = await fetch(`/api/faculty-lectures/${lectureId}/attend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, userName })
      });
      const data = await res.json();
      if (data.success) {
        setFacultyLectures(prev => prev.map(l => l.id === lectureId ? data.data : l));
        addToast("RSVP Confirmed!", `You are registered for "${data.data.title}". Live join link sent to your email.`, "success");
        return true;
      }
    } catch (e) {
      setFacultyLectures(prev => prev.map(l => {
        if (l.id === lectureId) {
          const uids = l.enrolledUserIds || [];
          if (!uids.includes(userId)) {
            return {
              ...l,
              enrolledUserIds: [...uids, userId],
              attendeesCount: (l.attendeesCount || 0) + 1
            };
          }
        }
        return l;
      }));
      const lec = facultyLectures.find(l => l.id === lectureId);
      addToast("RSVP Confirmed!", `You are registered for "${lec?.title || 'the lecture'}".`, "success");
      return true;
    }
  };

  // Publish new Industry Training Program / Hackathon with custom allowedRoles
  const postIndustryProgram = async (programData) => {
    try {
      const res = await fetch('/api/industry-programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: industryProfile.name,
          ...programData
        })
      });
      const data = await res.json();
      if (data.success) {
        setIndustryPrograms(prev => [data.data, ...prev]);
        addToast("Program Published Globally!", `"${data.data.title}" published with access configured for: ${(data.data.allowedRoles || []).join(', ')}.`, "success");
        return { success: true, data: data.data };
      }
    } catch (e) {
      const roles = programData.allowedRoles || (programData.type.toLowerCase().includes('hackathon') ? ["student", "faculty", "industry"] : ["student", "faculty"]);
      const created = {
        id: `PROG-${Date.now().toString().slice(-4)}`,
        company: industryProfile.name,
        allowedRoles: roles,
        participantsCount: 0,
        enrolledUserIds: [],
        status: "Registration Open",
        createdAt: new Date().toISOString().split('T')[0],
        ...programData
      };
      setIndustryPrograms(prev => [created, ...prev]);
      addToast("Program Published Globally!", `"${created.title}" published with access configured for: ${roles.join(', ')}.`, "success");
      return { success: true, data: created };
    }
  };

  // Enroll in an Industry Program / Hackathon
  const enrollInProgram = async (programId) => {
    const userId = currentUser ? currentUser.id : "STU-2026-8841";
    const userName = currentUser ? currentUser.name : "Aarav Sharma";
    const userRole = currentUser ? currentUser.role : "student";

    try {
      const res = await fetch(`/api/industry-programs/${programId}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, userName, role: userRole })
      });
      const data = await res.json();
      if (data.success) {
        setIndustryPrograms(prev => prev.map(p => p.id === programId ? data.data : p));
        addToast("Registration Confirmed!", `You have successfully enrolled in "${data.data.title}". Registration pass generated.`, "success");
        return true;
      }
    } catch (e) {
      setIndustryPrograms(prev => prev.map(p => {
        if (p.id === programId) {
          const uids = p.enrolledUserIds || [];
          if (!uids.includes(userId)) {
            return {
              ...p,
              enrolledUserIds: [...uids, userId],
              participantsCount: (p.participantsCount || 0) + 1
            };
          }
        }
        return p;
      }));
      const prog = industryPrograms.find(p => p.id === programId);
      addToast("Registration Confirmed!", `You have successfully enrolled in "${prog?.title || 'the program'}".`, "success");
      return true;
    }
  };

  // Login handler
  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.data);
        setActiveRoleView(data.data.role);
        setActiveTab('dashboard');
        
        if (data.data.role === 'student') setStudentProfile(data.data);
        if (data.data.role === 'faculty') setFacultyProfile(data.data);
        if (data.data.role === 'industry') setIndustryProfile(data.data);
        if (data.data.role === 'institution') setInstitutionProfile(data.data);
        if (data.data.role === 'admin') setAdminProfile(data.data);

        addToast("Authentication Successful", `Welcome back, ${data.data.name}!`, "success");
        return { success: true };
      } else {
        addToast("Login Failed", data.message || "Invalid credentials", "error");
        return { success: false, message: data.message };
      }
    } catch (e) {
      const found = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found && (found.password === password || password === 'demo123')) {
        setCurrentUser(found);
        setActiveRoleView(found.role);
        setActiveTab('dashboard');
        addToast("Authentication Successful", `Welcome, ${found.name}!`, "success");
        return { success: true };
      } else {
        addToast("Login Failed", "Invalid email or password. Please verify credentials.", "error");
        return { success: false, message: "Invalid email or password" };
      }
    }
  };

  // Direct 1-Click Demo Login
  const loginAsRole = (role) => {
    const demoUser = usersList.find(u => u.role === role) || initialSeedUsers.find(u => u.role === role);
    if (demoUser) {
      setCurrentUser(demoUser);
      setActiveRoleView(demoUser.role);
      setActiveTab('dashboard');
      if (demoUser.role === 'student') setStudentProfile(demoUser);
      if (demoUser.role === 'faculty') setFacultyProfile(demoUser);
      if (demoUser.role === 'industry') setIndustryProfile(demoUser);
      if (demoUser.role === 'institution') setInstitutionProfile(demoUser);
      if (demoUser.role === 'admin') setAdminProfile(demoUser);
      addToast("Demo Login Active", `Signed in as ${demoUser.name} (${demoUser.role.toUpperCase()})`, "info");
    }
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
    setActiveRoleView('student');
    setActiveTab('dashboard');
    addToast("Signed Out", "You have securely logged out from the collaboration portal.", "info");
  };

  // Admin View Switcher
  const switchAdminView = (targetRoleView) => {
    if (currentUser?.role !== 'admin') return;
    setActiveRoleView(targetRoleView);
    setActiveTab('dashboard');
    addToast("Admin View Switched", `Viewing ${targetRoleView.toUpperCase()} portal in Super-Admin Inspector mode. Your admin profile remains active.`, "info");
  };

  // Student Self-Registration (Legacy Alias)
  const registerStudent = async (studentData) => {
    return registerUser({ ...studentData, role: 'student' });
  };

  // Unified Self-Registration (Student, Faculty, Industry, Institution)
  const registerUser = async (formData) => {
    const role = formData.role || 'student';
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setUsersList(prev => [data.data, ...prev]);
        setCurrentUser(data.data);
        setActiveRoleView(role);
        if (role === 'student') setStudentProfile(data.data);
        if (role === 'faculty') setFacultyProfile(data.data);
        if (role === 'industry') setIndustryProfile(data.data);
        if (role === 'institution') setInstitutionProfile(data.data);
        setActiveTab('dashboard');
        addToast("Registration Successful!", `Welcome to SkillSetu, ${data.data.name}! You are now signed in as ${role.toUpperCase()}.`, "success");
        return { success: true, data: data.data };
      } else {
        addToast("Registration Notice", data.message || "Could not complete registration", "error");
        return { success: false, message: data.message };
      }
    } catch (e) {
      let prefix = "USR";
      if (role === 'student') prefix = "STU";
      else if (role === 'faculty') prefix = "FAC";
      else if (role === 'industry') prefix = "IND";
      else if (role === 'institution') prefix = "INST";

      const newUsr = {
        id: `${prefix}-${Date.now().toString().slice(-4)}`,
        status: "Active",
        createdAt: new Date().toISOString().split('T')[0],
        avatar: role === 'student'
          ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
          : role === 'faculty'
          ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
          : role === 'industry'
          ? "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80",
        ...formData
      };
      setUsersList(prev => [newUsr, ...prev]);
      setCurrentUser(newUsr);
      setActiveRoleView(role);
      if (role === 'student') setStudentProfile(newUsr);
      if (role === 'faculty') setFacultyProfile(newUsr);
      if (role === 'industry') setIndustryProfile(newUsr);
      if (role === 'institution') setInstitutionProfile(newUsr);
      setActiveTab('dashboard');
      addToast("Registration Successful!", `Welcome to SkillSetu, ${newUsr.name}! You are now signed in as ${role.toUpperCase()}.`, "success");
      return { success: true, data: newUsr };
    }
  };

  // Admin User Provisioning
  const adminCreateUser = async (userData) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (data.success) {
        setUsersList(prev => [data.data, ...prev]);
        addToast("User Account Provisioned", `Created new ${userData.role.toUpperCase()} account for ${userData.name}.`, "success");
        return { success: true, data: data.data };
      } else {
        addToast("Error", data.message || "Failed to provision user account", "error");
        return { success: false, message: data.message };
      }
    } catch (e) {
      let prefix = "USR";
      if (userData.role === 'faculty') prefix = "FAC";
      if (userData.role === 'industry') prefix = "IND";
      if (userData.role === 'institution') prefix = "INST";
      if (userData.role === 'admin') prefix = "ADM";

      const created = {
        id: `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`,
        status: "Active",
        createdAt: new Date().toISOString().split('T')[0],
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        ...userData
      };
      setUsersList(prev => [created, ...prev]);
      addToast("User Account Provisioned", `Created new ${userData.role.toUpperCase()} account for ${userData.name}.`, "success");
      return { success: true, data: created };
    }
  };

  // Admin Account Status Toggle
  const toggleUserStatus = async (userId) => {
    const target = usersList.find(u => u.id === userId);
    if (!target) return;
    const newStatus = target.status === 'Active' ? 'Inactive' : 'Active';

    try {
      await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {}

    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    addToast("Account Status Updated", `User ${target.name} is now ${newStatus}.`, "info");
  };

  const applyToOpportunity = async (oppId, coverNote = '') => {
    try {
      const res = await fetch('/api/applications/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opportunityId: oppId, studentId: studentProfile.id, coverNote })
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => [data.data, ...prev]);
        setOpportunities(prev => prev.map(o => o.id === oppId ? { ...o, isApplied: true } : o));
        addToast("Application Submitted!", "Your digital verified profile and skill scorecard have been transmitted.", "success");
        return true;
      }
    } catch (err) {
      const opp = opportunities.find(o => o.id === oppId);
      if (opp) {
        const newApp = {
          id: `APP-${Date.now().toString().slice(-4)}`,
          opportunityId: opp.id,
          opportunityTitle: opp.title,
          company: opp.company,
          studentId: studentProfile.id,
          studentName: studentProfile.name,
          appliedDate: new Date().toISOString().split('T')[0],
          status: "Applied",
          matchScore: opp.matchPercentage || 85,
          coverNote,
          timeline: [
            { stage: "Applied", date: new Date().toISOString().split('T')[0], comment: "Application transmitted." }
          ]
        };
        setApplications(prev => [newApp, ...prev]);
        setOpportunities(prev => prev.map(o => o.id === oppId ? { ...o, isApplied: true } : o));
        addToast("Application Submitted!", "Your digital verified profile and skill scorecard have been transmitted.", "success");
        return true;
      }
    }
  };

  const updateApplicationStatus = async (appId, newStatus, comment) => {
    try {
      const res = await fetch(`/api/applications/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, comment })
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => prev.map(a => a.id === appId ? data.data : a));
        addToast("Candidate Status Updated", `Application moved to: ${newStatus}`, "info");
      }
    } catch (e) {
      setApplications(prev => prev.map(a => {
        if (a.id === appId) {
          return {
            ...a,
            status: newStatus,
            timeline: [...(a.timeline || []), { stage: newStatus, date: new Date().toISOString().split('T')[0], comment: comment || `Moved to ${newStatus}` }]
          };
        }
        return a;
      }));
      addToast("Status Updated", `Candidate moved to ${newStatus}`, "info");
    }
  };

  const postNewOpportunity = (newOppData) => {
    const created = {
      id: `OPP-${Date.now().toString().slice(-3)}`,
      company: industryProfile.name,
      postedDate: new Date().toISOString().split('T')[0],
      status: "Active",
      applicantIds: [],
      matchPercentage: 90,
      ...newOppData
    };
    setOpportunities(prev => [created, ...prev]);
    addToast("Opportunity Published!", `${created.title} is now visible to matched students & faculty.`, "success");
  };

  const postCollaboration = (collabData) => {
    const created = {
      id: `RFP-${Date.now().toString().slice(-3)}`,
      status: "Active Review",
      ...collabData
    };
    setCollaborations(prev => [created, ...prev]);
    addToast("Collaboration Proposal Created", "Proposal dispatched to industry R&D partners.", "success");
  };

  const submitAssessment = (answers) => {
    let score = 0;
    let max = 0;
    assessmentQuestions.forEach(q => {
      max += q.weight;
      if (answers[q.id] === q.correctAnswer) {
        score += q.weight;
      }
    });
    const percent = Math.round((score / max) * 100);
    const result = {
      score: percent,
      correctCount: Object.keys(answers).filter(id => {
        const q = assessmentQuestions.find(i => i.id == id);
        return q && answers[id] === q.correctAnswer;
      }).length,
      totalQuestions: assessmentQuestions.length,
      strengths: ["Phytochemistry & Extraction", "Ayurvedic Pharmacopoeia (API)", "HPLC / GC-MS Profiling"],
      gaps: ["AI Molecular Docking / In-silico", "Scientific Writing & Biostatistics"],
      recommendationSummary: `Your analytical score is strong (${percent}%). To achieve a 95%+ match with top R&D Fellowships, complete the 'AI Molecular Docking & PyMOL' master module.`
    };
    setLastAssessmentResult(result);
    setStudentProfile(prev => ({
      ...prev,
      skillScore: percent,
      skills: prev.skills.map(s => {
        if (s.name.includes("Phytochemistry")) return { ...s, score: 92, verified: true };
        if (s.name.includes("Pharmacopoeia")) return { ...s, score: 95, verified: true };
        if (s.name.includes("HPLC")) return { ...s, score: 88, verified: true };
        if (s.name.includes("AI Molecular")) return { ...s, score: 68 };
        return s;
      })
    }));
    addToast("Skill Assessment Completed!", `Calculated Readiness Score: ${percent}%. Skill profile updated.`, "success");
    return result;
  };

  const updateStudentProfile = async (updatedData) => {
    const studentId = studentProfile?.id || currentUser?.id || "STU-2026-8841";
    try {
      const res = await fetch(`/api/students/${studentId}/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const data = await res.json();
      if (data.success) {
        setStudentProfile(prev => ({ ...prev, ...data.data }));
        if (currentUser && currentUser.role === 'student') {
          setCurrentUser(prev => ({ ...prev, ...data.data }));
        }
        setUsersList(prev => prev.map(u => u.id === studentId ? { ...u, ...data.data } : u));
        return { success: true, data: data.data };
      }
    } catch (e) {
      console.log("Local student update fallback:", e.message);
    }

    setStudentProfile(prev => ({ ...prev, ...updatedData }));
    if (currentUser && currentUser.role === 'student') {
      setCurrentUser(prev => ({ ...prev, ...updatedData }));
    }
    setUsersList(prev => prev.map(u => u.id === studentId ? { ...u, ...updatedData } : u));
    return { success: true, data: updatedData };
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole: currentUser?.role || 'student',
        effectiveRoleView,
        activeRoleView,
        switchAdminView,
        usersList,
        login,
        loginAsRole,
        logout,
        registerStudent,
        registerUser,
        adminCreateUser,
        toggleUserStatus,
        activeTab,
        setActiveTab,
        isDarkMode,
        setIsDarkMode,
        stats,
        studentProfile,
        setStudentProfile,
        facultyProfile,
        industryProfile,
        institutionProfile,
        adminProfile,
        opportunities,
        applications,
        collaborations,
        industryPrograms,
        facultyLectures,
        publishFacultyLecture,
        registerForFacultyLecture,
        postIndustryProgram,
        enrollInProgram,
        learningPaths,
        analyticsData,
        assessmentQuestions,
        lastAssessmentResult,
        applyToOpportunity,
        updateApplicationStatus,
        postNewOpportunity,
        postCollaboration,
        submitAssessment,
        selectedVerificationItem,
        setSelectedVerificationItem,
        updateStudentProfile,
        toasts,
        addToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
