import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';

const STORAGE_KEY = 'cvd-platform-language';

const getStoredLanguage = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }
  return 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: getStoredLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  localStorage.setItem(STORAGE_KEY, lang);
};

export const getCurrentLanguage = (): string => {
  return i18n.language || 'en';
};

export default i18n;
