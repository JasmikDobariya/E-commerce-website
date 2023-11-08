import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Navbar.css";
import logo from "../assests/logo.png"

const options = [
  {
    title: "Home",
    opt: [],
  },
  {
    title: "Pages",
    opt: ["About_Us", "About_Team", "Contact_Us", "FAQ", "404", "Wishlist", "Login"],
  },
  {
    title: "Shop",
    opt: ["Shops", "Categories", "Account"],
  },
  {
    title: "Blog",
    opt: ["Blogs", "Blog Article"],
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center main_div">
          <div className="fs-2 fw-bold text-black">
            <Link to="/" className="logo_div">
              <div>
                <img src={logo} alt="/" height={70} width={130} />
              </div>
            </Link>
          </div>
          <div className="menu-icon" onClick={toggleMenu}>
            {menuOpen ? <CancelIcon /> : <MenuIcon />}
          </div>
          <ul className={`list_div ${menuOpen ? "open" : ""}`}>
            {options.map((option, index) => (
              <li key={index} className={option.opt.length > 0 ? "dropdown" : ""}>
                <span className="main_option">
                  {option.opt.length > 0 ? (
                    <Link to={`/${option.title.toLowerCase()}`}>{option.title}</Link>
                  ) : (
                    option.title
                  )}
                </span>
                {option.opt.length > 0 && (
                  <div className="dropdown-content">
                    {option.opt.map((subOption, subIndex) => (
                      <button key={subIndex} className="option-button">
                        <Link to={`/${subOption.toLowerCase()}`}>{subOption}</Link>
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="d-flex gap-5 svg_div">
            <div>
              <Link to="/search">
                <SearchIcon />
              </Link>
            </div>
            <div>
              <Link to="/login">
                <PersonOutlineIcon />
              </Link>
            </div>
            <div>
              <Link to="/cart">
                <ShoppingCartIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
