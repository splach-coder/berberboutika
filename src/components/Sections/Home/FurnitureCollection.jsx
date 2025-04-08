import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const countUp = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(countUp);
      }
    };
    
    if (inView) {
      animationFrame = requestAnimationFrame(countUp);
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, inView]);
  
  return <span ref={ref}>{count}{suffix}</span>;
};

const FurnitureCollection = () => {
  return (
    <div className="container mx-auto font-sans mb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row border-b border-gray-200 p-4 md:p-6">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-1">Stylish</h1>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-1">And Durable Furniture</h1>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Collection</h1>
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0 text-gray-600">
          <p className="text-lg">
            Discover our Stylish and Durable Furniture Collection, designed to elevate your
            space with elegance and lasting quality. Perfect for any room, these pieces blend
            modern design with exceptional functionality and comfort.
          </p>
        </div>
      </div>
      
      {/* Categories Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 border-b border-gray-200">
        <div className="p-4 md:p-6 border-r border-gray-200">
          <div className="flex items-baseline">
            <span className="text-3xl md:text-4xl font-bold text-gray-900 mr-2">
              <CountUp end={25} suffix="+" />
            </span>
            <span className="text-gray-500">Items</span>
          </div>
          <p className="mt-2 text-gray-600">Living Room</p>
        </div>
        
        <div className="p-4 md:p-6 border-r border-gray-200">
          <div className="flex items-baseline">
            <span className="text-3xl md:text-4xl font-bold text-gray-900 mr-2">
              <CountUp end={10} suffix="+" />
            </span>
            <span className="text-gray-500">Items</span>
          </div>
          <p className="mt-2 text-gray-600">Outdoor Furniture</p>
        </div>
        
        <div className="p-4 md:p-6 border-r border-gray-200">
          <div className="flex items-baseline">
            <span className="text-3xl md:text-4xl font-bold text-gray-900 mr-2">
              <CountUp end={15} suffix="+" />
            </span>
            <span className="text-gray-500">Items</span>
          </div>
          <p className="mt-2 text-gray-600">Dining Room</p>
        </div>
        
        <div className="p-4 md:p-6 border-r border-gray-200">
          <div className="flex items-baseline">
            <span className="text-3xl md:text-4xl font-bold text-gray-900 mr-2">
              <CountUp end={18} suffix="+" />
            </span>
            <span className="text-gray-500">Items</span>
          </div>
          <p className="mt-2 text-gray-600">Bedroom Furniture</p>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="flex items-baseline">
            <span className="text-3xl md:text-4xl font-bold text-gray-900 mr-2">
              <CountUp end={12} suffix="+" />
            </span>
            <span className="text-gray-500">Items</span>
          </div>
          <p className="mt-2 text-gray-600">Office Furniture</p>
        </div>
      </div>
      
      {/* Featured Image */}
      <div className="w-full">
        <img 
          src="/images/forniture.jpeg" 
          alt="Outdoor furniture set with round table and woven chairs" 
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default FurnitureCollection;