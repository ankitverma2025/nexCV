export function formatDate(dateString: string | null, current: boolean = false): string {
  if (current) return 'Present';
  if (!dateString) return 'Present';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
