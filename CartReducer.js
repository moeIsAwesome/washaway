import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.filter((item) => item.id !== action.payload.id);
      state.cartItems = removeItem;
    },
    incrementQuantity: (state, action) => {
      const itemPresent = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      itemPresent.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const itemPresent = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent.quantity == 1) {
        itemPresent.quantity = 0;
        const removeItem = state.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = removeItem;
      } else {
        itemPresent.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
 