import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminCodev = () => {
  const [sections, setSections] = useState({
    profiles: [],
    badges: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const apiUrl = import.meta.env.VITE_LOCALHOST || 'http://localhost:3500';
        const sectionTypes = ['profiles', 'badges'];

        const promises = sectionTypes.map(async (type) => {
          const response = await fetch(`${apiUrl}/${type}`);
          if (!response.ok) throw new Error(`Failed to fetch ${type}`);
          const data = await response.json();
          return { type, data: Array.isArray(data) ? data : [] };
        });

        const results = await Promise.all(promises);
        const newSections = results.reduce((acc, { type, data }) => {
          acc[type] = data;
          return acc;
        }, {});
        setSections(newSections);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle form submission (add or update)
  const handleSubmit = async (e, sectionType) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_LOCALHOST || 'http://localhost:3500';
      const method = currentItem ? 'PATCH' : 'POST';
      const url = currentItem
        ? `${apiUrl}/${sectionType}/${currentItem._id}`
        : `${apiUrl}/${sectionType}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Failed to ${currentItem ? 'update' : 'add'} ${sectionType}`);
      const updatedItem = await response.json();

      setSections((prev) => ({
        ...prev,
        [sectionType]: currentItem
          ? prev[sectionType].map((item) =>
              item._id === updatedItem._id ? updatedItem : item
            )
          : [...prev[sectionType], updatedItem],
      }));

      setModalOpen(false);
      setFormData({});
      setCurrentItem(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle delete
  const handleDelete = async (sectionType, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${sectionType.slice(0, -1)} entry?`)) return;
    try {
      const apiUrl = import.meta.env.VITE_LOCALHOST || 'http://localhost:3500';
      const response = await fetch(`${apiUrl}/${sectionType}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error(`Failed to delete ${sectionType}`);
      setSections((prev) => ({
        ...prev,
        [sectionType]: prev[sectionType].filter((item) => item._id !== id),
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  // Open modal for add/edit
  const openModal = (sectionType, item = null) => {
    setCurrentSection(sectionType);
    setCurrentItem(item);
    setFormData(
      item || {
        platform: '',
        username: '',
        profileLink: '',
        questionsSolved: 0,
        rank: '',
        logo: '',
        name: '',
      }
    );
    setModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'questionsSolved' ? parseInt(value, 10) || 0 : value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <p className="text-red-500 text-lg">{error}</p>
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
          Manage Coding Profiles
        </motion.h1>

        {/* Profiles Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Profiles</h2>
            <button
              onClick={() => openModal('profiles')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition-colors"
            >
              Add Profile
            </button>
          </div>
          {sections.profiles.length === 0 ? (
            <p className="text-gray-600 text-center">No profiles available.</p>
          ) : (
            <div className="space-y-4">
              {sections.profiles.map((profile) => (
                <motion.div
                  key={profile._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-l-4 border-blue-500 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      {profile.logo && (
                        <img
                          src={profile.logo}
                          alt={`${profile.platform} Logo`}
                          className="w-12 h-12 object-contain rounded-full"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50?text=Logo';
                          }}
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {profile.platform || 'Untitled'}
                        </h3>
                        <p className="text-sm text-gray-600">Username: {profile.username || 'Unknown'}</p>
                        <p className="text-sm text-gray-600">Solved: {profile.questionsSolved || 0}</p>
                        <p className="text-sm text-gray-600">Rank: {profile.rank || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {profile.profileLink && (
                        <a
                          href={profile.profileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 text-sm transition-colors"
                          aria-label="View profile"
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
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          View
                        </a>
                      )}
                      <button
                        onClick={() => openModal('profiles', profile)}
                        className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm transition-colors"
                        aria-label="Edit profile"
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
                        onClick={() => handleDelete('profiles', profile._id)}
                        className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 text-sm transition-colors"
                        aria-label="Delete profile"
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
              ))}
            </div>
          )}
        </motion.section>

        {/* Badges Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Badges</h2>
            <button
              onClick={() => openModal('badges')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition-colors"
            >
              Add Badge
            </button>
          </div>
          {sections.badges.length === 0 ? (
            <p className="text-gray-600 text-center">No badges available.</p>
          ) : (
            <div className="space-y-4">
              {sections.badges.map((badge) => (
                <motion.div
                  key={badge._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-l-4 border-green-500 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      {badge.logo && (
                        <img
                          src={badge.logo}
                          alt={`${badge.name} Logo`}
                          className="w-12 h-12 object-contain rounded-full"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50?text=Badge';
                          }}
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {badge.name || 'Untitled'}
                        </h3>
                        <p className="text-sm text-gray-600">Platform: {badge.platform || 'No platform'}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal('badges', badge)}
                        className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm transition-colors"
                        aria-label="Edit badge"
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
                        onClick={() => handleDelete('badges', badge._id)}
                        className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 text-sm transition-colors"
                        aria-label="Delete badge"
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
              ))}
            </div>
          )}
        </motion.section>

        {/* Modal for Add/Edit */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {currentItem ? 'Edit' : 'Add'} {currentSection.slice(0, -1)}
                </h2>
                <form onSubmit={(e) => handleSubmit(e, currentSection)}>
                  {currentSection === 'profiles' ? (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Platform</label>
                        <input
                          type="text"
                          name="platform"
                          value={formData.platform || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Username</label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Profile Link</label>
                        <input
                          type="url"
                          name="profileLink"
                          value={formData.profileLink || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Questions Solved</label>
                        <input
                          type="number"
                          name="questionsSolved"
                          value={formData.questionsSolved || 0}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          required
                          min="0"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Rank</label>
                        <input
                          type="text"
                          name="rank"
                          value={formData.rank || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Logo URL</label>
                        <input
                          type="url"
                          name="logo"
                          value={formData.logo || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Platform</label>
                        <input
                          type="text"
                          name="platform"
                          value={formData.platform || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Logo URL</label>
                        <input
                          type="url"
                          name="logo"
                          value={formData.logo || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                    </>
                  )}
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm transition-colors"
                    >
                      {currentItem ? 'Update' : 'Add'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminCodev;