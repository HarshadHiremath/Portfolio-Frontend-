import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import SectionList from './SectionList';
import AboutFormModal from './AboutFormModal';

const AdminAbout = () => {
  const [sections, setSections] = useState({
    education: [],
    experience: [],
    certifications: [],
    achievements: [],
    skills: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [currentSection, setCurrentSection] = useState('');

  // Fetch all section data
  const fetchSections = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError('');
      const apiUrl = import.meta.env.VITE_LOCALHOST || 'http://localhost:3500';
      const sectionTypes = ['education', 'experience', 'certifications', 'achievements', 'skills'];

      const promises = sectionTypes.map(async (type) => {
        const response = await fetch(`${apiUrl}/${type}`, { signal });
        if (!response.ok) {
          throw new Error(`Failed to fetch ${type}: ${response.statusText}`);
        }
        const data = await response.json().catch(() => {
          throw new Error(`Invalid JSON response for ${type}`);
        });
        return { type, data: Array.isArray(data) ? data : [] };
      });

      const results = await Promise.all(promises);
      const newSections = results.reduce((acc, { type, data }) => {
        acc[type] = data;
        return acc;
      }, {});
      setSections(newSections);
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
    fetchSections(controller.signal);
    return () => controller.abort();
  }, [fetchSections]);

  // Handle add/edit submission
  const handleSubmit = async (formData, sectionType) => {
    if (
      !formData.title?.trim() &&
      !formData.institution?.trim() &&
      !formData.role?.trim() &&
      !formData.name?.trim()
    ) {
      setError('A primary field (title, institution, role, or name) is required');
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
      setSections((prev) => ({
        ...prev,
        [sectionType]: isEditMode
          ? prev[sectionType].map((entry) => (entry._id === updatedEntry._id ? updatedEntry : entry))
          : [...prev[sectionType], updatedEntry],
      }));
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
        setSections((prev) => ({
          ...prev,
          [sectionType]: prev[sectionType].filter((entry) => entry._id !== entryId),
        }));
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

  // Open modal for adding new entry
  const openAddModal = (sectionType) => {
    setCurrentSection(sectionType);
    setEditEntry(null);
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
          Manage About Page
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

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Education</h2>
            <button
              onClick={() => openAddModal('education')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition-colors"
            >
              Add Education
            </button>
          </div>
          <SectionList
            entries={sections.education}
            sectionType="education"
            onEdit={(entry) => {
              setCurrentSection('education');
              setEditEntry(entry);
              setIsModalOpen(true);
            }}
            onDelete={(entryId) => handleDelete(entryId, 'education')}
          />
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
            <button
              onClick={() => openAddModal('experience')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition-colors"
            >
              Add Experience
            </button>
          </div>
          <SectionList
            entries={sections.experience}
            sectionType="experience"
            onEdit={(entry) => {
              setCurrentSection('experience');
              setEditEntry(entry);
              setIsModalOpen(true);
            }}
            onDelete={(entryId) => handleDelete(entryId, 'experience')}
          />
        </motion.section>

        {/* Certifications Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
            <button
              onClick={() => openAddModal('certifications')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition-colors"
            >
              Add Certification
            </button>
          </div>
          <SectionList
            entries={sections.certifications}
            sectionType="certifications"
            onEdit={(entry) => {
              setCurrentSection('certifications');
              setEditEntry(entry);
              setIsModalOpen(true);
            }}
            onDelete={(entryId) => handleDelete(entryId, 'certifications')}
          />
        </motion.section>

        {/* Achievements Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
            <button
              onClick={() => openAddModal('achievements')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition-colors"
            >
              Add Achievement
            </button>
          </div>
          <SectionList
            entries={sections.achievements}
            sectionType="achievements"
            onEdit={(entry) => {
              setCurrentSection('achievements');
              setEditEntry(entry);
              setIsModalOpen(true);
            }}
            onDelete={(entryId) => handleDelete(entryId, 'achievements')}
          />
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
            <button
              onClick={() => openAddModal('skills')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition-colors"
            >
              Add Skill
            </button>
          </div>
          <SectionList
            entries={sections.skills}
            sectionType="skills"
            onEdit={(entry) => {
              setCurrentSection('skills');
              setEditEntry(entry);
              setIsModalOpen(true);
            }}
            onDelete={(entryId) => handleDelete(entryId, 'skills')}
          />
        </motion.section>

        {isModalOpen && (
          <AboutFormModal
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

export default AdminAbout;