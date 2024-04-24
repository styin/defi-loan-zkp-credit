import React from "react"
import SideBar from "../components/SideBar"
// import backendURL from "../backendURL"

import ScButtons from "../components/ScButtons"

const ScInteraction: React.FC = () => {
    return (
        <div className="flex flex-row">
            <aside>
                <SideBar />
            </aside>
            <section className="flex-1 bg-gray-50 ml-64 pb-xxl">
                <ScButtons />
            </section>
        </div>
    )
}

export default ScInteraction
