import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ error, children, ...props }) => (
  <div>
    <select {...props} className="border rounded px-2 py-1 w-full">
      {children}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);