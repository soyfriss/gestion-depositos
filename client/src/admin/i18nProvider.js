import polyglotI18nProvider from 'ra-i18n-polyglot';
import es from './translations/es';
import en from './translations/en';
import { resolveBrowserLocale } from 'react-admin';

const translations = { es, en };
export const i18nProvider = polyglotI18nProvider(
  locale => translations[locale] ? translations[locale] : translations.en,
  resolveBrowserLocale(),
  [
      { locale: 'en', name: 'English' },
      { locale: 'es', name: 'Español' }
  ],
);