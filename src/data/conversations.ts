import { Conversation } from './types';

export const initialConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: ['user1', 'user2'],
    listingId: 'l4',
    messages: [
      { id: 'm1', senderId: 'user1', receiverId: 'user2', listingId: 'l4', text: 'Hi! Is the apartment still available?', timestamp: '2024-03-20T10:00:00', read: true },
      { id: 'm2', senderId: 'user2', receiverId: 'user1', listingId: 'l4', text: 'Yes, it is! Would you like to schedule a viewing?', timestamp: '2024-03-20T10:05:00', read: true },
      { id: 'm3', senderId: 'user1', receiverId: 'user2', listingId: 'l4', text: 'That would be great! How about this Saturday at 2pm?', timestamp: '2024-03-20T10:10:00', read: true },
      { id: 'm4', senderId: 'user2', receiverId: 'user1', listingId: 'l4', text: 'Saturday at 2pm works perfectly. I\'ll send you the exact address.', timestamp: '2024-03-20T10:15:00', read: false },
    ],
  },
  {
    id: 'conv2',
    participants: ['user1', 'user3'],
    listingId: 'l3',
    messages: [
      { id: 'm5', senderId: 'user1', receiverId: 'user3', listingId: 'l3', text: 'What\'s the lowest you\'d go on the Camry?', timestamp: '2024-03-19T14:00:00', read: true },
      { id: 'm6', senderId: 'user3', receiverId: 'user1', listingId: 'l3', text: 'I could do $23,000 if you\'re serious.', timestamp: '2024-03-19T14:30:00', read: true },
      { id: 'm7', senderId: 'user1', receiverId: 'user3', listingId: 'l3', text: 'Let me think about it and get back to you.', timestamp: '2024-03-19T15:00:00', read: true },
    ],
  },
  {
    id: 'conv3',
    participants: ['user1', 'user4'],
    listingId: 'l2',
    messages: [
      { id: 'm8', senderId: 'user1', receiverId: 'user4', listingId: 'l2', text: 'Does the MacBook come with AppleCare?', timestamp: '2024-03-21T09:00:00', read: true },
      { id: 'm9', senderId: 'user4', receiverId: 'user1', listingId: 'l2', text: 'Yes! AppleCare+ is valid until December 2025.', timestamp: '2024-03-21T09:15:00', read: true },
      { id: 'm10', senderId: 'user1', receiverId: 'user4', listingId: 'l2', text: 'Great, I\'m very interested. Can we meet tomorrow?', timestamp: '2024-03-21T09:20:00', read: false },
    ],
  },
];
