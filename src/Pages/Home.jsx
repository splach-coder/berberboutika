import React from "react";
import MainSlider from "../components/Sections/Home/MainSlider";
import FeaturesAndTestimonials from "../components/Sections/Home/FeaturesAndTestimonials";
import GridGallery from "../components/Sections/Home/GridGallery";
import Quote from "../components/Sections/Home/Quote";
import ShopByCollection from "../components/Sections/Home/ShopByCollection";
import AsymmetricalProductShowcase from "../components/Sections/Home/AsymmetricalProductShowcase";
import FurnitureCollection from "../components/Sections/Home/FurnitureCollection";
import FeatureGrid from "../components/Sections/Home/FeatureGrid";
import Header from "../components/Header/Header";

const Home = () => {
  return (
    <div className="bg-white">
      <Header enableHoverEffect={true} />
      <MainSlider />
      <AsymmetricalProductShowcase />
      <FurnitureCollection />
      <Quote />
      <GridGallery />
      <ShopByCollection />
      <FeatureGrid />
      <FeaturesAndTestimonials />
    </div>
  );
};

export default Home;
