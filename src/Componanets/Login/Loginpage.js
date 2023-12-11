import React, { useState, useEffect } from "react";
import "./Login.css";
import { useFirebase } from "../../Creatcontext/Firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const firebase = useFirebase();
  const Naviget = useNavigate();

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

  const creatuser = async (e) => {
    e.preventDefault();
    console.log("signing up user ...");
    const result = await firebase.signupuser(formData.email, formData.password);
    console.log("signup Success", result);
    setFormData({
      email: "",
      password: "",
    });
  };

  const login = async (e) => {
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

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };
  

  useEffect(() => {
    if (firebase.isLoggedin) {
      Naviget("/");
    }
  }, [firebase, Naviget]);

  return (
    <div className="login">
      <form className={`form_main_div ${isLogin ? "show-form" : "hide-form"}`}>
        {isLogin ? <h2>Login Page</h2> : <h2>Create Account</h2>}
        <hr />
        <div className="input-container">
          <label className="text-bisque fs-2 fw-bold">Email</label>
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
        <div className="input-container">
          <label className="text-bisque fs-2 fw-bold">Password</label>
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
          {isLogin ? (
            <button className="battn" onClick={(e) => login(e)}>
              Login
            </button>
          ) : (
            <button className="battn" onClick={(e) => creatuser(e)}>
              Register
            </button>
          )}
        </div>
        <button type="button" className="battn mt-3" onClick={handleToggleForm}>
          {isLogin ? "Register Account" : "Return to Login"}
        </button>
        <div className="my-2">OR</div>
        <button className="battn" onClick={firebase.googlelogin}>
          Login with google
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
