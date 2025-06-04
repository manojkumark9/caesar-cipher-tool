
import React, { useState, useCallback } from 'react';

// SVG Icons (Heroicons)
const LockClosedIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3A5.25 5.25 0 0 0 12 1.5Zm-3.75 5.25v3h7.5v-3a3.75 3.75 0 0 0-7.5 0Z" clipRule="evenodd" />
  </svg>
);

const LockOpenIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9V6.75A5.25 5.25 0 0 1 18 1.5Z" />
  </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.9h1.368c1.603 0 2.816 1.336 2.816 2.9Zm-1.482.227a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.227a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.227ZM9.75 4.478v.227a.75.75 0 0 0 .75.75h.008a.75.75 0 0 0 .75-.75v-.227a.75.75 0 0 0-.75-.75h-.008a.75.75 0 0 0-.75.75Z" clipRule="evenodd" />
  </svg>
);

const CaesarCipherTool: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [shift, setShift] = useState<number>(3);
  const [outputText, setOutputText] = useState<string>('');

  const applyCaesarCipher = useCallback((text: string, shiftAmount: number, encrypt: boolean): string => {
    const s = encrypt ? shiftAmount : -shiftAmount;
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      const charCode = char.charCodeAt(0);

      if (char >= 'A' && char <= 'Z') {
        result += String.fromCharCode((charCode - 65 + s % 26 + 26) % 26 + 65);
      } else if (char >= 'a' && char <= 'z') {
        result += String.fromCharCode((charCode - 97 + s % 26 + 26) % 26 + 97);
      } else {
        result += char; // Non-alphabetic characters remain unchanged
      }
    }
    return result;
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleShiftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
        setShift(value);
    } else if (e.target.value === '') {
        setShift(0); // Or some default, or handle as error
    }
  };
  
  const handleEncrypt = () => {
    if (shift < 0) {
        alert("Shift value must be a non-negative integer.");
        return;
    }
    setOutputText(applyCaesarCipher(inputText, shift, true));
  };

  const handleDecrypt = () => {
    if (shift < 0) {
        alert("Shift value must be a non-negative integer.");
        return;
    }
    setOutputText(applyCaesarCipher(inputText, shift, false));
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setShift(3);
  };

  return (
    <div className="w-full max-w-2xl bg-slate-800 shadow-2xl rounded-xl p-6 md:p-10 transform transition-all duration-500 hover:scale-[1.01]">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-cyan-400 mb-8">
        Caesar Cipher Tool
      </h1>

      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <label htmlFor="inputText" className="block text-sm font-medium text-slate-300 mb-1">
            Enter your message:
          </label>
          <textarea
            id="inputText"
            value={inputText}
            onChange={handleInputChange}
            rows={5}
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-slate-100 placeholder-slate-400 transition-colors duration-150"
            placeholder="Type or paste your text here..."
          />
        </div>

        <div>
          <label htmlFor="shiftValue" className="block text-sm font-medium text-slate-300 mb-1">
            Enter shift value (e.g., 3):
          </label>
          <input
            type="number"
            id="shiftValue"
            value={shift}
            onChange={handleShiftChange}
            min="0" // Allow 0, which means no shift. Non-negative.
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-slate-100 placeholder-slate-400 transition-colors duration-150"
            placeholder="Shift value"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <button
            onClick={handleEncrypt}
            disabled={!inputText.trim() || shift < 0}
            className="flex items-center justify-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            <LockClosedIcon className="w-5 h-5 mr-2" />
            Encrypt
          </button>
          <button
            onClick={handleDecrypt}
            disabled={!inputText.trim() || shift < 0}
            className="flex items-center justify-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            <LockOpenIcon className="w-5 h-5 mr-2" />
            Decrypt
          </button>
          <button
            onClick={handleClear}
            className="flex items-center justify-center px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-md shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            <TrashIcon className="w-5 h-5 mr-2" />
            Clear All
          </button>
        </div>

        {/* Output Section */}
        {outputText && (
          <div className="pt-4">
            <label htmlFor="outputText" className="block text-sm font-medium text-slate-300 mb-1">
              Result:
            </label>
            <textarea
              id="outputText"
              value={outputText}
              readOnly
              rows={5}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 cursor-default"
              placeholder="Encrypted/decrypted text will appear here..."
            />
          </div>
        )}
      </div>
      <footer className="mt-10 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Caesar Cipher Tool. Shift value is applied modulo 26.</p>
        <p>Non-alphabetic characters are preserved.</p>
      </footer>
    </div>
  );
};

export default CaesarCipherTool;
