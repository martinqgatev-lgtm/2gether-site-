import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem } from '../types';

interface CartState {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addToCart: (product, size) => set((state) => {
        const targetSize = size || product.sizes[0];
        
        const itemIndex = state.cart.findIndex(
          item => item.id === product.id && item.selectedSize === targetSize
        );

        const newState = { isCartOpen: true } as Partial<CartState>;

        if (itemIndex > -1) {
          const newCart = [...state.cart];
          newCart[itemIndex].quantity += 1;
          newState.cart = newCart;
          return newState;
        }

        newState.cart = [...state.cart, { ...product, quantity: 1, selectedSize: targetSize }];
        return newState;
      }),

      removeFromCart: (productId, size) => set((state) => ({
        cart: state.cart.filter(item => !(item.id === productId && item.selectedSize === size))
      })),

      updateQuantity: (productId, size, quantity) => set((state) => ({
        cart: state.cart.map(item => 
          (item.id === productId && item.selectedSize === size) 
            ? { ...item, quantity: Math.max(0, quantity) } 
            : item
        ).filter(item => item.quantity > 0)
      })),

      clearCart: () => set({ cart: [] }),

      cartTotal: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getCartCount: () => {
        const state = get();
        return state.cart.reduce((acc, item) => acc + item.quantity, 0);
      }
    }),
    {
      name: '2getherbikes-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

interface WishlistState {
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (productId) => set((state) => {
        const exists = state.wishlist.includes(productId);
        return {
          wishlist: exists 
            ? state.wishlist.filter(id => id !== productId)
            : [...state.wishlist, productId]
        };
      }),

      isInWishlist: (productId) => {
        return get().wishlist.includes(productId);
      }
    }),
    {
      name: '2getherbikes-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface UIState {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
}));