import React, { useState} from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Shop.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductModal from "../../../Arrivals/ProductModal.js";
import { useDispatch } from "react-redux";
import { addItemToWishlist } from "../../../../Redux/Slice/WishlistSlice.js.js";
import { addToCart } from "../../../../Redux/Slice/CartSlice.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Creatcontext/DataBackend.js";
import { ToastContainer, toast } from "react-toastify";

const Shop = () => {
  const { products } = useAuth();

  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const uniqueTitles = [...new Set(products.map((item) => item?.title))];
  const dispatch = useDispatch();

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  const HandalWishlist = (item) => {
    toast.success("Add Product in WishList", {
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
    dispatch(addToCart(item));
    toast.success("Add Product in WishList", {
      position: "top-left",
    });
  };

  const filteredCards = products.filter((item) => {
    if (item && selectedCategories.length === 0) {
      return true;
    }
    return item && selectedCategories.includes(item?.title);
  });

  return (
    <section>
      <div className="container container-lg container-md container-sm">
        <div className="row">
          <div className="col-12 col-md-3 col-lg-2 p-0">
            <h4 className="fw-bold mb-5 mt-5 text-uppercase">CATEGORIES</h4>
            {uniqueTitles.map((title, ind) => (
              <div key={ind} className="chackbox_div pb-3">
                <div key={ind} className="text-capitalize">
                  <input
                    type="checkbox"
                    id={`checkbox-${ind}`}
                    checked={selectedCategories.includes(title)}
                    onChange={() => toggleCategoryFilter(title)}
                  />
                  <label
                    htmlFor={`checkbox-${ind}`}
                    className="d-inline-grid ps-2 gap-5"
                  >
                    {title}
                  </label>
                </div>
              </div>
            ))}

            <div>
              <h4 className="fw-bold mb-4 mt-5  text-uppercase">PRICE</h4>
              <p>
                Price:Min: ₹{priceRange[0]} - Max: ₹{priceRange[1]}
              </p>
              <Slider
                className="slider_div"
                min={0}
                max={25000}
                range
                value={priceRange}
                onChange={handleSliderChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-9 col-lg-10 p-2 text-capitalize">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {filteredCards.map((item, index) => (
                  <div className="col" key={index}>
                    <div className="card shadow rounded-4">
                      <div className="img_div">
                        <div className="image-container">
                          <Link to={`/products/${item && item._id}`}>
                            <img
                              src={`https://server-ecommerce-two.vercel.app/${item.coverImageURL}`}
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
                              onClick={(e) => HandalWishlist(item && item)}
                              className="fs-3"
                            />
                          </div>
                          <div className="zoom_icon">
                            <ZoomInIcon
                              className="fs-3"
                              onClick={(e) => openProductModal(item && item)}
                            />
                          </div>
                          <div className="cart_icon">
                            <ShoppingCartIcon
                              className="fs-3"
                              onClick={(e) => HandalCart(item && item)}
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
                        <h5 className="card-title">{item && item.title}</h5>
                        <p className=" m-0 mb-1 text-danger fw-bold">
                          <span className="m-0 mb-1 text-danger fw-bold">
                            {item.stock > 0 ? (
                              ""
                            ) : (
                              <span className="out-of-stock">Out of Stock</span>
                            )}
                          </span>
                        </p>
                        <p className="card-text m-0 mb-1">{item && item.dis}</p>
                        <h4>{item && item.price}₹</h4>
                      </div>
                    </div>
                  </div>
                ))}
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

  function toggleCategoryFilter(category) {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((item) => item !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  }
};

export default Shop;
