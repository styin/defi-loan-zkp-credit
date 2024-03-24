import React, { useContext } from 'react';

/* 
The AuthGuard component provides a wrapper around the Route components 
to check if the user is authenticated. If the user is not authenticated, 
the component redirects the user to the specified route. If the user is 
authenticated, the component renders the children prop.

To be used in the router.tsx file.
*/
import { AuthContext } from '../contexts/AuthContext';

interface AuthGuardProps {
	children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
	children,
}) => {
	console.log("AuthGuard Triggered");
	const {isAuthenticated} = useContext(AuthContext);
	console.log("isAuthenticated: ", isAuthenticated)
	return <>{isAuthenticated ? children : <h1>"Login required"</h1>}</>;
};
  
export default AuthGuard;
