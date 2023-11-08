import React, { useState } from "react";
import "./Arrivals.css";
import cardimg from "./ArrivalsArray";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductModal from "./ProductModal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToWishlist } from "../../Redux/Slice/WishlistSlice.js";
import { addToCart } from "../../Redux/Slice/CartSlice.js";

const Arrivals = () => {
  const dispatch = useDispatch();

  const [showNotification, setShowNotification] = useState(false);
  const [addedincart, setaddedincart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const Stock = [
    {
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
    },
  ];

  const showNotificationMessage = () => {
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const HandalWishlist = (item) => {
    showNotificationMessage();
    dispatch(addItemToWishlist(item));
    console.log(item);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    console.log(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const addedincartmassge = () => {
    setaddedincart(true);

    setTimeout(() => {
      setaddedincart(false);
    }, 2000);
  };

  const HandalCart = (item) => {
    dispatch(addToCart(item));
    addedincartmassge();
    console.log(item);
  };

  return (
    <section className="text-capitalize">
      <div className="container">
        <div className="d-grid justify-content-center align-items-center">
          <span className="text-center">
            <h3 className="titel">New Arrivals</h3>
            <p className="text-muted pb-4">
              Check out our new furniture collection! Cozy sofa, fancy chair,
              wooden casket, and many more. The new collection brings an
              informal elegance to your home.
            </p>
          </span>
        </div>
      </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5">
          {cardimg.map((item, index) => (
            <div className="col" key={index}>
              <div className="card">
                <div className="img_div">
                  <div className="image-container">
                    <Link to={`/products/${index}`}>
                      <img
                        src={item.img}
                        className="card-img-top"
                        alt="/"
                        height={250}
                        width={200}
                      />
                    </Link>
                  </div>
                  <div className="icons">
                    <div className="wishlist_icon">
                      <FavoriteBorderIcon
                        onClick={(e) => HandalWishlist(item)}
                        className="fs-3"
                      />
                    </div>

                    <div className="zoom_icon">
                      <ZoomInIcon
                        className="fs-3"
                        onClick={() => openProductModal(item)}
                      />
                    </div>
                    <div className="cart_icon">
                      <ShoppingCartIcon
                        className="fs-3"
                        onClick={() => HandalCart(item)}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`notification ${showNotification ? "show" : ""}`}
                >
                  Added to wishlist!
                </div>
                <div className={`addtocart ${addedincart ? "show" : ""}`}>
                  Added to Cart!
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text m-0 mb-1">{item.dis}</p>
                  <h4>{item.prize}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center pb-5">
        <Link to="/shops">
          <button className="btn">View more</button>
        </Link>
      </div>
      <div className="itemstock_div mb-5">
        <div className="container">
          <div className="stock_div">
            <h5 className="stock_titel">NEWS AND INSPIRATION</h5>
            <h1 className="stock_dis">NEW ARRIVALS</h1>
            <div className="border_div mt-4"></div>
            {Stock.map((item, index) => {
              return (
                <div key={index} className="stock_item text-capitalize">
                  <h5 className="stock_days">
                    {item.days} <p>days</p>
                  </h5>
                  <h5 className="stock_hours">
                    {item.hours} <p>hours</p>
                  </h5>
                  <h5 className="stock_mins">
                    {item.mins} <p>mins</p>
                  </h5>
                  <h5 className="stock_secs">
                    {item.secs} <p>secs</p>
                  </h5>
                </div>
              );
            })}
            <div className="d-flex gap-3">
              <h2>
                <del>$140.56</del>
              </h2>
              <h1 className="fw-bolder">$70</h1>
            </div>
          </div>
        </div>
      </div>
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeProductModal} />
      )}
    </section>
  );
};

export default Arrivals;
