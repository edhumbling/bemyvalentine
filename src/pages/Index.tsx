import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuestionSelector from "@/components/QuestionSelector";
import ValentineForm from "@/components/ValentineForm";
import ShareCard from "@/components/ShareCard";
import { FormStepper } from "../components/FormStepper";

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
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [valentineName, setValentineName] = useState("");
  const [personalMessage, setPersonalMessage] = useState("");
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3; // Update this with your actual number of steps

  const handleQuestionSelection = (questions: string[]) => {
    setSelectedQuestions(questions);
    setStep(1);
  };

  const handleAnswersSubmit = (newAnswers: Record<string, string>) => {
    setAnswers(newAnswers);
    setStep(2);
  };

  const handleValentineSubmit = (name: string, message: string) => {
    setValentineName(name);
    setPersonalMessage(message);
    setStep(3);
  };

  const handleNext = () => {
    if (currentStep === 1 && !valentineName.trim()) {
      alert("Please enter your Valentine's name");
      return;
    }
    if (currentStep === 2 && !personalMessage.trim()) {
      alert("Please write a personal message");
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
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

        <Card className="p-6 backdrop-blur-sm bg-white/80 shadow-xl border-valentine-primary/20">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-pink-600 text-center">
                Create Your Valentine
              </h1>
              <div>
                <label className="text-pink-600 font-semibold block mb-2">
                  Your Valentine's Name *
                </label>
                <input
                  type="text"
                  value={valentineName}
                  onChange={(e) => setValentineName(e.target.value)}
                  className="w-full p-3 rounded-lg border-2 border-pink-300"
                  required
                />
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-pink-600 text-center">
                Personalize Your Message
              </h2>
              <div>
                <label className="text-pink-600 font-semibold block mb-2">
                  Personal Message *
                </label>
                <textarea
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  className="w-full p-3 rounded-lg border-2 border-pink-300 h-32"
                  maxLength={100}
                  required
                />
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-pink-600 text-center">
                Review & Share
              </h2>
              <ShareCard 
                answers={answers} 
                valentineName={valentineName}
                personalMessage={personalMessage}
              />
            </div>
          )}
        </Card>

        <FormStepper
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </div>
  );
};

export default Index;
