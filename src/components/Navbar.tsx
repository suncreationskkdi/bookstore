import { BookOpen, Headphones, ShoppingBag, User, FileText, Info, Mail } from 'lucide-react';
import { useTranslation } from '../lib/translations';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  currentView: 'home' | 'books' | 'ebooks' | 'audiobooks' | 'blog' | 'about' | 'contact' | 'admin';
  onViewChange: (view: 'home' | 'books' | 'ebooks' | 'audiobooks' | 'blog' | 'about' | 'contact' | 'admin') => void;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  const { t } = useTranslation();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onViewChange('home')}
            className="flex items-center space-x-2 text-2xl font-bold text-slate-800 hover:text-slate-600 transition"
          >
            <BookOpen className="h-8 w-8" />
            <span>BookHub</span>
          </button>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => onViewChange('books')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'books'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              <span>{t('nav.books')}</span>
            </button>

            <button
              onClick={() => onViewChange('ebooks')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'ebooks'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span>{t('nav.ebooks')}</span>
            </button>

            <button
              onClick={() => onViewChange('audiobooks')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'audiobooks'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Headphones className="h-5 w-5" />
              <span>{t('nav.audiobooks')}</span>
            </button>

            <button
              onClick={() => onViewChange('blog')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'blog'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>{t('nav.blog')}</span>
            </button>

            <button
              onClick={() => onViewChange('about')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'about'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Info className="h-5 w-5" />
              <span>{t('nav.about')}</span>
            </button>

            <button
              onClick={() => onViewChange('contact')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'contact'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Mail className="h-5 w-5" />
              <span>{t('nav.contact')}</span>
            </button>

            <button
              onClick={() => onViewChange('admin')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'admin'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <User className="h-5 w-5" />
              <span>{t('nav.admin')}</span>
            </button>

            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
