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
    <div  className='p-5'>
      <h1  className=' text-center font-bold text-lg'>String Comparison</h1>
      <div  className='flex  gap-4'>
      <textarea
        placeholder="Enter first string"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
        className='w-full  h-[100px] mb-[10px] border border-zinc-700 rounded-md p-2'
        />
      <textarea
        placeholder="Enter second string"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
        className='w-full  h-[100px] mb-[10px] border border-zinc-700 rounded-md p-2'

      />
      </div>
      <h2 className='font-bold text-lg'>Differences:</h2>
      <MyersDiff input1={input1} input2={input2} />
    </div>
        </>
  );
};

export default MyersPage;
