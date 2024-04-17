import React, { useState } from "react";
import "../styles/RequestForm.css";
import { UseMetaMask } from "../hooks/MetaMaskContext";

const RequestForm: React.FC = () => {
  // Access the wallet address
  const { wallet } = UseMetaMask();

  const [formData, setFormData] = useState({
    amount: "",
    discountedAmount: "",
    duration: "",
    additionalNotes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.amount.trim() === "" ||
      formData.discountedAmount.trim() === "" ||
      formData.duration.trim() === ""
      // additional notes can be empty
    ) {
      window.alert("Please fill in all the required fields!");
      return;
    }

    const walletAddress = wallet.accounts[0]; // Assuming the first account is the active one
    fetch('http://localhost:5000/api/post_request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({walletAddress, ...formData}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            return response.json();
        })
        .then(data => {
            console.log('Form submitted successfully! Response:', data);
            window.alert('Form submitted successfully!');
            setFormData({
              amount: "",
              discountedAmount: "",
              duration: "",
              additionalNotes: "",
            });
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:hscreen lg:py-0">
      {/* Top of the form */}
      <a className="font-bold flex items-center mb-6 text-2xl text-gray-900">
        New request
      </a>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0"
      >
        <div className="flex flex-col gap-6 md:p-4">
          <label className="formlabel">
            <span className="block text-sm font-semibold leading-6 text-gray-600">
              <a className="text-red-600"> * </a> Loan amount
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g. ETH10.00 - this is the amount you will need to repay"
            />
          </label>
          <label className="formlabel">
            <span className="block text-sm font-semibold leading-6 text-gray-600">
            <a className="text-red-600"> * </a> Minimum discounted amount
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
              type="text"
              name="discountedAmount"
              value={formData.discountedAmount}
              onChange={handleChange}
              placeholder="e.g. ETH9.50 - this is the amount you will receive"
            />
          </label>
          <label className="formlabel">
            <span className="block text-sm font-semibold leading-6 text-gray-600">
            <a className="text-red-600"> * </a> Loan duration (in days)
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 30 - this is the amount of days until your repayment is due"
            />
          </label>
          <label className="formlabel">
            <span className="block text-sm font-semibold leading-6 text-gray-600">
              Additional notes
            </span>
            <textarea
              className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="write down anything you'd like~"
            />
          </label>
          <button
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 mt-10"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
