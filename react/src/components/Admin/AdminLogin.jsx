import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo-admin.png";
import "./style.css"; // Add a CSS file for styling

// Configure Axios globally
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const AdminLogin = () => {
    const navigate = useNavigate();

    const getCsrfToken = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/csrf-token");
            if (response.status !== 200 || !response.data.csrfToken) {
                throw new Error("Failed to fetch CSRF token");
            }
            return response.data.csrfToken;
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
            return null;
        }
    };

    const login = async (email, password) => {
        const csrfTokenAvailable = await getCsrfToken();
        if (!csrfTokenAvailable) {
            console.error("CSRF token not available");
            return;
        }
        try {
            const response = await axios.post("/api/login", { email, password });
            if (response.status === 200 && response.data.token) {
                setLoading(false);
                localStorage.setItem("authToken", response.data.token);
                axios.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
                alert("Login successful");
                navigate("/admin/dashboard");
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
        }
    };

    const signup = async (email, password, username) => {
        const csrfTokenAvailable = await getCsrfToken();
        if (!csrfTokenAvailable) {
            console.error("CSRF token not available");
            return;
        }
        try {
            const response = await axios.post("/api/signup", { email, password, username });
            if (response.status === 200) {
                alert("Signup successful:", response.data);
                navigate("/admin/dashboard");
            }
        } catch (error) {
            console.error("Signup error:", error.response ? error.response.data : error.message);
        }
    };

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupUsername, setSignupUsername] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [logoClickCount, setLogoClickCount] = useState(0);

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(loginEmail, loginPassword);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        await signup(signupEmail, signupPassword, signupUsername);
    };

    const handleLogoClick = () => {
        setLogoClickCount((prevCount) => {
            const newCount = prevCount + 1;

            // Toggle visibility after 7 clicks to show, and 1 click to hide
            if (newCount === 7) {
                setShowSignupForm(true);
                return 0; // Reset counter after showing form
            }

            // Hide form if it's currently visible and reset count
            if (showSignupForm) {
                setShowSignupForm(false);
                return 0;
            }

            return newCount;
        });
    };

    return (
        <div className="auth-container">
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
            )}
            <div className="auth-box">
                <div className="p-4 flex items-center justify-center border-b border-gray-700">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-32 cursor-default"
                        onClick={handleLogoClick}
                    />
                </div>
                <form onSubmit={handleLogin} className="auth-form">
                    <h2>Login</h2>
                    <input
                        type="text"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">Login</button>
                </form>

                {showSignupForm && (
                    <form onSubmit={handleSignup} className="auth-form">
                        <h2>Signup</h2>
                        <input
                            type="text"
                            value={signupUsername}
                            onChange={(e) => setSignupUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <input
                            type="text"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <button type="submit">Signup</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
