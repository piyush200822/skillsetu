import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  X, 
  QrCode, 
  ExternalLink, 
  CheckCircle, 
  Copy, 
  FileBadge, 
  Lock, 
  Sparkles,
  Award
} from 'lucide-react';

export default function VerifiableModal() {
  const { selectedVerificationItem, setSelectedVerificationItem, studentProfile, addToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!selectedVerificationItem) return null;

  const item = selectedVerificationItem;
  const hash = item.hash || "0x8f2d4e89a1c03b6e82f1b4a90cd7e51f8931acbf991";
  const credentialId = item.credentialId || `AYU-VERIFIED-${studentProfile.id}`;

  const copyHash = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    addToast("Hash Copied", "Cryptographic proof hash copied to clipboard", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Certificate Top Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 relative">
          <button
            onClick={() => setSelectedVerificationItem(null)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Award className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
                  NATIONAL VERIFIABLE DIGITAL LEDGER
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/30 text-[10px] font-semibold text-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-300" /> Verifiable Proof
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {item.title || "Digital Skill Credential"}
              </h3>
            </div>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            {/* Mock QR Code */}
            <div className="shrink-0 w-28 h-28 bg-white dark:bg-slate-950 p-2 rounded-xl border border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center shadow-inner">
              <div className="grid grid-cols-5 gap-1 w-full h-full p-1 opacity-80">
                <div className="bg-slate-800 dark:bg-white rounded-sm"></div>
                <div className="bg-slate-800 dark:bg-white rounded-sm"></div>
                <div className="bg-transparent"></div>
                <div className="bg-slate-800 dark:bg-white rounded-sm"></div>
                <div className="bg-slate-800 dark:bg-white rounded-sm"></div>
                <div className="bg-slate-800 dark:bg-white rounded-sm"></div>
                <div className="bg-transparent"></div>
                <div className="bg-slate-800 dark:bg-white rounded-sm"></div>
                <div className="bg-transparent"></div>
                <div className="bg-slate-800 dark:bg-white rounded-sm"></div>
                <div className="bg-slate-800 dark:bg-white rounded-sm"></div>
                <div className="bg-slate-800 dark:bg-white rounded-sm"></div>
                <div className="bg-slate-800 dark:bg-white rounded-sm"></div>
                <div className="bg-slate-800 dark:bg-white rounded-sm"></div>
                <div className="bg-slate-800 dark:bg-white rounded-sm"></div>
              </div>
              <span className="text-[9px] font-mono text-slate-500 mt-1">SCAN TO AUDIT</span>
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Recipient Candidate:</span>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{studentProfile.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{studentProfile.institute}</p>
              </div>

              <div className="pt-1">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Issuing Authority:</span>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  {item.issuer || "AIIA National Certification Board"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">
                  ID: {credentialId}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" /> Tamper-Proof Validated
                </span>
              </div>
            </div>
          </div>

          {/* Cryptographic Ledger details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                Immutable Ledger Cryptographic Hash
              </span>
              <button
                onClick={copyHash}
                className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold"
              >
                <Copy className="w-3 h-3" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-950 rounded-xl font-mono text-xs text-slate-700 dark:text-slate-300 break-all border border-slate-200 dark:border-slate-800 select-all">
              {hash}
            </div>
          </div>

          {/* Audit Verification Log */}
          <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex justify-between">
              <span>Consensus Protocol:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Hyperledger Verified Fabric (National Framework)</span>
            </div>
            <div className="flex justify-between">
              <span>Timestamp of Attestation:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">2026-08-29 10:14:22 UTC</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Compliance:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">W3C Verifiable Credentials 2.0 / Schedule T</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Signed by AIIA Verification Controller
          </span>
          <button
            onClick={() => setSelectedVerificationItem(null)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
