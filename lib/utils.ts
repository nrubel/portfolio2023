import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateStr: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const [year, month] = dateStr.split("-").map(Number);
  const date = new Date(year, (month ?? 1) - 1);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    ...options,
  });
}

export function formatDateRange(
  startDate: string,
  endDate: string | null,
): string {
  const start = formatDate(startDate, { month: "short", year: "numeric" });
  const end = endDate
    ? formatDate(endDate, { month: "short", year: "numeric" })
    : "Present";
  return `${start} – ${end}`;
}

export function calculateDuration(
  startDate: string,
  endDate: string | null,
): string {
  const [startYear, startMonth] = startDate.split("-").map(Number);
  const end = endDate
    ? new Date(
        Number(endDate.split("-")[0]!),
        Number(endDate.split("-")[1]!) - 1,
      )
    : new Date();
  const start = new Date(startYear!, (startMonth ?? 1) - 1);

  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  return parts.join(" ") || "< 1 mo";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}
