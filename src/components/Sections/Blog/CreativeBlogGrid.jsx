import React, { useState, useEffect, useRef } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CreativeBlogGrid = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Fetch blogs data
  useEffect(() => {
    fetch("/src/data/blogs.json")
      .then((response) => response.json())
      .then((data) => {
        setBlogPosts(data.blogs);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  // Get unique categories from all blog posts
  const allCategories = Array.from(
    new Set(blogPosts.flatMap((post) => post.categories))
  );

  // Add navigation function
  const navigateToBlogPost = (postId) => {
    navigate(`/blog/post`, { state: { blogId: postId } });
  };

  // Filter blogs based on selected category
  const filteredBlogs =
    filter === "all"
      ? blogPosts
      : blogPosts.filter((blog) => blog.categories.includes(filter));

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-6xl mx-auto px-4 pt-48 py-8 text-black">
      {/* Header Section */}
      <div className="mb-12">
        <p className="text-sm text-gray-600 text-center mb-2">The blog</p>
        <div className="flex items-center justify-center relative">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Writings from our team
          </h1>
          <div className="absolute -right-2 top-0">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 25L30 10"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M20 35L35 20"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <p className="text-gray-600 text-center">
          The latest industry news, interviews, technologies, and resources.
        </p>
      </div>

      {/* Featured Blog Post */}
      {blogPosts.length > 0 && (
        <div className="mb-16">
          <div
            className="bg-gray-100 rounded-sm overflow-hidden shadow-sm"
            onClick={() => navigateToBlogPost(blogPosts[0].id)}
          >
            <div className="relative">
              <img
                src={blogPosts[0].img || "https://via.placeholder.com/1200x600"}
                alt={blogPosts[0].title}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm">{blogPosts[0].author}</span>
                  <span className="text-xs">
                    • {blogPosts[0].dateOfRelease}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {blogPosts[0].title}
                </h2>
                <p className="mb-4">{blogPosts[0].shortDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {blogPosts[0].categories?.map((category, idx) => (
                    <span
                      key={idx}
                      className="bg-white text-gray-800 text-xs px-3 py-1 rounded-full"
                      onClick={() => setFilter(category)}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {currentPosts.slice(filter === "all" ? 1 : 0).map((post, index) => (
          <div
            key={index}
            className="flex flex-col group cursor-pointer"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigateToBlogPost(post.id)}
          >
            <div className="mb-4 h-60 overflow-hidden rounded-sm">
              <img
                src={
                  post.img ||
                  `https://via.placeholder.com/400x300?text=${encodeURIComponent(
                    post.title
                  )}`
                }
                alt={post.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="mb-2">
              <span className="text-sm text-gray-600">
                {post.author} • {post.dateOfRelease}
              </span>
            </div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold group-hover:text-gray-700">
                {post.title}
              </h3>
              <FiArrowRight
                className={`text-4xl mt-1 transition-all transform ${
                  hoveredCard === index
                    ? "opacity-100 translate-x-0 rotate-[-30deg]"
                    : "opacity-0 -translate-x-2"
                }`}
              />
            </div>
            <p className="text-gray-600 mb-3">{post.shortDescription}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {post.categories?.map((category, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer"
                  onClick={() => setFilter(category)}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <button
          className="flex items-center text-gray-600 hover:text-gray-900 disabled:opacity-50"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <FiArrowLeft className="mr-2" />
          Previous
        </button>
        <div className="hidden md:flex items-center space-x-2">
          {[...Array(Math.min(totalPages, 10))].map((_, i) => (
            <button
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                currentPage === i + 1
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          {totalPages > 10 && <span className="px-2">...</span>}
        </div>
        <button
          className="flex items-center text-gray-600 hover:text-gray-900 disabled:opacity-50"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <FiArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CreativeBlogGrid;
