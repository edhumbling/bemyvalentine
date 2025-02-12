import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuestionSelector from "@/components/QuestionSelector";
import ValentineForm from "@/components/ValentineForm";
import ShareCard from "@/components/ShareCard";
import Confetti from "react-confetti";

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
  const [showConfetti, setShowConfetti] = useState(false);
  const [showNoMessage, setShowNoMessage] = useState(false);

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

  const handleYesClick = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setStep(1);
    }, 3000);
  };

  const handleNoClick = () => {
    setShowNoMessage(true);
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
            Will you be my Valentine?
          </h1>
          <div className="flex justify-center space-x-4">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleYesClick}
            >
              Yes
            </Button>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={handleNoClick}
            >
              No
            </Button>
          </div>
          {showNoMessage && (
            <p className="text-lg text-gray-600 mt-4">
              Okay, that's fine! I hope to find my Valentine soon! Thanks for letting me know.
            </p>
          )}
        </motion.div>

        {showConfetti && <Confetti />}

        <Card className="p-6 backdrop-blur-sm bg-white/80 shadow-xl border-valentine-primary/20">
          {step === 0 && (
            <QuestionSelector
              allQuestions={questions}
              onSelect={handleQuestionSelection}
            />
          )}
          {step === 1 && (
            <ValentineForm
              questions={selectedQuestions}
              onSubmit={handleAnswersSubmit}
            />
          )}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-playfair font-bold text-valentine-primary text-center">
                Who's Your Valentine?
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Their name"
                  className="w-full p-3 border rounded-md"
                  value={valentineName}
                  onChange={(e) => setValentineName(e.target.value)}
                />
                <textarea
                  placeholder="Write a personal message..."
                  className="w-full p-3 border rounded-md h-32"
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                />
                <Button
                  className="w-full bg-valentine-primary hover:bg-valentine-primary/90"
                  onClick={() => handleValentineSubmit(valentineName, personalMessage)}
                >
                  Create Valentine
                </Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <ShareCard
              answers={answers}
              valentineName={valentineName}
              personalMessage={personalMessage}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Index;
