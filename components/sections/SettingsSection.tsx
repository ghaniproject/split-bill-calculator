"use client";

import { DollarSign } from "lucide-react";
import { BillSettings } from "@/utils/calculator";

interface SettingsSectionProps {
  settings: BillSettings;
  onUpdateSettings: (newSettings: Partial<BillSettings>) => void;
}

export function SettingsSection({ settings, onUpdateSettings }: SettingsSectionProps) {
  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors">
      <div className="flex items-center gap-2 mb-4 text-lg font-semibold border-b border-slate-100 dark:border-slate-800 pb-3 text-slate-900 dark:text-white">
        <DollarSign className="w-5 h-5 text-indigo-500" />
        <h2>Pajak & Layanan</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">
            Pajak (%)
          </label>
          <input
            type="number"
            value={settings.taxPercent}
            onChange={(e) =>
              onUpdateSettings({ taxPercent: Number(e.target.value) })
            }
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 text-sm font-bold focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">
            Service (%)
          </label>
          <input
            type="number"
            value={settings.serviceChargePercent}
            onChange={(e) =>
              onUpdateSettings({ serviceChargePercent: Number(e.target.value) })
            }
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 text-sm font-bold focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>
    </section>

  );
}
