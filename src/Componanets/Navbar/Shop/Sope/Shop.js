import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Shop.css";
import cardimg from "../../../Arrivals/ArrivalsArray";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductModal from "../../../Arrivals/ProductModal";
import { useDispatch } from "react-redux";
import { addItemToWishlist } from "../../../../Redux/Slice/WishlistSlice.js";
import { addToCart } from "../../../../Redux/Slice/CartSlice";
import Products from "../../../Arrivals/Products.js";
import { Link } from "react-router-dom";

const Shop = () => {
  const brand = [["Poliform", "Roche Bobois", "Edra", "Kartell"]];
  const availab = [["On Stock", "Out of Stock"]];

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [addedincart, setaddedincart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const uniqueTitles = [...new Set(cardimg.map((item) => item.title))];
  const dispatch = useDispatch();

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

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

  const filteredCards = cardimg.filter((item) => {
    if (selectedCategories.length === 0) {
      return true;
    }
    return selectedCategories.includes(item.title);
  });

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-2 p-0">
            <h4 className="fw-bold mb-5 mt-5 text-uppercase">CATEGORIES</h4>
            {uniqueTitles.map((title, ind) => (
              <div key={ind} className="chackbox_div pb-3">
                <div key={ind}>
                  <input
                    type="checkbox"
                    className=""
                    id={`checkbox-${ind}`}
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
              <h4 className="fw-bold mb-4 mt-5 text-uppercase">PRICE</h4>
              <p>
                Price:Min: $ {priceRange[0]} - Max: ${priceRange[1]}
              </p>
              <Slider
                className="slider_div"
                min={0}
                max={1500}
                range
                value={priceRange}
                onChange={handleSliderChange}
              />
            </div>
            <div>
              <h4 className="fw-bold mb-4 mt-5 text-uppercase">BRANDS</h4>
              {brand.map((ele, indx) => (
                <div key={indx} className="chackbox_div">
                  {ele.map((item, index) => (
                    <div key={index}>
                      <input type="checkbox" className="" />
                      <label
                        htmlFor={`checkbox-${index}`}
                        className="d-inline-grid ps-2 gap-5"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div>
              <h4 className="fw-bold mb-5 mt-5 text-uppercase">AVAILABILITY</h4>
              {availab.map((e, i) => (
                <div key={i} className="chackbox_div">
                  {e.map((item, index) => (
                    <div key={index}>
                      <input type="checkbox" className="" />
                      <label
                        htmlFor={`checkbox-${index}`}
                        className="d-inline-grid ps-2 gap-5"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="col-10 p-5">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5">
                {filteredCards.map((item, index) => (
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
                              onClick={() => HandalWishlist(item)}
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
                        className={`notification ${
                          showNotification ? "show" : ""
                        }`}
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
          </div>
        </div>
      </div>
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeProductModal} />
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
