import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ListingCard from '@/components/ListingCard';
import ListingCardSkeleton from '@/components/ListingCardSkeleton';
import FiltersSidebar, { ActiveFilters } from '@/components/FiltersSidebar';
import { useApp } from '@/contexts/AppContext';

const ITEMS_PER_PAGE = 12;

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { listings } = useApp();
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
  }, [query]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let result = listings.filter(l => l.status === 'active' && (l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)));
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
  }, [listings, query, priceMin, priceMax, condition, city, sortBy]);

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
        <h1 className="text-2xl font-bold mb-1">Search results for "{query}"</h1>
        <p className="text-sm text-muted-foreground mb-6">{filtered.length} results found</p>

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
            <ActiveFilters filters={activeFilters} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <ListingCardSkeleton key={i} />)
                : paged.map(l => <ListingCard key={l.id} listing={l} />)
              }
            </div>
            {!loading && filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No listings found matching your search</p>
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

export default SearchResults;
