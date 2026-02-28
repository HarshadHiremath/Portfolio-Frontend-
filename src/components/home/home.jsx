import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaEnvelope,
    FaPhone,
    FaTerminal,
    FaCode,
    FaMicrochip,
} from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import Banner0 from "../../assets/Banner0.png";
import Banner1 from "../../assets/Banner1.jpg";
import Banner2 from "../../assets/Banner2.jpg";
import Banner3 from "../../assets/Banner3.jpg";
import Banner4 from "../../assets/Banner4.jpg";
import Banner5 from "../../assets/Banner5.jpg";
import Banner6 from "../../assets/Banner6.jpg";
import Banner7 from "../../assets/Banner7.jpg";
import Banner8 from "../../assets/Banner8.jpg";
import Banner9 from "../../assets/Banner9.jpg";

import Profile from "../../assets/Profile.png";
import "./index.css";

const HomePage = () => {
    const slides = [
        { image: Banner0, alt: "Project 0" },
        { image: Banner1, alt: "Project 1" },
        { image: Banner2, alt: "Project 2" },
        { image: Banner3, alt: "Project 3" },
        { image: Banner4, alt: "Project 4" },
        { image: Banner5, alt: "Project 5" },
        { image: Banner6, alt: "Project 6" },
        { image: Banner7, alt: "Project 7" },
        { image: Banner8, alt: "Project 8" },
        { image: Banner9, alt: "Project 9" },
    ];

    const [journeyStats, setJourneyStats] = useState([]);
    const [notices, setNotices] = useState([]);
    const [skills, setSkills] = useState([]);
    const [link, setLink] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl =
                    import.meta.env.VITE_LOCALHOST || "http://localhost:3500";
                const [journeyRes, noticesRes, linksRes, skillsRes] =
                    await Promise.all([
                        fetch(`${apiUrl}/journey`),
                        fetch(`${apiUrl}/notices`),
                        fetch(`${apiUrl}/link`),
                        fetch(`${apiUrl}/skills`),
                    ]);
                const [journeyData, noticesData, linksData, skillsData] =
                    await Promise.all([
                        journeyRes.json(),
                        noticesRes.json(),
                        linksRes.json(),
                        skillsRes.json(),
                    ]);
                setJourneyStats(journeyData);
                setNotices([...noticesData].reverse());
                setSkills(skillsData);
                setLink(linksData || {});
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

    if (loading)
        return (
            <div className="min-h-screen bg-black flex items-center justify-center font-mono">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-green-500 text-4xl"
                >
                    <FaTerminal />
                </motion.div>
            </div>
        );

    return (
        <div className="min-h-screen bg-black text-green-500 font-mono selection:bg-green-500 selection:text-black">
            {/* 1. Profile & Info Section */}
            <section className="pt-20 pb-12 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative"
                >
                    <div className="absolute -inset-1 bg-green-500 rounded-full blur opacity-30 animate-pulse"></div>
                    <img
                        src={Profile}
                        alt="Harshad"
                        className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-2 border-green-500 hover:grayscale transition-all duration-500 shadow-[0_0_20px_rgba(0,255,0,0.3)]"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-center md:text-left space-y-6"
                >
                    {/* Name with Terminal Prompt */}
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic">
                        <span className="text-green-800 mr-2">$</span>Harshad
                        Hiremath
                    </h1>

                    {/* Subtitle / Role */}
                    <p className="text-xl text-green-400 opacity-90 font-semibold tracking-wide">
                        Software Engineer | DSA Enthusiast | YouTuber | PICT Pune ’26
                    </p>

                    {/* Refined Bio Text */}
                    <div className="max-w-xl space-y-4">
                        <p className="text-green-600 leading-relaxed border-l-2 border-green-900 pl-4 bg-green-950/5 py-2">
                            Final-year IT student at{" "}
                            <span className="text-green-400">
                                PICT Pune (2026)
                            </span>{" "}
                            with 1000+ DSA problems solved, passionate about
                            clean architecture, optimized systems, and designing
                            secure, scalable, high-performance solutions.
                        </p>

                        <p className="text-green-700 text-sm italic font-mono">
                            {">"} Driven by logic and powered by code, I
                            transform complex real-world problems into
                            efficient, impactful software systems.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={link.resume}
                            className="px-6 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all font-bold shadow-[0_0_10px_rgba(0,255,0,0.2)]"
                        >
                          &gt; ACCESS_RESUME
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/contact"
                            className="px-6 py-2 bg-green-900/20 border border-green-900 text-green-700 hover:border-green-400 hover:text-green-400 transition-all font-bold"
                        >
                          &gt; START_COMMUNICATION
                        </motion.a>
                    </div>
                </motion.div>
            </section>

            {/* 2. Famous Quote Section */}
            <section className="py-12 bg-green-950/10 border-y border-green-900/50">
                <div className="max-w-4xl mx-auto px-6 text-center italic">
                    <p className="text-2xl md:text-3xl font-light text-green-400">
                        "Life isn’t fair. But that doesn’t mean you can’t fight for fairness."
                    </p>
                    <p className="mt-4 text-green-700 font-mono text-sm">
                        — Malala Yousafzai
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 py-16">
                {/* 3. My Journey & Skills */}
                <div className="lg:col-span-2 space-y-12">
                    <div>
                        <h2 className="text-2xl mb-6 flex items-center gap-2">
                            <FaMicrochip className="text-green-800" />{" "}
                            JOURNEY_LOG
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {journeyStats.map((stat) => (
                                <div
                                    key={stat._id}
                                    className="p-4 border border-green-900 bg-green-950/10 hover:border-green-500 transition-colors"
                                >
                                    <p className="text-3xl font-bold">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs text-green-700 uppercase tracking-widest">
                                        {stat.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <br />
                {/* 4. Notice Board */}
                <div className="bg-green-950/5 border border-green-900 p-6 h-fit relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">
                        <HiOutlineSpeakerphone />
                    </div>
                    <h2 className="text-xl mb-6 border-b border-green-900 pb-2 flex items-center gap-2 uppercase">
                        <span className="animate-ping w-2 h-2 rounded-full bg-red-500"></span>
                        System_Updates
                    </h2>
                    <div className="space-y-6">
                        {notices.map((notice) => (
                            <div
                                key={notice._id}
                                className="border-l-2 border-green-800 pl-4 py-1"
                            >
                                <h3 className="text-green-300 text-sm font-bold uppercase">
                                    {notice.title}
                                </h3>
                                <p className="text-xs text-green-700 mt-1">
                                    {notice.content}
                                </p>
                                <p className="text-[10px] text-green-900 mt-2 font-mono">
                                    [{notice.date}]
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. Bottom Dynamic Sliding Window */}
            <section className="pb-20 px-6">
                <h2 className="max-w-7xl mx-auto text-2xl mb-8 uppercase tracking-widest text-center">
                    Project_Visuals
                </h2>
                <div className="max-w-5xl mx-auto relative h-[300px] md:h-[500px] border-2 border-green-900 group">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentSlide}
                            src={slides[currentSlide].image}
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                        />
                    </AnimatePresence>
                    <div className="absolute bottom-4 right-4 bg-black/80 px-4 py-2 text-xs border border-green-500">
                        FRAME: 0{currentSlide + 1} // TOTAL_SLIDES
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
