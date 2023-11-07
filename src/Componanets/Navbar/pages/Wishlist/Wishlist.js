import React from "react";
import "./Wishlist.css"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from "react-redux";
import  {addToCart}  from "../../../../Redux/Slice/CartSlice"; 
import { deleteItemFromWishlist } from "../../../../Redux/Slice/WishlistSlice.js";

const Wishlist = () => {

  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();


  const deleteItem = (index) => {
    dispatch(deleteItemFromWishlist(index));
  };

  const addCartItem = (item) => {
    dispatch(addToCart(item));
  }

  return (
    <section>
      <div className="container">
        <div className="mb-5 row">
          <div className="col-12">
            <h1 className="fw-bold mt-4 mb-4">Wishlist</h1>
            <table className="wishlist_table table table-borderless">
              <thead>
                <tr className="border-bottom">
                  <th className="bg-transparent text-dark px-0">Product</th>
                  <th className="bg-transparent text-dark px-0">Price</th>
                  <th className="bg-transparent text-dark px-0">Stock Status</th>
                  <th className="bg-transparent text-dark px-0"></th>
                </tr>
              </thead>
              <tbody>
                {wishlist.length > 0 ? (
                  wishlist.map((item, index) => (
                    <tr key={index}>
                      <td className="d-flex align-items-center">
                        <img src={item.img} alt="/" width={150} height={120} className="mr-4" />
                        <div className="ps-3">
                          <h6 className="text-muted">{item.title}</h6>
                          <h5 className="fw-bold">{item.dis}</h5>
                        </div>
                      </td>
                      <td >
                        <h6 className="fw-bold mb-0">{item.prize}</h6>
                      </td>
                      <td >Invelid</td> 
                      <td >
                        <button className="btn_cart_wishlist me-3" onClick={() => addCartItem(item)}><ShoppingCartIcon  /> Add to Cart</button>
                        <DeleteForeverIcon onClick={() => deleteItem(index)}  className="delete_icon "  />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      <h1 className="text-center m-5 text-capitalize">Your wishlist is empty.</h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
