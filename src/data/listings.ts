import { Listing } from './types';

export const listings: Listing[] = [
  {
    id: 'l1', title: 'iPhone 15 Pro Max 256GB', description: 'Brand new iPhone 15 Pro Max in Natural Titanium. Unopened box, full warranty. Includes original accessories.', price: 1099,
    category: 'electronics', subcategory: 'Phones', condition: 'new', city: 'New York', sellerId: 'user1', views: 342, createdAt: '2024-03-20', status: 'active',
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop'],
  },
  {
    id: 'l2', title: 'MacBook Pro 14" M3 Pro', description: 'Barely used MacBook Pro with M3 Pro chip, 18GB RAM, 512GB SSD. Perfect condition, comes with charger and box.', price: 1799,
    category: 'electronics', subcategory: 'Laptops', condition: 'used', city: 'San Francisco', sellerId: 'user4', views: 521, createdAt: '2024-03-18', status: 'active',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=400&fit=crop'],
  },
  {
    id: 'l3', title: 'Toyota Camry 2022 SE', description: 'Low mileage Toyota Camry SE, single owner, clean title. Regular maintenance, all records available. Excellent condition.', price: 24500,
    category: 'cars', subcategory: 'Sedans', condition: 'used', city: 'Chicago', sellerId: 'user3', views: 890, createdAt: '2024-03-15', status: 'active',
    images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0237?w=600&h=400&fit=crop'],
  },
  {
    id: 'l4', title: 'Modern 2BR Apartment Downtown', description: 'Spacious 2-bedroom apartment in the heart of downtown. Recently renovated, hardwood floors, stainless steel appliances.', price: 285000,
    category: 'real-estate', subcategory: 'Apartments', condition: 'used', city: 'Los Angeles', sellerId: 'user2', views: 1205, createdAt: '2024-03-10', status: 'active',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop'],
  },
  {
    id: 'l5', title: 'Nike Air Jordan 1 Retro High', description: 'Authentic Nike Air Jordan 1 Retro High OG. Size 10 US. Deadstock, never worn. Comes with original box.', price: 220,
    category: 'clothing', subcategory: 'Shoes', condition: 'new', city: 'New York', sellerId: 'user1', views: 445, createdAt: '2024-03-22', status: 'active',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop'],
  },
  {
    id: 'l6', title: 'Mid-Century Modern Sofa', description: 'Beautiful mid-century modern sofa in excellent condition. Teal upholstery, solid wood legs. Very comfortable.', price: 650,
    category: 'furniture', subcategory: 'Living Room', condition: 'used', city: 'San Francisco', sellerId: 'user4', views: 178, createdAt: '2024-03-19', status: 'active',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=600&h=400&fit=crop'],
  },
  {
    id: 'l7', title: 'Senior React Developer Position', description: 'Looking for an experienced React developer to join our team. Remote-friendly, competitive salary, great benefits.', price: 0,
    category: 'jobs', subcategory: 'IT', condition: 'new', city: 'Remote', sellerId: 'user2', views: 2340, createdAt: '2024-03-21', status: 'active',
    images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop'],
  },
  {
    id: 'l8', title: 'Professional Home Cleaning', description: 'Thorough home cleaning services. Experienced team, eco-friendly products. Available weekdays and weekends.', price: 120,
    category: 'services', subcategory: 'Cleaning', condition: 'new', city: 'Chicago', sellerId: 'user3', views: 567, createdAt: '2024-03-17', status: 'active',
    images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop'],
  },
  {
    id: 'l9', title: 'Golden Retriever Puppies', description: 'Adorable Golden Retriever puppies, 8 weeks old. AKC registered, first shots done, health guaranteed.', price: 1500,
    category: 'animals', subcategory: 'Dogs', condition: 'new', city: 'Los Angeles', sellerId: 'user2', views: 3421, createdAt: '2024-03-23', status: 'active',
    images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop'],
  },
  {
    id: 'l10', title: 'Samsung Galaxy S24 Ultra', description: 'Samsung Galaxy S24 Ultra 512GB, Titanium Black. Mint condition, used for 2 months. Includes case and screen protector.', price: 899,
    category: 'electronics', subcategory: 'Phones', condition: 'used', city: 'Chicago', sellerId: 'user3', views: 234, createdAt: '2024-03-16', status: 'active',
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=400&fit=crop'],
  },
  {
    id: 'l11', title: 'Tesla Model 3 Long Range 2023', description: 'Tesla Model 3 Long Range, white exterior, black interior. Autopilot included. 15,000 miles.', price: 38900,
    category: 'cars', subcategory: 'Electric', condition: 'used', city: 'San Francisco', sellerId: 'user4', views: 1567, createdAt: '2024-03-14', status: 'active',
    images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop'],
  },
  {
    id: 'l12', title: 'Vintage Leather Jacket', description: 'Genuine leather jacket, size M. Great vintage patina, very stylish. No rips or tears.', price: 180,
    category: 'clothing', subcategory: 'Men', condition: 'used', city: 'New York', sellerId: 'user1', views: 312, createdAt: '2024-03-11', status: 'active',
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=400&fit=crop'],
  },
  {
    id: 'l13', title: 'Standing Desk - Adjustable Height', description: 'Electric standing desk, 60x30 inches. Programmable height presets. Sturdy build, supports up to 300 lbs.', price: 420,
    category: 'furniture', subcategory: 'Office', condition: 'new', city: 'Los Angeles', sellerId: 'user2', views: 289, createdAt: '2024-03-13', status: 'active',
    images: ['https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=600&h=400&fit=crop'],
  },
  {
    id: 'l14', title: 'Math Tutoring - All Levels', description: 'Experienced math tutor offering lessons for students K-12 and college. In-person or online available.', price: 50,
    category: 'services', subcategory: 'Tutoring', condition: 'new', city: 'Chicago', sellerId: 'user3', views: 432, createdAt: '2024-03-12', status: 'active',
    images: ['https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=600&h=400&fit=crop'],
  },
  {
    id: 'l15', title: 'Canon EOS R6 Mark II', description: 'Professional mirrorless camera body. Excellent for photography and video. Low shutter count, comes with extra battery.', price: 1899,
    category: 'electronics', subcategory: 'Cameras', condition: 'used', city: 'San Francisco', sellerId: 'user4', views: 678, createdAt: '2024-03-09', status: 'active',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop'],
  },
  {
    id: 'l16', title: 'Cozy Studio Near Beach', description: 'Charming studio apartment just 2 blocks from the beach. Fully furnished, utilities included.', price: 165000,
    category: 'real-estate', subcategory: 'Apartments', condition: 'used', city: 'Los Angeles', sellerId: 'user2', views: 987, createdAt: '2024-03-08', status: 'active',
    images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop'],
  },
  {
    id: 'l17', title: 'British Shorthair Kittens', description: 'Beautiful British Shorthair kittens, blue and lilac colors available. Vaccinated and dewormed.', price: 800,
    category: 'animals', subcategory: 'Cats', condition: 'new', city: 'New York', sellerId: 'user1', views: 1890, createdAt: '2024-03-07', status: 'active',
    images: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop'],
  },
  {
    id: 'l18', title: 'Sony WH-1000XM5 Headphones', description: 'Industry-leading noise canceling headphones. Black color, like new condition. Amazing sound quality.', price: 280,
    category: 'electronics', subcategory: 'Audio', condition: 'used', city: 'Chicago', sellerId: 'user3', views: 345, createdAt: '2024-03-06', status: 'active',
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=400&fit=crop'],
  },
  {
    id: 'l19', title: 'Designer Summer Dress', description: 'Beautiful floral summer dress, size S. Worn once for an event. Dry cleaned and ready to wear.', price: 95,
    category: 'clothing', subcategory: 'Women', condition: 'used', city: 'San Francisco', sellerId: 'user4', views: 210, createdAt: '2024-03-05', status: 'active',
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=400&fit=crop'],
  },
  {
    id: 'l20', title: 'King Size Bed Frame - Walnut', description: 'Solid walnut king size bed frame with headboard. Excellent craftsmanship, minimal assembly required.', price: 890,
    category: 'furniture', subcategory: 'Bedroom', condition: 'new', city: 'New York', sellerId: 'user1', views: 156, createdAt: '2024-03-04', status: 'active',
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=400&fit=crop'],
  },
  {
    id: 'l21', title: 'iPad Pro 12.9" M2', description: 'iPad Pro 12.9 inch with M2 chip, 256GB, WiFi + Cellular. Includes Apple Pencil 2nd gen and Magic Keyboard.', price: 1350,
    category: 'electronics', subcategory: 'Tablets', condition: 'used', city: 'Los Angeles', sellerId: 'user2', views: 423, createdAt: '2024-03-03', status: 'active',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop'],
  },
  {
    id: 'l22', title: 'Ford F-150 XLT 2021', description: 'Ford F-150 XLT crew cab, 4WD, EcoBoost engine. Towing package, bed liner. Well maintained.', price: 35800,
    category: 'cars', subcategory: 'Trucks', condition: 'used', city: 'Chicago', sellerId: 'user3', views: 765, createdAt: '2024-03-02', status: 'active',
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop'],
  },
  {
    id: 'l23', title: 'Plumbing Repair Services', description: 'Licensed plumber offering all types of repairs. Emergency service available. Free estimates.', price: 85,
    category: 'services', subcategory: 'Repair', condition: 'new', city: 'New York', sellerId: 'user1', views: 321, createdAt: '2024-03-01', status: 'active',
    images: ['https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop'],
  },
  {
    id: 'l24', title: 'Marketing Manager - Tech Startup', description: 'Fast-growing startup looking for a marketing manager. Equity + competitive salary. Downtown office.', price: 0,
    category: 'jobs', subcategory: 'Marketing', condition: 'new', city: 'San Francisco', sellerId: 'user4', views: 1890, createdAt: '2024-02-28', status: 'active',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'],
  },
];
