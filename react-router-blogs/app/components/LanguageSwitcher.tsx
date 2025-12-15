// ./app/components/LanguageSwitcher.tsx

import { Link, useLocation, useParams } from "react-router-dom";
import { supportedLanguages } from "~/i18n";

export default function LanguageSwitcher() {
  const { lang: currentLang } = useParams();
  const location = useLocation();

  const pathWithoutLang =
    location.pathname.replace(`/${currentLang}`, "") || "/";

  return (
    <nav className="flex gap-4 p-4">
      {supportedLanguages.map((language) => (
        <Link
          key={language.id}
          to={`/${language.id}${pathWithoutLang}`} // Construct the new URL: /es/my-post
          className={`px-3 py-1 border rounded transition ${
            language.id === currentLang
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {language.title}
        </Link>
      ))}
    </nav>
  );
}
