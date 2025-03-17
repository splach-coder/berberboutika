import React from 'react';
import ContactForm from "../components/Sections/ContactForm/ContactForm";
import Header from "../components/Header/Header";

const ContactUs = () => {
  return (
    <div className="bg-white">
      <Header enableHoverEffect={false} />
        <ContactForm />
    </div>
  );
};

export default ContactUs;