import React from "react";
import { Link } from 'react-router-dom';

const Message: React.FC = () => {
    return (
        <div>
            <h1>Deprecated Page | Message</h1>
            {/*loan request's homepage*/}
            <Link to="send">
                <button>Send Messages</button>
            </Link>
            <Link to="fetch">
                <button>Fetch Messages</button>
            </Link>
        </div>
    );
};

export default Message;
