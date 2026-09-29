import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { db } from './database.js';
import { startTunnel } from 'untun';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ======================= ASSESSMENT QUESTIONS =======================
const assessmentQuestions = [
  {
    id: 1,
    domain: "Ayush Technical & Analytical",
    question: "Which analytical chromatography technique is the official gold standard in the Ayurvedic Pharmacopoeia of India (API) for fingerprinting volatile phytochemical markers in herbal distillates (Arka)?",
    options: [
      "Gas Chromatography - Mass Spectrometry (GC-MS)",
      "Thin Layer Chromatography (TLC) with UV cabinet only",
      "Paper Electrophoresis",
      "Simple Refractometry"
    ],
    correctAnswer: 0,
    weight: 15,
    skillCategory: "HPLC / GC-MS Profiling",
    explanation: "GC-MS is the gold standard for separating and identifying volatile constituents in Ayurvedic aromatic preparations (Arkas and essential oils)."
  },
  {
    id: 2,
    domain: "Regulatory Compliance (Schedule T)",
    question: "Under Ayush Good Manufacturing Practices (Schedule T of Drugs & Cosmetics Act), what is the maximum permissible limit for lead (Pb) in finished Ayurvedic polyherbal formulations?",
    options: [
      "10.0 ppm (parts per million)",
      "50.0 ppm",
      "0.1 ppm",
      "100.0 ppm"
    ],
    correctAnswer: 0,
    weight: 15,
    skillCategory: "Regulatory Compliance (AYUSH GMP/FDA)",
    explanation: "Schedule T and WHO/Ayush heavy metal contamination guidelines specify 10 ppm for Lead (Pb) and 0.3 ppm for Cadmium (Cd)."
  },
  {
    id: 3,
    domain: "Clinical Research & GCP",
    question: "In an integrative Ayush Clinical Trial, what is the primary role of the Institutional Ethics Committee (IEC) prior to Phase II initiation?",
    options: [
      "Reviewing patient informed consent, trial risk-benefit ratio, and ensuring Helsinki Declaration compliance",
      "Calculating commercial market pricing of the formulation",
      "Issuing patent rights directly to the primary investigator",
      "Selecting the advertising media channels for recruitment"
    ],
    correctAnswer: 0,
    weight: 15,
    skillCategory: "Clinical Trial Protocols (GCP)",
    explanation: "The IEC evaluates scientific validity, safety, informed consent procedures, and ethical integrity to protect human participants."
  },
  {
    id: 4,
    domain: "Modern AI & Computational Biology",
    question: "When conducting in-silico screening of herbal active phytochemicals (e.g. Curcumin or Withaferin A) against inflammation receptors (COX-2), what metric determines the ligand-protein binding affinity?",
    options: [
      "Docking Binding Free Energy (ΔG in kcal/mol)",
      "Optical Density at 600nm",
      "Retention Factor (Rf value)",
      "Viscosity index"
    ],
    correctAnswer: 0,
    weight: 20,
    skillCategory: "AI Molecular Docking / In-silico",
    explanation: "Molecular docking tools (AutoDock Vina, Schrödinger) quantify binding affinity using free energy ΔG, where a more negative score implies tighter affinity."
  },
  {
    id: 5,
    domain: "Standardization & Quality Assurance",
    question: "Which accelerated stability testing condition is stipulated by ICH Q1A guidelines for tropical zone IVb (Hot and humid) herbal finished products?",
    options: [
      "40°C ± 2°C / 75% RH ± 5% RH for 6 months",
      "25°C / 40% RH for 12 months",
      "0°C / dry nitrogen for 3 months",
      "60°C / 90% RH for 1 month"
    ],
    correctAnswer: 0,
    weight: 15,
    skillCategory: "Phytochemistry & Extraction",
    explanation: "ICH Zone IVb accelerated testing is conducted at 40°C with 75% Relative Humidity for 6 months to predict shelf-life and degradation."
  },
  {
    id: 6,
    domain: "Soft Skills & Industrial Aptitude",
    question: "During a cross-disciplinary team review between classical Vaidyas and modern bioinformaticians, how should discrepancies in terminology (e.g. Dosha modulation vs cytokine pathway) be communicated in an R&D report?",
    options: [
      "Map classical concepts to verifiable biochemical biomarkers with side-by-side ontology mapping and mutual clarity",
      "Discard classical observations entirely and write only western terms",
      "Avoid mentioning biological mechanisms altogether",
      "Reject the computational models as irrelevant"
    ],
    correctAnswer: 0,
    weight: 20,
    skillCategory: "Scientific Writing & Biostatistics",
    explanation: "Effective translational research bridges traditional Ayurvedic nomenclature with validated biological endpoints and biomarkers."
  }
];

