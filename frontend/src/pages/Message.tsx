import React from "react";
import { Link } from 'react-router-dom';

const Message: React.FC = () => {
    return (
        <div>
            <h1>Message Page</h1>
            {/*loan request's homepage*/}
            <Link to="send-message">
                <button>Send Messages</button>
            </Link>
            <Link to="fetch-message">
                <button>Fetch Messages</button>
            </Link>
        </div>
    );
};

export default Message;