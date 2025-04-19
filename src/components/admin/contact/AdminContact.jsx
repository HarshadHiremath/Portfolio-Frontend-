import React, { useState, useEffect } from "react";
const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LOCALHOST}/contact`);
        if (!response.ok) {
          throw new Error(`Failed to fetch contacts: ${response.statusText}`);
        }
        const data = await response.json();
        const formattedData = data.map((contact) => ({
          id: contact._id,
          user: contact.user,
          email: contact.email,
          phone: contact.phone,
          message: contact.message,
          createdAt: contact.createdAt,
        }));
        formattedData.reverse();
        setContacts(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    // Add confirmation dialog
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_LOCALHOST}/contact/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete contact: ${response.statusText}`);
      }
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
      setSuccessMessage("Contact deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3s
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000); // Clear error after 3s
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <p className="text-center text-gray-500">Loading contacts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500 text-center" role="alert">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Submissions</h1>
      {successMessage && (
        <p
          className="text-green-500 text-center mb-4"
          role="alert"
          aria-live="assertive"
        >
          {successMessage}
        </p>
      )}
      {contacts.length === 0 ? (
        <p className="text-gray-500">No contact submissions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white border border-gray-200 rounded-lg shadow p-4"
            >
              <h2 className="text-lg font-semibold">{contact.user}</h2>
              <p className="text-gray-600 text-sm">{contact.email}</p>
              <p className="text-gray-600 text-sm">{contact.phone}</p>
              <p className="mt-2">{contact.message}</p>
              <p className="text-gray-500 text-sm mt-2">
                {new Date(contact.createdAt).toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(contact.id)}
                className="mt-4 bg-gray-800 text-white py-1 px-3 rounded hover:bg-red-600 disabled:bg-red-300"
                disabled={loading}
                aria-label={`Delete contact from ${contact.user}`}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default AdminContact;