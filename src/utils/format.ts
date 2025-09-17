import { format, formatDistanceToNow } from 'date-fns';

export function formatNumber(value: number): string {
  return Intl.NumberFormat('en', { notation: 'compact' }).format(value);
}

export function formatDateString(value: string): string {
  return format(new Date(value), 'MMM d, yyyy');
}

export function formatDistance(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}
