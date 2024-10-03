export const log = (message: string, data?: any, level: 'info' | 'warn' | 'error' = 'info') => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  
  console[level](logMessage);
  if (data) {
    console[level](JSON.stringify(data, null, 2));
  }

  // You can add additional logging logic here, such as writing to a file or sending to a logging service
};

// Add these new log functions
export const logAuthAttempt = (provider: string) => {
  log(`Auth attempt with provider: ${provider}`, null, 'info');
};

export const logAuthSuccess = (userId: string) => {
  log(`Successful authentication for user: ${userId}`, null, 'info');
};

export const logAuthError = (error: string) => {
  log(`Authentication error: ${error}`, null, 'error');
};

export const logAPIRequest = (route: string, method: string) => {
  log(`API Request: ${method} ${route}`, null, 'info');
};

export const logAPIResponse = (route: string, method: string, status: number) => {
  log(`API Response: ${method} ${route} - Status: ${status}`, null, 'info');
};