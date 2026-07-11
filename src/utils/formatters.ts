import { formatDistanceToNow, format } from 'date-fns';

export function formatDate(date: Date | string, formatStr: string = 'MMM d, yyyy'): string {
  return format(new Date(date), formatStr);
}

export function formatRelativeDate(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / 200);
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length).concat('...') : str;
}
