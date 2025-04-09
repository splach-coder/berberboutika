import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const ShopByColor = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const sliderRef = useRef(null);
  const collections = [
    {
      name: "BLEU MAJORELLE",
      image: "/images/products/1.jpeg",
      webp: "",
      alt: "Blue and white patterned Moroccan tableware set with intricate Majorelle blue designs",
      slug: "bleu-majorelle"
    },
    {
      name: "BLANC",
      image: "/images/products/2.jpeg",
      webp: "",
      alt: "Elegant white ceramic tableware set with minimalist gold trim detailing",
      slug: "blanc"
    },
    {
      name: "MINT",
      image: "/images/products/3.jpeg",
      webp: "",
      alt: "Fresh mint green tableware set with smooth matte finish",
      slug: "mint"
    },
    {
      name: "SAHARA",
      image: "/images/products/4.jpeg",
      webp: "",
      alt: "Warm beige tableware collection inspired by desert tones",
      slug: "sahara"
    },
    {
      name: "BLEU STONE",
      image: "/images/products/10.jpeg",
      webp: "",
      alt: "Deep blue and gray stone-textured tableware with marbled patterns",
      slug: "bleu-stone"
    },
    {
      name: "KAKI",
      image: "/images/products/12.jpeg",
      webp: "",
      alt: "Rich olive green tableware set with rustic finish",
      slug: "kaki"
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

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const pageTitle = "Shop Tableware by Color | Handcrafted Collections";
  const pageDescription = "Explore our curated tableware collections in various colors from Bleu Majorelle to Kaki. Create your unique dining experience with our handcrafted ceramic pieces.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="tableware, ceramic, dinnerware, color collections, handcrafted, kitchen accessories" />

        {/* Open Graph tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="/images/products/1.jpeg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/shop-by-color" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/images/products/1.jpeg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://yourdomain.com/shop-by-color" />
      </Helmet>

      <main className="container mx-auto px-4 pt-12 text-black">
        <section aria-labelledby="shop-by-color-heading">
          {/* Header */}
          <header className="text-center mb-10">
            <h1 id="shop-by-color-heading" className="text-4xl font-serif font-medium mb-3">Shop by Color</h1>
            <p className="text-lg text-gray-700 font-light italic">
              Un large choix de couleurs pour créer votre style!
            </p>
          </header>

          {/* Collections slider with navigation */}
          <motion.div
            className="relative"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Navigation buttons - only visible on desktop and when hovered */}
            <motion.button
              onClick={scrollPrev}
              disabled={activeIndex === 0}
              className={`absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md transition-opacity duration-300 hidden md:block ${
                activeIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-opacity-100"
              } ${showControls ? "opacity-100" : "opacity-0"}`}
              aria-label="View previous collection"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/svgs/arrow-left.svg"
                alt="Previous"
                width="24"
                height="24"
              />
            </motion.button>

            <motion.button
              onClick={scrollNext}
              disabled={activeIndex >= maxIndex}
              className={`absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md transition-opacity duration-300 hidden md:block ${
                activeIndex >= maxIndex
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-opacity-100"
              } ${showControls ? "opacity-100" : "opacity-0"}`}
              aria-label="View next collection"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/svgs/arrow-right.svg" alt="Next" width="24" height="24" />
            </motion.button>

            {/* Slider container - scrollable on mobile */}
            <div
              ref={sliderRef}
              className="flex overflow-x-auto md:overflow-x-hidden scroll-smooth gap-4 py-4 scrollbar-hide"
              role="region"
              aria-label="Tableware collections by color"
            >
              {collections.map((collection, index) => (
                <motion.div 
                  key={collection.slug} 
                  className="flex-none w-56"
                  variants={itemVariants}
                >
                  <div className="flex flex-col items-center mb-2 group">
                    <div className="overflow-hidden mb-3 cursor-pointer">
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.05, rotate: -3, x: -5, y: 2 }}
                        transition={{ duration: 0.4 }}
                      >
                        <picture>
                          <source srcSet={collection.webp} type="image/webp" />
                          <img
                            src={collection.image}
                            alt={collection.alt}
                            className="w-56 h-56 object-cover"
                            loading={index < 3 ? "eager" : "lazy"}
                            width="224"
                            height="224"
                          />
                        </picture>
                      </motion.div>
                    </div>
                    <a
                      href={`/collections/${collection.slug}`}
                      className="uppercase tracking-wider text-sm font-medium hover:underline transition-all duration-300"
                      aria-label={`View ${collection.name} collection`}
                    >
                      {collection.name}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default ShopByColor;