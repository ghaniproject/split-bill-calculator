"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { Loader2 } from "lucide-react";

export const dynamic = 'force-dynamic';

// Hooks
import { useAuth } from "@/hooks/useAuth";
import { useHistory } from "@/hooks/useHistory";
import { useBill } from "@/hooks/useBill";

// Components
import { AuthModal } from "@/components/AuthModal";
import { HistoryModal } from "@/components/HistoryModal";

// Sections
import { Header } from "@/components/sections/Header";
import { PeopleSection } from "@/components/sections/PeopleSection";
import { ItemSection } from "@/components/sections/ItemSection";
import { SettingsSection } from "@/components/sections/SettingsSection";
import { SummarySection } from "@/components/sections/SummarySection";
import { Footer } from "@/components/sections/Footer";

function SplitBillContent() {
  const searchParams = useSearchParams();
  const initialBillId = searchParams.get('id');

  // Custom Hooks
  const { user, logout } = useAuth();
  const { historyList, isLoadingHistory, loadHistory, saveToLocalHistory } = useHistory(user);
  const {
    people,
    items,
    settings,
    billResult,
    isSaving,
    isLoading,
    shareUrl,
    copied,
    setCopied,
    fetchBillById,
    saveBill,
    addPerson,
    removePerson,
    addItem,
    removeItem,
    toggleItemPerson,
    updateSettings,
  } = useBill(user, saveToLocalHistory);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    if (initialBillId) {
      fetchBillById(initialBillId);
    }
  }, [initialBillId, fetchBillById]);

  useEffect(() => {
    if (isHistoryOpen) {
      loadHistory();
    }
  }, [isHistoryOpen, loadHistory]);

  const handleCopy = () => {
    if (shareUrl && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          <p className="text-slate-500 dark:text-slate-400 font-medium italic">Mengambil data bill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans p-4 md:p-8 relative transition-colors duration-300">

      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
      <HistoryModal 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        historyList={historyList}
        isLoadingHistory={isLoadingHistory}
        onSelectHistory={(id) => {
          setIsHistoryOpen(false);
          fetchBillById(id);
        }}
        isCloud={!!user}
      />

      <div className="max-w-6xl mx-auto space-y-8">
        <Header 
          user={user}
          shareUrl={shareUrl}
          copied={copied}
          isSaving={isSaving}
          isItemsEmpty={items.length === 0}
          onLogout={logout}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onSave={saveBill}
          onCopy={handleCopy}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Input Data */}
          <div className="lg:col-span-7 space-y-6">
            <PeopleSection 
              people={people} 
              onAddPerson={addPerson} 
              onRemovePerson={removePerson} 
            />

            <ItemSection 
              items={items} 
              people={people} 
              onAddItem={addItem} 
              onRemoveItem={removeItem} 
              onTogglePerson={toggleItemPerson} 
            />
          </div>

          {/* Kolom Kanan: Pengaturan & Rincian (Sticky) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <SettingsSection 
              settings={settings} 
              onUpdateSettings={updateSettings} 
            />

            <SummarySection 
              billResult={billResult}
              shareUrl={shareUrl}
              isSaving={isSaving}
              canSave={items.length > 0}
              onSave={saveBill}
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    }>
      <SplitBillContent />
    </Suspense>
  );
}
