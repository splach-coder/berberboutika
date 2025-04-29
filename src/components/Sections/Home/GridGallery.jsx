import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Helmet } from 'react-helmet';

const GridGallery = () => {
  const controls = useAnimation();
  const galleryRef = useRef(null);
  const isInView = useInView(galleryRef, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Image data for better management
  const galleryItems = [
    {
      id: 'interior-scents',
      title: 'INTERIOR SCENTS',
      description: 'Candles, diffusers and indoor sprays, discover the Chabi Chic olfactory journey.',
      imageUrl: '/images/products/1.jpeg',
      fullWidth: true,
      alt: 'Collection of luxury interior fragrance products including candles and diffusers',
      animation: { x: -100 } // Comes from left
    },
    {
      id: 'collection-empreinte',
      title: 'COLLECTION EMPREINTE',
      description: '',
      imageUrl: '/images/products/2.jpeg',
      alt: 'Handcrafted pottery and ceramic items from the Empreinte collection',
      animation: { x: 100 } // Comes from right
    },
    {
      id: 'new-products',
      title: 'NEW PRODUCTS',
      description: '',
      imageUrl: '/images/products/3.jpeg',
      badge: 'NEW',
      alt: 'Latest additions to our home decor and fragrance collections',
      animation: { y: 100 } // Comes from bottom
    },
    {
      id: 'cups',
      title: 'CUPS',
      description: '',
      imageUrl: '/images/products/4.jpeg',
      tall: true,
      alt: 'Artisanal handmade cups and mugs in various designs and colors',
      animation: { x: 100, y: 50 } // Comes from bottom-right
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { 
        staggerChildren: 0.3
      }
    }
  };

  // Create custom animation variants for each item
  const getItemVariants = (animationProps) => ({
    hidden: { 
      opacity: 0,
      ...animationProps,
    },
    visible: { 
      opacity: 1,
      x: 0,
      y: 0,
      transition: { 
        type: "spring", 
        bounce: 0.4,
        duration: 0.8 
      }
    }
  });

  return (
    <>
      <Helmet>
        <title>Luxury Home Collection | Interior Scents, Pottery & Cups</title>
        <meta name="description" content="Discover our exclusive collection of interior scents, handcrafted pottery, and artisanal cups. Premium home decor products with unique designs." />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Luxury Home Collection | Interior Scents, Pottery & Cups" />
        <meta property="og:description" content="Explore our curated collection of premium home decor, fragrances and handcrafted items." />
        <meta property="og:image" content="/images/products/tbasl.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/collections" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Luxury Home Collection | Interior Scents, Pottery & Cups" />
        <meta name="twitter:description" content="Explore our curated collection of premium home decor, fragrances and handcrafted items." />
        <meta name="twitter:image" content="/images/products/tbasl.jpg" />
        
        {/* Structured data for products */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "Product",
                  "name": "Interior Scents",
                  "description": "Candles, diffusers and indoor sprays, discover the Chabi Chic olfactory journey.",
                  "image": "/images/products/tbasl.jpg"
                },
                {
                  "@type": "Product",
                  "name": "Collection Empreinte",
                  "image": "/images/products/zlayf.jpg"
                },
                {
                  "@type": "Product",
                  "name": "Cups",
                  "image": "/images/products/hmer.jpg"
                }
              ]
            }
          `}
        </script>
      </Helmet>

      <main className="w-full bg-white">
        <section 
          aria-label="Featured Collections Gallery"
          className=" mx-auto px-4 py-8"
          ref={galleryRef}
        >
          <h1 className="sr-only">Featured Product Collections</h1>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64 md:h-full"
            style={{ minHeight: '600px' }}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Left column - one large image */}
            {galleryItems.filter(item => item.fullWidth).map(item => (
              <motion.article 
                key={item.id}
                className="relative overflow-hidden rounded-sm-sm h-64 md:h-full"
                variants={getItemVariants(item.animation)}
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <motion.img
                    src={item.imageUrl}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    srcSet={`${item.imageUrl} 1x, ${item.imageUrl.replace('.jpg', '@2x.jpg')} 2x`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                  {/* Black overlay with reveal animation */}
                  <motion.div 
                    className="absolute inset-0 bg-black"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  ></motion.div>
                </div>
                
                <motion.div 
                  className="absolute inset-0 flex flex-col justify-center items-center text-white p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      {item.title}
                    </motion.span>
                  </h2>
                  {item.description && (
                    <motion.p 
                      className="text-center text-sm md:text-base px-6 max-w-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      {item.description}
                    </motion.p>
                  )}
                </motion.div>
              </motion.article>
            ))}
            
            {/* Right side with two columns */}
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* First column with two stacked images */}
              <div className="flex flex-col gap-4 h-full">
                {galleryItems.filter(item => !item.fullWidth && !item.tall).map(item => (
                  <motion.article 
                    key={item.id}
                    className="relative overflow-hidden rounded-sm h-64 md:h-full"
                    style={{ height: 'calc(50% - 8px)' }}
                    variants={getItemVariants(item.animation)}
                  >
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <motion.img
                        src={item.imageUrl}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        srcSet={`${item.imageUrl} 1x, ${item.imageUrl.replace('.jpg', '@2x.jpg')} 2x`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                      />
                      {/* Black overlay with reveal animation */}
                      <motion.div 
                        className="absolute inset-0 bg-black"
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      ></motion.div>
                    </div>
                    
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                      <motion.h2 
                        className="text-xl md:text-3xl font-bold text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        {item.title}
                      </motion.h2>
                      {item.badge && (
                        <motion.div 
                          className="absolute top-4 right-4 bg-pink-300 text-white rounded-sm-full w-12 h-12 flex items-center justify-center"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ 
                            delay: 1,
                            duration: 0.5,
                            type: "spring",
                            stiffness: 300
                          }}
                        >
                          <span className="text-sm font-medium">{item.badge}</span>
                        </motion.div>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
              
              {/* Second column with one tall image */}
              {galleryItems.filter(item => item.tall).map(item => (
                <motion.article 
                  key={item.id}
                  className="relative overflow-hidden rounded-sm h-full"
                  variants={getItemVariants(item.animation)}
                >
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <motion.img
                      src={item.imageUrl}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      srcSet={`${item.imageUrl} 1x, ${item.imageUrl.replace('.jpg', '@2x.jpg')} 2x`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    />
                    {/* Black overlay with reveal animation */}
                    <motion.div 
                      className="absolute inset-0 bg-black"
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 0.5 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    ></motion.div>
                  </div>
                  
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                    <motion.h2 
                      className="text-xl md:text-3xl font-bold text-center"
                      initial={{ opacity: 0, rotate: -5 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      {item.title}
                    </motion.h2>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default GridGallery;