import { useState } from 'react';
import { Search } from 'lucide-react';
import BookCard from './BookCard';
import BookDetailModal from './BookDetailModal';
import { BookWithFormats } from '../lib/supabase';

interface BooksViewProps {
  books: BookWithFormats[];
  formatFilter: 'physical' | 'ebook' | 'audiobook';
  onPurchase?: (bookId: string) => void;
  onDownload?: (formatId: string, url: string, fileFormat?: string) => void;
}

export default function BooksView({ books, formatFilter, onPurchase, onDownload }: BooksViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookWithFormats | null>(null);

  const filteredBooks = books
    .filter(book => book.formats.some(f => f.format_type === formatFilter))
    .filter(book => {
      const query = searchQuery.toLowerCase();
      return (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
      );
    });

  const getTitle = () => {
    switch (formatFilter) {
      case 'physical':
        return 'Physical Books';
      case 'ebook':
        return 'Free Ebooks';
      case 'audiobook':
        return 'Free Audiobooks';
    }
  };

  const getDescription = () => {
    switch (formatFilter) {
      case 'physical':
        return 'Browse our collection of physical books available for purchase';
      case 'ebook':
        return 'Download free ebooks in PDF, EPUB, and HTML formats';
      case 'audiobook':
        return 'Download free audiobooks in MP3 format';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">{getTitle()}</h1>
          <p className="text-xl text-slate-600 mb-8">{getDescription()}</p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, author, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-slate-400 focus:outline-none text-lg"
            />
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-slate-500">
              {searchQuery ? 'No books found matching your search' : 'No books available yet'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-slate-600">
              <p>{filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onPurchase={onPurchase}
                  onDownload={onDownload}
                  onViewDetails={setSelectedBook}
                  showAllFormats={false}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onPurchase={onPurchase}
          onDownload={onDownload}
        />
      )}
    </div>
  );
}
