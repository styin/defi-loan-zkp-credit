// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LoanCommitmentContract {

    struct Commitment {
        uint256 yi; // The commitment value
        bool lenderConfirmed; // Whether the lender has confirmed the commitment
        address lender; // The lender's address
        address borrower; // The borrower's address
    }

    // Mapping from a commitment identifier to the Commitment details
    mapping(bytes32 => Commitment) public commitments;

    // Mapping to store all commitment identifiers for each borrower-lender pair
    mapping(address => mapping(address => bytes32[])) private commitmentIdentifiers;

    // Mapping to store the ordered list of lenders for each borrower
    mapping(address => address[]) private borrowerToLenders;

    // Mapping to store all commitment identifiers for each borrower
    mapping(address => bytes32[]) private borrowerCommitmentIdentifiers;

    // Counter to help generate unique identifiers
    uint256 private nonce;

    // Event emitted when a commitment is created
    event CommitmentCreated(address indexed borrower, address indexed lender, uint256 yi, bytes32 identifier);

    // Event emitted when a commitment is confirmed by the lender
    event CommitmentConfirmed(address indexed borrower, address indexed lender, uint256 yi, bytes32 identifier);

    // Borrower creates a commitment to a lender
    function createCommitment(address lender, uint256 yi) public returns (bytes32) {
        // Generate an identifier based on addresses and nonce
        bytes32 identifier = keccak256(abi.encodePacked(msg.sender, lender, nonce));
        
        // Increment the nonce for the next identifier to be unique
        nonce++;

        // Ensure the commitment does not already exist
        require(commitments[identifier].yi == 0, "Commitment already exists");

        // Store the commitment
        commitments[identifier] = Commitment({
            yi: yi,
            lenderConfirmed: false,
            lender: lender,
            borrower: msg.sender
        });

        // Add the identifier to the borrower-lender pair
        commitmentIdentifiers[msg.sender][lender].push(identifier);

        // Add the lender to the ordered list for this borrower
        borrowerToLenders[msg.sender].push(lender);

        emit CommitmentCreated(msg.sender, lender, yi, identifier);


        borrowerCommitmentIdentifiers[msg.sender].push(identifier);

        // Return the identifier for the caller to know
        return identifier;
    }

    // Lender confirms the commitment
    function confirmCommitment(bytes32 identifier) public {
        Commitment storage commitment = commitments[identifier];

        // Check that the commitment exists
        require(commitment.yi != 0, "Commitment does not exist");
        // Check that the sender is the correct lender
        require(msg.sender == commitment.lender, "Sender is not the lender");
        // Check that the commitment has not already been confirmed
        require(!commitment.lenderConfirmed, "Commitment already confirmed");

        commitment.lenderConfirmed = true;

        emit CommitmentConfirmed(commitment.borrower, msg.sender, commitment.yi, identifier);
    }

    function getYiValuesByBorrowerAndIndices(address borrower, uint256[] memory indices) public view returns (uint256[] memory) {
            require(indices.length > 0, "Indices array cannot be empty");

            bytes32[] memory identifiers = borrowerCommitmentIdentifiers[borrower];
            uint256[] memory yiValues = new uint256[](indices.length);

            for (uint256 i = 0; i < indices.length; i++) {
                uint256 index = indices[i];
                require(index < identifiers.length, "Invalid index");

                Commitment storage commitment = commitments[identifiers[index]];
                yiValues[i] = commitment.yi;
            }

            return yiValues;
    }

    // Retrieve an ordered list of lenders for a given borrower
    function getLendersByBorrower(address borrower) public view returns (address[] memory) {
        return borrowerToLenders[borrower];
    }
}