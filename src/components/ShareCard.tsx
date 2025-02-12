
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share2, Download, Heart } from "lucide-react";
import html2canvas from "html2canvas";

interface ShareCardProps {
  answers: Record<string, string>;
  valentineName: string;
  personalMessage: string;
}

const ShareCard = ({ answers, valentineName, personalMessage }: ShareCardProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("valentine-card");
      if (element) {
        const canvas = await html2canvas(element);
        const link = document.createElement("a");
        link.download = "valentine-message.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
    setIsGenerating(false);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "My Valentine's Message",
        text: `A special Valentine's message for ${valentineName}`,
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div
        id="valentine-card"
        className="p-6 rounded-lg bg-white shadow-lg border-2 border-valentine-primary/20 space-y-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-4"
        >
          <Heart className="w-8 h-8 text-valentine-primary mx-auto animate-float" />
          <h2 className="text-2xl font-playfair font-bold text-valentine-primary">
            Dear {valentineName}
          </h2>
          <p className="text-gray-600 italic">{personalMessage}</p>
        </motion.div>

        <div className="space-y-4">
          {Object.entries(answers).map(([question, answer], index) => (
            <motion.div
              key={question}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="space-y-2"
            >
              <h3 className="font-medium text-gray-700">{question}</h3>
              <p className="text-gray-600 bg-valentine-secondary/20 p-3 rounded-md">
                {answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          className="flex-1 bg-valentine-primary hover:bg-valentine-primary/90"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button
          className="flex-1 bg-valentine-primary hover:bg-valentine-primary/90"
          onClick={handleDownload}
          disabled={isGenerating}
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default ShareCard;
