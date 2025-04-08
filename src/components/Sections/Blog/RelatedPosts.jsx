const getRelatedPosts = async (currentBlogPost, maxRelated = 2) => {
  try {
    // Fetch all blog posts
    const response = await fetch("/src/data/blogs.json");
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    const allPosts = await response.json();

    // Filter out the current post
    const otherPosts = allPosts.filter(
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
  const [hoveredCard, setHoveredCard] = useState(null);

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

export default RelatedPosts;
