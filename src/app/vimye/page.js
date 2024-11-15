"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";

// export default function MyersPage() {
//   const [string1, setString1] = useState("");
//   const [string2, setString2] = useState("");
//   const [steps, setSteps] = useState([]);

//   const myersAlgorithm = (a, b) => {
//     const n = a.length;
//     const m = b.length;
//     const maxD = n + m;
//     const v = Array(2 * maxD + 1).fill(0);

//     const stepDetails = [];
//     for (let d = 0; d <= maxD; d++) {
//       for (let k = -d; k <= d; k += 2) {
//         const down = k === -d || (k !== d && v[k - 1 + maxD] < v[k + 1 + maxD]);
//         const kPrev = down ? k + 1 : k - 1;
//         const xStart = v[kPrev + maxD];
//         const xEnd = down ? xStart : xStart + 1;
//         const yEnd = xEnd - k;

//         let x = xEnd, y = yEnd;
//         while (x < n && y < m && a[x] === b[y]) {
//           x++;
//           y++;
//         }

//         v[k + maxD] = x;
//         stepDetails.push({ k, x, y, path: [...v] });

//         if (x >= n && y >= m) {
//           setSteps(stepDetails);
//           return;
//         }
//       }
//     }
//   };

//   const visualizeMyers = () => {
//     myersAlgorithm(string1, string2);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <NavBar />
//       <div className="p-6 max-w-xl mx-auto">
//         <h1 className="text-2xl font-bold mb-4">Myers' Algorithm Visualization</h1>
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
//           onClick={visualizeMyers}
//           className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//         >
//           Visualize Myers
//         </button>
//         <div className="mt-6">
//           <h2 className="text-lg font-semibold">Steps:</h2>
//           <div className="mt-2">
//             {steps.map((step, i) => (
//               <p key={i} className="mt-1">
//                 Step {i + 1}: k = {step.k}, x = {step.x}, y = {step.y}
//               </p>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





export default function MyersDiffPage() {
  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  const [steps, setSteps] = useState([]);
  const [tableSteps, setTableSteps] = useState([]);

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
          setSteps(newSteps);
          setTableSteps(newTableSteps);
          return;
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Myers' Diffing Algorithm</h1>
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
          onClick={() => myersDiff(string1, string2)}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Visualize Myers Diff
        </button>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Diff Steps:</h3>
          <ul className="list-disc ml-6">
            {steps.map((step, index) => (
              <li key={index}>Step {index + 1}: d={step.d}, k={step.k}, x={step.x}, y={step.y}</li>
            ))}
          </ul>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Path Table (Step-by-Step):</h3>
            {tableSteps.map((table, stepIndex) => (
              <div key={stepIndex} className="my-4">
                <h4 className="text-md font-semibold">Step {stepIndex + 1}</h4>
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


