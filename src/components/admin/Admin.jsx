import React, { useState } from "react";
import AdminProject from "./project/AdminProject";
// import AdminContact from "./contact/AdminContact";
import AdminAbout from "./about/AdminAbout";
import AdminCodeDev from "./codeDev/AdminCodeDev";
import AdminContact from "./contact/AdminContact";
import AdminLink from './link/AdminLink';
import AdminBlog from './blog/AdminBlog';
import AdminHome from "./home/AdminHome";

const Sidebar = ({ isOpen, toggleSidebar, setActiveComponent }) => {
  const handleMenuClick = (component) => {
    setActiveComponent(component);
    toggleSidebar(); // Close the sidebar in mobile view
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform lg:translate-x-0`}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <nav className="mt-4">
        <button
          className="block py-2 px-4 w-full text-left hover:bg-gray-700"
          onClick={() => handleMenuClick("Home")}
        >
          Home
        </button>

        <button
          className="block py-2 px-4 w-full text-left hover:bg-gray-700"
          onClick={() => handleMenuClick("Project")}
        >
          Project
        </button>
        
        
        <button
          className="block py-2 px-4 w-full text-left hover:bg-gray-700"
          onClick={() => handleMenuClick("CodeDev")}
        >
          CodeDev
        </button>

        <button
          className="block py-2 px-4 w-full text-left hover:bg-gray-700"
          onClick={() => handleMenuClick("About")}
        >
          About
        </button>

        <button
          className="block py-2 px-4 w-full text-left hover:bg-gray-700"
          onClick={() => handleMenuClick("Blog")}
        >
          Blog
        </button>

        <button
          className="block py-2 px-4 w-full text-left hover:bg-gray-700"
          onClick={() => handleMenuClick("Contact")}
        >
          Contact
        </button>
        <button
          className="block py-2 px-4 w-full text-left hover:bg-gray-700"
          onClick={() => handleMenuClick("Link")}
        >
          Links
        </button>
      </nav>
      <button
        className="absolute top-4 right-4 lg:hidden text-gray-300"
        onClick={toggleSidebar}
      >
        ✖
      </button>
    </div>
  );
};

const Dashboard = ({ toggleSidebar, activeComponent }) => {
  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <AdminHome />;
      case "Project":
        return <AdminProject />;
      case "Contact":
        return <AdminContact />;
      case "About":
        return <AdminAbout />;
      case "CodeDev":
        return <AdminCodeDev />;
      case "Link":
        return <AdminLink/>;
      case "Blog":
        return <AdminBlog/>;
      default:
        return <p>Welcome! Please select an option from the sidebar.</p>;
    }
  };

  return (
    <div className="flex-1 lg:ml-64 p-4">
      <header className="bg-white shadow p-4 flex justify-between items-center lg:justify-start">
        <button className="lg:hidden text-gray-800" onClick={toggleSidebar}>
          ☰
        </button>
        <h2 className="text-xl font-semibold">Welcome Harshad</h2>
      </header>
      <main className="mt-4">{renderComponent()}</main>
    </div>
  );
};

function Admin() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveComponent={setActiveComponent}
      />
      <Dashboard toggleSidebar={toggleSidebar} activeComponent={activeComponent} />
    </div>
  );
}

export default Admin;
