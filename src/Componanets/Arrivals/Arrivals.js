import React, { useEffect, useState } from "react";
import "./Arrivals.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductModal from "./ProductModal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToWishlist } from "../../Redux/Slice/WishlistSlice.js";
import { addToCart } from "../../Redux/Slice/CartSlice.js";
import { useFirebase } from "../../Creatcontext/Firebase.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Arrivals = () => {
  const firebase = useFirebase();
  const [products, setProducts] = useState([]);
  const [urls, setUrls] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [addedincart, setaddedincart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAllProducts] = useState(false);

  const Stock = [
    {
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [firebase]);

  const showNotificationMessage = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const addedincartmassge = () => {
    setaddedincart(true);
    setTimeout(() => {
      setaddedincart(false);
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

  const HandalCart = (item) => {
    dispatch(addToCart(item));
    addedincartmassge();
  };

  const loader = (index) => {
    return urls[index] ? null : (
      <div >
        <Skeleton width={250} height={250}  />
      </div>
    );
  };

  const handleImageLoad = (index) => {
    setUrls((prevUrls) => [...prevUrls, index]);
  };

  const displayedProducts = showAllProducts ? products : products.slice(0, 8);

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
          {displayedProducts.map((item, index) => (
            <div className="col" key={index}>
              <div className="card">
                <div className="img_div">
                  <div className="image-container">
                    <Link to={`/products/${item.data().id}`}>
                      <SkeletonTheme baseColor="#fff" highlightColor="#bb9e8e">
                      {loader(index)}
                        <img
                          onLoad={() => handleImageLoad(index)}
                          src={urls[index] }
                          className={`card-img-top`}
                          alt="/"
                          height={250}
                          width={200}
                        />
                      </SkeletonTheme>
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
                  className={`notification ${showNotification ? "show" : ""}`}
                >
                  Added to wishlist!
                </div>
                <div className={`addtocart ${addedincart ? "show" : ""}`}>
                  Added to Cart!
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    {item.data().title || <Skeleton />}
                  </h5>
                  <p className="card-text m-0 mb-1">
                    {item.data().dis || <Skeleton count={5} />}
                  </p>

                  <h4>{item.data().prize}</h4>
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
        <ProductModal products={selectedProduct} onClose={closeProductModal} />
      )}
    </section>
  );
};

export default Arrivals;
