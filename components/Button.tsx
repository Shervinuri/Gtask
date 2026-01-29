import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "w-full p-3 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  
  const variants = {
    primary: "bg-black border border-white/10 text-gray-300 hover:bg-[#0f0f0f] hover:text-white hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]",
    success: "bg-[#065f46] border border-emerald-500/30 text-emerald-100 hover:bg-[#047857] hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};