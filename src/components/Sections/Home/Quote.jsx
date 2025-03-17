import React from 'react';

const Quote = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white text-black">
      {/* Logo or symbol */}
      <div className="text-2xl font-bold mb-6">ⴱⴻⵔⴱⴻⵔⴱⵓⵜⵉⴽⴻ</div>
      
      {/* Main heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        BerBer Boutika. L'ART traditionnel marocain, Unique,
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-8">
        Tendance, Fait à la main.
      </h2>
      
      {/* Delivery message */}
      <p className="text-amber-700 font-medium">
        Nous livrons partout au Maroc gratuitement.
      </p>
    </div>
  );
};

export default Quote;