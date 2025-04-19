import React, { useState, useEffect } from "react";

const AdminLink = () => {
  const [links, setLinks] = useState({
    gmail: "",
    phone: "",
    linkedIn: "",
    instagram: "",
    youtube: "",
    github: "",
    location: "",
    locationLink: "",
    twitter: "",
    resume: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [updatingPlatform, setUpdatingPlatform] = useState(null); // Track the updating platform

  // Fetch links from the backend on mount
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

        setLinks(sanitizedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  // Handle input changes
  const handleChange = (e, platform) => {
    const { value } = e.target;
    setLinks((prev) => ({ ...prev, [platform]: value }));
    setError(null);
    setSuccessMessage("");
  };

  // Handle form submission to update a link
  const handleSubmit = async (platform) => {
    setUpdatingPlatform(platform); // Set the platform being updated
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_LOCALHOST}/link/${platform}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [platform]: links[platform] }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update ${platform} link: ${response.statusText}`);
      }

      setSuccessMessage(`${platform.charAt(0).toUpperCase() + platform.slice(1)} link updated successfully!`);
      setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3s
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000); // Clear error after 3s
    } finally {
      setUpdatingPlatform(null); // Reset the updating platform
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <p className="text-center text-gray-500">Loading links...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Social Links</h1>
      {error && (
        <p className="text-red-500 text-center mb-4" role="alert" aria-live="assertive">
          {error}
        </p>
      )}
      {successMessage && (
        <p className="text-green-500 text-center mb-4" role="alert" aria-live="assertive">
          {successMessage}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(links).map((platform) => (
          <div key={platform} className="bg-white border border-gray-200 rounded-lg shadow p-4">
            <label
              htmlFor={platform}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </label>
            <input
              type="text"
              id={platform}
              name={platform}
              value={links[platform]}
              onChange={(e) => handleChange(e, platform)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Enter ${platform} link`}
              aria-describedby={error && links[platform] ? `${platform}-error` : undefined}
            />
            <button
              onClick={() => handleSubmit(platform)}
              className="mt-4 w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              disabled={updatingPlatform === platform || !links[platform].trim()}
              aria-label={`Update ${platform} link`}
            >
              {updatingPlatform === platform ? "Updating..." : "Update"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLink;
