import React, { createContext, useContext, useReducer, type ReactNode } from "react";

export interface WishlistItem {
  id: number;
  title: string;
  img: string;
  newPrice: number;
  prevPrice: number;
  rating: number;
  reviews: string;
}

interface WishlistState {
  items: WishlistItem[];
}

type Action =
  | { type: "ADD_TO_WISHLIST"; payload: WishlistItem }
  | { type: "REMOVE_FROM_WISHLIST"; payload: number }
  | { type: "CLEAR_WISHLIST" };

interface WishlistContextProps {
  state: WishlistState;
  dispatch: React.Dispatch<Action>;
}

const initialState: WishlistState = { items: [] };

const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined
);

function wishlistReducer(state: WishlistState, action: Action): WishlistState {
  switch (action.type) {
    case "ADD_TO_WISHLIST": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) return state; // avoid duplicates
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_FROM_WISHLIST":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case "CLEAR_WISHLIST":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
