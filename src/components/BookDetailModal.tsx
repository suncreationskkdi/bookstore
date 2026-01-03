import { useState } from 'react';
import { X, Download, ShoppingCart, BookOpen, Headphones, Play } from 'lucide-react';
import { BookWithFormats } from '../lib/supabase';
import AudiobookPlayer from './AudiobookPlayer';

interface BookDetailModalProps {
  book: BookWithFormats;
  onClose: () => void;
  onPurchase?: (bookId: string) => void;
  onDownload?: (formatId: string, url: string, fileFormat?: string) => void;
}

export default function BookDetailModal({ book, onClose, onPurchase, onDownload }: BookDetailModalProps) {
  const [playingAudioUrl, setPlayingAudioUrl] = useState<string | null>(null);
  const physicalFormat = book.formats.find(f => f.format_type === 'physical');
  const ebookFormats = book.formats.filter(f => f.format_type === 'ebook');
  const audiobookFormats = book.formats.filter(f => f.format_type === 'audiobook');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100 transition"
          >
            <X className="h-6 w-6 text-slate-700" />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              {book.cover_image_url ? (
                <img
                  src={book.cover_image_url}
                  alt={book.title}
                  className="w-full rounded-lg shadow-lg object-contain bg-gradient-to-br from-slate-50 to-slate-100"
                />
              ) : (
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-32 w-32 text-slate-400" />
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{book.title}</h1>
              <p className="text-xl text-slate-600 mb-4">{book.author}</p>

              {book.publisher && (
                <p className="text-slate-500 mb-2">
                  <span className="font-medium">Publisher:</span> {book.publisher}
                </p>
              )}

              {book.published_date && (
                <p className="text-slate-500 mb-2">
                  <span className="font-medium">Published:</span> {book.published_date}
                </p>
              )}

              {book.isbn && (
                <p className="text-slate-500 mb-4">
                  <span className="font-medium">ISBN:</span> {book.isbn}
                </p>
              )}

              {book.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Description</h3>
                  <p className="text-slate-600 leading-relaxed">{book.description}</p>
                </div>
              )}

              <div className="mt-auto space-y-4">
                {physicalFormat && (
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <ShoppingCart className="h-6 w-6 text-blue-500" />
                        <span className="text-lg font-semibold text-slate-700">Printed Book</span>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">
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
                      className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      {physicalFormat.is_available ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                )}

                {ebookFormats.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <BookOpen className="h-6 w-6 text-green-500" />
                      <span className="text-lg font-semibold text-slate-700">Ebook - FREE</span>
                    </div>
                    <div className="space-y-2">
                      {ebookFormats.map((format) => {
                        const fileFormat = format.file_format?.toLowerCase();
                        const displayName = fileFormat === 'html' ? 'Read Online' : `Download ${format.file_format?.toUpperCase()}`;

                        return (
                          <button
                            key={format.id}
                            onClick={() => onDownload?.(format.id, format.file_url || '', format.file_format || '')}
                            disabled={!format.is_available}
                            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                          >
                            <Download className="h-5 w-5" />
                            <span>{displayName}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {audiobookFormats.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Headphones className="h-6 w-6 text-orange-500" />
                      <span className="text-lg font-semibold text-slate-700">Audiobook - FREE</span>
                    </div>
                    <div className="space-y-2">
                      {audiobookFormats.map((format) => (
                        <button
                          key={format.id}
                          onClick={() => setPlayingAudioUrl(format.file_url || '')}
                          disabled={!format.is_available || !format.file_url}
                          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                          <Play className="h-5 w-5" />
                          <span>Play Audio</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {playingAudioUrl && (
                  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60] p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-800">Now Playing</h2>
                        <button
                          onClick={() => setPlayingAudioUrl(null)}
                          className="bg-slate-100 rounded-full p-2 hover:bg-slate-200 transition"
                        >
                          <X className="h-6 w-6 text-slate-700" />
                        </button>
                      </div>
                      <AudiobookPlayer url={playingAudioUrl} title={book.title} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
