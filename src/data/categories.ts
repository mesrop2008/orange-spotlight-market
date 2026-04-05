import { Category } from './types';

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone', subcategories: ['Phones', 'Laptops', 'Tablets', 'Cameras', 'Audio'] },
  { id: 'cars', name: 'Cars', icon: 'Car', subcategories: ['Sedans', 'SUVs', 'Trucks', 'Electric', 'Parts'] },
  { id: 'real-estate', name: 'Real Estate', icon: 'Home', subcategories: ['Apartments', 'Houses', 'Commercial', 'Land'] },
  { id: 'clothing', name: 'Clothing', icon: 'Shirt', subcategories: ['Men', 'Women', 'Kids', 'Shoes', 'Accessories'] },
  { id: 'furniture', name: 'Furniture', icon: 'Armchair', subcategories: ['Living Room', 'Bedroom', 'Kitchen', 'Office', 'Outdoor'] },
  { id: 'jobs', name: 'Jobs', icon: 'Briefcase', subcategories: ['IT', 'Sales', 'Marketing', 'Finance', 'Other'] },
  { id: 'services', name: 'Services', icon: 'Wrench', subcategories: ['Repair', 'Cleaning', 'Tutoring', 'Beauty', 'Moving'] },
  { id: 'animals', name: 'Animals', icon: 'PawPrint', subcategories: ['Dogs', 'Cats', 'Birds', 'Fish', 'Supplies'] },
];
