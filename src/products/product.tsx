import React, { useState, useEffect } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { data as products } from "../db/data";
import type { FilterState } from "../types/filter";
import ProductSkeleton from "../components/ProductSkeleton";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

interface ProductsProps {
  searchTerm?: string;
  filters?: FilterState;
}

const Products: React.FC<ProductsProps> = ({ searchTerm = "", filters }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // 👈 change this for more/less items per page
  const { dispatch } = useCart();

  const { state: wishlist, dispatch: wishlistDispatch } = useWishlist();

  const isInWishlist = (id: number) => wishlist.items.some((item) => item.id === id);
  // ⭐ Star rating component
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  // Helper: check price range
  const inPriceRange = (price: number, range: string): boolean => {
    if (range === "All") return true;
    if (range === "$0 - $50") return price <= 50;
    if (range === "$51 - $100") return price > 50 && price <= 100;
    if (range === "$101 - $200") return price > 100 && price <= 200;
    if (range === "$200+") return price > 200;
    return true;
  };

  // 🔎 Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !filters || filters.category === "All" || p.category === filters.category;
    const matchesColor =
      !filters || filters.color === "All" || p.color === filters.color;
    const matchesBrand =
      !filters || filters.brand === "All" || p.brand === filters.brand;
    const matchesPrice =
      !filters || inPriceRange(p.newPrice, filters.priceRange);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesColor &&
      matchesBrand &&
      matchesPrice
    );
  });

  // 📄 Pagination slice
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ⏳ Fake loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-5">
      {isLoading ? (
        // Skeleton grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(itemsPerPage)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : currentProducts.length === 0 ? (
        // Empty state
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg font-semibold font-epunda">No products found</p>
          <p className="text-sm font-epunda">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <>
          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((p) => (
              <div key={p.id} className="rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden group">
                <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                <button
                    onClick={() =>
                    isInWishlist(p.id)
                        ? wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: p.id })
                        : wishlistDispatch({
                            type: "ADD_TO_WISHLIST",
                            payload: {
                            id: p.id,
                            title: p.title,
                            img: p.img,
                            newPrice: p.newPrice,
                            prevPrice: p.prevPrice,
                            rating: p.rating,
                            reviews: p.reviews,
                            },
                        })
                    }
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                >
                    <Heart
                    size={16}
                    className={`${
                        isInWishlist(p.id) ? "text-red-500 fill-red-500" : "text-gray-600"
                    }`}
                    />
                </button>
                </div>


                <div className="p-4">
                  <h3 className="font-semibold font-epunda text-gray-800 mb-2 line-clamp-2">
                    {p.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={p.rating} />
                    <span className="text-gray-600 font-lato">{p.reviews}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-lato font-bold text-gray-800">
                        ${p.newPrice.toFixed(2)}
                      </span>
                      <span className="text-sm font-lato text-gray-500 line-through">
                        ${p.prevPrice}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        dispatch({ type: "ADD_TO_CART", payload: p })
                      }
                      className="p-2 cursor-pointer bg-gray-100 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 📌 Pagination Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
            <div className="text-gray-600 text-sm font-lato">
              Showing {currentProducts.length} products of {filteredProducts.length}
            </div>

            {/* Right side - pagination buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="px-3 py-1 border font-lato rounded disabled:opacity-50"
                    >
                      Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 font-lato border rounded ${
                          currentPage === i + 1
                            ? "bg-gray-800 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="px-3 py-1 font-lato border rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
    </div>
  );
};

export default Products;
