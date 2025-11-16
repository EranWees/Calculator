
import React from 'react';

interface CalculatorButtonProps {
  label: string;
  onClick: (label: string) => void;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ label, onClick, className }) => {
  const baseClasses = "text-3xl rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white";

  const sizeClasses = label === '0' ? "h-20" : "h-20 w-20";

  return (
    <button
      onClick={() => onClick(label)}
      className={`${baseClasses} ${sizeClasses} ${className}`}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;
