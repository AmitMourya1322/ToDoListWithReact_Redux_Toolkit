import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { userInfo } = useSelector((state) => state.auth);

    return userInfo ? <Navigate to="/" /> : children;
};

export default PrivateRoute;