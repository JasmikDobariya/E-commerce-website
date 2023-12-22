import React, { useState } from "react";
import "./Contactus.css";

const Contactus = () => {
  const formfeild = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formData, setFormData] = useState(formfeild);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    setFormData(formfeild);
  };

  return (
    <section>
      <div className="container contect_div">
        <div className="d-flex flex-column justify-content-center">
          <h2>Contact Us</h2>
          <p className="mb-3">
            If you have any questions, please fill out the form
          </p>

          <form className="form_div gap-3" onSubmit={handleSubmit}>
            <div className="d-grid">
              <label className="fs-6 fw-semibold pb-1">Name</label>
              <input
                className="p-2 input_div"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
            </div>
            <div className="d-flex justify-content-between gap-5">
              <div className="d-grid w-100">
                <label className="fs-6 fw-semibold pb-1">Email</label>
                <input
                  className="p-2 input_div"
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="d-grid w-100">
                <label className="fs-6 fw-semibold pb-1">Phone Number</label>
                <input
                  className="p-2 input_div"
                  type="text"
                  name="phone"
                  placeholder="Phone"

                  value={formData.phone}
                  
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="d-grid">
              <label className="fs-6 fw-semibold pb-1">Your Message</label>
              <textarea
                name="message"
                cols="30"
                rows="10"
                placeholder="Message"
                className="p-3 massaged-text"
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button type="submit" className="mass_btn">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contactus;
