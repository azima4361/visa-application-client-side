import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lightbulb, Compass, ArrowRight } from "lucide-react";
import useTheme from "../hooks/UseTheme"; 

const steps = [
  {
    question: "What is your main purpose of travel?",
    options: ["Study", "Work", "Tourism", "Migration"],
  },
  {
    question: "What’s your preferred region?",
    options: ["Europe", "North America", "Asia", "Australia"],
  },
  {
    question: "How long do you plan to stay?",
    options: [
      "Short Term (0-6 months)",
      "Medium Term (6-24 months)",
      "Long Term (2+ years)",
    ],
  },
];

const VisaRecommend = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleOptionClick = (option) => {
    const updatedAnswers = [...answers, option];
    setAnswers(updatedAnswers);
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      navigate("/all");
    }
  };

  const currentStep = steps[stepIndex];

  return (
    <section
      className={`my-20 px-6 max-w-5xl mx-auto py-16 rounded-3xl shadow-xl border ${
        isDark
          ? "bg-gray-900 text-white border-gray-800"
          : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-900 border-blue-100"
      }`}
    >
     
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">
          Find the Right Visa for You
        </h2>
        <p
          className={`text-lg max-w-3xl mx-auto ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Not sure which visa fits your journey? Our smart assistant will guide
          you based on your goals — whether you're aiming to{" "}
          <strong>study</strong>, <strong>work</strong>, <strong>travel</strong>
          , or <strong>migrate</strong>.
        </p>
      </div>

     
      <div className="flex flex-col md:flex-row items-center justify-around gap-6 mb-12">
        <div className="flex items-center space-x-4">
          <Lightbulb className="w-10 h-10 text-yellow-500" />
          <span
            className={`text-lg font-medium ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            AI-Powered Recommendations
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Compass className="w-10 h-10 text-purple-600" />
          <span
            className={`text-lg font-medium ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Personalized Visa Options
          </span>
        </div>
      </div>

     
      <div
        className={`rounded-xl shadow-lg px-6 py-10 border ${
          isDark ? "bg-gray-900 border-gray-700" : "bg-white border-blue-200"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3
              className={`text-xl font-semibold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {currentStep.question}
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {currentStep.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOptionClick(option)}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition hover:bg-blue-700"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

       
        <div className="mt-8 flex justify-center gap-2">
          {steps.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx <= stepIndex
                  ? "bg-blue-600"
                  : isDark
                  ? "bg-gray-600"
                  : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>

      
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/all")}
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700 transition px-6 py-3 text-white text-lg font-semibold rounded-lg shadow-md"
        >
          Skip & Try Recommender <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default VisaRecommend;
