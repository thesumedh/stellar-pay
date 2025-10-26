export const isFreighterInstalled = async () => {
  if (typeof window === "undefined") return false;
  if (!window.freighterApi) return false;
  
  const result = await window.freighterApi.isConnected();
  return result.isConnected;
};

export const connectFreighter = async () => {
  if (typeof window === "undefined" || !window.freighterApi) {
    throw new Error("Freighter not installed. Please install it from https://www.freighter.app");
  }

  const result = await window.freighterApi.requestAccess();
  if (result.error) {
    throw new Error(result.error);
  }
  return result.address;
};

export const signTransaction = async (xdr, network = "TESTNET") => {
  if (typeof window === "undefined" || !window.freighterApi) {
    throw new Error("Freighter not installed.");
  }

  const result = await window.freighterApi.signTransaction(xdr, { network });
  if (result.error) {
    throw new Error(result.error);
  }
  return result.signedTxXdr;
};