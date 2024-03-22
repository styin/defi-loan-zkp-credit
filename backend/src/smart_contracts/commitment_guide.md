# Loan Commitment Contract

## Overview
The `LoanCommitmentContract` on Ethereum allows for the creation and confirmation of loan commitments between borrowers and lenders.

## Functions

- **createCommitment(lender, yi)**
  - **Arguments**:
    - `address lender`: Lender's Ethereum address.
    - `uint256 yi`: Loan amount.
  - **Returns**: `bytes32` identifier for the commitment.

- **confirmCommitment(identifier)**
  - **Arguments**:
    - `bytes32 identifier`: Commitment's unique identifier.

- **getYiValuesByBorrowerAndLender(borrower, lender)**
  - **Arguments**:
    - `address borrower`: Borrower's Ethereum address.
    - `address lender`: Lender's Ethereum address.
  - **Returns**: Array of loan amounts (`uint256[]`) associated with the borrower-lender pair.

- **getLendersByBorrower(borrower)**
  - **Arguments**:
    - `address borrower`: Borrower's Ethereum address.
  - **Returns**: Ordered list of lenders' addresses (`address[]`).

## Events

- `CommitmentCreated(borrower, lender, yi, identifier)`
- `CommitmentConfirmed(borrower, lender, yi, identifier)`

## Usage

```javascript
// Create a commitment
let commitmentId = await contract.createCommitment(lenderAddress, loanAmount);

// Confirm a commitment
await contract.confirmCommitment(commitmentId);

// Retrieve loan values for a borrower-lender pair
let loanYi = await contract.getYiValuesByBorrowerAndLender(borrowerAddress, lenderAddress);

// Get lenders for a borrower
let lendersList = await contract.getLendersByBorrower(borrowerAddress);
```