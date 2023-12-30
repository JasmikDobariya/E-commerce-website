import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Products.css";
import FeedbackForm from "./FeedbackForm";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Slice/CartSlice";
import { useFirebase } from "../../Creatcontext/Firebase";
import { DNA } from "react-loader-spinner";

const Products = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedCardItem, setSelectedCardItem] = useState(null);
  const [feedbackEntries, setFeedbackEntries] = useState([]);
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

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
        setImageLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [firebase, id]);

  const product = products.find((product) => product.id === id);
  const image = urls[products.findIndex((p) => p.id === id)];

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
    };
    dispatch(addToCart(item));
  };

  const handleFormSubmit = (formData) => {
    setFeedbackEntries((prevEntries) => [...prevEntries, formData]);
  };

  return (
    <section>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="modal-left">
              {imageLoading && (
                <div
                  style={{
                    position: "absolute",
                    top: "45%",
                    left: "25%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <DNA
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                    
                  />
                </div>
              )}
              {!imageLoading && (
                <img
                  onLoad={() => setImageLoading(false)}
                  src={image}
                  alt="/"
                  className="img-fluid"
                />
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="modal-right">
              <h2>{product?.title}</h2>
              <p>{product?.dis}</p>
              <div className="product-info">
                <div className="product-rating">
                  reviews : {product?.rating}
                </div>
                <div className="product-about">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolor eveniet labore quod ratione esse debitis quo sapiente
                  ad? Nesciunt totam facilis alias molestias modi quas vitae
                  earum consectetur. Quia, temporibus!
                </div>
              </div>

              <div className="product-price">PRICE : {product?.prize}</div>
              <div className="product-buttons">
                <button className="product-cart" onClick={addCartItem}>
                  Add to Cart
                </button>
                <Link
                  to="/buy_now"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/buy_now", {
                      state: {
                        productsId: product,
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
            <div className="flex-column text-capitalize ">
              <h3 className="py-2 p-0">
                Name : {feedback.firstName} {feedback.lastName}
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
