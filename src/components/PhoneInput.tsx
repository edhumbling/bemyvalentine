import { useState } from 'react';

const PhoneInput = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="space-y-2">
        <label className="text-pink-600 font-semibold block">
          You are My Valentine 💌
        </label>
        <input
          type="tel"
          placeholder="233XXXXXXXXX (Example: Ghana)"
          className="w-full p-3 rounded-lg border-2 border-pink-300 focus:border-pink-500 text-lg"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <p className="text-sm text-pink-500 mt-1">
          🔢 Include country code without '+' (e.g., 233 for Ghana, 234 for Nigeria)
        </p>
      </div>
    </div>
  );
};

export default PhoneInput; 