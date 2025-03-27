import React from 'react';
import { FaFacebook, FaTiktok, FaInstagram, FaPinterest } from 'react-icons/fa';

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
              <li><a href="#" className=" transition duration-300">Web Development</a></li>
              <li><a href="#" className=" transition duration-300">Mobile Apps</a></li>
              <li><a href="#" className=" transition duration-300">UI/UX Design</a></li>
              <li><a href="#" className=" transition duration-300">Digital Marketing</a></li>
              <li><a href="#" className=" transition duration-300">Consulting</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for the latest updates</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
              <button 
                type="submit" 
                className="bg-primary-light hover:bg-primary-light text-primary-dark px-4 py-2 rounded font-medium transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
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