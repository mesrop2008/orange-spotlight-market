import React from 'react';

const ListingCardSkeleton: React.FC = () => (
  <div className="rounded-xl border bg-card overflow-hidden animate-pulse">
    <div className="aspect-[4/3] bg-muted" />
    <div className="p-3 space-y-2">
      <div className="h-5 w-20 bg-muted rounded" />
      <div className="h-4 w-full bg-muted rounded" />
      <div className="flex justify-between">
        <div className="h-3 w-16 bg-muted rounded" />
        <div className="h-3 w-16 bg-muted rounded" />
      </div>
    </div>
  </div>
);

export default ListingCardSkeleton;
