import React from 'react'
import CodeEditor from '../components/CodeEditor'

function CodeComplexity() {
    const URL = "http://localhost:5000/ai/get-complexity"
    return (
        <div className='mt-20' >
            <h2>
                CodeComplexity
            </h2>
            <CodeEditor URL={URL} />
        </div>
    )
}

export default CodeComplexity