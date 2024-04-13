import React, { useState } from "react";
import "../styles/RequestForm.css";

const RequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    publicKey: "",
    amount: "",
    highestRate: "",
    duration: "",
    additionalInfo: "",
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
      formData.publicKey.trim() === "" ||
      formData.amount.trim() === "" ||
      formData.highestRate.trim() === "" ||
      formData.duration.trim() === "" ||
      formData.additionalInfo.trim() === ""
    ) {
      window.alert("Please fill in all the fields");
      return;
    }
    console.log(formData);
    window.alert("Form submitted successfully!");
    setFormData({
      publicKey: "",
      amount: "",
      highestRate: "",
      duration: "",
      additionalInfo: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:hscreen lg:py-0">
      {/* Top of the form */}
      <a className="font-GoogleSans font-bold flex items-center mb-6 text-2xl text-gray-900">
        New request
      </a>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0"
      >
        <div className="flex flex-col gap-6 md:p-4">
          <label className="formlabel">
            <span className="font-semibold block mb-1 text-sm text-orange-600 dark:text-white">
              message public key
            </span>
            <input
              className="formInput block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="publicKey"
              value={formData.publicKey}
              onChange={handleChange}
            />
          </label>
          <label className="formlabel">
            <span className="font-semibold block mb-1 text-sm text-orange-600 dark:text-white">
              amount
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
          <label className="formlabel">
            <span className="font-semibold block mb-1 text-sm text-orange-600 dark:text-white">
              maximum rate
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="highestRate"
              value={formData.highestRate}
              onChange={handleChange}
            />
          </label>
          <label className="formlabel">
            <span className="font-semibold block mb-1 text-sm text-orange-600 dark:text-white">
              duration
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </label>
          <label className="formlabel">
            <span className="font-semibold block mb-1 text-sm text-orange-600 dark:text-white">
              additional notes
            </span>
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
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
