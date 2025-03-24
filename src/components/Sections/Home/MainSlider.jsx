import React, { useState, useEffect } from "react";

const MainSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      image: "/images/slider/slider1.jpg",
      title: "Mix&match",
      subtitle: "MINIMALIST SCANDINAVE",
      alt: "Minimalist Scandinavian table setting",
    },
    {
      image: "/images/slider/slider2.jpg",
      title: "Home Collection",
      subtitle: "MODERN ELEGANCE",
      alt: "Modern elegant home decor",
    },
    {
      image: "/images/slider/slider3.jpg",
      title: "Artisanal",
      subtitle: "HANDCRAFTED BEAUTY",
      alt: "Handcrafted decorative items",
    },
    {
      image: "/images/slider/slider4.jpg",
      title: "New Arrivals",
      subtitle: "SPRING COLLECTION",
      alt: "Spring collection items",
    },
  ];

  useEffect(() => {
    // Start animation when component mounts or slide changes
    setIsAnimating(true);

    // Reset animation state after animation completes
    const animationTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    return () => clearTimeout(animationTimer);
  }, [currentSlide]);

  useEffect(() => {
    // Auto slide every 5 seconds
    const autoSlideTimer = setInterval(() => {
      const newIndex = (currentSlide + 1) % slides.length;
      setCurrentSlide(newIndex);
    }, 5000);

    return () => clearInterval(autoSlideTimer);
  }, [currentSlide, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAnimating(true);
  };

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % slides.length;
    setCurrentSlide(newIndex);
    setIsAnimating(true);
  };

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    setCurrentSlide(newIndex);
    setIsAnimating(true);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              isAnimating && currentSlide === index ? "animate-fadeIn" : ""
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              animation:
                isAnimating && currentSlide === index
                  ? "fadeIn 1s ease-in-out"
                  : "none",
            }}
          ></div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div
              className={`text-center transform ${
                isAnimating && currentSlide === index
                  ? "animate-slideUp"
                  : "translate-y-0"
              }`}
              style={{
                animation:
                  isAnimating && currentSlide === index
                    ? "slideUp 0.8s ease-out 0.2s forwards"
                    : "none",
              }}
            >
              <h2 className="text-4xl md:text-6xl font-light mb-2">
                {slide.title}
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold mb-8">
                {slide.subtitle}
              </h3>
              <button className="border border-white text-white px-8 py-2 hover:bg-white hover:text-gray-800 transition-colors">
                DISCOVER
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Arrow navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-gray-200"
        aria-label="Previous slide"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-gray-200"
        aria-label="Next slide"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MainSlider;
