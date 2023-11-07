import React, { useState } from "react";
import "./Login.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    if (isLogin) {
      console.log(`Email: ${formData.email}\nPassword: ${formData.password}`);
    }
    setFormData({ email: "", password: "", name: "", confirmPassword: "" });
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login">
      <form className={`form_main_div ${isLogin ? "show-form" : "hide-form"}`}>
        {isLogin ? <h2>Login Page</h2> : <h2>Create Account</h2>}
        <hr />
        {!isLogin && (
          <div className="input-container">
            <label className="text-bisque fs-2 fw-bold">Name</label>
            <input
              autoComplete="current-password"
              className="in_div"
              name="name"
              placeholder="Enter Your Name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
        )}
        <div className="input-container">
          <label className="text-bisque fs-2 fw-bold">Email</label>
          <input
            autoComplete="current-password"
            className="in_div"
            name="email"
            placeholder="Enter Your Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label className="text-bisque fs-2 fw-bold">Password</label>
          <input
            className="in_div"
            name="password"
            placeholder="Enter Your Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        {!isLogin && (
          <div className="input-container">
            <label className="text-bisque fs-2 fw-bold">Confirm Password</label>
            <input
              autoComplete="current-password"
              className="in_div"
              name="confirmPassword"
              placeholder="Confirm Your Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
        )}
        <button type="button" className="battn mt-3" onClick={handleFormSubmit}>
          {isLogin ? "Login" : "Register"}
        </button>
        <button type="button" className="battn mt-3" onClick={handleToggleForm}>
          {isLogin ? "Register Account" : "Return to Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
