import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Eye, Calendar, ChevronRight, MessageCircle, Star } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { users } from '@/data/users';
import { categories } from '@/data/categories';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { listings, favorites, toggleFavorite, getOrCreateConversation } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === id);
  const [mainImage, setMainImage] = useState(0);

  if (!listing) return <div className="min-h-screen bg-background"><Navbar /><div className="container py-16 text-center"><h1 className="text-2xl font-bold">Listing not found</h1></div></div>;

  const seller = users.find(u => u.id === listing.sellerId);
  const category = categories.find(c => c.id === listing.category);
  const isFav = favorites.includes(listing.id);

  const handleChat = () => {
    if (!user) { toast.error('Please login first'); navigate('/login'); return; }
    if (!seller) return;
    const convId = getOrCreateConversation(user.id, seller.id, listing.id);
    navigate(`/chat/${convId}`);
  };

  const handleFav = () => {
    if (!user) { toast.error('Please login first'); return; }
    toggleFavorite(listing.id);
    toast.success(isFav ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          {category && <Link to={`/category/${category.id}`} className="hover:text-foreground">{category.name}</Link>}
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate max-w-[200px]">{listing.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Images */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden border bg-card">
              <img src={listing.images[mainImage]} alt={listing.title} className="w-full aspect-[16/10] object-cover" />
            </div>
            {listing.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {listing.images.map((img, i) => (
                  <button key={i} onClick={() => setMainImage(i)}
                    className={`rounded-lg overflow-hidden border-2 transition-colors ${i === mainImage ? 'border-primary' : 'border-transparent'}`}>
                    <img src={img} alt="" className="h-16 w-20 object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mt-6 rounded-xl border bg-card p-6">
              <h2 className="font-semibold mb-3">Description</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{listing.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-xl border bg-card p-6">
              <p className="text-3xl font-bold text-primary">
                {listing.price === 0 ? 'Free' : `$${listing.price.toLocaleString()}`}
              </p>
              <h1 className="text-lg font-semibold mt-2">{listing.title}</h1>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Eye className="h-4 w-4" />{listing.views}</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(listing.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${listing.condition === 'new' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                  {listing.condition === 'new' ? 'New' : 'Used'}
                </span>
                <span className="text-xs text-muted-foreground">{listing.city}</span>
              </div>
              <div className="flex gap-2 mt-5">
                <Button onClick={handleChat} className="flex-1 gap-1.5"><MessageCircle className="h-4 w-4" />Write to seller</Button>
                <Button variant="outline" onClick={handleFav}>
                  <Heart className={`h-4 w-4 ${isFav ? 'fill-primary text-primary' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Seller info */}
            {seller && (
              <div className="rounded-xl border bg-card p-6">
                <div className="flex items-center gap-3">
                  <img src={seller.avatar} alt={seller.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{seller.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                      <span>{seller.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Member since {new Date(seller.memberSince).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
