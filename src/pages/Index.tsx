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

const questions = [
  "What's your favorite memory of us together?",
  "When did you first realize you had feelings for me?",
  "What's the one thing you love most about our relationship?",
  "Where do you see us in 5 years?",
  "What's the most romantic thing I've done for you?",
  "What song reminds you of us?",
  "What's your dream date with me?",
  "What's the little thing I do that makes you smile?",
  "What's your favorite way to show me you care?",
  "If you could relive one moment with me, what would it be?",
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [valentineName, setValentineName] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');

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

  const handleQuestionSelect = (question: string) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter((q) => q !== question));
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleAnswerChange = (question: string, value: string) => {
    setAnswers({ ...answers, [question]: value });
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
              {questions.map((question) => (
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
