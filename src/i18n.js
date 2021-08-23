import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';


import translationEN from './locales/en/translations.json';
import translationAR from './locales/ar/translations.json';

const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};
const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage']
};
i18n
  .use(reactI18nextModule)
  .use(LanguageDetector) 
  .init({
    resources,
    detection: DETECTION_OPTIONS,
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;