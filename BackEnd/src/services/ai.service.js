/**
 * AI Service
 * This file contains the AI service functions for the application
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
const systemInstructions = require("../config/systemInstructions");

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

// Create AI models with system instructions
const codeOptimiser = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemInstructions.codeOptimizer,
});

const codeGenerator = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemInstructions.codeGenerator,
});

const codeComplexity = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemInstructions.codeComplexity,
});

const codeComparer = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemInstructions.codeComparer,
});

const testCaseGenerator = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemInstructions.testCaseGenerator,
});

const codeBeautifier = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemInstructions.codeBeautifier,
});

const errorDebugger = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemInstructions.errorDebugger,
});

const performanceAnalyzer = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemInstructions.performanceAnalyzer,
});

const contentSummarizer = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemInstructions.contentSummarizer,
});

const securityAnalyzer = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemInstructions.securityAnalyzer,
});

const dependencyScannerModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemInstructions.dependencyScanner,
});

const codeExplainer = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemInstructions.codeExplainer,
});

/**
 * Generate code based on a prompt
 * @param {string} prompt - The prompt to generate code from
 * @param {string} lang - The programming language to generate code in
 * @returns {Promise<string>} - The generated code
 */
async function generateCode(prompt, lang) {
  const result = await codeGenerator.generateContent(prompt, lang);
  const rawResponse = result.response.text();
  return cleanAIResponse(rawResponse);
}

/**
 * Clean AI response by removing system instruction text
 * @param {string} response - The raw AI response
 * @returns {string} - The cleaned response
 */
function cleanAIResponse(response) {
  // Remove common system instruction patterns that might appear in responses
  const patternsToRemove = [
    /AI System Instruction:.*?(?=\n|$)/gi,
    /System Instruction:.*?(?=\n|$)/gi,
    /Role & Responsibilities:.*?(?=\n|$)/gi,
    /Here's a solid system instruction.*?(?=\n|$)/gi,
    /Senior Code Reviewer.*?Experience.*?(?=\n|$)/gi,
    /expert code reviewer.*?years.*?experience.*?(?=\n|$)/gi,
  ];

  let cleanedResponse = response;
  patternsToRemove.forEach((pattern) => {
    cleanedResponse = cleanedResponse.replace(pattern, "");
  });

  cleanedResponse = cleanedResponse.trim();

  return cleanedResponse;
}

/**
 * Generate a code review
 * @param {string} prompt - The code to review
 * @returns {Promise<string>} - The review
 */
async function generateReview(prompt) {
  const result = await codeOptimiser.generateContent(prompt);
  const rawResponse = result.response.text();
  return cleanAIResponse(rawResponse);
}

/**
 * Generate a complexity analysis
 * @param {string} prompt - The code to analyze
 * @returns {Promise<string>} - The complexity analysis
 */
async function generateComplexity(prompt) {
  const result = await codeComplexity.generateContent(prompt);
  const rawResponse = result.response.text();
  return cleanAIResponse(rawResponse);
}

/**
 * Compare two code snippets
 * @param {string} code1 - The first code snippet
 * @param {string} code2 - The second code snippet
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The comparison result
 */
async function compareCode(code1, code2, language) {
  const prompt = `Please compare these two code snippets written in ${
    language || "the provided language"
  }:

Code Snippet 1:
\`\`\`
${code1}
\`\`\`

Code Snippet 2:
\`\`\`
${code2}
\`\`\`

Focus only on identifying critical logical errors, syntax errors, or bugs that would cause the code to fail.
Provide a line-by-line analysis of the errors with brief explanations.`;

  const result = await codeComparer.generateContent(prompt);
  const rawResponse = result.response.text();
  return cleanAIResponse(rawResponse);
}

/**
 * Generate test cases for code
 * @param {string} code - The code to generate test cases for
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The generated test cases
 */
async function generateTestCases(code, language) {
  const prompt = `Generate comprehensive test cases for the following ${
    language || "code"
  }:

\`\`\`
${code}
\`\`\`

Please provide a variety of test cases including normal cases, edge cases, and error cases.`;

  const result = await testCaseGenerator.generateContent(prompt);
  const rawResponse = result.response.text();
  return cleanAIResponse(rawResponse);
}

