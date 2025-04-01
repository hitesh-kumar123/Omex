import "prismjs/themes/prism-tomorrow.css"
import Home from './pages/Home'
import Nav from './components/Nav'
import { Toaster } from 'react-hot-toast'
import { Routes, BrowserRouter as Router, Route } from "react-router-dom"
import CodeOptimizer from "./pages/CodeOptimizer"
import CodeGenerator from "./pages/CodeGenerator"
import CodeComplexity from "./pages/CodeComplexity"
function App() {
  return (
    <>
      <Router>
        <nav className="h-18 w-full fixed top-0 left-0 z-50" >
        <Nav/>
        </nav>
        <main className="pt-18 bg-gray-700 min-h-screen " >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/optimiser" element={<CodeOptimizer />} />
          <Route path="/codegenerator" element={<CodeGenerator />} />
          <Route path="/CodeComplexity" element={<CodeComplexity />} />
        </Routes>
        </main>
        <Toaster />
      </Router>
    </>
  )
}


export default App
