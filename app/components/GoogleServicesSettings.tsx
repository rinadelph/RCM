'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaInfoCircle } from 'react-icons/fa';

interface GoogleService {
  id: string;
  name: string;
  type: string;
  apiKey: string;
  status: string;
  gaMeasurementId?: string;
  gaPropertyId?: string;
  gscSiteUrl?: string;
  adwordsClientId?: string;
}

interface NewService {
  name: string;
  type: string;
  apiKey: string;
  gaMeasurementId?: string;
  gaPropertyId?: string;
  gscSiteUrl?: string;
  adwordsClientId?: string;
}

export default function GoogleServicesSettings() {
  const [services, setServices] = useState<GoogleService[]>([]);
  const [newService, setNewService] = useState<NewService>({ name: '', type: '', apiKey: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/google-services');
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load Google services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/google-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });
      if (!response.ok) throw new Error('Failed to add service');
      toast.success('Google service added successfully');
      await fetchServices();
      setNewService({ name: '', type: '', apiKey: '' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to add Google service');
    }
  };

  const renderServiceTypeFields = () => {
    switch (newService.type) {
      case 'analytics':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="gaMeasurementId" className="block mb-2">
                GA Measurement ID
                <InfoBubble text="Found in Google Analytics under Admin > Data Streams > Choose your stream > Measurement ID" />
              </label>
              <input
                type="text"
                id="gaMeasurementId"
                name="gaMeasurementId"
                value={newService.gaMeasurementId || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gaPropertyId" className="block mb-2">
                GA Property ID
                <InfoBubble text="Found in Google Analytics under Admin > Property Settings > Property ID" />
              </label>
              <input
                type="text"
                id="gaPropertyId"
                name="gaPropertyId"
                value={newService.gaPropertyId || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </>
        );
      case 'searchConsole':
        return (
          <div className="mb-4">
            <label htmlFor="gscSiteUrl" className="block mb-2">
              Search Console Site URL
              <InfoBubble text="The full URL of your website as it appears in Google Search Console" />
            </label>
            <input
              type="text"
              id="gscSiteUrl"
              name="gscSiteUrl"
              value={newService.gscSiteUrl || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        );
      case 'adwords':
        return (
          <div className="mb-4">
            <label htmlFor="adwordsClientId" className="block mb-2">
              Google Ads Client ID
              <InfoBubble text="Found in Google Ads under Tools & Settings > Setup > Account access" />
            </label>
            <input
              type="text"
              id="adwordsClientId"
              name="adwordsClientId"
              value={newService.adwordsClientId || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleVerify = async (id: string) => {
    try {
      const response = await fetch(`/api/google-services/${id}/verify`, { method: 'POST' });
      if (!response.ok) throw new Error('Failed to verify service');
      const data = await response.json();
      if (data.verified) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      await fetchServices();
    } catch (err) {
      console.error(err);
      toast.error('Failed to verify Google service');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await fetch(`/api/google-services/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete service');
        toast.success('Google service deleted successfully');
        await fetchServices();
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete Google service');
      }
    }
  };

  const handleEdit = async (service: GoogleService) => {
    setNewService(service);
    // You might want to add a state to toggle between "Add" and "Edit" modes
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Google Services Settings</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <h2 className="text-xl font-bold mb-2">Add Google Service</h2>
        <div className="mb-4">
          <label htmlFor="serviceName" className="block mb-2">Service Name</label>
          <input
            type="text"
            id="serviceName"
            name="name"
            value={newService.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="serviceType" className="block mb-2">Service Type</label>
          <select
            id="serviceType"
            name="type"
            value={newService.type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a service type</option>
            <option value="analytics">Google Analytics</option>
            <option value="searchConsole">Search Console</option>
            <option value="adwords">Google Ads</option>
          </select>
        </div>
        {renderServiceTypeFields()}
        <div className="mb-4">
          <label htmlFor="apiKey" className="block mb-2">
            API Key
            <InfoBubble text="Create an API key in the Google Cloud Console" />
          </label>
          <input
            type="text"
            id="apiKey"
            name="apiKey"
            value={newService.apiKey}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Google Service
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">Added Google Services</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Service Name</th>
            <th className="text-left">Service Type</th>
            <th className="text-left">Status</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.type}</td>
              <td>
                {service.status}
                {service.verificationMessage && (
                  <div className="text-sm text-gray-500">{service.verificationMessage}</div>
                )}
              </td>
              <td>
                {service.type === 'analytics' && (
                  <>
                    <div>GA Measurement ID: {service.gaMeasurementId || 'N/A'}</div>
                    <div>GA Property ID: {service.gaPropertyId || 'N/A'}</div>
                  </>
                )}
                {service.type === 'searchConsole' && (
                  <div>GSC Site URL: {service.gscSiteUrl || 'N/A'}</div>
                )}
                {service.type === 'adwords' && (
                  <div>Adwords Client ID: {service.adwordsClientId || 'N/A'}</div>
                )}
                <button onClick={() => handleVerify(service.id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                  Verify
                </button>
                <button onClick={() => handleEdit(service)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(service.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InfoBubble({ text }: { text: string }) {
  return (
    <span className="ml-2 relative group">
      <FaInfoCircle className="inline-block text-gray-500" />
      <span className="absolute z-10 hidden group-hover:block bg-black text-white text-xs rounded p-2 -mt-2 ml-2">
        {text}
      </span>
    </span>
  );
}