import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Footer = () => {
  // Create refs for different sections to observe
  const footerRef = useRef(null);
  const navRef = useRef(null);
  const contentRef = useRef(null);
  const socialsRef = useRef(null);
  const bottomRef = useRef(null);
  
  // Check if sections are in view
  const isFooterInView = useInView(footerRef, { once: true, amount: 0.1 });
  const isNavInView = useInView(navRef, { once: true, amount: 0.5 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const isSocialsInView = useInView(socialsRef, { once: true, amount: 0.5 });
  const isBottomInView = useInView(bottomRef, { once: true, amount: 0.5 });

  const menuItems = [
    "Latest Products",
    "Backpack",
    "Bags",
    "Accessories",
    "Collection",
    "Gifting",
    "Serivce"
  ];

  const socialIcons = [
    { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
    { name: "Facebook", icon: "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h7.621v-6.961h-2.343v-2.725h2.343V9.309c0-2.324 1.421-3.591 3.495-3.591.699-.002 1.397.034 2.092.105v2.43h-1.428c-1.13 0-1.35.534-1.35 1.322v1.735h2.7l-.351 2.725h-2.365V21H19a2 2 0 002-2V5a2 2 0 00-2-2z" },
    { name: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    { name: "Twitter", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
    { name: "YouTube", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <footer ref={footerRef} className="bg-white w-full max-w-screen-2xl mx-auto px-4 sm:px-12">
      {/* Top navigation */}
      <motion.div 
        ref={navRef}
        className="pt-4 pb-3 border-b border-gray-200"
        initial={{ opacity: 0, y: -10 }}
        animate={isNavInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        <nav>
          <ul className="flex flex-wrap gap-x-6 text-gray-700">
            {menuItems.map((item, index) => (
              <motion.li 
                key={index} 
                className="cursor-pointer hover:text-gray-900"
                custom={index}
                initial="hidden"
                animate={isNavInView ? "visible" : "hidden"}
                variants={fadeIn}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* Main footer content */}
      <div ref={contentRef} className="py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main statement */}
        <motion.div 
          className="lg:order-2"
          initial={{ opacity: 0, x: 50 }}
          animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl lg:text-4xl text-gray-600 font-light leading-relaxed">
            <span>Paranora Offers </span>
            <span className="font-medium text-gray-900 underline">Premium Furniture</span>
            <span>, </span>
            <span className="font-medium text-gray-900 underline">Blending Timeless Design</span>
            <span>, </span>
            <span className="font-medium text-gray-900 underline">Exceptional Quality, And Unmatched</span>
            <span className="text-gray-500"> Comfort For Every Space.</span>
          </h2>
          
          {/* Social icons */}
          <motion.div 
            ref={socialsRef}
            className="flex gap-6 mt-8"
            initial={{ opacity: 0 }}
            animate={isSocialsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {socialIcons.map((social, index) => (
              <motion.a 
                key={index} 
                href="#" 
                aria-label={social.name}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.icon} />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Logo */}
        <motion.div 
          className="lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800">PARANORA</h1>
        </motion.div>
      </div>

      {/* Bottom footer */}
      <motion.div 
        ref={bottomRef}
        className="py-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isBottomInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-gray-500 text-sm mb-2 md:mb-0">©Paranora. All Rights Reserved.</div>
        <div className="text-gray-500 text-sm">
          <a href="#" className="hover:text-gray-700">Terms & Conditions</a>
          <span className="mx-2">|</span>
          <a href="#" className="hover:text-gray-700">Privacy Policy</a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;