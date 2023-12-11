import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    deleteItemFromCart: (state, action) => {
      return state.filter((item, index) => index !== action.payload);
    },
  },
});

export const { addToCart, deleteItemFromCart } = CartSlice.actions;

export default CartSlice.reducer;
