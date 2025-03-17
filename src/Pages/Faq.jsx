import React from 'react';
import FaqComponent from "../components/Sections/FAQ/FaqComponent";
import Header from "../components/Header/Header";

const Faq = () => {
  return (
    <div className="bg-white">
      <Header enableHoverEffect={false} />
      <FaqComponent />
    </div>
  );
};

export default Faq;