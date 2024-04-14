import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { MetaMaskContextProvider } from './hooks/MetaMaskContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MetaMaskContextProvider>
            <App />
        </MetaMaskContextProvider>
    </React.StrictMode>,
)
