import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Trash2, CheckCircle, Camera } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { reviews } from '@/data/users';
import { users } from '@/data/users';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ProfilePage: React.FC = () => {
  const { user, updateAvatar, logout } = useAuth();
  const { listings, updateListing, deleteListing } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'listings' | 'reviews'>('listings');

  if (!user) { navigate('/login'); return null; }

  const myListings = listings.filter(l => l.sellerId === user.id);
  const myReviews = reviews.filter(r => r.toUserId === user.id);

  const handleChangeAvatar = () => {
    const avatars = [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    ];
    const current = avatars.indexOf(user.avatar);
    updateAvatar(avatars[(current + 1) % avatars.length]);
    toast.success('Avatar updated!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-8 max-w-3xl">
        {/* Profile header */}
        <div className="rounded-xl border bg-card p-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <img src={user.avatar} alt={user.name} className="h-20 w-20 rounded-full object-cover" />
              <button onClick={handleChangeAvatar}
                className="absolute inset-0 rounded-full bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-5 w-5 text-primary-foreground" />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.city}</p>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(user.rating) ? 'fill-warning text-warning' : 'text-muted'}`} />
                ))}
                <span className="text-sm text-muted-foreground ml-1">{user.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Member since {new Date(user.memberSince).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 border-b">
          <button onClick={() => setTab('listings')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === 'listings' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
            My listings ({myListings.length})
          </button>
          <button onClick={() => setTab('reviews')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
            Reviews ({myReviews.length})
          </button>
        </div>

        {tab === 'listings' && (
          <div className="space-y-3">
            {myListings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">You haven't posted any listings yet</p>
            ) : (
              myListings.map(l => (
                <div key={l.id} className="flex items-center gap-4 rounded-xl border bg-card p-4">
                  <img src={l.images[0]} alt={l.title} className="h-16 w-16 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{l.title}</p>
                    <p className="text-sm font-bold text-primary">${l.price.toLocaleString()}</p>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${l.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                      {l.status}
                    </span>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {l.status === 'active' && (
                      <button onClick={() => { updateListing(l.id, { status: 'sold' }); toast.success('Marked as sold'); }}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors" title="Mark as sold">
                        <CheckCircle className="h-4 w-4 text-success" />
                      </button>
                    )}
                    <button onClick={() => { deleteListing(l.id); toast.success('Listing deleted'); }}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors" title="Delete">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'reviews' && (
          <div className="space-y-3">
            {myReviews.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No reviews yet</p>
            ) : (
              myReviews.map(r => {
                const from = users.find(u => u.id === r.fromUserId);
                return (
                  <div key={r.id} className="rounded-xl border bg-card p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={from?.avatar || ''} alt="" className="h-8 w-8 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium">{from?.name}</p>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < r.rating ? 'fill-warning text-warning' : 'text-muted'}`} />
                          ))}
                        </div>
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.text}</p>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
