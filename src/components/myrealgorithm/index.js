import React from 'react';
import { diffChars } from 'diff';

const MyersDiff = ({ input1, input2 }) => {
  const diffResult = diffChars(input1, input2); // Myers' algorithm is used here internally.

  return (
    <div>
      {diffResult.map((part, index) => (
        <span
          key={index}
          style={{
            backgroundColor: part.added ? 'lightgreen' : part.removed ? 'salmon' : 'transparent',
            textDecoration: part.removed ? 'line-through' : 'none',
          }}
        >
          {part.value}
        </span>
      ))}
    </div>
  );
};

export default MyersDiff;
