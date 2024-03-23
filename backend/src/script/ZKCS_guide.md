# ZKCS_Hash Integration and API Tester Guide

## Introduction

This guide outlines how to integrate the ZKCS_Hash local server into your web application and provides a step-by-step walkthrough using the `api_tester_V2.ipynb` Jupyter Notebook as a hands-on example for testing API endpoints.

## Prerequisites

- Ensure `ZKCS_Hash.exe` is running locally.
- Have Jupyter Notebook installed, which can be done via Anaconda or with pip (for tester):

   ```sh
   pip install notebook
   ```
- Install the requests library, required for making HTTP calls in the notebook:
   ```sh
   pip install requests
   ```

## Integration Steps

Follow these steps to integrate the ZKCS_Hash server with your web application:

### 1. Key Generation

Initiate a key pair generation through the `/generate-keys` endpoint.

```javascript
// Sample JavaScript code for web app integration
let g_name = prompt("Input your key name");
fetch('http://localhost:5000/generate-keys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ pair_name: g_name })
})
.then(response => response.json())
.then(data => console.log(data));
```

### 2. Public Key Retrieval

Retrieve the public key for a specific key pair name using the `/get-public-key` endpoint.

```javascript
// Sample JavaScript code for web app integration
let k_name = prompt("Input your key name");
fetch('http://localhost:5000/get-public-key', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ pair_name: k_name })
})
.then(response => response.json())
.then(data => console.log("Public Key Response:", data));
```

### 3. Message Encryption and Decryption

Encrypt and decrypt messages using the `/encrypt` and `/decrypt` endpoints, respectively.

```javascript
// Sample JavaScript code for message encryption
let plain_message = prompt("Input your message:");
fetch('http://localhost:5000/encrypt', {
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

// Sample JavaScript code for message decryption
let encrypted_package = prompt("Paste the encrypted package here:");
fetch('http://localhost:5000/decrypt', {
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
```

### 4. ZKP Operations

Use the ZKCS_Hash server to manage commitments and handle proof operations through the following endpoints:

#### Create Commitments

Initiate the creation of commitments with the `/create_commitments` endpoint.

```javascript
// Sample JavaScript code for web app integration
fetch('http://localhost:5000/create_commitments', {
  method: 'POST'
})
.then(response => response.json())
.then(data => console.log('Commitments:', data));
```

#### Generate Proof

Generate a cryptographic proof based on specified positions using the `/prover` endpoint.

```javascript
// Sample JavaScript code for web app integration
let positions = [0, 1, 2, 3]; // Example positions for the proof
fetch('http://localhost:5000/prover', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ positions: positions })
})
.then(response => response.json())
.then(data => console.log('Proof:', data));
```

#### Verify Proof

Verify a cryptographic proof by providing the proof and the selected Y values to the `/verifier` endpoint.

```javascript
// Sample JavaScript code for web app integration
let proof = {}; // JSON object representing the proof
let Y_selected = []; // Array of selected Y values

fetch('http://localhost:5000/verifier', {
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
```

---

This section now completes the missing part about commitments and proof operations for your guide.

## Using `api_tester_V2.ipynb` for Demonstration

Launch the `api_tester_V2.ipynb` notebook in Jupyter by navigating to the notebook's directory and running:

```sh
jupyter notebook
```

Execute the cells sequentially to simulate API interactions:

- **Key Generation**: Generates a new key pair.
- **Public Key Retrieval**: Fetches the public key associated with the key name.
- **Message Encryption**: Encrypts a message provided by the user.
- **Message Decryption**: Decrypts an encrypted message package.
- **Create Commitments**: Initiates the creation of commitments.
- **Generate Proof**: Produces a cryptographic proof.
- **Verify Proof**: Validates the cryptographic proof.

Each notebook cell corresponds to an API endpoint and will guide you through the process of making requests and handling responses.

## Error Handling
Make sure to handle errors for each request by adding .catch() blocks to the promise chains or using try/catch with async/await.

## Conclusion

By following this guide and utilizing the `api_tester_V2.ipynb` notebook, you'll be able to effectively integrate the ZKCS_Hash server's cryptographic services into your web application, enabling secure communication and ZKP processes. The notebook serves as a practical example to ensure your integration is functioning correctly.