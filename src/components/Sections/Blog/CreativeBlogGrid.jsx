import React, { useState, useEffect } from 'react';
import { FaLongArrowAltRight, FaRegClock, FaRegComment, FaRegBookmark, FaEye } from 'react-icons/fa';

const CreativeBlogGrid = () => {  
  const [blogPosts, setBlogPosts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [inView, setInView] = useState({});

  // Fetch blogs data
  useEffect(() => {
    fetch("/src/data/blogs.json")
      .then((response) => response.json())
      .then((data) => {
        setBlogPosts(data.blogs); 
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  // Categories from blog posts
  const categories = ['all', ...new Set(blogPosts.map(post => post.category.toLowerCase()))];

  // Simulate staggered reveal animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      blogPosts.forEach((post, index) => {
        setTimeout(() => {
          setInView(prev => ({ ...prev, [post.id]: true }));
        }, index * 150);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [blogPosts]);

  // Filter posts based on selected category
  const filteredPosts = filter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category.toLowerCase() === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-40 py-8">
      {/* Section Title */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Journal</h2>
        <div className="w-24 h-1 bg-primary-dark mx-auto"></div>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Discover insights, stories, and ideas from our design experts and craftspeople
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
              filter === category 
                ? 'bg-primary-dark text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Featured Post (if any) */}
      {filter === 'all' && blogPosts.some(post => post.featured) && (
        <div className={`mb-16 transform transition-all duration-700 ${
          inView[blogPosts.find(post => post.featured).id] 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-10 opacity-0'
        }`}>
          {blogPosts.filter(post => post.featured).map(post => (
            <div 
              key={post.id}
              className="relative grid md:grid-cols-2 gap-6 bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="order-2 md:order-1 p-8 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-primary-light bg-opacity-10 text-primary-light text-xs font-medium rounded-full mb-4">
                  {post.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{post.title}</h3>
                <p className="text-gray-600 mb-6">{post.shortDescription}</p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <span className="flex items-center">
                    <FaRegClock className="mr-1" />
                    {post.dateOfRelease}
                  </span>
                  <span className="mx-3">•</span>
                  <span>{post.views} views</span>
                </div>
                <a 
                  href={`/blog/${post.id}`} 
                  className="inline-flex items-center text-primary-light font-medium hover:underline"
                >
                  Read Full Article
                  <FaLongArrowAltRight className="ml-2" />
                </a>
              </div>
              <div className="order-1 md:order-2 h-64 md:h-auto">
                <img 
                  src={post.img} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <span className="flex items-center bg-white bg-opacity-80 px-2 py-1 rounded-full text-xs text-gray-700">
                  <FaEye className="mr-1" />
                  {post.views}
                </span>
                <span className="flex items-center bg-white bg-opacity-80 px-2 py-1 rounded-full text-xs text-gray-700">
                  <FaRegComment className="mr-1" />
                  {post.likesCount} likes
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.filter(post => !post.featured || filter !== 'all').map((post, index) => (
          <div
            key={post.id}
            className={`group relative overflow-hidden rounded-xl transform transition-all duration-700 ${
              inView[post.id] 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
            }`}
            onMouseEnter={() => setHoveredCard(post.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Card Wrapper */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm group-hover:shadow-xl transition-shadow duration-300">
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-white text-primary-light text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex space-x-2 text-white text-xs">
                  <span className="flex items-center">
                    <FaRegClock className="mr-1" />
                    {post.dateOfRelease}
                  </span>
                  <span className="flex items-center">
                    <FaRegComment className="mr-1" />
                    {post.likesCount} likes
                  </span>
                </div>
                <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white bg-opacity-80 flex items-center justify-center text-gray-600 hover:text-primary-light transition-colors duration-300">
                  <FaRegBookmark />
                </button>
              </div>
              
              {/* Content Container */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-light transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {post.shortDescription}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.dateOfRelease}</span>
                  <a 
                    href={`/blog/${post.id}`} 
                    className="inline-flex items-center text-primary-light text-sm font-medium opacity-0 transform translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  >
                    Read more
                    <FaLongArrowAltRight className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Decorative Element */}
            <div 
              className={`absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-primary-light bg-opacity-10 transform scale-0 transition-transform duration-500 ${
                hoveredCard === post.id ? 'scale-100' : ''
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-12 text-center">
        <button className="inline-flex items-center px-6 py-3 border-2 border-primary-light text-primary-light font-medium rounded-full hover:bg-primary-light hover:text-white transition-colors duration-300">
          Load More Articles
          <FaLongArrowAltRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CreativeBlogGrid;