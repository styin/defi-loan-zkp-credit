import React, { useContext, useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

// Import the AuthContext for authentication state
import { AuthContext } from '../contexts/AuthContext';

// Import utility functions
import { formatBalance, formatChainAsNum } from '../utils';
import NavBar from '../components/NavBar';

const Login: React.FC = () => {
    // The AuthContext provides the setIsAuthenticated state to the Login component.
    const { setIsAuthenticated } = useContext(AuthContext);

    // blank state for the wallet
    const initialState = {
        accounts: [],
        balance: "",
        chainId: "",
    };
    // state of the wallet
    const [wallet, setWallet] = useState(initialState);
    // state of the provider
    const [hasProvider, setHasProvider] = useState<boolean | null>(null);
    // state of the connection to MetaMask
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // async function to update the wallet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateWallet = async (accounts: any) => {
        const balance = formatBalance(
            await window.ethereum.request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
            })
        );
        const chainId = await window.ethereum.request({
            method: "eth_chainId" 
        });
        setWallet({ accounts, balance, chainId });
    };

    // async function to connect to MetaMask
    const handleConnect = async () => {
        setIsConnecting(true);
        await window.ethereum
            .request({
                method: "eth_requestAccounts",
            })
            .then((accounts: []) => {
                setError(false);
                updateWallet(accounts);
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((err: any) => {
                setError(true);
                setErrorMessage(err.message);
            });
        setIsConnecting(false);
    };

    useEffect(() => {
        // refresh the accounts
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const refreshAccounts = (accounts: any) => {
            if (accounts.length > 0) {
                updateWallet(accounts);
                setIsAuthenticated(true);
                console.log("[AUTH] user is authenticated")
            } else {
                // if length 0, user is disconnected
                setWallet(initialState);
                setIsAuthenticated(false);
                console.log("[AUTH] user is not authenticated")
            }
        }

        // refresh the chain
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const refreshChain = (chainId: any) => {
            setWallet((wallet) => ({ ...wallet, chainId }));
        } 
        
        // async function to get the provider
        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true });
            setHasProvider(Boolean(provider));
            // if provider exists, get the accounts
            if (provider) {
                const accounts = await window.ethereum.request(
                    { method: "eth_accounts" }
                );

                refreshAccounts(accounts);
                window.ethereum.on("accountsChanged", refreshAccounts);
                window.ethereum.on("chainChanged", refreshChain);
            }
        };
        getProvider();
        
        // remove the event listener when the component unmounts
        return () => {
            window.ethereum?.removeListener("accountsChanged", refreshAccounts);
            window.ethereum?.removeListener("chainChanged", refreshChain);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const disableConnect = Boolean(wallet) && isConnecting;

    return (
        <div className="App">
            <NavBar />
            {/* conditional rendering */}
            <div>
                Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist
            </div>

            {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (                       
                <button disabled={disableConnect} onClick={handleConnect}>
                    Connect with MetaMask
                </button>
            )}

            {wallet.accounts.length > 0 && (
                <>
                    <div>Wallet Accounts: {wallet.accounts[0]}</div>
                    <div>Wallet Balance: {wallet.balance}</div>
                    <div>Hex ChainId: {wallet.chainId}</div>
                    <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
                </>
            )}
            {error && (
                <div onClick={() => setError(false)}>
                    <strong>Error:</strong> {errorMessage}
                </div>
            )}
        </div>
    );
};

export default Login;
