import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

const AsymmetricalProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();
  
  // SEO metadata with Moroccan cultural focus
  const pageTitle = "Moroccan Treasures | Handcrafted Poetry & Traditional Artifacts";
  const pageDescription = "Discover authentic Moroccan poetry books, handcrafted artifacts, and traditional treasures that embody centuries of rich cultural heritage.";

  const navigateToProductPage = (product) => {
    navigate(`/product`, { state: { product } });
  };

  const openQuickView = (product, e) => {
    e.stopPropagation();
    // Add your quick view logic here
    console.log("Quick view for:", product.name);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/src/data/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return (
    <main className="min-h-screen flex items-center justify-center bg-background-light">
      <div className="text-2xl font-moroccan text-primary-dark flex items-center">
        <svg className="animate-spin h-8 w-8 mr-3 text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Discovering Moroccan Treasures...
      </div>
    </main>
  );
  
  if (error) return (
    <main className="min-h-screen flex items-center justify-center bg-background-light">
      <div className="text-xl font-moroccan text-rose-800 p-8 border-l-4 border-rose-600 bg-white shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-center">Error loading treasures: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-sm hover:bg-rose-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </main>
  );
  
  if (!products.length) return (
    <main className="min-h-screen flex items-center justify-center bg-primary-light">
      <div className="text-xl font-moroccan text-primary-dark p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p>Our treasure chest appears empty at the moment.</p>
        <p>Please check back later for exquisite Moroccan finds.</p>
      </div>
    </main>
  );

  // Product animation variants
  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="Moroccan poetry, traditional artifacts, Arabic calligraphy, Berber crafts, cultural heritage" />
        
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/products" />
        <meta property="og:image" content="https://yourwebsite.com/images/moroccan-treasures-showcase.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://yourwebsite.com/images/moroccan-treasures-showcase.jpg" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "${products[0]?.name || 'Moroccan Treasures'}",
                  "url": "https://yourwebsite.com/products/${products[0]?.id || 'featured'}"
                }
              ]
            }
          `}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background-light">
        {/* Moroccan-inspired header */}
        <header className="relative overflow-hidden bg-gradient-to-b from-primary-light to-background-light py-16 px-4 md:px-8">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')"
          }}></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.h1 
              className="text-4xl md:text-5xl font-moroccan text-primary-dark mb-6 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Treasures of Morocco
            </motion.h1>
            <motion.p 
              className="text-xl text-primary-dark text-center max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Discover centuries of poetic wisdom and artisanal mastery in our curated collection
            </motion.p>
          </div>
        </header>

        {/* Featured Products Section with Swiper */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="mb-16">
            <h2 className="text-3xl font-moroccan text-primary-dark mb-8 text-center">Featured Collection</h2>
            
            <Swiper
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5 }
              }}
              className="product-swiper"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <motion.div
                    variants={productVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="relative group"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    onClick={() => navigateToProductPage(product)}
                  >
                    <div className="relative h-80 overflow-hidden bg-background-flashLIght">
                      <img
                        src={
                          hoveredProduct === product.id
                            ? product.images[1] || product.images[0]
                            : product.images[0]
                        }
                        alt={product.name}
                        className="w-full h-full object-cover transition-opacity duration-300"
                      />

                      {product.inStock === false && (
                        <div className="absolute top-2 right-2 bg-primary-dark text-white text-xs font-medium px-2 py-1 rounded">
                          Out of stock
                        </div>
                      )}

                      <div
                        className={`absolute bottom-0 left-0 right-0 bg-primary-dark bg-opacity-90 text-white p-3 transition-all duration-300 ${
                          hoveredProduct === product.id
                            ? "translate-y-0 opacity-100"
                            : "translate-y-full opacity-0"
                        }`}
                      >
                        <p className="text-xs line-clamp-2">{product.description}</p>
                      </div>

                      <div
                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity ${
                          hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <button
                          className="bg-white text-primary-dark px-4 py-2 text-xs font-medium hover:bg-background-flashLIght transition-colors border border-primary-dark"
                          onClick={(e) => openQuickView(product, e)}
                        >
                          QUICK VIEW
                        </button>
                      </div>
                    </div>

                    <div className="bg-white p-4 h-24 flex flex-col justify-between border border-t-0 border-gray-200">
                      <h3 className="text-sm font-normal line-clamp-2 text-primary-black">
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <p className="text-primary-dark font-medium text-sm">
                          {product.currency || '$'}{product.discountPrice || product.price}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{product.category || 'Artifact'}</p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          {/* Moroccan-style CTA Section with video preview */}
          <motion.section 
            className="flex flex-col md:flex-row bg-gradient-to-r from-button-dark to-primary-dark rounded-sm overflow-hidden shadow-xl h-72 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Moroccan pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')"
            }}></div>
            
            <div className="md:w-2/3 p-8 md:p-12 relative z-10">
              <h2 className="text-3xl font-moroccan text-primary-light mb-6">Explore Our Poetry Collection</h2>
              <p className="text-lg text-primary-light/90 mb-8">
                Immerse yourself in the lyrical beauty of Moroccan poetry, where each verse tells a story of tradition, love, and wisdom.
              </p>
              <motion.button 
                className="bg-primary-light text-primary-dark px-8 py-3 rounded-sm font-medium hover:bg-white transition-colors flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideoModal(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Our Story
              </motion.button>
            </div>

            <div className="md:w-1/3 relative">
              <div className="h-full relative overflow-hidden cursor-pointer" onClick={() => setShowVideoModal(true)}>
                <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <img 
                  src="/images/moroccan-poetry.jpg" 
                  alt="Ancient Moroccan poetry book with intricate designs" 
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                  loading="lazy"
                  srcSet="/images/moroccan-poetry.jpg 1x, /images/moroccan-poetry@2x.jpg 2x"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center"
                  }}
                />
              </div>
            </div>
          </motion.section>
        </section>

        {/* Video Modal */}
        <AnimatePresence>
          {showVideoModal && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowVideoModal(false)}
            >
              <motion.div 
                className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute top-4 right-4 z-10 text-white hover:text-primary-dark transition-colors"
                  onClick={() => setShowVideoModal(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&rel=0"
                    title="Moroccan Poetry Collection"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                <div className="p-6 bg-gradient-to-t from-black to-transparent absolute bottom-0 left-0 right-0">
                  <h3 className="text-2xl font-moroccan text-white mb-2">The Art of Moroccan Poetry</h3>
                  <p className="text-primary-light/80">
                    Discover the rich tradition of Moroccan poetry through this immersive journey.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default React.memo(AsymmetricalProductShowcase);