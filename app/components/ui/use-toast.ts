import { useState } from 'react';

interface ToastProps {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, props]);
    console.log('Toast:', props); // For debugging
  };

  return { toast, toasts };
};