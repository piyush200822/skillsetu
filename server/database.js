import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'skillsetu_database.json');

// Initial Default Seed Data
const initialSeedData = {
  stats: {
    activeStudents: 14250,
    partnerIndustries: 480,
    academicInstitutes: 215,
    verifiedInternships: 3200,
    successfulPlacements: 2890,
    collaborativeProjects: 410,
    skillGapClosureRate: "87.4%",
    activeMoUs: 142
  },
  users: [
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
  ],
  opportunities: [
    {
      id: "OPP-101",
      title: "Ayurvedic Phytopharmaceutical R&D Intern",
      company: "Dabur Research & Development Foundation",
      type: "Internship",
      domain: "Formulation & Analytical Research",
      location: "Ghaziabad, Delhi NCR / Hybrid",
      stipend: "₹25,000 / month",
      duration: "6 Months (Full-Time)",
      postedDate: "2026-08-20",
      deadline: "2026-09-15",
      openings: 4,
      requiredSkills: [
        { name: "Phytochemistry & Extraction", minScore: 75, weight: 30 },
        { name: "HPLC / GC-MS Profiling", minScore: 70, weight: 30 },
        { name: "Ayurvedic Pharmacopoeia (API)", minScore: 70, weight: 20 },
        { name: "Regulatory Compliance (AYUSH GMP/FDA)", minScore: 60, weight: 20 }
      ],
      eligibility: "Final year BAMS / M.Sc / M.Pharm / Ayur-Biotech students with min 65% aggregate",
      description: "Join Dabur's flagship Phytomedicines Lab to work on standardizing classical Rasayana formulations using ultra-high performance liquid chromatography (UHPLC) and biological marker assays.",
      responsibilities: [
        "Conduct batch extraction optimization using microwave and supercritical CO2 methods",
        "Prepare validation protocols as per Schedule T & Ayush pharmacopoeial standards",
        "Co-author scientific trial dossiers for regulatory submission"
      ],
      perks: ["PPO (Pre-Placement Offer) potential for top 50%", "Publication co-authorship", "Direct mentorship by Chief Scientific Officer"],
      status: "Active",
      applicantIds: ["APP-8841"]
    },
    {
      id: "OPP-102",
      title: "Clinical Trial Coordinator (Ayush & Integrative Medicine)",
      company: "Himalaya Wellness Company",
      type: "Placement",
      domain: "Clinical Operations & GCP",
      location: "Bengaluru, Karnataka (On-site)",
      stipend: "₹6.5 - 8.5 LPA (Full-Time)",
      duration: "Full-Time Permanent",
      postedDate: "2026-08-22",
      deadline: "2026-09-25",
      openings: 6,
      requiredSkills: [
        { name: "Clinical Trial Protocols (GCP)", minScore: 75, weight: 35 },
        { name: "Scientific Writing & Biostatistics", minScore: 65, weight: 25 },
        { name: "Ayurvedic Pharmacopoeia (API)", minScore: 60, weight: 20 },
        { name: "Regulatory Compliance (AYUSH GMP/FDA)", minScore: 65, weight: 20 }
      ],
      eligibility: "BAMS / MD (Ayurveda) / M.Sc Clinical Research graduates",
      description: "Lead multicentric clinical trials for patented polyherbal immune modulators. Coordinate with IECs, monitor electronic case report forms (eCRF), and track adverse drug reactions (ADR) under Ayush Pharmacovigilance.",
      responsibilities: [
        "Manage trial site initiation, monitoring, and close-out across 5 partner hospitals",
        "Ensure GCP compliance and audit readiness",
        "Liaise with biostatisticians for interim and final trial reports"
      ],
      perks: ["Health Insurance", "Relocation Allowance", "Performance Bonus"],
      status: "Active",
      applicantIds: []
    },
    {
      id: "OPP-103",
      title: "AI-Assisted Drug Discovery & Molecular Docking Fellow",
      company: "Patanjali Research Foundation (PRI)",
      type: "Live Project",
      domain: "Computational Ayur-Informatics",
      location: "Haridwar / Remote",
      stipend: "₹30,000 / month + Research Grant",
      duration: "4 Months",
      postedDate: "2026-08-25",
      deadline: "2026-09-30",
      openings: 3,
      requiredSkills: [
        { name: "AI Molecular Docking / In-silico", minScore: 65, weight: 40 },
        { name: "Phytochemistry & Extraction", minScore: 65, weight: 25 },
        { name: "Scientific Writing & Biostatistics", minScore: 60, weight: 20 },
        { name: "Ayurvedic Pharmacopoeia (API)", minScore: 50, weight: 15 }
      ],
      eligibility: "Students & Scholars with knowledge of PyMOL, AutoDock, or Python Cheminformatics",
      description: "Work on an ongoing national flagship sponsored project targeting anti-viral and metabolic syndrome pathways using high-throughput in-silico screening of the Himalayan Flora Database.",
      responsibilities: [
        "Perform molecular dynamics simulations for top 50 screened ligands",
        "Compile ligand-target interaction matrices",
        "Contribute to high-impact Q1 research publications"
      ],
      perks: ["Cloud GPU Cluster Access", "Patent Co-inventor opportunity", "Certificate signed by Head of Research"],
      status: "Active",
      applicantIds: []
    },
    {
      id: "OPP-104",
      title: "Quality Control & Ayush Premium Mark Auditor Intern",
      company: "Baidyanath Research Labs",
      type: "Internship",
      domain: "Quality Assurance & Compliance",
      location: "Kolkata / Patna",
      stipend: "₹20,000 / month",
      duration: "3 Months",
      postedDate: "2026-08-26",
      deadline: "2026-09-20",
      openings: 5,
      requiredSkills: [
        { name: "Regulatory Compliance (AYUSH GMP/FDA)", minScore: 70, weight: 35 },
        { name: "HPLC / GC-MS Profiling", minScore: 65, weight: 30 },
        { name: "Phytochemistry & Extraction", minScore: 65, weight: 20 },
        { name: "Scientific Writing & Biostatistics", minScore: 50, weight: 15 }
      ],
      eligibility: "Undergraduate / Postgraduate students in Ayush & Pharmaceutical Quality Assurance",
      description: "Hands-on industrial training in auditing raw materials, batch manufacturing records (BMR), and obtaining Ayush Standard & Premium Marks for export batches.",
      responsibilities: [
        "Audit microbial bioburden and aflatoxin limits using standard USP/API assays",
        "Perform stability sample withdrawals and documentation",
        "Participate in mock internal GMP audits"
      ],
      perks: ["Formal Ayush QA Auditor Certificate", "Stipend & Travel Allowance"],
      status: "Active",
      applicantIds: []
    },
    {
      id: "OPP-105",
      title: "Faculty Industry Sabbatical & Advanced Standardization Training",
      company: "Zandu Care (Emami Group R&D)",
      type: "Faculty Sabbatical",
      domain: "Academic-Industry Exchange",
      location: "Vapi, Gujarat / Kolkata",
      stipend: "₹75,000 Research Fellowship / MoUs",
      duration: "2 Months (Summer / Winter Break)",
      postedDate: "2026-08-15",
      deadline: "2026-09-30",
      openings: 2,
      requiredSkills: [
        { name: "Phytochemistry & Extraction", minScore: 80, weight: 35 },
        { name: "Ayurvedic Pharmacopoeia (API)", minScore: 80, weight: 35 },
        { name: "Regulatory Compliance (AYUSH GMP/FDA)", minScore: 75, weight: 30 }
      ],
      eligibility: "Permanent / Contract Faculty of recognized Ayush / Pharmacy Institutes",
      description: "Designed specifically for academicians to gain hands-on commercial plant exposure, automated granulation, and pilot-scale supercritical extraction to modernize institutional curriculum.",
      responsibilities: [
        "Deliver guest lectures to industrial R&D scientists on classical references",
        "Participate in commercial tech transfer from lab to pilot plant",
        "Draft a joint curriculum update proposal for AIIA / NCISM"
      ],
      perks: ["Industry Sabbatical Certificate", "Joint Patent Formulation Agreement", "All Accommodation & Travel Covered"],
      status: "Active",
      applicantIds: []
    },
    {
      id: "OPP-106",
      title: "Ayurvedic Cosmeceutical & Skin Bio-assay Scientist",
      company: "Forest Essentials (Mountain Valley Springs)",
      type: "Internship",
      domain: "Herbal Cosmeceuticals & Dermato-Formulations",
      location: "Haridwar & Delhi NCR / Hybrid",
      stipend: "₹28,000 / month",
      duration: "6 Months",
      postedDate: "2026-08-27",
      deadline: "2026-10-05",
      openings: 3,
      requiredSkills: [
        { name: "Phytochemistry & Extraction", minScore: 75, weight: 35 },
        { name: "Regulatory Compliance (AYUSH GMP/FDA)", minScore: 65, weight: 25 },
        { name: "HPLC / GC-MS Profiling", minScore: 60, weight: 20 },
        { name: "Ayurvedic Pharmacopoeia (API)", minScore: 65, weight: 20 }
      ],
      eligibility: "BAMS / M.Sc Ayur-Biotech / M.Pharm / Cosmetic Science Scholars",
      description: "Formulate next-generation Ayurvedic anti-aging serums and cold-pressed botanical emulsions using classical Varnya and Twachya herbs validated by transdermal permeation assays.",
      responsibilities: [
        "Conduct stability testing of herbal creams under accelerated climatic chambers (ICH Q1A)",
        "Optimize micro-emulsion clarity and rheological flow parameters",
        "Document batch formulation dossiers for EU and FDA cosmetic compliance"
      ],
      perks: ["Pre-Placement Offer (PPO) Opportunity", "Product Formulation Royalty Credits", "Free Product Hamper"],
      status: "Active",
      applicantIds: []
    },
    {
      id: "OPP-107",
      title: "Herbal Nutraceutical & Functional Food Product Developer",
      company: "Amway Nutrilite Innovation Labs",
      type: "Placement",
      domain: "Nutraceuticals & Functional Ayush Ahara",
      location: "Gurugram, Haryana / On-site",
      stipend: "₹7.5 - 9.5 LPA (Full-Time)",
      duration: "Full-Time Permanent",
      postedDate: "2026-08-28",
      deadline: "2026-10-15",
      openings: 5,
      requiredSkills: [
        { name: "Phytochemistry & Extraction", minScore: 75, weight: 35 },
        { name: "Regulatory Compliance (AYUSH GMP/FDA)", minScore: 70, weight: 30 },
        { name: "Ayurvedic Pharmacopoeia (API)", minScore: 65, weight: 20 },
        { name: "Scientific Writing & Biostatistics", minScore: 60, weight: 15 }
      ],
      eligibility: "Post-graduates in Ayush Food Tech, M.Sc Biotechnology, BAMS + MBA",
      description: "Develop evidence-backed Ayush Ahara functional gummies, effervescent botanical tablets, and instant prebiotic Rasayana powders complying with FSSAI-Ayush dual regulations.",
      responsibilities: [
        "Engineer spray-dried herbal granulations with enhanced bioavailability",
        "Manage sensory evaluation panels and shelf-life nutrient retention audits",
        "File FSSAI Ayush Ahara product approvals and nutritional claim dossiers"
      ],
      perks: ["Annual Performance Bonus", "Comprehensive Health Cover", "Continuous Learning Stipend"],
      status: "Active",
      applicantIds: []
    },
    {
      id: "OPP-108",
      title: "Nanomedicine & Bhasma Characterization Research Fellow",
      company: "Charak Pharma & IIT Delhi Nanotech Collab",
      type: "Live Project",
      domain: "Industrial Rasashastra & Nanomedicine",
      location: "New Delhi & Mumbai",
      stipend: "₹35,000 / month + Research Grant",
      duration: "5 Months",
      postedDate: "2026-08-28",
      deadline: "2026-10-10",
      openings: 2,
      requiredSkills: [
        { name: "HPLC / GC-MS Profiling", minScore: 75, weight: 35 },
        { name: "Ayurvedic Pharmacopoeia (API)", minScore: 75, weight: 30 },
        { name: "Scientific Writing & Biostatistics", minScore: 65, weight: 20 },
        { name: "AI Molecular Docking / In-silico", minScore: 55, weight: 15 }
      ],
      eligibility: "MD (Rasashastra & Bhaishajya Kalpana) / M.Tech Nanotech / M.Sc Materials Science",
      description: "Investigate the sub-micron particle morphology and heavy metal speciation of Swarna and Yashada Bhasmas using HR-TEM, XRD, and ICP-MS to establish cellular biocompatibility.",
      responsibilities: [
        "Synthesize classical Marana batches with standardized heat cycles (Putas)",
        "Perform in-vitro cytotoxicity assays on human macrophage cell lines",
        "Publish high-impact Q1 papers on herbo-mineral nanoparticle safety"
      ],
      perks: ["Direct IIT Nanotech Lab Access", "Patent Co-authorship", "Conference Travel Sponsorship"],
      status: "Active",
      applicantIds: []
    },
    {
      id: "OPP-109",
      title: "GACP Medicinal Plant Cultivation & Sourcing Specialist",
      company: "Organic India",
      type: "Internship",
      domain: "Agrotechnology & Sustainable Herb Sourcing",
      location: "Lucknow & Bundelkhand / Field",
      stipend: "₹22,000 / month",
      duration: "4 Months",
      postedDate: "2026-08-29",
      deadline: "2026-10-08",
      openings: 4,
      requiredSkills: [
        { name: "Phytochemistry & Extraction", minScore: 70, weight: 35 },
        { name: "Regulatory Compliance (AYUSH GMP/FDA)", minScore: 65, weight: 30 },
        { name: "Ayurvedic Pharmacopoeia (API)", minScore: 65, weight: 35 }
      ],
      eligibility: "BAMS / B.Sc Agriculture / M.Sc Botany / Dravyaguna Scholars",
      description: "Work with tribal farming clusters on Good Agricultural and Collection Practices (WHO-GACP), soil bio-fertilizer optimization, and geo-tagged herb harvesting for Ashwagandha and Tulsi.",
      responsibilities: [
        "Implement GPS-based harvest lot traceability from farm to processing unit",
        "Conduct on-site soil heavy metal and pesticide residue test screenings",
        "Train farmer cooperatives in regenerative organic cultivation protocols"
      ],
      perks: ["Field Travel & Accommodation Allowance", "Fair-Trade Certification Experience", "PPO Track"],
      status: "Active",
      applicantIds: []
    },
    {
      id: "OPP-110",
      title: "Ayush Pharmacovigilance Associate & Safety Signal Analyst",
      company: "National Pharmacovigilance Centre (NPvCC), AIIA",
      type: "Placement",
      domain: "Pharmacovigilance & Drug Safety Monitoring",
      location: "New Delhi (On-site)",
      stipend: "₹5.5 - 7.0 LPA",
      duration: "Full-Time Permanent",
      postedDate: "2026-08-29",
      deadline: "2026-10-20",
      openings: 4,
      requiredSkills: [
        { name: "Clinical Trial Protocols (GCP)", minScore: 75, weight: 40 },
        { name: "Regulatory Compliance (AYUSH GMP/FDA)", minScore: 70, weight: 30 },
        { name: "Scientific Writing & Biostatistics", minScore: 65, weight: 30 }
      ],
      eligibility: "BAMS / MD (Ayurveda) / M.Pharm / M.Sc Clinical Pharmacology",
      description: "Monitor national adverse drug reaction (ADR) reports for polyherbal and classical Ayush medications, perform WHO-UMC causality assessments, and publish safety updates.",
      responsibilities: [
        "Process Individual Case Safety Reports (ICSRs) into global VigiFlow system",
        "Conduct signal detection for potential herb-drug interactions",
        "Liaise with Peripheral and Intermediary Pharmacovigilance Centres across India"
      ],
      perks: ["Central Government Research Accreditation", "WHO Fellowship Qualification", "Pension & Benefits"],
      status: "Active",
      applicantIds: []
    },
    {
      id: "OPP-111",
      title: "Integrative Hospital Operations & NABH Accreditation Trainee",
      company: "Medanta Integrative Ayush Care Centre",
      type: "Internship",
      domain: "Hospital Administration & Clinical Informatics",
      location: "Gurugram & Delhi NCR",
      stipend: "₹24,000 / month",
      duration: "6 Months",
      postedDate: "2026-08-29",
      deadline: "2026-10-12",
      openings: 5,
      requiredSkills: [
        { name: "Clinical Trial Protocols (GCP)", minScore: 70, weight: 40 },
        { name: "Regulatory Compliance (AYUSH GMP/FDA)", minScore: 65, weight: 30 },
        { name: "Scientific Writing & Biostatistics", minScore: 60, weight: 30 }
      ],
      eligibility: "BAMS graduates / MHA / MBA Healthcare Management students",
      description: "Optimize patient intake pathways, Ayush EHR clinical documentation, and lead quality audit readiness for NABH Ayush Hospital standards.",
      responsibilities: [
        "Audit clinical Panchakarma SOP compliance and patient consent documentation",
        "Map integrative referral workflows between Modern Allopathy and Ayurveda Depts",
        "Analyze patient clinical outcome metrics and satisfaction indices"
      ],
      perks: ["Hospital Operations Certification", "Direct Placement Transition", "Medical Benefits"],
      status: "Active",
      applicantIds: []
    },
    {
      id: "OPP-112",
      title: "Traditional Knowledge & Bio-Patent Landscaping Analyst",
      company: "LexOrbis Ayush & Life Sciences IP Cell",
      type: "Placement",
      domain: "IPR, Bio-Patents & TKDL Strategy",
      location: "New Delhi / Hybrid",
      stipend: "₹7.0 - 9.0 LPA",
      duration: "Full-Time Permanent",
      postedDate: "2026-08-30",
      deadline: "2026-10-25",
      openings: 3,
      requiredSkills: [
        { name: "Ayurvedic Pharmacopoeia (API)", minScore: 80, weight: 40 },
        { name: "Scientific Writing & Biostatistics", minScore: 70, weight: 30 },
        { name: "Regulatory Compliance (AYUSH GMP/FDA)", minScore: 65, weight: 30 }
      ],
      eligibility: "BAMS + LLB / M.Sc Biotechnology / Ph.D Scholars with patent knowledge",
      description: "Perform global patent freedom-to-operate (FTO) searches, cross-reference classical Ayurvedic texts against modern pharmaceutical patent claims, and draft bio-patent specifications.",
      responsibilities: [
        "Search Traditional Knowledge Digital Library (TKDL) and USPTO/EPO databases",
        "Draft patent claims protecting novel synergistic extraction processes",
        "Respond to patent examination reports and third-party oppositions"
      ],
      perks: ["Patent Attorney Mentorship", "Annual Bonus", "Flexible Hybrid Hours"],
      status: "Active",
      applicantIds: []
    },
    {
      id: "OPP-113",
      title: "Smart Panchakarma Automation & Bio-Sensor Design Fellow",
      company: "AIIA Biomedical Device & Instrumentation Cell",
      type: "Live Project",
      domain: "Panchakarma Medical Devices & Robotics",
      location: "New Delhi (Smart Lab)",
      stipend: "₹30,000 / month",
      duration: "6 Months",
      postedDate: "2026-08-30",
      deadline: "2026-10-18",
      openings: 3,
      requiredSkills: [
        { name: "AI Molecular Docking / In-silico", minScore: 65, weight: 35 },
        { name: "Clinical Trial Protocols (GCP)", minScore: 65, weight: 35 },
        { name: "Ayurvedic Pharmacopoeia (API)", minScore: 60, weight: 30 }
      ],
      eligibility: "BAMS + B.Tech Bio-Engineering / M.Des Medical Devices / Biomedical Engineers",
      description: "Design automated temperature-controlled Shirodhara dispensers, ergonomic smart Droni treatment tables with embedded pressure maps, and Swedana bio-steam sensors.",
      responsibilities: [
        "Calibrate IoT thermal sensors for maintaining constant Ayurvedic oil temperatures",
        "Conduct usability and safety testing with senior Panchakarma clinicians",
        "Prepare design dossiers for CDSCO medical device registration"
      ],
      perks: ["Patent Co-Inventor Status", "Startup Incubation Seed Grant", "Smart Lab Access"],
      status: "Active",
      applicantIds: []
    },
    {
      id: "OPP-114",
      title: "Computational Pulse Wave (Nadi) & Digital Diagnostic Analyst",
      company: "Atreya Innovations (Nadi Tarangini)",
      type: "Internship",
      domain: "Digital Health & Ayush Diagnostics",
      location: "Pune, Maharashtra / Hybrid",
      stipend: "₹28,000 / month",
      duration: "6 Months",
      postedDate: "2026-08-30",
      deadline: "2026-10-22",
      openings: 4,
      requiredSkills: [
        { name: "AI Molecular Docking / In-silico", minScore: 70, weight: 40 },
        { name: "Ayurvedic Pharmacopoeia (API)", minScore: 70, weight: 30 },
        { name: "Scientific Writing & Biostatistics", minScore: 65, weight: 30 }
      ],
      eligibility: "BAMS scholars, Data Science / Biomedical Computing students",
      description: "Correlate optical and piezoelectric radial arterial pulse signals with Vata-Pitta-Kapha physiological phenotypes using machine learning signal classification.",
      responsibilities: [
        "Collect clinical pulse waveform datasets from 500+ healthy and diseased subjects",
        "Train classification models to detect early metabolic and cardiovascular imbalances",
        "Co-author clinical validation papers for digital Ayush diagnostic tools"
      ],
      perks: ["Digital Health Patent Experience", "Full PPO Consideration", "Tech Allowance"],
      status: "Active",
      applicantIds: []
    },
    {
      id: "OPP-115",
      title: "Ayush Export Supply Chain & Blockchain Traceability Executive",
      company: "Pharmexcil & Ayush Export Promotion Council",
      type: "Placement",
      domain: "Supply Chain, Logistics & Blockchain Provenance",
      location: "Mumbai / Hyderabad",
      stipend: "₹6.0 - 8.0 LPA",
      duration: "Full-Time Permanent",
      postedDate: "2026-08-30",
      deadline: "2026-10-30",
      openings: 4,
      requiredSkills: [
        { name: "Regulatory Compliance (AYUSH GMP/FDA)", minScore: 75, weight: 40 },
        { name: "Phytochemistry & Extraction", minScore: 65, weight: 30 },
        { name: "Ayurvedic Pharmacopoeia (API)", minScore: 65, weight: 30 }
      ],
      eligibility: "BAMS / MBA Supply Chain / M.Sc Botany / International Trade Graduates",
      description: "Manage global export documentation, cold-chain botanical logistics, and deploy blockchain QR provenance tags to certify heavy-metal-free Ayurvedic shipments to US & EU markets.",
      responsibilities: [
        "Audit botanical consignment certificates of analysis (CoA) against EU Ph. Eur and US FDA limits",
        "Coordinate with international port customs authorities and phytosanitary inspection teams",
        "Track real-time blockchain ledger entries for Indian herbal export batches"
      ],
      perks: ["International Trade Delegations", "Annual Incentive Bonus", "Relocation Support"],
      status: "Active",
      applicantIds: []
    }
  ],
  applications: [
    {
      id: "APP-8841",
      opportunityId: "OPP-101",
      opportunityTitle: "Ayurvedic Phytopharmaceutical R&D Intern",
      company: "Dabur Research & Development Foundation",
      studentId: "STU-2026-8841",
      studentName: "Aarav Sharma",
      appliedDate: "2026-08-24",
      status: "Shortlisted",
      matchScore: 88,
      skillMatchBreakdown: {
        "Phytochemistry & Extraction": { required: 75, actual: 88, status: "Met" },
        "HPLC / GC-MS Profiling": { required: 70, actual: 82, status: "Met" },
        "Ayurvedic Pharmacopoeia (API)": { required: 70, actual: 92, status: "Met" },
        "Regulatory Compliance (AYUSH GMP/FDA)": { required: 60, actual: 70, status: "Met" }
      },
      timeline: [
        { stage: "Applied", date: "2026-08-24", comment: "Application submitted with verified digital portfolio." },
        { stage: "AI Profile Matched", date: "2026-08-24", comment: "Compatibility score computed: 88% (Exceeds 75% threshold)." },
        { stage: "Shortlisted", date: "2026-08-26", comment: "Shortlisted by Dr. Vikramaditya Nair (R&D Lead)." },
        { stage: "Technical Interview", date: "2026-09-02 (Scheduled)", comment: "Video round with Senior Chromatographer." }
      ],
      logbook: [
        { week: 1, topic: "Supercritical CO2 Extraction Calibration", hours: 35, status: "Approved" },
        { week: 2, topic: "HPLC Baseline Drift Resolution in Ashwagandha extracts", hours: 40, status: "Approved" }
      ],
      mentorRating: 4.8,
      mentorFeedback: "Aarav exhibits exceptional theoretical grounding in Dravyaguna paired with modern instrumental dexterity."
    }
  ],
  industryPrograms: [
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
  ],
  facultyLectures: [
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
  ],
  facultyCollaborations: [
    {
      id: "FDP-2026-01",
      title: "National FDP on AI & LC-MS/MS in Ayurvedic Bio-Standardization",
      organizer: "AIIA in collaboration with Waters Corporation & Dabur",
      type: "Faculty Development Program (FDP)",
      duration: "2 Weeks (Online + Hands-on Lab)",
      dates: "Oct 10 - Oct 22, 2026",
      seats: 40,
      seatsFilled: 29,
      stipendOrFee: "Nationally Sponsored (Free for Faculty)",
      status: "Open for Enrollment",
      description: "Intensive training for professors on integrating molecular docking, untargeted metabolomics, and automated spectral libraries into undergraduate and PG curriculums."
    },
    {
      id: "RFP-2026-09",
      title: "Industry Joint RFP: Formulating Nano-Encapsulated Curcumin for Bioavailability Enhancement",
      industryPartner: "Emami Healthcare & Ayurvedic Research Division",
      facultyLead: "Dr. Sunita Varma (AIIA)",
      budget: "₹28,50,000 (Sanctioned)",
      duration: "18 Months",
      status: "MoU Signed & Lab Testing Underway",
      type: "Collaborative Research"
    },
    {
      id: "CONSULT-2026-04",
      title: "Consultancy: Heavy Metal Speciation & Chelation Safety in Herbo-Mineral Bhasmas",
      client: "Ayush International Export Consortium",
      facultyConsultant: "Dr. Sunita Varma",
      remuneration: "₹3,50,000",
      status: "In Progress (Deliverable 2 submitted)",
      type: "Faculty Consultancy"
    }
  ],
  learningPaths: [
    {
      id: "PATH-01",
      title: "Ayurvedic R&D & Instrumental Phytochemistry Master Track",
      targetRole: "Ayurvedic R&D Formulation Scientist",
      totalModules: 5,
      estimatedDuration: "6 Weeks (Self-paced)",
      matchRelevance: "96% relevant to your dream role",
      modules: [
        {
          id: "M1",
          title: "Modern Extraction Methodologies (Soxhlet, Microwave, SFE)",
          duration: "10 hrs",
          status: "Completed",
          score: 92,
          verifiedBadge: "Extraction Specialist"
        },
        {
          id: "M2",
          title: "HPLC / HPTLC Fingerprinting & Marker Compound Quantitation",
          duration: "14 hrs",
          status: "Completed",
          score: 85,
          verifiedBadge: "Chromatography Pro"
        },
        {
          id: "M3",
          title: "Ayush Schedule T, WHO Guidelines & GLP Documentation",
          duration: "8 hrs",
          status: "In Progress",
          progress: 60,
          action: "Resume Module"
        },
        {
          id: "M4",
          title: "AI Molecular Docking & PyMOL for Herbal Ligand Target Discovery",
          duration: "16 hrs",
          status: "Recommended",
          gapAddressed: "AI Molecular Docking (+25% boost in matching score)",
          action: "Start Module"
        },
        {
          id: "M5",
          title: "Writing Industry-Grade Clinical Trial Protocols & IND Filings",
          duration: "12 hrs",
          status: "Locked",
          action: "Unlock after M3"
        }
      ]
    }
  ],
  institutionalAnalytics: {
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
      { department: "Dravyaguna & Phytopharmacy", readiness: 92, gap: "AI Cheminformatics" },
      { department: "Rasashastra & Bhasma Tech", readiness: 88, gap: "ICP-MS Automation" },
      { department: "Kayachikitsa (Clinical Trials)", readiness: 85, gap: "Biostatistics & R" },
      { department: "Panchakarma Tech & Rehab", readiness: 90, gap: "Digital Patient Monitoring" },
      { department: "Ayur-Biotech & Genomics", readiness: 81, gap: "GLP/GMP Auditing" }
    ],
    skillDemandTrends: [
      { skill: "Phytochemical Chromatography (HPLC/MS)", demandScore: 96, growth: "+28% YoY" },
      { skill: "Ayush GCP Clinical Trial Operations", demandScore: 91, growth: "+34% YoY" },
      { skill: "AI Molecular Docking & In-silico Targetting", demandScore: 89, growth: "+62% YoY" },
      { skill: "Ayush Standard & Premium Mark Compliance", demandScore: 84, growth: "+19% YoY" },
      { skill: "Formulation Stability Testing (ICH Q1A)", demandScore: 80, growth: "+15% YoY" }
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
  }
};

