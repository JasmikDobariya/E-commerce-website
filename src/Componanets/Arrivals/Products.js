import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link, useParams } from "react-router-dom";
import "./Products.css";



import FeedbackForm from "./FeedbackForm";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Slice/CartSlice";
import { useFirebase } from "../../Creatcontext/Firebase";

const Products = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [Counter, setCounter] = useState(1);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedCardItem, setSelectedCardItem] = useState(null);
  const [feedbackEntries, setFeedbackEntries] = useState([]);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await firebase.productlist();
        const productsList = productsData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);

        const imageUrls = await Promise.all(
          productsList.map(async (product) => {
            const imageUrl = product.imageUrl;
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
  }, [firebase, id]);

  const product = products.find((product) => product.id === id);
  const image = urls[products.findIndex((p) => p.id === id)];

  if (!product) {
    return <div>Loading...</div>;
  }

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

  const addCartItem = () => {
    const item = {
      id: product.id,
      title: product.title,
      dis: product.dis,
      image: image,
      rating: product.rating,
      prize: product.prize,
      quantity: Counter,
    };
    dispatch(addToCart(item));
  };

  const handleFormSubmit = (formData) => {
    setFeedbackEntries((prevEntries) => [...prevEntries, formData]);
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="modal-left">
              <img src={image} alt="/" />
            </div>
          </div>
          <div className="col-6">
            <div className="modal-right">
              <h2>{product.title}</h2>
              <p>{product.dis}</p>
              <div className="product-info">
                <div className="product-rating">reviews : {product.rating}</div>
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
                  {product.prize}
                </div>
                <div className="product-quantity">
                  QUANTITY <br />
                  <RemoveIcon className="product-dic" onClick={dic} />
                  {Counter}
                  <AddIcon className="product-inc" onClick={inc} />
                </div>
              </div>
              <div className="product-buttons">
                <button className="product-cart" onClick={addCartItem}>
                  Add to Cart
                </button>
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
              onClick={() => toggleFeedbackForm(product)}
            >
              <AddIcon /> Leave Feedback
            </button>
          </div>
          {showFeedbackForm && selectedCardItem && (
            <FeedbackForm
              onClose={() => {
                setShowFeedbackForm(false);
                setSelectedCardItem(null);
              }}
              cardItem={selectedCardItem}
              onFormSubmit={handleFormSubmit}
            />
          )}
        </div>
        {feedbackEntries.map((feedback, index) => (
          <div key={index} className="d-flex gap-4 py-3  ">
            
            {image && (
              <img
                src={feedback.img}
                alt="Submitted"
                className="submitted-image"
                height={150}
                width={150}
              />
            )}
            <div className="flex-column text-capitalize ">
              <h3 className="py-2 p-0">
                {feedback.firstName} {feedback.lastName}
              </h3>
              <Rating
                name="rating"
                value={feedback.rating}
                precision={0.5}
                readOnly
              />
              <h6 className="py-2">{feedback.message}</h6>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
