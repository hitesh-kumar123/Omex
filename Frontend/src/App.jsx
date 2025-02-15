import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'
import { FaCopy } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast'
import Navbar from './components/navbar'
function App() {
  const [code, setCode] = useState(`function add(a, b) {
  return a + b;
}`)
  const [copyText, setCopyButtonText] = useState(true);
  const [review, setReview] = useState(``)
  const [optimisedCode, setOptimisedCode] = useState(``)
  const [lang, setLang] = useState(``)
  const [loading, setLoading] = useState(false);
  const handleCopyClick = () => {
    navigator.clipboard.writeText(optimisedCode);
    setCopyButtonText(false);
    toast.success("Code copied to clipboard!")
    setTimeout(() => setCopyButtonText(true), 2000);
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
  useEffect(() => {
    prism.highlightAll();
  }, [])

  async function reviewCode() {
    setLoading(true);
    try {
      if (code.trim() === "") {
        setReview("Please enter some code to review");
        setLoading(false);
        return;
      }
      const response = await axios.post('http://localhost:5000/ai/get-review', { code })
      setReview(response.data)
      extractRecommendedFix(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      toast.success('Operation successful!');
      setLoading(false);
    }
  }
  return (
    <>
    <Navbar/>
      <main className="h-screen pt-20 w-screen p-6 flex md:flex-row flex-col gap-6 bg-gray-700">
        <div className="left relative h-full md:w-1/2 w-full">
          <div className="code h-full w-full bg-gray-900 rounded-lg">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              className="rounded-md text-white"
            />
          </div>
          <div
            onClick={reviewCode}
            className="review absolute bottom-4 right-4 bg-blue-300 text-black px-8 py-2 font-semibold cursor-pointer rounded-lg"
          >{
              loading ? "Loading..." : "Review"
            }</div>
        </div>
        <div className="right bg-gray-100 p-6 text-2xl overflow-auto rounded-lg md:w-1/2 w-full relative">
          {lang && (
            <button
              onClick={handleCopyClick}
              className='copy fixed right-12 top-8 bg-gray-800 border-2 border-blue-300 text-black p-2 font-semibold cursor-pointer rounded-lg'
            >
              {copyText ? <FaCopy className='text-white' /> : <MdDone classname="text-white" />}
            </button>
          )}
          {
            loading ? <>
              <Loader />
            </>
              :
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code: ({ node, ...props }) => (
                    <pre {...props} className='bg-slate-800 p-4 rounded-lg text-white'>
                      <code {...props} />
                    </pre>
                  ),
                }}
              >{review}</Markdown>
          }
        </div>
      </main>
      <Toaster />
    </>
  )
}

const Loader = () => {
  return (
    <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
      <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
      <span class="sr-only">Loading...</span>
    </div>
  )
}

export default App
