import React, { useState } from "react";
import "./Arrivals.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductModal from "./ProductModal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToWishlist } from "../../Redux/Slice/WishlistSlice.js";
import { addToCart } from "../../Redux/Slice/CartSlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../../Creatcontext/DataBackend.js";

const Arrivals = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products } = useAuth();

  const Stock = [
    {
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
    },
  ];

  const dispatch = useDispatch();

  const HandalWishlist = (item) => {
    toast.success("SuccessFully Add in WishList", {
      position: "top-left",
    });
    dispatch(addItemToWishlist(item));
  };

  const openProductModal = (item) => {
    setSelectedProduct(item);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const HandalCart = (item) => {
    toast.success("SuccessFully Add in Cart", {
      position: "top-left",
    });
    dispatch(addToCart(item));
  };

  return (
    <section className="text-capitalize">
      <div className="container">
        <div className="d-grid justify-content-center align-items-center">
          <span className="text-center">
            <h3 className="titel" data-aos="fade-down">
              New Arrivals
            </h3>
            <p className="text-muted pb-4" data-aos="flip-left">
              Check out our new furniture collection! Cozy sofa, fancy chair,
              wooden casket, and many more. The new collection brings an
              informal elegance to your home.
            </p>
          </span>
        </div>
      </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-sm-2 g-md-3  g-lg-5">
          {products.slice(0, 8).map((item, index) => (
            <div className="col" key={index}>
              <div className="card">
                <div className="img_div">
                  <div className="image-container">
                    <Link to={`/products/${item._id}`}>
                      <img
                        src={`https://server-ecommerce-two.vercel.app/${item.coverImageURL}`}
                        className="card-img-top"
                        alt="/"
                        height={250}
                        width={200}
                        data-aos="flip-left"
                        data-aos-duration="1500"
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
                        onClick={(e) => openProductModal(item)}
                      />
                    </div>
                    <div className="cart_icon">
                      <ShoppingCartIcon
                        className="fs-3"
                        onClick={(e) => HandalCart(item)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <ToastContainer />
                </div>
                <div>
                  <ToastContainer />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text m-0 mb-1">{item.dis}</p>

                  <h4>{item.price}₹</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {products.length > 8 && (
        <div className="text-center py-5">
          <Link to="/shops">
            <button className="btn">View All</button>
          </Link>
        </div>
      )}
      <div className="itemstock mb-5">
        <div className="container">
          <div className="itemstock_div ">
            {/* <img src="../../.././public/promo.095c8408.png" alt="" data-aos="fade-down-left" /> */}

            <div className="stock_div">
              <h5 className="stock_titel" data-aos="fade-right">
                NEWS AND INSPIRATION
              </h5>
              <h1 className="stock_dis" data-aos="zoom-in">
                NEW ARRIVALS
              </h1>
              <div className="border_div mt-4"></div>
              {Stock.map((item, index) => {
                return (
                  <div key={index} className="stock_item text-capitalize">
                    <h5 className="stock_days" data-aos="zoom-in-up">
                      {item.days} <p>days</p>
                    </h5>
                    <h5 className="stock_hours" data-aos="zoom-in-down">
                      {item.hours} <p>hours</p>
                    </h5>
                    <h5 className="stock_mins" data-aos="zoom-in-up">
                      {item.mins} <p>mins</p>
                    </h5>
                    <h5 className="stock_secs" data-aos="zoom-in-down">
                      {item.secs} <p>secs</p>
                    </h5>
                  </div>
                );
              })}
              <div className="d-flex gap-3">
                <h2 data-aos="zoom-out">
                  <del>$140.56</del>
                </h2>
                <h1 className="fw-bolder" data-aos="zoom-out-up">
                  $70
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedProduct && (
        <ProductModal products={selectedProduct} onClose={closeProductModal} />
      )}
    </section>
  );
};

export default Arrivals;
