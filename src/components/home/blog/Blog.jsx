import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BlogWall from "../../../assets/BlogWallpaper.jpg";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LOCALHOST}/blog`);
        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.statusText}`);
        }
        const data = await response.json();
        data.reverse();
        setBlogs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <p className="text-center text-gray-500">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Motive Section */}
        <div
          className="mb-12 text-center bg-cover bg-center bg-no-repeat py-8 sm:py-12 md:py-16 px-4"
          style={{ backgroundImage: `url(${BlogWall})` }}
        >
          <div
            className="bg-opacity-80 p-6 sm:p-8 md:p-10 rounded-lg shadow-md max-w-4xl mx-auto border-4 border-white"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Exploring Innovation and Growth
            </h1>
            <p className="text-sm sm:text-base md:text-2xl text-white mb-3 sm:mb-4">
              Welcome to my blog! This space is where I share my passion for coding, design, and
              technology. My goal is to inspire and educate developers by providing insights from my
              projects, tips on modern web development, and personal experiences in the tech world.
            </p>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 0.75 }}
              transition={{ duration: 0.1 }}
               className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-100 hover:scale-105 hover:shadow-xl"
            >
              <Link
                to={`/blog/${blog._id}`}
                className="block hover:shadow-xl"
              >
                <img
                  src={blog.image}
                  alt={blog.heading}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-semibold text-black mb-2">{blog.heading}</h2>
                  <h3 className="text-md text-gray-600 mb-2"><b>{blog.subtitle}</b></h3>
                  <p className="text-gray-600">{blog.description}</p>
                  <p className="text-sm text-gray-500 mt-2 text-right"><b>
                    Created: {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Unknown"}
                 </b> </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
