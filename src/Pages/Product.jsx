import React from "react";
import ProductDetails from "../components/Sections/Product/ProductDetails";
import Header from "../components/Header/Header";

const Home = () => {
  return (
    <div className="bg-white">
      <Header enableHoverEffect={false} />
      <ProductDetails />
    </div>
  );
};

export default Home;
