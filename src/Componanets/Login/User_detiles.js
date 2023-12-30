import React, { useState, useEffect } from "react";
import { useFirebase } from "../../Creatcontext/Firebase";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const firebase = useFirebase();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    address2: "",
    pincode: "",
    mobileNumber: "",
    state: "",
    city: "",
  });
  const [isEditMode, setEditMode] = useState(false);
  const [error, setError] = useState("");

  const fetchUserDetails = async () => {
    try {
      const userDetailsFromFirestore = await firebase.getUserDetails();
      if (userDetailsFromFirestore) {
        setUserDetails(userDetailsFromFirestore);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [firebase]); // Only re-run the effect if `firebase` changes

  const handleSave = async () => {
    if (
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.email ||
      !userDetails.address ||
      !userDetails.address2 ||
      !userDetails.pincode ||
      !userDetails.state ||
      !userDetails.city
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await firebase.saveUserDetails(userDetails);
      setError("");
      setEditMode(false);
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 ">
   
      <div
        style={{
          backgroundImage: `url('https://i.pinimg.com/originals/21/7d/72/217d723cdbca6c4598d6b2eea6505d90.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          height: "100%",
          width: "100%",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      ></div>
      {isEditMode ? (
        <form className="container-sm p-4 border text-">
          <div className="mb-3 d-flex justify-content-between ">
            <div className="flex-fill me-2">
              <label className="form-label fs-5 fw-semibold">First Name</label>
              <input
                type="text"
                className="form-control text-capitalize "
                name="firstName"
                value={userDetails.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex-fill ms-2">
              <label className="form-label fs-5 fw-semibold">Last Name</label>
              <input
                type="text"
                className="form-control text-capitalize"
                name="lastName"
                value={userDetails.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fs-5 fw-semibold">Email ID</label>
            <input
              type="email"
              className="form-control text-capitalize"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fs-5 fw-semibold">Mobile Number</label>
            <input
              type="number"
              className="form-control text-capitalize"
              name="mobileNumber"
              value={userDetails.mobileNumber}
              onChange={handleChange}
              minLength={10}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fs-5 fw-semibold">Address</label>
            <input
              required
              type="text"
              className="form-control text-capitalize"
              name="address"
              value={userDetails.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fs-5 fw-semibold">
              Street/Apartment/Floor
            </label>
            <input
              required
              type="text"
              className="form-control text-capitalize"
              name="address2"
              value={userDetails.address2}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 d-flex justify-content-between">
            <div className="flex-fill me-2">
              <label className="form-label fs-5 fw-semibold">City</label>
              <input
                type="text"
                className="form-control text-capitalize"
                name="city"
                value={userDetails.city}
                onChange={handleChange}
              />
            </div>
            <div className="flex-fill ms-2">
              <label className="form-label fs-5 fw-semibold">State</label>
              <input
                type="text"
                className="form-control text-capitalize"
                name="state"
                value={userDetails.state}
                onChange={handleChange}
              />
            </div>
            <div className="flex-fill ms-2">
              <label className="form-label fs-5 fw-semibold">Pin Code</label>
              <input
                type="number"
                className="form-control text-capitalize"
                name="pincode"
                value={userDetails.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <p className="text-danger fw-bold fs-5 py-2">{error}</p>}
          <button type="button" className="battn " onClick={handleSave}>
            Save
          </button>
        </form>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="border border-black p-5">
            <h2 className="fw-bold text-center mb-4">User Details</h2>
            <p className="fw-semibold fs-5 text-capitalize">
              First Name: {userDetails.firstName}
            </p>
            <p className="fw-semibold fs-5 text-capitalize">
              Last Name: {userDetails.lastName}
            </p>
            <p className="fw-semibold fs-5 text-capitalize">
              Email ID: {userDetails.email}
            </p>
            <p className="fw-semibold fs-5 text-capitalize">
              Address: {userDetails.address}
            </p>
            <p className="fw-semibold fs-5 text-capitalize">
              Street/Apartment/Floor: {userDetails.address2}
            </p>

            <p className="fw-semibold fs-5 text-capitalize">
              Mobile Number: {userDetails.mobileNumber}
            </p>
            <p className="fw-semibold fs-5 text-capitalize">
              State: {userDetails.state}
            </p>
            <p className="fw-semibold fs-5 text-capitalize">
              City: {userDetails.city}
            </p>
            <p className="fw-semibold fs-5 text-capitalize">
              Pin Code: {userDetails.pincode}
            </p>
            <p className="fw-semibold fs-5 text-capitalize">
              User Email: {firebase.userEmail}
            </p>
            <div className="w-full text-center py-3">
              <button type="button" className="battn" onClick={handleEdit}>
                Edit
              </button>
            </div>
            <Link to="/">
              <button type="button" className="battn" onClick={handleEdit}>
                Back To Home
              </button>
            </Link>
          </div>
        </div>
      )}
      </div>
    
  );
};

export default UserDetails;
