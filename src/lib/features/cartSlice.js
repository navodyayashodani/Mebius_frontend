/*import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(state.value);
      const product = action.payload;

      const foundItem = state.value.find(
        (item) => item.product._id === product._id
      );
      if (foundItem) {
        foundItem.quantity += 1;
        return;
      }
      state.value.push({ product: action.payload, quantity: 1 });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;*/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      // Handle both product details page and product card formats
      const productToAdd = item.product || item;
      const quantity = item.quantity || 1;

      const existingItem = state.value.find(
        (cartItem) => cartItem.product._id === productToAdd._id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.value.push({
          product: {
            _id: productToAdd._id,
            name: productToAdd.name,
            price: productToAdd.price,
            image: productToAdd.image,
            category: productToAdd.category
          },
          quantity
        });
      }
    },
    removeFromCart: (state, action) => {
      state.value = state.value.filter(
        (item) => item.product._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.value = [];
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
