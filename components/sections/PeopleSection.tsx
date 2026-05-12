"use client";

import { useState } from "react";
import { Users, Plus, Trash2 } from "lucide-react";
import { Person } from "@/utils/calculator";

interface PeopleSectionProps {
  people: Person[];
  onAddPerson: (name: string) => void;
  onRemovePerson: (id: string) => void;
}

export function PeopleSection({ people, onAddPerson, onRemovePerson }: PeopleSectionProps) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAddPerson(name);
    setName("");
  };

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors">
      <div className="flex items-center gap-2 mb-4 text-lg font-semibold border-b border-slate-100 dark:border-slate-800 pb-3 text-slate-900 dark:text-white">
        <Users className="w-5 h-5 text-indigo-500" />
        <h2>1. Siapa saja yang ikut?</h2>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {people.map((person) => (
          <div
            key={person.id}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
          >
            {person.name}
            <button
              onClick={() => onRemovePerson(person.id)}
              className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Nama teman..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />

        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>
    </section>
  );
}
