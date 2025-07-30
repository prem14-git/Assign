// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 5000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout'
    },
    SESSIONS: {
      PUBLIC: '/sessions',
      MY_SESSIONS: '/my-sessions',
      SAVE_DRAFT: '/my-sessions/save-draft',
      PUBLISH: '/my-sessions/publish'
    }
  }
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get API timeout
export const getApiTimeout = () => {
  return API_CONFIG.TIMEOUT;
};

export default API_CONFIG; 