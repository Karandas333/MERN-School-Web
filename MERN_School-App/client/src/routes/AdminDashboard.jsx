import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AdminDashBoard from '../pages/Adminpage';
import AdminAuth from '../pages/Adminpage/Admin-auth';
import CreateForm from '../pages/Adminpage/Components/CreateForm';
import EditInfoPage from '../pages/Adminpage/Components/EditInfoPage';
import EditStaffMembers from '../pages/Adminpage/Components/EditStaff/EditStaffMembers';
import AdminSidebar from '../components/AdminSidebar';
import ErrorPage from '../components/ErrorPage';
import { apiClient } from '../lib/api-client';
import { HOST, VERIFY_ADMIN } from '../utiles/contants';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track auth status
  // Verify user authentication
  const verify = async () => {
    try {
      const response = await apiClient.get(VERIFY_ADMIN, { withCredentials: true ,
  headers: {
    'authorization': `Bearer ${localStorage.getItem('jwt')}`,
  },
});
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error)
      setIsAuthenticated(false); // Set false in case of error
    }
  };

  // Call verify when the component mounts
  useEffect(() => {
    verify();
  }, []); // Empty array ensures it runs once on mount

  // Private route component
  const PrivateRoute = ({ children }) => {
    if (isAuthenticated === null) {
      return <div>Loading...</div>; // Render loading state while checking auth
    }
    return isAuthenticated ? children : <Navigate to="/admin/govt-sr-sec-school-ss" />; // Redirect to login if not authenticated
  };

  const location = useLocation();
  const isAuthPage =
    location.pathname === '/admin/dashboard' ||
    location.pathname === '/admin/admission-form-creation' ||
    location.pathname === '/admin/edit-info-page' ||
    location.pathname === '/admin/edit-staff-members';

  return (
    <div className="admin min-h-screen flex flex-col lg:flex-row">
      {isAuthPage && <AdminSidebar page={location.pathname} />}
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/govt-sr-sec-school-ss" element={isAuthenticated ? <Navigate to='/admin/dashboard'/> : <AdminAuth />} />
        <Route path="/dashboard" element={<PrivateRoute><AdminDashBoard /></PrivateRoute>} />
        <Route path="/admission-form-creation" element={<PrivateRoute><CreateForm /></PrivateRoute>} />
        <Route path="/edit-info-page" element={<PrivateRoute><EditInfoPage /></PrivateRoute>} />
        <Route path="/edit-staff-members" element={<PrivateRoute><EditStaffMembers /></PrivateRoute>} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
