import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import LandingPageProductRefrigerator from "./components/LandingPageProductRefrigerator";
import NavbarContent from "./components/Admin/NavbarContent/NavbarContent";
import PrivateRoute from "./components/Admin/PrivateRoute";

function App() {
    return (
        <Router>
            <Routes>
                {/* Public route */}
                <Route path="/" element={<LandingPageProductRefrigerator />} />

                {/* Login route */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected admin dashboard route */}
                <Route element={<PrivateRoute />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />}>
                        <Route
                            path="navbar-content"
                            element={<NavbarContent />}
                        />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
