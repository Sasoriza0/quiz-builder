import axios from 'axios';

const api = axios.create({
  // Use the environment variable, fallback to localhost if not found
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
});

export default api