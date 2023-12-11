import React from "react";
import "./Footer.css";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  const img = [
    "https://w.forfun.com/fetch/79/79cc902872def39a7059a21c09379cb0.jpeg?w=1470&r=0.5625",
    "https://www.nortonabrasives.com/sites/sga.na.com/files/iStock_000087208411_Full.jpg",
    "https://assets.isu.pub/document-structure/210728115003-d9ff5ba4830e96bb8bcd135aee92ac1e/v1/3c467e4349c0256be94c9d274202d807.jpeg",
    "https://avatars.mds.yandex.net/i?id=26e73eacc0025554d42e3c4c1d6c2215b93f6148-10918661-images-thumbs&n=13",
    "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2017/10/main/ikea-boja-rattan-table-lamp-sun-1117.png",
    "https://i.pinimg.com/originals/4a/3a/5a/4a3a5a226669ea8447b8c2fdfbd373db.jpg",
  ];

  const footer = [
    {
      titel: ["COMPANY", "MY ACCOUNT", "CUSTOMER SERVICE"],
      tool: [
        "What We Do",
        "Available Services",
        " Latest Posts",
        "FAQs",
        "Sign In",
        " View Cart",
        "Order Tracking",
        " Help & Support",
        " Help & Contact Us",
        "Returns & Refunds",
        "Online Stores",
        "Terms & Conditions",
      ],
    },
  ];

  return (
    <>
      <div>
        <h3 className="titel text-center pb-3">Follow us on Instagram</h3>
      </div>
      <div className="no-gutters row pb-5">
        {img.map((img, i) => {
          return (
            <div className="col-6 col-sm-4 col-md-2 p-0 m-0" key={i}>
              <img className="w-100" src={img} alt="/" height={250} />
            </div>
          );
        })}
      </div>
      <footer className="footer_div">
        <div className="container  ">
          <div className="justify-content-between row">
            <div className="col-md-5 col-xl-5 mt-5">
              <h5 className="text-white">Many desktop publishing</h5>
              <p className="text_muted my-3">
                Do you want to receive exclusive email offers? Subscribe to our
                newsletter! You will receive a unique promo code which gives you
                a 20% discount on all our products in 10 minutes.
              </p>
            </div>

            <div className="d-flex align-items-center col-md-7 col-xl-5  gap-3">
              <input
                style={{ height: "51px" }}
                type="email"
                placeholder="Enter Your E-mail"
                className="mr-3 border-0 form-control"
              />
              <button className="fw-bold btn_sub ">Subscribe</button>
            </div>
          </div>
          <hr className="footer_hr" />
          <div className="my-4 justify-content-between row">
            <div className="d-flex flex-column justify-content-between col-md-3 col-xl-5 ">
              <div className="footer_titel">
                <h1 className="text-white">Jasmin</h1>
                <p className="text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  dolorum ut nemo odit soluta saepe libero
                </p>
              </div>
              <div className="mt-5 d-flex gap-3 social_icon ">
                <a href="/">
                  <GoogleIcon className="fs-3 social_div text-white" />
                </a>
                <a href="/">
                  <TwitterIcon className="fs-3 social_div text-white" />
                </a>
                <a href="/">
                  <LinkedInIcon className="fs-3 social_div text-white" />
                </a>
                <a href="/">
                  <FacebookIcon className="fs-3 social_div text-white" />
                </a>
              </div>
            </div>
            <div className="col-sm-12 col-md-9 col-xl-7">
              <div className="row mt-3">
                {footer.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="col-12 col-sm-12 col-md-4">
                    <div className="flex-section">
                      {section.titel.map((title, titleIndex) => (
                        <div key={titleIndex} className="flex-item ">
                          <h5 className="fw-bold fs-4 text-uppercase mb-3 text-white">
                            {title}
                          </h5>
                          {section.tool
                            .slice(titleIndex * 4, titleIndex * 4 + 4)
                            .map((tool, toolIndex) => (
                              <h6 key={toolIndex} className="mb-3 footer_tool ">
                                {tool}
                              </h6>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr className="footer_hr" />
          <div className="row" style={{ padding: 30 }}>
            <div className="col-sm-12">
              <p className="text_muted mb-0">
                © 2020-2023 powered by
                <span className="Footer_navi"> Jasmin</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
