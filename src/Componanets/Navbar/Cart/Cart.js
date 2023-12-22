import React, { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteItemFromCart } from "../../../Redux/Slice/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../../Creatcontext/Firebase";

const Cart = () => {
  const [cartImages, setCartImages] = useState([]);
  const cart = useSelector((state) => state.cart);
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const navigate = useNavigate();

  const deleteItem = (index) => {
    dispatch(deleteItemFromCart(index));
  };

  const inc = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) + 1,
    }));
  };

  const dic = (productId) => {
    if (quantities[productId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    }
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + (parseFloat(item.prize) || 0) * (quantities[item.id] || 1),
    0
  );

  useEffect(() => {
    const fetchCartImages = async () => {
      try {
        const imageUrls = await Promise.all(
          cart.map(async (item) => {
            const imageUrlDownloaded = await firebase.downloadurl(
              item.imageUrl || item.image
            );
            return imageUrlDownloaded;
          })
        );
        setCartImages(imageUrls);
      } catch (error) {
        console.error("Error fetching cart images:", error);
      }
    };

    fetchCartImages();
  }, [firebase, cart]);

  return (
    <section className="mt-4">
      <div className="container">
        <div className="mb-5 row">
          <div className="col-md-9">
            <h1 className="fw-bold mt-4 mb-4">Cart</h1>
            <table className="table table-borderless">
              <thead>
                <tr className="border-bottom">
                  <th className="bg-transparent text-dark">Product</th>
                  <th className="bg-transparent text-dark">Counter</th>
                  <th className="bg-transparent text-dark">Price</th>
                  <th className="bg-transparent text-dark">Stock Status</th>
                </tr>
              </thead>
              <tbody>
                {cart.length > 0 ? (
                  cart.map((item, index) => (
                    <tr key={index}>
                      <td className="d-flex align-items-center">
                        {cartImages[index] && (
                          <img
                            src={cartImages[index]}
                            alt="/"
                            width={150}
                            height={120}
                            className="mr-4"
                          />
                        )}
                        <div className="ps-3">
                          <h6 className="text-muted">{item.title}</h6>
                          <h5 className="fw-bold">{item.dis}</h5>
                        </div>
                      </td>
                      <td>
                        <h6 className="fw-bold mb-0">
                          <RemoveIcon
                            className="product_dic"
                            onClick={() => dic(item.id)}
                          />
                          {quantities[item.id] || 1}
                          <AddIcon
                            className="product_inc"
                            onClick={() => inc(item.id)}
                          />
                        </h6>
                      </td>
                      <td>
                        <h6 className="fw-bold mb-0">{item.prize}</h6>
                      </td>
                      <td>
                        <ClearIcon
                          className="delete_icon"
                          onClick={() => deleteItem(index)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      <h1 className="text-center m-5 text-capitalize">
                        Your cart is empty.
                      </h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="col-md-3 cart_total">
            <div className="m-4">
              <div className="py-4">
                <h3>Cart Total</h3>
              </div>
              <div className="d-flex gap-3">
                <h6>Subtotal :</h6>
                <h6>{`${subtotal}`}$</h6>
              </div>
              <hr />
              <div className="d-flex gap-3">
                <h6>Shipping:</h6>
                <h6>Free Shipping</h6>
              </div>
              <hr />
              <div className="d-flex gap-3">
                <h5>Total :</h5>
                <h5 className="fw-1">{`${subtotal}`}$</h5>
              </div>
            </div>
            {
              console.log("subtotal" , quantities)
            }
            <Link
              to="/buy_now"
              onClick={(e) => {
                e.preventDefault();
                navigate("/buy_now", {
                  state: {
                    cartItems: cart,
                    subtotal: subtotal,
                    quantities: quantities,
                  },
                });
              }}
            >
              <button className="col-12 p-3 check_out">Buy Now</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
