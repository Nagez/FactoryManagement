import axios from 'axios';
import { clearUser } from '../redux/userReducer';

// Create a single Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your API URL
});

// Flag to prevent multiple alerts
let alertShown = false;

// Request interceptor to add the token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token'); // Retrieve token from sessionStorage
        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Map status codes to messages
const statusMessages = {
    401: 'Your session has expired.',
    403: 'Your have no more actions.',
    500: 'Internal server error. Please try again later.',
};

// Function to handle alerts
const handleAlert = (status) => {
    const message = statusMessages[status] || 'An error occurred. Please try again.';
    alert(message); // Display the appropriate message
};

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;
            console.log('axios response:', status);

            // Check for specific status codes and show alerts
            if ((status === 401 || status === 403 || status === 500) && !alertShown) {
                alertShown = true; // Prevent multiple alerts
                handleAlert(status); // Show alert based on status
                sessionStorage.removeItem('token'); // Clear token
                window.location.href = '/login'; // Redirect to login page
                dispatch(clearUser()); // Clear user from Redux
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
