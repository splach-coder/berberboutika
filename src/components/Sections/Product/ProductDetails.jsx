import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFacebook, FaTwitter, FaWhatsapp, FaEtsy, FaShare, FaTag, FaShippingFast } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronLeft, LuChevronRight, LuZoomIn, LuX } from "react-icons/lu";

// Etsy Modal Component
const EtsyModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white rounded-sm max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-primary-dark"
            >
              <LuX size={20} />
            </button>
            
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-primary-dark">Purchase on Etsy</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p>For your security and convenience, we process all payments through Etsy's trusted platform.</p>
                
                <div className="bg-background-flashLIght p-4 rounded-sm">
                  <h4 className="font-medium mb-2 text-primary-dark">Benefits:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Secure payment processing</li>
                    <li>Etsy's buyer protection</li>
                    <li>Easy order tracking</li>
                    <li>Trusted customer support</li>
                  </ul>
                </div>
                
                <p>You'll be redirected to our official Etsy shop to complete your purchase.</p>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // In a real implementation, redirect to Etsy
                    // window.location.href = "https://www.etsy.com/your-shop";
                    onClose();
                  }}
                  className="px-4 py-2 text-sm bg-button-etsy text-white rounded-sm hover:bg-button-hoverEtsy"
                >
                  Continue to Etsy
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();

  // Image gallery state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreenImage, setShowFullscreenImage] = useState(false);
  const [showEtsyModal, setShowEtsyModal] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // Refs
  const imageRef = useRef(null);

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch("/src/data/products.json");
        const data = await response.json();
        const relatedProducts = data
          .filter((p) => {
            if (p.id === product.id) return false;
            if (p.category === product.category) return true;
            if (product.collection && p.collection) {
              return product.collection.some((tag) => p.collection.includes(tag));
            }
            return false;
          })
          .slice(0, 4);
        setProducts(relatedProducts);
      } catch (error) {
        console.error("Error loading related products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (product) fetchRelatedProducts();
  }, [product]);

  // Image navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  // Handle checkout methods
  const checkoutWithWhatsapp = () => {
    const message = `Hi, I'm interested in purchasing ${product.name} (SKU: ${product.sku}).`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Share functions
  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out ${product.name} on our store!`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareGeneric = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      const tempInput = document.createElement("input");
      document.body.appendChild(tempInput);
      tempInput.value = window.location.href;
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("Link copied to clipboard!");
    }
  };

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (showFullscreenImage || showEtsyModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFullscreenImage, showEtsyModal]);

  // Product animation variants
  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-48 pb-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <span 
          className="hover:text-primary-dark cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </span> /
        <span 
          className="hover:text-primary-dark cursor-pointer ml-1"
          onClick={() => navigate(`/products?category=${product.category}`)}
        >
          {product.category}
        </span> /
        <span className="text-primary-black ml-1"> {product.name}</span>
      </div>

      {/* Product Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div
            className="relative overflow-hidden bg-background-flashLIght h-96 md:h-[500px] cursor-pointer"
            onClick={() => setShowFullscreenImage(true)}
            ref={imageRef}
          >
            <img
              src={product.images[currentImageIndex]}
              alt={`${product.name}`}
              className="w-full h-full object-contain"
            />

            {/* Navigation buttons */}
            {product.images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-sm shadow-sm hover:bg-background-flashLIght transition-colors text-primary-dark"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <LuChevronLeft size={18} />
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-sm shadow-sm hover:bg-background-flashLIght transition-colors text-primary-dark"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <LuChevronRight size={18} />
                </button>
              </>
            )}

            {/* Out of stock label */}
            {!product.inStock && (
              <div className="absolute top-4 left-4 bg-primary-dark text-white text-xs font-medium px-2 py-1 rounded-sm">
                Out of stock
              </div>
            )}

            {/* Zoom indicator */}
            <div className="absolute bottom-4 right-4 bg-white rounded-sm p-2 shadow-sm flex items-center">
              <LuZoomIn className="text-primary-dark" size={16} />
              <span className="ml-1 text-xs text-gray-600">Click to zoom</span>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 bg-background-flashLIght flex-shrink-0 cursor-pointer border-2 ${
                    currentImageIndex === index ? "border-primary-dark" : "border-transparent"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-medium text-primary-black">
              {product.name}
            </h1>
            <div className="mt-2">
              <span className="text-sm text-gray-600">
                {product.inStock ? (
                  <span className="text-green-600">In Stock</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-2xl font-medium text-primary-dark">
              {product.currency}
              {product.discountPrice.toFixed(2)}
            </span>
            {product.price > product.discountPrice && (
              <span className="ml-2 text-lg text-gray-500 line-through">
                {product.currency}
                {product.price.toFixed(2)}
              </span>
            )}
            {product.price > product.discountPrice && (
              <span className="ml-2 text-xs px-2 py-1 bg-primary-light text-primary-dark rounded-sm">
                Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
              </span>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Shipping Info */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FaShippingFast className="text-primary-dark" />
            <span>
              {product.shippingInfo.freeShipping ? "Free shipping" : "Shipping calculated at checkout"} • 
              {product.shippingInfo.estimatedDelivery} • 
              {product.shippingInfo.returns}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              className="flex-1 bg-button-whatsapp hover:bg-button-hoverWhatsapp text-white py-3 px-4 rounded-sm font-medium flex items-center justify-center transition-colors"
              onClick={checkoutWithWhatsapp}
            >
              <FaWhatsapp className="mr-2 text-lg" />
              Contact via WhatsApp
            </button>
            <button
              className="flex-1 bg-button-etsy hover:bg-button-hoverEtsy text-white py-3 px-4 rounded-sm font-medium flex items-center justify-center transition-colors"
              onClick={() => setShowEtsyModal(true)}
            >
              <FaEtsy className="mr-2 text-lg" />
              Purchase on Etsy
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex border-b">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "description"
                    ? "text-primary-dark border-b-2 border-primary-dark"
                    : "text-gray-500 hover:text-primary-dark"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "specifications"
                    ? "text-primary-dark border-b-2 border-primary-dark"
                    : "text-gray-500 hover:text-primary-dark"
                }`}
                onClick={() => setActiveTab("specifications")}
              >
                Details
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "shipping"
                    ? "text-primary-dark border-b-2 border-primary-dark"
                    : "text-gray-500 hover:text-primary-dark"
                }`}
                onClick={() => setActiveTab("shipping")}
              >
                Shipping
              </button>
            </div>

            <div className="py-4">
              {activeTab === "description" && (
                <div className="prose max-w-none text-gray-700">
                  <p>{product.description}</p>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="space-y-4">
                  <div className="bg-background-flashLIght rounded-sm overflow-hidden">
                    {product.specifications.map((spec, index) => (
                      <div
                        key={index}
                        className={`flex border-b last:border-b-0 border-gray-200 ${
                          index % 2 === 0 ? "bg-background-flashLIght" : "bg-white"
                        }`}
                      >
                        <div className="w-1/3 px-4 py-3 text-sm font-medium text-primary-black">
                          {spec.name}
                        </div>
                        <div className="w-2/3 px-4 py-3 text-sm text-gray-600">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FaShippingFast className="text-primary-dark" />
                    <h3 className="font-medium text-primary-black">
                      Shipping Information
                    </h3>
                  </div>
                  <div className="bg-background-flashLIght p-4 rounded-sm">
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Estimated Delivery:</span>{" "}
                      {product.shippingInfo.estimatedDelivery}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Shipping:</span>{" "}
                      {product.shippingInfo.freeShipping
                        ? "Free shipping"
                        : "Calculated at checkout"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Returns:</span>{" "}
                      {product.shippingInfo.returns}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tags and Share */}
      <div className="mt-8 border-t border-gray-200 pt-6 flex flex-col sm:flex-row sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <FaTag className="text-gray-500 mr-2" />
          <div className="flex flex-wrap gap-2">
            {product.collection.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-background-flashLIght text-gray-600 px-2 py-1 rounded-sm hover:bg-gray-200 cursor-pointer transition-colors"
                onClick={() => navigate(`/products?collection=${tag}`)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Share:</span>
          <div className="flex space-x-2">
            <button 
              className="w-8 h-8 rounded-sm bg-background-flashLIght flex items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={shareOnFacebook}
            >
              <FaFacebook className="text-blue-600" size={14} />
            </button>
            <button 
              className="w-8 h-8 rounded-sm bg-background-flashLIght flex items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={shareOnTwitter}
            >
              <FaTwitter className="text-blue-400" size={14} />
            </button>
            <button 
              className="w-8 h-8 rounded-sm bg-background-flashLIght flex items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={shareGeneric}
            >
              <FaShare className="text-gray-600" size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-xl font-medium text-primary-black mb-6">
          You May Also Like
        </h2>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="aspect-square bg-background-flashLIght rounded-sm"></div>
                <div className="p-4">
                  <div className="h-4 bg-background-flashLIght mb-2 rounded-sm"></div>
                  <div className="h-4 bg-background-flashLIght w-2/3 rounded-sm"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={productVariants}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  navigate(`/product`, { state: { product: relatedProduct } });
                }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredProduct(relatedProduct.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative h-80 overflow-hidden bg-background-flashLIght">
                  <img
                    src={
                      hoveredProduct === relatedProduct.id && relatedProduct.images.length > 1
                        ? relatedProduct.images[1]
                        : relatedProduct.images[0]
                    }
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />

                  {/* Description overlay */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-primary-dark bg-opacity-90 text-white p-3 transition-all duration-300 ${
                      hoveredProduct === relatedProduct.id
                        ? "translate-y-0 opacity-100"
                        : "translate-y-full opacity-0"
                    }`}
                  >
                    <p className="text-xs line-clamp-2">{relatedProduct.description}</p>
                  </div>
                </div>

                <div className="bg-white p-4 h-24 flex flex-col justify-between border border-t-0 border-gray-200">
                  <h3 className="text-sm font-normal line-clamp-2 text-primary-black">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-primary-dark font-medium text-sm">
                      {relatedProduct.currency}
                      {relatedProduct.discountPrice.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{relatedProduct.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No related products found</p>
        )}
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {showFullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90"
          >
            <div className="h-screen w-full flex items-center justify-center p-4">
              <button
                className="absolute top-4 right-4 p-2 bg-white rounded-sm shadow-sm hover:bg-background-flashLIght transition-colors text-primary-dark z-10"
                onClick={() => setShowFullscreenImage(false)}
              >
                <LuX size={24} />
              </button>

              <div className="relative w-full h-full max-w-6xl flex items-center">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain mx-auto"
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-sm shadow-sm hover:bg-background-flashLIght transition-colors text-primary-dark"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                    >
                      <LuChevronLeft size={24} />
                    </button>
                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-sm shadow-sm hover:bg-background-flashLIght transition-colors text-primary-dark"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                    >
                      <LuChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Etsy Modal */}
      <EtsyModal isOpen={showEtsyModal} onClose={() => setShowEtsyModal(false)} />
    </div>
  );
};

export default ProductDetail;