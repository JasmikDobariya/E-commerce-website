// LoginPage.js

import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

import { useAuth } from "../../Creatcontext/DataBackend.js";

const LoginPage = () => {
  const { storeTokenInLS, fetchUserData } = useAuth();
  const { isLoggedIn, LogoutUser, user } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createUser = async (e) => {
    e.preventDefault();
    console.log("signing up user ...");
    try {
      const response = await fetch(`https://server-ecommerce-two.vercel.app/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLS(res_data?.token);
        await fetchUserData(); 
        setFormData({
          email: "",
          password: "",
          userName: "",
        });
      }
    } catch (error) {
      console.log("message", error);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://server-ecommerce-two.vercel.app/user/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLS(res_data?.token);
        await fetchUserData(); 

        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log("message", error);
    }
  };

  const logoutUser = () => {
    LogoutUser();
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login">
      <div className="loginpage_style"></div>
      {isLoggedIn ? (
        <div className="w-25">
          <p className="p-2 fs-4 fw-bold text-capitalize">Welcome: {user && user.userName}</p>
          <div className="pb-2 ">
            <button className="battn fw-bold" onClick={logoutUser}>
              Logout
            </button>
          </div>
          <Link to="/">
            <button className="battn fw-bold">Back To Home</button>
          </Link>
          
        </div>
      ) : (
        <form
          className={`form_main_div ${isLogin ? "show-form" : "hide-form"}`}
        >
          {isLogin ? (
            <h2 className="fw-bold">Login Page</h2>
          ) : (
            <h2 className="fw-bold">Create Account</h2>
          )}
          <hr />
          {!isLogin && (
            <div className="input-container text-start">
              <label className="text-bisque fs-4 fw-bold">Full Name</label>
              <input
                required
                className="in_div"
                name="userName"
                placeholder="Enter Your Full Name"
                type="text"
                value={formData.userName}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="input-container text-start">
            <label className="text-bisque fs-4 fw-bold">Email</label>
            <input
              required
              autoComplete="current-password"
              className="in_div"
              name="email"
              placeholder="Enter Your Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container text-start">
            <label className="text-bisque fs-4 fw-bold">Password</label>
            <input
              required
              className="in_div"
              name="password"
              placeholder="Enter Your Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </div>

          <div className=" mt-3">
            <button
              className="battn"
              onClick={isLogin ? loginUser : createUser}
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
          <button
            type="button"
            className="battn mt-3"
            onClick={handleToggleForm}
          >
            {isLogin ? "Register Account" : "Return to Login"}
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
