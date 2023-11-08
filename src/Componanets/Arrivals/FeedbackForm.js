import React, { useState } from "react";
import "./FeedbackForm.css";
import Rating from "@mui/material/Rating";
import { TextareaAutosize } from "@mui/material";

const FeedbackForm = ({ onClose, cardItem, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    message: "",
    image: null,
    rating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    onFormSubmit(formData);
    console.log(formData);
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imageFile,
    });
  };

  return (
    <div className="modal_title text-capitalize">
      <div className="modal-content1">
        <span className="close1" onClick={onClose}>
          &times;
        </span>
        <table>
          <tbody>
            <td className="d-flex align-items-center py-3">
              <img
                src={cardItem.img}
                alt="/"
                width={150}
                height={120}
                className="mr-4"
              />
              <div className="ps-3">
                <h6 className="text-muted">{cardItem.title}</h6>
                <h5 className="fw-bold">{cardItem.dis}</h5>
                <h5 className="fw-b   old mb-0 ">Price : {cardItem.prize}</h5>
              </div>
            </td>
          </tbody>
        </table>
        <form onSubmit={handleSubmit}>
          <div class="row">
            <div class="col">
              <label htmlFor="firstName" className="fw-semibold">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                class="form-control"
                placeholder="First name"
                aria-label="First name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div class="col">
              <label htmlFor="lastName" className="fw-semibold">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                class="form-control"
                placeholder="Last name"
                aria-label="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="pt-2">
            <label htmlFor="Message" className="fw-semibold">
              Message
            </label>
            <TextareaAutosize
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Message"
              minRows={3}
              maxRows={5}
            />
          </div>

          <div className="form-group1">
            <label htmlFor="rating">Rating</label>
            <div>
              <Rating
                name="rating"
                value={formData.rating}
                precision={0.5}
                onChange={(event, newRating) =>
                  handleInputChange({
                    target: { name: "rating", value: newRating },
                  })
                }
              />
            </div>
          </div>
          <div className="form-group1">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div className="py-2">
            <button
              className="leave_btn col-12"
              variant="contained"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
