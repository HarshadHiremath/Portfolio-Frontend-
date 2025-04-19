import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const Post = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_LOCALHOST;

        // Fetch current blog
        const blogResponse = await fetch(`${apiUrl}/blog/${id}`);
        if (!blogResponse.ok) throw new Error('Failed to fetch blog');
        const blogData = await blogResponse.json();
        setBlog(blogData);

        // Fetch related blogs
        const relatedResponse = await fetch(`${apiUrl}/blog`);
        if (!relatedResponse.ok) throw new Error('Failed to fetch related blogs');
        const allBlogs = await relatedResponse.json();
        allBlogs.reverse();
        setRelatedBlogs(allBlogs.filter((item) => item._id !== id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-red-600">Error: {error}</h2>
        <Link to="/blog" className="text-blue-600 hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">Blog Not Found</h2>
        <Link to="/blog" className="text-blue-600 hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Blog Content */}
        <Link to="/blog" className="flex items-center text-blue-600 hover:underline mb-4">
  <FaArrowLeft className="mr-2" />
  <span>Back to Blogs</span>
</Link>

        <div className="bg-white rounded-lg shadow-md p-6">
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.heading}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
          )}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{blog.heading}</h1>
          <h2 className="text-lg text-gray-600 mb-4">{blog.subtitle}</h2>
          <p className="text-gray-600">{blog.content}</p>
        </div>
      </div>

<div className="mt-12 max-w-4xl mx-auto">
  <h3 className="text-2xl font-bold text-gray-800 mb-6">Latest Blogs</h3>
  {relatedBlogs.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {relatedBlogs.map((blog) => (
        <motion.div
          key={blog._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-all"
        >
          <Link to={`/blog/${blog._id}`} className="block">
            {/* Blog Image */}
            <img
              src={blog.image}
              alt={blog.heading}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {/* Blog Content */}
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{blog.heading}</h2>
              {blog.subtitle && (
                <h3 className="text-md text-gray-600 mb-2">
                  <b>{blog.subtitle}</b>
                </h3>
              )}
              {blog.description && <p className="text-gray-600">{blog.description}</p>}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  ) : (
    <p className="text-gray-600 text-center">No related blogs available.</p>
  )}
</div>

    </section>
  );
};

export default Post;
