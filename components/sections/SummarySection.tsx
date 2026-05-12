"use client";

import { Split, Loader2, Share2 } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

interface SummarySectionProps {
  billResult: any;
  shareUrl: string | null;
  isSaving: boolean;
  canSave: boolean;
  onSave: () => void;
}

export function SummarySection({ billResult, shareUrl, isSaving, canSave, onSave }: SummarySectionProps) {
  return (
    <section className="bg-indigo-900 text-white rounded-2xl shadow-xl border border-indigo-800 p-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-indigo-700/30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-40 h-40 rounded-full bg-indigo-500/20 blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 border-b border-indigo-700/50 pb-3">
          <div className="flex items-center gap-2">
            <Split className="w-5 h-5 text-indigo-300" />
            <h2 className="text-lg font-bold">Rincian Bayar</h2>
          </div>
        </div>

        <div className="overflow-x-auto mb-6 rounded-2xl border border-indigo-700/50 bg-indigo-950/40 backdrop-blur-sm -mx-2 sm:mx-0">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-indigo-800/80 text-indigo-200">
              <tr>
                <th className="px-4 py-3 font-bold uppercase tracking-wider">Nama</th>
                <th className="px-4 py-3 font-bold text-right uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-700/50">
              {billResult.personResults.map((pr: any) => (
                <tr key={pr.person.id} className="hover:bg-indigo-800/30 transition-colors group">
                  <td className="px-4 py-4">
                    <div className="font-bold text-white">{pr.person.name}</div>
                    <div className="text-[10px] text-indigo-200 mt-0.5">
                      Sub: {formatCurrency(pr.subtotal)}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="font-black text-indigo-50 text-sm">
                      {formatCurrency(pr.total)}
                    </div>
                    <div className="text-[10px] text-indigo-300 mt-0.5">
                      Tax/Srv: {formatCurrency(pr.taxAndServiceAmount)}
                    </div>
                  </td>
                </tr>
              ))}

              {billResult.personResults.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-4 py-10 text-center text-indigo-300 italic">
                    Belum ada perhitungan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-indigo-800/40 rounded-2xl p-4 border border-indigo-700/50 space-y-3">
          <div className="flex justify-between text-xs text-indigo-300">
            <span>Total Subtotal</span>
            <span className="font-semibold">{formatCurrency(billResult.subtotal)}</span>
          </div>
          <div className="flex justify-between text-xs text-indigo-300">
            <span>Pajak & Service</span>
            <span className="font-semibold">{formatCurrency(billResult.totalTaxAndService)}</span>
          </div>
          <div className="flex justify-between text-xl font-black text-white pt-3 border-t border-indigo-700/50">
            <span>Total</span>
            <span className="text-indigo-100 underline decoration-indigo-500 decoration-2 underline-offset-4">
              {formatCurrency(billResult.grandTotal)}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-2">
           {!shareUrl && (
             <button
               onClick={onSave}
               disabled={isSaving || !canSave}
               className="w-full bg-white text-indigo-900 py-3 rounded-xl font-black text-sm hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 disabled:bg-indigo-800 disabled:text-indigo-400"
             >
               {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5" />}
               SIMPAN & BAGIKAN LINK
             </button>
           )}
        </div>
      </div>
    </section>
  );
}
