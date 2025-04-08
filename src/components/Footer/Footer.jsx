import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTiktok, FaInstagram, FaPinterest } from 'react-icons/fa';
import { useForm, ValidationError } from '@formspree/react';

const SocialMediaFooter = () => {
  return (
    <div className="mt-8 border-t border-primary-light pt-6">
      <div className="flex justify-center space-x-6">
        <a href="#" className="hover:text-indigo-200 transition duration-300">
          <span className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
            <FaFacebook className="text-primary-dark" />
          </span>
        </a>
        <a href="#" className="hover:text-indigo-200 transition duration-300">
          <span className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
            <FaInstagram className="text-primary-dark" />
          </span>
        </a>
        <a href="#" className="hover:text-indigo-200 transition duration-300">
          <span className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
            <FaTiktok className="text-primary-dark" />
          </span>
        </a>
        <a href="#" className="hover:text-indigo-200 transition duration-300">
          <span className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
            <FaPinterest className="text-primary-dark" />
          </span>
        </a>
      </div>
    </div>
  );
};

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [state, handleSubmit] = useForm("xdkegkqp");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    // Check if submission was successful
    if (state.succeeded) {
      setShowSuccessMessage(true);
      setEmail('');
      
      // Hide success message after 3 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        setSubmitAttempted(false);
      }, 3000);

      // Clear the timer if component unmounts
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      setSubmitAttempted(false);
      return;
    }

    try {
      await handleSubmit(event);
    } catch (error) {
      console.error('Submission error', error);
      alert('There was an error submitting your email. Please try again.');
      setSubmitAttempted(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Newsletter</h3>
      <p className="mb-4 text-sm">Stay connected! Subscribe to our newsletter for exclusive updates</p>
      
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">Thank you for subscribing!</span>
        </div>
      )}
      
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-2">
        <div className="relative">
          <input 
            id="email"
            type="email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address" 
            required
            className="w-full px-4 py-2 rounded text-gray-800 bg-white 
              focus:outline-none focus:ring-2 focus:ring-primary-light 
              border border-gray-300 transition duration-300"
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <button 
          type="submit" 
          disabled={state.submitting || submitAttempted}
          className="bg-primary-light hover:bg-primary-dark text-primary-dark 
            hover:text-white px-4 py-2 rounded font-medium 
            transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.submitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-primary-light">
      <div className="container mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Berber boutika</h3>
            <ul className="space-y-2">
              <li>3 Derb Ahmer</li>
              <li>Marrakech, Laksour 40030</li>
              <li>Phone: (212) 671-437355</li>
              <li>Email: contactus@berberboutika.com</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-indigo-200 transition duration-300">Home</a></li>
              <li><a href="/aboutus" className="hover:text-indigo-200 transition duration-300">About Us</a></li>
              <li><a href="/blog" className="hover:text-indigo-200 transition duration-300">Blog</a></li>
              <li><a href="/faq" className="hover:text-indigo-200 transition duration-300">Faq</a></li>
              <li><a href="/contactus" className="hover:text-indigo-200 transition duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-200 transition duration-300">Web Development</a></li>
              <li><a href="#" className="hover:text-indigo-200 transition duration-300">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-indigo-200 transition duration-300">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-indigo-200 transition duration-300">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-indigo-200 transition duration-300">Consulting</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <NewsletterSignup />
        </div>

        {/* Social Media Icons */}
        <SocialMediaFooter />

        {/* Copyright */}
        <div className="text-center mt-6">
          <p>&copy; {new Date().getFullYear()} BerBer Boutika. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;