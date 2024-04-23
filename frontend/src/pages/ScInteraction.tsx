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
            <section className="flex-1 bg-gray-400">
                <div className="mt-10 justify-center items-center">
                    <ScButtons />
                </div>
            </section>
        </div>
    )
}

export default ScInteraction
