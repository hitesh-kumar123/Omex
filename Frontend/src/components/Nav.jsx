import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCode, FaLightbulb, FaRobot, FaChartLine, FaExchangeAlt, FaBars, FaTimes } from 'react-icons/fa';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-400 border-b-2 border-blue-400' : 'hover:text-blue-400';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-4 md:px-8 w-full shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FaCode className="text-blue-400 text-2xl" />
            <h1 className="text-xl md:text-2xl font-bold">
              <Link to="/" className="hover:text-blue-400 transition duration-200">
                OMEX
              </Link>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/optimiser" className={`flex items-center space-x-1 py-2 ${isActive('/optimiser')}`}>
              <FaLightbulb className="text-yellow-400" />
              <span>Optimize</span>
            </Link>
            <Link to="/codegenerator" className={`flex items-center space-x-1 py-2 ${isActive('/codegenerator')}`}>
              <FaRobot className="text-green-400" />
              <span>Generate</span>
            </Link>
            <Link to="/codecomplexity" className={`flex items-center space-x-1 py-2 ${isActive('/codecomplexity')}`}>
              <FaChartLine className="text-purple-400" />
              <span>Complexity</span>
            </Link>
            <Link to="/codecompare" className={`flex items-center space-x-1 py-2 ${isActive('/codecompare')}`}>
              <FaExchangeAlt className="text-red-400" />
              <span>Compare</span>
            </Link>
            <Link to="/about" className={`flex items-center space-x-1 py-2 ${isActive('/about')}`}>
              <span>About</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 space-y-3 border-t border-gray-700">
            <Link
              to="/optimiser"
              className={`block py-2 px-2 rounded ${isActive('/optimiser')} hover:bg-gray-800`}
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <FaLightbulb className="text-yellow-400" />
                <span>Optimize</span>
              </div>
            </Link>
            <Link
              to="/codegenerator"
              className={`block py-2 px-2 rounded ${isActive('/codegenerator')} hover:bg-gray-800`}
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <FaRobot className="text-green-400" />
                <span>Generate</span>
              </div>
            </Link>
            <Link
              to="/codecomplexity"
              className={`block py-2 px-2 rounded ${isActive('/codecomplexity')} hover:bg-gray-800`}
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <FaChartLine className="text-purple-400" />
                <span>Complexity</span>
              </div>
            </Link>
            <Link
              to="/codecompare"
              className={`block py-2 px-2 rounded ${isActive('/codecompare')} hover:bg-gray-800`}
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <FaExchangeAlt className="text-red-400" />
                <span>Compare</span>
              </div>
            </Link>
            <Link
              to="/about"
              className={`block py-2 px-2 rounded ${isActive('/about')} hover:bg-gray-800`}
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <span>About</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;