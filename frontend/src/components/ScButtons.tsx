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
    <div>
      <div>
        <p>Current block number: {blockNumber}</p>
        <p>
          Chain ID of Connected Node:{" "}
          {chainId == 11155111
            ? chainId + " (ETH Sepolia)"
            : chainId + " verify selected chain"}
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmitCreateCmt}>
          <label>
            Lender Address:
            <input
              type="text"
              name="lenderAddress"
              value={formData.lenderAddress}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Yi:
            <input
              type="text"
              name="yi"
              value={formData.yi}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Create Commitment</button>
        </form>

        <form onSubmit={handleSubmitConfirmCmt}>
          <label>
            Identifier:
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Confirm Commitment</button>
        </form>

        <form onSubmit={handleSubmitGetYiValues}>
          <label>
            Borrower Address:
            <input
              type="text"
              name="borrowerAddress"
              value={formData.borrowerAddress}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Interested Indices (comma-separated):
            <input
              type="text"
              name="interestedIndices"
              value={formData.interestedIndices.join(",")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  interestedIndices: e.target.value.split(",").map(Number),
                })
              }
            />
          </label>
          <br />
          <button type="submit">Get Yi Values</button>
        </form>

        <form onSubmit={handleSubmitGetLenders}>
          <label>
            Borrower Address:
            <input
              type="text"
              name="borrowerAddress"
              value={formData.borrowerAddress}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Get Lenders</button>
        </form>
      </div>
    </div>
  );
};

export default ScButtons;
