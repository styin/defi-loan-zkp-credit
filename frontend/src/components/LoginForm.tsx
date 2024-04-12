import metamask_logo from '../assets/icons/metamask.png';

const LoginForm: React.FC = () => {
  return(
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
        <a className="font-GoogleSans font-bold flex items-center mb-6 text-2xl text-gray-900 dark:text-white">
          <img src={metamask_logo} alt="Metamask" className="w-10 h-10 mr-2" />
          ZeroLoan x MetaMask
        </a>
        
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in using your wallet 🚀
            </h1>
            <p className="text-sm font-light text-gray-600 dark:text-gray-400">
              Connect with your MetaMask wallet to get started.
            </p>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Connect with MetaMask
              </span>
            </button>          
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have a wallet yet? <a href="https://metamask.io/" className="font-medium text-orange-700 hover:underline">Sign up at MetaMask</a>
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default LoginForm;
