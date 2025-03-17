// src/routes.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import Blog from "../Pages/Blog";
import Products from "../Pages/Products";
import Search from "../Pages/Search";
import ContactUs from "../Pages/ContactUs";
import Faq from "../Pages/Faq";
import PaymentPolicy from "../Pages/PaymentPolicy";
import Product from "../Pages/Product";
import Blogpost from "../Pages/Blogpost";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/post" element={<Blogpost />} />
      <Route path="/products" element={<Products />} />
      <Route path="/search" element={<Search />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/paymentpolicy" element={<PaymentPolicy />} />
      <Route path="/product" element={<Product />} />
    </Routes>
  );
};

export default AppRoutes;
