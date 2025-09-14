import { Heart, ShoppingCart, User } from "lucide-react";
import React from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

interface NavProps {
  setIsOpen: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Nav: React.FC<NavProps> = ({ setIsOpen, searchTerm, setSearchTerm }) => {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();

  const cartItems = cartState.items;
  const wishlistItems = wishlistState.items;
  const navigate = useNavigate();

  const goToWishlist = () => {
  navigate("/wishlist"); // replace "/wishlist" with your actual route
};

  const openCart = () => cartDispatch({ type: "TOGGLE_CART", payload: true });
  const openWishlist = () =>
    wishlistDispatch({ type: "TOGGLE_WISHLIST", payload: true });

  return (
    <div className="bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 relative">
          {/* Filters button (mobile) */}
          <button
            className="lg:hidden font-epunda px-3 py-2 bg-blue-600 text-white rounded-l-lg flex items-center gap-1 hover:bg-blue-700 transition-colors"
            onClick={() => setIsOpen(true)}
            aria-label="Open filters"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h18M3 12h18M3 20h18"
              />
            </svg>
            Filters
          </button>

          {/* Search input */}
          <div className="flex-1 relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search shoes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full font-lato pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 focus:outline-none rounded"
                type="button"
              >
                ✕
              </button>
            )}
          </div>

          {/* Desktop icons */}
          {/* Desktop icons */}
<div className="hidden lg:flex items-center gap-6 ml-4">
  {/* ❤️ Wishlist with badge */}
  <div className="relative cursor-pointer" onClick={goToWishlist}>
    <Heart className="text-gray-600 hover:text-red-500" size={24} />
    {wishlistItems.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        {wishlistItems.length}
      </span>
    )}
  </div>

  {/* 🛒 Shopping cart with badge */}
  <div
    className="relative cursor-pointer"
    onClick={openCart}
    title="Cart"
  >
    <ShoppingCart
      className="text-gray-600 hover:text-blue-500"
      size={24}
    />
    {cartItems.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        {cartItems.length}
      </span>
    )}
  </div>

  <User
    className="text-gray-600 hover:text-blue-500 cursor-pointer"
    size={24}
  />
</div>

{/* Mobile icons */}
<div className="flex lg:hidden items-center gap-4 ml-2">
  {/* Wishlist */}
  <div className="relative cursor-pointer" onClick={goToWishlist}>
    <Heart className="text-gray-600 hover:text-red-500" size={22} />
    {wishlistItems.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
        {wishlistItems.length}
      </span>
    )}
  </div>

  {/* Cart */}
      <div  className="relative cursor-pointer"
        onClick={openCart}
        title="Cart"
      >
        <ShoppingCart
          className="text-gray-600 hover:text-blue-500"
          size={22}
        />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
        
      </div>
    </div>

        </div>
      </header>
    </div>
  );
};

export default Nav;
