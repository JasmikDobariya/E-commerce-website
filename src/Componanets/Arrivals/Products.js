import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import cardimg from "./ArrivalsArray";
import { Link, useParams } from "react-router-dom";
import "./Products.css";
import ReactImageMagnify from "react-image-magnify";
import FeedbackForm from "./FeedbackForm";

const Products = () => {
  const { id } = useParams();
  const [Counter, setCounter] = useState(1);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedCardItem, setSelectedCardItem] = useState(null);

  const inc = () => {
    setCounter(Counter + 1);
  };

  const dic = () => {
    if (Counter > 1) setCounter(Counter - 1);
  };

  const toggleFeedbackForm = (cardItem) => {
    setSelectedCardItem(cardItem);
    setShowFeedbackForm(true);
  };
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="modal-left">
              <ReactImageMagnify
                style={{ height: 100 }}
                {...{
                  smallImage: {
                    alt: cardimg[id].title,
                    height: 500,
                    width: 600,
                    src: cardimg[id].img,
                  },
                  largeImage: {
                    src: cardimg[id].img,
                    width: 1200,
                    height: 1800,
                  },
                }}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="modal-right">
              <h2>{cardimg[id].title}</h2>
              <p>{cardimg[id].dis}</p>
              <div className="product-info">
                <div className="product-rating">
                  reviews : {cardimg[id].rating}{" "}
                </div>
                <div className="product-about">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolor eveniet labore quod ratione esse debitis quo sapiente
                  ad? Nesciunt totam facilis alias molestias modi quas vitae
                  earum consectetur. Quia, temporibus!
                </div>
              </div>
              <div className="prduct-value">
                <div className="product-price">
                  PRICE <br />
                  {cardimg[id].prize}
                </div>
                <div className="product-quantity">
                  QUANTITY <br />
                  <RemoveIcon className="product-dic" onClick={dic} />
                  {Counter}
                  <AddIcon className="product-inc" onClick={inc} />
                </div>
              </div>
              <div className="product-buttons">
                <button className="product-cart">Add to Cart</button>
                <Link to="/Buy_Now">
                  <button>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div className="d-flex justify-content-between py-4">
            <h3>Reviews</h3>
            <button
              className="feedback_btn"
              onClick={() => toggleFeedbackForm(cardimg[id])}
            >
              + Leave Feedback
            </button>
          </div>
          {showFeedbackForm && selectedCardItem && (
            <FeedbackForm
              onClose={() => {
                setShowFeedbackForm(false);
                setSelectedCardItem(null);
              }}
              cardItem={selectedCardItem}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
