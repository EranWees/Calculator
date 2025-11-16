
import React, { useState } from 'react';
import CalculatorButton from './components/CalculatorButton';

const App: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearAll = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplayValue(String(parseFloat(displayValue) * -1));
  };

  const inputPercent = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(String(value / 100));
  };
  
  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      let newValue = 0;

      switch (operator) {
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
        default:
          return;
      }
      
      setPreviousValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
     if (operator && previousValue !== null) {
        performOperation(operator);
        setOperator(null); // Reset operator after equals
     }
  };


  const handleButtonClick = (label: string) => {
    if (/\d/.test(label)) {
      inputDigit(label);
    } else {
      switch (label) {
        case '.':
          inputDecimal();
          break;
        case 'AC':
          clearAll();
          break;
        case '+/-':
          toggleSign();
          break;
        case '%':
          inputPercent();
          break;
        case '+':
        case '-':
        case '×':
        case '÷':
          performOperation(label);
          break;
        case '=':
          handleEquals();
          break;
      }
    }
  };

  const getButtonClassName = (label: string) => {
    if (['÷', '×', '-', '+', '='].includes(label)) {
      return 'bg-orange-500 hover:bg-orange-600 text-white';
    }
    if (['AC', '+/-', '%'].includes(label)) {
      return 'bg-gray-400 hover:bg-gray-500 text-black';
    }
    if (label === '0') {
      return 'col-span-2 bg-gray-600 hover:bg-gray-700';
    }
    return 'bg-gray-600 hover:bg-gray-700';
  };

  const buttons = [
    'AC', '+/-', '%', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  const formatDisplay = (value: string) => {
    if (value.length > 9) {
      return parseFloat(value).toExponential(3);
    }
    return new Intl.NumberFormat('en-US', {maximumFractionDigits: 20}).format(Number(value.replace(/,/g, '')));
  };

  return (
    <div className="w-full max-w-xs mx-auto bg-black rounded-3xl shadow-2xl p-4 space-y-4">
      <div className="bg-black p-4 rounded-lg text-right overflow-hidden">
        <p className="text-gray-400 text-2xl h-8">{operator ? `${previousValue} ${operator}` : ''}</p>
        <h1 className="text-white text-7xl font-light break-words">{formatDisplay(displayValue)}</h1>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((label) => (
          <CalculatorButton
            key={label}
            label={label}
            onClick={handleButtonClick}
            className={getButtonClassName(label)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