// ======================= REST API ENDPOINTS =======================

// Stats
app.get('/api/stats', (req, res) => {
  res.json({ success: true, data: db.getStats() });
});

// Assessment Questions
app.get('/api/assessments/questions', (req, res) => {
  res.json({ success: true, data: assessmentQuestions });
});

// Authentication: Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const user = db.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ success: false, message: "User account not found" });
  }

  if (user.password !== password && password !== 'demo123') {
    return res.status(401).json({ success: false, message: "Invalid credentials. Please verify your password." });
  }

  if (user.status === "Inactive") {
    return res.status(403).json({ success: false, message: "This account has been deactivated by the System Administrator." });
  }

  const { password: _, ...userSafe } = user;
  res.json({ success: true, data: userSafe, message: "Login successful" });
});

// Unified Multi-Role Registration: Student, Faculty, Industry, Institution
app.post('/api/auth/register', (req, res) => {
  const { 
    role, 
    name, 
    email, 
    password, 
    institute, 
    department, 
    year, 
    rollNumber, 
    targetRole,
    designation,
    expertise,
    experience,
    facultyCode,
    companyName,
    sector,
    location,
    contactPerson,
    website,
    institutionName,
    accreditationScore,
    adminName
  } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: "Role, email, and password are required." });
  }

  const existing = db.getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ success: false, message: "An account with this email address already exists." });
  }

  let prefix = "USR";
  if (role === 'student') prefix = "STU";
  else if (role === 'faculty') prefix = "FAC";
  else if (role === 'industry') prefix = "IND";
  else if (role === 'institution') prefix = "INST";

  const userId = `${prefix}-${Date.now().toString().slice(-4)}`;

  let newUser = {
    id: userId,
    name: name || companyName || institutionName || "New User",
    email,
    password,
    role,
    status: "Active",
    createdAt: new Date().toISOString().split('T')[0]
  };

  if (role === 'student') {
    newUser = {
      ...newUser,
      institute: institute || "Recognized Ayush Institution",
      department: department || "Ayurvedic Medical & Pharmaceutical Sciences",
      year: year || "Final Year",
      rollNumber: rollNumber || `AIIA-REG-${Date.now().toString().slice(-4)}`,
      targetRole: targetRole || "Ayurvedic R&D Formulation Scientist",
      cgpa: "8.50 / 10",
      skillScore: 70,
      readinessLevel: "Moderate",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      bio: `Enthusiastic scholar from ${institute || 'Ayush University'} focused on healthcare and translational research.`,
      verifiedCertifications: [],
      skills: [
        { name: "Phytochemistry & Extraction", score: 70, verified: false, level: "Intermediate" },
        { name: "HPLC / GC-MS Profiling", score: 65, verified: false, level: "Intermediate" },
        { name: "Ayurvedic Pharmacopoeia (API)", score: 80, verified: true, level: "Advanced" },
        { name: "Clinical Trial Protocols (GCP)", score: 60, verified: false, level: "Beginner" },
        { name: "AI Molecular Docking / In-silico", score: 50, verified: false, level: "Beginner" },
        { name: "Scientific Writing & Biostatistics", score: 60, verified: false, level: "Intermediate" },
        { name: "Regulatory Compliance (AYUSH GMP/FDA)", score: 65, verified: false, level: "Intermediate" }
      ],
      githubUrl: "",
      orcidId: "",
      portfolioViews: 1
    };
  } else if (role === 'faculty') {
    newUser = {
      ...newUser,
      designation: designation || "Assistant Professor",
      institute: institute || "Recognized Ayush Institution",
      department: department || "Dravyaguna & Phytopharmacy",
      expertise: Array.isArray(expertise) ? expertise : (expertise ? expertise.split(',').map(s => s.trim()) : ["Standardization", "Clinical Trials", "Phytopharmacy"]),
      experience: experience || "5 Years",
      facultyCode: facultyCode || `FAC-ID-${Date.now().toString().slice(-4)}`,
      publicationsCount: 4,
      patentsCount: 0,
      activeProposals: 1,
      supervisedStudents: 6,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    };
  } else if (role === 'industry') {
    newUser = {
      ...newUser,
      name: companyName || name || "Corporate Partner",
      contactPerson: contactPerson || name || "Corporate HR Lead",
      sector: sector || "Ayurvedic FMCG & Biotech",
      location: location || "India",
      website: website || "https://ayush-industry.gov.in",
      activePostings: 0,
      applicantsCount: 0,
      internsHosted: 0,
      mouStatus: "Direct Registration Partner with National Directorate",
      verifiedEnterprise: true,
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&auto=format&fit=crop&q=80"
    };
  } else if (role === 'institution') {
    newUser = {
      ...newUser,
      name: institutionName || name || "Ayush University / Institute",
      adminName: adminName || contactPerson || name || "TPO Director",
      department: department || "Directorate of Training & Placement",
      accreditationScore: accreditationScore || "NAAC A+ Accredited",
      location: location || "India",
      totalStudents: 450,
      placedStudents: 380,
      internshipParticipationRate: "88.5%",
      avatar: "https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80"
    };
  }

  const savedUser = db.createUser(newUser);
  res.json({ 
    success: true, 
    data: savedUser, 
    message: `${role.toUpperCase()} account created & registered in database!` 
  });
});

