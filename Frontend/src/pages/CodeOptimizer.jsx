import { useState } from 'react';
import CodeEditor from '../components/CodeEditor.jsx';
import CodeExamples from '../components/CodeExamples.jsx';
import FeedbackForm from '../components/FeedbackForm.jsx';
import CodeHistory from '../components/CodeHistory.jsx';
import { FaLightbulb, FaCode } from 'react-icons/fa';

function CodeOptimizer() {
  const URL = `${import.meta.env.VITE_BACKEND_URL}/ai/get-review`;
  const [theme, setTheme] = useState('dark');
  const [showExamples, setShowExamples] = useState(false);

  const defaultPrompt = `function add(a, b) {
    return a + b;
 }`;

  const [prompt, setPrompt] = useState(defaultPrompt);

  const codeExamples = [
    {
      name: "JavaScript Function",
      code: defaultPrompt
    },
    {
      name: "JavaScript Loop",
      code: `function sumArray(arr) {
  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`
    },
    {
      name: "Python Function",
      code: `def factorial(n):
    if n <= 1:
        return 1
    else:
        return n * factorial(n-1)`
    }
  ];

  const handleExampleSelect = (code) => {
    setPrompt(code);
    setShowExamples(false);
  };

  return (
    <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-4 md:mb-0">
              <FaLightbulb className="text-yellow-400 text-2xl mr-2" />
              <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                OMEX Code Optimizer
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
              >
                <FaCode className="mr-2" /> Examples
              </button>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                    : 'bg-gray-700 hover:bg-gray-800 text-white'
                }`}
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Optimize your code for better performance, readability, and maintainability.
          </p>
        </div>

        {/* Examples Dropdown */}
        {showExamples && (
          <div className="mb-6">
            <CodeExamples
              examples={codeExamples}
              onSelect={handleExampleSelect}
              isDark={theme === 'dark'}
            />
          </div>
        )}

        {/* Code Editor */}
        <div className="bg-gray-700 rounded-lg shadow-xl overflow-hidden">
          <CodeEditor URL={URL} prompt={prompt} theme={theme} />
        </div>
      </div>

      {/* Feedback Form */}
      <FeedbackForm isDark={theme === 'dark'} />

      {/* Code History */}
      {/* <CodeHistory
        onSelectHistory={(code) => setPrompt(code)}
        isDark={theme === 'dark'}
      /> */}
    </div>
  );
}

export default CodeOptimizer;
