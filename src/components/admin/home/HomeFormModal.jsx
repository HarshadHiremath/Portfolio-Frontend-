import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HomeFormModal = ({ entry, sectionType, onSubmit, onDelete, onClose }) => {
  const isEditMode = !!entry;
  const [formData, setFormData] = useState({
    _id: entry?._id || '',
    title: entry?.title || '',
    value: entry?.value || '', // For journey
    description: entry?.description || '', // For journey
    content: entry?.content || '', // For notices
    date: entry?.date || '', // For notices
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(formData, sectionType);
    if (success) {
      setFormData({
        _id: '',
        title: '',
        value: '',
        description: '',
        content: '',
        date: '',
      });
      onClose();
    }
  };

  const handleDelete = async () => {
    if (isEditMode && window.confirm(`Are you sure you want to delete this ${sectionType} entry?`)) {
      const success = await onDelete(entry._id, sectionType);
      if (success) onClose();
    }
  };

  const renderFields = () => {
    if (sectionType === 'journey') {
      return (
        <>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              required
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="value" className="block text-sm text-gray-700 mb-1">
              Value (e.g., 10+)
            </label>
            <input
              type="text"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              required
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              rows="4"
              required
              aria-required="true"
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              required
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              rows="4"
              required
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm text-gray-700 mb-1">
              Date (e.g., 2024-10-20)
            </label>
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              required
              aria-required="true"
            />
          </div>
        </>
      );
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {isEditMode ? `Edit ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}` : `Add ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}`}
        </h2>
        <form onSubmit={handleSubmit}>
          {renderFields()}
          <div className="flex justify-end space-x-2 mt-4">
            {isEditMode && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 text-sm transition-colors"
                aria-label={`Delete ${sectionType} entry`}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M9 7v12m6-12v12"
                  />
                </svg>
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm transition-colors"
            >
              {isEditMode ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default HomeFormModal;