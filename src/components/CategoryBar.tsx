import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Car, Home, Shirt, Armchair, Briefcase, Wrench, PawPrint } from 'lucide-react';
import { categories } from '@/data/categories';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Smartphone, Car, Home, Shirt, Armchair, Briefcase, Wrench, PawPrint,
};

const CategoryBar: React.FC = () => {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-1">
      {categories.map(cat => {
        const Icon = iconMap[cat.icon];
        return (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="flex flex-col items-center gap-1.5 min-w-[72px] p-3 rounded-xl hover:bg-accent transition-colors group"
          >
            <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {Icon && <Icon className="h-6 w-6" />}
            </div>
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
              {cat.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryBar;
