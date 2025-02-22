import React, { useEffect, useState } from 'react'
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import { FaCopy } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import Loader from "../components/Loader.jsx"
import Editor from 'react-simple-code-editor';
import toast from 'react-hot-toast';
// import Nav from "./Nav.jsx"
function CodeEditor({URL}) {
    const [prompt, setPrompt] = useState(`function add(a, b) {
        return a + b;}`)
        const [copyText, setCopyButtonText] = useState(true);
        const [review, setReview] = useState(``)
        const [optimisedCode, setOptimisedCode] = useState(``)
        const [lang, setLang] = useState(``)
        const [loading, setLoading] = useState(false);
      //   const backendUrl = "https://ai-code-optimisation.onrender.com";
        const backendUrl = "http://localhost:5000";
      
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
            if (prompt.trim() === "") {
              setReview("Please enter some code to review");
              setLoading(false);
              return;
            }
            const response = await axios.post(URL, { prompt })
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
    <main className="h-screen pt-20 w-screen p-6 flex md:flex-row flex-col gap-6 bg-gray-700">
        <div className="left relative h-full md:w-1/2 w-full">
          <div className="code h-full overflow-y-scroll w-full bg-gray-900 rounded-lg">
            <Editor
              value={prompt}
              onValueChange={prompt => setPrompt(prompt)}
              highlight={prompt => prism.highlight(prompt, prism.languages.javascript, "javascript")}
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
  )
}

export default CodeEditor