import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // For managing meta tags

const MainSlider = ({ pageTitle = "Home Decor Collection", pageDescription = "Discover our curated collection of Moroccan-inspired home decor, from Zellige tiles to Berber textiles" }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const autoSlideTimerRef = useRef(null);
  const imageObserverRef = useRef(null);

  const slides = [
    {
      image: "/images/slider/slider1.jpeg",
      webp: "", // WebP version for modern browsers
      title: "New Products",
      subtitle: "LATEST FINDS",
      alt: "Newly released home decor products featuring artisanal crafts",
      link: "/products?collection=new-products",
      width: 1920,
      height: 1080,
    },
    {
      image: "/images/slider/slider2.jpeg",
      webp: "",
      title: "Zellige & Ceramics",
      subtitle: "MOROCCAN INSPIRED",
      alt: "Handcrafted Zellige tiles and traditional Moroccan ceramics",
      link: "/products?collection=zellige-ceramics",
      width: 1920,
      height: 1080,
    },
    {
      image: "/images/slider/slider3.jpeg",
      webp: "",
      title: "Berber Textiles",
      subtitle: "HERITAGE WOVEN IN",
      alt: "Traditional Berber woven textiles with authentic patterns",
      link: "/products?collection=berber-textiles",
      width: 1920,
      height: 1080,
    },
    {
      image: "/images/slider/slider4.jpeg",
      webp: "",
      title: "Kitchen Essentials",
      subtitle: "STYLE MEETS FUNCTION",
      alt: "Moroccan-inspired essential kitchen tools and decorative items",
      link: "/products?collection=kitchen-essentials",
      width: 1920,
      height: 1080,
    },
    {
      image: "/images/slider/slider5.jpeg",
      webp: "",
      title: "Salon Sanctuary",
      subtitle: "CHILL ZONE VIBES",
      alt: "Relaxing salon space with cozy Moroccan decor and furnishings",
      link: "/products?collection=salon-sanctuary",
      width: 1920,
      height: 1080,
    },
  ];
  
  // Current slide data for social media sharing
  const currentSlideData = slides[currentSlide];
  
  // Set up Intersection Observer for lazy loading
  useEffect(() => {
    if ('IntersectionObserver' in window) {
      imageObserverRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            const slideIndex = parseInt(lazyImage.dataset.index, 10);
            
            // Start loading the image
            const img = new Image();
            img.src = slides[slideIndex].image;
            img.onload = () => {
              setImagesLoaded(prev => ({
                ...prev,
                [slideIndex]: true
              }));
            };
            
            // Stop observing once we start loading
            imageObserverRef.current.unobserve(lazyImage);
          }
        });
      });
    }
    
    return () => {
      if (imageObserverRef.current) {
        imageObserverRef.current.disconnect();
      }
    };
  }, [slides]);

  // Preload current and next slide images
  useEffect(() => {
    // Always load current slide
    if (!imagesLoaded[currentSlide]) {
      const img = new Image();
      img.src = slides[currentSlide].image;
      img.onload = () => {
        setImagesLoaded(prev => ({
          ...prev,
          [currentSlide]: true
        }));
      };
    }
    
    // Preload next slide
    const nextSlideIndex = (currentSlide + 1) % slides.length;
    if (!imagesLoaded[nextSlideIndex]) {
      const img = new Image();
      img.src = slides[nextSlideIndex].image;
      img.onload = () => {
        setImagesLoaded(prev => ({
          ...prev,
          [nextSlideIndex]: true
        }));
      };
    }
  }, [currentSlide, imagesLoaded, slides]);

  useEffect(() => {
    // Animation effect when slide changes
    setIsAnimating(true);
    const animationTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    return () => clearTimeout(animationTimer);
  }, [currentSlide]);

  useEffect(() => {
    // Auto slide with cleanup using ref to prevent memory leaks
    autoSlideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
      }
    };
  }, [slides.length]);

  // Pause auto-rotation when user interacts with slider
  const pauseAutoSlide = () => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
      
      // Resume after some inactivity
      autoSlideTimerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
  };

  const goToSlide = (index) => {
    pauseAutoSlide();
    setCurrentSlide(index);
    setIsAnimating(true);
  };

  const nextSlide = () => {
    pauseAutoSlide();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAnimating(true);
  };

  const prevSlide = () => {
    pauseAutoSlide();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAnimating(true);
  };

  const handleDiscoverClick = (link) => {
    navigate(link);
  };

  // Reference for each slide container to observe
  const slideRefs = useRef([]);

  // Effect to observe slide elements for lazy loading
  useEffect(() => {
    if (imageObserverRef.current && slideRefs.current.length > 0) {
      slideRefs.current.forEach((el, index) => {
        if (el && !imagesLoaded[index] && index !== currentSlide && index !== (currentSlide + 1) % slides.length) {
          imageObserverRef.current.observe(el);
        }
      });
    }
    
    return () => {
      if (imageObserverRef.current) {
        slideRefs.current.forEach(el => {
          if (el) imageObserverRef.current.unobserve(el);
        });
      }
    };
  }, [currentSlide, imagesLoaded, slides.length]);

  // Generate structured data for the slider
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": slides.map((slide, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://yourdomain.com${slide.link}`,
      "name": slide.title,
      "description": slide.subtitle
    }))
  };

  return (
    <>
      <Helmet>
        <title>{`${currentSlideData.title} | ${pageTitle}`}</title>
        <meta name="description" content={`${currentSlideData.title} - ${currentSlideData.subtitle}. ${pageDescription}`} />
        
        {/* Canonical Link */}
        <link rel="canonical" href={`https://yourdomain.com${currentSlideData.link}`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={`${currentSlideData.title} | ${pageTitle}`} />
        <meta property="og:description" content={`${currentSlideData.title} - ${currentSlideData.subtitle}. ${pageDescription}`} />
        <meta property="og:image" content={`https://yourdomain.com${currentSlideData.image}`} />
        <meta property="og:url" content={`https://yourdomain.com${currentSlideData.link}`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${currentSlideData.title} | ${pageTitle}`} />
        <meta name="twitter:description" content={`${currentSlideData.title} - ${currentSlideData.subtitle}. ${pageDescription}`} />
        <meta name="twitter:image" content={`https://yourdomain.com${currentSlideData.image}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Preload critical images */}
        <link rel="preload" href={slides[currentSlide].image} as="image" />
        {slides[currentSlide].webp && (
          <link rel="preload" href={slides[currentSlide].webp} as="image" type="image/webp" />
        )}
      </Helmet>

      <section className="relative h-screen w-full overflow-hidden" aria-label="Featured Collections">
        {/* Slides */}
        {slides.map((slide, index) => {
          const isCurrentSlide = currentSlide === index;
          const isNextSlide = (currentSlide + 1) % slides.length === index;
          
          return (
            <article
              key={index}
              ref={el => slideRefs.current[index] = el}
              data-index={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                isCurrentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              aria-hidden={!isCurrentSlide}
            >
              {/* Background Image with picture element for WebP support */}
              <div className="absolute inset-0">
                <picture>
                  {slide.webp && (
                    <source
                      srcSet={isCurrentSlide || isNextSlide || imagesLoaded[index] ? slide.webp : ''}
                      type="image/webp"
                    />
                  )}
                  <img
                    src={isCurrentSlide || isNextSlide || imagesLoaded[index] ? slide.image : ''}
                    alt={slide.alt}
                    className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
                      isAnimating && isCurrentSlide ? "animate-fadeIn" : ""
                    }`}
                    loading={index <= 1 ? "eager" : "lazy"}
                    width={slide.width}
                    height={slide.height}
                  />
                </picture>
                <noscript>
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    width={slide.width}
                    height={slide.height}
                  />
                </noscript>
              </div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div
                  className={`text-center transform ${
                    isAnimating && isCurrentSlide
                      ? "animate-slideUp"
                      : "translate-y-0"
                  }`}
                >
                  <h2 className="text-4xl md:text-6xl font-light mb-2">
                    {slide.title}
                  </h2>
                  <h3 className="text-3xl md:text-5xl font-bold mb-8">
                    {slide.subtitle}
                  </h3>
                  <button 
                    className="border border-white text-white px-8 py-2 hover:bg-white hover:text-gray-800 transition-colors"
                    onClick={() => handleDiscoverClick(slide.link)}
                    aria-label={`Discover ${slide.title} collection`}
                  >
                    DISCOVER
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {/* Navigation dots */}
        <nav className="absolute bottom-8 left-0 right-0 z-20" aria-label="Slide navigation">
          <div className="flex justify-center space-x-2">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? "bg-white" : "bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                aria-current={currentSlide === index ? "true" : "false"}
              ></button>
            ))}
          </div>
        </nav>

        {/* Arrow navigation */}
        <div className="hidden absolute inset-x-0 top-1/2 sm:flex justify-between items-center px-4 z-20">
          <button
            onClick={prevSlide}
            className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-2"
            aria-label="Previous slide"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
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
            className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-2"
            aria-label="Next slide"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>

        {/* CSS for custom animations - using external CSS file would be better for production */}
        <style>{`
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
      </section>
    </>
  );
};

export default MainSlider;