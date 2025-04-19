import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProjectsPage = () => {
  const [data, setData] = useState({
    projects: [],
    milestones: [],
    marquees: [],
    testimonials: [],
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
        const endpoints = ['projects', 'milestones', 'marquees', 'testimonials'];

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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-5xl w-full">
        {/* Header and Stats Overview */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">My Projects</h1>
          <p className="text-base sm:text-lg text-gray-800 mb-6">
            Explore the projects I’ve built, showcasing my skills and creativity.
          </p>
        </motion.section>

        {/* Featured Project Banner */}
        {data.projects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              Featured Project
            </h2>
            <div className="bg-white p-4 sm:p-6 rounded-lg border flex flex-col md:flex-row items-center gap-4 sm:gap-6">
              <img
                src={data.projects[0].image}
                alt={data.projects[0].title}
                className="w-full md:w-1/2 h-48 sm:h-64 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                  {data.projects[0].title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4">
                  {data.projects[0].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {data.projects[0].techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-100 text-blue-800 text-xs sm:text-sm px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {data.projects[0].liveLink && (
                    <a
                      href={data.projects[0].liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
                    >
                      Live Demo
                    </a>
                  )}
                  {data.projects[0].githubLink && (
                    <a
                      href={data.projects[0].githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-600 text-sm sm:text-base"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Marquee */}
        {data.marquees.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="mb-12 overflow-hidden bg-blue-100 py-3"
          >
            <div className="animate-marquee whitespace-nowrap">
              {data.marquees.map((marquee, index) => (
                <span key={marquee._id} className="mx-4 text-gray-800 font-medium text-sm sm:text-base">
                  {marquee.text}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Project Timeline */}
        {data.milestones.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              Project Milestones
            </h2>
            <div className="relative border-l-4 border-blue-500 flex justify-center">
              <div className="w-full max-w-2xl">
                {data.milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="mb-10 ml-6"
                  >
                    <div className="absolute w-6 h-6 bg-blue-500 rounded-full -left-3 border-2 border-white"></div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">{milestone.description}</p>
                      <p className="text-gray-500 text-xs sm:text-sm">{milestone.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Projects Grid */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            All Projects
          </h2>
          {data.projects.length === 0 ? (
            <p className="text-gray-600 text-center">No projects available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-4 sm:p-6 rounded-lg border hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-100 text-blue-800 text-xs sm:text-sm px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-600 text-sm sm:text-base"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Testimonials Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Testimonials
          </h2>
          {data.testimonials.length === 0 ? (
            <p className="text-gray-600 text-center">No testimonials available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-4 sm:p-6 rounded-lg border hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
                >
                  <p className="text-gray-600 text-sm sm:text-base mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-gray-900 font-semibold text-sm sm:text-base">
                    — {testimonial.source}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
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
    animation: marquee 40s linear infinite;
    animation-delay: 2s;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = marqueeStyles;
document.head.appendChild(styleSheet);

export default ProjectsPage;