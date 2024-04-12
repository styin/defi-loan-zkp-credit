import React from 'react';

/* 
The AuthGuard component provides a wrapper around the Route components 
to check if the user is authenticated. If the user is not authenticated, 
the component redirects the user to the specified route. If the user is 
authenticated, the component renders the children prop.

To be used in the router.tsx file.
*/
import { UseMetaMask } from '../hooks/MetaMaskContext';

interface AuthGuardProps {
	children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
	children,
}) => {
	const { wallet, hasProvider } = UseMetaMask();
	console.log("AuthGuard Triggered");
	return <>{(hasProvider && wallet.accounts.length > 0) ? children : <h1>"Login required"</h1>}</>;
};
  
export default AuthGuard;
