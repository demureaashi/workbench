export function todayIso(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function addDaysIso(date: string, days: number): string {
  const next = new Date(`${date}T00:00:00`);
  next.setDate(next.getDate() + days);
  return todayIso(next);
}

export function displayDate(date: string): string {
  if (!date) return "";
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}
