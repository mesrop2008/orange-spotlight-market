import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Listing } from '@/data/types';
import { users } from '@/data/users';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { favorites, toggleFavorite } = useApp();
  const { user } = useAuth();
  const isFav = favorites.includes(listing.id);
  const seller = users.find(u => u.id === listing.sellerId);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to save favorites');
      return;
    }
    toggleFavorite(listing.id);
    toast.success(isFav ? 'Removed from favorites' : 'Added to favorites');
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    return `$${price.toLocaleString()}`;
  };

  return (
    <Link to={`/listing/${listing.id}`} className="group block">
      <div className="rounded-xl border bg-card overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
          >
            <Heart className={`h-4 w-4 ${isFav ? 'fill-primary text-primary' : 'text-foreground'}`} />
          </button>
          {listing.status === 'sold' && (
            <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
              <span className="bg-card text-foreground font-semibold px-4 py-1 rounded-full text-sm">Sold</span>
            </div>
          )}
        </div>
        <div className="p-3">
          <p className="font-bold text-lg text-foreground">{formatPrice(listing.price)}</p>
          <h3 className="text-sm text-foreground line-clamp-2 mt-0.5">{listing.title}</h3>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>{listing.city}</span>
            <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
