import React from "react";
import "./Sealing.css";
import imgshiping from "../assests/download.svg";
import imghelp from "../assests/help.svg";
import imgrefund from "../assests/refund.svg";

const Sealing = () => {
  return (
    <section className="text-capitalize mb-5">
      <div className="container">
        <div className="d-grid justify-content-center align-items-center">
          <div className="text-center">
            <h1 className="titel">Top Selling Products</h1>
            <p className="text-muted pb-4">
              These furniture sets will become an essential part of an ecosystem
              of elements in your home. Your domestic space will easily embrace
              these tables, chairs, and bookshelves.
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row ">
            <div className="col-12 col-md-6 ">
              <div className="spring_div">
                <div className="text_div p-5 fw-bold">
                  <h6 className="">ALL NEW</h6>
                  <h2>SPRING THINGS</h2>
                  <div className="line_div"></div>
                  <h6 className="my-3">Save up to 30%</h6>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-5">
              <div className="row">
                <div className="col-12 col-md-6">
                  <a href="/node_modules">
                    <div className="online_div">
                      <div className="text-end">
                        <h6 className="fw-bold">Online Exclusive</h6>
                        <p>
                          <u>shop now</u>
                        </p>
                      </div>
                    </div>
                  </a>
                  <div className="lamp_div">
                    <div className="sale_div">
                      <h6 className="fw-bold text-uppercase mb-0 text-white">
                        70% SALE
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="lamp_div">
                    <div className="sale_div">
                      <h6 className="fw-bold text-uppercase mb-0 text-white">
                        70% SALE
                      </h6>
                    </div>
                  </div>
                  <div className="sofa_div">
                    <div className="">
                      <h6 className="fw-bold">Online Exclusive</h6>
                      <p>
                        <u>shop now</u>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="m-0" />
      <div className="InfoBlock">
        <div className="h-100 container">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center justify-content-center info__item1">
                <img src={imgshiping} alt="/" className="m-3" />
                <div>
                  <h5 className="fw-bold text-uppercase">free shipping</h5>
                  <p className="text-muted mb-0">On all orders of $150</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center info__item2">
                <img src={imghelp} alt="/" className="m-3" />
                <div>
                  <h5 className="fw-bold text-uppercase">24/7 Support</h5>
                  <p className="text-muted mb-0">Always ready to assist</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center justify-content-center info__item3">
                <img src={imgrefund} alt="/" className="m-3" />
                <div>
                  <h5 className="fw-bold text-uppercase">easy returns</h5>
                  <p className="text-muted mb-0">Hassle-free process</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="m-0"/>
    </section>
  );
};

export default Sealing;
