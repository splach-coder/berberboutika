import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      className="flex flex-col p-6 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div className="text-gray-600 mb-4" whileHover={{ scale: 1.1 }}>
        {icon}
      </motion.div>
      <motion.h3 className="text-xl font-medium text-gray-800 mb-2">
        {title}
      </motion.h3>
      <motion.p className="text-gray-500 text-sm">{description}</motion.p>
    </motion.div>
  );
};

const FeatureGrid = () => {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 9V7m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V5m6 6V5m0 6a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V5"
          />
        </svg>
      ),
      title: "Thoughtful Design",
      description:
        "Clever, comfy furniture that you're proud to show off but not precious about using everyday.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Everyday Value",
      description:
        "Our direct-to-consumer model cuts out the middlemen, hidden costs and showroom expenses that charge you extra.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Effortless Experiences",
      description:
        "Fast and flexible delivery, tool-free assembly and a 120 night risk-free trial.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Designed With The World In Mind",
      description:
        "Ethically made and designed to last. Every purchase helps save koalas and protect endangered Australian species and habitats.",
    },
  ];

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-medium mb-3 text-primary-dark">
            A Little About Us
          </h1>
          <p className="text-lg text-gray-700 font-light italic">
            Un large choix de couleurs pour créer votre style!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureGrid;
