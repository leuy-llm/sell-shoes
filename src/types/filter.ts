// ===== Filter Types =====
export interface FilterState {
  category: string;
  priceRange: string;
  color: string;
  brand: string;
}

export interface RecommendProps {
  selectedBrand: string;
  onBrandChange: (brand: string) => void;
}
