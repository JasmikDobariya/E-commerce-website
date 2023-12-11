import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";
import Slider from "react-slick";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

const ImageSlider = () => {
  const slides = [
    {
      image:
        "https://static.wixstatic.com/media/710d5d_870985c1843746699c1994b8b36fb286.jpg/v1/fit/w_2500,h_1330,al_c/710d5d_870985c1843746699c1994b8b36fb286.jpg",
      text: ["CHAIR", "get all", "THE GOOD STUFF"],
    },
    {
      image: "https://welldone.co.th/wp-content/uploads/2020/12/011.jpg",
      text: ["CHAIR", "get all", "THE GOOD STUFF"],
    },
    {
      image:
        "https://img.goodfon.com/original/3200x2000/e/3e/stul-kreslo-mebel-tron.jpg",
      text: ["CHAIR", "get all", "THE GOOD STUFF"],
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="image-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slider-image">
            <img
              src={slide.image}
              alt={`Slider ${index}`}
              height={550}
              width={1450}
            />
            <span className="Slider_div">
              <p className=" fw-bold m-1">{slide.text[0]}</p>
              <h2 className="fw-light">{slide.text[1]}</h2>
              <h1> {slide.text[2]}</h1>
              <Link to="/shops" className="btn yellow">
                <div>
                  <span className="bt">Learn More</span>
                  <ArrowForwardIcon className="ion-icon" />
                </div>
              </Link>
            </span>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
