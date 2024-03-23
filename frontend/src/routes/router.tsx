import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import the AuthGuard component for route protection
import AuthGuard from './AuthGuard';

// Import the pages
import RequestList from '../pages/RequestList';
import Login from '../pages/Login';
import MainPage from '../pages/MainPage';
import RequestForm from '../pages/RequestForm';
import LoanRequest from '../pages/LoanRequest';

const RouterConfig: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route 1: App */}
                <Route path="/" element={<MainPage />} />

                {/* Route 2: Dashboard */}
                <Route path="/dashboard" element={
                    <AuthGuard> <LoanRequest /> </AuthGuard>
                }/>

                {/* Pseudo-Subroute 3: Post Request */}
                <Route path="/dashboard/post-request" element={
                    <AuthGuard> <RequestForm /> </AuthGuard>
                }/>

                {/* Pseudo-Subroute 4: Request List */}
                <Route path="/dashboard/request-list" element={
                    <AuthGuard> <RequestList /> </AuthGuard>
                }/>

                {/* Route 3: Login */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterConfig;
