import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaArrowLeft, FaTerminal, FaCalendarAlt } from "react-icons/fa";
import { HiLightningBolt, HiOutlineChip } from "react-icons/hi";

const Post = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                setLoading(true);
                const apiUrl = import.meta.env.VITE_LOCALHOST;

                const blogResponse = await fetch(`${apiUrl}/blog/${id}`);
                if (!blogResponse.ok) throw new Error('Failed to fetch blog');
                const blogData = await blogResponse.json();
                setBlog(blogData);

                const relatedResponse = await fetch(`${apiUrl}/blog`);
                if (!relatedResponse.ok) throw new Error('Failed to fetch related blogs');
                const allBlogs = await relatedResponse.json();
                allBlogs.reverse();
                setRelatedBlogs(allBlogs.filter((item) => item._id !== id).slice(0, 4));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
        window.scrollTo(0, 0); // Reset scroll on ID change
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-mono text-green-500">
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <FaTerminal className="text-6xl mb-4" />
            </motion.div>
            <p className="tracking-[0.3em] uppercase text-xs">Accessing_Data_Node...</p>
        </div>
    );

    if (error || !blog) return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center p-6 font-mono">
            <h2 className="text-2xl text-red-500 mb-6 uppercase tracking-widest">! Error: Protocol_Failure</h2>
            <Link to="/blog" className="px-6 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all">
                &gt; Return_To_Archive
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-green-500 selection:text-black overflow-x-hidden">
            
            {/* AMBIENT BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 -left-20 w-96 h-96 bg-green-500/5 blur-[150px] rounded-full opacity-50"></div>
                <div className="absolute bottom-0 -right-20 w-96 h-96 bg-green-900/5 blur-[150px] rounded-full opacity-50"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 py-12 md:py-24">
                
                {/* 1. NAVIGATION BAR */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-mono text-green-500 hover:text-white transition-colors group">
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
                        <span>&gt; RETURN_TO_SYSTEM_ARCHIVE</span>
                    </Link>
                </motion.div>

                {/* 2. MAIN POST CONTENT */}
                <article className="relative bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-2xl mb-24">
                    
                    {/* Header Image with Scanning Line */}
                    <div className="relative h-64 md:h-[450px] overflow-hidden border-b border-white/10 bg-neutral-900">
                        {blog.image && (
                            <img src={blog.image} alt={blog.heading} className="w-full h-full object-cover grayscale opacity-60" />
                        )}
                        <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }} className="absolute left-0 right-0 h-[1px] bg-green-500/30 z-20 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                        
                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full">
                                    <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest flex items-center gap-2">
                                        <FaCalendarAlt /> {new Date(blog.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
                                {blog.heading}
                            </h1>
                        </div>
                    </div>

                    {/* Blog Body */}
                    <div className="p-8 md:p-16">
                        <div className="flex items-center gap-3 mb-8 opacity-50">
                            <HiLightningBolt className="text-green-500" />
                            <h2 className="text-sm md:text-lg font-mono text-slate-400 uppercase tracking-[0.2em] italic">
                                {blog.subtitle}
                            </h2>
                        </div>
                        
                        <div className="prose prose-invert prose-slate max-w-none">
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light first-letter:text-5xl first-letter:font-black first-letter:text-green-500 first-letter:mr-3 first-letter:float-left">
                                {blog.content}
                            </p>
                        </div>

                        {/* Footer Sign-off */}
                        <div className="mt-16 pt-8 border-t border-white/5 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                                <HiOutlineChip className="text-green-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">End_Of_Transmission</p>
                                <p className="text-xs font-bold text-white uppercase italic">System_User: Harshad_Hiremath</p>
                            </div>
                        </div>
                    </div>
                </article>

                {/* 3. RELATED BLOGS - SYSTEM RECOMMENDATIONS */}
                <section className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-6 mb-12">
                        <h2 className="text-xs font-mono text-green-500 uppercase tracking-[0.4em] whitespace-nowrap flex items-center gap-2">
                            <FaTerminal className="text-sm" /> Recommended_Entries
                        </h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-green-500/30 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {relatedBlogs.map((item) => (
                            <motion.div key={item._id} whileHover={{ y: -8 }} className="group relative bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                                <Link to={`/blog/${item._id}`} className="block">
                                    <div className="relative h-40 overflow-hidden bg-neutral-900 border-b border-white/5">
                                        <img src={item.image} alt={item.heading} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors uppercase tracking-tight truncate">
                                            {item.heading}
                                        </h4>
                                        <p className="text-xs text-slate-500 font-light line-clamp-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-tighter">NODE_ACCESS: GRANTED</span>
                                            <span className="text-[9px] font-mono text-green-500/50 uppercase tracking-widest">[{new Date(item.createdAt).toLocaleDateString()}]</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* CUSTOM SCROLLBAR FOR BODY */}
            <style jsx>{`
                body::-webkit-scrollbar { width: 5px; }
                body::-webkit-scrollbar-track { background: #050505; }
                body::-webkit-scrollbar-thumb { background: #111; border-radius: 10px; }
                body::-webkit-scrollbar-thumb:hover { background: #22c55e; }
            `}</style>
        </div>
    );
};

export default Post;