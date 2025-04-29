import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const ShopByColor = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const collections = [
    {
      name: "BLEU MAJORELLE",
      image: "/images/products/1.jpeg",
      alt: "Blue and white patterned Moroccan tableware",
      slug: "bleu-majorelle"
    },
    {
      name: "BLANC",
      image: "/images/products/2.jpeg",
      alt: "White ceramic tableware with gold trim",
      slug: "blanc"
    },
    {
      name: "MINT",
      image: "/images/products/3.jpeg",
      alt: "Mint green tableware set",
      slug: "mint"
    },
    {
      name: "SAHARA",
      image: "/images/products/4.jpeg",
      alt: "Beige desert-inspired collection",
      slug: "sahara"
    },
    {
      name: "BLEU STONE",
      image: "/images/products/10.jpeg",
      alt: "Blue-gray stone-textured tableware",
      slug: "bleu-stone"
    },
    {
      name: "KAKI",
      image: "/images/products/12.jpeg",
      alt: "Olive green rustic tableware",
      slug: "kaki"
    },
  ];

  const itemsPerPage = 4;
  const maxIndex = Math.max(collections.length - itemsPerPage, 0);

  const scrollToIndex = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.scrollWidth / collections.length;
      sliderRef.current.scrollTo({
        left: itemWidth * activeIndex,
        behavior: "smooth"
      });
    }
  }, [activeIndex, collections.length]);

  // Moroccan-inspired pagination icons
  const PaginationIcon = ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path 
        fill={active ? "#49371B" : "#FFF3DF"} 
        stroke="#49371B"
        strokeWidth="1.5"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
      />
      {active && (
        <circle cx="12" cy="12" r="4" fill="#49371B" />
      )}
    </svg>
  );

  return (
    <>
      <Helmet>
        <title>Shop Tableware by Collection | Handcrafted Collections</title>
        <meta name="description" content="Explore our curated tableware collections in various colors from Bleu Majorelle to Kaki" />
      </Helmet>

      <main className="container mx-auto px-4 pt-12 pb-16 bg-white">
        <section aria-labelledby="shop-by-color-heading">
          <header className="text-center mb-12">
            <h1 id="shop-by-color-heading" className="text-3xl md:text-4xl font-serif font-medium mb-3 text-primary-dark">
              Shop by Collection
            </h1>
            <p className="text-lg text-primary-black opacity-80 font-light">
              Un large choix de couleurs pour créer votre style!
            </p>
          </header>

          <div className="relative">
            {/* Slider container */}
            <div
              ref={sliderRef}
              className="flex overflow-x-auto scroll-smooth gap-6 pb-8 scrollbar-hide"
              role="region"
              aria-label="Color collections"
            >
              {collections.map((collection, index) => (
                <motion.div 
                  key={collection.slug}
                  className="flex-none w-48 md:w-56"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex flex-col items-center">
                    <a
                      href={`/collections/${collection.slug}`}
                      className="block overflow-hidden mb-3 w-full group"
                    >
                      <img
                        src={collection.image}
                        alt={collection.alt}
                        className="w-full h-48 md:h-56 object-cover rounded-sm transition-transform duration-300 group-hover:scale-105"
                        loading={index < 4 ? "eager" : "lazy"}
                      />
                    </a>
                    <a
                      href={`/collections/${collection.slug}`}
                      className="uppercase tracking-wider text-sm font-medium text-primary-dark hover:text-primary-black transition-colors"
                    >
                      {collection.name}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Creative Pagination */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
                  disabled={activeIndex === 0}
                  className="p-2 text-primary-dark disabled:opacity-30"
                  aria-label="Previous"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#49371B">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex items-center gap-1 mx-2">
                  {collections.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToIndex(index)}
                      className="p-1 focus:outline-none"
                      aria-label={`Go to item ${index + 1}`}
                    >
                      <PaginationIcon active={index === activeIndex} />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => scrollToIndex(Math.min(activeIndex + 1, maxIndex))}
                  disabled={activeIndex >= maxIndex}
                  className="p-2 text-primary-dark disabled:opacity-30"
                  aria-label="Next"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#49371B">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ShopByColor;