import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import Checkout from "./Checkout";

const CartSidebar = () => {
  const { state, dispatch } = useCart();
  const total = state.items.reduce(
    (acc, item) => acc + item.newPrice * item.quantity,
    0
  );

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          state.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch({ type: "TOGGLE_CART", payload: false })}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-gradient-to-b from-white to-gray-50 shadow-2xl transition-all duration-500 ease-out z-50 ${
          state.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="relative bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-900 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-900 font-epunda">Shopping Cart</h2>
                <p className="text-sm font-lato text-gray-500">
                  {state.items.length} item{state.items.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <button
              onClick={() => dispatch({ type: "TOGGLE_CART", payload: false })}
              className="p-2 hover:bg-gray-100 rounded-lg font-epunda transition-colors duration-200 group"
            >
              <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-200px)] px-6">
            <div className="p-6 bg-gray-100 rounded-full mb-4">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 font-epunda">Your cart is empty</h3>
            <p className="text-gray-500 font-epunda text-center text-sm">
              Add some items to get started with your shopping
            </p>
          </div>
        ) : (
          <div className="px-6 py-4 space-y-4 overflow-y-auto h-[calc(100%-200px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {state.items.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative overflow-hidden rounded-lg bg-gray-50 flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-16 h-16 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate font-epunda">{item.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-semibold font-lato text-gray-900">
                        ${item.newPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 font-epunda">each</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      className="p-1 hover:bg-red-50 rounded-lg transition-colors duration-200 group/delete"
                      onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 group-hover/delete:text-red-500" />
                    </button>
                    <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                      <button
                        className="p-1.5 hover:bg-white rounded-md transition-colors duration-200 shadow-sm"
                        onClick={() => dispatch({ type: "DECREMENT", payload: item.id })}
                      >
                        <Minus className="w-3 h-3 text-gray-600" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        className="p-1.5 hover:bg-white rounded-md transition-colors duration-200 shadow-sm"
                        onClick={() => dispatch({ type: "INCREMENT", payload: item.id })}
                      >
                        <Plus className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500 font-lato">
                    {item.quantity} × ${item.newPrice.toFixed(2)}
                  </span>
                  <span className="font-semibold font-lato text-gray-900">
                    ${(item.newPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-lg font-medium text-gray-600 font-epunda">Total</span>
                <span className="text-2xl font-bold font-lato text-gray-900">${total.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  dispatch({ type: "TOGGLE_CART", payload: false });
                  setCheckoutOpen(true); // open full-screen modal
                }}
                className="w-full bg-gradient-to-r font-lato from-gray-900 to-gray-800 text-white py-4 rounded-xl font-semibold text-lg hover:from-gray-800 hover:to-gray-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Checkout
              </button>

              <button
                onClick={() => dispatch({ type: "TOGGLE_CART", payload: false })}
                className="w-full font-lato text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Full-screen Checkout Modal */}
      {checkoutOpen && <Checkout onClose={() => setCheckoutOpen(false)} />}
    </>
  );
};

export default CartSidebar;
