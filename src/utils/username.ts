const MIN = 3;
const MAX = 30;

export const sanitizeUsername = (v: string) =>
  v
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, '')
    .slice(0, MAX);

export const validateUsername = (v: string): string | null => {
  if (v.length < MIN) return `Must be at least ${MIN} characters`;
  if (v.startsWith('.') || v.endsWith('.')) return 'Cannot start or end with a period';
  if (v.includes('..')) return 'Cannot contain two periods in a row';
  if (/^\d+$/.test(v)) return 'Must include at least one letter';
  return null;
};
