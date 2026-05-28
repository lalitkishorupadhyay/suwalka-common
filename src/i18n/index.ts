import { en, type MessageKey } from './locales/en';

// Add more locales here as they are translated, e.g.:
//   import { hi } from './locales/hi';
type Locale = 'en';
type Messages = typeof en;

const locales: Record<Locale, Messages> = { en };

let activeLocale: Locale = 'en';

/** Switch the active locale (call at app startup, e.g. from env). */
export function setLocale(locale: Locale): void {
  activeLocale = locale;
}

/** Look up a message key in the active locale. */
export function t(key: MessageKey): string {
  return locales[activeLocale][key];
}

export type { MessageKey, Locale };
