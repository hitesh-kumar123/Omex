import CodeEditor from '../components/CodeEditor.jsx'
// import { useURL } from '../store/auth.jsx';
function CodeOptimizer() {
const URL=`${import.meta.env.VITE_BACKEND_URL}/ai/get-review`
const prompt=
`function add(a, b) {
    return a + b;
 }`
  return (
    <>
    <div className=' '>
      <CodeEditor URL={URL} prompt={prompt} />
      </div>  
    </>
  )
}


export default CodeOptimizer;
