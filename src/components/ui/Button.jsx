import React from 'react';

const Button = ({ onClick, children, className = '', type = 'button' }) => {
  const baseClasses = "w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-blue-700 active:scale-95";
  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${className}`}>
      {children}
    </button>
  );
};

export default Button;