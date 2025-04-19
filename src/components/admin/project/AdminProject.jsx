import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminProjects = () => {
  const [sections, setSections] = useState({
    projects: [],
    milestones: [],
    marquees: [],
    testimonials: [],
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
        const sectionTypes = ['projects', 'milestones', 'marquees', 'testimonials'];

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

      const body = { ...formData };
      if (sectionType === 'projects' && formData.techStack) {
        body.techStack = formData.techStack.split(',').map((tech) => tech.trim());
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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
    if (!window.confirm(`Are you sure you want to delete this ${sectionType.slice(0, -1)}?`)) return;
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
      item
        ? { ...item, techStack: item.techStack ? item.techStack.join(', ') : '' }
        : {
            title: '',
            description: '',
            image: '',
            techStack: '',
            liveLink: '',
            githubLink: '',
            date: '',
            text: '',
            quote: '',
            source: '',
          }
    );
    setModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          Manage Projects
        </motion.h1>

        {/* Projects Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
            <button
              onClick={() => openModal('projects')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition-colors"
            >
              Add Project
            </button>
          </div>
          {sections.projects.length === 0 ? (
            <p className="text-gray-600 text-center">No projects available.</p>
          ) : (
            <div className="space-y-4">
              {sections.projects.map((project) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-l-4 border-blue-500 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                      <p className="text-sm text-gray-500 mt-1">{project.techStack.join(', ')}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal('projects', project)}
                        className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm transition-colors"
                        aria-label="Edit project"
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
                        onClick={() => handleDelete('projects', project._id)}
                        className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 text-sm transition-colors"
                        aria-label="Delete project"
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

        {/* Milestones Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Milestones</h2>
            <button
              onClick={() => openModal('milestones')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition-colors"
            >
              Add Milestone
            </button>
          </div>
          {sections.milestones.length === 0 ? (
            <p className="text-gray-600 text-center">No milestones available.</p>
          ) : (
            <div className="space-y-4">
              {sections.milestones.map((milestone) => (
                <motion.div
                  key={milestone._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-l-4 border-green-500 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{milestone.description}</p>
                      <p className="text-sm text-gray-500 mt-1">{milestone.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal('milestones', milestone)}
                        className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm transition-colors"
                        aria-label="Edit milestone"
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
                        onClick={() => handleDelete('milestones', milestone._id)}
                        className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 text-sm transition-colors"
                        aria-label="Delete milestone"
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

        {/* Marquee Items Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Marquee Items</h2>
            <button
              onClick={() => openModal('marquees')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition-colors"
            >
              Add Marquee Item
            </button>
          </div>
          {sections.marquees.length === 0 ? (
            <p className="text-gray-600 text-center">No marquee items available.</p>
          ) : (
            <div className="space-y-4">
              {sections.marquees.map((marquee) => (
                <motion.div
                  key={marquee._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-l-4 border-purple-500 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-sm text-gray-600 line-clamp-2">{marquee.text}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal('marquees', marquee)}
                        className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm transition-colors"
                        aria-label="Edit marquee item"
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
                        onClick={() => handleDelete('marquees', marquee._id)}
                        className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 text-sm transition-colors"
                        aria-label="Delete marquee item"
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

        {/* Testimonials Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Testimonials</h2>
            <button
              onClick={() => openModal('testimonials')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition-colors"
            >
              Add Testimonial
            </button>
          </div>
          {sections.testimonials.length === 0 ? (
            <p className="text-gray-600 text-center">No testimonials available.</p>
          ) : (
            <div className="space-y-4">
              {sections.testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-l-4 border-yellow-500 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-sm text-gray-600 italic line-clamp-2">"{testimonial.quote}"</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{testimonial.source}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal('testimonials', testimonial)}
                        className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm transition-colors"
                        aria-label="Edit testimonial"
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
                        onClick={() => handleDelete('testimonials', testimonial._id)}
                        className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 text-sm transition-colors"
                        aria-label="Delete testimonial"
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
                  {currentSection === 'projects' && (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Title</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Description</label>
                        <textarea
                          name="description"
                          value={formData.description || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Image URL</label>
                        <input
                          type="url"
                          name="image"
                          value={formData.image || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Tech Stack (comma-separated)</label>
                        <input
                          type="text"
                          name="techStack"
                          value={formData.techStack || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Live Link</label>
                        <input
                          type="url"
                          name="liveLink"
                          value={formData.liveLink || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">GitHub Link</label>
                        <input
                          type="url"
                          name="githubLink"
                          value={formData.githubLink || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                    </>
                  )}
                  {currentSection === 'milestones' && (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Title</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Date (YYYY-MM-DD)</label>
                        <input
                          type="text"
                          name="date"
                          value={formData.date || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Description</label>
                        <textarea
                          name="description"
                          value={formData.description || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          required
                        />
                      </div>
                    </>
                  )}
                  {currentSection === 'marquees' && (
                    <div className="mb-4">
                      <label className="block text-sm text-gray-700 mb-1">Text</label>
                      <input
                        type="text"
                        name="text"
                        value={formData.text || ''}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        required
                      />
                    </div>
                  )}
                  {currentSection === 'testimonials' && (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Quote</label>
                        <textarea
                          name="quote"
                          value={formData.quote || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Source</label>
                        <input
                          type="text"
                          name="source"
                          value={formData.quote || ''}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          required
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

export default AdminProjects;