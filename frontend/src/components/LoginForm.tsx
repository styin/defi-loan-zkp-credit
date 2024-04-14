import metamask_logo from '../assets/icons/metamask.png';
import { UseMetaMask } from '../hooks/MetaMaskContext';

import { formatAddress } from '../utils';

const LoginForm: React.FC = () => {

  // This is a global hook that we created to interact with MetaMask
  const { wallet, hasProvider, isConnecting, connectMetaMask } =
  UseMetaMask();

  return(
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
        {/* Top of the Login Form */}
        <a className="font-GoogleSans font-bold flex items-center mb-6 text-2xl text-gray-900">
          <img src={metamask_logo} alt="Metamask" className="w-10 h-10 mr-2" />
          ZeroLoan x MetaMask
        </a>
        
        {/* If the user is connected, show the wallet information */}
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* conditional rendering: MetaMask is not installed */}
            {!hasProvider && (
              [
                <h1 className="font-GoogleSans text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in using your wallet~
                </h1>,
                <p className="text-sm font-light text-gray-600">
                  Ohh no... ZeroLoan requires you to have the MetaMask Browser extension installed⚡
                </p>,
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200"
                  onClick={() => window.open("https://metamask.io/download/", "_blank")}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                  Install MetaMask
                  </span>
                </button>,
                <p className="text-sm font-light text-gray-500">
                  Don’t have a wallet yet? <a href="https://metamask.io/" className="font-medium text-orange-700 hover:underline">Sign up at MetaMask</a>
                </p>
              ]
            )}
            {/* conditional rendering: MetaMask is installed; User is not connected */}
            {window.ethereum?.isMetaMask &&
              wallet.accounts.length < 1 && (
                [
                  <h1 className="font-GoogleSans text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Sign in using your wallet~
                  </h1>,
                  <p className="text-sm font-light text-gray-600">
                    Connect with your MetaMask wallet to get started 🚀
                  </p>,
                  <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    disabled={isConnecting}
                    onClick={connectMetaMask}
                  >
                    Connect to MetaMask
                  </button>,
                  <p className="text-sm font-light text-gray-500">
                    Don’t have a wallet yet? <a href="https://metamask.io/" className="font-medium text-orange-700 hover:underline">Sign up at MetaMask</a>
                  </p>
                ]
            )}
            {/* conditional rendering: User is connected */}
            {hasProvider && wallet.accounts.length > 0 && (
              [
                <h1 className="font-GoogleSans text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  ✅ You are connected!
                </h1>,
                <p className="text-sm font-light text-gray-600">
                  You are signed in as:
                </p>,
                <div className="rounded-md bg-gray-200">
                  <a
                    className="text_link tooltip-bottom px-4 py-2 font-bold"
                    href={`https://etherscan.io/address/${wallet.accounts[0]}`}
                    target="_blank"
                    data-tooltip="Open in Block Explorer"
                  >
                    {formatAddress(wallet.accounts[0])}
                  </a>
                </div>
              ]
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default LoginForm;
