import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BlogFormModal = ({ blog, onSubmit, onDelete, onClose }) => {
  const isEditMode = !!blog;
  const [formData, setFormData] = useState({
    _id: blog?._id || '',
    heading: blog?.heading || '',
    subtitle: blog?.subtitle || '',
    description: blog?.description || '',
    content: blog?.content || '',
    image: blog?.image || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if (success) {
      setFormData({ _id: '', heading: '', subtitle: '', description: '', content: '', image: '' });
      onClose();
    }
  };

  const handleDelete = async () => {
    if (isEditMode && window.confirm('Are you sure you want to delete this blog?')) {
      const success = await onDelete(blog._id);
      if (success) onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-4xl h-[90vh] flex flex-col"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {isEditMode ? 'Edit Blog' : 'Add New Blog'}
        </h2>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  id="heading"
                  name="heading"
                  value={formData.heading}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  id="subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  aria-required="true"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                required
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows="8"
                required
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2 w-full h-32 object-cover rounded-md"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=Invalid+Image';
                  }}
                />
              )}
            </div>
            {isEditMode && (
              <div className="mb-4">
                <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700 mb-1">
                  Created At
                </label>
                <input
                  type="text"
                  id="createdAt"
                  value={
                    blog.createdAt && !isNaN(new Date(blog.createdAt).getTime())
                      ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Unknown'
                  }
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                  disabled
                />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2 mt-4 border-t pt-4 bg-white">
            {isEditMode && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            )}
            
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              {isEditMode ? 'Save' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BlogFormModal;