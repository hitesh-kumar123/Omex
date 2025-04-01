import React from 'react'
import { Link } from 'react-router-dom';
function Nav() {
  return (
  <nav className="bg-gray-800 text-white py-5 px-8 w-full flex justify-between items center">
      <h1 className="text-2xl font-bold cursor-pointer"><Link to="/" className="hover:text-blue-400">AI Code Optimisation</Link></h1>
    <div className="flex justify-between items-center gap-4">
      <h1 className="text-xl font-bold cursor-pointer"><Link to="/optimiser" className="hover:text-blue-400"> Optimisation</Link></h1>
      <h1 className="text-xl font-bold cursor-pointer"><Link to="/codegenerator" className="hover:text-blue-400"> codegenerator</Link></h1>
      <h1 className="text-xl font-bold cursor-pointer"><Link to="/CodeComplexity" className="hover:text-blue-400"> CodeComplexity</Link></h1>
    </div>
  </nav>
  )
}

export default Nav;