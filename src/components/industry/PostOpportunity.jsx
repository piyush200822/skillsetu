import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  Trash2, 
  Building2,
  Sliders
} from 'lucide-react';

export default function PostOpportunity() {
  const { postNewOpportunity, setActiveTab, addToast } = useApp();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Internship');
  const [domain, setDomain] = useState('Formulation & Analytical Research');
  const [location, setLocation] = useState('Delhi NCR / Hybrid');
  const [stipend, setStipend] = useState('₹25,000 / month');
  const [duration, setDuration] = useState('6 Months');
  const [deadline, setDeadline] = useState('2026-09-30');
  const [openings, setOpenings] = useState(4);
  const [eligibility, setEligibility] = useState('Final year BAMS / M.Sc Ayur-Biotech / M.Pharm students with min 65% aggregate');
  const [description, setDescription] = useState('');
  
  const [requiredSkills, setRequiredSkills] = useState([
    { name: "Phytochemistry & Extraction", minScore: 75, weight: 30 },
    { name: "HPLC / GC-MS Profiling", minScore: 70, weight: 30 },
    { name: "Ayurvedic Pharmacopoeia (API)", minScore: 70, weight: 20 },
    { name: "Regulatory Compliance (AYUSH GMP/FDA)", minScore: 60, weight: 20 }
  ]);

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillMin, setNewSkillMin] = useState(70);
  const [newSkillWeight, setNewSkillWeight] = useState(25);

  const handleAddSkill = () => {
    if (!newSkillName) return;
    setRequiredSkills([...requiredSkills, {
      name: newSkillName,
      minScore: Number(newSkillMin),
      weight: Number(newSkillWeight)
    }]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (index) => {
    setRequiredSkills(requiredSkills.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    postNewOpportunity({
      title,
      type,
      domain,
      location,
      stipend,
      duration,
      deadline,
      openings: Number(openings),
      eligibility,
      description,
      requiredSkills,
      responsibilities: [
        "Collaborate with R&D team on extract standardisation and batch validation",
        "Document pharmacopoeial chromatography benchmarks according to API guidelines",
        "Prepare weekly audit reports for review"
      ],
      perks: ["PPO Consideration for top performers", "Publication co-authorship", "Direct mentorship from Chief Scientist"]
    });

    setActiveTab('candidate-matcher');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      {/* Header Info */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" />
            Recruiter Opportunity Builder
          </span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
          Publish Internship, Placement, or Live Industrial Project
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Define role parameters, eligibility criteria, and fine-tune your custom AI Skill Compatibility Weights to auto-filter top scholars.
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-xs">
        {/* Core Fields */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] border-b border-slate-100 dark:border-slate-800 pb-2">
            1. Role Details & Logistics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Opportunity Title:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Phytopharmaceutical Analytical R&D Intern"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Opportunity Type:
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="Internship">🎓 Student Internship</option>
                <option value="Placement">💼 Placement / Full-Time Role</option>
                <option value="Live Project">🔬 Industry Live Project</option>
                <option value="Apprenticeship">🛠️ Apprenticeship Scheme</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Domain / Industry Sector:
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="Formulation & Analytical Research">🧪 Formulation & Analytical Research</option>
                <option value="Clinical Operations & GCP">🏥 Clinical Operations & GCP Trials</option>
                <option value="Computational Ayur-Informatics">💻 Computational Ayur-Informatics & AI</option>
                <option value="Herbal Cosmeceuticals & Dermato-Formulations">✨ Herbal Cosmeceuticals & Dermato-R&D</option>
                <option value="Nutraceuticals & Functional Ayush Ahara">🍃 Nutraceuticals & Functional Ayush Ahara</option>
                <option value="Industrial Rasashastra & Nanomedicine">🔬 Industrial Rasashastra & Nanomedicine</option>
                <option value="Agrotechnology & Sustainable Herb Sourcing">🌾 Agrotechnology & Sustainable Herb Sourcing</option>
                <option value="Pharmacovigilance & Drug Safety Monitoring">📊 Pharmacovigilance & Drug Safety Monitoring</option>
                <option value="Hospital Administration & Clinical Informatics">🩺 Hospital Administration & Clinical Informatics</option>
                <option value="IPR, Bio-Patents & TKDL Strategy">📜 IPR, Bio-Patents & TKDL Strategy</option>
                <option value="Panchakarma Medical Devices & Robotics">🤖 Panchakarma Medical Devices & Robotics</option>
                <option value="Digital Health & Ayush Diagnostics">⚡ Digital Health & Ayush Diagnostics</option>
                <option value="Supply Chain, Logistics & Blockchain Provenance">🚚 Supply Chain & Blockchain Provenance</option>
                <option value="Quality Assurance & Compliance">🛡️ Quality Assurance, GLP & Ayush GMP</option>
                <option value="Academic-Industry Exchange">👨‍🏫 Academic-Industry Exchange & Sabbaticals</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Stipend / Salary Range:
              </label>
              <input
                type="text"
                required
                placeholder="₹25,000 / month"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Work Location:
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Openings:
                </label>
                <input
                  type="number"
                  min="1"
                  value={openings}
                  onChange={(e) => setOpenings(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Duration:
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Role Summary & Objectives:
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe the project scope, technical challenges, and lab environment..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
            ></textarea>
          </div>
        </div>

        {/* AI Skill Taxonomy & Weightage Configuration */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-['Outfit'] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                2. AI Skill Matching Weights & Taxonomy
              </h3>
              <p className="text-[11px] text-slate-500">
                The AI Matchmaking algorithm calculates candidate compatibility percentage based on these weights.
              </p>
            </div>
          </div>

          {/* Current Skills Weighted */}
          <div className="space-y-2">
            {requiredSkills.map((sk, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{sk.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                    Min Score: {sk.minScore}%
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold">
                    Algorithm Weight: {sk.weight}%
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-slate-400 hover:text-red-500 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Skill Row */}
          <div className="p-3.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-end gap-3">
            <div className="flex-1 w-full">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Add Required Competency:
              </label>
              <input
                type="text"
                placeholder="e.g. AI Molecular Docking / PyMOL"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
              />
            </div>
            <div className="w-full sm:w-28">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Min Score (%):
              </label>
              <input
                type="number"
                value={newSkillMin}
                onChange={(e) => setNewSkillMin(e.target.value)}
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
              />
            </div>
            <div className="w-full sm:w-28">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Weight (%):
              </label>
              <input
                type="number"
                value={newSkillWeight}
                onChange={(e) => setNewSkillWeight(e.target.value)}
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
              />
            </div>
            <button
              type="button"
              onClick={handleAddSkill}
              className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 text-white rounded-lg font-bold text-xs shrink-0"
            >
              Add Skill
            </button>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Publish Opportunity to Portal</span>
          </button>
        </div>
      </form>
    </div>
  );
}
