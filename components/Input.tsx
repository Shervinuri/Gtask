import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, helperText, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full px-1">
      <label className="text-gray-200 font-semibold text-sm md:text-base">{label}</label>
      <input
        className={`w-full p-3 rounded-xl bg-[#2c2c2c] text-white border border-transparent focus:border-[#00bfff] focus:ring-1 focus:ring-[#00bfff] focus:outline-none transition-all duration-300 placeholder-gray-500 ${className}`}
        {...props}
      />
      {helperText && <div className="text-sm">{helperText}</div>}
    </div>
  );
};