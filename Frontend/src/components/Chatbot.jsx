import React, { useState, useEffect, useRef } from "react";
import "./css/Chatbot.css"; // your CSS file

const FAQ = [
  {
    triggers: [
      "hi",
      "hello",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
    ],
    response: "Hello 👋! Welcome to <b>OMEX</b>. How can I help you today?",
  },
  {
    triggers: ["thanks", "thank you", "thx"],
    response: "You're welcome! 😊 Always here to help.",
  },
  {
    triggers: ["bye", "goodbye", "see you", "later"],
    response: "Goodbye! 👋 Have a productive coding day!",
  },
  {
    triggers: ["what is omex", "omex", "about omex"],
    response:
      "🚀 <b>OMEX</b> is your AI co-pilot for coding!<br>It helps developers <b>optimize</b>, <b>generate</b> and <b>analyze</b> their code with confidence and speed.",
  },
  {
    triggers: ["what tools do you offer", "tools", "omex tools", "features"],
    response: `🛠️ <b>OMEX offers a suite of AI-powered tools:</b><br>
🧪 <b>Test Case Generator</b><br>
✨ <b>Code Beautifier</b><br>
🐞 <b>Error Debugger</b><br>
⚡ <b>Performance Analyzer</b><br>
📄 <b>Content Summarizer</b><br>
🛡️ <b>Security Vulnerability Scanner</b><br>
🔗 <b>Dependency Scanner</b><br>
📈 <b>Code Metrics Analyzer</b><br>
Explore the Tools page for more!`,
  },
  {
    triggers: ["how does it work", "usage", "how to use omex"],
    response: `🤖 <b>It's as easy as 1-2-3!</b><br>
- <b>Input Your Code:</b> Paste or write your code in the desired tool.<br>
- <b>AI Analysis:</b> OMEX analyzes it for improvements.<br>
- <b>Get Results:</b> Receive instant feedback, optimizations, or generated code!`,
  },
  {
    triggers: ["is omex free", "free", "pricing", "cost"],
    response:
      "🎉 <b>OMEX offers a generous free tier</b> so you can explore essential features. For advanced use, Pro plans are available.",
  },
  {
    triggers: ["do i need an account", "account", "signup", "register"],
    response:
      "💡 <b>No account is needed to start!</b> You can use many tools immediately. Create a free account to save history and unlock more features.",
  },
  {
    triggers: ["what languages are supported", "languages", "coding languages"],
    response:
      "🌐 <b>OMEX supports multiple languages:</b> Python, JavaScript, Java, C++ & C#, Ruby & PHP and more are being added!",
  },
  {
    triggers: ["how can i get support", "support", "help", "contact"],
    response:
      "💬 <b>Need help?</b> Visit our Contact page via the main menu or footer for support options.",
  },
  {
    triggers: ["is my code secure", "security", "secure", "privacy"],
    response:
      "🛡️ <b>Your code's security is top priority!</b> All data is encrypted. Code is processed securely and never shared unless you save it to your account.",
  },
  {
    triggers: [],
    response: "❌ Sorry, I didn’t understand. Please try asking differently 🙂",
  },
];

const QUICK_QUESTIONS = [
  "What is OMEX?",
  "What tools do you offer?",
  "How does it work?",
  "Is OMEX free to use?",
  "Do I need an account?",
  "What languages are supported?",
  "How can I get support?",
  "Is my code secure with OMEX?",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am Omex Assistant. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [showFirstFour, setShowFirstFour] = useState(true);

  const chatBodyRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const findResponse = (text) => {
    const lc = text.toLowerCase();

    const sortedFAQ = [...FAQ].sort((a, b) => {
      const maxA = Math.max(...a.triggers.map((t) => t.length), 0);
      const maxB = Math.max(...b.triggers.map((t) => t.length), 0);
      return maxB - maxA;
    });

    for (const item of sortedFAQ) {
      if (item.triggers.some((trig) => lc.includes(trig.toLowerCase()))) {
        return item.response;
      }
    }

    return FAQ.find((i) => i.triggers.length === 0).response;
  };

  const sendMessage = (customText) => {
    const text = customText || input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");

    setTimeout(() => {
      const response = findResponse(text);
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 500);
  };

  const toggleQuickQuestions = () => {
    setShowFirstFour(!showFirstFour);
  };

  const renderQuickQuestions = () => {
    const questionsToShow = showFirstFour
      ? QUICK_QUESTIONS.slice(0, 4)
      : QUICK_QUESTIONS.slice(4, 8);
    return (
      <>
        {questionsToShow.map((q, i) => (
          <button
            key={i}
            className="quick-question-btn"
            onClick={() => sendMessage(q)}
          >
            {q}
          </button>
        ))}
        <button
          className="quick-question-btn toggle-btn"
          onClick={toggleQuickQuestions}
        >
          {showFirstFour ? "See More" : "See Less"}
        </button>
      </>
    );
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window open">
          <div className="chatbot-header">
            <img
              src="/omex-logo-white.svg"
              alt="Omex Logo"
              className="chatbot-header-logo"
            />
            <span>Omex</span>
            <button onClick={toggleChat}>
              <img
                src="public/close_small_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                alt="Close"
              />
            </button>
          </div>

          <div className="chatbot-body" ref={chatBodyRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.sender}-msg`}>
                <span dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ))}
          </div>

          <div className="quick-questions">{renderQuickQuestions()}</div>

          <div className="chatbot-input-container">
            <input
              type="text"
              value={input}
              placeholder="Type your query..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={() => sendMessage()}>
              <img src="public/send.png" alt="Send" />
            </button>
          </div>
        </div>
      )}

      <button className="chatbot-toggle-btn" onClick={toggleChat}>
        <img src="public/omex-logo-white.svg" alt="omexbutton" />
      </button>
    </div>
  );
};

export default Chatbot;
