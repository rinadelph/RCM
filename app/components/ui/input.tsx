import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input: React.FC<InputProps> = ({ error, ...props }) => (
  <div>
    <input {...props} className="border rounded px-2 py-1 w-full" />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);