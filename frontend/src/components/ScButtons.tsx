import React from "react";
// import backendURL from "../backendURL";

const ScButtons: React.FC = () => {

    function sc_CreateCommitment() {
    }

    function sc_ConfirmCommitment() {
    }

    function sc_getYiValuesByBorrowerAndIndices() {
    }

    function sc_getLendersByBorrower() {
    }

    return (
        <div>
            <button onClick={sc_CreateCommitment}>Create Commitment</button>
            <button onClick={sc_ConfirmCommitment}>| Confirm Commitment</button>
            <button onClick={sc_getYiValuesByBorrowerAndIndices}>| Get Yi</button>
            <button onClick={sc_getLendersByBorrower}>| Get Lenders</button>
        </div>
    );
};

export default ScButtons;
