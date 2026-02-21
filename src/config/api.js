const isDevelopment = window.location.hostname === 'localhost';
const API_URL = isDevelopment 
    ? 'http://localhost:3000'
    : 'https://hostel-management-backend-bukg.onrender.com';

console.log('🔧 API_URL:', API_URL);
console.log('🔧 Hostname:', window.location.hostname);

export default API_URL;
