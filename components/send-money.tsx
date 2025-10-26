import { useState } from "react";
import * as StellarSdk from "stellar-sdk";
import { connectFreighter, sendPaymentWithFreighter } from "@/lib/freighter-utils";
import { toast } from "sonner";

const SendMoney = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setResult("");

    try {
      // Validate inputs
      if (!StellarSdk.StrKey.isValidEd25519PublicKey(recipient)) {
        throw new Error("Invalid recipient address.");
      }
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        throw new Error("Amount must be a positive number.");
      }

      // Send payment using Freighter
      const result = await sendPaymentWithFreighter(recipient, amount, "StellarPay Payment");
      
      setResult(`Transaction successful! Hash: ${result.hash}`);
      toast.success("Transaction submitted successfully!");
    } catch (error: any) {
      const errorMessage = error.message || "Unknown error occurred";
      setResult(`Transaction failed: ${errorMessage}`);
      toast.error(`Transaction failed: ${errorMessage}`);
      console.error("Detailed error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Send XLM</h1>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button 
        onClick={handleSubmit} 
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send"}
      </button>
      {result && <p className="text-sm">{result}</p>}
    </div>
  );
};

export default SendMoney;