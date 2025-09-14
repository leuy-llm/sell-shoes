import React, { createContext, useContext, useReducer, type ReactNode } from "react";

export interface CartItem {
    id: number;
    title: string;
    img: string;
    newPrice: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

type Action =
    | { type: "ADD_TO_CART"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
    | { type: "REMOVE_FROM_CART"; payload: number }
    | { type: "INCREMENT"; payload: number }
    | { type: "DECREMENT"; payload: number }
    | { type: "TOGGLE_CART"; payload?: boolean }
    | { type: "CLEAR_CART" };

interface CartContextProps {
    state: CartState;
    dispatch: React.Dispatch<Action>;
}

const initialState: CartState = { items: [], isOpen: false };

const CartContext = createContext<CartContextProps | undefined>(undefined);

function cartReducer(state: CartState, action: Action): CartState {
    switch (action.type) {
        case "ADD_TO_CART": {
            const exists = state.items.find(i => i.id === action.payload.id);
            if (exists) {
                return {
                    ...state,
                    items: state.items.map(i =>
                        i.id === action.payload.id ? { ...i, quantity: i.quantity + (action.payload.quantity ?? 1) } : i
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: action.payload.quantity ?? 1 }],
            };
        }
        case "REMOVE_FROM_CART":
            return { ...state, items: state.items.filter(i => i.id !== action.payload) };
        case "INCREMENT":
            return {
                ...state,
                items: state.items.map(i => i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i),
            };
        case "DECREMENT":
            return {
                ...state,
                items: state.items
                    .map(i => i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i)
                    .filter(i => i.quantity > 0),
            };
        case "TOGGLE_CART":
            return { ...state, isOpen: action.payload ?? !state.isOpen };
        case "CLEAR_CART":
            return { ...state, items: [] };
        default:
            return state;
    }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
