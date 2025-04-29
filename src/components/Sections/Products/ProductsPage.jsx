import React, { useState, useEffect, useRef } from "react";
import { LuFilter } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductQuickViewModal from "./ProductQuickViewModal";
import ProductsHeader from "./ProductsHeader";
import { motion, AnimatePresence } from "framer-motion";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const initialCollection = searchParams.get("collection") || "all";
  const navigate = useNavigate();

  // States
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [categoryFilter, setCategoryFilter] = useState(initialCollection);
  const [stockFilter, setStockFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Fetch products data
  useEffect(() => {
    fetch("/src/data/products.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.filter((product) => {
          if (categoryFilter === "all") return true; // Include all products
          return product.collection === categoryFilter; // Filter by collection
        });
        setAllProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [categoryFilter]);

  // Handle category validation after data load
  const categories = [
    "all",
    ...new Set(allProducts.map((product) => product.category)),
  ];
  useEffect(() => {
    if (allProducts.length > 0 && !categories.includes(categoryFilter)) {
      setCategoryFilter("all");
    }
  }, [allProducts]);

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = [...allProducts];

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (stockFilter === "in-stock") {
      filtered = filtered.filter((product) => product.inStock);
    } else if (stockFilter === "out-of-stock") {
      filtered = filtered.filter((product) => !product.inStock);
    }

    switch (sortBy) {
      case "a-z":
        filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "z-a":
        filtered.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      case "price-low-high":
        filtered.sort((a, b) => {
          const aPrice =
            typeof a.price === "string"
              ? parseFloat(a.price.replace(/[^0-9.]/g, ""))
              : a.price;
          const bPrice =
            typeof b.price === "string"
              ? parseFloat(b.price.replace(/[^0-9.]/g, ""))
              : b.price;
          return aPrice - bPrice;
        });
        break;
      case "price-high-low":
        filtered.sort((a, b) => {
          const aPrice =
            typeof a.price === "string"
              ? parseFloat(a.price.replace(/[^0-9.]/g, ""))
              : a.price;
          const bPrice =
            typeof b.price === "string"
              ? parseFloat(b.price.replace(/[^0-9.]/g, ""))
              : b.price;
          return bPrice - aPrice;
        });
        break;
      case "most-purchased":
        filtered.sort((a, b) => b.purchaseCount - a.purchaseCount);
        break;
      default:
        break;
    }

    return filtered;
  };

  // Pagination and loading
  const productsPerPage = 8;
  const observer = useRef();
  const loadingRef = useRef(null);

  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    loadProducts(1, true);
  }, [sortBy, categoryFilter, stockFilter, allProducts]);

  const loadProducts = (pageNumber, replace = false) => {
    setLoading(true);
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

  // Infinite scroll
  useEffect(() => {
    if (loading) return;

    const handleObserver = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        setPage((prev) => {
          const newPage = prev + 1;
          loadProducts(newPage);
          return newPage;
        });
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    if (loadingRef.current) observer.observe(loadingRef.current);

    return () => observer.disconnect();
  }, [loading, hasMore]);

  // Quick view functions
  const openQuickView = (product, e) => {
    e.stopPropagation(); // Prevent event bubbling to parent
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // Product animation variants
  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="mx-auto px-4 pb-12 bg-background-light text-primary-black pt-44">
      <ProductQuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />

      {/* Header Section */}
      {initialCollection === 'all' && <ProductsHeader />}

      {/* Filters Section */}
      <div className="mb-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center space-x-2 bg-background-flashLIght px-4 py-2 rounded-md mb-3 md:mb-0 hover:bg-gray-100 transition-colors"
          >
            <LuFilter className="text-primary-dark" />
            <span className="text-primary-black">Filter & Sort</span>
          </button>
          <div className="text-sm text-gray-600">
            Showing {products.length} of {getFilteredProducts().length} products
          </div>
        </div>

        {filterOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background-flashLIght p-4 rounded-md mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-2 text-primary-black">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border rounded-md bg-white text-primary-black border-gray-300 focus:ring-primary-dark focus:border-primary-dark"
                >
                  <option value="default">Featured</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                  <option value="price-low-high">Price Low to High</option>
                  <option value="price-high-low">Price High to Low</option>
                  <option value="most-purchased">Most Popular</option>
                </select>
              </div>

              <div>
                <h3 className="font-medium mb-2 text-primary-black">Category</h3>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full p-2 border rounded-md bg-white text-primary-black border-gray-300 focus:ring-primary-dark focus:border-primary-dark"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-medium mb-2 text-primary-black">Availability</h3>
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="w-full p-2 border rounded-md bg-white text-primary-black border-gray-300 focus:ring-primary-dark focus:border-primary-dark"
                >
                  <option value="all">All Products</option>
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <AnimatePresence>
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={productVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => {
                navigate(`/product`, {
                  state: { product },
                });
              }}
            >
              <div className="relative h-80 overflow-hidden bg-background-flashLIght">
                <img
                  src={
                    hoveredProduct === product.id
                      ? product.images[1]
                      : product.images[0]
                  }
                  alt={product.title}
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
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button
                    className="bg-white text-primary-dark px-4 py-2 text-xs font-medium hover:bg-background-flashLIght transition-colors border border-primary-dark"
                    onClick={(e) => openQuickView(product, e)}
                  >
                    QUICK VIEW
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 h-24 flex flex-col justify-between border border-t-0 border-gray-200">
                <h3 className="text-sm font-normal line-clamp-2 text-primary-black">
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

      {/* Loading/End Message */}
      <div ref={loadingRef} className="w-full py-8 flex justify-center max-w-7xl mx-auto">
        {loading && (
          <div className="w-8 h-8 border-4 border-gray-200 border-t-primary-dark rounded-full animate-spin" />
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-gray-500">You've reached the end</p>
        )}
        {products.length === 0 && !loading && (
          <div className="w-full text-center py-12">
            <p className="text-lg font-medium text-primary-dark">
              No products found
            </p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;