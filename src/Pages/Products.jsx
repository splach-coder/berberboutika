import React from "react";
import ProductsPage from "../components/Sections/Products/ProductsPage";
import Header from "../components/Header/Header";

const Home = () => {
  return (
    <div className="bg-white">
      <Header enableHoverEffect={false} />
      <ProductsPage />
    </div>
  );
};

export default Home;
