import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface QuestionSelectorProps {
  allQuestions: string[];
  onSelect: (questions: string[]) => void;
}

const QuestionSelector = ({ allQuestions, onSelect }: QuestionSelectorProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (question: string) => {
    if (selected.includes(question)) {
      setSelected(selected.filter((q) => q !== question));
    } else if (selected.length < 3) {
      setSelected([...selected, question]);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-valentine-primary text-center">
        Choose 3 Questions
      </h2>
      <div className="space-y-4">
        {allQuestions.map((question, index) => (
          <motion.div
            key={question}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-valentine-secondary/20 transition-colors"
          >
            <Checkbox
              id={question}
              checked={selected.includes(question)}
              onCheckedChange={() => handleToggle(question)}
              disabled={selected.length >= 3 && !selected.includes(question)}
            />
            <label
              htmlFor={question}
              className="text-gray-700 cursor-pointer select-none"
            >
              {question}
            </label>
          </motion.div>
        ))}
      </div>
      <Button
        className="w-full bg-valentine-primary hover:bg-valentine-primary/90 disabled:opacity-50"
        onClick={() => onSelect(selected)}
        disabled={selected.length !== 3}
      >
        Continue
      </Button>
    </div>
  );
};

export default QuestionSelector;
