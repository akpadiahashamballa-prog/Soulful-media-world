import { create } from 'zustand';
import { Product, Cart, CartItem, Order } from '@/types';

interface MarketplaceState {
  products: Product[];
  cart: Cart;
  orders: Order[];
  loading: boolean;
  error: string | null;
  
  // Product management
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  
  // Cart management
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Order management
  createOrder: (paymentMethod: 'stripe' | 'paystack' | 'selar') => Promise<string>;
  setOrders: (orders: Order[]) => void;
  
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export const useMarketplaceStore = create<MarketplaceState>((set, get) => ({
  products: [],
  cart: { items: [], total: 0, currency: 'USD' },
  orders: [],
  loading: false,
  error: null,

  addProduct: (product: Product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  removeProduct: (productId: string) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),

  updateProduct: (productId: string, updates: Partial<Product>) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId ? { ...p, ...updates } : p
      ),
    })),

  addToCart: (product: Product, quantity: number) =>
    set((state) => {
      const existingItem = state.cart.items.find((item) => item.product.id === product.id);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = state.cart.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.cart.items, { product, quantity }];
      }

      return {
        cart: {
          items: newItems,
          total: calculateCartTotal(newItems),
          currency: 'USD',
        },
      };
    }),

  removeFromCart: (productId: string) =>
    set((state) => {
      const newItems = state.cart.items.filter(
        (item) => item.product.id !== productId
      );
      return {
        cart: {
          items: newItems,
          total: calculateCartTotal(newItems),
          currency: 'USD',
        },
      };
    }),

  updateCartItem: (productId: string, quantity: number) =>
    set((state) => {
      if (quantity <= 0) {
        return get().removeFromCart(productId);
      }
      const newItems = state.cart.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      return {
        cart: {
          items: newItems,
          total: calculateCartTotal(newItems),
          currency: 'USD',
        },
      };
    }),

  clearCart: () =>
    set({
      cart: { items: [], total: 0, currency: 'USD' },
    }),

  createOrder: async (paymentMethod: 'stripe' | 'paystack' | 'selar') => {
    const state = get();
    if (state.cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    set({ loading: true, error: null });
    try {
      const order: Order = {
        id: `order-${Date.now()}`,
        userId: 'user-123', // In production, get from auth
        items: state.cart.items,
        total: state.cart.total,
        currency: state.cart.currency,
        status: 'pending',
        paymentMethod,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set((prevState) => ({
        orders: [order, ...prevState.orders],
        loading: false,
      }));

      return order.id;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create order',
        loading: false,
      });
      throw error;
    }
  },

  setOrders: (orders: Order[]) => set({ orders }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));
