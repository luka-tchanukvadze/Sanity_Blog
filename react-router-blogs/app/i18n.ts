import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const supportedLanguages = [
  { id: "en", title: "English" },
  { id: "es", title: "Spanish" },
  { id: "fr", title: "French" },
];

const resources = {
  en: {
    translation: {
      home_link: "Home",
      error_message: "An unexpected error occurred.",
      page_title: "My Blog",
    },
  },
  es: {
    translation: {
      home_link: "Inicio",
      error_message: "Ocurrió un error inesperado.",
      page_title: "Mi Blog",
    },
  },
  fr: {
    translation: {
      home_link: "Accueil",
      error_message: "Une erreur inattendue est survenue.",
      page_title: "Mon Blog",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: supportedLanguages[0].id, // 'en' is the default
  fallbackLng: supportedLanguages[0].id,
  interpolation: {
    escapeValue: false,
  },
  // Allows to change the language dynamically later
  keySeparator: false,
});

export default i18n;