class Database {
  constructor() {
    this.data = null;
    this.init();
  }

  init() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      console.log("[DB] Initializing new SkillSetu Database File at:", DB_FILE);
      this.data = JSON.parse(JSON.stringify(initialSeedData));
      this.save();
    } else {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(raw);
        console.log("[DB] Loaded existing SkillSetu Database with", this.data.users?.length, "users and", this.data.opportunities?.length, "opportunities.");
      } catch (err) {
        console.error("[DB Error] Failed to read database file, resetting to seed data:", err.message);
        this.data = JSON.parse(JSON.stringify(initialSeedData));
        this.save();
      }
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error("[DB Error] Could not write database file:", err.message);
    }
  }

  // Stats
  getStats() {
    return this.data.stats;
  }

  // Users
  getUsers() {
    return this.data.users.map(({ password, ...u }) => u);
  }

  getUserByEmail(email) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  createUser(userData) {
    this.data.users.unshift(userData);
    if (userData.role === 'student') this.data.stats.activeStudents += 1;
    if (userData.role === 'industry') this.data.stats.partnerIndustries += 1;
    if (userData.role === 'institution') this.data.stats.academicInstitutes += 1;
    this.save();
    const { password, ...safeUser } = userData;
    return safeUser;
  }

  updateUserStatus(id, status) {
    const user = this.data.users.find(u => u.id === id);
    if (user) {
      user.status = status;
      this.save();
      return user;
    }
    return null;
  }

  updateStudentScore(id, score) {
    const user = this.data.users.find(u => u.id === id || u.role === 'student');
    if (user) {
      user.skillScore = score;
      this.save();
      return user;
    }
    return null;
  }

  updateUserProfile(id, updatedFields) {
    const user = this.data.users.find(u => u.id === id || u.role === 'student');
    if (user) {
      Object.assign(user, updatedFields);
      this.save();
      const { password, ...safeUser } = user;
      return safeUser;
    }
    return null;
  }

  // Opportunities
  getOpportunities() {
    return this.data.opportunities;
  }

  createOpportunity(oppData) {
    this.data.opportunities.unshift(oppData);
    this.save();
    return oppData;
  }

  // Applications
  getApplications() {
    return this.data.applications;
  }

  createApplication(appData) {
    this.data.applications.unshift(appData);
    const opp = this.data.opportunities.find(o => o.id === appData.opportunityId);
    if (opp && !opp.applicantIds.includes(appData.id)) {
      opp.applicantIds.push(appData.id);
    }
    this.save();
    return appData;
  }

  updateApplicationStatus(id, status, comment) {
    const appItem = this.data.applications.find(a => a.id === id);
    if (appItem) {
      appItem.status = status;
      appItem.timeline.push({
        stage: status,
        date: new Date().toISOString().split('T')[0],
        comment: comment || `Status updated to ${status}`
      });
      this.save();
      return appItem;
    }
    return null;
  }

  // Industry Programs & Hackathons
  getIndustryPrograms() {
    return this.data.industryPrograms;
  }

  createIndustryProgram(progData) {
    this.data.industryPrograms.unshift(progData);
    this.save();
    return progData;
  }

  enrollInIndustryProgram(progId, userId) {
    const prog = this.data.industryPrograms.find(p => p.id === progId);
    if (prog) {
      if (!prog.enrolledUserIds) prog.enrolledUserIds = [];
      if (!prog.enrolledUserIds.includes(userId)) {
        prog.enrolledUserIds.push(userId);
        prog.participantsCount = (prog.participantsCount || 0) + 1;
      }
      this.save();
      return prog;
    }
    return null;
  }

  // Faculty Lectures & Mentorship
  getFacultyLectures() {
    return this.data.facultyLectures;
  }

  createFacultyLecture(lecData) {
    this.data.facultyLectures.unshift(lecData);
    this.save();
    return lecData;
  }

  registerForFacultyLecture(lecId, userId) {
    const lec = this.data.facultyLectures.find(l => l.id === lecId);
    if (lec) {
      if (!lec.enrolledUserIds) lec.enrolledUserIds = [];
      if (!lec.enrolledUserIds.includes(userId)) {
        lec.enrolledUserIds.push(userId);
        lec.attendeesCount = (lec.attendeesCount || 0) + 1;
      }
      this.save();
      return lec;
    }
    return null;
  }

  // Collaborations, Paths & Analytics
  getFacultyCollaborations() {
    return this.data.facultyCollaborations;
  }

  getLearningPaths() {
    return this.data.learningPaths;
  }

  getInstitutionalAnalytics() {
    return this.data.institutionalAnalytics;
  }
}

export const db = new Database();
