// src/components/LoaderHandler.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader"; // adjust path if needed

export default function LoaderHandler({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [loaderText, setLoaderText] = useState("Loading...");

  // Map route pathnames to their loader texts
  const loaderTexts = {
    "/": "Loading Home Page...",
    "/optimiser": "Code Optimiser...",
    "/codegenerator": "Initializing Code Generator...",
    "/codecomplexity": "Initializing Code Generator...",
    "/codecompare": "Loading Code Compare Tool...",
    "/about": "Loading About Section...",
    "/contributors": "Meet Our Contributors...",
    "/insights": "Fetching AI Insights...",
    "/code-tools":"Loading All Tools...",
    "/test-case-generator":"Loading Test Case Generator...",
    "/code-beautifier":"Loading Code Beautify Tool...",
    "/error-debugger":"Loading Error Debugging Tool...",
    "/performance-analyzer":"Loading Perfomance Analysing Tool...",
    "/content-summarizer": "Loading Summarizing Content Tool...",
    "/security-scanner": "Analyzing Security Components...",
    "/dependency-scanner": "Loading Dependency Scanner...",
    "/contact": "Contact Page is Loading...",
    "/team": "Our Team...",
    "/contribute": "Want to contribute?...",
    "/feedback": "Feedback...",
    "/privacy-policy": "Our Privacy Policy...",
    "/terms-of-service": "Our Terms of Service...",
    "/contributor-guide": "Contribution Guide...",
    "/logo-showcase": "Logo Showcase...",
  };

  useEffect(() => {
    // pick a loader text based on the current path
    setLoaderText(loaderTexts[location.pathname] || "Loading...");
    setLoading(true);

    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && (
        <Loader
          fullscreen
          size="xl"
          color="purple"
          text={loaderText}
        />
      )}
      {children}
    </>
  );
}
