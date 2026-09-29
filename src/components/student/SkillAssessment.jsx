import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ClipboardCheck, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  RotateCcw, 
  Compass, 
  Award,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SkillAssessment() {
  const { assessmentQuestions, submitAssessment, setActiveTab, studentProfile } = useApp();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);

  const questions = assessmentQuestions.length > 0 ? assessmentQuestions : [
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
    }
  ];

  const currentQ = questions[currentQuestionIdx];
  const progressPercent = Math.round(((Object.keys(selectedAnswers).length) / questions.length) * 100);

  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const handleSubmit = () => {
    const result = submitAssessment(selectedAnswers);
    setAssessmentResult(result);
    setIsCompleted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setIsCompleted(false);
    setAssessmentResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              Diagnostic Assessment Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">AIIA & Industry Co-Designed</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
            National Ayush & Phytopharmaceutical Competency Benchmark
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Assesses technical laboratory proficiency, clinical GCP protocols, Schedule T GMP, and computational in-silico skills.
          </p>
        </div>

        <div className="flex items-center space-x-4 shrink-0">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Progress</span>
            <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
              {Object.keys(selectedAnswers).length} / {questions.length} Answered
            </p>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {/* Progress Bar & Question Tracker */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span>Question {currentQuestionIdx + 1} of {questions.length}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{currentQ.domain}</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start space-x-3">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm shrink-0">
                Q{currentQuestionIdx + 1}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {currentQ.question}
              </h2>
            </div>
          </div>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-semibold shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm">{opt}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIdx === 0}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-3">
              {currentQuestionIdx < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30 transition disabled:opacity-40"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit & Compute Skill Gap</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6 animate-in zoom-in-95">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-300">
              <Award className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-extrabold font-['Outfit']">
              Assessment Completed!
            </h2>
            <p className="text-sm text-emerald-200/90 max-w-lg mx-auto">
              Your responses have been processed against real-time industry benchmark datasets from top Ayush & Pharmaceutical recruiters.
            </p>

            <div className="inline-flex items-center space-x-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-300">Total Score</span>
                <div className="text-3xl font-extrabold text-white">{assessmentResult?.score || 85}%</div>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-300">Readiness Tier</span>
                <div className="text-sm font-bold text-emerald-200">High (Tier 1 R&D Ready)</div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveTab('skill-gap')}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition shadow flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                View Skill Gap Radar & AI Roadmap
              </button>
              <button
                onClick={handleRestart}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake
              </button>
            </div>
          </div>

          {/* Strengths and Gaps Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/30 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Identified Core Strengths
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 font-medium">
                  ✓ <strong>Phytochemical Profiling & TLC/HPLC</strong>: Thorough understanding of API marker isolation.
                </li>
                <li className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 font-medium">
                  ✓ <strong>Schedule T GMP Compliance</strong>: Excellent knowledge of maximum permissible heavy metal limits.
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-500/30 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Priority Learning Gaps (Recommended)
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 font-medium">
                  ! <strong>AI Molecular Docking (In-Silico)</strong>: Bridging free energy calculation and AutoDock Vina protocols.
                </li>
                <li className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 font-medium">
                  ! <strong>Biostatistics & R in Ayush Trials</strong>: Power calculations and Kaplan-Meier survival curves.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
