import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormStepperProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export const FormStepper = ({ currentStep, totalSteps, onNext, onPrev }: FormStepperProps) => {
  return (
    <div className="flex justify-between items-center mt-8 gap-4">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={currentStep === 1}
        className="gap-1 bg-pink-100 hover:bg-pink-200 text-pink-600 border-pink-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="text-pink-600 font-medium">
        Step {currentStep} of {totalSteps}
      </div>

      <Button
        variant="outline"
        onClick={onNext}
        className="gap-1 bg-pink-100 hover:bg-pink-200 text-pink-600 border-pink-300"
      >
        {currentStep === totalSteps ? 'Complete' : 'Next'}
        {currentStep < totalSteps && <ArrowRight className="h-4 w-4" />}
      </Button>
    </div>
  );
};