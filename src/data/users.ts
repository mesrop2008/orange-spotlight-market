import { User, Review } from './types';

export const users: User[] = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    city: 'New York',
    rating: 4.8,
    memberSince: '2023-03-15',
  },
  {
    id: 'user2',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    city: 'Los Angeles',
    rating: 4.5,
    memberSince: '2023-06-20',
  },
  {
    id: 'user3',
    name: 'James Wilson',
    email: 'james@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    city: 'Chicago',
    rating: 4.2,
    memberSince: '2023-01-10',
  },
  {
    id: 'user4',
    name: 'Sophie Chen',
    email: 'sophie@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    city: 'San Francisco',
    rating: 4.9,
    memberSince: '2022-11-05',
  },
];

export const reviews: Review[] = [
  { id: 'r1', fromUserId: 'user2', toUserId: 'user1', rating: 5, text: 'Great seller, fast shipping!', date: '2024-01-15' },
  { id: 'r2', fromUserId: 'user3', toUserId: 'user1', rating: 4, text: 'Good communication, item as described.', date: '2024-02-20' },
  { id: 'r3', fromUserId: 'user1', toUserId: 'user2', rating: 5, text: 'Very friendly and responsive.', date: '2024-01-25' },
  { id: 'r4', fromUserId: 'user4', toUserId: 'user3', rating: 4, text: 'Smooth transaction, recommended.', date: '2024-03-01' },
  { id: 'r5', fromUserId: 'user1', toUserId: 'user4', rating: 5, text: 'Excellent quality, exactly as shown.', date: '2024-02-10' },
];
