'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      let newValue = previousValue;

      switch (operation) {
        case '+':
          newValue = previousValue + inputValue;
          break;
        case '-':
          newValue = previousValue - inputValue;
          break;
        case '×':
          newValue = previousValue * inputValue;
          break;
        case '÷':
          newValue = previousValue / inputValue;
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const Button = ({ children, onClick, className = '' }: { children: React.ReactNode; onClick: () => void; className?: string }) => (
    <button
      onClick={onClick}
      className={`h-16 rounded-lg font-semibold text-xl transition-all hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors ${
      isLightMode 
        ? 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50' 
        : 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
    }`}>
      <div className={`w-full max-w-sm backdrop-blur-xl rounded-3xl shadow-2xl p-6 border ${
        isLightMode 
          ? 'bg-white/80 border-gray-200' 
          : 'bg-black/40 border-white/10'
      }`}>
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isLightMode
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {isLightMode ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
        <div className={`mb-6 rounded-2xl p-6 min-h-[100px] flex items-end justify-end ${
          isLightMode ? 'bg-gray-100' : 'bg-black/50'
        }`}>
          <div className={`text-5xl font-light tracking-wider break-all text-right ${
            isLightMode ? 'text-gray-900' : 'text-white'
          }`}>
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Button onClick={clear} className={`col-span-2 ${
            isLightMode 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-blue-500/80 hover:bg-blue-500 text-white'
          }`}>
            AC
          </Button>
          <Button onClick={() => performOperation('÷')} className={`${
            isLightMode 
              ? 'bg-orange-800 hover:bg-orange-900 text-white' 
              : 'bg-orange-500/80 hover:bg-orange-500 text-white'
          }`}>
            ÷
          </Button>
          <Button onClick={() => performOperation('×')} className={`${
            isLightMode 
              ? 'bg-orange-800 hover:bg-orange-900 text-white' 
              : 'bg-orange-500/80 hover:bg-orange-500 text-white'
          }`}>
            ×
          </Button>

          <Button onClick={() => inputDigit('7')} className={`${
            isLightMode 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-900' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}>
            7
          </Button>
          <Button onClick={() => inputDigit('8')} className={`${
            isLightMode 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-900' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}>
            8
          </Button>
          <Button onClick={() => inputDigit('9')} className={`${
            isLightMode 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-900' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}>
            9
          </Button>
          <Button onClick={() => performOperation('-')} className={`${
            isLightMode 
              ? 'bg-orange-800 hover:bg-orange-900 text-white' 
              : 'bg-orange-500/80 hover:bg-orange-500 text-white'
          }`}>
            −
          </Button>

          <Button onClick={() => inputDigit('4')} className={`${
            isLightMode 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-900' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}>
            4
          </Button>
          <Button onClick={() => inputDigit('5')} className={`${
            isLightMode 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-900' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}>
            5
          </Button>
          <Button onClick={() => inputDigit('6')} className={`${
            isLightMode 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-900' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}>
            6
          </Button>
          <Button onClick={() => performOperation('+')} className={`${
            isLightMode 
              ? 'bg-orange-800 hover:bg-orange-900 text-white' 
              : 'bg-orange-500/80 hover:bg-orange-500 text-white'
          }`}>
            +
          </Button>

          <Button onClick={() => inputDigit('1')} className={`${
            isLightMode 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-900' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}>
            1
          </Button>
          <Button onClick={() => inputDigit('2')} className={`${
            isLightMode 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-900' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}>
            2
          </Button>
          <Button onClick={() => inputDigit('3')} className={`${
            isLightMode 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-900' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}>
            3
          </Button>
          <Button onClick={handleEquals} className={`row-span-2 ${
            isLightMode 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-green-500/80 hover:bg-green-500 text-white'
          }`}>
            =
          </Button>

          <Button onClick={() => inputDigit('0')} className={`col-span-2 ${
            isLightMode 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-900' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}>
            0
          </Button>
          <Button onClick={inputDecimal} className={`${
            isLightMode 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-900' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}>
            .
          </Button>
        </div>
      </div>
    </div>
  );
}














