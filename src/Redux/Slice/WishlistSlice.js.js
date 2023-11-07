import { createSlice } from "@reduxjs/toolkit";

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addItemToWishlist: (state, action) => {
      state.push(action.payload);
    },
    deleteItemFromWishlist: (state, action) => {
      return state.filter((item, index) => index !== action.payload);
    },
  },
  serialize: {
    payload: ["rating"],
  },
});

export const { addItemToWishlist, deleteItemFromWishlist } = WishlistSlice.actions;

export default WishlistSlice.reducer;
