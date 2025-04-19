import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const [sections, setSections] = useState({
    education: [],
    experience: [],
    certifications: [],
    achievements: [],
    skills: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const apiUrl = import.meta.env.VITE_LOCALHOST;
        const sectionTypes = ['education', 'experience', 'certifications', 'achievements', 'skills'];

        const promises = sectionTypes.map(async (type) => {
          const response = await fetch(`${apiUrl}/${type}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${type}: ${response.statusText}`);
          }
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const timelineDotVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    hover: { scale: 1.2 },
  };

  if (loading) {
    return (
      <motion.div 
        className="min-h-screen bg-white flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-black border-t-transparent rounded-full"
        />
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600 text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Education Timeline */}
        <motion.section
          className="mb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-bold text-black mb-12 relative inline-block"
            variants={itemVariants}
          >
            <span className="relative">Education</span>

          </motion.h2>
          
          <motion.div 
            className="relative"
            variants={containerVariants}
          >
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2"></div>
            
            {sections.education.length === 0 ? (
              <motion.p 
                className="text-gray-600 text-center"
                variants={itemVariants}
              >
                No education entries available.
              </motion.p>
            ) : (
              sections.education.map((edu, index) => (
                <motion.div
                  key={edu._id}
                  className="flex mb-16 pl-16 relative"
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <motion.div
                    className="absolute left-8 top-0 w-6 h-6 bg-black rounded-full transform -translate-x-1/2"
                    variants={timelineDotVariants}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.div
                    className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-gray-200 transition-all"
                    variants={cardHoverVariants}
                  >
                    <div className="p-8 flex flex-col md:flex-row gap-6">
                      {edu.logo && (
                        <div className="flex-shrink-0">
                          <motion.img
                            src={edu.logo}
                            alt={`${edu.institution} Logo`}
                            className="w-20 h-20 object-contain rounded-lg bg-white p-2 border border-gray-200"
                            whileHover={{ scale: 1.05 }}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-black mb-2">{edu.institution || 'Untitled'}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {edu.duration && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                              {edu.duration}
                            </span>
                          )}
                          {edu.score && (
                            <span className="px-3 py-1 bg-black text-white rounded-full text-sm font-medium">
                              {edu.score}
                            </span>
                          )}
                        </div>
                        <div
                          className="text-gray-700 prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: edu.description || 'No description' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section
          className="mb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-bold text-black mb-12 relative inline-block"
            variants={itemVariants}
          >
            <span className="relative">Experience</span>
          </motion.h2>
          
          <motion.div 
            className="relative"
            variants={containerVariants}
          >
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2"></div>
            
            {sections.experience.length === 0 ? (
              <motion.p 
                className="text-gray-600 text-center"
                variants={itemVariants}
              >
                No experience entries available.
              </motion.p>
            ) : (
              sections.experience.map((exp) => (
                <motion.div
                  key={exp._id}
                  className="flex mb-16 pl-16 relative"
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <motion.div
                    className="absolute left-8 top-0 w-6 h-6 bg-black rounded-full transform -translate-x-1/2"
                    variants={timelineDotVariants}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.div
                    className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-gray-200 transition-all"
                    variants={cardHoverVariants}
                  >
                    <div className="p-8 flex flex-col md:flex-row gap-6">
                      {exp.logo && (
                        <div className="flex-shrink-0">
                          <motion.img
                            src={exp.logo}
                            alt={`${exp.role} Logo`}
                            className="w-20 h-20 object-contain rounded-lg bg-white p-2 border border-gray-200"
                            whileHover={{ scale: 1.05 }}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-black mb-2">{exp.role || 'Untitled'}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {exp.duration && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                              {exp.duration}
                            </span>
                          )}
                        </div>
                        <div
                          className="text-gray-700 prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: exp.description || 'No description' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          className="mb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-bold text-black mb-12 text-center"
            variants={itemVariants}
          >
            <span className="relative inline-block">
              Certifications
              <span className="absolute bottom-0 left-0 w-full h-2 bg-gray-200 -z-10"></span>
            </span>
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {sections.certifications.length === 0 ? (
              <motion.p 
                className="text-gray-600 text-center col-span-full"
                variants={itemVariants}
              >
                No certifications available.
              </motion.p>
            ) : (
              sections.certifications.map((cert) => (
                <motion.div
                  key={cert._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-gray-200 transition-all"
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <div className="p-8 h-full flex flex-col">
                    {cert.logo && (
                      <motion.div 
                        className="mb-6 flex justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <img
                          src={cert.logo}
                          alt={`${cert.title} Logo`}
                          className="w-16 h-16 object-contain"
                        />
                      </motion.div>
                    )}
                    <h3 className="text-xl font-bold text-black mb-4 text-center">{cert.title || 'Untitled'}</h3>
                    <div
                      className="text-gray-700 mb-6 flex-grow prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: cert.description || 'No description' }}
                    />
                    {cert.link && (
                      <div className="mt-auto text-center">
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                          View Certificate
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          className="mb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-bold text-black mb-12 text-center"
            variants={itemVariants}
          >
            <span className="relative inline-block">
              Achievements
              <span className="absolute bottom-0 left-0 w-full h-2 bg-gray-200 -z-10"></span>
            </span>
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {sections.achievements.length === 0 ? (
              <motion.p 
                className="text-gray-600 text-center col-span-full"
                variants={itemVariants}
              >
                No achievements available.
              </motion.p>
            ) : (
              sections.achievements.map((ach) => (
                <motion.div
                  key={ach._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-gray-200 transition-all"
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <div className="p-8 h-full flex flex-col">
                    <h3 className="text-xl font-bold text-black mb-4 text-left">{ach.title || 'Untitled'}</h3>
                    <div
                      className="text-gray-700 prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: ach.description || 'No description' }}
                    />
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.section>

        {/* Skills */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-bold text-black mb-12 text-center"
            variants={itemVariants}
          >
            <span className="relative inline-block">
              Skills
              <span className="absolute bottom-0 left-0 w-full h-2 bg-gray-200 -z-10"></span>
            </span>
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            variants={containerVariants}
          >
            {sections.skills.length === 0 ? (
              <motion.p 
                className="text-gray-600 text-center col-span-full"
                variants={itemVariants}
              >
                No skills available.
              </motion.p>
            ) : (
              sections.skills.map((skill) => (
                <motion.div
                  key={skill._id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:border-gray-200 transition-all p-6 flex flex-col items-center"
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    transition: { duration: 0.3 },
                  }}
                >
                  {skill.logo ? (
                    <motion.img
                      src={skill.logo}
                      alt={`${skill.name} Logo`}
                      className="w-16 h-16 object-contain mb-4"
                      whileHover={{ scale: 1.1 }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
                      <span className="text-black font-bold">{skill.name.charAt(0)}</span>
                    </div>
                  )}
                  <p className="text-black font-medium text-center">{skill.name || 'Untitled'}</p>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default AboutPage;