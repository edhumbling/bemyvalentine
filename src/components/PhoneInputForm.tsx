import { useState } from 'react';
import html2canvas from 'html2canvas';
import { countries } from 'country-data';

type PhoneInputProps = {
  responses: Record<string, string>;
};

const PhoneInputForm = ({ responses }: PhoneInputProps) => {
  const [countryCode, setCountryCode] = useState('233');
  const [phoneNumber, setPhoneNumber] = useState('');

  const generateImage = async () => {
    const element = document.getElementById('valentine-card');
    if (element) {
      const referral = document.createElement('div');
      referral.innerHTML = `
        <strong>💝 Spread the Love! 💝</strong><br>
        Create your own sweet message at<br>
        <em>beemyvalentine.netlify.app</em>
      `;
      referral.style.position = 'absolute';
      referral.style.bottom = '10px';
      referral.style.left = '50%';
      referral.style.transform = 'translateX(-50%)';
      referral.style.fontSize = '1rem';
      referral.style.color = '#fb7185';
      referral.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
      referral.style.padding = '4px 8px';
      referral.style.borderRadius = '4px';
      element.appendChild(referral);

      const emojis = ['💖', '💞', '🌸', '🌠', '💫', '🥰', '😍', '💝'];
      emojis.forEach(() => {
        const span = document.createElement('span');
        span.className = 'emoji-sparkle';
        span.style.position = 'absolute';
        span.style.fontSize = '2rem';
        span.style.left = `${Math.random() * 80 + 10}%`;
        span.style.top = `${Math.random() * 80 + 10}%`;
        span.style.textShadow = '1px 1px 3px rgba(0,0,0,0.3)';
        span.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        element.appendChild(span);
      });

      const canvas = await html2canvas(element);
      const image = canvas.toDataURL('image/png');

      referral.remove();
      const sparkles = element.querySelectorAll('.emoji-sparkle');
      sparkles.forEach((el) => el.remove());

      return image;
    }
  };

  const handleDownload = async () => {
    const imageData = await generateImage();
    if (imageData) {
      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'valentine_card.png';
      link.click();
    }
  };

  const handleSend = async () => {
    const fullNumber = `${countryCode}${phoneNumber}`;
    const imageData = await generateImage();
    
    const shareText = `💌 My Dearest Valentine 💘

✨ Your Special Message ✨
${Object.entries(responses)
  .map(([q, a]) => `🌹 ${q}:\n${a}`)
  .join('\n\n')}

💖 You Mean the World to Me 💖
This Valentine's Day and always, my heart is yours.

📱 Create Your Own Sweet Message:
beemyvalentine.netlify.app`;

    window.open(
      `https://wa.me/${fullNumber}?text=${encodeURIComponent(
        shareText
      )}${imageData ? `&media=${encodeURIComponent(imageData)}` : ''}`
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Valentine Card Preview */}
      <div
        id="valentine-card"
        className="p-6 bg-pink-50 rounded-xl shadow-lg border border-pink-200 relative overflow-hidden"
      >
        <div className="relative z-10 space-y-4">
          {Object.entries(responses).map(([question, answer]) => (
            <div key={question} className="text-pink-900">
              <h3 className="font-semibold text-lg">✨ {question}</h3>
              <p className="mt-1 whitespace-pre-wrap break-words">{answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* "You are My Valentine" Section */}
      <div className="flex flex-col space-y-4">
        <label className="font-semibold text-pink-900 text-lg">
          You are My Valentine
        </label>
        <div className="flex gap-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="p-2 rounded-lg border-2 border-pink-300 focus:border-pink-500 w-20"
          >
            {countries.all.map((country: any) => (
              <option
                key={country.alpha2}
                value={country.countryCallingCodes[0].replace('+', '')}
              >
                {country.emoji} {country.countryCallingCodes[0]}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="Enter phone number"
            className="flex-grow p-2 rounded-lg border-2 border-pink-300 focus:border-pink-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Buttons: Uniform and responsive */}
        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={handleSend}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors"
          >
            Send via WhatsApp
          </button>
          <button
            onClick={handleDownload}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg transition-colors"
          >
            Download Responses
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneInputForm;