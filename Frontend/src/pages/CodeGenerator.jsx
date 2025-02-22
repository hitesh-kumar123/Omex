import React from 'react'
import CodeEditor from '../components/CodeEditor'

function CodeGenerator() {
  const URL="http://localhost:5000/ai/get-code"
  return (
    <>
    <div className='"mt-20 bg-green-500 '>
      <h2>Code optimizer</h2>
      <CodeEditor URL={URL} />
      </div>  
    </>
  )
}

export default CodeGenerator