import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiTerminal, HiLightningBolt, HiBookOpen, HiSearch } from "react-icons/hi";
import BlogWall from "../../../assets/BlogWallpaper.jpg";
import { BiLoaderCircle } from "react-icons/bi";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LOCALHOST}/blog`);
        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.statusText}`);
        }
        const data = await response.json();
        setBlogs(data.reverse());
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading)
          return (
              <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-mono text-green-500">
                  <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                      }}
                  >
                      <BiLoaderCircle className="text-6xl" />
                  </motion.div>
                  <p className="mt-4 font-bold tracking-[0.1em] uppercase text-xl">
                      INITIALIZING_BLOGS_DATA..!
                  </p>
              </div>
          );

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-green-500 selection:text-black overflow-x-hidden">
      
      {/* AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-green-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-green-900/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-16 md:py-24">
        
        {/* 1. HERO HEADER (Synced with HomePage) */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 text-center lg:text-left"
        >
          <div className="inline-block px-3 py-1 mb-6 border border-green-500/20 bg-green-500/5 rounded-lg">
            <span className="text-green-400 text-[10px] font-mono uppercase tracking-[0.4em]">● Archive_Node: Tech_Insights_v1.0</span>
          </div>
          <h1 className="text-5xl md:text-9xl font-black mb-6 tracking-tighter text-white uppercase italic leading-none">
            TECH<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">_CHRONICLES</span>
          </h1>
          <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed">
            <span className="text-green-500 font-mono">&gt;</span> Exploring innovation and growth through 
            <span className="text-white"> technical documentation</span> and developer experiences.
          </p>
        </motion.header>

        {/* 2. SYSTEM BRIEFING SECTION (Redesigned Motive Section) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative mb-32 rounded-3xl overflow-hidden border border-white/10 group"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-1000"
            style={{ backgroundImage: `url(${BlogWall})` }}
          />
          <div className="relative z-10 p-8 md:p-20 bg-gradient-to-r from-black via-black/80 to-transparent">
            <div className="flex items-center gap-3 mb-6">
                <HiBookOpen className="text-green-500 text-2xl" />
                <h2 className="text-xs font-mono text-green-500 uppercase tracking-[0.4em]">Mission_Statement</h2>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight max-w-2xl">
                Democratizing complex logic through shared knowledge.
            </h3>
            <p className="text-slate-300 text-sm md:text-xl font-light leading-relaxed max-w-3xl italic">
                "Welcome to my internal log. This space is dedicated to exploring the intersection of clean architecture, 
                modern web protocols, and personal growth in the engineering world."
            </p>
          </div>
        </motion.div>

        {/* 3. BLOG ENTRIES GRID */}
        <section>
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-xs font-mono text-green-500 uppercase tracking-[0.4em] flex items-center gap-2">
               <HiLightningBolt className="animate-pulse" /> Latest_transmissions
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-green-500/30 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative flex flex-col h-[550px] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-500 shadow-2xl"
              >
                {/* Image with Scanner Effect */}
                <div className="relative h-48 shrink-0 overflow-hidden bg-neutral-900 border-b border-white/5">
                  <img
                    src={blog.image}
                    alt={blog.heading}
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute left-0 right-0 h-[1px] bg-green-500/20 z-20 pointer-events-none"
                  />
                  <div className="absolute top-4 left-4 z-20 font-mono text-[9px] bg-black/80 text-green-500 px-2 py-1 border border-green-500/30 rounded uppercase tracking-widest">
                    Entry_0{index + 1}
                  </div>
                </div>

                {/* Blog Content Area */}
                <div className="p-8 flex flex-col flex-grow overflow-hidden relative">
                  <h2 className="text-xl font-bold text-white mb-2 uppercase tracking-tight group-hover:text-green-400 transition-colors leading-tight">
                    {blog.heading}
                  </h2>
                  <h3 className="text-[10px] font-mono text-green-500/70 mb-4 uppercase tracking-[0.2em] italic">
                    {blog.subtitle}
                  </h3>

                  {/* Scrollable Description */}
                  <div className="flex-grow overflow-y-auto mb-6 pr-2 custom-card-scroll">
                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                      {blog.description}
                    </p>
                  </div>

                  {/* Entry Footer */}
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                        [{new Date(blog.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}]
                    </div>
                    <Link
                      to={`/blog/${blog._id}`}
                      className="flex items-center gap-2 text-[10px] font-bold text-green-500 hover:text-white transition-all tracking-widest uppercase"
                    >
                      Access_Entry <HiSearch className="text-sm" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* CUSTOM SCROLLBAR STYLING */}
      <style jsx>{`
        .custom-card-scroll::-webkit-scrollbar { width: 3px; }
        .custom-card-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-card-scroll::-webkit-scrollbar-thumb { background: rgba(34, 197, 94, 0.1); border-radius: 10px; }
        .group:hover .custom-card-scroll::-webkit-scrollbar-thumb { background: rgba(34, 197, 94, 0.4); }
      `}</style>
    </div>
  );
};

export default Blog;