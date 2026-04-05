import React from 'react';
import { X } from 'lucide-react';

interface FiltersProps {
  priceMin: string;
  priceMax: string;
  condition: string[];
  city: string;
  sortBy: string;
  onPriceMinChange: (v: string) => void;
  onPriceMaxChange: (v: string) => void;
  onConditionChange: (v: string[]) => void;
  onCityChange: (v: string) => void;
  onSortChange: (v: string) => void;
}

const FiltersSidebar: React.FC<FiltersProps> = ({
  priceMin, priceMax, condition, city, sortBy,
  onPriceMinChange, onPriceMaxChange, onConditionChange, onCityChange, onSortChange,
}) => {
  const toggleCondition = (c: string) => {
    onConditionChange(
      condition.includes(c) ? condition.filter(x => x !== c) : [...condition, c]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-2">Sort by</h3>
        <select
          value={sortBy}
          onChange={e => onSortChange(e.target.value)}
          className="w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="newest">Newest first</option>
          <option value="cheapest">Price: Low to High</option>
          <option value="expensive">Price: High to Low</option>
          <option value="views">Most viewed</option>
        </select>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-2">Price range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={e => onPriceMinChange(e.target.value)}
            className="w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={e => onPriceMaxChange(e.target.value)}
            className="w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-2">Condition</h3>
        <div className="space-y-2">
          {['new', 'used'].map(c => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={condition.includes(c)}
                onChange={() => toggleCondition(c)}
                className="rounded border-border accent-primary"
              />
              <span className="text-sm capitalize">{c}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-2">City</h3>
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={e => onCityChange(e.target.value)}
          className="w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
    </div>
  );
};

export default FiltersSidebar;

export const ActiveFilters: React.FC<{
  filters: { label: string; onRemove: () => void }[];
}> = ({ filters }) => {
  if (filters.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((f, i) => (
        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
          {f.label}
          <button onClick={f.onRemove} className="hover:text-destructive"><X className="h-3 w-3" /></button>
        </span>
      ))}
    </div>
  );
};
