import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import LandingPageProductRefrigerator from './components/LandingPageProductRefrigerator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPageProductRefrigerator />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
