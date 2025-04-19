import React from 'react';
import { motion } from 'framer-motion';

const BlogCard = ({ blog, onEdit, onDelete }) => {
  const formattedDate = blog.createdAt && !isNaN(new Date(blog.createdAt).getTime())
    ? new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown';

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      onDelete(blog._id);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.0, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={blog.image}
        alt={blog.heading || 'Blog image'}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-black mb-2 truncate">
          {blog.heading || 'Untitled Blog'}
        </h2>
        <h3 className="text-md text-gray-600 mb-2 truncate"><b>{blog.subtitle || 'No subtitle'}</b></h3>
        <p className="text-gray-600 text-sm mb-2">
          {(blog.description || 'No description').substring(0, 100)}...
        </p>
        <p className="text-sm text-gray-500 mb-4 text-right">Created: {formattedDate}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onEdit(blog)}
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 text-md"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-red-700 text-md"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;