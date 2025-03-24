import React, { useState, useEffect, useRef } from "react";
import {
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuZoomIn,
  LuShoppingCart,
} from "react-icons/lu";

// This component will be imported into your ProductsPage component
const ProductQuickViewModal = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
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

    // If modal is open, prevent body scroll
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, product]);

  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Image navigation
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

    // Reset zoom when changing images
    setIsZoomed(false);
  };

  // Handle image zoom on mouse move
  const handleMouseMove = (e) => {
    if (!isZoomed || !imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();

    // Calculate relative position (0 to 1)
    const x = Math.max(0, Math.min(1, (e.clientX - left) / width));
    const y = Math.max(0, Math.min(1, (e.clientY - top) / height));

    setZoomPosition({ x, y });
  };

  // Toggle zoom state
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // If no product or modal is closed, return null
  if (!product || !isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={handleOutsideClick}
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 ease-in-out"
        style={{
          animation: "modal-appear 0.3s ease-out",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1)" : "scale(0.9)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <LuX size={24} />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Image section */}
          <div className="relative w-full md:w-3/5 h-[300px] md:h-[500px] overflow-hidden bg-gray-100">
            {/* Left/Right navigation */}
            {product.images && product.images.length > 1 && (
              <>
                <button
                  onClick={() => navigateImages("prev")}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Previous image"
                >
                  <LuChevronLeft size={20} />
                </button>

                <button
                  onClick={() => navigateImages("next")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Next image"
                >
                  <LuChevronRight size={20} />
                </button>
              </>
            )}

            {/* Zoom button */}
            <button
              onClick={toggleZoom}
              className="absolute bottom-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              <LuZoomIn size={20} />
            </button>

            {/* Out of stock label */}
            {!product.inStock && (
              <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 z-10">
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
                    className={`w-3 h-3 rounded-full ${
                      currentImageIndex === index ? "bg-black" : "bg-gray-300"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product details section */}
          <div className="w-full md:w-2/5 p-6 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="text-xs text-gray-500 mb-2">
                {product.category}
              </div>
              <h2 className="text-xl font-bold mb-4">{product.name}</h2>

              <div className="mb-4 space-y-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {product.currency}
                    {product.discountPrice.toFixed(2)}
                  </span>

                  {product.price > product.discountPrice && (
                    <div className="flex items-baseline gap-3">
                      <span className="text-xl text-gray-500 line-through">
                        {product.currency}
                        {product.price.toFixed(2)}
                      </span>
                      <span className="px-2 py-1 text-sm font-medium bg-red-100 text-red-800 rounded-md">
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

                {product.shipping && (
                  <div className="text-sm text-green-600">
                    Free shipping •
                    <span className="ml-1 text-gray-600">
                      Delivery in 2-4 days
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {product.inStock ? (
                <div className="text-green-600 text-sm mb-6 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                  In Stock
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
              disabled={!product.inStock}
              className={`w-full py-3 px-4 rounded flex items-center justify-center space-x-2 ${
                product.inStock
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } transition-colors`}
            >
              <LuShoppingCart size={20} />
              <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;
