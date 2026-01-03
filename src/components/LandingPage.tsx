import { BookOpen, Headphones, ShoppingBag, Download, DollarSign } from 'lucide-react';
import HeroCarousel from './HeroCarousel';
import { useTranslation } from '../lib/translations';

interface LandingPageProps {
  onNavigate: (view: 'books' | 'ebooks' | 'audiobooks') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <HeroCarousel />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-slate-800 mb-6">
            {t('landing.collection.title')}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('landing.hero.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            onClick={() => onNavigate('books')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
              <ShoppingBag className="h-16 w-16 mb-4" />
              <h2 className="text-3xl font-bold mb-2">{t('landing.printed.title')}</h2>
            </div>
            <div className="p-8">
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                {t('landing.printed.desc')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-700">
                  <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                  <span>{t('landing.printed.price')}</span>
                </li>
                <li className="flex items-center text-slate-700">
                  <ShoppingBag className="h-5 w-5 mr-2 text-blue-500" />
                  <span>{t('landing.printed.checkout')}</span>
                </li>
              </ul>
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                {t('landing.printed.browse')}
              </button>
            </div>
          </div>

          <div
            onClick={() => onNavigate('ebooks')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
          >
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 text-white">
              <BookOpen className="h-16 w-16 mb-4" />
              <h2 className="text-3xl font-bold mb-2">{t('landing.ebooks.title')}</h2>
            </div>
            <div className="p-8">
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                {t('landing.ebooks.desc')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-700">
                  <Download className="h-5 w-5 mr-2 text-green-500" />
                  <span>{t('landing.ebooks.instant')}</span>
                </li>
                <li className="flex items-center text-slate-700">
                  <BookOpen className="h-5 w-5 mr-2 text-green-500" />
                  <span>{t('landing.ebooks.formats')}</span>
                </li>
              </ul>
              <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition">
                {t('landing.ebooks.browse')}
              </button>
            </div>
          </div>

          <div
            onClick={() => onNavigate('audiobooks')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
          >
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white">
              <Headphones className="h-16 w-16 mb-4" />
              <h2 className="text-3xl font-bold mb-2">{t('landing.audiobooks.title')}</h2>
            </div>
            <div className="p-8">
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                {t('landing.audiobooks.desc')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-700">
                  <Download className="h-5 w-5 mr-2 text-orange-500" />
                  <span>{t('landing.audiobooks.free')}</span>
                </li>
                <li className="flex items-center text-slate-700">
                  <Headphones className="h-5 w-5 mr-2 text-orange-500" />
                  <span>{t('landing.audiobooks.quality')}</span>
                </li>
              </ul>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                {t('landing.audiobooks.browse')}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              {t('landing.why.title')}
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-4xl font-bold text-blue-500 mb-2">10,000+</div>
                <div className="text-slate-600">{t('landing.stats.books')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-500 mb-2">{t('landing.why.free.title')}</div>
                <div className="text-slate-600">{t('landing.stats.free')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">24/7</div>
                <div className="text-slate-600">{t('landing.stats.access')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
