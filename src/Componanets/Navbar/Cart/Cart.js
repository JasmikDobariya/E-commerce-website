import ClearIcon from "@mui/icons-material/Clear";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteItemFromCart } from "../../../Redux/Slice/CartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteItem = (index) => {
    dispatch(deleteItemFromCart(index));
  };

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
                  <th className="bg-transparent text-dark px-0">Price</th>
                  <th className="bg-transparent text-dark px-0">
                    Stock Status
                  </th>
                  <th className="bg-transparent text-dark px-0"></th>
                </tr>
              </thead>
              <tbody>
                {cart.length > 0 ? (
                  cart.map((item, index) => (
                    <tr key={index}>
                      <td className="d-flex align-items-center">
                        <img
                          src={item.img}
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
                        <h5 className="fw-bold mb-0 ">{item.prize}</h5>
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
                <h6>Subtotal:</h6>
                <h6>07$</h6>
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
                <h6>Total:</h6>
                <h6>70$</h6>
              </div>
            </div>

            <button className="col-12 p-3">Cack out</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
