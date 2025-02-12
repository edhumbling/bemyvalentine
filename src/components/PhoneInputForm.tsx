import { useState } from 'react';
import html2canvas from 'html2canvas';

type PhoneInputProps = {
  responses: Record<string, string>;
};

const PhoneInputForm = ({ responses }: PhoneInputProps) => {
  const generateImage = async () => {
    const element = document.getElementById('valentine-card');
    if (element) {
      // Temporarily add the bold referral text to the image
      const referral = document.createElement('div');
      referral.innerHTML = '<strong>Generated via beemyvalentine.netlify.app</strong>';
      referral.style.position = 'absolute';
      referral.style.bottom = '10px';
      referral.style.left = '50%';
      referral.style.transform = 'translateX(-50%)';
      referral.style.fontSize = '0.8rem';
      referral.style.color = '#fb7185';
      referral.className = 'referral-text';
      element.appendChild(referral);

      // Add decorative emojis (simulated 3D emojis) and sparkles
      const emojis = ['❤️', '💖', '💕', '✨', '🎉'];
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

      // Remove temporary elements after capture
      referral.remove();
      const sparkles = element.querySelectorAll('.emoji-sparkle');
      sparkles.forEach((el) => el.remove());

      return image;
    }
  };

  // Download the generated image
  const handleDownload = async () => {
    const imageData = await generateImage();
    if (imageData) {
      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'valentine_card.png';
      link.click();
    }
  };

  // When the user clicks "Send via WhatsApp", use a prompt to ask for the contact
  const handleSend = async () => {
    const fullNumber = window.prompt(
      "Please enter the complete phone number with country code (e.g., +1234567890):"
    );
    if (!fullNumber) return;
    const imageData = await generateImage();
    const shareText = `❤️ Your Valentine's Message:\n${Object.entries(responses)
      .map(([q, a]) => `${q}: ${a}`)
      .join('\n')}\n\nGenerated via beemyvalentine.netlify.app`;
    window.open(
      `https://wa.me/${fullNumber}?text=${encodeURIComponent(shareText)}${
        imageData ? `&media=${encodeURIComponent(imageData)}` : ''
      }`
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

      {/* Buttons: Download Responses and Send via WhatsApp (stacked vertically) */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleDownload}
          className="w-fit bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md mx-auto"
        >
          Download Responses
        </button>
        <button
          onClick={handleSend}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full"
        >
          Send via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default PhoneInputForm;