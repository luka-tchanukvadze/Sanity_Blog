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

      // Update the color scheme attribute for better browser integration
      document.documentElement.classList.add("dark");
    } else if (lang) {
      console.warn(`Unsupported language requested: ${lang}`);
    }
  }, [lang]);

  return (
    <div className="min-h-screen bg-gray-950 selection:bg-blue-500/30">
      {/* The header is now transparent with a backdrop-blur. 
          The LanguageSwitcher component we built handles the internal layout.
      */}
      <header className="sticky top-0 z-50">
        <LanguageSwitcher />
      </header>

      {/* Added a subtle radial gradient to the background 
          to give the dark theme more depth (Ambient Light effect)
      */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-900/10 blur-[120px]" />
      </div>

      <main className="relative z-10">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 mt-20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-xs font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} Journal Digital Edition
          </p>
          <div className="flex gap-6 text-gray-500 text-xs font-bold tracking-widest uppercase">
            <a href="#" className="hover:text-blue-500 transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Sanity CMS
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
