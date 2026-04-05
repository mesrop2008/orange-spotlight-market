import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ListingCard from '@/components/ListingCard';
import ListingCardSkeleton from '@/components/ListingCardSkeleton';
import FiltersSidebar, { ActiveFilters } from '@/components/FiltersSidebar';
import { useApp } from '@/contexts/AppContext';
import { categories } from '@/data/categories';

const ITEMS_PER_PAGE = 12;

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { listings } = useApp();
  const category = categories.find(c => c.id === id);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [condition, setCondition] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setLoading(true);
    setPage(1);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [id]);

  const filtered = useMemo(() => {
    let result = listings.filter(l => l.category === id && l.status === 'active');
    if (priceMin) result = result.filter(l => l.price >= Number(priceMin));
    if (priceMax) result = result.filter(l => l.price <= Number(priceMax));
    if (condition.length > 0) result = result.filter(l => condition.includes(l.condition));
    if (city) result = result.filter(l => l.city.toLowerCase().includes(city.toLowerCase()));
    switch (sortBy) {
      case 'cheapest': result.sort((a, b) => a.price - b.price); break;
      case 'expensive': result.sort((a, b) => b.price - a.price); break;
      case 'views': result.sort((a, b) => b.views - a.views); break;
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [listings, id, priceMin, priceMax, condition, city, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const activeFilters = [
    ...(priceMin ? [{ label: `Min: $${priceMin}`, onRemove: () => setPriceMin('') }] : []),
    ...(priceMax ? [{ label: `Max: $${priceMax}`, onRemove: () => setPriceMax('') }] : []),
    ...condition.map(c => ({ label: c, onRemove: () => setCondition(prev => prev.filter(x => x !== c)) })),
    ...(city ? [{ label: `City: ${city}`, onRemove: () => setCity('') }] : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-6">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{category?.name || id}</span>
        </nav>

        <h1 className="text-2xl font-bold mb-6">{category?.name || 'Category'}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="rounded-xl border bg-card p-4 sticky top-20">
              <FiltersSidebar
                priceMin={priceMin} priceMax={priceMax} condition={condition} city={city} sortBy={sortBy}
                onPriceMinChange={setPriceMin} onPriceMaxChange={setPriceMax} onConditionChange={setCondition}
                onCityChange={setCity} onSortChange={setSortBy}
              />
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{filtered.length} results</p>
            </div>
            <ActiveFilters filters={activeFilters} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <ListingCardSkeleton key={i} />)
                : paged.map(l => <ListingCard key={l.id} listing={l} />)
              }
            </div>
            {!loading && filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No listings found in this category</p>
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex justify-center gap-1 mt-8">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
