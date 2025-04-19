import React, { useState, useEffect, useCallback } from 'react';
import BlogList from './BlogList';
import BlogFormModal from './BlogFormModal';

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBlog, setEditBlog] = useState(null);

  // Fetch blogs
  const fetchBlogs = useCallback(async () => {
    try {
      const apiUrl = import.meta.env.VITE_LOCALHOST;
      const response = await fetch(`${apiUrl}/blog`);
      if (!response.ok) throw new Error(`Failed to fetch blogs: ${response.statusText}`);
      const data = await response.json();
      data.reverse();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Handle blog submission
  const handleSubmit = async (formData) => {
    const { heading, subtitle, description, content, _id } = formData;

    if (!heading || !subtitle || !description || !content) {
      setMessage('All fields are required.');
      return false;
    }

    try {
      const apiUrl = import.meta.env.VITE_LOCALHOST;
      const isEdit = !!_id;
      const response = await fetch(`${apiUrl}/blog${isEdit ? `/${_id}` : ''}`, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heading, subtitle, description, content, image: formData.image }),
      });

      if (!response.ok) throw new Error(`Failed to ${isEdit ? 'update' : 'create'} blog`);

      const updatedBlog = await response.json();
      setBlogs((prevBlogs) =>
        isEdit
          ? prevBlogs.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog))
          : [...prevBlogs, updatedBlog]
      );

      setMessage(`Blog ${isEdit ? 'updated' : 'created'} successfully!`);
      return true;
    } catch (error) {
      setMessage(error.message);
      return false;
    }
  };

  // Handle blog deletion
  const handleDelete = async (blogId) => {
    try {
      const apiUrl = import.meta.env.VITE_LOCALHOST;
      const response = await fetch(`${apiUrl}/blog/${blogId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete blog');

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      setMessage('Blog deleted successfully!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Blogs</h1>
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes('successfully') ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}
      <button
        onClick={() => {
          setEditBlog(null);
          setIsModalOpen(true);
        }}
        className="mb-6 bg-black text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
      >
        Add New Blog
      </button>
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No blogs available. Add one to get started!</p>
      ) : (
        <BlogList
          blogs={blogs}
          onEdit={(blog) => {
            setEditBlog(blog);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}
      {isModalOpen && (
        <BlogFormModal
          blog={editBlog}
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminBlog;
