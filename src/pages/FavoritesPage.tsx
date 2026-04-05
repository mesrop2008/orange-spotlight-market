import React from 'react';
import { Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ListingCard from '@/components/ListingCard';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
  const { user } = useAuth();
  const { favorites, listings } = useApp();
  const navigate = useNavigate();

  if (!user) { navigate('/login'); return null; }

  const favListings = listings.filter(l => favorites.includes(l.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Favorites</h1>
        {favListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center mb-4">
              <Heart className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-lg font-semibold mb-1">No favorites yet</h2>
            <p className="text-sm text-muted-foreground">Tap the heart icon on listings to save them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favListings.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
