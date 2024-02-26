import React, { useState } from "react";
import "./Contactus.css";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../../Creatcontext/DataBackend";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { user } = useAuth();

  const [userData, setuserData] = useState(true);

  if (userData && user) {
    setFormData((prevData) => ({
      ...prevData,
      email: user.email || "",
    }));
    setuserData(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://server-ecommerce-two.vercel.app/user/contact_us`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }

      toast.success("Submit SuccessFully");
    } catch (error) {
      console.log("message", error);
    }
  };

  return (
    <section>
      <div className="bg_img" data-aos="zoom-in"></div>
      <div className="container contect_div">
        <div className="d-flex flex-column justify-content-center bg_blur border rounded-5 p-lg-5 p-md-4 p-3">
          <h2 className="text-center text-uppercase" data-aos="fade-up">
            Contact Us
          </h2>
          <h4 className="py-3 text-center text-uppercase" data-aos="fade-down">
            If you have any questions, please fill out the form
          </h4>

          <form className="form_div gap-3" onSubmit={handleSubmit}>
            <div className="row  ">
              <div className="col-md-6 w-100">
                <label className="fs-5 fw-bold pb-1 " data-aos="flip-left">
                  Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  required
                  data-aos="flip-right"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6  ">
                <label className="fs-5 fw-bold pb-1 " data-aos="flip-up">
                  Email
                </label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={handleInputChange}
                  required
                  data-aos="zoom-in"
                />
              </div>
              <div className="col-md-6 mt-3 mt-md-0">
                <label className="fs-5 fw-bold pb-1 " data-aos="zoom-in-up">
                  Phone Number
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  data-aos="zoom-in-down"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="fs-5 fw-bold pb-1 " data-aos="zoom-in-left">
                  Your Message
                </label>
                <textarea
                  name="message"
                  className="form-control massaged-text"
                  placeholder="Message"
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  data-aos="zoom-in-right"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12 col-lg-12 col-12 text-center">
                <button type="submit" className="mass_btn " data-aos="zoom-out">
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Contactus;
