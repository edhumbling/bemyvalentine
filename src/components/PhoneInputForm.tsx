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
    try {
      const element = document.getElementById('valentine-card');
      if (!element) return null;

      // Temporary elements
      const referral = document.createElement('div');
      referral.innerHTML = 'Generated via beemyvalentine.netlify.app';
      referral.style.position = 'absolute';
      referral.style.bottom = '10px';
      referral.style.left = '50%';
      referral.style.transform = 'translateX(-50%)';
      referral.style.color = '#fb7185';
      element.appendChild(referral);

      const canvas = await html2canvas(element);
      const image = canvas.toDataURL('image/png');
      
      referral.remove();
      return image;
    } catch (error) {
      console.error('Image generation failed:', error);
      return null;
    }
  };

  const handleDownload = async () => {
    try {
      const imageData = await generateImage();
      if (imageData) {
        const link = document.createElement('a');
        link.href = imageData;
        link.download = 'valentine.png';
        link.click();
      }
    } catch (error) {
      alert('Error generating image. Please try again.');
    }
  };

  const handleSend = async () => {
    try {
      const fullNumber = `${countryCode}${phoneNumber}`;
      const imageData = await generateImage();
      const message = `❤️ Valentine's Message:\n${
        Object.entries(responses)
          .map(([q, a]) => `${q}: ${a}`)
          .join('\n')
      }\n\nCreate yours: beemyvalentine.netlify.app`;

      window.open(
        `https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}${
          imageData ? `&media=${encodeURIComponent(imageData)}` : ''
        }`
      );
    } catch (error) {
      alert('Error sending message. Please check the number.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      {/* Valentine Card Preview */}
      <div id="valentine-card" className="bg-pink-50 rounded-lg p-6 shadow-md">
        {Object.entries(responses).map(([question, answer]) => (
          <div key={question} className="mb-4">
            <h3 className="text-pink-600 font-semibold">{question}</h3>
            <p className="text-pink-800 mt-1">{answer}</p>
          </div>
        ))}
      </div>

      {/* Phone Input Section */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-24 p-2 rounded border-pink-300 border-2"
          >
            {countries?.all?.map((c: any) => (
              <option key={c.alpha2} value={c.countryCallingCodes[0]?.replace('+', '')}>
                {c.emoji} {c.countryCallingCodes[0]}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="Phone number"
            className="flex-1 p-2 rounded border-pink-300 border-2"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="grid gap-2 md:flex md:gap-4">
          <button
            onClick={handleSend}
            className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Send via WhatsApp
          </button>
          <button
            onClick={handleDownload}
            className="bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Download Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneInputForm;