import React from "react";
import { ArrowBigLeft, Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { state: _cartState, dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();

  const isInWishlist = (id: number) =>
    wishlistState.items.some((item) => item.id === id);

  

  // ⭐ Star rating component
  const StarRating = ({ rating }: { rating?: number }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`${
            rating && i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  if (wishlistState.items.length === 0) {
    return (
        <div className="text-center flex flex-col min-h-[90vh] justify-center items-center py-20 text-gray-500">
            <p className="text-lg font-epunda font-semibold">No items in wishlist</p>
            <p className="text-sm font-epunda">Start adding products to your wishlist!</p>
        <button onClick={() => window.location.href = "/"}
            className="bg-blue-600 font-lato text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <ArrowBigLeft size={16} />
            Back to Product
        </button>
        </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-5">
      <h2 className="text-2xl font-medium mb-6 text-gray-800 font-epunda">Product Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistState.items.map((p) => (
          <div
            key={p.id}
            className="rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group bg-white"
          >
            <div className="relative overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-48 object-cover group-hover:scale-100 transition-transform duration-500"
              />

              {/* ❤️ Wishlist button */}
              <button
                onClick={() =>
                  isInWishlist(p.id)
                    ? wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: p.id })
                    : wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: p })
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
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{p.title}</h3>

              {/* ⭐ Star rating + reviews */}
              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={p.rating} />
                <span className="text-gray-600">{p.reviews ?? 0}</span>
              </div>

              {/* Price + Add to Cart */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-800">${p.newPrice.toFixed(2)}</span>
                  {p.prevPrice && (
                    <span className="text-sm text-gray-500 line-through">{p.prevPrice}</span>
                  )}
                </div>
                <button
                  onClick={() =>
                    cartDispatch({ type: "ADD_TO_CART", payload: p })
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
    </div>
  );
};

export default Wishlist;
