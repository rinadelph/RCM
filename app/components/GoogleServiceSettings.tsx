import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InfoModal from './InfoModal';

type GoogleService = 'analytics' | 'searchConsole' | 'ads';

interface GoogleServiceSettingsProps {
  onSave: (data: any) => void;
  initialData: any;
}

export default function GoogleServiceSettings({ onSave, initialData }: GoogleServiceSettingsProps) {
  const [selectedService, setSelectedService] = useState<GoogleService>('analytics');
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialData });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: null });

  const onSubmit = (data: any) => {
    onSave({ ...data, serviceType: selectedService });
  };

  const openInfoModal = (title: string, content: React.ReactNode) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const renderInfoIcon = (title: string, content: React.ReactNode) => (
    <span
      className="ml-2 text-blue-500 cursor-pointer"
      onClick={() => openInfoModal(title, content)}
    >
      ℹ️
    </span>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="serviceName" className="block mb-2">Property Name</label>
        <input
          id="serviceName"
          {...register('serviceName', { required: 'Property Name is required' })}
          className="w-full p-2 border rounded"
          placeholder="My Website"
        />
        {errors.serviceName && <span className="text-red-500">{errors.serviceName.message as string}</span>}
      </div>

      <div>
        <label htmlFor="serviceType" className="block mb-2">Google Service</label>
        <select
          id="serviceType"
          className="w-full p-2 border rounded"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value as GoogleService)}
        >
          <option value="analytics">Google Analytics</option>
          <option value="searchConsole">Search Console</option>
          <option value="ads">Google Ads</option>
        </select>
      </div>

      {selectedService === 'analytics' && (
        <>
          <div>
            <label htmlFor="gaMeasurementId" className="block mb-2">
              Measurement ID
              {renderInfoIcon("How to find Measurement ID", (
                <div>
                  <p>To find your Measurement ID:</p>
                  <ol className="list-decimal list-inside">
                    <li>Go to your <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Analytics account</a></li>
                    <li>Click on "Admin" in the bottom left corner</li>
                    <li>In the property column, click on "Data Streams"</li>
                    <li>Select your web stream</li>
                    <li>Your Measurement ID will be displayed (starts with "G-")</li>
                  </ol>
                </div>
              ))}
            </label>
            <input
              id="gaMeasurementId"
              {...register('gaMeasurementId', { required: 'Measurement ID is required' })}
              className="w-full p-2 border rounded"
              placeholder="G-XXXXXXXXXX"
            />
            {errors.gaMeasurementId && <span className="text-red-500">{errors.gaMeasurementId.message as string}</span>}
          </div>
          <div>
            <label htmlFor="gaPropertyId" className="block mb-2">
              Property ID
              {renderInfoIcon("How to find Property ID", (
                <div>
                  <p>To find your Property ID:</p>
                  <ol className="list-decimal list-inside">
                    <li>Go to your <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Analytics account</a></li>
                    <li>Click on "Admin" in the bottom left corner</li>
                    <li>In the property column, look for "Property Settings"</li>
                    <li>Your Property ID will be displayed at the top of the page</li>
                  </ol>
                </div>
              ))}
            </label>
            <input
              id="gaPropertyId"
              {...register('gaPropertyId', { required: 'Property ID is required' })}
              className="w-full p-2 border rounded"
              placeholder="XXXXXXXXXX"
            />
            {errors.gaPropertyId && <span className="text-red-500">{errors.gaPropertyId.message as string}</span>}
          </div>
        </>
      )}

      {selectedService === 'searchConsole' && (
        <div>
          <label htmlFor="gscSiteUrl" className="block mb-2">
            Site URL
            {renderInfoIcon("How to find Site URL", (
              <div>
                <p>To find your Site URL:</p>
                <ol className="list-decimal list-inside">
                  <li>Go to <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Search Console</a></li>
                  <li>Select your property from the list</li>
                  <li>The Site URL is the URL you used to verify your property</li>
                </ol>
              </div>
            ))}
          </label>
          <input
            id="gscSiteUrl"
            {...register('gscSiteUrl', { required: 'Site URL is required' })}
            className="w-full p-2 border rounded"
            placeholder="https://example.com"
          />
          {errors.gscSiteUrl && <span className="text-red-500">{errors.gscSiteUrl.message as string}</span>}
        </div>
      )}

      {selectedService === 'ads' && (
        <div>
          <label htmlFor="adwordsClientId" className="block mb-2">
            Adwords Client ID
            {renderInfoIcon("How to find Adwords Client ID", (
              <div>
                <p>To find your Adwords Client ID:</p>
                <ol className="list-decimal list-inside">
                  <li>Sign in to your <a href="https://ads.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Ads account</a></li>
                  <li>Click on the Tools & Settings icon in the top right</li>
                  <li>Under "Setup", click on "Account settings"</li>
                  <li>Your 10-digit client ID is displayed at the top of the page</li>
                </ol>
              </div>
            ))}
          </label>
          <input
            id="adwordsClientId"
            {...register('adwordsClientId', { required: 'Adwords Client ID is required' })}
            className="w-full p-2 border rounded"
            placeholder="123-456-7890"
          />
          {errors.adwordsClientId && <span className="text-red-500">{errors.adwordsClientId.message as string}</span>}
        </div>
      )}

      <div>
        <label htmlFor="apiKey" className="block mb-2">
          API Key
          {renderInfoIcon("How to get an API Key", (
            <div>
              <p>To get an API Key:</p>
              <ol className="list-decimal list-inside">
                <li>Go to the <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Developers Console</a></li>
                <li>Select your project or create a new one</li>
                <li>Click on "Credentials" in the left sidebar</li>
                <li>Click "Create credentials" and select "API key"</li>
                <li>Your new API key will be displayed</li>
              </ol>
            </div>
          ))}
        </label>
        <input
          id="apiKey"
          {...register('apiKey', { required: 'API Key is required' })}
          className="w-full p-2 border rounded"
          placeholder="Your API Key"
        />
        {errors.apiKey && <span className="text-red-500">{errors.apiKey.message as string}</span>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Google Service
      </button>

      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        content={modalContent.content}
      />
    </form>
  );
}