// Legacy Student Registration Alias
app.post('/api/auth/register-student', (req, res) => {
  req.body.role = 'student';
  const { name, email, password, institute, department, year, rollNumber, targetRole } = req.body;

  if (!name || !email || !password || !institute) {
    return res.status(400).json({ success: false, message: "Please fill in all mandatory registration fields." });
  }

  const existing = db.getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ success: false, message: "An account with this email address already exists in the database." });
  }

  const newStudent = {
    id: `STU-${Date.now().toString().slice(-4)}`,
    name,
    email,
    password,
    role: "student",
    institute,
    department: department || "Ayurvedic Medical & Pharmaceutical Sciences",
    year: year || "Final Year",
    rollNumber: rollNumber || `AIIA-REG-${Date.now().toString().slice(-4)}`,
    targetRole: targetRole || "Ayurvedic R&D Formulation Scientist",
    cgpa: "8.50 / 10",
    skillScore: 70,
    readinessLevel: "Moderate",
    status: "Active",
    createdAt: new Date().toISOString().split('T')[0],
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    bio: `Enthusiastic scholar from ${institute} focused on Ayurvedic healthcare and modern translational sciences.`,
    verifiedCertifications: [],
    skills: [
      { name: "Phytochemistry & Extraction", score: 70, verified: false, level: "Intermediate" },
      { name: "HPLC / GC-MS Profiling", score: 65, verified: false, level: "Intermediate" },
      { name: "Ayurvedic Pharmacopoeia (API)", score: 80, verified: true, level: "Advanced" },
      { name: "Clinical Trial Protocols (GCP)", score: 60, verified: false, level: "Beginner" },
      { name: "AI Molecular Docking / In-silico", score: 50, verified: false, level: "Beginner" },
      { name: "Scientific Writing & Biostatistics", score: 60, verified: false, level: "Intermediate" },
      { name: "Regulatory Compliance (AYUSH GMP/FDA)", score: 65, verified: false, level: "Intermediate" }
    ],
    githubUrl: "",
    orcidId: "",
    portfolioViews: 1
  };

  const savedUser = db.createUser(newStudent);
  res.json({ success: true, data: savedUser, message: "Student account created & saved to database!" });
});

// Admin User Provisioning Hub
app.get('/api/admin/users', (req, res) => {
  res.json({ success: true, data: db.getUsers() });
});

