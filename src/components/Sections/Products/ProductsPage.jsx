import React, { useState, useEffect, useRef } from "react";
import { LuFilter } from "react-icons/lu";
import ProductQuickViewModal from "./ProductQuickViewModal";

const ProductsPage = () => {
  // States
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [allProducts, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    // Fetch the products data from the JSON file
    fetch('/src/data/products.json')
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const productsPerPage = 8;
  const observer = useRef();
  const loadingRef = useRef(null);

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(allProducts.map((product) => product.category)),
  ];

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = [...allProducts];

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Apply stock filter
    if (stockFilter === "in-stock") {
      filtered = filtered.filter((product) => product.inStock);
    } else if (stockFilter === "out-of-stock") {
      filtered = filtered.filter((product) => !product.inStock);
    }

    // Apply sorting
    switch (sortBy) {
      case "a-z":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price-low-high":
        filtered.sort((a, b) => {
          const aPrice = parseFloat(a.price.replace(/[^0-9.]/g, ""));
          const bPrice = parseFloat(b.price.replace(/[^0-9.]/g, ""));
          return aPrice - bPrice;
        });
        break;
      case "price-high-low":
        filtered.sort((a, b) => {
          const aPrice = parseFloat(a.price.replace(/[^0-9.]/g, ""));
          const bPrice = parseFloat(b.price.replace(/[^0-9.]/g, ""));
          return bPrice - aPrice;
        });
        break;
      case "most-purchased":
        filtered.sort((a, b) => b.purchaseCount - a.purchaseCount);
        break;
      default:
        // Default sorting (keep original order)
        break;
    }

    return filtered;
  };

  // Load products on mount or when filters change
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    loadProducts(1, true);
  }, [sortBy, categoryFilter, stockFilter]);

  // Simulate loading products (with pagination)
  const loadProducts = (pageNumber, replace = false) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const filtered = getFilteredProducts();
      const startIndex = (pageNumber - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const newProducts = filtered.slice(startIndex, endIndex);

      setProducts((prev) =>
        replace ? newProducts : [...prev, ...newProducts]
      );
      setHasMore(endIndex < filtered.length);
      setLoading(false);
    }, 500);
  };

  // Load more products when scrolling
  useEffect(() => {
    if (loading) return;

    const handleObserver = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        setPage((prevPage) => {
          const newPage = prevPage + 1;
          loadProducts(newPage);
          return newPage;
        });
      }
    };

    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const currentObserver = new IntersectionObserver(handleObserver, option);
    if (loadingRef.current) currentObserver.observe(loadingRef.current);

    return () => {
      if (loadingRef.current) currentObserver.unobserve(loadingRef.current);
    };
  }, [loading, hasMore]);

  // 2. Add this function to open the modal
  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // 3. Add this function to close the modal
  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    // Optional: delay clearing the product to allow for exit animation
    setTimeout(() => {
      setSelectedProduct(null);
    }, 300);
  };

  return (
    <section className="mx-auto px-4 py-12 bg-white text-black pt-28">
        <ProductQuickViewModal
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={closeQuickView}
        />

      {/* Title section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-4 text-black">
          OUR PRODUCTS
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our collection of handcrafted home fragrances and decorative
          items. Each piece is carefully designed to bring elegance and
          character to your home.
        </p>
      </div>

      {/* Filter and sort section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md mb-3 md:mb-0"
          >
            <LuFilter />
            <span>Filter & Sort</span>
          </button>

          <div className="text-sm text-gray-500">
            Showing {products.length} of {getFilteredProducts().length} products
          </div>
        </div>

        {filterOpen && (
          <div className="bg-gray-50 p-4 rounded-md mb-6 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sort options */}
              <div>
                <h3 className="font-medium mb-2">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border rounded-md bg-white"
                >
                  <option value="default">Featured</option>
                  <option value="a-z">Alphabetically, A-Z</option>
                  <option value="z-a">Alphabetically, Z-A</option>
                  <option value="price-low-high">Price, low to high</option>
                  <option value="price-high-low">Price, high to low</option>
                  <option value="most-purchased">Most Purchased</option>
                </select>
              </div>

              {/* Category filter */}
              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full p-2 border rounded-md bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability filter */}
              <div>
                <h3 className="font-medium mb-2 ">Availability</h3>
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="w-full p-2 border rounded-md bg-white"
                >
                  <option value="all">All Products</option>
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
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

      {/* Loading indicator */}
      <div ref={loadingRef} className="w-full py-8 flex justify-center">
        {loading && (
          <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-gray-500">No more products to load</p>
        )}
        {products.length === 0 && !loading && (
          <div className="w-full text-center py-12">
            <p className="text-xl font-medium text-gray-700">
              No products found
            </p>
            <p className="text-gray-500 mt-2">
              Try changing your filter criteria
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;
