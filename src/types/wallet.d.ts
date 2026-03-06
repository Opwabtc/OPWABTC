export {}
declare global {
  interface Window {
    opnet?: {
      getPublicKey(): Promise<string>;
      getMLDSAPublicKey(): Promise<string>;
      signMessage(msg: string): Promise<string>;
      sendBitcoin(to: string, amount: number): Promise<string>;
    }
    unisat?: {
      requestAccounts(): Promise<string[]>;
      getAccounts(): Promise<string[]>;
      getPublicKey(): Promise<string>;
      signMessage(msg: string, type?: string): Promise<string>;
      sendBitcoin(to: string, amount: number): Promise<string>;
    }
    BitcoinProvider?: { request(args: { method: string; params?: unknown[] }): Promise<unknown> }
    XverseProviders?: { BitcoinProvider?: { request(args: { method: string; params?: unknown[] }): Promise<unknown> } }
    okxwallet?: { bitcoin?: { requestAccounts(): Promise<string[]>; getPublicKey(): Promise<string> } }
  }
}
