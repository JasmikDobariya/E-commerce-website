import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./Componanets/Navbar/Navbar";
import Footer from "./Componanets/Footer/Footer";
import Homepage from "./Componanets/Home/Homepage";
import Shop from "./Componanets/Navbar/Shop/Shoppage/Shop";
import Blogpages from "./Componanets/Navbar/Blog/Blogpages";
import Wishlist from "./Componanets/Navbar/pages/Wishlist/Wishlist";
import Cart from "./Componanets/Navbar/Cart/Cart";
import AboutUs from "./Componanets/Navbar/pages/AboutUs/AboutUs";
import AboutTeam from "./Componanets/Navbar/pages/AboutTeam/AboutTeam";
import Contactus from "./Componanets/Navbar/pages/ContactUs/Contactus";
import FAQ from "./Componanets/Navbar/pages/FAQ/FAQ";
import Errorpage from "./Componanets/Navbar/pages/404/Errorpage";
import Categories from "./Componanets/Navbar/Shop/Categories/Categories";
import Loginpage from "./Componanets/Login/Loginpage";
import Buy_Now from "./Componanets/Arrivals/Buy_Now";
import Products from "./Componanets/Arrivals/Products";
import User_detiles from "./Componanets/Login/User_detiles";


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const noNavbarFooterRoutes = [ "/login" , "/User_detiles"  ];

  const shouldDisplayNavbarFooter = !noNavbarFooterRoutes.includes(
    location.pathname
  );

  return (
    <>
      {shouldDisplayNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/about_us" element={<AboutUs />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route exact path="/shops" element={<Shop />} />
        <Route exact path="/blogs" element={<Blogpages />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/about_team" element={<AboutTeam />} />
        <Route exact path="/contact_us" element={<Contactus />} />
        <Route exact path="/faq" element={<FAQ />} />
        <Route path="*" element={<Errorpage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/Buy_Now" element={<Buy_Now />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/User_detiles" element={<User_detiles />} />

        

      </Routes>
      {shouldDisplayNavbarFooter && <Footer />}
    </>
  );
}

export default App;
