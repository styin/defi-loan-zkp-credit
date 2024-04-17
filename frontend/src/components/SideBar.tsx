import ZeroLoanLogo from "../assets/icons/zeroloan.png";
import { UseMetaMask } from "../hooks/MetaMaskContext";

import { formatAddress } from "../utils";

const SideBar = () => {
  const { wallet, hasProvider } = UseMetaMask();

  return (
    <div className="w-64 left-0 top-0 h-screen flex flex-col justify-between border-e bg-white">
      <div className="sticky px-4 py-6 gap-6 top-0">
        {/* Top part of the Sidebar */}
        <div className="flex items-center justify-center gap-4">
          <img src={ZeroLoanLogo} alt="" className="w-10 h-10" />
          <span className="font-GoogleSans font-bold">ZeroLoan</span>
        </div>

        {/* Navigation */}
        <ul className="space-y-1 font-GoogleSans mt-6">
          {/* Dashboard Section */}
          <li>
            <a
              href="/dashboard"
              className="block rounded-lg hover:bg-gray-100 hover:text-gray-700 px-4 py-2 text-sm font-medium text-gray-500"
            >
              Dashboard
            </a>
          </li>

          {/* Loan Request Section */}
          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Loan Requests </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <a
                    href="/requests/post"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Post New Request
                  </a>
                </li>

                <li>
                  <a
                    href="/requests/list"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Public Requests
                  </a>
                </li>
              </ul>
            </details>
          </li>

          {/* Inbox Section */}
          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Inbox </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <a
                    href="/message/send"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Send Message
                  </a>
                </li>

                <li>
                  <a
                    href="/message/fetch"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Fetch Messages
                  </a>
                </li>
              </ul>
            </details>
          </li>
          
          {/* Encryption Section */}
          <li>
            <a
              href="/encryption"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Encryption
            </a>
          </li>

          {/* Notices Section */}
          <li>
            <a
              href="/placeholder"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Notices
            </a>
          </li>

          {/* Account Section */}
          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Account </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <a
                    href="/login"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Login
                  </a>
                </li>

                <li>
                  <a
                    href="/placeholder"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Security
                  </a>
                </li>

                <li>
                  <form action="#">
                    <button
                      type="submit"
                      className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                    >
                      Logout
                    </button>
                  </form>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      {/* Bottom part of the Sidebar */}
      {hasProvider && wallet.accounts.length > 0 && (
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a
            href={`https://etherscan.io/address/${wallet.accounts[0]}`}
            target="_blank"
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
          >
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <p className="text-xs">
                <strong className="block font-medium">MetaMask Wallet</strong>

                <span> {formatAddress(wallet.accounts[0])} </span>
              </p>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default SideBar;
