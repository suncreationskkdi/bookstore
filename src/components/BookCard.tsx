import { BookOpen, Download, ShoppingCart, Headphones, FileText, Link2, ExternalLink } from 'lucide-react';
import { BookWithFormats } from '../lib/supabase';

interface BookCardProps {
  book: BookWithFormats;
  onPurchase?: (bookId: string) => void;
  onDownload?: (formatId: string, url: string, fileFormat?: string) => void;
  showAllFormats?: boolean;
}

export default function BookCard({ book, onPurchase, onDownload, showAllFormats }: BookCardProps) {
  const physicalFormat = book.formats.find(f => f.format_type === 'physical');
  const ebookFormats = book.formats.filter(f => f.format_type === 'ebook');
  const audiobookFormats = book.formats.filter(f => f.format_type === 'audiobook');

  const hasMultipleFormats = book.formats.length > 1;

  const formatIcon = (formatType: string) => {
    switch (formatType) {
      case 'physical':
        return <ShoppingCart className="h-4 w-4" />;
      case 'ebook':
        return <BookOpen className="h-4 w-4" />;
      case 'audiobook':
        return <Headphones className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        {book.cover_image_url ? (
          <img
            src={book.cover_image_url}
            alt={book.title}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <BookOpen className="h-24 w-24 text-slate-400" />
          </div>
        )}
        {hasMultipleFormats && (
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
            <Link2 className="h-4 w-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Multiple Formats</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-slate-600 mb-3">{book.author}</p>

        {book.description && (
          <p className="text-slate-500 text-sm mb-4 line-clamp-3">
            {book.description}
          </p>
        )}

        {book.publisher && (
          <p className="text-sm text-slate-400 mb-4">
            Publisher: {book.publisher}
          </p>
        )}

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
              <div className="space-y-2">
                {ebookFormats.map((format) => {
                  const fileFormat = format.file_format?.toLowerCase();
                  const isHtml = fileFormat === 'html';

                  return (
                    <button
                      key={format.id}
                      onClick={() => onDownload?.(format.id, format.file_url || '', format.file_format || '')}
                      disabled={!format.is_available}
                      className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isHtml ? (
                        <>
                          <ExternalLink className="h-4 w-4" />
                          <span>Read Online</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          <span>Download {format.file_format?.toUpperCase()}</span>
                        </>
                      )}
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
              <div className="space-y-2">
                {audiobookFormats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => onDownload?.(format.id, format.file_url || '')}
                    disabled={!format.is_available}
                    className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download {format.file_format?.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
