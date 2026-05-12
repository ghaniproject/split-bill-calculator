"use client";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-slate-900 dark:text-white font-bold text-lg mb-1">
            MySplitBill
          </p>
        </div>
  
        <div className="text-center md:text-right">
          <p className="text-slate-400 dark:text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} MySplitBill by Ghann. All rights reserved.
          </p>
          <p className="text-slate-400 dark:text-slate-600 text-[10px] mt-1 uppercase tracking-widest font-bold">
            Fair & Easy Split
          </p>
        </div>
      </div>
    </footer>
  );
}
