# PublicKeyResolver Contract

## Overview
The `PublicKeyResolver` smart contract on the Ethereum blockchain allows users to associate their Ethereum addresses with RSA public keys. This enables a trustless and decentralized way to look up RSA public keys based on Ethereum addresses. Users can update their own public key, and anyone can query a public key associated with a specific Ethereum address.

## Functions

- **updatePublicKey(newPublicKey)**
  - **Arguments**:
    - `string calldata newPublicKey`: The new RSA public key to associate with the sender's Ethereum address. The key should be provided as a string in PEM format.
  - **Details**: This function allows the sender to update their RSA public key stored in the contract. It emits a `PublicKeyUpdated` event upon successful update.

- **resolvePublicKey(account)**
  - **Arguments**:
    - `address account`: The Ethereum address whose RSA public key is being requested.
  - **Returns**: `string` The RSA public key associated with the specified Ethereum address, in PEM format.

## Events

- **PublicKeyUpdated(account, publicKey)**
  - **Emitted when**: A user updates their RSA public key.
  - **Arguments**:
    - `address indexed account`: The Ethereum address of the user whose RSA public key has been updated.
    - `string publicKey`: The new RSA public key associated with the user's address, in PEM format.

## Usage

```javascript
// Update your RSA public key
await contract.updatePublicKey("yourNewRSAPublicKeyInPEMFormat");

// Resolve an RSA public key for an Ethereum address
let publicKey = await contract.resolvePublicKey("ethereumAddress");