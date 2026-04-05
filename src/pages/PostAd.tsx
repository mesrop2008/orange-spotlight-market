import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ImagePlus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { categories } from '@/data/categories';
import { toast } from 'sonner';

const PostAd: React.FC = () => {
  const { user } = useAuth();
  const { addListing } = useApp();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<'new' | 'used'>('new');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!user) {
    navigate('/login');
    return null;
  }

  const selectedCategory = categories.find(c => c.id === categoryId);

  const addImage = () => {
    const placeholders = [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=400&fit=crop',
    ];
    setImages(prev => [...prev, placeholders[prev.length % placeholders.length]]);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = 'Title is required';
    if (!categoryId) e.category = 'Category is required';
    if (!subcategory) e.subcategory = 'Subcategory is required';
    if (!price && price !== '0') e.price = 'Price is required';
    if (!city.trim()) e.city = 'City is required';
    if (!description.trim()) e.description = 'Description is required';
    if (images.length === 0) e.images = 'At least one photo is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const newListing = {
      id: `l${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      category: categoryId,
      subcategory,
      condition,
      city: city.trim(),
      images,
      sellerId: user.id,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active' as const,
    };
    addListing(newListing);
    toast.success('Listing posted!');
    navigate(`/listing/${newListing.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Post an ad</h1>
        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border bg-card p-6">
          <div>
            <label className="text-sm font-medium mb-1 block">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <select value={categoryId} onChange={e => { setCategoryId(e.target.value); setSubcategory(''); }}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Select...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.category && <p className="text-xs text-destructive mt-1">{errors.category}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Subcategory</label>
              <select value={subcategory} onChange={e => setSubcategory(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" disabled={!selectedCategory}>
                <option value="">Select...</option>
                {selectedCategory?.subcategories.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.subcategory && <p className="text-xs text-destructive mt-1">{errors.subcategory}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Price ($)</label>
              <input type="number" min="0" value={price} onChange={e => setPrice(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Condition</label>
              <div className="flex rounded-lg border overflow-hidden mt-0.5">
                <button type="button" onClick={() => setCondition('new')}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${condition === 'new' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-secondary'}`}>
                  New
                </button>
                <button type="button" onClick={() => setCondition('used')}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${condition === 'used' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-secondary'}`}>
                  Used
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">City</label>
            <input type="text" value={city} onChange={e => setCity(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Description</label>
            <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Photos</label>
            <div className="flex flex-wrap gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative h-20 w-20 rounded-lg overflow-hidden border">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                  <button type="button" onClick={() => setImages(prev => prev.filter((_, j) => j !== i))}
                    className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-card/80">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addImage}
                className="h-20 w-20 rounded-lg border-2 border-dashed flex items-center justify-center hover:border-primary transition-colors">
                <ImagePlus className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            {errors.images && <p className="text-xs text-destructive mt-1">{errors.images}</p>}
          </div>

          <Button type="submit" className="w-full" size="lg">Post listing</Button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;
