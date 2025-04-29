import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, {
    once: true,
    margin: "0px 0px -50px 0px",
  });

  // Moroccan-themed menu items
  const menuItems = [
    "New Products",
    "Zellige & Ceramics",
    "Berber Textiles",
    "Kitchen Essentials",
    "Salon Sanctuary",
    "All Products",
    "Blog",
    "Contact",
  ];

  // Updated social icons with react-icons/fa components
  const socialIcons = [
    { name: "Instagram", icon: <FaInstagram className="w-5 h-5" /> },
    { name: "Facebook", icon: <FaFacebookF className="w-5 h-5" /> },
    { name: "Pinterest", icon: <FaPinterestP className="w-5 h-5" /> },
    { name: "TikTok", icon: <FaTiktok className="w-5 h-5" /> },
  ];

  // Enhanced animations
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.footer
      ref={footerRef}
      className="bg-white w-full border-t border-gray-100"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Top Navigation - Enhanced */}
      <motion.div
        className="px-6 py-5 border-b border-gray-100"
        variants={{
          visible: {
            transition: { staggerChildren: 0.05 },
          },
        }}
      >
        <nav>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {menuItems.map((item, i) => (
              <motion.li
                key={i}
                variants={fadeIn}
                whileHover={{
                  scale: 1.05,
                  color: "#9E6240", // Moroccan terracotta
                }}
              >
                <a
                  href="#"
                  className="text-sm md:text-base font-medium text-gray-700 hover:text-amber-800 transition-colors"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* Main Content - Structured same but enhanced */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Brand Statement */}
        <motion.div
          className="lg:order-2 text-center lg:text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-serif text-gray-800 mb-6 leading-relaxed"
          >
            <span className="block text-primary-dark mb-2">ⴱⴻⵔⴱⴻⵔ ⴱⵓⵜⵉⴽⴰ</span>
            L'artisanat marocain authentique,
            <br />
            créé avec passion depuis des générations.
          </motion.h2>

          {/* Social Icons - Enhanced with react-icons/fa */}
          <motion.div
            className="flex justify-center lg:justify-start gap-4 mt-8"
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {socialIcons.map((social, i) => (
              <motion.a
                key={i}
                href="#"
                aria-label={social.name}
                className="bg-primary-light  p-2 rounded-full transition-colors text-primary-dark"
                variants={fadeIn}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - Logo */}
        <motion.div
          className="lg:order-1 flex justify-center lg:justify-start"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
        >
          <motion.a
            className="text-5xl md:text-6xl font-bold text-amber-800 font-serif"
            whileHover={{
              scale: 1.02,
              textShadow: "0 2px 4px rgba(158, 98, 64, 0.2)",
            }}
          >
            <img
              src="/images/logos/logo.png"
              alt="Berber boutika"
              className={`inline-block transition-all duration-300 h-64`}
            />
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom Footer - Enhanced */}
      <motion.div
        className="px-6 py-4 border-t border-gray-100 text-center text-sm text-gray-500"
        variants={fadeIn}
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6">
          <motion.a href="/faq" whileHover={{ color: "#9E6240" }}>
            Faq
          </motion.a>
          <span className="hidden sm:inline">•</span>
          <motion.a href="#" whileHover={{ color: "#9E6240" }}>
            Confidentialité
          </motion.a>
          <span className="hidden sm:inline">•</span>
          <motion.a href="/paymentpolicy" whileHover={{ color: "#9E6240" }}>
            Payment Policy
          </motion.a>
        </div>
        <motion.p className="mt-3">
          © {new Date().getFullYear()} Berber Boutika. Tous droits réservés.
        </motion.p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
