import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  X, 
  ExternalLink,
  DollarSign,
  Layers,
  Clock,
  ArrowUpRight,
  FlaskConical,
  HeartPulse,
  Cpu,
  ShieldCheck,
  Sparkle,
  Apple,
  Atom,
  Sprout,
  Activity,
  Hospital,
  Scale,
  Bot,
  Zap,
  Truck
} from 'lucide-react';

export default function OpportunitiesExplorer() {
  const { opportunities, applyToOpportunity, studentProfile } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedOppForModal, setSelectedOppForModal] = useState(null);
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const domainCategories = [
    { id: 'All', label: '🌟 All 15 Domains', icon: Sparkles },
    { id: 'Formulation', label: '🧪 Formulation & Analytical', icon: FlaskConical },
    { id: 'Clinical', label: '🏥 Clinical Trials & GCP', icon: HeartPulse },
    { id: 'Informatics', label: '💻 AI & Computational Ayur-Informatics', icon: Cpu },
    { id: 'Cosmeceuticals', label: '✨ Herbal Cosmeceuticals', icon: Sparkle },
    { id: 'Nutraceuticals', label: '🍃 Nutraceuticals & Ayush Ahara', icon: Apple },
    { id: 'Nanomedicine', label: '🔬 Rasashastra & Nanomedicine', icon: Atom },
    { id: 'Agrotechnology', label: '🌾 GACP Agrotech & Sourcing', icon: Sprout },
    { id: 'Pharmacovigilance', label: '📊 Pharmacovigilance & Drug Safety', icon: Activity },
    { id: 'Hospital', label: '🩺 Hospital Ops & NABH', icon: Hospital },
    { id: 'Patent', label: '📜 Bio-Patents, IPR & TKDL', icon: Scale },
    { id: 'Medical Devices', label: '🤖 Panchakarma Bio-Robotics', icon: Bot },
    { id: 'Diagnostics', label: '⚡ Pulse Wave & Digital Diagnostics', icon: Zap },
    { id: 'Supply Chain', label: '🚚 Supply Chain & Blockchain', icon: Truck },
    { id: 'Quality', label: '🛡️ QA, GMP & Ayush Mark', icon: ShieldCheck }
  ];

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (opp.requiredSkills && opp.requiredSkills.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesType = selectedType === 'All' || opp.type.toLowerCase() === selectedType.toLowerCase();
    const matchesDomain = selectedDomain === 'All' || opp.domain.toLowerCase().includes(selectedDomain.toLowerCase());

    return matchesSearch && matchesType && matchesDomain;
  });

  const handleApplyClick = (opp) => {
    setSelectedOppForModal(opp);
    setCoverNote(`I am excited to apply for the ${opp.title} role at ${opp.company}. My verified academic profile from AIIA and skill credentials directly align with your requirements.`);
  };

  const handleConfirmApplication = async () => {
    if (!selectedOppForModal) return;
    setIsSubmitting(true);
    await applyToOpportunity(selectedOppForModal.id, coverNote);
    setIsSubmitting(false);
    setSelectedOppForModal(null);
  };

  const getDomainBadgeStyle = (domainStr = '') => {
    const d = domainStr.toLowerCase();
    if (d.includes('formulation')) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    if (d.includes('clinical')) return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    if (d.includes('informatics') || d.includes('computational')) return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800';
    if (d.includes('cosmeceutical')) return 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300 border-pink-200 dark:border-pink-800';
    if (d.includes('nutraceutical') || d.includes('ahara')) return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    if (d.includes('nanomedicine') || d.includes('rasashastra')) return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
    if (d.includes('agrotechnology') || d.includes('sourcing')) return 'bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300 border-lime-200 dark:border-lime-800';
    if (d.includes('pharmacovigilance')) return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    if (d.includes('hospital')) return 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-200 dark:border-teal-800';
    if (d.includes('patent') || d.includes('ipr') || d.includes('tkdl')) return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800';
    if (d.includes('robotics') || d.includes('device')) return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800';
    if (d.includes('diagnostics') || d.includes('pulse')) return 'bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300 border-violet-200 dark:border-violet-800';
    if (d.includes('supply chain') || d.includes('blockchain')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
    return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Search & Filter Bar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" />
              Industry Internships & Placement Gateway
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verified corporate openings across 15+ specialized domains in Ayush, Biotech, Clinical Trials, Cosmeceuticals, AI, and HealthTech.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            Showing <strong className="text-emerald-600 dark:text-emerald-400">{filteredOpportunities.length}</strong> verified opportunities
          </div>
        </div>

        {/* Primary Search and Opportunity Type Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Search Box */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by job title, domain, skills (e.g. HPLC, GCP, AI, Cosmeceuticals), or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Opportunity Types</option>
              <option value="Internship">🎓 Industry Internships</option>
              <option value="Placement">💼 Full-Time Placements</option>
              <option value="Live Project">🔬 Live Industry R&D Projects</option>
              <option value="Faculty Sabbatical">👨‍🏫 Faculty Sabbaticals</option>
            </select>
          </div>
        </div>

        {/* Quick Domain Selection Horizontal Scroller */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              Filter by Specialized Ayush & Biotech Domain:
            </span>
            {selectedDomain !== 'All' && (
              <button
                onClick={() => setSelectedDomain('All')}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
              >
                Clear Domain Filter
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
            {domainCategories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedDomain === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedDomain(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Opportunities Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOpportunities.map((opp) => {
          const isApplied = opp.isApplied;
          const matchScore = opp.matchPercentage || 85;

          return (
            <div
              key={opp.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 transition duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      opp.type === 'Internship'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : opp.type === 'Placement'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        : opp.type === 'Live Project'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                        : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                    }`}>
                      {opp.type}
                    </span>

                    {/* Domain Pill */}
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getDomainBadgeStyle(opp.domain)}`}>
                      {opp.domain}
                    </span>
                  </div>

                  {/* AI Compatibility Score */}
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    matchScore >= 85
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : matchScore >= 70
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      : 'bg-slate-500/10 text-slate-600 border border-slate-500/20'
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    <span>{matchScore}% AI Match</span>
                  </span>
                </div>

                {/* Role Title & Company */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {opp.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{opp.company}</span>
                  </p>
                </div>

                {/* Logistics Metadata */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{opp.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                    <DollarSign className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{opp.stipend}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Duration: {opp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Apply By: {opp.deadline}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {opp.description}
                </p>

                {/* Required Skills Badges */}
                {opp.requiredSkills && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Required Skills & AI Weights:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {opp.requiredSkills.map((sk, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-medium border border-slate-200/60 dark:border-slate-700/60"
                        >
                          {sk.name} <strong className="text-emerald-600 dark:text-emerald-400">({sk.weight}%)</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {opp.openings} Openings Available
                </span>

                {isApplied ? (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Application Submitted</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleApplyClick(opp)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
                  >
                    <span>1-Click Verified Apply</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Apply Confirmation Modal */}
      {selectedOppForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Submit Verified Application
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
                  {selectedOppForModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOppForModal(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Recruiter:</span>
                <strong className="text-slate-900 dark:text-slate-100">{selectedOppForModal.company}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Domain:</span>
                <span className="font-bold text-emerald-600">{selectedOppForModal.domain}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Transmitted Portfolio:</span>
                <span className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">
                  {studentProfile.rollNumber} (Verified AIIA Credential)
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Cover Note / Technical Statement:
              </label>
              <textarea
                rows={4}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800 dark:text-slate-200 text-xs"
              ></textarea>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedOppForModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmApplication}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSubmitting ? "Transmitting..." : "Confirm & Send Application"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
