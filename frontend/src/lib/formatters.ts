const appLocale = import.meta.env.VITE_APP_LOCALE;

const DATE_FORMATTER = new Intl.DateTimeFormat(appLocale, {
  dateStyle: 'medium',
  timeZone: 'UTC',
});

const VELOCITY_FORMATTER = new Intl.NumberFormat(appLocale, {
  style: 'unit',
  unit: 'kilometer-per-hour',
  unitDisplay: 'short',
  maximumFractionDigits: 0,
});

export function formatDate(date: Date) {
  return DATE_FORMATTER.format(date);
}

export function getDatabaseDate(date: string | Date): string | null {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    return null;
  }

  return d.toISOString().substring(0, 10);
}

export function formatVelocity(kmh: number) {
  return VELOCITY_FORMATTER.format(kmh);
}
