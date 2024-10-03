'use client';  // Add this line at the top of the file

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  id?: string;
  name: string;
  serviceType: string;
  gaMeasurementId: string;
  gaPropertyId: string;
  apiKey: string;
  apiSecret: string;
  clientEmail: string;
  privateKey: string;
}

interface GoogleServiceFormProps {
  initialData?: FormData;
  onSubmitSuccess?: () => void;
}

const GoogleServiceForm: React.FC<GoogleServiceFormProps> = ({ initialData, onSubmitSuccess }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ defaultValues: initialData });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const method = data.id ? 'PUT' : 'POST';
      const response = await fetch('/api/google-services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to save service');
      if (onSubmitSuccess) onSubmitSuccess();
      reset();
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/google-services', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: initialData.id }),
      });
      if (!response.ok) throw new Error('Failed to delete service');
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error('Error deleting service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register('name', { required: 'Name is required' })}
        placeholder="Service Name"
        className="border rounded px-2 py-1 w-full"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <select
        {...register('serviceType', { required: 'Service Type is required' })}
        className="border rounded px-2 py-1 w-full"
      >
        <option value="">Select Service Type</option>
        <option value="analytics">Google Analytics</option>
        <option value="ads">Google Ads</option>
        <option value="search_console">Google Search Console</option>
      </select>
      {errors.serviceType && <p className="text-red-500 text-sm">{errors.serviceType.message}</p>}

      <input
        {...register('gaMeasurementId', { required: 'GA Measurement ID is required' })}
        placeholder="GA Measurement ID"
        className="border rounded px-2 py-1 w-full"
      />
      {errors.gaMeasurementId && <p className="text-red-500 text-sm">{errors.gaMeasurementId.message}</p>}

      <input
        {...register('gaPropertyId', { required: 'GA Property ID is required' })}
        placeholder="GA Property ID"
        className="border rounded px-2 py-1 w-full"
      />
      {errors.gaPropertyId && <p className="text-red-500 text-sm">{errors.gaPropertyId.message}</p>}

      <input
        {...register('apiKey', { required: 'API Key is required' })}
        placeholder="API Key"
        className="border rounded px-2 py-1 w-full"
      />
      {errors.apiKey && <p className="text-red-500 text-sm">{errors.apiKey.message}</p>}

      <input
        {...register('apiSecret', { required: 'API Secret is required' })}
        placeholder="API Secret"
        className="border rounded px-2 py-1 w-full"
      />
      {errors.apiSecret && <p className="text-red-500 text-sm">{errors.apiSecret.message}</p>}

      <input
        {...register('clientEmail', { required: 'Client Email is required' })}
        placeholder="Client Email"
        className="border rounded px-2 py-1 w-full"
      />
      {errors.clientEmail && <p className="text-red-500 text-sm">{errors.clientEmail.message}</p>}

      <textarea
        {...register('privateKey', { required: 'Private Key is required' })}
        placeholder="Private Key"
        className="border rounded px-2 py-1 w-full h-32"
      />
      {errors.privateKey && <p className="text-red-500 text-sm">{errors.privateKey.message}</p>}

      <div className="flex justify-between">
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isLoading ? 'Saving...' : (initialData ? 'Update' : 'Save') + ' Service'}
        </button>
        {initialData && (
          <button 
            type="button" 
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            {isLoading ? 'Deleting...' : 'Delete Service'}
          </button>
        )}
      </div>
    </form>
  );
};

export default GoogleServiceForm;