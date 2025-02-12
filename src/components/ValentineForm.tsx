
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ValentineFormProps {
  questions: string[];
  onSubmit: (answers: Record<string, string>) => void;
}

const ValentineForm = ({ questions, onSubmit }: ValentineFormProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleChange = (question: string, answer: string) => {
    setAnswers({ ...answers, [question]: answer });
  };

  const isComplete = questions.every((q) => answers[q]?.trim());

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-valentine-primary text-center">
        Share Your Feelings
      </h2>
      <div className="space-y-6">
        {questions.map((question, index) => (
          <motion.div
            key={question}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="space-y-2"
          >
            <label className="block text-gray-700 font-medium">{question}</label>
            <Textarea
              value={answers[question] || ""}
              onChange={(e) => handleChange(question, e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-3 border rounded-md h-32"
            />
          </motion.div>
        ))}
      </div>
      <Button
        className="w-full bg-valentine-primary hover:bg-valentine-primary/90 disabled:opacity-50"
        onClick={() => onSubmit(answers)}
        disabled={!isComplete}
      >
        Continue
      </Button>
    </div>
  );
};

export default ValentineForm;
