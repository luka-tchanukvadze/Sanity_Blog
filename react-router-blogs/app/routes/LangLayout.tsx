import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import i18n, { supportedLanguages } from "../i18n";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function LangLayout() {
  const { lang } = useParams();

  useEffect(() => {
    if (lang && supportedLanguages.some((l) => l.id === lang)) {
      i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
    } else if (lang) {
      console.warn(`Unsupported language requested: ${lang}`);
    }
  }, [lang]);

  return (
    <>
      <header className="sticky top-0 bg-white shadow-md z-10">
        <LanguageSwitcher />
      </header>
      <Outlet />
    </>
  );
}
