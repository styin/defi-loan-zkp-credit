import React from "react";

import SideBar from "../components/SideBar";
import LocalScriptButtons from "../components/LocalScriptButtons";

const LocalScriptInteraction: React.FC = () => {
  return (
    <div className="flex flex-row">
      <aside>
        <SideBar />
      </aside>
      <section className="flex-1 bg-gray-50 ml-64 pb-xxl">
        <LocalScriptButtons />
      </section>
    </div>
  );
};

export default LocalScriptInteraction;
