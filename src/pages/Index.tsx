import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CategoryBar from '@/components/CategoryBar';
import ListingCard from '@/components/ListingCard';
import ListingCardSkeleton from '@/components/ListingCardSkeleton';
import { useApp } from '@/contexts/AppContext';

const Index: React.FC = () => {
  const { listings } = useApp();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const activeListings = listings.filter(l => l.status === 'active');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-16 md:py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Find anything, sell everything
          </h1>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            The marketplace for your city
          </p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-card pl-12 pr-4 py-4 text-base outline-none shadow-lg focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto py-8">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <CategoryBar />
      </section>

      {/* Listings Grid */}
      <section className="container mx-auto pb-16">
        <h2 className="text-xl font-bold mb-4">Fresh listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ListingCardSkeleton key={i} />)
            : activeListings.slice(0, 12).map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))
          }
        </div>
        {!loading && activeListings.length > 12 && (
          <div className="text-center mt-8">
            <Link to="/search?q=" className="text-primary font-medium hover:underline">
              View all listings →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
