import React, { useEffect, useState, useRef } from 'react'
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import { FaCopy, FaTrash, FaCode, FaCheck, FaQuestionCircle } from "react-icons/fa";
import { MdDone, MdSettings } from "react-icons/md";
import Loader from "../components/Loader.jsx"
import Editor from '@monaco-editor/react';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

function CodeEditor(props) {
  const URL = props.URL;
  const [prompt, setPrompt] = useState(props.prompt || '');
  const [copyText, setCopyButtonText] = useState(true);
  const [copyAllText, setCopyAllButtonText] = useState(true);
  const [review, setReview] = useState('');
  const [optimisedCode, setOptimisedCode] = useState('');
  const [lang, setLang] = useState('');
  const [loading, setLoading] = useState(false);
  const [codelang, setCodeLang] = useState("JavaScript");
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [explanation, setExplanation] = useState('');
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [explaining, setExplaining] = useState(false);
  const editorRef = useRef(null);

  // Update prompt when props.prompt changes
  useEffect(() => {
    if (props.prompt !== prompt) {
      setPrompt(props.prompt);
    }
  }, [props.prompt]);

  const { isDark } = useTheme();

  const languages = ["Java", "JavaScript", "C", "C++", "Python", "Go"];

  // Language mapping for Monaco Editor
  const getMonacoLanguage = (lang) => {
    const langMap = {
      'JavaScript': 'javascript',
      'Java': 'java',
      'C': 'c',
      'C++': 'cpp',
      'Python': 'python',
      'Go': 'go'
    };
    return langMap[lang] || 'javascript';
  };

  // Register additional language features for enhanced IntelliSense
  const registerLanguageFeatures = (monaco) => {
    // For C, C++, Java, Python, Go, enable basic IntelliSense using Monaco's built-in support
    // For more advanced features, external language servers would be needed (out of scope here)
    // Here we enable word-based suggestions and parameter hints for these languages

    ['c', 'cpp', 'java', 'python', 'go', 'javascript'].forEach(language => {
      monaco.languages.registerCompletionItemProvider(language, {
        triggerCharacters: ['.', '>', ':', '#', '<', '"', "'"],
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn
          };
          // Provide simple word-based suggestions from the document
          const textUntilPosition = model.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          });
          const words = Array.from(new Set(textUntilPosition.match(/\b\w+\b/g) || []));
          const suggestions = words.map(w => ({
            label: w,
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: w,
            range: range
          }));
          return { suggestions: suggestions };
        }
      });
    });
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(optimisedCode);
    setCopyButtonText(false);
    toast.success("Optimized code copied to clipboard!");
    setTimeout(() => setCopyButtonText(true), 2000);
  };

  const handleCopyAllClick = () => {
    navigator.clipboard.writeText(review);
    setCopyAllButtonText(false);
    toast.success("Full review copied to clipboard!");
    setTimeout(() => setCopyAllButtonText(true), 2000);
  };

  const handleClearEditor = (e) => {
    // Prevent event bubbling and default behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setPrompt('');
    setReview('');
    setOptimisedCode('');
    setLang('');
    toast.success("Editor cleared!");
  };

  const changeLanguage = (lang) => {
    setCodeLang(lang);
    toast.success(`Language changed to ${lang}`);
  };

  function extractRecommendedFix(text) {
    const txt = "Recommended Fix:";
    const index = text.indexOf(txt);
    if (index !== -1) {
      var newTxt = text.substring(index + txt.length);
      const startIndex = newTxt.indexOf("```");
      newTxt = newTxt.substring(startIndex + 3, newTxt.indexOf("```", startIndex + 3));
      const lang = newTxt.substring(0, newTxt.indexOf("\n"));
      const result = newTxt.substring(newTxt.indexOf("\n") + 1);
      setOptimisedCode(result);
      setLang(lang);
    }
  }

  async function reviewCode() {
    setLoading(true);
    try {
      if (prompt.trim() === "") {
        setReview("Please enter some code to review");
        setLoading(false);
        return;
      }
      const response = await axios.post(URL, { prompt });
      setReview(response.data);
      extractRecommendedFix(response.data);
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Please try again.");
    } finally {
      toast.success('Operation successful!');
      setLoading(false);
    }
  }

  async function explainCode() {
    setExplaining(true);
    try {
      // Get selected text from Monaco editor
      const editor = editorRef.current;
      if (!editor) {
        toast.error("Editor not ready");
        setExplaining(false);
        return;
      }

      const selection = editor.getSelection();
      let codeToExplain = '';

      if (selection && !selection.isEmpty()) {
        // Use selected text
        codeToExplain = editor.getModel().getValueInRange(selection);
      } else {
        // Use all text if nothing selected
        codeToExplain = prompt;
      }

      if (codeToExplain.trim() === "") {
        toast.error("Please select some code or enter code to explain");
        setExplaining(false);
        return;
      }

      const response = await axios.post(`${URL}/explain-code`, { 
        code: codeToExplain, 
        language: codelang 
      });
      setExplanation(response.data);
      setShowExplanationModal(true);
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while explaining code. Please try again.");
    } finally {
      setExplaining(false);
    }
  }

  // Monaco Editor configuration
  const editorOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
    scrollBeyondLastLine: false,
    minimap: { enabled: false },
    fontSize: fontSize,
    fontFamily: '"Fira Code", "Fira Mono", monospace',
    lineNumbers: 'on',
    folding: true,
    foldingStrategy: 'indentation',
    showFoldingControls: 'mouseover',
    unfoldOnClickAfterEndOfLine: true,
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    autoSurround: 'brackets',
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'on',
    tabCompletion: 'on',
    wordBasedSuggestions: 'currentDocument',
    parameterHints: {
      enabled: true
    },
    hover: {
      enabled: true
    },
    contextmenu: true,
    mouseWheelZoom: true,
    multiCursorModifier: 'ctrlCmd',
    renderWhitespace: 'selection',
    renderControlCharacters: false,
    renderLineHighlight: 'line',
    scrollbar: {
      vertical: 'visible',
      horizontal: 'visible',
      useShadows: false,
      verticalHasArrows: false,
      horizontalHasArrows: false,
      verticalScrollbarSize: 14,
      horizontalScrollbarSize: 14
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Register language features for enhanced IntelliSense
    registerLanguageFeatures(monaco);

    // Configure theme based on app theme
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1f2937',
        'editor.foreground': '#f9fafb',
        'editor.lineHighlightBackground': '#374151',
        'editor.selectionBackground': '#3b82f6',
        'editor.inactiveSelectionBackground': '#1e40af'
      }
    });

    monaco.editor.defineTheme('custom-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#111827',
        'editor.lineHighlightBackground': '#f3f4f6',
        'editor.selectionBackground': '#dbeafe',
        'editor.inactiveSelectionBackground': '#bfdbfe'
      }
    });

    monaco.editor.setTheme(isDark ? 'custom-dark' : 'custom-light');
  };

  return (
    <div className={`w-full p-4 md:p-6 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
      {/* Settings Panel */}
      {showSettings && (
        <div className={`mb-4 p-4 rounded-lg shadow-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Editor Settings</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Programming Language</label>
              <select
                value={codelang}
                onChange={(e) => changeLanguage(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              >
                {languages.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Font Size</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full mr-2"
                />
                <span>{fontSize}px</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-[80vh]">
        {/* Editor Panel */}
        <div className="relative h-1/2 md:h-full md:w-1/2">
          <div className={`h-full overflow-hidden rounded-lg shadow-lg border ${
            isDark ? 'border-gray-600' : 'border-gray-300'
          }`}>
            <div className={`flex items-center justify-between px-4 py-2 ${
              isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              <div className="flex items-center">
                <FaCode className="mr-2" />
                <span className="font-medium">{codelang} Editor</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-2 rounded-md ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-300'
                  } transition-colors`}
                  title="Settings"
                >
                  <MdSettings />
                </button>
                <button
                  onClick={handleClearEditor}
                  onTouchStart={(e) => {
                    // Prevent touch delay and ensure immediate response
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    // Trigger click for touch devices if needed
                    if (e.type === 'touchend') {
                      e.preventDefault();
                      handleClearEditor(e);
                    }
                  }}
                  className={`p-3 min-h-[44px] min-w-[44px] rounded-md flex items-center justify-center ${
                    isDark ? 'hover:bg-gray-700 active:bg-gray-600' : 'hover:bg-gray-300 active:bg-gray-400'
                  } transition-all duration-150 touch-manipulation`}
                  style={{
                    WebkitTapHighlightColor: 'transparent',
                    userSelect: 'none',
                    touchAction: 'manipulation'
                  }}
                  title="Clear Editor"
                  aria-label="Clear Editor"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            </div>
            <div className={`h-[calc(100%-40px)]`}>
              <Editor
                height="100%"
                language={getMonacoLanguage(codelang)}
                value={prompt}
                onChange={(value) => setPrompt(value || '')}
                onMount={handleEditorDidMount}
                options={editorOptions}
                theme={isDark ? 'custom-dark' : 'custom-light'}
              />
            </div>
          </div>

          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={explainCode}
              disabled={explaining || loading}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                explaining || loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 hover:shadow-lg'
              } text-white`}
              title="Explain selected code"
            >
              {explaining ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Explaining...
                </>
              ) : (
                <>
                  <FaQuestionCircle className="mr-2" /> Explain
                </>
              )}
            </button>

            <button
              onClick={reviewCode}
              disabled={loading || explaining}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                loading || explaining
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg'
              } text-white`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <FaCheck className="mr-2" /> Review
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className={`h-1/2 md:h-full md:w-1/2 rounded-lg shadow-lg overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`px-4 py-2 ${
            isDark ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
          } flex justify-between items-center`}>
            <span className="font-medium">Review Results</span>
            <div className="flex space-x-2">
              {review && (
                <button
                  onClick={handleCopyAllClick}
                  className={`px-3 py-1 rounded-md text-sm ${
                    isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-300'
                  } transition-colors flex items-center`}
                  title="Copy full review"
                >
                  {copyAllText ? (
                    <>
                      <FaCopy className="mr-1" /> Copy All
                    </>
                  ) : (
                    <>
                      <MdDone className="mr-1" /> Copied!
                    </>
                  )}
                </button>
              )}
              {lang && (
                <button
                  onClick={handleCopyClick}
                  className={`px-3 py-1 rounded-md text-sm ${
                    isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-300'
                  } transition-colors flex items-center`}
                  title="Copy optimized code"
                >
                  {copyText ? (
                    <>
                      <FaCopy className="mr-1" /> Copy Code
                    </>
                  ) : (
                    <>
                      <MdDone className="mr-1" /> Copied!
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className={`h-[calc(100%-40px)] overflow-y-auto p-4 ${
            isDark ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Loader />
              </div>
            ) : review ? (
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code: ({ node, ...props }) => (
                    <pre {...props} className={`p-4 rounded-lg ${
                      isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
                    }`}>
                      <code {...props} />
                    </pre>
                  ),
                  p: ({ node, ...props }) => (
                    <p {...props} className="mb-4" />
                  ),
                  h1: ({ node, ...props }) => (
                    <h1 {...props} className="text-2xl font-bold mb-4" />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 {...props} className="text-xl font-bold mb-3" />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 {...props} className="text-lg font-bold mb-2" />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul {...props} className="list-disc pl-5 mb-4" />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol {...props} className="list-decimal pl-5 mb-4" />
                  ),
                  li: ({ node, ...props }) => (
                    <li {...props} className="mb-1" />
                  ),
                }}
              >
                {review}
              </Markdown>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <FaCode className="text-4xl mb-4 opacity-50" />
                <p className="text-lg opacity-70">Enter your code and click "Review" to get optimization suggestions</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explanation Modal */}
      {showExplanationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full max-h-[80vh] rounded-lg shadow-xl overflow-hidden ${
            isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`}>
            <div className={`px-6 py-4 border-b ${
              isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold flex items-center">
                  <FaQuestionCircle className="mr-2 text-green-500" />
                  Code Explanation
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(explanation);
                      toast.success("Explanation copied to clipboard!");
                    }}
                    className={`p-2 rounded-md ${
                      isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                    } transition-colors`}
                    title="Copy explanation"
                  >
                    <FaCopy />
                  </button>
                  <button
                    onClick={() => setShowExplanationModal(false)}
                    className={`p-2 rounded-md ${
                      isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                    } transition-colors`}
                    title="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose prose-sm max-w-none">
                <Markdown
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    code: ({ node, ...props }) => (
                      <pre {...props} className={`p-3 rounded-lg ${
                        isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
                      }`}>
                        <code {...props} />
                      </pre>
                    ),
                    p: ({ node, ...props }) => (
                      <p {...props} className="mb-3" />
                    ),
                    h1: ({ node, ...props }) => (
                      <h1 {...props} className="text-xl font-bold mb-3" />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 {...props} className="text-lg font-bold mb-2" />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 {...props} className="text-base font-bold mb-2" />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul {...props} className="list-disc pl-5 mb-3" />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol {...props} className="list-decimal pl-5 mb-3" />
                    ),
                    li: ({ node, ...props }) => (
                      <li {...props} className="mb-1" />
                    ),
                  }}
                >
                  {explanation}
                </Markdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeEditor
