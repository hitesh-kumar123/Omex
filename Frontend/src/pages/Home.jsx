import React from 'react'
import ChatComponent from '../components/ChatComponent'
// import CodeComponent from "../components/co"
function Home() {
  return (
    <div className='bg-black text-white flex flex-col items-center justify-center h-screen space-y-4'>
      <h1 className='text-4xl font-bold'>Welcome to CodeOptimize</h1>
      <p className='text-xl'>Unlock Your Code's Full Potential</p>
      <p className='text-lg'>Experience the power of AI-driven code optimization, complexity analysis, and generation.</p>
      <div className='flex flex-col space-y-2'>
        <p className='text-base'>Enhance Performance</p>
        <p className='text-base'>Boost Readability</p>
        <p className='text-base'>Uncover Complexity</p>
        <p className='text-base'>Generate Innovative Code</p>
      </div>
    </div>
  )
}

export default Home