import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share2, Download, Heart, Phone, Send } from "lucide-react";
import html2canvas from "html2canvas";
import { Input } from "@/components/ui/input";

interface ShareCardProps {
  answers: Record<string, string>;
  valentineName: string;
  personalMessage: string;
}

const ShareCard = ({ answers, valentineName, personalMessage }: ShareCardProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const formatMessage = () => {
    let message = `❤️ *A Special Valentine's Message for ${valentineName}* ❤️\n\n`;
    message += `${personalMessage}\n\n`;
    Object.entries(answers).forEach(([question, answer]) => {
      message += `*${question}*\n${answer}\n\n`;
    });
    message += "💝 Will you be my Valentine? 💝";
    return encodeURIComponent(message);
  };

  const handleWhatsAppShare = () => {
    if (!phoneNumber) return;
    const formattedPhone = phoneNumber.replace(/\D/g, "");
    const message = formatMessage();
    window.open(`https://wa.me/${formattedPhone}?text=${message}`, "_blank");
  };

  const renderValentinePreview = () => (
    <div id="valentine-card" className="bg-pink-50 rounded-lg p-6 shadow-md mb-8">
      {Object.entries(answers).map(([question, answer]) => (
        <div key={question} className="mb-4">
          <h3 className="text-pink-600 font-semibold">{question}</h3>
          <p className="text-pink-800 mt-1">{answer}</p>
        </div>
      ))}
    </div>
  );

  const renderPhoneInput = () => (
    <div className="space-y-2">
      <label className="text-pink-600 font-semibold block">
        You are My Valentine 💌
      </label>
      <div className="flex items-center space-x-3">
        <input
          type="tel"
          placeholder="233XXXXXXXXX (Example: Ghana)"
          className="w-full p-3 rounded-lg border-2 border-pink-300 focus:border-pink-500 text-lg"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button
          className="bg-valentine-primary hover:bg-valentine-primary/90"
          onClick={handleWhatsAppShare}
          disabled={!phoneNumber}
        >
          <Send className="w-4 h-4 mr-2" />
          Send via WhatsApp
        </Button>
      </div>
      <p className="text-sm text-pink-500 mt-1">
        🔢 Include country code without '+' (e.g., 233 for Ghana, 234 for Nigeria)
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-8"
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-playfair font-bold text-valentine-primary"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 2, -2, 0] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          You Are My Valentine!
        </motion.h2>
      </motion.div>

      {renderValentinePreview()}
      
      <div className="space-y-4">
        {renderPhoneInput()}

        <div className="flex gap-4">
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
    </div>
  );
};

export default ShareCard;
