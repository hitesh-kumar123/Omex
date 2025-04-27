import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaCode, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <FaCode className="text-blue-400 text-2xl mr-2" />
              <h2 className="text-xl font-bold">OMEX</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Enhance your code with AI-powered optimization, analysis, and generation tools.
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                <FaGithub size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                <FaTwitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition duration-200">Home</Link>
              </li>
              <li>
                <Link to="/optimiser" className="text-gray-400 hover:text-blue-400 transition duration-200">Code Optimizer</Link>
              </li>
              <li>
                <Link to="/codegenerator" className="text-gray-400 hover:text-blue-400 transition duration-200">Code Generator</Link>
              </li>
              <li>
                <Link to="/codecomplexity" className="text-gray-400 hover:text-blue-400 transition duration-200">Code Complexity</Link>
              </li>
              <li>
                <Link to="/codecompare" className="text-gray-400 hover:text-blue-400 transition duration-200">Code Compare</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition duration-200">About</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <p className="text-gray-400 mb-2">Have questions or feedback?</p>
            <a href="mailto:contact@omex.com" className="text-blue-400 hover:text-blue-300 transition duration-200">
              contact@omex.com
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p className="flex items-center justify-center">
            &copy; {currentYear} OMEX. All rights reserved. Made with <FaHeart className="text-red-500 mx-1" /> by OMEX Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
