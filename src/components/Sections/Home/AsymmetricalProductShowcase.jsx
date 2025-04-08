import React, { useState, useEffect } from 'react';

const AsymmetricalProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="p-8 text-center text-xl">Loading products...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!products.length) return <div className="p-8 text-center">No products found</div>;

  // Group products for different layout sections
  const featuredProduct = products[0];
  const secondaryProducts = products.slice(1, 3);
  const remainingProducts = products.slice(3, 7);

  return (
    <div className="container mx-auto px-4 py-12 text-primary-black">
      <h1 className="text-4xl text-primary-dark font-bold mb-12 text-left pl-4 border-l-4 border-primary-dark">
        THE MUST-HAVE OF THE MOMENT
      </h1>
      
      {/* Hero Section - Asymmetrical with large featured product */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Featured Product - Takes 2/3 of screen */}
        <div className="lg:col-span-2 bg-white rounded-sm overflow-hidden shadow-sm transform transition-transform hover:scale-102">
          <div className="h-96 relative group">
            <img 
              src={featuredProduct.images[0]} 
              alt={featuredProduct.name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-primary-light text-primary-dark px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </div>
            {featuredProduct.discountPrice && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Sale
              </div>
            )}
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{featuredProduct.name}</h2>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(featuredProduct.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">{featuredProduct.rating} ({featuredProduct.reviewCount} reviews)</span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{featuredProduct.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {featuredProduct.discountPrice ? (
                  <>
                    <span className="text-2xl font-bold mr-2">{featuredProduct.currency}{featuredProduct.discountPrice}</span>
                    <span className="text-gray-500 line-through">{featuredProduct.currency}{featuredProduct.price}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold">{featuredProduct.currency}{featuredProduct.price}</span>
                )}
              </div>
              <button className="bg-button-dark text-white px-6 py-2 rounded-sm font-medium hover:bg-button-darkHover transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
        
        {/* Secondary Product Stack - Takes 1/3 of screen, stacked vertically */}
        <div className="flex flex-col gap-8">
          {secondaryProducts.map(product => (
            <div key={product.id} className="bg-white rounded-sm overflow-hidden shadow-sm h-72 flex flex-col">
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
                />
                {product.discountPrice && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Sale
                  </div>
                )}
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <h3 className="font-bold text-lg truncate">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    {product.discountPrice ? (
                      <>
                        <span className="text-lg font-bold">{product.currency}{product.discountPrice}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">{product.currency}{product.price}</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold">{product.currency}{product.price}</span>
                    )}
                  </div>
                  <button className="text-primary-dark hover:text-indigo-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Asymmetrical Grid Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Large product card spanning 2 columns */}
        <div className="md:col-span-2 row-span-2 bg-gradient-to-r from-primary-light to-primary-light p-6 rounded-sm shadow">
          {remainingProducts[0] && (
            <div className="h-full flex flex-col md:flex-row">
              <div className="md:w-1/2 h-64 md:h-auto mb-4 md:mb-0 relative overflow-hidden rounded-sm">
                <img 
                  src={remainingProducts[0].images[0]} 
                  alt={remainingProducts[0].name}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                />
              </div>
              <div className="md:w-1/2 md:pl-6 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-3">{remainingProducts[0].name}</h3>
                <p className="text-gray-600 mb-4">{remainingProducts[0].description}</p>
                <div className="flex items-center mb-4">
                  {remainingProducts[0].discountPrice ? (
                    <>
                      <span className="text-xl font-bold">{remainingProducts[0].currency}{remainingProducts[0].discountPrice}</span>
                      <span className="text-gray-500 line-through ml-2">{remainingProducts[0].currency}{remainingProducts[0].price}</span>
                    </>
                  ) : (
                    <span className="text-xl font-bold">{remainingProducts[0].currency}{remainingProducts[0].price}</span>
                  )}
                </div>
                <button className="bg-button-dark text-white px-6 py-2 mt-12 rounded-sm font-medium hover:bg-button-darkHover transition-colors">
                  View Details
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Smaller product cards */}
        {remainingProducts.slice(1).map(product => (
          <div key={product.id} className="bg-white rounded-sm overflow-hidden shadow-sm transition-transform hover:translate-y-1">
            <div className="h-48 relative overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
              />
              {product.discountPrice && (
                <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Sale
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 truncate">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div>
                  {product.discountPrice ? (
                    <>
                      <span className="text-lg font-bold">{product.currency}{product.discountPrice}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{product.currency}{product.price}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold">{product.currency}{product.price}</span>
                  )}
                </div>
                <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
      
      {/* Quote/CTA Section with asymmetrical design */}
      <section className="flex flex-col md:flex-row bg-primary-light rounded-sm overflow-hidden h-72">
        <div className="md:w-2/3 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-button-darkHover">Discover Our Kitchen Collection</h2>
          <p className="text-lg text-primary-dark mb-8">
            Our carefully curated products blend functionality with aesthetic appeal, 
            creating spaces that reflect your unique style and personality.
          </p>
          <button className="bg-button-dark text-white px-8 py-3 rounded-sm font-medium hover:bg-button-darkHover transition-colors">
            Shop All Products
          </button>
        </div>

        <div className="md:w-1/3">
          <div className="h-full relative overflow-hidden float-end">
            <img src="/images/kitchen.jpeg" alt="" className='w-full h-full object-cover transition-all duration-300 hover:scale-110' />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AsymmetricalProductShowcase;