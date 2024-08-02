import { useState, useCallback } from 'react';
import './App.css';
import 'tailwindcss/tailwind.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_+-={}[]|:;';

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
    setCopied(false); // Reset the copied state when generating a new password
  }, [length, numberAllowed, charAllowed]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
      <div className="bg-gray-700 rounded-lg shadow-lg p-6 w-80">
        <div className="mb-4">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full p-2 mb-4 text-lg text-center bg-gray-900 border border-gray-600 rounded"
          />
          <div className="flex justify-between">
            <button
              onClick={passwordGenerator}
              className="w-1/2 p-2 bg-orange-500 hover:bg-orange-600 rounded text-white font-semibold transition duration-300 mr-1"
            >
              Generate
            </button>
            <button
              onClick={copyToClipboard}
              className={`w-1/2 p-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold transition duration-300 ml-1 ${copied ? 'bg-green-700' : ''}`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Length: {length}</label>
          <input
            type="range"
            min="1"
            max="20"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">
            Include Numbers:
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
              className="ml-2"
            />
          </label>
        </div>
        <div>
          <label className="block mb-1">
            Include Special Characters:
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={(e) => setCharAllowed(e.target.checked)}
              className="ml-2"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
