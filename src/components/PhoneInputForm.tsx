import { useState } from 'react';

type PhoneInputProps = {
  responses: Record<string, string>;
};

const PhoneInputForm = ({ responses }: PhoneInputProps) => {
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
    </div>
  );
};

export default PhoneInputForm;