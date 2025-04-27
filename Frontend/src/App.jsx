import "prismjs/themes/prism-tomorrow.css"
import Home from './pages/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { Routes, BrowserRouter as Router, Route } from "react-router-dom"
import CodeOptimizer from "./pages/CodeOptimizer"
import CodeGenerator from "./pages/CodeGenerator"
import CodeComplexity from "./pages/CodeComplexity"
import CodeCompare from "./pages/CodeCompare"
import About from "./pages/About"

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <nav className="w-full fixed top-0 left-0 z-50">
          <Nav />
        </nav>

        <main className="flex-grow pt-20 bg-gray-800">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/optimiser" element={<CodeOptimizer />} />
            <Route path="/codegenerator" element={<CodeGenerator />} />
            <Route path="/codecomplexity" element={<CodeComplexity />} />
            <Route path="/codecompare" element={<CodeCompare />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
