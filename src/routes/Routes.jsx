// src/routes.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../Pages/Home";
import Cart from "../Pages/Cart";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AppRoutes;
