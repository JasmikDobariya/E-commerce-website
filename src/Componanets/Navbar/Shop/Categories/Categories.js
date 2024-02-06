import "./Categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <section>
      <div className="imag_div_main position-relative  ">
        <img
          className="main_img z-3"
          src="https://en.idei.club/uploads/posts/2023-03/1677751570_en-idei-club-p-room-design-in-a-wooden-house-dizain-2.jpg"
          alt="/"
        />

        <Link to="/shops">
          <h1 className="fw-bold text-white position-absolute top-50 start-50 translate-middle">
            NEW ARRIVALS
          </h1>
        </Link>
      </div>
      <div className="container ">
        <div className="d-grid gap-4 py-5 justify-content-between d-md-grid d-lg-grid d-xl-flex ">
          
            <img
              className="middle_img_1"
              src="https://i.pinimg.com/originals/67/52/70/67527097d3e7a4ba0f9b1bfbb1129901.jpg"
              alt="/"
            />
         
          <div className="middle_img_1">
            <img
              className="middle_img_1"
              src="https://i.pinimg.com/originals/a2/3a/da/a23adaba0aaaaee6bf58b11d6a92fc4c.jpg"
              alt="/"
            />
          </div>
        </div>
        <div className="row pb-5 gap-5 gap-md-0">
          <div className="col-md-3  ">
            <img
              className="middle_img_1"
              src="https://wsemoboi.ru/image/catalog/oboi/fresq/geo-collection/92005_rossiyskie-oboi-fresq-kollektsiya-geo-collection-artikul-geo-62-m251.jpg"
              alt="/"
            />
          </div>
          <div className="col-md-6">
            <img
              className="middle_img_1"
              src="https://wsemoboi.ru/image/catalog/oboi/fresq/geo-collection/91933_rossiyskie-oboi-fresq-kollektsiya-geo-collection-artikul-geo-48-m74.jpg"
              alt="/"
            />
          </div>
          <div className="col-md-3">
            <img
              className="middle_img_1"
              src="https://fresq.ru/upload/iblock/ebe/ebe21baa315b5aa4e0fc436fd0373193.jpg"
              alt="/"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
