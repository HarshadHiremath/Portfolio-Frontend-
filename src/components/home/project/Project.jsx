import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    HiExternalLink,
    HiTerminal,
    HiLightningBolt,
    HiOutlineChatAlt2,
    HiChip,
} from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

const ProjectsPage = () => {
    const [data, setData] = useState({
        projects: [],
        milestones: [],
        marquees: [],
        testimonials: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl =
                    import.meta.env.VITE_LOCALHOST || "http://localhost:3500";
                const endpoints = [
                    "projects",
                    "milestones",
                    "marquees",
                    "testimonials",
                ];
                const results = await Promise.all(
                    endpoints.map(async (endpoint) => {
                        const response = await fetch(`${apiUrl}/${endpoint}`);
                        const json = await response.json();
                        return {
                            endpoint,
                            data: Array.isArray(json) ? json : [],
                        };
                    }),
                );
                const newData = results.reduce((acc, { endpoint, data }) => {
                    acc[endpoint] = data;
                    return acc;
                }, {});
                setData(newData);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading)
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-green-500">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                    <HiTerminal className="text-5xl" />
                </motion.div>
                <p className="mt-4 animate-pulse uppercase tracking-widest">
                    DECRYPTING_PROJECT_DATABASE...
                </p>
            </div>
        );

    return (
        <div className="min-h-screen bg-black text-green-500 font-mono py-20 px-4 selection:bg-green-500 selection:text-black">
            <div className="max-w-7xl mx-auto">
                {/* HEADER SECTION */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 text-center relative"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/5 blur-[100px] rounded-full"></div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-4">
                        <span className="text-green-900">$</span>{" "}
                        PROJECT_ARCHIVE
                    </h1>
                    <p className="text-green-300 tracking-widest text-sm uppercase">
                        Deploying robust digital systems powered by clean architecture, efficient algorithms, and scalable design principles.
                    </p>
                </motion.header>

                {/* MARQUEE STATUS BAR */}
                {data.marquees.length > 0 && (
                    <div className="mb-15 border-y border-green-900 bg-green-950/10 py-3 overflow-hidden whitespace-nowrap">
                        <motion.div
                            animate={{ x: [0, -1000] }}
                            transition={{
                                repeat: Infinity,
                                duration: 25,
                                ease: "linear",
                            }}
                            className="flex gap-12"
                        >
                            {[...data.marquees, ...data.marquees].map(
                                (m, i) => (
                                    <span
                                        key={i}
                                        className="text-sm font-bold uppercase tracking-widest flex items-center gap-3"
                                    >
                                        <HiLightningBolt className="text-green-400" />{" "}
                                        {m.text}
                                    </span>
                                ),
                            )}
                        </motion.div>
                    </div>
                )}

                {/* PROJECTS GRID */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[1px] flex-1 bg-green-900/50"></div>
                        <h2 className="text-2xl font-bold uppercase tracking-tighter italic">
                            Main_Deployments
                        </h2>
                        <div className="h-[1px] flex-1 bg-green-900/50"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.projects.map((project, index) => (
                            <div
                                key={project._id}
                                className="group relative bg-green-950/5 border border-green-900 hover:border-green-400 transition-all duration-300 h-[550px] flex flex-col overflow-hidden"
                            >
                                <div className="absolute top-4 left-4 z-20 bg-black/90 border border-green-500 px-3 py-1 text-xs font-bold shadow-[0_0_10px_rgba(0,255,0,0.2)]">
                                    Project {String(index + 1).padStart(2, "0")}
                                </div>

                                <div className="h-48 shrink-0 overflow-hidden border-b border-green-900">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover brightness-90 group-hover:grayscale-0 group-hover:brightness-125 transition-all duration-700"
                                    />
                                </div>

                                <div className="p-6 flex flex-col flex-grow overflow-hidden">
                                    <h3 className="text-2xl font-black uppercase italic mb-4 text-green-300">
                                        {project.title}
                                    </h3>
                                    <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar group-hover:bg-green-500/5 transition-colors p-1">
                                        <p className="text-lg text-green-600 leading-relaxed font-medium">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2 py-3 border-y border-green-900/30">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs font-bold px-2 py-0.5 bg-green-900/20 border border-green-800 text-green-400 uppercase"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-4 flex justify-between items-center pt-2">
                                        {project.liveLink && (
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                className="flex items-center gap-2 text-sm font-black hover:text-white transition-all tracking-tighter"
                                            >
                                                <HiExternalLink className="text-xl" />{" "}
                                                LIVE_DEPLOY
                                            </a>
                                        )}
                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                className="flex items-center gap-2 text-sm font-black hover:text-white transition-all tracking-tighter"
                                            >
                                                <FaGithub className="text-xl" />{" "}
                                                REPO_URI
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* MILESTONES TIMELINE */}
                <section className="mb-32">
                    <h2 className="text-center text-3xl font-black mb-20 italic uppercase tracking-tighter underline underline-offset-8 decoration-green-900">
                        EXECUTION_TIMELINE
                    </h2>
                    <div className="relative max-w-4xl mx-auto pl-8 border-l-2 border-green-900">
                        {data.milestones.map((m, i) => (
                            <motion.div
                                key={m._id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="mb-16 relative last:mb-0"
                            >
                                {/* Glowing Node */}
                                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-black border-2 border-green-500 shadow-[0_0_15px_#00ff00]"></div>

                                <div className="bg-green-950/5 border border-green-900/50 p-6 hover:bg-green-950/10 transition-all group">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                        <h3 className="text-2xl font-bold text-green-300 uppercase tracking-tight italic group-hover:text-green-500 transition-colors">
                                            {m.title}
                                        </h3>
                                        <span className="text-sm font-black bg-green-900/30 border border-green-800 px-3 py-1 text-green-500 tracking-widest">
                                            [{m.date}]
                                        </span>
                                    </div>
                                    <p className="text-base text-green-700 leading-relaxed font-small">
                                        {m.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section className="pb-10">
                    <h2 className="text-center text-4xl font-black mb-15 italic uppercase tracking-tighter border-b border-green-900 pb-4 max-w-md mx-auto">
                        PEER_REVIEWS
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {data.testimonials.map((t) => (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                key={t._id}
                                className="p-8 bg-green-950/5 border-l-4 border-green-500 relative group"
                            >
                                <HiOutlineChatAlt2 className="absolute top-4 right-4 text-4xl text-green-900 group-hover:text-green-500 transition-colors" />
                                <p className="text-xl leading-relaxed text-green-400 italic font-medium mb-8 italic">
                                    "{t.quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-[2px] w-12 bg-green-900"></div>
                                    <span className="text-sm font-black uppercase tracking-[0.3em] text-green-600">
                                        AUTH_SOURCE: {t.source}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #064e3b; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #10b981; }
      `}</style>
        </div>
    );
};

export default ProjectsPage;
