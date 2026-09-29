# SkillSetu — Academia-Industry Collaboration & Skill Mapping Platform

**Problem Statement ID:** 26044  
**Title:** Portal for Academia - Industry collaboration for Skill Mapping, Internships and Placement  
**Theme:** Smart Automation  
**Category:** Software

---

## 🌟 Overview

**SkillSetu** is a unified intelligent digital ecosystem connecting **Students**, **Faculty Members**, **Industry Recruiters / CROs**, and **Academic Institutions (TPOs)** for real-time skill mapping, verifiable digital credentials, industrial sabbaticals, AI ATS candidate matching, and automated NAAC/NIRF accreditation reporting.

---

## 👥 Core Portals & Capabilities

### 1. 🎓 **Student / Scholar Portal**
- **AI Competency Diagnostic & Gap Radar:** Interactive assessment with automated gap closure roadmap.
- **Opportunities Explorer:** Filter and 1-click apply across 15 specialized life sciences & biotech domains.
- **My Skills & Profile Manager:** Full CRUD editor for competencies, completed projects, and verified blockchain certificates.
- **Digital Credential Portfolio:** Shareable verified portfolio with tamper-proof cryptographic proofs.

### 2. 👨‍🏫 **Faculty / Academician Portal**
- **Masterclasses & Expert Lectures:** Publish and schedule webinars with granular role-based attendance controls.
- **Industrial Sabbaticals:** Apply for corporate residencies and research fellowships.
- **Joint R&D & Consultancy (RFPs):** Submit collaborative grant proposals with industry co-sponsors.
- **Student Mentoring:** Track and sign off student lab logbooks and project milestones.

### 3. 🏢 **Industry Partner & Recruiter Portal**
- **Opportunity Posting Engine:** Create openings across 15 domains with customizable skill weights.
- **AI ATS Candidate Matcher:** Automatically score and rank applicants against required competencies.
- **Corporate Programs:** Publish industry hackathons, certification workshops, and FDPs.
- **Mentor Sign-off & Evaluation:** Issue authenticated completion records with mentor rating rubrics.

### 4. 🏛️ **Institution / TPO Portal**
- **Placement Readiness Index (PRI):** Real-time departmental analytics on student industry-readiness.
- **Corporate MoU Manager:** Track active partnerships, duration, and exchange metrics.
- **1-Click Compliance Exporter:** Export Criterion 5.2 and NIRF Placement Metrics in CSV / printable dossier formats.

### 5. 🛡️ **National Administration Console**
- **Inspector Mode:** Super-Admin oversight across all 4 role portals.
- **Multi-Role User Provisioning:** Grant, manage, and audit verified user accounts.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons, Recharts, Canvas Confetti
- **Backend:** Node.js, Express REST APIs, Persistent JSON Database Storage Engine
- **Verification Engine:** Cryptographic SHA-256 Hashing & Hyperledger-compatible Ledger Proofs
- **Deployment:** Zero-Config Unified Full-Stack Runner + Cloudflare Public Quick Tunnel

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/skillsetu-platform.git
cd skillsetu-platform

# 2. Install dependencies
npm install

# 3. Build frontend assets
npm run build

# 4. Start full-stack server (Local Port 5000 + Public Cloudflare Tunnel)
node server/serve_all.js
```

The application will be accessible locally at `http://localhost:5000` and over the public internet via the generated Cloudflare URL.

---

## 🔑 Demo Accounts for Testing

| Role | Email | Password |
| :--- | :--- | :--- |
| 🎓 **Student** | `student@aiia.gov.in` | `student123` |
| 👨‍🏫 **Faculty** | `faculty@aiia.gov.in` | `faculty123` |
| 🏢 **Industry Partner** | `recruitment@dabur-rnd.com` | `industry123` |
| 🏛️ **Institution / TPO** | `tpo@aiia.gov.in` | `tpo123` |
| 🛡️ **National Admin** | `admin@ayush.gov.in` | `admin123` |

---

## 📄 License
Open-source under the MIT License.
