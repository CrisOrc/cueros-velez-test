import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useReducer,
} from "react";
import type { Product, SKU } from "../types";

interface CartItem {
  productId: string;
  skuId: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  size?: string;
  color?: string;
}

interface CartState {
  items: CartItem[];
  add: (p: Product, sku: SKU) => void;
  remove: (skuId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartState | null>(null);

function reducer(state: CartItem[], action: any): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.skuId === action.payload.skuId);
      if (existing) {
        return state.map((i) =>
          i.skuId === existing.skuId ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...state, action.payload];
    }
    case "REMOVE":
      return state.filter((i) => i.skuId !== action.payload);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [], () =>
    JSON.parse(localStorage.getItem("cart") || "[]"),
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const value: CartState = {
    items,
    add: (product, sku) =>
      dispatch({
        type: "ADD",
        payload: {
          productId: product.productId,
          skuId: sku.itemId,
          name: product.productName,
          image: sku.images[0]?.imageUrl,
          price: sku.sellers[0].commertialOffer.Price,
          qty: 1,
          size: sku.Talla?.[0],
          color: sku.Color?.[0],
        },
      }),
    remove: (skuId: string) => dispatch({ type: "REMOVE", payload: skuId }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return createElement(CartContext.Provider, { value }, children);
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
