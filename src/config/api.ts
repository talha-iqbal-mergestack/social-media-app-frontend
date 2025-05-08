// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  ENDPOINTS: {
    SIGN_IN: '/auth/signin',
    SIGN_UP: '/auth/signup',
  },
};