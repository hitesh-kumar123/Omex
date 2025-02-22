import CodeEditor from '../components/CodeEditor.jsx'
function CodeOptimizer() {
const URL="http://localhost:5000/ai/get-review"
  return (
    <>
    <div className='"mt-20 bg-green-500 '>
      <h2>Code optimizer</h2>
      <CodeEditor URL={URL} />
      </div>  
    </>
  )
}


export default CodeOptimizer;
