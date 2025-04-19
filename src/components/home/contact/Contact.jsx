import React, { useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";

const Contact = () => {

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
          alert("Error :"+err);
        }
      };
      fetchLinks();
    }, []); 



  // Form state
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    phone: "",
    message: "",
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success state for feedback
  const [success, setSuccess] = useState(false);

  // Server error message
  const [serverError, setServerError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors for the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess(false);
    setServerError("");
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    const trimmedData = {
      user: formData.user.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    };

    if (!trimmedData.user) newErrors.user = "Name is required";
    if (!trimmedData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(trimmedData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!trimmedData.phone) {
      newErrors.phone = "Phone number is required";
    } else {
      const cleanPhone = trimmedData.phone.replace(/\D/g, "");
      if (!/^\d{10}$/.test(cleanPhone)) {
        newErrors.phone = "Phone number must be 10 digits";
      }
    }
    if (!trimmedData.message) newErrors.message = "Message is required";

    return newErrors;
  };

  // Handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setServerError("");
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_LOCALHOST}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ user: "", email: "", phone: "", message: "" });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setServerError(errorData.error || "Failed to send message");
      }
    } catch (error) {
      setServerError("Network error. Please try again later.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Let’s Connect
        </h2>

        {/* Main Grid: Form and Map/Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Send a Message</h3>
            {success && (
              <p
                className="text-green-500 text-center mb-4"
                role="alert"
                aria-live="assertive"
              >
                Message sent successfully!
              </p>
            )}
            {serverError && (
              <p
                className="text-red-500 text-center mb-4"
                role="alert"
                aria-live="assertive"
              >
                {serverError}
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label
                  htmlFor="user"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Name"
                  aria-invalid={!!errors.user}
                  aria-describedby={errors.user ? "user-error" : undefined}
                />
                {errors.user && (
                  <p id="user-error" className="mt-1 text-sm text-red-500">
                    {errors.user}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Phone Number"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-red-500">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Message"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                ></textarea>
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-blue-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Map and Contact Info */}
          <div className="space-y-8">
            {/* Example Map Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                         <h3 className="text-xl font-semibold text-gray-800 mb-4">My Location - {link.Location}</h3>
                        <div className="w-full h-64 rounded-md overflow-hidden">
                      <iframe
                      src={link.LocationLink}
                      className="w-full h-full border-0"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade"
                    title="SCTR's Pune Institute of Computer Technology Location"
                  ></iframe>
              </div>
            </div>
            {/* Contact Info */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FaEnvelope className="text-black mr-2" />
                  <a
                    href={`mailto:${link.gmail}`}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {link.gmail}
                  </a>
                </li>
                <li className="flex items-center">
                  <FaPhone className="text-black mr-2" />
                  <a
                    href="tel:+1234567890"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {link.phone}
                  </a>
                </li>
                <li className="flex space-x-4">
                  <a
                    href={link.linkedIn}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={24}  />
                  </a>
                  <a
                    href={link.github}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="GitHub"
                  >
                    <FaGithub size={24} className="text-black mr-2" />
                  </a>
                  <a
                    href={link.twitter}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Twitter"
                  >
                    <FaTwitter size={24} className="text-blue mr-2"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;