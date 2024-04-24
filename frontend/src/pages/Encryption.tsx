import React from "react";
import SideBar from "../components/SideBar";

const Encryption: React.FC = () => {
    const pythonBackendURL = import.meta.env.VITE_LOCAL_SCRIPT_HOST;
    // 1. Key Generation
    //Initiate a key pair generation through the `/generate-keys` endpoint.
    function generateKeys() {
        const g_name = prompt("Input your key name");
        fetch(pythonBackendURL + '/generate-keys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pair_name: g_name })
        })
        .then(response => response.json())
        .then(data => console.log(data));
    }

    function retrievePublicKey() {
        //### 2. Public Key Retrieval
        //Retrieve the public key for a specific key pair name using the `/get-public-key` endpoint.
        const k_name = prompt("Input your key name");
        fetch(pythonBackendURL + '/get-public-key', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pair_name: k_name })
        })
        .then(response => response.json())
        .then(data => console.log("Public Key Response:", data));
    }

    function encryptMessage() {
        //### 3. Message Encryption and Decryption
        //Encrypt and decrypt messages using the `/encrypt` and `/decrypt` endpoints, respectively.
        const plain_message = prompt("Input your message:");
        fetch(pythonBackendURL + '/encrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: plain_message,
            sender_pair_name: 'sender',
            receiver_pair_name: 'receiver'
        })
        })
        .then(response => response.json())
        .then(data => console.log('Encryption package:', data));
    }

    function decryptMessage() {
        let encrypted_package = '';
        encrypted_package = prompt("Paste the encrypted package here:") || '';
        fetch(pythonBackendURL + '/decrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            package: JSON.parse(encrypted_package),
            receiver_pair_name: 'receiver',
            sender_pair_name: 'sender'
        })
        })
        .then(response => response.json())
        .then(data => console.log('Decrypted message:', data.decrypted_message));
    }

    function create_commitments() {
        //### 4. ZKP Operations
        //Use the ZKCS_Hash server to manage commitments and handle proof operations through the following endpoints:
        //#### Create Commitments
        //Initiate the creation of commitments with the `/create_commitments` endpoint.
        fetch(pythonBackendURL + '/create_commitments', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => console.log('Commitments:', data));
    }

    function generateProof() {
        //#### Generate Proof
        //Generate a cryptographic proof based on specified positions using the `/prover` endpoint.
        const positions = [0, 1, 2, 3]; // Example positions for the proof
        // or take user input??????
        fetch(pythonBackendURL + '/prover', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ positions: positions })
        })
        .then(response => response.json())
        .then(data => console.log('Proof:', data));
    }

    function verifyProof() {
        //#### Verify Proof
        //Verify a cryptographic proof by providing the proof and the selected Y values to the `/verifier` endpoint.
        //const proof = {}; // JSON object representing the proof
        const Y_selected = [125, 5, 625, 5]; // Array of selected Y values
        //let Y_selected = [];
        const proof = prompt("Paste the proof here:");
        //const Y_selected = prompt("Input list of selected Y values with commas: (e.g. [1,2,3,4])");
        //console.log(JSON.stringify({ proof: proof, Y_selected: Y_selected.join(', ') }));

        fetch(pythonBackendURL + '/verifier', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ proof: proof, Y_selected: Y_selected })
        })
        .then(response => response.json())
        .then(data => {
        if (data.verification_passed) {
            console.log("Proof verified successfully.");
        } else {
            console.log("Proof verification failed.");
        }
        });
    }
    return (
        <div className="flex flex-row">
            <aside>
                <SideBar />
            </aside>
            <section className="flex-1 bg-gray-50 ml-64">
                <button onClick={generateKeys}>Generate Key Pair</button>
                <button onClick={retrievePublicKey}>Retrieve Public Key</button>
                <button onClick={encryptMessage}>Encrypt Message</button>
                <button onClick={decryptMessage}>Decrypt Message</button>
                <button onClick={create_commitments}>Create Commitments</button>
                <button onClick={generateProof}>Generate Proof</button>
                <button onClick={verifyProof}>Verify Proof</button>
            </section>
        </div>
    );
};

export default Encryption;
