import React from "react";
import { Link } from 'react-router-dom';

const LoanRequest: React.FC = () => {
    return (
        <div>
            <h1>Deprecated Page | Loan Request</h1>
            {/*loan request's homepage*/}
            <Link to="post">
                <button>Post request</button>
            </Link>
            <Link to="list">
                <button>Check request list</button>
            </Link>
        </div>
    );
};

export default LoanRequest;
