import React from "react";
import "./Errorpage.css";
import { Link } from "react-router-dom";

const Errorpage = () => {
  return (
    <section>
      <div className="container effect_div">
        <h1 className="text-center pt-5">404 Page Not Found</h1>
        <div id="wrapper">
          <Link to="/" className="my-super-cool-btn">
           
              <div className="dots-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <span>Go To Home</span>
          
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Errorpage;
