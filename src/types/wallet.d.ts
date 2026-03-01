export {}
declare global {
  interface Window {
    opnet?: any
    unisat?: any
    BitcoinProvider?: any
    XverseProviders?: { BitcoinProvider?: any }
    okxwallet?: { bitcoin?: any }
  }
}
