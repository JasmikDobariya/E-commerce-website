import React from "react";
import "./Buy_Now.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const Buy_Now = () => {
  const payment = ["Credit Card", "PayPal", "Cash", "Other"];
  return (
    <section>
      <div className="container">
        <div className="py-4">
          <h6 className="haed_tag">Returning customer? Click here to Login</h6>
        </div>
        <div className="my-5">
          <h2>Billing Info</h2>
          <p>
            Choose a payment option below and fill out the aproriate infomation
          </p>
        </div>
        <div className="d-flex justify-content-around my-5">
          {payment.map((item, index) => {
            return (
              <div key={index}>
                <button className="payment_button">
                  <FavoriteBorderIcon style={{ fontSize: "40" }} />
                  <h3>{item}</h3>
                </button>
              </div>
            );
          })}
        </div>
        <div className="row">
          <div className="col-8">
            <form className="row g-3">
              <div className="col-md-6">
                <label for="inputEmail4" className="form-label">
                  First Name
                </label>
                <input type="email" className="form-control" id="inputEmail4" />
              </div>
              <div className="col-md-6">
                <label for="inputPassword4" className="form-label">
                  LastName
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                />
              </div>
              <div className="col-12">
                <label for="inputAddress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                />
              </div>
              <div className="col-12">
                <label for="inputAddress2" className="form-label">
                  Address 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                />
              </div>
              <div className="col-md-6">
                <label for="inputCity" className="form-label">
                  City
                </label>
                <input type="text" className="form-control" id="inputCity" />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <input className="form-select"></input>
              </div>
              <div className="col-md-2">
                <label for="inputZip" className="form-label">
                  Zip
                </label>
                <input type="text" className="form-control" id="inputZip" />
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" for="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Buy_Now;
