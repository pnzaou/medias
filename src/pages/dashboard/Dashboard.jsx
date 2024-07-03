import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if(!localStorage.getItem('user')){
            navigate('/connexion')
        }
    })
    return (
        <div>
            Dashboard
        </div>
    );
}

export default Dashboard;