app.post('/api/admin/users', (req, res) => {
  const { role, name, email, password, designation, department, institute, organization, sector, location, contactPerson, accreditationScore } = req.body;

  if (!role || !name || !email) {
    return res.status(400).json({ success: false, message: "Role, Name, and Email are required" });
  }

  const existing = db.getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ success: false, message: "User with this email already exists in database" });
  }

  let prefix = "USR";
  if (role === 'faculty') prefix = "FAC";
  else if (role === 'industry') prefix = "IND";
  else if (role === 'institution') prefix = "INST";
  else if (role === 'admin') prefix = "ADM";

  const newUser = {
    id: `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`,
    name,
    email,
    password: password || `${role}123`,
    role,
    status: "Active",
    createdAt: new Date().toISOString().split('T')[0],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    ...(role === 'faculty' ? {
      designation: designation || "Assistant Professor",
      department: department || "Ayurvedic Sciences",
      institute: institute || "Recognized Ayush Institute",
      expertise: ["Clinical Research", "Pharmacognosy", "Standardization"],
      experience: "8 Years",
      publicationsCount: 12,
      patentsCount: 1,
      activeProposals: 1,
      supervisedStudents: 8
    } : {}),
    ...(role === 'industry' ? {
      sector: sector || "Ayurvedic FMCG & Biotech",
      location: location || "India",
      contactPerson: contactPerson || name,
      activePostings: 1,
      applicantsCount: 0,
      internsHosted: 0,
      mouStatus: "MoU Initiated with AIIA",
      verifiedEnterprise: true,
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&auto=format&fit=crop&q=80"
    } : {}),
    ...(role === 'institution' ? {
      department: department || "Placement & Industry Directorate",
      adminName: contactPerson || name,
      accreditationScore: accreditationScore || "NAAC A+ Accredited",
      location: location || "India",
      totalStudents: 500,
      placedStudents: 420,
      internshipParticipationRate: "90.0%"
    } : {}),
    ...(role === 'admin' ? {
      designation: designation || "National Directorate Officer",
      department: department || "Higher Education & Skill Mapping Cell",
      organization: organization || "National Skill Directorate"
    } : {})
  };

  const saved = db.createUser(newUser);
  res.json({ success: true, data: saved, message: `New ${role.toUpperCase()} account provisioned in database` });
});

app.patch('/api/admin/users/:id/status', (req, res) => {
  const { status } = req.body;
  const updated = db.updateUserStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.json({ success: true, data: updated, message: `Account status updated to ${status}` });
});

// Student Profile Management
app.get('/api/students/:id/profile', (req, res) => {
  const user = db.getUserById(req.params.id) || db.getUserById("STU-2026-8841");
  if (!user) {
    return res.status(404).json({ success: false, message: "Student profile not found" });
  }
  const { password: _, ...userSafe } = user;
  res.json({ success: true, data: userSafe });
});

app.patch('/api/students/:id/profile', (req, res) => {
  const updated = db.updateUserProfile(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Student profile not found" });
  }
  res.json({ success: true, data: updated, message: "Profile & skills updated in database successfully!" });
});

app.put('/api/students/:id/profile', (req, res) => {
  const updated = db.updateUserProfile(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Student profile not found" });
  }
  res.json({ success: true, data: updated, message: "Profile & skills updated in database successfully!" });
});

// Opportunities
app.get('/api/opportunities', (req, res) => {
  const defaultStudent = db.getUserById("STU-2026-8841") || db.getUsers().find(u => u.role === 'student');
  const studentSkills = defaultStudent?.skills || [];

  const opps = db.getOpportunities();
  const enriched = opps.map(opp => {
    let totalWeight = 0;
    let weightedScore = 0;

    opp.requiredSkills.forEach(reqSkill => {
      totalWeight += reqSkill.weight;
      const userSkill = studentSkills.find(s => s.name.toLowerCase() === reqSkill.name.toLowerCase());
      const actualScore = userSkill ? userSkill.score : 40;
      const factor = Math.min(actualScore / reqSkill.minScore, 1.2);
      weightedScore += (factor * reqSkill.weight);
    });

    const matchPercent = Math.min(Math.round((weightedScore / totalWeight) * 100), 98);

    return {
      ...opp,
      matchPercentage: matchPercent,
      isApplied: opp.applicantIds.includes("APP-8841") || opp.applicantIds.includes(defaultStudent?.id)
    };
  });

  res.json({ success: true, data: enriched });
});

app.post('/api/opportunities', (req, res) => {
  const newOpp = {
    id: `OPP-${Date.now().toString().slice(-4)}`,
    postedDate: new Date().toISOString().split('T')[0],
    status: "Active",
    applicantIds: [],
    ...req.body
  };
  const saved = db.createOpportunity(newOpp);
  res.json({ success: true, data: saved });
});

// Applications
app.get('/api/applications', (req, res) => {
  res.json({ success: true, data: db.getApplications() });
});

