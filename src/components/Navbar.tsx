import { useState, useRef, useEffect } from 'react';
import { BookOpen, Headphones, ShoppingBag, User, FileText, Info, Mail, Settings, Menu, X } from 'lucide-react';
import { useTranslation } from '../lib/translations';
import LanguageSwitcher from './LanguageSwitcher';
import FontSizeSwitcher from './FontSizeSwitcher';

interface NavbarProps {
  currentView: 'home' | 'books' | 'ebooks' | 'audiobooks' | 'blog' | 'about' | 'contact' | 'admin';
  onViewChange: (view: 'home' | 'books' | 'ebooks' | 'audiobooks' | 'blog' | 'about' | 'contact' | 'admin') => void;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  const { t } = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: 'home' | 'books' | 'ebooks' | 'audiobooks' | 'blog' | 'about' | 'contact' | 'admin') => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 text-xl md:text-2xl font-bold text-slate-800 hover:text-slate-600 transition"
          >
            <BookOpen className="h-6 w-6 md:h-8 md:w-8" />
            <span>BookHub</span>
          </button>

          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <button
              onClick={() => onViewChange('books')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition text-sm xl:text-base ${
                currentView === 'books'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ShoppingBag className="h-4 w-4 xl:h-5 xl:w-5" />
              <span>{t('nav.books')}</span>
            </button>

            <button
              onClick={() => onViewChange('ebooks')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition text-sm xl:text-base ${
                currentView === 'ebooks'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="h-4 w-4 xl:h-5 xl:w-5" />
              <span>{t('nav.ebooks')}</span>
            </button>

            <button
              onClick={() => onViewChange('audiobooks')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition text-sm xl:text-base ${
                currentView === 'audiobooks'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Headphones className="h-4 w-4 xl:h-5 xl:w-5" />
              <span>{t('nav.audiobooks')}</span>
            </button>

            <button
              onClick={() => onViewChange('blog')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition text-sm xl:text-base ${
                currentView === 'blog'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FileText className="h-4 w-4 xl:h-5 xl:w-5" />
              <span>{t('nav.blog')}</span>
            </button>

            <button
              onClick={() => onViewChange('about')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition text-sm xl:text-base ${
                currentView === 'about'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Info className="h-4 w-4 xl:h-5 xl:w-5" />
              <span>{t('nav.about')}</span>
            </button>

            <button
              onClick={() => onViewChange('contact')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition text-sm xl:text-base ${
                currentView === 'contact'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Mail className="h-4 w-4 xl:h-5 xl:w-5" />
              <span>{t('nav.contact')}</span>
            </button>

            <button
              onClick={() => onViewChange('admin')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition text-sm xl:text-base ${
                currentView === 'admin'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <User className="h-4 w-4 xl:h-5 xl:w-5" />
              <span>{t('nav.admin')}</span>
            </button>

            <div ref={settingsRef} className="relative">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="flex items-center justify-center p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5 xl:h-6 xl:w-6" />
              </button>

              {settingsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-200">
                    <p className="text-sm font-semibold text-slate-700">Settings</p>
                  </div>

                  <div className="px-4 py-3 border-b border-slate-200">
                    <p className="text-xs font-medium text-slate-500 mb-2">Language</p>
                    <LanguageSwitcher />
                  </div>

                  <div className="px-4 py-3">
                    <p className="text-xs font-medium text-slate-500 mb-2">Font Size</p>
                    <FontSizeSwitcher />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex lg:hidden items-center space-x-2">
            <div ref={settingsRef} className="relative">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="flex items-center justify-center p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>

              {settingsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-200">
                    <p className="text-sm font-semibold text-slate-700">Settings</p>
                  </div>

                  <div className="px-4 py-3 border-b border-slate-200">
                    <p className="text-xs font-medium text-slate-500 mb-2">Language</p>
                    <LanguageSwitcher />
                  </div>

                  <div className="px-4 py-3">
                    <p className="text-xs font-medium text-slate-500 mb-2">Font Size</p>
                    <FontSizeSwitcher />
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 space-y-2">
            <button
              onClick={() => handleNavClick('books')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${
                currentView === 'books'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              <span>{t('nav.books')}</span>
            </button>

            <button
              onClick={() => handleNavClick('ebooks')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${
                currentView === 'ebooks'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span>{t('nav.ebooks')}</span>
            </button>

            <button
              onClick={() => handleNavClick('audiobooks')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${
                currentView === 'audiobooks'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Headphones className="h-5 w-5" />
              <span>{t('nav.audiobooks')}</span>
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${
                currentView === 'blog'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>{t('nav.blog')}</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${
                currentView === 'about'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Info className="h-5 w-5" />
              <span>{t('nav.about')}</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${
                currentView === 'contact'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Mail className="h-5 w-5" />
              <span>{t('nav.contact')}</span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${
                currentView === 'admin'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <User className="h-5 w-5" />
              <span>{t('nav.admin')}</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
