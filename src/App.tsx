/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import { useState, useEffect } from "react";
import { formatBalance, formatChainAsNum } from "./utils";
import detectEthereumProvider from "@metamask/detect-provider";

const App = () => {
    // destructuring assignment from useState hook to get the state and the function to update the state
    const [hasProvider, setHasProvider] = useState<boolean | null>(null);
    // initial state for the wallet
    const initialState = {
        accounts: [],
        balance: "",
        chainId: "",
    };
    // destructuring assignment from useState hook to get the state and the function to update the state
    const [wallet, setWallet] = useState(initialState);

    // status of the connection to MetaMask
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // this useEffect hook runs after the first render, since it has an empty dependency array
    useEffect(() => {
        // refresh the accounts
        const refreshAccounts = (accounts: any) => {
            if (accounts.length > 0) {
                updateWallet(accounts);
            } else {
                // if length 0, user is disconnected
                setWallet(initialState);
            }
        };

        // refresh the chain
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
    });

    // async function to update the wallet
    const updateWallet = async (accounts: any) => {
        // update the state with the new accounts and balance
        const balance = formatBalance(
            await window.ethereum.request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
            })
        );
        // update the state with the new chainId
        const chainId = await window.ethereum.request({
            method: "eth_chainId",
        });
        setWallet({ accounts, balance, chainId });
    };

    // async function to handle the connection while updating the state
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
            .catch((err: any) => {
                setError(true);
                setErrorMessage(err.message);
            });
        setIsConnecting(false);
    };

    const disableConnect = Boolean(wallet) && isConnecting;

    // JSX
    return (
        <div className="App">
            {/* conditional rendering */}
            <div>
                Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist
            </div>

            {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (                       
                <button disabled={disableConnect} onClick={handleConnect}>
                    Connect MetaMask
                </button>
            )}

            {wallet.accounts.length > 0 && (
                <>
                    <div>Wallet Accounts: {wallet.accounts[0]}</div>
                    <div>Wallet Balance: {wallet.balance}</div>
                    <div>Hex ChainId: {wallet.chainId}</div>
                    <div>
                        Numeric ChainId: {formatChainAsNum(wallet.chainId)}
                    </div>
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

// this allows the App component to be imported in other files
export default App;
