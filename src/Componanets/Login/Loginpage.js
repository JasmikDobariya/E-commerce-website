import React, { useState } from "react";
import "./Login.css";
import { useFirebase } from "../../Creatcontext/Firebase";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const firebase = useFirebase();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const result = await firebase.signupuser(formData.email, formData.password);
    console.log("signup Success", result);
    setFormData({
      email: "",
      password: "",
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    console.log("logging in user ...");
    const resultlogin = await firebase.loginuser(
      formData.email,
      formData.password
    );
    console.log("login Success", resultlogin);
    setFormData({
      email: "",
      password: "",
    });
  };

  const logoutUser = () => {
    firebase.logout();
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  console.log("isLogin", isLogin);

  return (
    <div className="login">
      <div className="loginpage_style"></div>
      {firebase.isLoggedin ? (
        <div>
          <p className="p-2 fs-4 fw-bold">Welcome : {firebase.userEmail}!</p>
          <div className="pb-2">
            <button className="battn fw-bold " onClick={logoutUser}>
              Logout
            </button>
          </div>
          <Link to="/">
            <button className="battn fw-bold">Back To Home</button>
          </Link>
          <div className="pt-2">
            <Link to="/User_detiles">
              <button className="battn fw-bold">Add More About You</button>
            </Link>
          </div>
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
          <div className="my-2">OR</div>
          <button className="battn" onClick={firebase.googlelogin}>
            Login with Google
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
