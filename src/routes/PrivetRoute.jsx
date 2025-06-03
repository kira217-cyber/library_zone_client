import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
    const { user, loading } = useAuth()
    const location = useLocation();
    
    if(loading){
        return <span className="loading loading-ring loading-xl"></span>
    }

    if(!user){
        return <Navigate to="/login" state={location.pathname}></Navigate>
    }
    return children
};

export default PrivetRoute;