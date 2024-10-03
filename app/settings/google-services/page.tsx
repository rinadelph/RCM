'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface GoogleService {
  id: string;
  serviceName: string;
  serviceType: string;
  gaMeasurementId?: string;
  gaPropertyId?: string;
  gscSiteUrl?: string;
  adwordsClientId?: string;
  apiKey: string;
}

export default function GoogleServicesSettings() {
  const router = useRouter();
  const [services, setServices] = useState<GoogleService[]>([]);
  const [editingService, setEditingService] = useState<GoogleService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/settings/google-services');
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      console.log('Fetched services:', data);
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (service: GoogleService) => {
    console.log('Editing service:', service);
    setEditingService(service);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await fetch(`/api/settings/google-services/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete service');
        }
        console.log('Service deleted:', id);
        fetchServices();
      } catch (err) {
        console.error('Error deleting service:', err);
        setError('Failed to delete service. Please try again.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const method = editingService?.id ? 'PUT' : 'POST';
    const url = editingService?.id 
      ? `/api/settings/google-services/${editingService.id}`
      : '/api/settings/google-services';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });
      if (!response.ok) {
        throw new Error('Failed to save service');
      }
      console.log('Service saved:', editingService);
      setEditingService(null);
      fetchServices();
    } catch (err) {
      console.error('Error saving service:', err);
      setError('Failed to save service. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editingService) {
      setEditingService({ ...editingService, [e.target.name]: e.target.value });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Google Services Settings</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <table className="w-full mb-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Service Name</th>
            <th className="border border-gray-300 px-4 py-2">Service Type</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{service.serviceName}</td>
              <td className="border border-gray-300 px-4 py-2">{service.serviceType}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => handleEdit(service)} className="mr-2 text-blue-500 hover:text-blue-700">Edit</button>
                <button onClick={() => handleDelete(service.id)} className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-bold mb-2">{editingService ? 'Edit' : 'Add'} Google Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">Service Name</label>
          <input
            type="text"
            id="serviceName"
            name="serviceName"
            value={editingService?.serviceName || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Service Type</label>
          <select
            id="serviceType"
            name="serviceType"
            value={editingService?.serviceType || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a service type</option>
            <option value="analytics">Google Analytics</option>
            <option value="searchConsole">Search Console</option>
            <option value="adwords">Google Ads</option>
          </select>
        </div>
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">API Key</label>
          <input
            type="text"
            id="apiKey"
            name="apiKey"
            value={editingService?.apiKey || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {editingService ? 'Update' : 'Add'} Google Service
        </button>
      </form>
    </div>
  );
}