import React, { useState } from "react";
import EncryptedMessageInterface from "../interfaces/encryptedMessageInterface";

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<EncryptedMessageInterface[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleFetch = () => {
    const public_key = prompt("Input your public key:");
    fetch(import.meta.env.VITE_BACKEND_HOST + "/api/get_messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_key }),
    })
      .then((response) => response.json())
      .then((data) => {
        const encryptedMessages: EncryptedMessageInterface[] =
          data as EncryptedMessageInterface[];
        setMessages(encryptedMessages);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
    <div>
      <div className="flex flex-col items-center justify-center px-12 mx-auto mt-24">
        {/* white card */}
        <div className="bg-white rounded-3xl shadow xl:p-10 overflow-x-auto">
          {/* top of the table */}
          <a className="font-GoogleSans font-bold flex items-center mb-6 text-2xl text-gray-900">
            Encrypted Inbox 📩
          </a>
          <button
            className="mb-4 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2"
            onClick={handleFetch}
          >
            fetch
          </button>
          <span className="ml-4 text-sm text-gray-500">
            Press on "fetch" to retrieve your messages. Note that if the sender opted for encrypted messaging, the messages are encrypted for your privacy.
          </span>
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
                <th
                  scope="col"
                  className="min-w-64 rounded-tl-xl px-6 py-3 bg-gray-100"
                >
                  Sender's Public Key
                </th>
                <th scope="col" className="w-screen px-6 py-3">
                  Encrypted Package
                </th>
              </tr>
            </thead>
            {/* table body */}
            <tbody>
              {messages.map((message, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <th
                    scope="row"
                    className="min-w-72 max-w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100"
                  >
                    <span>
                      {message.senderPK.length > 20
                        ? message.senderPK.substring(0, 20) + "..."
                        : message.senderPK}
                    </span>
                    <button
                      className="float-right"
                      onClick={() => handleCopyToClipboard(message.senderPK)}
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
                  <td className="w-screen px-6 py-4">
                    <button
                      className="float-left mr-4"
                      onClick={() =>
                        handleCopyToClipboard(message.encryptionPackage)
                      }
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
                    <span>
                      {message.encryptionPackage.length > 250
                        ? message.encryptionPackage.substring(0, 250) + "..."
                        : message.encryptionPackage}
                    </span>
                  </td>
                </tr>
              ))}
              {/* placeholders if no messages yet */}
              {messages.length === 0 && [
                <tr>
                  <td
                    className="px-6 py-4 text-gray-900 animate-pulse border-b"
                    colSpan={2}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full w-96"></div>
                    </div>
                  </td>
                </tr>,
                <tr>
                  <td
                    className="px-6 py-4 text-gray-900 animate-pulse border-b"
                    colSpan={2}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full w-56"></div>
                    </div>
                  </td>
                </tr>,
                <tr>
                  <td
                    className="px-6 py-4 text-gray-900 animate-pulse border-b"
                    colSpan={2}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full w-72"></div>
                    </div>
                  </td>
                </tr>,
                <tr>
                  <td
                    className="px-6 py-4 text-gray-900 animate-pulse border-b"
                    colSpan={2}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full w-48"></div>
                    </div>
                  </td>
                </tr>,
                <tr>
                  <td
                    className="px-6 py-4 text-gray-900 animate-pulse"
                    colSpan={2}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full w-72"></div>
                    </div>
                  </td>
                </tr>,
              ]}
              <tr className="border-t-2">
                <td className="px-10 py-[2px] rounded-bl-xl text-gray-100 bg-gray-100">
                  test
                </td>
                <td className="px-10 py-[2px] rounded-br-xl text-white">
                  test
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
