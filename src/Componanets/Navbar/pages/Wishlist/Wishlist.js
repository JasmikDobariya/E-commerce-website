import React from "react";
import "./Wishlist.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../../Redux/Slice/CartSlice";
import { deleteItemFromWishlist } from "../../../../Redux/Slice/WishlistSlice.js";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteItem = (index) => {
    dispatch(deleteItemFromWishlist(index));
  };

  const addCartItem = (item) => {
    toast.success("SuccessFully Add in Cart");
    dispatch(addToCart(item));
  };

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
                  <th className="bg-transparent text-dark px-0">
                    Stock Status
                  </th>
                  <th className="bg-transparent text-dark px-0"></th>
                </tr>
              </thead>
              <tbody>
                {wishlist.length > 0 ? (
                  wishlist.map((item, index) => (
                    <tr key={index}>
                      <td className="d-flex align-items-center">
                        <img
                          src={`https://server-ecommerce-two.vercel.app${item?.coverImageURL}`}
                          alt="/"
                          width={150}
                          height={120}
                          className="mr-4"
                        />

                        <div className="ps-3">
                          <h6 className="text-muted">{item.title}</h6>
                          <h5 className="fw-bold">{item.dis}</h5>
                        </div>
                      </td>
                      <td>
                        <h6 className="fw-bold mb-0">{item.price}₹</h6>
                      </td>
                      <td>{item.stock} Item Left</td>
                      <td>
                        <button
                          className="btn_cart_wishlist me-3"
                          onClick={() => addCartItem(item)}
                        >
                          <ShoppingCartIcon /> Add to Cart
                        </button>
                       
                        <Link
                          to="/buy_now"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/buy_now", {
                              state: {
                                wishlist: wishlist,
                              },
                            });
                          }}
                        >
                          <button className="btn_cart_wishlist ms-4">
                            <ShoppingBasketIcon /> Buy Now
                          </button>
                        </Link>
                        <DeleteForeverIcon
                          onClick={() => deleteItem(index)}
                          className="delete_icon ms-4 "
                        />
                      </td>
                      <div>
                        <ToastContainer  />
                        </div>
                    </tr>
                    
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      <h1 className="text-center m-5 text-capitalize">
                        Your wishlist is empty.
                      </h1>
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
