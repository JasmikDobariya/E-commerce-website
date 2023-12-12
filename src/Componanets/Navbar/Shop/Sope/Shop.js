import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Shop.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductModal from "../../../Arrivals/ProductModal";
import { useDispatch } from "react-redux";
import { addItemToWishlist } from "../../../../Redux/Slice/WishlistSlice.js";
import { addToCart } from "../../../../Redux/Slice/CartSlice";
import { Link } from "react-router-dom";
import { useFirebase } from "../../../../Creatcontext/Firebase";

const Shop = () => {
 
  const [products, setProducts] = useState([]);
  const [urls, setUrls] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await firebase.productlist();
      setProducts(productsData.docs);

      const imageUrls = await Promise.all(
        productsData.docs.map(async (product) => {
          const imageUrl = product.data().imageUrl;
          const imageUrlDownloaded = await firebase.downloadurl(imageUrl);
          return imageUrlDownloaded;
        })
      );

      setUrls(imageUrls);
    };

    fetchProducts();
  }, [firebase]);

  const brand = [["Poliform", "Roche Bobois", "Edra", "Kartell"]];
  const availab = [["On Stock", "Out of Stock"]];
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [addedincart, setaddedincart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const uniqueTitles = [...new Set(products.map((item) => item.data().title))];
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
  };

  const openProductModal = (item) => {
    setSelectedProduct(item);
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
  };

  const filteredCards = products.filter((item) => {
    if (selectedCategories.length === 0) {
      return true;
    }
    return selectedCategories.includes(item.data().title);
  });


  const filteredUrls = urls.filter((_, index) => {
    return (
      selectedCategories.length === 0 ||
      selectedCategories.includes(products[index].data().title)
    );
  });

  console.log("filteredUrls" , filteredUrls);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3 p-0">
            <h4 className="fw-bold mb-5 mt-5 text-uppercase">CATEGORIES</h4>
            {uniqueTitles.map((title, ind) => (
              <div key={ind} className="chackbox_div pb-3">
                <div key={ind}>
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
                      <input type="checkbox"  />
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
                      <input type="checkbox"  />
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
          <div className="col-12 col-md-8 col-lg-9 p-2">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5">
                {filteredCards.map((item, index) => (
                  <div className="col" key={index}>
                    <div className="card">
                      <div className="img_div">
                        <div className="image-container">
                        <Link to={`/products/${item.data().id}`}>
                      <img
                        src={filteredUrls[index]}
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
                              onClick={(e) => HandalWishlist(item.data())}
                              className="fs-3"
                            />
                          </div>
                          <div className="zoom_icon">
                            <ZoomInIcon
                              className="fs-3"
                              onClick={(e) => openProductModal(item.data())}
                            />
                          </div>
                          <div className="cart_icon">
                            <ShoppingCartIcon
                              className="fs-3"
                              onClick={(e) => HandalCart(item.data())}
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
                        <h5 className="card-title">{item.data().title}</h5>
                        <p className="card-text m-0 mb-1">{item.data().dis}</p>
                        <h4>{item.data().prize}</h4>
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

export default Shop
