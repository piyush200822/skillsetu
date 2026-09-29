import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ClipboardCheck, 
  Star, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Building2,
  ShieldCheck
} from 'lucide-react';

export default function InternEvaluations() {
  const { studentProfile, addToast, setSelectedVerificationItem } = useApp();
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("Aarav exhibits exceptional theoretical grounding in Dravyaguna paired with modern instrumental chromatography dexterity. Ready for immediate full-time R&D Scientist conversion.");
  const [isSignedOff, setIsSignedOff] = useState(false);

  const handleSignoff = () => {
    setIsSignedOff(true);
    addToast("Internship Completion Certificate Issued", `Digital Certificate with cryptographic hash anchored for ${studentProfile.name}.`, "success");
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
            Mentor Review & Sign-Off Portal
          </span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-['Outfit']">
          Internship Completion Evaluation & Credential Issuance
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Provide mentor feedback, assess technical lab performance, and generate tamper-proof blockchain verified completion records.
        </p>
      </div>

      {/* Evaluation Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3.5">
            <img
              src={studentProfile.avatar}
              alt={studentProfile.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {studentProfile.name}
              </h3>
              <p className="text-xs text-slate-500">{studentProfile.institute}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                Ayurvedic Phytopharmaceutical R&D Intern (Dabur R&D)
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            75 Lab Hours Logged
          </span>
        </div>

        {/* Rating selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
            Overall Performance Rating (1 - 5 Stars):
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 hover:scale-110 transition"
              >
                <Star
                  className={`w-7 h-7 ${
                    star <= rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300 dark:text-slate-700'
                  }`}
                />
              </button>
            ))}
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 pl-2">
              {rating}.0 / 5.0 (Outstanding)
            </span>
          </div>
        </div>

        {/* Feedback text */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-slate-700 dark:text-slate-300 block">
            Industry Mentor Confidential Feedback & Recommendation:
          </label>
          <textarea
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Signoff and Certify */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Evaluator: <strong>Dr. Vikramaditya Nair (Chief Scientific Officer, Dabur R&D)</strong>
          </div>

          {isSignedOff ? (
            <div className="px-5 py-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2 border border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Certificate Generated & Transmitted</span>
            </div>
          ) : (
            <button
              onClick={handleSignoff}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 transition flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Issue Official Ayush Completion Certificate</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
