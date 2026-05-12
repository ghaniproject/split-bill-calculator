import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { calculateBill, Person, Item, BillSettings } from "@/utils/calculator";

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function useBill(user: any, saveToLocalHistory: (id: string) => void) {
  const router = useRouter();
  
  const [people, setPeople] = useState<Person[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [settings, setSettings] = useState<BillSettings>({
    taxPercent: 11,
    serviceChargePercent: 5,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const billResult = useMemo(
    () => calculateBill(people, items, settings),
    [people, items, settings]
  );

  const fetchBillById = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('bills')
        .select('data')
        .eq('id', id)
        .single();

      if (data && data.data) {
        setPeople(data.data.people || []);
        setItems(data.data.items || []);
        setSettings(data.data.settings || { taxPercent: 11, serviceChargePercent: 5 });
        setShareUrl(`${window.location.origin}?id=${id}`);
      }
    } catch (err) {
      console.error("Error loading bill:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveBill = async () => {
    setIsSaving(true);
    try {
      const payload: any = { data: { people, items, settings } };
      if (user) {
        payload.user_id = user.id;
      }

      const { data: savedData, error } = await supabase
        .from('bills')
        .insert([payload])
        .select();

      if (error) throw error;

      if (savedData && savedData[0]) {
        const id = savedData[0].id;
        const url = `${window.location.origin}?id=${id}`;
        setShareUrl(url);
        
        if (!user) {
          saveToLocalHistory(id);
        }
        
        router.push(`/?id=${id}`, { scroll: false });

        if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
          } catch (clipErr) {
            console.warn("Auto-copy failed.", clipErr);
          }
        }
      }
    } catch (error) {
      console.error("Error saving bill:", error);
      alert("Gagal simpan data ke database.");
    } finally {
      setIsSaving(false);
    }
  };

  const addPerson = (name: string) => {
    if (!name.trim()) return;
    setPeople([...people, { id: generateId(), name: name.trim() }]);
    setShareUrl(null);
  };

  const removePerson = (id: string) => {
    setPeople(people.filter((p) => p.id !== id));
    setItems(items.map((item) => ({ 
      ...item, 
      sharedBy: item.sharedBy.filter((pid) => pid !== id) 
    })));
    setShareUrl(null);
  };

  const addItem = (name: string, price: number) => {
    if (!name.trim() || price <= 0) return;
    setItems([...items, { 
      id: generateId(), 
      name: name.trim(), 
      price, 
      sharedBy: [] 
    }]);
    setShareUrl(null);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    setShareUrl(null);
  };

  const toggleItemPerson = (itemId: string, personId: string) => {
    setItems(items.map((item) => {
      if (item.id === itemId) {
        const isShared = item.sharedBy.includes(personId);
        return { 
          ...item, 
          sharedBy: isShared 
            ? item.sharedBy.filter((id) => id !== personId) 
            : [...item.sharedBy, personId] 
        };
      }
      return item;
    }));
    setShareUrl(null);
  };

  const updateSettings = (newSettings: Partial<BillSettings>) => {
    setSettings({ ...settings, ...newSettings });
    setShareUrl(null);
  };

  return {
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
  };
}
