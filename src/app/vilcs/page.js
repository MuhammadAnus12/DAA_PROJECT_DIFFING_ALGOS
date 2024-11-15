"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";

// export default function LCSPage() {
//   const [string1, setString1] = useState("");
//   const [string2, setString2] = useState("");
//   const [table, setTable] = useState([]);
//   const [result, setResult] = useState("");

//   const calculateLCS = () => {
//     const n = string1.length;
//     const m = string2.length;
//     const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

//     for (let i = 1; i <= n; i++) {
//       for (let j = 1; j <= m; j++) {
//         if (string1[i - 1] === string2[j - 1]) {
//           dp[i][j] = dp[i - 1][j - 1] + 1;
//         } else {
//           dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
//         }
//       }
//     }

//     setTable(dp);

//     // Backtracking for the result
//     let lcsStr = "";
//     let i = n, j = m;
//     while (i > 0 && j > 0) {
//       if (string1[i - 1] === string2[j - 1]) {
//         lcsStr = string1[i - 1] + lcsStr;
//         i--;
//         j--;
//       } else if (dp[i - 1][j] > dp[i][j - 1]) {
//         i--;
//       } else {
//         j--;
//       }
//     }
//     setResult(lcsStr);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <NavBar />
//       <div className="p-6 max-w-xl mx-auto">
//         <h1 className="text-2xl font-bold mb-4">LCS Algorithm Visualization</h1>
//         <input
//           type="text"
//           placeholder="Enter String 1"
//           value={string1}
//           onChange={(e) => setString1(e.target.value)}
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Enter String 2"
//           value={string2}
//           onChange={(e) => setString2(e.target.value)}
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <button
//           onClick={calculateLCS}
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           Visualize LCS
//         </button>
//         <div className="mt-6">
//           <h2 className="text-lg font-semibold">Dynamic Programming Table:</h2>
//           <div className="grid grid-cols-auto gap-1 mt-2">
//             {table.map((row, i) => (
//               <div key={i} className="flex">
//                 {row.map((cell, j) => (
//                   <div
//                     key={j}
//                     className="w-10 h-10 border flex items-center justify-center"
//                   >
//                     {cell}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//           <h3 className="mt-4 font-semibold">LCS Result: {result}</h3>
//         </div>
//       </div>
//     </div>
//   );
// }




export default function LCSDiffPage() {
  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  const [result, setResult] = useState({ lcs: "", diff: [], tableSteps: [] });

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
      // Save the current state of the table after each row computation
      tableSteps.push(dp.map(row => row.slice()));
    }

    // Backtrack for LCS and differences
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

    setResult({ lcs: lcsStr, diff, tableSteps });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">LCS Diffing Algorithm</h1>
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
          onClick={() => computeLCS(string1, string2)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Visualize LCS Diff
        </button>
        <div className="mt-6">
          <h2 className="text-lg font-semibold">LCS: {result.lcs}</h2>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Diff Steps:</h3>
            <ul className="list-disc ml-6">
              {result.diff.map((step, index) => (
                <li key={index} className={`text-${step.type === "match" ? "green" : step.type === "insert" ? "blue" : "red"}-500`}>
                  {step.type.toUpperCase()}: {step.char}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">DP Table (Step-by-Step):</h3>
            {result.tableSteps.map((table, stepIndex) => (
              <div key={stepIndex} className="my-4">
                <h4 className="text-md font-semibold">Step {stepIndex + 1}</h4>
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
      </div>
    </div>
  );
}

