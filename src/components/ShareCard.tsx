
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

      <div
        id="valentine-card"
        className="p-6 rounded-lg bg-gradient-to-br from-valentine-primary/5 to-white shadow-lg border-2 border-valentine-primary/20 space-y-6 relative overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-4 relative"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                delay: i * 0.5,
                repeat: Infinity,
              }}
            >
              <Heart className="w-6 h-6 text-valentine-primary/40" />
            </motion.div>
          ))}
          <Heart className="w-12 h-12 text-valentine-primary mx-auto animate-float" />
          <h2 className="text-3xl font-playfair font-bold text-valentine-primary">
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
              <p className="text-gray-600 bg-valentine-primary/5 p-3 rounded-md">
                {answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Input
            type="tel"
            placeholder="Enter their phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1"
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
