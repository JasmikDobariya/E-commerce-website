import React from "react";
import ImageSlider from "../Slider/Slider";
import Arrivals from "../Arrivals/Arrivals";
import Sealing from "../Seleng/Sealing";
import Blog from "../Blog/Blog";
import Cart from "../Navbar/Cart/Cart";

const Homepage = () => {
  return (
    <>
      <ImageSlider />
      <Arrivals />
      <Sealing />
      <Blog />
    </>
  );
};

export default Homepage;
