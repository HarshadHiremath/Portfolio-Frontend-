import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaProjectDiagram, 
  FaCode, 
  FaUser, 
  FaBlog, 
  FaEnvelope 
} from 'react-icons/fa';

const Navbar = () => {
  // Styles for desktop NavLink
  const navLinkStyles = ({ isActive }) =>
    `flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 group ${
      isActive
        ? 'text-white font-bold bg-black'
        : 'text-gray-700'
    } hover:bg-black hover:text-white`;

  // Styles for mobile NavLink
  const mobileNavLinkStyles = ({ isActive }) =>
    `flex flex-col items-center px-2 py-1 rounded-md transition-all duration-100 group ${
      isActive
        ? 'text-white font-bold bg-black'
        : 'text-gray-700'
    } hover:bg-black hover:text-white`;

  // Dynamic icon color based on isActive
  const getIconClass = (isActive) => 
    `text-lg ${isActive ? 'text-white' : 'text-black'} group-hover:text-white`;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white shadow-lg fixed w-full top-0 z-10 hidden md:flex md:items-center md:p-4 transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-gray-800">
            Harshad Hiremath
          </div>
          <div className="flex space-x-6">
            <NavLink to="/" className={navLinkStyles}>
              {({ isActive }) => (
                <>
                  <FaHome className={getIconClass(isActive)} />
                  <span>Home</span>
                </>
              )}
            </NavLink>
            <NavLink to="/project" className={navLinkStyles}>
              {({ isActive }) => (
                <>
                  <FaProjectDiagram className={getIconClass(isActive)} />
                  <span>Project</span>
                </>
              )}
            </NavLink>
            <NavLink to="/codedev" className={navLinkStyles}>
              {({ isActive }) => (
                <>
                  <FaCode className={getIconClass(isActive)} />
                  <span>CodeDev</span>
                </>
              )}
            </NavLink>
            <NavLink to="/about" className={navLinkStyles}>
              {({ isActive }) => (
                <>
                  <FaUser className={getIconClass(isActive)} />
                  <span>About</span>
                </>
              )}
            </NavLink>
            <NavLink to="/blog" className={navLinkStyles}>
              {({ isActive }) => (
                <>
                  <FaBlog className={getIconClass(isActive)} />
                  <span>Blog</span>
                </>
              )}
            </NavLink>
            <NavLink to="/contact" className={navLinkStyles}>
              {({ isActive }) => (
                <>
                  <FaEnvelope className={getIconClass(isActive)} />
                  <span>Contact</span>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden">
        {/* Top Name with Fade Animation */}
        <div className="bg-white shadow-lg fixed top-0 w-full z-10 p-4 text-center">
          <div className="text-xl font-bold text-gray-800 animate-fadeIn">
            Harshad Hiremath
          </div>
        </div>
        {/* Bottom Navbar Links */}
        <div className="bg-white shadow-lg fixed bottom-0 w-full z-10">
          <div className="flex justify-around p-4">
            <NavLink to="/" className={mobileNavLinkStyles}>
              {({ isActive }) => (
                <>
                  <FaHome className={getIconClass(isActive)} />
                  <span className="text-sm">Home</span>
                </>
              )}
            </NavLink>
            <NavLink to="/project" className={mobileNavLinkStyles}>
              {({ isActive }) => (
                <>
                  <FaProjectDiagram className={getIconClass(isActive)} />
                  <span className="text-sm">Project</span>
                </>
              )}
            </NavLink>
            <NavLink to="/codedev" className={mobileNavLinkStyles}>
              {({ isActive }) => (
                <>
                  <FaCode className={getIconClass(isActive)} />
                  <span className="text-sm">CodeDev</span>
                </>
              )}
            </NavLink>
            <NavLink to="/about" className={mobileNavLinkStyles}>
              {({ isActive }) => (
                <>
                  <FaUser className={getIconClass(isActive)} />
                  <span className="text-sm">About</span>
                </>
              )}
            </NavLink>
            <NavLink to="/blog" className={mobileNavLinkStyles}>
              {({ isActive }) => (
                <>
                  <FaBlog className={getIconClass(isActive)} />
                  <span className="text-sm">Blog</span>
                </>
              )}
            </NavLink>
            <NavLink to="/contact" className={mobileNavLinkStyles}>
              {({ isActive }) => (
                <>
                  <FaEnvelope className={getIconClass(isActive)} />
                  <span className="text-sm">Contact</span>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;