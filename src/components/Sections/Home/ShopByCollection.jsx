import React, { useState, useRef, useEffect } from "react";

const ShopByColor = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const sliderRef = useRef(null);
  const collections = [
    {
      name: "BLEU MAJORELLE",
      image: "/images/products/1.jpeg",
      alt: "Blue and white patterned tableware set",
    },
    {
      name: "BLANC",
      image: "/images/products/2.jpeg",
      alt: "White tableware set with gold trim",
    },
    {
      name: "MINT",
      image: "/images/products/3.jpeg",
      alt: "Light green tableware set",
    },
    {
      name: "SAHARA",
      image: "/images/products/4.jpeg",
      alt: "Beige tableware set",
    },
    {
      name: "BLEU STONE",
      image: "/images/products/10.jpeg",
      alt: "Blue and gray patterned tableware set",
    },
    {
      name: "KAKI",
      image: "/images/products/12.jpeg",
      alt: "Olive green tableware set",
    },
  ];

  const visibleItems = 5;
  const maxIndex = collections.length - visibleItems;

  const scrollNext = () => {
    if (activeIndex < maxIndex) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const scrollPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      const scrollAmount =
        (sliderRef.current.scrollWidth / collections.length) * activeIndex;
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [activeIndex, collections.length]);

  return (
    <div className="container mx-auto px-4 pt-12 text-black">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-medium mb-3">Shop by Color</h1>
        <p className="text-lg text-gray-700 font-light italic">
          Un large choix de couleurs pour créer votre style!
        </p>
      </div>

      {/* Collections slider with navigation */}
      <div
        className="relative"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Navigation buttons - only visible on desktop and when hovered */}
        <button
          onClick={scrollPrev}
          disabled={activeIndex === 0}
          className={`absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md transition-opacity duration-300 hidden md:block ${
            activeIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-opacity-100"
          } ${showControls ? "opacity-100" : "opacity-0"}`}
          aria-label="Previous"
        >
          <img
            src="/svgs/arrow-left.svg"
            alt="Previous"
            width="24"
            height="24"
          />
        </button>

        <button
          onClick={scrollNext}
          disabled={activeIndex >= maxIndex}
          className={`absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md transition-opacity duration-300 hidden md:block ${
            activeIndex >= maxIndex
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-opacity-100"
          } ${showControls ? "opacity-100" : "opacity-0"}`}
          aria-label="Next"
        >
          <img src="/svgs/arrow-right.svg" alt="Next" width="24" height="24" />
        </button>

        {/* Slider container - scrollable on mobile */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto md:overflow-x-hidden scroll-smooth gap-4 py-4 scrollbar-hide"
        >
          {collections.map((collection, index) => (
            <div key={index} className="flex-none w-56">
              <div className="flex flex-col items-center mb-2 group">
                <div className="overflow-hidden mb-3 cursor-pointer">
                  <div className="relative">
                    <img
                      src={collection.image}
                      alt={collection.alt}
                      className="w-56 h-56 object-cover transform transition-all duration-700 ease-in-out group-hover:-rotate-3 group-hover:scale-110 group-hover:-translate-x-2 group-hover:translate-y-1"
                    />
                  </div>
                </div>
                <a
                  href="#"
                  className="uppercase tracking-wider text-sm font-medium hover:underline transition-all duration-300"
                >
                  {collection.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByColor;
