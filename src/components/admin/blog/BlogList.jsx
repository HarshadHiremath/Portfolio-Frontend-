import React from 'react';
import BlogCard from './BlogCard';

const BlogList = ({ blogs, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BlogList;