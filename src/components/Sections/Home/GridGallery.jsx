import React from 'react';

const GridGallery = () => {
  return (
    <div className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ minHeight: '600px' }}>
        {/* Left column - one large image */}
        <div className="relative overflow-hidden group" style={{ height: '600px' }}>
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src="/images/products/tbasl.jpg"
              alt="Interior Scents"
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <h2 className="text-4xl font-bold text-center mb-2">INTERIOR SCENTS</h2>
            <p className="text-center text-sm md:text-base px-6">
              Candles, diffusers and indoor sprays, discover the Chabi Chic olfactory journey.
            </p>
          </div>
        </div>
        
        {/* Right side with two columns */}
        <div className="grid grid-cols-2 gap-4" style={{ height: '600px' }}>
          {/* First column with two stacked images */}
          <div className="flex flex-col gap-4 h-full">
            {/* Top image */}
            <div className="relative overflow-hidden group" style={{ height: 'calc(50% - 8px)' }}>
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src="/images/products/zlayf.jpg"
                  alt="Collection Empreinte"
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                {/* Black overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold text-center">COLLECTION EMPREINTE</h2>
              </div>
            </div>
            
            {/* Bottom image */}
            <div className="relative overflow-hidden group" style={{ height: 'calc(50% - 8px)' }}>
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src="/images/products/tbasl2.jpg"
                  alt="New Products"
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                {/* Black overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold text-center">NEW PRODUCTS</h2>
                {/* NEW tag/badge in top right */}
                <div className="absolute top-4 right-4 bg-pink-300 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-sm font-medium">NEW</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Second column with one tall image */}
          <div className="relative overflow-hidden group h-full">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src="/images/products/hmer.jpg"
                alt="Cups"
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              {/* Black overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold text-center">CUPS</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" style={{ minHeight: '600px' }}>
          {/* Left side with two columns */}
          <div className="grid grid-cols-2 gap-4" style={{ height: '600px' }}>
          {/* First column with two stacked images */}
          <div className="flex flex-col gap-4 h-full">
            {/* Top image */}
            <div className="relative overflow-hidden group" style={{ height: 'calc(50% - 8px)' }}>
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src="/images/products/zlayf2.jpg"
                  alt="Collection Empreinte"
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                {/* Black overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold text-center">COLLECTION EMPREINTE</h2>
              </div>
            </div>
            
            {/* Bottom image */}
            <div className="relative overflow-hidden group" style={{ height: 'calc(50% - 8px)' }}>
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src="/images/products/dar.jpg"
                  alt="New Products"
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                {/* Black overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold text-center">NEW PRODUCTS</h2>
                {/* NEW tag/badge in top right */}
                <div className="absolute top-4 right-4 bg-pink-300 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-sm font-medium">NEW</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Second column with one tall image */}
          <div className="relative overflow-hidden group h-full">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src="/images/products/zrabi.jpg"
                alt="Cups"
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              {/* Black overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold text-center">CUPS</h2>
            </div>
          </div>
        </div>

        {/* Right column - one large image */}
        <div className="relative overflow-hidden group" style={{ height: '600px' }}>
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src="/images/products/zlayf3.jpg"
              alt="Interior Scents"
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <h2 className="text-4xl font-bold text-center mb-2">INTERIOR SCENTS</h2>
            <p className="text-center text-sm md:text-base px-6">
              Candles, diffusers and indoor sprays, discover the Chabi Chic olfactory journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridGallery;