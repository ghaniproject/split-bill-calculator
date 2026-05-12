export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function formatNumber(num: number | string): string {
  if (num === "" || num === undefined || num === null) return "";
  const value = typeof num === "string" ? parseNumber(num) : num;
  return new Intl.NumberFormat("id-ID").format(value);
}

export function parseNumber(str: string): number {
  return Number(str.replace(/\D/g, ""));
}
