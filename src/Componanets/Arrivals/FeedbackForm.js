import React, { useEffect, useState } from "react";
import "./FeedbackForm.css";
import Rating from "@mui/material/Rating";
import { TextareaAutosize } from "@mui/material";
import { useFirebase } from "../../Creatcontext/Firebase";
import CloseIcon from '@mui/icons-material/Close';

const FeedbackForm = ({ onClose, cardItem, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    message: "",
    image: null,
    rating: 0,
  });
  const firebase = useFirebase();
  const [url, setURL] = useState(null);

  const fetchProductURL = async () => {
    try {
      const imageUrl = await firebase.downloadurl(cardItem.imageUrl);
      setURL(imageUrl);
    } catch (error) {
      console.error("Error fetching product image URL:", error);
    }
  };

  useEffect(() => {
    fetchProductURL();
  }, [firebase, cardItem.imageUrl])

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


  return (
    <div className="modal_title text-capitalize">
      <div className="modal-content1">
        <span className="close1" onClick={onClose}>
          <CloseIcon />
        </span>
        <table>
          <tbody>
          <tr> 
              <td className="d-flex align-items-center py-3">
                <img
                  src={ url}
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
            </tr>
          </tbody>
        </table>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <label htmlFor="firstName" className="fw-semibold m-1">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First name"
                aria-label="First name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <label htmlFor="lastName" className="fw-semibold m-1">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last name"
                aria-label="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="pt-2">
            <label htmlFor="Message" className="fw-semibold m-1">
              Message
            </label>
            <TextareaAutosize
            className="rounded-4"
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
