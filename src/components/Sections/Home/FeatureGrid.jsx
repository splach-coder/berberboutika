import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet";

const FeatureCard = ({ icon, title, description, delay, isInView }) => {
  return (
    <motion.div
      className="flex flex-col p-8 bg-primary-light border border-primary-light rounded-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, type: "spring" }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
      }}
    >
      <motion.div 
        className="text-primary-dark mb-6"
        whileHover={{ rotate: 15, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <motion.h3 
        className="text-xl font-serif font-medium text-primary-dark mb-3"
        initial={{ x: -10 }}
        animate={isInView ? { x: 0 } : {}}
        transition={{ delay: delay + 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-primary-black text-sm leading-relaxed opacity-90"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.3 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const FeatureGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
      title: "Savoir-Faire Berbère",
      description:
        "Un savoir-faire transmis depuis des générations, chaque pièce raconte l'histoire des artisans de l'Atlas.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Authenticité Garantie",
      description:
        "Produits 100% artisanaux fabriqués au Maroc, sans intermédiaires pour préserver la tradition et les prix justes.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Livraison Sécurisée",
      description:
        "Emballage soigné et livraison rapide dans tout le Maroc. Retour gratuit sous 15 jours.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Engagement Éthique",
      description:
        "Nous soutenons les coopératives féminines rurales et préservons les techniques traditionnelles berbères.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Berber Boutika | Valeurs Artisanales</title>
        <meta 
          name="description" 
          content="Découvrez notre engagement pour l'artisanat marocain authentique : savoir-faire berbère, éthique et livraison sécurisée." 
        />
        <meta property="og:title" content="Les Valeurs de Berber Boutika" />
        <meta property="og:description" content="Notre philosophie : préserver l'artisanat marocain tout en offrant une expérience client exceptionnelle." />
      </Helmet>

      <motion.section
        ref={ref}
        className="w-full py-20 bg-gradient-to-b from-primary-light to-white"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 text-primary-dark">
              ⵉⵎⵓⵔⴰⵏ ⵏⵖ
            </h1>
            <motion.p 
              className="text-lg text-primary-dark font-light italic opacity-90"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              L'âme de l'artisanat marocain dans chaque détail
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.15}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default FeatureGrid;