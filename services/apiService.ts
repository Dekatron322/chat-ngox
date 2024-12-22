import axios from 'axios';

const API_BASE_URL = 'https://kad-electric-mob-api.fyber.site';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for request/response handling (optional)
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication tokens if necessary
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle errors globally
    console.error(error.response?.data || 'API Error');
    return Promise.reject(error);
  }
);

export default apiClient;
