import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({ children }) => {
    const user = useSelector((state) => state.Auth.login?.currentUser);

    console.log('ProtectedRouteAdmin - User data:', user);

    if (!user) {
        console.log('No user found, redirecting to login');
        return <Navigate to="/login" />;
    }

    if (!user.admin) {
        console.log('User is not admin, redirecting to login');
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRouteAdmin;
