// The @btc-vision/walletconnect library manages window detection internally.
// This file only documents what the SDK exposes for reference.

declare global {
  interface Window {
    opwallet?: unknown;   // OPWallet extension (detected by SDK)
    xverse?:   unknown;   // Xverse extension (detected by SDK)
  }
}

export {};
