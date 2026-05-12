"use client";

import { 
  Calculator as CalcIcon, History, 
  LogIn, LogOut, User as UserIcon,
  CheckCircle2, Copy, Share2, Loader2
} from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
  user: any;
  shareUrl: string | null;
  copied: boolean;
  isSaving: boolean;
  isItemsEmpty: boolean;
  onLogout: () => void;
  onOpenAuth: () => void;
  onOpenHistory: () => void;
  onSave: () => void;
  onCopy: () => void;
}

export function Header({
  user,
  shareUrl,
  copied,
  isSaving,
  isItemsEmpty,
  onLogout,
  onOpenAuth,
  onOpenHistory,
  onSave,
  onCopy
}: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-md">
          <CalcIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Split Bill
          </h1>
          {user ? (
            <p className="text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center gap-1">
              <UserIcon className="w-3 h-3" /> {user.email}
            </p>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 text-sm">Patungan bareng teman</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        <ThemeToggle />
        
        {user ? (
          <button onClick={onLogout} className="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 px-3 py-2 rounded-full text-xs font-bold transition-colors">
            <LogOut className="w-3 h-3" /> Keluar
          </button>
        ) : (
          <button onClick={onOpenAuth} className="flex items-center gap-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 px-3 py-2 rounded-full text-xs font-bold transition-colors">
            <LogIn className="w-3 h-3" /> Login / Daftar
          </button>
        )}

        <button
          onClick={onOpenHistory}
          className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-600 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-400 px-4 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm"
        >
          <History className="w-4 h-4" />
          <span className="hidden sm:inline">Riwayat</span>
        </button>

        {shareUrl ? (
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 pr-3 rounded-full border border-green-200 dark:border-green-900/50 shadow-sm animate-in fade-in max-w-[200px] sm:max-w-xs">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-2 rounded-full">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 truncate text-xs text-slate-600 dark:text-slate-300">
              {shareUrl}
            </div>
            <button 
              onClick={onCopy}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-400 dark:text-slate-500" />}
            </button>
          </div>
        ) : (
          <button
            onClick={onSave}
            disabled={isSaving || isItemsEmpty}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">Simpan & Bagikan</span>
            <span className="sm:hidden">Simpan</span>
          </button>
        )}
      </div>
    </header>

  );
}
