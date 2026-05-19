export interface Person {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  name: string;
  price: number;
  sharedBy: string[];
}

export interface BillSettings {
  taxPercent: number | "";
  serviceChargePercent: number | "";
}

export interface PersonResult {
  person: Person;
  subtotal: number;
  taxAndServiceAmount: number;
  total: number;
}

export interface BillResult {
  personResults: PersonResult[];
  subtotal: number;
  totalTaxAndService: number;
  grandTotal: number;
}

export function calculateBill(
  people: Person[],
  items: Item[],
  settings: BillSettings
): BillResult {
  // Initialize subtotals
  const subtotalMap = new Map<string, number>();
  people.forEach((p) => subtotalMap.set(p.id, 0));

  let totalSubtotal = 0;

  // Calculate individual subtotals
  items.forEach((item) => {
    if (item.sharedBy.length > 0) {
      const splitPrice = item.price / item.sharedBy.length;
      totalSubtotal += item.price;
      item.sharedBy.forEach((personId) => {
        if (subtotalMap.has(personId)) {
          subtotalMap.set(personId, subtotalMap.get(personId)! + splitPrice);
        }
      });
    }
  });

  const taxPercent = Number(settings.taxPercent) || 0;
  const serviceChargePercent = Number(settings.serviceChargePercent) || 0;
  const taxAndServiceMultiplier = (taxPercent + serviceChargePercent) / 100;

  let totalTaxAndService = 0;
  let grandTotal = 0;

  const personResults: PersonResult[] = people.map((person) => {
    const subtotal = subtotalMap.get(person.id) || 0;
    
    // Rumus: Total Individu = Subtotal Individu * (1 + (Total Pajak + Service)/100)
    const total = subtotal * (1 + taxAndServiceMultiplier);
    const taxAndServiceAmount = total - subtotal;

    totalTaxAndService += taxAndServiceAmount;
    grandTotal += total;

    return {
      person,
      subtotal,
      taxAndServiceAmount,
      total,
    };
  });

  return {
    personResults,
    subtotal: totalSubtotal,
    totalTaxAndService,
    grandTotal,
  };
}
