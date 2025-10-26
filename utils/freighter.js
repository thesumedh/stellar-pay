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

  // Verify Freighter is on correct network
  const currentNetwork = await window.freighterApi.getNetwork();
  if (currentNetwork.network !== network) {
    throw new Error(`Please switch Freighter to ${network} in wallet settings`);
  }

  const result = await window.freighterApi.signTransaction(xdr, { network });
  if (result.error) {
    throw new Error(result.error);
  }
  return result.signedTxXdr;
};