import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();  // Using useNavigate instead of useHistory

    // Function to determine if the link is active
    const isActive = (path) => location.pathname === path;

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        alert("Logout succesfully") // Remove token from storage
        navigate('/admin/login'); // Redirect to login page
      };

    return (
        <aside className="w-64 bg-gray-900 text-white flex flex-col">
            <div className="fixed" style={{ width: "inherit" }}>
                {/* Logo */}
                <div className="p-4 flex items-center justify-center border-b border-gray-700">
                    <img
                        src="/path/to/your/logo.png" // Replace with actual logo path
                        alt="Logo"
                        className="h-12 w-12"
                    />
                    <span className="text-lg font-semibold ml-3">Admin</span>
                </div>

                {/* Navigation Links */}
                <nav className="mt-6 flex-grow">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/admin/dashboard"
                                className={`block px-4 py-2 rounded-md ${
                                    isActive("/admin/dashboard")
                                        ? "bg-gray-700 text-white hover:text-white" // Active link styles
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/dashboard/navbar-content"
                                className={`block px-4 py-2 rounded-md ${
                                    isActive("/admin/dashboard/navbar-content")
                                        ? "bg-gray-700 text-white hover:text-white" // Active link styles
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                Navbar Content
                            </Link>
                        </li>
                        {/* Add more links if needed */}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="mt-auto mb-6 px-4 py-2">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white rounded-md py-2"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
