import { useState, useEffect } from "react";
import { MdOutlineCleaningServices } from "react-icons/md";
import { FaCode, FaLightbulb } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Loader from "../components/Loader";
import FeedbackButton from "../components/FeedbackButton";
import { useTheme } from "../context/ThemeContext";

function DeadCodeFinder() {
  const exampleCodes = {
    JavaScript: `function demo() {
  let used = 10;
  let unused = 20; 
  return used;
}`,
    TypeScript: `function demo(): number {
  let active = 42;
  let neverUsed = 99; 
  return active;
}`,
    CSS: `.used-class { color: red; }
.unused-class { color: blue; }  `,
  };

  const [code, setCode] = useState(exampleCodes["JavaScript"]);
  const [language, setLanguage] = useState("JavaScript");
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  const languages = ["JavaScript", "TypeScript", "CSS"];

  const findDeadCode = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code first");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/scan-deadcode`,
        { code, language } // send as JSON
      );

      console.log("🔍 Dead code response:", response.data);
      const data = response.data;
      if (response.data.deadCode && response.data.deadCode.length > 0) {
        const formatted = response.data.deadCode
          .map((item) => `Line ${item.line}: ${item.text}`)
          .join("\n");

        setResults(formatted);
      } else {
        setResults("✅ No dead code found!");
      }
      toast.success("Dead code analysis completed!");
    } catch (error) {
      console.error(
        "❌ Error scanning dead code:",
        error.response?.data || error.message
      );
      toast.error("Failed to scan dead code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResults = () => {
    navigator.clipboard.writeText(results);
    toast.success("Results copied to clipboard!");
  };

  const handleClearAll = () => {
    setCode("");
    setResults("");
    toast.success("All cleared!");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <Loader
          fullscreen
          size="xl"
          color="pink"
          text="Loading Dead Code Finder..."
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full ${
        isDark ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-4 md:mb-0">
              <MdOutlineCleaningServices className="text-pink-400 text-2xl mr-2" />
              <h1
                className={`text-2xl md:text-3xl font-bold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Dead Code Finder
              </h1>
            </div>
          </div>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Detect and clean up unused variables, functions, and CSS selectors
            in your codebase.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Input Section */}
          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-xl font-semibold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                <FaCode className="inline mr-2" /> Your Code
              </h2>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  setCode(exampleCodes[e.target.value] || "");
                }}
                className={`px-3 py-1 rounded ${
                  isDark
                    ? "bg-gray-800 text-white border-gray-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                } border`}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div
              className={`border ${
                isDark ? "border-gray-600" : "border-gray-300"
              } rounded-lg overflow-hidden mb-4`}
            >
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`w-full h-64 p-4 font-mono text-sm ${
                  isDark ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"
                }`}
                placeholder="Paste your code here..."
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleClearAll}
                className={`px-4 py-3 rounded flex items-center justify-center ${
                  isDark
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-all`}
              >
                Clear All
              </button>
              <button
                onClick={findDeadCode}
                disabled={loading}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded transition-colors flex items-center"
              >
                {loading ? <Loader size="small" /> : "Find Dead Code"}
              </button>
            </div>
          </div>

          {/* Results Output Section */}
          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-xl font-semibold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                <FaLightbulb className="inline mr-2" /> Dead Code Results
              </h2>
              {results && (
                <button
                  onClick={handleCopyResults}
                  className={`px-3 py-1 rounded ${
                    isDark
                      ? "bg-gray-600 hover:bg-gray-500"
                      : "bg-gray-200 hover:bg-gray-300"
                  } transition-colors text-sm`}
                >
                  Copy to Clipboard
                </button>
              )}
            </div>

            <div
              className={`border ${
                isDark ? "border-gray-600" : "border-gray-300"
              } rounded-lg overflow-hidden`}
              style={{ height: "500px" }}
            >
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader />
                </div>
              ) : results ? (
                <div
                  className={`h-full overflow-y-auto p-4 ${
                    isDark ? "bg-gray-800" : "bg-gray-50"
                  }`}
                >
                  <Markdown
                    rehypePlugins={[rehypeHighlight]}
                    className={isDark ? "text-white" : "text-gray-800"}
                  >
                    {results}
                  </Markdown>
                </div>
              ) : (
                <div
                  className={`flex flex-col justify-center items-center h-full ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <MdOutlineCleaningServices className="text-4xl mb-4 opacity-50" />
                  <p className="text-center">
                    Paste your code and click "Find Dead Code" to detect unused
                    variables or selectors.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Button */}
      <FeedbackButton toolName="Dead Code Finder" />
    </div>
  );
}

export default DeadCodeFinder;
