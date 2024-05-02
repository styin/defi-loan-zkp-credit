import React, { useEffect, useState } from "react";
import LoanRequestInterface from "../interfaces/loanRequestInterface";

const RequestList: React.FC = () => {
  const [requests, setRequests] = useState<LoanRequestInterface[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // fetch data from the backend
    fetch(import.meta.env.VITE_BACKEND_HOST + "/api/get_requests")
      .then((response) => response.json())
      .then((data) => {
        const loanRequests: LoanRequestInterface[] =
          data as LoanRequestInterface[];
        setRequests(loanRequests);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard:", text);
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center px-12 mx-auto mt-24">
      {/* white card */}
      <div className="bg-white rounded-3xl shadow xl:p-10 overflow-x-auto">
        {/* top of the table */}
        <a className="font-GoogleSans font-bold flex items-center mb-6 text-2xl text-gray-900">
          Public Loan Requests 🗒️
        </a>
        {copySuccess && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-xl bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Copied to clipboard!</span>
            </div>
          </div>
        )}
        {/* table */}
        <table className="text-xs text-left rtl:text-right">
          <thead className="max-h-1 text-sm text-gray-900 border-b-2 border-orange-700">
            <tr>
              <th scope="col" className="rounded-tl-xl px-6 py-3 bg-gray-100">
                Borrower Address
              </th>
              <th scope="col" className="px-6 py-3">
                Messaging Public Key
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-100">
                ✒️
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-100">
                Disc.Amt.
              </th>
              <th scope="col" className="px-6 py-3">
                Duration
              </th>
              <th scope="col" className="rounded-tr-xl px-6 py-3 bg-gray-100">
                Notes
              </th>
            </tr>
          </thead>
          {/* table body */}
          <tbody>
            {requests.map((request, index) => (
              <tr key={index} className="border-b border-gray-300">
                <th
                  scope="row"
                  className="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100"
                >
                  <span>
                    {request.walletAddress.length > 20
                      ? request.walletAddress.substring(0, 20) + "..."
                      : request.walletAddress}
                  </span>
                  <button
                    className="float-right"
                    onClick={() => handleCopyToClipboard(request.walletAddress)}
                  >
                    <span id="default-icon">
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="gray"
                        viewBox="0 0 18 20"
                      >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                      </svg>
                    </span>
                  </button>
                </th>
                <td className="w-72 px-6 py-4">
                  <span>
                    {request.rsaPK.length > 20
                      ? request.rsaPK.substring(0, 20) + "..."
                      : request.rsaPK}
                  </span>
                  <button
                    className="float-right"
                    onClick={() => handleCopyToClipboard(request.rsaPK)}
                  >
                    <span id="default-icon">
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="gray"
                        viewBox="0 0 18 20"
                      >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                      </svg>
                    </span>
                  </button>
                </td>
                <td className="px-6 py-4 bg-gray-100">
                  <button
                    className="ml-1"
                    onClick={() => handleCopyToClipboard(request.signedRSAPK)}
                  >
                    <span id="default-icon">
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="gray"
                        viewBox="0 0 18 20"
                      >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                      </svg>
                    </span>
                  </button>
                </td>
                <td className="w-64 px-6 py-4">{request.amount}</td>
                <td className="w-64 px-6 py-4 bg-gray-100">
                  {request.discountedAmount}
                </td>
                <td className="w-64 px-6 py-4">{request.duration}</td>
                <td className="w-screen px-6 py-4 bg-gray-100">
                  {request.additionalNotes}
                </td>
              </tr>
            ))}
            <tr className="border-t-2">
              <td className="px-10 py-[2px] rounded-bl-xl text-gray-100 bg-gray-100">
                .
              </td>
              <td className="px-10 py-[2px] text-white">.</td>
              <td className="px-10 py-[2px] text-gray-100 bg-gray-100">.</td>
              <td className="px-10 py-[2px] text-white">.</td>
              <td className="px-10 py-[2px] text-gray-100 bg-gray-100">.</td>
              <td className="px-10 py-[2px] text-white">.</td>
              <td className="px-10 py-[2px] rounded-br-xl text-gray-100 bg-gray-100">
                .
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestList;
