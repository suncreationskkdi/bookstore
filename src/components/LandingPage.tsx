import { BookOpen, Headphones, ShoppingBag, Download, DollarSign } from 'lucide-react';
import HeroCarousel from './HeroCarousel';

interface LandingPageProps {
  onNavigate: (view: 'books' | 'ebooks' | 'audiobooks') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <HeroCarousel />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-slate-800 mb-6">
            Discover Our Collection
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Your one-stop destination for printed books, free ebooks, and audiobooks.
            Explore thousands of titles across all formats.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            onClick={() => onNavigate('books')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
              <ShoppingBag className="h-16 w-16 mb-4" />
              <h2 className="text-3xl font-bold mb-2">Printed Books</h2>
            </div>
            <div className="p-8">
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                Browse our collection of printed books. Purchase and get them delivered to your doorstep.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-700">
                  <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                  <span>Competitive pricing</span>
                </li>
                <li className="flex items-center text-slate-700">
                  <ShoppingBag className="h-5 w-5 mr-2 text-blue-500" />
                  <span>Secure checkout</span>
                </li>
              </ul>
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                Browse Printed Books
              </button>
            </div>
          </div>

          <div
            onClick={() => onNavigate('ebooks')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
          >
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 text-white">
              <BookOpen className="h-16 w-16 mb-4" />
              <h2 className="text-3xl font-bold mb-2">Ebooks</h2>
            </div>
            <div className="p-8">
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                Download free ebooks in PDF, EPUB, and HTML formats. No account required.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-700">
                  <Download className="h-5 w-5 mr-2 text-green-500" />
                  <span>Instant download</span>
                </li>
                <li className="flex items-center text-slate-700">
                  <BookOpen className="h-5 w-5 mr-2 text-green-500" />
                  <span>Multiple formats</span>
                </li>
              </ul>
              <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition">
                Browse Free Ebooks
              </button>
            </div>
          </div>

          <div
            onClick={() => onNavigate('audiobooks')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
          >
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white">
              <Headphones className="h-16 w-16 mb-4" />
              <h2 className="text-3xl font-bold mb-2">Audiobooks</h2>
            </div>
            <div className="p-8">
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                Listen to free audiobooks anywhere. Download MP3 files without signing up.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-700">
                  <Download className="h-5 w-5 mr-2 text-orange-500" />
                  <span>Free downloads</span>
                </li>
                <li className="flex items-center text-slate-700">
                  <Headphones className="h-5 w-5 mr-2 text-orange-500" />
                  <span>High-quality audio</span>
                </li>
              </ul>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                Browse Audiobooks
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Why Choose BookHub?
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-4xl font-bold text-blue-500 mb-2">10,000+</div>
                <div className="text-slate-600">Books Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-500 mb-2">Free</div>
                <div className="text-slate-600">Ebooks & Audiobooks</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">24/7</div>
                <div className="text-slate-600">Instant Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