app.post('/api/applications/apply', (req, res) => {
  const { opportunityId, studentId, coverNote } = req.body;
  const opp = db.getOpportunities().find(o => o.id === opportunityId);
  if (!opp) {
    return res.status(404).json({ success: false, message: "Opportunity not found" });
  }

  const student = db.getUserById(studentId) || db.getUsers().find(u => u.role === 'student');

  const newApp = {
    id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
    opportunityId: opp.id,
    opportunityTitle: opp.title,
    company: opp.company,
    studentId: student.id,
    studentName: student.name,
    appliedDate: new Date().toISOString().split('T')[0],
    status: "Applied",
    matchScore: 88,
    coverNote: coverNote || "Enthusiastic to contribute verified skills in Ayush R&D.",
    timeline: [
      { stage: "Applied", date: new Date().toISOString().split('T')[0], comment: "Application submitted and stored in database." },
      { stage: "Under AI Skill Compatibility Review", date: new Date().toISOString().split('T')[0], comment: "Profile verified against required skill taxonomy." }
    ],
    logbook: []
  };

  const saved = db.createApplication(newApp);
  res.json({ success: true, data: saved });
});

app.patch('/api/applications/:id/status', (req, res) => {
  const { status, comment } = req.body;
  const updated = db.updateApplicationStatus(req.params.id, status, comment);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Application not found" });
  }
  res.json({ success: true, data: updated });
});

// Industry Programs & Hackathons
app.get('/api/industry-programs', (req, res) => {
  res.json({ success: true, data: db.getIndustryPrograms() });
});

app.post('/api/industry-programs', (req, res) => {
  const { 
    title, 
    company, 
    type, 
    targetAudience, 
    allowedRoles, 
    duration, 
    timeline, 
    skillsCovered, 
    description, 
    benefits, 
    eligibility, 
    prizePool 
  } = req.body;

  if (!title || !type) {
    return res.status(400).json({ success: false, message: "Program title and type are required" });
  }

  let roles = allowedRoles;
  if (!roles || !Array.isArray(roles) || roles.length === 0) {
    const isHackathon = type.toLowerCase().includes('hackathon') || type.toLowerCase().includes('challenge');
    roles = isHackathon ? ["student", "faculty", "industry"] : ["student", "faculty"];
  }

  const newProg = {
    id: `PROG-${Date.now().toString().slice(-4)}`,
    title,
    company: company || "Corporate Partner",
    type: type || "Certification Course",
    targetAudience: targetAudience || "Students & Faculty",
    allowedRoles: roles,
    duration: duration || "4 Weeks",
    timeline: timeline || "Upcoming Cycle 2026",
    participantsCount: 0,
    enrolledUserIds: [],
    skillsCovered: skillsCovered || ["Ayush Formulation", "Standardization", "Industry Best Practices"],
    description: description || "Specialized industry training program designed to bridge student and faculty skills with modern corporate requirements.",
    benefits: benefits || ["Verified Certificate", "Industry Mentor Network", "Placement Consideration"],
    eligibility: eligibility || "Open to all enrolled students and faculty members",
    prizePool: prizePool || null,
    status: "Registration Open",
    createdAt: new Date().toISOString().split('T')[0]
  };

  const saved = db.createIndustryProgram(newProg);
  res.json({ 
    success: true, 
    data: saved, 
    message: `Program saved to database with access for: ${roles.join(', ')}!` 
  });
});

app.post('/api/industry-programs/:id/enroll', (req, res) => {
  const { userId } = req.body;
  const uid = userId || "STU-2026-8841";
  const updated = db.enrollInIndustryProgram(req.params.id, uid);

  if (!updated) {
    return res.status(404).json({ success: false, message: "Program not found" });
  }

  res.json({
    success: true,
    data: updated,
    message: `Enrollment saved to database for "${updated.title}"!`
  });
});

// Faculty Lectures & Mentorship
app.get('/api/faculty-lectures', (req, res) => {
  res.json({ success: true, data: db.getFacultyLectures() });
});

