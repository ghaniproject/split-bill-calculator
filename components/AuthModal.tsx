"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { supabase } from "@/utils/supabase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword,
      });
      if (error) throw error;
      onClose();
      setAuthEmail("");
      setAuthPassword("");
    } catch (error: any) {
      alert("Login gagal: " + error.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: authEmail,
        password: authPassword,
      });
      if (error) throw error;
      alert("Registrasi berhasil! Silakan cek email Anda atau langsung login jika konfirmasi email dimatikan.");
    } catch (error: any) {
      alert("Registrasi gagal: " + error.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Masuk / Daftar</h2>
          <button onClick={onClose} className="p-2 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Email</label>
            <input 
              type="email" required
              value={authEmail} onChange={e => setAuthEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500" 
              placeholder="Masukkan Email"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Password</label>
            <input 
              type="password" required
              value={authPassword} onChange={e => setAuthPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500" 
              placeholder="Masukkan Kata Sandi"
            />
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button type="submit" disabled={isAuthLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center">
              {isAuthLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Masuk"}
            </button>
            <button type="button" onClick={handleRegister} disabled={isAuthLoading} className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl transition-all active:scale-95 hover:bg-slate-200 dark:hover:bg-slate-700">
              Buat Akun Baru
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}
