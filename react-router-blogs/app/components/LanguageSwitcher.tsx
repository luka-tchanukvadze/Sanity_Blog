import { Link, useLocation, useParams } from "react-router-dom";
import { supportedLanguages } from "~/i18n";

export default function LanguageSwitcher() {
  const { lang: currentLang } = useParams();
  const location = useLocation();
  const pathWithoutLang =
    location.pathname.replace(`/${currentLang}`, "") || "/";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-gray-950/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to={`/${currentLang}`}
          className="text-xl font-black tracking-tighter text-white"
        >
          BLOGS<span className="text-blue-500">.</span>
        </Link>

        <div className="flex gap-1 p-1 bg-white/5 rounded-full border border-white/10">
          {supportedLanguages.map((language) => {
            const isActive = language.id === currentLang;
            return (
              <Link
                key={language.id}
                to={`/${language.id}${pathWithoutLang}`}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {language.id}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
