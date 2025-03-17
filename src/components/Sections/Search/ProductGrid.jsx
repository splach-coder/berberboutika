import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown, Filter, Search } from "lucide-react";

// Custom Slider Component
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

    // Ensure min handle doesn't go past max handle and vice versa
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
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 rounded"></div>

      {/* Active track */}
      <div
        className="absolute top-1/2 h-1 bg-black -translate-y-1/2 rounded"
        style={{
          left: `${(values[0] / max) * 100}%`,
          right: `${100 - (values[1] / max) * 100}%`,
        }}
      ></div>

      {/* Handles */}
      {values.map((value, index) => (
        <div
          key={index}
          className="absolute top-1/2 w-4 h-4 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{ left: `${(value / max) * 100}%` }}
          onMouseDown={(e) => handleMouseDown(index, e)}
          onTouchStart={(e) => handleMouseDown(index, e)}
        ></div>
      ))}
    </div>
  );
};

const ProductGrid = () => {
  // State for products and filters
  const [products, setProducts] = useState([]);
  const [sampleProducts, setSampleProducts] = useState([]);
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

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real implementation, you would fetch from your JSON file
        // For this demo, we'll use sample data
        useEffect(() => {
            // Fetch the products data from the JSON file
            fetch('/src/data/products.json')
              .then((response) => response.json())
              .then((data) => setSampleProducts(data))
              .catch((error) => console.error('Error fetching products:', error));
          }, []);

        setProducts(sampleProducts);
        setFilteredProducts(sampleProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply price range filter
    result = result.filter((product) => {
      const price = parseFloat(product.price.replace(/[^0-9.]/g, ""));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply in-stock filter
    if (showInStockOnly) {
      result = result.filter((product) => product.inStock);
    }

    // Apply sorting
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
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchQuery, priceRange, showInStockOnly, sortOption]);

  // Calculate current page products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle quick view
  const openQuickView = (product) => {
    console.log("Quick view:", product);
    // This would typically open a modal with product details
  };

  // Close sort dropdown when clicking outside
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

  return (
    <>
      {/* Header section with search, filter, and sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-gray-50"
            onClick={() => setFilterPanelOpen(true)}
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>

          <div className="relative" ref={sortDropdownRef}>
            <button
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-gray-50"
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            >
              Sort
              <ChevronDown className="h-4 w-4" />
            </button>
            {sortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 border border-gray-200">
                <ul className="py-2">
                  <li
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      sortOption === "default" ? "font-medium" : ""
                    }`}
                    onClick={() => {
                      setSortOption("default");
                      setSortDropdownOpen(false);
                    }}
                  >
                    Default
                  </li>
                  <li
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      sortOption === "price-low-high" ? "font-medium" : ""
                    }`}
                    onClick={() => {
                      setSortOption("price-low-high");
                      setSortDropdownOpen(false);
                    }}
                  >
                    Price: Low to High
                  </li>
                  <li
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      sortOption === "price-high-low" ? "font-medium" : ""
                    }`}
                    onClick={() => {
                      setSortOption("price-high-low");
                      setSortDropdownOpen(false);
                    }}
                  >
                    Price: High to Low
                  </li>
                  <li
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      sortOption === "popularity" ? "font-medium" : ""
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
      <div className="mb-6 text-right text-gray-600">
        {filteredProducts.length} results
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="relative group"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Product image with hover effect */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={
                  hoveredProduct === product.id
                    ? product.images[1]
                    : product.images[0]
                }
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-500"
              />

              {/* Out of stock label */}
              {!product.inStock && (
                <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-3 py-1 m-2">
                  OUT OF STOCK
                </div>
              )}

              {/* Black overlay with description - appears on hover */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1/5 bg-black bg-opacity-70 flex items-center px-4 text-white transform transition-all duration-300 ease-out ${
                  hoveredProduct === product.id
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                }`}
              >
                <p className="text-sm line-clamp-2">{product.description}</p>
              </div>

              {/* Quick view button - appears on hover */}
              <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  className="bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    openQuickView(product);
                  }}
                >
                  QUICK VIEW
                </button>
              </div>
            </div>

            {/* Product info section */}
            <div className="bg-white p-4 h-24 flex flex-col justify-between">
              <h3 className="text-sm font-medium mb-2 line-clamp-2 overflow-hidden">
                {product.title}
              </h3>
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-semibold">{product.price}</p>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex space-x-2">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Prev
            </button>
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === number + 1
                    ? "bg-black text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
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
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
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
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium">Filters</h3>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setFilterPanelOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Price range filter with custom slider */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-4">Price Range</h4>
            <div className="px-2">
              <CustomSlider
                defaultValue={[0, 100]}
                max={100}
                step={1}
                onValueChange={(value) => {
                  const minPrice = Math.floor(value[0] * 5); // Scale to 0-500 range
                  const maxPrice = Math.floor(value[1] * 5); // Scale to 0-500 range
                  setPriceRange([minPrice, maxPrice]);
                }}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>€{priceRange[0]}</span>
                <span>€{priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* In-stock toggle */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-4">Availability</h4>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="inStock"
                checked={showInStockOnly}
                onChange={() => setShowInStockOnly(!showInStockOnly)}
                className="h-5 w-5 text-black rounded border-gray-300 focus:ring-black"
              />
              <label htmlFor="inStock" className="ml-2 text-gray-700">
                Show in-stock items only
              </label>
            </div>
          </div>

          {/* Apply filters button */}
          <button
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
            onClick={() => setFilterPanelOpen(false)}
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Overlay when filter panel is open */}
      {filterPanelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setFilterPanelOpen(false)}
        ></div>
      )}
    </>
  );
};

export default ProductGrid;
