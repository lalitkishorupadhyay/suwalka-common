import { t, setLocale } from '../i18n';
import { en } from '../i18n/locales/en';

describe('i18n — en locale (default)', () => {
  it('t() returns the English string for every defined key', () => {
    const keys = Object.keys(en) as Array<keyof typeof en>;
    for (const key of keys) {
      expect(t(key)).toBe(en[key]);
    }
  });

  it('t() returns the correct value for a spot-checked key', () => {
    expect(t('ERR_NOT_FOUND')).toBe('Resource not found');
    expect(t('ERR_UNAUTHENTICATED')).toBe('Authentication required');
    expect(t('SUCCESS')).toBe('OK');
  });

  it('setLocale("en") leaves the locale unchanged and t() still resolves', () => {
    setLocale('en');
    expect(t('ERR_SERVER_ERROR')).toBe('Internal server error');
  });
});
