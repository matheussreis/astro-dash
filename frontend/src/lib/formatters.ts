const appLocale = import.meta.env.VITE_APP_LOCALE;

const DATE_FORMATTER = new Intl.DateTimeFormat(appLocale, {
  dateStyle: 'medium',
});

export function formatDate(date: Date) {
  return DATE_FORMATTER.format(date);
}
