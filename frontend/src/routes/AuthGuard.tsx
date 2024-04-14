import React from 'react';

/* 
The AuthGuard component provides a wrapper around the Route components 
to check if the user is authenticated. If the user is not authenticated, 
the component redirects the user to the specified route. If the user is 
authenticated, the component renders the children prop.

To be used in the router.tsx file.
*/
import { UseMetaMask } from '../hooks/MetaMaskContext';
import SideBar from '../components/SideBar';

interface AuthGuardProps {
	children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
	children,
}) => {
	const { wallet, hasProvider } = UseMetaMask();
	console.warn("AuthGuard Triggered");
	return <>{(hasProvider && wallet.accounts.length > 0) ? children : 
    <div className='flex flex-row'>
      <aside>
        <SideBar/>
      </aside>
  
      <section className='flex-1 bg-gray-50'>
        <div className='flex flex-col items-center justify-center mx-auto md:h-screen'>
          <div className="font-GoogleSans font-bold text-gray-900 mb-2 text-2xl">
            You are not signed in ❌
          </div>
          <div className="text-sm w-full bg-white rounded-lg shadow dark:border sm:max-w-md">
            <div>
                Provider: {hasProvider ? "Installed ✔️" : "Not Installed ❌"}
            </div>
            <div>
                Wallet: {wallet.accounts.length > 0 ? "Connected ✔️" : "Not Connected ❌"}
            </div>    
          </div>  
        </div>
      </section>
    </div>
  }</>;
};
  
export default AuthGuard;
