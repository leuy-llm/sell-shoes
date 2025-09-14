import React from "react";

const ProductSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg shadow-sm overflow-hidden animate-pulse">
      {/* 🖼️ Image placeholder */}
      <div className="relative">
        <div className="w-full h-48 bg-gray-200" />
        <div className="absolute top-3 right-3 h-8 w-8 bg-gray-300 rounded-full" />
      </div>

      {/* 📦 Content */}
      <div className="p-4 space-y-3">
        {/* Title placeholder */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />

        {/* Rating placeholder */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-10 bg-gray-200 rounded" />
        </div>

        {/* Price + button row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-12 bg-gray-200 rounded" />
          </div>
          <div className="h-8 w-8 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
