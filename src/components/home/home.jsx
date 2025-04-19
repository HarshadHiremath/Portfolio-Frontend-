import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaSpinner } from 'react-icons/fa';
import Banner1 from '../../assets/HomeBanner1.png';
import Banner2 from '../../assets/HomeBanner2.png';
import Banner3 from '../../assets/HomeBanner3.png';
import Profile from '../../assets/Profile.jpg';
import './index.css';

const HomePage = () => {
  const slides = [
    { image: Banner1, alt: 'Project Screenshot 1' },
    { image: Banner2, alt: 'Project Screenshot 2' },
    { image: Banner3, alt: 'Project Screenshot 3' },
  ];
  const [journeyStats, setJourneyStats] = useState([]);
  const [notices, setNotices] = useState([]);
  const [skills, setSkills] = useState([]);
  const [link, setLink] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Validate URL (basic check for non-empty and starts with http(s)://)
  const isValidUrl = (url) => typeof url === 'string' && url.trim() && /^https?:\/\/.+$/.test(url);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_LOCALHOST || 'http://localhost:3500';
        const [journeyRes, noticesRes, linksRes, skillsRes] = await Promise.all([
          fetch(`${apiUrl}/journey`),
          fetch(`${apiUrl}/notices`),
          fetch(`${apiUrl}/link`), // Matches LinkRouter.js
          fetch(`${apiUrl}/skills`),
        ]);

        if (!journeyRes.ok || !noticesRes.ok || !linksRes.ok || !skillsRes.ok) {
          throw new Error(`Fetch failed: ${[journeyRes.status, noticesRes.status, linksRes.status, skillsRes.status].join(', ')}`);
        }

        const [journeyData, noticesData, linksData, skillsData] = await Promise.all([
          journeyRes.json(),
          noticesRes.json(),
          linksRes.json(),
          skillsRes.json(),
        ]);

        setJourneyStats(journeyData);
        setNotices(noticesData);
        setSkills(skillsData);
        const linkData = linksData || {};
        setLink(linkData);
        // console.log('Fetched link data:', linkData); // Debug
        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        // console.error('Fetch error:', err);
        setLoading(false);
        setTimeout(() => setError(''), 5000);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  // Animation variants for social icons (matches Footer.jsx)
  const socialIconVariants = {
    hover: { y: -5, scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.9 },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <FaSpinner className="animate-spin w-8 h-8 text-blue-600" aria-label="Loading" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Slideshow */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full relative"
      >
        <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] overflow-hidden">
          {slides.map((slide, index) => (
            <motion.img
              key={index}
              src={slide.image}
              alt={slide.alt}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              initial={{ scale: 1.1 }}
              animate={{ scale: index === currentSlide ? 1 : 1.1 }}
              transition={{ duration: 1 }}
              loading="lazy"
            />
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl w-full">
          {error && (
            <motion.p
              className="text-red-600 bg-red-100 border border-red-300 rounded-lg p-4 text-center mb-6 text-base"
              role="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.p>
          )}

          {/* Motivational Quote */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <blockquote className="text-2xl sm:text-3xl font-semibold text-gray-800 italic">
              “Code is the poetry of logic, and I’m here to write masterpieces.”
            </blockquote>
            <p className="text-gray-600 mt-2 text-base">– Harshad Hiremath</p>
          </motion.section>

          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col md:flex-row items-center gap-6"
          >
            <motion.img
              src={Profile}
              alt="Harshad Hiremath"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover shadow-lg border-4 border-gradient-to-r from-blue-200 to-blue-400"
              whileHover={{ scale: 1.3 }}
              loading="lazy"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Hi, I’m Harshad Hiremath</h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-4 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-white">
                Full-Stack Developer | Problem Solver | DSA
              </p>
              <p className="text-gray-600 mb-4 text-base max-w-xl">
                I’m passionate about building innovative web and ML solutions. With expertise in modern technologies, I create projects that solve real-world problems.
              </p>
              {/* Contact Info */}
              <div className="flex flex-col gap-3 mb-4">
                {link.gmail && (
                  <motion.div className="flex items-center justify-center md:justify-start gap-2" whileHover={{ x: 5 }}>
                    <FaEnvelope className="text-gray-600 text-lg" />
                    <a href={`mailto:${link.gmail}`} className="text-gray-600 hover:text-blue-600 transition-colors text-base">
                      {link.gmail}
                    </a>
                  </motion.div>
                )}
                {link.phone && (
                  <motion.div className="flex items-center justify-center md:justify-start gap-2" whileHover={{ x: 5 }}>
                    <FaPhone className="text-gray-600 text-lg" />
                    <a href={`tel:${link.phone}`} className="text-gray-600 hover:text-blue-600 transition-colors text-base">
                      {link.phone}
                    </a>
                  </motion.div>
                )}
              </div>
              {/* Buttons */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a
                  href={link.resume || '#'}
                  target={link.resume ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={`bg-black text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 focus:scale-105 text-base ${
                    !link.resume ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                  aria-label="Download Harshad's resume"
                  onClick={(e) => !link.resume && e.preventDefault()}
                >
                  Download Resume
                </a>
                <a
                  href="/contact"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-105 focus:scale-105 text-base"
                  aria-label="Contact Harshad"
                >
                  Let’s Connect
                </a>
              </div>
            </div>
          </motion.section>

          {/* Skills */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">My Skills</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <motion.span
                    key={skill._id}
                    className="bg-blue-100 text-blue-800 text-sm sm:text-base px-3 py-1 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill.name}
                  </motion.span>
                ))
              ) : (
                <p className="text-gray-600 text-base">No skills available.</p>
              )}
            </div>
          </motion.section>

          {/* Quick Stats */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">My Journey</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {journeyStats.length > 0 ? (
                journeyStats.map((stat) => (
                  <motion.div
                    key={stat._id}
                    className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <p className="text-3xl sm:text-4xl font-bold text-black">{stat.value}</p>
                    <p className="text-gray-900 text-xl">{stat.description}</p>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-600 text-base text-center col-span-full">No journey stats available.</p>
              )}
            </div>
          </motion.section>

          {/* Notice Board */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Update Board</h2>
            <div className="flex justify-center">
              {notices.length > 0 ? (
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500 w-full max-w-2xl hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{notices[0].title}</h3>
                  <p className="text-gray-600 mb-2 text-base">{notices[0].content}</p>
                  <p className="text-gray-500 text-sm">{notices[0].date}</p>
                </motion.div>
              ) : (
                <p className="text-gray-600 text-base">No notices available.</p>
              )}
            </div>
          </motion.section>

          {/* Social Media Links (matches Footer.jsx) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Connect With Me</h2>
            <div className="flex justify-center gap-4 flex-wrap">
              {isValidUrl(link.github) ? (
                <motion.a
                  href={link.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-gray-900 p-3 rounded-full hover:text-black transition-colors focus:ring-2 focus:ring-white"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-6 h-6 text-white" />
                </motion.a>
              ) : (
                // console.log('GitHub link missing or invalid:', link.github)
                <></>
              )}
              {isValidUrl(link.linkedIn) ? (
                <motion.a
                  href={link.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-gray-900 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors focus:ring-2 focus:ring-blue-600"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6 text-white" />
                </motion.a>
              ) : (
                // console.log('LinkedIn link missing or invalid:', link.linkedIn)
                <></>
              )}
              {isValidUrl(link.twitter) ? (
                <motion.a
                  href={link.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-gray-900 p-3 rounded-full hover:bg-blue-400 hover:text-white transition-colors focus:ring-2 focus:ring-blue-400"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-6 h-6 text-white" />
                </motion.a>
              ) : (
                // console.log('Twitter link missing or invalid:', link.twitter)
                <></>
              )}
              {isValidUrl(link.instagram) ? (
                <motion.a
                  href={link.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-gray-900 p-3 rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500 hover:text-white transition-colors focus:ring-2 focus:ring-purple-600"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-6 h-6 text-white" />
                </motion.a>
              ) : (
                // console.log('Instagram link missing or invalid:', link.instagram)
                <></>
              )}
              {isValidUrl(link.youtube) ? (
                <motion.a
                  href={link.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-gray-900 p-3 rounded-full hover:bg-red-600 hover:text-white transition-colors focus:ring-2 focus:ring-red-600"
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-6 h-6 text-white" />
                </motion.a>
              ) : (
                // console.log('YouTube link missing or invalid:', link.youtube)
                <></>
              )}
              {!isValidUrl(link.github) &&
                !isValidUrl(link.linkedIn) &&
                !isValidUrl(link.twitter) &&
                !isValidUrl(link.instagram) &&
                !isValidUrl(link.youtube) && (
                  <p className="text-gray-600 text-base">No social links available.</p>
                )}
            </div>
          </motion.section>

          {/* CTA Banner */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-gray-900 to-gray-900 text-white p-6 sm:p-8 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Explore My Work</h2>
            <p className="mb-4 text-base">Dive into my projects and see what I’ve been building!</p>
            <motion.a
              href="/project"
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 focus:bg-gray-100 transition-colors text-xl"
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
            >
              View Projects
            </motion.a>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;