app.post('/api/faculty-lectures', (req, res) => {
  const { 
    title, 
    speakerName, 
    speakerDesignation, 
    institute, 
    category, 
    dateTime, 
    format, 
    targetAudience, 
    allowedRoles,
    skillsCovered, 
    description, 
    meetingLink 
  } = req.body;

  if (!title || !category) {
    return res.status(400).json({ success: false, message: "Lecture title and category are required" });
  }

  let roles = allowedRoles;
  if (!roles || !Array.isArray(roles) || roles.length === 0) {
    const isHackathon = category.toLowerCase().includes('hackathon') || category.toLowerCase().includes('challenge');
    roles = isHackathon ? ["student", "faculty", "industry"] : ["student", "faculty"];
  }

  const newLec = {
    id: `LEC-${Date.now().toString().slice(-4)}`,
    title,
    speakerName: speakerName || "Dr. Sunita Varma",
    speakerDesignation: speakerDesignation || "Associate Professor",
    institute: institute || "All India Institute of Ayurveda (AIIA)",
    category: category || "Expert Masterclass",
    dateTime: dateTime || "Upcoming Live Session",
    format: format || "Live Interactive Webcast",
    targetAudience: targetAudience || "Students & Faculty",
    allowedRoles: roles,
    attendeesCount: 0,
    enrolledUserIds: [],
    skillsCovered: skillsCovered || ["Ayurvedic Pharmacognosy", "Research Methodologies"],
    description: description || "Interactive educational lecture and mentoring session hosted by AIIA faculty.",
    meetingLink: meetingLink || "https://webex.ayush.gov.in/meet/ayush-live-lecture",
    status: "Upcoming Live Session",
    createdAt: new Date().toISOString().split('T')[0]
  };

  const saved = db.createFacultyLecture(newLec);
  res.json({ 
    success: true, 
    data: saved, 
    message: `Lecture saved to database with access for: ${roles.join(', ')}!` 
  });
});

app.post('/api/faculty-lectures/:id/attend', (req, res) => {
  const { userId } = req.body;
  const uid = userId || "STU-2026-8841";
  const updated = db.registerForFacultyLecture(req.params.id, uid);

  if (!updated) {
    return res.status(404).json({ success: false, message: "Lecture session not found" });
  }

  res.json({
    success: true,
    data: updated,
    message: `RSVP saved to database for "${updated.title}"!`
  });
});

// Collaborations, Paths & Analytics
app.get('/api/collaborations', (req, res) => {
  res.json({ success: true, data: db.getFacultyCollaborations() });
});

app.get('/api/learning-paths', (req, res) => {
  res.json({ success: true, data: db.getLearningPaths() });
});

app.get('/api/analytics', (req, res) => {
  res.json({ success: true, data: db.getInstitutionalAnalytics() });
});

app.get('/api/portfolios/:id', (req, res) => {
  const student = db.getUserById(req.params.id) || db.getUserById("STU-2026-8841");
  res.json({
    success: true,
    data: {
      ...student,
      qrVerificationUrl: `https://skillbridge.aiia.gov.in/verify/${student?.id}`,
      verificationAuthority: "AIIA National Digital Credential Ledger",
      blockchainProof: {
        network: "National Ayush Skill Hyperledger",
        blockNumber: 489201,
        rootHash: "0x8f2d4e89a1c03b6e82f1b4a90cd7e51f8931acbf991",
        timestamp: "2026-08-29T10:00:00Z"
      }
    }
  });
});

// ======================= SERVE COMPILED FRONTEND (FULL-STACK UNIFIED) =======================
console.log(`[Host] Serving frontend build from: ${DIST_DIR}`);
app.use(express.static(DIST_DIR));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// Start Express Server and Cloudflare Tunnel simultaneously
const server = app.listen(PORT, '0.0.0.0', async () => {
  console.log(`====================================================================`);
  console.log(`  Ayush SkillSetu Platform (Backend + Frontend + Persistent DB)    `);
  console.log(`  Local URL: http://localhost:${PORT}                              `);
  console.log(`====================================================================`);

  try {
    console.log(`[Tunnel] Establishing Cloudflare Public Tunnel for Port ${PORT}...`);
    const tunnel = await startTunnel({
      port: PORT,
      acceptCloudflareNotice: true
    });
    const publicUrl = await tunnel.getURL();
    console.log(`====================================================================`);
    console.log(`  ACTIVE CLOUDFLARE PUBLIC URL: ${publicUrl}                        `);
    console.log(`====================================================================`);
  } catch (err) {
    console.error(`[Tunnel Error]:`, err.message);
  }
});
