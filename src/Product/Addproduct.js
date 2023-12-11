import React, { useState } from "react";
import { useFirebase } from ".././Creatcontext/Firebase";

const Addproduct = () => {
  const firebase = useFirebase();

  const [cover, setcover] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    dis: "",
    prize: "",
    rating: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.addproduct(
      formData.id,
      formData.title,
      formData.dis,
      formData.prize,
      formData.rating,
      cover
    );
    setFormData({
      id: "",
      title: "",
      dis: "",
      prize: "",
      rating: "",
    })
  };

  return (
    <div className="m-5">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">
            Add img
          </label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setcover(e.target.files[0])}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="id" className="form-label">
            ID
          </label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="dis" className="form-label">
            Dis
          </label>
          <input
            type="text"
            className="form-control"
            id="dis"
            name="dis"
            value={formData.dis}
            onChange={handleInputChange}
            placeholder="Add Dis"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="prize" className="form-label">
            prize
          </label>
          <input
            type="text"
            className="form-control"
            id="prize"
            name="prize"
            value={formData.prize}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="zip" className="form-label">
            rating
          </label>
          <input
            type="text"
            className="form-control"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="w-100 p-3 fw-bold pymet_sub_btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addproduct;
