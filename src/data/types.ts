export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  city: string;
  rating: number;
  memberSince: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  condition: 'new' | 'used';
  city: string;
  images: string[];
  sellerId: string;
  views: number;
  createdAt: string;
  status: 'active' | 'sold';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  listingId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: [string, string];
  listingId: string;
  messages: Message[];
}

export interface Review {
  id: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  text: string;
  date: string;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
};
