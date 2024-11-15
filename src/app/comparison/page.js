"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";



export default function ComparisonPage() {
  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  const [lcsResult, setLcsResult] = useState({ lcs: "", diff: [], tableSteps: [] });
  const [myersResult, setMyersResult] = useState({ steps: [], tableSteps: [] });

  // Compute LCS (Longest Common Subsequence)
  const computeLCS = (X, Y) => {
    const n = X.length;
    const m = Y.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    const tableSteps = [];

    // Fill the DP table
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (X[i - 1] === Y[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
      tableSteps.push(dp.map(row => row.slice()));
    }

    // Backtrack to find the LCS and differences
    let lcsStr = "";
    let diff = [];
    let i = n, j = m;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && X[i - 1] === Y[j - 1]) {
        lcsStr = X[i - 1] + lcsStr;
        diff.unshift({ type: "match", char: X[i - 1] });
        i--; j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        diff.unshift({ type: "insert", char: Y[j - 1] });
        j--;
      } else if (i > 0) {
        diff.unshift({ type: "delete", char: X[i - 1] });
        i--;
      }
    }

    setLcsResult({ lcs: lcsStr, diff, tableSteps });
  };

  // Compute Myers' Diffing
  const myersDiff = (a, b) => {
    const n = a.length;
    const m = b.length;
    const maxD = n + m;
    const v = Array(2 * maxD + 1).fill(0);
    const newSteps = [];
    const newTableSteps = [];

    // Iterate through each diagonal
    for (let d = 0; d <= maxD; d++) {
      for (let k = -d; k <= d; k += 2) {
        const down = k === -d || (k !== d && v[k - 1 + maxD] < v[k + 1 + maxD]);
        const kPrev = down ? k + 1 : k - 1;
        const xStart = v[kPrev + maxD];
        const xEnd = down ? xStart : xStart + 1;
        const yEnd = xEnd - k;

        let x = xEnd, y = yEnd;
        while (x < n && y < m && a[x] === b[y]) {
          x++;
          y++;
        }

        v[k + maxD] = x;
        newSteps.push({ d, k, x, y });
        newTableSteps.push([...v]);

        if (x >= n && y >= m) {
          setMyersResult({ steps: newSteps, tableSteps: newTableSteps });
          return;
        }
      }
    }
  };

  // Compare both algorithms
  const handleComparison = () => {
    computeLCS(string1, string2);
    myersDiff(string1, string2);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">LCS vs Myers' Diffing Algorithm</h1>
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
          onClick={handleComparison}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Compare LCS and Myers Diff
        </button>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">LCS Algorithm:</h2>
          <h3>LCS: {lcsResult.lcs}</h3>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Diff Steps:</h4>
            <ul className="list-disc ml-6">
              {lcsResult.diff.map((step, index) => (
                <li key={index} className={`text-${step.type === "match" ? "green" : step.type === "insert" ? "blue" : "red"}-500`}>
                  {step.type.toUpperCase()}: {step.char}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-semibold">DP Table (Step-by-Step):</h4>
            {lcsResult.tableSteps.map((table, stepIndex) => (
              <div key={stepIndex} className="my-4">
                <h5 className="text-md font-semibold">Step {stepIndex + 1}</h5>
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">i\\j</th>
                      {Array.from({ length: string2.length }).map((_, index) => (
                        <th key={index} className="border px-4 py-2">{string2[index]}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {rowIndex === 0 && (
                          <td className="border px-4 py-2">-</td>
                        )}
                        {rowIndex > 0 && (
                          <td className="border px-4 py-2">{string1[rowIndex - 1]}</td>
                        )}
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="border px-4 py-2">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Myers' Diffing Algorithm:</h2>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Diff Steps:</h4>
            <ul className="list-disc ml-6">
              {myersResult.steps.map((step, index) => (
                <li key={index}>
                  Step {index + 1}: d={step.d}, k={step.k}, x={step.x}, y={step.y}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-semibold">Path Table (Step-by-Step):</h4>
            {myersResult.tableSteps.map((table, stepIndex) => (
              <div key={stepIndex} className="my-4">
                <h5 className="text-md font-semibold">Step {stepIndex + 1}</h5>
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">k</th>
                      {Array.from({ length: table.length }).map((_, index) => (
                        <th key={index} className="border px-4 py-2">v[{index}]</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">{table[0]}</td>
                      {table.map((cell, index) => (
                        <td key={index} className="border px-4 py-2">{cell}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

