import React, { useState } from "react";
import SideBar from "../components/SideBar";

const Encryption: React.FC = () => {
    const [returnedType, setReturnedType] = useState("");
    const [returnedValue, setReturnedValue] = useState("");

    // Your existing functions here
    function updateReturnedType(type: string) {
        setReturnedType(type);
    }
    // Function to update the state with the returned value
    function updateReturnedValue(value: string) {
        setReturnedValue(value);
    }
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
        .then(() => {
            updateReturnedType("Key Pair");
            // actual key pair is not returned, just a message
            updateReturnedValue("Please check your local directory");
        });
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
        .then(data => {
            updateReturnedType("Public Key");
            updateReturnedValue(data.public_key);
        });
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
        .then(data => {
            updateReturnedType("Encrypted Message Package");
            updateReturnedValue(JSON.stringify(data));
            console.log("Encrypted message:", data);
        });
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
        .then(data => {
            updateReturnedType("Decrypted Message");
            updateReturnedValue(data.decrypted_message);
            console.log('Decrypted message:', data.decrypted_message);
        });
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
        .then(data => {
            updateReturnedType("Commitment");
            updateReturnedValue(data);
            console.log('Commitments:', data);
        });
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
        .then(data => {
            updateReturnedType("Proof");
            updateReturnedValue(data.proof.toString());
            console.log('Proof:', data);
        });
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
            updateReturnedType("Verification Result");
            updateReturnedValue(data.verification_passed);
            console.log("Proof verified successfully.");
        } else {
            updateReturnedType("Verification Result");
            updateReturnedValue(data.error);
            console.log("Proof verification failed.");
        }
        });
    }
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-24 lg:py-0 gap-10">
            <aside>
                <SideBar />
            </aside>
            <section className="flex flex-col gap-6 md:p-4">
                <button onClick={generateKeys}>Generate Key Pair</button>
                <button onClick={retrievePublicKey}>Retrieve Public Key</button>
                <button onClick={encryptMessage}>Encrypt Message</button>
                <button onClick={decryptMessage}>Decrypt Message</button>
                <button onClick={create_commitments}>Create Commitments</button>
                <button onClick={generateProof}>Generate Proof</button>
                <button onClick={verifyProof}>Verify Proof</button>
            </section>
            <section className="flex flex-col gap-6 md:p-4">
                {/* Label to display the returned type */}
                <label htmlFor="returned-type">Returned Type: {returnedType}</label>
                {/* Text field to display the returned value */}
                <label htmlFor="returned-value">Returned Value:
                    <input type="text" name="returns" value={returnedValue} readOnly className="w-96 h-64 text-top"/>
                </label>
            </section>
        </div>
    );
};

export default Encryption;
