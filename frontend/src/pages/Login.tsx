import React from 'react';

// Import utility functions
import SideBar from '../components/SideBar';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
    return (
        <div className='flex flex-row'>
            <aside>
                <SideBar />
            </aside>
            <section className='flex-1 bg-gray-50 ml-64'>
                <LoginForm />
            </section>
        </div>
    );
};

export default Login;
