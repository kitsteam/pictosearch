import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import translation_de from "./de/translation.json";
import translation_en from "./en/translation.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },  // React already does escaping
    resources: {
      de: {
        translation: translation_de,
      },
      en: {
        translation: translation_en,
      },
    },
  });
