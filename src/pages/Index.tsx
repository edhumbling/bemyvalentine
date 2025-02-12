import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuestionSelector from "@/components/QuestionSelector";
import ValentineForm from "@/components/ValentineForm";
import ShareCard from "@/components/ShareCard";
import { FormStepper } from "../components/FormStepper";
import { PrivacyDisclaimer } from '../components/PrivacyDisclaimer';
import { Footer } from '../components/Footer';
import Header from '../components/Header';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [valentineName, setValentineName] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');

  // Sample questions - replace with your actual list
  const allQuestions = [
    "What first attracted you to me?",
    "Our favorite shared memory?",
    "What makes our connection special?",
    "How would you describe my smile?",
    "Favorite thing about my personality?",
    "Where do you see us in 5 years?",
    "My most endearing quality?",
    "What song reminds you of us?",
    "How have I changed your life?",
    "Perfect date night idea?"
  ];

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestions(prev => 
      prev.includes(question) 
        ? prev.filter(q => q !== question)
        : prev.length < 3 
          ? [...prev, question] 
          : prev
    );
  };

  const handleAnswerChange = (question: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [question]: answer }));
  };

  // Step progression handlers
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateStep = (step: number) => {
    switch(step) {
      case 1: return selectedQuestions.length === 3;
      case 2: return Object.keys(answers).length === 3;
      case 3: return valentineName.trim() && personalMessage.trim();
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-valentine-secondary to-white py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <Heart className="w-12 h-12 text-valentine-primary mx-auto animate-float" />
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-valentine-primary">
            Be My Valentine?
          </h1>
          <p className="text-lg text-gray-600">
            Express your love with a personalized message
          </p>
        </motion.div>

        {/* STEP 1: Question Selection */}
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-pink-600 text-center">
              🌹 Step 1: Choose 3 Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allQuestions.map((question) => (
                <motion.div
                  key={question}
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 rounded-lg cursor-pointer ${
                    selectedQuestions.includes(question)
                      ? 'bg-pink-600 text-white'
                      : 'bg-pink-100 hover:bg-pink-200'
                  }`}
                  onClick={() => handleQuestionSelect(question)}
                >
                  {question}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Answer Questions */}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-pink-600 text-center">
              💌 Step 2: Share Your Feelings
            </h2>

            {selectedQuestions.map((question) => (
              <div key={question} className="space-y-2">
                <label className="text-pink-600 font-semibold text-lg">
                  {question}
                </label>
                <textarea
                  value={answers[question] || ''}
                  onChange={(e) => handleAnswerChange(question, e.target.value)}
                  className="w-full p-3 rounded-lg border-2 border-pink-300 focus:border-pink-500 text-lg"
                  rows={3}
                  required
                />
              </div>
            ))}
          </div>
        )}

        {/* STEP 3: Personalize */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-pink-600 text-center">
              💖 Step 3: Personalize Your Love
            </h2>

            <div className="space-y-6">
              <div>
                <label className="text-pink-600 font-semibold text-lg block mb-3">
                  Your Valentine's Name *
                </label>
                <input
                  type="text"
                  value={valentineName}
                  onChange={(e) => setValentineName(e.target.value)}
                  className="w-full p-3 rounded-lg border-2 border-pink-300 text-lg focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="text-pink-600 font-semibold text-lg block mb-3">
                  Personal Message *
                </label>
                <textarea
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  className="w-full p-3 rounded-lg border-2 border-pink-300 text-lg focus:border-pink-500 h-32"
                  maxLength={150}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Preview & Share */}
        {currentStep === 4 && (
          <ShareCard
            answers={answers}
            valentineName={valentineName}
            personalMessage={personalMessage}
          />
        )}

        {/* Navigation Controls */}
        <div className="max-w-2xl mx-auto mt-12">
          <FormStepper
            currentStep={currentStep}
            totalSteps={4}
            onNext={handleNext}
            onPrev={handlePrev}
            nextDisabled={!validateStep(currentStep)}
          />
        </div>
      </div>

      <PrivacyDisclaimer />
      <Footer />
    </div>
  );
};

export default Index;
