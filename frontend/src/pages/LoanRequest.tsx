import React from "react";
import { Link } from 'react-router-dom';

const LoanRequest: React.FC = () => {
    return (
        <div>
            <h1>Loan Request Page</h1>
            {/*loan request's homepage*/}
            <Link to="/post-request">
                <button>Post request</button>
            </Link>
            <Link to="/request-list">
                <button>Check request list</button>
            </Link>
        </div>
    );
};

export default LoanRequest;
