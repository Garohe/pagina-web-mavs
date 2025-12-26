import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem, Coupon } from '@/types';

const RESERVATION_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

const initialState: Cart = {
  items: [],
  appliedCoupon: undefined,
};

// Load from localStorage
const loadCartState = (): Cart => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return initialState;
    }
    const cart: Cart = JSON.parse(serializedState);

    // Remove expired reservations
    const now = Date.now();
    cart.items = cart.items.filter(item => {
      const reservedTime = new Date(item.reservedAt).getTime();
      return now - reservedTime < RESERVATION_TIME;
    });

    return cart;
  } catch (err) {
    return initialState;
  }
};

const saveCartState = (state: Cart) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartState(),
  reducers: {
    addToCart: (state, action: PayloadAction<{ productId: string; variantId: string; quantity: number }>) => {
      const existingItem = state.items.find(
        item => item.productId === action.payload.productId && item.variantId === action.payload.variantId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.reservedAt = new Date().toISOString();
      } else {
        state.items.push({
          productId: action.payload.productId,
          variantId: action.payload.variantId,
          quantity: action.payload.quantity,
          reservedAt: new Date().toISOString(),
        });
      }

      saveCartState(state);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; variantId: string; quantity: number }>) => {
      const item = state.items.find(
        i => i.productId === action.payload.productId && i.variantId === action.payload.variantId
      );

      if (item) {
        item.quantity = action.payload.quantity;
        saveCartState(state);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string; variantId: string }>) => {
      state.items = state.items.filter(
        item => !(item.productId === action.payload.productId && item.variantId === action.payload.variantId)
      );
      saveCartState(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = undefined;
      saveCartState(state);
    },
    applyCoupon: (state, action: PayloadAction<Coupon>) => {
      state.appliedCoupon = action.payload;
      saveCartState(state);
    },
    removeCoupon: (state) => {
      state.appliedCoupon = undefined;
      saveCartState(state);
    },
    removeExpiredItems: (state) => {
      const now = Date.now();
      state.items = state.items.filter(item => {
        const reservedTime = new Date(item.reservedAt).getTime();
        return now - reservedTime < RESERVATION_TIME;
      });
      saveCartState(state);
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
  removeExpiredItems,
} = cartSlice.actions;

export default cartSlice.reducer;
