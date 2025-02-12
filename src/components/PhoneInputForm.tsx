import { useState } from 'react';
import html2canvas from 'html2canvas';
import { countries } from 'country-data'; // You'll need to install this

type PhoneInputProps = {
  responses: Record<string, string>;
};

const PhoneInputForm = ({ responses }: PhoneInputProps) => {
  const [countryCode, setCountryCode] = useState('+233');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const generateImage = async () => {
    const element = document.getElementById('valentine-card');
    if (element) {
      // Add emojis and sparkles
      const emojis = ['❤️', '💖', '💕', '✨', '🎉'];
      element.querySelectorAll('.emoji-sparkle').forEach(el => el.remove());
      
      // Add animated emojis
      emojis.forEach((emoji, index) => {
        const span = document.createElement('span');
        span.className = `emoji-sparkle absolute text-4xl animate-float`;
        span.style.left = `${Math.random() * 90}%`;
        span.style.top = `${Math.random() * 80}%`;
        span.style.animationDelay = `${index * 0.5}s`;
        span.textContent = emoji;
        element.appendChild(span);
      });

      const canvas = await html2canvas(element);
      const image = canvas.toDataURL('image/png');
      return image;
    }
  };

  const handleSend = async () => {
    const imageUrl = await generateImage();
    const fullNumber = countryCode + phoneNumber;
    const shareText = `❤️ Your Valentine's Message:\n${Object.entries(responses)
      .map(([q, a]) => `${q}: ${a}`)
      .join('\n')}\n\n**Generated via beemyvalentine.netlify.app**`;

    window.open(`https://wa.me/${fullNumber}?text=${encodeURIComponent(shareText)}${imageUrl ? `&media=${encodeURIComponent(imageUrl)}` : ''}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Valentine Card Preview */}
      <div id="valentine-card" className="p-6 bg-pink-50 rounded-xl shadow-lg border border-pink-200 relative overflow-hidden">
        {/* Sparkles background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`
              }}
            >✨</div>
          ))}
        </div>
        
        <div className="relative z-10 space-y-4">
          {Object.entries(responses).map(([question, answer]) => (
            <div key={question} className="text-pink-900">
              <h3 className="font-semibold text-lg">✨ {question}</h3>
              <p className="mt-1 whitespace-pre-wrap break-words">{answer}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-pink-500 text-center font-bold">
          Generated via beemyvalentine.netlify.app
        </p>
      </div>

      {/* Phone Input Form */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="p-3 rounded-lg border-2 border-pink-300 focus:border-pink-500"
          >
            {countries.all.map((country: any) => (
              <option key={country.alpha2} value={country.countryCallingCodes[0]}>
                {country.emoji} {country.name} ({country.countryCallingCodes[0]})
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="Phone number"
            className="w-full p-3 rounded-lg border-2 border-pink-300 focus:border-pink-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        
        <textarea
          placeholder="Add a personal message (optional)"
          className="w-full p-3 rounded-lg border-2 border-pink-300 focus:border-pink-500 h-32"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={handleSend}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2"
        >
          Send via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default PhoneInputForm; 