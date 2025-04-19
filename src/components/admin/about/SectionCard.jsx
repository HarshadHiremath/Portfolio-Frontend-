import React from 'react';
import { motion } from 'framer-motion';

const SectionCard = ({ entry, sectionType, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this ${sectionType} entry?`)) {
      onDelete(entry._id);
    }
  };

  const renderContent = () => {
    switch (sectionType) {
      case 'education':
        return (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              {entry.logo && (
                <img
                  src={entry.logo}
                  alt={`${entry.institution} Logo`}
                  className="w-12 h-12 object-contain rounded-full"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50?text=Logo';
                  }}
                />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">{entry.institution || 'Untitled'}</h3>
                <p className="text-sm text-gray-600">{entry.duration || 'Unknown'}</p>
                <p className="text-sm text-gray-600">{entry.score || 'N/A'}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{entry.description || 'No description'}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(entry)}
                className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm transition-colors"
                aria-label={`Edit ${sectionType} entry`}
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
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              {entry.logo && (
                <img
                  src={entry.logo}
                  alt={`${entry.role} Logo`}
                  className="w-12 h-12 object-contain rounded-full"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50?text=Logo';
                  }}
                />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">{entry.role || 'Untitled'}</h3>
                <p className="text-sm text-gray-600">{entry.duration || 'Unknown'}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{entry.description || 'No description'}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(entry)}
                className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm transition-colors"
                aria-label={`Edit ${sectionType} entry`}
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
            </div>
          </div>
        );
      case 'certifications':
        return (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              {entry.logo && (
                <img
                  src={entry.logo}
                  alt={`${entry.title} Logo`}
                  className="w-12 h-12 object-contain rounded-full"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50?text=Logo';
                  }}
                />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">{entry.title || 'Untitled'}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{entry.description || 'No description'}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {entry.link && (
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 text-sm transition-colors"
                  aria-label="View certificate"
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
                onClick={() => onEdit(entry)}
                className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm transition-colors"
                aria-label={`Edit ${sectionType} entry`}
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
            </div>
          </div>
        );
      case 'achievements':
        return (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{entry.title || 'Untitled'}</h3>
              <p className="text-sm text-gray-600">{entry.year || 'Unknown'}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{entry.description || 'No description'}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(entry)}
                className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm transition-colors"
                aria-label={`Edit ${sectionType} entry`}
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
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 NIRAVsm:mb-0">
              {entry.logo && (
                <img
                  src={entry.logo}
                  alt={`${entry.name} Logo`}
                  className="w-12 h-12 object-contain rounded-full"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50?text=Logo';
                  }}
                />
              )}
              <div>
                <p className="text-lg font-semibold text-gray-900">{entry.name || 'Untitled'}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(entry)}
                className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm transition-colors"
                aria-label={`Edit ${sectionType} entry`}
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
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="bg-white border-l-4 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
      style={{
        borderColor: {
          education: '#3B82F6', // blue-500
          experience: '#10B981', // green-500
          certifications: '#F59E0B', // yellow-500
          achievements: '#8B5CF6', // purple-500
          skills: '#EF4444', // red-500
        }[sectionType],
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {renderContent()}
    </motion.div>
  );
};

export default SectionCard;