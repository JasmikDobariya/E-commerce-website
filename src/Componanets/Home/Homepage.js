import React from "react";
import ImageSlider from "../Slider/Slider";
import Arrivals from "../Arrivals/Arrivals";
import Blog from "../Blog/Blog";
import Sealing from "../Selling/Sealing";


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
