import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  GraduationCap, 
  UserCheck, 
  Building2, 
  Landmark, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Copy, 
  Lock, 
  Power, 
  Sparkles,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export default function AdminUserManagement() {
  const { usersList, adminCreateUser, toggleUserStatus, addToast } = useApp();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');
  const [showProvisionModal, setShowProvisionModal] = useState(false);
  const [provisionRole, setProvisionRole] = useState('faculty'); // 'faculty' | 'industry' | 'institution' | 'admin'

  // Form states for provisioning
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    designation: '',
    department: '',
    institute: '',
    sector: '',
    location: 'Delhi NCR / Hybrid',
    contactPerson: '',
    accreditationScore: 'NAAC A++ / NIRF Top 5'
  });

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.institute && u.institute.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.sector && u.sector.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.department && u.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = selectedRoleFilter === 'all' || u.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  const handleOpenProvisionModal = (roleType) => {
    setProvisionRole(roleType);
    setFormState({
      name: '',
      email: '',
      password: `${roleType}123`,
      designation: roleType === 'faculty' ? 'Assistant Professor' : 'Director',
      department: 'Ayurvedic Medical Sciences',
      institute: 'All India Institute of Ayurveda (AIIA)',
      sector: 'Ayurvedic Healthcare & Formulation R&D',
      location: 'New Delhi / Bengaluru',
      contactPerson: '',
      accreditationScore: 'NAAC A++'
    });
    setShowProvisionModal(true);
  };

  const handleProvisionSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    await adminCreateUser({
      role: provisionRole,
      ...formState
    });

    setShowProvisionModal(false);
  };

  const copyCreds = (email, role) => {
    navigator.clipboard.writeText(`Email: ${email} | Password: ${role}123`);
    addToast("Credentials Copied", `Login info for ${email} copied to clipboard`, "info");
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              National Authorization & Provisioning Center
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] mt-1">
            Multi-Role User Provisioning & Account Governance
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Authorize and provision verified credentials for Faculty, Industry Partners, Institutions, and Sub-Admins.
          </p>
        </div>

        {/* Provisioning Quick Buttons */}
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => handleOpenProvisionModal('faculty')}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Faculty</span>
          </button>
          <button
            onClick={() => handleOpenProvisionModal('industry')}
            className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>+ Industry Partner</span>
          </button>
          <button
            onClick={() => handleOpenProvisionModal('institution')}
            className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>+ Institution TPO</span>
          </button>
        </div>
      </div>

      {/* Role Distribution Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div 
          onClick={() => setSelectedRoleFilter('student')}
          className={`p-3.5 rounded-xl border cursor-pointer transition ${
            selectedRoleFilter === 'student'
              ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/60'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-600">
              {usersList.filter(u => u.role === 'student').length}
            </span>
          </div>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Students</p>
          <p className="text-[10px] text-slate-400">Self-Registered</p>
        </div>

        <div 
          onClick={() => setSelectedRoleFilter('faculty')}
          className={`p-3.5 rounded-xl border cursor-pointer transition ${
            selectedRoleFilter === 'faculty'
              ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/60'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <UserCheck className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-indigo-600">
              {usersList.filter(u => u.role === 'faculty').length}
            </span>
          </div>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Faculty</p>
          <p className="text-[10px] text-slate-400">Admin Provisioned</p>
        </div>

        <div 
          onClick={() => setSelectedRoleFilter('industry')}
          className={`p-3.5 rounded-xl border cursor-pointer transition ${
            selectedRoleFilter === 'industry'
              ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/60'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-amber-600">
              {usersList.filter(u => u.role === 'industry').length}
            </span>
          </div>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Industry</p>
          <p className="text-[10px] text-slate-400">Corporate Verified</p>
        </div>

        <div 
          onClick={() => setSelectedRoleFilter('institution')}
          className={`p-3.5 rounded-xl border cursor-pointer transition ${
            selectedRoleFilter === 'institution'
              ? 'border-purple-500 bg-purple-50/60 dark:bg-purple-950/60'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <Landmark className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold text-purple-600">
              {usersList.filter(u => u.role === 'institution').length}
            </span>
          </div>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Institutions</p>
          <p className="text-[10px] text-slate-400">Placement Cells</p>
        </div>

        <div 
          onClick={() => setSelectedRoleFilter('admin')}
          className={`p-3.5 rounded-xl border cursor-pointer transition ${
            selectedRoleFilter === 'admin'
              ? 'border-red-500 bg-red-50/60 dark:bg-red-950/60'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <ShieldCheck className="w-4 h-4 text-red-600" />
            <span className="text-xs font-bold text-red-600">
              {usersList.filter(u => u.role === 'admin').length}
            </span>
          </div>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Admins</p>
          <p className="text-[10px] text-slate-400">System Officers</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, email, department, institute..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-slate-500 font-medium">Role Filter:</span>
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Roles ({usersList.length})</option>
            <option value="student">🎓 Students Only</option>
            <option value="faculty">👨‍🏫 Faculty Only</option>
            <option value="industry">🏢 Industry Partners Only</option>
            <option value="institution">🏛️ Institutions Only</option>
            <option value="admin">🛡️ System Admins</option>
          </select>
        </div>
      </div>

      {/* Users Roster Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4">User & Role</th>
                <th className="p-4">Affiliation / Organization</th>
                <th className="p-4">Department / Sector</th>
                <th className="p-4">Status</th>
                <th className="p-4">Provisioned</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredUsers.map((user) => {
                let badgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
                if (user.role === 'faculty') badgeClass = "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300";
                if (user.role === 'industry') badgeClass = "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
                if (user.role === 'institution') badgeClass = "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300";
                if (user.role === 'admin') badgeClass = "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";

                return (
                  <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar || user.logo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                          alt={user.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-900 dark:text-slate-100">{user.name}</span>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${badgeClass}`}>
                              {user.role}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 block">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-medium">
                      {user.institute || user.organization || user.location || "National Directorate"}
                    </td>

                    <td className="p-4 text-slate-500">
                      {user.department || user.sector || user.designation || "General Directorate"}
                    </td>

                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        user.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}>
                        {user.status || 'Active'}
                      </span>
                    </td>

                    <td className="p-4 text-slate-400 text-[11px]">
                      {user.createdAt || '2026-01-10'}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => copyCreds(user.email, user.role)}
                          title="Copy login credentials"
                          className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          title="Toggle active status"
                          className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provisioning Modal */}
      {showProvisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                  Administrator Provisioning
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
                  Provision New {provisionRole.toUpperCase()} Account
                </h3>
              </div>
              <button onClick={() => setShowProvisionModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProvisionSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {provisionRole === 'industry' ? 'Company / Organization Name *' : 'Full Name *'}:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={provisionRole === 'industry' ? 'e.g. Charak Pharma Ltd.' : 'e.g. Dr. Rajesh Kumar'}
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Authorized Official Email *:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="official@institution.gov.in"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Role specific fields */}
              {provisionRole === 'faculty' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Academic Designation:
                    </label>
                    <input
                      type="text"
                      value={formState.designation}
                      onChange={(e) => setFormState({ ...formState, designation: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Institute Affiliation:
                    </label>
                    <input
                      type="text"
                      value={formState.institute}
                      onChange={(e) => setFormState({ ...formState, institute: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {provisionRole === 'industry' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Industry Sector:
                    </label>
                    <input
                      type="text"
                      value={formState.sector}
                      onChange={(e) => setFormState({ ...formState, sector: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Location / HQ:
                    </label>
                    <input
                      type="text"
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {provisionRole === 'institution' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      TPO Officer / Dean Name:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Prof. R. K. Mishra"
                      value={formState.contactPerson}
                      onChange={(e) => setFormState({ ...formState, contactPerson: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Accreditation Status:
                    </label>
                    <input
                      type="text"
                      value={formState.accreditationScore}
                      onChange={(e) => setFormState({ ...formState, accreditationScore: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Default Access Password:
                </label>
                <input
                  type="text"
                  required
                  value={formState.password}
                  onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none font-mono"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  User can change this upon first login via their secure profile settings.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowProvisionModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authorize & Issue Credentials</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
