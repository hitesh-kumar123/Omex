import React from 'react';
import { Link } from 'react-router-dom';
import { FaLightbulb, FaRobot, FaChartLine, FaExchangeAlt, FaArrowRight, FaCode } from 'react-icons/fa';

function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8 inline-block p-2 bg-blue-600 bg-opacity-20 rounded-full">
            <FaCode className="text-blue-400 text-2xl" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-blue-400">OMEX</span> - AI Code Optimizer
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            Unlock your code's full potential with our AI-powered tools for optimization, analysis, and generation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/optimiser"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center"
            >
              Get Started <FaArrowRight className="ml-2" />
            </Link>
            <Link
              to="/about"
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaLightbulb className="text-yellow-400" />}
              title="Code Optimization"
              description="Get AI-powered suggestions to improve your code's performance, readability, and maintainability."
              link="/optimiser"
            />
            <FeatureCard
              icon={<FaRobot className="text-green-400" />}
              title="Code Generation"
              description="Generate code snippets and solutions based on your requirements and specifications."
              link="/codegenerator"
            />
            <FeatureCard
              icon={<FaChartLine className="text-purple-400" />}
              title="Complexity Analysis"
              description="Understand the time and space complexity of your algorithms and identify bottlenecks."
              link="/codecomplexity"
            />
            <FeatureCard
              icon={<FaExchangeAlt className="text-red-400" />}
              title="Code Comparison"
              description="Compare different versions of your code to identify changes and improvements."
              link="/codecompare"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Input Your Code"
              description="Paste your code or write it directly in our editor."
            />
            <StepCard
              number="02"
              title="AI Analysis"
              description="Our AI analyzes your code for optimization opportunities."
            />
            <StepCard
              number="03"
              title="Get Results"
              description="Receive detailed feedback and suggestions for improvement."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 bg-opacity-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Code?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of developers who are writing better, cleaner, and more efficient code with OMEX.
          </p>
          <Link
            to="/optimiser"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 inline-flex items-center"
          >
            Try It Now <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}

// Helper Components
const FeatureCard = ({ icon, title, description, link }) => (
  <Link to={link} className="bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <div className="flex items-center text-blue-400 font-medium">
      Learn more <FaArrowRight className="ml-2" size={14} />
    </div>
  </Link>
);

const StepCard = ({ number, title, description }) => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
    <div className="text-5xl font-bold text-blue-400 opacity-50 mb-4">{number}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default Home;