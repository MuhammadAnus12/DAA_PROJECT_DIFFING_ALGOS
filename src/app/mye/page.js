"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";

export default function MyersPage() {
  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  const [result, setResult] = useState("");

  const myersDiff = (a, b) => {
    const n = a.length,
      m = b.length,
      maxD = n + m;
    const v = new Array(2 * maxD + 1).fill(0);
    for (let d = 0; d <= maxD; d++) {
      for (let k = -d; k <= d; k += 2) {
        const down = k === -d || (k !== d && v[k - 1 + maxD] < v[k + 1 + maxD]);
        const kPrev = down ? k + 1 : k - 1;
        const xStart = v[kPrev + maxD];
        const yStart = xStart - kPrev;
        let x = down ? xStart : xStart + 1;
        let y = x - k;

        while (x < n && y < m && a[x] === b[y]) {
          x++;
          y++;
        }
        v[k + maxD] = x;
        if (x >= n && y >= m) {
          return `Edit distance: ${d}`;
        }
      }
    }
    return "No diff found";
  };

  const calculateDiff = () => {
    setResult(myersDiff(string1, string2));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Myers' Algorithm</h1>
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
          onClick={calculateDiff}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Calculate Diff
        </button>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Result:</h2>
          <p>{result || "Enter strings to see the result"}</p>
        </div>
      </div>
    </div>
  );
}
