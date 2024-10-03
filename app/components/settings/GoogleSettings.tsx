'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiCheck, FiLock, FiBarChart, FiSearch, FiDollarSign, FiInfo } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { Tooltip } from 'react-tooltip';

type GoogleService = {
  id: string;
  name: string;
  serviceName: string;
  serviceType: 'analytics' | 'ads' | 'searchConsole';
  gaMeasurementId?: string;
  gaPropertyId?: string;
  gscSiteUrl?: string;
  adsCustomerId?: string;
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
  isAuthenticated?: boolean;
};

type Service = GoogleService | {
  id: string;
  name: string;
  type: string;
  serviceType: string;
  gaMeasurementId?: string;
  gaPropertyId?: string;
  gscSiteUrl?: string;
  adsCustomerId?: string;
  apiKey?: string;
  hasCredentials: boolean;
  verified: boolean;
};

const serviceTypeIcons = {
  analytics: FiBarChart,
  searchConsole: FiSearch,
  ads: FiDollarSign,
};

export default function GoogleSettings() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState<GoogleService>({
    id: '',
    name: '',
    serviceName: '',
    serviceType: 'analytics',
    gaMeasurementId: '',
    gaPropertyId: '',
    gscSiteUrl: '',
    adsCustomerId: '',
    apiKey: '',
    clientId: '',
    clientSecret: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<GoogleService | null>(null);
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/google-services');
      console.log('Fetch response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Google services:', data);
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        } else {
          console.log('No Google services found or data is not an array');
        }
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error("Failed to fetch Google services");
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setError("An unexpected error occurred while fetching services");
    }
  };

  useEffect(() => {
    fetchServices();
    // Check for auth success or error in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');
    if (authStatus === 'success') {
      setError('Authentication successful!');
      fetchServices(); // Refresh the services list after successful authentication
    } else if (authStatus === 'error') {
      setError('Authentication failed. Please try again.');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/google-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });
      if (response.ok) {
        const createdService = await response.json();
        console.log('Created new service:', createdService);
        await fetchServices();
        setNewService({
          id: '',
          serviceName: '',
          serviceType: 'analytics',
          gaMeasurementId: '',
          gaPropertyId: '',
          gscSiteUrl: '',
          adsCustomerId: '',
          clientId: '',
          clientSecret: '',
        });
        setSelectedServiceType(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to add Google service");
      }
    } catch (error) {
      console.error('Error adding service:', error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async (serviceId: string, serviceType: string) => {
    try {
      const response = await fetch(`/api/auth/google?serviceId=${serviceId}&serviceType=${serviceType}`, {
        method: 'POST',
      });
      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url; // Redirect the user to the Google OAuth page
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to initiate authentication");
      }
    } catch (error) {
      console.error('Error initiating authentication:', error);
      setError("An unexpected error occurred");
    }
  };

  const handleEdit = (service: GoogleService) => {
    setEditingService(service);
    setNewService(service);
    setSelectedServiceType(service.serviceType);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/google-services/${editingService?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });
      if (response.ok) {
        fetchServices();
        setEditingService(null);
        setNewService({
          id: '',
          name: '',
          serviceName: '',
          serviceType: 'analytics',
          gaMeasurementId: '',
          gaPropertyId: '',
          gscSiteUrl: '',
          adsCustomerId: '',
          apiKey: '',
          clientId: '',
          clientSecret: '',
        });
      } else {
        setError("Failed to update Google service");
      }
    } catch (error) {
      console.error('Error updating service:', error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setIsLoading(true);
      setError(null);
      try {
        console.log(`Attempting to delete service with id: ${id}`);
        const response = await fetch(`/api/google-services/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log(`Successfully deleted service with id: ${id}`);
          await fetchServices(); // Re-fetch services after successful deletion
          setError(null); // Clear any existing errors
        } else {
          const errorData = await response.json();
          console.error(`Failed to delete service with id: ${id}`, errorData);
          throw new Error(errorData.error || "Failed to delete service");
        }
      } catch (error) {
        console.error('Error deleting service:', error);
        setError(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const InfoButton = ({ content, link }: { content: string; link: string }) => (
    <span
      className="ml-2 text-blue-500 hover:text-blue-700 cursor-pointer"
      data-tooltip-id={`tooltip-${link}`}
      data-tooltip-html={`${content}<br/><a href="${link}" target="_blank" rel="noopener noreferrer" class="text-blue-300 hover:underline">Click here to learn more</a>`}
      data-tooltip-place="right"
    >
      <FiInfo />
      <Tooltip id={`tooltip-${link}`} className="max-w-md" clickable />
    </span>
  );

  const ServiceTypeSelector = () => {
    const types = [
      { id: 'analytics', label: 'Analytics', icon: FiBarChart },
      { id: 'searchConsole', label: 'Search Console', icon: FiSearch },
      { id: 'ads', label: 'Ads', icon: FiDollarSign },
    ];

    return (
      <div className="flex justify-center space-x-4 my-6">
        {types.map((type) => (
          <motion.button
            key={type.id}
            onClick={() => {
              setSelectedServiceType(type.id);
              setNewService({ ...newService, serviceType: type.id as GoogleService['serviceType'] });
            }}
            className={`flex flex-col items-center p-4 rounded-lg w-32 h-32 ${
              selectedServiceType === type.id 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <type.icon size={32} />
            <span className="mt-2 text-sm font-medium text-center">{type.label}</span>
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <motion.div 
        className="bg-white shadow-lg rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingService ? 'Edit Google Service' : 'Add New Google Service'}
          </h2>
        </div>
        <form onSubmit={editingService ? handleUpdate : handleSubmit} className="p-6">
          <ServiceTypeSelector />
          
          <AnimatePresence mode="wait">
            {selectedServiceType && (
              <motion.div
                key={selectedServiceType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 mt-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">
                      Service Name
                      <InfoButton 
                        content="Enter a descriptive name for this Google service integration"
                        link="https://console.cloud.google.com/apis/dashboard"
                      />
                    </label>
                    <input
                      type="text"
                      id="serviceName"
                      name="serviceName"
                      value={newService.serviceName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  {selectedServiceType === 'analytics' && (
                    <>
                      <div>
                        <label htmlFor="gaMeasurementId" className="block text-sm font-medium text-gray-700">
                          Measurement ID
                          <InfoButton 
                            content="Find your Measurement ID (starts with G-) in your Google Analytics 4 property settings"
                            link="https://analytics.google.com/analytics/web/#/a{YOUR_ACCOUNT_ID}p{YOUR_PROPERTY_ID}/admin/streams/table/"
                          />
                        </label>
                        <input
                          type="text"
                          id="gaMeasurementId"
                          name="gaMeasurementId"
                          value={newService.gaMeasurementId}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label htmlFor="gaPropertyId" className="block text-sm font-medium text-gray-700">
                          Property ID
                          <InfoButton 
                            content="Find your Property ID in your Google Analytics property settings"
                            link="https://analytics.google.com/analytics/web/#/a{YOUR_ACCOUNT_ID}p{YOUR_PROPERTY_ID}/admin/property/settings"
                          />
                        </label>
                        <input
                          type="text"
                          id="gaPropertyId"
                          name="gaPropertyId"
                          value={newService.gaPropertyId}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                    </>
                  )}
                  {selectedServiceType === 'searchConsole' && (
                    <div>
                      <label htmlFor="gscSiteUrl" className="block text-sm font-medium text-gray-700">
                        Site URL
                        <InfoButton 
                          content="Enter the exact URL of your website as it appears in Google Search Console"
                          link="https://search.google.com/search-console"
                        />
                      </label>
                      <input
                        type="text"
                        id="gscSiteUrl"
                        name="gscSiteUrl"
                        value={newService.gscSiteUrl}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                  )}
                  {selectedServiceType === 'ads' && (
                    <div>
                      <label htmlFor="adsCustomerId" className="block text-sm font-medium text-gray-700">
                        Customer ID
                        <InfoButton 
                          content="Find your Google Ads Customer ID in your Google Ads account settings"
                          link="https://ads.google.com/aw/settings/account/details"
                        />
                      </label>
                      <input
                        type="text"
                        id="adsCustomerId"
                        name="adsCustomerId"
                        value={newService.adsCustomerId}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">
                      Client ID
                      <InfoButton 
                        content="Find or create your Client ID in the Google Cloud Console credentials page"
                        link="https://console.cloud.google.com/apis/credentials"
                      />
                    </label>
                    <input
                      type="text"
                      id="clientId"
                      name="clientId"
                      value={newService.clientId}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="clientSecret" className="block text-sm font-medium text-gray-700">
                      Client Secret
                      <InfoButton 
                        content="Find or create your Client Secret in the Google Cloud Console credentials page"
                        link="https://console.cloud.google.com/apis/credentials"
                      />
                    </label>
                    <input
                      type="password"
                      id="clientSecret"
                      name="clientSecret"
                      value={newService.clientSecret}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedServiceType(null);
                      setEditingService(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {editingService ? 'Update' : 'Add'} Service
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      <motion.div 
        className="bg-white shadow-lg rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Existing Google Services</h2>
        </div>
        <div className="p-6">
          {services.length === 0 ? (
            <p className="text-gray-500 text-center">No Google services added yet.</p>
          ) : (
            services.map((service) => {
              const Icon = serviceTypeIcons[service.serviceType as keyof typeof serviceTypeIcons] || FiBarChart;
              const isAuthenticated = 'isAuthenticated' in service ? service.isAuthenticated : service.verified;
              return (
                <motion.div 
                  key={service.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex items-center justify-between"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      isAuthenticated ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{service.name || service.serviceName}</h3>
                      <p className="text-sm text-gray-600">
                        {service.serviceType === 'analytics' ? 'Analytics' : service.serviceType}
                      </p>
                      <p className={`text-sm ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
                        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={() => handleAuth(service.id, service.serviceType)}
                      className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isAuthenticated ? 'text-green-600 focus:ring-green-500' : 'text-blue-600 focus:ring-blue-500'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title={isAuthenticated ? "Re-authenticate with Google" : "Authenticate with Google"}
                    >
                      {isAuthenticated ? <FiCheck /> : <FiLock />}
                    </motion.button>
                    <motion.button
                      onClick={() => handleEdit(service as GoogleService)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>

      {error && (
        <motion.div
          className={`border-l-4 p-4 rounded-md ${
            error.includes('successful') ? 'bg-green-50 border-green-400 text-green-700' : 'bg-red-50 border-red-400 text-red-700'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-bold">{error.includes('successful') ? 'Success' : 'Error'}</p>
          <p>{error}</p>
        </motion.div>
      )}

      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white p-4 rounded-md">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}