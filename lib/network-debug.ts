export async function debugFreighterNetwork() {
  if (typeof window === "undefined" || !(window as any).freighter) {
    console.log("❌ Freighter not available")
    return
  }

  try {
    const network = await (window as any).freighter.getNetwork()
    const networkDetails = await (window as any).freighter.getNetworkDetails()
    
    console.log("🔍 Freighter Network Debug:")
    console.log("Network:", network)
    console.log("Network Details:", networkDetails)
    console.log("Expected: TESTNET")
    console.log("Match:", network === "TESTNET" ? "✅" : "❌")
    
    return { network, networkDetails }
  } catch (error) {
    console.error("Failed to get network:", error)
  }
}