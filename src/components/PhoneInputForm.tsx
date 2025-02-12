import { useState } from 'react';
import html2canvas from 'html2canvas';

type PhoneInputProps = {
  responses: Record<string, string>;
};

const PhoneInputForm = ({ responses }: PhoneInputProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const generateImage = async () => {
    const element = document.getElementById('valentine-card');
    if (element) {
      const canvas = await html2canvas(element);
      const image = canvas.toDataURL('image/png');
      return image;
    }
  };

  const handleSend = async (via: 'whatsapp' | 'twitter' | 'facebook') => {
    const imageUrl = await generateImage();
    const shareText = `❤️ Your Valentine's Message:\n${Object.entries(responses)
      .map(([q, a]) => `${q}: ${a}`)
      .join('\n')}\n\nGenerated via beemyvalentine.netlify.app`;

    if (via === 'whatsapp') {
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(shareText)}${imageUrl ? `&media=${encodeURIComponent(imageUrl)}` : ''}`);
    } else if (via === 'twitter') {
      window.open(`https://x.com/intent/post?text=${encodeURIComponent(shareText)}${imageUrl ? `&media=${encodeURIComponent(imageUrl)}` : ''}`);
    } else if (via === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Image Preview */}
      <div id="valentine-card" className="p-6 bg-pink-50 rounded-xl shadow-lg border border-pink-200">
        <div className="space-y-4">
          {Object.entries(responses).map(([question, answer]) => (
            <div key={question} className="text-pink-900">
              <h3 className="font-semibold text-lg">✨ {question}</h3>
              <p className="mt-1 whitespace-pre-wrap break-words">{answer}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-pink-500 text-center">
          Generated via beemyvalentine.netlify.app
        </p>
      </div>

      {/* Phone Input Form */}
      <div className="space-y-4">
        <input
          type="tel"
          placeholder="Enter loved one's phone number"
          className="w-full p-3 rounded-lg border-2 border-pink-300 focus:border-pink-500 focus:ring-pink-500"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        
        <textarea
          placeholder="Add a personal message (optional)"
          className="w-full p-3 rounded-lg border-2 border-pink-300 focus:border-pink-500 focus:ring-pink-500 h-32"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => handleSend('whatsapp')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2"
          >
            Send via WhatsApp
          </button>
          <button
            onClick={() => handleSend('twitter')}
            className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2"
          >
            Share on Twitter
          </button>
          <button
            onClick={() => handleSend('facebook')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2"
          >
            Share on Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneInputForm; 