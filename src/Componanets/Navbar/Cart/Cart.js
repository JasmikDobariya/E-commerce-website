import ClearIcon from "@mui/icons-material/Clear";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteItemFromCart } from "../../../Redux/Slice/CartSlice";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFirebase } from "../../../Creatcontext/Firebase";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  const [cartImages, setCartImages] = useState([]);
  const cart = useSelector((state) => state.cart);
  const [quantities, setQuantities] = useState({});

  const dispatch = useDispatch();
  const firebase = useFirebase();

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
      total + parseFloat(item.prize) * (quantities[item.id] || 1),
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
            console.log("Image URL for", item.title, ":", imageUrlDownloaded);
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
    <section>
      <div className="container">
        <div className="mb-5 row">
          <div className="col-9">
            <h1 className="fw-bold mt-4 mb-4">Cart</h1>
            <table className="cart_table table table-borderless">
              <thead>
                <tr className="border-bottom">
                  <th className="bg-transparent text-dark px-0">Product</th>
                  <th className="bg-transparent text-dark px-0">Counter</th>
                  <th className="bg-transparent text-dark px-0 ">Price</th>
                  <th className="bg-transparent text-dark px-0">
                    Stock Status
                  </th>
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
                          className="delete_icon "
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
          <div className="col-3 cart_total">
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
                <h6>
                  Free Shipping
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorum quidem commodi,
                  </p>
                </h6>
              </div>
              <hr />
              <div className="d-flex gap-3">
                <h5>Total :</h5>
                <h5 className="fw-1">{`${subtotal}`}$</h5>
              </div>
            </div>
            <Link to="/buy_now">
              <button className="col-12 p-3 check_out">Check out</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
