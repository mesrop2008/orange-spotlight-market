import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, PlusCircle, Heart, MessageCircle, Menu, X, LogIn, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { favorites, conversations } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = user
    ? conversations.reduce((acc, c) => {
        if (!c.participants.includes(user.id)) return acc;
        return acc + c.messages.filter(m => m.receiverId === user.id && !m.read).length;
      }, 0)
    : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:block">Marketplace</span>
        </Link>

        {/* Search - desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border bg-secondary pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
        </form>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Link to="/post">
                <Button size="sm" className="gap-1.5">
                  <PlusCircle className="h-4 w-4" />
                  Post an ad
                </Button>
              </Link>
              <Link to="/favorites" className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Heart className="h-5 w-5 text-foreground" />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">
                    {favorites.length}
                  </span>
                )}
              </Link>
              <Link to="/chat" className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <MessageCircle className="h-5 w-5 text-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </Link>
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-secondary transition-colors">
                  <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                </button>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border bg-card shadow-lg py-1 animate-fade-in">
                      <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary transition-colors">
                        <User className="h-4 w-4" /> Profile
                      </Link>
                      <button onClick={() => { logout(); setProfileOpen(false); navigate('/'); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary transition-colors text-destructive">
                        <LogIn className="h-4 w-4" /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="outline" size="sm">Login</Button></Link>
              <Link to="/register"><Button size="sm">Register</Button></Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-card animate-fade-in pb-4">
          <form onSubmit={handleSearch} className="px-4 pt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border bg-secondary pl-10 pr-4 py-2 text-sm outline-none"
              />
            </div>
          </form>
          <div className="px-4 pt-3 flex flex-col gap-1">
            {user ? (
              <>
                <Link to="/post" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm"><PlusCircle className="h-4 w-4" /> Post an ad</Link>
                <Link to="/favorites" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm"><Heart className="h-4 w-4" /> Favorites ({favorites.length})</Link>
                <Link to="/chat" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm"><MessageCircle className="h-4 w-4" /> Chat {unreadCount > 0 && `(${unreadCount})`}</Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm"><User className="h-4 w-4" /> Profile</Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); navigate('/'); }} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm text-destructive"><LogIn className="h-4 w-4" /> Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm">Login</Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
