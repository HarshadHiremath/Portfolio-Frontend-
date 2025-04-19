import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import HomeFormModal from './HomeFormModal';

const AdminHome = () => {
  const [journeyStats, setJourneyStats] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [currentSection, setCurrentSection] = useState('');

  // Fetch all data
  const fetchData = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError('');
      const apiUrl = import.meta.env.VITE_LOCALHOST || 'http://localhost:3500';
      const sections = ['journey', 'notices'];

      const promises = sections.map(async (section) => {
        const response = await fetch(`${apiUrl}/${section}`, { signal });
        if (!response.ok) {
          throw new Error(`Failed to fetch ${section}: ${response.statusText}`);
        }
        const data = await response.json();
        return { section, data: Array.isArray(data) ? data : [] };
      });

      const results = await Promise.all(promises);
      const newData = results.reduce((acc, { section, data }) => {
        acc[section] = data;
        return acc;
      }, { journey: [], notices: [] });
      setJourneyStats(newData.journey);
      setNotices(newData.notices);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message || 'An unexpected error occurred');
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  // Handle add/edit submission
  const handleSubmit = async (formData, sectionType) => {
    if (!formData.title?.trim() || (sectionType === 'journey' && !formData.value?.trim())) {
      setError('Title and value (for journey) are required');
      setTimeout(() => setError(''), 3000);
      return false;
    }

    try {
      const apiUrl = import.meta.env.VITE_LOCALHOST || 'http://localhost:3500';
      const isEditMode = !!formData._id;
      const url = isEditMode ? `${apiUrl}/${sectionType}/${formData._id}` : `${apiUrl}/${sectionType}`;
      const method = isEditMode ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditMode ? 'update' : 'create'} ${sectionType}: ${response.statusText}`);
      }

      const updatedEntry = await response.json();
      if (sectionType === 'journey') {
        setJourneyStats((prev) =>
          isEditMode
            ? prev.map((entry) => (entry._id === updatedEntry._id ? updatedEntry : entry))
            : [...prev, updatedEntry]
        );
      } else {
        setNotices((prev) =>
          isEditMode
            ? prev.map((entry) => (entry._id === updatedEntry._id ? updatedEntry : entry))
            : [...prev, updatedEntry]
        );
      }
      setSuccessMessage(`${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)} ${isEditMode ? 'updated' : 'created'} successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
      return true;
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      setTimeout(() => setError(''), 3000);
      return false;
    }
  };

  // Handle deletion
  const handleDelete = async (entryId, sectionType) => {
    if (window.confirm(`Are you sure you want to delete this ${sectionType} entry?`)) {
      try {
        const apiUrl = import.meta.env.VITE_LOCALHOST || 'http://localhost:3500';
        const response = await fetch(`${apiUrl}/${sectionType}/${entryId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`Failed to delete ${sectionType}: ${response.statusText}`);
        }
        if (sectionType === 'journey') {
          setJourneyStats((prev) => prev.filter((entry) => entry._id !== entryId));
        } else {
          setNotices((prev) => prev.filter((entry) => entry._id !== entryId));
        }
        setSuccessMessage(`${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)} deleted successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
        return true;
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
        setTimeout(() => setError(''), 3000);
        return false;
      }
    }
    return false;
  };

  // Open modal
  const openModal = (sectionType, entry = null) => {
    setCurrentSection(sectionType);
    setEditEntry(entry);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <p className="text-gray-500 text-lg">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-4xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-6 text-center"
        >
          Manage Home Page
        </motion.h1>
        {error && (
          <p className="text-red-500 text-center mb-4" role="alert" aria-live="assertive">
            {error}
          </p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center mb-4" role="alert" aria-live="assertive">
            {successMessage}
          </p>
        )}

        {/* My Journey Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Journey</h2>
            <button
              onClick={() => openModal('journey')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition-colors"
            >
              Add Stat
            </button>
          </div>
          <div className="space-y-4">
            {journeyStats.length === 0 ? (
              <p className="text-gray-600 text-center">No journey stats available. Add one to get started!</p>
            ) : (
              journeyStats.map((stat) => (
                <motion.div
                  key={stat._id}
                  className="bg-white border-l-4 border-blue-500 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="text-lg font-semibold text-gray-900">{stat.title || 'Untitled'}</h3>
                      <p className="text-2xl font-bold text-blue-500">{stat.value || 'N/A'}</p>
                      <p className="text-sm text-gray-600">{stat.description || 'No description'}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal('journey', stat)}
                        className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm transition-colors"
                        aria-label="Edit journey stat"
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
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(stat._id, 'journey')}
                        className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 text-sm transition-colors"
                        aria-label="Delete journey stat"
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
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.section>

        {/* Notice Board Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Notice Board</h2>
            <button
              onClick={() => openModal('notices')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition-colors"
            >
              Add Notice
            </button>
          </div>
          <div className="space-y-4">
            {notices.length === 0 ? (
              <p className="text-gray-600 text-center">No notices available. Add one to get started!</p>
            ) : (
              notices.map((notice) => (
                <motion.div
                  key={notice._id}
                  className="bg-white border-l-4 border-red-500 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="text-lg font-semibold text-gray-900">{notice.title || 'Untitled'}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{notice.content || 'No content'}</p>
                      <p className="text-sm text-gray-500">{notice.date || 'No date'}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal('notices', notice)}
                        className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm transition-colors"
                        aria-label="Edit notice"
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
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(notice._id, 'notices')}
                        className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 text-sm transition-colors"
                        aria-label="Delete notice"
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
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.section>

        {isModalOpen && (
          <HomeFormModal
            entry={editEntry}
            sectionType={currentSection}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            onClose={() => {
              setIsModalOpen(false);
              setEditEntry(null);
              setCurrentSection('');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminHome;