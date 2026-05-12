"use client";

import { History, X, ChevronRight, Clock, Users, Loader2 } from "lucide-react";
import { formatCurrency, formatDate } from "@/utils/formatters";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  historyList: any[];
  isLoadingHistory: boolean;
  onSelectHistory: (id: string) => void;
  isCloud: boolean;
}

export function HistoryModal({ 
  isOpen, 
  onClose, 
  historyList, 
  isLoadingHistory, 
  onSelectHistory,
}: HistoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh] animate-in slide-in-from-bottom-8 border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Riwayat Tagihan
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1 bg-slate-50/50 dark:bg-slate-950/20">
          {isLoadingHistory ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
            </div>
          ) : historyList.length === 0 ? (
            <div className="text-center py-10">
              <Clock className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">Belum ada riwayat.</p>
              <p className="text-slate-400 dark:text-slate-600 text-sm mt-1">Simpan kalkulasi untuk melihatnya di sini.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {historyList.map((hist) => (
                <button
                  key={hist.id}
                  onClick={() => onSelectHistory(hist.id)}
                  className="w-full text-left bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md hover:ring-2 hover:ring-indigo-100 dark:hover:ring-indigo-900 transition-all flex items-center justify-between group"
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                      {formatDate(hist.created_at)}
                    </p>
                    <p className="font-bold text-slate-800 dark:text-white text-lg">
                      {formatCurrency(hist.grandTotal)}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                      <Users className="w-3.5 h-3.5" /> {hist.peopleCount} Orang
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700 p-2 rounded-full text-slate-400 dark:text-slate-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
