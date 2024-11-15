import React from 'react';
// function findLCS(str1, str2) {
//     const m = str1.length, n = str2.length;
//     const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(''));
  
//     for (let i = 1; i <= m; i++) {
//       for (let j = 1; j <= n; j++) {
//         if (str1[i - 1] === str2[j - 1]) {
//           dp[i][j] = dp[i - 1][j - 1] + str1[i - 1];
//         } else {
//           dp[i][j] = dp[i - 1][j].length > dp[i][j - 1].length ? dp[i - 1][j] : dp[i][j - 1];
//         }
//       }
//     }
  
//     return dp[m][n];
//   }


const LCSHighlight = ({ input1, input2 }) => {
  const lcs = findLCS(input1, input2);

  const getDiffs = (str, lcs) => {
    let diff = [];
    let i = 0, j = 0;

    while (i < str.length) {
      if (j < lcs.length && str[i] === lcs[j]) {
        diff.push({ value: str[i], type: 'unchanged' });
        j++;
      } else {
        diff.push({ value: str[i], type: 'removed' });
      }
      i++;
    }

    return diff;
  };

  const input1Diffs = getDiffs(input1, lcs);
  const input2Diffs = getDiffs(input2, lcs);

  return (
    <div>
      <h3>Input 1 Differences:</h3>
      {input1Diffs.map((part, index) => (
        <span
          key={index}
          style={{
            backgroundColor: part.type === 'added' ? 'lightgreen' : part.type === 'removed' ? 'salmon' : 'transparent',
            textDecoration: part.type === 'removed' ? 'line-through' : 'none',
          }}
        >
          {part.value}
        </span>
      ))}
      <h3>Input 2 Differences:</h3>
      {input2Diffs.map((part, index) => (
        <span
          key={index}
          style={{
            backgroundColor: part.type === 'added' ? 'lightgreen' : part.type === 'removed' ? 'salmon' : 'transparent',
            textDecoration: part.type === 'removed' ? 'line-through' : 'none',
          }}
        >
          {part.value}
        </span>
      ))}
    </div>
  );
};

// Helper Function: LCS Algorithm
function findLCS(str1, str2) {
  const m = str1.length, n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(''));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + str1[i - 1];
      } else {
        dp[i][j] = dp[i - 1][j].length > dp[i][j - 1].length ? dp[i - 1][j] : dp[i][j - 1];
      }
    }
  }

  return dp[m][n];
}

export default LCSHighlight;
