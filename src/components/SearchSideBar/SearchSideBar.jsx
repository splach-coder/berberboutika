import React, { useState, useEffect, useRef } from 'react';
import { LuSearch, LuX, LuShoppingBag } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SearchSidebar = ({ searchTerm, isOpen, toggleSidebar, setSearchTerm, setIsOpen }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const sidebarRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch products from JSON file
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('../../src/data/products.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  // Filter products based on search term
  useEffect(() => {
    if (!products.length || !searchTerm) {
      setFilteredProducts([]);
      return;
    }
    
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  // Focus search input when sidebar opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleViewAllResults = () => {
    navigate('/search', { state: { searchTerm: searchTerm } });
    setIsOpen(false);
  };

  // Product list animation variants
  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1, 
      y: 0,
      transition: {
        delay: index * 0.1, // Staggered animation
        duration: 0.3
      }
    }),
    exit: { opacity: 0, y: 20 }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-medium">DES PRODUITS</h2>
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close search"
            >
              <LuX size={20} />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-4 border-b">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LuSearch size={18} className="text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Search products..."
              />
            </div>
          </div>

          {/* Products List */}
          <div className="flex-1 overflow-y-auto p-4">
            {!searchTerm ? (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 text-center py-8"
              >
                Start typing to search for products
              </motion.p>
            ) : filteredProducts.length === 0 ? (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 text-center py-8"
              >
                No products found
              </motion.p>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {filteredProducts.slice(0, 4).map((product, index) => (
                    <motion.div 
                      key={product.id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={productVariants}
                      className="flex gap-4"
                    >
                      <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={product.images[0]} 
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium leading-tight mb-1">{product.name}</h4>
                        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                        <p className="font-medium">{product.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t mt-auto">
            <button
              onClick={handleViewAllResults}
              className="w-full py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              VOIR TOUS LES RÉSULTATS
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSidebar;