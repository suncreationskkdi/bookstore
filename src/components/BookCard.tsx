import { BookOpen, Download, ShoppingCart, Headphones, FileText, ExternalLink } from 'lucide-react';
import { BookWithFormats } from '../lib/supabase';

interface BookCardProps {
  book: BookWithFormats;
  onPurchase?: (bookId: string) => void;
  onDownload?: (formatId: string, url: string, fileFormat?: string) => void;
  onViewDetails?: (book: BookWithFormats) => void;
  showAllFormats?: boolean;
}

export default function BookCard({ book, onPurchase, onDownload, onViewDetails, showAllFormats }: BookCardProps) {
  const physicalFormat = book.formats.find(f => f.format_type === 'physical');
  const ebookFormats = book.formats.filter(f => f.format_type === 'ebook');
  const audiobookFormats = book.formats.filter(f => f.format_type === 'audiobook');

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div
        className="relative cursor-pointer group"
        onClick={() => onViewDetails?.(book)}
      >
        {book.cover_image_url ? (
          <img
            src={book.cover_image_url}
            alt={book.title}
            className="w-full h-80 object-contain bg-gradient-to-br from-slate-50 to-slate-100"
          />
        ) : (
          <div className="w-full h-80 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <BookOpen className="h-24 w-24 text-slate-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-4 py-2 rounded-lg shadow-lg">
            <span className="text-slate-800 font-medium">View Details</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4">{book.author}</p>

        <div className="space-y-3">
          {(showAllFormats || physicalFormat) && physicalFormat && (
            <div className="border-t pt-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-slate-700">Physical Book</span>
                </div>
                <span className="text-lg font-bold text-blue-600">
                  ${physicalFormat.price.toFixed(2)}
                </span>
              </div>
              {physicalFormat.stock_quantity !== undefined && (
                <p className="text-sm text-slate-500 mb-2">
                  Stock: {physicalFormat.stock_quantity} available
                </p>
              )}
              <button
                onClick={() => onPurchase?.(book.id)}
                disabled={!physicalFormat.is_available}
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {physicalFormat.is_available ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          )}

          {(showAllFormats || ebookFormats.length > 0) && ebookFormats.length > 0 && (
            <div className="border-t pt-3">
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-slate-700">Ebook - FREE</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                {ebookFormats.map((format) => {
                  const fileFormat = format.file_format?.toLowerCase();
                  let label;

                  if (fileFormat === 'pdf') {
                    label = 'PDF';
                  } else if (fileFormat === 'epub') {
                    label = 'EPUB';
                  } else if (fileFormat === 'html') {
                    label = 'Read Online';
                  } else {
                    label = format.file_format?.toUpperCase();
                  }

                  return (
                    <button
                      key={format.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownload?.(format.id, format.file_url || '', format.file_format || '');
                      }}
                      disabled={!format.is_available}
                      className="flex-1 bg-green-500 text-white py-2 px-2 rounded-lg font-medium hover:bg-green-600 transition disabled:bg-slate-300 disabled:cursor-not-allowed text-sm"
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {(showAllFormats || audiobookFormats.length > 0) && audiobookFormats.length > 0 && (
            <div className="border-t pt-3">
              <div className="flex items-center space-x-2 mb-3">
                <Headphones className="h-5 w-5 text-orange-500" />
                <span className="font-semibold text-slate-700">Audiobook - FREE</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (audiobookFormats[0]) {
                    onDownload?.(audiobookFormats[0].id, audiobookFormats[0].file_url || '', audiobookFormats[0].file_format || '');
                  }
                }}
                disabled={!audiobookFormats[0]?.is_available}
                className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
