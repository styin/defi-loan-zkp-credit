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

  // Contract Functions
  function sc_CreateCommitment(lenderAddress: string, yi: string) {
    sc.methods
      .createCommitment(
        lenderAddress,
        yi
      )
      .send({ from: walletAddress })
      .on("transactionHash", (hash) => {
        console.log("tx hash: ", hash);
      })
      .on("receipt", (receipt) => {
        // TODO: handle retrieved identifier
        console.log(
          receipt?.events?.CommitmentCreated?.returnValues?.identifier
        );
      })
      .on("error", (error) => {
        console.log(error);
      });
  }

  function sc_ConfirmCommitment(identifier: string) {
    sc.methods
      .confirmCommitment(
        identifier
      )
      .send({ from: walletAddress })
      .on("transactionHash", (hash) => {
        console.log("tx hash: ", hash);
      })
      .on("receipt", (receipt) => {
        console.log(receipt);
      })
      .on("error", (error) => {
        console.log(error);
      })
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

  const handleSubmitCreateCmt = (e: React.FormEvent) => {
    e.preventDefault();
    sc_CreateCommitment(formData.lenderAddress, formData.yi);
  };

  const handleSubmitConfirmCmt = (e: React.FormEvent) => {
    e.preventDefault();
    sc_ConfirmCommitment(formData.identifier);
  };

  const handleSubmitGetYiValues = (e: React.FormEvent) => {
    e.preventDefault();
    sc_getYiValuesByBorrowerAndIndices(
      formData.borrowerAddress,
      formData.interestedIndices
    );
  };

  const handleSubmitGetLenders = (e: React.FormEvent) => {
    e.preventDefault();
    sc_getLendersByBorrower(formData.borrowerAddress);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:hscreen lg:py-0 gap-10">
      {/* Top of the form */}
      <a className="font-bold flex items-center mb-6 text-2xl text-gray-900">
        Smart Contract Interaction
      </a>

      {/* Display Chain ID and Block Number */}
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold leading-6 text-gray-600">
              Chain ID:
            </span>
            <span className="text-sm font-semibold leading-6 text-gray-900">
              {chainId == 11155111? chainId + " (Connected to ETH Sepolia)" : chainId}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold leading-6 text-gray-600">
              Latest Block Number:
            </span>
            <span className="text-sm font-semibold leading-6 text-gray-900">
              {blockNumber}
            </span>
          </div>
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
              <a className="text-red-600"> * </a> Yi:
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
              type="text"
              name="yi"
              value={formData.yi}
              onChange={handleChange}
              placeholder="~"
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
              name="borrowerAdress"
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
              name="borrowerAdress"
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
