import React from 'react';
import Header from "../components/Header/Header";
import BlogPostView from "../components/Sections/Blog/BlogPostView";



const Blog = () => {
  return (
    <div className="bg-white">
      <Header enableHoverEffect={false} />
      <BlogPostView />
    </div>
  );
};

export default Blog;