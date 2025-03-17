import React, { useState, useRef } from "react";
import {
  FaHeart,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaEtsy,
  FaPlus,
  FaMinus,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaShare,
  FaTag,
  FaShippingFast,
  FaStar,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const ProductDetail = () => {
  // Product data - in a real app, this would come from an API or props
  const product = {
    id: 1,
    name: "Handcrafted Wooden Side Table",
    description:
      "A beautiful handcrafted wooden side table made from sustainable oak. Perfect for any living room or bedroom decor.",
    price: 129.99,
    discountPrice: 99.99,
    currency: "$",
    rating: 4.8,
    reviewCount: 124,
    stock: 7,
    sku: "WOOD-TABLE-001",
    category: "Furniture",
    tags: ["handmade", "sustainable", "oak", "furniture"],
    images: [
      "/images/products/12.jpeg",
      "/images/products/10.jpeg",
      "/images/products/14.jpeg",
      "/images/products/13.jpeg",
    ],
    specifications: [
      { name: "Dimensions", value: 'H: 24" x W: 18" x D: 18"' },
      { name: "Weight", value: "15 lbs" },
      { name: "Material", value: "Solid Oak" },
      { name: "Finish", value: "Natural Wax" },
      { name: "Assembly", value: "Minimal assembly required" },
    ],
    sellerInfo: {
      name: "Artisan Woodworks",
      rating: 4.9,
      responseTime: "Within 24 hours",
      isVerified: true,
    },
    shippingInfo: {
      freeShipping: true,
      estimatedDelivery: "3-5 business days",
      returns: "30-day returns",
    },
  };

  // State for image slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("description");
  const [favorite, setFavorite] = useState(false);

  // Refs
  const imageRef = useRef(null);
  const zoomRef = useRef(null);

  // Handle image navigation
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

  // Handle zoom effects
  const handleImageClick = () => {
    setShowZoom(!showZoom);
  };

  const handleMouseMove = (e) => {
    if (!showZoom || !imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const handleZoomLeave = () => {
    setShowZoom(false);
  };

  // Handle quantity change
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Handle checkout methods
  const checkoutWithWhatsapp = () => {
    const message = `Hi, I'm interested in purchasing ${product.name} (SKU: ${
      product.sku
    }). Quantity: ${quantity}. Total: ${(
      product.discountPrice * quantity
    ).toFixed(2)}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const checkoutWithEtsy = () => {
    // This would redirect to Etsy or open a modal with Etsy checkout
    alert("Redirecting to Etsy checkout...");
  };

  // Toggle favorite
  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-40 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <span className="hover:text-primary-light cursor-pointer">Home</span> /
        <span className="hover:text-primary-light cursor-pointer">
          {" "}
          {product.category}
        </span>{" "}
        /<span className="text-gray-800"> {product.name}</span>
      </div>

      {/* Product Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image with Zoom */}
          <div
            className="relative overflow-hidden rounded-lg bg-gray-100 h-64 sm:h-80 md:h-96 cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleZoomLeave}
            onClick={handleImageClick}
            ref={imageRef}
          >
            <img
              src={product.images[currentImageIndex]}
              alt={`${product.name} - View ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
            />

            {/* Zoom overlay */}
            {showZoom && (
              <div className="absolute inset-0 bg-white z-10" ref={zoomRef}>
                <img
                  src={product.images[currentImageIndex]}
                  alt={`${product.name} - View ${currentImageIndex + 1} zoomed`}
                  className="w-full h-full object-none"
                  style={{
                    objectPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transform: "scale(2)",
                  }}
                />
                <button
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowZoom(false);
                  }}
                >
                  <FaSearch className="text-gray-800" />
                </button>
              </div>
            )}

            {/* Navigation buttons */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <FaChevronLeft className="text-gray-800" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <FaChevronRight className="text-gray-800" />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`rounded-md w-20 h-20 bg-gray-100 flex-shrink-0 cursor-pointer border-2 ${
                  currentImageIndex === index
                    ? "border-primary-light"
                    : "border-transparent"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-contain p-1"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {product.name}
            </h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-600">
                {product.stock > 0 ? (
                  <span className="text-green-600">
                    In Stock ({product.stock} left)
                  </span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-3xl font-bold text-gray-800">
              {product.currency}
              {product.discountPrice.toFixed(2)}
            </span>
            {product.price > product.discountPrice && (
              <span className="ml-2 text-xl text-gray-500 line-through">
                {product.currency}
                {product.price.toFixed(2)}
              </span>
            )}
            {product.price > product.discountPrice && (
              <span className="ml-2 text-sm px-2 py-1 bg-red-100 text-red-800 rounded-md">
                Save{" "}
                {Math.round(
                  ((product.price - product.discountPrice) / product.price) *
                    100
                )}
                %
              </span>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Seller Info */}
          <div className="flex items-center space-x-2 border-t border-gray-200 pt-4">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium text-gray-800">
                  {product.sellerInfo.name}
                </h3>
                {product.sellerInfo.isVerified && (
                  <MdVerified className="text-blue-500 ml-1" />
                )}
              </div>
              <p className="text-sm text-gray-600">
                Responds {product.sellerInfo.responseTime}
              </p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 border-t border-gray-200 pt-4">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex items-center">
              <button
                className="w-8 h-8 rounded-l border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <FaMinus className="text-gray-600 text-xs" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(
                      1,
                      Math.min(product.stock, parseInt(e.target.value) || 1)
                    )
                  )
                }
                className="w-12 h-8 border-t border-b border-gray-300 text-center"
              />
              <button
                className="w-8 h-8 rounded-r border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
              >
                <FaPlus className="text-gray-600 text-xs" />
              </button>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FaShippingFast />
            <span>
              {product.shippingInfo.freeShipping
                ? "Free shipping"
                : "Shipping calculated at checkout"}{" "}
              •{product.shippingInfo.estimatedDelivery} •
              {product.shippingInfo.returns}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              className="flex-1 bg-primary-light hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
              onClick={checkoutWithWhatsapp}
            >
              <FaWhatsapp className="mr-2" />
              Buy with WhatsApp
            </button>
            <button
              className="flex-1 bg-white border border-primary-light text-primary-light hover:bg-indigo-50 py-3 px-4 rounded-lg font-medium flex items-center justify-center"
              onClick={checkoutWithEtsy}
            >
              <FaEtsy className="mr-2" />
              Buy on Etsy
            </button>
            <button
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                favorite
                  ? "bg-red-100 text-red-500"
                  : "bg-gray-100 text-gray-500"
              } hover:bg-gray-200`}
              onClick={toggleFavorite}
            >
              <FaHeart className={favorite ? "text-red-500" : ""} />
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex border-b">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "description"
                    ? "text-primary-light border-b-2 border-primary-light"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "specifications"
                    ? "text-primary-light border-b-2 border-primary-light"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("specifications")}
              >
                Specifications
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "shipping"
                    ? "text-primary-light border-b-2 border-primary-light"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("shipping")}
              >
                Shipping
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "reviews"
                    ? "text-primary-light border-b-2 border-primary-light"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>

            <div className="py-4">
              {activeTab === "description" && (
                <div className="prose max-w-none text-gray-700">
                  <p>{product.description}</p>
                  <p>
                    This handcrafted wooden side table adds a touch of warmth
                    and natural beauty to any space. Each piece is meticulously
                    crafted by skilled artisans, ensuring unique character and
                    exceptional quality.
                  </p>
                  <p>
                    The sustainable oak used in this piece is sourced from
                    responsibly managed forests, making it an environmentally
                    conscious choice for your home. The natural wax finish not
                    only enhances the wood's natural grain but also provides
                    protection while maintaining its organic appeal.
                  </p>
                  <p>
                    Versatile in design, this side table works beautifully in
                    both traditional and contemporary settings. It's perfect as
                    a nightstand, end table, or accent piece in your living
                    room, bedroom, or office.
                  </p>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800">
                    Product Specifications
                  </h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    {product.specifications.map((spec, index) => (
                      <div
                        key={index}
                        className={`flex border-b last:border-b-0 border-gray-200 ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <div className="w-1/3 px-4 py-3 text-sm font-medium text-gray-700">
                          {spec.name}
                        </div>
                        <div className="w-2/3 px-4 py-3 text-sm text-gray-600">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Care Instructions
                    </h3>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      <li>Dust regularly with a soft, dry cloth</li>
                      <li>Avoid direct sunlight to prevent fading</li>
                      <li>
                        Clean spills immediately with a slightly damp cloth
                      </li>
                      <li>
                        Use coasters to prevent water rings and heat damage
                      </li>
                      <li>Re-wax every 6-12 months to maintain finish</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FaShippingFast className="text-primary-light" />
                    <h3 className="font-medium text-gray-800">
                      Shipping Information
                    </h3>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
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
                  <div className="pt-2">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Return Policy
                    </h3>
                    <p className="text-sm text-gray-600">
                      We want you to be completely satisfied with your purchase.
                      If for any reason you're not happy with your item, you can
                      return it within 30 days of delivery for a full refund or
                      exchange.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Items must be in original condition and packaging. Please
                      note that custom or personalized items cannot be returned
                      unless they arrive damaged or defective.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-gray-800">
                        {product.rating}
                      </div>
                      <div className="flex space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < Math.floor(product.rating)
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }
                            size={14}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {product.reviewCount} reviews
                      </div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const percentage = Math.round(
                          star === 5
                            ? 70
                            : star === 4
                            ? 20
                            : star === 3
                            ? 5
                            : star === 2
                            ? 3
                            : 2
                        );
                        return (
                          <div
                            key={star}
                            className="flex items-center space-x-2"
                          >
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-600">
                                {star}
                              </span>
                              <FaStar className="text-yellow-500" size={10} />
                            </div>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-500 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {percentage}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <button className="bg-primary-light hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium w-full">
                    Write a Review
                  </button>

                  {/* Sample reviews */}
                  <div className="space-y-4 pt-4">
                    <h3 className="font-medium text-gray-800">
                      Customer Reviews
                    </h3>

                    {/* Review 1 */}
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                          <span className="font-medium text-gray-800">
                            Sarah M.
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          2 weeks ago
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < 5 ? "text-yellow-500" : "text-gray-300"
                            }
                            size={12}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Absolutely love this table! The craftsmanship is
                        impeccable and it looks even better in person. Delivery
                        was fast and the packaging was very secure. Would
                        definitely recommend!
                      </p>
                    </div>

                    {/* Review 2 */}
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                          <span className="font-medium text-gray-800">
                            Michael T.
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          1 month ago
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < 4 ? "text-yellow-500" : "text-gray-300"
                            }
                            size={12}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Great quality table, but assembly was a bit tricky. The
                        instructions could be clearer. Once assembled though,
                        it's sturdy and looks fantastic in my living room.
                      </p>
                    </div>

                    <button className="text-primary-light hover:text-indigo-700 font-medium text-sm flex items-center">
                      See all {product.reviewCount} reviews
                      <FaChevronRight className="ml-1" size={12} />
                    </button>
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
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Share:</span>
          <div className="flex space-x-2">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <FaFacebook className="text-blue-600" size={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <FaTwitter className="text-blue-400" size={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <FaShare className="text-gray-600" size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-w-1 aspect-h-1 bg-gray-100">
                <img
                  src="/api/placeholder/300/300"
                  alt="Related product"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800 truncate">
                  Wooden Coffee Table
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-gray-800">
                    $89.99
                  </span>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500" size={12} />
                    <span className="text-xs text-gray-500 ml-1">4.7</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="mt-12 pb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recently Viewed
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-w-1 aspect-h-1 bg-gray-100">
                <img
                  src="/api/placeholder/300/300"
                  alt="Recently viewed product"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800 truncate">
                  Wooden Dining Chair
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-gray-800">
                    $59.99
                  </span>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500" size={12} />
                    <span className="text-xs text-gray-500 ml-1">4.5</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
