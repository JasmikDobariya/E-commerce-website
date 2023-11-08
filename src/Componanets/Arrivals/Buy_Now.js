import React, { useState } from "react";
import "./Buy_Now.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";

const Buy_Now = () => {
  const payment = ["Credit Card", "PayPal", "Cash", "Other"];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <div className="container">
        <div className="py-4">
          <h6 className="haed_tag">
            Returning customer? <Link to="/login"> <a href="/" className="goto_login" >Click here to Login</a></Link>
          </h6>
        </div>
        <div className="my-5">
          <h2>Billing Info</h2>
          <p>
            Choose a payment option below and fill out the appropriate
            information
          </p>
        </div>
        <div className="d-flex justify-content-around my-5">
          {payment.map((item, index) => (
            <div key={index}>
              <button className="payment_button">
                <FavoriteBorderIcon style={{ fontSize: "40",color:"#bd744c"  } } />
                <h3>{item}</h3>
              </button>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-8">
            <form className="row g-3">
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
                  placeholder="1234 Main St"
                />
              </div>
              <div className="col-12">
                <label htmlFor="address2" className="form-label">
                  Address 2
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
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <input
                  className="form-select"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="zip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
          <div className="col-4">
            <form onSubmit={handleSubmit}>
              <label className="py-2 w-100">
                Card Number:
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="Enter card number"
                />
              </label>
              <label className="py-2 w-100">
                Cardholder's Name:
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="Enter cardholder's name"
                />
              </label>
              <label className="d-grid gap-2">
                Expiry Date:
                <select
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleInputChange}
                  className="p-2 m-0 rounded-2"
                >
                  <option value="" disabled>
                    Select Month
                  </option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                </select>
                <select
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleInputChange}
                  className="p-2 m-0 rounded-2"
                >
                  <option value="" disabled>
                    Select Year
                  </option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </label>
              <label className="d-grid py-2">
                CVV:
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="Enter CVV"
                  maxLength={3}
                />
              </label>
              
            </form>
          </div>
        </div>
        <div className="py-3 ">
                <button type="submit" className="w-100 p-3 fw-bold pymet_sub_btn">
                  Submit
                </button>
              </div>
      </div>
    </section>
  );
};

export default Buy_Now;
