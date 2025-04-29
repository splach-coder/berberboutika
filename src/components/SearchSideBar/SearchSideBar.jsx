import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LuSearch, LuX, LuShoppingBag } from "react-icons/lu";

const SearchSidebar = ({ searchTerm, isOpen, toggleSidebar, setSearchTerm, setIsOpen }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const sidebarRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('../../src/data/products.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) fetchProducts();
  }, [isOpen]);

  // Filter products
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProducts(filtered.slice(0, 6));
  }, [searchTerm, products]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  // Focus search input
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 300);
    }
  }, [isOpen]);

  const handleViewAllResults = () => {
    navigate('/search', { state: { searchTerm, products: filteredProducts } });
    setIsOpen(false);
  };

  const handleProductClick = (product) => {
    navigate(`/product`, { state: { product } });
    setIsOpen(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary-black z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        ref={sidebarRef}
        initial={{ x: '100%' }}
        animate={isOpen ? { x: 0 } : { x: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-background-light z-50 shadow-lg"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-primary-light">
            <h2 className="text-xl font-serif text-primary-dark">Search</h2>
            <button 
              onClick={toggleSidebar}
              className="p-2 text-primary-dark hover:text-primary-black transition-colors"
              aria-label="Close search"
            >
              <LuX size={20} />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-6 border-b border-primary-light">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <LuSearch className="text-primary-dark opacity-50" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-12 pr-4 bg-background-flashLight bg-white border border-primary-light rounded-sm focus:outline-none focus:border-primary-dark text-primary-black placeholder-primary-dark placeholder-opacity-50"
                placeholder="Search our collection..."
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="w-8 h-8 border-2 border-primary-dark border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : !searchTerm ? (
              <div className="p-6 text-center">
                <div className="text-primary-dark opacity-30 mb-4">
                  <LuSearch size={48} className="mx-auto" />
                </div>
                <p className="text-primary-black opacity-70">Search for ceramics, textiles, or home decor</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="p-6 text-center">
                <div className="text-primary-dark opacity-30 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-primary-black opacity-70">No results found for "{searchTerm}"</p>
              </div>
            ) : (
              <motion.div
                className="p-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="mb-4 last:mb-0 cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-background-flashLight rounded-sm overflow-hidden flex-shrink-0">
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-primary-dark truncate">{product.name}</h4>
                          <p className="text-sm text-primary-black opacity-70 mb-1">{product.category}</p>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-primary-dark">
                              {product.discountPrice ? (
                                <>
                                  <span className="text-primary-black line-through opacity-70 mr-2">
                                    {product.currency}{product.price}
                                  </span>
                                  {product.currency}{product.discountPrice}
                                </>
                              ) : (
                                `${product.currency}${product.price}`
                              )}
                            </p>
                            {product.inStock && (
                              <span className="text-xs bg-primary-light text-primary-dark px-2 py-1 rounded">
                                In Stock
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {searchTerm && filteredProducts.length > 0 && (
            <div className="p-6 border-t border-primary-light">
              <button
                onClick={handleViewAllResults}
                className="w-full py-3 bg-primary-dark text-background-light rounded-sm font-medium hover:bg-button-darkHover transition-colors"
              >
                View All Results ({filteredProducts.length})
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default SearchSidebar;