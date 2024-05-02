import React, { useState } from "react";

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

  const [keyName, setKeyName] = useState("");
  const [publicKeyName, setPublicKeyName] = useState("");
  const [message, setMessage] = useState("");
  const [messageToDecrypt, setMessageToDecrypt] = useState("");
  const [proofPackage, setProofPackage] = useState("");

  const pythonBackendURL = import.meta.env.VITE_LOCAL_SCRIPT_HOST;
  // 1. Key Generation
  //Initiate a key pair generation through the `/generate-keys` endpoint.
  const handleGenerateKeys = (e: React.FormEvent) => {
    e.preventDefault();
    const g_name = keyName;
    fetch(pythonBackendURL + "/generate-keys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pair_name: g_name }),
    })
      .then((response) => response.json())
      .then(() => {
        updateReturnedType("Key Pair");
        updateReturnedValue("Please check your local directory");
        setKeyName("");
        console.log("Key pair generated successfully!");
      })
      .then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Optional: Adds smooth scrolling animation
        });
      })
  };

  const handleRetrievePublicKey = (e: React.FormEvent) => {
    //### 2. Public Key Retrieval
    //Retrieve the public key for a specific key pair name using the `/get-public-key` endpoint.
    e.preventDefault();
    const k_name = publicKeyName;
    fetch(pythonBackendURL + "/get-public-key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pair_name: k_name }),
    })
      .then((response) => response.json())
      .then((data) => {
        updateReturnedType("Public Key");
        updateReturnedValue(data.public_key);
        setPublicKeyName("");
        console.log("Public key retrieved successfully:", data.public_key);
      })
      .then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Optional: Adds smooth scrolling animation
        });
      })
  };

  const handleEncryptMessage = (e: React.FormEvent) => {
    //### 3. Message Encryption and Decryption
    //Encrypt and decrypt messages using the `/encrypt` and `/decrypt` endpoints, respectively.
    e.preventDefault();
    const plain_message = message;
    fetch(pythonBackendURL + "/encrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: plain_message,
        sender_pair_name: "sender",
        receiver_pair_name: "receiver",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        updateReturnedType("Encrypted Message Package");
        updateReturnedValue(JSON.stringify(data));
        setMessage("");
        console.log("Encrypted message:", data);
      })
      .then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Optional: Adds smooth scrolling animation
        });
      })
  };

  const handleDecryptMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const encrypted_package = messageToDecrypt;
    fetch(pythonBackendURL + "/decrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        package: JSON.parse(encrypted_package),
        receiver_pair_name: "receiver",
        sender_pair_name: "sender",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        updateReturnedType("Decrypted Message");
        updateReturnedValue(data.decrypted_message);
        setMessageToDecrypt("");
        console.log("Decrypted message:", data.decrypted_message);
      })
      .then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Optional: Adds smooth scrolling animation
        });
      })
  };

  const handleCreateCommitments = (e: React.FormEvent) => {
    //### 4. ZKP Operations
    //Use the ZKCS_Hash server to manage commitments and handle proof operations through the following endpoints:
    //#### Create Commitments
    //Initiate the creation of commitments with the `/create_commitments` endpoint.
    e.preventDefault();
    fetch(pythonBackendURL + "/create_commitments", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        updateReturnedType("Commitments");
        updateReturnedValue(data);
        console.log("Commitments:", data);
      })
      .then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Optional: Adds smooth scrolling animation
        });
      })
  };

  const handleGenerateProof = (e: React.FormEvent) => {
    //#### Generate Proof
    //Generate a cryptographic proof based on specified positions using the `/prover` endpoint.
    e.preventDefault();
    const positions = [0, 1, 2, 3]; // Example positions for the proof
    fetch(pythonBackendURL + "/prover", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ positions: positions }),
    })
      .then((response) => response.json())
      .then((data) => {
        updateReturnedType("Proof");
        updateReturnedValue(JSON.stringify(data));
        console.log("Proof:", data);
      })
      .then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Optional: Adds smooth scrolling animation
        });
      })
  };

  const handleVerifyProof = (e: React.FormEvent) => {
    e.preventDefault();
    //#### Verify Proof
    //Verify a cryptographic proof by providing the proof and the selected Y values to the `/verifier` endpoint.
    //const proof = {}; // JSON object representing the proof
    const Y_selected = [125, 5, 625, 5]; // Array of selected Y values
    //let Y_selected = [];
    const proof = proofPackage;
    //const Y_selected = prompt("Input list of selected Y values with commas: (e.g. [1,2,3,4])");
    //console.log(JSON.stringify({ proof: proof, Y_selected: Y_selected.join(', ') }));

    fetch(pythonBackendURL + "/verifier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ proof: proof, Y_selected: Y_selected }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.verification_passed) {
          updateReturnedType("Verification Result");
          updateReturnedValue(data.verification_passed);
          setProofPackage("");
          console.log("Proof verified successfully.");
        } else {
          updateReturnedType("Verification Result");
          updateReturnedValue(data.error);
          setProofPackage("");
          console.log("Proof verification failed.");
        }
      })
      .then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Optional: Adds smooth scrolling animation
        });
      })
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-24 lg:py-0 gap-10">
        {/* Top of the form */}
        <a className="font-bold flex items-center text-2xl text-gray-900">
          Encryption Related Functions
        </a>

        {/* Information section */}
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0">
          <div className="flex flex-col gap-6 md:p-4">
            {/* Display Function called*/}
            <label>
              <span className="block text-sm font-semibold leading-6 text-gray-600">
                Function Called
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-900">
                {returnedType}
              </span>
            </label>
            {/* Display return value */}
            <label>
              <span className="block text-sm font-semibold leading-6 text-gray-600">
                Returned Value
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-900">
                <input
                  type="text"
                  name="returns"
                  value={returnedValue}
                  readOnly
                  className="w-96 h-64 text-top"
                />
              </span>
            </label>
          </div>
        </div>

        {/* Generate Key Pair */}
        <form
          onSubmit={handleGenerateKeys}
          className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0"
        >
          <div className="flex flex-col gap-6 md:p-4">
            <label>
              <span className="block text-sm font-semibold leading-6 text-gray-600">
                <a className="text-red-600"> * </a> Your key name:
              </span>

              <input
                className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                type="text"
                name="keyName"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="e.g. myKey - If the key file name is myKey_public_key.pem"
                required={true}
              />
            </label>
            <button
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Generate Key Pair
            </button>
          </div>
        </form>

        {/* Retrieve Public Key */}
        <form
          onSubmit={handleRetrievePublicKey}
          className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0"
        >
          <div className="flex flex-col gap-6 md:p-4">
            <label>
              <span className="block text-sm font-semibold leading-6 text-gray-600">
                <a className="text-red-600"> * </a> Key name to be retrieved:
              </span>

              <input
                className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                type="text"
                name="publicKeyName"
                value={publicKeyName}
                onChange={(e) => setPublicKeyName(e.target.value)}
                placeholder="e.g. myKey - If the key file name is myKey_public_key.pem"
                required={true}
              />
            </label>
            <button
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Retrieve Public Key
            </button>
          </div>
        </form>

        {/* Encrypt Message */}
        <form
          onSubmit={handleEncryptMessage}
          className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0"
        >
          <div className="flex flex-col gap-6 md:p-4">
            <label>
              <span className="block text-sm font-semibold leading-6 text-gray-600">
                <a className="text-red-600"> * </a> Message to be encrypted:
              </span>

              <input
                className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                type="text"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. hello - If you want to encrypt 'hello'"
                required={true}
              />
            </label>
            <button
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Encrypt Message
            </button>
          </div>
        </form>

        {/* Decrypt Message */}
        <form
          onSubmit={handleDecryptMessage}
          className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0"
        >
          <div className="flex flex-col gap-6 md:p-4">
            <label>
              <span className="block text-sm font-semibold leading-6 text-gray-600">
                <a className="text-red-600"> * </a> Encryption Package to be
                decrypted:
              </span>

              <input
                className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                type="text"
                name="messageToDecrypt"
                value={messageToDecrypt}
                onChange={(e) => setMessageToDecrypt(e.target.value)}
                placeholder="input the full encryption package to be decrypted"
                required={true}
              />
            </label>
            <button
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Decrypt Message
            </button>
          </div>
        </form>

        {/* Create Commitment */}
        <form
          onSubmit={handleCreateCommitments}
          className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0"
        >
          <div className="flex flex-col gap-6 md:p-4">
            <label>
              <span className="block text-sm font-semibold leading-6 text-gray-600">
                <a className="text-red-600"> * </a> Create Commitment:
              </span>
            </label>
            <button
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Create Commitment
            </button>
          </div>
        </form>

        {/* Generate Proof */}
        <form
          onSubmit={handleGenerateProof}
          className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0"
        >
          <div className="flex flex-col gap-6 md:p-4">
            <label>
              <span className="block text-sm font-semibold leading-6 text-gray-600">
                <a className="text-red-600"> * </a> Generate Proof:
              </span>
            </label>
            <button
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Generate Proof
            </button>
          </div>
        </form>

        {/* Verify Proof */}
        <form
          onSubmit={handleVerifyProof}
          className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0"
        >
          <div className="flex flex-col gap-6 md:p-4">
            <label>
              <span className="block text-sm font-semibold leading-6 text-gray-600">
                <a className="text-red-600"> * </a> Proof to be verified:
              </span>

              <input
                className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                type="text"
                name="proofPackage"
                value={proofPackage}
                onChange={(e) => setProofPackage(e.target.value)}
                placeholder="input the full proof package to be verified"
                required={true}
              />
            </label>
            <button
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Verify Proof
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Encryption;
