import React, { useState, useRef, useEffect } from 'react';
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const ProductShowcaseSlider = () => {
  // State for products data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Track hovered product
  const [hoveredProduct, setHoveredProduct] = useState(null);
  
  // Slider functionality
  const sliderRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Fetch products from JSON file
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/src/data/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products data');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
        // Set fallback empty array in case of error
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const scrollLeft = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
    }
  };
  
  const scrollRight = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(scrollPosition + scrollAmount);
    }
  };

  // Loading state handler
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <section className="mx-auto px-4 pt-16 relative bg-white text-black">
      {/* Title and subtitle section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold uppercase tracking-wider mb-2 text-black">THE MUST-HAVE OF THE MOMENT</h2>
        <div className="flex items-center justify-center text-lg text-gray-600 space-x-2">
          <span>NEW PRODUCTS</span>
          <span>/</span>
          <span className="text-gray-400">BEST SELLERS</span>
        </div>
      </div>

      {/* Slider navigation buttons - only show if there are products */}
      {products.length > 0 && (
        <>
          <div className="absolute top-1/2 left-0 transform -translate-y-12 z-10">
            <button 
              onClick={scrollLeft}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              aria-label="Previous products"
            >
              <LuChevronLeft size={24} />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-12 z-10">
            <button 
              onClick={scrollRight}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              aria-label="Next products"
            >
              <LuChevronRight size={24} />
            </button>
          </div>
        </>
      )}

      {/* Products slider - adjusted to show 5 cards on desktop */}
      {products.length > 0 ? (
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="relative flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 snap-start"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product image with hover effect */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={hoveredProduct === product.id && product.images.length > 1 ? product.images[1] : product.images[0]} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                {/* Black overlay with description - appears on hover (20% height from bottom) */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-1/5 bg-black bg-opacity-70 flex items-center px-4 text-white transform transition-all duration-300 ease-out ${
                    hoveredProduct === product.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
                >
                  <p className="text-sm line-clamp-2">{product.description}</p>
                </div>
              </div>
              
              {/* Improved product info section - fixed layout */}
              <div className="bg-white p-4 h-24 flex flex-col justify-between">
                <h3 className="text-sm font-medium mb-2 line-clamp-2 h-24 overflow-hidden">{product.title}</h3>
                <p className="text-gray-800 font-semibold mt-auto">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p>No products found. Please check your products data file.</p>
        </div>
      )}
    </section>
  );
};

export default ProductShowcaseSlider;