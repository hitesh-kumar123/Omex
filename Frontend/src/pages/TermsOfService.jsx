import React, { useState, useEffect } from "react";
import {
  FaFileContract,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import Loader from "../components/Loader";

const TermsOfService = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lastUpdated = "June 15, 2023";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: (
        <>
          <p className="mb-4">
            By accessing or using OMEX ("the Service"), you agree to be bound by
            these Terms of Service ("Terms"). If you do not agree to these
            Terms, please do not use the Service.
          </p>
          <p>
            We reserve the right to modify these Terms at any time. Your
            continued use of the Service after any such changes constitutes your
            acceptance of the new Terms.
          </p>
        </>
      ),
    },
    {
      title: "2. Description of Service",
      content: (
        <p>
          OMEX provides a platform for code optimization, generation, analysis,
          and other developer tools powered by artificial intelligence. The
          Service may include various features and functionalities that may be
          modified, updated, or discontinued at our discretion.
        </p>
      ),
    },
    {
      title: "3. User Accounts",
      content: (
        <>
          <p className="mb-4">
            Some features of the Service may require you to create an account.
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account.
          </p>
          <p className="mb-4">
            You agree to provide accurate and complete information when creating
            your account and to update your information to keep it accurate and
            current.
          </p>
          <p>
            We reserve the right to suspend or terminate your account if any
            information provided is found to be inaccurate, incomplete, or
            violates these Terms.
          </p>
        </>
      ),
    },
    {
      title: "4. User Content",
      content: (
        <>
          <p className="mb-4">
            You retain ownership of any content you submit to the Service,
            including code, text, and other materials ("User Content"). By
            submitting User Content, you grant us a worldwide, non-exclusive,
            royalty-free license to use, reproduce, modify, adapt, publish, and
            display such content for the purpose of providing and improving the
            Service.
          </p>
          <p>
            You represent and warrant that you have all necessary rights to
            submit your User Content and that it does not violate any
            third-party rights or applicable laws.
          </p>
        </>
      ),
    },
    {
      title: "5. Prohibited Conduct",
      content: (
        <>
          <p className="mb-4">You agree not to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Use the Service for any illegal purpose or in violation of any
              laws
            </li>
            <li>Infringe upon the intellectual property rights of others</li>
            <li>
              Attempt to gain unauthorized access to the Service or its systems
            </li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Upload malicious code or content</li>
            <li>Impersonate any person or entity</li>
            <li>Collect user information without consent</li>
            <li>Use the Service to generate harmful or malicious code</li>
          </ul>
        </>
      ),
    },
    {
      title: "6. Intellectual Property",
      content: (
        <>
          <p className="mb-4">
            The Service and its original content, features, and functionality
            are owned by OMEX and are protected by international copyright,
            trademark, patent, trade secret, and other intellectual property
            laws.
          </p>
          <p>
            Our trademarks and trade dress may not be used in connection with
            any product or service without our prior written consent.
          </p>
        </>
      ),
    },
    {
      title: "7. Limitation of Liability",
      content: (
        <>
          <p className="mb-4">
            To the maximum extent permitted by law, OMEX shall not be liable for
            any indirect, incidental, special, consequential, or punitive
            damages, including but not limited to, loss of profits, data, use,
            goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Your access to or use of or inability to access or use the Service
            </li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>
              Unauthorized access, use, or alteration of your transmissions or
              content
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "8. Disclaimer of Warranties",
      content: (
        <>
          <p className="mb-4">
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis
            without any warranties of any kind, either express or implied,
            including but not limited to, the implied warranties of
            merchantability, fitness for a particular purpose, or
            non-infringement.
          </p>
          <p>
            We do not warrant that the Service will be uninterrupted, secure, or
            error-free, that defects will be corrected, or that the Service is
            free of viruses or other harmful components.
          </p>
        </>
      ),
    },
    {
      title: "9. Governing Law",
      content: (
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of the United States, without regard to its conflict of law
          provisions.
        </p>
      ),
    },
    {
      title: "10. Contact Us",
      content: (
        <>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="p-4 rounded-lg bg-opacity-20 bg-blue-500 border border-blue-400">
            <p className="mb-2 flex items-center">
              <span className="font-semibold mr-2">Email:</span>
              <a
                href="mailto:legal@omex.com"
                className="text-blue-400 hover:underline flex items-center"
              >
                legal@omex.com
                <FaExternalLinkAlt className="ml-1 text-xs" />
              </a>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Address:</span> 123 Tech Street,
              San Francisco, CA 94105, USA
            </p>
          </div>
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        {/* <Loader
          fullscreen
          size="xl"
          color="purple"
          text="Our Terms Of Service..."
        /> */}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-b from-blue-50 to-gray-100 text-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div
              className={`p-4 rounded-full ${
                isDark ? "bg-blue-900 bg-opacity-30" : "bg-blue-100"
              } transition-all duration-300 transform hover:scale-105`}
            >
              <FaFileContract className="text-blue-500 text-5xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Terms of Service
          </h1>
          <p
            className={`max-w-2xl mx-auto text-lg ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Terms Content */}
        <div
          className={`rounded-xl shadow-xl overflow-hidden ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          {sections.map((section, index) => (
            <section
              key={index}
              id={`section-${index}`}
              className={`border-b ${
                isDark ? "border-gray-700" : "border-gray-200"
              } transition-colors duration-300`}
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                aria-expanded={activeSection === index}
              >
                <h2 className="text-xl font-semibold pr-4">{section.title}</h2>
                <span className="flex-shrink-0">
                  {activeSection === index ? (
                    <FaChevronUp className="text-blue-500" />
                  ) : (
                    <FaChevronDown className="text-blue-500" />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
                style={{
                  maxHeight: activeSection === index ? "1000px" : "0px",
                  opacity: activeSection === index ? 1 : 0,
                }}
              >
                <div className="px-6 pb-6">{section.content}</div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
