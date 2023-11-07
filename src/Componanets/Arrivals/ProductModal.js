import React, { useEffect, useState } from "react";
import "./ProductModalstyle.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";

const ProductModal = ({ product, onClose }) => {
  const [Counter, setCounter] = useState(1);

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
  return (
    <div className="modal_main">
      <div className="modal_content">
        <div className="modal_left">
          <img src={product.img} alt={product.title} />
        </div>
        <div className="modal_right">
          <h2>{product.title}</h2>
          <p>{product.dis}</p>
          <div className="product_info">
            <div className="product_rating">reviews : {product.rating} </div>
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
              {product.prize}
            </div>
            <div className="product_quantity">
              QUANTITY <br />
              <RemoveIcon className="product_dic" onClick={dic} />
              {Counter}
              <AddIcon className="product_inc" onClick={inc} />
            </div>
          </div>
          <div className="product_buttons">
            <button className="product_cart">Add to Cart</button>
            <Link to = "/Buy_Now">
              <button>Buy Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
