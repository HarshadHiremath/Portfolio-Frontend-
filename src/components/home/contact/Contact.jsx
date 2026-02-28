import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone, FaTerminal, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [link, setLink] = useState({});
  const [formData, setFormData] = useState({ user: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LOCALHOST}/link`);
        if (!response.ok) throw new Error(`Failed to fetch links`);
        const data = await response.json();
        const sanitizedData = Object.keys(data).reduce((acc, key) => {
          if (key !== "_id" && key !== "__v") acc[key] = data[key];
          return acc;
        }, {});
        setLink(sanitizedData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLinks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess(false);
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.user.trim()) newErrors.user = "IDENTITY_REQUIRED";
    if (!formData.email.trim()) {
      newErrors.email = "UPLINK_EMAIL_REQUIRED";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "INVALID_UPLINK_PROTOCOL";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "COMMS_NUMBER_REQUIRED";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "INVALID_COMMS_FORMAT";
    }
    if (!formData.message.trim()) newErrors.message = "DATA_PACKET_EMPTY";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_LOCALHOST}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccess(true);
        setFormData({ user: "", email: "", phone: "", message: "" });
      } else {
        const errorData = await response.json();
        setServerError(errorData.error || "UPLINK_FAILED");
      }
    } catch (error) {
      setServerError("NETWORK_DISRUPTION");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-black text-green-500 font-mono py-20 px-4 selection:bg-green-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic flex justify-center items-center gap-4">
            <FaTerminal className="text-green-900 text-4xl" /> ESTABLISH_UPLINK
          </h2>
          <p className="text-green-800 mt-2 tracking-[0.4em] uppercase text-sm">// SECURE_CHANNEL_INITIATED</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-green-950/10 border border-green-900 p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity"></div>
            
            <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest italic border-b border-green-900 pb-2">Send_Data_Packet</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {["user", "email", "phone"].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-xs font-bold text-green-800 uppercase mb-2">
                    {field === "user" ? "Identity_Tag" : `${field}_Protocol`}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    autoComplete="off"
                    className="w-full bg-black border border-green-900 p-3 text-green-400 focus:border-green-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,0,0.2)] transition-all"
                    placeholder={`ENTER_${field.toUpperCase()}...`}
                  />
                  {errors[field] && <p className="mt-1 text-[10px] text-red-500 font-bold tracking-widest">{">"} {errors[field]}</p>}
                </div>
              ))}
              
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-green-800 uppercase mb-2">Message_Payload</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-black border border-green-900 p-3 text-green-400 focus:border-green-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,0,0.2)] transition-all resize-none"
                  placeholder="INPUT_MESSAGE_CONTENT..."
                ></textarea>
                {errors.message && <p className="mt-1 text-[10px] text-red-500 font-bold tracking-widest">{">"} {errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 border-2 border-green-500 text-green-500 font-black tracking-[0.3em] uppercase hover:bg-green-500 hover:text-black transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(0,255,0,0.2)]"
              >
                {isSubmitting ? "TRANSMITTING..." : "EXECUTE_SEND"}
              </button>
            </form>

            <AnimatePresence>
              {(success || serverError) && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-3 text-center text-xs font-bold border ${success ? "border-green-500 text-green-500 bg-green-500/10" : "border-red-500 text-red-500 bg-red-500/10"}`}
                >
                  {success ? "UPLINK_SUCCESSFUL: DATA_RECEIVED" : `CRITICAL_ERROR: ${serverError}`}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info Side */}
          <div className="space-y-8">
            {/* Map */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-green-950/10 border border-green-900 p-4"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 uppercase">
                <FaMapMarkerAlt className="text-green-800" /> Current_Coordinates: <span className="text-green-400">{link.Location}</span>
              </h3>
              <div className="w-full h-64 rounded-none overflow-hidden border border-green-900 grayscale brightness-75 contrast-125 hover:grayscale-0 transition-all duration-700">
                <iframe
                  src={link.LocationLink}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title="HQ Location"
                ></iframe>
              </div>
            </motion.div>

            {/* Socials & Comms */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-green-950/10 border border-green-900 p-8"
            >
              <h3 className="text-xl font-bold mb-8 uppercase italic border-b border-green-900 pb-2">Comms_Directory</h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 group">
                  <div className="p-3 border border-green-900 group-hover:border-green-400 transition-colors"><FaEnvelope /></div>
                  <div>
                    <p className="text-[10px] text-green-900 font-bold uppercase">Email_Primary</p>
                    <a href={`mailto:${link.gmail}`} className="text-lg hover:text-white transition-colors">{link.gmail}</a>
                  </div>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="p-3 border border-green-900 group-hover:border-green-400 transition-colors"><FaPhone /></div>
                  <div>
                    <p className="text-[10px] text-green-900 font-bold uppercase">Secure_Line</p>
                    <a href={`tel:${link.phone}`} className="text-lg hover:text-white transition-colors">{link.phone}</a>
                  </div>
                </li>
              </ul>

              <div className="mt-10 flex gap-6">
                {[
                  { icon: <FaLinkedin />, href: link.linkedIn, color: "hover:text-blue-400" },
                  { icon: <FaGithub />, href: link.github, color: "hover:text-white" },
                  { icon: <FaTwitter />, href: link.twitter, color: "hover:text-blue-300" }
                ].map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.href} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`text-3xl text-green-900 ${social.color} transition-all transform hover:scale-110`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;