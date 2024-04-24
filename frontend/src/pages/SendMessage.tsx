import React from "react";
import MessageForm from "../components/MessageForm";
import SideBar from "../components/SideBar";

const SendMessage: React.FC = () => {
    return (
        <div className="flex flex-row">
            <aside>
                <SideBar />
            </aside>
            <section className="flex-1 bg-gray-50 ml-64 pb-xxxl">
                <MessageForm />
            </section>
        </div>
    );
};

export default SendMessage;
