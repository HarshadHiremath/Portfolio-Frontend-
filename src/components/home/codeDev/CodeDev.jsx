import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CodingProfilesPage = () => {
  const [data, setData] = useState({
    profiles: [],
    badges: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const apiUrl = import.meta.env.VITE_LOCALHOST;
        const endpoints = ['profiles', 'badges'];

        const promises = endpoints.map(async (endpoint) => {
          const response = await fetch(`${apiUrl}/${endpoint}`);
          if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
          const data = await response.json();
          return { endpoint, data: Array.isArray(data) ? data : [] };
        });

        const results = await Promise.all(promises);
        const newData = results.reduce((acc, { endpoint, data }) => {
          acc[endpoint] = data;
          return acc;
        }, {});
        setData(newData);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalQuestionsSolved = data.profiles.reduce((sum, profile) => sum + (profile.questionsSolved || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-5xl w-full">
        {/* Header and Stats Overview */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Coding Profiles</h1>
          <p className="text-lg text-gray-600 mb-6">
            Explore my competitive programming journey across top platforms.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900">
              Total Questions Solved: <span className="text-blue-500">{totalQuestionsSolved}</span>
            </h2>
          </div>
        </motion.section>

        {/* Profiles Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Profiles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.profiles.length === 0 ? (
              <p className="text-gray-600 text-center col-span-full">No profiles available.</p>
            ) : (
              data.profiles.map((profile, index) => (
                <motion.div
                  key={profile._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
                >
                  {profile.logo && (
                    <img
                      src={profile.logo}
                      alt={`${profile.platform} Logo`}
                      className="w-16 h-16 object-contain mb-4"
                    />
                  )}
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{profile.platform}</h2>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Username:</span> {profile.username}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Questions Solved:</span> {profile.questionsSolved}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Rank:</span> {profile.rank}
                  </p>
                  <a
                    href={profile.profileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    View Profile
                  </a>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Badges Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Badges</h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl">
              {data.badges.length === 0 ? (
                <p className="text-gray-600 text-center col-span-full">No badges available.</p>
              ) : (
                data.badges.map((badge, index) => (
                  <motion.div
                    key={badge._id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
                  >
                    {badge.logo && (
                      <img
                        src={badge.logo}
                        alt={`${badge.name} Badge`}
                        className="w-12 h-12 mx-auto mb-2"
                      />
                    )}
                    <p className="text-gray-900 font-semibold">{badge.name}</p>
                    <p className="text-gray-600 text-sm">{badge.platform}</p>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Inline CSS for Marquee Animation
const marqueeStyles = `
  @keyframes marquee {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  .animate-marquee {
    display: inline-block;
    animation: marquee 60s linear infinite;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = marqueeStyles;
document.head.appendChild(styleSheet);

export default CodingProfilesPage;