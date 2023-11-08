import React, { useState } from "react";
import "./FeedbackForm.css";
import Rating from "@mui/material/Rating";
import { Button, TextareaAutosize, TextField } from "@mui/material";

const FeedbackForm = ({ onClose, cardItem }) => {
  console.log(cardItem);
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

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imageFile,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onClose();
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
              <label htmlFor="First name" className="fw-semibold">First name</label>
              <input
                type="text"
                class="form-control"
                placeholder="First name"
                aria-label="First name"
              />
            </div>
            <div class="col">
              <label htmlFor="Last name" className="fw-semibold">Last name</label>

              <input
                type="text"
                class="form-control"
                placeholder="Last name"
                aria-label="Last name"
              />
            </div>
          </div>
          <div className="pt-2">
          <label htmlFor="Message" className="fw-semibold">Message</label>
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
          <Button className="leave_btn" variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
