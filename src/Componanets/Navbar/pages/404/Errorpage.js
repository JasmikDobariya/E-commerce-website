import React from "react";
import "./Errorpage.css";
import { Link } from "react-router-dom";

const Errorpage = () => {
  return (
    <section>
      <div className="container effect_div">
        <h1 className="text-center pt-5">404 Page Not Found</h1>
        <div id="wrapper">
          <Link to="/">
            <a href="#" className="my-super-cool-btn">
              <div class="dots-container">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </div>
              <span>Go To Home</span>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Errorpage;
