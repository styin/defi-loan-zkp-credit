// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PublicKeyResolver {
    // Mapping from address to their public key
    mapping(address => string) private _publicKeys;

    // Event to notify when a public key is updated
    event PublicKeyUpdated(address indexed account, string publicKey);

    // Function to update the public key for msg.sender
    function updatePublicKey(string calldata newPublicKey) external {
        // Update the public key for the sender
        _publicKeys[msg.sender] = newPublicKey;
        
        // Emit an event that the public key has been updated
        emit PublicKeyUpdated(msg.sender, newPublicKey);
    }

    // Function to resolve the public key of an address
    function resolvePublicKey(address account) external view returns (string memory) {
        return _publicKeys[account];
    }
}