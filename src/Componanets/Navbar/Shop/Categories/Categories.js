import "./Categories.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFirebase } from "../../../../Creatcontext/Firebase";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [urls, setUrls] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await firebase.productlist();
      setProducts(productsData.docs);

      const imageUrls = await Promise.all(
        productsData.docs.map(async (product) => {
          const imageUrl = product.data().imageUrl;
          const imageUrlDownloaded = await firebase.downloadurl(imageUrl);
          return imageUrlDownloaded;
        })
      );

      setUrls(imageUrls);
    };

    fetchProducts();
  }, [firebase]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
  };
  return (
    <section>
      <div className="container">
        <div className="imag_div_main position-relative ">
          <img
            className=""
            src="https://i.pinimg.com/originals/5e/80/be/5e80becdabc8d2c6172ed1fa44857458.jpg"
            alt="/"
            height={500}
            width={1400}
          />
          <Link to="/shops" className="text-black">
            <h1 className="position-absolute top-50 start-50 translate-middle fw-bold text-white">
              NEW ARRIVALS
            </h1>
          </Link>
        </div>
        <div className="d-flex gap-4 py-5 justify-content-between">
          <div className="">
            <img
              width={600}
              height={500}
              src="https://i.pinimg.com/originals/67/52/70/67527097d3e7a4ba0f9b1bfbb1129901.jpg"
              alt="/"
            />
          </div>
          <div className="">
            <img
              width={600}
              height={500}
              src="https://i.pinimg.com/originals/a2/3a/da/a23adaba0aaaaee6bf58b11d6a92fc4c.jpg"
              alt="/"
            />
          </div>
        </div>
        <div className="row pb-5">
          <div className="col-3">
            <img
              height={394}
              width={306}
              src="https://wsemoboi.ru/image/catalog/oboi/fresq/geo-collection/92005_rossiyskie-oboi-fresq-kollektsiya-geo-collection-artikul-geo-62-m251.jpg"
              alt="/"
            />
          </div>
          <div className="col-6">
            <img
              height={394}
              width={640}
              src="https://wsemoboi.ru/image/catalog/oboi/fresq/geo-collection/91933_rossiyskie-oboi-fresq-kollektsiya-geo-collection-artikul-geo-48-m74.jpg"
              alt="/"
            />
          </div>
          <div className="col-3">
            <img
              height={394}
              width={306}
              src="https://fresq.ru/upload/iblock/ebe/ebe21baa315b5aa4e0fc436fd0373193.jpg"
              alt="/"
            />
          </div>
        </div>

        <h3 className="header">You may also like:</h3>
        <div className="con_div">
          <Slider {...settings}>
            {products.map((item , index) => (
              <div key={item.id}>
                <img src={urls[index]} alt={item.alt} className="img" />
                <h6 className="description fw-bold">{item.data().title}</h6>
                <h6 className="description ">{item.data().dis}</h6>
                <h6 className="description fw-bold">{item.data().prize}</h6>
              </div>
            ))}
            {console.log("product" , products)}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Categories;
