import React, { useEffect, useState } from "react";
import { Web3 } from "web3";

import { UseMetaMask } from "../hooks/MetaMaskContext";
import ABI from "../contracts/LoanCommitmentsContractABI.json";

const ScButtons: React.FC = () => {
  // MetaMask Context
  const { wallet, hasProvider } = UseMetaMask();
  const walletAddress = wallet.accounts[0];

  // Instantiate Web3 from MetaMask provider
  if (!hasProvider) {
    console.log("No provider");
  }
  const web3 = new Web3(window.ethereum);

  // Node Details
  const [chainId, setChainId] = useState(0);
  const [blockNumber, setBlockNumber] = useState(0);

  // Contract Details
  const contractAddress = import.meta.env.VITE_SEPOLIA_CONTRACT_ADDRESS;
  const contractABI = ABI;
  const sc = new web3.eth.Contract(contractABI, contractAddress);

  // On render, get chain ID and block number
  useEffect(() => {
    async function getChainID() {
      await web3.eth
        .getChainId()
        .then((chainID) => {
          setChainId(Number(chainID));
        })
        .catch((error) => {
          console.log(error);
          setChainId(-1);
        });
    }
    getChainID();

    async function getBlockNumber() {
      await web3.eth
        .getBlockNumber()
        .then((blockNumber) => {
          setBlockNumber(Number(blockNumber));
        })
        .catch((error) => {
          console.log(error);
          setBlockNumber(-1);
        });
    }
    getBlockNumber();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [commitmentIdentifier, setCommitmentIdentifier] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [retrievalData, setRetrievalData] = useState("");
  const [scInteractionMessage, setScInteractionMessage] = useState("");

  // Contract Functions
  function sc_CreateCommitment(lenderAddress: string, yi: string) {
    sc.methods
      .createCommitment(
        lenderAddress,
        yi
      )
      .send({ from: walletAddress })
      .on("receipt", (receipt) => {
        // Print receipt to console
        console.log(receipt);

        // Handle transaction hash
        const transactionHash: unknown | undefined = receipt?.transactionHash;
        if (transactionHash) {
          const parsedTransactionHash: string = String(transactionHash);
          console.log("tx_hash: " + transactionHash);
          setTransactionHash(parsedTransactionHash);
        } else {
          console.error("[SC Create Commitment] Transaction hash not found");
        }

        // Handle contract identifier
        const commitmentIdentifier: unknown | undefined = receipt?.events?.CommitmentCreated?.returnValues?.identifier;
        if (commitmentIdentifier) {
          const parsedContractIdentifier: string = String(commitmentIdentifier);
          console.log("contract identifier: " + commitmentIdentifier);
          setCommitmentIdentifier(parsedContractIdentifier);
          setScInteractionMessage("✅ Commitment created successfully");
        } else {
          console.error("[SC Create Commitment] Contract identifier not found");
        }
      })
      .on("error", (error) => {
        console.log("[SC Create Commitment] Error: " + error);
      });
  }

  function sc_ConfirmCommitment(identifier: string) {
    sc.methods
      .confirmCommitment(
        identifier
      )
      .send({ from: walletAddress })
      .on("receipt", (receipt) => {
        // Print receipt to console
        console.log(receipt);

        // Handle transaction hash
        const transactionHash: unknown | undefined = receipt?.transactionHash;
        if (transactionHash) {
          const parsedTransactionHash: string = String(transactionHash);
          console.log("tx_hash: " + transactionHash);
          setTransactionHash(parsedTransactionHash);
          setScInteractionMessage("✅ Commitment confirmed successfully");
        } else {
          console.error("[SC Confirm Commitment] Transaction hash not found");
        }

        // Handle contract identifier
        console.log("contract identifier: " + identifier)
        setCommitmentIdentifier(identifier);
      })
      .on("error", (error) => {
        console.log("[SC Confirm Commitment] Error: " + error);
      });
  }

  function sc_getYiValuesByBorrowerAndIndices(borrowerAddress: string, indices: number[]) {
    sc.methods
      .getYiValuesByBorrowerAndIndices(
        borrowerAddress,
        indices
      )
      .call({ from: walletAddress })
      .then((result) => {
        console.log(result);
        const parsedResult : string = JSON.stringify(String(result), null, 2);
        setRetrievalData(parsedResult);
        setScInteractionMessage("✅ Yi values retrieved successfully");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function sc_getLendersByBorrower(borrowerAddress: string) {
    sc.methods
      .getLendersByBorrower(
        borrowerAddress
      )
      .call({ from: walletAddress })
      .then((result) => {
        console.log(result);
        const parsedResult = JSON.stringify(result, null, 2);
        setRetrievalData(parsedResult);
        setScInteractionMessage("✅ Lenders retrieved successfully");
      })
      .catch((error) => {
        console.log(error);
      })
  }


  // Form Data
  interface FormData {
    lenderAddress: string;
    yi: string;
    identifier: string;
    borrowerAddress: string;
    interestedIndices: number[];
  }

  const [formData, setFormData] = useState<FormData>({
    lenderAddress: "",
    yi: "",
    identifier: "",
    borrowerAddress: "",
    interestedIndices: [],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCopyToClipboard = (text : string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log("Text copied to clipboard:", text);
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  const handleSubmitCreateCmt = (e: React.FormEvent) => {
    e.preventDefault();
    setTransactionHash("");
    setCommitmentIdentifier("");
    setRetrievalData("");
    setScInteractionMessage("");
    sc_CreateCommitment(formData.lenderAddress, formData.yi);
  };

  const handleSubmitConfirmCmt = (e: React.FormEvent) => {
    e.preventDefault();
    setTransactionHash("");
    setCommitmentIdentifier("");
    setRetrievalData("");
    setScInteractionMessage("");
    sc_ConfirmCommitment(formData.identifier);
  };

  const handleSubmitGetYiValues = (e: React.FormEvent) => {
    e.preventDefault();
    setTransactionHash("");
    setCommitmentIdentifier("");
    setRetrievalData("");
    setScInteractionMessage("");
    sc_getYiValuesByBorrowerAndIndices(
      formData.borrowerAddress,
      formData.interestedIndices
    );
  };

  const handleSubmitGetLenders = (e: React.FormEvent) => {
    e.preventDefault();
    setTransactionHash("");
    setCommitmentIdentifier("");
    setRetrievalData("");
    setScInteractionMessage("");
    sc_getLendersByBorrower(formData.borrowerAddress);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-24 lg:py-0 gap-10">
      {/* Top of the form */}
      <a className="font-bold flex items-center text-2xl text-gray-900">
        Smart Contract Interaction
      </a>

      {/* Information section */}
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0">
        <div className="flex flex-col gap-6 md:p-4">

          {/* Display Chain ID */}
          <label>
            <span className="block text-sm font-semibold leading-6 text-gray-600">
              Chain ID
            </span>
            <span className="text-sm font-semibold leading-6 text-gray-900">
              {chainId == 11155111? "✅" + chainId + " (Connected to ETH Sepolia)" : chainId}
            </span>
          </label>
          {/* Display latest block number */}
          <label>
            <span className="block text-sm font-semibold leading-6 text-gray-600">
              Latest Block Number
            </span>
            <span className="text-sm font-semibold leading-6 text-gray-900">
              {"🕔" + blockNumber}
            </span>
          </label>
          {/* conditional rendering: Tx_hash is available */}
          {transactionHash && (
            <label>
              <span className="block text-sm font-semibold leading-6 text-gray-600">
                Tx Hash
              </span>
              <div className="flex flex-row">
                <a
                  href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-500"
                >
                  {transactionHash}
                </a>
                <button
                  data-copy-to-clipboard-target="npm-install-copy-button"
                  data-tooltip-target="tooltip-copy-npm-install-copy-button"
                  className="flex-1 md:ml-2"
                  onClick={() => handleCopyToClipboard(transactionHash)}
                >
                  <span id="default-icon">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </label>
          )}

          {/* conditional rendering: Commitment Identifier is available */}
          {commitmentIdentifier && (
            <label>
              <span className="block text-sm font-semibold leading-6 text-gray-600">
                Commitment Identifier
              </span>
              <div className="flex flex-row">
                <span className="text-sm font-semibold leading-6 text-gray-900">
                  {commitmentIdentifier}
                </span>
                <button
                  data-copy-to-clipboard-target="npm-install-copy-button"
                  data-tooltip-target="tooltip-copy-npm-install-copy-button"
                  className="flex-1 md:ml-2"
                  onClick={() => handleCopyToClipboard(commitmentIdentifier)}
                >
                  <span id="default-icon">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </label>
          )}

          {/* conditional rendering: Retrieval Data is available */}
          {retrievalData && (
            <label>
              <span className="block text-sm font-semibold leading-6 text-gray-600">
                Lenders / Yi Values
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-900">
                {retrievalData}
              </span>
            </label>
          )}

          {/* conditional rendering: Interaction Message is available */}
          {scInteractionMessage && (
            <label>
              <span className="text-sm font-semibold leading-6 text-gray-900">
                {scInteractionMessage}
              </span>
            </label>
          )}
        </div>
      </div>

      {/* Create Commitment */}
      <form
        onSubmit={handleSubmitCreateCmt}
        className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0"
      >
        <div className="flex flex-col gap-6 md:p-4">
          {/* Lender Wallet Address */}
          <label>
            <span className="block text-sm font-semibold leading-6 text-gray-600">
              <a className="text-red-600"> * </a> Lender Wallet Address:
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
              type="text"
              name="lenderAddress"
              value={formData.lenderAddress}
              onChange={handleChange}
              placeholder="e.g 0xAbcdefg1234567 - this is the lender's wallet address confirming the commitment"
              required={true}
            />
          </label>
          {/* Yi */}
          <label>
            <span className="block text-sm font-semibold leading-6 text-gray-600">
              <a className="text-red-600"> * </a> Encrypted Loan Amount:
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
              type="text"
              name="yi"
              value={formData.yi}
              onChange={handleChange}
              placeholder="e.g. 3125 - This is the locally encrypted loan amount to be committed"
              required={true}
            />
          </label>
          {/* Submit Button */}
          <button
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Create Commitment
          </button>
        </div>
      </form>

      {/* Confirm Commitment */}
      <form
        onSubmit={handleSubmitConfirmCmt}
        className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0"
      >
        <div className="flex flex-col gap-6 md:p-4">
          {/* Identifier */}
          <label>
            <span className="block text-sm font-semibold leading-6 text-gray-600">
              <a className="text-red-600"> * </a> Commitment Identifier:
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="e.g 0xAbcdefg1234567 - this is the identifier of the commitment"
              required={true}
            />
          </label>
          {/* Submit Button */}
          <button
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Confirm Commitment
          </button>
        </div>
      </form>

      {/* Get Yi Values */}
      <form
        onSubmit={handleSubmitGetYiValues}
        className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0"
      >
        <div className="flex flex-col gap-6 md:p-4">
          {/* Borrower Wallet Address */}
          <label>
            <span className="block text-sm font-semibold leading-6 text-gray-600">
              <a className="text-red-600"> * </a> Borrower Wallet Address:
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
              type="text"
              name="borrowerAddress"
              value={formData.borrowerAddress}
              onChange={handleChange}
              placeholder="e.g 0xAbcdefg1234567 - this is the borrower's wallet address"
              required={true}
            />
          </label>
          {/* Interested Indices */}
          <label>
            <span className="block text-sm font-semibold leading-6 text-gray-600">
              <a className="text-red-600"> * </a> Interested Indices:
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
              type="text"
              name="interestedIndices"
              value={formData.interestedIndices.join(",")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  interestedIndices: e.target.value.split(",").map(Number),
                })
              }
              placeholder="e.g 0,1,2 - this is the indices of the interested parties"
              required={true}
            />
          </label>
          {/* Submit Button */}
          <button
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Get Yi Values
          </button>
        </div>
      </form>

      {/* Get Lenders */}
      <form
        onSubmit={handleSubmitGetLenders}
        className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0"
      >
        <div className="flex flex-col gap-6 md:p-4">
          {/* Borrower Wallet Address */}
          <label>
            <span className="block text-sm font-semibold leading-6 text-gray-600">
              <a className="text-red-600"> * </a> Borrower Wallet Address:
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
              type="text"
              name="borrowerAddress"
              value={formData.borrowerAddress}
              onChange={handleChange}
              placeholder="e.g 0xAbcdefg1234567 - this is the borrower's wallet address"
              required={true}
            />
          </label>
          {/* Submit Button */}
          <button
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Get Lenders
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScButtons;
