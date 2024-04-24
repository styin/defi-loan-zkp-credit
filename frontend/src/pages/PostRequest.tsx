import React from "react";
import RequestForm from "../components/RequestForm";
import SideBar from "../components/SideBar";

const PostRequest: React.FC = () => {
    return (
        <div className="flex flex-row">
            <aside>
                <SideBar />
            </aside>
            <section className="flex-1 bg-gray-50 ml-64">
                <div className="mt-10 justify-center items-center">
                    <RequestForm />
                </div>
            </section>
        </div>
    );
};

export default PostRequest;
