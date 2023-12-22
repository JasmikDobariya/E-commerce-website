import React, { useState, useEffect } from "react";
import "./Buy_Now.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useLocation } from "react-router-dom";
import { useFirebase } from "../../Creatcontext/Firebase";

const calculateWishlistSubtotal = (wishlist) => {
  return wishlist.reduce((total, item) => {
    return total + parseFloat(item.prize) || 0;
  }, 0);
};

const Buy_Now = () => {
  const firebase = useFirebase();

  const location = useLocation();

  const cartItems = location.state?.cartItems || [];
  const wishlist = location.state?.wishlist || [];
  const subtotal = location.state?.subtotal || 0;
  const productsmodal = location.state?.productsmodal || [];
  const productsId = location.state?.productsId || [];
  const quantities = location.state?.quantities || {};
  const wishlistSubtotal = calculateWishlistSubtotal(wishlist);
  const productPrize = parseFloat(productsmodal.prize) || 0;
  const productIdPrize = parseFloat(productsId.prize) || 0;
  const total = subtotal + wishlistSubtotal + productPrize + productIdPrize;

  const payment = ["Credit Card", "PayPal", "Cash", "Other"];
  
  const productsIdArray = Array.isArray(productsId) ? productsId : [productsId];
  
  const productsmodalArray = Array.isArray(productsmodal) ? productsmodal : [productsmodal];
  



  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const [selectedPayment, setSelectedPayment] = useState(null);

  const updatedQuantities = { ...quantities };
  cartItems.forEach((item) => {
    const itemId = item.id; 
    if (itemId && !(itemId in updatedQuantities)) {
      updatedQuantities[itemId] = 1;
    }
  });



  console.log("Updated Quantities:", updatedQuantities);

  const handlePaymentClick = (index) => {
    setSelectedPayment(index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "lastName",
      "address",
      "city",
      "state",
      "zip",
    ];

    const isAnyFieldEmpty = requiredFields.some(
      (field) => !formData[field] || formData[field].trim() === ""
    );

    if (isAnyFieldEmpty) {
      alert("Please fill in all required fields.");
      return;
    }

    await firebase.handlelisting(
      formData.firstName,
      formData.lastName,
      formData.address,
      formData.address2,
      formData.city,
      formData.state,
      formData.zip,
      total,
      updatedQuantities,
      wishlist,
      productsmodalArray,
      productsIdArray,
      cartItems
    );

    alert("Form submitted successfully!");

    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    });
  };

  console.log("subtotal:", subtotal);

  return (
    <section>
      <div className="container">
        <div className="py-4">
          <h6 className="haed_tag">
            Returning customer?
            <Link to="/login" className="goto_login">
              Click here to Login
            </Link>
          </h6>
        </div>
        <div className="my-3 text-center">
          <h2>Billing Info</h2>
          <p>
            Choose a payment option below and fill out the appropriate
            information
          </p>
        </div>
        <div className="d-flex justify-content-around my-5">
          {payment.map((item, index) => (
            <div key={index}>
              <button
                className={`payment_button ${
                  selectedPayment === index ? "active" : ""
                }`}
                onClick={() => handlePaymentClick(index)}
              >
                <FavoriteBorderIcon
                  style={{
                    fontSize: "40",
                    color: selectedPayment === index ? "#fff" : "#bd744c",
                  }}
                />
                <h3>{item}</h3>
              </button>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-8">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </div>
              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="12,Main St"
                />
              </div>
              <div className="col-12">
                <label htmlFor="address2" className="form-label">
                  Street/Apartment/Floor
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleInputChange}
                  placeholder="Apartment, studio, or floor"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <input
                  className="form-control p-2"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="zip" className="form-label">
                  PinCode
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="PinCode"
                />  
              </div>
              <button type="submit" className="w-100 p-3 fw-bold pymet_sub_btn">
                Submit
              </button>
            </form>
          </div>
          <div className="col-4">
            <form className="d-flex justify-content-center gap-2 align-items-center w-100 h-100 flex-column">
              <p className="fs-2 text-center fw-semibold">Subtotal: {total}</p>
              <p className="fs-2 text-center fw-semibold">
                Quantities
                {Object.entries(updatedQuantities).map(
                  ([productId, quantity], index) => (
                    <span key={index} className=" d-flex ">
                      Product ID: {productId}, Item: {quantity}
                      {index < Object.entries(updatedQuantities).length - 1
                        ? ", "
                        : ""} 
                    </span>
                  )
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Buy_Now;
