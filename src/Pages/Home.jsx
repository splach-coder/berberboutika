import React from "react";
import MainSlider from "../components/Sections/Home/MainSlider";
import ProductShowcase from "../components/Sections/Home/ProductShowcase";
import FeaturesAndTestimonials from "../components/Sections/Home/FeaturesAndTestimonials";
import GridGallery from "../components/Sections/Home/GridGallery";
import Quote from "../components/Sections/Home/Quote";
import Header from "../components/Header/Header";

const Home = () => {
  return (
    <div className="bg-white">
      <Header enableHoverEffect={true} />
      <MainSlider />
      <ProductShowcase />
      <Quote />
      <GridGallery />
      <FeaturesAndTestimonials />
    </div>
  );
};

export default Home;
