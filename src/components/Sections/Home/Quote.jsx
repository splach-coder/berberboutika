import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Quote = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { delay: 0.3, type: "spring" } }
  };

  return (
    <>
      <Helmet>
        <title>Berber Boutika | Artisanat Marocain Authentique</title>
        <meta 
          name="description" 
          content="Découvrez des poteries berbères uniques, faites main au Maroc. Tagines, services à thé et art mural traditionnel." 
        />
        <meta property="og:title" content="Berber Boutika | L'Âme de l'Artisanat Marocain" />
        <meta property="og:image" content="https://example.com/images/berber-pottery.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Berber language metadata */}
        <meta 
          name="keywords" 
          content="ⴱⴻⵔⴱⴻⵔ, poterie marocaine, tagine, artisanat, fait main, Maroc" 
        />
      </Helmet>

      <motion.div 
        ref={ref}
        className="flex flex-col items-center justify-center py-20 px-4 text-center bg-primary-light text-primary-dark relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-10"
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%'],
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          style={{
            backgroundImage: 'radial-gradient(#49371B 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Berber symbol (animated entrance) */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-4xl font-bold mb-6"
        >
          ⴱⴻⵔⴱⴻⵔ ⴱⵓⵜⵉⴽⴰ
          <motion.div 
            className="w-16 h-1 bg-primary-dark mx-auto mt-2"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: 1,
              transition: { delay: 0.5, type: "spring" }
            }}
          />
        </motion.div>

        {/* Main heading (staggered letters) */}
        <motion.h1 
          className="text-3xl md:text-5xl font-bold mb-4 font-serif"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.03 }
            }
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {"Berber Boutika".split('').map((char, i) => (
            <motion.span 
              key={i} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheading (fade up) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-xl md:text-2xl font-medium italic mb-8">
            L'art <span className="text-primary-dark">traditionnel</span> qui traverse les siècles
          </h2>
          
          {/* Delivery message (with hover effect) */}
          <motion.p 
            className="text-lg font-medium border-b border-primary-dark pb-1 inline-block"
            whileHover={{ scale: 1.05, color: "#49371B" }}
          >
            Livraison gratuite au Maroc
          </motion.p>
        </motion.div>

        {/* Decorative elements (animated) */}
        <motion.div 
          className="absolute bottom-4 right-4 text-2xl opacity-20"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear" 
          }}
        >
          ⵣ
        </motion.div>
      </motion.div>
    </>
  );
};

export default Quote;