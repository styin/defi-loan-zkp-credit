import React, { useState } from "react";
import "../styles/MessageForm.css";
import backendURL from "../backendURL";

const MessageForm: React.FC = () => {
    const [formData, setFormData] = useState({
        senderPK: '',
        receiverPK: '',
        encryptionPackage: '',
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
      formData.senderPK.trim() === "" ||
      formData.receiverPK.trim() === "" ||
      formData.encryptionPackage === ""
    ) {
      window.alert("Please fill in all the fields");
      return;
    }
    console.log(JSON.stringify(formData));
    fetch(backendURL + '/api/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),

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
                senderPK: '',
                receiverPK: '',
                encryptionPackage: '',
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
        New encrypted message
      </a>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0"
      >
        <div className="flex flex-col gap-6 md:p-4">
          <label className="formlabel">
            <span className="block text-sm font-semibold leading-6 text-gray-600">
              <a className="text-red-600"> * </a> Your public key
            </span>
            <input
              className="formInput block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="senderPK"
              value={formData.senderPK}
              onChange={handleChange}
              placeholder="Your RSA public key for messaging"
              required={true}
            />
          </label>
          <label className="formlabel">
            <span className="block text-sm font-semibold leading-6 text-gray-600">
              <a className="text-red-600"> * </a> Recipient's public key
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="receiverPK"
              value={formData.receiverPK}
              onChange={handleChange}
              placeholder="The recipient's RSA public key for messaging"
              required={true}
            />
          </label>
          <label className="formlabel">
            <span className="block text-sm font-semibold leading-6 text-gray-600">
              <a className="text-red-600"> * </a> Encryption Package
            </span>
            <input
              className="formInput flex-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="encryptionPackage"
              value={formData.encryptionPackage}
              onChange={handleChange}
              placeholder="Fill in the encryption package for your message here"
              required={true}
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

export default MessageForm;
