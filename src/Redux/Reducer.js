// reducers.js
import { combineReducers } from "redux";
import WishlistReducer from "./Slice/WishlistSlice.js";
import CartReducer from "./Slice/CartSlice.js";

const rootReducer = combineReducers({
  wishlist: WishlistReducer,
  cart: CartReducer,
});

export default rootReducer;
