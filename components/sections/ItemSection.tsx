"use client";

import { useState } from "react";
import { Receipt, Trash2 } from "lucide-react";
import { Item, Person } from "@/utils/calculator";
import { formatCurrency } from "@/utils/formatters";

interface ItemSectionProps {
  items: Item[];
  people: Person[];
  onAddItem: (name: string, price: number) => void;
  onRemoveItem: (id: string) => void;
  onTogglePerson: (itemId: string, personId: string) => void;
}

export function ItemSection({ items, people, onAddItem, onRemoveItem, onTogglePerson }: ItemSectionProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");

  const handleAdd = () => {
    if (!name.trim() || price === "" || price <= 0) return;
    onAddItem(name, Number(price));
    setName("");
    setPrice("");
  };

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors">
      <div className="flex items-center gap-2 mb-4 text-lg font-semibold border-b border-slate-100 dark:border-slate-800 pb-3 text-slate-900 dark:text-white">
        <Receipt className="w-5 h-5 text-indigo-500" />
        <h2>List Pesanan</h2>
      </div>

      <div className="space-y-4 mb-6">
        {items.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
            <Receipt className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">Belum ada pesanan yang ditambahkan.</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-3 transition-all hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:shadow-md bg-white dark:bg-slate-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{item.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    {formatCurrency(item.price)}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-2 uppercase tracking-widest">
                  Dibagi kepada:
                </p>
                <div className="flex flex-wrap gap-2">
                  {people.map((person) => {
                    const isShared = item.sharedBy.includes(person.id);
                    return (
                      <button
                        key={person.id}
                        onClick={() => onTogglePerson(item.id, person.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          isShared
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-sm scale-105"
                            : "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-600/50"
                        }`}
                      >
                        {person.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Nama Item"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
        <div className="relative flex-1 sm:max-w-[180px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold text-sm">
            Rp
          </span>
          <input
            type="number"
            placeholder="Harga"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white pl-10 pr-4 py-2.5 text-sm font-semibold focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        <button
          onClick={handleAdd}
          className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-black transition-all shadow-md active:scale-95 whitespace-nowrap"
        >
          Tambah
        </button>
      </div>
    </section>
  );
}
