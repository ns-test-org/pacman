'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/10">
        <div className="mb-6 bg-black/50 rounded-2xl p-6 min-h-[100px] flex items-end justify-end">
          <div className="text-white text-5xl font-light tracking-wider break-all text-right">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Button onClick={clear} className="col-span-2 bg-red-500/80 hover:bg-red-500 text-white">
            AC
          </Button>
          <Button onClick={() => performOperation('÷')} className="bg-orange-500/80 hover:bg-orange-500 text-white">
            ÷
          </Button>
          <Button onClick={() => performOperation('×')} className="bg-orange-500/80 hover:bg-orange-500 text-white">
            ×
          </Button>

          <Button onClick={() => inputDigit('7')} className="bg-white/10 hover:bg-white/20 text-white">
            7
          </Button>
          <Button onClick={() => inputDigit('8')} className="bg-white/10 hover:bg-white/20 text-white">
            8
          </Button>
          <Button onClick={() => inputDigit('9')} className="bg-white/10 hover:bg-white/20 text-white">
            9
          </Button>
          <Button onClick={() => performOperation('-')} className="bg-orange-500/80 hover:bg-orange-500 text-white">
            −
          </Button>

          <Button onClick={() => inputDigit('4')} className="bg-white/10 hover:bg-white/20 text-white">
            4
          </Button>
          <Button onClick={() => inputDigit('5')} className="bg-white/10 hover:bg-white/20 text-white">
            5
          </Button>
          <Button onClick={() => inputDigit('6')} className="bg-white/10 hover:bg-white/20 text-white">
            6
          </Button>
          <Button onClick={() => performOperation('+')} className="bg-orange-500/80 hover:bg-orange-500 text-white">
            +
          </Button>

          <Button onClick={() => inputDigit('1')} className="bg-white/10 hover:bg-white/20 text-white">
            1
          </Button>
          <Button onClick={() => inputDigit('2')} className="bg-white/10 hover:bg-white/20 text-white">
            2
          </Button>
          <Button onClick={() => inputDigit('3')} className="bg-white/10 hover:bg-white/20 text-white">
            3
          </Button>
          <Button onClick={handleEquals} className="row-span-2 bg-green-500/80 hover:bg-green-500 text-white">
            =
          </Button>

          <Button onClick={() => inputDigit('0')} className="col-span-2 bg-white/10 hover:bg-white/20 text-white">
            0
          </Button>
          <Button onClick={inputDecimal} className="bg-white/10 hover:bg-white/20 text-white">
            .
          </Button>
        </div>
      </div>
    </div>
  );
}

