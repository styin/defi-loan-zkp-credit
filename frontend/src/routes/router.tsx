import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import the AuthGuard component for route protection
import AuthGuard from './AuthGuard';

// Import the pages
import RequestList from '../pages/RequestList';
import Login from '../pages/Login';
import MainPage from '../pages/MainPage';

const RouterConfig: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                /* Route 1: App */
                <Route path="/" element={<MainPage />} />
                /* Route 2: Dashboard */
                <Route path="/dashboard" element={
                    <AuthGuard> 
                        <RequestList /> 
                    </AuthGuard>} />
                /* Route 3: Login */
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterConfig;
