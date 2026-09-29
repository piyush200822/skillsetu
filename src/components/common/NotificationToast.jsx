import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationToast() {
  const { toasts } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let colorClasses = "bg-emerald-50 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800";

        if (toast.type === 'error') {
          Icon = AlertCircle;
          colorClasses = "bg-red-50 dark:bg-red-950/90 text-red-900 dark:text-red-200 border-red-300 dark:border-red-800";
        } else if (toast.type === 'info') {
          Icon = Info;
          colorClasses = "bg-blue-50 dark:bg-blue-950/90 text-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-800";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-lg border backdrop-blur-md flex items-start space-x-3 transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-3 ${colorClasses}`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 pr-2">
              <h4 className="text-xs font-bold">{toast.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
