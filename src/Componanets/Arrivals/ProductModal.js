import React, { useEffect, useState } from "react";
import "./ProductModalstyle.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Slice/CartSlice";
import { useFirebase } from "../../Creatcontext/Firebase";

const ProductModal = ({ products, onClose }) => {
  const [Counter, setCounter] = useState(1);
  const firebase = useFirebase();
  const [url, setURL] = useState(null);

  const navigate = useNavigate();

  const fetchProductURL = async () => {
    try {
      const imageUrl = await firebase.downloadurl(products.imageUrl);
      setURL(imageUrl);
    } catch (error) {
      console.error("Error fetching product image URL:", error);
    }
  };

  useEffect(() => {
    fetchProductURL();
  }, [firebase, products.imageUrl]);

  const inc = () => {
    setCounter(Counter + 1);
  };

  const dic = () => {
    if (Counter > 1) setCounter(Counter - 1);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains("modal_main")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const dispatch = useDispatch();

  const addCartItem = async () => {
    try {
      await fetchProductURL();
      console.log("Image URL in addCartItem:", url);
      const item = {
        id: products.id,
        title: products.title,
        dis: products.dis,
        imageUrl: url,
        rating: products.rating,
        prize: products.prize,
        quantity: Counter,
      };
      console.log("Item to be added to cart:", item);
      dispatch(addToCart(item));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="modal_main">
      <div className="modal_content">
        <div className="modal_left">
          <img src={url} alt={products.title} />
        </div>
        <div className="modal_right">
          <h2>{products.title}</h2>
          <p>{products.dis}</p>
          <div className="product_info">
            <div className="product_rating">reviews : {products.rating} </div>
            <div className="product_about">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor
              eveniet labore quod ratione esse debitis quo sapiente ad? Nesciunt
              totam facilis alias molestias modi quas vitae earum consectetur.
              Quia, temporibus!
            </div>
          </div>
          <div className="prduct_value">
            <div className="product_price">
              PRICE <br />
              {products.prize}
            </div>
            <div className="product_quantity">
              QUANTITY <br />
              <RemoveIcon className="product_dic" onClick={dic} />
              {Counter}
              <AddIcon className="product_inc" onClick={inc} />
            </div>
          </div>
          <div className="product_buttons">
            <button className="product_cart" onClick={addCartItem}>
              Add to Cart
            </button>
            <Link
              to="/buy_now"
              onClick={(e) => {
                e.preventDefault();
                navigate("/buy_now", {
                  state: {
                    productsmodal: products,
                  },
                });
              }}
            >
              <button>Buy Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
