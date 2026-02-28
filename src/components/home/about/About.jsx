import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    HiTerminal,
    HiAcademicCap,
    HiBriefcase,
    HiBadgeCheck,
    HiChip,
    HiExternalLink,
} from "react-icons/hi";
import { BiLoaderCircle } from "react-icons/bi";
import { FaTrophy } from "react-icons/fa"; // Fixed HiTrophy error

const AboutPage = () => {
    const [sections, setSections] = useState({
        education: [],
        experience: [],
        certifications: [],
        achievements: [],
        skills: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const apiUrl =
                    import.meta.env.VITE_LOCALHOST || "http://localhost:3500";
                const sectionTypes = [
                    "education",
                    "experience",
                    "certifications",
                    "achievements",
                    "skills",
                ];

                const promises = sectionTypes.map(async (type) => {
                    const response = await fetch(`${apiUrl}/${type}`);
                    if (!response.ok)
                        throw new Error(`Failed to fetch ${type}`);
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
                setError(err.message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

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
                    &gt; ACCESSING_DEV_HISTORY
                </p>
            </div>
        );

    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-green-500 selection:text-black overflow-x-hidden">
            {/* BACKGROUND DECORATION */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 -left-20 w-96 h-96 bg-green-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 -right-20 w-96 h-96 bg-green-900/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10 py-16 md:py-24">
                {/* PAGE HEADER */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-32 text-center lg:text-left"
                >
                    <div className="inline-block px-3 py-1 mb-6 border border-green-500/20 bg-green-500/5 rounded-lg">
                        <span className="text-green-400 text-[10px] font-mono uppercase tracking-[0.4em]">
                            ● System_User: Harshad_Hiremath
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter text-white uppercase italic leading-none">
                        ABOUT
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                            _ME
                        </span>
                    </h1>
                    <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed">
                        <span className="text-green-500 font-mono">&gt;</span>{" "}
                        Decompiling academic records and
                        <span className="text-white">
                            {" "}
                            industry execution
                        </span>{" "}
                        history.
                    </p>
                </motion.header>

                {/* EDUCATION & EXPERIENCE DATA STREAMS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
                    {/* Education */}
                    <motion.section
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <HiAcademicCap className="text-green-500 text-2xl" />
                            <h2 className="text-xs font-mono text-green-500 uppercase tracking-[0.4em]">
                                Academic_Log
                            </h2>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-green-500/30 to-transparent"></div>
                        </div>

                        <div className="relative border-l border-white/10 ml-4 space-y-12">
                            {sections.education.map((edu) => (
                                <motion.div
                                    key={edu._id}
                                    variants={itemVariants}
                                    className="relative pl-8 group"
                                >
                                    <div className="absolute -left-[5.5px] top-1 w-2.5 h-2.5 rounded-full bg-black border border-green-500 group-hover:shadow-[0_0_10px_#4ade80] transition-all"></div>
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-green-500/30 transition-all backdrop-blur-sm">
                                        <span className="text-[10px] font-mono text-green-500/70 block mb-2 tracking-widest">
                                            {edu.duration}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors uppercase italic">
                                            {edu.institution}
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-4 font-mono tracking-tighter">
                                            {edu.score}
                                        </p>
                                        <div
                                            className="text-xs text-slate-400 leading-relaxed font-light prose-invert"
                                            dangerouslySetInnerHTML={{
                                                __html: edu.description,
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Experience */}
                    <motion.section
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <HiBriefcase className="text-green-500 text-2xl" />
                            <h2 className="text-xs font-mono text-green-500 uppercase tracking-[0.4em]">
                                Experience_Node
                            </h2>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-green-500/30 to-transparent"></div>
                        </div>

                        <div className="relative border-l border-white/10 ml-4 space-y-12">
                            {sections.experience.map((exp) => (
                                <motion.div
                                    key={exp._id}
                                    variants={itemVariants}
                                    className="relative pl-8 group"
                                >
                                    <div className="absolute -left-[5.5px] top-1 w-2.5 h-2.5 rounded-full bg-black border border-green-500 group-hover:shadow-[0_0_10px_#4ade80] transition-all"></div>
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-green-500/30 transition-all backdrop-blur-sm">
                                        <span className="text-[10px] font-mono text-green-500/70 block mb-2 tracking-widest">
                                            {exp.duration}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors uppercase italic">
                                            {exp.role}
                                        </h3>
                                        <div
                                            className="text-xs text-slate-400 leading-relaxed font-light prose-invert"
                                            dangerouslySetInnerHTML={{
                                                __html: exp.description,
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                </div>

                {/* SKILLS PROCESSOR GRID */}
                <section className="mb-32">
                    <div className="flex items-center gap-6 mb-12">
                        <HiChip className="text-green-500 text-2xl" />
                        <h2 className="text-xs font-mono text-green-500 uppercase tracking-[0.4em]">
                            Core_Processor_Skills
                        </h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-green-500/30 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
                        {sections.skills.map((skill) => (
                            <motion.div
                                key={skill._id}
                                whileHover={{ y: -5 }}
                                className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl flex flex-col items-center group hover:border-green-500/30 transition-all relative overflow-hidden"
                            >
                                {/* Scanning Line Effect */}
                                <motion.div
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 4,
                                        ease: "linear",
                                    }}
                                    className="absolute left-0 right-0 h-[1px] bg-green-500/20 z-10 pointer-events-none opacity-0 group-hover:opacity-100"
                                />
                                <div className="relative mb-4">
                                    {skill.logo ? (
                                        <img
                                            src={skill.logo}
                                            alt={skill.name}
                                            className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full font-mono text-green-500">
                                            {skill.name?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center group-hover:text-slate-200 transition-colors">
                                    {skill.name}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CERTIFICATIONS & ACHIEVEMENTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    {/* Certifications */}
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <HiBadgeCheck className="text-green-500 text-2xl" />
                            <h2 className="text-xs font-mono text-green-500 uppercase tracking-[0.4em]">
                                Certifications
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {sections.certifications.map((cert) => (
                                <div
                                    key={cert._id}
                                    className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/[0.07] transition-all flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-4">
                                        {cert.logo && (
                                            <img
                                                src={cert.logo}
                                                className="w-8 h-8 object-contain grayscale group-hover:grayscale-0"
                                                alt=""
                                            />
                                        )}
                                        <h4 className="text-sm font-bold text-white group-hover:text-green-400 transition-colors uppercase tracking-tight">
                                            {cert.title}
                                        </h4>
                                    </div>
                                    {cert.link && (
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            className="text-slate-500 hover:text-green-500 transition-colors"
                                        >
                                            <HiExternalLink className="text-xl" />
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Achievements */}
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <FaTrophy className="text-green-500 text-xl" />
                            <h2 className="text-xs font-mono text-green-500 uppercase tracking-[0.4em]">
                                Achievements
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {sections.achievements.map((ach) => (
                                <div
                                    key={ach._id}
                                    className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-start gap-4 hover:border-green-500/20 transition-all"
                                >
                                    <div className="w-1 h-1 rounded-full bg-green-500 mt-2 shadow-[0_0_5px_#22c55e]"></div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight italic">
                                            {ach.title}
                                        </h4>
                                        <div
                                            className="text-xs text-slate-500 font-light prose-invert leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: ach.description,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
