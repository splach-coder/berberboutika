import React, { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Filter, Search } from "lucide-react";

// Custom Slider Component with refined design
const CustomSlider = ({ defaultValue, max, step, onValueChange }) => {
  const [values, setValues] = useState(defaultValue);
  const [dragging, setDragging] = useState(null);
  const sliderRef = useRef(null);

  const handleMouseDown = (index, e) => {
    e.preventDefault();
    setDragging(index);
  };

  const handleMouseMove = (e) => {
    if (dragging === null || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const width = rect.width;
    let percentage = (e.clientX - rect.left) / width;
    percentage = Math.max(0, Math.min(1, percentage));

    const newValue = Math.round((percentage * max) / step) * step;

    const newValues = [...values];
    newValues[dragging] = newValue;

    if (dragging === 0 && newValue > values[1]) {
      newValues[0] = values[1];
    } else if (dragging === 1 && newValue < values[0]) {
      newValues[1] = values[0];
    }

    setValues(newValues);
    onValueChange(newValues);
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    if (dragging !== null) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, values]);

  return (
    <div className="relative w-full h-5 my-4" ref={sliderRef}>
      {/* Track background */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 rounded-full"></div>

      {/* Active track */}
      <div
        className="absolute top-1/2 h-0.5 bg-primary-dark -translate-y-1/2 rounded-full"
        style={{
          left: `${(values[0] / max) * 100}%`,
          right: `${100 - (values[1] / max) * 100}%`,
        }}
      ></div>

      {/* Handles */}
      {values.map((value, index) => (
        <div
          key={index}
          className="absolute top-1/2 w-3 h-3 bg-primary-dark rounded-full -translate-x-1/2 -translate-y-1/2 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
          style={{ left: `${(value / max) * 100}%` }}
          onMouseDown={(e) => handleMouseDown(index, e)}
          onTouchStart={(e) => handleMouseDown(index, e)}
        ></div>
      ))}
    </div>
  );
};

const ProductGrid = () => {
  const location = useLocation();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const productsPerPage = 8;
  const sortDropdownRef = useRef(null);

  useEffect(() => {
    const state = location.state;
    if (state && state.searchTerm) {
      setSearchQuery(state.searchTerm);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/src/data/products.json');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    result = result.filter((product) => {
      try {
        const priceString = product.price?.toString() || "0";
        const price = parseFloat(priceString.replace(/[^0-9.]/g, ""));
        return price >= priceRange[0] && price <= priceRange[1];
      } catch (error) {
        console.error("Error processing product price:", product, error);
        return false;
      }
    });

    if (showInStockOnly) {
      result = result.filter((product) => product.inStock);
    }

    if (sortOption === "price-low-high") {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
        return priceA - priceB;
      });
    } else if (sortOption === "price-high-low") {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
        return priceB - priceA;
      });
    } else if (sortOption === "popularity") {
      result.sort((a, b) => b.purchaseCount - a.purchaseCount);
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, searchQuery, priceRange, showInStockOnly, sortOption]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openQuickView = (product) => {
    console.log("Quick view:", product);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setSortDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1, 
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3
      }
    }),
    exit: { opacity: 0, y: 20 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border bg-white border-gray-300 text-primary-black rounded-md focus:outline-none focus:ring-1 focus:ring-primary-dark focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto justify-end">
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-background-flashLIght transition-colors text-primary-black"
            onClick={() => setFilterPanelOpen(true)}
          >
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filter</span>
          </button>

          <div className="relative" ref={sortDropdownRef}>
            <button
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-background-flashLIght transition-colors text-primary-black"
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            >
              <span className="text-sm">Sort</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 border border-gray-200">
                <ul className="py-1">
                  <li
                    className={`px-4 py-2 hover:bg-background-flashLIght cursor-pointer text-sm ${
                      sortOption === "default" ? "text-primary-dark font-medium" : "text-primary-black"
                    }`}
                    onClick={() => {
                      setSortOption("default");
                      setSortDropdownOpen(false);
                    }}
                  >
                    Default
                  </li>
                  <li
                    className={`px-4 py-2 hover:bg-background-flashLIght cursor-pointer text-sm ${
                      sortOption === "price-low-high" ? "text-primary-dark font-medium" : "text-primary-black"
                    }`}
                    onClick={() => {
                      setSortOption("price-low-high");
                      setSortDropdownOpen(false);
                    }}
                  >
                    Price: Low to High
                  </li>
                  <li
                    className={`px-4 py-2 hover:bg-background-flashLIght cursor-pointer text-sm ${
                      sortOption === "price-high-low" ? "text-primary-dark font-medium" : "text-primary-black"
                    }`}
                    onClick={() => {
                      setSortOption("price-high-low");
                      setSortDropdownOpen(false);
                    }}
                  >
                    Price: High to Low
                  </li>
                  <li
                    className={`px-4 py-2 hover:bg-background-flashLIght cursor-pointer text-sm ${
                      sortOption === "popularity" ? "text-primary-dark font-medium" : "text-primary-black"
                    }`}
                    onClick={() => {
                      setSortOption("popularity");
                      setSortDropdownOpen(false);
                    }}
                  >
                    Popularity
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-gray-600 border-b pb-2">
        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
      </div>

      {/* Products grid */}
      <AnimatePresence>
        {currentProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500 py-20"
          >
            <p className="text-lg mb-2">No products found</p>
            <p className="text-sm">
              {searchQuery 
                ? "Try adjusting your search or filters" 
                : "Please check back later"}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={productVariants}
                  className="relative group"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative h-80 overflow-hidden bg-background-flashLIght">
                    <img
                      src={
                        hoveredProduct === product.id
                          ? product.images[1]
                          : product.images[0]
                      }
                      alt={product.name}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />

                    {!product.inStock && (
                      <div className="absolute top-2 right-2 bg-primary-dark text-white text-xs font-medium px-2 py-1 rounded">
                        Out of stock
                      </div>
                    )}

                    <div
                      className={`absolute bottom-0 left-0 right-0 bg-primary-dark bg-opacity-90 text-white p-3 transition-all duration-300 ${
                        hoveredProduct === product.id
                          ? "translate-y-0 opacity-100"
                          : "translate-y-full opacity-0"
                      }`}
                    >
                      <p className="text-xs line-clamp-2">{product.description}</p>
                    </div>

                    <div
                      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <button
                        className="bg-white text-primary-dark px-4 py-2 text-xs font-medium hover:bg-background-flashLIght transition-colors border border-primary-dark"
                        onClick={(e) => {
                          e.stopPropagation();
                          openQuickView(product);
                        }}
                      >
                        QUICK VIEW
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-4 h-24 flex flex-col justify-between border border-t-0 border-gray-200">
                    <h3 className="text-sm font-normal mb-2 line-clamp-2 overflow-hidden text-primary-black">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-primary-dark font-medium text-sm">{product.price}</p>
                      <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <nav className="flex space-x-1">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-primary-black hover:bg-background-flashLIght"
              }`}
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === number + 1
                    ? "bg-primary-dark text-white"
                    : "bg-white border border-gray-300 text-primary-black hover:bg-background-flashLIght"
                }`}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={() =>
                paginate(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-primary-black hover:bg-background-flashLIght"
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {/* Filter side panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-white w-80 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          filterPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-primary-black">Filters</h3>
            <button
              className="text-gray-500 hover:text-primary-dark transition-colors"
              onClick={() => setFilterPanelOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto">
            {/* Price range filter */}
            <div className="mb-8">
              <h4 className="text-md font-medium mb-4 text-primary-black">Price Range</h4>
              <div className="px-2">
                <CustomSlider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    const minPrice = Math.floor(value[0] * 5);
                    const maxPrice = Math.floor(value[1] * 5);
                    setPriceRange([minPrice, maxPrice]);
                  }}
                />
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>€{priceRange[0]}</span>
                  <span>€{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* In-stock toggle */}
            <div className="mb-8">
              <h4 className="text-md font-medium mb-4 text-primary-black">Availability</h4>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={showInStockOnly}
                  onChange={() => setShowInStockOnly(!showInStockOnly)}
                  className="h-4 w-4 text-primary-dark rounded border-gray-300 focus:ring-primary-dark"
                />
                <label htmlFor="inStock" className="ml-2 text-sm text-primary-black">
                  In stock only
                </label>
              </div>
            </div>
          </div>

          <button
            className="w-full bg-primary-dark text-white py-2 rounded hover:bg-button-darkHover transition-colors text-sm mt-auto"
            onClick={() => setFilterPanelOpen(false)}
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Overlay when filter panel is open */}
      {filterPanelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setFilterPanelOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ProductGrid;