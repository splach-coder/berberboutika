import React, { useState, useEffect, useRef } from "react";
import {
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuZoomIn,
  LuShoppingCart,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProductQuickViewModal = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const modalRef = useRef(null);

  // Handle keyboard navigation and close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          navigateImages("prev");
          break;
        case "ArrowRight":
          navigateImages("next");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, product]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const navigateImages = (direction) => {
    if (!product || !product.images || product.images.length <= 1) return;

    if (direction === "next") {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed || !imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();

    const x = Math.max(0, Math.min(1, (e.clientX - left) / width));
    const y = Math.max(0, Math.min(1, (e.clientY - top) / height));

    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!product || !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={handleOutsideClick}
          style={{ backdropFilter: "blur(5px)" }}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-lg"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-sm hover:bg-background-flashLIght transition-colors text-primary-dark"
              aria-label="Close modal"
            >
              <LuX size={20} />
            </button>

            <div className="flex flex-col md:flex-row h-full">
              {/* Image section */}
              <div className="relative w-full md:w-3/5 h-[300px] md:h-[500px] overflow-hidden bg-background-flashLIght">
                {/* Left/Right navigation */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateImages("prev")}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-sm hover:bg-background-flashLIght transition-colors text-primary-dark"
                      aria-label="Previous image"
                    >
                      <LuChevronLeft size={18} />
                    </button>

                    <button
                      onClick={() => navigateImages("next")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-sm hover:bg-background-flashLIght transition-colors text-primary-dark"
                      aria-label="Next image"
                    >
                      <LuChevronRight size={18} />
                    </button>
                  </>
                )}

                {/* Zoom button */}
                <button
                  onClick={toggleZoom}
                  className="absolute bottom-4 right-4 z-10 bg-white rounded-full p-2 shadow-sm hover:bg-background-flashLIght transition-colors text-primary-dark"
                  aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                >
                  <LuZoomIn size={18} />
                </button>

                {/* Out of stock label */}
                {!product.inStock && (
                  <div className="absolute top-4 left-4 bg-primary-dark text-white text-xs font-medium px-2 py-1 z-10 rounded">
                    OUT OF STOCK
                  </div>
                )}

                {/* Main image */}
                <div
                  ref={imageRef}
                  className="w-full h-full relative cursor-zoom-in"
                  onClick={toggleZoom}
                  onMouseMove={handleMouseMove}
                  style={{
                    overflow: isZoomed ? "hidden" : "visible",
                  }}
                >
                  <img
                    src={
                      product.images?.[currentImageIndex] ||
                      "/api/placeholder/500/500"
                    }
                    alt={product.name}
                    className={`w-full h-full object-contain transition-transform duration-200 ${
                      isZoomed ? "scale-150" : "scale-100"
                    }`}
                    style={{
                      transformOrigin: isZoomed
                        ? `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`
                        : "center center",
                    }}
                  />
                </div>

                {/* Image thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          currentImageIndex === index
                            ? "bg-primary-dark"
                            : "bg-gray-300"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product details section */}
              <div className="w-full md:w-2/5 p-6 flex flex-col border-l border-gray-100">
                <div className="flex-1 overflow-y-auto">
                  <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                    {product.category}
                  </div>
                  <h2 className="text-xl font-medium mb-4 text-primary-black">
                    {product.name}
                  </h2>

                  <div className="mb-4 space-y-2">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-2xl font-medium text-primary-dark">
                        {product.currency}
                        {product.discountPrice.toFixed(2)}
                      </span>

                      {product.price > product.discountPrice && (
                        <div className="flex items-baseline gap-3">
                          <span className="text-lg text-gray-500 line-through">
                            {product.currency}
                            {product.price.toFixed(2)}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium bg-primary-light text-primary-dark rounded-md">
                            Save{" "}
                            {Math.round(
                              ((product.price - product.discountPrice) /
                                product.price) *
                                100
                            )}
                            %
                          </span>
                        </div>
                      )}
                    </div>

                    {product.shippingInfo?.freeShipping && (
                      <div className="text-sm text-green-600">
                        <span className="text-primary-dark">Free shipping</span> •{" "}
                        <span className="text-gray-500">
                          {product.shippingInfo.estimatedDelivery}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-primary-black">
                      Description
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Specifications */}
                  {product.specifications && (
                    <div className="mb-6">
                      <h3 className="font-medium mb-2 text-primary-black">
                        Details
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {product.specifications.map((spec, index) => (
                          <li key={index} className="flex">
                            <span className="font-medium text-primary-black w-24 flex-shrink-0">
                              {spec.name}:
                            </span>
                            <span>{spec.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.inStock ? (
                    <div className="text-green-600 text-sm mb-6 flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                      In Stock ({product.stock} available)
                    </div>
                  ) : (
                    <div className="text-red-600 text-sm mb-6 flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-600 mr-2"></span>
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Add to cart button */}
                <button
                  onClick={() => {
                    navigate(`/product`, {
                      state: { product },
                    });
                    onClose();
                  }}
                  disabled={!product.inStock}
                  className={`w-full py-3 px-4 rounded flex items-center justify-center space-x-2 transition-colors ${
                    product.inStock
                      ? "bg-primary-dark text-white hover:bg-button-darkHover"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <LuShoppingCart size={18} />
                  <span>{product.inStock ? "View Full Details" : "Out of Stock"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductQuickViewModal;