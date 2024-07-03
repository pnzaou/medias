import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom'

const RouteProtector = ({children}) => {

    if(!localStorage.getItem('user')) return <Navigate to='/connexion'/>

    return <>{children}</>
}

export default RouteProtector;
