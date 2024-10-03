export interface Service {
  id: string;
  name: string;
  type: 'GOOGLE';
  serviceType: 'analytics' | 'ads' | 'searchconsole';
  gaMeasurementId?: string | null;
  gaPropertyId?: string | null;
  adsCustomerId?: string | null;
  searchConsoleProperty?: string | null;
  verified: boolean; // Add this line
}