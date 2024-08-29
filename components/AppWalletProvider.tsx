import React, { useEffect, useMemo, useState } from "react";
import { 
  ConnectionProvider, 
  WalletProvider, 
  useWallet, 
  useConnection 
} from "@solana/wallet-adapter-react";
import { 
  WalletModalProvider, 
  WalletMultiButton 
} from "@solana/wallet-adapter-react-ui";
import { 
  PhantomWalletAdapter, 
  SolflareWalletAdapter,
  TrustWalletAdapter,
  MathWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

const AppWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const network = "mainnet-beta"; // or "devnet", "testnet"
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TrustWalletAdapter(),
      new MathWalletAdapter(),
    ],
    []
  );

  const { wallet, publicKey } = useWallet();
  const { connection } = useConnection();

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
          {!publicKey && (
            <div className="fixed bottom-5 right-5 z-50">
              <WalletMultiButton />
            </div>
          )}
          {publicKey && (
            <div className="fixed bottom-5 right-5 z-50">
              <p className="text-white bg-gray-800 p-2 rounded-md">
                Connected: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
              </p>
            </div>
          )}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default AppWalletProvider;
