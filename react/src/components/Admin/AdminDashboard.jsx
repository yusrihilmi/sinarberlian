import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-grow p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;
