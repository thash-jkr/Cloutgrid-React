export function compactCount(value: number): string {
  if (value < 1000) return value.toString();

  const suffixes: { threshold: number; suffix: string }[] = [
    { threshold: 1_000_000_000, suffix: 'B' },
    { threshold: 1_000_000, suffix: 'M' },
    { threshold: 1_000, suffix: 'K' },
  ];

  for (const { threshold, suffix } of suffixes) {
    if (value >= threshold) {
      const scaled = value / threshold;
      const formatted = scaled.toFixed(1);
      const trimmed = formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted;
      return `${trimmed}${suffix}`;
    }
  }

  return value.toString();
}