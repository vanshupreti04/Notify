import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./translations"; // Import translations

i18n.use(initReactI18next).init({
  resources: translations, // Translation data
  lng: "en", // Default language
  interpolation: { escapeValue: false },
});

export default i18n;
