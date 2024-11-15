"use client"
import React, { useState } from 'react';
import MyersDiff from '@/components/myrealgorithm';
import NavBar from '@/components/NavBar';

const MyersPage = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  return (
    <>
    <NavBar/>
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>String Comparison</h1>
      <textarea
        placeholder="Enter first string"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
        style={{ width: '100%', height: '100px', marginBottom: '10px' }}
        />
      <textarea
        placeholder="Enter second string"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
        style={{ width: '100%', height: '100px', marginBottom: '10px' }}
      />
      <h2>Differences:</h2>
      <MyersDiff input1={input1} input2={input2} />
    </div>
        </>
  );
};

export default MyersPage;
