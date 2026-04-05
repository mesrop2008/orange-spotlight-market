import React, { createContext, useContext, useState, useCallback } from 'react';
import { Listing, Conversation } from '@/data/types';
import { listings as initialListings } from '@/data/listings';
import { initialConversations } from '@/data/conversations';

interface AppContextType {
  listings: Listing[];
  addListing: (listing: Listing) => void;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  conversations: Conversation[];
  sendMessage: (convId: string, senderId: string, receiverId: string, listingId: string, text: string) => void;
  getOrCreateConversation: (userId: string, otherUserId: string, listingId: string) => string;
  markConversationRead: (convId: string, userId: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);

  const addListing = useCallback((listing: Listing) => {
    setListings(prev => [listing, ...prev]);
  }, []);

  const updateListing = useCallback((id: string, updates: Partial<Listing>) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  }, []);

  const deleteListing = useCallback((id: string) => {
    setListings(prev => prev.filter(l => l.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }, []);

  const sendMessage = useCallback((convId: string, senderId: string, receiverId: string, listingId: string, text: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id !== convId) return c;
      return {
        ...c,
        messages: [...c.messages, {
          id: `m${Date.now()}`,
          senderId, receiverId, listingId, text,
          timestamp: new Date().toISOString(),
          read: false,
        }],
      };
    }));
  }, []);

  const getOrCreateConversation = useCallback((userId: string, otherUserId: string, listingId: string) => {
    const existing = conversations.find(c =>
      c.participants.includes(userId) && c.participants.includes(otherUserId) && c.listingId === listingId
    );
    if (existing) return existing.id;
    const newConv: Conversation = {
      id: `conv${Date.now()}`,
      participants: [userId, otherUserId],
      listingId,
      messages: [],
    };
    setConversations(prev => [...prev, newConv]);
    return newConv.id;
  }, [conversations]);

  const markConversationRead = useCallback((convId: string, userId: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id !== convId) return c;
      return {
        ...c,
        messages: c.messages.map(m => m.receiverId === userId ? { ...m, read: true } : m),
      };
    }));
  }, []);

  return (
    <AppContext.Provider value={{
      listings, addListing, updateListing, deleteListing,
      favorites, toggleFavorite,
      conversations, sendMessage, getOrCreateConversation, markConversationRead,
    }}>
      {children}
    </AppContext.Provider>
  );
};
