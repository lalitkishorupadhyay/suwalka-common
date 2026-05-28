import { type MessageKey } from './locales/en';
type Locale = 'en';
/** Switch the active locale (call at app startup, e.g. from env). */
export declare function setLocale(locale: Locale): void;
/** Look up a message key in the active locale. */
export declare function t(key: MessageKey): string;
export type { MessageKey, Locale };
//# sourceMappingURL=index.d.ts.map