import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AboutFormModal = ({ entry, sectionType, onSubmit, onDelete, onClose }) => {
  const isEditMode = !!entry;
  const [formData, setFormData] = useState({
    _id: entry?._id || '',
    institution: entry?.institution || '', // Education
    role: entry?.role || '', // Experience
    title: entry?.title || '', // Certifications, Achievements
    name: entry?.name || '', // Skills
    logo: entry?.logo || '',
    duration: entry?.duration || '', // Education, Experience
    score: entry?.score || '', // Education
    description: entry?.description || '',
    link: entry?.link || '', // Certifications
    year: entry?.year || '', // Achievements
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
        institution: '',
        role: '',
        title: '',
        name: '',
        logo: '',
        duration: '',
        score: '',
        description: '',
        link: '',
        year: '',
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
    switch (sectionType) {
      case 'education':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                Institution
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration (e.g., 2015 - 2018)
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">
                Score (e.g., Percentage: 85%)
              </label>
              <input
                type="text"
                id="score"
                name="score"
                value={formData.score}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
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
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                type="url"
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {formData.logo && (
                <img
                  src={formData.logo}
                  alt="Logo Preview"
                  className="mt-2 w-full h-16 object-contain rounded-md"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=Invalid+Image';
                  }}
                />
              )}
            </div>
          </>
        );
      case 'experience':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration (e.g., 2022 - 2023)
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                aria-required="true"
              />
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
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                type="url"
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {formData.logo && (
                <img
                  src={formData.logo}
                  alt="Logo Preview"
                  className="mt-2 w-full h-16 object-contain rounded-md"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=Invalid+Image';
                  }}
                />
              )}
            </div>
          </>
        );
      case 'certifications':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                aria-required="true"
              />
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
              <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                Certificate Link
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                type="url"
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {formData.logo && (
                <img
                  src={formData.logo}
                  alt="Logo Preview"
                  className="mt-2 w-full h-16 object-contain rounded-md"
                />
              )}
            </div>
          </>
        );
      case 'achievements':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="text"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                aria-required="true"
              />
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
          </>
        );
      case 'skills':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Skill Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                type="url"
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {formData.logo && (
                <img
                  src={formData.logo}
                  alt="Logo Preview"
                  className="mt-2 w-full h-16 object-contain rounded-md"
                />
              )}
            </div>
          </>
        );
      default:
        return null;
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
          {isEditMode ? `Edit ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}` : `Add ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}`}
        </h2>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-2">
            {renderFields()}
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
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              {isEditMode ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AboutFormModal;