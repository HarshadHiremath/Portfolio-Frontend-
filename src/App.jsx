import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/home/Navbar';
import Footer from './components/home/Footer';
import SplashScreen from './components/home/SplashScreen';
import Home from './components/home/home';
import Project from './components/home/project/Project';
import CodeDev from './components/home/codeDev/CodeDev';
import About from './components/home/about/About';
import Blog from './components/home/blog/Blog';
import Contact from './components/home/contact/Contact';
import Admin from './components/admin/Admin';

import Post from './components/home/blog/Post';

// Layout with Navbar and Footer
const MainLayout = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <Navbar />
    <main className="flex-grow mt-16">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Layout without Navbar or Footer
const BlogLayout = () => (
  <div className="min-h-screen bg-gray-100">
    <Outlet />
  </div>
);


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]);

  return null;
};



const App = () => {
  const [IsLoading, setIsLoading] = useState(true);
  const [isHome, setIsHome] =useState(true);
  const location = useLocation();
  useEffect(() => {
    setIsHome(location.pathname === '/')
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <div>
      {IsLoading && isHome? (
        <SplashScreen />
      ) : (
        <>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Project />} />
            <Route path="/codedev" element={<CodeDev />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<Post />} />
          </Route>
          <Route element={<BlogLayout />}>
            <Route path="/admin" element={<Admin />} />
            
          </Route>
        </Routes>
        </>
      )}
    </div>
  );
};

export default App;