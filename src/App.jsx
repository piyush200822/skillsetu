import React from 'react';
import { useApp } from './context/AppContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import NotificationToast from './components/common/NotificationToast';
import VerifiableModal from './components/common/VerifiableModal';
import AuthPage from './components/auth/AuthPage';

// Student Components
import StudentDashboard from './components/student/StudentDashboard';
import SkillAssessment from './components/student/SkillAssessment';
import SkillProfileGap from './components/student/SkillProfileGap';
import OpportunitiesExplorer from './components/student/OpportunitiesExplorer';
import ApplicationTracker from './components/student/ApplicationTracker';
import DigitalPortfolio from './components/student/DigitalPortfolio';
import StudentProfileManager from './components/student/StudentProfileManager';

// Faculty Components
import FacultyDashboard from './components/faculty/FacultyDashboard';
import FacultyLecturesHub from './components/faculty/FacultyLecturesHub';
import FacultyInternships from './components/faculty/FacultyInternships';
import FdpPrograms from './components/faculty/FdpPrograms';
import ResearchRfpHub from './components/faculty/ResearchRfpHub';
import StudentMentorship from './components/faculty/StudentMentorship';

// Industry Components
import IndustryDashboard from './components/industry/IndustryDashboard';
import PostOpportunity from './components/industry/PostOpportunity';
import CandidateMatcher from './components/industry/CandidateMatcher';
import IndustryPrograms from './components/industry/IndustryPrograms';
import InternEvaluations from './components/industry/InternEvaluations';

// Institution Components
import InstitutionalDashboard from './components/institution/InstitutionalDashboard';
import SkillDemandHeatmap from './components/institution/SkillDemandHeatmap';
import MouManager from './components/institution/MouManager';
import ComplianceExporter from './components/institution/ComplianceExporter';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUserManagement from './components/admin/AdminUserManagement';

// Shared
import CollaborationHub from './components/collaboration/CollaborationHub';

function AppContent() {
  const { currentUser, effectiveRoleView, activeTab, isDarkMode } = useApp();

  // If user is not authenticated, display login & student registration page
  if (!currentUser) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <AuthPage />
        <NotificationToast />
      </div>
    );
  }

  const renderActiveView = () => {
    // Student View
    if (effectiveRoleView === 'student') {
      switch (activeTab) {
        case 'dashboard': return <StudentDashboard />;
        case 'profile-manager': return <StudentProfileManager />;
        case 'assessment': return <SkillAssessment />;
        case 'skill-gap': return <SkillProfileGap />;
        case 'opportunities': return <OpportunitiesExplorer />;
        case 'applications': return <ApplicationTracker />;
        case 'portfolio': return <DigitalPortfolio />;
        case 'collaboration': return <CollaborationHub />;
        default: return <StudentDashboard />;
      }
    }

    // Faculty View
    if (effectiveRoleView === 'faculty') {
      switch (activeTab) {
        case 'dashboard': return <FacultyDashboard />;
        case 'expert-lectures': return <FacultyLecturesHub />;
        case 'faculty-internships': return <FacultyInternships />;
        case 'fdp-programs': return <FdpPrograms />;
        case 'research-rfp': return <ResearchRfpHub />;
        case 'mentorship': return <StudentMentorship />;
        case 'collaboration': return <CollaborationHub />;
        default: return <FacultyDashboard />;
      }
    }

    // Industry View
    if (effectiveRoleView === 'industry') {
      switch (activeTab) {
        case 'dashboard': return <IndustryDashboard />;
        case 'post-opportunity': return <PostOpportunity />;
        case 'candidate-matcher': return <CandidateMatcher />;
        case 'industry-programs': return <IndustryPrograms />;
        case 'evaluations': return <InternEvaluations />;
        case 'collaboration': return <CollaborationHub />;
        default: return <IndustryDashboard />;
      }
    }

    // Institution View
    if (effectiveRoleView === 'institution') {
      switch (activeTab) {
        case 'dashboard': return <InstitutionalDashboard />;
        case 'skill-trends': return <SkillDemandHeatmap />;
        case 'mous': return <MouManager />;
        case 'compliance-export': return <ComplianceExporter />;
        case 'collaboration': return <CollaborationHub />;
        default: return <InstitutionalDashboard />;
      }
    }

    // Admin View
    if (effectiveRoleView === 'admin') {
      switch (activeTab) {
        case 'dashboard': return <AdminDashboard />;
        case 'user-management': return <AdminUserManagement />;
        case 'skill-trends': return <SkillDemandHeatmap />;
        case 'mous': return <MouManager />;
        case 'compliance-export': return <ComplianceExporter />;
        case 'collaboration': return <CollaborationHub />;
        default: return <AdminDashboard />;
      }
    }

    return <StudentDashboard />;
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-['Plus_Jakarta_Sans'] transition-colors duration-200">
        <Header />
        
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 max-w-full overflow-x-hidden">
            {renderActiveView()}
          </main>
        </div>

        {/* Global Toast & Modals */}
        <NotificationToast />
        <VerifiableModal />
      </div>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
