import React from 'react';
import { useToast } from './ui/use-toast';

const ToastDisplay: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 right-0 p-4 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`p-4 rounded-md ${
            toast.variant === 'destructive' ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          <h3 className="font-bold">{toast.title}</h3>
          <p>{toast.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ToastDisplay;