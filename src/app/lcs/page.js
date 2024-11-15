"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";

export default function LCSPage() {
  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  const [result, setResult] = useState("");

  const lcs = (X, Y) => {
    const n = X.length;
    const m = Y.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (X[i - 1] === Y[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    // Backtrack to find the LCS
    let lcsStr = "";
    let i = n, j = m;
    while (i > 0 && j > 0) {
      if (X[i - 1] === Y[j - 1]) {
        lcsStr = X[i - 1] + lcsStr;
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
    return lcsStr;
  };

  const calculateLCS = () => {
    setResult(lcs(string1, string2));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">LCS Algorithm</h1>
        <input
          type="text"
          placeholder="Enter String 1"
          value={string1}
          onChange={(e) => setString1(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Enter String 2"
          value={string2}
          onChange={(e) => setString2(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          onClick={calculateLCS}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Calculate LCS
        </button>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Result:</h2>
          <p>{result || "Enter strings to see the result"}</p>
        </div>
      </div>
    </div>
  );
}
