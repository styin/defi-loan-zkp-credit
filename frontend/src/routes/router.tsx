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
import Message from '../pages/Message';
import SendMessage from '../pages/SendMessage';
import FetchMessage from '../pages/FetchMessage';
import Placeholder from '../pages/Placeholder';

const RouterConfig: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Placeholder Route */}
                <Route path="/placeholder" element={
                    <Placeholder />
                }/>

                {/* Route 0: Main Page */}
                <Route path="/" element={
                    <MainPage />
                }/>

                {/* Route 1: Dashboard */} {/* Placeholder for the Dashboard */}
                <Route path="/dashboard" element={
                    <AuthGuard> <Placeholder /> </AuthGuard> 
                }/>

                {/* Route 2: Loan Request */}
                <Route path="/requests" element={
                    <AuthGuard> <LoanRequest /> </AuthGuard>
                }/>

                    {/* Pseudo-Subroute 2.1: Post Request */}
                    <Route path="/requests/post" element={
                        <AuthGuard> <RequestForm /> </AuthGuard>
                    }/>

                    {/* Pseudo-Subroute 2.2: Request List */}
                    <Route path="/requests/list" element={
                        <AuthGuard> <RequestList /> </AuthGuard>
                    }/>

                {/* Route 3: Messaging */}
                <Route path="/message" element={
                    <AuthGuard> <Message /> </AuthGuard>
                }/>

                    {/* Pseudo-Subroute 3.1: Send Message */}
                    <Route path="/message/send" element={
                        <AuthGuard> <SendMessage /> </AuthGuard>
                    }/>

                    {/* Pseudo-Subroute 3.2: Fetch Message */}
                    <Route path="/message/fetch" element={
                        <AuthGuard> <FetchMessage /> </AuthGuard>
                    }/>

                {/* Route 4: Login */}
                <Route path="/login" element={
                    <Login />
                }/>
            </Routes>
        </BrowserRouter>
    );
};

export default RouterConfig;
