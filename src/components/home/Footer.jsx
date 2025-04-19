import React, { useEffect, useState } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../../assets/LogoFooter.jpg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [link, setLink] = useState({});

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LOCALHOST}/link`);
        if (!response.ok) {
          throw new Error(`Failed to fetch links: ${response.statusText}`);
        }
        const data = await response.json();

        // Remove unwanted fields (_id, __v)
        const sanitizedData = Object.keys(data).reduce((acc, key) => {
          if (key !== "_id" && key !== "__v") {
            acc[key] = data[key];
          }
          return acc;
        }, {});

        setLink(sanitizedData);
      } catch (err) {
        console.error("Error fetching links:", err);
      }
    };
    fetchLinks();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const socialIconVariants = {
    hover: {
      y: -5,
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand Section */}
          <motion.div 
            className="flex flex-col items-center md:items-start"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-4"
            >
              <img
                src={logo}
                alt="Harshad Hiremath Logo"
                className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">Harshad Hiremath</h3>
            <p className="text-gray-200 text-center md:text-left max-w-xs">
            Building solutions that bridge the gap between imagination and technology.
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div 
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              <span className="relative">Contact Me</span>
            </h3>
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
              >
                <FaEnvelope className="text-gray-400 text-xl" />
                <a
                  href={`mailto:${link.gmail}`}
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  {link.gmail || "example@email.com"}
                </a>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
              >
                <FaPhone className="text-gray-200 text-xl" />
                <a
                  href={`tel:${link.phone}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.phone || "+1 (123) 456-7890"}
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Media Section */}
          <motion.div 
            className="flex flex-col items-center md:items-end"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              <span className="relative">Connect With Me</span>
            </h3>
            <div className="flex space-x-4">
              {link.github && (
                <motion.a
                  href={link.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-gray-900 p-3 rounded-full hover:bg-white hover:text-black transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-xl" />
                </motion.a>
              )}
              {link.linkedIn && (
                <motion.a
                  href={link.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-gray-900 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-xl" />
                </motion.a>
              )}
              {link.twitter && (
                <motion.a
                  href={link.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-gray-900 p-3 rounded-full hover:bg-blue-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-xl" />
                </motion.a>
              )}
              {link.instagram && (
                <motion.a
                  href={link.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-gray-900 p-3 rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-xl" />
                </motion.a>
              )}
              {link.youtube && (
                <motion.a
                  href={link.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-gray-900 p-3 rounded-full hover:bg-red-600 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <FaYoutube className="text-xl" />
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Copyright and Back to Top */}
        <motion.div 
          className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p 
            className="text-gray-100 text-sm mb-4 md:mb-0"
            variants={itemVariants}
          >
            © {currentYear} Harshad Hiremath. All rights reserved by HGI Pvt. Ltd.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;