import { useState, useCallback } from "react";
import { supabase } from "@/utils/supabase";
import { calculateBill } from "@/utils/calculator";

export function useHistory(user: any) {
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const loadHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      let data: any[] | null = null;

      if (user) {
        const { data: dbData } = await supabase
          .from('bills')
          .select('id, data, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        data = dbData;
      } else {
        const savedIds = JSON.parse(localStorage.getItem('split_bill_history') || '[]');
        if (savedIds.length > 0) {
          const { data: localData } = await supabase
            .from('bills')
            .select('id, data, created_at')
            .in('id', savedIds)
            .order('created_at', { ascending: false });
          data = localData;
        }
      }

      if (data) {
        const mappedHistory = data.map((bill: any) => {
          const result = calculateBill(
            bill.data.people || [], 
            bill.data.items || [], 
            bill.data.settings || { taxPercent: 0, serviceChargePercent: 0 }
          );
          return {
            id: bill.id,
            created_at: bill.created_at,
            grandTotal: result.grandTotal,
            peopleCount: (bill.data.people || []).length
          };
        });
        setHistoryList(mappedHistory);
      } else {
        setHistoryList([]);
      }
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [user]);

  const saveToLocalHistory = (id: string) => {
    const existing = JSON.parse(localStorage.getItem('split_bill_history') || '[]');
    const newHistory = [id, ...existing.filter((item: string) => item !== id)].slice(0, 20);
    localStorage.setItem('split_bill_history', JSON.stringify(newHistory));
  };

  return { historyList, isLoadingHistory, loadHistory, saveToLocalHistory };
}
