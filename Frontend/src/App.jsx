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
        <Nav />
        <main className=" w-screen" >
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
