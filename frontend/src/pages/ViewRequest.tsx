import React from "react";

import SideBar from "../components/SideBar";
import RequestList from "../components/RequestList";

const ViewRequest: React.FC = () => {
    return (
        <div className="flex flex-row">
            <aside>
                <SideBar />
            </aside>
            <section className="flex-1 bg-gray-50 ml-64 pb-xxxl">
                <RequestList />
            </section>
        </div>
    )
}

export default ViewRequest;
