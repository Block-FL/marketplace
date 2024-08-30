"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Wallet() {
  return (
    <div className="flex justify-end mr-4">
      <WalletMultiButton />
    </div>
  );
}