/**
 * Beautify code
 * @param {string} code - The code to beautify
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The beautified code
 */
async function beautifyCode(code, language) {
  const prompt = `Beautify and format the following ${
    language || "code"
  } to improve readability:

\`\`\`
${code}
\`\`\`

Please maintain the original functionality while making it more readable and well-structured.`;

  const result = await codeBeautifier.generateContent(prompt);
  return result.response.text();
}

/**
 * Debug code
 * @param {string} code - The code to debug
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The debugging result
 */
async function debugCode(code, language) {
  const prompt = `Debug the following ${
    language || "code"
  } and identify any errors or issues:

\`\`\`
${code}
\`\`\`

Please provide a detailed analysis of any errors found and suggest fixes.`;

  const result = await errorDebugger.generateContent(prompt);
  return result.response.text();
}

/**
 * Analyze code performance
 * @param {string} code - The code to analyze
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The performance analysis
 */
async function analyzePerformance(code, language) {
  const prompt = `Analyze the execution time and memory usage of the following ${
    language || "code"
  }:

\`\`\`
${code}
\`\`\`

Please provide a detailed analysis of time complexity, space complexity, and suggest optimizations.`;

  const result = await performanceAnalyzer.generateContent(prompt);
  return result.response.text();
}

/**
 * Summarize content from text
 * @param {string} content - The content to summarize
 * @param {string} summaryLength - The desired length of the summary (short, medium, long)
 * @param {string} summaryType - The type of summary (general, academic, business)
 * @returns {Promise<string>} - The summary
 */
async function summarizeContent(
  content,
  summaryLength = "medium",
  summaryType = "general"
) {
  const prompt = `Please summarize the following content:

\`\`\`
${content}
\`\`\`

Please provide a ${summaryLength} summary in ${summaryType} style.`;

  const result = await contentSummarizer.generateContent(prompt);
  return result.response.text();
}

/**
 * Analyze code for security vulnerabilities
 * @param {string} code - The code to analyze
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The security analysis
 */
async function analyzeSecurity(code, language) {
  const prompt = `Analyze the following ${
    language || "code"
  } for security vulnerabilities:

\`\`\`
${code}
\`\`\`

Please provide a detailed security analysis including vulnerability types, severity levels, line numbers, and recommended fixes.`;

  const result = await securityAnalyzer.generateContent(prompt);
  return result.response.text();
}

/**
 * Analyze dependencies for vulnerabilities
 * @param {string} packageJsonContext - The content of package.json
 * @returns {Promise<string>} - The analysis of dependencies
 */
async function scanDependencies(packageJsonContext) {
  const prompt = `Analyze the following package.json for dependency vulnerabilities and check if newer versions of the dependencies are available:

\`\`\`
${packageJsonContext}
\`\`\`

Please provide details on any vulnerable or deprecated dependencies and suggest newer versions if applicable.`;

  const result = await dependencyScannerModel.generateContent(prompt);
  return result.response.text();
}

// At the bottom of ai.service.js
async function codeMetricsAnalyzer(code) {
  const prompt = `Analyze the following code snippet for metrics like lines of code, cyclomatic complexity, number of functions, and potential issues:

\`\`\`
${code}
\`\`\`

Return a JSON with metrics.`;

  const result = await codeComplexity.generateContent(prompt);
  const rawResponse = result.response.text();
  // You can parse JSON if your prompt asks AI to return JSON
  return cleanAIResponse(rawResponse);
}
/**
 * Generate an explanation for a code snippet
 * @param {string} code - The code to explain
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The explanation
 */
async function generateExplanation(code, language = '') {
  const prompt = `Please explain the following ${language ? language + ' ' : ''}code snippet:

\`\`\`${language}
${code}
\`\`\`

Provide a clear, concise explanation of what this code does and how it works.`;

  const result = await codeExplainer.generateContent(prompt);
  const rawResponse = result.response.text();
  return cleanAIResponse(rawResponse);
}

module.exports = {
  generateReview,
  generateCode,
  generateComplexity,
  compareCode,
  generateTestCases,
  beautifyCode,
  debugCode,
  analyzePerformance,
  summarizeContent,
  analyzeSecurity,
  scanDependencies,
 codeMetricsAnalyzer,
  generateExplanation,
};
