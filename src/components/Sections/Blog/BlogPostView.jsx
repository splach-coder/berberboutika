import React, { useState, useEffect } from "react";
import { Calendar, Clock, Share2 } from "lucide-react";
import { useParams, useLocation } from "react-router-dom";

const getRelatedPosts = async (currentBlogPost, maxRelated = 2) => {
  try {
    // Fetch all blog posts
    const response = await fetch("/src/data/blogs.json");
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    const allPosts = await response.json();
    var blogs = allPosts.blogs;
    

    // Filter out the current post
    const otherPosts = blogs.filter(
      (post) => post.title !== currentBlogPost.title
    );

    // Find posts that share at least one category with the current post
    let relatedPosts = [];

    if (currentBlogPost.categories && currentBlogPost.categories.length > 0) {
      relatedPosts = otherPosts.filter((post) => {
        if (!post.categories) return false;

        // Check if any category matches
        return post.categories.some((category) =>
          currentBlogPost.categories.includes(category)
        );
      });
    }

    // If we don't have enough related posts, add random posts as fallback
    if (relatedPosts.length < maxRelated) {
      // Shuffle the remaining posts that aren't already in relatedPosts
      const remainingPosts = otherPosts.filter(
        (post) =>
          !relatedPosts.some((relatedPost) => relatedPost.title === post.title)
      );

      // Fisher-Yates shuffle algorithm
      for (let i = remainingPosts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingPosts[i], remainingPosts[j]] = [
          remainingPosts[j],
          remainingPosts[i],
        ];
      }

      // Add random posts until we reach maxRelated
      relatedPosts = [
        ...relatedPosts,
        ...remainingPosts.slice(0, maxRelated - relatedPosts.length),
      ];
    }

    // Return only the required number of posts
    return relatedPosts.slice(0, maxRelated);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
};

// Example usage with the current blog post
const RelatedPosts = ({ blogPost }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      const posts = await getRelatedPosts(blogPost, 2);
      setRelatedPosts(posts);
    };

    fetchRelatedPosts();
  }, [blogPost]);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {relatedPosts.map((post, index) => (
        <div
          key={index}
          className="flex flex-col group cursor-pointer"
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
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
          </div>
          <p className="text-gray-600 mb-3">{post.shortDescription}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {post.categories?.map((category, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const BlogPostView = () => {
  const { id } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [blogPost, setBlogPost] = useState(null);
  const [shareTooltip, setShareTooltip] = useState(false);

  // Get blog ID either from URL params or from state (if passed via navigation)
  const getBlogId = () => {
    // Then try to get from location state
    if (location?.state?.blogId) return location.state.blogId;

    // Default to 1 if nothing found
    return 1;
  };

  // Fetch blog data
  useEffect(() => {
    const fetchBlogData = async () => {
      setIsLoading(true);
      try {
        const blogId = getBlogId();
        const response = await fetch("/src/data/blogs.json");
        const data = await response.json();

        // Find the blog post with matching ID
        const post = data.blogs.find((blog) => blog.id === blogId);

        if (post) {
          setBlogPost(post);
        } else {
          console.error(`Blog post with ID ${blogId} not found`);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        // Add a slight delay to simulate loading
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    fetchBlogData();
  }, [id, location]);

  const handleShare = async () => {
    setShareTooltip(true);

    try {
      if (navigator.share) {
        await navigator.share({
          title: blogPost?.title || "Blog Post",
          text:
            blogPost?.shortDescription ||
            "Check out this interesting blog post.",
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        navigator.clipboard.writeText(window.location.href);
        setTimeout(() => setShareTooltip(false), 2000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // Calculate read time based on text length (rough estimate)
  const getReadTime = (text) => {
    if (!text) return "2 min read";
    // Average reading speed is about 200-250 words per minute
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="space-y-4 animate-pulse">
          <div className="h-6 w-64 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-48 w-96 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // If no blog post found
  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-semibold mb-2">Blog Post Not Found</h2>
          <p className="text-gray-600">
            We couldn't find the blog post you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen transition-opacity duration-500 ease-in-out opacity-100 pt-40 text-black">
      {/* Main content */}
      <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 animate-fade-in">
        {/* Post header */}
        <div
          className="mb-8 opacity-0 animate-slide-up"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <div className="flex flex-wrap gap-2 mb-3">
            {blogPost.categories?.map((category, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {blogPost.title}
          </h1>
          <div className="flex items-center justify-between">
            <div className="text-gray-500 text-sm space-x-4">
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" /> {blogPost.dateOfRelease}
              </span>
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />{" "}
                {getReadTime(blogPost.text)}
              </span>
            </div>
            <div className="text-sm text-gray-500">By {blogPost.author}</div>
          </div>
        </div>

        {/* Featured image */}
        <div
          className="mb-8 rounded-lg overflow-hidden shadow-sm opacity-0 animate-slide-up"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          <img
            src={blogPost.img || "/api/placeholder/800/400"}
            alt={blogPost.title}
            className="w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-700"
          />
        </div>

        {/* Blog content */}
        <div
          className="prose max-w-none opacity-0 animate-slide-up"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <p className="text-lg leading-relaxed text-gray-800 mb-4">
            {blogPost.shortDescription}
          </p>

          {/* Render blog content - you might want to use a markdown parser if text is markdown */}
          <div className="text-lg leading-relaxed text-gray-800">
            {blogPost.text}
          </div>
        </div>

        {/* Simplified action bar with like, share, and views */}
        <div
          className="border-t mt-12 pt-4 flex justify-between items-center opacity-0 animate-slide-up"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <div className="text-gray-500 text-sm">
            <span>{blogPost.views || 0} views</span>
          </div>

          <div className="flex space-x-4">
            <div className="relative">
              <button
                className="flex items-center text-gray-600 hover:text-blue-500 transition-colors"
                onClick={handleShare}
                aria-label="Share this article"
              >
                <Share2 size={18} />
              </button>

              {shareTooltip && (
                <div className="absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Link copied!
                  <div className="absolute -bottom-1 right-2 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related posts - You can implement logic to show related posts based on category */}
        <div
          className="mt-16 opacity-0 animate-slide-up"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
        >
          <h3 className="text-xl font-semibold mb-4">You might also enjoy</h3>
          <RelatedPosts blogPost={blogPost} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          opacity: 0;
          animation: slide-up 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BlogPostView;
