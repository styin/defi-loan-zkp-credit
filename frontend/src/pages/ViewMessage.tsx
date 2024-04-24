import React from "react";

import SideBar from "../components/SideBar";
import MessageList from "../components/MessageList";

const ViewMessage: React.FC = () => {
    return (
        <div className="flex flex-row">
            <aside>
                <SideBar />
            </aside>
            <section className="flex-1 bg-gray-50 ml-64 pb-xxxl">
                <MessageList />
            </section>
        </div>
    )
}

export default ViewMessage;
